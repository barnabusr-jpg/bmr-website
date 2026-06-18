export interface LocalChoice {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  symptom_weight: number;       // Ranges locally from 0.0 to 2.0
  bandwidth_multiplier: number; // Used for in-memory salary leak math
  regulatory_tag?: string;
}

export interface LocalQuestion {
  id: string; 
  pillar: 'IGF' | 'AVS' | 'HAI'; // Adjusted sequence to reflect your hybrid roadmap
  subarea: string;
  target_node: 'EXECUTIVE' | 'MANAGERIAL' | 'TECHNICAL' | 'USER';
  symptomatic_scenario: string;
  choices: Record<'A' | 'B' | 'C' | 'D', LocalChoice>;
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
