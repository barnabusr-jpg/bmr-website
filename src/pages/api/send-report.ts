import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Security Handshake - Unified with BMR_SENDGRID_KEY
sgMail.setApiKey(process.env.BMR_SENDGRID_KEY || process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, organization, reworkTax, role } = req.body;

  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co';
  const prettyCompany = organization || 'Your Organization';
  const formattedRole = role || 'Executive';

  // Standardized Calendly Link
  const calendlyUrl = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}&utm_campaign=${encodeURIComponent(prettyCompany)}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co', 
    from: `BMR Solutions <${FROM_EMAIL}>`,
    subject: `SteerCo Diagnostic Summary // ${prettyCompany}`, 
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; background-color: #ffffff; color: #0f172a; padding: 40px; border-top: 6px solid #0f172a; margin: 20px auto; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 6px;">
        
        <h2 style="font-weight: 800; font-size: 20px; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.5px;">
          Diagnostic Report Available
        </h2>
        
        <p style="font-size: 11px; font-family: monospace; color: #64748b; font-weight: 600; margin: 0 0 24px 0; text-transform: uppercase;">
          Prepared for: ${prettyCompany} | Track: ${formattedRole}
        </p>

        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0"/>
        
        <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
          Hello ${name?.split(' ')[0] || 'there'},
        </p>
        
        <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
          We have finalized the initial risk analysis for <strong>${prettyCompany}</strong> evaluating your pre-automation AI readiness, schema stability, and operational friction.
        </p>
        
        <div style="background-color: #f8fafc; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; border-radius: 4px;">
          <p style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #64748b; margin: 0; font-weight: 700;">
            Estimated Annual Capital Exposure:
          </p>
          <p style="font-size: 28px; font-weight: 800; margin: 8px 0; color: #0f172a;">
            $${reworkTax} Million
          </p>
          <p style="font-size: 12px; color: #475569; margin: 0; line-height: 1.5;">
            Reflects internal Process Waste Tax and total Promise Gap™ risk across uninsulated engineering pipelines.
          </p>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
          Your provisional diagnostic results have been compiled and are ready for board and CFO review to serve as your executive funding request.
        </p>

        <div style="margin-bottom: 32px;">
          <a href="${calendlyUrl}" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: 700; text-transform: uppercase; font-size: 12px; display: inline-block; border-radius: 4px; letter-spacing: 1px;">
            Schedule Executive Review Briefing →
          </a>
        </div>
        
        <p style="font-size: 11px; font-family: monospace; color: #94a3b8; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px; text-transform: uppercase;">
          Confidential // BMR Solutions Independent Governance
        </p>
      </div>`
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("BMR_DISPATCH_FRACTURE:", error.message);
    return res.status(500).json({ error: 'TRANSMISSION_FAILURE' });
  }
}
