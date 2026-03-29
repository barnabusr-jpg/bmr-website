import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { role, answers } = req.body;

  // 1. Convert Object to Score Array (Forensic Normalization)
  // We extract the values from the { id: value } object sent by the frontend
  const answerValues = Object.values(answers || {});
  
  const scores = answerValues.map((a: any) => {
    if (typeof a === 'number') return a / 10;
    
    const highRisk = ["Often", "Always", "7+", "No", "Neither", "buried in rework", "Working for", "Client Reported", "Undetected"];
    const midRisk = ["Sometimes", "Somewhat", "Partially", "10–30%", "Human review", "Informal consensus"];
    
    if (highRisk.some(term => String(a).includes(term))) return 8.5;
    if (midRisk.some(term => String(a).includes(term))) return 4.5;
    return 1.5; // Nominal/Low Risk
  });

  // 2. Identify the "Shear Zones" (Using the mapped scores)
  const reworkTaxRaw = (scores[0] || 0) + (scores[1] || 0) + (scores[5] || 0); // mgr_1, mgr_2, mgr_6
  const shadowAI = (scores[7] || 0) + (scores[8] || 0); // sh_1, sh_2
  const expertiseDebt = (scores[2] || 0) + (scores[3] || 0); // mgr_3, mgr_4

  // 3. Archetype & Velocity Determination
  let archetype = "Collective Delusion";
  let velocity = -1.5;

  // Thresholds for High-Stakes Verdicts
  if (reworkTaxRaw > 18) {
    archetype = "Replacement Trap";
    velocity = -7.4;
  } else if (shadowAI > 14) {
    archetype = "Shadow Shear";
    velocity = -5.8;
  } else if (expertiseDebt > 14) {
    archetype = "Hollow Chevron";
    velocity = -4.2;
  }

  // 4. Financial Impact Scaling (The $M Verdict)
  // Base $1.2M + weights from the specific friction points
  const totalImpact = 1.2 + (reworkTaxRaw * 0.35) + (shadowAI * 0.25) + (expertiseDebt * 0.45);

  res.status(200).json({
    archetype,
    deltaGap: parseFloat((reworkTaxRaw / 3.5).toFixed(2)),
    reworkTax: parseFloat(reworkTaxRaw.toFixed(2)), 
    shadowAI: parseFloat(shadowAI.toFixed(2)),
    expertiseDebt: parseFloat(expertiseDebt.toFixed(2)),
    financialImpact: parseFloat(totalImpact.toFixed(2)), // e.g., 8.35
    fractureVelocity: velocity,
    perspective: role
  });
}
