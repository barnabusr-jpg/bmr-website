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
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-950 selection:text-red-200 overflow-x-hidden relative flex flex-col">
      <Header />
      
      {/* --- HERO / HOOK SECTION --- */}
      <main className="flex-grow pt-32 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
          
          {/* LEFT COLUMN: THE HOOK */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            <div className="border-l-4 border-red-600 pl-4 sm:pl-8">
              <span className="text-red-500 font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase block mb-3">
                NODE ACCESS: BMR SOLUTIONS PRE-AUTOMATION CONTROL PLANE
              </span>
              <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-black uppercase tracking-tight leading-none text-white">
                BRIDGE THE<br />
                <span className="text-red-500">PROMISE GAP™.</span><br />
                MAKE AI EXECUTION<br />
                RELIABLE & PREDICTABLE.
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed font-normal">
                Many companies expected AI agents and workspace Copilots to deliver instant results. Instead, leaders now face the Promise Gap™: a widening gap between their AI goals and the reality of system errors, changing data formats, and ongoing developer fixes.
              </p>
              
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed font-normal border-l-2 border-slate-800 pl-4">
                For example, one retail organization recently struggled with inconsistent product recommendations after deploying AI-powered agents. By systematically mapping their workflows and identifying the root causes, they cut repeated developer hours by 30% and stabilized their customer-facing tools in just a few weeks. We find the root causes, calculate your Process Waste Tax, and give your team clear steps they can use immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4 w-full">
              <button 
                onClick={() => router.push('/pulse-check')} 
                className="group relative w-full sm:w-auto bg-red-600 text-white px-8 sm:px-12 py-5 text-lg font-bold uppercase tracking-wider hover:bg-white hover:text-red-600 transition-all shadow-xl border border-red-600 cursor-pointer text-center"
              >
                EXECUTE STRATEGY
                <Target className="hidden sm:block absolute -top-3 -right-3 text-white group-hover:text-red-600 transition-all" size={24} />
              </button>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] tracking-wider font-semibold uppercase">
                  <Activity size={14} className="animate-pulse text-red-500 shrink-0" />
                  10-QUESTION ASSESSMENT // 3-MINUTE DIAGNOSTIC
                </div>
                <p className="text-red-500 font-mono text-[9px] tracking-wider font-medium uppercase">
                  INSTANT RECOVERY BLUEPRINT GENERATED
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE REWORK TAX SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-10 shadow-xl rounded-sm relative group">
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-500/40 group-hover:border-red-500 transition-colors" />
              
              <h2 className="text-3xl sm:text-4xl font-black text-red-500 uppercase tracking-tight leading-none mb-6">
                THE PROCESS<br />WASTE TAX.
              </h2>

              <div className="space-y-6 border-l-2 border-red-500/30 pl-4 sm:pl-6">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  Your engineering team may be spending thousands fixing the same technical problems again and again. These hidden costs come from AI tools running on changing data formats, unmapped workflows, and unreliable alerts.
                </p>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal bg-slate-950/60 p-4 border border-slate-800/60">
                  On average, our clients reduce repeat developer hours by 25% to 40% within the first quarter—yielding typical annual savings of $150,000 to $350,000 depending on team size and complexity. We show you exactly where money is lost and give you a clear, step-by-step plan to fix it.
                </p>
                
                <div className="pt-2">
                  <span className="text-white font-bold text-lg uppercase tracking-wide block">
                    YOU CAN <span className="text-red-500 underline decoration-2 underline-offset-4">REGAIN LOST SPEED.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: THE THREE ENTERPRISE LEVELS --- */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-slate-800/80">
          <div className="max-w-4xl">
            <span className="text-red-500 font-mono text-xs font-semibold tracking-widest uppercase block mb-3">
              // CORE OPERATIONAL REALITY MODEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6 text-white leading-tight">
              THE CORE OPERATIONAL REALITY:<br />THE THREE <span className="text-red-500">ENTERPRISE LEVELS.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
              Many business leaders think engineering waste and fragile AI systems are just part of doing business. But that is not the case. Capital loss actually happens in the unmapped middle layer between executive vision and daily machine operations.
            </p>
          </div>

          {/* THE THREE LEVELS STACK LAYOUT */}
          <div className="grid grid-cols-1 gap-4 font-mono text-xs mt-8">
            {/* LEVEL 1 */}
            <div className="border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-sm">
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 bg-slate-950 border border-slate-800 text-slate-400 shrink-0"><LayoutGrid size={20} /></div>
                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">// LEVEL 1: STRATEGIC GOVERNANCE (C-SUITE VISION)</h3>
                  <p className="text-slate-400 font-sans mt-1 text-xs font-normal">This top level sets corporate policy, safety rules, and board-level AI goals.</p>
                </div>
              </div>
              <span className="text-slate-500 tracking-wider text-[10px] hidden md:inline shrink-0 uppercase">RISK: PROMISE GAP™ APPEARS HERE</span>
            </div>

            {/* INTERSECTING CONNECTIVE GAP */}
            <div className="flex items-center gap-3 px-4 py-1 text-red-500 font-mono">
              <Milestone size={14} className="shrink-0" />
              <span className="text-[10px] tracking-wider font-semibold uppercase">WARNING: EXPECTATIONS DO NOT MATCH RUNTIME REALITY</span>
            </div>

            {/* LEVEL 2 - THE FRICTION LAYER */}
            <div className="border border-red-500/60 bg-red-950/10 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden rounded-sm">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-3 py-0.5 tracking-wider uppercase">
                FRICTION LAYER
              </div>
              <div className="flex items-start sm:items-center gap-4 pt-2 sm:pt-0">
                <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-400 shrink-0"><Layers size={20} /></div>
                <div>
                  <h3 className="text-red-400 font-bold text-xs sm:text-sm tracking-wider uppercase">// LEVEL 2: THE ENGINEERING PIPELINE</h3>
                  <p className="text-slate-300 font-sans mt-1 text-xs font-normal max-w-2xl">This middle level is where engineers turn business ideas into code and fix broken data paths. This extra work leads to silent failures and wastes valuable engineering time.</p>
                </div>
              </div>
              <span className="text-red-400 font-bold tracking-wider text-[10px] hidden md:inline animate-pulse shrink-0 uppercase">RISK: CAPITAL LOSS & SLOWER OPERATIONS</span>
            </div>

            {/* INTERSECTING CONNECTIVE GAP */}
            <div className="flex items-center gap-3 px-4 py-1 text-red-500 font-mono">
              <Milestone size={14} className="shrink-0" />
              <span className="text-[10px] tracking-wider font-semibold uppercase">WARNING: UNMONITORED SCHEMA MUTATION & DRIFT</span>
            </div>

            {/* LEVEL 3 */}
            <div className="border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-sm">
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 bg-slate-950 border border-slate-800 text-slate-400 shrink-0"><Cpu size={20} /></div>
                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">// LEVEL 3: OPERATIONAL RUNTIME (LIVE MACHINE EXECUTION)</h3>
                  <p className="text-slate-400 font-sans mt-1 text-xs font-normal">This bottom level handles live databases, automated workflows, search engines, and autonomous AI agents.</p>
                </div>
              </div>
              <span className="text-slate-500 tracking-wider text-[10px] hidden md:inline shrink-0 uppercase">MACHINE EXECUTION LAYER</span>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE INFRASTRUCTURE GAP --- */}
        <div className="mt-20 sm:mt-28 border border-slate-800/80 bg-slate-900/40 p-6 sm:p-10 relative overflow-hidden rounded-sm">
          <div className="absolute top-0 right-0 bg-red-600 text-white font-mono text-[9px] font-bold px-3 py-1 tracking-wider uppercase">
            FLEET IT BENCHMARK TELEMETRY
          </div>

          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-red-500 font-mono text-[10px] font-semibold tracking-widest uppercase block">
              // INDUSTRY BENCHMARK ANALYSIS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              THE INFRASTRUCTURE GAP: <span className="text-red-500">WHY AI FAILS IN PRODUCTION.</span>
            </h3>
            <p className="text-slate-300 text-sm font-sans normal-case leading-relaxed font-normal">
              Data from over 500 IT organizations shows why AI agents often fail in real-world situations: company AI goals change almost twice as fast as the safety rules meant to guide them. If you scale automation without clear, code-based rules, your business faces serious operational risks. As a first step, we recommend auditing your current safety rules and documenting where they lag behind recent AI initiatives.
            </p>
          </div>

          {/* SPLIT METRIC DISPLAY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
            <div className="border border-slate-800/80 bg-slate-950/60 p-5 space-y-1 rounded-sm">
              <span className="text-slate-500 text-[10px] tracking-wider font-semibold uppercase block">// TOP ENTERPRISE PRIORITY</span>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">46.5%</div>
              <p className="text-xs text-slate-400 font-sans normal-case">Focus on AI-driven automation</p>
            </div>

            <div className="border border-red-500/30 bg-red-950/20 p-5 space-y-1 rounded-sm">
              <span className="text-red-400 text-[10px] tracking-wider font-semibold uppercase block">// MISSING FOUNDATION</span>
              <div className="text-3xl sm:text-4xl font-bold text-red-500 tracking-tight">29.6%</div>
              <p className="text-xs text-slate-300 font-sans normal-case">Focus on building infrastructure safety rules</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            <span>SOURCE: FLEET IT RESEARCH BENCHMARK // 500+ ENTERPRISE IT LEADERS ACROSS MULTIPLE INDUSTRIES</span>
            <span className="text-red-500 font-bold">// THE PROMISE GAP™ ACCELERATOR</span>
          </div>
        </div>

        {/* --- SECTION 3: THREE STEPS TO CLOSE THE GAP --- */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-slate-800/80">
          <span className="text-red-500 font-mono text-xs font-semibold tracking-widest block mb-3 uppercase">
            // RECOVERY FRAMEWORK
          </span>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4 text-white leading-tight">
            THREE STEPS TO <span className="text-red-500">CLOSE THE GAP.</span>
          </h3>
          <p className="text-base text-slate-300 font-normal max-w-3xl leading-relaxed mb-10">
            Fixing AI execution requires more than basic monitoring or surface-level dashboards. True recovery requires three foundational steps:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* STEP 1 */}
            <div className="border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 space-y-3 rounded-sm">
              <div className="text-red-500 font-mono text-xs font-semibold tracking-wider">// 01 // STEP ONE</div>
              <h4 className="text-lg font-bold text-white uppercase tracking-tight">QUANTIFY THE WASTE</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                <strong className="text-white">The Process Waste Tax Ledger:</strong> We eliminate guesswork by calculating the exact financial exposure and wasted labor hours caused by broken data pipelines and manual checking.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 space-y-4 flex flex-col justify-between h-full rounded-sm">
              <div className="space-y-3">
                <div className="text-red-500 font-mono text-xs font-semibold tracking-wider">// 02 // STEP TWO</div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight">CLEAR DIRECTIVES</h4>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  <strong className="text-white">Execution Runbooks:</strong> We translate engineering challenges into code-based rules that fix data drift, cut out alert noise, and prevent manual validation fatigue.
                </p>
              </div>
              
              {/* ZERO SECURITY FOOTPRINT COMPLIANCE */}
              <div className="mt-4 p-4 bg-slate-950/80 border-l-2 border-red-500 font-mono text-[10px] text-slate-400 space-y-1">
                <span className="text-red-400 font-bold block uppercase tracking-wider">// ZERO SECURITY FOOTPRINT COMPLIANCE:</span>
                <p className="font-sans normal-case text-xs">
                  OUR SYSTEM DOES NOT CONNECT TO YOUR INFRASTRUCTURE. WE DO NOT VIEW YOUR INTERNAL ARCHITECTURE, AND WE NEVER TOUCH YOUR CONFIDENTIAL DATA.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 space-y-3 rounded-sm">
              <div className="text-red-500 font-mono text-xs font-semibold tracking-wider">// 03 // STEP THREE</div>
              <h4 className="text-lg font-bold text-white uppercase tracking-tight">DEPLOYMENT GATES</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                <strong className="text-white">Governance & Compliance:</strong> We set mandatory rules before automation scales, ensuring AI agents only execute verified actions and never access restricted data.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {/* GHOST ADMIN SHORTCUT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        onClick={() => router.push('/admin/dashboard')} 
        className="fixed bottom-8 left-8 sm:bottom-10 sm:left-10 z-[10000] cursor-crosshair p-3 group transition-all"
      >
        <Shield size={18} className="text-slate-600 group-hover:text-red-500 transition-colors" />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-mono py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border-l-2 border-red-500 pointer-events-none">
          SYSTEM ACCESS REQUIRED // AUTH NODE 01
        </span>
      </motion.div>
    </div>
  );
}
