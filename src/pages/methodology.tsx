"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComparisonGrid from "@/components/home/ComparisonGrid";
import { Database, Zap } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30">
      <Head><title>BMR | FORENSIC METHODOLOGY</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-24">
          <header className="border-l-4 border-red-600 pl-8 space-y-4 text-left">
             <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none italic text-white">THE <span className="text-red-600 uppercase text-glow-red">MATH.</span></h1>
             <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] italic">FORENSIC COMPARISON VS. TRADITIONAL CONSULTING</p>
          </header>

          <ComparisonGrid />

          <section className="bg-red-600 p-12 md:p-24 text-center space-y-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={300} /></div>
             <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white text-center">STOP GUESSING. <br /> START AUDITING.</h2>
             <button onClick={() => { window.location.href = '/pulse-check/assessment'; }} className="bg-black text-white px-16 py-8 font-black uppercase text-[12px] tracking-[0.6em] hover:bg-white hover:text-black transition-all shadow-2xl">RUN FORENSIC ANALYSIS</button>
          </section>

          <footer className="pt-16 flex flex-col items-center gap-4 opacity-10 text-center">
            <Database className="text-red-600 animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.6em] uppercase text-slate-500 italic">SYSTEM ARCHITECTURE VERIFIED // NODE-SEC-04</span>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
