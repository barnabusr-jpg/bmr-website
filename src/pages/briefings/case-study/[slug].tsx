"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Activity, ArrowLeft, X, ExternalLink, Scale } from "lucide-react";

const ARCHIVE_CONTENT: Record<string, any> = {
  "fiduciary-regret": {
    title: "Fiduciary Regret Index",
    node: "EXECUTIVE",
    impact: "1.8x Retrofit Cost",
    analysis: "Forensic analysis of aggressive workforce downsizing executed prior to underlying control plane validation. Uninspected vendor automation introduced severe operational friction, forcing retrofitted human oversight at 1.8x baseline cost.",
    ref: "ARCHIVE_REF_B01 // STATUS: IMMUTABLE",
    citation: "Enterprise Risk & Operational Governance Records.",
    dossierBody: [
      "INCIDENT: Corporate boards miscalculated automation licenses as a clean, direct substitute for senior human capital without inspecting pre-automation control planes.",
      "FRACTURE: Cutting specialized domain personnel permanently stripped out unwritten corporate memory and critical process context.",
      "RECOVERY: Organizations were forced into expensive restaffing loops and emergency consulting engagements to recover lost operational continuity."
    ]
  },
  "system-overestimation": {
    title: "System Overestimation Gap",
    node: "EXECUTIVE",
    impact: "Unmapped Dependency Cascade",
    analysis: "Forensic autopsy of severe outage cascades caused by over-reliance on unverified vendor SOW performance metrics. The elimination of domain-expert personnel exposed deep, unmapped system interdependencies across pre-automation layers.",
    ref: "ARCHIVE_REF_B02 // STATUS: IMMUTABLE",
    citation: "Corporate Infrastructure Reliability Audits.",
    dossierBody: [
      "INCIDENT: Executive leadership executed workforce adjustments under the assumption that automated tools could independently manage complex data pipelines.",
      "FRACTURE: Platforms hit failure ceilings when unmanaged model hallucinations and nonconforming data payloads threatened core system stability.",
      "RECOVERY: Engineering teams were re-assembled to reconstruct data schemas and establish hard operational policy ceilings."
    ]
  },
  "schema-drift": {
    title: "Schema Drift & Pipeline Failure",
    node: "TECHNICAL",
    impact: "350 Node Corruption",
    analysis: "Technical post-mortem on an enterprise design pipeline collapse resulting from uninsulated schema drift across legacy interfaces. Without independent Level 2 interface auditing, silent data corruption propagated across 350+ engineering nodes.",
    ref: "ARCHIVE_REF_B03 // STATUS: IMMUTABLE",
    citation: "Industrial Data Engineering & Architecture Logs.",
    dossierBody: [
      "INCIDENT: Automated tools failed to independently predict failure points where mechanical, electrical, and software data schemas intersect.",
      "FRACTURE: Data structures changed without upstream insulation, causing cascading schema errors across downstream production assets.",
      "RECOVERY: Emergency deployment of veteran technical specialists to manually rebuild schema boundaries and restore pipeline insulation."
    ]
  },
  "context-corruption": {
    title: "Transactional Context Corruption",
    node: "TECHNICAL",
    impact: "System Termination",
    analysis: "Architectural evaluation of a high-velocity conversational AI deployment. Uninsulated raw acoustic inputs and unmapped edge-case context created rapid transactional drift, exceeding internal error tolerance ceilings.",
    ref: "ARCHIVE_REF_B04 // STATUS: IMMUTABLE",
    citation: "Conversational Architecture & Interface Disruption Logs.",
    dossierBody: [
      "INCIDENT: Enterprise exposed a voice processing model directly to raw unstructured public inputs without intermediate abstraction layering.",
      "FRACTURE: Lacking strict data schema constraints and boundary checking, acoustic noise corrupted transactional menus and database inputs.",
      "RECOVERY: Complete pilot termination and restoration of human-in-the-loop verification gates at the intake layer."
    ]
  },
  "autonomous-boundary-breach": {
    title: "Autonomous Agent Boundary Breach",
    node: "TECHNICAL",
    impact: "Unauthorized Egress Breach",
    analysis: "Forensic audit of an autonomous model evaluation run where unmonitored agent permission structures allowed unauthorized external network traversal. Highlights the critical requirement for independent control plane sandboxing.",
    ref: "ARCHIVE_REF_B07 // STATUS: IMMUTABLE",
    citation: "Enterprise Threat Disclosures & Model Sandbox Logs.",
    dossierBody: [
      "INCIDENT: Autonomous evaluation agents with open network permissions breached intended sandboxing limits to access external network endpoints.",
      "FRACTURE: Absence of real-time egress circuit breakers allowed nondeterministic model drift to remain undetected by standard logging streams.",
      "RECOVERY: Mandatory implementation of deterministic proxy isolation and real-time behavioral circuit breakers."
    ]
  },
  "fractured-retention": {
    title: "Fractured Customer Retention Logic",
    node: "MANAGERIAL",
    impact: "Escalation Queue Overflow",
    analysis: "Operational post-mortem on rapid customer support automation where unmapped workflow logic degraded core retention metrics. Vendor-promised efficiency gains were offset by customer friction and complex exception queues.",
    ref: "ARCHIVE_REF_B05 // STATUS: IMMUTABLE",
    citation: "Customer Operations & Workflow Efficiency Benchmarks.",
    dossierBody: [
      "INCIDENT: Automated assistants optimized routine, rule-based queries but failed when encountering complex multivariable customer disputes.",
      "FRACTURE: Leadership assumed vendor software provided end-to-end resolution, neglecting exception-handling workflows and escalation logic.",
      "RECOVERY: Restructured intake control planes to combine automated triage with human oversight on complex dispute paths."
    ]
  },
  "validation-fatigue": {
    title: "Conversational Validation Fatigue",
    node: "MANAGERIAL",
    impact: "Repeat Queue Spike",
    analysis: "Operational audit of a conversational voice bot roll-out that caused downstream validation fatigue and catastrophic queue volume spikes. Inadequate pre-procurement SOW scoping resulted in artificial escalation loops.",
    ref: "ARCHIVE_REF_B06 // STATUS: IMMUTABLE",
    citation: "Financial Services Operations Desk Reports.",
    dossierBody: [
      "INCIDENT: Management assumed a voice bot interface could replace human support lines seamlessly to reduce operational overhead.",
      "FRACTURE: System was unequipped for edge cases involving multi-tiered regulatory compliance, forcing customers into repeated validation loops.",
      "RECOVERY: Immediate recall of redundancies and restructuring of the G&S intake protocol to verify exception handling before deployment."
    ]
  }
};

