"use client";
import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Activity, Target, Shield, LayoutGrid, Layers, Cpu, Milestone, CheckCircle2, ArrowRight, FileText, ClipboardCheck, DollarSign, Clock, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  const handleAdminNavigate = () => {
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative w-full">
        
        {/* --- TOP BANNER: INDEPENDENT ADVISORY POSTURE --- */}
        <div className="mb-12 bg-slate-100 border-y border-slate-200/90 py-5 px-6 sm:px-8 rounded-sm shadow-xs font-mono">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="text-red-700 shrink-0" size={22} />
              <span className="text-red-700 text-xs font-bold uppercase tracking-widest block">
                // INDEPENDENT ADVISORY POSTURE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed max-w-4xl font-sans">
              <strong>BMR Solutions operates as an independent Digital Building Inspector.</strong> We assess your operational processes, quantify financial risk, and deliver outcome-focused blueprints to help protect operating margins, preserve brand credibility, and prevent operational defects.
            </p>
          </div>
        </div>

        {/* --- HERO / HOOK SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
          
          {/* LEFT COLUMN: THE HOOK */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            <div className="border-l-4 border-red-700 pl-4 sm:pl-8">
              <span className="text-red-700 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-3">
                NODE ACCESS: BMR SOLUTIONS PRE-AUTOMATION CONTROL PLANE
              </span>
              <h1 className="text-[clamp(2.2rem,6vw,4.2rem)] font-black uppercase tracking-tight leading-none text-slate-950">
                BRIDGE THE<br />
                <span className="text-red-700">PROMISE GAP™.</span><br />
                MAKE AI EXECUTION<br />
                RELIABLE AND PREDICTABLE.
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-slate-800 max-w-2xl leading-relaxed font-normal">
                Many organizations expected AI and automation to deliver instant operational scale. Instead, leadership teams face the Promise Gap™: the widening rift between board-level 2026 AI delivery goals and the reality of errors, scattered data, and ongoing operational friction during runtime.
              </p>
              
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-normal border-l-2 border-slate-300 pl-4">
                For example, a multi-site enterprise struggled with inconsistent automated recommendations across core operations. By mapping workflows and identifying root causes, they eliminated 30% of repetitive technical rework and stabilized key tools in weeks. This secured their operational mandate ahead of schedule. We help pinpoint structural failure points, calculate your Process Waste Tax, and give your team clear, execution-ready directives to fix them immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4 w-full">
              <button 
                onClick={() => router.push('/pulse-check')} 
                className="group relative w-full sm:w-auto bg-slate-950 text-white px-8 sm:px-12 py-5 text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-md border border-slate-950 cursor-pointer text-center"
              >
                CALCULATE YOUR PROCESS WASTE TAX
                <Target className="hidden sm:block absolute -top-3 -right-3 text-red-600 group-hover:text-white transition-all" size={24} />
              </button>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-600 font-mono text-[10px] tracking-wider font-bold uppercase">
                  <Activity size={14} className="animate-pulse text-red-700 shrink-0" />
                  10-QUESTION ASSESSMENT // 3-MINUTE DIAGNOSTIC
                </div>
                <p className="text-red-700 font-mono text-[9px] tracking-wider font-semibold uppercase">
                  PRELIMINARY DIAGNOSTIC RESULTS
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE REWORK TAX SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm rounded-sm relative group">
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-700/30 group-hover:border-red-700 transition-colors" />
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none mb-6">
                THE PROCESS<br /><span className="text-red-700">WASTE TAX.</span>
              </h2>

              <div className="space-y-6 border-l-2 border-red-700/30 pl-4 sm:pl-6">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  Your organization is likely absorbing thousands in hidden capital loss by repeatedly fixing the same operational failures. This fiscal bleed comes from automated execution running on incomplete processes, changing inputs, and alerts that do not lead to the right actions.
                </p>

                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-normal bg-slate-100/80 p-4 border border-slate-200">
                  On average, our clients reduce repeat operational rework by 25% to 40% within the first quarter. This yields typical annual savings of $150,000 to $350,000 depending on organizational scale and process complexity. We pinpoint exactly where capital is leaking and deliver execution-ready blueprints to recover lost speed.
                </p>
                
                <div className="pt-2">
                  <span className="text-slate-950 font-bold text-lg uppercase tracking-wide block">
                    YOU CAN <span className="text-red-700 underline decoration-2 underline-offset-4">REGAIN LOST SPEED.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- VERIFIED EXECUTIVE OUTCOMES STRIP --- */}
        <div className="mt-16 bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-xs font-mono">
          <span className="text-red-700 text-xs font-bold uppercase tracking-widest block mb-6">
            // VERIFIED EXECUTIVE OUTCOMES
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            <div className="border-l-2 border-red-700 pl-4 space-y-1">
              <span className="font-mono text-lg font-black text-slate-950 block">30%–45% REDUCTION</span>
              <p className="text-xs text-slate-600 leading-snug">In repeat technical rework within 90 days of execution.</p>
            </div>
            <div className="border-l-2 border-slate-950 pl-4 space-y-1">
              <span className="font-mono text-lg font-black text-slate-950 block">$150K–$350K RECOVERED</span>
              <p className="text-xs text-slate-600 leading-snug">Annually per operational business unit in capital leakages.</p>
            </div>
            <div className="border-l-2 border-red-700 pl-4 space-y-1">
              <span className="font-mono text-lg font-black text-slate-950 block">EXPEDITED PROCUREMENT:</span>
              <p className="text-xs text-slate-600 leading-snug">Zero-footprint audit model bypasses InfoSec delays completely.</p>
            </div>
            <div className="border-l-2 border-slate-950 pl-4 space-y-1">
              <span className="font-mono text-lg font-black text-slate-950 block">100% OBJECTIVE ADVISORY</span>
              <p className="text-xs text-slate-600 leading-snug">Zero software vendor commissions or hidden implementation fees.</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE THREE ENTERPRISE LEVELS --- */}
        <div className="mt-20 sm:mt-28 pt-16 border-t border-slate-200">
          <div className="max-w-4xl">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-3">
              // CORE OPERATIONAL REALITY MODEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6 text-slate-950 leading-tight">
              THE CORE OPERATIONAL REALITY:<br />THE THREE <span className="text-red-700">ENTERPRISE LEVELS.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed mb-10 font-normal">
              Executive leadership often assumes operational friction and fragile AI deployments are unavoidable costs of modernizing. Capital loss happens in the unmapped middle layer between executive strategy and daily machine execution.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 font-mono text-xs mt-8">
            {/* LEVEL 1 */}
            <div className="border border-slate-200 bg-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-sm shadow-sm">
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 bg-slate-100 border border-slate-200 text-slate-700 shrink-0"><LayoutGrid size={20} /></div>
                <div>
                  <h3 className="text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase">// LEVEL 1: STRATEGIC GOVERNANCE (EXECUTIVE VISION)</h3>
                  <p className="text-slate-600 font-sans mt-1 text-xs font-normal">Sets corporate policy, compliance mandates, and board-level automation goals.</p>
                </div>
              </div>
              <span className="text-slate-500 tracking-wider text-[10px] hidden md:inline shrink-0 uppercase font-bold">RISK: PROMISE GAP™ EMERGES HERE</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-1 text-red-700 font-mono">
              <Milestone size={14} className="shrink-0" />
              <span className="text-[10px] tracking-wider font-bold uppercase">WARNING: EXPECTATIONS DIVERGE FROM RUNTIME REALITY</span>
            </div>

            {/* LEVEL 2 */}
            <div className="border-2 border-red-700 bg-white p-6 sm:p-8 relative rounded-sm shadow-md space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-red-200 pb-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 bg-red-700 text-white shrink-0"><Layers size={20} /></div>
                  <div>
                    <span className="bg-red-700 text-white text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase inline-block mb-1">FRICTION LAYER DIAGNOSTIC GATE</span>
                    <h3 className="text-red-800 font-black text-sm sm:text-base tracking-wider uppercase">// LEVEL 2: THE OPERATIONAL AND DELIVERY INTERFACE</h3>
                    <p className="text-slate-700 font-sans mt-1 text-xs font-normal max-w-3xl">This is where teams translate business directives into automated workflows, reliable data, and stable systems. BMR audits this layer using the <strong>Pre-Automation Control Plane</strong> framework to find hidden process failures, calculate your Process Waste Tax, and provide clear execution runbooks.</p>
                  </div>
                </div>
                <span className="text-red-700 font-bold tracking-wider text-[10px] shrink-0 uppercase bg-red-50 px-3 py-1 border border-red-200">RISK: CAPITAL LOSS & CAPACITY EROSION</span>
              </div>

              {/* VISUAL CONTROL PLANE ENGINE */}
              <div className="space-y-4 font-sans">
                <div className="bg-slate-50 border border-slate-300 rounded-sm p-3 flex items-center justify-between">
                  <div className="hidden sm:flex items-center space-x-1 text-slate-400">
                    <FileText size={18} />
                  </div>
                  <div className="mx-auto flex items-center space-x-2 font-mono text-[11px] font-bold text-red-700 uppercase">
                    <span className="text-slate-400">➔ ➔</span>
                    <span>↓ DIAGNOSTIC INPUT BOUNDARY // INGESTION RISK REVIEW LAYER</span>
                    <span className="text-slate-400">➔ ➔</span>
                  </div>
                  <div className="hidden sm:flex items-center text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>
                </div>

                {/* THE FOUR EXECUTIVE PROTECTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-white border border-slate-200 border-t-2 border-t-red-700 p-4 space-y-2 text-left">
                    <span className="font-mono text-[10px] font-bold text-red-700 uppercase block">// 01 // MARGIN DEFENSE</span>
                    <h4 className="font-black text-xs uppercase text-slate-950">Process Maturity</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">Document all decision trees, sentiment rules, and escalation limits. Tribal knowledge blocks automation.</p>
                  </div>
                  <div className="bg-white border border-slate-200 border-t-2 border-t-slate-950 p-4 space-y-2 text-left">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">// 02 // DATA INTEGRITY SHIELD</span>
                    <h4 className="font-black text-xs uppercase text-slate-950">Intake Contracts</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">Audit intake contracts to enforce strict schema validation. Sanitize inputs at entry to prevent context contamination before executing the payload.</p>
                  </div>
                  <div className="bg-white border border-slate-200 border-t-2 border-t-red-700 p-4 space-y-2 text-left">
                    <span className="font-mono text-[10px] font-bold text-red-700 uppercase block">// 03 // LIABILITY CEILING</span>
                    <h4 className="font-black text-xs uppercase text-slate-950">Policy Ceilings</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">Specify Non-Human Identity (NHI) roles and define hard infrastructure-level API proxy limits. Natural language instructions cannot enforce corporate policy.</p>
                  </div>
                  <div className="bg-white border border-slate-200 border-t-2 border-t-slate-950 p-4 space-y-2 text-left">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">// 04 // CAPITAL EXPOSURE SAFETY GATE</span>
                    <h4 className="font-black text-xs uppercase text-slate-950">Staging Blueprints</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">Audit and decouple reasoning from live execution. Route actions into draft shadow queues to verify stability against operational variance before granting system writes.</p>
                  </div>
                </div>

                {/* GRADUATED TIMELINE */}
                <div className="bg-slate-50 border border-slate-200 p-3 flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-red-700 font-bold uppercase">// GRADUATED TIMELINE BLUEPRINT:</span>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <span className="bg-white px-2 py-0.5 border border-slate-200">1. Shadow Queue (98%+ Target)</span>
                    <ArrowRight size={14} className="text-slate-400" />
                    <span className="bg-white px-2 py-0.5 border border-slate-200">2. Low-Risk Auto-Write</span>
                    <ArrowRight size={14} className="text-slate-400" />
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 border border-emerald-200">3. Verified Autonomy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-1 text-red-700 font-mono">
              <Milestone size={14} className="shrink-0" />
              <span className="text-[10px] tracking-wider font-bold uppercase">WARNING: UNMONITORED WORKFLOW DRIFT</span>
            </div>

            {/* LEVEL 3 */}
            <div className="border border-slate-200 bg-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-sm shadow-sm">
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 bg-slate-100 border border-slate-200 text-slate-700 shrink-0"><Cpu size={20} /></div>
                <div>
                  <h3 className="text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase">// LEVEL 3: OPERATIONAL RUNTIME (LIVE EXECUTION LAYER)</h3>
                  <p className="text-slate-600 font-sans mt-1 text-xs font-normal">Handles live databases, automated transactions, analytics, and decision workflows. The goal is to keep operations reliable, contain incidents, and ensure stable performance despite operational variability.</p>
                </div>
              </div>
              <span className="text-slate-500 tracking-wider text-[10px] hidden md:inline shrink-0 uppercase font-bold">MACHINE EXECUTION LAYER</span>
            </div>
          </div>
        </div>

        {/* --- EXECUTIVE OUTCOME TRANSFORM MATRIX --- */}
        <div className="mt-20 sm:mt-28 border border-slate-200 bg-white p-6 sm:p-10 rounded-sm shadow-sm">
          <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-3">
            // EXECUTIVE OUTCOME TRANSFORM
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-950 mb-8">
            OPERATIONAL STATE <span className="text-red-700">TRANSFORMATION.</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
            <div className="border border-slate-200 p-5 bg-slate-50 space-y-2">
              <span className="font-mono text-[10px] text-red-700 font-bold uppercase block">// STATUS QUO: VALIDATION FATIGUE</span>
              <p className="text-slate-700">Senior engineers spend 15+ hours/week manually double-checking AI outputs.</p>
              <div className="pt-2 border-t border-slate-200 font-bold text-slate-950">
                ➔ INSPECTED STATE: Engineering capacity is fully restored to revenue-generating development.
              </div>
            </div>

            <div className="border border-slate-200 p-5 bg-slate-50 space-y-2">
              <span className="font-mono text-[10px] text-red-700 font-bold uppercase block">// STATUS QUO: BUDGET VOLATILITY</span>
              <p className="text-slate-700">Unchecked rework and unmonitored agent loops create unexpected cost shocks.</p>
              <div className="pt-2 border-t border-slate-200 font-bold text-slate-950">
                ➔ INSPECTED STATE: Execution runs under strict, pre-calculated cost boundaries.
              </div>
            </div>

            <div className="border border-slate-200 p-5 bg-slate-50 space-y-2">
              <span className="font-mono text-[10px] text-red-700 font-bold uppercase block">// STATUS QUO: REPUTATIONAL EXPOSURE</span>
              <p className="text-slate-700">Unverified machine actions risk customer trust and regulatory penalties.</p>
              <div className="pt-2 border-t border-slate-200 font-bold text-slate-950">
                ➔ INSPECTED STATE: Every automated workflow maintains an explicit compliance and safety trail.
              </div>
            </div>

            <div className="border border-slate-200 p-5 bg-slate-50 space-y-2">
              <span className="font-mono text-[10px] text-red-700 font-bold uppercase block">// STATUS QUO: THE 2026 PROMISE GAP™</span>
              <p className="text-slate-700">High-budget AI initiatives stall before delivering production value.</p>
              <div className="pt-2 border-t border-slate-200 font-bold text-slate-950">
                ➔ INSPECTED STATE: Measurable ROI achieved within weeks, fully protecting leadership's strategic timeline.
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: THE INFRASTRUCTURE GAP --- */}
        <div className="mt-20 sm:mt-28 border border-slate-200 bg-white p-6 sm:p-10 relative overflow-hidden rounded-sm shadow-sm">
          <div className="absolute top-0 right-0 bg-slate-950 text-white font-mono text-[9px] font-bold px-3 py-1 tracking-wider uppercase">
            FLEET IT BENCHMARK TELEMETRY
          </div>

          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-red-700 font-mono text-[10px] font-bold tracking-widest uppercase block">
              // INDUSTRY BENCHMARK ANALYSIS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 leading-tight">
              THE INFRASTRUCTURE GAP: <span className="text-red-700">WHY AUTOMATION FAILS IN PRODUCTION.</span>
            </h3>
            <p className="text-slate-700 text-sm font-sans normal-case leading-relaxed font-normal">
              Data from over 500 enterprise organizations reveals why automated systems destabilize in production. Corporate automation goals evolve nearly twice as fast as the operational guardrails that guide them. Scaling automation without clear operating rules creates compounding risk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
            <div className="border border-slate-200 bg-slate-50 p-5 space-y-1 rounded-sm">
              <span className="text-slate-500 text-[10px] tracking-wider font-bold uppercase block">// TOP ENTERPRISE PRIORITY</span>
              <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">46.5%</div>
              <p className="text-xs text-slate-600 font-sans normal-case">Primary Focus: Scaling AI and Automated Workflows</p>
            </div>

            <div className="border border-red-200 bg-red-50/60 p-5 space-y-1 rounded-sm">
              <span className="text-red-700 text-[10px] tracking-wider font-bold uppercase block">// MISSING FOUNDATION</span>
              <div className="text-3xl sm:text-4xl font-black text-red-700 tracking-tight">29.6%</div>
              <p className="text-xs text-slate-800 font-sans normal-case">Missing Foundation: Establishing Systemic Safety and Control Rules</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            <span>SOURCE: FLEET IT RESEARCH BENCHMARK // 500+ ENTERPRISE LEADERS</span>
            <span className="text-red-700 font-bold">// THE PROMISE GAP™ ACCELERATOR</span>
          </div>
        </div>

        {/* --- SECTION 4: THREE STEPS TO CLOSE THE GAP --- */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-slate-200">
          <span className="text-red-700 font-mono text-xs font-bold tracking-widest block mb-3 uppercase">
            // RECOVERY FRAMEWORK
          </span>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4 text-slate-950 leading-tight">
            THREE STEPS TO <span className="text-red-700">CLOSE THE GAP.</span>
          </h3>
          <p className="text-base text-slate-700 font-normal max-w-3xl leading-relaxed mb-10">
            Restoring execution speed requires more than surface-level dashboards. True operational stabilization relies on three foundational steps:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="border border-slate-200 bg-white p-6 sm:p-8 space-y-3 rounded-sm shadow-sm">
              <div className="text-red-700 font-mono text-xs font-bold tracking-wider">// 01 // STEP ONE</div>
              <h4 className="text-lg font-bold text-slate-950 uppercase tracking-tight">QUANTIFY THE WASTE</h4>
              <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <strong className="text-slate-950">The Process Waste Tax Ledger:</strong> We eliminate guesswork by calculating financial exposure and labor wasted due to recurring operational failures.
              </p>
            </div>

            <div className="border border-slate-200 bg-white p-6 sm:p-8 space-y-4 flex flex-col justify-between h-full rounded-sm shadow-sm">
              <div className="space-y-3">
                <div className="text-red-700 font-mono text-xs font-bold tracking-wider">// 02 // STEP TWO</div>
                <h4 className="text-lg font-bold text-slate-950 uppercase tracking-tight">CLEAR DIRECTIVES</h4>
                <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                  <strong className="text-slate-950">Execution Runbooks:</strong> We translate operational friction into standardized, practical instructions your teams can use to reduce errors, cut rework, and stop validation fatigue.
                </p>
              </div>
              
              <div className="mt-4 p-4 bg-slate-100/80 border-l-2 border-red-700 font-mono text-[10px] text-slate-600 space-y-1">
                <span className="text-red-700 font-bold block uppercase tracking-wider">// ZERO SECURITY FOOTPRINT COMPLIANCE:</span>
                <p className="font-sans normal-case text-xs">
                  OUR DIAGNOSTIC DOES NOT CONNECT TO YOUR INFRASTRUCTURE. WE DO NOT VIEW YOUR INTERNAL ARCHITECTURE, AND WE NEVER ACCESS CONFIDENTIAL DATA.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-6 sm:p-8 space-y-3 rounded-sm shadow-sm">
              <div className="text-red-700 font-mono text-xs font-bold tracking-wider">// 03 // STEP THREE</div>
              <h4 className="text-lg font-bold text-slate-950 uppercase tracking-tight">DEPLOYMENT GATES</h4>
              <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <strong className="text-slate-950">Governance and Compliance:</strong> We establish mandatory verification rules before automation scales, ensuring systems execute only verified actions and do not compromise sensitive data.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {/* GHOST ADMIN SHORTCUT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        onClick={handleAdminNavigate} 
        className="fixed bottom-8 left-8 sm:bottom-10 sm:left-10 z-[10000] cursor-crosshair p-3 group transition-all"
      >
        <Shield size={18} className="text-slate-400 group-hover:text-red-700 transition-colors" />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-mono py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border-l-2 border-red-600 pointer-events-none">
          SYSTEM ACCESS REQUIRED // AUTH NODE 01
        </span>
      </motion.div>
    </div>
  );
}
