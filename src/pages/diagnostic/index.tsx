import React from 'react';
import Head from 'next/head';
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

export default function DiagnosticFlow() {
  const handleDiagnosticSubmit = async (finalAnswers: any, userEmail: string, name: string) => {
    try {
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
        // Redirect to the new flat results path
        window.location.href = "/diagnostic/results";
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error sending results. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Strategic Diagnostic | BMR Solutions</title>
        <meta name="description" content="Take our 5-minute diagnostic to assess your organization's Promise Gap." />
      </Head>
      <PromiseGapDiagnosticPage onSubmit={handleDiagnosticSubmit} />
    </>
  );
}
