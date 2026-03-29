"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert } from "lucide-react";

const IMPACT_COLORS = { HIGH: "text-yellow-500", CRITICAL: "text-red-500", STABILIZING: "text-green-500" } as const;
const IMPACT_DOTS = { HIGH: "bg-yellow-500", CRITICAL: "bg-red-500", STABILIZING: "bg-green-500" } as const;
const BRIEFINGS = [
  { id: "B-01", title: "THE AIR CANADA PRECEDENT", tag: "LEGAL LIABILITY", sector: "FINANCE", vulnerability: "FEB 2024", impact: "HIGH" as keyof typeof IMPACT_COLORS, path: "/briefings/chatbot-liability", desc: "Court ruling holding a corporation liable for chatbot output. A blueprint for Logic Rot liability." },
  { id: "B-02", title: "NEDA HELPLINE DISSOLUTION", tag: "SYSTEMIC RISK", sector: "HEALTHCARE", vulnerability: "MAY 2023", impact: "CRITICAL" as keyof typeof IMPACT_COLORS, path: "/briefings/helpline-collapse", desc: "How algorithmic drift replaced 20 years of human expertise with a systemic liability." },
  { id: "B-03", title: "ZILLOW THE 500M LOGIC SHEAR", tag: "FINANCIAL FORENSICS", sector: "FINTECH", vulnerability: "NOV 2021", impact: "CRITICAL" as keyof typeof IMPACT_COLORS, path: "/briefings/algorithmic-shear", desc: "Autopsy of the $500M inventory failure when models lost contact with physical reality." }
];

export default function BriefingsPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | FORENSIC BRIEFINGS</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-20 text-left">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row items-start lg:items-center gap-6 text-left">
            <div className="flex flex-wrap items-center gap-3 border border-red-600/50 p-3 px-5 rounded-full bg-red-600/5 backdrop-blur-md text-left">
              <ShieldAlert size={14} className="text-red-500" />
              <span className="text-white font-mono text-[10px] tracking-[0.2em] font-black uppercase text-left">ADMIN NODE SEC-04</span>
            </div>
          </motion.div>

          <section className="space-y-6 border-l-2 border-red-600 pl-6 text-left">
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] text-left">FORENSIC <br /><span className="text-red-600 uppercase">BRIEFINGS</span></h1>
          </section>

          <div className="grid gap-6">
            {BRIEFINGS.map((brief) => (
              <motion.div key={brief.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group relative bg-slate-900/10 border border-slate-900 p-8 md:p-10 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 overflow-hidden text-left shadow-2xl">
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black font-mono text-[10px] italic z-20 shadow-2xl">{brief.id}</div>
                <div className="space-y-6 z-10 text-left">
                  <div className="flex flex-wrap items-center gap-4 text-left font-mono">
                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 uppercase">{brief.tag}</span>
                    <span className="px-3 py-1 border border-slate-700 text-[9px] font-black uppercase">{brief.sector}</span>
                    <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${IMPACT_DOTS[brief.impact]}`} />
                      <span className={`text-[9px] font-black uppercase ${IMPACT_COLORS[brief.impact]}`}>IMPACT {brief.impact}</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors text-left text-white leading-none">{brief.title}</h2>
                    <p className="text-slate-500 text-sm font-medium italic max-w-xl leading-relaxed uppercase tracking-tight text-left italic">{brief.desc}</p>
                  </div>
                </div>
                <button onClick={() => { window.location.href = brief.path; }} className="bg-white text-black px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                  DECLASSIFY <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
