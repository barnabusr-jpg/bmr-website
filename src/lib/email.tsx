/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

interface SendEmailArgs {
  to: string | null;
  subject: string | null;
  message: string | null;
  html: string;
}

export const sendEmail = async ({
  to,
  subject,
  message,
  html,
}: SendEmailArgs) => {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        message,
        html,
      }),
    });

    if (!res.ok) throw new Error("Email failed");

    toast.success("Email sent successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to send email");
  }
};
