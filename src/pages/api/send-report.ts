import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // --- ANCHOR LOGIC: Determine Primary Focus Area ---
  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  const intensities = {
    HAI: zoneData.HAI?.max || 0,
    AVS: zoneData.AVS?.max || 0,
    IGF: zoneData.IGF?.max || 0
  };

  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  // --- CONTENT MAPPING: Clinical Terminology ---
  const contentMap = {
    'HAI': {
      result: "Trust Architecture (HAI)",
      implications: "The detected signals suggest a mismatch between current AI reliability and operational trust requirements. This &ldquo;Human-AI Asymmetry&rdquo; indicates that manual verification layers are acting as a substitute for system calibration, creating hidden friction.",
      exercise: "Audit one high-frequency AI workflow. Quantify the timeframe required for manual verification versus automated output. This identifies your baseline trust-friction point."
    },
    'AVS': {
      result: "Adoption Value System (AVS)",
      implications: "Your results point toward &ldquo;Operational Drift,&rdquo; where deployment frequency is decoupled from governance. Without a synchronized value system, technology investments struggle to move beyond activity volume into measurable mission impact.",
      exercise: "Identify a recent AI performance variance. Determine if a specific 'owner' was notified within the target 60-minute window. This reveals current ownership latency."
    },
    'IGF': {
      result: "Internal Governance Framework (IGF)",
      implications: "Current signals indicate &ldquo;Oversight Decay.&rdquo; Without active safeguard loops, systems may drift from leadership intent as they scale, creating unmanaged long-term operational risks that require structural correction.",
      exercise: "Examine your most recent AI correction event. Verify if that specific human insight was systematically incorporated into the model’s iterative training cycle."
    }
  };

  const selected = contentMap[focusArea];

  // --- URL CONSTRUCTION ---
  const calendlyBase = "https://calendly.com/hello-bmradvisory/forensic-review";
  const safeName = encodeURIComponent(name || "");
  const safeEmail = encodeURIComponent(email || "");
  const calendlyLink = `${calendlyBase}?name=${safeName}&email=${safeEmail}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    // RESTORED: Outlook-stable signature with original text structure
    text: `BMR SIGNAL DIAGNOSTIC: FORENSIC OBSERVATION REPORT\n--------------------------------------------------\nOrganization: ${org || 'Your Organization'}\n\nHello ${firstName},\n\nYour clinical signal analysis is complete. Primary focus: ${selected.result}.\n\nSchedule your Forensic Review here: ${calendlyLink}`,
    // EMPTY HTML: Prevents the MIME discrepancy that triggers Outlook silent-blocking
    html: ``
  };

  try {
    // 1. Dispatch Email to Client
    await sgMail.send(msg);

    // 2. Webhook Dispatch: Wrapped in a safety block so it doesn't cause a hang
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE'; 

    if (WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            org,
            focusArea,
            result: selected.result,
            zoneData,
            status: "Lead", 
            isContracted: false, 
            triggerSlideProduction: false, // HARD STOP for Zapier
            diagnosticType: "Triage-12",
            vaultID: `BMR-${Date.now()}`
          }),
        });
      } catch (webhookErr) {
        console.warn('Data logging webhook failed but email sent:', webhookErr);
      }
    }

    // MANDATORY SUCCESS RESPONSE: This tells the website to stop the loading spinner
    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error('Forensic Engine Dispatch Error:', error.message);
    // MANDATORY ERROR RESPONSE: Stops the hang even if SendGrid fails
    return res.status(500).json({ error: 'Internal server error' });
  }
}
