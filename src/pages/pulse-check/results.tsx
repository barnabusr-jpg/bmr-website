"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Activity, Lock, RefreshCcw, Download, FileText, ChevronRight } from 'lucide-react';

type Archetype = 'Replacement Trap' | 'Hollow Chevron' | 'Shadow Shear' | 'Collective Delusion';

interface ResultData {
  archetype: Archetype;
  deltaGap: number;
  reworkTax: number;
  shadowAI: number;
  expertiseDebt: number;
  financialImpact: number;
  fractureVelocity: number;
}

export default function PulseCheckResults() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const rawData = sessionStorage.getItem('bmr_results_data');
    if (rawData) {
      try {
        setResult(JSON.parse(rawData));
      } catch {
        setError(true);
      }
    } else {
      const timeout = setTimeout(() => {
        const retryData = sessionStorage.getItem('bmr_results_data');
        if (retryData) {
          try {
            setResult(JSON.parse(retryData));
          } catch {
            setError(true);
          }
        } else {
          setError(true);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  if (error) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono text-red-600 uppercase tracking-[0.3em] gap-6 px-6 text-center">
      <AlertTriangle className="h-12 w-12" />
      <div className="space-y-2">
        <p className="font-black text-xl italic tracking-tighter">Forensic Integrity Failure</p>
        <p className="text-slate-600 text-[10px] font-bold">SESSION DATA CORRUPTED OR EXPIRED.</p>
      </div>
      <button onClick={() => window.location.href='/pulse-check/assessment'} className="bg-white text-black px-10 py-5 font-black text-[10px] tracking-[.4em] hover:bg-red-600 hover:text-white transition-all flex items-center gap-3">
        <RefreshCcw size={14} /> RE-INITIALIZE AUDIT
      </button>
    </div>
  );

  if (!result) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono text-red-600 uppercase tracking-widest gap-4">
      <Activity className="animate-pulse h-10 w-10 text-red-600" /> 
      <span className="animate-pulse italic font-black tracking-[0.5em] text-[10px]">GENERATING RISK DOSSIER...</span>
    </div>
  );

  const daysToCollapse = Math.round(Math.abs(10 / result.fractureVelocity) * 30);

  const roadmap: Record<Archetype, {title: string, desc: string}[]> = {
    "Replacement Trap": [
      { title: "LOGIC AUTHORITY AUDIT", desc: "Identify and isolate toxic data segments causing logic decay." },
      { title: "SHADOW NODE SHUTDOWN", desc: "Forced decommissioning of unsanctioned third-party LLM tools." }
    ],
    "Hollow Chevron": [
      { title: "RECURSIVE DRIFT DRILLS", desc: "Mandatory human-in-the-loop overrides for high-stakes decisioning." },
      { title: "EXPERTISE CAPTURE", desc: "Hard-coding senior institutional knowledge into the verification layer." }
    ],
    "Shadow Shear": [
      { title: "GOVERNANCE HARDENING", desc: "Implement BMR-7 protocol for all endpoint AI interactions." },
      { title: "DATA LEAKAGE SWEEP", desc: "Audit and patch outgoing data streams to public model interfaces." }
    ],
    "Collective Delusion": [
      { title: "PERCEPTION SYNC", desc: "Realignment of executive reporting vs. frontline operational reality." },
      { title: "STRESS-TEST INFERENCE", desc: "Testing system logic against high-volatility market scenarios." }
    ]
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | RISK PROFILE: {result.archetype}</title></Head>
      <Header />
      
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* --- TERMINAL HEADER --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-slate-900 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-red-600" size={16} />
                <span className="text-red-600 font-mono text-[10px] font-black tracking-[0.5em] uppercase">INTERNAL DIAGNOSTIC: COMPLETED</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none italic text-white">
                RISK <span className="text-red-600">VERDICT.</span>
              </h1>
            </div>
            <button className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-8 py-4 font-mono text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
              <Download size={14} /> DOWNLOAD DOSSIER
            </button>
          </div>

          {/* --- ARCHETYPE OUTPUT --- */}
          <section className="bg-slate-900/10 border-2 border-slate-900 p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <AlertTriangle size={240} />
            </div>

            <div className="space-y-12 relative z-10">
              <div className="space-y-4">
                <span className="text-slate-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase underline italic">IDENTIFIED SYSTEM ARCHETYPE</span>
                <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
                  {result.archetype}
                </h2>
                <div className="flex flex-wrap items-center gap-6 font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 pt-4">
                  <span className="flex items-center gap-2 italic"><Activity size={12} className="text-red-600" /> DECAY RATE: {result.fractureVelocity}/MO</span>
                  <span className="text-slate-800">•</span>
                  <span className="flex items-center gap-2 italic"><RefreshCcw size={12} className="text-red-600" /> COLLAPSE WINDOW: {daysToCollapse} DAYS</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 pt-12 border-t border-slate-900">
                <div className="space-y-8">
                   <div className="space-y-4">
                     <h4 className="text-[10px] font-mono text-slate-500 font-black tracking-widest uppercase">DIAGNOSTIC SUMMARY</h4>
                     <p className="text-slate-400 text-sm font-bold leading-relaxed italic uppercase tracking-tight">
                        SYSTEMIC LOGIC DIVERGENCE HAS REACHED CRITICAL LEVELS. THE CURRENT ARCHETYPE INDICATES A FAILURE IN RECURSIVE VALIDATION, TRIGGERING A COMPOUNDING FINANCIAL DRAIN.
                     </p>
                   </div>
                   <div className="space-y-3">
                     <div className="flex justify-between items-end px-1 font-mono text-[10px]">
                       <span className="text-slate-600 uppercase font-black">DIVERGENCE INDEX (Δ)</span>
                       <span className="text-red-600 font-black italic">{result.deltaGap.toFixed(1)}/10.0</span>
                     </div>
                     <div className="w-full bg-slate-950 h-3 border border-slate-800 p-0.5">
                       <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((result.deltaGap / 10) * 100, 100)}%` }} transition={{ duration: 2 }} className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                     </div>
                   </div>
                </div>

                <div className="bg-red-950/5 border border-red-600/20 p-8 space-y-8 relative shadow-inner">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FileText size={40} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] italic">ANNUAL REWORK TAX (EST)</span>
                    <div className="text-6xl md:text-7xl font-black text-white tracking-tighter italic">
                      ${result.financialImpact.toFixed(1)}<span className="text-red-600">M</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-red-600/10">
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono font-bold text-slate-600 uppercase tracking-widest">DEBT LOAD</span>
                      <div className="text-sm font-black text-white italic">${result.reworkTax.toFixed(1)}M</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono font-bold text-slate-600 uppercase tracking-widest">SHADOW AI</span>
                      <div className="text-sm font-black text-white italic">${result.shadowAI.toFixed(1)}M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- PHASE 01 ROADMAP --- */}
          <div className="space-y-10 pt-12">
            <h3 className="text-[11px] font-mono text-slate-500 font-black tracking-[0.4em] uppercase text-center italic">REQUIRED REMEDIATION: PHASE 01</h3>
            <div className="grid md:grid-cols-2 gap-4">
               {roadmap[result.archetype]?.map((step, i) => (
                 <div key={i} className="bg-slate-900/20 border border-slate-900 p-8 flex gap-6 items-start hover:border-red-600/50 transition-all group">
                    <span className="text-red-600 font-mono text-xl font-black italic">0{i+1}</span>
                    <div className="space-y-2">
                       <h5 className="text-xs font-black uppercase text-white tracking-widest italic">{step.title}</h5>
                       <p className="text-slate-500 text-[11px] font-medium leading-relaxed uppercase tracking-tight italic">{step.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* --- CTA SECTION --- */}
          <div className="grid md:grid-cols-2 gap-4 pt-12">
             <button disabled className="bg-slate-900 text-slate-700 p-10 flex flex-col items-center justify-center cursor-not-allowed border border-slate-800 opacity-50">
                <Lock className="h-5 w-5 mb-3" />
                <span className="font-black text-[10px] tracking-[0.4em] uppercase">FULL AUDIT: RESTRICTED</span>
             </button>
             <button 
                onClick={() => window.open('https://calendly.com/bmr-solutions/triage', '_blank')}
                className="bg-red-600 text-white p-10 flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all shadow-2xl shadow-red-600/10 group"
             >
                <ShieldAlert className="h-6 w-6 mb-3 group-hover:animate-pulse" />
                <span className="font-black text-[11px] tracking-[0.5em] uppercase italic">INITIATE EMERGENCY TRIAGE</span>
             </button>
          </div>

          <footer className="pt-24 flex flex-col items-center gap-4 opacity-10 text-center">
            <Activity className="text-red-600 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.6em] uppercase text-slate-500 italic">SESSION TERMINATED // AUTHORIZED EYES ONLY</span>
          </footer>

        </div>
      </main>
      <Footer />
    </div>
  );
}
