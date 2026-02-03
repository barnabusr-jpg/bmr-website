import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body;

  // 1. Internal Notification (To BMR Strategists)
  const internalMsg = {
    to: 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co', 
    replyTo: email, 
    subject: `BMR Contact Inquiry - ${name}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px; border-radius: 8px;">
        <h2 style="color: #14b8a6; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">New Strategic Inquiry</h2>
        <div style="margin-top: 24px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
        </div>
        <div style="margin-top: 24px; padding: 16px; background: #0f172a; border-left: 4px solid #14b8a6;">
          <p style="white-space: pre-wrap; color: #cbd5e1; margin: 0;">${message}</p>
        </div>
      </div>
    `,
  };

  // 2. External Auto-Reply (To Prospect)
  const autoReplyMsg = {
    to: email,
    from: 'hello@bmradvisory.co',
    subject: 'Signal Received | BMR Advisory',
    html: `
      <div style="font-family: sans-serif; color: #020617; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <h2 style="color: #14b8a6; font-size: 24px; letter-spacing: -0.02em;">Inquiry Received.</h2>
        <p>Thank you for reaching out to BMR Advisory, ${name.split(' ')[0]}.</p>
        <p>We have received your strategic inquiry regarding <strong>${company || 'your organization'}</strong>. A strategist is currently reviewing the friction points you described.</p>
        <p>You can expect a direct response within 24–48 hours to discuss the specific architecture required to close your Promise Gap™.</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-weight: bold; color: #020617;">BMR Advisory</p>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Trust. Govern. Evolve.</p>
        </div>
      </div>
    `,
  };

  try {
    // Dispatch both emails in parallel
    await Promise.all([
      sgMail.send(internalMsg),
      sgMail.send(autoReplyMsg)
    ]);
    
    return res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    // Detailed error logging for Vercel troubleshooting
    console.error("Email Dispatch Error:", error.response?.body || error.message);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
