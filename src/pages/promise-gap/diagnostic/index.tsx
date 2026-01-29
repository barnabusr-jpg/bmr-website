// src/pages/promise-gap/diagnostic/index.tsx
import React from 'react';
import { useRouter } from 'next/router'; // Added for navigation
import { sendDiagnosticEmail } from "@/lib/email";
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

/**
 * Diagnostic Flow Component
 * Handles the logic for processing assessment answers and 
 * redirecting the user upon successful submission.
 */
export default function DiagnosticFlow() {
  const router = useRouter();

  const handleDiagnosticSubmit = async (finalAnswers: any, userEmail: string, name: string) => {
    try {
      // 1. Trigger the email service
      await sendDiagnosticEmail({
        to: userEmail,
        firstName: name,
        answers: finalAnswers
      });
      
      console.log("Diagnostic signals sent successfully.");
      
      // 2. Redirect the user to the results/success page
      // This ensures the button doesn't just "do nothing" visually
      router.push("/promise-gap/diagnostic/results");

    } catch (error) {
      console.error("Failed to send diagnostic signals:", error);
      
      // 3. Provide user feedback in case of failure
      alert("We encountered an issue sending your results. Please try again or contact support.");
    }
  };

  return (
    <PromiseGapDiagnosticPage 
      onSubmit={handleDiagnosticSubmit} 
    />
  );
}
