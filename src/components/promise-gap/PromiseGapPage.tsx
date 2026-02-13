import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PromiseGapPage = () => {
  return (
    <div className="bg-[#020617] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight italic uppercase">
            The <span className="inline-block bg-[#14b8a6] text-[#020617] px-4 py-2 rounded-sm leading-none">
              Promise Gap™
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
            Where transformation falters not because technology fails, but because system 
            behavior diverges from expectation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* UPDATED ROUTE: Points to the new diagnostic path */}
            <Button asChild className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] px-8 py-6 text-lg font-bold uppercase tracking-widest">
              <Link href="/promise-gap/diagnostic">
                Check for early signals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-slate-700 hover:bg-slate-800 px-8 py-6 text-lg text-white uppercase tracking-widest">
              <Link href="/insights">View the Field Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Logic Section - Standardized Fonts */}
      <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 mb-16">
            <p className="text-3xl md:text-4xl font-extralight text-slate-200 tracking-tight italic">Sales sell the future.</p>
            <p className="text-3xl md:text-4xl font-extralight text-slate-200 tracking-tight italic">Delivery inherits reality.</p>
            <p className="text-3xl md:text-4xl font-medium text-[#14b8a6] tracking-tight italic">And value quietly leaks in between.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8 text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            <p>Every organization pursuing transformation encounters this moment.</p>
            <p>
              The breakdown is rarely technical. It occurs when expectations, accountability, 
              and context fragment after deployment.
            </p>
            <p>
              Organizations that close this gap strengthen the connection between people, 
              processes, and purpose as systems scale.
            </p>
          </div>
        </div>
      </section>

      {/* Why Transformation Drifts - Refined Balance */}
      <section className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center tracking-tight italic uppercase">Why Transformation Drifts</h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Narrative Column */}
            <div className="space-y-8 text-slate-300 text-lg md:text-xl font-light leading-relaxed">
              <p>
                Transformation does not fail because tools are flawed. It drifts when trust 
                erodes between what was promised and what is experienced.
              </p>
              <p>
                Most initiatives begin with alignment and intent. Over time, communication thins, 
                accountability blurs, and confidence weakens.
              </p>
            </div>
            {/* Insight Card: Uses the new Forensic Sidebar Style */}
            <div className="bg-slate-900/30 p-10 border-slate-800 border-2 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
               <div className="space-y-6">
                <h3 className="text-[#14b8a6] font-bold uppercase tracking-widest text-xs">System Friction Patterns</h3>
                <p className="text-white text-lg font-normal leading-snug italic uppercase">
                  AI-enabled system behavior becomes unstable under pressure.
                </p>
                <p className="text-slate-400 text-base font-light leading-relaxed">
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
