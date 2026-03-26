import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { role, answers } = req.body;

  // 1. Map raw answers to a 0-10 severity scale for forensic precision
  const scores = answers.map((a: string | number) => {
    if (typeof a === 'number') return (a / 10); // Normalizing range values
    
    // Mapping high-friction string responses to high scores
    const highRiskTerms = ["Often", "Always", "7+", "No", "What is", "Neither"];
    return highRiskTerms.some(term => String(a).includes(term)) ? 8 : 2;
  });

  // 2. Identify the "Shear Zone" (The gap between AI promise and reality)
  const reworkTax = (scores[0] || 0) + (scores[3] || 0);
  const integrityScore = scores[6] || 0; // Maps to "Audit Trail" question

  // 3. Archetype Selection Logic
  let archetype = "Operational Drift";
  let velocity = -1.5;

  if (reworkTax > 12) {
    archetype = "The Replacement Trap";
    velocity = -7.2;
  } else if (scores[7] > 7) {
    archetype = "Shadow Shear";
    velocity = -5.8;
  } else if (role === 'executive' && integrityScore > 5) {
    archetype = "The Promise Gap";
    velocity = -3.9;
  }

  // 4. Return formatted data for results.tsx
  res.status(200).json({
    archetype,
    reworkTax: (reworkTax * 4).toFixed(1) + "%",
    deltaGap: (reworkTax / 4).toFixed(2),
    fractureVelocity: velocity,
    summary: `Based on your ${role} perspective, the diagnostic detected critical logic fractures.`
  });
}
