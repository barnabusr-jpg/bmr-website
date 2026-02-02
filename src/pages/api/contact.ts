import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, company, message } = req.body;

  const msg = {
    // Both fields must match your verified SendGrid email
    to: 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co', 
    replyTo: email,
    subject: `New Strategic Inquiry: ${company} - ${name}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px;">
        <h2 style="color: #14b8a6;">New Strategic Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${company}</p>
        <hr style="border-color: #1e293b; margin: 20px 0;" />
        <p style="white-space: pre-wrap; color: #cbd5e1; line-height: 1.6;">${message}</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch {
    // Unused variable removed to pass build
    return res.status(500).json({ message: 'Error sending email' });
  }
}
