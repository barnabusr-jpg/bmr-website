import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { Resend } from 'resend';
import { BMRAuthEmail } from '../../emails/BMRAuthEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, protocol } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "! INVALID_IDENTIFIER" });
  }

  try {
    // 🔌 CONNECT TO MONGODB
    const client = await clientPromise;
    const db = client.db("bmr_advisory"); // Your Database Name
    
    // 🔎 QUERY THE OPERATORS COLLECTION
    const record = await db.collection("operators").findOne({ 
      email: email.toLowerCase() 
    });

    if (record && record.pulseCheckComplete) {
      const protocolName = (protocol as string) || "BMR Stabilization Protocol";

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
    } else {
      return res.status(404).json({ message: "! NO_DIAGNOSTIC_MATCH_FOUND" });
    }
  } catch (error) {
    console.error("! DATABASE_ERROR:", error);
    return res.status(500).json({ error: "! INTERNAL_SYSTEM_FAILURE" });
  }
}
