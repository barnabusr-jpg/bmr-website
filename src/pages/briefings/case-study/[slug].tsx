"use client";
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, ArrowLeft, Activity, ShieldAlert, ExternalLink } from "lucide-react";

// (Keep your existing CONTENT object here)

export default function BriefingDocument({ data }: { data: any }) {
  const router = useRouter();
  if (!data) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans tracking-tight">
      <Head><title>BMR | {data.title}</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 max-w-5xl mx-auto space-y-12">
        <button onClick={() => router.push('/briefings')} className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all font-mono text-[11px] uppercase tracking-[0.4em] font-black">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK TO THE VAULT
        </button>
        
        <header className="space-y-6 border-l-8 border-red-600 pl-10 md:pl-16">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest font-black italic">
            <span className="text-white bg-red-600 px-3 py-1">{data.failureType?.replace(/_/g, " ") || "LOGIC_VARIANCE"}</span>
            <span className="text-slate-500">AFFECTED_NODE: {data.nodeFocus || "EXECUTIVE"}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">{data.title}</h1>
        </header>

        <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-slate-900">
          <div className="md:col-span-2 space-y-10">
            {/* 🛡️ THE HIGH-CONTRAST "ISLAND" CARD */}
            <div className="bg-white p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-l-[12px] border-red-600">
              <h3 className="font-mono text-[11px] font-black uppercase text-red-600 tracking-[0.3em] flex items-center gap-2 mb-8 italic">
                <ShieldAlert size={18} /> FORENSIC_AUTOPSY_REPORT
              </h3>
              <p className="text-slate-800 leading-relaxed font-bold uppercase text-2xl italic tracking-tighter">
                {data.analysis}
              </p>
              <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 mt-10 text-[11px] font-mono text-red-600 border-b-2 border-red-600/20 pb-1 hover:text-black hover:border-black transition-all uppercase font-black font-bold">
                {data.sourceLabel} <ExternalLink size={12} />
              </a>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-12 space-y-8 rounded-lg shadow-2xl">
              <h4 className="text-white font-black italic text-3xl uppercase tracking-tighter leading-none">Initialize Fracture Audit</h4>
              <p className="text-slate-400 font-medium italic text-lg leading-relaxed italic uppercase font-black">Analyze your own deployment for the same fractures identified in this autopsy.</p>
              <button onClick={() => router.push('/diagnostic')} className="bg-red-600 text-white px-10 py-6 font-black uppercase italic tracking-widest text-lg hover:bg-white hover:text-red-600 transition-all shadow-lg">Run Node Triangulation</button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-slate-950 border-2 border-slate-900 p-10 sticky top-44 space-y-8 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600">
                <Activity size={14} className="animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Case_Metrics</span>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-black italic block italic">Rework Tax:</span>
                <div className="text-red-600 font-black text-2xl tracking-tighter italic uppercase underline decoration-2 underline-offset-4 font-black italic">{data.reworkTax}</div>
              </div>
              <button onClick={() => router.push('/diagnostic')} className="w-full bg-white text-black py-6 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-xl">Download Case File</button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
