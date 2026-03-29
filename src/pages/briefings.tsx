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
  ShieldCheck
} from "lucide-react";

// --- Forensic Data Schema ---
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
    title: "THE REWORK TAX REPORT",
    tag: "FORENSIC ANALYSIS",
    sector: "CROSS-INDUSTRY",
    impact: "HIGH" as keyof typeof IMPACT_COLORS,
    desc: "Quantifying the silent labor hemorrhage caused by human-in-the-loop verification of AI outputs.",
    status: "UNLOCKED"
  },
  {
    id: "B-02",
    title: "SHADOW SHEAR RISK MATRIX",
    tag: "SYSTEMIC RISK",
    sector: "FINANCE / HEALTHCARE",
    impact: "CRITICAL" as keyof typeof IMPACT_COLORS,
    desc: "Forensic analysis of unsanctioned tool deployment and the resulting expertise decay.",
    status: "REQUIRES TRIAGE"
  },
  {
    id: "B-03",
    title: "LOGIC RECONSTRUCTION PROTOCOL",
    tag: "LABOR ECONOMICS",
    sector: "EXECUTIVE STRATEGY",
    impact: "STABILIZING" as keyof typeof IMPACT_COLORS,
    desc: "A methodological framework for hardening logic chains before structural architectural collapse.",
    status: "UNLOCKED"
  }
];

export default function BriefingsPage() {
  const sessionId = "SEC-NODE-04";

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head>
        <title>BMR | FORENSIC BRIEFINGS</title>
      </Head>
      <Header />
      
      <main className="pt-44 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* --- Hardened Authentication UI --- */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6"
          >
            <div className="flex items-center gap-3 border border-red-600/30 p-3 px-5 rounded-full bg-red-600/5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Lock size={12} className="text-red-600" />
                <span className="text-red-600 font-mono text-[9px] tracking-[0.4em] font-black uppercase">
                  AUTH LEVEL
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-red-600/30 pl-4">
                <Activity size={12} className="text-red-600 animate-pulse" />
                <span className="text-white font-mono text-[9px] tracking-[0.2em] font-black uppercase">
                  ADMIN CLEARANCE ACTIVE
                </span>
              </div>
            </div>
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest italic">
              Session ID: {sessionId}
            </div>
          </motion.div>

          {/* --- Hero Section --- */}
          <section className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4">
              FORENSIC <br />
              <span className="text-red-600">BRIEFINGS.</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold leading-relaxed italic uppercase text-xs tracking-tight border-l border-red-600 pl-6">
              Declassified intelligence on AI system drift and logic decay. Access is restricted to leadership tasked with structural recovery.
            </p>
          </section>

          {/* --- Briefing Grid --- */}
          <div className="grid gap-6">
            {BRIEFINGS.map((brief, i) => (
              <motion.div 
                key={brief.id}
                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={{ scale: 1.005 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 150 }}
                className="group relative bg-slate-900/10 border border-slate-900 p-8 md:p-10 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 overflow-hidden"
              >
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black font-mono text-[10px] italic shadow-lg z-20">
                  {brief.id}
                </div>

                <div className="space-y-6 z-10">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 tracking-widest uppercase italic">
                      {brief.tag}
                    </span>
                    <span className={`px-3 py-1 border text-[9px] font-mono font-bold uppercase tracking-widest ${SECTOR_STYLES[brief.sector as keyof typeof SECTOR_STYLES]}`}>
                      {brief.sector}
                    </span>
                    <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${IMPACT_DOTS[brief.impact]}`} />
                      <span className={`text-[9px] font-mono font-black uppercase tracking-widest ${IMPACT_COLORS[brief.impact]}`}>
                        IMPACT: {brief.impact}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors leading-none">
                      {brief.title}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium italic max-w-xl leading-relaxed uppercase tracking-tight">
                      {brief.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 z-10">
                   <button className="bg-white text-black px-10 py-5 font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all group-hover:translate-x-2 shadow-2xl">
                    {brief.status === "UNLOCKED" ? "DECLASSIFY" : "REQUEST ACCESS"}
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none hidden lg:block translate-x-10 group-hover:translate-x-0">
                  <div className="w-44 h-56 bg-slate-900 border border-slate-700 rounded-sm shadow-2xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform">
                    <div className="h-6 bg-slate-800 flex items-center px-2 border-b border-slate-700 justify-between">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                      </div>
                      <ShieldCheck size={10} className="text-slate-600" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="h-1 bg-slate-700 rounded w-full" />
                      <div className="h-1 bg-slate-700 rounded w-3/4" />
                      <div className="h-1 bg-slate-700 rounded w-1/2" />
                      <div className="h-20 bg-red-600/5 rounded border border-red-600/20 flex items-center justify-center">
                        <Activity size={16} className="text-red-600/20" />
                      </div>
                      <div className="h-1 bg-slate-800 rounded w-full" />
                      <div className="h-1 bg-slate-800 rounded w-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-red-600 p-12 md:p-16 text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={120} />
             </div>
             <div className="relative z-10 space-y-4">
                <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                  Incomplete Data <br /> Is System Risk.
                </h2>
                <p className="text-red-100 uppercase font-mono text-[10px] tracking-[0.3em] max-w-lg mx-auto leading-relaxed italic">
                  Generic briefings provide context. A pulse-check provides recovery. Start your private forensic audit.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => { window.location.href = '/pulse-check/assessment'; }}
                    className="bg-black text-white px-12 py-6 font-black uppercase text-[12px] tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-xl"
                  >
                    INITIALIZE DIAGNOSTIC
                  </button>
                </div>
             </div>
          </section>

          <div className="pt-12 border-t border-slate-900 flex flex-col items-center text-center space-y-4 opacity-30">
            <AlertTriangle size={20} className="text-red-600" />
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.6em] max-w-md">
              WARNING: UNAUTHORIZED DISTRIBUTION OF THESE BRIEFINGS WILL TRIGGER SYSTEM-WIDE REVOCATION OF CREDENTIALS.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
