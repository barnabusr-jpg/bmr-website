import { STRESS_TEST_MANIFEST } from "../data/stressTestManifest";
import { UserResponse } from "../data/types";
import { calculateReworkTax, calculateVulnerabilityCoefficient } from "./forensicMath";

export const analyzeForensicResults = (responses: UserResponse[]) => {
  let totalProjectedLoss = 0;
  const contradictions: any[] = [];

  // Filter the manifest for nodes that have cross-lens requirements
  STRESS_TEST_MANIFEST.forEach(node => {
    if (node.crossLensId) {
      const respA = responses.find(r => r.nodeId === node.id);
      const respB = responses.find(r => r.nodeId === node.crossLensId);

      // TRIGGER: The Structural Contradiction
      // Lens A (Policy/Strategy) says "Yes" while Lens B (Reality/Execution) says "No"
      if (respA?.answer === true && respB?.answer === false) {
        
        // Calculate Vulnerability (Institutional Blindness)
        const vulnMod = calculateVulnerabilityCoefficient(respA.confidence, respA.evidence);
        
        // Calculate Rework Tax compounding over 12 months
        // Base impact is node weight * 1000
        const financial = calculateReworkTax(
          node.weight * 1000, 
          12, 
          node.techDebtMultiplier * vulnMod
        );

        contradictions.push({
          id: node.id,
          zone: node.zone,
          verdict: node.verdict,
          impact: financial.projectedTwoYearLoss,
          severity: node.weight > 12 ? "CRITICAL" : "HIGH",
          vulnerability: vulnMod > 1 ? "BLIND_SPOT" : "KNOWLEDGE_GAP"
        });

        totalProjectedLoss += financial.projectedTwoYearLoss;
      }
    }
  });

  // Calculate Friction Index (Percentage of linked pairs that contradicted)
  const totalPairs = STRESS_TEST_MANIFEST.filter(n => n.crossLensId).length / 2;
  const frictionIndex = (contradictions.length / totalPairs) * 100;

  return {
    contradictions,
    totalProjectedLoss,
    frictionIndex,
    timestamp: new Date().toISOString()
  };
};
