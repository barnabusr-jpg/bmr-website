import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  const msg = {
    to: email,
    from: 'hello@bmradvisory.co',
    subject: `[Priority Signal] Forensic Maturity Signature: ${org}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 40px; border: 1px solid #333;">
        <h2 style="color: #00F2FF; text-transform: uppercase;">Forensic Signal Captured</h2>
        <p>Hello ${firstName}, the forensic diagnostic for <strong>${org}</strong> is complete.</p>
        <p>A member of our team will reach out shortly to review your maturity signature results.</p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch {
    // No 'error' variable here to avoid "assigned but never used" build error
    return res.status(500).json({ error: "Transmission Failure" });
  }
}
