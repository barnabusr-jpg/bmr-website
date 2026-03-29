"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { AlertTriangle, Zap, ShieldAlert, Activity, Lock } from 'lucide-react';

// Unified type to match API response
type Archetype = 'Replacement Trap' | 'Hollow Chevron' | 'Shadow Shear' | 'Collective Delusion';

interface ResultData {
  archetype: Archetype;
  deltaGap: number;
  reworkTax: number;
  shadowAI: number;
  expertiseDebt: number;
  financialImpact: number;
  fractureVelocity: number;
  perspective: string;
}

export default function PulseCheckResults() {
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('bmr_results');
    if (data) {
      try {
        setResult(JSON.parse(data));
      } catch (e) {
        console.error("Forensic Data Corruption", e);
      }
    }
  }, []);

  if (!result) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-red-600 uppercase tracking-widest gap-4">
      <Activity className="animate-pulse h-8 w-8" /> 
      <span className="animate-pulse">Analyzing Forensic Data...</span>
    </div>
  );

  const daysToCollapse = Math.round(Math.abs(10 / result.fractureVelocity) * 30);

  // Roadmap keys now match API string literals exactly
  const roadmap: Record<Archetype, {title: string, desc: string}[]> = {
    "Replacement Trap": [
      { title: "Audit Training Data", desc: "Identify toxic data increasing Rework Tax." },
      { title: "Block Unsanctioned Tools", desc: "Eliminate Shadow AI compliance risks." }
    ],
    "Hollow Chevron": [
      { title: "Manual Task Drills", desc: "Ensure staff can perform tasks without AI." },
      { title: "Log Overrides", desc: "Track when humans override AI decisions." }
    ],
    "Shadow Shear": [
      { title: "Enforce Governance", desc: "Bring all AI tools under compliance." },
      { title: "Audit Data Leakage", desc: "Secure data being input into unsanctioned tools." }
    ],
    "Collective Delusion": [
      { title: "Friction Reviews", desc: "Align executive and frontline perceptions." },
      { title: "Stress-Test Outputs", desc: "Identify fragility under high-volume." }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | Verdict: {result.archetype}</title></Head>
      <Header />
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center py-20 border border-red-900/10 bg-slate-900/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
            <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-8 animate-pulse" />
            
            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
              {result.archetype}
            </h1>

            <div className="max-w-xl mx-auto px-6 space-y-10">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-slate-500 font-mono text-[9px] uppercase tracking-[0.3em] border-y border-slate-900 py-6">
                <span>Decay Rate: <span className="text-red-600 font-black">{result.fractureVelocity}/mo</span></span>
                <span className="hidden md:inline text-slate-800">|</span>
                <span>Est. Collapse: <span className="text-red-600 font-black">{daysToCollapse} Days</span></span>
              </div>

              {/* DIVERGENCE METER */}
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Divergence (Δ)</span>
                  <span className="text-4xl font-black italic text-red-600 tracking-tighter">{result.deltaGap.toFixed(1)}</span>
                </div>
                <div className="w-full bg-slate-950 h-3 border border-slate-900 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${Math.min((result.deltaGap / 10) * 100, 100)}%` }} 
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-slate-900 via-red-900 to-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]" 
                  />
                </div>
              </div>

              {/* PROFIT HEMORRHAGE - THE VERDICT */}
              <div className="bg-red-950/10 border border-red-900/30 p-10 relative group">
                <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-red-600"></div>
                <div className="text-[10px] font-black text-red-600 uppercase mb-4 tracking-[0.5em] italic">Annual Profit Hemorrhage</div>
                <div className="text-6xl md:text-7xl font-black text-white tracking-tighter">
                  ${result.financialImpact.toFixed(2)}<span className="text-red-600">M</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-red-900/20 text-[9px] font-mono uppercase tracking-widest text-slate-500">
                  <div className="text-left">Rework Tax: <span className="text-white">${result.reworkTax.toFixed(1)}M</span></div>
                  <div className="text-right">Shadow AI: <span className="text-white">${result.shadowAI.toFixed(1)}M</span></div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2 mt-16 px-6">
              <button disabled className="bg-slate-900 text-slate-700 p-8 flex flex-col items-center cursor-not-allowed border border-slate-800 relative group">
                <Lock className="h-4 w-4 mb-2 opacity-20" />
                <span className="font-black text-[9px] tracking-[0.4em] uppercase">Audit: Unauthorized</span>
                <span className="text-[8px] mt-2 italic opacity-40">Requires Active Triage Key</span>
              </button>
              
              <button 
                onClick={() => window.open('https://calendly.com/bmr-solutions/triage', '_blank')} 
                className="bg-red-600 text-white p-8 flex flex-col items-center hover:bg-white hover:text-black transition-all border border-red-600"
              >
                <ShieldAlert className="h-5 w-5 mb-2" />
                <span className="font-black text-[10px] tracking-[0.4em] uppercase italic">Book Emergency Triage</span>
              </button>
            </div>
          </div>

          <div className="border border-slate-900 p-10 bg-slate-950/50">
            <h2 className="text-sm font-black uppercase italic mb-10 text-slate-500 tracking-[0.3em]">Hardening Roadmap: Phase 01</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {roadmap[result.archetype]?.map((step, i) => (
                <div key={i} className="flex gap-6 text-left border-l border-red-900/30 pl-6 py-2">
                  <div className="text-red-600 font-black font-mono italic text-xl">0{i+1}</div>
                  <div>
                    <div className="font-black uppercase text-xs tracking-widest text-white italic mb-2">{step.title}</div>
                    <div className="text-slate-500 text-xs italic leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
