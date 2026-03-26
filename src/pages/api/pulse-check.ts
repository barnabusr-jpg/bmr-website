import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { answers } = req.body;

    // SCORING LOGIC: Based on BMR Forensic Methodology
    let delta = 0; 
    const hai = 100; // Constant to satisfy 'prefer-const'

    // Question 1: Manual Overrides
    if (answers.q1 === 'often') delta += 0.35;
    else if (answers.q1 === 'sometimes') delta += 0.20;
    else if (answers.q1 === 'rarely') delta += 0.10;
    else delta += 0.05;

    // Question 2: Auditable Logs
    const igf = answers.q2 === 'no' ? 0 : 100;

    // ARCHETYPE DETECTION
    let archetype = "Stable System";
    if (delta > 0.15) archetype = "Active Shear Force";
    else if (igf === 0) archetype = "Log Rot Detected";

    res.status(200).json({
      delta: delta.toFixed(2),
      igf,
      hai,
      archetype,
      verdict: `System Archetype: ${archetype} Detected (Δ = ${delta.toFixed(2)})`
    });
  } catch {
    // Variable removed entirely to satisfy 'no-unused-vars'
    res.status(500).json({ error: 'Diagnostic Engine Failure' });
  }
}
