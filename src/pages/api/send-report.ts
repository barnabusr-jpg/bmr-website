import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData, role, bcc } = req.body;
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

  // --- UPDATED CONTENT MAPPING: Clinical Terminology with Role Context ---
  const contentMap = {
    'HAI': {
      result: `Trust Architecture (HAI) — ${role} Priority`,
      implications: `Based on your ${role} perspective, we have detected a "Technical Forensic Variance." The signals suggest that manual verification layers are currently acting as a substitute for system calibration, creating hidden operational friction.`,
      exercise: "Audit one high-frequency AI workflow. Quantify the timeframe required for manual verification versus automated output. This identifies your baseline trust-friction point.",
      matters: `As a ${role}, establishing a stable Trust Architecture is your primary lever for ensuring system reliability at scale.`
    },
    'AVS': {
      result: `Adoption Value System (AVS) — ${role} Priority`,
      implications: `Your ${role} lens identified "Operational Drift." This occurs when deployment frequency is decoupled from governance, leading to technology investments that struggle to move beyond activity volume into measurable impact.`,
      exercise: "Identify a recent AI performance variance. Determine if a specific 'owner' was notified within the target 60-minute window. This reveals current ownership latency.",
      matters: `From a ${role} standpoint, a robust adoption system ensures that every technology deployment translates into tangible value realization.`
    },
    'IGF': {
      result: `Internal Governance Framework (IGF) — ${role} Priority`,
      implications: `Our analysis of your ${role} signals indicates "Executive Governance Exposure." Without active safeguard loops, systems may drift from leadership intent as they scale, creating unmanaged long-term structural risks.`,
      exercise: "Examine your most recent AI correction event. Verify if that specific human insight was systematically incorporated into the model’s iterative training cycle.",
      matters: `For an ${role}, this framework is essential for maintaining accountability and strategic control as AI capabilities evolve.`
    }
  };

  const selected = contentMap[focusArea];

  // --- URL CONSTRUCTION ---
  const calendlyBase = "https://calendly.com/hello-bmradvisory/forensic-review";
  const safeName = encodeURIComponent(name || "");
  const safeEmail = encodeURIComponent(email || "");
  const calendlyLink = `${calendlyBase}?name=${safeName}&email=${safeEmail}&a1=${encodeURIComponent(role || "")}`;

  const msg = {
    to: email,
    bcc: bcc || 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    
    text: `
BMR SIGNAL DIAGNOSTIC: FORENSIC OBSERVATION REPORT
--------------------------------------------------
Perspective: ${role} Lens
Organization: ${org || 'Your Organization'}

Hello ${firstName},

Your clinical signal analysis is complete. Based on your ${role} perspective, 
your primary focus area is: ${selected.result}.

INDICATED IMPLICATIONS:
${selected.implications.replace(/&ldquo;|&rdquo;/g, '"')}

SURGICAL NEUTRALIZATION EXERCISE:
${selected.exercise}

Schedule your Forensic Review here: ${calendlyLink}

BMR Solutions | Forensic AI Advisory
    `,
    
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; color: #020617; line-height: 1.6; padding: 40px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;">
        <div style="border-bottom: 2px solid #020617; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; margin: 0; color: #64748b;">Forensic Observation Report</h2>
          <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase; margin: 5px 0 0 0;">Lens: ${role} | BMR Protocol v3.0</p>
        </div>
        <p style="font-size: 16px; margin-bottom: 24px;">Hello ${firstName},</p>
        <p style="color: #475569; margin-bottom: 32px;">
          The BMR Signal Diagnostic for <strong>${org || 'your organization'}</strong> is complete. Our analysis has identified specific <strong>Systemic Pressure Signals</strong> based on the ${role} lens.
        </p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 32px; margin-bottom: 40px;">
          <h3 style="margin: 0 0 8px 0; color: #00F2FF; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: bold;">Critical Observation Lens</h3>
          <p style="font-size: 24px; font-weight: bold; margin: 0; color: #020617; font-style: italic;">${selected.result}</p>
          <div style="margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
            <h4 style="font-size: 12px; text-transform: uppercase; color: #020617; margin: 0 0 12px 0; letter-spacing: 1px;">Indicated Implications</h4>
            <p style="font-size: 14px; color: #334155; margin: 0; line-height: 1.8;">${selected.implications}</p>
          </div>
        </div>
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #020617; margin-bottom: 16px;">Surgical Neutralization Exercise</h3>
        <div style="background-color: #ffffff; border-left: 4px solid #00F2FF; padding: 10px 20px; color: #334155; font-size: 14px; margin-bottom: 32px; font-style: italic;">
          ${selected.exercise}
        </div>
        <div style="margin: 48px 0; text-align: center;">
          <a href="${calendlyLink}" style="background-color: #020617; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 2px; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; display: inline-block;">Schedule Forensic Review</a>
        </div>
        <p style="margin-top: 40px; font-size: 14px; color: #020617;">
          Best regards,<br>
          <strong style="text-transform: uppercase; letter-spacing: 1px;">BMR Solutions Forensic Team</strong>
        </p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    const WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL; 
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, email, org, role, focusArea,
            result: selected.result,
            zoneData,
            status: "Lead", 
            diagnosticType: "Triage-12",
            vaultID: `BMR-${Date.now()}`
          }),
        });
      } catch (webhookErr) {
        console.warn('Data logging webhook failed:', webhookErr);
      }
    }
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Forensic Engine Dispatch Error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
