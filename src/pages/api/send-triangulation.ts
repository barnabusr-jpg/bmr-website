import type { NextApiRequest, NextApiResponse } from 'next';

function toSentenceCase(str: string): string {
  if (!str) return 'Your company';
  const clean = str.replace(/_/g, ' ').toLowerCase().trim();
  return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { endpoints, companyName, activePillar, originUrl, isNudge } = req.body;

  if (!endpoints || !companyName) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_PARAMETERS' });
  }

  const apiKey = process.env.SENDGRID_API_KEY || process.env.BMR_SENDGRID_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'MISSING_SENDGRID_CREDENTIALS' });
  }

  const roleLabels: Record<string, string> = {
    EXECUTIVE: 'Executive Leadership (Strategic Oversight Track)',
    TECH_MGMT: 'Technical Management (Infrastructure & DevOps Track)',
    OPS_MGMT: 'Operations Management (Workflow & Process Track)',
    SYSTEM_USER: 'Core System Operator (Terminal Execution Track)'
  };

  const roleToPillarMap: Record<string, string> = {
    EXECUTIVE: 'IGF',
    TECH_MGMT: 'AVS',
    OPS_MGMT: 'HAI',
    SYSTEM_USER: 'HAI'
  };

  try {
    const formattedOrg = companyName.trim();
    const sentenceCompany = toSentenceCase(companyName);
    const targetPillar = activePillar || 'AVS';

    const cleanOrigin = (originUrl || 'https://www.bmradvisory.co/forensic')
      .replace(/\/diagnostic\/forensic\/?$/, '/forensic');
    
    const mailRequests = Object.entries(endpoints).map(([roleKey, emailAddress]) => {
      if (!emailAddress || typeof emailAddress !== 'string') return null;

      const targetEmail = (emailAddress as string).toLowerCase().trim();
      const roleName = roleLabels[roleKey] || roleKey;
      const dynamicTrack = roleToPillarMap[roleKey] || targetPillar;
      
      // auth=true REMOVED TO PREVENT PARTICIPANT/ADMIN SESSION COLLISIONS
      const diagnosticUrl = `${cleanOrigin}?role=${roleKey}&track=${roleKey}&persona=${roleKey}&org=${encodeURIComponent(formattedOrg)}&pillar=${dynamicTrack}&flow=quad_node`;

      let emailHtmlValue = '';

      if (roleKey === 'EXECUTIVE' && !isNudge) {
        emailHtmlValue = `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box; text-align: left;">
                  
                  <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.5px;">
                    BMR Solutions // Quad-Node Diagnostic Dispatch
                  </h2>
                  <p style="font-size: 11px; font-family: monospace; color: #64748b; margin: 0 0 20px 0; font-weight: 600;">
                    Target Organization: ${formattedOrg}
                  </p>
                  
                  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                  
                  <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 16px 0;">
                    The Quad-Node pre-automation diagnostic assessment for <strong>${sentenceCompany}</strong> is underway.
                  </p>

                  <p style="line-height: 1.6; font-size: 14px; color: #334155; margin: 0 0 24px 0;">
                    Invitation links have been dispatched across the 4 Quad-Node persona tracks (Executive, Tech Management, Ops Management, System User) to evaluate operational friction, schema stability, and risk guardrails.
                  </p>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 20px; margin-bottom: 16px; border-radius: 4px; text-align: left;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 1: Executive Assessment Module</p>
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569;">
                      Access your direct link below to complete your assigned executive assessment module:
                    </p>
                    <a href="${diagnosticUrl}" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 13px; text-decoration: underline;">
                      Open Executive Quad-Node Track →
                    </a>
                  </div>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #64748b; padding: 20px; margin-bottom: 24px; border-radius: 4px; text-align: left;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #64748b; font-weight: 700; text-transform: uppercase;">Step 2: Quad-Node Stakeholder Alignment</p>
                    <p style="margin: 0; font-size: 13px; color: #475569;">
                      Ensure technical management, operations management, and core system users access their respective node links.
                    </p>
                  </div>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #dc2626; padding: 20px; margin-bottom: 24px; border-radius: 4px; text-align: left;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; color: #dc2626; font-weight: 700; text-transform: uppercase;">Step 3: Executive Briefing</p>
                    <a href="https://calendly.com/hello-bmradvisory/forensic-briefing" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 13px; text-decoration: underline;">
                      Schedule Calibration Briefing →
                    </a>
                  </div>

                  <p style="font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 24px;">
                    Sincerely,<br/>
                    <strong style="color: #0f172a;">BMR Solutions Independent Advisory</strong>
                  </p>
                  
                </div>
              </td>
            </tr>
          </table>
        `;
      } else {
        emailHtmlValue = `
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; width: 100%; background: #ffffff; color: #0f172a; padding: 40px; border: 1px solid #e2e8f0; border-top: 6px solid #0f172a; border-radius: 6px; box-sizing: border-box; text-align: left;">
                  
                  <div style="margin-bottom: 24px;">
                    <h2 style="color: #0f172a; font-weight: 800; margin: 0; letter-spacing: -0.5px; font-size: 20px; line-height: 1.3;">
                      ${isNudge ? 'Quad-Node Assessment Reminder' : 'Quad-Node Diagnostic Track Authorized'}
                    </h2>
                    <p style="color: #64748b; font-family: monospace; font-size: 11px; margin: 4px 0 0 0; font-weight: 600;">
                      Organization: ${formattedOrg}
                    </p>
                  </div>

                  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                    <span style="color: #64748b; font-family: monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 4px;">
                      ASSIGNED STAKEHOLDER TRACK
                    </span>
                    <span style="color: #0f172a; font-size: 14px; font-weight: 800; display: block;">
                      ${roleName}
                    </span>
                  </div>

                  <p style="font-size: 14px; line-height: 1.6; color: #334155; font-weight: 400; margin: 0 0 24px 0;">
                    Leadership at <strong>${sentenceCompany}</strong> has provisioned a Quad-Node operational diagnostic stream. Your direct feedback is required to evaluate workflow friction and schema stability within the <strong>${dynamicTrack} Framework Layer</strong>.
                  </p>
                  
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; margin: 24px 0; text-align: center; border-radius: 4px;">
                    <p style="font-size: 11px; font-family: monospace; color: #64748b; margin-bottom: 16px; font-weight: 600; text-transform: uppercase;">
                      SECURE DIAGNOSTIC TERMINAL
                    </p>
                    <a href="${diagnosticUrl}" style="background: #0f172a; color: #ffffff; padding: 14px 28px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 12px; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase;">
                      Launch Quad-Node Track →
                    </a>
                  </div>

                  <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; font-family: monospace; border-top: 1px solid #f1f5f9; padding-top: 20px; margin: 32px 0 0 0; text-transform: uppercase;">
                    Confidential // BMR Solutions Independent Governance
                  </p>

                </div>
              </td>
            </tr>
          </table>
        `;
      }

      const subjectLine = isNudge
        ? `REMINDER: Quad-Node Assessment Gateway // ${formattedOrg}`
        : `ACTION REQUIRED: Quad-Node Diagnostic Authorized // ${formattedOrg}`;

      const sendgridPayload = {
        personalizations: [
          {
            to: [{ email: targetEmail }],
            subject: subjectLine
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

    const activeRequests = mailRequests.filter(Boolean);
    const outcomes = await Promise.all(activeRequests);
    const failedDispatch = outcomes.find(res => res && !res.ok);

    if (failedDispatch) {
      const errDetails = await failedDispatch.text();
      return res.status(500).json({ error: 'SENDGRID_DISPATCH_FRACTURE', details: errDetails });
    }

    return res.status(200).json({ success: true, status: isNudge ? 'NUDGE_DISPATCH_COMPLETE' : 'BATCH_DISPATCH_COMPLETE' });

  } catch (err: any) {
    return res.status(500).json({ error: 'SERVER_MATRIX_EXCEPTION', message: err.message });
  }
}
