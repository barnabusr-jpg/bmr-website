"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Activity, 
  ShieldAlert,
  Zap
} from "lucide-react";

const IMPACT_COLORS = {
  HIGH: "text-yellow-500",
  CRITICAL: "text-red-500",
  STABILIZING: "text-green-500"
} as const;

const IMPACT_DOTS = {
  HIGH: "bg-yellow-500",
  CRITICAL: "bg-red-500",
  STABILIZING: "bg-green-500"
} as const;

const SECTOR_STYLES = {
  "CROSS-INDUSTRY": "bg-slate-800 border-slate-700",
  "FINANCE / HEALTHCARE": "bg-red-950/40 border-red-900/50",
  "EXECUTIVE STRATEGY": "bg-blue-950/40 border-blue-900/50"
} as const;

const BRIEFINGS = [
  {
    id: "B-01",
    title: "THE AIR CANADA PRECEDENT",
    tag: "LEGAL LIABILITY",
    sector: "CROSS-INDUSTRY",
    vulnerability: "FEB 2024",
    source: "BMR CASE AUTOPSY",
    impact: "HIGH" as keyof typeof IMPACT_COLORS,
    classification: "INTERNAL NOFORN",
    pages: 18,
    desc: "Post-mortem on the landmark court ruling holding a corporation liable for chatbot output. A blueprint for Logic Rot liability.",
    path: "/briefings/chatbot-liability"
  },
  {
    id: "B-02",
    title: "NEDA HELPLINE DISSOLUTION",
    tag: "SYSTEMIC RISK",
    sector: "HEALTHCARE",
    vulnerability: "MAY 2023",
    source: "BMR CASE AUTOPSY",
    impact: "CRITICAL" as keyof typeof IMPACT_COLORS,
    classification: "TOP SECRET BMR-EYES-ONLY",
    pages: 32,
    desc: "Forensic breakdown of the Tessa deployment. How algorithmic drift replaced 20 years of human expertise with a systemic liability.",
    path: "/briefings/helpline-collapse"
  },
  {
    id: "B-03",
    title: "ZILLOW THE 500M LOGIC SHEAR",
    tag: "FINANCIAL FORENSICS",
    sector: "EXECUTIVE STRATEGY",
    vulnerability: "NOV 2021",
    source: "BMR CASE AUTOPSY",
    impact: "CRITICAL" as keyof typeof IMPACT_COLORS,
    classification: "RESTRICTED PROTOCOL-7",
    pages: 40,
    desc: "Autopsy of the $500M inventory write-down. Analysis of the logic failure that occurred when models lost contact with physical reality.",
    path: "/briefings/algorithmic-shear"
  }
];

export default function BriefingsPage() {
  const getThreatLevel = () => {
    if (typeof window === 'undefined') return "OSCILLATING";
    const hour = new Date().getHours();
    if (hour >= 18 || hour <= 4) return "CRITICAL";
    return "OSCILLATING";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30 text-left">
      <Head>
        <title>BMR | FORENSIC BRIEFINGS</title>
      </Head>
      <Header />
      
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-20 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start lg:items-center gap-6 text-left"
          >
            <div className="flex flex-wrap items-center gap-3 border border-red-600/50 p-3 px-5 rounded-full bg-red-600/5 backdrop-blur-md shadow-lg text-left">
              <div className="flex items-center gap-2 text-left">
                <ShieldAlert size={14} className="text-red-500" />
                <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] font-black uppercase text-left">
                  CLEARANCE
                </span>
              </div>
              <div className="flex items-center gap-3 border-l border-red-600/50 pl-4 font-mono text-[10px] text-white uppercase font-black text-left">
                <Activity size={12} className="text-red-500 animate-pulse" />
                ADMIN NODE SEC-04
              </div>
            </div>
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em] italic text-left">
              THREAT LEVEL <span className="text-red-600">{getThreatLevel()}</span> CONFIDENCE 92 PERCENT
            </div>
          </motion.div>

          <section className="space-y-6 border-l-2 border-red-600 pl-6 text-left">
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] text-left">
              FORENSIC <br />
              <span className="text-red-600">BRIEFINGS</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold leading-relaxed italic uppercase text-xs tracking-tight text-left">
              Intelligence on operational divergence and system decay. Access is restricted to leadership tasked with structural recovery.
            </p>
          </section>

          <div className="grid gap-6 text-left">
            {BRIEFINGS.map((brief) => (
              <motion.div 
                key={brief.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/10 border border-slate-900 p-8 md:p-10 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 overflow-hidden text-left"
              >
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black font-mono text-[10px] italic z-20 shadow-2xl">
                  {brief.id}
                </div>

                <div className="space-y-6 z-10 text-left">
                  <div className="flex flex-wrap items-center gap-4 text-left">
                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 tracking-widest uppercase italic">{brief.tag}</span>
                    <span className={`px-3 py-1 border text-[9px] font-mono font-bold uppercase tracking-widest ${SECTOR_STYLES[brief.sector as keyof typeof SECTOR_STYLES]}`}>{brief.sector}</span>
                    <div className="flex items-center gap-2 border-l border-slate-800 pl-4 text-left">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${IMPACT_DOTS[brief.impact]}`} />
                      <span className={`text-[9px] font-mono font-black uppercase tracking-widest ${IMPACT_COLORS[brief.impact]}`}>IMPACT {brief.impact}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors leading-none text-white text-left">{brief.title}</h2>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] font-black tracking-[0.15em] italic text-slate-400 text-left">
                       <span>CLASS {brief.classification}</span>
                       <span>•</span>
                       <span>{brief.pages} PAGES</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium italic max-w-xl leading-relaxed uppercase tracking-tight text-left">{brief.desc}</p>
                    <div className="flex items-center gap-3 pt-2 text-left">
                      <span className="text-[8px] font-mono text-red-600/60 uppercase tracking-widest font-black italic text-left">VULNERABILITY IDENTIFIED {brief.vulnerability}</span>
                    </div>
                  </div>
                </div>

                <div className="z-10 shrink-0 text-left">
                   <button 
                    onClick={() => { window.location.href = brief.path; }}
                    className="bg-white text-black px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all group-hover:translate-x-2 shadow-2xl text-left"
                   >
                    DECLASSIFY <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-red-600 p-12 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl text-center">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Zap size={240} />
             </div>
             <div className="relative z-10 space-y-6 text-center">
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white text-center text-glow-red">
                  INCOMPLETE DATA <br /> IS SYSTEM RISK
                </h2>
                <div className="pt-6 text-center">
                  <button 
                    onClick={() => { window.location.href = '/pulse-check/assessment'; }}
                    className="bg-black text-white px-14 py-7 font-black uppercase text-[12px] tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl text-center"
                  >
                    INITIALIZE DIAGNOSTIC
                  </button>
                </div>
             </div>
          </section>

          <div className="pt-16 border-t border-slate-900 flex flex-col items-center text-center space-y-4 opacity-40 text-center">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.6em] max-w-lg italic font-bold text-center underline">
              WARNING UNAUTHORIZED DISTRIBUTION WILL TRIGGER REVOCATION
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
