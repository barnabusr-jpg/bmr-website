import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { BMRAuthEmail } from '../../../emails/BMRAuthEmail';

// 🏗️ INITIALIZE RESEND PROTOCOL
const resend = new Resend(process.env.RESEND_API_KEY);

// 🕵️ REGISTRY OF AUTHORIZED OPERATORS
const AUTHORIZED_DATABASE = [
  { 
    email: "admin@bmr.solutions", 
    name: "System Administrator",
    pulseCheckComplete: true, 
    profile: { archetype: "The Architect", reworkTax: "18.4" } 
  },
  { 
    email: "operator-01@bmr.solutions", 
    name: "Senior Operator",
    pulseCheckComplete: true, 
    profile: { archetype: "The Optimizer", reworkTax: "12.2" } 
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, protocol } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "! INVALID_IDENTIFIER" });
  }

  // 🔎 SCANNING THE REGISTRY
  const record = AUTHORIZED_DATABASE.find(user => user.email.toLowerCase() === email.toLowerCase());

  if (record && record.pulseCheckComplete) {
    const protocolName = (protocol as string) || "BMR Stabilization Protocol";

    try {
      // 📧 DISPATCH FORENSIC MANIFEST
      await resend.emails.send({
        from: 'BMR Advisory <hello@bmradvisory.co>',
        to: record.email,
        subject: `Authorization Granted // ${protocolName}`,
        react: BMRAuthEmail({
          operatorName: record.name,
          archetype: record.profile.archetype,
          reworkTax: record.profile.reworkTax,
          protocolName: protocolName,
          calendlyLink: `https://calendly.com/bmr-advisory/stabilization?email=${encodeURIComponent(record.email)}&a1=${encodeURIComponent(record.profile.reworkTax + '%')}`
        }),
      });

      return res.status(200).json(record);
    } catch (error) {
      // LOG ERROR BUT ALLOW ACCESS: We do not block the user if the email service is slow.
      console.error("! EMAIL_DISPATCH_FAILURE:", error);
      return res.status(200).json(record);
    }
  } else {
    // FAILURE: No match found
    console.warn(`[SECURITY] UNAUTHORIZED_ACCESS_ATTEMPT // ID: ${email}`);
    return res.status(404).json({ 
      authorized: false, 
      pulseCheckComplete: false,
      message: "! NO_DIAGNOSTIC_MATCH_FOUND" 
    });
  }
}
