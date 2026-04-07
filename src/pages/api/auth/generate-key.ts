import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;

  // 🛡️ BMR Security: Generate a secure 6-digit key
  // In production, store this in Redis/DB with the email to verify later
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const msg = {
    to: email,
    from: 'security@yourdomain.com', // Verified SendGrid Sender
    subject: `[BMR-AUTH] Your Operator Access Key: ${otp}`,
    text: `BMR Forensic Node Authorization. Your temporary access key is: ${otp}`,
    html: `
      <div style="font-family: monospace; background: #020617; color: white; padding: 40px; border: 1px solid #dc2626;">
        <h2 style="color: #dc2626; text-transform: uppercase;">Node Authorization Required</h2>
        <p style="letter-spacing: 2px;">OPERATOR IDENTITY VERIFICATION INITIATED.</p>
        <div style="background: #0f172a; padding: 20px; text-align: center; font-size: 24px; border: 1px border #1e293b;">
          <strong>${otp}</strong>
        </div>
        <p style="font-size: 10px; color: #475569; margin-top: 20px;">KEY EXPIRES IN 5 MINUTES. BMR SECURITY PROTOCOL 7 ACTIVE.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    // Note: For a real app, save the OTP to your database here to check against in finalizeAccess
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'TRANSMISSION_FAILURE' });
  }
}
