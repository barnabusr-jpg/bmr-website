"use client";

import React from "react";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900">
      {/* --- STANDALONE NAV --- */}
      <nav className="p-6 md:p-8 flex justify-between items-center border-b border-slate-200 bg-white no-print">
        <button 
          onClick={() => window.location.href='/'} 
          className="flex items-center gap-3 text-slate-600 hover:text-red-700 transition-colors font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft size={16} /> BACK TO SITE
        </button>
        <Lock size={20} className="text-red-700 opacity-80" />
      </nav>

      <main className="pt-16 md:pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <section className="mb-12">
          <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
            DATA GOVERNANCE PROTOCOL
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight text-slate-950 leading-none">
            PRIVACY <span className="text-red-700">PROTOCOLS.</span>
          </h1>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-mono font-semibold">
            Effective: February 2026 | Fairfax County, Virginia
          </p>
        </section>
        
        <div className="space-y-12 text-slate-700 border-t border-slate-200 pt-12 leading-relaxed">
          
          {/* SECTION 1 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 uppercase tracking-tight">
              1. Data Controller Notice & Zero Security Footprint
            </h2>
            <p className="max-w-3xl text-slate-700 font-normal">
              BMR Solutions, LLC acts as a Data Controller under the <strong className="text-slate-950 underline decoration-red-700/40">Virginia Consumer Data Protection Act (VCDPA)</strong>. We collect professional identification and organizational diagnostic responses to assess operational risk. BMR operates under a Zero Security Footprint architecture and does not connect to live production hardware, store customer PII/PHI, or request live system credentials.
            </p>
          </section>

          {/* NON-DISCLOSURE COMMITMENT BOX */}
          <section className="p-8 bg-white border-l-4 border-red-700 border border-slate-200 shadow-sm rounded-sm space-y-3">
            <h2 className="text-base md:text-lg font-bold text-red-700 uppercase tracking-tight font-mono">
              // NON-DISCLOSURE COMMITMENT
            </h2>
            <p className="text-slate-700 leading-relaxed font-normal text-sm">
              BMR Solutions does not sell, rent, or trade personal or organizational signal data to third parties. Data collected through our System Diagnostics is treated strictly as proprietary technical assets with professional rigor.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 uppercase tracking-tight">
              2. Rights Under Virginia Law (VCDPA)
            </h2>
            <p className="text-slate-600 font-normal">
              As a resident of the Commonwealth of Virginia or an authorized representative, you maintain the following rights regarding your data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {['Right to Access', 'Right to Correct', 'Right to Delete', 'Right to Data Portability'].map((right) => (
                <div key={right} className="flex items-center gap-3 p-4 border border-slate-200 bg-white rounded-sm shadow-sm">
                  <div className="h-2 w-2 bg-red-700 rounded-full"></div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-900 font-mono">{right}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-6 pt-8 border-t border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 uppercase tracking-tight">
              3. Data Requests & Inquiries
            </h2>
            <p className="text-slate-600 font-normal">
              To exercise your rights under the VCDPA or to request information regarding the diagnostic data we hold, please contact the privacy desk:
            </p>
            <a 
              href="mailto:hello@bmradvisory.co" 
              className="inline-flex items-center gap-2 text-slate-950 font-mono font-bold hover:text-red-700 transition-colors border-b-2 border-red-700 pb-1 text-base tracking-wider uppercase"
            >
              HELLO@BMRADVISORY.CO
            </a>
          </section>
        </div>
      </main>

      <footer className="p-8 border-t border-slate-200 text-center bg-slate-100">
        <p className="text-slate-500 font-mono text-[10px] tracking-widest font-bold uppercase">
          © 2026 BMR Solutions Global // Fairfax County, VA
        </p>
      </footer>
    </div>
  );
}
