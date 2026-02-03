import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Use a fallback to prevent initialization errors
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

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

  // Map text responses back to numerical impact
  const scoreValue: Record<string, number> = {
    "Strongly Agree": 5, "Agree": 4, "Neutral": 3, "Disagree": 2, "Strongly Disagree": 1
  };

  // Logic: Calculate Pillar Averages
  const getAvg = (ids: number[]) => {
    const total = ids.reduce((sum, id) => {
      // Look up answer by string ID
      const answerText = answers[id.toString()];
      return sum + (scoreValue[answerText] || 0);
    }, 0);
    return (total / ids.length).toFixed(1);
  };

  const trustAvg = getAvg([1, 2, 3, 4]);
  const governAvg = getAvg([5, 6, 7, 8]);
  const evolveAvg = getAvg([9, 10, 11, 12]);

  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
    bcc: 'hello@bmradvisory.co', // Automatic lead notification for BMR
    subject: `Strategic Synthesis: Diagnostic Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #020617; line-height: 1.6;">
        <h2 style="color: #14b8a6; letter-spacing: -0.02em;">Strategic Synthesis</h2>
        <p>Hello ${firstName},</p>
        <p>Your diagnostic observation for <strong>${organization}</strong> is complete. We have synthesized your responses into three core strategic lenses:</p>
        
        <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid #e2e8f0;">
          <div style="margin-bottom: 16px;">
            <strong style="font-size: 16px;">Trust Lens: ${trustAvg} / 5.0</strong><br/>
            <span style="font-size: 13px; color: #64748b;">Measures alignment between system behavior and stakeholder expectations.</span>
          </div>
          
          <div style="margin-bottom: 16px;">
            <strong style="font-size: 16px;">Governance Lens: ${governAvg} / 5.0</strong><br/>
            <span style="font-size: 13px; color: #64748b;">Measures the robustness of oversight and accountability structures.</span>
          </div>
          
          <div>
            <strong style="font-size: 16px;">Evolution Lens: ${evolveAvg} / 5.0</strong><br/>
            <span style="font-size: 13px; color: #64748b;">Measures the capacity to de-risk and adapt AI systems in real-time.</span>
          </div>
        </div>

        <h3 style="color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Detailed Signals</h3>
        <ul style="list-style: none; padding: 0;">
          ${Object.entries(answers).map(([id, val]) => `
            <li style="margin-bottom: 12px; font-size: 13px; border-bottom: 1px border-bottom-style: dotted; border-bottom-color: #e2e8f0; padding-bottom: 4px;">
              <span style="color: #64748b;">${questionMap[id]}:</span> <strong style="color: #14b8a6; float: right;">${val}</strong>
              <div style="clear: both;"></div>
            </li>
          `).join('')}
        </ul>

        <div style="margin-top: 32px; padding: 20px; border-left: 4px solid #14b8a6; background: #f0fdfa;">
          <p style="margin: 0; font-weight: bold; color: #020617;">The Promise Gap™ Analysis</p>
          <p style="margin: 8px 0 0 0; font-size: 14px; color: #0d9488;">These scores identify specific friction points in your architecture. A BMR strategist will review this synthesis and contact you to discuss next steps.</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    console.error("Diagnostic Dispatch Error:", error.response?.body || error.message);
    return res.status(500).json({ message: 'Error' });
  }
}
