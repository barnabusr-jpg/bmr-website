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

  const { to, firstName, organization, answers } = req.body;

  // Conversion: Map text responses back to numbers for calculation
  const scoreValue: Record<string, number> = {
    "Strongly Agree": 5, "Agree": 4, "Neutral": 3, "Disagree": 2, "Strongly Disagree": 1
  };

  // Logic: Calculate Pillar Averages
  const getAvg = (ids: number[]) => {
    const total = ids.reduce((sum, id) => sum + (scoreValue[answers[id]] || 0), 0);
    return (total / ids.length).toFixed(1);
  };

  const trustAvg = getAvg([1, 2, 3, 4]);
  const governAvg = getAvg([5, 6, 7, 8]);
  const evolveAvg = getAvg([9, 10, 11, 12]);

  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
    bcc: 'hello@bmradvisory.co', // Lead Enrichment: BMR gets a copy automatically
    subject: `Strategic Synthesis: Diagnostic Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #020617;">
        <h2 style="color: #14b8a6;">BMR Strategic Synthesis</h2>
        <p>Hello ${firstName},</p>
        <p>Your diagnostic observation for <strong>${organization}</strong> is complete. We have synthesized your responses into three core strategic lenses:</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
          <p><strong>Trust Lens: ${trustAvg}/5.0</strong><br/>
          <small>Measures alignment between system behavior and stakeholder expectations.</small></p>
          
          <p><strong>Governance Lens: ${governAvg}/5.0</strong><br/>
          <small>Measures the robustness of oversight and accountability structures.</small></p>
          
          <p><strong>Evolution Lens: ${evolveAvg}/5.0</strong><br/>
          <small>Measures the capacity to de-risk and adapt AI systems in real-time.</small></p>
        </div>

        <h3 style="color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Detailed Signals</h3>
        <ul style="list-style: none; padding: 0;">
          ${Object.entries(answers).map(([id, val]) => `
            <li style="margin-bottom: 10px; font-size: 13px;">
              <strong>${questionMap[id]}:</strong> <span style="color: #14b8a6;">${val}</span>
            </li>
          `).join('')}
        </ul>

        <div style="margin-top: 30px; border-top: 2px solid #14b8a6; pt: 20px;">
          <p><strong>Next Step:</strong> These scores identify the specific depth of your <strong>Promise Gap™</strong>. A BMR strategist will review this synthesis shortly.</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch {
    return res.status(500).json({ message: 'Error' });
  }
}
