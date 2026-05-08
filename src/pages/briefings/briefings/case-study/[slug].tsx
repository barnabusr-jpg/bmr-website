"use client";

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LogicLeakTicker from '@/components/LogicLeakTicker';
import { FileText, ArrowLeft, Activity, ShieldAlert, ExternalLink, Download } from "lucide-react";

const CONTENT = {
  "chatbot-liability": {
    title: "AIR CANADA PRECEDENT",
    failureType: "LIABILITY_SHEAR",
    nodeFocus: "EXECUTIVE",
    caseId: "BMR-2026-LIAB-01",
    analysis: "A Canadian tribunal ruled that Air Canada's chatbot issued an unauthorized refund policy, creating a binding legal obligation. This proves that unmonitored automation creates a 'Logic Leak' where machines act as legal representatives without human oversight.",
    reworkTax: "$812,000 SETTLEMENT",
    sourceUrl: "https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html",
    sourceLabel: "TRIBUNAL_RULING_DOC"
  },
  "salesforce-failure": {
    title: "SALESFORCE DATA EXFILTRATION",
    failureType: "SECURITY_SHEAR",
    nodeFocus: "TECHNICAL",
    caseId: "BMR-2026-SEC-02",
    analysis: "Hackers exploited the 'Gap' between employee permissions and algorithmic endpoints. This occurred because the system lacked logic-gates to detect anomalous behavior, allowing data to bleed out faster than manual security could respond.",
    reworkTax: "$4.2M REGULATORY FINES",
    sourceUrl: "https://www.bankinfosecurity.com/salesforce-sounds-alarm-over-fresh-data-extortion-campaign-a-30958",
    sourceLabel: "TECHNICAL_AUTOPSY"
  },
  "lyft-logic-shear": {
    title: "LYFT EARNINGS PHANTOM",
    failureType: "FINANCIAL_DRIFT",
    nodeFocus: "EXECUTIVE",
    caseId: "BMR-2026-FIN-03",
    analysis: "A human clerical error (500bps vs 50bps) was instantly weaponized by high-frequency trading bots, triggering a $2B market-cap spike in 45 minutes. This highlights the terminal risk of unhardened human-machine handoffs.",
    reworkTax: "$2B MARKET-CAP VOLATILITY",
    sourceUrl: "https://www.inc.com/justin-bariso/lyfts-ceo-gave-a-humble-6-word-response-to-a-2-billion-dollar-mistake-its-a-lesson-in-emotional-intelligence.html",
    sourceLabel: "INC_POST_MORTEM"
  },
  "clinical-logic-shear": {
    title: "UNITEDHEALTH CARE DENIAL",
    failureType: "OPERATIONAL_SHEAR",
    nodeFocus: "MANAGERIAL",
    caseId: "BMR-2026-OPS-04",
    analysis: "UnitedHealth’s algorithm operated with a 90% error rate by overriding physician expertise. This prioritized algorithmic averages over clinical reality, leading to a $2.4B operational collapse and federal investigation.",
    reworkTax: "$2.4B OPERATIONAL IMPACT",
    sourceUrl: "https://litigationtracker.law.georgetown.edu/litigation/estate-of-gene-b-lokken-the-et-al-v-unitedhealth-group-inc-et-al/",
    sourceLabel: "LITIGATION_AUTOPSY"
  },
  "judicial-logic-shear": {
    title: "JUDICIAL SANCTION PRECEDENT",
    failureType: "GOVERNANCE_SHEAR",
    nodeFocus: "EXECUTIVE",
    caseId: "BMR-2026-GOV-05",
    analysis: "An attorney was fined for submitting a brief with fabricated AI citations. This highlights the 'Expertise Debt' of delegating critical research to LLMs without manual verification loops.",
    reworkTax: "$10,000 FINE + DISBARMENT RISK",
    sourceUrl: "https://www.inc.com/kevin-haynes/faulty-ai-leads-to-record-10000-fine-for-oregon-lawyer/91322007",
    sourceLabel: "JUDICIAL_ORDER_DOC"
  }
};

