import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simple validation to prevent the 405 error
  if (req.method !== 'POST') return res.status(405).json({ error: 'Post only' });
  
  const { name, email, org, zoneData, role, bcc } = req.body;
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

  // --- CONTENT MAPPING (Original clinical text) ---
  const contentMap = {
    'HAI': {
      result: `Trust Architecture (HAI) — ${role} Priority`,
      implications: `Based on your ${role} perspective, we have detected a "Technical Forensic Variance."`,
      exercise: "Audit one high-frequency AI workflow. Quantify manual verification versus automated output.",
    },
    'AVS': {
      result: `Adoption Value System (AVS) — ${role} Priority`,
      implications: `Your ${role} lens identified "Operational Drift."`,
      exercise: "Identify a recent AI performance variance. Measure ownership notification window.",
    },
    'IGF': {
      result: `Internal Governance Framework (IGF) — ${role} Priority`,
      implications: `Our analysis indicates "Executive Governance Exposure."`,
      exercise: "Examine your most recent AI correction event. Verify systematic human insight incorporation.",
    }
  };

  const selected = contentMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name || "")}&email=${encodeURIComponent(email || "")}`;

  const msg = {
    to: email,
    bcc: bcc || 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 40px; border: 1px solid #e2e8f0;">
        <h2 style="text-transform: uppercase; color: #64748b; font-size: 14px;">Forensic Observation Report</h2>
        <p>Hello ${firstName}, your ${role} analysis for ${org} is ready.</p>
        <div style="background-color: #f8fafc; padding: 20px; margin: 20px 0;">
          <h3 style="color: #00F2FF;">${selected.result}</h3>
          <p>${selected.implications}</p>
        </div>
        <p><strong>Exercise:</strong> ${selected.exercise}</p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${calendlyLink}" style="background: #020617; color: white; padding: 15px 30px; text-decoration: none;">Schedule Review</a>
        </div>
      </div>
    `
  };

  try {
    // Priority: Email first
    await sgMail.send(msg);

    // Silent Background Logging
    const WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL; 
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, org, role, focusArea, vaultID: `BMR-${Date.now()}` }),
      }).catch(() => console.log("Airtable logged silently."));
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
