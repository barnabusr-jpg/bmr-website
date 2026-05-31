import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { email, orgName, auditId } = req.body;

  if (!email || !auditId) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_PARAMETERS' });
  }

  const apiKey = process.env.SENDGRID_API_KEY || process.env.BMR_SENDGRID_KEY;

  try {
    const secureUrl = `https://www.bmradvisory.co/results/${auditId}`;
    const targetEmail = email.toLowerCase().trim();
    const formattedOrg = orgName?.toUpperCase() || 'CLIENT_NODE';

    const sendgridPayload = {
      personalizations: [
        {
          to: [{ email: targetEmail }],
          subject: `SECURE_SIGNAL: Forensic Assessment Anchored // ${formattedOrg}`
        }
      ],
      from: {
        email: 'hello@bmradvisory.co',
        name: 'BMR Advisory'
      },
      content: [
        {
          type: 'text/html',
          value: `
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
        }
      ]
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(sendgridPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'SENDGRID_ERROR', details: errorText });
    }

    return res.status(200).json({ success: true });

  } catch (err: any) {
    return res.status(500).json({ error: 'SERVER_EXCEPTION', message: err.message });
  }
}
