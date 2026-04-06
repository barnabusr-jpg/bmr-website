"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, ArrowLeft, Activity, ShieldAlert } from "lucide-react";

const CONTENT = {
  "chatbot-liability": { title: "THE AIR CANADA PRECEDENT", subtitle: "AUTOPSY B-01", date: "FEB 2024", analysis: "Forensic analysis reveals failure nodes: 1) Unconstrained LLM output, 2) Absent human verification. BMR Logic Authority Audit identifies these vectors before deployment. Rework Tax exceeded 40 percent of annual budget.", precedent: "BC CRT 23-12345", financial: "$8,000 CAD + DAMAGE", failure: "HALLUCINATED POLICY", verdict: "STRUCTURAL NEGLIGENCE", reworkTax: "RECOVERY REQUIRED" },
  "helpline-collapse": { title: "NEDA SYSTEMIC FAILURE", subtitle: "AUTOPSY B-02", date: "MAY 2023", analysis: "Systemic Drift occurred when algorithmic logic replaced 20 years of human expertise without equivalent validation. BMR Protocols prevent this by enforcing tiered verification logic.", precedent: "NEDA POST-MORTEM 2023", financial: "OPERATIONAL DISSOLUTION", failure: "EMPATHIC DRIFT", verdict: "SYSTEMIC DRIFT", reworkTax: "CRITICAL" },
  "algorithmic-shear": { title: "THE ZILLOW IBUYING AUTOPSY", subtitle: "AUTOPSY B-03", date: "NOV 2021", analysis: "A 500M dollar study in Archetype Shear. Failure occurred when model logic became disconnected from market data. Highlights the need for BMR Pulse-Check monitoring.", precedent: "SEC FILING 8-K 2021", financial: "$500M WRITE-DOWN", failure: "DATA LOGIC DIVERGENCE", verdict: "ARCHETYPE SHEAR", reworkTax: "TERMINAL" }
};

export default function BriefingDocument() {
  const router = useRouter();
  const { slug } = router.query;
  
  // 🛡️ Guard 1: Handle the "Router Not Ready" phase
  if (!router.isReady) return <div className="min-h-screen bg-[#020617]" />;

  const data = CONTENT[slug as keyof typeof CONTENT];

  // 🛡️ Guard 2: Handle "Slug Not Found" (Prevents Black Screen)
  if (!data) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-mono">
        <div className="text-center space-y-4">
          <ShieldAlert className="mx-auto text-red-600" size={48} />
          <h1 className="text-xl uppercase tracking-widest">Dossier_Not_Found</h1>
          <button onClick={() => router.push('/briefings')} className="text-red-600 underline">RETURN_TO_VAULT</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | {data.title}</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <button onClick={() => router.push('/briefings')} className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-mono text-[10px] uppercase tracking-[0.3em]">
            <ArrowLeft size={14} /> BACK TO VAULT
          </button>
          
          <header className="space-y-4 border-l-4 border-red-600 pl-8">
            <span className="text-red-600 font-mono text-[10px] font-black tracking-[0.3em] uppercase">{data.subtitle}</span>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{data.title}</h1>
          </header>

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-slate-900">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-slate-900/40 p-8 border border-slate-800 rounded-sm">
                <h3 className="font-mono text-[10px] font-black uppercase text-red-600 tracking-widest flex items-center gap-2 mb-6"><FileText size={14} /> BMR FORENSIC ANALYSIS</h3>
                <p className="text-slate-300 leading-relaxed font-bold uppercase text-sm tracking-tight italic">{data.analysis}</p>
              </div>
              
              <div className="bg-gradient-to-r from-slate-950 to-red-950/20 border-y-2 border-red-600/30 py-8 px-10 my-16 shadow-2xl">
                <span className="text-red-500 font-mono text-[10px] font-black tracking-[0.5em] uppercase">CLASSIFIED INTELLIGENCE EYES ONLY</span>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed mt-4 italic font-bold">RECOVERY PROTOCOLS REDACTED PER BMR SECURITY PROTOCOL 7</p>
                <button onClick={() => router.push('/pulse-check/assessment')} className="mt-6 bg-red-600/10 text-red-500 px-6 py-3 text-[9px] font-black font-mono uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all border border-red-600/30">REQUEST ACCESS</button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-red-600/5 border border-red-600/20 p-6 rounded-sm">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">REWORK TAX</span>
                <div className="text-white font-black uppercase text-sm tracking-tighter italic">{data.reworkTax}</div>
                <button onClick={() => router.push('/pulse-check/assessment')} className="w-full bg-white text-black py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 mt-6 shadow-2xl transition-all">PREVENT FAILURE</button>
              </div>
            </div>
          </div>

          <footer className="pt-16 flex flex-col items-center gap-4 opacity-10">
            <Activity className="text-red-600 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.6em] text-slate-500 uppercase">END OF AUTOPSY NODE-SEC-04</span>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
