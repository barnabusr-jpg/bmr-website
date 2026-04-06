export const diagnosticNarratives: Record<string, { high: string; low: string }> = {
  reworkTax: {
    high: "CRITICAL: Manual verification cycles are consuming >40% of output velocity. Systemic rework is currently your primary capital drain.",
    low: "STABLE: Rework cycles are within acceptable margins, though minor logic drift is present in edge cases."
  },
  shadowAI: {
    high: "WARNING: High levels of unsanctioned LLM usage detected. Tribal workarounds are masking underlying architectural failures.",
    low: "HEALTHY: AI usage is centralized and documented. Minimal evidence of shadow operational bypasses."
  },
  expertiseDebt: {
    high: "URGENT: Operational continuity is dependent on specific individuals. Interpretation of system output requires high tribal knowledge.",
    low: "SECURE: System logic is self-documenting. Expertise requirements are distributed and resilient."
  }
};
