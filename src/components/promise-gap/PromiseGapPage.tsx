import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, ShieldAlert, BarChart3 } from "lucide-react";

const PromiseGapPage = () => {
  return (
    <div className="bg-[#020617] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-relaxed">
  The <span className="inline-block bg-[#0D9488] text-white px-4 py-2 rounded-sm leading-none">
    Promise Gap™
  </span>
</h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
            Where transformation falters not because technology fails, but because system 
            behavior diverges from expectation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white px-8 py-6 text-lg">
              <Link href="/diagnostic">
                Check for early signals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-slate-700 hover:bg-slate-800 px-8 py-6 text-lg">
              <Link href="/insights">View the Field Guide overview</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Transformation Drifts Section */}
      <section className="py-20 px-6 bg-[#030712]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Transformation Drifts</h2>
          <div className="space-y-6 text-lg text-slate-300">
            <p>
              Transformation does not fail because tools are flawed. It drifts when trust erodes 
              between what was promised and what is actually delivered. 
            </p>
            <div className="grid md:grid-cols-3 gap-8 py-10">
              <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                <ShieldAlert className="h-10 w-10 text-[#0D9488] mb-4" />
                <h3 className="font-bold mb-2">Sales sell the future.</h3>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                <Target className="h-10 w-10 text-[#0D9488] mb-4" />
                <h3 className="font-bold mb-2">Delivery inherits reality.</h3>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                <BarChart3 className="h-10 w-10 text-[#0D9488] mb-4" />
                <h3 className="font-bold mb-2">Value quietly leaks in between.</h3>
              </div>
            </div>
            <p className="italic text-center text-slate-400">
              Every organization pursuing transformation encounters this moment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromiseGapPage;
