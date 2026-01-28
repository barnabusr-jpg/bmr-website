// src/lib/diagnosticScoring.ts
import { diagnosticDimensions } from "@/data/diagnosticQuestions";

/**
 * Identify which signal categories are present based on user responses.
 * This function uses the 'export' keyword so it can be used by the Results page.
 * Logic: presence of 'lower_mid' or 'bottom' triggers a signal.
 */
export const identifySignals = (answers: Record<string, string>) => {
  const detectedSignals: string[] = [];

  // Ensure answers object exists to prevent runtime errors
  const safeAnswers = answers || {};

  diagnosticDimensions.forEach((dimension) => {
    // A signal is present if any question in this dimension has a strained response
    const hasSignal = dimension.questions.some(
      (q) => safeAnswers[q.id] === "lower_mid" || safeAnswers[q.id] === "bottom"
    );

    if (hasSignal && !detectedSignals.includes(dimension.title)) {
      detectedSignals.push(dimension.title);
    }
  });

  return detectedSignals;
};
