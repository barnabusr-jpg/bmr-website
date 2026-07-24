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
      <main className="flex-grow pt-28 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
          
          {/* LEFT COLUMN: THE HOOK */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            <div className="border-l-4 sm:border-l-8 border-red-600 pl-4 sm:pl-10">
              <span className="text-red-600 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.4em] uppercase block">
                NODE ACCESS: BMR SOLUTIONS PRE-AUTOMATION CONTROL PLANE
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.95] sm:leading-[0.85] mt-4 sm:mt-6 italic break-words">
                CLOSE THE<br />
                <span className="text-red-600">PROMISE GAP™.</span><br />
                MAKE AI EXECUTION<br />
                DETERMINISTIC.
              </h1>
            </div>

            <p className="text-base sm:text-xl md:text-2xl text-slate-200 max-w-2xl leading-relaxed font-black italic normal-case">
              Enterprises were promised that AI agents and workspace Copilots would unlock unprecedented velocity. Instead, leadership faces the Promise Gap™: the expanding rift between AI ambition and the operational reality of silent failures, schema drift, and unbudgeted developer rework. We diagnose the root causes of execution failure, quantify your Process Waste Tax, and output machine-readable directives and deployment gates your team can execute immediately.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-2 sm:pt-4 w-full">
              <button 
                onClick={() => router.push('/pulse-check')} 
                className="group relative w-full sm:w-auto bg-red-600 text-white px-8 sm:px-16 py-5 sm:py-8 text-xl sm:text-2xl font-black italic tracking-[0.2em] sm:tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl border-2 border-red-600 cursor-pointer text-center"
              >
                EXECUTE STRATEGY
                <Target className="hidden sm:block absolute -top-4 -right-4 text-white group-hover:text-red-600 transition-all" size={32} />
              </button>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] font-black italic uppercase">
                  <Activity size={14} className="animate-pulse text-red-600 shrink-0" />
                  10 QUERIES // STATELESS MATRIX // 3 MINUTE RUN
                </div>
                <p className="text-red-600 font-mono text-[8px] sm:text-[9px] tracking-[0.15em] font-black italic uppercase">
                  IMMEDIATE RECOVERY BLUEPRINT GENERATED // NO SERVICE LOOP
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE REWORK TAX SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 border-2 border-slate-900 p-6 sm:p-12 shadow-2xl relative group">
              <div className="absolute -top-1 -right-1 w-16 sm:w-24 h-16 sm:h-24 border-t-4 border-r-4 border-red-600 opacity-20 group-hover:opacity-100 transition-all" />
              
              <h2 className="text-4xl sm:text-6xl font-black text-red-600 italic tracking-tighter leading-none mb-6 sm:mb-10">
                THE<br />PROCESS<br />WASTE TAX.
              </h2>

              <div className="space-y-6 sm:space-y-8 border-l-2 border-red-600/30 pl-4 sm:pl-8">
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-black italic normal-case">
                  Your engineering team is spending thousands of dollars firefighting repetitive repairs. This financial drag happens when AI and automated systems run over drifting schemas, unmapped data workflows, and noisy telemetry layers. We trace the exact path of this capital waste and deliver a machine-readable blueprint to halt the loss.
                </p>
                
                <div className="pt-2 sm:pt-4">
                  <span className="text-white font-black text-xl sm:text-2xl italic uppercase tracking-tight block">
                    YOU HAVE <span className="text-red-600 underline decoration-4 underline-offset-8">RECOVERABLE VELOCITY.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: THE RE-EDUCATION PARADIGM SHIFT --- */}
        <div className="mt-20 sm:mt-32 pt-12 sm:pt-20 border-t border-slate-900">
          <div className="max-w-4xl">
            <span className="text-red-600 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.4em] block mb-3 sm:mb-4">
              // CORE OPERATIONAL REALITY MODEL
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 sm:mb-8 leading-tight">
              THE STRUCTURAL REALITY:<br />A TALE OF <span className="text-red-600">THREE STRATA.</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-400 font-black italic normal-case max-w-3xl leading-relaxed mb-8 sm:mb-12">
              Many business leaders view engineering waste and AI brittleness as unavoidable costs. That view is incorrect. Capital loss is a structural flaw that lives in the unmapped middle layer between executive intent and active runtime execution.
            </p>
          </div>

          {/* THE THREE STRATA STACK LAYOUT */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 font-mono text-xs mt-6 sm:mt-8">
            {/* STRATA 1 */}
            <div className="border border-slate-800 bg-slate-950/40 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-slate-900 border border-slate-800 text-slate-400 shrink-0"><LayoutGrid size={18} /></div>
                <div>
                  <h4 className="text-white font-black text-xs sm:text-sm tracking-wider">// STRATA 01: STRATEGIC GOVERNANCE [THE C-SUITE VISION]</h4>
                  <p className="text-slate-500 font-sans italic normal-case mt-0.5 text-[11px] sm:text-xs">This layer holds corporate policy, safety parameters, and board-level AI productivity objectives.</p>
                </div>
              </div>
              <span className="text-slate-600 tracking-widest text-[9px] sm:text-[10px] hidden md:inline">SYSTEMS ALIGNMENT TRACK</span>
            </div>

            {/* INTERSECTING CONNECTIVE GAP */}
            <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-1 text-red-500">
              <Milestone size={14} className="shrink-0" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-black">WARNING: THE PROMISE GAP™ ENCOUNTERED</span>
            </div>

            {/* STRATA 2 - THE PROBLEM AREA */}
            <div className="border border-red-600 bg-red-950/10 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-slate-950 text-[8px] sm:text-[9px] font-black px-2.5 sm:px-4 py-0.5 sm:py-1 tracking-widest uppercase">
                PRIMARY RISK LAYER
              </div>
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-0">
                <div className="p-2.5 sm:p-3 bg-red-600/20 border border-red-600 text-red-500 shrink-0"><Layers size={18} /></div>
                <div>
                  <h4 className="text-red-500 font-black text-xs sm:text-sm tracking-wider">// STRATA 02: THE ENGINEERING PIPELINE [THE REWORK TAX ENGINE]</h4>
                  <p className="text-slate-300 font-sans italic normal-case mt-0.5 text-[11px] sm:text-xs max-w-2xl">This is the unmapped middle layer where engineers must manually translate business logic into code while nursing drifting schemas. This manual friction triggers silent agent failures and drains senior engineering capacity.</p>
                </div>
              </div>
              <span className="text-red-500 font-black tracking-widest text-[9px] sm:text-[10px] hidden md:inline animate-pulse">CAPITAL BLEED DETECTED</span>
            </div>

            {/* INTERSECTING CONNECTIVE GAP */}
            <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-1 text-red-500">
              <Milestone size={14} className="shrink-0" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-black">WARNING: OPERATIONAL ABSORPTION NODE REACHED</span>
            </div>

            {/* STRATA 3 */}
            <div className="border border-slate-800 bg-slate-950/40 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-slate-900 border border-slate-800 text-slate-400 shrink-0"><Cpu size={18} /></div>
                <div>
                  <h4 className="text-white font-black text-xs sm:text-sm tracking-wider">// STRATA 03: OPERATIONAL RUNTIME [LIVE MACHINE EXECUTION]</h4>
                  <p className="text-slate-500 font-sans italic normal-case mt-0.5 text-[11px] sm:text-xs">This layer executes live databases, automated pipelines, vector search layers, and autonomous agents.</p>
                </div>
              </div>
              <span className="text-slate-600 tracking-widest text-[9px] sm:text-[10px] hidden md:inline">MACHINE STATE LOGS</span>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE PARADIGM LEAP (TRINITY DEPLOYMENT) --- */}
        <div className="mt-20 sm:mt-32 pt-12 sm:pt-20 border-t border-slate-900 bg-gradient-to-b from-slate-950/50 to-transparent p-5 sm:p-12 border border-slate-900">
          <span className="text-red-600 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.4em] block mb-3 sm:mb-4">
            // INTERVENTION STRATEGY FRAMEWORK
          </span>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 sm:mb-6 leading-tight">
            THE LEAP: FROM A DIAGNOSTIC ESTIMATE<br />TO A <span className="text-red-600">FORENSIC INTERVENTION.</span>
          </h3>
          <p className="text-sm sm:text-base text-slate-400 font-black italic normal-case max-w-4xl leading-relaxed mb-8 sm:mb-12">
            Closing the Promise Gap™ requires more than basic monitoring or surface-level dashboards. True recovery demands moving past passive logging to deploy machine-readable directives built on three foundational pillars.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* TRINITY PILLAR 1: THE MATH */}
            <div className="border border-slate-900 bg-slate-950/80 p-5 sm:p-8 space-y-3 sm:space-y-4">
              <div className="text-red-600 font-mono text-[10px] sm:text-xs font-black tracking-widest">// 01 // QUANTIFY THE TAX</div>
              <h4 className="text-base sm:text-lg font-black text-white italic tracking-tight">THE PROCESS WASTE TAX LEDGER</h4>
              <p className="text-xs text-slate-400 font-sans italic normal-case leading-relaxed">
                We eliminate guesswork. We calculate the exact financial exposure and hidden labor tax resulting from drifting data pipelines, unmapped logic, and validation fatigue.
              </p>
            </div>

            {/* TRINITY PILLAR 2: THE TOOLING */}
            <div className="border border-slate-900 bg-slate-950/80 p-5 sm:p-8 space-y-3 sm:space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-red-600 font-mono text-[10px] sm:text-xs font-black tracking-widest">// 02 // MACHINE-READABLE DIRECTIVES</div>
                <h4 className="text-base sm:text-lg font-black text-white italic tracking-tight">TRACKS 01 & 02 RUNBOOKS</h4>
                <p className="text-xs text-slate-400 font-sans italic normal-case leading-relaxed">
                  We convert engineering reality into code-enforced requirements. Track 01 isolates pipeline abstraction and schema mutation drift, while Track 02 suppresses telemetry noise and validation fatigue.
                </p>
              </div>
              
              {/* HIGH-CONTRAST SECURITY HIGHLIGHT */}
              <div className="mt-4 p-3 sm:p-4 bg-slate-900 border-l-4 border-red-600 font-mono text-[9px] sm:text-[10px] tracking-wide text-slate-300 normal-case space-y-1">
                <span className="text-red-500 font-black block uppercase tracking-widest">// ZERO SECURITY FOOTPRINT COMPLIANCE:</span>
                <p>
                  OUR SYSTEM DOES NOT CONNECT TO YOUR INFRASTRUCTURE. WE DO NOT VIEW YOUR ARCHITECTURAL METADATA, AND WE DO NOT TOUCH ANY OF YOUR CONFIDENTIAL DATA SOURCES.
                </p>
              </div>
            </div>

            {/* TRINITY PILLAR 3: THE SHIELD */}
            <div className="border border-slate-900 bg-slate-950/80 p-5 sm:p-8 space-y-3 sm:space-y-4">
              <div className="text-red-600 font-mono text-[10px] sm:text-xs font-black tracking-widest">// 03 // DEPLOYMENT GATES</div>
              <h4 className="text-base sm:text-lg font-black text-white italic tracking-tight">THE GOVERNANCE & COMPLIANCE SUPPLEMENT</h4>
              <p className="text-xs text-slate-400 font-sans italic normal-case leading-relaxed">
                We establish non-negotiable prerequisites before automation scales. We output evidence-backed proof targets and gate criteria so agents never execute unverified actions or access over-shared data.
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
        className="fixed bottom-6 left-6 sm:bottom-10 sm:left-10 z-[10000] cursor-crosshair p-2 sm:p-3 group transition-all"
      >
        <Shield size={18} className="text-slate-800 group-hover:text-red-600 transition-colors" />
        <span className="absolute left-10 sm:left-12 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[7px] font-mono py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border-l-2 border-red-600 pointer-events-none">
          SYSTEM ACCESS REQUIRED // AUTH NODE 01
        </span>
      </motion.div>
    </div>
  );
}
