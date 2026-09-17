"use client";
import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Shield, Activity, MapPin, Database, Cpu, Lock, CheckCircle2, Award, Zap, FileText } from 'lucide-react';

export default function Methodology() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative flex flex-col">
      <Header />

      <main className="flex-grow pt-32 sm:pt-40 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative w-full">
        
        {/* --- HERO SECTION --- */}
        <div className="space-y-6 max-w-4xl">
          <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">
            BMR SOLUTIONS // METHODOLOGY AND CONTROL PLANE
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-950 leading-none">
            FORENSIC <span className="text-red-700">PHILOSOPHY.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal">
            The Promise Gap™ is not just about software bugs. It is a structural issue. We identify hidden process and data gaps that turn good plans into unreliable execution: untracked manual fixes, shifting data formats, outdated records, missing verification, and fragile workflow ownership.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-l-2 border-slate-300 pl-4">
            When these gaps are unmanaged, automated systems fail in real use. Fixing them becomes costly, teams lose momentum, and operational waste compounds.
          </p>
        </div>

        {/* --- CASE HIGHLIGHT CALLOUT --- */}
        <div className="mt-12 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-sm shadow-sm">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Recently, our team identified a major gap in how departments managed operational data. If left unaddressed, the executive team would have faced a costly reorganization to resolve recurring delays. By pinpointing root issues early, we helped the client avoid months of disruption and protected leadership's focus on growth.
          </p>
        </div>

        {/* --- FORENSIC VERTICALS GRID --- */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-100 p-4 border border-slate-200">
            <span className="text-red-700 font-bold block mb-1">// FINANCIAL SERVICES</span>
            <p className="text-slate-600 font-sans text-xs">Quantifying capital loss and model governance friction.</p>
          </div>
          <div className="bg-slate-100 p-4 border border-slate-200">
            <span className="text-red-700 font-bold block mb-1">// HEALTHCARE AND LIFE SCIENCES</span>
            <p className="text-slate-600 font-sans text-xs">Aligning outputs with HIPAA, BAA, and health privacy mandates.</p>
          </div>
          <div className="bg-slate-100 p-4 border border-slate-200">
            <span className="text-red-700 font-bold block mb-1">// INDUSTRIAL AND SUPPLY CHAIN</span>
            <p className="text-slate-600 font-sans text-xs">Eliminating operational downtime and unmapped bottlenecks.</p>
          </div>
          <div className="bg-slate-100 p-4 border border-slate-200">
            <span className="text-red-700 font-bold block mb-1">// SERVICES AND ENTERPRISE IT</span>
            <p className="text-slate-600 font-sans text-xs">Restoring billable margin efficiency and stopping validation fatigue.</p>
          </div>
        </div>

        {/* --- ORIGIN AND LEADERSHIP SECTION --- */}
        <div className="mt-20 pt-16 border-t border-slate-200 space-y-8">
          <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">
            // ORIGIN AND LEADERSHIP
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                BMR is built on over twenty years of technology leadership, including more than a decade at Microsoft supporting secure intelligence operations and delivering solutions across healthcare, manufacturing, government, education, and protected network environments. After handling over six hundred system recoveries, we developed this framework to close the Promise Gap™ and establish safeguards before automation affects your operations.
              </p>
              <p>
                Our hands-on experience is supported by formal advanced training in organizational leadership, management, and organizational design. This expertise strengthens our ability to map governance responsibilities, clarify decision rights, and establish operating controls that make automation reliable, predictable, and safe in production.
              </p>
              <p className="font-semibold text-slate-900 bg-slate-100 p-4 border-l-2 border-red-700">
                Our approach helps enterprise teams reduce unplanned downtime by up to 45 percent and save hundreds of thousands annually by identifying risks early and setting rules for fast recovery.
              </p>
            </div>

            <div className="lg:col-span-4 space-y-4 font-mono text-xs">
              <div className="border border-slate-200 bg-white p-4 space-y-1">
                <div className="flex items-center gap-2 text-red-700 font-bold">
                  <Lock size={16} /> GOVERNMENT-GRADE SECURITY
                </div>
                <p className="text-slate-600 font-sans text-xs">EXPERIENCE IN SECURE CLOUD AND AIR-GAPPED NETWORKS</p>
              </div>

              <div className="border border-slate-200 bg-white p-4 space-y-1">
                <div className="flex items-center gap-2 text-slate-950 font-bold">
                  <Activity size={16} /> PROVEN SYSTEM RECOVERY
                </div>
                <p className="text-slate-600 font-sans text-xs">TRACK RECORD OF OVER 600 MAJOR RECOVERIES</p>
              </div>

              <div className="border border-slate-200 bg-white p-4 space-y-1">
                <div className="flex items-center gap-2 text-slate-950 font-bold">
                  <Award size={16} /> PH.D. AND M.A. LEADERSHIP
                </div>
                <p className="text-slate-600 font-sans text-xs">ORGANIZATIONAL DESIGN AND SYSTEM GOVERNANCE EXPERTISE</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- DIAGNOSTIC CONTROL PLANE MODEL SECTION --- */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-slate-200 space-y-8">
          <div>
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
              OPERATIONAL DIAGNOSTIC FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950">
              THE PRE-AUTOMATION <span className="text-red-700">CONTROL PLANE.</span>
            </h2>
            <p className="text-slate-600 font-mono text-xs mt-2 uppercase tracking-wider">
              Architectural guardrails that prioritize time to reliability over time to market.
            </p>
          </div>

          {/* DIAGNOSTIC INPUT BOUNDARY CONDUIT */}
          <div className="bg-slate-100 border border-slate-300 p-4 text-center font-mono text-xs font-bold text-red-700 uppercase tracking-widest rounded-sm">
            ➔ ➔ ➔ ↓ DIAGNOSTIC INPUT BOUNDARY // INGESTION RISK REVIEW LAYER ➔ ➔ ➔
          </div>

          {/* 4 PILLARS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            {/* PILLAR 1 */}
            <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm">
              <span className="text-red-700 font-bold text-xs block">// 01 // MARGIN DEFENSE</span>
              <h3 className="text-lg font-black uppercase text-slate-950">MAP IT</h3>
              <span className="text-xs font-bold text-slate-700 block uppercase">Explicit Process Logic</span>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Document all decision trees, sentiment rules, and escalation limits. Tribal knowledge blocks automation.
              </p>
              <div className="bg-slate-50 p-3 border-l-2 border-red-700 text-[11px] font-sans text-slate-800">
                Rule: If a person cannot follow the process flow from beginning to end, automated execution will always fail.
              </div>
            </div>

            {/* PILLAR 2 */}
            <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm">
              <span className="text-slate-500 font-bold text-xs block">// 02 // DATA INTEGRITY SHIELD</span>
              <h3 className="text-lg font-black uppercase text-slate-950">FILTER IT</h3>
              <span className="text-xs font-bold text-slate-700 block uppercase">Zero Raw Ingestion</span>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Audit intake contracts to enforce strict schema validation. Sanitize inputs at entry to prevent context contamination before executing the payload.
              </p>
              <div className="bg-slate-50 p-3 border-l-2 border-slate-900 text-[11px] font-sans text-slate-800">
                Rule: Never allow unvalidated text or unstructured inputs to enter your business context memory directly.
              </div>
            </div>

            {/* PILLAR 3 */}
            <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm">
              <span className="text-red-700 font-bold text-xs block">// 03 // LIABILITY CEILING</span>
              <h3 className="text-lg font-black uppercase text-slate-950">GUARD IT</h3>
              <span className="text-xs font-bold text-slate-700 block uppercase">Programmatic Governance</span>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Specify Non-Human Identity (NHI) roles and define hard infrastructure-level API proxy limits. Natural language instructions cannot enforce corporate policy.
              </p>
              <div className="bg-slate-50 p-3 border-l-2 border-red-700 text-[11px] font-sans text-slate-800">
                Rule: Mandate hardcoded proxy specifications that physically block unauthorized actions regardless of model intent.
              </div>
            </div>

            {/* PILLAR 4 */}
            <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm">
              <span className="text-slate-500 font-bold text-xs block">// 04 // CAPITAL EXPOSURE SAFETY GATE</span>
              <h3 className="text-lg font-black uppercase text-slate-950">STAGE IT</h3>
              <span className="text-xs font-bold text-slate-700 block uppercase">Graduated Autonomy</span>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Audit and decouple reasoning from live execution. Route actions into draft shadow queues to verify stability against operational variance before granting system writes.
              </p>
              <div className="bg-slate-50 p-3 border-l-2 border-slate-900 text-[11px] font-sans text-slate-800">
                Rule: Write to the system of record only when the operational state is fully verified.
              </div>
            </div>
          </div>

          {/* GRADUATED AUTONOMY TIMELINE */}
          <div className="border border-slate-200 bg-white p-6 rounded-sm shadow-sm space-y-4">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">
              // GRADUATED TIMELINE BLUEPRINT
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-50 p-4 border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">PHASE 01</span>
                <span className="font-bold text-slate-950 block uppercase">1. HUMAN-IN-THE-LOOP SHADOW QUEUE</span>
                <span className="text-red-700 font-bold text-[10px] uppercase">98%+ verification target</span>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">PHASE 02</span>
                <span className="font-bold text-slate-950 block uppercase">2. CONFIDENCE-BASED AUTO-EXECUTION</span>
                <span className="text-slate-600 text-[10px] uppercase">Low-dollar / Low-risk automated</span>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200 border-l-4 border-l-emerald-600">
                <span className="text-emerald-700 font-bold block mb-1">PHASE 03</span>
                <span className="font-bold text-slate-950 block uppercase">3. VERIFIED AUTONOMOUS ACTION</span>
                <span className="text-emerald-700 font-bold text-[10px] uppercase">High-confidence automated writes</span>
              </div>
            </div>
          </div>

          {/* EXECUTIVE TAKEAWAY BANNER */}
          <div className="bg-slate-950 text-white p-6 sm:p-8 font-mono space-y-3 rounded-sm">
            <span className="text-red-500 font-bold text-xs tracking-widest uppercase block">
              // EXECUTIVE TAKEAWAY: REFRAME AI EXECUTION
            </span>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-sans">
              View AI as a bounded operational resource, not an unsupervised decision-maker. Set governance rules before automating, impose strict liability limits, and add mandatory verification checkpoints before expanding system use. BMR turns systemic friction into practical risk matrices, financial calculations, and deployment runbooks your teams can use directly, protecting your operating margin with no vendor lock-in.
            </p>
          </div>

          <div className="text-center font-mono text-xs text-slate-500 uppercase tracking-widest py-2">
            ↓ SYSTEM OF RECORD (CRM, TICKETING, CORE DATABASES)
          </div>
        </div>

        {/* --- NODE CAPABILITY MATRIX TABLE --- */}
        <div className="mt-20 pt-16 border-t border-slate-200 space-y-6">
          <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">
            // CONTROL PLANE MATRIX
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-950">
            OPERATIONAL NODE CAPABILITY MATRIX
          </h2>

          <div className="overflow-x-auto border border-slate-200 bg-white font-mono text-xs rounded-sm shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="p-4 border-r border-slate-200">CONTROL PLANE NODE</th>
                  <th className="p-4 border-r border-slate-200">PRIMARY FOCUS</th>
                  <th className="p-4 border-r border-slate-200">CORE ENTERPRISE DELIVERABLES</th>
                  <th className="p-4">RISK MITIGATION OUTCOME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-red-700 border-r border-slate-200">NODE 01 // Executive and Governance</td>
                  <td className="p-4 border-r border-slate-200">Fiduciary & Governance Risk</td>
                  <td className="p-4 font-sans border-r border-slate-200"><strong>Board Risk Audits</strong>, Deployment Gates, and Process Waste Tax Calculations</td>
                  <td className="p-4 font-sans text-xs">Eliminates unplanned recovery cycles and protects board-level AI goals.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-950 border-r border-slate-200">NODE 02 // Engineering and Infrastructure</td>
                  <td className="p-4 border-r border-slate-200">Delivery, Workflow Safety, & Data Drift</td>
                  <td className="p-4 font-sans border-r border-slate-200"><strong>Data Format Validation Checks</strong>, Track 01 Integration Specifications, and Infrastructure Hardening Rules</td>
                  <td className="p-4 font-sans text-xs">Prevents unmonitored schema mutation and silent data drift failures.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-950 border-r border-slate-200">NODE 03 // Operations and Management</td>
                  <td className="p-4 border-r border-slate-200">Alert Noise & Manual Validation Fatigue</td>
                  <td className="p-4 font-sans border-r border-slate-200"><strong>Validation Fatigue Audits</strong>, Track 02 Dependency Isolation, and Execution Runbooks</td>
                  <td className="p-4 font-sans text-xs">Eliminates manual validation fatigue and cuts operational downtime.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- NODE DETAILS BREAKDOWN --- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {/* NODE 01 */}
          <div className="bg-white border border-slate-200 p-6 space-y-4 rounded-sm shadow-sm">
            <span className="font-mono text-[10px] text-red-700 font-bold block uppercase tracking-wider">NODE_01 // PH.D. LEADERSHIP</span>
            <h3 className="font-black text-lg text-slate-950 uppercase tracking-tight">EXECUTIVE AND LEADERSHIP</h3>
            <span className="font-mono text-xs text-slate-500 uppercase block font-bold">FIDUCIARY AND GOVERNANCE RISK</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              We find the specific process gaps and unmanaged governance risks that lead to the Promise Gap™. Our diagnostic protects executive governance by pinpointing your Process Waste Tax before automation failures trigger delays, escalations, or unplanned recovery cycles.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-2 font-mono text-xs">
              <span className="text-red-700 font-bold block uppercase text-[10px]">// KEY DELIVERABLES</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Board Risk Audits:</strong> Priority risks and actionable recommendations</li>
                <li>• <strong>Deployment Gates:</strong> Mandatory safeguards required before major rollouts</li>
                <li>• <strong>Process Waste Tax Calculations:</strong> Quantifying hidden financial loss and labor waste</li>
              </ul>
            </div>
          </div>

          {/* NODE 02 */}
          <div className="bg-white border border-slate-200 p-6 space-y-4 rounded-sm shadow-sm">
            <span className="font-mono text-[10px] text-slate-500 font-bold block uppercase tracking-wider">NODE_02 // FEDERAL ENGINEERING</span>
            <h3 className="font-black text-lg text-slate-950 uppercase tracking-tight">ENGINEERING AND INFRASTRUCTURE</h3>
            <span className="font-mono text-xs text-slate-500 uppercase block font-bold">WORKFLOW SAFETY AND DATA DRIFT</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              We review delivery pipeline and data flow setup for hidden vulnerabilities. We identify where unexpected changes and inconsistent inputs create failure conditions, and we provide code-backed rules to prevent repeat breakdowns.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-2 font-mono text-xs">
              <span className="text-slate-900 font-bold block uppercase text-[10px]">// KEY DELIVERABLES</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Data Format Validation Checks:</strong> Systemic input verification rules</li>
                <li>• <strong>Track 01 Integration Rules:</strong> Standardized data delivery protocols</li>
                <li>• <strong>Infrastructure Hardening:</strong> Resilient operational architecture</li>
              </ul>
            </div>
          </div>

          {/* NODE 03 */}
          <div className="bg-white border border-slate-200 p-6 space-y-4 rounded-sm shadow-sm">
            <span className="font-mono text-[10px] text-slate-500 font-bold block uppercase tracking-wider">NODE_03 // M.A. LEADERSHIP AND DESIGN</span>
            <h3 className="font-black text-lg text-slate-950 uppercase tracking-tight">OPERATIONS AND MANAGEMENT</h3>
            <span className="font-mono text-xs text-slate-500 uppercase block font-bold">ALERT NOISE AND MANUAL FATIGUE</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              We track operational alert fatigue and undocumented manual workflows that keep fragile integrations running. Our diagnostic highlights the hidden labor required to maintain instability and produces runbooks to restore speed.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-2 font-mono text-xs">
              <span className="text-slate-900 font-bold block uppercase text-[10px]">// KEY DELIVERABLES</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Validation Fatigue Audits:</strong> Measuring manual intervention overhead</li>
                <li>• <strong>Track 02 Dependency Isolation:</strong> Reducing critical operational coupling</li>
                <li>• <strong>Governance Guidelines:</strong> Clear protocols for execution stability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- FOUR PHASE DIAGNOSTIC PROCESS --- */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-slate-200 space-y-8">
          <div className="space-y-2">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">
              VERIFIED TELEMETRY ANCHOR // FLEET IT RESEARCH BENCHMARK // 500+ ENTERPRISE LEADERS AUDITED
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-slate-950">
              THE FOUR-PHASE <span className="text-red-700">DIAGNOSTIC PROCESS.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans max-w-4xl">
              Our evaluation does not require complex network setups. We use a rapid 10-question assessment and a detailed 90-point logic review to identify systemic risks from your operational inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="border border-slate-200 bg-white p-6 space-y-2 rounded-sm shadow-sm">
              <span className="text-red-700 font-bold block">PHASE_01</span>
              <h4 className="font-bold text-slate-950 uppercase text-sm">TRIAGE (INITIAL CHECK)</h4>
              <p className="text-slate-600 font-sans text-xs">A 10-question assessment completed in under three minutes to identify primary workflow breaks.</p>
            </div>

            <div className="border border-slate-200 bg-white p-6 space-y-2 rounded-sm shadow-sm">
              <span className="text-slate-500 font-bold block">PHASE_02</span>
              <h4 className="font-bold text-slate-950 uppercase text-sm">ANALYSIS (DEEP EVALUATION)</h4>
              <p className="text-slate-600 font-sans text-xs">We review your operational inputs using a 90-point logic framework to calculate your exact Process Waste Tax.</p>
            </div>

            <div className="border border-slate-200 bg-white p-6 space-y-2 rounded-sm shadow-sm">
              <span className="text-red-700 font-bold block">PHASE_03</span>
              <h4 className="font-bold text-slate-950 uppercase text-sm">FINDINGS (CLEAR MAPPING)</h4>
              <p className="text-slate-600 font-sans text-xs">You receive a clear breakdown of where unmapped workflows and changing inputs drain your operating budget.</p>
            </div>

            <div className="border border-slate-200 bg-white p-6 space-y-2 rounded-sm shadow-sm border-t-4 border-t-red-700">
              <span className="text-red-700 font-bold block">PHASE_04</span>
              <h4 className="font-bold text-slate-950 uppercase text-sm">ACTION (DELIVERY AND HAND-OFF)</h4>
              <p className="text-slate-600 font-sans text-xs">We deliver execution-ready rules, risk matrices, and deployment gates your team can implement directly. BMR provides independent oversight with zero long-term vendor lock-in.</p>
            </div>
          </div>
        </div>

        {/* --- SAMPLE DIAGNOSTIC OUTPUT PREVIEW --- */}
        <div className="mt-16 border border-slate-200 bg-slate-950 text-slate-300 p-6 sm:p-10 font-mono rounded-sm shadow-md space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-4">
            <span className="text-red-500 font-bold text-xs uppercase tracking-widest">// SAMPLE DIAGNOSTIC BLUEPRINT OUTPUT PREVIEW</span>
            <span className="text-xs text-slate-500">SECURE PREVIEW // NODE 01 TO 03</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">REWORK TAX ESTIMATE:</span>
              <span className="text-red-400 font-bold">$240,000 / ANNUALLY (32 PERCENT REPEAT REWORK)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">SYSTEMIC FRICTION LAYER:</span>
              <span className="text-white font-bold">LEVEL 2 PIPELINE UNMONITORED WORKFLOW DRIFT</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">DEPLOYMENT GATE MANDATE:</span>
              <span className="text-emerald-400 font-bold">ENFORCE INPUT FORMAT VALIDATION (NODE 02)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">COMPLIANCE VERIFICATION:</span>
              <span className="text-emerald-400 font-bold">ZERO SECURITY FOOTPRINT CONFIRMED (SOC 2 / HIPAA / ISO 27001)</span>
            </div>
          </div>
        </div>

        {/* --- COMPLIANCE AND PROCUREMENT ACCELERATOR --- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          <div className="border border-slate-200 bg-white p-6 space-y-3 rounded-sm shadow-sm">
            <span className="text-red-700 font-bold uppercase block">// ZERO SECURITY FOOTPRINT & EXPEDITED PROCUREMENT</span>
            <p className="text-slate-700 font-sans leading-relaxed">
              Our assessment runs completely separate from your active networks and never accesses confidential data. Since BMR uses only structured diagnostic inputs, our engagement bypasses lengthy InfoSec reviews for expedited procurement.
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-6 space-y-3 rounded-sm shadow-sm">
            <span className="text-red-700 font-bold uppercase block">// THE COST OF INACTION</span>
            <p className="text-slate-700 font-sans leading-relaxed">
              For every million dollars spent on automation, unmapped workflow breaks can cost hundreds of thousands each year in Process Waste Tax. Closing the Promise Gap™ protects your corporate technology investments.
            </p>
            <span className="text-emerald-700 font-bold block pt-2">// ZERO INFOSEC DELAY</span>
          </div>
        </div>

        {/* --- COST OF INACTION / CTA --- */}
        <div className="mt-20 pt-16 border-t border-slate-200 text-center space-y-6">
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
            THE COST OF INACTION
          </h3>
          <p className="text-slate-700 font-sans max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            For every million dollars spent on automation, unmapped workflow breaks can cost hundreds of thousands each year in Process Waste Tax. Closing the Promise Gap™ protects your corporate technology investments.
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              onClick={() => router.push('/pulse-check')}
              className="bg-slate-950 text-white px-10 py-5 text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-md cursor-pointer"
            >
              CALCULATE YOUR PROCESS WASTE TAX
            </button>

            <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">
              10-QUESTION ASSESSMENT // ZERO SYSTEM CONNECTIONS // PRELIMINARY DIAGNOSTIC RESULTS
            </span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
