/* eslint-disable @typescript-eslint/no-explicit-any */
import SendTrue from "sendtrue";
import { toast } from "sonner";
export const sendEmail = async ({ html, subject, to, message }: any) => {
  const sendTrue = new SendTrue({
    apiKey: import.meta.env.VITE_APP_API_KEY,
    smtpId: import.meta.env.VITE_APP_SMTP_ID,
  });

  try {
    const response = await sendTrue.sendEmail({
      from: import.meta.env.VITE_APP_FROM_EMAIL,
      to: to,
      subject: "BMR Advisory",
      text: message,
      html: html,
    });
    toast.success("Email sent successfully!");
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
