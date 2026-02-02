import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Map the IDs to the actual question text used in your DiagnosticTool
const questionMap: Record<string, string> = {
  "1": "AI decision logic is transparent to all stakeholders.",
  "2": "Oversight owners are clearly identified for every AI project.",
  "3": "We have measurable indicators for stakeholder trust.",
  "4": "The Promise Gap is actively monitored in our AI deployments.",
  // ... continue mapping for questions 5 through 12
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { to, firstName, answers } = req.body;

  // Transform raw signals into a readable HTML list
  const formattedSignals = Object.entries(answers)
    .map(([id, value]) => `
      <li style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
        <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Observation ${id}</div>
        <div style="font-weight: 500; color: #0f172a;">${questionMap[id] || 'Strategic Metric'}</div>
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
        <p>Below are the strategic signals captured during your BMR diagnostic observation:</p>
        
        <ul style="list-style: none; padding: 0; margin-top: 24px;">
          ${formattedSignals}
        </ul>

        <div style="margin-top: 32px; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
            <strong>Analysis:</strong> These results help identify where AI-enabled system behavior may be diverging from leadership expectations. A strategist will review these signals to determine your organizational Promise Gap™.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Email sent' });
  } catch {
    // Note: Variable removed to satisfy Vercel build linting
    return res.status(500).json({ message: 'Failed to send' });
  }
}