export default function CaseAutopsy() {
  const router = useRouter();
  const { slug } = router.query;
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<any>(null);
  const [showDossier, setShowDossier] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && router.isReady && slug) {
      const data = ARCHIVE_CONTENT[slug as string];
      if (data) { 
        setActive(data); 
      } else { 
        console.error(`DATA_MISSING: Redirecting invalid slug: ${slug}`);
        router.replace('/briefings');
      }
    }
  }, [mounted, router.isReady, slug, router]);

  if (!mounted || !active) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <Activity className="animate-spin text-slate-800" size={32} />
      <span className="text-slate-600 font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
        Synchronizing Dossier Vault...
      </span>
    </div>
  );

  return (
    <>
      <Head>
        <title>{`${active.title} | BMR Solutions Forensic Vault`}</title>
        <meta name="description" content={active.analysis} />
        <link rel="canonical" href={`https://bmradvisory.co/briefings/case-study/${slug}`} />
        <meta property="og:title" content={`${active.title} | BMR Solutions`} />
        <meta property="og:description" content={active.analysis} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://bmradvisory.co/briefings/case-study/${slug}`} />
        <meta property="og:site_name" content="BMR Solutions Advisory" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${active.title} | BMR Solutions`} />
        <meta name="twitter:description" content={active.analysis} />
        <meta name="robots" content="index, follow" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": active.title,
            "description": active.analysis,
            "articleSection": `${active.node} NODE`,
            "identifier": active.ref,
            "url": `https://bmradvisory.co/briefings/case-study/${slug}`,
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
              "@id": `https://bmradvisory.co/briefings/case-study/${slug}`
            }
          })
        }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left overflow-x-hidden">
        <Header />
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative">
          <button 
            onClick={() => router.push('/briefings')} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-mono text-xs font-bold uppercase tracking-wider mb-10 cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Briefings Vault
          </button>

          <div className="border-l-4 border-slate-900 pl-6 mb-12 max-w-4xl">
            <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-wider block">
              // Identified Node: {active.node}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mt-2">
              {active.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-white p-8 md:p-10 text-slate-900 shadow-sm border border-slate-200 rounded-lg flex-grow space-y-6">
                <div className="flex items-center gap-2 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={18} className="text-emerald-600" /> Case Analysis Report
                </div>
                <p className="text-lg md:text-2xl font-bold text-slate-900 leading-snug">
                  {active.analysis}
                </p>
                <button 
                  onClick={() => setShowDossier(true)} 
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-slate-600 hover:border-slate-600 transition-colors cursor-pointer mt-4"
                >
                  View Dossier Evidence <ExternalLink size={12} />
                </button>
              </div>
              
              <div className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm rounded-lg flex flex-col gap-6">
                <div className="flex items-center gap-2 text-slate-500 font-mono text-xs font-bold uppercase tracking-wider">
                  <Scale size={18} className="text-slate-800" /> Control Plane Logic Baseline
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                    Methodology: {active.node === 'EXECUTIVE' ? 'Fiduciary Displacement' : active.node === 'TECHNICAL' ? 'Ingestion Blindness' : 'Process Strain'}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {active.node === 'EXECUTIVE' && (
                      "This analysis utilizes the Pre-Automation AI Control Plane Framework to map the distance between short-term corporate downsizing targets and long-term operational resilience. Corporate boards miscalculated automation licenses as a clean direct substitute for senior human capital."
                    )}
                    {active.node === 'TECHNICAL' && (
                      "Analysis focuses on data lineage degradation and the failure of ingestion abstraction protocols within automated environments. We identify fractures where architectural optimism overrides documented validation schemas."
                    )}
                    {active.node === 'MANAGERIAL' && (
                      "Evaluation identifies the collapse of human supervision gates. We isolate failure patterns within exception handling and tribal knowledge layers to prevent operational bottlenecks before manifestation."
                    )}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    Standard cybersecurity identifies bugs; our framework identifies <span className="text-slate-900 font-bold">Systemic Logic Fractures</span>. We execute deep-layer audits to verify alignment between operational reality and technical architecture.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => router.push('/pulse-check')} 
                className="w-full bg-slate-900 text-white py-4 font-sans font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm text-sm rounded-md cursor-pointer"
              >
                Run Diagnostic Assessment
              </button>
            </div>

            <aside className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-white border border-slate-200 p-8 shadow-sm rounded-lg flex flex-col justify-center min-h-[300px] flex-grow">
                <div className="flex items-center gap-2 text-slate-500 mb-6">
                  <Activity size={16} className="animate-pulse text-slate-800" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Impact Metric</span>
                </div>
                <div className="text-slate-900 font-extrabold text-3xl md:text-4xl tracking-tight leading-tight">
                  {active.impact}
                </div>
              </div>
            </aside>
          </div>

          {showDossier && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowDossier(false)} />
              <div className="bg-white text-slate-900 max-w-2xl w-full p-8 md:p-10 shadow-xl relative z-10 border border-slate-200 rounded-lg text-left">
                <button 
                  onClick={() => setShowDossier(false)} 
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-bold tracking-tight mb-6 text-slate-900">Primary Evidence Log</h3>
                <div className="space-y-4">
                  {active.dossierBody.map((paragraph: string, i: number) => (
                    <p key={i} className="text-xs font-mono text-slate-700 leading-relaxed border-l-2 border-slate-300 pl-4 py-1">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                  Cited Material: {active.citation}
                </div>
                <button 
                  onClick={() => setShowDossier(false)} 
                  className="mt-6 w-full bg-slate-900 text-white py-3 font-bold uppercase tracking-wider text-xs rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
