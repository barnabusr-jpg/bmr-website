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
    // 🎯 DYNAMIC BASE URL RESOLUTION (Supports local dev, staging & production)
    const host = req.headers.host || 'localhost:3000';
    const protocol = req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
    
    // 🎯 DETERMINISTIC SECURE RESULTS LINK
    const secureUrl = `${baseUrl}/results/${auditId}`;

    const targetEmail = email.toLowerCase().trim();
    const formattedOrg = orgName ? orgName.trim() : 'Your Organization';
    const namePrefix = userName ? `${userName}: ` : '';

    const sendgridPayload = {
      personalizations: [
        {
          to: [{ email: targetEmail }],
          subject: `${namePrefix}Executive Diagnostic Access // ${formattedOrg}`
        }
      ],
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
        name: 'BMR Solutions'
      },
      content: [
        {
          type: 'text/html',
          value: `
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box; text-align: left;">
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left" style="text-align: left;">
                          
                          <div style="margin-bottom: 24px;">
                            <h2 style="color: #0f172a; font-weight: 800; margin: 0; letter-spacing: -0.5px; font-size: 20px; line-height: 1.3;">
                              ${namePrefix}Diagnostic Complete
                            </h2>
                            <p style="color: #64748b; font-family: monospace; font-size: 11px; margin: 4px 0 0 0; font-weight: 600;">
                              Target Organization: ${formattedOrg}
                            </p>
                          </div>
                          
                          <!-- 🎯 CLEAN EMAIL-CLIENT COMPLIANT HR TAG -->
                          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;">

                          <p style="font-size: 14px; line-height: 1.6; color: #334155; font-weight: 400; margin: 0 0 24px 0;">
                            Your diagnostic findings have been processed and recorded to your organization's executive portal ledger. Select the button below to view your interactive audit dashboard.
                          </p>
                          
                          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; margin: 24px 0; text-align: center; border-radius: 4px;">
                            <p style="font-size: 11px; font-family: monospace; color: #64748b; margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                              RECORD REF // ${auditId}
                            </p>
                            
                            <!-- 🎯 VERIFIED CLICKABLE CTA LINK -->
                            <a href="${secureUrl}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 14px 28px; font-weight: 700; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; border-radius: 4px;">
                              Open Executive Results Portal &rarr;
                            </a>
                          </div>

                          <!-- 🎯 CLEAN FOOTER HR TAG -->
                          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;">

                          <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; font-family: monospace; margin: 12px 0 0 0; text-transform: uppercase;">
                            Confidential // BMR Solutions Independent Governance
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

    return res.status(200).json({ success: true, secureUrl });

  } catch (err: any) {
    return res.status(500).json({ error: 'SERVER_EXCEPTION', message: err.message });
  }
}
