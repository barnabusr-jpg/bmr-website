import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  // Destructure all incoming data
  const { name, email, org, dominantState, scores } = req.body;

  const firstName = name.split(' ')[0];

  const msg = {
    to: email, 
    bcc: 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co', 
    subject: 'Insights from Your AI Promise Gap™ Diagnostic',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
        <p>Hi ${firstName},</p>
        
        <p>Thank you for taking the time to complete our AI Promise Gap™ Diagnostic for <strong>${org || 'your organization'}</strong>. Based on your responses, here are three key observations about how your AI workflows are currently operating:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
              <th style="padding: 10px; text-align: left;">Focus Area</th>
              <th style="padding: 10px; text-align: left;">Observation</th>
              <th style="padding: 10px; text-align: left;">Potential Considerations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Trust</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Manual verification of AI outputs is common.</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Could this indicate opportunities to reduce redundant effort?</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Governance</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Accountability for AI-driven outcomes may not always be clear.</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Might this lead to delays in addressing issues?</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Alignment</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">AI initiatives may not yet be fully tied to strategic goals.</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Could this limit the long-term value of your investments?</td>
            </tr>
          </tbody>
        </table>

        <h3>What This Could Mean for ${org || 'Your Team'}</h3>
        <p>These observations suggest areas where operational friction might be affecting your AI’s impact. This diagnostic highlights potential opportunities to streamline workflows and align AI initiatives more closely with business objectives.</p>

        <div style="margin: 30px 0; text-align: center;">
          <a href="INSERT_YOUR_CALENDLY_LINK_HERE" style="background-color: #14b8a6; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Schedule a 15-Minute Call Here</a>
        </div>

        <p>Best regards,<br />
        <strong>BMR Solutions</strong></p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 40px;" />
        <p style="font-size: 11px; color: #999;">Systemic Profile: ${dominantState}</p>
        </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    return res.status(500).json({ error: 'Email service failure' });
  }
}
