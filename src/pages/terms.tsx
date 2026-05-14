"use client";

import React from "react";
import { ArrowLeft, Shield } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      {/* --- STANDALONE NAV --- */}
      <nav className="p-8 flex justify-between items-center border-b border-slate-900 no-print">
        <button 
          onClick={() => window.location.href='/'} 
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[10px] uppercase tracking-[0.4em] font-bold italic"
        >
          <ArrowLeft size={14} /> BACK_TO_SITE
        </button>
        <Shield size={20} className="text-red-600 opacity-50" />
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <section className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic uppercase tracking-tighter leading-none">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <p className="text-slate-500 text-[11px] uppercase tracking-[0.2em] font-mono font-bold">
            Jurisdiction: Fairfax County, Virginia | Effective: February 2026
          </p>
        </section>

        <div className="space-y-16 text-slate-300 border-t border-slate-900 pt-16 leading-relaxed">
          
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">1. Intellectual Property & Trade Secrets</h2>
            <p className="text-red-600 font-bold text-[11px] uppercase tracking-wider italic">Notice under the Virginia Uniform Trade Secrets Act:</p>
            <p className="pl-8 border-l-2 border-slate-800 text-slate-400">
              The BMR Protocol, including but not limited to the 12 Diagnostic Signals, the Promise Gap™ Framework, and the HAI Field Guide, are the exclusive intellectual property of BMR Solutions. Unauthorized use, reverse-engineering, reproduction, or redistribution of these proprietary methodologies is strictly prohibited and protected under the laws of the Commonwealth of Virginia.
            </p>
          </section>

          <section className="p-10 border border-slate-800 bg-slate-950/50 shadow-2xl">
            <h2 className="text-xl font-black text-white mb-6 uppercase italic tracking-tight">2. Advisory Disclaimer</h2>
            <p className="text-[13px] leading-loose text-slate-400 italic">
              The System Diagnostic and Field Guide are provided "as is" without warranty of any kind. BMR Solutions does not guarantee specific financial, operational, or mission-critical outcomes. Advisory services do not constitute legal advice, nor do they provide technical compliance certifications for regulatory bodies.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">3. Governing Law & Venue</h2>
            <p className="max-w-3xl">
              These Terms shall be governed by and construed in accordance with the laws of the <strong className="text-white">Commonwealth of Virginia</strong>. Exclusive jurisdiction for any claim or dispute resides in the <strong className="text-white underline underline-offset-4 decoration-red-600">Circuit Court of Fairfax County, Virginia</strong>, or the U.S. District Court for the Eastern District of Virginia.
            </p>
          </section>

          <section className="space-y-8 pt-12 border-t border-slate-900">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">4. Contact & Inquiries</h2>
            <p className="text-slate-400 italic">
              Questions regarding these Terms or the authorized use of BMR intellectual property should be directed to:
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
