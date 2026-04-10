import { DEEP_DIVE_QUESTIONS } from "../data/DeepDiveMatrix";

export const calculateDeepDiveVerdict = (allResponses: any[]) => {
  let systemicFriction = 0;
  let totalPotentialRisk = 0;
  const detectedFractures: any[] = [];

  // 1. TRIANGULATION LOGIC: Detect mismatches across crossLensId
  DEEP_DIVE_QUESTIONS.forEach(q => {
    if (q.lens === "EXECUTIVE") {
      const exeResponse = allResponses.find(r => r.question_id === q.id);
      const tecResponse = allResponses.find(r => r.question_id === q.crossLensId);

      // CRITICAL FRACTURE: Executive assumes safety, Technical confirms gap
      if (exeResponse?.value.includes("High") && tecResponse?.value.includes("Zero")) {
        detectedFractures.push({
          id: `FRACTURE_${q.zone}`,
          severity: "CRITICAL",
          impact: q.weight * 2.5,
          description: `Logic Shear Detected: Executive intent in ${q.zone} is not supported by technical architecture.`
        });
        systemicFriction += q.weight * 2.5;
      }
    }
    totalPotentialRisk += q.weight;
  });

  // 2. VULNERABILITY CALCULATION
  const vulnerabilityAvg = allResponses.reduce((acc, r) => acc + (r.vulnerability_multiplier || 1), 0) / allResponses.length;
  
  // 3. STRUCTURAL RESILIENCE INDEX (SRI)
  const sri = Math.max(0, Math.round(100 - (systemicFriction / 5)));

  return {
    sri, // 0-100 score
    vulnerabilityIndex: vulnerabilityAvg.toFixed(2),
    fractures: detectedFractures,
    isCompliant: sri > 80
  };
};
