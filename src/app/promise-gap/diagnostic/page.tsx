'use client';

import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

export default function DiagnosticFlow() {
  const handleDiagnosticSubmit = async (answers: any, email: string, name: string) => {
    try {
      // This fetch command hits the API route at src/app/api/send-email/route.ts
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          name: name,
          answers: answers
        }),
      });

      if (response.ok) {
        // Redirect to a results page once the email successfully sends
        window.location.href = "/promise-gap/diagnostic/results";
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData.error);
        alert("Error sending report: " + errorData.error);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the email server. Please check your connection.");
    }
  };

  return (
    <PromiseGapDiagnosticPage onSubmit={handleDiagnosticSubmit} />
  );
}
