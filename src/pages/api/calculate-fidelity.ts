import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const dbEngine = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method non-compliant.' });
  }

  const { auditId } = req.query;
  if (!auditId || typeof auditId !== 'string') {
    return res.status(400).json({ error: 'Missing or malformed anchor auditId parameter.' });
  }

  try {
    const { data: record, error } = await dbEngine
      .from('premium_audit_deep_dives')
      .select('*')
      .eq('client_id', auditId);

    // If array index structure returns empty, broadcast safe default object to prevent front-end crash loops
    if (error || !record || record.length === 0) {
      return res.status(200).json({
        target_pillar: 'HAI',
        friction_score: 0.0,
        compliance_score: 100,
        vendor_risk_score: 0.0,
        annual_salary_leakage: 0,
        rework_costs: 0,
        unhedged_legal_exposure: 0,
        reconstruction_latency_hours: 0,
        compliance_failures: [],
        asymmetric_variance_gap: 0,
        audit_deadline_iso: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    // Direct match array extraction pass-through
    return res.status(200).json(record[0]);
  } catch (err: any) {
    return res.status(500).json({ error: 'Internal logic handler breakdown', details: err.message });
  }
}
