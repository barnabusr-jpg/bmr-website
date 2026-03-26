"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ShieldAlert, Activity } from "lucide-react"; // REMOVED: ChevronRight to fix lint error
import { Card } from "@/components/ui/card";
import Link from "next/link";

const HeroHome = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center py-24 px-6 overflow-hidden bg-slate-950">
      {/* Forensic Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/grid.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Forensic Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-red-600" />
                <p className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase italic">
                  BMR Forensics // Structural Audit
                </p>
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] text-white tracking-tighter italic uppercase">
                Strategy is <span className="text-slate-800">Luxury.</span>
                <span className="text-red-600 block mt-2">Recovery is Duty.</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed italic">
              We identify the &quot;Log Rot&quot; and systemic drift in AI deployments. 
              BMR provides the forensic tools to harden logic chains before 
              architectural collapse becomes inevitable.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/pulse-check"
                className="group bg-red-600 hover:bg-white text-white hover:text-red-600 font-black h-16 px-10 uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 transition-all duration-500 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
              >
                <Activity className="h-4 w-4 group-hover:animate-pulse" />
                Initialize Diagnostic
              </Link>

              <Link 
                href="/services"
                className="border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 h-16 px-10 font-black uppercase tracking-[0.2em] text-[10px] flex items-center transition-all"
              >
                View Protocols
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-slate-900">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-red-900 shrink-0" />
                <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest leading-tight">
                  Detect operational divergence <br /> in real-time logic.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-red-900 shrink-0" />
                <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest leading-tight">
                  Observe behavioral decay <br /> under high-stakes load.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: The Forensic Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-12 border-2 shadow-2xl bg-slate-900/10 backdrop-blur-sm border-slate-900 rounded-none relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-red-600 transition-all duration-700" />
              
              <h3 className="text-3xl font-black mb-10 text-white tracking-tighter italic uppercase relative z-10">
                Why Systems <span className="text-red-600">Quietly Drift</span>
              </h3>

              <div className="space-y-8 relative z-10">
                <p className="text-slate-300 leading-relaxed text-lg font-bold italic">
                  AI failure is rarely a binary event.
                </p>
                <p className="text-slate-500 leading-relaxed font-medium text-lg italic border-l border-slate-800 pl-6">
                  It is a slow, structural divergence where AI-enabled logic decays 
                  under operating conditions leaders cannot see.
                </p>
                <p className="text-slate-500 leading-relaxed font-medium text-lg italic">
                  When human intent and machine execution decouple at scale, 
                  you don&apos;t have an &quot;optimization&quot; problem. 
                  You have <span className="text-red-600 font-black">Systemic Rot.</span>
                </p>
              </div>
            </Card>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
