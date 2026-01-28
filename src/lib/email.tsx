/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

interface SendDiagnosticEmailArgs {
  to: string;
  firstName: string;
}

export const sendDiagnosticEmail = async ({ to, firstName }: SendDiagnosticEmailArgs) => {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, firstName }),
    });

    if (!res.ok) throw new Error("Email failed");
    toast.success("Diagnostic submitted successfully.");
  } catch (error) {
    console.error(error);
    toast.error("Failed to process submission");
  }
};
