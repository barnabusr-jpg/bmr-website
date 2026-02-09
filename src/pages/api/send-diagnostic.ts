import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, scores } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // LOGIC ALIGNMENT: Mapping forensic weights to the correct BMR Lenses
  const trustWeight = (scores["Manual Friction"] || 0) + (scores["Team Relief"] || 0); // Trust (HAI)
  const governWeight = (scores["System Disconnect"] || 0);                             // Govern (AVS)
  const evolveWeight = (scores["Passive Support"] || 0) + (scores["Force Multiplier"] || 0); // Evolve (IGF)

  // Determine the Focus Area based on highest weighted signal
  let focusArea: 'Trust (HAI)' | 'Govern (AVS)' | 'Evolve (IGF)' = 'Govern (AVS)';
  
  if (trustWeight >= governWeight && trustWeight >= evolveWeight) {
    focusArea = 'Trust (HAI)';
  } else if (governWeight >= trustWeight && governWeight >= evolveWeight) {
    focusArea = 'Govern (AVS)';
  } else {
    focusArea = 'Evolve (IGF)';
  }

  const contentMap = {
    'Trust (HAI)': {
      result: "Trust Architecture (HAI)",
      implications: "Your responses suggest that artificial intelligence outputs requiring frequent manual verification may be creating hidden labor costs. Over time, this &ldquo;Manual Friction&rdquo; reduces confidence in the system and potentially limits its scalability.",
      exercise: "Monitor the time your team spends verifying or correcting artificial intelligence outputs during one work week. Please record: <ul><li>Approximate hours dedicated to this task</li><li>Common patterns in the errors or issues encountered</li></ul>",
      matters: "Establishing a baseline for manual verification is the first step in moving from a &ldquo;black box&rdquo; environment to a human-centric trust model."
    },
    'Govern (AVS)': {
      result: "Governance & Value (AVS)",
      implications: "The data points toward a potential &ldquo;System Disconnect&rdquo; where AI initiatives may not be fully aligned with broader business objectives. Establishing a clear Adoption Value System helps ensure technology investments deliver measurable mission impact.",
      exercise: "Examine one recent artificial intelligence initiative and consider: <ul><li>Which specific business objective was this initiative intended to support?</li><li>How is success currently being defined and measured?</li></ul>",
      matters: "Strong governance ensures your AI efforts move beyond activity volume and into true value creation that supports organizational growth."
    },
    'Evolve (IGF)': {
      result: "Evolutionary Safeguards (IGF)",
      implications: "The current signals indicate a potential lack of clarity regarding the ownership of AI-driven outcomes. Embedding accountability loops via an Internal Governance Framework helps ensure systems maintain reliability as they scale.",
      exercise: "During the next two weeks, document instances where an AI-driven outcome requires human intervention. Please record: <ul><li>The specific individual or team tasked with addressing the issue</li><li>The time required to reach a resolution</li></ul>",
      matters: "A structured feedback loop ensures your systems can evolve rapidly while remaining firmly under leadership intent."
    }
  };

  const selected = contentMap[focusArea];

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co', // Forensic record keeping
    from: 'hello@bmradvisory.co',
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #0f172a; line-height: 1.7; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the BMR Signal Diagnostic for <strong>${org || 'your organization'}</strong>. Your responses have identified patterns that are influencing your organizational health across our core lenses: <strong>Trust, Govern, and Evolve.</strong></p>
        
        <div style="background-color: #f8fafc; padding: 24px; border-left: 4px solid #14b8a6; margin: 32px 0;">
          <h4 style="margin: 0; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Primary Observation Lens</h4>
          <p style="font-size: 20px; font-weight: bold; margin: 8px 0 0 0;">${selected.result}</p>
        </div>

        <h3 style="font-size: 18px; color: #0f172a;">Potential Implications</h3>
        <p style="color: #334155;">${selected.implications}</p>

        <h3 style="font-size: 18px; color: #0f172a;">Suggested Forensic Exercise</h3>
        <div style="color: #334155;">${selected.exercise}</div>

        <div style="margin: 40px 0; text-align: center;">
          <a href="https://calendly.com/YOUR_LINK" style="background-color: #14b8a6; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Schedule a 15-Minute Consultation</a>
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
