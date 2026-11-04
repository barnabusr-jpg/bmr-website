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

  const { operatorId } = req.body ?? {};

  if (!operatorId || typeof operatorId !== 'string') {
    return res.status(400).json({ error: 'Valid operatorId is required' });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  try {
    const { data, error } = await supabaseAdmin
      .from('operators')
      .select('is_authorized')
      .eq('id', operatorId)
      .single();

    if (error || !data) {
      return res.status(200).json({ is_authorized: false });
    }

    return res.status(200).json({ is_authorized: Boolean(data.is_authorized) });
  } catch (err: any) {
    console.error('Validation server error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
