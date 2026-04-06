export interface Option {
  label: string;
  weight: number;
  impact: string;
}

export interface Question {
  id: string;
  protocol: 'reworkTax' | 'shadowAI' | 'expertiseDebt' | 'deltaGap';
  text: string;
  options: Option[];
  fieldGuideRef: string;
}

export const FORENSIC_QUESTIONS: Question[] = [
  // HAI QUESTIONS -> REWORK TAX
  {
    id: "RT_01",
    protocol: "reworkTax",
    text: "AI standard operating procedures (SOPs) are documented and followed.",
    fieldGuideRef: "FG-BMR-RT-01",
    options: [
      { label: "Non-existent", weight: 10, impact: "High Rework Risk" },
      { label: "Ad-hoc/Manual", weight: 6, impact: "Manual Friction" },
      { label: "Formalized", weight: 4, impact: "Managed Risk" },
      { label: "Automated/Optimized", weight: 2, impact: "Zero Waste" }
    ]
  },
  {
    id: "RT_02",
    protocol: "reworkTax",
    text: "Our organization has a clear AI ethics and governance framework.",
    fieldGuideRef: "FG-BMR-RT-02",
    options: [
      { label: "No framework", weight: 10, impact: "Compliance Hemorrhage" },
      { label: "Basic guidelines", weight: 6, impact: "Policy Drift" },
      { label: "Comprehensive policy", weight: 4, impact: "Stable" },
      { label: "Audited compliance", weight: 2, impact: "Shielded" }
    ]
  },
  {
    id: "RT_03",
    protocol: "reworkTax",
    text: "AI roles and responsibilities are clearly defined across teams.",
    fieldGuideRef: "FG-BMR-RT-03",
    options: [
      { label: "Undefined", weight: 10, impact: "Logic Fragmentation" },
      { label: "Informal roles", weight: 6, impact: "Expertise Silos" },
      { label: "Dedicated AI team", weight: 4, impact: "Structural Clarity" },
      { label: "Cross-functional matrix", weight: 2, impact: "Optimized" }
    ]
  },
  // AVS QUESTIONS -> DELTA GAP
  {
    id: "DG_01",
    protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    fieldGuideRef: "FG-BMR-DG-01",
    options: [
      { label: "Not tracked", weight: 10, impact: "Value Leakage" },
      { label: "Anecdotal evidence", weight: 6, impact: "Unverified Gains" },
      { label: "Specific KPIs", weight: 4, impact: "ROI Stable" },
      { label: "Direct revenue impact", weight: 2, impact: "ROI Maximized" }
    ]
  },
  {
    id: "DG_02",
    protocol: "deltaGap",
    text: "AI initiatives are aligned with the core strategic vision.",
    fieldGuideRef: "FG-BMR-DG-02",
    options: [
      { label: "Disconnected", weight: 10, impact: "Capital Waste" },
      { label: "Loosely aligned", weight: 6, impact: "Strategic Drift" },
      { label: "Strategically integrated", weight: 4, impact: "Aligned Growth" },
      { label: "Strategy-driven AI", weight: 2, impact: "Unified Vision" }
    ]
  },
  {
    id: "DG_03",
    protocol: "deltaGap",
    text: "We have a dedicated budget and resources for AI scaling.",
    fieldGuideRef: "FG-BMR-DG-03",
    options: [
      { label: "No budget", weight: 10, impact: "Stagnation Risk" },
      { label: "Project-based funding", weight: 6, impact: "Fragmented Scaling" },
      { label: "Annual AI budget", weight: 4, impact: "Stable Resource" },
      { label: "Venture-scale pool", weight: 2, impact: "Hyper-Growth" }
    ]
  },
  {
    id: "DG_04",
    protocol: "deltaGap",
    text: "Customer value is a primary driver for AI implementation.",
    fieldGuideRef: "FG-BMR-DG-04",
    options: [
      { label: "Internal focus only", weight: 10, impact: "Market Blindness" },
      { label: "Secondary priority", weight: 6, impact: "Low Capture" },
      { label: "Key success metric", weight: 4, impact: "Value Aligned" },
      { label: "Core proposition", weight: 2, impact: "Market Leading" }
    ]
  }
  // (Continue for remaining 5 questions to complete the 12 set)
];
