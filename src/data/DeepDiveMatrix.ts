export type DiagnosticZone = "FIDUCIARY" | "OPERATIONAL" | "INFRASTRUCTURE";
export type Lens = "EXECUTIVE" | "MANAGERIAL" | "TECHNICAL";

export interface DeepDiveQuestion {
  id: string;
  zone: DiagnosticZone;
  lens: Lens;
  text: string;
  crossLensId: string;
  weight: number;
  chapter: string; // Legacy HAI/AVS/IGF mapping
}

export const DEEP_DIVE_QUESTIONS: DeepDiveQuestion[] = [
  // --- ZONE A: FIDUCIARY (10 Total) ---
  {
    id: "A_EXE_01",
    zone: "FIDUCIARY",
    lens: "EXECUTIVE",
    text: "Do your AI vendor contracts include enforceable audit rights to verify model outputs and training data?",
    crossLensId: "A_TEC_01",
    weight: 15,
    chapter: "HAI_01: Trust & Transparency"
  },
  {
    id: "A_TEC_01",
    zone: "FIDUCIARY",
    lens: "TECHNICAL",
    text: "Can you trace AI-generated outputs back to the specific model version and training data used?",
    crossLensId: "A_EXE_01",
    weight: 15,
    chapter: "AVS_04: Decision_Explainability"
  },
  {
    id: "A_EXE_02",
    zone: "FIDUCIARY",
    lens: "EXECUTIVE",
    text: "Has leadership defined acceptable error rates (thresholds) for AI outputs in client-facing work?",
    crossLensId: "A_MGR_01",
    weight: 12,
    chapter: "HAI_02: Expectation_Continuity"
  },
  {
    id: "A_MGR_01",
    zone: "FIDUCIARY",
    lens: "MANAGERIAL",
    text: "Are AI-related error rates tracked and reported to leadership on a formal monthly cadence?",
    crossLensId: "A_EXE_02",
    weight: 10,
    chapter: "AVS_01: Strategic_Alignment"
  },
  {
    id: "A_TEC_02",
    zone: "FIDUCIARY",
    lens: "TECHNICAL",
    text: "Is there a tested and documented rollback protocol for autonomous AI systems in case of logic failure?",
    crossLensId: "A_EXE_03",
    weight: 14,
    chapter: "IGF_03: Safeguarding_Loop"
  },
  {
    id: "A_EXE_03",
    zone: "FIDUCIARY",
    lens: "EXECUTIVE",
    text: "Does the organizational AI framework mandate model versioning and disaster recovery protocols?",
    crossLensId: "A_TEC_02",
    weight: 12,
    chapter: "AVS_02: Risk_Mitigation"
  },
  {
    id: "A_MGR_02",
    zone: "FIDUCIARY",
    lens: "MANAGERIAL",
    text: "Are AI failures (logic drift/hallucinations) logged and analyzed for root-cause prevention?",
    crossLensId: "A_TEC_04",
    weight: 10,
    chapter: "IGF_01: Institutional_Memory"
  },
  {
    id: "A_TEC_03",
    zone: "FIDUCIARY",
    lens: "TECHNICAL",
    text: "How are API keys and sensitive credentials managed: are they stored in plaintext or a secrets vault?",
    crossLensId: "C_EXE_01",
    weight: 15,
    chapter: "IGF_02: Data_Security"
  },
  {
    id: "A_EXE_04",
    zone: "FIDUCIARY",
    lens: "EXECUTIVE",
    text: "Is there a formal compliance review process for AI-generated content before it reaches the end client?",
    crossLensId: "B_MGR_02",
    weight: 13,
    chapter: "HAI_03: Accountability"
  },
  {
    id: "A_TEC_04",
    zone: "FIDUCIARY",
    lens: "TECHNICAL",
    text: "Do you monitor production AI models in real-time for performance degradation or logic drift?",
    crossLensId: "A_MGR_02",
    weight: 14,
    chapter: "AVS_03: Quality_Control"
  },

  // --- ZONE B: OPERATIONAL (10 Total) ---
  {
    id: "B_MGR_01",
    zone: "OPERATIONAL",
    lens: "MANAGERIAL",
    text: "When Subject Matter Experts (SMEs) correct AI outputs, are those corrections fed back into model training?",
    crossLensId: "B_TEC_01",
    weight: 14,
    chapter: "IGF_04: Learning_Velocity"
  },
  {
    id: "B_TEC_01",
    zone: "OPERATIONAL",
    lens: "TECHNICAL",
    text: "Is there an automated process to incorporate human-in-the-loop corrections into the training data set?",
    crossLensId: "B_MGR_01",
    weight: 12,
    chapter: "AVS_05: Logic_Resonance"
  },
  {
    id: "B_EXE_01",
    zone: "OPERATIONAL",
    lens: "EXECUTIVE",
    text: "Has the organization quantified the total labor cost spent 'fixing' AI outputs this quarter?",
    crossLensId: "B_MGR_03",
    weight: 15,
    chapter: "HAI_04: Operational_Empathy"
  },
  {
    id: "B_MGR_02",
    zone: "OPERATIONAL",
    lens: "MANAGERIAL",
    text: "Is AI productivity measured by raw volume of output or by the ratio of finished-quality accuracy?",
    crossLensId: "A_EXE_04",
    weight: 11,
    chapter: "AVS_06: SME_Authority"
  },
  {
    id: "B_TEC_02",
    zone: "OPERATIONAL",
    lens: "TECHNICAL",
    text: "Do you use automated testing to validate AI outputs against 'ground truth' data before deployment?",
    crossLensId: "B_MGR_01",
    weight: 13,
    chapter: "IGF_05: Automated_QA"
  },
  {
    id: "B_EXE_02",
    zone: "OPERATIONAL",
    lens: "EXECUTIVE",
    text: "Is there a formal process to escalate AI performance failures to leadership once error thresholds are met?",
    crossLensId: "A_MGR_02",
    weight: 10,
    chapter: "HAI_05: Systemic_Feedback"
  },
  {
    id: "B_MGR_03",
    zone: "OPERATIONAL",
    lens: "MANAGERIAL",
    text: "Are SMEs required to document corrections to AI outputs to identify systematic model failure points?",
    crossLensId: "B_EXE_01",
    weight: 12,
    chapter: "AVS_07: Knowledge_Retention"
  },
  {
    id: "B_TEC_03",
    zone: "OPERATIONAL",
    lens: "TECHNICAL",
    text: "Does the data architecture support recurring model retraining based on SME-validated edits?",
    crossLensId: "B_TEC_01",
    weight: 11,
    chapter: "IGF_06: Architectural_Resilience"
  },
  {
    id: "B_EXE_03",
    zone: "OPERATIONAL",
    lens: "EXECUTIVE",
    text: "Is the cost of AI rework tracked and reported as a separate line item in your financial statements?",
    crossLensId: "B_MGR_03",
    weight: 14,
    chapter: "HAI_06: Fiscal_Integrity"
  },
  {
    id: "B_TEC_04",
    zone: "OPERATIONAL",
    lens: "TECHNICAL",
    text: "Do you have automated alerts triggered when AI outputs deviate from expected business logic?",
    crossLensId: "B_MGR_02",
    weight: 12,
    chapter: "AVS_08: Alert_Integrity"
  },

  // --- ZONE C: INFRASTRUCTURE (10 Total) ---
  {
    id: "C_TEC_01",
    zone: "INFRASTRUCTURE",
    lens: "TECHNICAL",
    text: "Have your network logs detected data uploads to unapproved browser-based LLM tools recently?",
    crossLensId: "C_EXE_01",
    weight: 15,
    chapter: "IGF_07: Shadow_AI_Detection"
  },
  {
    id: "C_EXE_01",
    zone: "INFRASTRUCTURE",
    lens: "EXECUTIVE",
    text: "Does the organization enforce a strict whitelist of approved AI endpoints for all staff?",
    crossLensId: "C_TEC_01",
    weight: 14,
    chapter: "HAI_07: Endpoint_Security"
  },
  {
    id: "C_MGR_01",
    zone: "INFRASTRUCTURE",
    lens: "MANAGERIAL",
    text: "Are employees required to use only approved AI tools, or is there a 'grey area' policy in effect?",
    crossLensId: "C_EXE_02",
    weight: 12,
    chapter: "AVS_09: Policy_Fidelity"
  },
  {
    id: "C_TEC_02",
    zone: "INFRASTRUCTURE",
    lens: "TECHNICAL",
    text: "Have any proprietary datasets been shared with third-party AI providers via API in the last 30 days?",
    crossLensId: "C_EXE_03",
    weight: 15,
    chapter: "IGF_08: IP_Exfiltration_Risk"
  },
  {
    id: "C_EXE_02",
    zone: "INFRASTRUCTURE",
    lens: "EXECUTIVE",
    text: "Is there a formal policy with consequences for using unapproved AI tools with sensitive data?",
    crossLensId: "C_MGR_01",
    weight: 11,
    chapter: "HAI_08: Governance_Enforcement"
  },
  {
    id: "C_MGR_02",
    zone: "INFRASTRUCTURE",
    lens: "MANAGERIAL",
    text: "Do you conduct regular internal audits specifically to detect 'Shadow AI' usage within teams?",
    crossLensId: "C_TEC_04",
    weight: 13,
    chapter: "AVS_10: Internal_Compliance"
  },
  {
    id: "C_TEC_03",
    zone: "INFRASTRUCTURE",
    lens: "TECHNICAL",
    text: "Is your rollback protocol tested regularly against live autonomous agent failures?",
    crossLensId: "A_TEC_02",
    weight: 14,
    chapter: "IGF_09: Operational_Hardening"
  },
  {
    id: "C_EXE_03",
    zone: "INFRASTRUCTURE",
    lens: "EXECUTIVE",
    text: "Has the organization quantified the financial and operational risk of a proprietary data leak via AI?",
    crossLensId: "C_TEC_02",
    weight: 15,
    chapter: "HAI_09: Risk_Appetite"
  },
  {
    id: "C_MGR_03",
    zone: "INFRASTRUCTURE",
    lens: "MANAGERIAL",
    text: "Are there clear consequences for employees who bypass AI governance protocols with company data?",
    crossLensId: "C_EXE_02",
    weight: 10,
    chapter: "AVS_11: Cultural_Alignment"
  },
  {
    id: "C_TEC_04",
    zone: "INFRASTRUCTURE",
    lens: "TECHNICAL",
    text: "Do you use automated network-level blocking to prevent unauthorized AI tool access?",
    crossLensId: "C_MGR_02",
    weight: 14,
    chapter: "IGF_10: Technical_Immunization"
  }
];
