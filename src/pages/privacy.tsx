"use client";

import React from "react";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <nav className="p-8 flex justify-between items-center border-b border-slate-900 no-print">
        <button 
          onClick={() => window.location.href='/'} 
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[10px] uppercase tracking-[0.4em] font-bold italic"
        >
          <ArrowLeft size={14} /> BACK_TO_SITE
        </button>
        <Lock size={20} className="text-red-600 opacity-50" />
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <section className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic uppercase tracking-tighter leading-none">
            Privacy <span className="text-red-600">Protocols</span>
          </h1>
          <p className="text-slate-500 text-[11px] uppercase tracking-[0.2em] font-mono font-bold">
            Effective: February 2026 | Fairfax County, Virginia
          </p>
        </section>
        
        <div className="space-y-16 text-slate-300 border-t border-slate-900 pt-16 leading-relaxed">
          
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">1. Data Controller Notice</h2>
            <p className="max-w-3xl">
              BMR Solutions acts as a Data Controller under the 
              <strong className="text-white underline decoration-red-600/30 ml-2">Virginia Consumer Data Protection Act (VCDPA)</strong>. 
              We collect professional identification and organizational signal data to identify risks across three forensic lenses: Trust (HAI), Govern (AVS), and Evolve (IGF).
            </p>
          </section>

          <section className="p-10 bg-slate-950 border-l-4 border-red-600 shadow-2xl">
            <h2 className="text-xl font-black text-red-600 mb-6 italic uppercase tracking-tight">Non-Disclosure Commitment</h2>
            <p className="text-slate-300 leading-loose italic">
              BMR Solutions does not sell, rent, or trade your personal or organizational signal data to third parties. Data collected through the System Diagnostic is handled as proprietary technical assets with professional rigor.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">2. Rights Under Virginia Law (VCDPA)</h2>
            <p className="text-slate-400">As a resident of the Commonwealth of Virginia, you maintain the following rights regarding your personal data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {['Right to Access', 'Right to Correct', 'Right to Delete', 'Right to Portability'].map((right) => (
                <div key={right} className="flex items-center gap-4 p-5 border border-slate-900 bg-slate-950/50">
                  <div className="h-1.5 w-1.5 bg-red-600"></div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-white italic">{right}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 pt-12 border-t border-slate-900">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">3. Data Requests</h2>
            <p className="text-slate-400 italic">
              To exercise your rights under the VCDPA or to request information regarding the data we hold, please contact the privacy desk:
            </p>
            <a 
              href="mailto:hello@bmradvisory.co" 
              className="inline-flex items-center gap-3 text-white font-black hover:text-red-600 transition-all border-b-2 border-red-600 pb-1 text-lg tracking-widest italic"
            >
              HELLO@BMRADVISORY.CO
            </a>
          </section>
        </div>
      </main>

      <footer className="p-12 border-t border-slate-900 text-center">
        <p className="text-slate-700 font-mono text-[9px] tracking-[0.4em] font-bold uppercase italic">
          BMR Solutions // Fairfax County, VA
        </p>
      </footer>
    </div>
  );
}
