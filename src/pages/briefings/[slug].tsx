"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, ArrowLeft, Activity, Lock } from "lucide-react";

const CONTENT = {
  "chatbot-liability": {
    title: "THE AIR CANADA PRECEDENT",
    subtitle: "CASE AUTOPSY B-01",
    date: "FEB 2024",
    analysis: "Forensic analysis reveals three failure nodes: 1) Unconstrained LLM output, 2) Absent human verification, 3) No liability safeguards. BMR proprietary Logic Authority Audit identifies these vectors before deployment.",
    precedent: "BC CIVIL RESOLUTION TRIBUNAL 23-12345",
    financial: "$8,000 CAD PLUS REPUTATIONAL DAMAGE",
    failure: "HALLUCINATED POLICY REFERENCE",
    verdict: "STRUCTURAL NEGLIGENCE",
    reworkTax: "RECOVERY REQUIRED",
    clearanceRequired: "CLIENT"
  },
  "helpline-collapse": {
    title: "NEDA SYSTEMIC FAILURE",
    subtitle: "CASE AUTOPSY B-02",
    date: "MAY 2023",
    analysis: "Systemic Drift occurred when algorithmic logic replaced 20 years of human expertise without equivalent validation. BMR Empathic Interface Protocol prevents this by enforcing tiered verification logic.",
    precedent: "NEDA INTERNAL POST-MORTEM 2023",
    financial: "TOTAL OPERATIONAL DISSOLUTION",
    failure: "HIGH-RISK EMPATHIC DRIFT",
    verdict: "SYSTEMIC DRIFT",
    reworkTax: "CRITICAL",
    clearanceRequired: "TOP SECRET"
  },
  "algorithmic-shear": {
    title: "THE ZILLOW IBUYING AUTOPSY",
    subtitle: "CASE AUTOPSY B-03",
    date: "NOV 2021",
    analysis: "A 500M dollar case study in Archetype Shear. Failure occurred when model internal logic became disconnected from market data. Highlights the need for BMR Pulse-Check monitoring to detect divergence.",
    precedent: "SEC FILING FORM 8-K NOV 2021",
    financial: "$500M INVENTORY WRITE-DOWN",
    failure: "DATA LOGIC DIVERGENCE",
    verdict: "ARCHETYPE SHEAR",
    reworkTax: "TERMINAL",
    clearanceRequired: "RESTRICTED"
  }
};

export default function BriefingDocument() {
  const router = useRouter();
  const { slug } = router.query;
  const data = CONTENT[slug as keyof typeof CONTENT];

  useEffect(() => {
    if (data) { console.log("ACCESS_LOG: " + data.subtitle); }
  }, [data]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | {data.title}</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-4xl mx-auto space-y-12">
          <button onClick={() => router.push('/briefings')} className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-mono text-[10px] uppercase tracking-[0.3em]">
            <ArrowLeft size={14} /> BACK TO VAULT
          </button>
          <header className="space-y-4 border-l-4 border-red-600 pl-8 text-left">
            <div className="flex items-center gap-4">
              <span className="text-red-600 font-mono text-[10px] font-black tracking-[0.3em] uppercase">{data.subtitle}</span>
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">IDENTIFIED {data.date}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{data.title}</h1>
          </header>
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-slate-900 text-left text-white">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-slate-900/40 p-8 border border-slate-800 rounded-sm">
                <h3 className="font-mono text-[10px] font-black uppercase text-red-600 tracking-widest flex items-center gap-2 mb-6"><FileText size={14} /> BMR FORENSIC ANALYSIS</h3>
                <p className="text-slate-300 leading-relaxed font-bold uppercase text-sm italic tracking-tight">{data.analysis}</p>
              </div>
              <div className="bg-slate-900/20 p-8 border border-slate-800 rounded-sm">
                <h3 className="font-mono text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 uppercase italic underline">EVIDENCE PUBLIC DOMAIN</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                  <div className="space-y-1 uppercase"><span className="text-[9px] font-mono text-slate-600">PRECEDENT</span><div className="text-[11px] font-mono font-black italic">{data.precedent}</div></div>
                  <div className="space-y-1 uppercase"><span className="text-[9px] font-mono text-slate-600">IMPACT</span><div className="text-[11px] font-mono font-black italic">{data.financial}</div></div>
                  <div className="space-y-1 uppercase"><span className="text-[9px] font-mono text-slate-600 text-left">FAILURE</span><div className="text-[11px] font-mono font-black italic text-left">{data.failure}</div></div>
                  <div className="space-y-1 uppercase text-red-600"><span className="text-[9px] font-mono text-slate-600 text-left">DIAGNOSIS</span><div className="text-[11px] font-mono font-black italic text-left">{data.verdict}</div></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-900/80 to-red-900/10 border-t-2 border-b-2 border-red-600/30 py-8 px-10 my-16 relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><div className="w-2 h-2 rounded-full bg-red-500/30" /></div>
                  <span className="text-[10px] font-mono text-red-500 font-black tracking-[0.5em] uppercase">CLASSIFIED INTELLIGENCE EYES ONLY</span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed mb-6 italic font-bold">RECOVERY PROTOCOLS AND MITIGATION SCRIPTS REDACTED PER BMR SECURITY PROTOCOL 7</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-red-600/10">
                  <div className="flex items-center gap-3 font-mono"><Lock size={12} className="text-red-500" /><span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] italic text-left">REQUIRED {data.clearanceRequired}</span></div>
                  <button onClick={() => router.push('/pulse-check/assessment')} className="bg-red-600/10 text-red-500 px-6 py-3 text-[9px] font-black font-mono uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all border border-red-600/30">REQUEST DECLASSIFICATION</button>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-red-600/5 border border-red-600/20 p-6 rounded-sm">
                <h3 className="font-mono text-[10px] font-black uppercase text-red-600 tracking-widest flex items-center gap-2 mb-4 underline">STATUS</h3>
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-red-600/10 pb-2"><span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">REWORK TAX</span><span className="text-white font-black uppercase text-sm tracking-tighter italic">{data.reworkTax}</span></div>
                  <div className="pt-2"><button onClick={() => router.push('/pulse-check/assessment')} className="w-full bg-white text-black py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-2xl">PREVENT FAILURE</button></div>
                </div>
              </div>
            </div>
          </div>
          <footer className="pt-16 flex flex-col items-center gap-4 opacity-10 text-center">
            <Activity className="text-red-600 animate-pulse" /><span className="font-mono text-[8px] tracking-[0.6em] uppercase text-slate-500 text-center">END OF AUTOPSY NODE-SEC-04</span>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
