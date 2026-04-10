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
  // ZONE: FIDUCIARY (10 Total)
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
  // ... (Add remaining 28 questions using this structure)
];
