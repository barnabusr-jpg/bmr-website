import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// CEO translations for the email report
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

  const html = `
    <div style="font-family: sans-serif; color: #0f172a; max-width: 600px;">
      <h2 style="color: #14b8a6;">Strategic Synthesis: ${organization}</h2>
      <p>Hello ${firstName},</p>
      <p>Based on your audit, we have identified the following ROI signals:</p>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="margin-bottom: 15px;"><strong>Trust Lens: ${trustAvg}/5.0</strong><br/>
        <span style="color: #475569; font-size: 14px;">${ceoTranslation[Math.round(Number(trustAvg))]}</span></p>
        
        <p style="margin-bottom: 15px;"><strong>Governance Lens: ${governAvg}/5.0</strong><br/>
        <span style="color: #475569; font-size: 14px;">${ceoTranslation[Math.round(Number(governAvg))]}</span></p>
        
        <p><strong>Evolution Lens: ${evolveAvg}/5.0</strong><br/>
        <span style="color: #475569; font-size: 14px;">${ceoTranslation[Math.round(Number(evolveAvg))]}</span></p>
      </div>

      <p style="padding: 15px; border-left: 4px solid #14b8a6; background: #f0fdfa; color: #0d9488; font-weight: bold;">
        BMR Insight: These scores indicate "Stranded Capital" that can be recovered by closing the Promise Gap™.
      </p>
      
      <p style="font-size: 12px; color: #94a3b8; margin-top: 30px;">
        Note: These results are based on longitudinal benchmarks for operational AI friction.
      </p>
    </div>
  `;

  try {
    await sgMail.send({
      to,
      from: 'hello@bmradvisory.co',
      bcc: 'hello@bmradvisory.co',
      subject: `BMR Strategic Synthesis for ${firstName}`,
      html: html,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}
