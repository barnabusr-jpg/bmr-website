import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_KEY as string);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { auditId } = req.body;

  if (!auditId) {
    return res.status(400).json({ error: 'Missing audit ID parameters.' });
  }

  try {
    // 1. Retrieve raw audit telemetry, lead email, and status flags
    const { data: audit, error: auditError } = await supabaseAdmin
      .from('audits')
      .select('org_name, lead_email, id, is_released, status')
      .eq('id', auditId)
      .single();

    if (auditError || !audit) {
      throw new Error(auditError?.message || 'Audit record not found.');
    }

    const recipientEmail = audit.lead_email;
    if (!recipientEmail) {
      throw new Error('No target email address associated with this audit file.');
    }

    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bmradvisory.co';
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co'; 
    const cleanRecoveryLink = `${BASE_URL}/results/${audit.id}`;

    // 2. Assess current visibility mode (blurred vs unblurred) to brand the dispatch appropriately
    const isUnblurred = audit.is_released || audit.status?.toUpperCase() === 'PAID';
    const currentPortalStateLabel = isUnblurred ? "Executive Diagnostic Report" : "Diagnostic Summary";

    // 3. Dispatch the automated recovery packet via SendGrid
    await sgMail.send({
      to: recipientEmail.trim().toLowerCase(),
      from: {
        name: "BMR Solutions",
        email: FROM_EMAIL
      },
      subject: `Executive Results Portal Access // ${audit.org_name}`,
      html: `
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box;">
                
                <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.5px;">
                  BMR Solutions // Executive Diagnostic Access
                </h2>
                <p style="font-size: 11px; font-family: monospace; color: #64748b; margin: 0 0 20px 0; font-weight: 600;">
                  Target Organization: ${audit.org_name}
                </p>
                
                <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                
                <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 24px 0;">
                  As requested, we have re-sent your direct access link to the <strong>${currentPortalStateLabel}</strong> for ${audit.org_name}. Select the button below to view your interactive audit dashboard.
                </p>
                
                <div style="margin-bottom: 32px;">
                  <a href="${cleanRecoveryLink}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: 700; display: inline-block; font-size: 12px; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase;">
                    Open Executive Results Portal →
                  </a>
                </div>
                
                <p style="font-size: 11px; font-family: monospace; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px; margin: 0; text-transform: uppercase;">
                  Confidential // BMR Solutions Independent Advisory
                </p>

              </div>
            </td>
          </tr>
        </table>
      `
    });

    return res.status(200).json({ status: 'SUCCESS' });
  } catch (err: any) {
    console.error("Link re-transmission failure:", err.message);
    return res.status(500).json({ error: 'RE-TRANSMISSION FAILURE', message: err.message });
  }
}
