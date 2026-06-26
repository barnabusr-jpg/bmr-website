import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { endpoints, companyName, activePillar, originUrl } = req.body;

  if (!endpoints || !companyName || !activePillar) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_PARAMETERS' });
  }

  const apiKey = process.env.SENDGRID_API_KEY || process.env.BMR_SENDGRID_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'MISSING_SENDGRID_CREDENTIALS' });
  }

  // 📋 Elevated Premium Vector Labels to give explicit instruction context
  const roleLabels: Record<string, string> = {
    EXECUTIVE: 'Executive Leadership (Strategic Oversight Node)',
    TECH_MGMT: 'Technical Management (Infrastructure & DevOps Node)',
    OPS_MGMT: 'Operations Management (Workflow & Process Node)',
    SYSTEM_USER: 'Core System Operator (Terminal Execution Node)'
  };

  try {
    const formattedOrg = companyName.toUpperCase().trim();
    
    const mailRequests = Object.entries(endpoints).map(([roleKey, emailAddress]) => {
      const targetEmail = (emailAddress as string).toLowerCase().trim();
      const roleName = roleLabels[roleKey] || roleKey;
      
      const diagnosticUrl = `${originUrl}?role=${roleKey}&org=${encodeURIComponent(formattedOrg)}&pillar=${activePillar}`;

      const sendgridPayload = {
        personalizations: [
          {
            to: [{ email: targetEmail }],
            subject: `ACTION REQUIRED: Quad-Vector Diagnostic Stream Initialized // ${formattedOrg}`
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
              <div style="display: none; max-height: 0px; overflow: hidden;">
                Secure Forensic Diagnostic access matrix has been generated for your operational vector.
              </div>
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <div style="max-width: 600px; width: 100%; background: #020617; color: #cbd5e1; padding: 40px; border: 1px solid #1e293b; box-sizing: border-box; text-align: left;">
                      
                      <div style="margin-bottom: 40px; border-left: 4px solid #dc2626; padding-left: 16px;">
                        <h2 style="color: #ffffff; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 20px; line-height: 1.3;">
                          // Quad-Vector Matrix Initialized
                        </h2>
                        <p style="color: #64748b; font-family: monospace; font-size: 11px; margin: 6px 0 0 0; letter-spacing: 0.1em; font-weight: bold;">
                          TARGET ENTITY // ${formattedOrg}
                        </p>
                      </div>
                      
                      <div style="background-color: #000000; border-left: 4px solid #dc2626; padding: 15px; margin: 25px 0;">
                        <span style="color: #64748b; font-size: 9px; font-family: monospace; font-weight: bold; display: block; margin-bottom: 4px;">// ASSIGNED VECTOR</span>
                        <strong style="color: #ffffff; font-size: 14px; text-transform: uppercase; font-family: sans-serif;">${roleName.toUpperCase()}</strong>
                      </div>

                      <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; font-weight: 500; margin: 0 0 30px 0;">
                        BMR Solutions has initiated a consolidated Quad-Vector Correlation stream for <strong>${formattedOrg}</strong>. Your specific structural perspective has been mapped to isolate friction, systemic inefficiencies, and risk anomalies within the <strong>${activePillar} Framework Layer</strong>.
                      </p>
                      
                      <div style="background: #090d16; border: 1px solid #1e293b; padding: 32px; margin: 40px 0; text-align: center;">
                        <p style="font-size: 10px; font-family: monospace; color: #475569; margin-bottom: 20px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
                          SECURE DIAGNOSTIC ACCESS TERMINAL
                        </p>
                        <a href="${diagnosticUrl}" style="background: #dc2626; color: #ffffff; padding: 16px 32px; font-weight: 900; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-style: italic;">
                          Launch Assessment Node
                        </a>
                      </div>

                      <p style="font-size: 11px; color: #475569; line-height: 1.8; text-transform: uppercase; font-weight: bold; font-family: monospace; border-top: 1px solid #0f172a; padding-top: 20px; margin: 40px 0 0 0;">
                        CONFIDENTIALITY NOTICE: This entry link is uniquely customized for your operational assignment. Do not forward this telemetry signal.
                      </p>

                    </div>
                  </td>
                </tr>
              </table>
            `
          }
        ]
      };

      return fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(sendgridPayload)
      });
    });

    const outcomes = await Promise.all(mailRequests);
    const failedDispatch = outcomes.find(res => !res.ok);

    if (failedDispatch) {
      const errDetails = await failedDispatch.text();
      return res.status(500).json({ error: 'PARTIAL_OR_TOTAL_SENDGRID_FRACTURE', details: errDetails });
    }

    return res.status(200).json({ success: true, status: 'BATCH_DISPATCH_COMPLETE' });

  } catch (err: any) {
    return res.status(500).json({ error: 'SERVER_MATRIX_EXCEPTION', message: err.message });
  }
}
