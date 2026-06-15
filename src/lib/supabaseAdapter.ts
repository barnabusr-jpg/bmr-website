export type SectorType = 'FINANCE_HEALTHCARE' | 'ENTERPRISE_SAAS' | 'INDUSTRIAL_LOGISTICS' | 'SERVICES_RETAIL';
export type PersonaType = 'EXECUTIVE' | 'TECH_MGMT' | 'OPS_MGMT' | 'SYSTEM_USER';

export interface LocalQuestion {
  id: string;
  pillar: 'IGF' | 'AVS' | 'HAI';
  target_node: PersonaType;
  symptomatic_scenario: string;
  regulatory_tag?: string;
  choices: {
    [key in 'A' | 'B' | 'C' | 'D']: {
      text: string;
      symptom_weight: number;
      bandwidth_multiplier: number;
    }
  };
}

export function transformDbQuestion(dbRow: any): LocalQuestion {
  return {
    id: dbRow.id,
    pillar: dbRow.pillar_type,
    target_node: dbRow.target_layer_node,
    symptomatic_scenario: dbRow.scenario_text,
    regulatory_tag: dbRow.regulatory_code_tag || undefined,
    choices: {
      A: { text: dbRow.choice_a_text, symptom_weight: Number(dbRow.choice_a_weight), bandwidth_multiplier: Number(dbRow.choice_a_multiplier) },
      B: { text: dbRow.choice_b_text, symptom_weight: Number(dbRow.choice_b_weight), bandwidth_multiplier: Number(dbRow.choice_b_multiplier) },
      C: { text: dbRow.choice_c_text, symptom_weight: Number(dbRow.choice_c_weight), bandwidth_multiplier: Number(dbRow.choice_c_multiplier) },
      D: { text: dbRow.choice_d_text, symptom_weight: Number(dbRow.choice_d_weight), bandwidth_multiplier: Number(dbRow.choice_d_multiplier) }
    }
  };
}
