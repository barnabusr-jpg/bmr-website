import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Activity, Target, Shield, LayoutGrid, Layers, Cpu, Milestone, 
  CheckCircle2, ArrowRight, FileText, ClipboardCheck, ChevronRight, ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  const handleAdminNavigate = () => {
    router.push('/admin/dashboard');
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BMR Solutions",
    "url": "https://bmradvisory.co",
    "description": "Independent Digital Building Inspector and Level 2 Control Plane Audit Firm bridging the Promise Gap, a proprietary trademarked framework identifying the rift between strategic AI goals and runtime execution errors.",
    "knowsAbout": [
      "Promise Gap Framework",
      "Pre-Automation Control Planes",
      "Level 2 Interface Auditing",
      "Schema Drift Insulation",
      "Process Waste Tax Calculation",
      "Vendor SOW Verification"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Forensic Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Diagnostic Waste Tax Assessment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Level 2 Interface Forensic Audit"
          }
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>BMR Solutions | Enterprise Control Plane Inspectorate & Promise Gap™ Audit</title>
        <meta name="description" content="Bridge the Promise Gap™. Independent Level 2 interface audits, schema insulation, and vendor SOW verification for C-suite risk executives." />
        <link rel="canonical" href="https://bmradvisory.co/" />
        <meta property="og:title" content="BMR Solutions | Enterprise Control Plane Inspectorate" />
        <meta property="og:description" content="Independent operational audit firm establishing pre-automation control planes and bridging the Promise Gap™ for enterprise systems." />
        <meta property="og:url" content="https://bmradvisory.co/" />
        <meta property="og:type" content="website" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative flex flex-col">
        <Header />
        
        <main className="flex-grow pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative w-full text-left">
          
          {/* --- TOP BANNER: ZERO SECURITY FOOTPRINT AUDIT --- */}
          <div className="mb-12 bg-slate-100 border-y border-slate-200/90 py-5 px-6 sm:px-8 rounded-sm shadow-sm font-mono">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="text-red-700 shrink-0" size={22} />
                <span className="text-red-700 text-xs font-bold uppercase tracking-widest block">
                  // ZERO SECURITY FOOTPRINT AUDIT
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed max-w-4xl font-sans">
                <strong>Stop absorbing hidden operational rework.</strong> <span className="font-semibold">You receive</span>: Process Waste Tax quantification + execution-ready Level 2 runbooks—with <strong>zero infrastructure connections</strong>, <strong>zero live data ingestion</strong>, and <strong>zero InfoSec procurement delays</strong>.
              </p>
            </div>
          </div>

          {/* --- HERO / HOOK SECTION --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
            
            {/* LEFT COLUMN: HERO HOOK */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              <div className="border-l-4 border-red-700 pl-4 sm:pl-8">
                <span className="text-red-700 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-3">
                  NODE ACCESS: PRE-AUTOMATION CONTROL PLANE DIAGNOSTIC
                </span>

                <h1 className="text-[clamp(2.2rem,6vw,4.2rem)] font-black uppercase tracking-tight leading-none text-slate-950">
                  BRIDGE THE<br />
                  <span className="text-red-700">PROMISE GAP™.</span><br />
                  AUDIT AUTOMATION<br />
                  BEFORE SCALING.
                </h1>
              </div>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-slate-800 max-w-2xl leading-relaxed font-normal">
                  Board-level AI directives fail when uninsulated Level 2 interfaces meet runtime execution variance. We audit your ingestion boundaries, quantify your <strong>Process Waste Tax</strong>, and enforce non-negotiable policy ceilings before capital is deployed.
                </p>

                <div className="border-l-2 border-slate-300 pl-4 max-w-2xl">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal font-mono">
                    <strong>10-QUESTION ASSESSMENT</strong> // <strong>3-MINUTE DIAGNOSTIC</strong> // <strong>PRELIMINARY FINANCIAL LEDGER</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4 w-full">
                <button
                  type="button"
                  onClick={() => router.push('/pulse-check')}
                  className="group relative w-full sm:w-auto bg-slate-950 text-white px-8 sm:px-12 py-5 text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-md border border-slate-950 cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-red-700/60 focus:ring-offset-2"
                >
                  CALCULATE YOUR PROCESS WASTE TAX
                  <Target className="hidden sm:block absolute -top-3 -right-3 text-red-600 group-hover:text-white transition-all" size={24} />
                </button>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-600 font-mono text-[10px] tracking-wider font-bold uppercase">
                    <Activity size={14} className="animate-pulse text-red-700 shrink-0" />
                    3-MINUTE DIAGNOSTIC
                  </div>
                  <p className="text-red-700 font-mono text-[9px] tracking-wider font-semibold uppercase">
                    ZERO INFRASTRUCTURE CONNECTIONS
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: THE PROCESS WASTE TAX CALLOUT */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm rounded-sm relative group">
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-700/30 group-hover:border-red-700 transition-colors" />

                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none mb-6">
                  THE PROCESS<br />
                  <span className="text-red-700">WASTE TAX.</span>
                </h2>

                <div className="space-y-6 border-l-2 border-red-700/30 pl-4 sm:pl-6">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    Your organization is likely absorbing <strong>$150,000 to $350,000 annually per operational unit</strong> in hidden capital loss by repeatedly fixing the same system breakdowns.
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-mono">
                    <li className="flex items-start gap-2">
                      <span className="text-red-700 font-bold">➔</span>
                      <span><strong>25%–40% average reduction</strong> in repeat technical rework within 90 days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-700 font-bold">➔</span>
                      <span><strong>Zero software vendor commissions</strong>, proxy downloads, or hidden implementation fees.</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <span className="text-slate-950 font-bold text-lg uppercase tracking-wide block">
                      YOU CAN <span className="text-red-700 underline decoration-2 underline-offset-4">REGAIN LOST SPEED.</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- FIRST SCROLL: 3 CONCRETE DELIVERABLES BLOCK --- */}
          <div className="mt-20 sm:mt-28 border-t border-slate-200 pt-16">
            <div className="mb-10">
              <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-3">
                // CORE AUDIT OUTPUTS
              </span>

              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                THREE CONCRETE <span className="text-red-700">DIAGNOSTIC ARTIFACTS.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {/* ARTIFACT 01 */}
              <div className="border border-slate-200 bg-white p-6 sm:p-8 space-y-3 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-red-700 font-bold block text-sm">// 01 // FISCAL ASSESSMENT</span>
                  <h3 className="text-lg font-black uppercase text-slate-950">THE PROCESS WASTE TAX LEDGER</h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    A dollar-quantified fiscal assessment pinpointing exact capital leakages caused by <strong>manual validation fatigue</strong>, <strong>bad ingestion data</strong>, and <strong>unmonitored workflow drift</strong>.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-500 uppercase">
                  DELIVERABLE: AUDIT-READY FINANCIAL SUMMARY
                </div>
              </div>

              {/* ARTIFACT 02 */}
              <div className="border border-slate-200 bg-white p-6 sm:p-8 space-y-3 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-slate-500 font-bold block text-sm">// 02 // TECHNICAL DIRECTIVES</span>
                  <h3 className="text-lg font-black uppercase text-slate-950">LEVEL 2 EXECUTION RUNBOOKS</h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Standardized, code-ready logic directives that your existing engineering teams drop directly into <strong>API gateways</strong>, <strong>IAM policies</strong>, and <strong>staging queues</strong>.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-500 uppercase">
                  DELIVERABLE: ENGINEERING IMPLEMENTATION BLUEPRINT
                </div>
              </div>

              {/* ARTIFACT 03 */}
              <div className="border border-slate-200 bg-white p-6 sm:p-8 space-y-3 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-red-700 font-bold block text-sm">// 03 // GOVERNANCE CONTROLS</span>
                  <h3 className="text-lg font-black uppercase text-slate-950">DEPLOYMENT GATE SPECIFICATIONS</h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Hard infrastructure policy ceilings that physically block unauthorized autonomous actions <strong>before</strong> system writes reach live production databases.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-500 uppercase">
                  DELIVERABLE: NON-NEGOTIABLE POLICY CEILINGS
                </div>
              </div>
            </div>

            {/* --- COMPACT PROOF ROW --- */}
            <div className="mt-10 bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-sm font-mono">
              <span className="text-red-700 text-xs font-bold uppercase tracking-widest block mb-6">
                // EXECUTIVE PROOF POINTS
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                <div className="border-l-2 border-red-700 pl-4 space-y-1">
                  <span className="font-mono text-lg font-black text-slate-950 block">30%–45%</span>
                  <p className="text-xs text-slate-600 leading-snug">Reduction in repeat technical rework within 90 days.</p>
                </div>

                <div className="border-l-2 border-slate-950 pl-4 space-y-1">
                  <span className="font-mono text-lg font-black text-slate-950 block">$150K–$350K</span>
                  <p className="text-xs text-slate-600 leading-snug">Recovered annually per operational business unit.</p>
                </div>

                <div className="border-l-2 border-red-700 pl-4 space-y-1">
                  <span className="font-mono text-lg font-black text-slate-950 block">ZERO FOOTPRINT</span>
                  <p className="text-xs text-slate-600 leading-snug">Bypasses InfoSec procurement delays; zero vendor commissions.</p>
                </div>
              </div>
            </div>

            {/* --- WHY BMR: POSITIONING DELTA BLOCK --- */}
            <div className="mt-8 bg-slate-950 text-white p-6 sm:p-8 rounded-sm shadow-md font-mono border-l-4 border-red-700">
              <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-4">
                // WHY BMR (NOT GENERIC CONSULTING OR INVASIVE SOFTWARE)
              </span>
              
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed mb-6 font-normal">
                BMR is not a software vendor, an inline proxy, or a generic advisory firm. We operate as an independent <strong>Digital Building Inspector</strong>, executing a Level 2 Pre-Automation Control Plane diagnostic that delivers concrete, audit-ready artifacts without touching live infrastructure or confidential payloads.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs border-t border-slate-800 pt-6">
                <div className="space-y-1">
                  <span className="font-mono text-red-400 font-bold uppercase block">// 01 // OPERATIONAL BOUNDARY</span>
                  <h4 className="font-bold text-white text-xs uppercase">Zero Live-Data Access</h4>
                  <p className="text-slate-400 leading-relaxed">Runs entirely on process architecture inputs. No network installation, zero latency risk, and zero InfoSec procurement delays.</p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-red-400 font-bold uppercase block">// 02 // CODE-READY ARTIFACTS</span>
                  <h4 className="font-bold text-white text-xs uppercase">Level 2 Control Plane Runbooks</h4>
                  <p className="text-slate-400 leading-relaxed">Not 200-page strategy decks. We hand your engineering teams code-ready rules, IAM policies, and deployment gate specifications.</p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-red-400 font-bold uppercase block">// 03 // STRUCTURAL ISOLATION</span>
                  <h4 className="font-bold text-white text-xs uppercase">Promise Gap™ Insulation</h4>
                  <p className="text-slate-400 leading-relaxed">Fixes the structural rift between board-level AI goals and runtime execution errors—preventing unverified autonomy from writing to core systems.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center justify-between">
                <span>FRAMEWORK ORIGIN: REFINED ACROSS 600+ SYSTEM RECOVERIES IN SECURE CLOUD & AIR-GAPPED DEPLOYMENTS</span>
                <span className="text-red-400 font-bold hidden sm:inline">// EVIDENCE-BASED INSPECTION</span>
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

          {/* --- FORENSIC BRIEFING VAULT SHOWCASE --- */}
          <div className="mt-20 sm:mt-28 border-t border-slate-200 pt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div className="border-l-4 border-red-700 pl-6">
                <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
                  // FORENSIC EVIDENCE ARCHIVE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950">
                  THE BRIEFING <span className="text-red-700">VAULT.</span>
                </h2>
              </div>
              <Link 
                href="/briefings" 
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 hover:text-red-700 transition-colors border-b-2 border-slate-950 hover:border-red-700 pb-1 no-underline"
              >
                EXPLORE FULL VAULT ARCHIVE <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 p-8 rounded-sm space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-red-700 font-mono text-xs font-bold uppercase tracking-wider block">// EXECUTIVE NODE</span>
                  <h3 className="text-xl font-bold uppercase text-slate-950 leading-tight">Fiduciary Regret Index</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Forensic analysis of aggressive workforce downsizing executed prior to underlying control plane validation, resulting in 1.8x retrofit costs.
                  </p>
                </div>
                <Link href="/briefings/case-study/fiduciary-regret" className="text-xs font-mono font-bold text-slate-950 hover:text-red-700 inline-flex items-center gap-1 pt-4 border-t border-slate-100 no-underline">
                  VIEW AUTOPSY REPORT <ExternalLink size={12} />
                </Link>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-sm space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-red-700 font-mono text-xs font-bold uppercase tracking-wider block">// TECHNICAL NODE</span>
                  <h3 className="text-xl font-bold uppercase text-slate-950 leading-tight">Schema Drift & Pipeline Failure</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Technical post-mortem on an enterprise design pipeline collapse resulting from uninsulated schema drift across 350+ engineering nodes.
                  </p>
                </div>
                <Link href="/briefings/case-study/schema-drift" className="text-xs font-mono font-bold text-slate-950 hover:text-red-700 inline-flex items-center gap-1 pt-4 border-t border-slate-100 no-underline">
                  VIEW AUTOPSY REPORT <ExternalLink size={12} />
                </Link>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-sm space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-red-700 font-mono text-xs font-bold uppercase tracking-wider block">// MANAGERIAL NODE</span>
                  <h3 className="text-xl font-bold uppercase text-slate-950 leading-tight">Fractured Retention Logic</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Operational audit of conversational AI customer service rollout that degraded retention logic due to unmapped exception queues.
                  </p>
                </div>
                <Link href="/briefings/case-study/fractured-retention" className="text-xs font-mono font-bold text-slate-950 hover:text-red-700 inline-flex items-center gap-1 pt-4 border-t border-slate-100 no-underline">
                  VIEW AUTOPSY REPORT <ExternalLink size={12} />
                </Link>
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
                <span className="font-mono text-[10px] text-red-700 font-bold uppercase block">// STATUS QUO: THE PROMISE GAP™</span>
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
                // ENTERPRISE TELEMETRY BENCHMARK
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                THE CONTROL PLANE GAP: <span className="text-red-700">WHY AUTOMATION FAILS IN PRODUCTION.</span>
              </h3>
              <p className="text-slate-700 text-sm font-sans normal-case leading-relaxed font-normal">
                Data from over 500 enterprise organizations reveals why automated systems destabilize in production. Corporate automation goals evolve nearly twice as fast as the Level 2 control planes designed to insulate them. Scaling automation without clear operating rules creates compounding risk.
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
              THREE STEPS TO <span className="text-red-700">CLOSE THE PROMISE GAP™.</span>
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

            {/* --- FINAL CONVERSION CALLOUT --- */}
            <div className="mt-16 bg-slate-950 text-white p-8 sm:p-12 rounded-sm shadow-md text-center space-y-6">
              <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest block">
                // IMMEDIATE OPERATIONAL ACTION
              </span>
              <h4 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                STOP ABSORBING REPEAT <span className="text-red-500">TECHNICAL REWORK.</span>
              </h4>
              <p className="text-slate-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Quantify your Process Waste Tax in 3 minutes—with zero infrastructure access, zero live data ingestion, and zero InfoSec procurement delays.
              </p>
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/pulse-check')}
                  className="bg-red-700 text-white px-10 py-5 text-lg font-bold uppercase tracking-wider hover:bg-red-600 transition-all shadow-md cursor-pointer border border-red-600"
                >
                  CALCULATE YOUR PROCESS WASTE TAX
                </button>
                <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                  10-QUESTION ASSESSMENT // 3-MINUTE DIAGNOSTIC // PRELIMINARY FINANCIAL LEDGER
                </span>
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
    </>
  );
}
