"use client";

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Database, BarChart3, GitMerge, Zap } from "lucide-react";

const PHASES = [
  { id: "M-01", title: "DIVERGENCE DETECTION", icon: <Database size={20} />, desc: "WE BASELINE LOGIC AUTHORITY AGAINST OPERATIONAL OUTCOMES TO UNCOVER HIDDEN LOGIC ROT." },
  { id: "M-02", title: "THE REWORK TAX MATH", icon: <BarChart3 size={20} />, desc: "CALCULATING THE EXACT COST OF HUMAN INTERVENTION REQUIRED TO FIX FAILED AI OUTPUTS." },
  { id: "M-03", title: "STRUCTURAL RECOVERY", icon: <GitMerge size={20} />, desc: "IMPLEMENTING HARDENING LAYERS TO ENSURE ARCHETYPE SHEAR IS PHYSICALLY IMPOSSIBLE." }
];

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | FORENSIC METHODOLOGY</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-32">
          
          <section className="space-y-6 border-l-4 border-red-600 pl-8 text-left uppercase">
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4">
              THE MATH OF <br /><span className="text-red-600">RECOVERY</span>
            </h1>
          </section>

          <section className="bg-slate-900/10 border border-slate-900 p-12 md:p-20 relative overflow-hidden text-left">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-left">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter italic text-left uppercase italic underline">THE REWORK <br /> TAX EQUATION</h2>
                <div className="p-10 bg-black border border-red-600/20 rounded-sm shadow-2xl text-center">
                  <div className="text-2xl md:text-4xl font-mono font-black italic tracking-tighter text-white uppercase italic">
                    Tr = Σ (Ds × Ch) + Ωl
                  </div>
                </div>
              </div>
              <div className="bg-red-600/5 p-10 border border-red-600/20 text-left">
                <p className="text-slate-400 text-sm font-medium leading-relaxed uppercase tracking-tight text-left italic">
                  BMR TRACKS DIVERGENCE VELOCITY—HOW FAST YOUR AI IS LOSING CONTACT WITH REALITY—ALLOWING FOR RECOVERY BEFORE THE SYSTEM GOES TERMINAL.
                </p>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-8">
            {PHASES.map((phase, i) => (
              <motion.div key={phase.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group p-10 bg-slate-900/10 border border-slate-900 hover:border-red-600/50 transition-all text-left uppercase italic">
                <div className="space-y-6 text-left">
                  <div className="p-3 w-fit bg-red-600/5 border border-red-600/20">{phase.icon}</div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors text-left text-white leading-none">{phase.title}</h3>
                  <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed text-left italic">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-red-600 p-12 md:p-24 text-center space-y-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={300} /></div>
             <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white text-center">STOP GUESSING. <br /> START AUDITING.</h2>
             <button onClick={() => router.push('/pulse-check/assessment')} className="bg-black text-white px-16 py-8 font-black uppercase text-[12px] tracking-[0.6em] hover:bg-white hover:text-black transition-all shadow-2xl uppercase">RUN FORENSIC ANALYSIS</button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
