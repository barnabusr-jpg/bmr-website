"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldAlert, FileText, ArrowRight, Activity, Download } from "lucide-react";

export default function DiagnosticResults() {
  const router = useRouter();
  const { score } = router.query;
  const [riskData, setRiskData] = useState({ tier: "ANALYZING", color: "text-slate-500", desc: "" });

  useEffect(() => {
    const s = Number(score) || 0;
    if (s > 100) {
      setRiskData({ tier: "TERMINAL", color: "text-red-600", desc: "SYSTEMIC LOGIC SHEAR DETECTED. IMMEDIATE INTERVENTION REQUIRED." });
    } else if (s > 50) {
      setRiskData({ tier: "CRITICAL", color: "text-orange-500", desc: "HIGH-VELOCITY FRICTION DETECTED IN OPERATIONAL ARRAYS." });
    } else {
      setRiskData({ tier: "MONITORED", color: "text-green-500", desc: "LOGIC GATES ARE FUNCTIONAL. CONTINUOUS MONITORING ADVISED." });
    }
  }, [score]);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-48 px-6 container mx-auto max-w-4xl text-center pb-32">
        <div className="space-y-12">
          {/* HEADER */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
              <Activity size={14} className="animate-pulse" /> DIAGNOSTIC_COMPLETE // SCORE_RECONCILIATION
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              Risk <span className="text-red-600">Report</span>
            </h1>
          </div>

          {/* RISK READOUT */}
          <div className="bg-slate-950/50 border border-slate-900 p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            
            <div className="space-y-6">
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Calculated Intensity Level:</p>
              <motion.h2 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className={`text-7xl md:text-9xl font-black italic uppercase tracking-tighter ${riskData.color}`}
              >
                {riskData.tier}
              </motion.h2>
              <p className="text-slate-400 font-bold uppercase text-sm tracking-widest max-w-md mx-auto italic leading-relaxed">
                {riskData.desc}
              </p>
            </div>
          </div>

          {/* CTA GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-600 p-10 text-left space-y-6 group cursor-pointer hover:bg-white transition-all">
              <FileText className="text-white group-hover:text-red-600" size={40} />
              <h3 className="text-2xl font-black uppercase italic text-white group-hover:text-black leading-none tracking-tighter">Download Board-Level Indictment (PDF)</h3>
              <p className="text-red-100 group-hover:text-slate-600 font-mono text-[10px] uppercase tracking-widest">Includes full breakdown of Rework Tax and Recovery Protocols.</p>
              <button className="flex items-center gap-2 text-white group-hover:text-red-600 font-black font-mono text-[10px] uppercase tracking-[0.2em]">
                Secure Download <Download size={14} />
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-10 text-left space-y-6 hover:border-red-600 transition-all group">
              <ShieldAlert className="text-red-600" size={40} />
              <h3 className="text-2xl font-black uppercase italic text-white leading-none tracking-tighter">Schedule Forensic Consultation</h3>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">Review these findings with a BMR Forensic Lead to identify immediate circuit-breakers.</p>
              <button onClick={() => window.location.href='mailto:hello@bmradvisory.co'} className="flex items-center gap-2 text-red-600 font-black font-mono text-[10px] uppercase tracking-[0.2em] group-hover:text-white">
                Request Briefing <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <button 
            onClick={() => router.push('/briefings')} 
            className="text-slate-700 font-mono text-[9px] uppercase tracking-[0.5em] hover:text-red-600 transition-colors"
          >
            Return to Forensic Vault
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
