/* eslint-disable @typescript-eslint/no-explicit-any */
import { identifySignals } from "./diagnosticScoring";

/**
 * Simplified preview logic. 
 * The actual email HTML is securely generated on the server.
 */
export const getEmailPreview = (firstName: string, answers: Record<string, string>) => {
  const signals = identifySignals(answers);
  
  return {
    subject: "Your Promise Gap Diagnostic Results", //
    body: `Hello ${firstName}, thank you for completing the diagnostic. We have identified signals in ${signals.length} areas.`
  };
};
