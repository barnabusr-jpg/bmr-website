"use client";

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight, Activity } from "lucide-react";

const BRIEFINGS = [
  { id: "B-01", title: "THE AIR CANADA PRECEDENT", tag: "LEGAL LIABILITY", path: "/briefings/chatbot-liability", impact: "HIGH" },
  { id: "B-02", title: "NEDA HELPLINE DISSOLUTION", tag: "SYSTEMIC RISK", path: "/briefings/helpline-collapse", impact: "CRITICAL" },
  { id: "B-03", title: "ZILLOW THE 500M LOGIC SHEAR", tag: "FINANCIAL FORENSICS", path: "/briefings/algorithmic-shear", impact: "CRITICAL" }
];

export default function BriefingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | THE VAULT</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-20">
          
          <section className="space-y-6 border-l-4 border-red-600 pl-8">
            <div className="flex items-center gap-4">
              <ShieldAlert className="text-red-600" size={14} />
              <span className="text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">INTERNAL INTELLIGENCE</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
              THE <br /><span className="text-red-600 uppercase">VAULT</span>
            </h1>
          </section>

          <div className="grid gap-6">
            {BRIEFINGS.map((brief, i) => (
              <motion.div 
                key={brief.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-900/10 border border-slate-900 p-10 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xl relative overflow-hidden"
              >
                <div className="space-y-4 text-left">
                   <div className="flex items-center gap-4">
                     <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest italic">{brief.tag}</span>
                     <span className="text-slate-600 font-mono text-[9px] font-black tracking-widest uppercase italic">IMPACT: {brief.impact}</span>
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">{brief.title}</h2>
                </div>
                <button onClick={() => router.push(brief.path)} className="bg-white text-black px-12 py-6 font-black uppercase text-[11px] tracking-[0.4em] flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                  DECLASSIFY <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
          
          <footer className="pt-16 flex flex-col items-center gap-4 opacity-10">
            <Activity className="text-red-600 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.6em] uppercase text-slate-500">AUTHORIZED ACCESS NODE-SEC-04</span>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
