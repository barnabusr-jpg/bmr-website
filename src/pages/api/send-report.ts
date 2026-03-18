import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, organization, zoneData, role } = req.body;

  const intensities = { 
    HAI: Math.round(zoneData?.HAI?.aggregate || 0), 
    AVS: Math.round(zoneData?.AVS?.aggregate || 0), 
    IGF: Math.round(zoneData?.IGF?.aggregate || 0) 
  };

  const maxStrength = Math.max(zoneData?.HAI?.max || 0, zoneData?.AVS?.max || 0, zoneData?.IGF?.max || 0);
  const maturityStage = `Stage ${maxStrength}: ${maxStrength >= 4 ? 'Optimized' : 'Emerging'}`;

  const focusKey = intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF 
    ? 'AVS' : (intensities.IGF >= intensities.HAI ? 'IGF' : 'HAI');

  const clientFacingVector = focusKey === 'HAI' ? 'Vector 01' : focusKey === 'AVS' ? 'Vector 02' : 'Vector 03';
  const airtableFacingVector = `Vector 0${focusKey === 'HAI' ? 1 : focusKey === 'AVS' ? 2 : 3} (${focusKey})`;

  const calendlyBase = "https://calendly.com/hello-bmradvisory/forensic-review";
  const calendlyUrl = `${calendlyBase}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&a1=${clientFacingVector}&utm_campaign=${encodeURIComponent(organization)}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${organization}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #020617; padding: 40px; border: 1px solid #e2e8f0;">
        <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; color: #64748b; border-bottom: 2px solid #020617; padding-bottom: 10px;">Forensic Signal Captured</h2>
        <p>Hello ${name.split(' ')[0]},</p>
        <p>Your BMR Diagnostic for <strong>${organization}</strong> has completed benchmarking for the <strong>${role} Lens</strong>.</p>
        
        <div style="background-color: #f8fafc; padding: 30px; margin: 30px 0; border-left: 4px solid #00F2FF;">
          <p style="font-size: 10px; text-transform: uppercase; color: #64748b; margin: 0;">Primary Variance Lens</p>
          <p style="font-size: 18px; font-weight: bold; font-style: italic; margin: 5px 0;">Observation ${clientFacingVector}</p>
        </div>

        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
          The captured signals indicate specific friction points within your current AI infrastructure. To decrypt these findings and review the strategic neutralization roadmap, please use the secure link below.
        </p>

        <div style="background-color: #020617; color: #ffffff; padding: 25px; text-align: center;">
          <a href="${calendlyUrl}" style="color: white; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Unlock Strategic Roadmap →</a>
        </div>
      </div>`
  };

  try {
    await sgMail.send(msg);
    if (process.env.AIRTABLE_WEBHOOK_URL) {
      await fetch(process.env.AIRTABLE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          org: organization, 
          role, 
          maturityStage,
          focusArea: airtableFacingVector, 
          result: `BMR Signal: ${clientFacingVector}`,
          intensities 
        }),
      });
    }
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
