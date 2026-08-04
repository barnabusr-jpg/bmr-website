"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Activity, Zap, Scale, Target, AlertCircle, Briefcase, Lock, ShieldAlert } from "lucide-react";

export default function Methodology() {
  const nodes = [
    {
      id: "NODE_01",
      title: "EXECUTIVE AND LEADERSHIP",
      focus: "FIDUCIARY AND GOVERNANCE RISK",
      lens: "PH.D. LEADERSHIP",
      description: "We find the specific process gaps and unmanaged risks that lead to the Promise Gap™. Our diagnostic helps protect executive governance by spotting your Process Waste Tax before automation issues cause expensive delays.",
      metrics: [
        "Board Risk Audits (roadmap of priority risks and actionable recommendations)",
        "Deployment Gates (safeguards required before major rollouts)",
        "Process Waste Tax Calculations (quantifying hidden financial losses)"
      ]
    },
    {
      id: "NODE_02",
      title: "ENGINEERING AND INFRASTRUCTURE",
      focus: "PIPELINE SAFETY AND DATA DRIFT",
      lens: "FEDERAL ENGINEERING",
      description: "We review your pipeline setup for hidden errors. We identify where unexpected API changes and data structure shifts cause failures, and we provide code-based rules to protect your automation.",
      metrics: [
        "Data Format Validation Checks",
        "Track 01 Integration Rules",
        "Infrastructure Hardening"
      ]
    },
    {
      id: "NODE_03",
      title: "OPERATIONS AND MANAGEMENT",
      focus: "ALERT NOISE AND MANUAL FATIGUE",
      lens: "M.A. LEADERSHIP AND DESIGN",
      description: "We track engineering alert fatigue and undocumented manual workflows. Our diagnostic shows the hidden work needed to keep fixing broken integrations and provides clear runbooks to cut down alert noise and restore engineering speed.",
      metrics: [
        "Validation Fatigue Audits",
        "Track 02 System Decoupling",
        "Governance Guidelines"
      ]
    }
  ];

  const phases = [
    { 
      step: "01", 
      title: "TRIAGE (INITIAL CHECK)", 
      detail: "A 10-question assessment completed in under three minutes to locate primary workflow breaks." 
    },
    { 
      step: "02", 
      title: "ANALYSIS (DEEP EVALUATION)", 
      detail: "We review your operational inputs using a 90-point logic framework to calculate your exact Process Waste Tax." 
    },
    { 
      step: "03", 
      title: "FINDINGS (CLEAR MAPPING)", 
      detail: "You get a clear breakdown that shows exactly where unmapped workflows and changing data structures are wasting your engineering budget." 
    },
    { 
      step: "04", 
      title: "ACTION (DELIVERY AND HAND-OFF)", 
      detail: "We provide clear, code-ready rules and deployment gates for your team to use right away. BMR finishes the delivery with no long-term vendor lock-in. Optional ongoing support and reassessments are available." 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      <Header />
      
      <main className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {/* --- SECTION I: FORENSIC PHILOSOPHY & ORIGIN --- */}
        <section className="mb-24 sm:mb-32">
          <div className="border-l-4 border-red-700 pl-4 sm:pl-8 mb-12 sm:mb-16 text-left">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-3">
              BMR SOLUTIONS // METHODOLOGY AND CONTROL PLANE
            </span>
            
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-none text-slate-950 mb-6">
              FORENSIC <span className="text-red-700">PHILOSOPHY.</span>
            </h1>
            
            <div className="space-y-6">
              <p className="text-lg sm:text-2xl text-slate-950 max-w-4xl leading-relaxed font-bold">
                Systemic risk goes beyond software bugs. It is a deeper, structural issue. We find process and data gaps, such as undocumented manual overrides, API schema drift, legacy data mismatches, or missing validation checks, before they can disrupt your automated systems or cause business problems.
              </p>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed font-normal border-l-2 border-slate-300 pl-4">
                For example, in one recent engagement, our team identified an undocumented data mapping override in a client order processing system. Left unchecked, this mismatch would have caused thousands of failed transactions during a software upgrade, risking lost revenue and customer trust. These real-world risks can silently build up and trigger failures that impact operations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="bg-white border border-slate-200 p-6 sm:p-10 shadow-sm rounded-sm">
              <h2 className="text-red-700 font-mono text-xs font-bold mb-4 tracking-widest uppercase">// ORIGIN AND LEADERSHIP</h2>
              <p className="text-slate-700 text-base leading-relaxed font-normal">
                BMR is built on more than twenty years of technology leadership, including ten years at Microsoft and work protecting <span className="text-slate-950 font-bold">U.S. Government Intelligence</span> in secure networks. After handling over six hundred system recoveries, we developed this framework to close the Promise Gap™ and set clear rules before automation affects production. Our approach has helped enterprise clients reduce unplanned downtime by up to 45 percent and lower annual operational costs by hundreds of thousands of dollars by proactively addressing hidden system risks.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-200 pb-4 sm:pb-6">
                <Shield className="text-red-700 shrink-0" size={28} />
                <div>
                  <div className="text-slate-950 font-bold text-base uppercase tracking-tight">GOVERNMENT-GRADE SECURITY</div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">EXPERIENCE IN SECURE CLOUD & AIR-GAPPED NETWORKS</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-200 pb-4 sm:pb-6">
                <Briefcase className="text-red-700 shrink-0" size={28} />
                <div>
                  <div className="text-slate-950 font-bold text-base uppercase tracking-tight">PROVEN SYSTEM RECOVERY</div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">TRACK RECORD OF OVER 600 MAJOR SYSTEM RECOVERIES</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-200 pb-4 sm:pb-6">
                <Scale className="text-red-700 shrink-0" size={28} />
                <div>
                  <div className="text-slate-950 font-bold text-base uppercase tracking-tight">PH.D. AND M.A. LEADERSHIP</div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">SPECIALIZED EXPERTISE IN ORGANIZATIONAL DESIGN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION II: THE THREE ASSESSMENT NODES --- */}
        <section className="mb-24 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {nodes.map((node) => (
              <div key={node.id} className="bg-white border border-slate-200 p-6 sm:p-8 shadow-sm rounded-sm relative group hover:border-red-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="text-red-700 font-mono text-[10px] font-bold tracking-wider mb-3 uppercase">{node.id} // {node.lens}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-950 mb-1">{node.title}</h3>
                  <p className="text-red-700 text-[10px] font-mono font-bold tracking-wider mb-6 uppercase">{node.focus}</p>
                  
                  <p className="text-slate-700 text-sm normal-case mb-8 leading-relaxed font-normal min-h-[90px]">
                    {node.description}
                  </p>
                </div>
                
                <div className="space-y-3 border-t border-slate-200 pt-6">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-bold">// KEY DELIVERABLES</div>
                  {node.metrics.map((m, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-slate-700 font-sans leading-snug">
                      <Zap size={14} className="text-red-700 shrink-0 mt-0.5" /> 
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- THE INFRASTRUCTURE GAP BANNER --- */}
        <section className="mb-20 sm:mb-24 max-w-7xl mx-auto">
          <div className="bg-amber-50/60 border-l-4 border-amber-600 p-6 sm:p-8 font-mono text-xs text-left space-y-3 shadow-sm rounded-sm border border-amber-200/60">
            <div className="flex items-center gap-2 text-amber-800 font-bold tracking-wider text-xs uppercase">
              <ShieldAlert size={16} className="shrink-0" />
              // THE INFRASTRUCTURE GAP: INDUSTRY REALITY
            </div>
            
            <p className="text-slate-800 text-xs sm:text-sm font-sans normal-case font-normal leading-relaxed max-w-5xl">
              <strong className="text-slate-950 font-bold">Enterprise Data Insights:</strong> Enterprise data shows that AI automation moves almost twice as fast as the safety rules needed to control it. Deploying autonomous tools without clear, code-based rules makes the <span className="text-slate-950 font-bold underline decoration-amber-500">Promise Gap™</span> even wider. BMR turns complex operational problems into clear rules and deployment gates before your automation launches.
            </p>
            
            <div className="pt-2 text-[10px] text-slate-500 tracking-wider uppercase font-mono font-semibold">
              VERIFIED TELEMETRY ANCHOR // FLEET IT RESEARCH BENCHMARK // 500+ ENTERPRISE IT LEADERS AUDITED
            </div>
          </div>
        </section>

        {/* --- SECTION III: THE FOUR-PHASE DIAGNOSTIC PROCESS --- */}
        <section className="mb-20 sm:mb-24 bg-white border border-slate-200 p-6 sm:p-12 md:p-16 rounded-sm shadow-sm">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6 text-slate-950 leading-tight">
              THE FOUR-PHASE <span className="text-red-700">DIAGNOSTIC PROCESS.</span>
            </h2>
            <p className="text-base sm:text-lg font-bold text-slate-800 mb-4 normal-case leading-relaxed">
              Our evaluation does not need complex installations. We use a quick 10-question assessment and a detailed 90-point logic review to find system risks based on your input.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mb-10 normal-case font-normal leading-relaxed max-w-3xl">
              Typically, input is provided by representatives from key teams such as Engineering, IT Operations, Data Management, and department leads responsible for core workflows. The entire assessment process is designed for efficiency. Most organizations complete the initial 10-question assessment within one business day, and the full 90-point review is typically completed within 5 to 10 business days depending on complexity and team availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((p) => (
              <div key={p.step} className="border-l-2 border-slate-300 pl-6 space-y-2">
                <div className="text-red-700 font-mono font-bold text-2xl uppercase">PHASE_{p.step}</div>
                <div className="text-sm font-bold uppercase tracking-wide text-slate-950">{p.title}</div>
                <p className="text-slate-600 text-xs font-sans normal-case font-normal leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- COMPLIANCE HIGHLIGHT --- */}
        <section className="mb-24 sm:mb-32 max-w-7xl mx-auto">
          <div className="bg-white border-l-4 border-red-700 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs rounded-sm border border-slate-200 shadow-sm">
            <div className="space-y-2">
              <div className="text-red-700 font-bold tracking-wider flex items-center gap-2 text-xs uppercase">
                <Lock size={16} className="shrink-0" /> ZERO SECURITY FOOTPRINT COMPLIANCE
              </div>
              <p className="text-slate-700 text-xs normal-case font-sans font-normal max-w-4xl leading-relaxed">
                Our assessment process works completely separate from your active networks. We do not need network access, do not view your internal setup, and never access your enterprise data sources. The whole review uses only structured diagnostic inputs. BMR operates in alignment with leading industry compliance standards such as SOC 2 and ISO 27001. Our methodology can be tailored to support your unique requirements, including adapting deliverables for HIPAA or PCI DSS.
              </p>
            </div>
            <span className="text-slate-500 tracking-wider text-[10px] hidden lg:inline shrink-0 uppercase font-bold">ISOLATED_EVALUATION_PROTOCOL</span>
          </div>
        </section>

        {/* --- SECTION IV: THE COST OF INACTION --- */}
        <section className="max-w-4xl mx-auto text-center border border-slate-200 p-8 sm:p-16 bg-white rounded-sm shadow-sm">
          <AlertCircle className="text-red-700 mx-auto mb-6" size={40} />
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6 text-slate-950 leading-none">THE COST OF INACTION</h2>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed mb-8 normal-case font-normal max-w-2xl mx-auto">
            For every million dollars spent on automation, unmapped system breaks can cost hundreds of thousands each year in Process Waste Tax. Closing the Promise Gap™ is key to protecting your company technology investments.
          </p>
            
          <div className="flex flex-col items-center gap-4 w-full">
            <button 
              onClick={() => window.location.href='/pulse-check'} 
              className="group relative bg-slate-950 text-white px-10 sm:px-16 py-5 text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-md cursor-pointer w-full sm:w-auto text-center"
            >
              EXECUTE STRATEGY
              <Target className="hidden sm:block absolute -top-3 -right-3 text-red-600 group-hover:text-white transition-all" size={24} />
            </button>
              
            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] tracking-wider font-bold uppercase text-center mt-2">
              <Activity size={14} className="animate-pulse text-red-700 shrink-0" />
              10-QUESTION ASSESSMENT // ZERO SYSTEM CONNECTIONS // INSTANT RECOVERY BLUEPRINT
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
