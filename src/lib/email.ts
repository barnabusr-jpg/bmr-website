// Final build trigger
/**
 * src/lib/email.ts
 * This utility handles the communication between the browser and the 
 * secure server-side email API.
 */

interface DiagnosticEmailData {
  to: string;
  firstName: string;
  answers: Record<string, string>;
}

export const sendDiagnosticEmail = async (data: DiagnosticEmailData) => {
  // This calls the secure API route you created at src/app/api/send-email/route.ts
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to send diagnostic signals");
  }

  return response.json();
};
