import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Gavel, Zap } from "lucide-react";

const PromiseGapPage = () => {
  return (
    <div className="bg-[#020617] text-white">
      {/* Hero Section - Maintaining Sleek Visuals */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The <span className="inline-block bg-[#0D9488] text-white px-4 py-2 rounded-sm leading-none">
              Promise Gap™
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
            Where transformation falters not because technology fails,
            but because system behavior diverges from expectation. [cite: 104]
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white px-8 py-6 text-lg">
              <Link href="/diagnostic">
                Check for early signals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-slate-700 hover:bg-slate-800 px-8 py-6 text-lg text-white">
              <Link href="/insights">View the Field Guide overview</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Logic Section - Original Language, Balanced Layout */}
      <section className="py-20 px-6 bg-[#030712] border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 mb-12">
            <p className="text-2xl md:text-3xl font-medium text-slate-200 italic">Sales sell the future. [cite: 105]</p>
            <p className="text-2xl md:text-3xl font-medium text-slate-200 italic">Delivery inherits reality. [cite: 105]</p>
            <p className="text-2xl md:text-3xl font-medium text-[#0D9488] italic">And value quietly leaks in between. [cite: 105]</p>
          </div>
          <div className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            <p>
              Every organization pursuing transformation encounters this moment. [cite: 106]
              The breakdown is rarely technical. It occurs when expectations, accountability, 
              and context fragment after deployment. [cite: 107]
            </p>
          </div>
        </div>
      </section>

      {/* Why Transformation Drifts - Framing Insight */}
      <section className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Transformation Drifts</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-slate-300 text-lg">
              <p>
                Transformation does not fail because tools are flawed. It drifts when trust 
                erodes between what was promised and what is experienced. [cite: 112]
              </p>
              <p>
                Most initiatives begin with alignment and intent. Over time, communication thins, 
                accountability blurs, and confidence weakens. [cite: 113]
              </p>
            </div>
            <div className="space-y-6 text-slate-300 text-lg">
              <p>
                AI-related friction manifests differently across organizations, but the underlying issue is the same: 
                system behavior becomes unstable under pressure. [cite: 116, 117]
              </p>
              <p>
                Whether through urgency-driven shortcuts or volatility from shifting priorities, 
                AI underperforms quietly inside day-to-day work long before failure is visible. [cite: 118, 119]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust. Govern. Evolve. - The Bridge to Diagnostic */}
      <section className="py-20 px-6 bg-[#030712] border-t border-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-wider">Trust. Govern. Evolve. [cite: 125]</h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
            These terms describe recurring patterns observed as AI efforts mature. 
            They are lenses that help leaders understand where risk may be accumulating. [cite: 126, 127]
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
            <div className="p-8 bg-slate-900/50 rounded-xl border border-slate-800">
              <ShieldCheck className="h-10 w-10 text-[#0D9488] mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Trust [cite: 142]</h3>
              <p className="text-slate-400">Signals related to confidence, transparency, and lived experience. [cite: 142]</p>
            </div>
            <div className="p-8 bg-slate-900/50 rounded-xl border border-slate-800">
              <Gavel className="h-10 w-10 text-[#0D9488] mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Govern [cite: 143]</h3>
              <p className="text-slate-400">Signals related to clarity, accountability, and decision consistency. [cite: 143]</p>
            </div>
            <div className="p-8 bg-slate-900/50 rounded-xl border border-slate-800">
              <Zap className="h-10 w-10 text-[#0D9488] mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Evolve [cite: 144]</h3>
              <p className="text-slate-400">Signals related to adaptation, stability, and learning under change. [cite: 144]</p>
            </div>
          </div>

          <p className="text-slate-400 mb-8 italic">Meaningful understanding requires structured observation. [cite: 128]</p>
          <Button asChild className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white px-10 py-6 text-lg">
            <Link href="/diagnostic">Begin the diagnostic</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PromiseGapPage;
