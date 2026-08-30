import { SectorType } from './supabaseAdapter';
import { forensicQuestions } from '../data/forensicQuestions';
import { 
  inferChoiceMetadata, 
  EvidenceBasis, 
  FailureDriver, 
  VisibilityState 
} from './forensicInference';

export const CALCULUS_VERSION = "2026.1.0";

// ============================================================================
// 1. FINANCIAL CALCULATOR TYPES & DEFAULTS
// ============================================================================

export interface AuditRowLike {
  org_name?: string | null;
  decay_pct?: number | string | null;
  ai_spend?: string | number | null; // Spend in $M
  roi_pct?: number | string | null;  // Impacted workforce scale / FTE count
  created_at?: string | null;
  updated_at?: string | null;
  sector?: SectorType | string | null;
  raw_responses?: Record<string, any> | null;
}

export interface AuditFinancialMetrics {
  calculusVersion: string;
  companyName: string;
  dbDecay: number;
  spend: number;
  fteCount: number;
  sector: string;

  laborMultiplier: number;
  historicalAnchorTimeMs: number;
  currentRealTimeMs: number;
  elapsedSeconds: number;

  totalLaborTaxPool: number;
  exposure: number;
  totalErosion: number;

  findingsImpacts: number[];
  brandHexAccent: string;
}

const FINANCIAL_DEFAULTS = {
  dbDecay: 24,
  spend: 1.2,
  fteFallback: 6,
  brandHexAccent: "#dc2626",
};

function coerceNumber(value: any): number | null {
  const n = typeof value === "number" ? value : parseFloat(String(value ?? ""));
  return Number.isFinite(n) ? n : null;
}

function getLaborMultiplier(sector: string | null | undefined): number {
  const s = String(sector || "").toLowerCase().trim();
  if (s === "finance") return 0.5;
  if (s === "healthcare") return 0.45;
  return 0.4;
}

function sanitizeSector(sector: any): string {
  const s = String(sector || "").trim();
  return s.length ? s : "other";
}

/**
 * 🔒 AUTHORITATIVE FINANCIAL CALCULATOR (Server-Truth)
 * Sourced directly from audit row & admin trued-up sliders.
 */
export function calculateAuditFinancialMetrics(
  auditRow: AuditRowLike,
  asOfTimestampMs?: number
): AuditFinancialMetrics {
  const companyName = auditRow.org_name || "Evaluation Client System";

  const dbDecay = Math.min(Math.max(coerceNumber(auditRow.decay_pct) ?? FINANCIAL_DEFAULTS.dbDecay, 0), 100);
  const spend = Math.max(coerceNumber(auditRow.ai_spend) ?? FINANCIAL_DEFAULTS.spend, 0.1);

  const fteCount =
    auditRow.roi_pct != null && auditRow.roi_pct !== ""
      ? Math.max(0, Math.round(coerceNumber(auditRow.roi_pct) ?? 0))
      : Math.max(0, Math.round((spend * 1_000_000) / 200_000) || FINANCIAL_DEFAULTS.fteFallback);

  const rawCreatedAtMs = auditRow.created_at ? new Date(auditRow.created_at).getTime() : NaN;
  const historicalAnchorTimeMs = Number.isFinite(rawCreatedAtMs) ? rawCreatedAtMs : Date.now();
  
  // Deterministic time: Use provided timestamp, DB updated_at, or anchor time
  const rawUpdatedAtMs = auditRow.updated_at ? new Date(auditRow.updated_at).getTime() : NaN;
  const fallbackCurrentMs = Number.isFinite(rawUpdatedAtMs) ? rawUpdatedAtMs : historicalAnchorTimeMs;
  const currentRealTimeMs = asOfTimestampMs && Number.isFinite(asOfTimestampMs) ? asOfTimestampMs : fallbackCurrentMs;
  
  const elapsedSeconds = Math.max(0, (currentRealTimeMs - historicalAnchorTimeMs) / 1000);

  const sector = sanitizeSector(auditRow.sector);
  const laborMultiplier = getLaborMultiplier(sector);

  const totalLaborTaxPool = (dbDecay / 100) * laborMultiplier * (fteCount * 160_000 * 1.3);
  const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1_000_000)) * 1.15;
  const totalErosion = (exposure / 31_536_000) * elapsedSeconds;

  const findingsImpacts = [0.35, 0.28, 0.22, 0.15].map(p => totalLaborTaxPool * p);

  return {
    calculusVersion: CALCULUS_VERSION,
    companyName,
    dbDecay,
    spend,
    fteCount,
    sector,
    laborMultiplier,
    historicalAnchorTimeMs,
    currentRealTimeMs,
    elapsedSeconds,
    totalLaborTaxPool: Math.round(totalLaborTaxPool),
    exposure: Math.round(exposure),
    totalErosion: parseFloat(totalErosion.toFixed(2)),
    findingsImpacts: findingsImpacts.map(Math.round),
    brandHexAccent: FINANCIAL_DEFAULTS.brandHexAccent,
  };
}

