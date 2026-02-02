import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, company, message } = req.body;

  const msg = {
    to: 'hello@bmradvisory.co', // Your destination
    from: 'hello@bmradvisory.co', // Verified SendGrid sender
    replyTo: email,
    subject: `New Inquiry: ${company} - ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px;">
        <h2 style="color: #14b8a6;">New Strategic Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${company}</p>
        <hr style="border-color: #1e293b;" />
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email' });
  }
}
