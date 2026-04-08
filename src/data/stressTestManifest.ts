export type Lens = "EXECUTIVE" | "MANAGERIAL" | "TECHNICAL";
export type ConflictZone = "FIDUCIARY" | "OPERATIONAL" | "INFRASTRUCTURE";
export type EvidenceBasis = "AUDIT_LOG" | "CODE_REVIEW" | "INTERVIEW" | "VERBAL_ASSURANCE" | "NONE";

export interface StressTestNode {
  id: string;
  lens: Lens;
  zone: ConflictZone;
  text: string;
  weight: number; 
  crossLensId?: string; 
  verdict: string;
  techDebtMultiplier: number;
}

export const STRESS_TEST_MANIFEST: StressTestNode[] = [
  // ZONE A: FIDUCIARY/TECHNICAL (Sample Nodes - Expand to 10)
  {
    id: "fid_exe_01",
    zone: "FIDUCIARY",
    lens: "EXECUTIVE",
    text: "Does your AI vendor contract include a 'Right to Audit' clause for forensic trail verification?",
    weight: 15,
    crossLensId: "fid_tech_01",
    verdict: "FIDUCIARY_FRACTURE: Executive assumes auditability; Technical reality confirms zero forensic logging.",
    techDebtMultiplier: 1.8
  },
  {
    id: "fid_tech_01",
    zone: "INFRASTRUCTURE",
    lens: "TECHNICAL",
    text: "Are AI-generated outputs traceable to the exact model weights used for production?",
    weight: 15,
    crossLensId: "fid_exe_01",
    verdict: "INDEMNITY_COLLAPSE: Traceability is missing, making vendor indemnity legally unenforceable.",
    techDebtMultiplier: 1.8
  },
  // ZONE B: OPERATIONAL/LOGIC (Sample Nodes - Expand to 10)
  {
    id: "op_mgr_01",
    zone: "OPERATIONAL",
    lens: "MANAGERIAL",
    text: "Is the time spent correcting AI errors tracked as an operational cost or absorbed into overhead?",
    weight: 12,
    crossLensId: "op_tech_01",
    verdict: "REWORK_TAX_LEAK: Manual fixes are undocumented, creating a hidden labor sink.",
    techDebtMultiplier: 1.3
  }
  // ... Full 30-node array continues here
];