// ============================================================================
// 2. STAGE-GATING AUDITOR (STRICT PREDICATE)
// ============================================================================

export interface PdfEvidenceStatus {
  isFullyHydrated: boolean;
  isPartial: boolean;
  completedTracksCount: number;
  validAnsweredCount: number;
  statusLabel: string;
}

const VALID_CHOICE_SET = new Set(['A', 'B', 'C', 'D']);

function isValidCompletionMarker(val: any): boolean {
  if (val === true) return true;
  if (typeof val === "string" || typeof val === "number") {
    const parsedDate = Date.parse(String(val));
    return Number.isFinite(parsedDate);
  }
  return false;
}

/**
 * 🛡️ STAGE-GATING AUDITOR
 * Validates completion markers and strict choice predicates before releasing assertions.
 */
export function getPdfEvidenceStatus(
  rawResponses: Record<string, any> | null | undefined,
  minSampleThreshold = 10
): PdfEvidenceStatus {
  const responses = rawResponses || {};
  
  const completionMarkers = [
    'QUAD_EXE_COMPLETE',
    'QUAD_MGR_COMPLETE',
    'QUAD_TEC_COMPLETE',
    'QUAD_SYS_COMPLETE'
  ];

  const completedTracksCount = completionMarkers.filter(
    (marker) => isValidCompletionMarker(responses[marker])
  ).length;

  const validAnsweredCount = Object.entries(responses).filter(([key, value]) => {
    if (!key.startsWith('quad_')) return false;
    const cleanVal = String(value ?? '').trim().toUpperCase();
    return VALID_CHOICE_SET.has(cleanVal);
  }).length;

  const isFullyHydrated = completedTracksCount >= 3 && validAnsweredCount >= minSampleThreshold;
  const isPartial = !isFullyHydrated && (completedTracksCount > 0 || validAnsweredCount > 0);

  let statusLabel = 'PROVISIONAL_STAGE_1';
  if (isFullyHydrated) {
    statusLabel = 'VERIFIED_360_TRIANGULATED';
  } else if (isPartial) {
    statusLabel = 'PARTIAL_TELEMETRY_IN_PROGRESS';
  }

  return {
    isFullyHydrated,
    isPartial,
    completedTracksCount,
    validAnsweredCount,
    statusLabel
  };
}

// ============================================================================
// 3. AUTHORITATIVE FORENSIC CALCULATOR
// ============================================================================

export interface CalculatedMetrics {
  companyName: string;
  multiplier: number;
  complianceScore: number;
  annualSalaryLeakage: number;
  forensicInactionLiability: number; 
  isTierThreeExposure: boolean;
  regulatoryAlertActive: boolean;

  reliabilityIndex: number;
  sampleSize: number;
  dominantDriver: FailureDriver | "NONE";
  dominantBasis: EvidenceBasis | "NONE";
  dominantVisibility: VisibilityState | "NONE";
  evidenceDistribution: Record<EvidenceBasis, number>;
  visibilityDistribution: Record<VisibilityState, number>;
  driverDistribution: Record<FailureDriver, number>;
}

const CONFIG_BASIS_WEIGHTS: Record<EvidenceBasis, number> = {
  AUDITED_ARTIFACT: 100,
  DASHBOARD_TELEMETRY: 75,
  TRIBAL_KNOWLEDGE: 40,
  COMPLETE_OPACITY: 10
};

