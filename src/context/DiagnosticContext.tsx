"use client";

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode, 
  useMemo, 
  useCallback 
} from "react";
import { 
  DiagnosticState, 
  IntakeAnswers, 
  SectorKey, 
  DecisionStage, 
  SowSelectionsMap,
  SowOptionLevel,
  NodeStatus
} from "@/types/diagnostic";
import { calculateDiagnosticMetrics } from "@/lib/diagnosticEngine";
import { SECTOR_COPY_REGISTRY } from "@/config/sectorCopyRegistry";
import { 
  encodeDiagnosticToken, 
  decodeDiagnosticToken, 
  sanitizeOrgName 
} from "@/lib/tokenCodec";

// Control Plane Export Pipeline Imports
import { deriveDynamicDiagnosticSnapshot } from "@/lib/playbookExportAdapter";
import { DiagnosticExportState } from "@/types/playbookExport";

const STORAGE_KEY = "bmr_diagnostic_state_v2";

const REQUIRED_VECTOR_KEYS = [
  "v01", "v02", "v03", "v04", "v05",
  "v06", "v07", "v08", "v09", "v10"
] as const;

// Strict Type guard: vector scores must be valid integers 1 to 5
function isValidVectorScore(score: unknown): score is number {
  return typeof score === "number" && Number.isInteger(score) && score >= 1 && score <= 5;
}

// Strict Fail-closed gate: both vectors must be valid and >= 3
function isVectorGatePassed(vA: unknown, vB: unknown): boolean {
  if (!isValidVectorScore(vA) || !isValidVectorScore(vB)) {
    return false; // Fail-closed: missing/corrupted telemetry never passes an audit gate
  }
  return vA >= 3 && vB >= 3;
}

const initialAnswers: IntakeAnswers = {
  organizationName: "ACME ENTERPRISE",
  sector: "FINANCE",
  decisionStage: "ACTIVE_STABILIZATION",
  vectorScores: {
    v01: 3, v02: 2, v03: 4, v04: 2, v05: 3,
    v06: 2, v07: 4, v08: 3, v09: 2, v10: 3
  }
};

const initialSowSelections: SowSelectionsMap = {
  PHASE_01: "OPTION_B",
  PHASE_02: "OPTION_B",
  PHASE_03: "OPTION_B"
};

export interface DiagnosticContextType {
  // Existing state & dispatchers
  state: DiagnosticState;
  setSector: (sector: SectorKey) => void;
  setDecisionStage: (stage: DecisionStage) => void;
  setOrganizationName: (name: string) => void;
  updateSowOption: (phaseId: "PHASE_01" | "PHASE_02" | "PHASE_03", option: SowOptionLevel) => void;
  loadFromToken: (token: string) => Promise<boolean>;
  generateShareToken: () => string;
  resetDiagnostic: () => void;

  // Export pipeline adapters
  organizationName: string;
  sector: string;
  readinessIndex: number;
  processWasteTax: number;
  promiseGapRisk: number;
  activeStabilizationFocus: string;
  unmanagedDriftImpact: string;
  rawResponses: Record<string, any>;
  getDiagnosticSnapshot: () => DiagnosticExportState;
}

const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);

export interface DiagnosticProviderProps {
  children: ReactNode;
  initialOverrides?: Partial<IntakeAnswers> & {
    rawResponses?: Record<string, any>;
    readinessScoreOverride?: number;
    processWasteTaxOverride?: number;
    promiseGapExposureOverride?: number;
    /** @deprecated Use promiseGapExposureOverride */
    promiseGapRiskOverride?: number;
  };
}

