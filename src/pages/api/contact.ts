import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your Vercel environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body;

  // 2. Define the email payload
  const msg = {
    // Must be the same verified email used in your diagnostic
    to: 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co', 
    replyTo: email,
    subject: `Strategic Inquiry: ${name} (${company || 'General'})`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px; border: 1px solid #1e293b; border-radius: 12px;">
        <h2 style="color: #14b8a6; margin-top: 0;">New Strategic Inquiry</h2>
        <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px;"><strong>Organization:</strong> ${company || 'Not specified'}</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="color: #cbd5e1; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        <p style="margin-top: 40px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 16px;">
          Received from BMR Advisory Landing Page
        </p>
      </div>
    `,
  };

  try {
    // 3. Attempt to send
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    // 4. Log the specific error to Vercel Logs for troubleshooting
    console.error("SendGrid Error:", error.response?.body || error.message);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
