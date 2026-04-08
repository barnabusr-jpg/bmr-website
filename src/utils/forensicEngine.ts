import { STRESS_TEST_MANIFEST, StressTestNode } from "../data/stressTestManifest";
import { calculateReworkTax, calculateVulnerabilityCoefficient } from "./forensicMath";

export function analyzeStressTest(userAnswers: any) {
  const contradictions: any[] = [];
  let totalImpact = 0;

  STRESS_TEST_MANIFEST.forEach(node => {
    if (node.crossLensId) {
      const currentAnswer = userAnswers[node.id]; // e.g., { val: true, conf: 'HIGH', env: 'VERBAL' }
      const correlatedAnswer = userAnswers[node.crossLensId];

      // Logic Trap: Exec says "Yes" vs Tech says "No"
      if (currentAnswer?.val === true && correlatedAnswer?.val === false) {
        const vulnMod = calculateVulnerabilityCoefficient(currentAnswer.conf, currentAnswer.env);
        const impact = calculateReworkTax(node.weight * 1000, 24, node.techDebtMultiplier * vulnMod);
        
        contradictions.push({
          id: node.id,
          verdict: node.verdict,
          impact: impact.projectedTwoYearLoss,
          zone: node.zone
        });
        totalImpact += impact.projectedTwoYearLoss;
      }
    }
  });

  return { contradictions, totalImpact, frictionIndex: (contradictions.length / 15) * 100 };
}
