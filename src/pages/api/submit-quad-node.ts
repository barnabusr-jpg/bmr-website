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

  const { auditId, accessCode, markerKey, personaAnswers } = req.body;

  if (!auditId || !markerKey) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_FIELDS' });
  }

  try {
    const { data: currentAudit, error: fetchErr } = await supabaseAdmin
      .from('audits')
      .select('raw_responses')
      .eq('id', auditId)
      .single();

    if (fetchErr) throw fetchErr;

    const existingRaw =
      currentAudit?.raw_responses &&
      typeof currentAudit.raw_responses === 'object' &&
      !Array.isArray(currentAudit.raw_responses)
        ? currentAudit.raw_responses
        : {};

    const mergedResponses = {
      ...existingRaw,
      ...(personaAnswers || {}),
      [markerKey]: new Date().toISOString(),
    };

    const { error: updateErr } = await supabaseAdmin
      .from('audits')
      .update({ raw_responses: mergedResponses })
      .eq('id', auditId);

    if (updateErr) throw updateErr;

    if (accessCode) {
      await supabaseAdmin
        .from('operators')
        .update({
          survey_completed: true,
          status: 'completed',
        })
        .eq('access_code', accessCode.trim().toUpperCase());
    }

    return res.status(200).json({ status: 'SUCCESS', raw_responses: mergedResponses });
  } catch (err: any) {
    console.error('SUBMIT_QUAD_NODE_ERROR:', err);
    return res.status(500).json({ error: err.message || 'Failed to save quad node response' });
  }
}
