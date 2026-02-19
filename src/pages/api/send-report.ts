import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import requestIp from "request-ip";

// 1. TELEMETRY: Initialize clinical logging
const logSystemVariance = (error: any, context: string) => {
  console.error(`[FORENSIC TELEMETRY] Variance in ${context}:`, error.message);
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// 2. RATE LIMITING: Upstash Redis configuration
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1h"), 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- LAYER 1: ORIGIN SECURITY & METHOD VALIDATION ---
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const allowedOrigin = process.env.ALLOWED_ORIGIN || "https://bmradvisory.co";
  const origin = req.headers.origin || req.headers.referer;
  
  if (!origin?.startsWith(allowedOrigin)) {
    logSystemVariance(new Error("Unauthorized Origin Access"), "Security Layer");
    return res.status(403).json({ error: 'Forbidden: Unauthorized clinical request' });
  }

  // --- LAYER 2: API RATE LIMITING ---
  const clientIp = requestIp.getClientIp(req) || 'default-identifier';
  const { success } = await rateLimiter.limit(`bmr-diagnostic-${clientIp}`);
  
  if (!success) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded. Systemic security protocols restrict further submissions this hour.' 
    });
  }

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

  // --- LAYER 4: CLINICALIZED CONTENT MAPPING ---
  const contentMap = {
    'HAI': {
      result: `Trust Architecture (HAI) — ${role} Priority`,
      implications: `Detected: **Technical Forensic Variance**. Signals suggest manual verification layers are currently acting as a substitute for system calibration.`,
      exercise: "- Audit one high-frequency AI workflow.\n- Quantify verification latency.\n- Calibrate trust-friction points.",
    },
    'AVS': {
      result: `Adoption Value System (AVS) — ${role} Priority`,
      implications: `Detected: **Operational Drift**. Deployment frequency is decoupled from governance, leading to ROI friction.`,
      exercise: "- Identify AI performance variance.\n- Measure ownership notification window.\n- Close the feedback circuit.",
    },
    'IGF': {
      result: `Internal Governance (IGF) — ${role} Priority`,
      implications: `Detected: **Executive Governance Exposure**. Without safeguard loops, systems may drift from leadership intent.`,
      exercise: "- Examine recent AI correction event.\n- Verify systematic model training updates.\n- Formalize stewardship path.",
    }
  };

  const selected = contentMap[focusArea];

  // --- URL CONSTRUCTION: Calendly Deep-Linking ---
  const calendlyBase = "https://calendly.com/hello-bmradvisory/forensic-review";
  const safeName = encodeURIComponent(name || "");
  const safeEmail = encodeURIComponent(email || "");
  const calendlyLink = `${calendlyBase}?name=${safeName}&email=${safeEmail}&a1=${encodeURIComponent(role || "")}`;

  const msg = {
    to: email,
    bcc: bcc || 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    text: `Perspective: ${role} Lens\nFocus Area: ${selected.result}\nNeutralization: ${selected.exercise}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #020617; padding: 40px; background-color: #ffffff; border: 1px solid #e2e8f0;">
        <div style="border-bottom: 2px solid #020617; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; color: #64748b;">Forensic Observation Report</h2>
          <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">Lens: ${role} | BMR Protocol v3.0</p>
        </div>
        <p>Hello ${firstName}, your ${role}-aware analysis for ${org} is ready.</p>
        <div style="background-color: #f8fafc; padding: 32px; margin: 40px 0;">
          <h3 style="color: #00F2FF; font-size: 24px; font-style: italic;">${selected.result}</h3>
          <p>${selected.implications}</p>
        </div>
        <h4>Surgical Neutralization Exercise</h4>
        <pre style="background: white; border-left: 4px solid #00F2FF; padding: 15px;">${selected.exercise}</pre>
        <div style="text-align: center; margin-top: 40px;">
          <a href="${calendlyLink}" style="background-color: #020617; color: white; padding: 18px 36px; text-decoration: none; font-weight: bold; display: inline-block;">Schedule Forensic Review</a>
        </div>
      </div>
    `
  };

  try {
    // --- LAYER 3: MANDATORY EMAIL DISPATCH ---
    // This fires the client report and your BCC internal alert
    await sgMail.send(msg);

    // --- LAYER 4: ASYNCHRONOUS AIRTABLE LOGGING ---
    // We do NOT 'await' this. It runs in the background so Airtable issues can't break your flow
    const WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL; 
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, org, role, focusArea,
          result: selected.result,
          surgicalRecommendation: selected.exercise,
          defensibleLanguage: selected.implications,
          rawSignalScore: intensities[focusArea],
          vaultID: `BMR-${Date.now()}`
        }),
      }).catch(webhookErr => {
        // Quietly logs the error to your console without interrupting the response
        logSystemVariance(webhookErr, "Airtable Webhook Ingestion (Silent)");
      });
    }

    return res.status(200).json({ success: true });

  } catch (error: any) {
    logSystemVariance(error, "Email Dispatch Layer");
    return res.status(500).json({ error: 'Internal systemic error: Forensic dispatch failed.' });
  }
}
