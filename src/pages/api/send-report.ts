import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData, role } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // --- ANCHOR LOGIC ---
  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  const intensities = {
    HAI: zoneData?.HAI?.max || 0,
    AVS: zoneData?.AVS?.max || 0,
    IGF: zoneData?.IGF?.max || 0
  };

  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  const contentMap = {
    'HAI': { result: "Trust Architecture (HAI)" },
    'AVS': { result: "Adoption Value System (AVS)" },
    'IGF': { result: "Internal Governance Framework (IGF)" }
  };

  const selected = contentMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name || "")}&email=${encodeURIComponent(email || "")}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `BMR Signal Diagnostic: ${org}`,
    text: `BMR SIGNAL DIAGNOSTIC: FORENSIC OBSERVATION\nPerspective: ${role}\nPrimary focus: ${selected.result}.\n\nSchedule: ${calendlyLink}`,
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; color: #020617;">
      <h2>Forensic Observation Report</h2>
      <p>Hello ${firstName}, your diagnostic is complete from the <strong>${role}</strong> lens.</p>
      <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #00F2FF;">
        <p style="font-weight: bold; margin: 0;">Primary Signal: ${selected.result}</p>
      </div>
      <p><a href="${calendlyLink}" style="background: #020617; color: #ffffff; padding: 12px 24px; text-decoration: none; display: inline-block; font-weight: bold; margin-top: 20px;">Schedule Forensic Review</a></p>
    </div>`
  };

  try {
    await sgMail.send(msg);

    // Using the real variable name from your logs to satisfy Vercel
    const WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL; 
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, org, role, focusArea, result: selected.result, zoneData }),
        });
      } catch (webhookErr) { 
        console.warn('Airtable logging failed:', webhookErr); 
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    // Explicitly logging the error object or message to clear linting
    console.error('API Final Error:', error?.message || error); 
    return res.status(500).json({ error: 'Internal server error' });
  }
}
