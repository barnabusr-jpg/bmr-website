// src/lib/email.ts

// Define the interface so TypeScript understands the 'answers' property
interface DiagnosticEmailData {
  to: string;
  firstName: string;
  answers: Record<string, string>;
}

export const sendDiagnosticEmail = async (data: DiagnosticEmailData) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email");
  }

  return response.json();
};
