import type { NextApiRequest, NextApiResponse } from 'next';

// 🕵️ REGISTRY OF AUTHORIZED OPERATORS
// In production, this would be a real Database call.
const AUTHORIZED_DATABASE = [
  { 
    email: "admin@bmr.solutions", 
    pulseCheckComplete: true, 
    profile: { archetype: "THE_ARCHITECT", reworkTax: "18.4" } 
  },
  { 
    email: "operator-01@bmr.solutions", 
    pulseCheckComplete: true, 
    profile: { archetype: "THE_OPTIMIZER", reworkTax: "12.2" } 
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "! INVALID_IDENTIFIER" });
  }

  // 🔎 SCANNING THE REGISTRY
  const record = AUTHORIZED_DATABASE.find(user => user.email.toLowerCase() === email.toLowerCase());

  if (record && record.pulseCheckComplete) {
    // SUCCESS: Match found in the authorized registry
    return res.status(200).json(record);
  } else {
    // FAILURE: No match found for the identifier provided
    console.warn(`[SECURITY] UNAUTHORIZED_ACCESS_ATTEMPT // ID: ${email}`);
    return res.status(404).json({ 
      authorized: false, 
      pulseCheckComplete: false,
      message: "! NO_DIAGNOSTIC_MATCH_FOUND" 
    });
  }
}
