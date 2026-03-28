"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";

const PromiseGapPage = () => {
  return (
    <div className="bg-[#020617] text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter italic uppercase">
            The <span className="inline-block bg-[#14b8a6] text-[#020617] px-4 py-2 rounded-none leading-none">
              Promise Gap™
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto mb-10 leading-relaxed italic">
            Where transformation falters not because technology fails, but because system 
            behavior diverges from expectation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* PRIMARY ACTION: Styled Link Bypass */}
            <Link 
              href="/promise-gap/diagnostic"
              className="inline-flex items-center justify-center h-16 px-10 text-[11px] font-black uppercase tracking-[0.4em] bg-[#14b8a6] text-[#020617] transition-all hover:bg-white hover:text-black shadow-[0_0_30px_rgba(20,184,166,0.2)]"
            >
              Check for early signals <ArrowRight className="ml-3 h-4 w-4" />
            </Link>

            {/* SECONDARY ACTION: Styled Link Bypass */}
            <Link 
              href="/insights"
              className="inline-flex items-center justify-center h-16 px-10 text-[11px] font-black uppercase tracking-[0.4em] border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
              View the Field Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Core Logic Section */}
      <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 mb-16">
            <p className="text-3xl md:text-4xl font-black text-slate-200 tracking-tighter italic uppercase">Sales sell the future.</p>
            <p className="text-3xl md:text-4xl font-black text-slate-200 tracking-tighter italic uppercase">Delivery inherits reality.</p>
            <p className="text-3xl md:text-4xl font-black text-[#14b8a6] tracking-tighter italic uppercase underline decoration-[#14b8a6]/20 underline-offset-8">And value quietly leaks in between.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8 text-slate-500 text-lg md:text-xl font-light leading-relaxed uppercase tracking-wide">
            <p>Every organization pursuing transformation encounters this moment.</p>
            <p>
              The breakdown is rarely technical. It occurs when expectations, accountability, 
              and context fragment after deployment.
            </p>
            <p>
              Organizations that close this gap strengthen the connection between people, 
              prio-processes, and purpose as systems scale.
            </p>
          </div>
        </div>
      </section>

      {/* Why Transformation Drifts */}
      <section className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-16 text-center tracking-tighter italic uppercase">Why Transformation Drifts</h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 text-slate-400 text-lg md:text-xl font-light leading-relaxed uppercase tracking-wider italic">
              <p>
                Transformation does not fail because tools are flawed. It drifts when trust 
                erodes between what was promised and what is experienced.
              </p>
              <p>
                Most initiatives begin with alignment and intent. Over time, communication thins, 
                accountability blurs, and confidence weakens.
              </p>
            </div>
            
            <div className="bg-slate-900/20 p-10 border-slate-900 border-2 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6] group-hover:w-full transition-all duration-700 opacity-20"></div>
               <div className="relative z-10 space-y-6">
                <h3 className="text-[#14b8a6] font-black uppercase tracking-[0.4em] text-[10px] italic">System Friction Patterns</h3>
                <p className="text-white text-xl font-black leading-snug italic uppercase tracking-tighter">
                  AI-enabled system behavior becomes unstable under pressure.
                </p>
                <p className="text-slate-500 text-sm font-light leading-relaxed uppercase tracking-widest">
                  Whether through urgency-driven shortcuts or volatility from shifting priorities, 
                  AI underperforms quietly inside day-to-day work long before failure is visible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromiseGapPage;
