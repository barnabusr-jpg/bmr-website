// src/lib/forensicMatrix.ts

export interface ForensicMatrixItem {
  id: string;
  lens: "EXE" | "MGR" | "TEC";
  triangulationId: string;
  weight: number;
  text: string;
  evidenceOptions: string[];
}

/**
 * Normalizes incoming evidence choices from UI dropdowns (Title Case, spaces, lowercase)
 * into strict UPPERCASE_SNAKE_CASE used by calculation and icon engines.
 */
export const normalizeEvidence = (val?: string): string => {
  if (!val) return "NONE";
  return val.trim().toUpperCase().replace(/\s+/g, "_");
};

/**
 * Validates whether a given evidence choice matches an allowed option key.
 */
export const isValidEvidenceOption = (
  option: string,
  allowedOptions: string[]
): boolean => {
  const normalizedInput = normalizeEvidence(option);
  return allowedOptions.some(
    (allowed) => normalizeEvidence(allowed) === normalizedInput
  );
};

export const FORENSIC_MATRIX: ForensicMatrixItem[] = [
  // --- T1: INDEMNITY & GOVERNANCE GATES ---
  { 
    id: "EXE_01", lens: "EXE", triangulationId: "T1", weight: 15, 
    text: "Do executive policies require explicit data safety and audit agreements before connecting third-party AI models?", 
    evidenceOptions: ["CONTRACT_REVIEW", "PURVIEW_DLP_POLICY", "VERBAL_ASSURANCE", "NONE"] 
  },
  { 
    id: "MGR_01", lens: "MGR", triangulationId: "T1", weight: 10, 
    text: "Is there a structured review process to validate third-party system changes before they affect daily team workflows?", 
    evidenceOptions: ["SOP_DOCUMENT", "STEERCO_MINUTES", "VERBAL_ASSURANCE", "NONE"] 
  },
  { 
    id: "TEC_01", lens: "TEC", triangulationId: "T1", weight: 15, 
    text: "Do engineering systems automatically log and trace all data sent to third-party AI models?", 
    evidenceOptions: ["SIEM_LOGS", "API_GATEWAY_TRAFFIC", "INGESTION_CONTRACTS", "NONE"] 
  },

  // --- T2: PROCESS WASTE TAX & REWORK ---
  { 
    id: "EXE_02", lens: "EXE", triangulationId: "T2", weight: 12, 
    text: "Does corporate leadership measure financial losses and wasted team capacity spent fixing broken data connections?", 
    evidenceOptions: ["FINANCIAL_REPORT", "WASTE_TAX_LEDGER", "ANECDOTAL", "NONE"] 
  },
  { 
    id: "MGR_02", lens: "MGR", triangulationId: "T2", weight: 15, 
    text: "Are subject matter experts spending weekly hours manually correcting unexpected AI outputs or broken data formats?", 
    evidenceOptions: ["TIME_TRACKING", "SME_INTERVIEWS", "VALIDATION_LOGS", "NONE"] 
  },
  { 
    id: "TEC_02", lens: "TEC", triangulationId: "T2", weight: 13, 
    text: "Is there an automated system that updates data workflows based on corrections made by human reviewers?", 
    evidenceOptions: ["RLHF_PIPELINE", "GIT_COMMIT_LOGS", "MANUAL_REBUILDS", "NONE"] 
  },

  // --- T3: UNHEDGED AI & CONTEXT EXPOSURE ---
  { 
    id: "EXE_03", lens: "EXE", triangulationId: "T3", weight: 10, 
    text: "Is there a clear executive policy restricting employees from uploading sensitive company data into unauthorized AI tools?", 
    evidenceOptions: ["EMPLOYEE_HANDBOOK", "BOARD_DIRECTIVE", "VERBAL_POLICY", "NONE"] 
  },
  { 
    id: "MGR_03", lens: "MGR", triangulationId: "T3", weight: 10, 
    text: "Has operational leadership established guidelines for separating safe public information from restricted internal data?", 
    evidenceOptions: ["TRAINING_LOGS", "SECURITY_BRIEFING", "NONE"] 
  },
  { 
    id: "TEC_03", lens: "TEC", triangulationId: "T3", weight: 15, 
    text: "Are network boundaries configured to detect and block unauthorized data transfers to unverified AI services?", 
    evidenceOptions: ["FIREWALL_CONFIG", "API_GATEWAY_RULES", "NONE"] 
  },

  // --- T4: IP & CONTEXT OWNERSHIP ---
  { 
    id: "EXE_04", lens: "EXE", triangulationId: "T4", weight: 15, 
    text: "Does governance maintain formal legal verification of intellectual property ownership for automated AI outputs?", 
    evidenceOptions: ["LEGAL_OPINION", "VENDOR_AGREEMENT", "NONE"] 
  },
  { 
    id: "MGR_04", lens: "MGR", triangulationId: "T4", weight: 8, 
    text: "Are operational teams instructed to check AI outputs to protect proprietary company standards and assets?", 
    evidenceOptions: ["SOP_DOCUMENT", "WORKFLOW_GUIDE", "NONE"] 
  },
  { 
    id: "TEC_04", lens: "TEC", triangulationId: "T4", weight: 12, 
    text: "Do automated pipelines attach digital tags or watermarks to verify the origin and ownership of internal data?", 
    evidenceOptions: ["METADATA_TAGS", "VECTOR_REGISTRY", "NONE"] 
  },

  // --- T5: PII MASKING & PURVIEW DLP ---
  { 
    id: "EXE_05", lens: "EXE", triangulationId: "T5", weight: 15, 
    text: "Does corporate AI usage enforce strict data loss prevention and privacy controls to protect sensitive customer information?", 
    evidenceOptions: ["COMPLIANCE_CERT", "PURVIEW_AUDIT_REPORT", "NONE"] 
  },
  { 
    id: "MGR_05", lens: "MGR", triangulationId: "T5", weight: 10, 
    text: "Do managers actively audit team data inputs for sensitive information before approving automated workflows?", 
    evidenceOptions: ["SPOT_CHECKS", "SAMPLING_LOGS", "NONE"] 
  },
  { 
    id: "TEC_05", lens: "TEC", triangulationId: "T5", weight: 15, 
    text: "Is there an automated data scrubber running between internal user interfaces and external AI models?", 
    evidenceOptions: ["API_GATEWAY", "DATA_SCRUBBER_PROXY", "NONE"] 
  },

  // --- T6: SCHEMA & MODEL DRIFT INSULATION ---
  { 
    id: "EXE_06", lens: "EXE", triangulationId: "T6", weight: 10, 
    text: "Is capital allocated specifically for data safety rules, schema verification, and system stability testing?", 
    evidenceOptions: ["BUDGET_LINE_ITEM", "R&D_ALLOCATION", "NONE"] 
  },
  { 
    id: "MGR_06", lens: "MGR", triangulationId: "T6", weight: 10, 
    text: "Is operational management tracking accuracy drop-offs or system errors in automated daily workflows?", 
    evidenceOptions: ["QUALITY_LOGS", "SME_FEEDBACK", "NONE"] 
  },
  { 
    id: "TEC_06", lens: "TEC", triangulationId: "T6", weight: 15, 
    text: "Are continuous automated tests active to catch unexpected vendor payload changes before system outages occur?", 
    evidenceOptions: ["CI_TEST_SUITE", "BENCHMARK_LOGS", "NONE"] 
  },

  // --- T7: HALLUCINATION & CIRCUIT BREAKERS ---
  { 
    id: "EXE_07", lens: "EXE", triangulationId: "T7", weight: 12, 
    text: "Has leadership defined explicit financial risk limits and liability parameters for automated decision errors?", 
    evidenceOptions: ["RISK_REGISTER", "INSURANCE_POLICY", "NONE"] 
  },
  { 
    id: "MGR_07", lens: "MGR", triangulationId: "T7", weight: 10, 
    text: "Is there an emergency protocol to pause automated workflows if system errors or false outputs spike?", 
    evidenceOptions: ["EMERGENCY_SOP", "STEERCO_RUNBOOK", "NONE"] 
  },
  { 
    id: "TEC_07", lens: "TEC", triangulationId: "T7", weight: 15, 
    text: "Do technical pipelines enforce verification barriers using internal records before AI models generate responses?", 
    evidenceOptions: ["RAG_PIPELINE", "VECTOR_DB_GUARDS", "NONE"] 
  },

  // --- T8: COST TRANSPARENCY & TOKEN SPEND ---
  { 
    id: "EXE_08", lens: "EXE", triangulationId: "T8", weight: 10, 
    text: "Is financial return and operational cost leakage from AI initiatives tracked on executive dashboards?", 
    evidenceOptions: ["P&L_STATEMENT", "PROMISE_GAP_MODEL", "NONE"] 
  },
  { 
    id: "MGR_08", lens: "MGR", triangulationId: "T8", weight: 8, 
    text: "Do operational leads have real-time visibility into monthly usage costs generated by their team's automated tools?", 
    evidenceOptions: ["DASHBOARD_ACCESS", "MONTHLY_BILL_ANALYSIS", "NONE"] 
  },
  { 
    id: "TEC_08", lens: "TEC", triangulationId: "T8", weight: 12, 
    text: "Are system requests dynamically tagged by team and department to monitor unit costs and control budget consumption?", 
    evidenceOptions: ["API_TAGGING", "COST_CENTER_LOGS", "NONE"] 
  },

  // --- T9: VALIDATION FATIGUE & OVERSIGHT ---
  { 
    id: "EXE_09", lens: "EXE", triangulationId: "T9", weight: 8, 
    text: "Is there a strategic communication plan to manage human oversight transitions without creating operational friction?", 
    evidenceOptions: ["HR_COMMS", "CHANGE_MANAGEMENT_SLIDES", "NONE"] 
  },
  { 
    id: "MGR_09", lens: "MGR", triangulationId: "T9", weight: 10, 
    text: "Is team productivity suffering from validation fatigue caused by high volumes of unfiltered system alerts?", 
    evidenceOptions: ["SURVEY_RESULTS", "BURNOUT_FEEDBACK", "NONE"] 
  },
  { 
    id: "TEC_09", lens: "TEC", triangulationId: "T9", weight: 12, 
    text: "Is engineering time allocated toward building automated verification controls rather than constantly patching API errors?", 
    evidenceOptions: ["TRAINING_BUDGET", "SPRINT_ALLOCATION", "NONE"] 
  },

  // --- T10: VENDOR RESILIENCE & MULTI-MODEL REDUNDANCY ---
  { 
    id: "EXE_10", lens: "EXE", triangulationId: "T10", weight: 12, 
    text: "Does the enterprise maintain a vendor-neutral strategy to prevent total dependency on a single AI model provider?", 
    evidenceOptions: ["STRATEGY_DECK", "CONTRACT_DIVERSITY", "NONE"] 
  },
  { 
    id: "MGR_10", lens: "MGR", triangulationId: "T10", weight: 10, 
    text: "Could core operational workflows continue running smoothly if your primary AI provider experienced an extended outage?", 
    evidenceOptions: ["BCP_PLAN", "OFFLINE_RUNBOOK", "NONE"] 
  },
  { 
    id: "TEC_10", lens: "TEC", triangulationId: "T10", weight: 15, 
    text: "Has engineering tested automated failovers to switch traffic to secondary model providers during an outage?", 
    evidenceOptions: ["FAILOVER_TEST_LOGS", "ADAPTER_CONFIG", "NONE"] 
  }
];
