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

// Maps input roles strictly to database persona_type expected by ForensicDiagnostic.tsx
const ROLE_MAP: Record<string, string> = {
  'executive': 'EXECUTIVE',
  'exec': 'EXECUTIVE',
  'executivenode': 'EXECUTIVE',
  'system user': 'EXECUTIVE',
  'system_user': 'EXECUTIVE',

  'tech mgmt': 'TECHNICAL',
  'tech_mgmt': 'TECHNICAL',
  'technical': 'TECHNICAL',
  'tech': 'TECHNICAL',
  'technicalnode': 'TECHNICAL',

  'ops mgmt': 'MANAGERIAL',
  'ops_mgmt': 'MANAGERIAL',
  'managerial': 'MANAGERIAL',
  'manager': 'MANAGERIAL',
  'man': 'MANAGERIAL',
  'managerialnode': 'MANAGERIAL',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { groupId, orgName, emails, parentAuditId } = req.body;
  
  // Dynamic host resolution
  const host = req.headers.host || 'www.bmradvisory.co';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  
  let BASE_URL = `${protocol}://${host}`;
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes('lab.bmradvisory.co')) {
    BASE_URL = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }

  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co'; 

  if (!parentAuditId) {
    return res.status(400).json({ error: 'MISSING PARENT AUDIT ID' });
  }

  try {
    const roles = Object.entries(emails);
    const emailPromises = [];
    const prettyCompany = toSentenceCase(orgName);

    for (const [rawRole, email] of roles) {
      const targetEmail = (email as string).trim().toLowerCase();
      if (!targetEmail) continue;

      const normalizedKey = rawRole.toLowerCase().trim();
      const dbPersona = ROLE_MAP[normalizedKey];

      if (!dbPersona) {
        return res.status(400).json({ 
          error: 'INVALID NODE ASSIGNMENT', 
          message: `The provided role identifier "${rawRole}" is incompatible.` 
        });
      }

      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { data: existingNode } = await supabaseAdmin
        .from('operators')
        .select('id')
        .eq('audit_id', parentAuditId)
        .eq('persona_type', dbPersona)
        .maybeSingle();

      if (existingNode) {
        await supabaseAdmin
          .from('operators')
          .update({
            email: targetEmail,
            access_code: code,
            status: 'pending'
          })
          .eq('id', existingNode.id);
      } else {
        await supabaseAdmin
          .from('operators')
          .insert({
            audit_id: parentAuditId,
            group_id: groupId,
            email: targetEmail,
            persona_type: dbPersona,
            access_code: code,
            is_authorized: true,
            status: 'pending',
            survey_completed: false
          });
      }

      // ✅ TARGETS THE 360 DIAGNOSTIC ROUTE (src/pages/diagnostic/forensic.tsx)
      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;

      emailPromises.push(sgMail.send({
        to: targetEmail,
        from: { name: "BMR Solutions", email: FROM_EMAIL },
        subject: `ACTION REQUIRED: ${dbPersona} Track Assessment Authorized // ${prettyCompany}`,
        html: `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box;">
                  <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 4px 0;">BMR Solutions // 360 Operational Diagnostic</h2>
                  <p style="font-size: 11px; font-family: monospace; color: #64748b; margin: 0 0 20px 0;">Organization: ${prettyCompany} | Track: ${dbPersona}</p>
                  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                  <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 24px 0;">
                    You have been designated to complete the 360 readiness assessment for <strong>${prettyCompany}</strong> (${dbPersona} Track).
                  </p>
                  <div style="margin-bottom: 32px;">
                    <a href="${diagnosticLink}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: 700; display: inline-block; font-size: 12px; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase;">
                      Begin 360 Assessment Track →
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        `
      }));
    }

    if (emailPromises.length > 0) {
      await Promise.all(emailPromises);
    }

    return res.status(200).json({ status: 'SUCCESS' });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
