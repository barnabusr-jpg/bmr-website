"use client";

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LogicLeakTicker from '@/components/LogicLeakTicker';
import { FileText, ArrowLeft, Activity, ShieldAlert, ExternalLink, Database, AlertTriangle } from "lucide-react";

// --- 🛡️ 1. HARDENED CONTENT ARCHIVE (Keys must match index.tsx slugs) ---
const CONTENT = {
  "chatbot-liability": {
    title: "THE AIR CANADA PRECEDENT",
    failureType: "HALLUCINATION_RISK",
    protocolFocus: "DELTA_GAP",
    subtitle: "AUTOPSY B-01",
    analysis: "A Canadian tribunal ruled that Air Canada's chatbot hallucinated a refund policy, creating a binding legal obligation. This establishes precedent: enterprises are liable for AI outputs, regardless of training data. Rework Tax exceeded 40% of annual budget.",
    reworkTax: "$812,000 LEGAL SETTLEMENT",
    sourceUrl: "https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html",
    sourceLabel: "VIEW_TRIBUNAL_RULING"
  },
  "salesforce-failure": {
    title: "SALESFORCE AI DATA EXFILTRATION",
    failureType: "DATA_EXPOSURE",
    protocolFocus: "SHADOW_AI",
    subtitle: "AUTOPSY B-02",
    analysis: "Hackers exploited Salesforce's AI platform by tricking employees into installing a malicious app that exfiltrated customer data. The breach exposed critical gaps in AI governance, access monitoring for AI endpoints, and model versioning controls.",
    reworkTax: "$4.2M REGULATORY FINES",
    sourceUrl: "https://www.bankinfosecurity.com/salesforce-sounds-alarm-over-fresh-data-extortion-campaign-a-30958",
    sourceLabel: "VIEW_TECHNICAL_AUTOPSY"
  },
  "algorithmic-shear": {
    title: "ZILLOW'S ALGORITHMIC SHEAR",
    failureType: "ALGORITHMIC_SHEAR",
    protocolFocus: "REWORK_TAX",
    subtitle: "AUTOPSY B-03",
    analysis: "Zillow's 'Zestimate' algorithm overpaid for 7,000 homes, forcing a $304M write-down and 25% workforce reduction. Failure occurred when model logic became disconnected from volatile market data without human drift monitoring.",
    reworkTax: "$304M WRITE-DOWN",
    sourceUrl: "https://www.wired.com/story/zillow-ibuying-algorithm/",
    sourceLabel: "VIEW_WIRED_AUTOPSY"
  }
};

