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

const STORAGE_KEY = "bmr_diagnostic_state_v2";

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

interface DiagnosticContextType {
  state: DiagnosticState;
  setSector: (sector: SectorKey) => void;
  setDecisionStage: (stage: DecisionStage) => void;
  setOrganizationName: (name: string) => void;
  updateSowOption: (phaseId: "PHASE_01" | "PHASE_02" | "PHASE_03", option: SowOptionLevel) => void;
  loadFromToken: (token: string) => Promise<boolean>;
  generateShareToken: () => string;
  resetDiagnostic: () => void;
}

const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<IntakeAnswers>(initialAnswers);
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
            organizationName: sanitizeOrgName(parsed.answers.organizationName),
            sector: VALID_SECTORS.includes(rawSec) ? rawSec : "FINANCE",
            decisionStage: VALID_STAGES.includes(rawStg) ? rawStg : "ACTIVE_STABILIZATION"
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
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, sowSelections }));
    } catch {
      // Ignore write errors
    }
  }, [answers, sowSelections]);

  const calculations = useMemo(() => calculateDiagnosticMetrics(answers), [answers]);

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

  const state: DiagnosticState = {
    answers,
    calculations,
    nodeSummaries,
    sowSelections,
    isComplete: true
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

  /**
   * Async Server-Gated Restoration.
   * State mutates ONLY when POST /api/verify-token confirms HMAC signature and TTL.
   */
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
      return false; // Silent fail-closed: retain current state
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

  return (
    <DiagnosticContext.Provider
      value={{
        state,
        setSector,
        setDecisionStage,
        setOrganizationName,
        updateSowOption,
        loadFromToken,
        generateShareToken,
        resetDiagnostic
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
}

export function useDiagnostic() {
  const context = useContext(DiagnosticContext);
  if (!context) {
    throw new Error("useDiagnostic must be used within a DiagnosticProvider");
  }
  return context;
}
