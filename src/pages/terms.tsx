"use client";

import React from "react";
import { ArrowLeft, Shield } from "lucide-react";

export default function TermsOfService() {
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
        <Shield size={20} className="text-red-700 opacity-80" />
      </nav>

      <main className="pt-16 md:pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <section className="mb-12">
          <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
            GOVERNANCE PROTOCOL
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight text-slate-950 leading-none">
            TERMS OF <span className="text-red-700">SERVICE.</span>
          </h1>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-mono font-semibold">
            Jurisdiction: Fairfax County, Virginia | Effective: February 2026
          </p>
        </section>

        <div className="space-y-12 text-slate-700 border-t border-slate-200 pt-12 leading-relaxed">
          
          {/* SECTION 1 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 uppercase tracking-tight">
              1. Intellectual Property & Trade Secrets
            </h2>
            <p className="text-red-700 font-mono font-bold text-xs uppercase tracking-wider">
              Notice under the Virginia Uniform Trade Secrets Act:
            </p>
            <p className="pl-6 border-l-2 border-slate-300 text-slate-700 font-normal">
              The BMR Protocol, including but not limited to the 12 Diagnostic Signals, the Process Waste Tax™ methodology, the Promise Gap™ Framework, and evaluation matrices, are the exclusive intellectual property of BMR Solutions, LLC. Unauthorized use, reverse-engineering, reproduction, or redistribution of these proprietary methodologies is strictly prohibited and protected under the laws of the Commonwealth of Virginia.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="p-8 border border-slate-200 bg-white shadow-sm rounded-sm space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-slate-950 uppercase tracking-tight">
              2. Advisory Disclaimer & Non-Coding Scope
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 font-normal">
              System Diagnostics, Execution Runbooks, and Deployment Gates are provided "as is" for diagnostic, strategic, and governance purposes only. BMR Solutions does not author, write, or deploy software code, nor does BMR perform direct system integration. Advisory deliverables do not constitute legal advice or formal regulatory compliance certifications. Client retains sole responsibility for authoring software code and implementing technical recommendations within Client production systems.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 uppercase tracking-tight">
              3. Governing Law & Venue
            </h2>
            <p className="max-w-3xl text-slate-700 font-normal">
              These Terms shall be governed by and construed in accordance with the laws of the <strong className="text-slate-950">Commonwealth of Virginia</strong>. Exclusive jurisdiction for any claim or dispute resides in the <strong className="text-slate-950 underline underline-offset-4 decoration-red-700">Circuit Court of Fairfax County, Virginia</strong>, or the U.S. District Court for the Eastern District of Virginia.
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-6 pt-8 border-t border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 uppercase tracking-tight">
              4. Contact & Inquiries
            </h2>
            <p className="text-slate-600 font-normal">
              Questions regarding these Terms or the authorized use of BMR intellectual property should be directed to:
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
