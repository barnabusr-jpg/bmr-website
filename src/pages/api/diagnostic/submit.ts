import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { accessCode, responses, rawResponses, orgName } = req.body;
  const answers = responses || rawResponses;

  if (!accessCode) {
    return res.status(400).json({ error: 'INVALID_ACCESS_CODE', message: 'Missing access code.' });
  }

  try {
    // 1. Find operator to verify existence and fetch group_id / org
    const { data: op, error: lookupError } = await supabase
      .from('operators')
      .select('*')
      .eq('access_code', accessCode)
      .maybeSingle();

    if (lookupError || !op) {
      return res.status(401).json({ error: 'INVALID_ACCESS_CODE', message: 'Operator not found.' });
    }

    if (op.status === 'completed' || op.survey_completed === true) {
      return res.status(409).json({ error: 'ALREADY_COMPLETED', message: 'Assessment already completed.' });
    }

    // 2. Record the individual signal
    const { error: opError } = await supabase
      .from('operators')
      .update({
        raw_responses: answers,
        status: 'completed',
        survey_completed: true,
        is_authorized: false,
      })
      .eq('access_code', accessCode);

    if (opError) throw opError;

    // 3. Check triangulation status
    const targetGroup = op.group_id || orgName;
    const { data: activeNodes } = await supabase
      .from('operators')
      .select('status')
      .eq('group_id', targetGroup);

    const completedCount = activeNodes?.filter((n) => n.status === 'completed').length || 0;

    if (completedCount >= 3) {
      await supabase
        .from('audits')
        .update({ status: 'COMPLETE' })
        .eq('org_name', targetGroup);

      return res.status(200).json({
        success: true,
        message: 'TRIANGULATION_COMPLETE',
        isFinished: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'SIGNAL_RECORDED',
      isFinished: false,
    });
  } catch (error: any) {
    console.error('SUBMISSION_ERROR:', error);
    return res.status(500).json({ error: 'PROCESSING_FAILURE', message: error.message });
  }
}
