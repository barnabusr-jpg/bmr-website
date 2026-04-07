"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldAlert, Activity } from "lucide-react";

export default function BriefingsIndex() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const articles = [
    { slug: "chatbot-liability", title: "The Air Canada Precedent", date: "February 20, 2024", risk: "HALLUCINATION_SHEAR" },
    { slug: "salesforce-failure", title: "Salesforce AI Data Exfiltration", date: "March 15, 2024", risk: "SHADOW_AI_SHEAR" },
    { slug: "lyft-logic-shear", title: "The Lyft Earnings Phantom", date: "February 13, 2024", risk: "ALGORITHMIC_SHEAR" },
    { slug: "clinical-logic-shear", title: "UnitedHealth AI Care Denial", date: "April 02, 2026", risk: "EXPERTISE_SHEAR" }
  ];

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 overflow-x-hidden">
      <Header />
      <main className="pt-48 px-6 container mx-auto pb-32">
        <div className="max-w-5xl mb-20 space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
            <ShieldAlert size={14} /> BMR_FORENSIC_VAULT
          </motion.div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
            Forensic <span className="text-red-600">Briefings</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-500 font-mono text-[10px] uppercase tracking-widest max-w-xl leading-relaxed italic">
            ACTIVE INTELLIGENCE LOGS: IDENTIFYING THE CRITICAL SHEAR BETWEEN HUMAN INPUT AND ALGORITHMIC ACTION.
          </motion.p>
        </div>

        <div className="grid gap-4 max-w-5xl">
          <AnimatePresence>
            {articles.map((a, index) => (
              <motion.div key={a.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link href={`/briefings/${a.slug}`} className="group relative p-10 border border-slate-900 bg-slate-950/50 hover:border-red-600/50 transition-all flex flex-col md:flex-row md:justify-between md:items-center overflow-hidden block">
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-red-600 font-mono text-[9px] uppercase font-black tracking-widest">{a.date}</span>
                      <span className="text-slate-600 font-mono text-[9px] uppercase tracking-widest font-bold">RISK_LEVEL: TERMINAL</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic text-slate-500 group-hover:text-white transition-colors duration-300 tracking-tighter leading-none">{a.title}</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em] group-hover:text-red-600 transition-colors">CLASSIFICATION: {a.risk}</p>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-none border border-slate-800 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 transition-all duration-300">
                    <ArrowRight className="text-slate-500 group-hover:text-white transition-colors" size={24} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
      <footer className="py-24 flex flex-col items-center gap-6 opacity-20 border-t border-slate-900 mx-6"><Activity className="text-red-600 animate-pulse" /><span className="font-mono text-[8px] tracking-[0.8em] text-slate-500 uppercase">BMR_FORENSIC_ALPHA_SYNTHESIS</span></footer>
      <LogicLeakTicker /><Footer />
    </div>
  );
}
