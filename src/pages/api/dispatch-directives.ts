import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_KEY as string);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function toSentenceCase(str: string): string {
  if (!str) return 'Your Organization';
  const clean = str.replace(/_/g, ' ').toLowerCase().trim();
  return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const ROLE_MAP: Record<string, string> = {
  // Track 01: Executive & Governance
  'executive': 'EXECUTIVE',
  'exec': 'EXECUTIVE',
  'executivenode': 'EXECUTIVE',

  // Track 02: Engineering & Infrastructure
  'tech mgmt': 'TECHNICAL',
  'tech_mgmt': 'TECHNICAL',
  'techmgmt': 'TECHNICAL',
  'tech': 'TECHNICAL',
  'technical': 'TECHNICAL',
  'technicalnode': 'TECHNICAL',
  'techMgmt': 'TECHNICAL',

  // Track 03: Operations & Management
  'ops mgmt': 'MANAGERIAL',
  'ops_mgmt': 'MANAGERIAL',
  'opsmgmt': 'MANAGERIAL',
  'ops': 'MANAGERIAL',
  'managerial': 'MANAGERIAL',
  'manager': 'MANAGERIAL',
  'man': 'MANAGERIAL',
  'managerialnode': 'MANAGERIAL',
  'opsMgmt': 'MANAGERIAL',

  // Track 04: Frontline System Execution (Decoupled from EXECUTIVE)
  'system user': 'SYSTEM',
  'system_user': 'SYSTEM',
  'systemuser': 'SYSTEM',
  'user': 'SYSTEM',
  'sys': 'SYSTEM',
  'core_system': 'SYSTEM',
  'systemUser': 'SYSTEM',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { groupId, orgName, emails, parentAuditId } = req.body;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bmradvisory.co';
  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co';

  if (!parentAuditId) {
    return res.status(400).json({ error: 'MISSING PARENT AUDIT ID' });
  }

  try {
    const roles = Object.entries(emails || {});
    const emailPromises: Promise<any>[] = [];
    const prettyCompany = toSentenceCase(orgName);

    for (const [rawRole, email] of roles) {
      const targetEmail = (email as string).trim().toLowerCase();
      if (!targetEmail) continue;

      const normalizedKey = rawRole.toLowerCase().trim();
      const standardizedRole = ROLE_MAP[normalizedKey];

      if (!standardizedRole) {
        return res.status(400).json({
          error: 'INVALID NODE ASSIGNMENT',
          message: `The provided role identifier "${rawRole}" is incompatible.`
        });
      }

      // Reuse existing access code if already created, otherwise generate once
      const { data: existingOp } = await supabaseAdmin
        .from('operators')
        .select('id, access_code')
        .eq('audit_id', parentAuditId)
        .eq('persona_type', standardizedRole)
        .maybeSingle();

      const code = existingOp?.access_code || Math.random().toString(36).substring(2, 10).toUpperCase();

      // Upsert record bound to (audit_id, persona_type), ensuring survey_completed resets to false
      const { error: upsertError } = await supabaseAdmin
        .from('operators')
        .upsert(
          {
            audit_id: parentAuditId,
            group_id: groupId || parentAuditId,
            persona_type: standardizedRole,
            email: targetEmail,
            access_code: code,
            is_authorized: true,
            status: 'pending',
            survey_completed: false
          },
          { onConflict: 'audit_id,persona_type' }
        );

      if (upsertError) throw upsertError;

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}&role=${standardizedRole}&flow=quad_node`;

      emailPromises.push(
        sgMail.send({
          to: targetEmail,
          from: { name: "BMR Solutions", email: FROM_EMAIL },
          subject: `ACTION REQUIRED: ${standardizedRole} Track Assessment Authorized // ${prettyCompany}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f8fafc;">
              <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border: 1px solid #e2e8f0; border-top: 4px solid #0f172a; border-radius: 6px;">
                <h3 style="margin-top: 0; color: #0f172a;">BMR Solutions // ${standardizedRole} Diagnostic Node</h3>
                <p style="font-size: 14px; color: #334155;">Target Organization: <strong>${prettyCompany}</strong></p>
                <p style="font-size: 14px; color: #334155;">Your assessment link is authorized. Select below to open your evaluation module:</p>
                <div style="margin: 25px 0;">
                  <a href="${diagnosticLink}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px; display: inline-block;">
                    Open ${standardizedRole} Track →
                  </a>
                </div>
                <p style="font-size: 11px; font-family: monospace; color: #64748b;">Access Code: <strong>${code}</strong></p>
              </div>
            </div>
          `
        })
      );
    }

    await supabaseAdmin
      .from('audits')
      .update({
        status: 'TRIANGULATING',
        compiled_at: new Date().toISOString()
      })
      .eq('id', parentAuditId);

    if (emailPromises.length > 0) {
      await Promise.allSettled(emailPromises);
    }

    return res.status(200).json({ status: 'SUCCESS' });
  } catch (error: any) {
    console.error("DISPATCH CRITICAL ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
