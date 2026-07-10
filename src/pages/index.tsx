"use client";
import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Activity, Target, Shield, LayoutGrid, Layers, Cpu, Milestone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black relative flex flex-col">
      <Header />
      
      {/* --- HERO / HOOK SECTION --- */}
      <main className="flex-grow pt-44 pb-16 px-6 max-w-7xl mx-auto relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: THE HOOK */}
          <div className="lg:col-span-7 space-y-12">
            <div className="border-l-8 border-red-600 pl-10">
              <span className="text-red-600 font-mono text-[11px] font-black tracking-[0.4em] uppercase">
                NODE_ACCESS: BMR_SOLUTIONS_FORENSIC_UNIT
              </span>
              <h1 className="text-7xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.8] mt-6 italic">
                RECOVER<br />
                <span className="text-red-600">WASTED</span><br />
                ENGINEERING<br />
                CAPACITY.
              </h1>
            </div>

            <p className="text-xl md:text-3xl text-white max-w-2xl leading-tight font-black italic normal-case">
              We isolate systemic pipeline logic fractures before they corrupt your automation runtimes and cascade into organizational liabilities. Built on twenty years of secure infrastructure triage, our stateless framework quantifies your hidden operational friction in minutes.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
              <button 
                onClick={() => router.push('/pulse-check')} 
                className="group relative w-full md:w-auto bg-red-600 text-white px-16 py-8 text-2xl font-black italic tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl border-2 border-red-600"
              >
                EXECUTE_STRATEGY
                <Target className="absolute -top-4 -right-4 text-white group-hover:text-red-600 transition-all" size={32} />
              </button>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] tracking-[0.4em] font-black italic uppercase">
                  <Activity size={14} className="animate-pulse text-red-600" />
                  10 QUERIES // STATELESS TRIANGULATION MATRIX // ~3 MINUTE RUN
                </div>
                <p className="text-red-600 font-mono text-[9px] tracking-[0.2em] font-black italic uppercase">
                  IMMEDIATE_RECOVERY_BLUEPRINT_GENERATED // NO_SERVICE_LOOP_REQUIRED
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE REWORK TAX SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 border-2 border-slate-900 p-12 shadow-2xl relative group">
              <div className="absolute -top-1 -right-1 w-24 h-24 border-t-4 border-r-4 border-red-600 opacity-20 group-hover:opacity-100 transition-all" />
              
              <h2 className="text-6xl font-black text-red-600 italic tracking-tighter leading-none mb-10">
                THE<br />REWORK<br />TAX.
              </h2>

              <div className="space-y-8 border-l-2 border-red-600/30 pl-8">
                <p className="text-slate-400 text-lg leading-relaxed font-black italic normal-case">
                  Your specialized engineering staff is burning millions on manual, repetitive fire fighting triggered by silent database schema drift and unhedged data transformations. We map the exact financial bleed and hand your team an immutable blueprint to close the leak.
                </p>
                
                <div className="pt-4">
                  <span className="text-white font-black text-2xl italic uppercase tracking-tight">
                    YOU HAVE <span className="text-red-600 underline decoration-4 underline-offset-8">RECOVERABLE VELOCITY.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION 1: THE RE-EDUCATION PARADIGM SHIFT --- */}
        <div className="mt-32 pt-20 border-t border-slate-900">
          <div className="max-w-4xl">
            <span className="text-red-600 font-mono text-[11px] font-black tracking-[0.4em] block mb-4">
              // CORE OPERATIONAL REALITY MODEL
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-8">
              THE STRUCTURAL REALITY:<br />A TALE OF <span className="text-red-600">THREE STRATA.</span>
            </h2>
            <p className="text-xl text-slate-400 font-black italic normal-case max-w-3xl leading-relaxed mb-12">
              Most executives look at engineering waste as an intangible, unavoidable cost of doing business. It isn't. Capital leakage is a structural defect trapped between how you govern your enterprise and how your machines execute code.
            </p>
          </div>

          {/* THE THREE STRATA STACK LAYOUT */}
          <div className="grid grid-cols-1 gap-4 font-mono text-xs mt-8">
            {/* STRATA 1 */}
            <div className="border border-slate-800 bg-slate-950/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 border border-slate-800 text-slate-400"><LayoutGrid size={20} /></div>
                <div>
                  <h4 className="text-white font-black text-sm tracking-wider">// STRATA 01: STRATEGIC GOVERNANCE [THE C-SUITE VISION]</h4>
                  <p className="text-slate-500 font-sans italic normal-case mt-0.5">Corporate mandates, statutory frameworks, security policies, and organizational vision metrics.</p>
                </div>
              </div>
              <span className="text-slate-600 tracking-widest text-[10px] hidden md:inline">SYSTEMS_ALIGNMENT_TRACK</span>
            </div>

            {/* INTERSECTING CONNECTIVE GAP */}
            <div className="flex items-center gap-4 px-8 py-1 text-red-500">
              <Milestone size={14} />
              <span className="text-[10px] tracking-[0.3em] font-black">WARNING: THE PROMISE GAP ENCOUNTEREDERED</span>
            </div>

            {/* STRATA 2 - THE PROBLEM AREA */}
            <div className="border border-red-600 bg-red-950/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-slate-950 text-[9px] font-black px-4 py-1 tracking-widest">
                PRIMARY RISK LAYER
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-600/20 border border-red-600 text-red-500"><Layers size={20} /></div>
                <div>
                  <h4 className="text-red-500 font-black text-sm tracking-wider">// STRATA 02: THE ENGINEERING PIPELINE [THE REWORK TAX ENGINE]</h4>
                  <p className="text-slate-300 font-sans italic normal-case mt-0.5 max-w-2xl">The hidden translation engine. Where human engineers are forced to manually patch, interpret, and convert corporate policies into raw machine logic due to structural pipeline friction.</p>
                </div>
              </div>
              <span className="text-red-500 font-black tracking-widest text-[10px] hidden md:inline animate-pulse">CAPITAL_BLEED_DETECTED</span>
            </div>

            {/* INTERSECTING CONNECTIVE GAP */}
            <div className="flex items-center gap-4 px-8 py-1 text-red-500">
              <Milestone size={14} />
              <span className="text-[10px] tracking-[0.3em] font-black">WARNING: OPERATIONAL ABSORPTION NODE REACHED</span>
            </div>

            {/* STRATA 3 */}
            <div className="border border-slate-800 bg-slate-950/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 border border-slate-800 text-slate-400"><Cpu size={20} /></div>
                <div>
                  <h4 className="text-white font-black text-sm tracking-wider">// STRATA 03: OPERATIONAL RUNTIME [LIVE MACHINE EXECUTION]</h4>
                  <p className="text-slate-500 font-sans italic normal-case mt-0.5">Active relational databases, automated microservices, streaming ingestion routes, and execution pipelines.</p>
                </div>
              </div>
              <span className="text-slate-600 tracking-widest text-[10px] hidden md:inline">MACHINE_STATE_LOGS</span>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION 2: THE PARADIGM LEAP (TRINITY DEPLOYMENT) --- */}
        <div className="mt-32 pt-20 border-t border-slate-900 bg-gradient-to-b from-slate-950/50 to-transparent p-8 md:p-12 border border-slate-900">
          <span className="text-red-600 font-mono text-[11px] font-black tracking-[0.4em] block mb-4">
            // INTERVENTION STRATEGY FRAMEWORK
          </span>
          <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-6">
            THE LEAP: FROM A DIAGNOSTIC ESTIMATE<br />TO A <span className="text-red-600">FORENSIC INTERVENTION.</span>
          </h3>
          <p className="text-base text-slate-400 font-black italic normal-case max-w-4xl leading-relaxed mb-12">
            Resolving a structural multi-hundred-thousand-dollar annual liability cannot be achieved via generic monitoring packages or casual surveys. True extraction of hidden debt requires moving past the baseline estimate into a single, high-fidelity intervention built upon three unshakeable pillars:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TRINITY PILLAR 1: THE MATH */}
            <div className="border border-slate-900 bg-slate-950/80 p-8 space-y-4">
              <div className="text-red-600 font-mono text-xs font-black tracking-widest">// 01 // THE VERIFIED MATH</div>
              <h4 className="text-lg font-black text-white italic tracking-tight">THE RUN RATE METRICS LEDGER</h4>
              <p className="text-xs text-slate-400 font-sans italic normal-case leading-relaxed">
                We eliminate abstract assumptions. By measuring real friction indexes within your second-strata software pipeline, we project an absolute, unblurred financial loss vector showing your precise exposure index.
              </p>
            </div>

            {/* TRINITY PILLAR 2: THE TOOLING */}
            <div className="border border-slate-900 bg-slate-950/80 p-8 space-y-4">
              <div className="text-red-600 font-mono text-xs font-black tracking-widest">// 02 // FORENSIC TOOLING</div>
              <h4 className="text-lg font-black text-white italic tracking-tight">360° STREAM INGESTION & 90-POINT LOGIC AUDIT</h4>
              <p className="text-xs text-slate-400 font-sans italic normal-case leading-relaxed">
                Deep architectural clarity requires robust telemetry. We pair full role-based process mapping with a rigid 90-point technical logic stress-test to track drift down to individual schema bounds.
              </p>
            </div>

            {/* TRINITY PILLAR 3: THE SHIELD */}
            <div className="border border-slate-900 bg-slate-950/80 p-8 space-y-4">
              <div className="text-red-600 font-mono text-xs font-black tracking-widest">// 03 // THE EXECUTIVE SHIELD</div>
              <h4 className="text-lg font-black text-white italic tracking-tight">THE ENGINEERING MASTER BLUEPRINT</h4>
              <p className="text-xs text-slate-400 font-sans italic normal-case leading-relaxed">
                Technical mapping is meaningless without executive leverage. Your intervention delivers a comprehensive, board-ready blueprint to safeguard operational margins, justify resource restructuring, and protect organizational reputation.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {/* GHOST ADMIN SHORTCUT: INCONSPICUOUS ENTRY POINT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        onClick={() => router.push('/admin/dashboard')} 
        className="fixed bottom-10 left-10 z-[10000] cursor-crosshair p-3 group transition-all"
      >
        <Shield size={18} className="text-slate-800 group-hover:text-red-600 transition-colors" />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[7px] font-mono py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border-l-2 border-red-600 pointer-events-none">
          SYSTEM_ACCESS_REQUIRED // AUTH_NODE_01
        </span>
      </motion.div>
    </div>
  );
}
