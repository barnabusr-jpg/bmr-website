export const FORENSIC_MATRIX = [
  // --- TRIANGLE 1: INDEMNITY ---
  { 
    id: "EXE_01", lens: "EXECUTIVE", triangulationId: "T1", weight: 15,
    text: "Do your AI vendor contracts include enforceable audit rights for training data?",
    evidenceOptions: ["CONTRACT_REVIEW", "LEGAL_OPINION", "VERBAL_ASSURANCE", "NONE"]
  },
  { 
    id: "MGR_01", lens: "MANAGER", triangulationId: "T1", weight: 10,
    text: "Is there a documented process for reviewing vendor model updates before production?",
    evidenceOptions: ["SOP_DOCUMENT", "MANAGEMENT_LOG", "VERBAL_ASSURANCE", "NONE"]
  },
  { 
    id: "TEC_01", lens: "TECHNICAL", triangulationId: "T1", weight: 15,
    text: "Do we have automated forensic logging to track every data packet sent to third-party LLMs?",
    evidenceOptions: ["SIEM_LOGS", "API_GATEWAY_TRAFFIC", "CODE_REVIEWS", "NONE"]
  },
  // ... (Follow this pattern for the remaining 9 triangles discussed)
];
