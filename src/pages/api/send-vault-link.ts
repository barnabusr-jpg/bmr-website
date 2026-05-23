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

    await resend.emails.send({
      from: 'BMR Advisory <hello@BMRadvisory.co>',
      to: email.toLowerCase().trim(),
      subject: `SECURE_SIGNAL: Forensic Assessment Anchored // ${orgName?.toUpperCase() || 'CLIENT_NODE'}`,
      html: `
        <div style="background: #020617; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 60px 40px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          <div style="margin-bottom: 40px; border-left: 4px solid #dc2626; padding-left: 16px;">
            <h2 style="color: #ffffff; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 24px;">FORENSIC_SIGNAL_ANCHORED</h2>
            <p style="color: #64748b; font-family: monospace; font-size: 10px; margin: 4px 0 0 0; letter-spacing: 0.2em;">ENTITY_REF // ${orgName?.toUpperCase() || 'CLIENT_NODE'}</p>
          </div>
          
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; font-style: italic; text-transform: uppercase; font-weight: 700;">
            Your forensic report has compiled successfully and is saved to your secure profile.
          </p>
          
          <div style="background: #090d16; border: 1px solid #1e293b; padding: 32px; margin: 40px 0; text-align: center;">
            <p style="font-size: 10px; font-family: monospace; color: #475569; margin-bottom: 20px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
              SECURE_WORKSPACE_TOKEN // ${auditId}
            </p>
            <a href="${secureUrl}" style="background: #dc2626; color: #ffffff; padding: 16px 32px; font-weight: 900; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-style: italic;">
              Access Your Forensic Vault
            </a>
          </div>

          <p style="font-size: 11px; color: #475569; line-height: 1.8; text-transform: uppercase; font-weight: bold; font-family: monospace; border-top: 1px solid #0f172a; padding-top: 20px;">
            Your permanent access key has been emailed to the email address provided. Use your portal link to coordinate your live briefing reservation.
          </p>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'INTERNAL_TRANSMISSION_FAILURE', message: err.message });
  }
}
