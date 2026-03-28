"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Zap, Activity } from "lucide-react";

export default function PromiseGapProblemPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <main className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
              The <span className="text-red-600">Promise Gap</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto italic leading-relaxed">
              Identifying the structural divergence between AI vision and operational execution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="p-8 border border-slate-900 bg-slate-900/20 backdrop-blur-sm space-y-4">
              <ShieldAlert className="text-red-600 h-6 w-6" />
              <h3 className="text-white font-black uppercase italic tracking-widest text-sm">Systemic Rot</h3>
              <p className="text-slate-500 text-xs leading-relaxed uppercase">
                When logic decays, trust is the first casualty. We isolate the points of 
                failure before they become systemic.
              </p>
            </div>
            <div className="p-8 border border-slate-900 bg-slate-900/20 backdrop-blur-sm space-y-4">
              <Activity className="text-red-600 h-6 w-6" />
              <h3 className="text-white font-black uppercase italic tracking-widest text-sm">Operational Drift</h3>
              <p className="text-slate-500 text-xs leading-relaxed uppercase">
                Continuous monitoring of decision-chains to detect subtle shifts in 
                algorithmic intent.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/promise-gap/diagnostic"
              className="inline-flex items-center justify-center h-16 px-10 text-lg font-black uppercase tracking-[0.2em] bg-red-600 text-white transition-all hover:bg-white hover:text-black shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
              Check for early signals <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
