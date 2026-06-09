import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { auditId, tokens, recipients } = req.body;
  if (!auditId || !tokens || !recipients) {
    return res.status(400).json({ error: "Missing backend transactional parameters." });
  }

  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const configuredSender = process.env.SENDGRID_FROM_EMAIL || "advisory@bmrsolutions.com";

  if (!sendgridApiKey) {
    console.error("❌ DEPLOYMENT ERROR: SENDGRID_API_KEY environment variable is completely missing.");
    return res.status(500).json({ error: "Mail infrastructure server error." });
  }

  try {
    const personalizationNodes = [
      {
        to: [{ email: recipients.executive }],
        dynamic_template_data: {
          role: "EXECUTIVE TRACK",
          validation_token: tokens.executive,
          portal_link: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/results/${auditId}`
        }
      },
      {
        to: [{ email: recipients.managerial }],
        dynamic_template_data: {
          role: "MANAGERIAL TRACK",
          validation_token: tokens.managerial,
          portal_link: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/results/${auditId}`
        }
      },
      {
        to: [{ email: recipients.technical }],
        dynamic_template_data: {
          role: "TECHNICAL TRACK",
          validation_token: tokens.technical,
          portal_link: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/results/${auditId}`
        }
      }
    ];

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: personalizationNodes,
        from: { email: configuredSender, name: "BMR Solutions Advisory" },
        template_id: process.env.SENDGRID_DIAGNOSTIC_TEMPLATE_ID || "d-placeholder-id"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SendGrid API Refusal: ${errorText}`);
    }

    return res.status(200).json({ success: true, message: "SendGrid batch queue populated successfully." });

  } catch (error: any) {
    console.error("❌ SendGrid Delivery Pipeline Crash:", error);
    return res.status(500).json({ error: error.message || "Failed to transmit workshop access updates." });
  }
}
