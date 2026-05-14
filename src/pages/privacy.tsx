"use client";

import React from "react";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 uppercase font-black">
      <nav className="p-8 flex justify-between items-center border-b border-slate-900">
        <button 
          onClick={() => window.location.href='/'} 
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[10px] tracking-[0.4em]"
        >
          <ArrowLeft size={14} /> RETURN_TO_BASE
        </button>
        <Lock size={20} className="text-red-600 opacity-50" />
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto italic">
        <section className="mb-12">
          <span className="text-red-600 font-mono font-black tracking-[0.4em] text-[10px] mb-4 block italic">
            // PRIVACY_GOVERNANCE_NODE // REF_VCDPA_2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter leading-none">
            PRIVACY_<span className="text-red-600 italic">PROTOCOLS</span>
          </h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] font-mono font-black italic">
            EFFECTIVE: FEBRUARY 2026 | JURISDICTION: FAIRFAX_COUNTY_VA
          </p>
        </section>
        
        <div className="space-y-16 text-slate-400 border-t border-slate-900 pt-16 font-mono text-[11px] uppercase tracking-widest leading-relaxed italic">
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">01. DATA_CONTROLLER_NOTICE</h2>
            <p className="max-w-3xl leading-relaxed font-black">
              BMR SOLUTIONS (&ldquo;THE UNIT&rdquo;) ACTS AS A DATA CONTROLLER UNDER THE VIRGINIA CONSUMER DATA PROTECTION ACT (VCDPA). WE COLLECT SYSTEMIC SIGNALS TO IDENTIFY LOGIC_SHEAR ACROSS PRIMARY FORENSIC NODES.
            </p>
          </section>

          <section className="p-10 bg-slate-950 border-2 border-slate-900 relative shadow-2xl">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
            <h2 className="text-xl font-black text-red-600 mb-6 italic tracking-tighter uppercase">NON-DISCLOSURE_COMMITMENT</h2>
            <p className="text-slate-300 leading-loose font-black italic">
              BMR SOLUTIONS DOES NOT SELL, RENT, OR TRADE ORGANIZATIONAL SIGNAL DATA. FORENSIC DATA IS CLASSIFIED AS A PROPRIETARY TECHNICAL ASSET.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase font-black">02. FORENSIC_DATA_CONTACT</h2>
            <p className="font-black italic">
              TO EXERCISE YOUR RIGHTS UNDER THE VCDPA, CONTACT THE CLINICAL PRIVACY DESK:
            </p>
            <a 
              href="mailto:hello@bmradvisory.co" 
              className="inline-flex items-center gap-3 text-white font-black hover:bg-white hover:text-red-600 transition-all border-2 border-red-600 bg-red-600/10 px-10 py-6 text-sm tracking-widest italic"
            >
              HELLO@BMRADVISORY.CO
            </a>
          </section>
        </div>
      </main>

      <footer className="p-12 border-t border-slate-900 text-center">
        <p className="text-slate-700 font-mono text-[9px] tracking-[0.4em] italic font-black">
          PRIVACY_PROTOCOLS_ENABLED // BMR_SOLUTIONS
        </p>
      </footer>
    </div>
  );
}
