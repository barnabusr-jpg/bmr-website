"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Header />
      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="mb-12 text-center md:text-left">
          <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block italic">
            // Governing_Agreement_Node
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic uppercase tracking-tighter leading-none">
            Terms_Of_<span className="text-red-600">Service</span>
          </h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] font-mono font-bold">
            Jurisdiction: Fairfax County, VA
          </p>
        </section>

        <div className="space-y-12 text-slate-400 border-t border-slate-900 pt-16 font-mono text-[11px] uppercase tracking-widest leading-relaxed">
          
          {/* Section 1: IP & Trade Secrets */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white italic tracking-tight">1. Intellectual Property & Trade Secrets</h2>
            <p className="font-black text-red-600 italic text-[10px] tracking-[0.2em]">Notice under the Virginia Uniform Trade Secrets Act:</p>
            <p className="leading-loose border-l-2 border-slate-800 pl-6">
              THE BMR PROTOCOL, INCLUDING THE 12 DIAGNOSTIC SIGNALS, THE PROMISE GAP™ FRAMEWORK, AND THE HAI FIELD GUIDE, ARE THE EXCLUSIVE INTELLECTUAL PROPERTY OF BMR SOLUTIONS. UNAUTHORIZED USE, REVERSE-ENGINEERING, OR REDISTRIBUTION IS STRICTLY PROHIBITED.
            </p>
          </section>

          {/* Section 2: Advisory Disclaimer */}
          <section className="p-10 border border-slate-900 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wide italic leading-tight">2. Advisory Disclaimer</h2>
            <p className="text-[10px] leading-relaxed text-slate-500">
              THE SYSTEM DIAGNOSTIC AND FIELD GUIDE ARE PROVIDED &ldquo;AS IS.&rdquo; BMR SOLUTIONS DOES NOT GUARANTEE SPECIFIC FINANCIAL OR MISSION OUTCOMES. ADVISORY SERVICES DO NOT CONSTITUTE LEGAL OR TECHNICAL COMPLIANCE CERTIFICATIONS.
            </p>
          </section>

          {/* Section 3: Governing Law */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white italic tracking-tight">3. Governing Law & Venue (Fairfax County)</h2>
            <p className="max-w-3xl">
              These Terms are governed by the laws of the <strong className="text-white">Commonwealth of Virginia</strong>. You expressly agree that exclusive jurisdiction for any dispute resides in the <strong className="text-white underline underline-offset-4 decoration-red-600">Circuit Court of Fairfax County, Virginia</strong>, or the U.S. District Court for the Eastern District of Virginia (Alexandria Division).
            </p>
          </section>

          {/* Section 4: Contact */}
          <section className="space-y-8">
            <h2 className="text-xl font-black text-white italic tracking-tight">4. Contact & Inquiries</h2>
            <p>
              Questions regarding these Terms or the authorized use of BMR intellectual property should be directed to our legal desk:
            </p>
            <a 
              href="mailto:hello@bmradvisory.co" 
              className="inline-flex items-center gap-3 text-white font-black hover:bg-white hover:text-black transition-all border border-red-600 bg-red-600/5 px-8 py-5"
            >
              HELLO@BMRADVISORY.CO
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
