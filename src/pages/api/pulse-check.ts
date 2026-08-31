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
    const {
      operatorName,
      entityName,
      email,
      sector,
      selectedLens,
      metrics,
      answers,
    } = req.body;

    // 1. Sanitize & validate string inputs
    const formattedEntity = String(entityName || '').toUpperCase().trim();
    const formattedEmail = String(email || '').toLowerCase().trim();
    const formattedOperator = String(operatorName || '').toUpperCase().trim();
    const personaType = String(selectedLens || '').toUpperCase().trim();
    const sectorType = String(sector || 'FINANCE').toUpperCase().trim();

    if (!formattedEntity || !formattedEmail || !formattedOperator || !personaType) {
      return res.status(400).json({ error: 'Missing required intake fields.' });
    }

    // 2. Shape validation & metric checks
    const safeAnswers = (typeof answers === 'object' && answers !== null && !Array.isArray(answers))
      ? answers
      : {};

    if (!metrics || typeof metrics !== 'object') {
      return res.status(400).json({ error: 'Missing diagnostic metrics payload.' });
    }

    const decayPct = Number(metrics.decay);
    const reworkTax = Number(metrics.rework);

    if (Number.isNaN(decayPct) || Number.isNaN(reworkTax)) {
      return res.status(400).json({ error: 'Invalid numeric values in audit metrics payload.' });
    }

    // Attach metadata to raw_responses JSONB block
    const enrichedResponses = {
      ...safeAnswers,
      OPERATOR_NAME: formattedOperator,
      PULSE_CHECK_COMPLETE: 'true',
    };

    // 3. Upsert Entity
    const { data: ent, error: entErr } = await supabaseAdmin
      .from('entities')
      .upsert({ name: formattedEntity }, { onConflict: 'name' })
      .select('id')
      .maybeSingle();

    if (entErr) throw entErr;
    if (!ent?.id) throw new Error('Entity upsert failed to return a valid ID');

    // 4. Insert Audit (populates flow_type on creation)
const { data: auditData, error: auditErr } = await supabaseAdmin
  .from('audits')
  .insert([
    {
      org_name: formattedEntity,
      lead_email: formattedEmail,
      sector: sectorType,
      decay_pct: decayPct,
      rework_tax: reworkTax,
      raw_responses: enrichedResponses,
      status: 'COMPLETED',
      roi_pct: 6,
      ai_spend: 1.2,
      flow_type: 'pulse_check', // Identifies this record as a standalone snapshot intake
    },
  ])
  .select('id')
  .maybeSingle();

if (auditErr) throw auditErr;
if (!auditData?.id) throw new Error('Audit creation failed to return a valid ID');

    // 5. Insert Operator (Uniquely prefixed access_code to pass UNIQUE constraint)
    const { data: opData, error: opErr } = await supabaseAdmin
      .from('operators')
      .insert([
        {
          email: formattedEmail,
          access_code: `PULSE_CHECK_AUTO_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          audit_id: auditData.id,
          persona_type: personaType,
          status: 'COMPLETED',
          raw_responses: enrichedResponses,
        },
      ])
      .select('id')
      .maybeSingle();

    if (opErr) throw opErr;
    if (!opData?.id) throw new Error('Operator insert failed to confirm record creation');

    return res.status(200).json({ success: true, auditId: auditData.id });
  } catch (error: any) {
    console.error('API Route Execution Error:', error?.message || error);
    return res.status(500).json({ error: error?.message || 'Internal Database Exception' });
  }
}
