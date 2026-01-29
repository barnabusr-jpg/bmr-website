import React from 'react';
import { useRouter } from "next/router";
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

export default function DiagnosticFlow() {
  const router = useRouter();

  const handleDiagnosticSubmit = async (finalAnswers: any, userEmail: string, name: string) => {
    try {
      // Call the internal API route instead of the library directly
      const response = await fetch('/api/send-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          firstName: name,
          answers: finalAnswers
        }),
      });

      if (response.ok) {
        router.push("/promise-gap/diagnostic/results");
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error sending results. Please try again.");
    }
  };

  return <PromiseGapDiagnosticPage onSubmit={handleDiagnosticSubmit} />;
}