export function DiagnosticProvider({ children, initialOverrides }: DiagnosticProviderProps) {
  const [answers, setAnswers] = useState<IntakeAnswers>(() => {
    const base = { ...initialAnswers, ...(initialOverrides || {}) };
    if (initialOverrides?.organizationName) {
      base.organizationName = sanitizeOrgName(initialOverrides.organizationName);
    }
    return base;
  });

  const [sowSelections, setSowSelections] = useState<SowSelectionsMap>(initialSowSelections);

  // LocalStorage hydration with full schema sanitization and enum whitelisting
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && typeof parsed.answers === "object") {
          const rawSec = parsed.answers.sector;
          const rawStg = parsed.answers.decisionStage;
          const VALID_SECTORS: SectorKey[] = ["FINANCE", "HEALTHCARE", "INDUSTRIAL", "SERVICES"];
          const VALID_STAGES: DecisionStage[] = ["ROLLOUT_SAFETY", "ACTIVE_STABILIZATION", "AUDIT_READINESS"];

          setAnswers((prev) => ({
            ...prev,
            ...parsed.answers,
            ...(initialOverrides || {}),
            organizationName: initialOverrides?.organizationName 
              ? sanitizeOrgName(initialOverrides.organizationName)
              : sanitizeOrgName(parsed.answers.organizationName),
            sector: initialOverrides?.sector 
              ? initialOverrides.sector 
              : (VALID_SECTORS.includes(rawSec) ? rawSec : "FINANCE"),
            decisionStage: initialOverrides?.decisionStage 
              ? initialOverrides.decisionStage 
              : (VALID_STAGES.includes(rawStg) ? rawStg : "ACTIVE_STABILIZATION")
          }));
        }
        if (parsed.sowSelections && typeof parsed.sowSelections === "object") {
          const VALID_OPTIONS: SowOptionLevel[] = ["OPTION_A", "OPTION_B", "OPTION_C"];
          setSowSelections((prev) => ({
            PHASE_01: VALID_OPTIONS.includes(parsed.sowSelections.PHASE_01) ? parsed.sowSelections.PHASE_01 : "OPTION_B",
            PHASE_02: VALID_OPTIONS.includes(parsed.sowSelections.PHASE_02) ? parsed.sowSelections.PHASE_02 : "OPTION_B",
            PHASE_03: VALID_OPTIONS.includes(parsed.sowSelections.PHASE_03) ? parsed.sowSelections.PHASE_03 : "OPTION_B"
          }));
        }
      }
    } catch {
      // Fail-closed
    }
  }, [initialOverrides]);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, sowSelections }));
    } catch {
      // Ignore write errors
    }
  }, [answers, sowSelections]);

  const calculations = useMemo(() => calculateDiagnosticMetrics(answers), [answers]);

  // Maintain existing sector registry integration for UI compatibility
  const nodeSummaries: NodeStatus[] = useMemo(() => {
    const sectorConfig = SECTOR_COPY_REGISTRY[answers.sector] || SECTOR_COPY_REGISTRY.FINANCE;

    return [
      {
        nodeId: "NODE_01",
        name: "Executive Governance",
        observedPattern: "Board policy established without runtime telemetry verification.",
        operationalImpact: sectorConfig.nodeImpacts.NODE_01,
        recommendedGate: "Enforce runtime telemetry verification before scaling automation.",
        status: "DISCREPANCY"
      },
      {
        nodeId: "NODE_02",
        name: "Engineering and Delivery",
        observedPattern: "Data format shifts occurring without format checks.",
        operationalImpact: sectorConfig.nodeImpacts.NODE_02,
        recommendedGate: "Deploy strict input verification rules at system boundaries.",
        status: "ELEVATED_FRICTION"
      },
      {
        nodeId: "NODE_03",
        name: "Operations and Management",
        observedPattern: "Alert noise suppressing response times across active queues.",
        operationalImpact: sectorConfig.nodeImpacts.NODE_03,
        recommendedGate: "Isolate dependencies and implement clear execution runbooks.",
        status: "ACTION_RECOMMENDED"
      },
      {
        nodeId: "NODE_04",
        name: "Runtime Execution",
        observedPattern: "Unmonitored data ingestion active at operator level.",
        operationalImpact: sectorConfig.nodeImpacts.NODE_04,
        recommendedGate: "Establish mandatory verification gates before live execution.",
        status: "VERIFIED"
      }
    ];
  }, [answers.sector]);

  // Strict fail-closed telemetry completion check: all 10 vectors must be valid integers 1-5
  const isComplete = useMemo(() => {
    const v = answers.vectorScores;
    if (!v || typeof v !== "object") return false;
    return REQUIRED_VECTOR_KEYS.every((k) => isValidVectorScore(v[k as keyof typeof v]));
  }, [answers.vectorScores]);

  const state: DiagnosticState = {
    answers,
    calculations,
    nodeSummaries,
    sowSelections,
    isComplete
  };

  const setSector = useCallback((sector: SectorKey) => {
    const VALID_SECTORS: SectorKey[] = ["FINANCE", "HEALTHCARE", "INDUSTRIAL", "SERVICES"];
    const safeSector = VALID_SECTORS.includes(sector) ? sector : "FINANCE";
    setAnswers((prev) => ({ ...prev, sector: safeSector }));
  }, []);

  const setDecisionStage = useCallback((decisionStage: DecisionStage) => {
    const VALID_STAGES: DecisionStage[] = ["ROLLOUT_SAFETY", "ACTIVE_STABILIZATION", "AUDIT_READINESS"];
    const safeStage = VALID_STAGES.includes(decisionStage) ? decisionStage : "ACTIVE_STABILIZATION";
    setAnswers((prev) => ({ ...prev, decisionStage: safeStage }));
  }, []);

  const setOrganizationName = useCallback((name: string) => {
    setAnswers((prev) => ({ ...prev, organizationName: sanitizeOrgName(name) }));
  }, []);

  const updateSowOption = useCallback((phaseId: "PHASE_01" | "PHASE_02" | "PHASE_03", option: SowOptionLevel) => {
    const VALID_OPTIONS: SowOptionLevel[] = ["OPTION_A", "OPTION_B", "OPTION_C"];
    const safeOption = VALID_OPTIONS.includes(option) ? option : "OPTION_B";
    setSowSelections((prev) => ({ ...prev, [phaseId]: safeOption }));
  }, []);

  const generateShareToken = useCallback((): string => {
    return encodeDiagnosticToken(answers, sowSelections);
  }, [answers, sowSelections]);

  const loadFromToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      if (!token || typeof token !== "string") return false;

      const resp = await fetch("/api/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      if (!resp.ok) return false;

      const data = await resp.json();
      if (!data?.answers || !data?.sowSelections) return false;

      setAnswers(data.answers);
      setSowSelections(data.sowSelections);
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetDiagnostic = useCallback(() => {
    setAnswers(initialAnswers);
    setSowSelections(initialSowSelections);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // -------------------------------------------------------------
  // Control Plane Export Pipeline Adapters (Strict Fail-Closed Mode)
  // -------------------------------------------------------------
  const organizationName = answers.organizationName;
  const sector = answers.sector;

  // 1. Direct binding to engine calculations with explicit overrides (zero synthetic defaults)
  const readinessIndex =
    initialOverrides?.readinessScoreOverride ?? calculations.readinessIndex;

  const processWasteTax =
    initialOverrides?.processWasteTaxOverride ?? calculations.processWasteTax;

  const promiseGapRisk =
    initialOverrides?.promiseGapExposureOverride ??
    initialOverrides?.promiseGapRiskOverride ??
    calculations.promiseGapExposure;

  // 2. Fail-closed vector derivation: missing or out-of-range vectors never pass audit gates.
  // RAW_VECTORS is strictly emitted into rawResponseKeys only when isComplete is verified true.
  const rawResponses = useMemo(() => {
    if (initialOverrides?.rawResponses) {
      return initialOverrides.rawResponses;
    }

    const v = answers.vectorScores;

    return {
      QUAD_EXE_COMPLETE: isVectorGatePassed(v?.v01, v?.v02),
      QUAD_TEC_COMPLETE: isVectorGatePassed(v?.v03, v?.v04),
      QUAD_MGR_COMPLETE: isVectorGatePassed(v?.v05, v?.v06),
      QUAD_SYS_COMPLETE: isVectorGatePassed(v?.v07, v?.v08),
      RUNTIME_SHADOW_QUEUE_ACTIVE: isValidVectorScore(v?.v07) && (v?.v07 as number) >= 3,
      ...(isComplete && v ? { RAW_VECTORS: v } : {})
    };
  }, [initialOverrides?.rawResponses, answers.vectorScores, isComplete]);

  const activeStabilizationFocus =
    "Active Stabilization [Primary focus: containment of repeat operational rework]";

  const unmanagedDriftImpact =
    "Without verification gates and workflow stabilization criteria, Phase 02 automation may increase the probability of repeat rework and downstream reporting inconsistency during the initial rollout period... impacting reconciliations and risk reporting consistency.";

  const getDiagnosticSnapshot = useCallback((): DiagnosticExportState => {
    return deriveDynamicDiagnosticSnapshot({
      companyName: organizationName,
      sector,
      rawResponses,
      readinessValue: readinessIndex,
      wasteTaxValue: processWasteTax,
      promiseGapValue: promiseGapRisk,
      activeStabilizationFocus,
      unmanagedDriftImpact
    });
  }, [
    organizationName,
    sector,
    rawResponses,
    readinessIndex,
    processWasteTax,
    promiseGapRisk,
    activeStabilizationFocus,
    unmanagedDriftImpact
  ]);

  const value = useMemo(
    () => ({
      state,
      setSector,
      setDecisionStage,
      setOrganizationName,
      updateSowOption,
      loadFromToken,
      generateShareToken,
      resetDiagnostic,
      organizationName,
      sector,
      readinessIndex,
      processWasteTax,
      promiseGapRisk,
      activeStabilizationFocus,
      unmanagedDriftImpact,
      rawResponses,
      getDiagnosticSnapshot
    }),
    [
      state,
      setSector,
      setDecisionStage,
      setOrganizationName,
      updateSowOption,
      loadFromToken,
      generateShareToken,
      resetDiagnostic,
      organizationName,
      sector,
      readinessIndex,
      processWasteTax,
      promiseGapRisk,
      activeStabilizationFocus,
      unmanagedDriftImpact,
      rawResponses,
      getDiagnosticSnapshot
    ]
  );

  return <DiagnosticContext.Provider value={value}>{children}</DiagnosticContext.Provider>;
}

export function useDiagnostic(): DiagnosticContextType {
  const context = useContext(DiagnosticContext);
  if (!context) {
    throw new Error("useDiagnostic must be used within a DiagnosticProvider");
  }
  return context;
}

export const useDiagnosticContext = useDiagnostic;
