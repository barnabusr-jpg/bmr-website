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

    // 3. Upsert Entity
    const { data: ent, error: entErr } = await supabaseAdmin
      .from('entities')
      .upsert({ name: formattedEntity }, { onConflict: 'name' })
      .select('id')
      .maybeSingle();

    if (entErr) throw entErr;
    if (!ent?.id) throw new Error('Entity upsert failed to return a valid ID');

    // 4. Insert Audit
    const { data: auditData, error: auditErr } = await supabaseAdmin
      .from('audits')
      .insert([
        {
          entity_id: ent.id,
          org_name: formattedEntity,
          lead_email: formattedEmail,
          sector: sectorType,
          decay_pct: decayPct,
          rework_tax: reworkTax,
          raw_responses: {
            ...safeAnswers,
            PULSE_CHECK_COMPLETE: 'true',
          },
          status: 'COMPLETED',
          roi_pct: 6,
          ai_spend: 1.2,
        },
      ])
      .select('id')
      .maybeSingle();

    if (auditErr) throw auditErr;
    if (!auditData?.id) throw new Error('Audit creation failed to return a valid ID');

    // 5. Upsert Operator
    const { data: opData, error: opErr } = await supabaseAdmin
      .from('operators')
      .upsert(
        {
          email: formattedEmail,
          full_name: formattedOperator,
          entity_id: ent.id,
          audit_id: auditData.id,
          persona_type: personaType,
          status: 'COMPLETED',
        },
        { onConflict: 'email' }
      )
      .select('id')
      .maybeSingle();

    if (opErr) throw opErr;
    if (!opData?.id) throw new Error('Operator upsert failed to confirm record creation');

    return res.status(200).json({ success: true, auditId: auditData.id });
  } catch (error: any) {
    console.error('API Route Execution Error:', error?.message || error);
    return res.status(500).json({ error: error?.message || 'Internal Database Exception' });
  }
}
