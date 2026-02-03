import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const ceoTranslation: Record<number, string> = {
  1: "VALUE DRAIN: High friction; requires constant manual 'life support' to function.",
  2: "STRANDED ASSET: Theoretically functional, but bypassed or ignored by the team.",
  3: "UTILITY ONLY: Handles basic tasks but provides no 'lift' for high-value work.",
  4: "OPERATIONAL LIFT: Measurably increases capacity; humans and AI are in sync.",
  5: "CAPITAL MULTIPLIER: Resilient and self-correcting; generates new strategic value."
};

const scoreMap: Record<string, number> = {
  "Value Drain": 1, "Stranded Asset": 2, "Utility Only": 3, "Operational Lift": 4, "Capital Multiplier": 5
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  
  const { to, firstName, organization, answers } = req.body;

  const getAvg = (ids: number[]) => {
    const scores = ids.map(id => scoreMap[answers[id]] || 0);
    const sum = scores.reduce((a, b) => a + b, 0);
    return (sum / ids.length).toFixed(1);
  };

  const trustAvg = getAvg([1, 2, 3, 4]);
  const governAvg = getAvg([5, 6, 7, 8]);
  const evolveAvg = getAvg([9, 10, 11, 12]);

  const clientMsg = {
    to,
    from: 'hello@bmradvisory.co',
    subject: `Strategic Synthesis: Diagnostic Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; color: #020617; max-width: 600px;">
        <h2 style="color: #14b8a6;">BMR Strategic Synthesis</h2>
        <p>Hello ${firstName}, your Diagnostic for <strong>${organization}</strong> is complete.</p>
        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
          <p><strong>Trust Lens: ${trustAvg}/5.0</strong><br/><small>${ceoTranslation[Math.round(Number(trustAvg))]}</small></p>
          <p><strong>Governance Lens: ${governAvg}/5.0</strong><br/><small>${ceoTranslation[Math.round(Number(governAvg))]}</small></p>
          <p><strong>Evolution Lens: ${evolveAvg}/5.0</strong><br/><small>${ceoTranslation[Math.round(Number(evolveAvg))]}</small></p>
        </div>
      </div>
    `,
  };

  const leadAlert = {
    to: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `🚨 NEW LEAD: ${organization} Diagnostic`,
    html: `
      <h2>New Diagnostic Lead</h2>
      <p><strong>Name:</strong> ${firstName}<br/><strong>Org:</strong> ${organization}<br/><strong>Email:</strong> ${to}</p>
      <p><strong>Scores:</strong> T: ${trustAvg} | G: ${governAvg} | E: ${evolveAvg}</p>
      <pre style="background: #f4f4f4; padding: 15px;">${JSON.stringify(answers, null, 2)}</pre>
    `
  };

  try {
    await Promise.all([sgMail.send(clientMsg), sgMail.send(leadAlert)]);
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed' });
  }
}
