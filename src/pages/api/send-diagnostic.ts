import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const questionMap: Record<string, string> = {
  "1": "Shared non-technical language for AI reliability",
  "2": "Alignment of AI outputs with brand values",
  "3": "Consistency of AI behavior in unscripted scenarios",
  "4": "Proactive measurement of stakeholder sentiment",
  "5": "Standardized oversight from conception to delivery",
  "6": "Mapping of accountability to specific leadership roles",
  "7": "Protocols for human intervention during fluctuations",
  "8": "Adaptability of governance to evolving landscapes",
  "9": "Priority on structured observation of system risks",
  "10": "Formal de-risking phase prior to real-world operation",
  "11": "Integration of AI strategy with systemic goals",
  "12": "Leadership review of AI-induced delivery risks"
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { to, firstName, answers } = req.body;

  const formattedSignals = Object.entries(answers)
    .map(([id, value]) => `
      <li style="margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Signal ${id}</div>
        <div style="font-weight: 500;">${questionMap[id] || 'Strategic Observation'}</div>
        <div style="color: #14b8a6; font-weight: 600;">Response: ${value}</div>
      </li>
    `).join('');

  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
    subject: `Strategic Synthesis: Diagnostic Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #020617;">
        <h2 style="color: #14b8a6;">Diagnostic Synthesis Complete</h2>
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the BMR Strategic Diagnostic. Your results highlight several key signals regarding your organizational Promise Gap™:</p>
        <ul style="list-style: none; padding: 0;">${formattedSignals}</ul>
        <p style="font-size: 14px; color: #64748b; background: #f8fafc; padding: 15px; border-radius: 8px;">
          <strong>Analysis:</strong> These observations are the first step in closing the gap between AI intent and system behavior. A strategist will review these signals to prepare your full synthesis.
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch {
    // No 'error' variable here = No Vercel build failure
    return res.status(500).json({ message: 'Internal Error' });
  }
