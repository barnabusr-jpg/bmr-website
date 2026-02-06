import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, org, dominantState, scores } = req.body;

  const synthesisMap: Record<string, string> = {
    "Manual Friction": "AI ROI is leaked through hidden human labor. Teams are manual-verifying system failures.",
    "System Disconnect": "Governance and execution are misaligned. High risk due to lack of feedback loops.",
    "Passive Support": "The organization supports AI in theory but lacks structural depth to capture value.",
    "Team Relief": "AI reduces task burden but hasn't reached strategic force multiplication.",
    "Force Multiplier": "High alignment. AI and human expertise are in a closed, value-generating loop."
  };

  const msg = {
    to: 'info@bmradvisory.co', // Change to your preferred notification email
    from: 'info@bmradvisory.co', // Must be a verified sender in SendGrid
    subject: `Diagnostic Alert: ${dominantState} - ${org}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #333;">
        <h2>BMR Systemic Observation Results</h2>
        <p><strong>Lead:</strong> ${name} (${email})</p>
        <p><strong>Organization:</strong> ${org}</p>
        <hr />
        <h3 style="color: #14b8a6;">Primary State: ${dominantState}</h3>
        <p><strong>Analysis:</strong> ${synthesisMap[dominantState]}</p>
        <hr />
        <h4>Raw Score Gravity:</h4>
        <p>Manual Friction: ${scores["Manual Friction"]}</p>
        <p>System Disconnect: ${scores["System Disconnect"]}</p>
        <p>Passive Support: ${scores["Passive Support"]}</p>
        <p>Team Relief: ${scores["Team Relief"]}</p>
        <p>Force Multiplier: ${scores["Force Multiplier"]}</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Email service failure' });
  }
}
