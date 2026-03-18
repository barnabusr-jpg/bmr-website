import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  // FIXED: Destructured only used variables to satisfy Vercel Linting
  const { name, email, org, zoneData } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  const msg = {
    to: email,
    from: 'hello@bmradvisory.co',
    subject: `[Priority Signal] Forensic Maturity Signature: ${org}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 40px; border: 1px solid #333;">
        <h2 style="color: #00F2FF; text-transform: uppercase; letter-spacing: 2px;">Forensic Signal Captured</h2>
        <p>Hello ${firstName},</p>
        <p>The diagnostic for <strong>${org}</strong> is complete.</p>
        <div style="background-color: #262626; border-left: 4px solid #00F2FF; padding: 20px; margin: 25px 0;">
           <p style="font-size: 14px;">Results have been mapped to your profile. A maturity review is recommended.</p>
        </div>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch {
    // FIXED: Removed 'error' variable to pass build
    return res.status(500).json({ error: "Transmission Failure" });
  }
}
