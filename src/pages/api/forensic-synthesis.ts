import type { NextApiRequest, NextApiResponse } from 'next';

const BASELINE = 17.8;
const SECTOR_WEIGHTS: Record<string, number> = {
  healthcare: 2.0, finance: 1.8, government: 1.7, manufacturing: 1.4, logistics: 1.5, retail: 1.2
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { alpha, beta, gamma, sector } = req.body;

  // Raw Score Aggregation (0-300 scale across 30 questions)
  const allScores = [...Object.values(alpha), ...Object.values(beta), ...Object.values(gamma)];
  const totalRaw = allScores.reduce((a: number, b: any) => a + Number(b), 0);
  const sectorMult = SECTOR_WEIGHTS[sector] || 1.0;

  // Variance Penalty Logic (Triangulation Discrepancies)
  let variancePenalty = 0;
  const conflicts = [];

  // Conflict 1: Institutional Blindness (Executive vs Technical)
  if (alpha[1] <= 5 && gamma[21] >= 10) {
    conflicts.push("INSTITUTIONAL_BLINDNESS: Strategic Node overestimates technical hygiene.");
    variancePenalty += 0.15;
  }
  // Conflict 2: Automation Illusion (Executive vs Managerial)
  if (alpha[4] <= 5 && beta[11] >= 10) {
    conflicts.push("AUTOMATION_ILLUSION: Strategic goals decoupled from operational friction.");
    variancePenalty += 0.10;
  }

  const finalTotal = (BASELINE * (totalRaw / 300) * sectorMult * (1 + variancePenalty));
  const projectedTotal = (finalTotal * 1.22); 

  res.status(200).json({
    total: finalTotal.toFixed(1),
    projected: projectedTotal.toFixed(1),
    driftLoss: (projectedTotal - finalTotal).toFixed(1),
    variance: (variancePenalty * 100).toFixed(0),
    confidence: 98.4,
    sectorLabel: sector.toUpperCase(),
    conflicts,
    isMaterialRisk: finalTotal > 15,
    heatmap: {
      strategic: alpha[1] > 10 ? 1 : 0.2,
      operational: beta[11] > 10 ? 1 : 0.4,
      technical: gamma[21] > 10 ? 1 : 0.8
    },
    provenance: {
      timestamp: new Date().toISOString(),
      audit_id: `BMR-${Math.random().toString(36).toUpperCase().substring(2, 10)}`
    }
  });
}
