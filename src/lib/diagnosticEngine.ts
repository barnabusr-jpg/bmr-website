import { IntakeAnswers, DiagnosticCalculations } from "@/types/diagnostic";

/**
 * Calculates deterministic diagnostic metrics based on input vector scores.
 * All arithmetic is strictly bounded and uninfluenced by external network state.
 */
export function calculateDiagnosticMetrics(answers: IntakeAnswers): DiagnosticCalculations {
  const scores = answers?.vectorScores || {};
  const scoreValues = Object.values(scores);

  // 1. Calculate average vector score (bounded 1.0 to 5.0)
  const totalScore = scoreValues.reduce((acc, val) => acc + (Number(val) || 3), 0);
  const avgScore = scoreValues.length > 0 ? totalScore / scoreValues.length : 3;

  // 2. Compute Readiness Index (0 to 100)
  const readinessIndex = Math.min(100, Math.max(0, Math.round(avgScore * 20)));

  // 3. Compute Base Financial Factors
  const deficiencyRatio = (100 - readinessIndex) / 100;
  const BASE_ANNUAL_CAPACITY_HOURS = 12500; // Baseline annual operational hours in scope
  const BASE_HOURLY_REWORK_RATE = 85;       // Blended hourly cost of operational rework

  // 4. Calculate Process Waste Tax (Annualized financial drag from unverified rework)
  const processWasteTax = Math.round(
    BASE_ANNUAL_CAPACITY_HOURS * deficiencyRatio * BASE_HOURLY_REWORK_RATE
  );

  // 5. Calculate Promise Gap™ Annualized Exposure
  const riskMultiplier = 1.85;
  const promiseGapExposure = Math.round(processWasteTax * riskMultiplier);

  // 6. Compute Operational Metrics
  const annualCapacityHours = Math.round(BASE_ANNUAL_CAPACITY_HOURS * deficiencyRatio);
  const weeklyBurnRate = Math.round(processWasteTax / 52);
  const recoveryMultiplier = Number((1 + deficiencyRatio * 0.5).toFixed(2));

  return {
    readinessIndex,
    processWasteTax,
    promiseGapExposure,
    annualCapacityHours,
    weeklyBurnRate,
    recoveryMultiplier
  };
}
