import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });

  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'INVALID_RECIPIENT' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const msg = {
    to: email,
    from: 'hello@bmradvisory.co', 
    subject: `[BMR-AUTH] Operator Access Key: ${otp}`,
    html: `
      <div style="font-family: monospace; background-color: #020617; color: white; padding: 50px; border: 2px solid #dc2626;">
        <h1 style="color: #dc2626; text-transform: uppercase; font-style: italic;">Node Authorization</h1>
        <p style="color: #94a3b8; text-transform: uppercase; font-size: 11px;">Verification Initiated: ${email}</p>
        <div style="margin: 40px 0; padding: 30px; background-color: #0f172a; border: 1px solid #1e293b; text-align: center;">
          <span style="font-size: 42px; font-weight: bold; letter-spacing: 10px; color: white; font-style: italic;">${otp}</span>
        </div>
        <p style="color: #475569; font-size: 10px;">BMR SECURITY PROTOCOL 7 ACTIVE // KEY EXPIRES IN 5M</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true, challenge: otp });
  } catch (error: any) {
    console.error("SENDGRID_ERROR:", error.response?.body || error.message);
    return res.status(500).json({ error: 'TRANSMISSION_FAILURE' });
  }
}
