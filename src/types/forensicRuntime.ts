// src/types/forensicRuntime.ts

export type EvidenceBasis = 'AUDITED_ARTIFACT' | 'DASHBOARD_TELEMETRY' | 'TRIBAL_KNOWLEDGE' | 'COMPLETE_OPACITY';
export type FailureDriver = 'GOVERNANCE_GAP' | 'ENGINEERING_ARCH' | 'PROCESS_STRAIN' | 'TOOLING_VOID';
export type VisibilityState = 'AWARE' | 'FATIGUED' | 'BLIND';

export interface ChoiceInference {
  basis: EvidenceBasis;
  driver: FailureDriver;
  state: VisibilityState;
}

export interface LocalChoice {
  key: 'A' | 'B' | 'C' | 'D'; // 👈 Preserved your strict union constraints
  text: string;
  symptom_weight: number;       // Ranges locally from 0.0 to 2.0
  bandwidth_multiplier: number; // Used for in-memory salary leak math
  regulatory_tag?: string;
  inference?: ChoiceInference; // 👈 Appended clean optional metadata hook
}

export interface LocalQuestion {
  id: string; 
  pillar: 'IGF' | 'AVS' | 'HAI'; // Reflected hybrid roadmap layout
  subarea: string;
  target_node: 'EXECUTIVE' | 'MANAGERIAL' | 'TECHNICAL' | 'USER';
  symptomatic_scenario: string;
  choices: Record<'A' | 'B' | 'C' | 'D', LocalChoice>; // 👈 Hardened map constraint
}

export interface InMemoryCalculatedMetrics {
  companyName: string;
  igfScore: number;
  avsScore: number;
  haiScore: number;
  complianceScore: number;
  annualSalaryLeakage: number;
  reworkCosts: number;
  unhedgedLegalExposure: number;
  complianceFailures: string[];
}
