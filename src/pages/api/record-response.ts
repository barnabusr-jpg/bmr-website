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

  const { operatorId, questionId, value, lens } = req.body ?? {};

  if (!operatorId || typeof operatorId !== 'string') {
    return res.status(400).json({ error: 'operatorId is required' });
  }
  if (!questionId || typeof questionId !== 'string') {
    return res.status(400).json({ error: 'questionId is required' });
  }
  if (typeof value !== 'string') {
    return res.status(400).json({ error: 'value must be a string' });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabaseAdmin.rpc('record_operator_response', {
    p_operator_id: operatorId,
    p_question_id: questionId,
    p_value: value,
    p_persona_type: lens || 'EXECUTIVE',
  });

  if (error) {
    console.error('record_operator_response RPC failed:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
