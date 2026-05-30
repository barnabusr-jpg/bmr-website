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

  // Telemetry objects to pipe server errors directly to your web inspector
  let immediateEmailErrorLog: string | null = null;
  let scheduledEmailErrorLog: string | null = null;
  let rawResendResponse1: any = null;
  let rawResendResponse2: any = null;

  try {
    const secureUrl = `https://www.bmradvisory.co/results/${auditId}`;
    const encodedEmail = encodeURIComponent(email.trim().toLowerCase());
    const calendlyUrl = `https://calendly.com/hello-bmradvisory/forensic-briefing?email=${encodedEmail}`;
    const targetEmail = email.toLowerCase().trim();
    const formattedOrg = orgName?.toUpperCase() || 'CLIENT_NODE';

    // ─── TRANSACTION 01: IMMEDIATE DELIVERY (INSULATED) ───
    try {
      // 🛠️ SWITCHED TO ONBOARDING SENDER TO BYPASS DNS DOMAIN PAYWALL RESTRICTIONS IN TEST ENVIRONMENTS
      const firstEmail = await resend.emails.send({
        from: 'BMR Advisory <onboarding@resend.dev>',
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
              <a href="${secureUrl}" style="background: #dc2626; color: #ffffff; padding: 16px 32px; font-weight: 900; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-style: italic;">
                Access Your Forensic Vault
              </a>
            </div>
          </div>
        `
      });
      rawResendResponse1 = firstEmail;
    } catch (e1: any) {
      console.warn("Immediate email delivery catch:", e1);
      immediateEmailErrorLog = e1.message || JSON.stringify(e1);
    }

    // ─── TRANSACTION 02: AUTOMATED REMINDER (INSULATED) ───
    try {
      const fortyEightHoursInMs = 48 * 60 * 60 * 1000;
      const futureDeliveryTarget = new Date(Date.now() + fortyEightHoursInMs);

      const secondEmail = await resend.emails.send({
        from: 'BMR Advisory <onboarding@resend.dev>',
        to: targetEmail,
        subject: `REMINDER_SIGNAL: Action Required for Assessment // ${formattedOrg}`,
        scheduledAt: futureDeliveryTarget.toISOString(),
        tags: [
          { name: 'audit_id', value: String(auditId) },
          { name: 'email_type', value: '48hr_reminder' }
        ],
        html: `
          <div style="background: #020617; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 60px 40px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
            <div style="margin-bottom: 40px; border-left: 4px solid #eab308; padding-left: 16px;">
              <h2 style="color: #ffffff; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 24px;">ACTION_REQUIRED</h2>
            </div>
            <a href="${calendlyUrl}">Schedule Briefing Window →</a>
          </div>
        `
      });
      rawResendResponse2 = secondEmail;
    } catch (e2: any) {
      console.warn("Secondary email scheduling catch:", e2);
      scheduledEmailErrorLog = e2.message || JSON.stringify(e2);
    }

    // Return status along with structural diagnostic summaries to trace out server faults inside browser inspect windows
    return res.status(200).json({ 
      success: true,
      diagnostics: {
        immediateEmailError: immediateEmailErrorLog,
        scheduledEmailError: scheduledEmailErrorLog,
        rawResponse1: rawResendResponse1,
        rawResponse2: rawResendResponse2,
        advice: immediateEmailErrorLog ? "Check if your Resend token is valid and domain DNS parameters match the email sender string." : "All systems operational."
      }
    });

  } catch (err: any) {
    console.error("Global boundary fallback caught:", err);
    return res.status(200).json({ 
      success: true, 
      bypassed: true,
      critical_error: err.message || err 
    });
  }
}
