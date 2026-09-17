"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Activity, Scale, Target, AlertCircle, Briefcase, Lock, ShieldAlert, FileText, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Methodology() {
  const nodes = [
    {
      id: "NODE_01",
      title: "EXECUTIVE AND LEADERSHIP",
      focus: "FIDUCIARY AND GOVERNANCE RISK",
      lens: "PH.D. LEADERSHIP",
      description: "We find the specific process gaps and unmanaged governance risks that lead to the Promise Gap™. Our diagnostic protects executive governance by pinpointing your Process Waste Tax before automation failures trigger delays, escalations, or unplanned recovery cycles.",
      metrics: [
        "Board Risk Audits: Priority risks and actionable recommendations",
        "Deployment Gates: Mandatory safeguards required before major rollouts",
        "Process Waste Tax Calculations: Quantifying hidden financial loss and labor waste"
      ]
    },
    {
      id: "NODE_02",
      title: "ENGINEERING AND INFRASTRUCTURE",
      focus: "WORKFLOW SAFETY AND DATA DRIFT",
      lens: "FEDERAL ENGINEERING",
      description: "We review delivery pipeline and data flow setup for hidden vulnerabilities. We identify where unexpected changes and inconsistent inputs create failure conditions, and we provide code-backed rules to prevent repeat breakdowns.",
      metrics: [
        "Data Format Validation Checks: Systemic input verification rules",
        "Track 01 Integration Rules: Standardized data delivery protocols",
        "Infrastructure Hardening: Resilient operational architecture"
      ]
    },
    {
      id: "NODE_03",
      title: "OPERATIONS AND MANAGEMENT",
      focus: "ALERT NOISE AND MANUAL FATIGUE",
      lens: "M.A. LEADERSHIP AND DESIGN",
      description: "We track operational alert fatigue and undocumented manual workflows that keep fragile integrations running. Our diagnostic highlights the hidden labor required to maintain instability and produces runbooks to restore speed.",
      metrics: [
        "Validation Fatigue Audits: Measuring manual intervention overhead",
        "Track 02 Dependency Isolation: Reducing critical operational coupling",
        "Governance Guidelines: Clear protocols for execution stability"
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
      detail: "You receive a clear breakdown of where unmapped workflows and changing inputs drain your operating budget." 
    },
    { 
      step: "04", 
      title: "ACTION (DELIVERY AND HAND-OFF)", 
      detail: "We deliver execution-ready rules and deployment gates your team can implement immediately. BMR provides delivery with zero long-term vendor lock-in. Optional ongoing support and periodic reassessments are available." 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      <Header />

      <main className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-24 sm:space-y-32">
        
        {/* --- SECTION I: FORENSIC PHILOSOPHY & ORIGIN --- */}
        <section>
          <div className="border-l-4 border-red-700 pl-4 sm:pl-8 mb-12 sm:mb-16 text-left">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-3">
              BMR SOLUTIONS // METHODOLOGY AND CONTROL PLANE
            </span>

            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-none text-slate-950 mb-6">
              FORENSIC <span className="text-red-700">PHILOSOPHY.</span>
            </h1>

            <div className="space-y-6">
              <p className="text-lg sm:text-2xl text-slate-950 max-w-4xl leading-relaxed font-bold">
                The Promise Gap™ risk is not limited to software bugs. It is structural. We identify hidden process and data gaps that turn good intentions into unreliable execution: unmonitored manual fixes, shifting data formats, outdated records, missing verification checks, and fragile workflow ownership.
              </p>

              <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed font-normal border-l-2 border-slate-300 pl-4">
                When these gaps are left unmanaged, automated systems begin failing in production. Recovery becomes expensive, teams lose momentum, and operational waste compounds.
              </p>

              <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed font-normal border-l-2 border-slate-300 pl-4">
                Recently, our team identified a major gap in how different departments managed operational data. Had it remained unaddressed, the executive team would have faced a costly reorganization to resolve recurring delays. By pinpointing the root issue early, we helped the client avoid months of disruption and protected leadership focus on growth.
              </p>
            </div>

            {/* VERTICAL-SPECIFIC IMPACT SIGNALS */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px]">
              <div className="bg-white border border-slate-200 p-3 rounded-sm shadow-sm">
                <span className="text-red-700 font-bold block uppercase">// FINANCIAL SERVICES</span>
                <span className="text-slate-600">Quantifying capital loss and model governance friction.</span>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-sm shadow-sm">
                <span className="text-red-700 font-bold block uppercase">// HEALTHCARE AND LIFE SCIENCES</span>
                <span className="text-slate-600">Aligning outputs with HIPAA, BAA, and health privacy mandates.</span>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-sm shadow-sm">
                <span className="text-red-700 font-bold block uppercase">// INDUSTRIAL AND SUPPLY CHAIN</span>
                <span className="text-slate-600">Eliminating operational downtime and unmapped bottlenecks.</span>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-sm shadow-sm">
                <span className="text-red-700 font-bold block uppercase">// SERVICES AND ENTERPRISE IT</span>
                <span className="text-slate-600">Restoring billable margin efficiency and stopping validation fatigue.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start text-left">
            <div className="bg-white border border-slate-200 p-6 sm:p-10 shadow-sm rounded-sm">
              <h2 className="text-red-700 font-mono text-xs font-bold mb-4 tracking-widest uppercase">// ORIGIN AND LEADERSHIP</h2>
              <div className="space-y-4 text-slate-700 text-base leading-relaxed font-normal">
                <p>
                  BMR is built on more than twenty years of technology leadership, including over a decade at Microsoft supporting secure intelligence operations and delivering solutions across healthcare, manufacturing, State and Local Government and Education, and protected network environments. After handling over six hundred system recoveries, we developed this framework to close the Promise Gap™ and establish guardrails before automation impacts production.
                </p>
                <p>
                  This practical hands-on experience is supported by formal advanced training in organizational leadership, management, and organizational design. That expertise strengthens our ability to map governance responsibilities, clarify decision rights, and establish the operating controls that make automation reliable, predictable, and safe in production.
                </p>
                <p className="text-slate-950 font-bold">
                  Our approach helps enterprise teams reduce unplanned downtime by up to 45 percent and lower annual operational costs by hundreds of thousands of dollars through early risk detection and recovery-ready execution rules.
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-200 pb-4 sm:pb-6">
                <Shield className="text-red-700 shrink-0" size={28} />
                <div>
                  <div className="text-slate-950 font-bold text-base uppercase tracking-tight">GOVERNMENT-GRADE SECURITY</div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">EXPERIENCE IN SECURE CLOUD AND AIR-GAPPED NETWORKS</p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-200 pb-4 sm:pb-6">
                <Briefcase className="text-red-700 shrink-0" size={28} />
                <div>
                  <div className="text-slate-950 font-bold text-base uppercase tracking-tight">PROVEN SYSTEM RECOVERY</div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">TRACK RECORD OF OVER 600 MAJOR RECOVERIES</p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 items-center border-b border-slate-200 pb-4 sm:pb-6">
                <Scale className="text-red-700 shrink-0" size={28} />
                <div>
                  <div className="text-slate-950 font-bold text-base uppercase tracking-tight">PH.D. AND M.A. LEADERSHIP</div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">ORGANIZATIONAL DESIGN AND SYSTEM GOVERNANCE EXPERTISE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION II: THE PRE-AUTOMATION CONTROL PLANE (FRAMEWORK ENGINE) --- */}
        <section className="space-y-6 text-left">
          <div className="text-center py-2 space-y-1">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
              OPERATIONAL GOVERNANCE ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 leading-none">
              THE PRE-AUTOMATION <span className="text-red-700">CONTROL PLANE</span>
            </h2>
            <p className="text-slate-700 text-sm font-semibold mt-1.5 max-w-2xl mx-auto">
              Architectural Guardrails for Time-to-Reliability over Time-to-Market.
            </p>
          </div>

          {/* PIPELINE INGESTION CONDUIT */}
          <div className="relative bg-white border border-slate-300 rounded-sm p-3.5 flex items-center justify-between shadow-sm overflow-hidden">
            <div className="hidden sm:flex items-center space-x-1 border-r border-slate-300 pr-3 text-slate-400">
              <FileText size={20} className="text-slate-500" />
            </div>

            <div className="mx-auto flex items-center space-x-3 font-mono text-xs font-bold text-red-700 tracking-wider uppercase">
              <span className="text-slate-400">➔ ➔ ➔</span>
              <span>↓ INCOMING CUSTOMER PAYLOAD (Forms, Emails, Triage Data)</span>
              <span class="text-slate-400">➔ ➔ ➔</span>
            </div>

            <div className="hidden sm:flex items-center border-l border-slate-300 pl-3 text-slate-400">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
          </div>

          {/* 4 PILLARS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* PILLAR 1 */}
            <div className="bg-white border border-slate-200 border-t-4 border-t-red-700 rounded-sm p-5 flex flex-col justify-between shadow-sm space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold text-red-700 uppercase tracking-wider block">// 01 // PROCESS MATURITY</span>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">MAP IT</h3>
                <span class="text-xs font-bold text-slate-800 block">Explicit Process Logic</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Document all decision trees, sentiment rules, and escalation limits on paper. <em className="text-slate-800 font-medium">Tribal knowledge is an automation blocker.</em>
                </p>
              </div>
              <div className="bg-slate-100 border-l-2 border-red-700 p-3 text-xs font-semibold text-slate-950">
                If a person cannot follow the process, AI will always fail.
              </div>
            </div>

            {/* PILLAR 2 */}
            <div className="bg-white border border-slate-200 border-t-4 border-t-slate-950 rounded-sm p-5 flex flex-col justify-between shadow-sm space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider block">// 02 // CONTEXT ISOLATION</span>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">FILTER IT</h3>
                <span className="text-xs font-bold text-slate-800 block">Zero Raw Ingestion</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Enforce strict schema validation and intake contracts (e.g., Pydantic models). <em className="text-slate-800 font-medium">Sanitize context to prevent poisoning.</em>
                </p>
              </div>
              <div className="bg-slate-100 border-l-2 border-slate-950 p-3 text-xs font-semibold text-slate-950">
                Don't allow raw or unchecked text to go straight into RAG memory.
              </div>
            </div>

            {/* PILLAR 3 */}
            <div className="bg-white border border-slate-200 border-t-4 border-t-red-700 rounded-sm p-5 flex flex-col justify-between shadow-sm space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold text-red-700 uppercase tracking-wider block">// 03 // LIABILITY CONTROL</span>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">GUARD IT</h3>
                <span className="text-xs font-bold text-slate-800 block">Programmatic Governance</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Set up Non-Human Identities (NHIs) and enforce strict, infrastructure-level API proxy limits. <em className="text-slate-800 font-medium">Policy cannot be enforced by prompts.</em>
                </p>
              </div>
              <div className="bg-slate-100 border-l-2 border-red-700 p-3 text-xs font-semibold text-slate-950">
                The network proxy physically blocks actions that exceed set policy limits, regardless of LLM intent.
              </div>
            </div>

            {/* PILLAR 4 */}
            <div className="bg-white border border-slate-200 border-t-4 border-t-slate-950 rounded-sm p-5 flex flex-col justify-between shadow-sm space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider block">// 04 // SYSTEM INTEGRITY</span>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">STAGE IT</h3>
                <span className="text-xs font-bold text-slate-800 block">Graduated Autonomy</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Decouple task reasoning from execution. Route all automated writes into draft shadow queues for durable state persistence. <em className="text-slate-800 font-medium">Staging unlocks safe auto-execution.</em>
                </p>
              </div>
              <div className="bg-slate-100 border-l-2 border-slate-950 p-3 text-xs font-semibold text-slate-950">
                Write to the system of record only when the state is clearly defined.
              </div>
            </div>
          </div>

          {/* GRADUATED AUTONOMY TIMELINE */}
          <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-3 shadow-sm">
            <div className="text-center font-mono text-xs font-bold text-red-700 uppercase tracking-widest">// GRADUATED AUTONOMY TIMELINE</div>
            
            <div className="grid grid-cols-1 md:grid-cols-11 gap-2 items-center text-center">
              {/* Phase 1 */}
              <div className="md:col-span-3 bg-slate-50 border border-slate-200 p-4 rounded-sm flex items-center space-x-3 text-left">
                <div className="p-2 bg-red-100 text-red-700 rounded-full shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-red-700 uppercase block">PHASE 01</span>
                  <div className="font-black text-slate-950 text-xs uppercase">1. Human-in-the-Loop Shadow Queue</div>
                  <div className="text-[11px] text-slate-600 font-semibold">98%+ verification target</div>
                </div>
              </div>

              {/* Arrow Chevron 1 */}
              <div className="hidden md:flex justify-center text-slate-400 font-mono text-xl font-bold">
                <ArrowRight size={20} />
              </div>

              {/* Phase 2 */}
              <div className="md:col-span-3 bg-slate-50 border border-slate-200 p-4 rounded-sm flex items-center space-x-3 text-left">
                <div className="p-2 bg-slate-200 text-slate-700 rounded-full shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">PHASE 02</span>
                  <div className="font-black text-slate-950 text-xs uppercase">2. Confidence-Based Auto-Execution</div>
                  <div className="text-[11px] text-slate-600 font-semibold">Low-dollar / Low-risk automated</div>
                </div>
              </div>

              {/* Arrow Chevron 2 */}
              <div className="hidden md:flex justify-center text-slate-400 font-mono text-xl font-bold">
                <ArrowRight size={20} />
              </div>

              {/* Phase 3 */}
              <div className="md:col-span-3 bg-slate-50 border border-slate-200 p-4 rounded-sm flex items-center space-x-3 text-left">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-full shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase block">PHASE 03</span>
                  <div className="font-black text-slate-950 text-xs uppercase">3. Verified Autonomous Action</div>
                  <div className="text-[11px] text-slate-600 font-semibold">High-confidence automated writes</div>
                </div>
              </div>
            </div>
          </div>

          {/* EXECUTIVE SUMMARY BANNER */}
          <div className="bg-red-50/80 border border-red-200 rounded-sm p-4 space-y-1">
            <span className="font-mono text-xs font-bold text-red-700 uppercase tracking-wider block">// EXECUTIVE TAKEAWAY: REFRAME AI EXECUTION</span>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Treat AI as an intelligent assistant, not an unsupervised decision-maker. Let standard code handle 90% of predictable workflow rules (sorting, routing, and data cleaning), while reserving AI strictly for bounded tasks operating under clear safety limits. Establishing operational guardrails upfront stops costly, unmonitored runtime errors before they scale.
            </p>
          </div>

          {/* SYSTEM OF RECORD TARGET CONDUIT */}
          <div className="bg-slate-950 text-white rounded-sm p-3.5 text-center font-mono text-xs font-bold tracking-wider uppercase shadow-sm flex items-center justify-center space-x-3">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>↓ SYSTEM OF RECORD (CRM, Ticketing, Core Databases)</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
        </section>

        {/* --- SECTION III: CONTROL PLANE MATRIX (CAPABILITY TABLE) --- */}
        <section className="text-left">
          <div className="mb-6 space-y-1">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">// CONTROL PLANE MATRIX</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-950 tracking-tight">OPERATIONAL NODE CAPABILITY MATRIX</h2>
          </div>

          <div className="overflow-x-auto border border-slate-200 bg-white rounded-sm shadow-sm mb-12">
            <table className="w-full text-left font-sans text-xs sm:text-sm">
              <thead className="bg-slate-950 text-white font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-slate-800">Control Plane Node</th>
                  <th className="p-4 border-b border-slate-800">Primary Focus</th>
                  <th className="p-4 border-b border-slate-800">Core Enterprise Deliverables</th>
                  <th className="p-4 border-b border-slate-800">Risk Mitigation Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-950 font-mono text-xs">NODE 01 // Executive and Governance</td>
                  <td className="p-4 font-mono text-xs text-slate-500">Fiduciary and Risk Alignment</td>
                  <td className="p-4"><strong>Board Risk Audits</strong> and Process Waste Tax Calculation</td>
                  <td className="p-4">Eliminates unplanned recovery cycles and protects board-level AI goals.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-950 font-mono text-xs">NODE 02 // Engineering and Infrastructure</td>
                  <td className="p-4 font-mono text-xs text-slate-500">Delivery and Pipeline Safety</td>
                  <td className="p-4"><strong>Track 01 Integration Protocols</strong> and Format Checks</td>
                  <td className="p-4">Prevents unmonitored schema mutation and silent data drift failures.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-950 font-mono text-xs">NODE 03 // Operations and Management</td>
                  <td className="p-4 font-mono text-xs text-slate-500">Alert and Rework Optimization</td>
                  <td className="p-4"><strong>Track 02 Dependency Isolation</strong> and Execution Runbooks</td>
                  <td className="p-4">Eliminates manual validation fatigue and cuts operational downtime.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ASSESSMENT NODES CARDS */}
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
        <section className="max-w-7xl mx-auto">
          <div className="bg-amber-50/60 border-l-4 border-amber-600 p-6 sm:p-8 font-mono text-xs text-left space-y-3 shadow-sm rounded-sm border border-amber-200/60">
            <div className="flex items-center gap-2 text-amber-800 font-bold tracking-wider text-xs uppercase">
              <ShieldAlert size={16} className="shrink-0" />
              // THE INFRASTRUCTURE GAP: INDUSTRY REALITY
            </div>

            <p className="text-slate-800 text-xs sm:text-sm font-sans normal-case font-normal leading-relaxed max-w-5xl">
              Enterprise benchmark data shows corporate automation initiatives evolve nearly twice as fast as the safety rules required to control them. When teams deploy autonomous tools without verified operating rules, the <span className="text-slate-950 font-bold underline decoration-amber-500">Promise Gap™</span> widens. BMR translates operational friction into clear execution rules and verification gates before automation launches.
            </p>

            <div className="pt-2 text-[10px] text-slate-500 tracking-wider uppercase font-mono font-semibold">
              VERIFIED TELEMETRY ANCHOR // FLEET IT RESEARCH BENCHMARK // 500+ ENTERPRISE LEADERS AUDITED
            </div>
          </div>
        </section>

        {/* --- SECTION IV: THE FOUR-PHASE DIAGNOSTIC PROCESS --- */}
        <section className="bg-white border border-slate-200 p-6 sm:p-12 md:p-16 rounded-sm shadow-sm text-left">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6 text-slate-950 leading-tight">
              THE FOUR-PHASE <span className="text-red-700">DIAGNOSTIC PROCESS.</span>
            </h2>
            <p className="text-base sm:text-lg font-bold text-slate-800 mb-4 normal-case leading-relaxed">
              Our evaluation does not require complex network integrations. We use a rapid 10-question assessment and a detailed 90-point logic review to identify systemic risks based on your operational inputs.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mb-10 normal-case font-normal leading-relaxed max-w-3xl">
              Inputs come from key department leads across business units, technology operations, risk management, and core administrative workflows. Most organizations complete the initial 10-question assessment within one business day. The full 90-point evaluation typically completes within 5 to 10 business days depending on organization scale and team availability.
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

        {/* --- INPUT-OUTPUT ARTIFACT PREVIEW --- */}
        <section className="bg-slate-950 text-slate-100 p-6 sm:p-8 rounded-sm font-mono border border-slate-800 space-y-4 text-left shadow-sm">
          <div className="flex items-center justify-between text-xs text-red-500 font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
            <span className="flex items-center gap-2"><FileText size={16} /> SAMPLE DIAGNOSTIC BLUEPRINT OUTPUT</span>
            <span>SECURE PREVIEW // NODE 01 TO 03</span>
          </div>
          <div className="text-[11px] sm:text-xs leading-relaxed space-y-1 text-slate-300">
            <p className="text-slate-500">// AUDIT RESULT METRICS SUMMARY</p>
            <p><span className="text-slate-400">REWORK TAX ESTIMATE:</span>       <strong className="text-emerald-400">$240,000 / ANNUALLY</strong> (32 PERCENT REPEAT REWORK)</p>
            <p><span className="text-slate-400">SYSTEMIC FRICTION LAYER:</span>   LEVEL 2 PIPELINE UNMONITORED WORKFLOW DRIFT</p>
            <p><span className="text-slate-400">DEPLOYMENT GATE MANDATE:</span>   ENFORCE INPUT FORMAT VALIDATION (NODE 02)</p>
            <p><span className="text-slate-400">COMPLIANCE VERIFICATION:</span>   ZERO SECURITY FOOTPRINT CONFIRMED (SOC 2 / HIPAA / ISO 27001)</p>
          </div>
        </section>

        {/* --- COMPLIANCE & PROCUREMENT HIGHLIGHT --- */}
        <section className="max-w-7xl mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
            <div className="lg:col-span-8 bg-slate-900 text-white p-6 sm:p-8 border-l-4 border-red-600 space-y-4 rounded-sm shadow-sm border border-slate-800">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs tracking-wider uppercase">
                <Lock size={16} className="shrink-0" /> ZERO SECURITY FOOTPRINT COMPLIANCE
              </div>
              <p className="text-slate-300 text-xs sm:text-sm normal-case font-sans font-normal leading-relaxed">
                OUR ASSESSMENT PROCESS OPERATES COMPLETELY SEPARATE FROM YOUR ACTIVE NETWORKS. WE DO NOT REQUIRE NETWORK CONNECTIONS. WE DO NOT VIEW YOUR INTERNAL ARCHITECTURE. AND WE NEVER ACCESS YOUR CONFIDENTIAL DATA.
              </p>
              <p className="text-slate-400 text-xs normal-case font-sans font-normal leading-relaxed">
                The review uses only structured diagnostic inputs. BMR operates in alignment with leading industry compliance standards such as SOC 2 and ISO 27001. Our methodology is tailored to support regulated environments, including adaptations for HIPAA, PCI DSS, and health privacy mandates.
              </p>
            </div>

            <div className="lg:col-span-4 bg-red-950/30 border border-red-900/50 p-6 sm:p-8 space-y-3 rounded-sm flex flex-col justify-between shadow-sm">
              <div className="space-y-2">
                <span className="text-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Zap size={14} /> PROCUREMENT ACCELERATOR
                </span>
                <p className="text-xs font-sans text-slate-300 leading-relaxed">
                  Because BMR operates via structured diagnostic inputs with zero network connections, our engagement bypasses lengthy InfoSec architecture reviews. Most legal and risk teams approve our audit framework within 48 hours.
                </p>
              </div>
              <span className="text-[10px] text-red-400 uppercase font-bold">// ZERO INFOSEC DELAY</span>
            </div>
          </div>
        </section>

        {/* --- SECTION V: THE COST OF INACTION --- */}
        <section className="max-w-4xl mx-auto text-center border border-slate-200 p-8 sm:p-16 bg-white rounded-sm shadow-sm">
          <AlertCircle className="text-red-700 mx-auto mb-6" size={40} />
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6 text-slate-950 leading-none">THE COST OF INACTION</h2>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed mb-8 normal-case font-normal max-w-2xl mx-auto">
            For every million dollars spent on automation, unmapped workflow breaks can cost hundreds of thousands each year in Process Waste Tax. Closing the Promise Gap™ is how you protect your corporate technology investments.
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