export async function getStaticPaths() {
  const paths = Object.keys(CONTENT).map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const data = CONTENT[params.slug as keyof typeof CONTENT];
  return { props: { data } };
}

export default function BriefingDocument({ data }: { data: any }) {
  const router = useRouter();
  if (!data) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans tracking-tight">
      <Head><title>BMR | {data.title}</title></Head>
      <Header />
      
      <main className="pt-44 pb-24 px-6 max-w-5xl mx-auto space-y-12">
        {/* ACCESSIBLE NAVIGATION */}
        <button 
          onClick={() => router.push('/briefings')} 
          className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[11px] uppercase tracking-[0.4em] font-black"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK TO THE VAULT
        </button>
        
        {/* CLINICAL HEADER */}
        <header className="space-y-6 border-l-8 border-red-600 pl-10 md:pl-16">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest font-black italic">
            <span className="text-white bg-red-600 px-3 py-1">{data.failureType.replace(/_/g, " ")}</span>
            <span className="text-slate-500">AFFECTED_NODE: {data.nodeFocus}</span>
            <span className="text-slate-700">ID: {data.caseId}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
            {data.title}
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-slate-900">
          <div className="md:col-span-2 space-y-10">
            
            {/* 🛡️ THE "ISLAND" ANALYSIS CARD (ACCESSIBILITY FOCUS) */}
            <div className="bg-white p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-l-[12px] border-red-600">
              <h3 className="font-mono text-[11px] font-black uppercase text-red-600 tracking-[0.3em] flex items-center gap-2 mb-8">
                <ShieldAlert size={18} /> FORENSIC_AUTOPSY_REPORT
              </h3>
              <p className="text-slate-800 leading-relaxed font-bold uppercase text-2xl italic tracking-tighter">
                {data.analysis}
              </p>
              <a 
                href={data.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 mt-10 text-[11px] font-mono text-red-600 border-b-2 border-red-600/20 pb-1 hover:text-black hover:border-black transition-all uppercase font-black"
              >
                {data.sourceLabel} <ExternalLink size={12} />
              </a>
            </div>

            {/* ACTION PROMPT */}
            <div className="bg-slate-950 border border-slate-800 p-12 space-y-8 rounded-lg shadow-2xl">
              <h4 className="text-white font-black italic text-3xl uppercase tracking-tighter">Initialize Fracture Audit</h4>
              <p className="text-slate-400 font-medium italic text-lg leading-relaxed">
                Analyze your own deployment for the same fractures identified in this autopsy. 
                Identify your rework tax before it hardens into a permanent financial loss.
              </p>
              <button 
                onClick={() => router.push('/diagnostic')} 
                className="w-full md:w-auto bg-red-600 text-white px-10 py-6 font-black uppercase italic tracking-widest text-lg hover:bg-white hover:text-red-600 transition-all shadow-lg"
              >
                Run Node Triangulation
              </button>
            </div>
          </div>

          {/* SIDEBAR DOSSIER METRICS */}
          <aside className="space-y-6">
            <div className="bg-slate-950 border-2 border-slate-900 p-10 sticky top-44 space-y-8 shadow-2xl">
              <div className="flex items-center gap-3">
                <Activity size={14} className="text-red-600 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Case_Metrics</span>
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-black italic block">Calculated Rework Tax:</span>
                <div className="text-red-600 font-black text-2xl leading-none tracking-tighter italic uppercase underline decoration-2 underline-offset-4">
                  {data.reworkTax}
                </div>
              </div>
              
              <div className="h-px bg-slate-900" />
              
              <p className="text-[10px] font-mono text-slate-500 uppercase leading-relaxed font-bold italic">
                Status: Verified Case File.<br/> 
                Access level: Public Executive Briefing.
              </p>
              
              <button 
                onClick={() => router.push('/diagnostic')} 
                className="w-full bg-white text-black py-6 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-xl"
              >
                Download Full Indictment
              </button>
            </div>
          </aside>
        </div>
      </main>

      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
