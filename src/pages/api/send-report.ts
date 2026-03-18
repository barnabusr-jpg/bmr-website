import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData, role } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // --- 1. CALCULATE DOMINANT PILLAR (Internal Logic) ---
  const intensities = {
    HAI: zoneData?.HAI?.aggregate || 0,
    AVS: zoneData?.AVS?.aggregate || 0,
    IGF: zoneData?.IGF?.aggregate || 0
  };

  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  // --- 2. SHIELDED CONTENT (For Client Email) ---
  const shieldedEmailMap = {
    'HAI': {
      title: "Trust Architecture Alignment",
      teaser: "A significant variance in your 'Verification Reliability' signature has been detected. This indicates operational friction masking hidden technical debt."
    },
    'AVS': {
      title: "Adoption Value Synchronization",
      teaser: "Signals indicate 'Operational Drift.' Your current adoption protocols are likely uncalibrated, resulting in high activity but low forensic value."
    },
    'IGF': {
      title: "Internal Governance Integrity",
      teaser: "Observations suggest an 'Executive Oversight Variance.' Your governance frameworks may currently be functioning as bottlenecks rather than accelerators."
    }
  };

  const selected = shieldedEmailMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&org=${encodeURIComponent(org)}`;

  // --- 3. SEND TO AIRTABLE (Full Unshielded Data for You) ---
  try {
    // Replace with your actual Airtable Webhook or API endpoint
    await fetch(process.env.AIRTABLE_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Timestamp: new Date().toISOString(),
        Name: name,
        Email: email,
        Organization: org,
        Perspective: role,
        HAI_Score: intensities.HAI,
        AVS_Score: intensities.AVS,
        IGF_Score: intensities.IGF,
        Total_Displacement: intensities.HAI + intensities.AVS + intensities.IGF,
        Primary_Focus: selected.title
      })
    });
  } catch (err) {
    console.error("Airtable sync failed, but continuing to email...", err);
  }

  // --- 4. SEND SHIELDED EMAIL TO CLIENT ---
  const msg = {
    to: email,
    from: 'hello@bmradvisory.co',
    subject: `[Maturity Benchmark] BMR Signal Diagnostic: ${org}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #ffffff; background-color: #020617; padding: 40px; border: 1px solid #1e293b;">
        <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 11px; color: #00F2FF;">Forensic Signal Captured</h2>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
        <p>Hello ${firstName},</p>
        <p>The BMR Signal Diagnostic for <strong>${org}</strong> has successfully mapped your maturity signature.</p>
        <div style="background-color: #0f172a; border-left: 3px solid #00F2FF; padding: 25px; margin: 30px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #00F2FF;">Priority Focus Area</h3>
          <p style="font-size: 20px; font-weight: bold; margin: 0; color: #f8fafc;">${selected.title}</p>
          <p style="margin-top: 15px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">${selected.teaser}</p>
        </div>
        <p style="font-size: 13px; color: #64748b; font-style: italic;">
          Specific neutralization roadmap exercises and comparative benchmarks are reserved for your 1-on-1 Maturity Review.
        </p>
        <div style="margin: 40px 0; text-align: center;">
          <a href="${calendlyLink}" style="background-color: #00F2FF; color: #020617; padding: 16px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 12px; display: inline-block;">Schedule Maturity Review</a>
        </div>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
