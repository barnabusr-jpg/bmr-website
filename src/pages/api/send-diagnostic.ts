import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, firstName, answers } = req.body;

  const msg = {
    to: to,
    from: 'hello@bmradvisory.co', // Must be verified in SendGrid
    cc: 'hello@bmradvisory.co',
    subject: `BMR Strategic Advisory: Diagnostic Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>Diagnostic Signals Received</h2>
        <p>Hello ${firstName}, your results are being reviewed.</p>
        <pre>${JSON.stringify(answers, null, 2)}</pre>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
