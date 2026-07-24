"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Activity, Zap, Scale, Target, AlertCircle, Briefcase, Lock, ShieldAlert } from "lucide-react";

export default function Methodology() {
  const nodes = [
    {
      id: "NODE_01",
      title: "EXECUTIVE NODE",
      focus: "THE PROMISE GAP™ & FIDUCIARY RISK",
      lens: "PH.D. LEADERSHIP",
      description: "We isolate the exact systemic process fractures and unhedged operational liabilities that create the Promise Gap™. Our diagnostic protects corporate governance by exposing Process Waste Tax before unmapped automation forces an expensive operational retreat.",
      metrics: ["Board Risk Audit", "Deployment Gates", "Process Waste Tax Calculation"]
    },
    {
      id: "NODE_02",
      title: "TECHNICAL NODE",
      focus: "PIPELINE HARDENING & SCHEMA DRIFT",
      lens: "FEDERAL ENGINEERING",
      description: "We evaluate your pipeline architecture for silent execution failure. We identify where unannounced third-party API mutations and schema drift corrupt context windows, and we output Track 01 directives to insulate downstream automation.",
      metrics: ["Schema Mutation Check", "Track 01 Ingestion Contracts", "System Hardening"]
    },
    {
      id: "NODE_03",
      title: "MANAGERIAL NODE",
      focus: "OVERSIGHT DECAY & VALIDATION FATIGUE",
      lens: "MA. LEADERSHIP & DESIGN",
      description: "We map engineering alert fatigue and undocumented tribal workflows. Our diagnostic exposes the hidden shadow labor required to repeatedly nurse broken integrations, delivering Track 02 telemetry runbooks to restore velocity.",
      metrics: ["Validation Fatigue Check", "Track 02 Telemetry Decoupling", "Governance Supplement"]
    }
  ];

  const phases = [
    { step: "01", title: "TRIAGE", detail: "Ten-question diagnostic run. Three-minute processing window. Localization of primary logic fractures based on user responses." },
    { step: "02", title: "ANALYSIS", detail: "Deep operational evaluation. We process your inputs through a ninety-point logic framework to calculate your exact Process Waste Tax." },
    { step: "03", title: "VERDICT", detail: "Clear structural mapping. Direct identification of where unmapped workflows and schema drift are draining engineering capital." },
    { step: "04", title: "HAND-OFF", detail: "Machine-readable directives (Tracks 01 & 02) and Deployment Gates delivered. Your internal team or administrators execute. BMR departs." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black">
      <Header />
      
      <main className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto italic">
        {/* --- SECTION I: THE BLUEPRINT --- */}
        <section className="mb-24 sm:mb-32 italic">
          <div className="border-l-4 sm:border-l-8 border-red-600 pl-4 sm:pl-10 mb-12 sm:mb-16 italic text-left">
            <span className="text-red-600 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.4em] italic uppercase block">
              THE_BLUEPRINT // PRE-AUTOMATION CONTROL PLANE
            </span>
            
            <h1 className="font-black tracking-[0.02em] leading-[0.85] sm:leading-[0.8] mt-4 sm:mt-6 mb-6 sm:mb-10 italic uppercase break-words">
              <span className="text-[clamp(2.5rem,8vw,7rem)] block">FORENSIC</span>
              <span className="text-red-600 text-[clamp(2.5rem,9.5vw,8rem)] block leading-tight sm:leading-none whitespace-normal sm:whitespace-nowrap sm:-ml-1">
                PHILOSOPHY.
              </span>
            </h1>
            
            <p className="text-lg sm:text-2xl md:text-3xl text-white max-w-4xl leading-tight font-black italic normal-case">
              SYSTEMIC RISK IS NOT A SOFTWARE BUG. IT IS A FAILURE OF STRUCTURAL DETERMINISM. WE IDENTIFY PROCESS AND SCHEMA FRACTURES BEFORE THEY CORRUPT YOUR AUTONOMOUS RUNTIMES AND MANIFEST AS MATERIAL LIABILITIES.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start italic">
            <div className="bg-slate-900/30 border border-slate-800 p-6 sm:p-10 shadow-2xl italic">
              <h4 className="text-red-600 font-mono text-[10px] font-black mb-4 sm:mb-6 tracking-widest italic uppercase">// THE_ORIGIN</h4>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed normal-case font-medium italic">
                BMR was forged from over twenty years of leadership, including a decade at Microsoft. I protected <span className="text-white font-black">United States Government Intelligence</span> within air-gapped networks. Following the management of over six hundred system failures, I built this framework to close the Promise Gap™ and establish machine-readable boundaries before automation breaks production.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6 italic">
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-900 pb-4 sm:pb-6 italic">
                <Shield className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-base sm:text-lg italic">GOVERNMENT-GRADE SECURITY</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">SECURE CLOUD // AIR-GAPPED SYSTEMS</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-900 pb-4 sm:pb-6 italic">
                <Briefcase className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-base sm:text-lg italic uppercase">PORTFOLIO ASSURANCE</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">SIX HUNDRED SYSTEM RECOVERIES</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-900 pb-4 sm:pb-6 italic">
                <Scale className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-base sm:text-lg italic uppercase tracking-tighter">PH.D. LEADERSHIP & MA. DESIGN</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic uppercase">SPECIALIST IN ORGANIZATIONAL DESIGN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION II: THE NODES --- */}
        <section className="mb-24 sm:mb-40 italic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 italic">
            {nodes.map((node) => (
              <div key={node.id} className="bg-slate-950 border-2 border-slate-900 p-6 sm:p-10 shadow-2xl relative group hover:border-red-600 transition-all italic flex flex-col justify-between">
                <div>
                  <div className="text-red-600 font-mono text-[9px] sm:text-[10px] font-black tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6 italic">{node.id} // {node.lens}</div>
                  <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black mb-1 italic tracking-tighter text-white break-words">{node.title}</h3>
                  <p className="text-red-600 text-[9px] sm:text-[10px] font-black tracking-[0.2em] mb-6 sm:mb-8 italic">{node.focus}</p>
                  
                  <p className="text-slate-400 text-xs sm:text-sm normal-case mb-8 sm:mb-12 leading-relaxed font-medium italic min-h-[100px]">
                    {node.description}
                  </p>
                </div>
                
                <div className="space-y-3 sm:space-y-4 border-t border-slate-900 pt-6 sm:pt-8 italic">
                  {node.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-3 text-[10px] font-black tracking-widest text-white italic">
                      <Zap size={14} className="text-red-600 shrink-0 italic" /> {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- THE INFRASTRUCTURE INVERSION METHODOLOGY BANNER --- */}
        <section className="mb-20 sm:mb-24 max-w-7xl mx-auto">
          <div className="bg-slate-950 border-l-4 border-amber-500 p-6 sm:p-8 font-mono text-xs text-left space-y-3 italic shadow-2xl">
            <div className="flex items-center gap-2 text-amber-500 font-black tracking-widest text-xs uppercase">
              <ShieldAlert size={16} className="shrink-0" />
              // METHODOLOGY ANALYSIS: THE INFRASTRUCTURE INVERSION
            </div>
            
            <p className="text-slate-300 text-xs sm:text-sm font-sans normal-case italic font-normal leading-relaxed max-w-5xl">
              <strong className="text-white font-bold">The Infrastructure Inversion:</strong> Enterprise research establishes that AI automation initiatives outpace Infrastructure as Code (IaC) investments by nearly 2:1. Attempting to deploy autonomous workspace agents without Git-based, version-controlled parameters directly accelerates the <span className="text-white font-bold underline decoration-amber-500/50">Promise Gap™</span>. BMR’s Tracks 01 & 02 translate analog operational chaos into version-aligned directives and deployment gates prior to runtime execution.
            </p>
            
            <div className="pt-2 text-[9px] text-slate-500 tracking-widest uppercase font-mono">
              VERIFIED TELEMETRY ANCHOR // FLEET IT RESEARCH BENCHMARK // 500+ ENTERPRISE IT LEADS AUDITED
            </div>
          </div>
        </section>

        {/* --- SECTION III: THE PROCESS --- */}
        <section className="mb-20 sm:mb-24 bg-white text-slate-950 p-6 sm:p-12 md:p-24 italic">
          <div className="max-w-4xl italic text-slate-950">
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black italic tracking-tighter leading-none mb-6 sm:mb-10 uppercase break-words">
              THE TWO-PART <span className="text-red-600">UNIFIED AUDIT.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-bold text-slate-600 mb-12 sm:mb-20 normal-case italic leading-snug">
              This is not a generic survey. This is a targeted evaluation framework. We combine an initial ten-question diagnostic run with a deep ninety-point logic audit. Our system uncovers systemic architecture vulnerabilities based entirely on your narrative inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 italic">
            {phases.map((p) => (
              <div key={p.step} className="border-l-4 border-slate-200 pl-6 sm:pl-8 space-y-3 sm:space-y-4 italic">
                <div className="text-red-600 font-black text-3xl sm:text-4xl italic uppercase">PHASE_{p.step}</div>
                <div className="text-lg sm:text-xl font-black italic tracking-tight uppercase">{p.title}</div>
                <p className="text-slate-500 text-xs sm:text-sm normal-case font-medium leading-relaxed italic">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- COMPLIANCE HIGHLIGHT --- */}
        <section className="mb-24 sm:mb-40 max-w-7xl mx-auto">
          <div className="bg-slate-950 border-l-4 border-red-600 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs">
            <div className="space-y-2">
              <div className="text-red-500 font-black tracking-widest flex items-center gap-2 text-[10px] sm:text-xs">
                <Lock size={16} className="shrink-0" /> ZERO SECURITY FOOTPRINT COMPLIANCE VERIFICATION
              </div>
              <p className="text-slate-400 text-xs normal-case font-sans italic font-medium max-w-4xl leading-relaxed">
                Our infrastructure analysis operates independently of your live hardware networks. We do not require active network configurations, we do not view your architectural metadata, and we do not connect to your enterprise data sources. The process relies completely on text input parameters.
              </p>
            </div>
            <span className="text-slate-700 tracking-widest text-[9px] font-black hidden lg:inline shrink-0">ISOLATED_EVALUATION_PROTOCOL</span>
          </div>
        </section>

        {/* --- SECTION IV: THE COST OF INACTION --- */}
        <section className="max-w-5xl mx-auto text-center border border-slate-800 p-8 sm:p-16 md:p-24 bg-slate-950/40 italic">
          <AlertCircle className="text-red-600 mx-auto mb-6 sm:mb-8 italic" size={48} />
          <h2 className="text-[clamp(1.8rem,4.5vw,3.75rem)] font-black italic tracking-tighter mb-6 sm:mb-8 text-white leading-none uppercase break-words">THE COST OF INACTION</h2>
          <p className="text-base sm:text-xl md:text-2xl text-slate-400 leading-snug mb-8 sm:mb-12 normal-case italic font-medium max-w-3xl mx-auto">
            For every one million dollars committed to automation budgets, unmapped structural fractures drain hundreds of thousands of dollars annually in Process Waste Tax. Closing the Promise Gap™ is a strict fiduciary obligation.
          </p>
            
          <div className="flex flex-col items-center gap-6 italic w-full">
            <button 
              onClick={() => window.location.href='/pulse-check'} 
              className="group relative bg-red-600 text-white px-10 sm:px-16 md:px-24 py-6 sm:py-8 text-xl sm:text-2xl font-black italic tracking-[0.25em] sm:tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl uppercase cursor-pointer w-full sm:w-auto text-center"
            >
              EXECUTE STRATEGY
              <Target className="hidden sm:block absolute -top-4 -right-4 text-white group-hover:text-red-600 transition-all italic" size={32} />
            </button>
              
            <div className="flex items-center gap-3 text-slate-500 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] font-black italic uppercase text-center">
              <Activity size={14} className="animate-pulse text-red-600 italic shrink-0" />
              UNIFIED DIAGNOSTIC // ZERO SYSTEM CONNECTIONS // NO DATA RISK
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
