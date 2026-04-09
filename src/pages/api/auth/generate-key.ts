import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  // Generate a simple 6-digit challenge (In prod, you'd email this)
  const challenge = Math.floor(100000 + Math.random() * 900000).toString();
  
  // For now, we return it so the console/UI can see it for testing
  // In a hardened state, this would trigger your SMTP provider
  return res.status(200).json({ challenge });
}
