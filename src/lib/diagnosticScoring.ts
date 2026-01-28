// src/lib/diagnosticScoring.ts
import { diagnosticDimensions } from "@/data/diagnosticQuestions";

/**
 * Identify which signal categories are present based on user responses.
 * Note: This function only identifies the Presence of a signal.
 * Severity and scoring are handled strictly on the server.
 */
export const identifySignals = (answers: Record<string, string>) => {
  const detectedSignals: string[] = [];

  diagnosticDimensions.forEach((dimension) => {
    // Check if any question in this dimension has a 'strained' or 'unsustainable' response
    // These keys correspond to 'lower_mid' and 'bottom'
    const hasSignal = dimension.questions.some(
      (q) => answers[q.id] === "lower_mid" || answers[q.id] === "bottom"
    );

    if (hasSignal && !detectedSignals.includes(dimension.title)) {
      detectedSignals.push(dimension.title);
    }
  });

  return detectedSignals;
};
