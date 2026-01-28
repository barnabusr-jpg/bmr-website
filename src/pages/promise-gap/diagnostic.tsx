import React from 'react';
import { useRouter } from 'next/router';
import { identifySignals } from "@/lib/diagnosticScoring";
import { resultsNarrative } from "@/data/diagnosticNarratives";

export default function ResultsPage() {
  const router = useRouter();
  // Retrieve answers from the query or state
  const answers = router.query.answers ? JSON.parse(router.query.answers as string) : {};

  // Use the new non-evaluative logic to identify signals
  const detectedSignals = identifySignals(answers);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{resultsNarrative.title}</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          {resultsNarrative.framing}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {detectedSignals.map((signal) => (
          <div key={signal} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{signal}</h3>
            <p className="text-slate-600">
              Your responses indicate a pattern within this category that warrants further exploration 
              as an early indicator of a potential Promise Gap.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-slate-50 rounded-xl border border-slate-200">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <p className="text-slate-700 mb-6">
          This diagnostic is designed to surface early signals only. It does not assess maturity, 
          assign scores, or provide specific recommendations.
        </p>
        <p className="text-sm text-slate-500 italic">
          {resultsNarrative.disclaimer}
        </p>
      </div>
    </div>
  );
}
