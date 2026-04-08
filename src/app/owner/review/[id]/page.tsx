'use client';

import React from 'react';
import { ShieldAlert, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReviewVerdict({ params }: { params: { id: string } }) {
  // Fetch logic for analysis results here
  
  const handleFinalAuthorization = async () => {
    const confirm = window.confirm("AUTHORIZE RELEASE: This will generate the final PDF and transmit the Verdict to the client. Proceed?");
    if (confirm) {
      const res = await fetch('/api/owner/release-verdict', {
        method: 'POST',
        body: JSON.stringify({ projectId: params.id })
      });
      if (res.ok) alert("VERDICT_RELEASED_TO_CLIENT");
    }
  };

  return (
    <div className="min-h-screen bg-white p-12 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto">
        <Link href="/owner/dashboard" className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-blue-600 mb-10 transition">
          <ArrowLeft size={14} /> BACK_TO_CONTROL_TERMINAL
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">Forensic_Reconciliation_Map</h1>
          <p className="text-slate-500 font-mono text-sm mt-2">Project_ID: {params.id}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Logic Reconciliation Visualization Component goes here */}
        </div>

        <section className="bg-slate-900 rounded-lg p-10 text-white mb-20">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">Final_Hardening_Directives</h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Review the identified structural contradictions. Once authorized, these directives will be clinical mandates in the final PDF.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Total_Rework_Tax</p>
              <p className="text-5xl font-black text-white">$450,200</p>
            </div>
          </div>

          <button 
            onClick={handleFinalAuthorization}
            className="w-full bg-red-600 hover:bg-red-700 py-6 rounded text-xl font-black italic uppercase tracking-tighter transition shadow-2xl active:scale-[0.98]"
          >
            Authorize_Verdict_Release
          </button>
        </section>
      </div>
    </div>
  );
}
