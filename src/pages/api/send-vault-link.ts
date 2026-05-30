import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { email, orgName, auditId } = req.body;

  if (!email || !auditId) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_PARAMETERS' });
  }

  try {
    const secureUrl = `https://www.bmradvisory.co/results/${auditId}`;
    const encodedEmail = encodeURIComponent(email.trim().toLowerCase());
    const calendlyUrl = `https://calendly.com/hello-bmradvisory/forensic-briefing?email=${encodedEmail}`;
    const targetEmail = email.toLowerCase().trim();
    const formattedOrg = orgName?.toUpperCase() || 'CLIENT_NODE';

    // ─── TRANSACTION 01: IMMEDIATE PORTAL VAULT DELIVERY ───────────────────
    await resend.emails.send({
      from: 'BMR Advisory <hello@BMRadvisory.co>',
      to: targetEmail,
      subject: `SECURE_SIGNAL: Forensic Assessment Anchored // ${formattedOrg}`,
      html: `
        <div style="background: #020617; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 60px 40px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          
          <div style="margin-bottom: 40px; border-left: 4px solid #dc2626; padding-left: 16px;">
            <h2 style="color: #ffffff; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 24px;">FORENSIC_SIGNAL_ANCHORED</h2>
            <p style="color: #64748b; font-family: monospace; font-size: 10px; margin: 4px 0 0 0; letter-spacing: 0.2em;">ENTITY_REF // ${formattedOrg}</p>
          </div>
          
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; font-style: italic; text-transform: uppercase; font-weight: 700; margin-bottom: 30px;">
            Your forensic report has compiled successfully and is saved to your secure profile ledger.
          </p>
          
          <div style="background: #090d16; border: 1px solid #1e293b; padding: 32px; margin: 40px 0; text-align: center;">
            <p style="font-size: 10px; font-family: monospace; color: #475569; margin-bottom: 20px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
              SECURE_WORKSPACE_TOKEN // ${auditId}
            </p>
            <p style="font-size: 13px; line-height: 1.5; color: #94a3b8; margin: 0 0 24px 0; text-align: left;">
              If you closed your window, lost your active session connection, or need to review your interactive capital erosion matrix from a mobile device, launch the workspace hook below:
            </p>
            <a href="${secureUrl}" style="background: #dc2626; color: #ffffff; padding: 16px 32px; font-weight: 900; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-style: italic;">
              Access Your Forensic Vault
            </a>
          </div>

          <p style="font-size: 11px; color: #475569; line-height: 1.8; text-transform: uppercase; font-weight: bold; font-family: monospace; border-top: 1px solid #0f172a; padding-top: 20px;">
            Your permanent access key corresponds directly to this baseline instance. Use your live dashboard console to coordinate your strategic briefing registration.
          </p>
          
          <p style="font-size: 9px; color: #334155; font-family: monospace; margin-top: 20px; text-transform: uppercase;">
            CONFIDENTIALITY NOTICE: This transmission connects securely to internal corporate metrics. Do not forward.
          </p>
        </div>
      `
    });

    // ─── TRANSACTION 02: AUTOMATED FUTURE REMINDER QUEUE ───────────────────
    // Calculates a precise timestamp offset of exactly 48 hours out from this submission millisecond
    const fortyEightHoursInMs = 48 * 60 * 60 * 1000;
    const futureDeliveryTarget = new Date(Date.now() + fortyEightHoursInMs);

    await resend.emails.send({
      from: 'BMR Advisory <hello@BMRadvisory.co>',
      to: targetEmail,
      subject: `REMINDER_SIGNAL: Action Required for Assessment // ${formattedOrg}`,
      // Instructs Resend infrastructure to park this task until the timestamp matures
      scheduledAt: futureDeliveryTarget.toISOString(),
      // Meta-tagging lets us intercept and purge this specific item later when a booking hooks in
      tags: [
        { name: 'audit_id', value: auditId },
        { name: 'email_type', value: '48hr_reminder' }
      ],
      html: `
        <div style="background: #020617; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 60px 40px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          
          <div style="margin-bottom: 40px; border-left: 4px solid #eab308; padding-left: 16px;">
            <h2 style="color: #ffffff; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 24px;">ACTION_REQUIRED</h2>
            <p style="color: #64748b; font-family: monospace; font-size: 10px; margin: 4px 0 0 0; letter-spacing: 0.2em;">UNRESOLVED // TIMELINE CONFIGURATION</p>
          </div>
          
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; font-style: italic; text-transform: uppercase; font-weight: 700; margin-bottom: 25px;">
            Our ledger indicates you have not yet coordinated your live briefing slot for ${formattedOrg}.
          </p>

          <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin-bottom: 35px;">
            To formalize your data points and translate your capital erosion metrics into a structured roadmap with our advisory steering team, you must finalize your calendar placement:
          </p>
          
          <div style="background: #090d16; border: 1px solid #1e293b; padding: 32px; margin: 30px 0; text-align: center;">
            <a href="${calendlyUrl}" style="background: #ffffff; color: #020617; padding: 14px 28px; font-weight: 900; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; font-style: italic; margin-bottom: 15px;">
              Schedule Briefing Window →
            </a>
            <br />
            <a href="${secureUrl}" style="color: #64748b; font-family: monospace; font-size: 10px; text-decoration: underline; text-transform: uppercase; font-weight: bold; tracking-wide: 1px;">
              // Or click here to review your active vault data
            </a>
          </div>

          <p style="font-size: 11px; color: #475569; line-height: 1.8; text-transform: uppercase; font-weight: bold; font-family: monospace; border-top: 1px solid #0f172a; padding-top: 20px;">
            CONFIDENTIALITY NOTICE: This transmission connects securely to internal corporate metrics. Do not forward.
          </p>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'INTERNAL_TRANSMISSION_FAILURE', message: err.message });
  }
}
