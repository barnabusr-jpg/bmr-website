"use client";
import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, Activity, ArrowLeft, ExternalLink } from "lucide-react";

// (Keep your existing CONTENT object from the previous slug file)

export default function BriefingDocument({ data }: { data: any }) {
  const router = useRouter();
  if (!data) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans tracking-tight text-left">
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-5xl mx-auto space-y-12">
        <button onClick={() => router.push('/briefings')} className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[11px] uppercase tracking-[0.4em] font-black italic">
          <ArrowLeft size={16} /> BACK TO THE VAULT
        </button>
        <header className="space-y-6 border-l-8 border-red-600 pl-10 md:pl-16">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest font-black italic">
            <span className="text-white bg-red-600 px-3 py-1 font-black italic">CASE_STUDY</span>
            <span className="text-slate-500">NODE: {data.nodeFocus || "EXECUTIVE"}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] italic">{data.title}</h1>
        </header>

        <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-slate-900">
          <div className="md:col-span-2 space-y-10">
            {/* 🛡️ ACCESSIBILITY ISLAND: HIGH CONTRAST */}
            <div className="bg-white p-12 shadow-2xl border-l-[12px] border-red-600 text-slate-800">
              <h3 className="font-mono text-[11px] font-black uppercase text-red-600 tracking-[0.3em] flex items-center gap-2 mb-8 italic"><ShieldAlert size={18} /> FORENSIC_AUTOPSY_REPORT</h3>
              <p className="text-2xl font-black uppercase italic leading-tight">{data.analysis}</p>
              <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 mt-10 text-[11px] font-mono text-red-600 border-b-2 border-red-600/20 pb-1 hover:text-black transition-all uppercase font-black">{data.sourceLabel} <ExternalLink size={12} /></a>
            </div>
            <button onClick={() => router.push('/pulse-check')} className="w-full bg-red-600 text-white py-6 font-black uppercase italic tracking-widest text-lg hover:bg-white hover:text-red-600 transition-all shadow-xl">Initialize Recovery Protocol</button>
          </div>
          <aside className="bg-slate-950 border border-slate-800 p-10 h-fit space-y-8 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600"><Activity size={14} className="animate-pulse" /><span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Metrics</span></div>
              <div className="text-red-600 font-black text-2xl italic uppercase underline decoration-2 underline-offset-4 italic leading-none">{data.reworkTax}</div>
              <button onClick={() => router.push('/pulse-check')} className="w-full bg-white text-black py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all italic italic">Generate Indictment</button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
