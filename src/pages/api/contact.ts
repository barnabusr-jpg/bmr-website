import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// 1. Initialize with the confirmed Key from your working diagnostic
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 2. Only allow POST requests, just like the diagnostic route
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 3. Destructure data from req.body
  const { name, email, company, message } = req.body;

  const msg = {
    // 4. Critical: 'to' and 'from' must match your verified sender
    to: 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co', 
    replyTo: email, 
    // Subject line formatted to match the high-priority style of the diagnostic
    subject: `New Strategic Inquiry: ${company || 'General'} — ${name}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px; border: 1px solid #1e293b; border-radius: 8px;">
        <h2 style="color: #14b8a6; margin-bottom: 24px;">Strategic Inquiry Received</h2>
        <p style="margin-bottom: 8px;"><strong>Lead Name:</strong> ${name}</p>
        <p style="margin-bottom: 8px;"><strong>Lead Email:</strong> ${email}</p>
        <p style="margin-bottom: 24px;"><strong>Organization:</strong> ${company || 'Not Provided'}</p>
        <div style="padding: 20px; background: #0f172a; border-radius: 4px; border-left: 4px solid #14b8a6;">
          <p style="white-space: pre-wrap; color: #cbd5e1; line-height: 1.6; margin: 0;">${message}</p>
        </div>
        <p style="margin-top: 32px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; pt: 16px;">
          Origin: BMR Advisory Landing Page
        </p>
      </div>
    `,
  };

  try {
    // 5. Execute the send confirmed to work earlier
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch (err: any) {
    // 6. Log specific SendGrid rejection to Vercel logs for debugging
    console.error("SendGrid Rejection:", err.response?.body || err.message);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
