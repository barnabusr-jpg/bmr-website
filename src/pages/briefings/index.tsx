"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, ShieldAlert, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function EvidenceVault() {
  const categories = [
    {
      node: "EXECUTIVE",
      label: "EXECUTIVE NODE FLOW",
      cases: [
        {
          id: "CASE_01",
          title: "FIDUCIARY REGRET",
          slug: "fiduciary-regret",
          subtitle: "UNBUDGETED PROCESS WASTE TAX IN AUTOMATION DEPLOYMENT",
          summary:
            "Forensic analysis of aggressive workforce downsizing executed prior to underlying control plane validation. Uninspected vendor automation introduced severe operational friction, forcing retrofitted human oversight at 1.8x baseline cost.",
          takeaway:
            "Pre-automation workflow mapping prevents the immediate monetization of process waste.",
        },
        {
          id: "CASE_04",
          title: "SYSTEM OVERESTIMATION",
          slug: "system-overestimation",
          subtitle: "CRITICAL VULNERABILITIES FROM UNMAPPED DEPENDENCY NETWORKS",
          summary:
            "Forensic autopsy of severe outage cascades caused by over-reliance on unverified vendor SOW performance metrics. The elimination of domain-expert personnel exposed deep, unmapped system interdependencies across pre-automation layers.",
          takeaway:
            "Policy ceilings must be established before technical talent bridges are severed.",
        },
      ],
    },
    {
      node: "TECHNICAL",
      label: "TECHNICAL NODE FLOW",
      cases: [
        {
          id: "CASE_02",
          title: "SCHEMA DRIFT",
          slug: "schema-drift",
          subtitle: "CATASTROPHIC PIPELINE COLLAPSE VIA UNINSULATED DATA INTERFACES",
          summary:
            "Technical post-mortem on an enterprise design pipeline collapse resulting from uninsulated schema drift across legacy interfaces. Without independent Level 2 interface auditing, silent data corruption propagated across 350+ engineering nodes.",
          takeaway:
            "Interface insulation is mandatory prior to scaling automated data pipelines.",
        },
        {
          id: "CASE_05",
          title: "CONTEXT CORRUPTION",
          slug: "context-corruption",
          subtitle: "AUTONOMOUS CONTEXT EROSION IN HIGH-VELOCITY TRANSACTIONAL INTAKE",
          summary:
            "Architectural evaluation of a high-velocity conversational AI deployment. Uninsulated raw acoustic inputs and unmapped edge-case context created rapid transactional drift, exceeding internal error tolerance ceilings.",
          takeaway:
            "Noise-induced context drift requires real-time boundary monitoring at the intake layer.",
        },
        {
          id: "CASE_07",
          title: "AUTONOMOUS BOUNDARY BREACH",
          slug: "autonomous-boundary-breach",
          subtitle: "UNMONITORED MODEL DRIFT AND NETWORK BOUNDARY ESCAPE",
          summary:
            "Forensic audit of an autonomous model evaluation run where unmonitored agent permission structures allowed unauthorized external network traversal. Highlights the critical requirement for independent control plane sandboxing.",
          takeaway:
            "Autonomous agents must operate within deterministic, non-negotiable policy bounds.",
        },
      ],
    },
    {
      node: "MANAGERIAL",
      label: "MANAGERIAL NODE FLOW",
      cases: [
        {
          id: "CASE_03",
          title: "FRACTURED RETENTION",
          slug: "fractured-retention",
          subtitle: "UNMAPPED PROCESS LOGIC AND SERVICE QUALITY DECAY",
          summary:
            "Operational post-mortem on rapid customer support automation where unmapped workflow logic degraded core retention metrics. Vendor-promised efficiency gains were offset by customer friction and complex exception queues.",
          takeaway:
            "Vendor SOW claims must be benchmarked against empirical workflow logic before deployment.",
        },
        {
          id: "CASE_06",
          title: "VALIDATION FATIGUE",
          slug: "validation-fatigue",
          subtitle: "CONVERSATIONAL INTAKE FAILURE AND QUEUE VOLUME SURGES",
          summary:
            "Operational audit of a conversational voice bot roll-out that caused downstream validation fatigue and catastrophic queue volume spikes. Inadequate pre-procurement SOW scoping resulted in artificial escalation loops.",
          takeaway:
            "Procurement triggers must require independent verification of exception-handling capacity.",
        },
      ],
    },
  ];

  const baseUrl = "https://bmradvisory.co";

  const allCases = categories.flatMap((cat) =>
    cat.cases.map((item) => {
      const canonicalUrl = `${baseUrl}/briefings/case-study/${item.slug}`;

      return {
        "@type": "TechArticle",
        headline: item.title,
        alternativeHeadline: item.subtitle,
        description: item.summary,
        identifier: item.id,
        articleSection: `${cat.node} NODE`,
        url: canonicalUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      };
    })
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Briefing Vault & Forensic Case Autopsies | BMR Solutions",
    description:
      "Forensic industry autopsies and technical audits of enterprise control plane failures, process waste, and autonomous model boundaries.",
    url: `${baseUrl}/briefings`,
    publisher: {
      "@type": "Organization",
      name: "BMR Solutions",
      url: baseUrl,
    },
    mainEntity: allCases,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 border-b border-slate-200 pb-8 sm:pb-12 gap-4">
          <div className="border-l-4 border-red-700 pl-4 sm:pl-8">
            <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
              EVIDENCE & FORENSIC AUTOPSIES
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-none text-slate-950">
              BRIEFING <span className="text-red-700">VAULT.</span>
            </h1>
          </div>
          <Lock className="text-slate-300 hidden md:block mb-2 shrink-0" size={80} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {categories.map((cat) => (
            <div key={cat.node} className="flex flex-col gap-6">
              <div className="text-slate-600 font-mono text-xs tracking-widest uppercase border-b border-slate-200 pb-3 font-bold flex items-center justify-between">
                <span>{cat.label}</span>
                <span className="text-red-700 text-[10px]">// ACTIVE</span>
              </div>

              {cat.cases.map((item) => (
                <Link key={item.slug} href={`/briefings/case-study/${item.slug}`} className="group no-underline block w-full">
                  <div className="bg-white border border-slate-200 p-6 sm:p-8 relative overflow-hidden hover:border-red-700 transition-all shadow-sm rounded-sm flex flex-col justify-between min-h-[380px]">
                    <ShieldAlert className="absolute top-6 right-6 text-slate-200 group-hover:text-red-100 transition-colors pointer-events-none" size={96} />
                    
                    <div className="relative z-10 w-full space-y-4">
                      <div className="font-mono text-[11px] text-red-700 font-bold tracking-wider uppercase">
                        FILE REF: {item.id} <span className="text-slate-400">| {cat.node} NODE</span>
                      </div>
                      
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-slate-950 group-hover:text-red-700 transition-colors leading-tight">
                          {item.title}
                        </h2>
                        <span className="block font-mono text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-1">
                          {item.subtitle}
                        </span>
                      </div>
                      
                      <p className="text-sm sm:text-base text-slate-700 font-sans normal-case leading-relaxed border-l-2 border-slate-200 pl-4">
                        {item.summary}
                      </p>

                      <div className="border-t border-slate-100 pt-3 mt-2">
                        <p className="text-xs font-mono text-slate-600 italic">
                          <strong className="text-slate-900 not-italic font-bold uppercase text-[10px] block mb-0.5">Inspector's Takeaway:</strong>
                          "{item.takeaway}"
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-slate-950 font-mono font-bold uppercase text-xs tracking-wider group-hover:text-red-700 transition-colors mt-6 relative z-10">
                      <span>ACCESS CASE AUTOPSY</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform shrink-0 text-red-700" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
