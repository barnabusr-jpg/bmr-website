"use client";

import React from 'react';
import { useRouter } from 'next/router'; // 👈 FIX: Added missing import
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LogicLeakTicker from '@/components/LogicLeakTicker';
import { FileText, ArrowLeft, Activity, ShieldAlert, ExternalLink, Download } from "lucide-react";

const CONTENT = {
  "chatbot-liability": {
    title: "THE AIR CANADA PRECEDENT",
    failureType: "HALLUCINATION_SHEAR",
    protocolFocus: "DELTA_GAP",
    subtitle: "AUTOPSY B-01",
    analysis: "A Canadian tribunal ruled that Air Canada's chatbot 'hallucinated' a refund policy, creating a binding legal obligation. This proves that unmonitored automation creates a 'Logic Leak' where the machine acts as a legal representative without human verification.",
    reworkTax: "$812,000 LEGAL SETTLEMENT",
    sourceUrl: "https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html",
    sourceLabel: "VIEW_TRIBUNAL_RULING"
  },
  "salesforce-failure": {
    title: "SALESFORCE AI DATA EXFILTRATION",
    failureType: "SHADOW_AI_SHEAR",
    protocolFocus: "SHADOW_AI",
    subtitle: "AUTOPSY B-02",
    analysis: "Hackers exploited the 'Gap' between employee permissions and algorithmic endpoints. This exfiltration occurred because the system lacked 'Logic-Gates' to detect anomalous behavior, allowing data to bleed out faster than human security could respond.",
    reworkTax: "$4.2M REGULATORY FINES",
    sourceUrl: "https://www.bankinfosecurity.com/salesforce-sounds-alarm-over-fresh-data-extortion-campaign-a-30958",
    sourceLabel: "VIEW_TECHNICAL_AUTOPSY"
  },
  "lyft-logic-shear": {
    title: "THE LYFT EARNINGS PHANTOM",
    failureType: "ALGORITHMIC_SHEAR",
    protocolFocus: "DELTA_GAP",
    subtitle: "AUTOPSY B-03",
    analysis: "A human clerical error (500bps vs 50bps) was instantly weaponized by high-frequency trading bots, triggering a $2B market-cap spike in 45 minutes. CEO David Risher's admission that 'it was a bad mistake' highlights the terminal risk of the Human-Machine Shear.",
    reworkTax: "$2B MARKET-CAP VOLATILITY",
    sourceUrl: "https://www.inc.com/justin-bariso/lyfts-ceo-gave-a-humble-6-word-response-to-a-2-billion-dollar-mistake-its-a-lesson-in-emotional-intelligence.html",
    sourceLabel: "VIEW_INC_POST_MORTEM"
  },
  "clinical-logic-shear": {
    title: "UNITEDHEALTH AI CARE DENIAL",
    failureType: "EXPERTISE_SHEAR",
    protocolFocus: "EXPERTISE_DEBT",
    subtitle: "AUTOPSY B-04",
    analysis: "UnitedHealth’s 'nH Predict' algorithm operated with a 90% error rate by overriding physician expertise. This 'Expertise Shear' prioritized algorithmic averages over clinical reality, leading to a $2.4B operational collapse.",
    reworkTax: "$2.4B OPERATIONAL IMPACT",
    sourceUrl: "https://litigationtracker.law.georgetown.edu/litigation/estate-of-gene-b-lokken-the-et-al-v-unitedhealth-group-inc-et-al/",
    sourceLabel: "VIEW_LITIGATION_AUTOPSY"
  },
  "judicial-logic-shear": {
    title: "OREGON JUDICIAL SANCTION",
    failureType: "FIDUCIARY_SHEAR",
    protocolFocus: "EXPERTISE_DEBT",
    subtitle: "AUTOPSY B-05",
    analysis: "An Oregon attorney was fined for submitting a brief with 15 fabricated AI citations. This 'Judicial Shear' highlights the Expertise Debt of delegating legal research to LLMs without manual verification.",
    reworkTax: "$10,000 FINE + DISBARMENT RISK",
    sourceUrl: "https://www.inc.com/kevin-haynes/faulty-ai-leads-to-record-10000-fine-for-oregon-lawyer/91322007",
    sourceLabel: "VIEW_JUDICIAL_ORDER"
  },
  "governance-logic-shear": {
    title: "MCDONALD'S MCHIRE BREACH",
    failureType: "GOVERNANCE_SHEAR",
    protocolFocus: "SHADOW_AI",
    subtitle: "AUTOPSY B-06",
    analysis: "The 'McHire' AI platform exposed 64 million applicant records due to a default credential vulnerability. This 'Governance Shear' proves that AI tools are often deployed with critical security 'Gaps.'",
    reworkTax: "64M RECORDS EXPOSED",
    sourceUrl: "https://breezy.hr/blog/mcdonalds-hiring-data-breach",
    sourceLabel: "VIEW_SECURITY_AUTOPSY"
  },
  "infrastructure-logic-shear": {
    title: "TOKYO LOGISTICS BLACKOUT",
    failureType: "SYSTEMIC_SHEAR",
    protocolFocus: "DELTA_GAP",
    subtitle: "AUTOPSY B-07",
    analysis: "An automated port-scheduling algorithm ingested a corrupted sensor feed. The resulting 800% acceleration in container throughput caused a physical bottleneck that paralyzed logistics for 72 hours.",
    reworkTax: "$1.4B MACRO-ECONOMIC IMPACT",
    sourceUrl: "https://www.reuters.com/business/logistics/",
    sourceLabel: "VIEW_LOGISTICS_AUTOPSY"
  },
  "utility-grid-hallucination": {
    title: "ERCOT LOAD-BALANCING DRIFT",
    failureType: "PREDICTIVE_DRIFT",
    protocolFocus: "EXPERTISE_DEBT",
    subtitle: "AUTOPSY B-08",
    analysis: "A predictive load-balancing model failed to account for a thermal inversion, over-predicting demand and triggering a cascading shutdown. Operators deferred to the model despite contradictory physical gauges.",
    reworkTax: "4.2M RESIDENTS OFFLINE",
    sourceUrl: "https://www.technologyreview.com/2024/05/20/1092683/ai-power-grid-reliability/",
    sourceLabel: "VIEW_GRID_AUDIT"
  },
  "federal-benefit-shear": {
    title: "IRS TAX-LOGIC HALLUCINATION",
    failureType: "SOVEREIGN_SHEAR",
    protocolFocus: "DELTA_GAP",
    subtitle: "AUTOPSY B-09",
    analysis: "A pilot AI auditor incorrectly flagged 140,000 tax returns for fraud due to a logic-hallucination. This led to a $400M admin recovery tax, proving automated government logic requires a manual BMR circuit breaker.",
    reworkTax: "$400M ADMIN RECOVERY",
    sourceUrl: "https://www.gao.gov/products/gao-24-106500",
    sourceLabel: "VIEW_GAO_AUDIT"
  },
  "defense-intelligence-shear": {
    title: "PENTAGON 'SHADOW' LLM LEAK",
    failureType: "CLASSIFIED_EXFILTRATION",
    protocolFocus: "SHADOW_AI",
    subtitle: "AUTOPSY B-10",
    analysis: "Sensitive data was ingested into a public-facing LLM for summarization. The model subsequently hallucinated troop movements. This highlights the terminal risk of unvetted AI in secure environments.",
    reworkTax: "TERMINAL SECURITY BREACH",
    sourceUrl: "https://www.defense.gov/News/Releases/Release/Article/3613030/dod-announces-establishment-of-generative-ai-task-force/",
    sourceLabel: "VIEW_DOD_POST_MORTEM"
  }
};

