import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, scores } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // Core BMR Weights Mapping
  const trustWeight = (scores["Manual Friction"] || 0) + (scores["Team Relief"] || 0);
  const governWeight = (scores["System Disconnect"] || 0);
  const evolveWeight = (scores["Passive Support"] || 0) + (scores["Force Multiplier"] || 0);

  let focusArea: 'Trust (HAI)' | 'Govern (AVS)' | 'Evolve (IGF)' = 'Govern (AVS)';
  
  if (trustWeight >= governWeight && trustWeight >= evolveWeight) focusArea = 'Trust (HAI)';
  else if (governWeight >= trustWeight && governWeight >= evolveWeight) focusArea = 'Govern (AVS)';
  else focusArea = 'Evolve (IGF)';

  const contentMap = {
    'Trust (HAI)': {
      result: "Trust Architecture (HAI)",
      implications: "Your responses suggest that artificial intelligence outputs requiring frequent manual verification may be creating hidden labor costs. Over time, this &ldquo;Manual Friction&rdquo; reduces confidence in the system and potentially limits its scalability.",
      exercise: "Monitor the time your team spends verifying or correcting AI outputs during one work week. Record: <ul><li>Approximate hours dedicated to verification</li><li>Common patterns in errors encountered</li></ul>",
      matters: "Reducing manual verification requirements is the first step in establishing a Human-AI interaction model that scales."
    },
    'Govern (AVS)': {
      result: "Governance & Value (AVS)",
      implications: "The data points toward a &ldquo;System Disconnect&rdquo; where AI efforts may not be translating into sustained organizational value. Establishing a clear Adoption Value System ensures technology investments deliver measurable mission impact.",
      exercise: "During the next two weeks, document instances where an AI-driven outcome requires intervention. Record: <ul><li>The specific business objective this was intended to support</li><li>How success is currently being measured</li></ul>",
      matters: "A robust governance framework ensures your technology investments move beyond activity volume and into true value creation."
    },
    'Evolve (IGF)': {
      result: "Evolutionary Safeguards (IGF)",
      implications: "The current signals indicate a need for stronger &ldquo;Safeguard Loops.&rdquo; Without an Internal Governance Framework, systems may drift from leadership intent as they scale, creating long-term operational risk.",
      exercise: "Examine one recent AI decision or output and consider: <ul><li>The capacity for leadership to audit why that output was generated</li><li>The feedback loop currently in place to correct system drift</li></ul>",
      matters: "Embedding accountability into every decision loop creates the stability required for rapid, responsible evolution."
    }
  };

  const selected = contentMap[focusArea];

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; color: #020617; line-height: 1.6; padding: 40px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;">
        
        <div style="border-bottom: 2px solid #020617; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="text-transform: uppercase; letter-spacing: 4px; font-size: 14px; margin: 0; color: #64748b;">Forensic Observation Report</h2>
          <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase; margin: 5px 0 0 0;">BMR Solutions Protocol v2.6</p>
        </div>

        <p style="font-size: 16px; margin-bottom: 24px;">Hello ${firstName},</p>
        
        <p style="color: #475569; margin-bottom: 32px;">
          The BMR Signal Diagnostic for <strong>${org || 'your organization'}</strong> is complete. Our analysis has identified specific systemic friction points within your current AI adoption trajectory.
        </p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 32px; margin-bottom: 40px;">
          <h3 style="margin: 0 0 8px 0; color: #14b8a6; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: bold;">Primary Observation Lens</h3>
          <p style="font-size: 24px; font-weight: bold; margin: 0; color: #020617; font-style: italic;">${selected.result}</p>
          
          <div style="margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
            <h4 style="font-size: 12px; text-transform: uppercase; color: #020617; margin: 0 0 12px 0; letter-spacing: 1px;">Potential Implications</h4>
            <p style="font-size: 14px; color: #334155; margin: 0; line-height: 1.8;">${selected.implications}</p>
          </div>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #020617; margin-bottom: 16px;">Suggested Forensic Exercise</h3>
        <div style="background-color: #ffffff; border-left: 4px solid #14b8a6; padding: 10px 20px; color: #334155; font-size: 14px; margin-bottom: 32px; font-style: italic;">
          ${selected.exercise}
        </div>

        <div style="margin: 48px 0; text-align: center;">
          <a href="https://calendly.com/your-link" style="background-color: #020617; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 2px; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; display: inline-block;">Schedule Forensic Review</a>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 32px; margin-top: 48px;">
          <h3 style="font-size: 14px; text-transform: uppercase; color: #020617; margin-bottom: 12px; letter-spacing: 1px;">The BMR Methodology</h3>
          <p style="font-size: 13px; color: #64748b; line-height: 1.8; margin-bottom: 24px;">
            ${selected.matters} We close the Promise Gap&trade; by synchronizing <strong>Trust (HAI)</strong>, <strong>Govern (AVS)</strong>, and <strong>Evolve (IGF)</strong> layers.
          </p>
        </div>

        <p style="margin-top: 40px; font-size: 14px; color: #020617;">
          Best regards,<br>
          <strong style="text-transform: uppercase; letter-spacing: 1px;">BMR Solutions</strong>
        </p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
