export const diagnosticDimensions = [
  {
    id: "expectation-continuity",
    title: "Expectation Continuity",
    description: "How often assumptions and commitments are revisited once initiatives are underway.",
    questions: [
      { id: "q01", prompt: "When AI-related decisions are made, how often do teams later revisit or reinterpret what was originally agreed?", enhancement: "When decisions are revisited later, teams often lose momentum and spend time renegotiating assumptions instead of moving work forward." },
      { id: "q08", prompt: "Over time, how stable have expectations about what AI should deliver been across leadership, delivery teams, and end users?" },
      { id: "q12", prompt: "How often do AI-related initiatives continue forward even when underlying concerns remain unresolved?", enhancement: "When initiatives move ahead despite unresolved concerns, risk tends to accumulate beneath the surface." }
    ]
  },
  {
    id: "decision-explainability",
    title: "Decision Explainability",
    description: "How confidently outcomes can be explained across leadership, delivery, and operational roles.",
    questions: [
      { id: "q02", prompt: "How confident are people affected by AI-driven outcomes that they understand why those outcomes occurred?" },
      { id: "q03", prompt: "When AI recommendations conflict with human judgment, how consistently is there clarity on which one prevails and why?", enhancement: "Lack of clarity in these moments often leads teams to hesitate or defer decisions rather than act decisively." },
      { id: "q09", prompt: "How confident are leaders when explaining AI-related decisions to stakeholders who question outcomes or tradeoffs?" }
    ]
  },
  {
    id: "accountability-experience",
    title: "Accountability Experience",
    description: "How clear ownership feels when results diverge from expectations.",
    questions: [
      { id: "q04", prompt: "How often do teams hesitate to rely on AI outputs because they are unsure how those outputs will be received by leadership or stakeholders?", enhancement: "When teams worry about reception, they may avoid using AI outputs altogether or add informal workarounds." },
      { id: "q05", prompt: "How often do AI-related issues surface only after they have already impacted users, customers, or operations?" },
      { id: "q10", prompt: "When AI-related outcomes fall short of expectations, how clear is accountability for addressing the gap?" }
    ]
  },
  {
    id: "adaptive-behavior",
    title: "Adaptive Behavior",
    description: "How frequently teams adjust informally rather than escalate uncertainty through formal channels.",
    questions: [
      { id: "q06", prompt: "When AI-related concerns are raised, how predictable is the path to resolution?" },
      { id: "q07", prompt: "How frequently do teams work around AI systems rather than through them to get work done?", enhancement: "Workarounds can quietly become the norm, masking deeper friction in day-to-day operations." },
      { id: "q11", prompt: "How sustainable does your organization’s current pace of AI change feel to the people expected to absorb it?" }
    ]
  }
];

export const responseOptions = [
  { key: "top", label: "Rarely / Very confident / Very clear / Very sustainable" },
  { key: "upper_mid", label: "Occasionally / Somewhat confident / Somewhat clear / Mostly sustainable" },
  { key: "lower_mid", label: "Mixed / Inconsistent / Shifting / Strained" },
  { key: "bottom", label: "Frequently / Rarely confident / Rarely clear / Unsustainable" },
  { key: "not_sure", label: "Not sure" }
];
