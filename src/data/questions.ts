export interface Question {
  id: string;
  zone: 'reworkTax' | 'shadowAI' | 'expertiseDebt' | 'deltaGap';
  text: string;
  options: { label: string; value: number }[];
}

export const FORENSIC_QUESTIONS: Question[] = [
  // --- ZONE: REWORK TAX (RT) ---
  {
    id: "RT_01",
    zone: "reworkTax",
    text: "What level of manual verification is required for AI-generated operational outputs?",
    options: [
      { label: "Minimal / Spot Checks", value: 2 },
      { label: "Significant / Layered Review", value: 6 },
      { label: "Total / Full Rework Required", value: 10 }
    ]
  },
  {
    id: "RT_02",
    zone: "reworkTax",
    text: "Frequency of 'Correction Loops' required to align AI output with brand/technical standards?",
    options: [
      { label: "Rarely / Self-Correcting", value: 2 },
      { label: "Occasional / Pattern-Based", value: 6 },
      { label: "Constant / Per-Output Basis", value: 10 }
    ]
  },
  {
    id: "RT_03",
    zone: "reworkTax",
    text: "Internal confidence in first-pass AI accuracy for client-facing deliverables?",
    options: [
      { label: "High / Verifiable", value: 2 },
      { label: "Moderate / Skeptical", value: 6 },
      { label: "Low / Untrustworthy", value: 10 }
    ]
  },

  // --- ZONE: SHADOW AI (SA) ---
  {
    id: "SA_01",
    zone: "shadowAI",
    text: "To what extent are undocumented LLM workarounds used to bypass system friction?",
    options: [
      { label: "None / Sanctioned Only", value: 1 },
      { label: "Isolated Departmental Use", value: 5 },
      { label: "Ubiquitous / Mission Critical", value: 10 }
    ]
  },
  {
    id: "SA_02",
    zone: "shadowAI",
    text: "Presence of personal AI accounts (ChatGPT/Claude) used for corporate data processing?",
    options: [
      { label: "Strictly Prohibited/Monitored", value: 2 },
      { label: "Implicitly Tolerated", value: 6 },
      { label: "Primary Workflow Driver", value: 10 }
    ]
  },
  {
    id: "SA_03",
    zone: "shadowAI",
    text: "Maturity of centralized prompt-libraries versus individual 'secret' prompts?",
    options: [
      { label: "Centralized / Audited", value: 2 },
      { label: "Fragmented / Informal", value: 6 },
      { label: "Non-Existent / Invisible", value: 10 }
    ]
  },

  // --- ZONE: EXPERTISE DEBT (ED) ---
  {
    id: "ED_01",
    zone: "expertiseDebt",
    text: "How much tribal knowledge is required to interpret system error logs or AI failures?",
    options: [
      { label: "Documented / Standardized", value: 2 },
      { label: "Requires Senior Oversight", value: 6 },
      { label: "Single-Point-of-Failure Dependencies", value: 10 }
    ]
  },
  {
    id: "ED_02",
    zone: "expertiseDebt",
    text: "Internal capability to explain 'The Why' behind an AI-generated decision?",
    options: [
      { label: "Natively Transparent", value: 2 },
      { label: "Vaguely Heuristic", value: 6 },
      { label: "Black-Box Dependency", value: 10 }
    ]
  },
  {
    id: "ED_03",
    zone: "expertiseDebt",
    text: "Speed of onboarding new operators to maintain current AI-integrated workflows?",
    options: [
      { label: "Hours / Days (Process-Driven)", value: 2 },
      { label: "Weeks (Expertise-Heavy)", value: 6 },
      { label: "Months (Tribal-Knowledge-Bound)", value: 10 }
    ]
  },

  // --- ZONE: DELTA GAP (DG) ---
  {
    id: "DG_01",
    zone: "deltaGap",
    text: "Discrepancy between promised AI efficiency and actual bottom-line margin expansion?",
    options: [
      { label: "< 5% Variance", value: 2 },
      { label: "10% - 25% Variance", value: 6 },
      { label: "> 30% / Net Negative", value: 10 }
    ]
  },
  {
    id: "DG_02",
    zone: "deltaGap",
    text: "Observed 'Drift' in system performance over the last 90 days?",
    options: [
      { label: "Negligible / Improving", value: 2 },
      { label: "Noticeable Decay", value: 6 },
      { label: "Critical Failure Rate Increase", value: 10 }
    ]
  },
  {
    id: "DG_03",
    zone: "deltaGap",
    text: "Estimated time-to-recovery in the event of a primary LLM API outage?",
    options: [
      { label: "Immediate (Fallback Active)", value: 2 },
      { label: "1-3 Days (Significant Friction)", value: 6 },
      { label: "Indefinite (Full Shutdown)", value: 10 }
    ]
  }
];
