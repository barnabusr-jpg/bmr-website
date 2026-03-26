import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { answers } = req.body;

    // SCORING LOGIC 
    let delta = 0;
    let igf = 100;
    let hai = 100;
    let avs = 100;

    // Question 1: Manual Overrides 
    if (answers.q1 === 'often') delta += 0.35;
    else if (answers.q1 === 'sometimes') delta += 0.20;
    else if (answers.q1 === 'rarely') delta += 0.10;
    else delta += 0.05;

    // Question 2: Auditable Logs 
    if (answers.q2 === 'no') igf = 0;

    // ARCHETYPE DETECTION [cite: 298, 301]
    let archetype = "Stable System";
    if (delta > 0.15) archetype = "Active Shear Force";
    else if (igf === 0) archetype = "Log Rot Detected";

    res.status(200).json({
      delta: delta.toFixed(2),
      igf,
      archetype,
      verdict: `System Archetype: ${archetype} (Δ = ${delta.toFixed(2)})` [cite: 303]
    });
  } catch (error) {
    res.status(500).json({ error: 'Diagnostic Failed' });
  }
}
