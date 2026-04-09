import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// 🛡️ SECURITY HANDSHAKE
// Using your specific environment variable from the previous working code
sgMail.setApiKey(process.env.BMR_SENDGRID_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Pages Router uses req.method check instead of export async function POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'INVALID_RECIPIENT' });
    }

    // Generate a 6-digit Operator Key
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co', 
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

    // 📡 DISPATCHING TO SENDGRID
    await sgMail.send(msg);

    // Return the 'challenge' key so the frontend's validateOperatorKey can compare
    return res.status(200).json({ success: true, challenge: otp });

  } catch (error: any) {
    // Forensic logging for Vercel
    console.error("BMR_AUTH_SHEAR:", error.response?.body || error.message);
    return res.status(500).json({ 
      error: 'TRANSMISSION_FAILURE', 
      details: error.message 
    });
  }
}
