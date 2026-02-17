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
      exercise: "Audit one high-frequency AI workflow. Quantify the timeframe required for manual verification versus automated output. This identifies your baseline trust-friction point.",
      matters: "Calibrating the trust architecture is the primary step in establishing a Human-AI interaction model that remains stable at scale."
    },
    'AVS': {
      result: "Adoption Value System (AVS)",
      implications: "Your results point toward &ldquo;Operational Drift,&rdquo; where deployment frequency is decoupled from governance. Without a synchronized value system, technology investments struggle to move beyond activity volume into measurable mission impact.",
      exercise: "Identify a recent AI performance variance. Determine if a specific 'owner' was notified within the target 60-minute window. This reveals current ownership latency.",
      matters: "A robust adoption system ensures your technology ecosystem prioritizes value realization over pure deployment speed."
    },
    'IGF': {
      result: "Internal Governance Framework (IGF)",
      implications: "Current signals indicate &ldquo;Oversight Decay.&rdquo; Without active safeguard loops, systems may drift from leadership intent as they scale, creating unmanaged long-term operational risks that require structural correction.",
      exercise: "Examine your most recent AI correction event. Verify if that specific human insight was systematically incorporated into the model’s iterative training cycle.",
      matters: "Embedding accountability into every decision loop creates the systemic stability required for rapid, responsible evolution."
    }
  };

  const selected = contentMap[focusArea];

  // --- URL CONSTRUCTION: Frictionless Peer Handshake ---
  const calendlyBase = "https://calendly.com/hello-bmradvisory/forensic-review";
  const safeName = encodeURIComponent(name || "");
  const safeEmail = encodeURIComponent(email || "");
  const calendlyLink = `${calendlyBase}?name=${safeName}&email=${safeEmail}`;

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    
    // YAHOO-COMPLIANT FALLBACK: Prevents spam flagging without altering HTML
    text: `
BMR SIGNAL DIAGNOSTIC: FORENSIC OBSERVATION REPORT
--------------------------------------------------
Organization: ${org || 'Your Organization'}

Hello ${firstName},

Your clinical signal analysis is complete. Based on the triage, 
your primary focus area is: ${selected.result}.

INDICATED IMPLICATIONS:
${selected.implications.replace(/&ldquo;|&rdquo;/g, '"')}

SURGICAL NEUTRALIZATION EXERCISE:
${selected.exercise}

To view your full 32-point Radar Topology and interactive results, 
please view this email in an HTML-capable client.

Schedule your Forensic Review here: ${calendlyLink}

BMR Solutions | Forensic AI Advisory
    `,
    
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; color: #020617; line-height: 1.6; padding: 40px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;">
        <div style="border-bottom: 2px solid #020617; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; margin: 0; color: #64748b;">Forensic Observation Report</h2>
          <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase; margin: 5px 0 0 0;">BMR Solutions Protocol v3.0</p>
        </div>
        <p style="font-size: 16px; margin-bottom: 24px;">Hello ${firstName},</p>
        <p style="color: #475569; margin-bottom: 32px;">
          The BMR Signal Diagnostic for <strong>${org || 'your organization'}</strong> is complete. Our analysis has identified specific <strong>Systemic Pressure Signals</strong> within your AI adoption trajectory.
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
        <div style="border-top: 1px solid #e2e8f0; padding-top: 32px; margin-top: 48px;">
          <h3 style="font-size: 14px; text-transform: uppercase; color: #020617; margin-bottom: 12px; letter-spacing: 1px;">The BMR Methodology</h3>
          <p style="font-size: 13px; color: #64748b; line-height: 1.8; margin-bottom: 24px;">
            ${selected.matters} We close the Promise Gap&trade; by synchronizing the <strong>HAI</strong>, <strong>AVS</strong>, and <strong>IGF</strong> layers to prevent structural drift.
          </p>
        </div>
        <p style="margin-top: 40px; font-size: 14px; color: #020617;">
          Best regards,<br>
          <strong style="text-transform: uppercase; letter-spacing: 1px;">BMR Solutions Forensic Team</strong>
        </p>
      </div>
    `
  };

  try {
    // 1. Dispatch Clinical Email to Client
    await sgMail.send(msg);

    // 2. Webhook Dispatch: LOGGING ONLY. (Production Gate Active)
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
            // COMMERCIAL GATES: Prevents free slide generation
            status: "Lead", 
            isContracted: false, 
            triggerSlideProduction: false, // HARD STOP for Zapier deck creation
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