export default function BriefingDocument() {
  const router = useRouter();
  const { slug } = router.query;
  
  // 🛡️ Guard 1: Router Readiness (Prevents null query on first render)
  if (!router.isReady) return <div className="min-h-screen bg-[#020617]" />;

  const data = CONTENT[slug as keyof typeof CONTENT];

  // 🛡️ Guard 2: Safety Render if Slug is Mismatched
  if (!data) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-mono uppercase tracking-[0.3em] text-[10px]">
        <div className="text-center space-y-4">
          <ShieldAlert className="mx-auto text-red-600 animate-pulse" size={48} />
          <p>Dossier_Not_Found</p>
          <button onClick={() => router.push('/briefings')} className="text-red-600 underline cursor-pointer">Return_to_Vault</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30 overflow-x-hidden">
      <Head><title>BMR | {data.title}</title></Head>
      <Header />
      
      <main className="pt-44 pb-24 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* 📡 NAVIGATION: VAULT RETURN */}
          <button 
            onClick={() => router.push('/briefings')} 
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-mono text-[10px] uppercase tracking-[0.3em] font-black cursor-pointer"
          >
            <ArrowLeft size={14} /> BACK TO VAULT
          </button>
          
          {/* 📡 HEADER: FAILURE TAXONOMY */}
          <header className="space-y-4 border-l-4 border-red-600 pl-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] font-mono text-red-600 uppercase tracking-widest font-black px-2 py-1 bg-red-600/10">
                {data.failureType.replace(/_/g, " ")}
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black italic">
                PRIMARY_PROTOCOL: {data.protocolFocus}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              {data.title}
            </h1>
            <p className="text-red-600 font-mono text-[10px] font-black tracking-[0.3em] uppercase">
              {data.subtitle}
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-slate-900">
            <div className="md:col-span-2 space-y-8">
              
              {/* 📁 FORENSIC ANALYSIS BLOCK */}
              <div className="bg-slate-900/40 p-8 border border-slate-800 rounded-sm">
                <h3 className="font-mono text-[10px] font-black uppercase text-red-600 tracking-widest flex items-center gap-2 mb-6">
                  <FileText size={14} /> BMR FORENSIC ANALYSIS
                </h3>
                <p className="text-slate-300 leading-relaxed font-bold uppercase text-sm tracking-tight italic mb-6">
                  {data.analysis}
                </p>
                
                <a 
                  href={data.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-mono text-red-600 underline tracking-[0.2em] hover:text-white transition-colors"
                >
                  VIEW_RAW_EVIDENCE_LOGS <ExternalLink size={10} />
                </a>
              </div>
              
              {/* 📁 PROTOCOL SUMMARY GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-6 border transition-all ${data.protocolFocus === 'REWORK_TAX' ? 'bg-red-600/15 border-red-600' : 'bg-red-600/5 border-red-600/20'}`}>
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black block mb-2">REWORK TAX</span>
                  <div className="text-white font-black uppercase text-[11px] tracking-widest leading-tight">{data.reworkTax}</div>
                </div>
                <div className={`p-6 border transition-all ${data.protocolFocus === 'SHADOW_AI' ? 'bg-red-600/15 border-red-600' : 'bg-red-600/5 border-red-600/20'}`}>
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black block mb-2">PRIMARY_VECTOR</span>
                  <div className="text-white font-black uppercase text-[11px] tracking-widest leading-tight">{data.protocolFocus}</div>
                </div>
              </div>

              {/* 📁 ACCESS REQUEST BANNER */}
              <div className="bg-gradient-to-r from-slate-950 to-red-950/20 border-y-2 border-red-600/30 py-8 px-10 my-16 shadow-2xl relative overflow-hidden group">
                <span className="text-red-500 font-mono text-[10px] font-black tracking-[0.5em] uppercase">CLASSIFIED INTELLIGENCE EYES ONLY</span>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed mt-4 italic font-bold">RECOVERY PROTOCOLS REDACTED PER BMR SECURITY PROTOCOL 7</p>
                <button 
                  onClick={() => router.push('/pulse-check')} 
                  className="mt-6 bg-red-600/10 text-red-500 px-6 py-3 text-[9px] font-black font-mono uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all border border-red-600/30 cursor-pointer"
                >
                  REQUEST ACCESS
                </button>
              </div>
            </div>

            {/* 📁 SIDEBAR ACTION STACK */}
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 p-6 flex flex-col gap-4 sticky top-44">
                <div className="flex items-center gap-2 mb-2">
                   <Activity size={12} className="text-red-600 animate-pulse" />
                   <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Dossier_Action_Node</span>
                </div>
                
                {/* 🚀 CONVERSION CTA */}
                <button 
                  onClick={() => router.push('/pulse-check')} 
                  className="w-full bg-white text-black py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-xl cursor-pointer"
                >
                  {data.failureType === "HALLUCINATION_RISK" ? "PREVENT LEGAL LIABILITY" :
                   data.failureType === "DATA_EXPOSURE" ? "PREVENT DATA BREACHES" :
                   "PREVENT FINANCIAL LOSSES"}
                </button>

                {/* 🚀 EXTERNAL PROOF */}
                <a 
                  href={data.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-red-600/10 text-red-500 py-4 font-black uppercase text-[9px] tracking-[0.2em] hover:bg-red-600 hover:text-white flex items-center justify-center gap-2 transition-all border border-red-600/30 mt-3"
                >
                  {data.sourceLabel} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <footer className="pt-24 flex flex-col items-center gap-4 opacity-20">
            <Activity className="text-red-600 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.6em] text-slate-500 uppercase italic">END OF AUTOPSY // DOSSIER_SEC_004</span>
          </footer>
        </div>
      </main>
      
      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
