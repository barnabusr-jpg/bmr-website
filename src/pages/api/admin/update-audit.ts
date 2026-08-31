import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { auditId, updates } = req.body ?? {};

    if (!auditId || !updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'Missing or invalid parameters' });
    }

    const { error } = await supabaseAdmin
      .from('audits')
      .update(updates)
      .eq('id', auditId);

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Admin update audit error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Database update failed' });
  }
}
