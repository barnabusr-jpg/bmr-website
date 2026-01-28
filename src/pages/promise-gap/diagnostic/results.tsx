// src/pages/promise-gap/diagnostic/results.tsx
import React from 'react';
import { resultsNarrative } from "@/data/diagnosticNarratives";
import { identifySignals } from "@/lib/diagnosticScoring"; // Use the new function

export default function ResultsPage({ answers }: { answers: Record<string, string> }) {
  // Identify signals based on presence, not scores
  const signals = identifySignals(answers);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{resultsNarrative.title}</h1>
      <p className="text-lg mb-8">{resultsNarrative.framing}</p>
      
      <div className="space-y-4">
        {signals.map((signal) => (
          <div key={signal} className="p-4 border-l-4 border-blue-600 bg-slate-50">
            <h3 className="font-bold">{signal}</h3>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-gray-500 italic">
        {resultsNarrative.disclaimer}
      </p>
    </div>
  );
}
