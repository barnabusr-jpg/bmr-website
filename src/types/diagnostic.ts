export type SectorKey = "FINANCE" | "HEALTHCARE" | "INDUSTRIAL" | "SERVICES";

export type DecisionStage = "ROLLOUT_SAFETY" | "ACTIVE_STABILIZATION" | "AUDIT_READINESS";

export type SowOptionLevel = "OPTION_A" | "OPTION_B" | "OPTION_C";

export interface IntakeAnswers {
  organizationName: string;
  sector: SectorKey;
  decisionStage: DecisionStage;
  vectorScores: Record<string, number>; // Bounded to 1..5
}

export interface NodeStatus {
  nodeId: "NODE_01" | "NODE_02" | "NODE_03" | "NODE_04";
  name: string;
  observedPattern: string;
  operationalImpact: string;
  recommendedGate: string;
  status: "VERIFIED" | "DISCREPANCY" | "ELEVATED_FRICTION" | "ACTION_RECOMMENDED";
}

export interface DiagnosticCalculations {
  readinessIndex: number;
  processWasteTax: number;
  promiseGapExposure: number;
  annualCapacityHours: number;
  weeklyBurnRate: number;
  recoveryMultiplier: number;
}

export type SowSelectionsMap = Record<"PHASE_01" | "PHASE_02" | "PHASE_03", SowOptionLevel>;

export interface DiagnosticState {
  answers: IntakeAnswers;
  calculations: DiagnosticCalculations;
  nodeSummaries: NodeStatus[];
  sowSelections: SowSelectionsMap;
  isComplete: boolean;
}
