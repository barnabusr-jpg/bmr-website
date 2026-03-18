import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, org, zoneData, role } = req.body;

  const intensities = { 
    HAI: zoneData?.HAI?.aggregate || 0, 
    AVS: zoneData?.AVS?.aggregate || 0, 
    IGF: zoneData?.IGF?.aggregate || 0 
  };

  const focus = intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF 
    ? 'AVS' 
    : (intensities.IGF >= intensities.HAI ? 'IGF' : 'HAI');

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #020617; padding: 40px; border: 1px solid #e2e8f0;">
        <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; color: #64748b; border-bottom: 2px solid #020617; padding-bottom: 10px;">Forensic Signal Captured</h2>
        <p>Hello ${name.split(' ')[0]},</p>
        <p>Your BMR Diagnostic for <strong>${org}</strong> has completed benchmarking for the <strong>${role} Lens</strong>.</p>
        <div style="background-color: #f8fafc; padding: 30px; margin: 30px 0; border-left: 4px solid #00F2FF;">
          <p style="font-size: 10px; text-transform: uppercase; color: #64748b; margin: 0;">Primary Variance Lens</p>
          <p style="font-size: 18px; font-weight: bold; font-style: italic; margin: 5px 0;">${focus} Infrastructure</p>
        </div>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 30px;">Strategic targets for neutralization are available in your personalized roadmap review.</p>
        <div style="background-color: #020617; color: #ffffff; padding: 25px; text-align: center;">
          <a href="https://calendly.com/hello-bmradvisory/forensic-review?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}" style="color: white; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Unlock Strategic Roadmap →</a>
        </div>
      </div>`
  };

  try {
    await sgMail.send(msg);
    if (process.env.AIRTABLE_WEBHOOK_URL) {
      await fetch(process.env.AIRTABLE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, org, role, focusArea: focus, intensities }),
      });
    }
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