export function calculateForensicMetrics(
  companyName: string,
  responses: Record<string, string> | any,
  explicitSector?: SectorType | string | null
): CalculatedMetrics {
  const fallbackSector: SectorType = "SERVICES";
  const sector = (explicitSector || responses?.sector || fallbackSector).toString().toUpperCase();

  const sectorMultipliers: Record<string, number> = {
    FINANCE: 1.95,     
    HEALTHCARE: 1.85,  
    INDUSTRIAL: 1.35,  
    SERVICES: 1.00,    
  };
  
  const multiplier = sectorMultipliers[sector] || 1.00;

  const inputKeys = Object.keys(responses || {});
  const quadKeys = inputKeys.filter(k => k.startsWith('quad_'));

  const avsAnswers = quadKeys.filter(k => k.toUpperCase().includes('AVS') || responses[k] === 'AVS');
  const igfAnswers = quadKeys.filter(k => k.toUpperCase().includes('IGF') || responses[k] === 'IGF');
  const haiAnswers = quadKeys.filter(k => k.toUpperCase().includes('HAI') || responses[k] === 'HAI');

  let frictionPenaltyCount = 0;
  quadKeys.forEach(key => {
    const answerValue = responses[key];
    if (answerValue === 'C' || answerValue === 'D') {
      frictionPenaltyCount += 1.5;
    } else if (answerValue === 'B') {
      frictionPenaltyCount += 0.5;
    }
  });

  const baseDeficiencyImpact = frictionPenaltyCount * 4.5;
  const rawComplianceScore = 90 - baseDeficiencyImpact;
  
  const infrastructureLossWeight = avsAnswers.length + haiAnswers.length;
  const salaryLeakageBase = 85000 + (infrastructureLossWeight * 15000) + (frictionPenaltyCount * 45000);
  
  const complianceRiskWeight = igfAnswers.length * 2.0;
  const legalExposureBase = 450000 + (complianceRiskWeight * 75000) + (frictionPenaltyCount * 115000);

  const evidenceDistribution: Record<EvidenceBasis, number> = { AUDITED_ARTIFACT: 0, DASHBOARD_TELEMETRY: 0, TRIBAL_KNOWLEDGE: 0, COMPLETE_OPACITY: 0 };
  const driverDistribution: Record<FailureDriver, number> = { GOVERNANCE_GAP: 0, ENGINEERING_ARCH: 0, PROCESS_STRAIN: 0, TOOLING_VOID: 0 };
  const visibilityDistribution: Record<VisibilityState, number> = { AWARE: 0, FATIGUED: 0, BLIND: 0 };

  let totalWeightedBasisSum = 0;
  let activeValidInferencesCount = 0;

  quadKeys.forEach(key => {
    const chosenOptionLetter = responses[key]; 
    
    const normalizedTargetId = key
      .replace(/^quad_/, '')
      .toUpperCase()
      .replace(/_/g, '-'); 
    
    const masterQuestionKey = Object.keys(forensicQuestions || {}).find(
      k => k.toUpperCase().replace(/_/g, '-') === normalizedTargetId
    );
    
    const questionObject = masterQuestionKey ? forensicQuestions[masterQuestionKey] : null;
    const pickedChoiceObject = questionObject?.choices?.[chosenOptionLetter as 'A'|'B'|'C'|'D'];

    if (questionObject && pickedChoiceObject) {
      const inferred = inferChoiceMetadata({
        scenario: questionObject.symptomatic_scenario || '',
        choiceText: pickedChoiceObject.text || '',
        regulatoryTag: pickedChoiceObject.regulatory_tag,
        pillar: questionObject.pillar || ''
      });

      evidenceDistribution[inferred.evidence_basis]++;
      driverDistribution[inferred.failure_driver]++;
      visibilityDistribution[inferred.visibility_state]++;

      totalWeightedBasisSum += CONFIG_BASIS_WEIGHTS[inferred.evidence_basis];
      activeValidInferencesCount++;
    }
  });

  const maxPossibleWeightScore = activeValidInferencesCount * 100;
  const computedReliabilityIndex = maxPossibleWeightScore > 0 
    ? Math.round((totalWeightedBasisSum / maxPossibleWeightScore) * 100) 
    : 0;

  const getDominantVector = <T extends string>(distribution: Record<T, number>): T | "NONE" => {
    if (activeValidInferencesCount === 0) return "NONE";
    return (Object.entries(distribution) as Array<[T, number]>)
      .sort((a, b) => b[1] - a[1])[0][0];
  };

  return {
    companyName,
    multiplier,
    complianceScore: Math.max(15, Math.min(100, Math.round(rawComplianceScore))),
    annualSalaryLeakage: Math.round(salaryLeakageBase * multiplier),
    forensicInactionLiability: Math.round(legalExposureBase * multiplier), 
    isTierThreeExposure: multiplier >= 1.35, 
    regulatoryAlertActive: sector === 'FINANCE' || sector === 'HEALTHCARE' || igfAnswers.length > 2,

    reliabilityIndex: computedReliabilityIndex,
    sampleSize: activeValidInferencesCount,
    dominantDriver: getDominantVector(driverDistribution),
    dominantBasis: getDominantVector(evidenceDistribution),
    dominantVisibility: getDominantVector(visibilityDistribution),
    evidenceDistribution,
    visibilityDistribution,
    driverDistribution
  };
}
