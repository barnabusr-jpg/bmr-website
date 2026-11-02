export type MonetaryScope = 'ANNUALIZED_SINGLE_YEAR' | 'CUMULATIVE_CONTRACT_WINDOW';
export type GateStatus = 'VERIFIED' | 'DISCREPANCY' | 'ACTION_REQUIRED' | 'MONITORED';
export type PhaseStatus = 'ACTIVE' | 'PENDING_APPROVAL' | 'QUEUED';
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type InsulationBand = 'HIGH' | 'MEDIUM' | 'LOW';

export interface InsulationVisualConfig {
  band: InsulationBand;
  hexColor: string;
  twBgClass: string;
  twBorderClass: string;
  twTextClass: string;
}

export const INSULATION_THRESHOLDS = {
  HIGH_MIN: 70,   // Autonomous Assurance tier threshold
  MEDIUM_MIN: 50, // Active Stabilization midpoint
} as const;

export function getInsulationBandConfig(pct: number): InsulationVisualConfig {
  if (pct >= INSULATION_THRESHOLDS.HIGH_MIN) {
    return {
      band: 'HIGH',
      hexColor: '#10b981',
      twBgClass: 'bg-emerald-500',
      twBorderClass: 'border-emerald-200',
      twTextClass: 'text-emerald-700',
    };
  }
  if (pct >= INSULATION_THRESHOLDS.MEDIUM_MIN) {
    return {
      band: 'MEDIUM',
      hexColor: '#f59e0b',
      twBgClass: 'bg-amber-500',
      twBorderClass: 'border-amber-200',
      twTextClass: 'text-amber-700',
    };
  }
  return {
    band: 'LOW',
    hexColor: '#ef4444',
    twBgClass: 'bg-red-500',
    twBorderClass: 'border-red-200',
    twTextClass: 'text-red-700',
  };
}

export interface ScopedMetric {
  metricKey: 'AUTOMATION_READINESS_INDEX' | 'PROCESS_WASTE_TAX' | 'PROMISE_GAP_EXPOSURE';
  value: number;
  label: string;
  tag: string;
  scope: MonetaryScope;
  currency: 'USD' | 'SCORE_POINTS';
}

export interface NodeEvaluationRecord {
  nodeKey: 'NODE_01' | 'NODE_02' | 'NODE_03' | 'NODE_04';
  nodeLabel: string;
  observedPattern: string;
  operationalImpact: string;
  recommendedGate: string;
  status: GateStatus;
  statusSource: 'RESPONSE_DERIVED' | 'METHODOLOGY_BASELINE';
  insulationIntegrityPct: number;
}

export interface ComplianceAuditRecord {
  standard: string;
  clause: string;
  finding: string;
  severity: SeverityLevel;
  linkedPhase: 'PHASE 01' | 'PHASE 02' | 'PHASE 03';
  linkedNode: 'NODE 01' | 'NODE 02' | 'NODE 03' | 'NODE 04';
}

export interface Level2RunbookPhase {
  phase: 'PHASE 01' | 'PHASE 02' | 'PHASE 03';
  title: string;
  scope: string;
  deliverables: string[];
  timeline: string;
  allocation: string;
  status: PhaseStatus;
  gatingPrerequisiteMet: boolean;
}

export interface GovernancePolicyGate {
  stage: 'PHASE 01' | 'PHASE 02' | 'PHASE 03';
  name: string;
  thresholdTarget: string;
  enforcementRule: string;
  policyVersion: string;
  activeEnforcement: boolean;
}

export interface DiagnosticExportState {
  isHydrated: boolean;
  readinessIndex: ScopedMetric;
  processWasteTax: ScopedMetric;
  promiseGapRisk: ScopedMetric;
  hierarchyVerdictText: string;
  activeStabilizationFocus: string;
  unmanagedDriftImpact: string;
  nodeMatrix: NodeEvaluationRecord[];
  evaluatedPhases: Level2RunbookPhase[];
  complianceSafeguards: ComplianceAuditRecord[];
  governanceGates: GovernancePolicyGate[];
}

export interface TelemetryPreImage {
  companyName: string;
  sector: string;
  telemetryComplete: boolean;
  readinessScore: number;
  processWasteTaxAmount: number;
  promiseGapExposureAmount: number;
  rawResponseKeys: string[];
  responseVerificationChecksum: string;
}

export interface PlaybookProvenance {
  documentId: string;
  schemaVersion: string;
  generatedAt: string;
  originatingSource: string;
  inputTelemetryHash: string;
  preImage: TelemetryPreImage;
  classification: string;
}
