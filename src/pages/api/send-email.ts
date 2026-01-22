import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { to, subject, message, html } = req.body;

  if (!to || !html) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await sgMail.send({
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: "BMR Advisory",
      },
      subject: subject || "BMR Advisory",
      text: message,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).json({ success: false });
  }
}
