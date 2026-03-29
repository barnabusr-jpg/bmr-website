"use client";

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Insights from "@/components/home/InsightsHome";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight, Activity } from "lucide-react";

const BRIEFINGS = [
  { id: "B-01", title: "THE AIR CANADA PRECEDENT", tag: "LIABILITY", path: "/briefings/chatbot-liability" },
  { id: "B-02", title: "NEDA HELPLINE DISSOLUTION", tag: "SYSTEMIC", path: "/briefings/helpline-collapse" },
  { id: "B-03", title: "ZILLOW THE 500M LOGIC SHEAR", tag: "FINANCIAL", path: "/briefings/algorithmic-shear" }
];

export default function BriefingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30">
      <Head><title>BMR | THE VAULT</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          
          <header className="border-l-4 border-red-600 pl-8 space-y-4 text-left">
             <div className="flex items-center gap-3 italic">
               <ShieldAlert size={14} className="text-red-600"/>
               <span className="text-red-600 font-mono text-[10px] font-black tracking-widest uppercase">AUTHORIZED EYES ONLY</span>
             </div>
             <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none italic text-white">THE <span className="text-red-600">VAULT.</span></h1>
          </header>

          {/* This moves the long scroll content off the home page */}
          <Insights />

          <div className="grid gap-6">
            {BRIEFINGS.map((brief, i) => (
              <motion.div 
                key={brief.id} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="group bg-slate-900/10 border border-slate-900 p-10 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xl relative text-left italic"
              >
                <div className="space-y-4 text-left">
                   <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest italic">{brief.tag}</span>
                   <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">{brief.title}</h2>
                </div>
                <button 
                  onClick={() => router.push(brief.path)} 
                  className="bg-white text-black px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-2xl"
                >
                  DECLASSIFY <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <footer className="pt-16 flex flex-col items-center gap-4 opacity-10">
            <Activity className="text-red-600 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.6em] uppercase text-slate-500">END OF BRIEFING NODE-SEC-04</span>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
