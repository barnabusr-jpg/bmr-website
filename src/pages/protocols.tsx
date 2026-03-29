"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { 
  Cpu, 
  Scale, 
  Target, 
  Zap, 
  ChevronRight,
  Lock,
  ShieldAlert
} from "lucide-react";

const PROTOCOLS = [
  {
    id: "01",
    title: "TECHNICAL LOGIC CHAINING",
    subtitle: "HARDENING PHASE",
    icon: <Cpu size={24} />,
    desc: "Verification of recursive loops and Logic Rot prevention. We stress-test model outputs against high-volatility datasets to ensure zero-drift performance.",
    metrics: ["BIT-RATE STABILITY", "RECURSIVE DECAY OFFSET", "STOCHASTIC PARITY"],
    status: "ACTIVE",
    reference: "REF: AUTOPSY-B03"
  },
  {
    id: "02",
    title: "ETHICAL COMPLIANCE GUARDRAILS",
    subtitle: "REGULATORY PHASE",
    icon: <Scale size={24} />,
    desc: "Alignment with evolving 2026 legal precedents. We implement hard-coded liability safeguards that prevent Chatbot Promises from becoming binding contracts.",
    metrics: ["LIABILITY NODE MAPPING", "PRECEDENT ALIGNMENT", "BIAS SHEAR REDUCTION"],
    status: "STANDBY",
    reference: "REF: AUTOPSY-B01"
  },
  {
    id: "03",
    title: "STRATEGIC MISSION ALIGNMENT",
    subtitle: "DEPLOYMENT PHASE",
    icon: <Target size={24} />,
    desc: "The final layer of the BMR filter. Ensuring AI outputs drive defined ROI and remain within the Safe-Operational-Envelope of the organization core mission.",
    metrics: ["ROI DRIFT DETECTION", "KPI SYNC RATE", "ARCHETYPE SYNCHRONIZATION"],
    status: "STANDBY",
    reference: "REF: AUTOPSY-B02"
  }
];

export default function ProtocolsPage() {
  const getThreatLevel = () => {
    if (typeof window === 'undefined') return "OSCILLATING";
    const hour = new Date().getHours();
    return (hour >= 18 || hour <= 4) ? "CRITICAL" : "ELEVATED";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head>
        <title>BMR | RECOVERY PROTOCOLS</title>
      </Head>
      <Header />
      
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-24">
          
          <section className="space-y-6 border-l-4 border-red-600 pl-8">
            <div className="flex items-center gap-4">
              <span className="text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">SYSTEM RECOVERY</span>
              <span className="text-slate-800">•</span>
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic font-bold">THREAT LEVEL: {getThreatLevel()}</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4">
              THE BMR <br />
              <span className="text-red-600 font-black">PROTOCOLS</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold leading-relaxed italic uppercase text-xs tracking-tight">
              A three-tiered verification layer designed to neutralize Logic Rot. These protocols are the only defense against systemic model collapse.
            </p>
          </section>

          <div className="grid gap-16 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-900 hidden lg:block" />

            {PROTOCOLS.map((proc, i) => (
              <motion.div 
                key={proc.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative lg:pl-24 space-y-8"
              >
                <div className="absolute left-0 top-0 w-16 h-16 bg-slate-950 border border-slate-800 flex items-center justify-center z-10 group-hover:border-red-600 transition-all hidden lg:flex shadow-2xl">
                  <span className="text-red-600 font-black font-mono text-xl italic">{proc.id}</span>
                </div>

                <div className="bg-slate-900/10 border border-slate-900 p-8 md:p-12 hover:border-red-600/30 transition-all shadow-2xl relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="space-y-1">
                      <span className="text-red-600 font-mono text-[10px] font-black tracking-widest uppercase italic">{proc.subtitle}</span>
                      <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">{proc.title}</h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold">{proc.reference}</span>
                      <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 border border-slate-800">
                        <div className={`w-1.5 h-1.5 rounded-full ${proc.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-slate-700'}`} />
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">{proc.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <p className="text-slate-400 text-sm font-medium italic leading-relaxed uppercase tracking-tight">
                      {proc.desc}
                    </p>

                    <div className="bg-black/40 p-8 border border-slate-800/50 space-y-6">
                      <h4 className="text-[10px] font-mono text-slate-500 font-black tracking-[0.3em] uppercase">VERIFICATION METRICS</h4>
                      <ul className="space-y-4">
                        {proc.metrics.map((metric) => (
                          <li key={metric} className="flex items-center gap-3 text-[11px] font-mono font-black italic text-slate-300 group-hover:text-red-600 transition-colors">
                            <ChevronRight size={14} className="text-red-600" />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-gradient-to-r from-slate-950 to-red-900/20 border-t-2 border-b-2 border-red-600/30 py-16 px-12 md:px-20 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center text-center lg:text-left">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <span className="text-red-500 font-mono text-[10px] font-black tracking-[0.5em] uppercase">
                    ACTIVE SECURITY ENVELOPE PROTOCOL 7
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
                  THE AUTOMATED <br /> RECOVERY ENGINE
                </h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed italic max-w-2xl border-l border-red-600/30 pl-6">
                  TECHNICAL RECOVERY PROTOCOLS REDACTED. BMR PROTOCOLS ARE HARD-CODED ALGORITHMIC FILTERS. FULL MITIGATION SPECS TIER-1 CLASSIFIED.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center lg:items-end gap-6">
                <div className="flex items-center gap-3 font-mono text-slate-500 text-[9px] uppercase tracking-widest italic font-bold">
                  <Lock size={12} className="text-red-600" />
                  AUTHENTICATION REQUIRED
                </div>
                <button 
                  onClick={() => window.location.href = '/pulse-check/assessment'}
                  className="bg-white text-black px-14 py-8 font-black uppercase text-[12px] tracking-[0.5em] hover:bg-red-600 hover:text-white transition-all shadow-2xl flex items-center gap-3 group"
                >
                  START AUDIT <Zap size={18} className="group-hover:animate-pulse" />
                </button>
              </div>
            </div>
          </section>

          <div className="pt-16 border-t border-slate-900 flex flex-col items-center text-center space-y-4 opacity-40">
            <ShieldAlert size={20} className="text-red-600" />
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.6em] max-w-lg italic font-bold text-center underline">
              WARNING UNAUTHORIZED DUPLICATION PROHIBITED.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
