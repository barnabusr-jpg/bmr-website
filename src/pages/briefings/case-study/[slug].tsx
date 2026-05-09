"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, Activity, ArrowLeft, ExternalLink } from "lucide-react";

const CONTENT: Record<string, any> = {
  "chatbot-liability": {
    title: "THE AIR CANADA PRECEDENT",
    failureType: "HALLUCINATION_SHEAR",
    nodeFocus: "EXECUTIVE",
    subtitle: "AUTOPSY B-01",
    analysis: "A Canadian tribunal ruled that Air Canada's chatbot 'hallucinated' a refund policy. BMR identifies this as a failure of Expectation Continuity.",
    reworkTax: "$812,000 LEGAL SETTLEMENT",
    sourceUrl: "https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html",
    sourceLabel: "VIEW_TRIBUNAL_RULING"
  },
  "salesforce-failure": {
    title: "SALESFORCE AI DATA EXFILTRATION",
    failureType: "SHADOW_AI_SHEAR",
    nodeFocus: "TECHNICAL",
    subtitle: "AUTOPSY B-02",
    analysis: "Hackers exploited the 'Gap' between employee permissions and algorithmic drift. BMR protocols identify this as systemic 'Log Rot'.",
    reworkTax: "$4.2M REGULATORY FINES",
    sourceUrl: "https://www.bankinfosecurity.com/salesforce-sounds-alarm-over-fresh-data-leak-a-24856",
    sourceLabel: "VIEW_TECHNICAL_AUTOPSY"
  },
  "lyft-logic-shear": {
    title: "THE LYFT EARNINGS PHANTOM",
    failureType: "ALGORITHMIC_DRIFT",
    nodeFocus: "MANAGERIAL",
    subtitle: "AUTOPSY B-03",
    analysis: "An extra zero in an earnings release caused a 60% stock surge. This was a failure in the Fiduciary Safeguard Loop.",
    reworkTax: "$2B MARKET CAP VOLATILITY",
    sourceUrl: "https://www.cnbc.com/2024/02/13/lyft-shares-jump-on-earnings-beat.html",
    sourceLabel: "VIEW_FINANCIAL_LOG"
  }
};

export default function CaseAutopsy() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeData, setActiveData] = useState<any>(null);

  useEffect(() => {
    // 🛡️ WAIT FOR ROUTER READY TO KILL THE HANG
    if (router.isReady && slug) {
      setActiveData(CONTENT[slug as string]);
    }
  }, [router.isReady, slug]);

  if (!activeData) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono text-red-600 italic uppercase">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="tracking-[0.4em] text-[10px]">DECRYPTING_CASE_DATA...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans tracking-tight text-left italic">
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-5xl mx-auto space-y-12">
        <button onClick={() => router.push('/briefings')} className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[11px] uppercase tracking-[0.4em] font-black italic">
          <ArrowLeft size={16} /> BACK TO THE VAULT
        </button>

        <header className="space-y-6 border-l-8 border-red-600 pl-10 md:pl-16 italic">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest font-black">
            <span className="text-white bg-red-600 px-3 py-1 font-black italic">CASE_STUDY</span>
            <span className="text-slate-500 italic uppercase font-black">NODE: {activeData.nodeFocus}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic">{activeData.title}</h1>
        </header>

        <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-slate-900">
          <div className="md:col-span-2 space-y-10">
            <div className="bg-white p-12 shadow-2xl border-l-[12px] border-red-600 text-slate-800 italic">
              <h3 className="font-mono text-[11px] font-black uppercase text-red-600 tracking-[0.3em] flex items-center gap-2 mb-8 italic"><ShieldAlert size={18} /> FORENSIC_AUTOPSY_REPORT</h3>
              <p className="text-2xl font-black uppercase italic leading-tight">{activeData.analysis}</p>
              <a href={activeData.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 mt-10 text-[11px] font-mono text-red-600 border-b-2 border-red-600/20 pb-1 hover:text-black transition-all uppercase font-black italic">{activeData.sourceLabel} <ExternalLink size={12} /></a>
            </div>
            <button onClick={() => router.push('/pulse-check')} className="w-full bg-red-600 text-white py-6 font-black uppercase italic tracking-widest text-lg hover:bg-white hover:text-red-600 transition-all shadow-xl">Initialize Recovery Protocol</button>
          </div>
          <aside className="bg-slate-950 border border-slate-800 p-10 h-fit space-y-8 shadow-2xl italic">
              <div className="flex items-center gap-3 text-red-600"><Activity size={14} className="animate-pulse" /><span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Impact_Metrics</span></div>
              <div className="text-red-600 font-black text-2xl uppercase underline decoration-2 underline-offset-4 leading-none italic">{activeData.reworkTax}</div>
              <button onClick={() => router.push('/pulse-check')} className="w-full bg-white text-black py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all italic italic">Generate Indictment</button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
