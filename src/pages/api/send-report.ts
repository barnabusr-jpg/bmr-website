import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, zoneData, role, bcc } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // --- ANCHOR LOGIC: Determine Pillar Focus & Maturity Level ---
  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';
  const intensities = {
    HAI: zoneData?.HAI?.aggregate || 0,
    AVS: zoneData?.AVS?.aggregate || 0,
    IGF: zoneData?.IGF?.aggregate || 0
  };

  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';
  else focusArea = 'IGF';

  const rawMax = zoneData?.[focusArea]?.max || 1;
  const maturityIndex = Math.min(Math.max(rawMax, 1), 4);
  const totalScore = intensities.HAI + intensities.AVS + intensities.IGF;
  
  const stageLabels = [
    "Stage 0: Unobserved", 
    "Stage 1: Reactive", 
    "Stage 2: Emerging", 
    "Stage 3: Integrated", 
    "Stage 4: Optimized"
  ];

  const currentStageLabel = stageLabels[maturityIndex];

  // --- SHIELDED CONTENT (IP MASKED FOR EMAIL) ---
  const contentMap = {
    'HAI': {
      publicTitle: "Trust Architecture Alignment",
      implications: `A significant variance in "Verification Reliability" has been detected. Operational friction is likely masking hidden technical debt.`,
      exercise: `Audit a high-frequency AI workflow. Compare the time spent on 'Human-in-the-loop' verification versus the actual generation time to reveal your Trust Friction Ratio.`,
    },
    'AVS': {
      publicTitle: "Adoption Value Synchronization",
      implications: `Signals indicate "Operational Drift." User adoption and governance protocols are currently uncalibrated, leading to high activity with low forensic value.`,
      exercise: `Trace an AI failure from the last 30 days. Measure the time elapsed between the error and executive notification to identify your Ownership Latency.`,
    },
    'IGF': {
      publicTitle: "Internal Governance Integrity",
      implications: `Observations suggest "Executive Oversight Variance." Current protocols may be perceived as bottlenecks rather than strategic accelerators.`,
      exercise: `Review your latest AI model correction. Verify if that specific forensic insight was systematically ingested into a retraining loop or if it remained a siloed manual fix.`,
    }
  };

  const selected = contentMap[focusArea];
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name || "")}&email=${encodeURIComponent(email || "")}&a1=${encodeURIComponent(role || "")}&a2=${encodeURIComponent(`TotalScore:${totalScore}_Role:${role}`)}`;

  const msg = {
    to: email,
    bcc: bcc || 'hello@bmradvisory.co', 
    from: 'hello@bmradvisory.co',
    subject: `[Maturity Benchmark] BMR Signal Diagnostic: ${org}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; color: #020617; line-height: 1.6; padding: 40px; background-color: #ffffff; border: 1px solid #e2e8f0;">
        <div style="border-bottom: 2px solid #020617; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; margin: 0; color: #64748b;">Forensic Observation Report</h2>
          <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase; margin: 5px 0 0 0;">Lens: ${role} | Displacement Score: ${totalScore}</p>
        </div>
        
        <p>Hello ${firstName},</p>
        <p style="color: #475569;">The BMR Signal Diagnostic for <strong>${org || 'your organization'}</strong> is complete. We have captured your maturity signature based on the ${role} perspective.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 32px; margin-bottom: 40px;">
          <h3 style="margin: 0 0 8px 0; color: #00F2FF; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: bold;">Priority Focus Area</h3>
          <p style="font-size: 22px; font-weight: bold; margin: 0; color: #020617; font-style: italic;">${selected.publicTitle}</p>
          
          <div style="margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
            <h4 style="font-size: 12px; text-transform: uppercase; color: #020617; margin: 0 0 12px 0;">Forensic Observation</h4>
            <p style="font-size: 14px; color: #334155; margin: 0; line-height: 1.8;">${selected.implications}</p>
          </div>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; color: #020617; margin-bottom: 16px;">Surgical Neutralization Roadmap</h3>
        <div style="border-left: 4px solid #00F2FF; padding: 10px 20px; color: #64748b; font-size: 13px; margin-bottom: 32px; font-style: italic; background-color: #f1f5f9;">
          Neutralization vectors for your specific displacement profile have been identified. To prevent uncalibrated implementation, the <strong>Full Forensic Roadmap</strong> and specific exercises are reserved for your 1-on-1 Maturity Review.
        </div>

        <div style="margin: 48px 0; text-align: center;">
          <a href="${calendlyLink}" style="background-color: #020617; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 2px; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; display: inline-block;">Schedule Maturity Review</a>
        </div>
        
        <p style="margin-top: 40px; font-size: 14px;">Best regards,<br><strong style="text-transform: uppercase; letter-spacing: 1px;">BMR Solutions Forensic Team</strong></p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);

    const WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL; 
    if (WEBHOOK_URL) {
      // FULL DATA: Sent to Airtable for your slide deck (unmasked)
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, email, org, role, 
          focusArea,
          hai_intensity: intensities.HAI,
          avs_intensity: intensities.AVS,
          igf_intensity: intensities.IGF,
          total_score: totalScore,
          maturityStage: currentStageLabel,
          forensic_implication: selected.implications,
          neutralization_exercise: selected.exercise, // THE SECRET EXERCISE
          vaultID: `BMR-${Date.now()}` 
        }),
      }).catch(err => console.error("Airtable Error:", err));
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Critical SendGrid Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
