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

const ROLE_DISPLAY_NAMES: Record<string, string> = {
  'EXECUTIVE': 'Executive Leadership Track',
  'TECHNICAL': 'Technical & Engineering Track',
  'MANAGERIAL': 'Operations & Process Track'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { groupId, orgName, emails, parentAuditId } = req.body;
  
  const host = req.headers.host || 'www.bmradvisory.co';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  
  let BASE_URL = `${protocol}://${host}`;
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes('lab.bmradvisory.co')) {
    BASE_URL = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }

  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co'; 
  
  // 🎯 ACCURATE CALENDLY CALIBRATION BRIEFING LINK
  const CALENDLY_BRIEFING_URL = 'https://calendly.com/hello-bmradvisory/systems-triangulation-calibration';

  if (!parentAuditId) {
    return res.status(400).json({ error: 'MISSING PARENT AUDIT ID' });
  }

  try {
    await supabaseAdmin
      .from('audits')
      .update({ status: 'IN_PROGRESS' })
      .eq('id', parentAuditId);

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
            status: 'pending',
            survey_completed: false,
            raw_responses: {}
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
            survey_completed: false,
            raw_responses: {}
          });
      }

      const diagnosticLink = `${BASE_URL}/diagnostic/forensic?code=${code}`;
      const roleTitle = ROLE_DISPLAY_NAMES[dbPersona] || `${dbPersona} Track`;

      let emailHtml = '';

      if (dbPersona === 'EXECUTIVE') {
        emailHtml = `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box; text-align: left;">
                  
                  <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.5px;">
                    BMR Solutions // 360° Diagnostic Dispatch
                  </h2>
                  <p style="font-size: 11px; font-family: monospace; color: #64748b; margin: 0 0 20px 0; font-weight: 600;">
                    Target Organization: ${prettyCompany} | Track: ${roleTitle}
                  </p>
                  
                  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                  
                  <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 16px 0;">
                    The 360° operational diagnostic assessment for <strong>${prettyCompany}</strong> is underway.
                  </p>

                  <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 24px 0;">
                    Access links have been generated across your leadership tracks to evaluate capacity loss, process friction, and technical drift prior to scaling operational workflows.
                  </p>

                  <!-- STEP 1: Executive Track -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 20px; margin-bottom: 16px; border-radius: 4px; text-align: left;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 1: Complete Executive Assessment</p>
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569;">
                      Access your direct link below to complete your executive readiness module (~5 to 7 minutes):
                    </p>
                    <a href="${diagnosticLink}" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 13px; text-decoration: underline;">
                      Open Executive Assessment Track →
                    </a>
                  </div>

                  <!-- STEP 2: Stakeholder Triangulation -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #64748b; padding: 20px; margin-bottom: 16px; border-radius: 4px; text-align: left;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 2: Stakeholder Alignment</p>
                    <p style="margin: 0; font-size: 13px; color: #475569;">
                      Your assigned Technical Lead and Operations Lead have been issued dedicated access codes to complete their respective evaluation modules.
                    </p>
                  </div>

                  <!-- STEP 3: Executive Briefing Scheduling -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #dc2626; padding: 20px; margin-bottom: 24px; border-radius: 4px; text-align: left;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #dc2626; font-weight: 700; text-transform: uppercase;">Step 3: Systems Triangulation Calibration</p>
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569;">
                      Reserve a 15-minute calibration briefing with BMR leads to review compiled metrics and the active Statement of Work:
                    </p>
                    <a href="${CALENDLY_BRIEFING_URL}" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 13px; text-decoration: underline;">
                      Schedule Calibration Briefing →
                    </a>
                  </div>

                  <p style="font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 24px;">
                    Sincerely,<br/>
                    <strong style="color: #0f172a;">BMR Advisory Services</strong>
                  </p>
                  
                </div>
              </td>
            </tr>
          </table>
        `;
      } else {
        emailHtml = `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box; text-align: left;">
                  
                  <div style="margin-bottom: 24px;">
                    <h2 style="color: #0f172a; font-weight: 800; margin: 0; letter-spacing: -0.5px; font-size: 20px; line-height: 1.3;">
                      Diagnostic Track Authorized
                    </h2>
                    <p style="color: #64748b; font-family: monospace; font-size: 11px; margin: 4px 0 0 0; font-weight: 600;">
                      Organization: ${prettyCompany}
                    </p>
                  </div>

                  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                    <span style="color: #64748b; font-family: monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
                      ASSIGNED STAKEHOLDER TRACK
                    </span>
                    <span style="color: #0f172a; font-size: 14px; font-weight: 800; display: block;">
                      ${roleTitle}
                    </span>
                  </div>

                  <p style="font-size: 14px; line-height: 1.6; color: #334155; font-weight: 400; margin: 0 0 16px 0;">
                    Leadership at <strong>${prettyCompany}</strong> has authorized a 360° operational diagnostic stream. Your direct technical input is required to evaluate workflow friction and schema stability.
                  </p>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 18px; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-family: monospace; color: #0f172a; font-weight: 700; text-transform: uppercase;">
                      // Execution Instructions
                    </p>
                    <ul style="font-size: 12px; color: #475569; padding-left: 18px; margin: 0; line-height: 1.6;">
                      <li><strong>Estimated Duration:</strong> ~5 to 7 minutes.</li>
                      <li><strong>Format:</strong> Diagnostic wizard evaluating pipeline hygiene and operational bottlenecks.</li>
                      <li><strong>Access Control:</strong> Secure single-participant link generated strictly for your role.</li>
                    </ul>
                  </div>
                  
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; margin: 24px 0; text-align: center; border-radius: 4px;">
                    <p style="font-size: 11px; font-family: monospace; color: #64748b; margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                      SECURE DIAGNOSTIC TERMINAL
                    </p>
                    <a href="${diagnosticLink}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 14px 28px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 12px; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase;">
                      Begin 360 Assessment Track →
                    </a>
                  </div>

                  <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; font-family: monospace; border-top: 1px solid #f1f5f9; padding-top: 20px; margin: 32px 0 0 0; text-transform: uppercase;">
                    Confidential // BMR Advisory Services Independent Governance
                  </p>

                </div>
              </td>
            </tr>
          </table>
        `;
      }

      emailPromises.push(sgMail.send({
        to: targetEmail,
        from: { name: "BMR Solutions", email: FROM_EMAIL },
        subject: `ACTION REQUIRED: ${dbPersona} Track Assessment Authorized // ${prettyCompany}`,
        html: emailHtml
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
