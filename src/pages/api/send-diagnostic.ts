import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Financial translations for the executive synthesis
const ceoTranslation: Record<number, string> = {
  1: "VALUE DRAIN: You are paying for the AI and the labor to fix it. Hidden costs exceed value.",
  2: "STRANDED ASSET: You are paying for capacity that isn't being used. ROI is effectively $0.",
  3: "UTILITY ONLY: The AI is breaking even, but it isn't contributing to growth.",
  4: "OPERATIONAL LIFT: You are saving 20–40% on labor costs and freeing up resources.",
  5: "CAPITAL MULTIPLIER: The AI is a profit center; it is creating new revenue streams."
};

const scoreMap: Record<string, number> = {
  "Value Drain": 1,
  "Stranded Asset": 2,
  "Utility Only": 3,
  "Operational Lift": 4,
  "Capital Multiplier": 5
};

// Map IDs to Human Readable Questions for the Lead Alert
const questionLabels: Record<number, string> = {
  1: "Metric Resonance", 2: "Brand Custody", 3: "Behavioral Predictability (Sue Factor)", 4: "Adoption Sentiment",
  5: "Operational Consistency", 6: "Accountability Mapping", 7: "Intervention Latency", 8: "Evolutionary Agility",
  9: "Root-Cause Resolution", 10: "The De-Risking Phase", 11: "Systemic Synergy", 12: "Longitudinal Vigilance"
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  
  const { to, firstName, organization, answers } = req.body;

  // Calculate Lens Averages
  const getAvg = (ids: number[]) => {
    const scores = ids.map(id => scoreMap[answers[id]] || 0);
    const sum = scores.reduce((a, b) => a + b, 0);
    return (sum / ids.length).toFixed(1);
  };

  const trustAvg = getAvg([1, 2, 3, 4]);
  const governAvg = getAvg([5, 6, 7, 8]);
  const evolveAvg = getAvg([9, 10, 11, 12]);

  // Client-Facing Email (Strategic Synthesis)
  const clientMsg = {
    to,
    from: 'hello@bmradvisory.co',
    subject: `Strategic Synthesis: Diagnostic Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; color: #020617; max-width: 600px; line-height: 1.6;">
        <h2 style="color: #14b8a6;">BMR Strategic Synthesis</h2>
        <p>Hello ${firstName}, your ROI Observation for <strong>${organization}</strong> is complete.</p>
        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="margin-bottom: 15px;"><strong>Trust Lens: ${trustAvg}/5.0</strong><br/>
          <span style="color: #475569; font-size: 14px;">${ceoTranslation[Math.round(Number(trustAvg))]}</span></p>
          
          <p style="margin-bottom: 15px;"><strong>Governance Lens: ${governAvg}/5.0</strong><br/>
          <span style="color: #475569; font-size: 14px;">${ceoTranslation[Math.round(Number(governAvg))]}</span></p>
          
          <p><strong>Evolution Lens: ${evolveAvg}/5.0</strong><br/>
          <span style="color: #475569; font-size: 14px;">${ceoTranslation[Math.round(Number(evolveAvg))]}</span></p>
        </div>
        <p style="padding: 15px; border-left: 4px solid #14b8a6; background: #f0fdfa; color: #0d9488; font-weight: bold;">
          BMR Insight: These scores indicate "Stranded Capital" that can be recovered by closing the Promise Gap&trade;.
        </p>
      </div>
    `,
  };

  // Internal-Facing Lead Alert (Actionable Intelligence)
  const leadAlert = {
    to: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `🚨 NEW LEAD: ${organization} (${trustAvg}/${governAvg}/${evolveAvg})`,
    html: `
      <div style="font-family: sans-serif; color: #0f172a;">
        <h2 style="color: #14b8a6;">New Diagnostic Captured</h2>
        <p><strong>Prospect:</strong> ${firstName}<br/>
           <strong>Email:</strong> ${to}<br/>
           <strong>Organization:</strong> ${organization}</p>
        <hr />
        <h3>Lens Averages:</h3>
        <p>Trust: <strong>${trustAvg}</strong> | Govern: <strong>${governAvg}</strong> | Evolve: <strong>${evolveAvg}</strong></p>
        <hr />
        <h3>Signal Breakdown:</h3>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
          ${Object.entries(answers).map(([id, val]) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${questionLabels[Number(id)]}:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; color: ${scoreMap[String(val)] < 3 ? '#e11d48' : '#0f172a'};">${val}</td>
            </tr>
          `).join('')}
        </table>
        <p style="margin-top: 30px;">
          <a href="mailto:${to}" style="background: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Contact Lead
          </a>
        </p>
      </div>
    `
  };

  try {
    await Promise.all([
      sgMail.send(clientMsg),
      sgMail.send(leadAlert)
    ]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SendGrid Error:", error);
    return res.status(500).json({ error: 'Failed to send' });
  }
}
