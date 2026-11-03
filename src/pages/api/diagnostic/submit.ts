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
      .select('id, audit_id, status, persona_type, survey_completed')
      .ilike('access_code', cleanCode)
      .maybeSingle();

    if (lookupError) {
      console.error('OPERATOR_LOOKUP_ERROR:', lookupError);
      return res.status(500).json({ error: 'DB_LOOKUP_ERROR', message: lookupError.message });
    }

    if (!op) {
      return res.status(404).json({ error: 'INVALID_ACCESS_CODE', message: 'Operator not found.' });
    }

    if (op.status === 'completed' || op.survey_completed === true) {
      return res.status(200).json({
        success: true,
        message: 'ALREADY_COMPLETED',
        isFinished: true,
      });
    }

    // 2. Persist responses and mark status completed
    const { error: opError } = await supabase
      .from('operators')
      .update({
        raw_responses: answers,
        status: 'completed',
        survey_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', op.id);

    if (opError) {
      console.error('OPERATOR_UPDATE_ERROR:', opError);
      return res.status(500).json({ error: 'DB_UPDATE_ERROR', message: opError.message });
    }

    // 3. Update Audit track flag and evaluate triangulation
    if (op.audit_id) {
      const persona = String(op.persona_type || '').toUpperCase();
      const auditPatch: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };

      if (persona.includes('TECH')) auditPatch.has_technical = true;
      else if (persona.includes('MANAGE')) auditPatch.has_managerial = true;
      else if (persona.includes('EXEC')) auditPatch.has_executive = true;

      const { data: activeNodes } = await supabase
        .from('operators')
        .select('persona_type, status')
        .eq('audit_id', op.audit_id);

      const completedPersonas = new Set(
        activeNodes?.filter((n) => n.status === 'completed' || n.persona_type === op.persona_type).map((n) => String(n.persona_type).toUpperCase())
      );

      const isComplete =
        completedPersonas.has('TECHNICAL') &&
        completedPersonas.has('MANAGERIAL') &&
        completedPersonas.has('EXECUTIVE');

      if (isComplete || (activeNodes && activeNodes.filter((n) => n.status === 'completed').length >= 3)) {
        auditPatch.status = 'COMPLETE';
      }

      await supabase
        .from('audits')
        .update(auditPatch)
        .eq('id', op.audit_id);

      return res.status(200).json({
        success: true,
        message: isComplete ? 'TRIANGULATION_COMPLETE' : 'SIGNAL_RECORDED',
        isFinished: isComplete,
      });
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
