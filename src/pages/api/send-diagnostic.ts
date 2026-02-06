import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, scores } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  const trustWeight = (scores["Manual Friction"] || 0) + (scores["Team Relief"] || 0);
  const accountabilityWeight = (scores["System Disconnect"] || 0);
  const alignmentWeight = (scores["Passive Support"] || 0) + (scores["Force Multiplier"] || 0);

  let focusArea: 'Trust' | 'Accountability' | 'Strategic Alignment' = 'Strategic Alignment';
  if (trustWeight >= accountabilityWeight && trustWeight >= alignmentWeight) {
    focusArea = 'Trust';
  } else if (accountabilityWeight >= trustWeight && accountabilityWeight >= alignmentWeight) {
    focusArea = 'Accountability';
  }

  const contentMap = {
    Trust: {
      result: "Trust",
      implications: "Your responses suggest the possibility that artificial intelligence outputs requiring frequent manual verification may be creating hidden labor costs and slowing operational workflows. Over time, this pattern can reduce confidence in the system and potentially limit its scalability. Exploring this area further may help your team redirect efforts toward higher-value activities.",
      exercise: "Monitor the time your team spends verifying or correcting artificial intelligence outputs during one work week. Please record: <ul><li>Approximate hours dedicated to this task</li><li>Common patterns in the errors or issues encountered</li></ul>This exercise is designed to help quantify the potential scale of manual effort in your current workflows.",
      matters: "While many assessments focus on technical metrics, the practical impact often depends on how teams interact with these systems. The current signals indicate that reducing manual verification requirements could unlock notable efficiency improvements for your organization."
    },
    Accountability: {
      result: "Accountability",
      implications: "The data points toward a potential lack of clarity regarding the ownership of artificial intelligence driven outcomes, which can sometimes lead to delays in issue resolution. Establishing more defined accountability may help ensure that technical problems receive prompt attention and that your systems maintain consistent reliability.",
      exercise: "During the next two weeks, document instances where an artificial intelligence driven outcome requires human intervention. Please record: <ul><li>The individual or team currently tasked with addressing the issue</li><li>The time required to reach a resolution</li></ul>This will help identify potential accountability gaps and clarify organizational roles.",
      matters: "The effectiveness of artificial intelligence systems frequently depends on the human structures that manage them. Your responses highlight a valuable opportunity to clarify roles and responsibilities, which may help ensure your technology investments deliver more consistent value."
    },
    'Strategic Alignment': {
      result: "Strategic Alignment",
      implications: "The current signals indicate that artificial intelligence initiatives within the organization may not yet be fully aligned with broader business objectives, which can occasionally limit long-term value. Connecting these projects more closely with your strategic goals helps ensure technology investments directly support organizational growth.",
      exercise: "Examine one recent artificial intelligence initiative and consider: <ul><li>Which specific business objective was this initiative intended to support?</li><li>How is success currently being defined and measured?</li></ul>This review can help assess whether your artificial intelligence projects are positioned to support your strategic objectives.",
      matters: "Artificial intelligence initiatives that lack close alignment with business goals can struggle to realize their full potential. Your responses suggest that improved alignment could help maximize the impact and sustainability of your technology investments."
    }
  };

  const selected = contentMap[focusArea];

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co',
    from: 'hello@bmradvisory.co',
    subject: 'Insights from Your AI Promise Gap Diagnostic',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #0f172a; line-height: 1.7;">
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the AI Promise Gap Diagnostic for <strong>${org || 'your organization'}</strong>. Your responses have identified patterns that may be influencing your artificial intelligence workflows. Below, we have prepared tailored insights and a simple exercise based on these initial observations.</p>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        
        <div style="background-color: #f8fafc; padding: 24px; border-left: 4px solid #14b8a6; margin-bottom: 32px;">
          <h4 style="margin: 0; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Primary Observation Area</h4>
          <p style="font-size: 20px; font-weight: bold; margin: 8px 0 0 0; color: #0f172a;">${selected.result}</p>
        </div>

        <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 12px;">Potential Implications</h3>
        <p style="color: #334155;">${selected.implications}</p>

        <h3 style="font-size: 18px; color: #0f172a; margin-top: 32px; margin-bottom: 12px;">Suggested Exercise</h3>
        <div style="color: #334155;">${selected.exercise}</div>

        <div style="margin: 40px 0; text-align: center;">
          <a href="YOUR_CALENDLY_LINK" style="background-color: #14b8a6; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Schedule a 15-Minute Consultation</a>
        </div>

        <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 12px;">Why These Observations Matter</h3>
        <p style="color: #334155;">${selected.matters}</p>

        <p style="margin-top: 40px;">If these insights align with your current experience, we would be pleased to discuss them further in a brief, obligation-free conversation.</p>
        
        <p style="margin-bottom: 0;">Best regards,</p>
        <p style="margin-top: 4px;"><strong>BMR Solutions</strong></p>
        
        <div style="display: none; visibility: hidden; opacity: 0; font-size: 1px;">
          Audit Metadata: ${JSON.stringify(scores)}
        </div>
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
