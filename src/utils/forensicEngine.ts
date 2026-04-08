import { STRESS_TEST_MANIFEST, StressTestNode } from "../data/stressTestManifest";

export interface ForensicResponse {
  nodeId: string;
  answer: boolean;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  evidence: "AUDIT_LOG" | "CODE_REVIEW" | "INTERVIEW" | "VERBAL_ASSURANCE" | "NONE";
}

export const analyzeForensicResults = (responses: ForensicResponse[]) => {
  let totalProjectedLoss = 0;
  const contradictions: any[] = [];

  STRESS_TEST_MANIFEST.forEach(node => {
    if (node.crossLensId) {
      const respA = responses.find(r => r.nodeId === node.id);
      const respB = responses.find(r => r.nodeId === node.crossLensId);

      // TRIGGER: Executive says "Yes" while Tech says "No"
      if (respA?.answer === true && respB?.answer === false) {
        // Apply "Institutional Blindness" Multiplier (2.5x if High Confidence + Verbal Evidence)
        const vulnMod = (respA.confidence === "HIGH" && respA.evidence === "VERBAL_ASSURANCE") ? 2.5 : 1.0;
        
        // Base Impact (Weight * $1,000) * Tech Debt Multiplier * Vuln Mod
        const rawImpact = node.weight * 1000;
        const compoundingLoss = rawImpact * node.techDebtMultiplier * vulnMod * 12; // 12-month projected decay

        contradictions.push({
          zone: node.zone,
          verdict: node.verdict,
          financialLeak: compoundingLoss,
          severity: node.weight > 12 ? "CRITICAL" : "HIGH"
        });

        totalProjectedLoss += compoundingLoss;
      }
    }
  });

  return { contradictions, totalProjectedLoss, frictionIndex: (contradictions.length / 15) * 100 };
};
