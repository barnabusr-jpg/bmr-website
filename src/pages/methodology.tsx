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
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black">
      <Header />
      
      <main className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto italic">
        {/* --- SECTION I: FORENSIC PHILOSOPHY & ORIGIN --- */}
        <section className="mb-24 sm:mb-32 italic">
          <div className="border-l-4 sm:border-l-8 border-red-600 pl-4 sm:pl-10 mb-12 sm:mb-16 italic text-left">
            <span className="text-red-600 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.4em] italic uppercase block">
              BMR SOLUTIONS // METHODOLOGY AND CONTROL PLANE
            </span>
            
            <h1 className="font-black tracking-[0.02em] leading-[0.85] sm:leading-[0.8] mt-4 sm:mt-6 mb-6 sm:mb-10 italic uppercase break-words">
              <span className="text-[clamp(2.5rem,8vw,7rem)] block">FORENSIC</span>
              <span className="text-red-600 text-[clamp(2.5rem,9.5vw,8rem)] block leading-tight sm:leading-none whitespace-normal sm:whitespace-nowrap sm:-ml-1">
                PHILOSOPHY.
              </span>
            </h1>
            
            <div className="space-y-6">
              <p className="text-lg sm:text-2xl md:text-3xl text-white max-w-4xl leading-tight font-black italic normal-case">
                Systemic risk goes beyond software bugs. It is a deeper, structural issue. We find process and data gaps, such as undocumented manual overrides, API schema drift, legacy data mismatches, or missing validation checks, before they can disrupt your automated systems or cause business problems.
              </p>
              
              <p className="text-base sm:text-xl text-slate-400 max-w-4xl leading-relaxed font-normal italic normal-case border-l-2 border-slate-800 pl-4">
                For example, in one recent engagement, our team identified an undocumented data mapping override in a client order processing system. Left unchecked, this mismatch would have caused thousands of failed transactions during a software upgrade, risking lost revenue and customer trust. These real-world risks can silently build up and trigger failures that impact operations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start italic">
            <div className="bg-slate-900/30 border border-slate-800 p-6 sm:p-10 shadow-2xl italic">
              <h4 className="text-red-600 font-mono text-[10px] font-black mb-4 sm:mb-6 tracking-widest italic uppercase">// ORIGIN AND LEADERSHIP</h4>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed normal-case font-medium italic">
                BMR is built on more than twenty years of technology leadership, including ten years at Microsoft and work protecting <span className="text-white font-black">U.S. Government Intelligence</span> in secure networks. After handling over six hundred system recoveries, we developed this framework to close the Promise Gap™ and set clear rules before automation affects production. Our approach has helped enterprise clients reduce unplanned downtime by up to 45 percent and lower annual operational costs by hundreds of thousands of dollars by proactively addressing hidden system risks.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6 italic">
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-900 pb-4 sm:pb-6 italic">
                <Shield className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-base sm:text-lg italic uppercase">GOVERNMENT-GRADE SECURITY</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic uppercase">EXPERIENCE IN SECURE CLOUD & AIR-GAPPED NETWORKS</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-900 pb-4 sm:pb-6 italic">
                <Briefcase className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-base sm:text-lg italic uppercase">PROVEN SYSTEM RECOVERY</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic uppercase">TRACK RECORD OF OVER 600 MAJOR SYSTEM RECOVERIES</p>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-900 pb-4 sm:pb-6 italic">
                <Scale className="text-red-600 shrink-0 italic" size={32} />
                <div>
                  <div className="text-white font-black text-base sm:text-lg italic uppercase tracking-tighter">PH.D. AND M.A. LEADERSHIP</div>
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic uppercase">SPECIALIZED EXPERTISE IN ORGANIZATIONAL DESIGN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION II: THE THREE ASSESSMENT NODES --- */}
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
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">// KEY DELIVERABLES</div>
                  {node.metrics.map((m, j) => (
                    <div key={j} className="flex items-start gap-3 text-[10px] font-black tracking-widest text-white italic normal-case leading-snug">
                      <Zap size={14} className="text-red-600 shrink-0 italic mt-0.5" /> 
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
          <div className="bg-slate-950 border-l-4 border-amber-500 p-6 sm:p-8 font-mono text-xs text-left space-y-3 italic shadow-2xl">
            <div className="flex items-center gap-2 text-amber-500 font-black tracking-widest text-xs uppercase">
              <ShieldAlert size={16} className="shrink-0" />
              // THE INFRASTRUCTURE GAP: INDUSTRY REALITY
            </div>
            
            <p className="text-slate-300 text-xs sm:text-sm font-sans normal-case italic font-normal leading-relaxed max-w-5xl">
              <strong className="text-white font-bold">Enterprise Data Insights:</strong> Enterprise data shows that AI automation moves almost twice as fast as the safety rules needed to control it. Deploying autonomous tools without clear, code-based rules makes the <span className="text-white font-bold underline decoration-amber-500/50">Promise Gap™</span> even wider. BMR turns complex operational problems into clear rules and deployment gates before your automation launches.
            </p>
            
            <div className="pt-2 text-[9px] text-slate-500 tracking-widest uppercase font-mono">
              VERIFIED TELEMETRY ANCHOR // FLEET IT RESEARCH BENCHMARK // 500+ ENTERPRISE IT LEADERS AUDITED
            </div>
          </div>
        </section>

        {/* --- SECTION III: THE FOUR-PHASE DIAGNOSTIC PROCESS --- */}
        <section className="mb-20 sm:mb-24 bg-white text-slate-950 p-6 sm:p-12 md:p-24 italic">
          <div className="max-w-4xl italic text-slate-950">
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black italic tracking-tighter leading-none mb-6 sm:mb-8 uppercase break-words">
              THE FOUR-PHASE <span className="text-red-600">DIAGNOSTIC PROCESS.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-bold text-slate-600 mb-6 normal-case italic leading-snug">
              Our evaluation does not need complex installations. We use a quick 10-question assessment and a detailed 90-point logic review to find system risks based on your input.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mb-12 sm:mb-16 normal-case italic font-medium leading-relaxed max-w-3xl">
              Typically, input is provided by representatives from key teams such as Engineering, IT Operations, Data Management, and department leads responsible for core workflows. The entire assessment process is designed for efficiency. Most organizations complete the initial 10-question assessment within one business day, and the full 90-point review is typically completed within 5 to 10 business days depending on complexity and team availability.
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
              <div className="text-red-500 font-black tracking-widest flex items-center gap-2 text-[10px] sm:text-xs uppercase">
                <Lock size={16} className="shrink-0" /> ZERO SECURITY FOOTPRINT COMPLIANCE
              </div>
              <p className="text-slate-400 text-xs normal-case font-sans italic font-medium max-w-4xl leading-relaxed">
                Our assessment process works completely separate from your active networks. We do not need network access, do not view your internal setup, and never access your enterprise data sources. The whole review uses only structured diagnostic inputs. BMR operates in alignment with leading industry compliance standards such as SOC 2 and ISO 27001. Our methodology can be tailored to support your unique requirements, including adapting deliverables for HIPAA or PCI DSS.
              </p>
            </div>
            <span className="text-slate-700 tracking-widest text-[9px] font-black hidden lg:inline shrink-0 uppercase">ISOLATED_EVALUATION_PROTOCOL</span>
          </div>
        </section>

        {/* --- SECTION IV: THE COST OF INACTION --- */}
        <section className="max-w-5xl mx-auto text-center border border-slate-800 p-8 sm:p-16 md:p-24 bg-slate-950/40 italic">
          <AlertCircle className="text-red-600 mx-auto mb-6 sm:mb-8 italic" size={48} />
          <h2 className="text-[clamp(1.8rem,4.5vw,3.75rem)] font-black italic tracking-tighter mb-6 sm:mb-8 text-white leading-none uppercase break-words">THE COST OF INACTION</h2>
          <p className="text-base sm:text-xl md:text-2xl text-slate-400 leading-snug mb-8 sm:mb-12 normal-case italic font-medium max-w-3xl mx-auto">
            For every million dollars spent on automation, unmapped system breaks can cost hundreds of thousands each year in Process Waste Tax. Closing the Promise Gap™ is key to protecting your company technology investments.
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
              10-QUESTION ASSESSMENT // ZERO SYSTEM CONNECTIONS // INSTANT RECOVERY BLUEPRINT
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
