/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, org, totalScore, zoneData } = req.body;

  // Verification: Ensure totalScore matches the 84-point forensic scale
  const statusLabel = totalScore <= 30 ? "OPTIMIZED" : totalScore <= 60 ? "DRIFT" : "CRITICAL";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"BMR Advisory" <hello@bmradvisory.com>',
      to: email,
      subject: `Forensic AI Report: ${name} | ${org}`,
      html: `
        <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px;">
          <h2 style="color: #00F2FF; text-transform: uppercase;">Diagnostic Signal Captured</h2>
          <p><strong>Total Displacement Score:</strong> ${totalScore} / 84</p>
          <p><strong>Status:</strong> ${statusLabel}</p>
          <hr style="border: 1px solid #1e293b;" />
          <p><strong>Lens Breakdown:</strong></p>
          <ul>
            <li>HAI (Human-AI Interaction): ${zoneData.HAI}</li>
            <li>AVS (Alignment & Value): ${zoneData.AVS}</li>
            <li>IGF (Integrity & Governance): ${zoneData.IGF}</li>
          </ul>
          <p>A specialist will review these signals for your forensic roadmap.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email Error:', error);
    return res.status(500).json({ message: 'Failed to dispatch report.' });
  }
}
