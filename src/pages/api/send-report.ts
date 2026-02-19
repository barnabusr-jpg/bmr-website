import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import requestIp from "request-ip";

// 1. TELEMETRY: Clinical logging for systemic variances
const logSystemVariance = (error: any, context: string) => {
  console.error(`[FORENSIC TELEMETRY] Variance in ${context}:`, error.message);
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// 2. RATE LIMITING: Security layer to prevent diagnostic abuse
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1h"), 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- LAYER 1: SECURITY VALIDATION ---
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const clientIp = requestIp.getClientIp(req) || 'default-identifier';
  const { success } = await rateLimiter.limit(`bmr-diagnostic-${clientIp}`);
  
  if (!success) {
    return res.status(429).json({ error: 'Rate limit exceeded. Systemic security protocols restrict further submissions this hour.' });
  }

  const { name, email, org, zoneData, role, bcc } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // --- LAYER 2: CLINICAL ANCHOR LOGIC ---
  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  const intensities = {
    HAI: zoneData.HAI?.max || 0,
    AVS: zoneData.AVS?.max || 0,
    IGF: zoneData.IGF?.max || 0
  };

  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  const contentMap = {
    'HAI': {
      result: `Trust Architecture (HAI) — ${role} Priority`,
      implications: `Based on your ${role} perspective, we have detected a "Technical Forensic Variance." The signals suggest that manual verification layers are currently acting as a substitute for system calibration, creating hidden operational friction.`,
      exercise: "Audit one high-frequency AI workflow. Quantify the timeframe required for manual verification versus automated output. This identifies your baseline trust-friction point.",
    },
    'AVS': {
      result: `Adoption Value System (AVS) — ${role} Priority`,
      implications: `Your ${role} lens identified "Operational Drift." This occurs when deployment frequency is decoupled from governance, leading to technology investments that struggle to move beyond activity volume into measurable impact.`,
      exercise: "Identify a recent AI performance variance. Determine if a specific 'owner' was notified within the target 60-minute window. This reveals current ownership latency.",
    },
    'IGF': {
      result: `Internal Governance Framework (IGF) — ${role} Priority`,
      implications: `Our analysis of your ${role} signals indicates "Executive Governance Exposure." Without active safeguard loops, systems may drift from leadership intent as they scale, creating unmanaged long-term structural risks.`,
      exercise: "Examine your most recent AI correction event. Verify if that specific human insight was systematically incorporated into the model’s iterative training cycle.",
    }
  };

  const selected = contentMap[focusArea];

  // --- LAYER 3: URL CONSTRUCTION ---
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

Your clinical signal analysis is complete. Based on your ${role} perspective, your primary focus area is: ${selected.result}.

INDICATED IMPLICATIONS:
${selected.implications}

SURGICAL NEUTRALIZATION EXERCISE:
${selected.exercise}

Schedule your Forensic Review here: ${calendlyLink}
    `,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #020617; padding: 40px; background-color: #ffffff; border: 1px solid #e2e8f0;">
        <div style="border-bottom: 2px solid #020617; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; color: #64748b; margin: 0;">Forensic Observation Report</h2>
          <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase; margin: 5px 0 0 0;">Lens: ${role} | BMR Protocol v3.0</p>
        </div>
        <p>Hello ${firstName},</p>
        <p>The BMR Signal Diagnostic for <strong>${org || 'your organization'}</strong> is complete.</p>
        <div style="background-color: #f8fafc; padding: 32px; margin: 40px 0; border: 1px solid #e2e8f0;">
          <h3 style="color: #00F2FF; font-size: 24px; font-style: italic; margin: 0;">${selected.result}</h3>
          <p style="margin-top: 20px;">${selected.implications}</p>
        </div>
        <h4>Surgical Neutralization Exercise</h4>
        <div style="border-left: 4px solid #00F2FF; padding: 10px 20px; font-style: italic;">${selected.exercise}</div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="${calendlyLink}" style="background-color: #020617; color: white; padding: 18px 36px; text-decoration: none; font-weight: bold; display: inline-block;">Schedule Forensic Review</a>
        </div>
      </div>
    `
  };

  try {
    // --- LAYER 4: MANDATORY EMAIL DISPATCH ---
    // Fires client report AND the BCC internal alert simultaneously
    await sgMail.send(msg);

    // --- LAYER 5: ASYNCHRONOUS AIRTABLE LOGGING ---
    // FIRE-AND-FORGET: We do not 'await' this so Airtable cannot block the response
    const WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL; 
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, org, role, focusArea,
          result: selected.result,
          rawSignalScore: intensities[focusArea],
          diagnosticType: "Triage-12",
          vaultID: `BMR-${Date.now()}`
        }),
      }).catch(err => logSystemVariance(err, "Airtable Background Logging"));
    }

    return res.status(200).json({ success: true });

  } catch (error: any) {
    logSystemVariance(error, "Email Dispatch Layer");
    return res.status(500).json({ error: 'Systemic failure: Forensic dispatch could not be completed.' });
  }
}
