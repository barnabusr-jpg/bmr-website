import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const SENDGRID_KEY = process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_KEY as string);

// 🚀 PRIVILEGED MASTER ADMIN ACCESS INITIALIZATION
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🔓 VAULT ACTIVATION ATTEMPT - INCOMING BODY:", JSON.stringify(req.body));

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { auditId, orgName, email, userName } = req.body;

  // 🌍 DYNAMIC SYSTEM SUBDOMAIN OVERLAY RESOLUTION
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL 
    ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '') 
    : req.headers.host 
      ? `https://${req.headers.host}` 
      : 'https://www.bmradvisory.co';

  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co';

  if (!auditId || !email) {
    console.error("❌ VAULT CRASH: Payload is missing key identification requirements.");
    return res.status(400).json({ error: 'MISSING ROUTING PARAMETERS' });
  }

  try {
    const secureVaultLink = `${BASE_URL}/vault/secure-drop?id=${auditId}`;

    // 1. Persist Vault Activation Tracking flags back into the core database row safely bypassing RLS
    const { error: updateError } = await supabaseAdmin
      .from('audits')
      .update({
        vault_activated: true,
        vault_released_at: new Date().toISOString()
      })
      .eq('id', auditId);

    if (updateError) {
      throw new Error(`Primary Ledger Vault Activation Flags Failure: ${updateError.message}`);
    }

    // 2. Deliver pristine structural email drop alerts via SendGrid
    await sgMail.send({
      to: email.trim().toLowerCase(),
      from: FROM_EMAIL,
      subject: `SECURE DOCUMENT VAULT ACTIVATED // ${orgName.toUpperCase()}`,
      html: `
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: monospace;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <div style="max-width: 600px; width: 100%; background: #020617; color: #ffffff; padding: 40px; border: 2px solid #ffffff; box-sizing: border-box;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="left" style="text-align: left;">
                      <h2 style="color: #ffffff; font-family: monospace; font-size: 20px; font-weight: 900; text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 1px;">
                        BMR Solutions // Secure Data Escrow
                      </h2>
                      <p style="font-family: monospace; font-size: 10px; color: #64748b; margin: 0 0 20px 0; text-transform: uppercase;">
                        Organization: ${orgName} | Access: Designated Custodian Token
                      </p>
                      <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;"/>
                      <p style="font-family: monospace; line-height: 1.6; font-size: 13px; color: #94a3b8; margin: 0 0 15px 0;">
                        Greetings ${userName || 'Node Custodian'}, your private framework file storage drop room has been securely configured. 
                      </p>
                      <p style="font-family: monospace; line-height: 1.6; font-size: 13px; color: #94a3b8; margin: 0 0 25px 0;">
                        Please utilize the access verification link below to enter your secure container drop. Inside the workspace, you can safely drop system dependency configuration scripts, financial cloud expense sheets, and AI operational telemetry architecture trees.
                      </p>
                      <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 40px;">
                        <tr>
                          <td align="left">
                            <a href="${secureVaultLink}" target="_blank" style="background: #ffffff; color: #020617; padding: 18px 30px; text-decoration: none; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; border: 1px solid #ffffff;">
                              Access Secure Vault Drop Room →
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="font-family: monospace; font-size: 10px; color: #475569; margin: 40px 0 0 0; border-top: 1px solid #1e293b; padding-top: 20px; text-transform: uppercase;">
                        Encrypted Connection // BMR Solutions Storage Infrastructure Layer
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      `
    });

    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Vault storage allocation corridors initialized cleanly.'
    });

  } catch (error: any) {
    console.error("VAULT SEVERE GATEWAY EXCEPTION BREAKDOWN:", error.message);
    return res.status(500).json({
      error: 'VAULT INFRASTRUCTURE REJECTION',
      message: error.message
    });
  }
}
