export interface Question {
  id: string;
  zone: 'reworkTax' | 'shadowAI' | 'expertiseDebt' | 'deltaGap';
  text: string;
  options: { label: string; value: number }[];
}

export const FORENSIC_QUESTIONS: Question[] = [
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
    id: "SA_01",
    zone: "shadowAI",
    text: "To what extent are undocumented LLM workarounds used to bypass system friction?",
    options: [
      { label: "None / Sanctioned Only", value: 1 },
      { label: "Isolated Departmental Use", value: 5 },
      { label: "Ubiquitous / Mission Critical", value: 10 }
    ]
  }
  // Additional questions follow this value mapping...
];
