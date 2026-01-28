// src/pages/promise-gap/diagnostic/flow.tsx
import React from 'react';
import { sendDiagnosticEmail } from "@/lib/email";
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

/**
 * Cleaned up component to resolve ESLint errors.
 * Removed unused 'useState' and properly handling 'sendDiagnosticEmail'.
 */
export default function DiagnosticFlow() {
  
  // This function now uses the parameters, satisfying the 'unused' rule
  const handleDiagnosticSubmit = async (finalAnswers: any, userEmail: string, name: string) => {
    try {
      await sendDiagnosticEmail({
        to: userEmail,
        firstName: name,
        answers: finalAnswers
      });
      console.log("Diagnostic signals sent successfully.");
    } catch (error) {
      console.error("Failed to send diagnostic signals:", error);
    }
  };

  return (
    <PromiseGapDiagnosticPage 
      onSubmit={handleDiagnosticSubmit} 
    />
  );
}
