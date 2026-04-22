export const FORENSIC_MATRIX = [
  // --- T1: INDEMNITY ---
  { id: "EXE_01", lens: "EXE", triangulationId: "T1", weight: 15, text: "Do your AI vendor contracts include enforceable audit rights for training data?", evidenceOptions: ["CONTRACT_REVIEW", "LEGAL_OPINION", "VERBAL_ASSURANCE", "NONE"] },
  { id: "MGR_01", lens: "MGR", triangulationId: "T1", weight: 10, text: "Is there a documented process for reviewing vendor model updates before production?", evidenceOptions: ["SOP_DOCUMENT", "MANAGEMENT_LOG", "VERBAL_ASSURANCE", "NONE"] },
  { id: "TEC_01", lens: "TEC", triangulationId: "T1", weight: 15, text: "Do we have automated forensic logging to track every data packet sent to third-party LLMs?", evidenceOptions: ["SIEM_LOGS", "API_GATEWAY_TRAFFIC", "CODE_REVIEWS", "NONE"] },

  // --- T2: REWORK TAX ---
  { id: "EXE_02", lens: "EXE", triangulationId: "T2", weight: 12, text: "Is our AI strategy successfully reducing the cost of manual labor in core workflows?", evidenceOptions: ["FINANCIAL_REPORT", "STRATEGY_DECK", "ANECDOTAL", "NONE"] },
  { id: "MGR_02", lens: "MGR", triangulationId: "T2", weight: 15, text: "Do your SMEs spend more than 20% of their day correcting AI-generated drafts?", evidenceOptions: ["TIME_TRACKING", "SME_INTERVIEWS", "OBSERVATION", "NONE"] },
  { id: "TEC_02", lens: "TEC", triangulationId: "T2", weight: 13, text: "Is there a technical feedback loop that retrains models based on human corrections?", evidenceOptions: ["RLHF_PIPELINE", "GIT_LOGS", "MANUAL_REBUILDS", "NONE"] },

  // --- T3: SHADOW AI ---
  { id: "EXE_03", lens: "EXE", triangulationId: "T3", weight: 10, text: "Is there a formal corporate policy forbidding unapproved AI tools for company data?", evidenceOptions: ["EMPLOYEE_HANDBOOK", "LEGAL_MEMO", "VERBAL_POLICY", "NONE"] },
  { id: "MGR_03", lens: "MGR", triangulationId: "T3", weight: 10, text: "Has your team been trained on which specific AI tools are 'Safe' vs 'Unsafe'?", evidenceOptions: ["TRAINING_LOGS", "SECURITY_BRIEFING", "NONE"] },
  { id: "TEC_03", lens: "TEC", triangulationId: "T3", weight: 15, text: "Are we currently using SSL decryption/DNS filtering to block unauthorized AI domains?", evidenceOptions: ["FIREWALL_CONFIG", "DNS_LOGS", "NONE"] },

  // --- T4: IP OWNERSHIP ---
  { id: "EXE_04", lens: "EXE", triangulationId: "T4", weight: 15, text: "Do we have legal confirmation of IP ownership for all AI-generated deliverables?", evidenceOptions: ["LEGAL_OPINION", "VENDOR_AGREEMENT", "NONE"] },
  { id: "MGR_04", lens: "MGR", triangulationId: "T4", weight: 8, text: "Are employees instructed to 'cleanse' AI outputs to ensure original IP standards?", evidenceOptions: ["SOP_DOCUMENT", "WORKFLOW_GUIDE", "NONE"] },
  { id: "TEC_04", lens: "TEC", triangulationId: "T4", weight: 12, text: "Do we use watermarking or metadata to track AI-generated assets?", evidenceOptions: ["METADATA_TAGS", "ASSET_REGISTRY", "NONE"] },

  // --- T5: PII MASKING ---
  { id: "EXE_05", lens: "EXE", triangulationId: "T5", weight: 15, text: "Is our AI usage compliant with global PII/GDPR data masking standards?", evidenceOptions: ["COMPLIANCE_CERT", "AUDIT_REPORT", "NONE"] },
  { id: "MGR_05", lens: "MGR", triangulationId: "T5", weight: 10, text: "Are managers auditing prompts for sensitive client info before submission?", evidenceOptions: ["SPOT_CHECKS", "SAMPLING_LOGS", "NONE"] },
  { id: "TEC_05", lens: "TEC", triangulationId: "T5", weight: 15, text: "Is there an automated PII-stripping layer between staff and the LLM API?", evidenceOptions: ["API_GATEWAY", "DATA_SCRUBBER", "NONE"] },

  // --- T6: MODEL DRIFT ---
  { id: "EXE_06", lens: "EXE", triangulationId: "T6", weight: 10, text: "Is there a budget allocated for periodic model re-validation and bias testing?", evidenceOptions: ["BUDGET_LINE_ITEM", "R&D_PLAN", "NONE"] },
  { id: "MGR_06", lens: "MGR", triangulationId: "T6", weight: 10, text: "Have you noticed a decline in AI output quality over the last 90 days?", evidenceOptions: ["QUALITY_LOGS", "SME_FEEDBACK", "NONE"] },
  { id: "TEC_06", lens: "TEC", triangulationId: "T6", weight: 15, text: "Are we running automated 'Gold Standard' tests to detect model performance drift?", evidenceOptions: ["TEST_SUITE", "BENCHMARKS", "NONE"] },

  // --- T7: HALLUCINATION LIABILITY ---
  { id: "EXE_07", lens: "EXE", triangulationId: "T7", weight: 12, text: "Do we have a defined liability threshold for AI-driven misinformation?", evidenceOptions: ["RISK_REGISTER", "INSURANCE_POLICY", "NONE"] },
  { id: "MGR_07", lens: "MGR", triangulationId: "T7", weight: 10, text: "Is there a 'Kill-Switch' protocol if the AI begins outputting false data?", evidenceOptions: ["EMERGENCY_SOP", "INCIDENT_PLAN", "NONE"] },
  { id: "TEC_07", lens: "TEC", triangulationId: "T7", weight: 15, text: "Are we using 'Grounding' datasets to constrain AI responses to our own data?", evidenceOptions: ["RAG_PIPELINE", "VECTOR_DB", "NONE"] },

  // --- T8: COST TRANSPARENCY ---
  { id: "EXE_08", lens: "EXE", triangulationId: "T8", weight: 10, text: "Is AI ROI being tracked as a line item in the quarterly financial report?", evidenceOptions: ["P&L_STATEMENT", "ROI_MODEL", "NONE"] },
  { id: "MGR_08", lens: "MGR", triangulationId: "T8", weight: 8, text: "Do you have visibility into the monthly API costs generated by your team?", evidenceOptions: ["DASHBOARD_ACCESS", "MONTHLY_BILL", "NONE"] },
  { id: "TEC_08", lens: "TEC", triangulationId: "T8", weight: 12, text: "Are we tagging API calls by department to identify high-cost users?", evidenceOptions: ["API_TAGGING", "COST_CENTER_LOGS", "NONE"] },

  // --- T9: CHANGE MANAGEMENT ---
  { id: "EXE_09", lens: "EXE", triangulationId: "T9", weight: 8, text: "Is there a formal internal communication strategy regarding AI job displacement?", evidenceOptions: ["HR_COMMS", "TOWN_HALL_SLIDES", "NONE"] },
  { id: "MGR_09", lens: "MGR", triangulationId: "T9", weight: 10, text: "Is morale being impacted by the perceived threat of AI automation?", evidenceOptions: ["SURVEY_RESULTS", "1-ON-1_FEEDBACK", "NONE"] },
  { id: "TEC_09", lens: "TEC", triangulationId: "T9", weight: 12, text: "Are we upskilling the technical team to maintain AI infra, or outsourcing it?", evidenceOptions: ["TRAINING_BUDGET", "HIRING_PLAN", "NONE"] },

  // --- T10: VENDOR RESILIENCE ---
  { id: "EXE_10", lens: "EXE", triangulationId: "T10", weight: 12, text: "Do we have a 'Multi-Model' redundancy strategy to prevent vendor lock-in?", evidenceOptions: ["STRATEGY_DECK", "CONTRACT_DIVERSITY", "NONE"] },
  { id: "MGR_10", lens: "MGR", triangulationId: "T10", weight: 10, text: "Could your team operate for 24 hours if our primary AI provider went offline?", evidenceOptions: ["BCP_PLAN", "OFFLINE_SOP", "NONE"] },
  { id: "TEC_10", lens: "TEC", triangulationId: "T10", weight: 15, text: "Have we tested an 'Emergency Rollback' to a local/open-source model?", evidenceOptions: ["DISASTER_RECOVERY_TEST", "LOCAL_LLM_CONFIG", "NONE"] }
];
