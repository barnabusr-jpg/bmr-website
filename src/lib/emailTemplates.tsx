// src/lib/emailTemplates.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Note: The actual HTML body is now generated on the server in the API route 
 * to ensure security and prevent IP leakage.
 */
import { identifySignals } from "./diagnosticScoring";

/**
 * Placeholder for any frontend-side template logic.
 * This removes the broken 'DiagnosticScores' import.
 */
export const getEmailPreview = (firstName: string, answers: Record<string, string>) => {
  const signals = identifySignals(answers);
  
  return {
    subject: "Your Promise Gap Diagnostic Results", //
    body: `Hello ${firstName}, thank you for completing the diagnostic. We have identified signals in ${signals.length} areas.`
  };
};
