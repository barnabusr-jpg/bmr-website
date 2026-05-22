import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  // 🔍 DEBUG 1: Verify the server is actually receiving the payload from the quiz
  console.log("FORENSIC_INBOUND_PAYLOAD:", req.body);

  const { email, orgName, auditId } = req.body;

  // 🔍 DEBUG 2: Verify the API token exists in the environment container
  if (!process.env.RESEND_API_KEY) {
    console.error("CRITICAL_EMAIL_ERROR: process.env.RESEND_API_KEY is completely UNDEFINED inside this runtime environment.");
    return res.status(500).json({ error: 'SERVER_ENVIRONMENT_MISCONFIGURATION' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const secureUrl = `https://www.bmradvisory.co/results/${auditId}`;

    console.log("ATTEMPTING_RESEND_DISPATCH_TO:", email);

    // Run the transmission handler
    const response = await resend.emails.send({
      from: 'BMR Advisory <hello@BMRadvisory.co>',
      to: email.toLowerCase().trim(),
      subject: `SECURE_SIGNAL: Forensic Assessment Anchored // ${orgName?.toUpperCase() || 'CLIENT_NODE'}`,
      html: `<h3>Your workspace link: ${secureUrl}</h3>`
    });

    // 🔍 DEBUG 3: Log what Resend says back to your server
    console.log("RESEND_API_RESPONSE_SUCCESS:", response);

    return res.status(200).json({ success: true, data: response });

  } catch (err: any) {
    // 🔍 DEBUG 4: Capture any specific connection drops or validation blocks
    console.error("CRITICAL_RESEND_TRANSMISSION_FAILED:", err);
    return res.status(500).json({ error: 'INTERNAL_DELIVERY_FAILURE', message: err.message });
  }
}
