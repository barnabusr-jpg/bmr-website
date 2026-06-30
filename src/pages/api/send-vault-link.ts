import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { email, orgName, auditId, userName } = req.body;

  if (!email || !auditId) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_PARAMETERS' });
  }

  const apiKey = process.env.SENDGRID_API_KEY || process.env.BMR_SENDGRID_KEY;

  try {
    const secureUrl = `https://www.bmradvisory.co/results/${auditId}`;
    const targetEmail = email.toLowerCase().trim();
    const formattedOrg = orgName?.toUpperCase() || 'CLIENT NODE';
    const namePrefix = userName ? `${userName}: ` : '';

    const sendgridPayload = {
      personalizations: [
        {
          to: [{ email: targetEmail }],
          subject: `${namePrefix}Forensic Assessment Complete // ${formattedOrg}`
        }
      ],
      from: {
        email: 'hello@bmradvisory.co',
        name: 'BMR Solutions'
      },
      content: [
        {
          type: 'text/html',
          value: `
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <div style="max-width: 600px; width: 100%; background: #020617; color: #cbd5e1; padding: 40px; border: 1px solid #1e293b; box-sizing: border-box; text-align: left;">
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left" style="text-align: left;">
                          
                          <div style="margin-bottom: 40px; border-left: 4px solid #dc2626; padding-left: 16px;">
                            <h2 style="color: #ffffff; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 22px; line-height: 1.3;">
                              ${namePrefix}Forensic Assessment Complete
                            </h2>
                            <p style="color: #64748b; font-family: monospace; font-size: 11px; margin: 6px 0 0 0; letter-spacing: 0.1em; font-weight: bold;">
                              ENTITY REF // ${formattedOrg}
                            </p>
                          </div>
                          
                          <h3 style="color: #ffffff; font-weight: 800; text-transform: uppercase; font-size: 16px; letter-spacing: 1px; margin-bottom: 16px;">
                            Forensic Verdict
                          </h3>

                          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; font-weight: 500; margin: 0 0 30px 0;">
                            Your completed forensic signals are saved to your secure profile ledger and can be accessed below:
                          </p>
                          
                          <div style="background: #090d16; border: 1px solid #1e293b; padding: 32px; margin: 40px 0; text-align: center;">
                            <p style="font-size: 10px; font-family: monospace; color: #475569; margin-bottom: 20px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
                              SECURE WORKSPACE TOKEN // ${auditId}
                            </p>
                            <a href="${secureUrl}" style="background: #dc2626; color: #ffffff; padding: 16px 32px; font-weight: 900; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-style: italic;">
                              Access Your Forensic Vault
                            </a>
                          </div>

                          <p style="font-size: 11px; color: #475569; line-height: 1.8; text-transform: uppercase; font-weight: bold; font-family: monospace; border-top: 1px solid #0f172a; padding-top: 20px; margin: 40px 0 0 0;">
                            Your permanent access key corresponds directly to this baseline instance. Use your live dashboard console to coordinate your strategic briefing registration.
                          </p>

                        </td>
                      </tr>
                    </table>

                  </div>
                </td>
              </tr>
            </table>
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
