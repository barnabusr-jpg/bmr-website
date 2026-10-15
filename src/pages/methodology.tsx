import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Activity, Lock, Award, ChevronRight 
} from 'lucide-react';

export default function Methodology() {
  const router = useRouter();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "The Pre-Automation Control Plane Methodology to Bridge the Promise Gap",
    "description": "Architectural audit methodology bridging the Promise Gap, a proprietary trademarked framework establishing Level 2 interface insulation and policy ceilings for enterprise AI automation.",
    "articleSection": "OPERATIONAL DIAGNOSTIC FRAMEWORK",
    "about": [
      {
        "@type": "DefinedTerm",
        "name": "Promise Gap",
        "description": "Proprietary trademarked operational audit framework identifying the rift between board-level AI goals and runtime execution friction."
      }
    ],
    "url": "https://bmradvisory.co/methodology",
    "publisher": {
      "@type": "Organization",
      "name": "BMR Solutions",
      "url": "https://bmradvisory.co"
    },
    "author": {
      "@type": "Organization",
      "name": "BMR Solutions Forensic Unit",
      "url": "https://bmradvisory.co"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://bmradvisory.co/methodology"
    }
  };

  return (
    <>
      <Head>
        <title>Pre-Automation Control Plane Methodology | BMR Solutions</title>
        <meta name="description" content="Architectural guardrails prioritizing time to reliability over time to market. Audit Level 2 interfaces and calculate Process Waste Tax." />
        <link rel="canonical" href="https://bmradvisory.co/methodology" />
        <meta property="og:title" content="Pre-Automation Control Plane Methodology | BMR Solutions" />
        <meta property="og:description" content="Architectural guardrails prioritizing time to reliability over time to market." />
        <meta property="og:url" content="https://bmradvisory.co/methodology" />
        <meta property="og:type" content="website" />
        
        {/* Head-enclosed JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative flex flex-col">
        <Header />

        <main className="flex-grow pt-32 sm:pt-40 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative w-full text-left">
          
          {/* --- 1. HERO SECTION: DIAGNOSTIC CONTROL PLANE ENGINE --- */}
          <div className="space-y-6 max-w-4xl">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">
              OPERATIONAL DIAGNOSTIC FRAMEWORK // LEVEL 2 AUDIT
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-950 leading-none">
              THE PRE-AUTOMATION <span className="text-red-700">CONTROL PLANE.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal">
              The <strong>Promise Gap™</strong> is a structural issue occurring when Level 2 delivery interfaces lack insulation. We identify hidden process and data gaps that turn good plans into unreliable execution: untracked manual fixes, shifting data formats, missing verification, and fragile workflow ownership.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-l-2 border-slate-300 pl-4 font-mono">
              ARCHITECTURAL GUARDRAILS THAT PRIORITIZE TIME TO RELIABILITY OVER TIME TO MARKET.
            </p>
          </div>

          {/* --- 2. 4 PILLARS CONTROL PLANE GRID --- */}
          <div className="mt-16 space-y-6">
            <div className="bg-slate-100 border border-slate-300 p-4 text-center font-mono text-xs font-bold text-red-700 uppercase tracking-widest rounded-sm">
              ➔ ➔ ➔ ↓ DIAGNOSTIC INPUT BOUNDARY // INGESTION RISK REVIEW LAYER ➔ ➔ ➔
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              {/* PILLAR 1 */}
              <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
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
                <Link href="/briefings/case-study/fiduciary-regret" className="text-[10px] font-mono font-bold text-red-700 hover:text-slate-950 block pt-3 border-t border-slate-100 no-underline">
                  SEE AUTOPSY: FIDUCIARY REGRET →
                </Link>
              </div>

              {/* PILLAR 2 */}
              <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-slate-500 font-bold text-xs block">// 02 // DATA INTEGRITY SHIELD</span>
                  <h3 className="text-lg font-black uppercase text-slate-950">FILTER IT</h3>
                  <span className="text-xs font-bold text-slate-700 block uppercase">Zero Raw Ingestion</span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Audit intake contracts to enforce strict schema validation. Sanitize inputs at entry to prevent context contamination.
                  </p>
                  <div className="bg-slate-50 p-3 border-l-2 border-slate-900 text-[11px] font-sans text-slate-800">
                    Rule: Never allow unvalidated text or unstructured inputs to enter your business context memory directly.
                  </div>
                </div>
                <Link href="/briefings/case-study/schema-drift" className="text-[10px] font-mono font-bold text-red-700 hover:text-slate-950 block pt-3 border-t border-slate-100 no-underline">
                  SEE AUTOPSY: SCHEMA DRIFT →
                </Link>
              </div>

              {/* PILLAR 3 */}
              <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-red-700 font-bold text-xs block">// 03 // LIABILITY CEILING</span>
                  <h3 className="text-lg font-black uppercase text-slate-950">GUARD IT</h3>
                  <span className="text-xs font-bold text-slate-700 block uppercase">Programmatic Governance</span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Specify Non-Human Identity (NHI) roles and define hard infrastructure-level API proxy limits. Natural language instructions cannot enforce corporate policy.
                  </p>
                  <div className="bg-slate-50 p-3 border-l-2 border-red-700 text-[11px] font-sans text-slate-800">
                    Rule: Mandate hardcoded proxy specifications that physically block unauthorized actions.
                  </div>
                </div>
                <Link href="/briefings/case-study/autonomous-boundary-breach" className="text-[10px] font-mono font-bold text-red-700 hover:text-slate-950 block pt-3 border-t border-slate-100 no-underline">
                  SEE AUTOPSY: BOUNDARY BREACH →
                </Link>
              </div>

              {/* PILLAR 4 */}
              <div className="border border-slate-200 bg-white p-6 space-y-3 relative rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-slate-500 font-bold text-xs block">// 04 // CAPITAL EXPOSURE SAFETY GATE</span>
                  <h3 className="text-lg font-black uppercase text-slate-950">STAGE IT</h3>
                  <span className="text-xs font-bold text-slate-700 block uppercase">Graduated Autonomy</span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Audit and decouple reasoning from live execution. Route actions into draft shadow queues to verify stability before granting system writes.
                  </p>
                  <div className="bg-slate-50 p-3 border-l-2 border-slate-900 text-[11px] font-sans text-slate-800">
                    Rule: Write to the system of record only when the operational state is fully verified.
                  </div>
                </div>
                <Link href="/briefings/case-study/validation-fatigue" className="text-[10px] font-mono font-bold text-red-700 hover:text-slate-950 block pt-3 border-t border-slate-100 no-underline">
                  SEE AUTOPSY: VALIDATION FATIGUE →
                </Link>
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
          </div>

          {/* --- 3. FORENSIC VERTICALS GRID --- */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
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

          {/* --- 4. FOUR PHASE DIAGNOSTIC PROCESS --- */}
          <div className="mt-20 pt-16 border-t border-slate-200 space-y-8">
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

              {/* CROSS-PAGE DELIVERABLE ALIGNMENT BRIDGE */}
              <div className="bg-slate-100 border-l-2 border-red-700 p-4 font-mono text-xs text-slate-800">
                <strong>DELIVERED DIAGNOSTIC ARTIFACTS:</strong> Every evaluation produces an audit-ready <strong>Process Waste Tax Ledger</strong>, execution-ready <strong>Level 2 Runbooks</strong>, and <strong>Deployment Gate Specifications</strong>—delivered with zero infrastructure access and zero live data ingestion.
              </div>
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

          {/* --- 5. FRAMEWORK PROOF AND LEADERSHIP --- */}
          <div className="mt-20 pt-16 border-t border-slate-200 space-y-8">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block">
              // FRAMEWORK PROOF AND LEADERSHIP
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  BMR is built on over twenty years of technology leadership, including more than a decade at Microsoft supporting secure intelligence operations and delivering solutions across healthcare, manufacturing, government, education, and protected network environments. After handling over six hundred system recoveries, we developed this framework to close the <strong>Promise Gap™</strong> and establish safeguards before automation affects your operations.
                </p>
                <p>
                  Our hands-on experience is supported by formal advanced training in organizational leadership, management, and organizational design. This expertise strengthens our ability to map governance responsibilities, clarify decision rights, and establish operating controls that make automation reliable, predictable, and safe in production.
                </p>
                <p className="font-semibold text-slate-900 bg-slate-100 p-4 border-l-2 border-red-700 font-sans">
                  Recently, our team identified a major gap in how departments managed operational data. If left unaddressed, the executive team would have faced a costly reorganization to resolve recurring delays. By pinpointing root issues early, we helped the client avoid months of disruption and protected leadership's focus on growth.
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

                <div className="pt-2">
                  <Link 
                    href="/briefings" 
                    className="w-full inline-flex items-center justify-between p-3 bg-slate-950 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors no-underline"
                  >
                    <span>EXPLORE EVIDENCE VAULT</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* --- 6. NODE CAPABILITY MATRIX TABLE --- */}
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

          {/* --- 7. SAMPLE DIAGNOSTIC OUTPUT PREVIEW --- */}
          <div className="mt-20 border border-slate-200 bg-slate-950 text-slate-300 p-6 sm:p-10 font-mono rounded-sm shadow-md space-y-6">
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

          {/* --- 8. COMPLIANCE & PROCUREMENT ACCELERATOR --- */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
            <div className="border border-slate-200 bg-white p-6 space-y-3 rounded-sm shadow-sm">
              <span className="text-red-700 font-bold uppercase block">// ZERO SECURITY FOOTPRINT & EXPEDITED PROCUREMENT</span>
              <p className="text-slate-700 font-sans leading-relaxed">
                Our assessment runs completely separate from your active networks and never accesses confidential data. Since BMR uses only structured diagnostic inputs, our engagement bypasses lengthy InfoSec reviews for expedited procurement.
              </p>
            </div>

            <div className="border border-slate-200 bg-white p-6 space-y-3 rounded-sm shadow-sm">
              <span className="text-red-700 font-bold uppercase block">// ZERO INFOSEC DELAY</span>
              <p className="text-slate-700 font-sans leading-relaxed">
                For every million dollars spent on automation, unmapped workflow breaks can cost hundreds of thousands each year in Process Waste Tax. Closing the <strong>Promise Gap™</strong> protects your corporate technology investments.
              </p>
              <span className="text-emerald-700 font-bold block pt-2">// INDEPENDENT DIAGNOSTIC OVERVIEW</span>
            </div>
          </div>

          {/* --- 9. COST OF INACTION / CTA --- */}
          <div className="mt-20 pt-16 border-t border-slate-200 text-center space-y-6">
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
              THE COST OF INACTION
            </h3>
            <p className="text-slate-700 font-sans max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              For every million dollars spent on automation, unmapped workflow breaks can cost hundreds of thousands each year in Process Waste Tax. Closing the <strong>Promise Gap™</strong> protects your corporate technology investments.
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
    </>
  );
}
