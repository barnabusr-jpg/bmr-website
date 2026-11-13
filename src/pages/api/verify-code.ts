import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing diagnostic code.' });
  }

  const cleanCode = code.trim().toUpperCase();

  try {
    const { data: op, error: opError } = await supabaseAdmin
      .from('operators')
      .select('*')
      .ilike('access_code', cleanCode)
      .maybeSingle();

    if (opError) {
      console.error('OPERATOR_LOOKUP_DB_ERROR:', opError);
      return res.status(500).json({ error: 'Database query failure.' });
    }

    if (!op) {
      console.warn('OPERATOR_NOT_FOUND:', { cleanCode });
      return res.status(404).json({ error: 'Invalid access code.' });
    }

    let audit: any = null;

    // audits.id is the source of truth for routing in the frontend.
    // group_id is not guaranteed to match audits.id.
    const auditId = op.audit_id;

    if (auditId) {
      const { data: auditData, error: auditError } = await supabaseAdmin
        .from('audits')
        .select('*')
        .eq('id', auditId)
        .maybeSingle();

      if (!auditError && auditData) {
        audit = auditData;
      }
    }

    if (!audit) {
      audit = {
        id: auditId || 'unlinked_audit',
        org_name: op.org_name || 'Organization',
        status: 'ACTIVE',
      };
    }

    return res.status(200).json({ op, audit });
  } catch (err: any) {
    console.error('VERIFY_CODE_INTERNAL_ERROR:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
