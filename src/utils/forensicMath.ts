export function calculateReworkTax(baseImpact: number, months: number = 24, multiplier: number = 1.0) {
  const MONTHLY_COMPOUND_RATE = 1.20; // 20% monthly friction growth
  const baseWithMultiplier = baseImpact * multiplier;
  const projectedCost = baseWithMultiplier * Math.pow(MONTHLY_COMPOUND_RATE, months);
  
  return {
    currentAnnualLoss: baseImpact * 12,
    projectedTwoYearLoss: projectedCost,
    costOfDelayPerMonth: (projectedCost - baseWithMultiplier) / months
  };
}

export function calculateVulnerabilityCoefficient(confidence: string, evidence: EvidenceBasis) {
  if (confidence === "HIGH" && (evidence === "VERBAL_ASSURANCE" || evidence === "NONE")) {
    return 2.5; // Institutional Blindness Trigger
  }
  return 1.0;
}
