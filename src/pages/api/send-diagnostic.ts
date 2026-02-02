// Define the map to translate raw IDs into clear verbiage
const questionMap: Record<string, string> = {
  "1": "AI decision logic is transparent to all stakeholders.",
  "2": "Oversight owners are clearly identified for every AI project.",
  "3": "We have measurable indicators for stakeholder trust.",
  // Add all 12 questions here to match your diagnostic tool
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { to, firstName, answers } = req.body;

  // Format the answers into a clear-text list for the email
  const formattedResults = Object.entries(answers)
    .map(([id, value]) => `<li><strong>${questionMap[id] || 'Observation ' + id}:</strong> ${value}</li>`)
    .join('');

  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@bmradvisory.co',
    subject: `Strategic Synthesis: Diagnostic Results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; color: #020617; max-width: 600px;">
        <h2 style="color: #14b8a6;">Diagnostic Signals Received</h2>
        <p>Hello ${firstName},</p>
        <p>Your strategic diagnostic for BMR Solutions has been synthesized. Below are the key signals identified during your observation:</p>
        
        <ul style="list-style: none; padding: 0; margin-top: 20px;">
          ${formattedResults}
        </ul>

        <div style="margin-top: 40px; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 14px; color: #64748b;">
            <strong>Next Step:</strong> These signals indicate where your system behavior is diverging from leadership expectations. A strategist will review these findings to determine the depth of the Promise Gap™.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to send' });
  }
}
