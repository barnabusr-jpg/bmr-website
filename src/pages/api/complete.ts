import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Missing Supabase service role configuration' });
  }

  const { operatorId, lens, reworkTax } = req.body ?? {};

  if (!operatorId || typeof operatorId !== 'string') {
    return res.status(400).json({ error: 'Valid operatorId is required' });
  }
  if (!lens || typeof lens !== 'string') {
    return res.status(400).json({ error: 'Valid lens is required' });
  }

  const parsedTax = reworkTax == null ? 1.3 : Number(reworkTax);
  if (!Number.isFinite(parsedTax)) {
    return res.status(400).json({ error: 'Valid reworkTax is required' });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabaseAdmin.rpc('complete_diagnostic_audit', {
    p_operator_id: operatorId,
    p_lens: lens,
    p_rework_tax: parsedTax,
  });

  if (error) {
    console.error('RPC complete_diagnostic_audit failed:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true, auditId: data as string });
}
