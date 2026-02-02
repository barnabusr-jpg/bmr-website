import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// 1. Initialize SendGrid using the Vercel Environment Variable
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 2. Security: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, firstName, answers } = req.body;

  // 3. Validation: Ensure frontend is sending required data
  if (!to || !firstName) {
    return res.status(400).json({ message: 'Missing recipient email or name' });
  }

  // 4. Construct the Payload using Vercel Variables
  const msg = {
    to: to,
    // Uses the SENDGRID_FROM_EMAIL variable from your Vercel Settings
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co', 
    replyTo: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
    subject: `BMR Strategic Diagnostic: Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #020617;">
        <h2 style="color: #14b8a6; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Diagnostic Signal Received</h2>
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the BMR Strategic Diagnostic. Your organizational "Promise Gap" data is being synthesized by our team.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 20px;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #64748b;">Raw Observation Data:</h3>
          <pre style="white-space: pre-wrap; word-wrap: break-word; font-size: 13px;">${JSON.stringify(answers, null, 2)}</pre>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
          <em>This is an automated delivery of your diagnostic signals. A strategist will be in touch if follow-up is required.</em>
        </p>
      </div>
    `,
  };

  try {
    // 5. Final Check: Ensure API key is actually present before sending
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is missing from Vercel Environment Variables.");
    }

    await sgMail.send(msg);
    console.log(`Diagnostic successfully sent to: ${to}`);
    return res.status(200).json({ message: 'Email sent successfully' });

  } catch (error: any) {
    // 6. Descriptive Error Logging for Vercel Observability
    const errorDetail = error.response?.body?.errors[0]?.message || error.message;
    console.error('SendGrid Error:', errorDetail);

    return res.status(500).json({ 
      message: 'Failed to send diagnostic results',
      debug: errorDetail // This allows us to see the exact rejection reason in the UI if needed
    });
  }
}
