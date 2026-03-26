import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { role, answers } = req.body;

  // 1. Normalize 12-question pool (Scale 0-10)
  const scores = answers.map((a: string | number) => {
    if (typeof a === 'number') return a / 10;
    const highRisk = ["Often", "Always", "7+", "No", "Neither", "buried in rework"];
    return highRisk.some(term => String(a).includes(term)) ? 8.5 : 2.5;
  });

  // 2. Identify the "Shear Zone"
  const reworkTaxRaw = (scores[0] || 0) + (scores[3] || 0);
  const shadowAI = scores[4] || 0;
  const expertiseDebt = scores[2] || 0;

  // 3. Archetype & Velocity Determination
  let archetype = "CollectiveDelusion";
  let velocity = -1.5;

  if (reworkTaxRaw > 12) {
    archetype = "ReplacementTrap";
    velocity = -7.4;
  } else if (shadowAI > 7) {
    archetype = "ShadowShear";
    velocity = -5.8;
  } else if (expertiseDebt > 7) {
    archetype = "HollowChevron";
    velocity = -4.2;
  }

  // 4. Financial Impact Scaling (In Millions for the Verdict)
  const totalImpact = (reworkTaxRaw * 0.4) + (shadowAI * 0.2) + (expertiseDebt * 0.5);

  res.status(200).json({
    archetype,
    deltaGap: parseFloat((reworkTaxRaw / 3.5).toFixed(2)),
    reworkTax: reworkTaxRaw, 
    shadowAI: shadowAI,
    expertiseDebt: expertiseDebt,
    financialImpact: totalImpact, // Normalized total
    fractureVelocity: velocity,
    perspective: role
  });
}
