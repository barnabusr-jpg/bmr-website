import React from 'react';
import { analyzeForensicResults } from '@/utils/forensicEngine';
import { authorizeVerdictRelease } from '@/utils/releaseToClient';

export const OwnerReviewDashboard = ({ auditData }: { auditData: any }) => {
  const analysis = analyzeForensicResults(auditData.responses);

  return (
    <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase">Audit Review: {auditData.companyName}</h1>
          <p className="text-slate-500 font-mono text-xs">Friction Index: {analysis.frictionIndex.toFixed(1)}%</p>
        </div>
        <button 
          onClick={() => authorizeVerdictRelease(auditData.projectId, auditData.requesterEmail)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold uppercase text-sm tracking-widest transition"
        >
          Authorize & Release Verdict
        </button>
      </header>

      <section className="space-y-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detected Contradictions</h3>
        {analysis.contradictions.map((c, i) => (
          <div key={i} className="p-4 bg-slate-50 border-l-4 border-red-500 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">{c.verdict}</p>
              <p className="text-xs text-slate-500 uppercase">Zone: {c.zone} | Impact: ${c.impact.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12 p-6 bg-slate-900 text-white rounded">
        <p className="text-xs font-mono text-blue-400 uppercase mb-2">Total_12Mo_Loss_Projection</p>
        <p className="text-5xl font-black">${analysis.totalProjectedLoss.toLocaleString()}</p>
      </section>
    </div>
  );
};
