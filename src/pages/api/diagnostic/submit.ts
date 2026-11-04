import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fail-fast: ensure service role key is present to bypass RLS safely
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('CRITICAL_ENV_ERROR: Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL');
    return res.status(500).json({ error: 'SERVER_CONFIG_ERROR', message: 'Service role key not configured.' });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { accessCode, responses, rawResponses } = req.body ?? {};

  if (!accessCode) {
    return res.status(400).json({ error: 'INVALID_ACCESS_CODE', message: 'Missing access code.' });
  }

  // Defensive JSON normalization to guarantee valid JSONB persistence
  const rawPayload = responses ?? rawResponses ?? {};
  let answers: Record<string, any> = {};

  if (typeof rawPayload === 'string') {
    try {
      answers = JSON.parse(rawPayload);
    } catch (e) {
      console.warn('WARN: rawResponses string was not valid JSON, storing as empty object', e);
      answers = {};
    }
  } else if (typeof rawPayload === 'object' && rawPayload !== null) {
    answers = rawPayload;
  }

  const cleanCode = String(accessCode).trim().toUpperCase();

  try {
    // 1. Locate operator by access_code via Service Role (bypasses RLS)
    const { data: op, error: lookupError } = await supabaseAdmin
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
        auditId: op.audit_id || null,
      });
    }

    // 2. Persist answers into operators.raw_responses JSONB & mark complete
    const { error: opError } = await supabaseAdmin
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
      return res.status(500).json({ error: 'OPERATOR_UPDATE_ERROR', message: opError.message });
    }

    // 3. Update Audit track flag and copy responses to audits.raw_responses
    if (op.audit_id) {
      const persona = String(op.persona_type || '').toUpperCase();
      const auditPatch: Record<string, any> = {
        raw_responses: answers,
        updated_at: new Date().toISOString(),
      };

      if (persona.includes('TECH')) auditPatch.has_technical = true;
      else if (persona.includes('MANAGE')) auditPatch.has_managerial = true;
      else if (persona.includes('EXEC')) auditPatch.has_executive = true;

      const { data: activeNodes } = await supabaseAdmin
        .from('operators')
        .select('persona_type, status')
        .eq('audit_id', op.audit_id);

      const completedPersonas = new Set(
        activeNodes
          ?.filter((n) => n.status === 'completed' || n.persona_type === op.persona_type)
          .map((n) => String(n.persona_type).toUpperCase())
      );

      const isComplete =
        completedPersonas.has('TECHNICAL') &&
        completedPersonas.has('MANAGERIAL') &&
        completedPersonas.has('EXECUTIVE');

      if (isComplete || (activeNodes && activeNodes.filter((n) => n.status === 'completed').length >= 3)) {
        auditPatch.status = 'PENDING_RELEASE';
      }

      await supabaseAdmin
        .from('audits')
        .update(auditPatch)
        .eq('id', op.audit_id);

      return res.status(200).json({
        success: true,
        message: isComplete ? 'TRIANGULATION_COMPLETE' : 'SIGNAL_RECORDED',
        isFinished: isComplete,
        auditId: op.audit_id,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'SIGNAL_RECORDED',
      isFinished: false,
      auditId: null,
    });
  } catch (error: any) {
    console.error('SUBMISSION_EXCEPTION:', error);
    return res.status(500).json({ error: 'PROCESSING_FAILURE', message: error.message });
  }
}
