import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// 🛡️ SECURITY HANDSHAKE - Unified with BMR_SENDGRID_KEY
sgMail.setApiKey(process.env.BMR_SENDGRID_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, organization, reworkTax, role } = req.body;

  // 🗓️ Standardized Calendly (Ensures consistency for the briefing)
  const calendlyUrl = `https://calendly.com/bmr-solutions/forensic-review?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&utm_campaign=${encodeURIComponent(organization)}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co', 
    from: 'BMR Solutions <hello@bmradvisory.co>',
    subject: `Your Audit Results: ${organization}`, 
    html: `
      <div style="font-family: sans-serif; max-width: 600px; background-color: #ffffff; color: #020617; padding: 40px; border-top: 4px solid #dc2626; margin: 20px auto; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
        <h2 style="text-transform: uppercase; font-weight: 900; font-size: 22px; color: #dc2626; margin-bottom: 20px; letter-spacing: -0.5px;">
          Your Forensic Audit is Complete
        </h2>
        
        <p style="font-size: 16px; line-height: 1.6;">Hello ${name.split(' ')[0] || 'there'},</p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          We have finished analyzing the data for <strong>${organization}</strong>. By looking at your business through the <strong>${role} Lens</strong>, we have identified specific areas where your operations are losing efficiency.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Our analysis shows that hidden friction in your workflow is creating a "Rework Tax." This means your team is likely losing significant time and money fixing avoidable mistakes or dealing with confusing processes.
        </p>
        
        <div style="background-color: #f8fafc; padding: 30px; margin: 30px 0; border: 1px solid #e2e8f0; border-left: 4px solid #dc2626;">
          <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin: 0; font-weight: bold; letter-spacing: 1px;">Estimated Yearly Waste:</p>
          <p style="font-size: 28px; font-weight: 900; margin: 10px 0; color: #020617;">
            $${reworkTax} Million
          </p>
          <p style="font-size: 13px; color: #475569; margin: 0;">
            This represents capital that is being "taxed" by inefficient systems.
          </p>
        </div>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          I have attached your <strong>Forensic Briefing PDF</strong> to this email. It highlights the highest-risk zones in your current setup. 
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          I have opened up a few spots on my calendar this week to walk you through these results and show you a roadmap to stop this waste. You can grab 15 minutes below.
        </p>

        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${calendlyUrl}" style="background-color: #dc2626; color: #ffffff; padding: 20px 40px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px; display: inline-block; border-radius: 4px; box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);">
            Schedule Your Result Review →
          </a>
        </div>
        
        <p style="font-size: 10px; color: #94a3b8; margin-top: 50px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
          BMR ADVISORY // SECURE AUDIT DISPATCH // CONFIDENTIAL
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
