"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Header />
      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="mb-12">
          <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block italic">
            // Legal_Framework_Node
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic uppercase tracking-tighter leading-none">
            Privacy_<span className="text-red-600">Protocols</span>
          </h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] font-mono font-bold">
            Effective: February 2026 | Fairfax County, VA
          </p>
        </section>
        
        <div className="space-y-12 text-slate-400 border-t border-slate-900 pt-16 font-mono text-[11px] uppercase tracking-widest leading-relaxed">
          
          {/* Section 1: Data Controller */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white italic tracking-tight">1. Data Controller Notice</h2>
            <p className="max-w-3xl">
              BMR Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) acts as a Data Controller under the 
              <strong className="text-white"> Virginia Consumer Data Protection Act (VCDPA)</strong>. We collect professional identity 
              data and systemic signals to identify logic-shear across forensic lenses: 
              <span className="text-red-600 italic"> Trust (HAI)</span>, 
              <span className="text-red-600 italic"> Govern (AVS)</span>, and 
              <span className="text-red-600 italic"> Evolve (IGF)</span>.
            </p>
          </section>

          {/* Section 2: Commitment */}
          <section className="p-10 bg-slate-950 border border-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
            <h2 className="text-xl font-black text-red-600 mb-6 italic tracking-tight uppercase">The Non-Disclosure Commitment</h2>
            <p className="text-slate-300 leading-loose">
              BMR Solutions <strong className="text-white underline underline-offset-4 decoration-red-600">does not sell, rent, or trade</strong> your personal 
              or organizational signal data to third parties. Forensic data is handled with the same 
              rigor as proprietary technical assets.
            </p>
          </section>

          {/* Section 3: Virginia Rights */}
          <section className="space-y-6">
            <h2 className="text-xl font-black text-white italic tracking-tight">2. Your Rights Under Virginia Law</h2>
            <p>As a resident of the Commonwealth of Virginia, you maintain following authorities regarding your data nodes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {['Right to Access', 'Right to Correct', 'Right to Delete', 'Right to Portability'].map((right) => (
                <div key={right} className="flex items-center gap-4 p-5 border border-slate-900 bg-slate-950/50">
                  <div className="h-2 w-2 bg-red-600 animate-pulse"></div>
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white italic">{right}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Contact */}
          <section className="space-y-8">
            <h2 className="text-xl font-black text-white italic tracking-tight">3. Contact for Forensic Data</h2>
            <p>
              To exercise your rights under the VCDPA or to request a full audit of the data we hold, 
              please contact our clinical privacy desk:
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
