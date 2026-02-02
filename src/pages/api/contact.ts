import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Ensure the Key is initialized exactly as in your diagnostic file
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Destructure the data coming from the landing page form
  const { name, email, company, message } = req.body;

  const msg = {
    // Both must be your verified SendGrid address
    to: 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co', 
    replyTo: email, 
    subject: `BMR Contact Inquiry - ${name}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px; border-radius: 8px;">
        <h2 style="color: #14b8a6; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">New Strategic Inquiry</h2>
        <div style="margin-top: 24px; space-y: 8px;">
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

  try {
    // Using the same sending logic as the diagnostic completion
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    // Log details to Vercel so we can see why SendGrid rejected it
    console.error("Contact Form Error:", error.response?.body || error.message);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
