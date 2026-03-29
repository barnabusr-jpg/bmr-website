"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { BarChart3, Binary, GitMerge, ShieldAlert, Zap, Database } from "lucide-react";

const PHASES = [
  { id: "M-01", title: "DIVERGENCE DETECTION", tag: "IDENTIFY", desc: "Baseline Logic Authority against operational outcomes. Phase 01 uncovers hidden Logic Rot before system failure.", icon: <Database size={20} className="text-red-600" /> },
  { id: "M-02", title: "THE REWORK TAX MATH", tag: "QUANTIFY", desc: "Using the 2026 Shear-Rate formula, we calculate the exact cost of human intervention required to fix failed AI outputs.", icon: <BarChart3 size={20} className="text-red-600" /> },
  { id: "M-03", title: "STRUCTURAL RECOVERY", tag: "NEUTRALIZE", desc: "Implementation of BMR Hardening Layers. We recode the data-model interaction to ensure Archetype Shear is impossible.", icon: <GitMerge size={20} className="text-red-600" /> }
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | FORENSIC METHODOLOGY</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-32">
          <section className="space-y-6 border-l-4 border-red-600 pl-8 text-left">
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4 text-left font-black text-white italic">
              THE MATH OF <br /><span className="text-red-600">RECOVERY</span>
            </h1>
          </section>

          <section className="bg-slate-900/10 border border-slate-900 p-12 md:p-20 relative overflow-hidden text-left">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-left">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter italic text-left">THE REWORK <br /> TAX EQUATION</h2>
                <div className="p-8 bg-black border border-red-600/20 rounded-sm shadow-2xl text-center">
                  <div className="text-2xl md:text-4xl font-mono font-black italic tracking-tighter text-white uppercase">
                    Tr = Σ (Ds × Ch) + Ωl
                  </div>
                </div>
              </div>
              <div className="space-y-6 bg-slate-900/40 p-10 border border-slate-800 text-left">
                <div className="flex items-center gap-3 text-left font-mono">
                    <Binary className="text-red-600" size={18} />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">LOGIC ARCHITECTURE</span>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed uppercase tracking-tight text-left italic">
                  BMR tracks Divergence Velocity—how fast your AI is losing contact with reality.
                </p>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-8">
            {PHASES.map((phase, i) => (
              <motion.div key={phase.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 bg-slate-900/10 border border-slate-900 hover:border-red-600/50 transition-all text-left">
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-red-600/5 border border-red-600/20">{phase.icon}</div>
                    <span className="text-red-600 font-mono text-[10px] font-black tracking-widest uppercase italic">{phase.id}</span>
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors text-left text-white leading-none">{phase.title}</h3>
                  <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed italic text-left italic">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-red-600 p-12 md:p-24 text-center space-y-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={300} /></div>
             <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white text-center">STOP GUESSING. <br /> START AUDITING.</h2>
             <button onClick={() => { window.location.href = '/pulse-check/assessment'; }} className="bg-black text-white px-16 py-8 font-black uppercase text-[12px] tracking-[0.6em] hover:bg-white hover:text-black transition-all shadow-2xl uppercase">RUN FORENSIC ANALYSIS</button>
          </section>

          <div className="pt-16 border-t border-slate-900 flex flex-col items-center text-center space-y-4 opacity-30">
            <ShieldAlert size={20} className="text-red-600" />
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.6em] max-w-lg italic font-bold text-center underline">CLASSIFIED DATA NODE-SEC-04</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
