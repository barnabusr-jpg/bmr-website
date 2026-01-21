import type { NextApiRequest, NextApiResponse } from "next";
import SendTrue from "sendtrue";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, subject, message, html } = req.body;


  if (!to || !html) {
    return res.status(400).json({ message: "Missing required fields" });
  }



  try {
    const sendTrue = new SendTrue({
      apiKey: process.env.SENDTRUE_API_KEY!,
      smtpId: process.env.SENDTRUE_SMTP_ID!,
    });

//   console.log("process.env.SENDTRUE_API_KEY", process.env.SENDTRUE_API_KEY);
//   console.log("process.env.SENDTRUE_SMTP_ID!", process.env.SENDTRUE_SMTP_ID!);


    await sendTrue.sendEmail({
      from: process.env.SENDTRUE_FROM_EMAIL!,
      to,
      subject: subject || "BMR Advisory",
      text: message,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ success: false });
  }
}
