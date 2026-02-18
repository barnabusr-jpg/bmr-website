import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // --- ANCHOR LOGIC ---
  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  const intensities = {
    HAI: zoneData.HAI?.max || 0,
    AVS: zoneData.AVS?.max || 0,
    IGF: zoneData.IGF?.max || 0
  };

  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  // --- CONTENT MAPPING ---
  const contentMap = {
    'HAI': {
      result: "Trust Architecture (HAI)",
      implications: "The detected signals suggest a mismatch between current AI reliability and operational trust requirements.",
      exercise: "Audit one high-frequency AI workflow."
    },
    'AVS': {
      result: "Adoption Value System (AVS)",
      implications: "Your results point toward Operational Drift where deployment frequency is decoupled from governance.",
      exercise: "Identify a recent AI performance variance."
    },
    'IGF': {
      result: "Internal Governance Framework (IGF)",
      implications: "Current signals indicate Oversight Decay where systems may drift from leadership intent.",
      exercise: "Examine your most recent AI correction event."
    }
  };

  const selected = contentMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name || "")}&email=${encodeURIComponent(email || "")}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    // REFINED SUBJECT: Removed brackets to bypass corporate Outlook spam filters
    subject: `BMR Signal Diagnostic: ${org}`,
    
    // RESTORED TEXT: Matches your original Outlook-friendly structure
    text: `BMR SIGNAL DIAGNOSTIC: FORENSIC OBSERVATION\n--------------------------------------------------\nOrganization: ${org || 'Your Organization'}\n\nHello ${firstName},\n\nYour clinical signal analysis is complete. Primary focus: ${selected.result}.\n\nSchedule your Forensic Review here: ${calendlyLink}`,
    
    // CLEAN HTML: Simple structure to pass the "MIME-Sync" check
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #020617; line-height: 1.6;">
        <h2 style="text-transform: uppercase; font-size: 12px; color: #64748b; border-bottom: 1px solid #eee; padding-bottom: 10px;">Forensic Observation Report</h2>
        <p>Hello ${firstName},</p>
        <p>The signal diagnostic for <strong>${org}</strong> is complete. Our analysis has identified specific pressure signals within your AI adoption trajectory.</p>
        <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #00F2FF; margin: 20px 0;">
          <p style="font-size: 11px; text-transform: uppercase; margin: 0;">Observation Lens</p>
          <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">${selected.result}</p>
        </div>
        <p>Review your results and schedule your Forensic Review here:</p>
        <p><a href="${calendlyLink}" style="background-color: #020617; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block;">Schedule Forensic Review</a></p>
        <p style="font-size: 12px; color: #64748b; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">BMR Solutions | Forensic AI Advisory</p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);

    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE'; 
    if (WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, email, org, focusArea, result: selected.result, zoneData,
            status: "Lead", 
            isContracted: false, 
            triggerSlideProduction: false, // HARD STOP for Zapier
            diagnosticType: "Triage-12",
            vaultID: `BMR-${Date.now()}`
          }),
        });
      } catch (webhookErr) {
        console.warn('Data logging webhook failed:', webhookErr);
      }
    }

    // MANDATORY: Return 200 to stop the "hanging" spinner
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Dispatch Error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
