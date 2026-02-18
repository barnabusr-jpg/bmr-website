import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  // ADDED 'role': Captures the persona (Executive/Manager/Technical)
  const { name, email, org, zoneData, role } = req.body;
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
    'HAI': { result: "Trust Architecture (HAI)", implications: "Human-AI Asymmetry detected.", exercise: "Audit one high-frequency AI workflow." },
    'AVS': { result: "Adoption Value System (AVS)", implications: "Operational Drift detected.", exercise: "Identify a recent AI performance variance." },
    'IGF': { result: "Internal Governance Framework (IGF)", implications: "Oversight Decay detected.", exercise: "Examine your most recent AI correction event." }
  };

  const selected = contentMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name || "")}&email=${encodeURIComponent(email || "")}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    // REFINED SUBJECT: Removed brackets for Outlook stability
    subject: `BMR Signal Diagnostic: ${org}`,
    
    // RESTORED TEXT: Simple structure that passed Outlook tests
    text: `BMR SIGNAL DIAGNOSTIC: FORENSIC OBSERVATION\n--------------------------------------------------\nOrganization: ${org || 'Your Organization'}\nRole Perspective: ${role || 'Not Specified'}\n\nHello ${firstName},\n\nYour clinical signal analysis is complete. Primary focus: ${selected.result}.\n\nSchedule your Forensic Review here: ${calendlyLink}`,
    
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #020617; line-height: 1.6;">
        <h2 style="text-transform: uppercase; font-size: 12px; color: #64748b; border-bottom: 1px solid #eee; padding-bottom: 10px;">Forensic Observation Report</h2>
        <p>Hello ${firstName},</p>
        <p>The diagnostic for <strong>${org}</strong> is complete from the <strong>${role}</strong> perspective. We have identified specific pressure signals in your AI adoption trajectory.</p>
        <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #00F2FF; margin: 20px 0;">
          <p style="font-size: 11px; text-transform: uppercase; margin: 0;">Observation Lens</p>
          <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">${selected.result}</p>
        </div>
        <p>Review your results and schedule your Forensic Review:</p>
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
            name, email, org, role, focusArea, result: selected.result, zoneData,
            status: "Lead", 
            isContracted: false, 
            triggerSlideProduction: false, // HARD STOP for Zapier
            diagnosticType: "Triage-12",
            vaultID: `BMR-${Date.now()}`
          }),
        });
      } catch (webhookErr) {
        console.warn('Airtable logging failed:', webhookErr);
      }
    }

    // MANDATORY: Return 200 to prevent the "Hanging" spinner
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Dispatch Error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
