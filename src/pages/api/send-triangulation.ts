import type { NextApiRequest, NextApiResponse } from 'next';

// ✨ UPDATED: Full title capitalization formatting to align with dispatch-directives behavior
function toSentenceCase(str: string): string {
  if (!str) return 'Your company';
  const clean = str.replace(/_/g, ' ').toLowerCase().trim();
  return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

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

  const roleLabels: Record<string, string> = {
    EXECUTIVE: 'Executive Leadership (Strategic Oversight Node)',
    TECH_MGMT: 'Technical Management (Infrastructure & DevOps Node)',
    OPS_MGMT: 'Operations Management (Workflow & Process Node)',
    SYSTEM_USER: 'Core System Operator (Terminal Execution Node)'
  };

  const roleToPillarMap: Record<string, string> = {
    EXRaw: 'IGF',
    EXECUTIVE: 'IGF',
    TECH_MGMT: 'AVS',
    OPS_MGMT: 'HAI',
    SYSTEM_USER: 'HAI'
  };

  try {
    const formattedOrg = companyName.toUpperCase().trim();
    const sentenceCompany = toSentenceCase(companyName);
    
    const mailRequests = Object.entries(endpoints).map(([roleKey, emailAddress]) => {
      const targetEmail = (emailAddress as string).toLowerCase().trim();
      const roleName = roleLabels[roleKey] || roleKey;
      
      const dynamicTrack = roleToPillarMap[roleKey] || activePillar;
      
      const diagnosticUrl = `${originUrl}?role=${roleKey}&org=${encodeURIComponent(formattedOrg)}&pillar=${dynamicTrack}`;

      // Initialize the email html content string
      let emailHtmlValue = '';

      if (roleKey === 'EXECUTIVE') {
        // DISPATCH ONE: Consolidated Multi-Node Quad Executive Integration Flow
        emailHtmlValue = `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: monospace;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #020617; color: #ffffff; padding: 40px; border: 2px solid #dc2626; box-sizing: border-box; text-transform: uppercase;">
                  
                  <h2 style="color: #dc2626; font-size: 18px; font-weight: 900; margin: 0 0 5px 0;">BMR Solutions // Quad-Node Diagnostic Dispatch</h2>
                  <p style="font-size: 10px; color: #64748b; margin: 0 0 20px 0;">Target System: ${formattedOrg}</p>
                  
                  <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0"/>
                  
                  <p style="line-height: 1.6; font-size: 13px; color: #94a3b8; text-transform: none; margin: 0 0 20px 0; font-family: sans-serif;">
                    We have successfully initialized the quad node triangulation protocol for your organization. This process requires inputs from four distinct layers of your team footprint.
                  </p>

                  <p style="line-height: 1.6; font-size: 13px; color: #94a3b8; text-transform: none; margin: 0 0 20px 0; font-family: sans-serif;">
                    We have sent separate system diagnostic tracks to your technical, operational, and system execution operators. Please instruct those leads to check their email folders for their direct links. Because automated security filters can redirect these links, ask them to inspect their spam folders.
                  </p>

                  <p style="line-height: 1.6; font-size: 13px; color: #94a3b8; text-transform: none; margin: 0 0 25px 0; font-family: sans-serif;">
                    To proceed, you must complete your setup process using the two secure system links below:
                  </p>

                  <!-- STEP 1: Executive Assessment Track -->
                  <div style="background-color: #090d1f; border: 1px solid #1e293b; padding: 20px; margin-bottom: 20px; text-align: left;">
                    <p style="margin: 0 0 10px 0; font-size: 11px; color: #64748b; font-weight: bold;">Step 1: Complete Your Diagnostic Track</p>
                    <a href="${diagnosticUrl}" target="_blank" style="color: #ffffff; text-decoration: underline; font-weight: bold; font-size: 13px;">
                      Open Executive Assessment Track →
                    </a>
                  </div>

                  <!-- STEP 2: Calendar Booking -->
                  <div style="background-color: #090d1f; border: 1px solid #1e293b; padding: 20px; margin-bottom: 30px; text-align: left;">
                    <p style="margin: 0 0 10px 0; font-size: 11px; color: #64748b; font-weight: bold;">Step 2: Secure Calibration Date</p>
                    <a href="https://calendly.com/hello-bmradvisory/quad-node-calibration" target="_blank" style="color: #ffffff; text-decoration: underline; font-weight: bold; font-size: 13px;">
                      Lock Calibration Session on Calendar →
                    </a>
                  </div>

                  <p style="line-height: 1.6; font-size: 13px; color: #94a3b8; text-transform: none; margin: 0 0 20px 0; font-family: sans-serif;">
                    Your chosen calibration date will establish the timeline for your operators to submit their telemetry. We look forward to analyzing your custom systems map.
                  </p>
                  
                  <p style="font-size: 10px; color: #475569; border-top: 1px solid #1e293b; padding-top: 20px;">
                    Confidential System Transmission // Secure Infrastructure Validation Link
                  </p>
                  
                </div>
              </td>
            </tr>
          </table>
        `;
      } else {
        // DISPATCH TWO: Standalone Standard Operator Notification Assets for Technical, Operations, and System Users
        emailHtmlValue = `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #020617; color: #cbd5e1; padding: 40px; border: 1px solid #1e293b; box-sizing: border-box; text-align: left;">
                  
                  <div style="margin-bottom: 40px; border-left: 4px solid #dc2626; padding-left: 16px;">
                    <h2 style="color: #ffffff; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 20px; line-height: 1.3;">
                      // Quad-Node Assessment Initialized
                    </h2>
                    <p style="color: #64748b; font-family: monospace; font-size: 11px; margin: 6px 0 0 0; letter-spacing: 0.1em; font-weight: bold;">
                      TARGET ENTITY // ${formattedOrg}
                    </p>
                  </div>
                  
                  <div style="background-color: #0f172a; border-left: 4px solid #dc2626; padding: 24px; margin-bottom: 32px; box-sizing: border-box;">
                    <span style="color: #ef4444; font-family: monospace; font-size: 10px; font-weight: 900; letter-spacing: 0.2em; display: block; margin-bottom: 6px;">
                      // ASSIGNED VECTOR
                    </span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: -0.01em; text-transform: uppercase; line-height: 1.4; display: block;">
                      ${roleName.toUpperCase()}
                    </span>
                  </div>

                  <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; font-weight: 500; margin: 0 0 30px 0;">
                    <strong>${sentenceCompany} leadership</strong> recently initiated a specialized Quad-Node Assessment stream for <strong>${formattedOrg}</strong>. Your specific structural perspective has been mapped to isolate friction, systemic inefficiencies, and risk anomalies within the <strong>${dynamicTrack} Framework Layer</strong>.
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
        `;
      }

      const sendgridPayload = {
        personalizations: [
          {
            to: [{ email: targetEmail }],
            subject: `ACTION REQUIRED: Quad-Node Assessment Initialized // ${formattedOrg}`
          }
        ],
        from: {
          email: 'hello@bmradvisory.co',
          name: 'BMR Solutions'
        },
        content: [
          {
            type: 'text/html',
            value: emailHtmlValue
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
