import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body;

  // 2. Define the email payload with unique identifiers
  const msg = {
    // Both fields must match your verified SendGrid identity
    to: 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co', 
    replyTo: email,
    // Adding a timestamp ensures the subject line is never the same twice
    subject: `[STRATEGIC INQUIRY] ${name} - ${new Date().toLocaleTimeString()}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px; border: 1px solid #1e293b; border-radius: 12px;">
        <h2 style="color: #14b8a6; margin-top: 0; font-size: 24px;">New Strategic Inquiry</h2>
        <p style="font-size: 16px; margin: 10px 0;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px; margin: 10px 0;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px; margin: 10px 0;"><strong>Organization:</strong> ${company || 'Not specified'}</p>
        
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        
        <p style="color: #cbd5e1; line-height: 1.6; white-space: pre-wrap; font-size: 16px;">${message}</p>
        
        <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #1e293b; color: #475569; font-size: 10px;">
          <p style="margin: 0;">Ref ID: ${Math.random().toString(36).substring(7).toUpperCase()} | BMR-LP-CONTACT</p>
          <p style="margin: 4px 0 0 0;">Timestamp: ${new Date().toISOString()}</p>
        </div>
      </div>
    `,
  };

  try {
    // 3. Attempt to send via SendGrid
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    // 4. Detailed error logging for Vercel Dashboard
    console.error("SendGrid Error Details:", error.response?.body || error.message);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
