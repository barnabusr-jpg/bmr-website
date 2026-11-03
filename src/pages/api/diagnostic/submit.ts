import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { accessCode, responses, rawResponses } = req.body;
  const answers = responses || rawResponses;

  if (!accessCode) {
    return res.status(400).json({ error: 'INVALID_ACCESS_CODE', message: 'Missing access code.' });
  }

  const cleanCode = String(accessCode).trim().toUpperCase();

  try {
    // 1. Locate operator by access_code and verify existence
    const { data: op, error: lookupError } = await supabase
      .from('operators')
      .select('id, audit_id, status')
      .ilike('access_code', cleanCode)
      .maybeSingle();

    if (lookupError) {
      console.error('OPERATOR_LOOKUP_ERROR:', lookupError);
      return res.status(500).json({ error: 'DB_LOOKUP_ERROR', message: lookupError.message });
    }

    if (!op) {
      return res.status(404).json({ error: 'INVALID_ACCESS_CODE', message: 'Operator not found.' });
    }

    if (op.status === 'completed') {
      return res.status(200).json({
        success: true,
        message: 'ALREADY_COMPLETED',
        isFinished: true,
      });
    }

    // 2. Persist responses and mark status as completed
    const { error: opError } = await supabase
      .from('operators')
      .update({
        raw_responses: answers,
        status: 'completed',
      })
      .eq('id', op.id);

    if (opError) {
      console.error('OPERATOR_UPDATE_ERROR:', opError);
      return res.status(500).json({ error: 'DB_UPDATE_ERROR', message: opError.message });
    }

    // 3. Evaluate triangulation node count using audit_id
    if (op.audit_id) {
      const { data: activeNodes, error: counterError } = await supabase
        .from('operators')
        .select('status')
        .eq('audit_id', op.audit_id);

      if (!counterError && activeNodes) {
        const completedCount = activeNodes.filter((n) => n.status === 'completed').length;

        if (completedCount >= 3) {
          await supabase
            .from('audits')
            .update({ status: 'COMPLETE' })
            .eq('id', op.audit_id);

          return res.status(200).json({
            success: true,
            message: 'TRIANGULATION_COMPLETE',
            isFinished: true,
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'SIGNAL_RECORDED',
      isFinished: false,
    });
  } catch (error: any) {
    console.error('SUBMISSION_EXCEPTION:', error);
    return res.status(500).json({ error: 'PROCESSING_FAILURE', message: error.message });
  }
}
