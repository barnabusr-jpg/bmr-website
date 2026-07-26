export const FORENSIC_MATRIX = [
  // --- T1: INDEMNITY & GOVERNANCE GATES ---
  { 
    id: "EXE_01", lens: "EXE", triangulationId: "T1", weight: 15, 
    text: "Do executive policies enforce machine-readable ingestion contracts and audit rights across third-party model vendor pipelines?", 
    evidenceOptions: ["CONTRACT_REVIEW", "PURVIEW_DLP_POLICY", "VERBAL_ASSURANCE", "NONE"] 
  },
  { 
    id: "MGR_01", lens: "MGR", triangulationId: "T1", weight: 10, 
    text: "Is there a structured review process to validate third-party API model updates before they hit operational workflows?", 
    evidenceOptions: ["SOP_DOCUMENT", "STEERCO_MINUTES", "VERBAL_ASSURANCE", "NONE"] 
  },
  { 
    id: "TEC_01", lens: "TEC", triangulationId: "T1", weight: 15, 
    text: "Do we maintain automated forensic logging to trace every payload and context vector ingested into third-party AI models?", 
    evidenceOptions: ["SIEM_LOGS", "API_GATEWAY_TRAFFIC", "INGESTION_CONTRACTS", "NONE"] 
  },

  // --- T2: PROCESS WASTE TAX & REWORK ---
  { 
    id: "EXE_02", lens: "EXE", triangulationId: "T2", weight: 12, 
    text: "Does corporate strategy measure and track the Process Waste Tax (sprint capacity lost) spent fixing unmapped data drift?", 
    evidenceOptions: ["FINANCIAL_REPORT", "WASTE_TAX_LEDGER", "ANECDOTAL", "NONE"] 
  },
  { 
    id: "MGR_02", lens: "MGR", triangulationId: "T2", weight: 15, 
    text: "Are subject matter experts spending significant weekly capacity manually correcting drifting schemas or AI model outputs?", 
    evidenceOptions: ["TIME_TRACKING", "SME_INTERVIEWS", "VALIDATION_LOGS", "NONE"] 
  },
  { 
    id: "TEC_02", lens: "TEC", triangulationId: "T2", weight: 13, 
    text: "Is there an automated feedback mechanism that flags and refines context pipelines based on human validation edits?", 
    evidenceOptions: ["RLHF_PIPELINE", "GIT_COMMIT_LOGS", "MANUAL_REBUILDS", "NONE"] 
  },

  // --- T3: UNHEDGED AI & CONTEXT EXPOSURE ---
  { 
    id: "EXE_03", lens: "EXE", triangulationId: "T3", weight: 10, 
    text: "Is there a board-approved policy governing unhedged AI tools and restricting unsanctioned prompt data ingestion?", 
    evidenceOptions: ["EMPLOYEE_HANDBOOK", "BOARD_DIRECTIVE", "VERBAL_POLICY", "NONE"] 
  },
  { 
    id: "MGR_03", lens: "MGR", triangulationId: "T3", weight: 10, 
    text: "Has operational leadership established clear human-in-the-loop guidelines for separating safe vs. unsafe AI prompt contexts?", 
    evidenceOptions: ["TRAINING_LOGS", "SECURITY_BRIEFING", "NONE"] 
  },
  { 
    id: "TEC_03", lens: "TEC", triangulationId: "T3", weight: 15, 
    text: "Are API gateways and edge proxies configured to detect and block unauthorized third-party AI endpoint traffic?", 
    evidenceOptions: ["FIREWALL_CONFIG", "API_GATEWAY_RULES", "NONE"] 
  },

  // --- T4: IP & CONTEXT OWNERSHIP ---
  { 
    id: "EXE_04", lens: "EXE", triangulationId: "T4", weight: 15, 
    text: "Does governance maintain formal verification of IP ownership and context boundary rights for all automated AI outputs?", 
    evidenceOptions: ["LEGAL_OPINION", "VENDOR_AGREEMENT", "NONE"] 
  },
  { 
    id: "MGR_04", lens: "MGR", triangulationId: "T4", weight: 8, 
    text: "Are operational teams instructed to run sanitization checks on AI outputs to maintain proprietary quality standards?", 
    evidenceOptions: ["SOP_DOCUMENT", "WORKFLOW_GUIDE", "NONE"] 
  },
  { 
    id: "TEC_04", lens: "TEC", triangulationId: "T4", weight: 12, 
    text: "Do automated pipelines attach cryptographic metadata or watermarks to track generated context vectors across value streams?", 
    evidenceOptions: ["METADATA_TAGS", "VECTOR_REGISTRY", "NONE"] 
  },

  // --- T5: PII MASKING & PURVIEW DLP ---
  { 
    id: "EXE_05", lens: "EXE", triangulationId: "T5", weight: 15, 
    text: "Does enterprise AI usage enforce inline DLP and cryptographic PII data masking to comply with global privacy standards?", 
    evidenceOptions: ["COMPLIANCE_CERT", "PURVIEW_AUDIT_REPORT", "NONE"] 
  },
  { 
    id: "MGR_05", lens: "MGR", triangulationId: "T5", weight: 10, 
    text: "Do managers actively audit prompt payloads for sensitive client information prior to model execution?", 
    evidenceOptions: ["SPOT_CHECKS", "SAMPLING_LOGS", "NONE"] 
  },
  { 
    id: "TEC_05", lens: "TEC", triangulationId: "T5", weight: 15, 
    text: "Is there an inline cryptographic PII-stripping layer running between user interfaces and third-party LLM endpoints?", 
    evidenceOptions: ["API_GATEWAY", "DATA_SCRUBBER_PROXY", "NONE"] 
  },

  // --- T6: SCHEMA & MODEL DRIFT INSULATION ---
  { 
    id: "EXE_06", lens: "EXE", triangulationId: "T6", weight: 10, 
    text: "Is capital allocated specifically for pre-automation insulation, schema verification, and model drift benchmarking?", 
    evidenceOptions: ["BUDGET_LINE_ITEM", "R&D_ALLOCATION", "NONE"] 
  },
  { 
    id: "MGR_06", lens: "MGR", triangulationId: "T6", weight: 10, 
    text: "Is operational management tracking accuracy degradation or schema drift failures in automated workflows over time?", 
    evidenceOptions: ["QUALITY_LOGS", "SME_FEEDBACK", "NONE"] 
  },
  { 
    id: "TEC_06", lens: "TEC", triangulationId: "T6", weight: 15, 
    text: "Are automated continuous integration tests active to detect third-party API mutations and payload schema drift?", 
    evidenceOptions: ["CI_TEST_SUITE", "BENCHMARK_LOGS", "NONE"] 
  },

  // --- T7: HALLUCINATION & CIRCUIT BREAKERS ---
  { 
    id: "EXE_07", lens: "EXE", triangulationId: "T7", weight: 12, 
    text: "Has leadership defined explicit risk allowance ceilings and liability parameters for autonomous decision errors?", 
    evidenceOptions: ["RISK_REGISTER", "INSURANCE_POLICY", "NONE"] 
  },
  { 
    id: "MGR_07", lens: "MGR", triangulationId: "T7", weight: 10, 
    text: "Is there an operational 'Kill-Switch' protocol to freeze automated workflows if logic drift or hallucinations trigger?", 
    evidenceOptions: ["EMERGENCY_SOP", "STEERCO_RUNBOOK", "NONE"] 
  },
  { 
    id: "TEC_07", lens: "TEC", triangulationId: "T7", weight: 15, 
    text: "Do technical pipelines enforce grounding guardrails (e.g., RAG / vector constraints) before model inference runs?", 
    evidenceOptions: ["RAG_PIPELINE", "VECTOR_DB_GUARDS", "NONE"] 
  },

  // --- T8: COST TRANSPARENCY & TOKEN SPEND ---
  { 
    id: "EXE_08", lens: "EXE", triangulationId: "T8", weight: 10, 
    text: "Is the financial return and expense leakage of AI initiatives tracked as an explicit line item on executive dashboards?", 
    evidenceOptions: ["P&L_STATEMENT", "PROMISE_GAP_MODEL", "NONE"] 
  },
  { 
    id: "MGR_08", lens: "MGR", triangulationId: "T8", weight: 8, 
    text: "Do operational leads have real-time visibility into the monthly API and token costs generated by their teams?", 
    evidenceOptions: ["DASHBOARD_ACCESS", "MONTHLY_BILL_ANALYSIS", "NONE"] 
  },
  { 
    id: "TEC_08", lens: "TEC", triangulationId: "T8", weight: 12, 
    text: "Are API calls dynamically tagged by microservice and department to monitor unit economics and suppress overspend?", 
    evidenceOptions: ["API_TAGGING", "COST_CENTER_LOGS", "NONE"] 
  },

  // --- T9: VALIDATION FATIGUE & OVERSIGHT ---
  { 
    id: "EXE_09", lens: "EXE", triangulationId: "T9", weight: 8, 
    text: "Is there a strategic communication plan to manage human-in-the-loop transitions without causing workforce friction?", 
    evidenceOptions: ["HR_COMMS", "CHANGE_MANAGEMENT_SLIDES", "NONE"] 
  },
  { 
    id: "MGR_09", lens: "MGR", triangulationId: "T9", weight: 10, 
    text: "Is team throughput impacted by validation fatigue caused by high volumes of unaggregated system alerts?", 
    evidenceOptions: ["SURVEY_RESULTS", "BURNOUT_FEEDBACK", "NONE"] 
  },
  { 
    id: "TEC_09", lens: "TEC", triangulationId: "T9", weight: 12, 
    text: "Is engineering capacity allocated to building pre-automation control planes or solely firefighting live API errors?", 
    evidenceOptions: ["TRAINING_BUDGET", "SPRINT_ALLOCATION", "NONE"] 
  },

  // --- T10: VENDOR RESILIENCE & MULTI-MODEL REDUNDANCY ---
  { 
    id: "EXE_10", lens: "EXE", triangulationId: "T10", weight: 12, 
    text: "Does the enterprise maintain a model-agnostic redundancy strategy to prevent total lock-in to a single LLM vendor?", 
    evidenceOptions: ["STRATEGY_DECK", "CONTRACT_DIVERSITY", "NONE"] 
  },
  { 
    id: "MGR_10", lens: "MGR", triangulationId: "T10", weight: 10, 
    text: "Could core operational workflows continue functioning if your primary AI provider experienced an extended outage?", 
    evidenceOptions: ["BCP_PLAN", "OFFLINE_RUNBOOK", "NONE"] 
  },
  { 
    id: "TEC_10", lens: "TEC", triangulationId: "T10", weight: 15, 
    text: "Has technical engineering tested hot-swapping or emergency failovers to secondary model providers or local adapters?", 
    evidenceOptions: ["FAILOVER_TEST_LOGS", "ADAPTER_CONFIG", "NONE"] 
  }
];
