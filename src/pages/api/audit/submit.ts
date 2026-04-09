import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const data = req.body;
  
  // Logic to save to your DB (Supabase/Prisma/etc) would go here
  console.log("AUDIT_RECEIVED:", data);

  return res.status(200).json({ success: true, message: "SIGNAL_RECORDED" });
}
