// src/lib/email.ts
import { Resend } from 'resend';

// Ensure your environment variable is named correctly in Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

interface DiagnosticEmailProps {
  to: string;
  firstName: string;
  answers: any;
}

export const sendDiagnosticEmail = async ({ to, firstName, answers }: DiagnosticEmailProps) => {
  try {
    const data = await resend.emails.send({
      from: 'BMR Advisory <hello@bmradvisory.co>', // UPDATED: Must be a verified domain email
      to: [to],
      cc: ['hello@bmradvisory.co'], // Sends a copy to you
      subject: `BMR Strategic Advisory: Diagnostic Signals for ${firstName}`,
      html: `
        <h1>Diagnostic Signals Received</h1>
        <p>Hello ${firstName},</p>
        <p>Thank you for completing the Promise Gap Assessment. Our team is currently reviewing your signals.</p>
        <hr />
        <h3>Assessment Summary:</h3>
        <pre>${JSON.stringify(answers, null, 2)}</pre>
      `,
    });

    return data;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};
