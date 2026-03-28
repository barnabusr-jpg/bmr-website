"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Activity, AlertTriangle, Fingerprint } from "lucide-react";
import { useInView } from "react-intersection-observer";

/**
 * BMR FORENSIC UNIT: PROMISE GAP ANALYSIS
 * Hardened version with Intersection Observer and Type-Safe Problem Cards.
 */

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  severity: "CRITICAL" | "WARNING" | "NORMAL";
}

function ProblemCard({ icon, title, description, severity }: ProblemCardProps) {
  const severityStyles = {
    CRITICAL: "border-red-600/50 bg-red-600/5 shadow-[0_0_15px_rgba(220,38,38,0.1)]",
    WARNING: "border-orange-600/50 bg-orange-600/5",
    NORMAL: "border-slate-800 bg-slate-900/20"
  };

  return (
    <div className={`p-8 border-2 rounded-none transition-all duration-500 group ${severityStyles[severity]}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-red-600 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase italic">
          STATUS_{severity}
        </span>
      </div>
      <h3 className="text-white font-black uppercase italic tracking-tighter text-xl mb-4">{title}</h3>
      <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-wider">{description}</p>
    </div>
  );
}

export default function PromiseGapProblemPage() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });

  useEffect(() => {
    if (inView) {
      controls.start({ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [inView, controls]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-red-600/30 overflow-hidden relative">
      {/* Forensic Security Watermark */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center select-none">
        <span className="text-[18vw] font-black uppercase -rotate-12 tracking-tighter">CLASSIFIED_AUDIT</span>
      </div>

      <main ref={ref} className="container mx-auto max-w-6xl pt-32 pb-24 px-6 relative z-10">
        
        {/* Forensic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="text-center mb-24 space-y-6"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <Fingerprint className="text-red-600 h-8 w-8 opacity-50" />
            <div className="h-[1px] w-16 bg-red-600/30" />
            <span className="text-[10px] font-black tracking-[0.6em] text-red-600 uppercase">SIGNAL_STRENGTH_MAX</span>
            <div className="h-[1px] w-16 bg-red-600/30" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            The <span className="text-slate-800">Promise</span> <br />
            <span className="text-red-600 underline decoration-red-600/20 underline-offset-12">Gap Problem</span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-500 text-lg italic leading-relaxed pt-8 uppercase tracking-wide">
            Identifying the structural divergence between AI intent and execution. 
            We isolate the drift before architectural collapse becomes inevitable.
          </p>
        </motion.div>

        {/* Tactical Audit Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <ProblemCard 
            icon={<ShieldAlert size={24} />}
            title="Logic Decay"
            severity="CRITICAL"
            description="Probabilistic drift in decision chains leading to high-stakes operational decoupling."
          />
          <ProblemCard 
            icon={<AlertTriangle size={24} />}
            title="Trust Erosion"
            severity="WARNING"
            description="Loss of institutional confidence when AI-enabled outputs deviate from human intent."
          />
          <ProblemCard 
            icon={<Activity size={24} />}
            title="Value Leakage"
            severity="NORMAL"
            description="Unobserved financial loss as systemic inefficiencies compound across the architecture."
          />
        </div>

        {/* Call To Action: Diagnostic Initiation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-16 border-2 border-red-600/20 bg-red-600/[0.02] text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
            <ShieldAlert size={150} className="text-red-600" />
          </div>

          <h2 className="text-4xl font-black text-white mb-8 uppercase italic tracking-tighter relative z-10">
            Identify the <span className="text-red-600">Early Signals</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
            <Link
              href="/promise-gap/diagnostic"
              className="group inline-flex items-center justify-center h-16 px-12 text-[11px] font-black uppercase tracking-[0.4em] bg-red-600 text-white transition-all hover:bg-white hover:text-black shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              Initialize Diagnostic
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>

            <Link 
              href="/contact"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors"
            >
              Request Full Audit Protocol
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