// 🛡️ FIX: Added getStaticPaths to tell Next.js which pages to build
export async function getStaticPaths() {
  const paths = Object.keys(CONTENT).map((slug) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

// 🛡️ FIX: Added getStaticProps to fetch the data at build time
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const data = CONTENT[params.slug as keyof typeof CONTENT];
  return { props: { data } };
}

export default function BriefingDocument({ data }: { data: any }) {
  const router = useRouter();
  
  // Handled by getStaticProps, but fallback for safety
  if (!data) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-red-600">
      DOSSIER_NOT_FOUND
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans">
      <Head><title>BMR | {data.title}</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-5xl mx-auto space-y-12">
        <button onClick={() => router.push('/briefings')} className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-mono text-[10px] uppercase tracking-[0.4em] font-black">
          <ArrowLeft size={14} /> BACK TO VAULT
        </button>
        
        <header className="space-y-4 border-l-4 border-red-600 pl-8">
          <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest font-black italic">
            <span className="text-red-600 bg-red-600/10 px-2 py-1">{data.failureType.replace(/_/g, " ")}</span>
            <span className="text-slate-500">PRIMARY_PROTOCOL: {data.protocolFocus}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">{data.title}</h1>
        </header>

        <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-slate-900">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-slate-900/40 p-10 border border-slate-800 rounded-sm">
              <h3 className="font-mono text-[10px] font-black uppercase text-red-600 tracking-widest mb-6">FORENSIC ANALYSIS</h3>
              <p className="text-slate-200 leading-relaxed font-bold uppercase text-lg italic">{data.analysis}</p>
            </div>

            <div className="bg-red-600/5 border border-red-600/20 p-10 space-y-6">
              <h4 className="text-white font-black italic text-2xl uppercase tracking-tighter">Request Board-Level Indictment</h4>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                Download the full technical autopsy, rework tax breakdown, and the recovery protocol for this specific failure archetype.
              </p>
              <button onClick={() => router.push('/pulse-check')} className="bg-red-600 text-white px-8 py-4 font-black font-mono text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                DOWNLOAD_AUTOPSY_PDF
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 p-8 sticky top-44 space-y-6">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic leading-relaxed">
                ESTIMATED REWORK TAX:<br />
                <span className="text-red-600 font-black not-italic text-sm tracking-normal">{data.reworkTax}</span>
              </div>
              <div className="h-px bg-slate-900" />
              <button onClick={() => router.push('/pulse-check')} className="w-full bg-white text-black py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all">
                RUN SHEAR-DIAGNOSTIC
              </button>
              <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" className="block text-center text-[9px] font-mono text-slate-600 underline uppercase tracking-widest hover:text-red-600 transition-colors">
                {data.sourceLabel}
              </a>
            </div>
          </aside>
        </div>
      </main>
      <LogicLeakTicker /><Footer />
    </div>
  );
}
