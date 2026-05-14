"use client";

import React from "react";
import { ArrowLeft, Shield } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 uppercase font-black">
      {/* --- INDEPENDENT LEGAL HEADER --- */}
      <nav className="p-8 flex justify-between items-center border-b border-slate-900">
        <button 
          onClick={() => window.location.href='/'} 
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[10px] tracking-[0.4em]"
        >
          <ArrowLeft size={14} /> RETURN_TO_BASE
        </button>
        <Shield size={20} className="text-red-600 opacity-50" />
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto italic">
        <section className="mb-12 text-left">
          <span className="text-red-600 font-mono font-black tracking-[0.4em] text-[10px] mb-4 block italic">
            // GOVERNING_AGREEMENT_NODE // REF_2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter leading-none">
            TERMS_OF_<span className="text-red-600 italic">SERVICE</span>
          </h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] font-mono font-black italic">
            JURISDICTION: FAIRFAX_COUNTY_VA // ALPHA_7_CLEARANCE
          </p>
        </section>

        <div className="space-y-16 text-slate-400 border-t border-slate-900 pt-16 font-mono text-[11px] uppercase tracking-widest leading-relaxed italic">
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">01. INTELLECTUAL_PROPERTY</h2>
            <p className="leading-loose border-l-4 border-red-600/30 pl-8 font-black">
              THE BMR PROTOCOL—INCLUDING THE 12 DIAGNOSTIC SIGNALS, THE PROMISE_GAP™ FRAMEWORK, AND THE EVIDENCE_VAULT—ARE THE EXCLUSIVE INTELLECTUAL PROPERTY OF BMR SOLUTIONS. UNAUTHORIZED USE, REVERSE-ENGINEERING, OR REDISTRIBUTION IS STRICTLY PROHIBITED UNDER THE VIRGINIA UNIFORM TRADE SECRETS ACT.
            </p>
          </section>

          <section className="p-10 border-2 border-slate-900 bg-slate-950/50 relative shadow-2xl">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tighter italic">02. ADVISORY_DISCLAIMER</h2>
            <p className="text-[10px] leading-loose text-slate-500 font-black italic">
              ADVISORY SERVICES DO NOT CONSTITUTE LEGAL OR TECHNICAL COMPLIANCE CERTIFICATIONS. THE FORENSIC_TRIAGE AND EVIDENCE_VAULT ARE PROVIDED "AS IS" WITHOUT GUARANTEE OF SPECIFIC FINANCIAL OUTCOMES.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">03. GOVERNING_LAW</h2>
            <p className="max-w-3xl leading-relaxed font-black italic uppercase">
              EXCLUSIVE JURISDICTION FOR ANY DISPUTE RESIDES IN THE <strong className="text-white underline decoration-red-600/30">CIRCUIT COURT OF FAIRFAX COUNTY, VIRGINIA</strong>.
            </p>
          </section>
        </div>
      </main>

      {/* --- INDEPENDENT LEGAL FOOTER --- */}
      <footer className="p-12 border-t border-slate-900 text-center">
        <p className="text-slate-700 font-mono text-[9px] tracking-[0.4em] italic font-black">
          BMR SOLUTIONS GLOBAL // LEGAL_DESK_ENCRYPTED
        </p>
      </footer>
    </div>
  );
}
