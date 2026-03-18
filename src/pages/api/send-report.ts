import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, name, org, totalScore, zoneData } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: '"BMR Advisory" <hello@bmradvisory.com>',
      to: email,
      subject: `[Maturity Benchmark] BMR Signal Diagnostic: ${org}`,
      html: `
        <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px;">
          <h2 style="color: #00F2FF;">FORENSIC OBSERVATION REPORT</h2>
          <p>Hello ${name}, the BMR Signal Diagnostic for ${org} is complete.</p>
          <p><strong>Total Displacement Score:</strong> ${totalScore} / 84</p>
          <hr />
          <p><strong>Lens Breakdown:</strong></p>
          <ul>
            <li>HAI: ${zoneData.HAI}</li>
            <li>AVS: ${zoneData.AVS}</li>
            <li>IGF: ${zoneData.IGF}</li>
          </ul>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to dispatch.' });
  }
}
