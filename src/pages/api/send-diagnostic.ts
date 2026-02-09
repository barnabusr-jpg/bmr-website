import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, scores } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

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
      <div style="font-family: sans-serif; max-width: 600px; color: #0f172a; line-height: 1.7; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the BMR Signal Diagnostic for <strong>${org || 'your organization'}</strong>. Your responses identified specific patterns across our lenses: <strong>Trust, Govern, and Evolve.</strong></p>
        
        <div style="background-color: #f8fafc; padding: 24px; border-left: 4px solid #14b8a6; margin: 32px 0;">
          <h4 style="margin: 0; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Primary Observation Lens</h4>
          <p style="font-size: 20px; font-weight: bold; margin: 8px 0 0 0;">${selected.result}</p>
        </div>

        <h3 style="font-size: 18px; color: #0f172a;">Potential Implications</h3>
        <p style="color: #334155;">${selected.implications}</p>

        <h3 style="font-size: 18px; color: #0f172a;">Suggested Forensic Exercise</h3>
        <div style="color: #334155;">${selected.exercise}</div>

        <div style="margin: 40px 0; text-align: center;">
          <a href="https://calendly.com/your-link" style="background-color: #14b8a6; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Schedule a 15-Minute Consultation</a>
        </div>

        <h3 style="font-size: 18px; color: #0f172a;">Why These Observations Matter</h3>
        <p style="color: #334155;">${selected.matters}</p>

        <p style="margin-top: 40px; border-top: 1px solid #e2e8f0; pt-20px;">
          Best regards,<br>
          <strong>BMR Solutions</strong><br>
          <span style="font-size: 12px; color: #64748b;">Fairfax County, VA</span>
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
