export interface TriangulatedChoice {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  symptom_weight: number;       // Ranges from 0.0 (Nominal) to 2.0 (Catastrophic)
  bandwidth_multiplier: number; // Factor for Wave 1 priority calculation maps
  regulatory_tag?: string;
}

export interface TriangulatedQuestion {
  id: string; // Internal format: [PILLAR]-[SUBAREA]-[QUESTION_NO]-[NODE]
  pillar: 'HAI' | 'AVS' | 'IGF';
  subarea: string;
  target_node: 'EXECUTIVE' | 'MANAGERIAL' | 'TECHNICAL' | 'USER';
  symptomatic_scenario: string; // Zero-data behavioral symptom definition
  choices: Record<'A' | 'B' | 'C' | 'D', TriangulatedChoice>;
}

export interface MetricState {
  client_id: string;
  target_pillar: 'HAI' | 'AVS' | 'IGF';
  friction_score: number;
  compliance_score: number;
  vendor_risk_score: number;
  annual_salary_leakage: number;
  rework_costs: number;          // Represents the system user manual workaround labor tax
  unhedged_legal_exposure: number;
  reconstruction_latency_hours: number;
  compliance_failures: string[];
  audit_deadline_iso?: string;
  asymmetric_variance_gap?: number;
}
