import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, org, dominantState, scores } = req.body;
  const firstName = name ? name.split(' ')[0] : 'there';

  // Logic to determine priority lens based on behavioral scores
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
      implications: "Artificial intelligence outputs that require frequent manual verification may create hidden labor costs and slow operational workflows. Over time, this practice could reduce confidence in the system and limit its scalability. Addressing this issue may help your team redirect efforts toward higher value activities and improve overall efficiency.",
      exercise: "Monitor the time your team spends verifying or correcting artificial intelligence outputs during one work week. Please record: <ul><li>Total hours dedicated to this task</li><li>Most common types of errors or issues encountered</li></ul>This exercise will help quantify the potential scale of manual effort in your workflows.",
      matters: "Most artificial intelligence assessments focus on technical performance metrics. However, the practical impact depends on how teams interact with these systems. Your responses indicate that reducing manual verification requirements could create efficiency improvements for your organization."
    },
    Accountability: {
      result: "Accountability",
      implications: "When ownership of artificial intelligence driven outcomes is not clearly defined, it can lead to delays in issue resolution and repeated errors. Establishing clear accountability helps ensure problems receive prompt attention and that your artificial intelligence systems maintain reliability.",
      exercise: "During the next two weeks, document instances where an artificial intelligence driven outcome requires intervention. Please record: <ul><li>The individual or team responsible for addressing the issue</li><li>Time required to reach resolution</li></ul>This will help identify accountability gaps and clarify organizational roles.",
      matters: "The effectiveness of artificial intelligence systems depends on the teams that manage them. Your responses suggest an opportunity exists to clarify roles and responsibilities, which may help ensure your artificial intelligence investments deliver consistent value."
    },
    'Strategic Alignment': {
      result: "Strategic Alignment",
      implications: "Artificial intelligence initiatives that are not fully aligned with business objectives may not deliver the expected long term value. Connecting artificial intelligence projects with your strategic goals helps ensure your technology investments support organizational growth.",
      exercise: "Examine one recent artificial intelligence initiative and answer: <ul><li>Which specific business objective did this initiative aim to support?</li><li>How is success currently being measured?</li></ul>This review will help assess whether your artificial intelligence projects align with strategic objectives.",
      matters: "Artificial intelligence initiatives that lack alignment with business goals frequently fail to realize their full potential. Your responses indicate that improved alignment could help maximize the impact of your artificial intelligence investments."
    }
  };

  const selected = contentMap[focusArea];

  const msg = {
    to: email,
    bcc: 'hello@bmradvisory.co', // BCC BMR Solutions
    from: 'hello@bmradvisory.co', // Verified Sender
    subject: 'Insights from Your AI Promise Gap Diagnostic',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #0f172a; line-height: 1.7;">
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the AI Promise Gap Diagnostic for <strong>${org || 'your organization'}</strong>. Your responses have identified key patterns in your artificial intelligence workflows. Below, we have prepared tailored insights and a simple exercise based on your most prominent observation.</p>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        
        <div style="background-color: #f8fafc; padding: 24px; border-left: 4px solid #14b8a6; margin-bottom: 32px;">
          <h4 style="margin: 0; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Your Primary Observation</h4>
          <p style="font-size: 20px; font-weight: bold; margin: 8px 0 0 0; color: #0f172a;">${selected.result}</p>
        </div>

        <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 12px;">Potential Implications for Your Organization</h3>
        <p style="color: #334155;">${selected.implications}</p>

        <h3 style="font-size: 18px; color: #0f172a; margin-top: 32px; margin-bottom: 12px;">Suggested Exercise</h3>
        <div style="color: #334155;">${selected.exercise}</div>

        <h3 style="font-size: 18px; color: #0f172a; margin-top: 32px; margin-bottom: 12px;">Next Steps</h3>
        <p style="color: #334155;">If these observations align with your experience, we would be pleased to discuss them in a brief, obligation free conversation. During this discussion, we can:</p>
        <ol style="color: #334155;">
          <li>Explore how these patterns might apply to your specific situation</li>
          <li>Share general observations from similar organizations</li>
          <li>Determine whether a more detailed conversation about your artificial intelligence workflows would be beneficial</li>
        </ol>

        <div style="margin: 40px 0; text-align: center;">
          <a href="YOUR_CALENDLY_LINK_HERE" style="background-color: #14b8a6; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Schedule a 15 Minute Consultation Here</a>
        </div>

        <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 12px;">Why These Observations Matter</h3>
        <p style="color: #334155;">${selected.matters}</p>

        <p style="margin-top: 40px;">Please let us know if you would like to discuss these findings further. We are available to help.</p>
        
        <p style="margin-bottom: 0;">Best regards,</p>
        <p style="margin-top: 4px;"><strong>BMR Solutions</strong></p>
        
        <div style="display: none; visibility: hidden; opacity: 0; font-size: 1px;">
          Systemic State Logic: ${dominantState} | Audit: ${JSON.stringify(scores)}
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
