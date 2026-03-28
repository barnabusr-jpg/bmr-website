"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BarChart3, Fingerprint } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "CRITICAL" | "ANALYZING" | "STABLE";
}

function ProblemCard({ icon, title, description, status }: ProblemCardProps) {
  const statusStyles = {
    CRITICAL: "border-red-600/50 bg-red-600/5 shadow-[0_0_15px_rgba(220,38,38,0.1)]",
    ANALYZING: "border-teal-600/50 bg-teal-600/5",
    STABLE: "border-slate-800 bg-slate-900/20"
  };

  return (
    <div className={`p-8 border-2 rounded-none transition-all duration-500 group ${statusStyles[status]}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-teal-500 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase italic">
          SYS_{status}
        </span>
      </div>
      <h3 className="text-white font-black uppercase tracking-tighter text-xl mb-4">{title}</h3>
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
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30 overflow-hidden relative">
      {/* BMR Solutions Branding Watermark */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center select-none">
        <span className="text-[15vw] font-black uppercase -rotate-12 tracking-tighter">BMR_SOLUTIONS</span>
      </div>

      <main ref={ref} className="container mx-auto max-w-6xl pt-32 pb-24 px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="text-center mb-24 space-y-6"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <Fingerprint className="text-teal-500 h-8 w-8 opacity-50" />
            <div className="h-[1px] w-16 bg-teal-500/30" />
            <span className="text-[10px] font-black tracking-[0.6em] text-teal-500 uppercase">BMR_STRATEGY_CORE</span>
            <div className="h-[1px] w-16 bg-teal-500/30" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            The <span className="text-slate-800">Promise</span> <br />
            <span className="text-teal-500">Gap Strategy</span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-500 text-lg italic leading-relaxed pt-8 uppercase tracking-wide">
            Bridging the divide between institutional vision and algorithmic delivery. 
            We implement high-integrity solutions to stabilize your AI architecture.
          </p>
        </motion.div>

        {/* Tactical Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <ProblemCard 
            icon={<ShieldCheck size={24} />}
            title="Integrity Shield"
            status="STABLE"
            description="Hardening decision chains against probabilistic drift and logic decay."
          />
          <ProblemCard 
            icon={<Zap size={24} />}
            title="Rapid Triage"
            status="ANALYZING"
            description="Immediate isolation of friction points between human intent and machine execution."
          />
          <ProblemCard 
            icon={<BarChart3 size={24} />}
            title="Value Recovery"
            status="CRITICAL"
            description="Reclaiming lost financial yield by optimizing decoupled system performance."
          />
        </div>

        {/* CTA: Solution Audit */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-16 border-2 border-teal-600/20 bg-teal-600/[0.02] text-center relative overflow-hidden group"
        >
          <h2 className="text-4xl font-black text-white mb-8 uppercase italic tracking-tighter relative z-10">
            Initialize <span className="text-teal-500">Solution Audit</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
            <Link
              href="/promise-gap/diagnostic"
              className="group inline-flex items-center justify-center h-16 px-12 text-[11px] font-black uppercase tracking-[0.4em] bg-teal-600 text-slate-950 transition-all hover:bg-white hover:text-black shadow-[0_0_40px_rgba(20,184,166,0.3)]"
            >
              Start Diagnostic
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>

            <Link 
              href="/contact"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors"
            >
              Request Operational Support
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
