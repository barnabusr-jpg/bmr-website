// src/lib/email.ts
import sgMail from '@sendgrid/mail';

// Set the API Key from your Vercel Environment Variables
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface DiagnosticEmailProps {
  to: string;
  firstName: string;
  answers: any;
}

export const sendDiagnosticEmail = async ({ to, firstName, answers }: DiagnosticEmailProps) => {
  const msg = {
    to: to, // The user who took the test
    from: 'hello@bmradvisory.co', // MUST be a verified Single Sender in SendGrid
    cc: 'hello@bmradvisory.co', // Sends a copy to your inbox
    subject: `BMR Strategic Advisory: Diagnostic Results for ${firstName}`,
    text: `Diagnostic results for ${firstName}`,
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Diagnostic Signals Received</h2>
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the Promise Gap Assessment. Our team is currently reviewing your signals to identify structural leakage in your AI implementation.</p>
        <hr />
        <h3>Raw Signal Data:</h3>
        <pre style="background: #f4f4f4; p: 10px;">${JSON.stringify(answers, null, 2)}</pre>
        <p>We will reach out shortly to discuss these findings.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('SendGrid email sent successfully');
  } catch (error: any) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
};
