"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { 
  Lock, 
  ArrowRight, 
  Activity, 
  AlertTriangle, 
  Zap,
  ShieldCheck,
  ShieldAlert
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
    title: "MODEL COLLAPSE & REWORK TAX",
    tag: "FORENSIC DECAY",
    sector: "CROSS-INDUSTRY",
    vulnerability: "AUG 2024",
    source: "Nature / Oxford",
    impact: "HIGH" as keyof typeof IMPACT_COLORS,
    classification: "INTERNAL/NOFORN",
    pages: 18,
    attachments: 3,
    desc: "Analysis of recursive AI training loops creating a 40% increase in 'Logic Rot' across enterprise models.",
    status: "UNLOCKED",
    path: "https://www.nature.com/articles/s41586-024-07546-0"
  },
  {
    id: "B-02",
    title: "THE 2026 EXFILTRATION CRISIS",
    tag: "SYSTEMIC RISK",
    sector: "FINANCE / HEALTHCARE",
    vulnerability: "JAN 2026",
    source: "Cyberhaven / Forrester",
    impact: "CRITICAL" as keyof typeof IMPACT_COLORS,
    classification: "TOP SECRET // BMR-EYES-ONLY",
    pages: 32,
    attachments: 7,
    desc: "Forrester Q1 2026 Analysis: Shadow AI has surpassed phishing as the primary vector for corporate data exfiltration.",
    status: "UNLOCKED",
    path: "https://www.cyberhaven.com/blog/ai-data-loss-prevention-report/"
  },
  {
    id: "B-03",
    title: "LOGIC AUTHORITY & LIABILITY",
    tag: "LEGAL FORENSICS",
    sector: "EXECUTIVE STRATEGY",
    vulnerability: "FEB 2026",
    source: "Stanford HAI",
    impact: "STABILIZING" as keyof typeof IMPACT_COLORS,
    classification: "RESTRICTED // PROTOCOL-7",
    pages: 12,
    attachments: 2,
    desc: "Stanford 2026 Briefing: The transition from 'AI Assistance' to 'Systemic Negligence' in automated decision-making.",
    status: "UNLOCKED",
    path: "https://hai.stanford.edu/news/regulating-ai-risk"
  }
];

export default function BriefingsPage() {
  const sessionId = "NODE-SEC-04";
  
  const getThreatLevel = () => {
    if (typeof window === 'undefined') return "OSCILLATING";
    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 4) return "CRITICAL";
    if (hour >= 18) return "ELEVATED";
    return "OSCILLATING";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head>
        <title>BMR | FORENSIC BRIEFINGS</title>
      </Head>
      <Header />
      
      <main className="pt-44 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start lg:items-center gap-6"
          >
            <div className="flex flex-wrap items-center gap-3 border border-red-600/50 p-3 px-5 rounded-full bg-gradient-to-r from-red-900/20 to-red-600/5 backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-red-500" />
                <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] font-black uppercase">
                  CLEARANCE
                </span>
              </div>
              <div className="flex items-center gap-3 border-l border-red-600/50 pl-4">
                <Activity size={12} className="text-red-500 animate-pulse" />
                <span className="text-white font-mono text-[10px] tracking-[0.2em] font-black uppercase">
                  ADMIN {sessionId}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 border-l border-red-600/50 pl-4">
                <Lock size={12} className="text-red-500 opacity-60" />
                <span className="text-red-500/80 font-mono text-[9px] tracking-widest uppercase">
                  SESSION 2359 UTC
                </span>
              </div>
            </div>
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em] italic">
              THREAT LEVEL <span className="text-red-600">{getThreatLevel()}</span> CONFIDENCE 92%
            </div>
          </motion.div>

          <section className="space-y-6 text-left">
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4">
              FORENSIC <br />
              <span className="text-red-600">BRIEFINGS</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold leading-relaxed italic uppercase text-xs tracking-tight border-l border-red-600 pl-6">
              Intelligence on operational divergence and system decay. Access is restricted to leadership tasked with structural recovery.
            </p>
          </section>

          <div className="grid gap-6">
            {BRIEFINGS.map((brief) => (
              <motion.div 
                key={brief.id}
                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ scale: 1.005 }}
                className="group relative bg-slate-900/10 border border-slate-900 p-8 md:p-10 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 overflow-hidden text-left"
              >
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black font-mono text-[10px] italic z-20 shadow-2xl">
                  {brief.id}
                </div>

                <div className="space-y-6 z-10 text-left">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 tracking-widest uppercase italic shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                      {brief.tag}
                    </span>
                    <span className={`px-3 py-1 border text-[9px] font-mono font-bold uppercase tracking-widest ${SECTOR_STYLES[brief.sector as keyof typeof SECTOR_STYLES]}`}>
                      {brief.sector}
                    </span>
                    <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${IMPACT_DOTS[brief.impact]}`} />
                      <span className={`text-[9px] font-mono font-black uppercase tracking-widest ${IMPACT_COLORS[brief.impact]}`}>
                        IMPACT {brief.impact}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors leading-none">
                      {brief.title}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] font-black tracking-[0.15em] italic">
                       <span className="text-red-500/80">CLASS {brief.classification}</span>
                       <span className="text-slate-500">{brief.pages} PAGES</span>
                    </div>

                    <p className="text-slate-500 text-sm font-medium italic max-w-xl leading-relaxed uppercase tracking-tight">
                      {brief.desc}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-[8px] font-mono text-red-600/60 uppercase tracking-widest font-black italic">
                        VULNERABILITY IDENTIFIED {brief.vulnerability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="z-10 shrink-0">
                   <button 
                    onClick={() => { if (brief.path) window.open(brief.path, '_blank'); }}
                    className="bg-white text-black px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all group-hover:translate-x-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                   >
                    DECLASSIFY <ArrowRight size={16} />
                  </button>
                </div>

                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none hidden lg:block translate-x-10 group-hover:translate-x-0">
                  <div className="w-48 h-64 bg-slate-900 border border-slate-700 rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-500">
                    <div className="h-8 bg-slate-800 flex items-center px-3 border-b border-slate-700 justify-between">
                      <div className="flex gap-1.5 text-red-500 font-bold text-[8px]">
                        BMR
                      </div>
                      <ShieldCheck size={12} className="text-slate-600" />
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="h-1.5 bg-slate-700 rounded w-full" />
                      <div className="h-1.5 bg-slate-700 rounded w-5/6" />
                      <div className="h-24 bg-red-600/5 rounded border border-red-600/10 flex items-center justify-center relative overflow-hidden">
                        <Activity size={24} className="text-red-600/10 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-red-600 p-12 md:p-20 text-center space-y-8 relative overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.2)]">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Zap size={240} />
             </div>
             <div className="relative z-10 space-y-6">
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white text-center">
                  INCOMPLETE DATA <br /> IS SYSTEM RISK
                </h2>
                <div className="pt-6">
                  <button 
                    onClick={() => { window.location.href = '/pulse-check/assessment'; }}
                    className="bg-black text-white px-14 py-7 font-black uppercase text-[12px] tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl"
                  >
                    INITIALIZE DIAGNOSTIC
                  </button>
                </div>
             </div>
          </section>

          <div className="pt-16 border-t border-slate-900 flex flex-col items-center text-center space-y-4 opacity-40">
            <AlertTriangle size={24} className="text-red-600" />
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
