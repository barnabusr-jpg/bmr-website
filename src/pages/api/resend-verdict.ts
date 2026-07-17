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
    const currentPortalStateLabel = isUnblurred ? "SYSTEM REALITY PORTAL" : "EFFICIENCY VERDICT MATRIX";

    // 3. Dispatch the automated recovery packet via SendGrid
    await sgMail.send({
      to: recipientEmail.trim().toLowerCase(),
      from: {
        name: "BMR SOLUTIONS",
        email: FROM_EMAIL
      },
      subject: `RE-TRANSMISSION: ${currentPortalStateLabel} // ${audit.org_name}`,
      html: `
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: monospace;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <div style="max-width: 600px; width: 100%; background: #020617; color: #ffffff; padding: 40px; border: 2px solid #dc2626; box-sizing: border-box; text-transform: uppercase;">
                <h2 style="color: #dc2626; font-size: 20px; font-weight: 900; margin: 0 0 5px 0;">BMR Solutions // Systems Audit Engine</h2>
                <p style="font-size: 10px; color: #64748b; margin: 0 0 20px 0;">Target: ${audit.org_name}</p>
                <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0"/>
                <p style="line-height: 1.6; font-size: 13px; color: #94a3b8; text-transform: none; margin: 0 0 25px 0;">
                  As requested, we have re-transmitted the secure access key to your active ${currentPortalStateLabel}. Select the link below to initialize your terminal view.
                </p>
                <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 40px;">
                  <tr>
                    <td align="left">
                      <a href="${cleanRecoveryLink}" target="_blank" style="background: #dc2626; color: #ffffff; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 12px; letter-spacing: 2px;">
                        Open Systems Portal →
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="font-size: 10px; color: #475569; border-top: 1px solid #1e293b; padding-top: 20px;">
                  Confidential // BMR Solutions Stakeholder Secure Connection
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
