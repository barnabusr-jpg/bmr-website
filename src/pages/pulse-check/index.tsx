import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Activity, ShieldAlert, ChevronRight } from "lucide-react";

export default function PulseCheckLanding() {
  const title = "The 12-Question Pulse Check";
  const subheadline = "Expose the Promise Gap between your AI projected savings and its actual cost.";
  
  const items = [
    { label: "System Archetype", desc: "Identify patterns like 'The Replacement Trap'" },
    { label: "Delta Score", desc: "Measure the divergence between organizational roles" },
    { label: "Forensic Verdict", desc: "Quantify hidden rework costs" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500/30">
      <Head>
        <title>BMR | Pulse Check Diagnostic</title>
      </Head>
      
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="border-l-4 border-red-600 pl-8 space-y-4 mt-20">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium italic leading-relaxed">
              {subheadline}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity className="h-32 w-32 text-red-600" />
            </div>
            
            <h2 className="text-xl font-black uppercase tracking-widest text-red-600 mb-8">
              Diagnostic Objectives:
            </h2>
            
            <ul className="space-y-6 mb-12">
              {items.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <ShieldAlert className="h-6 w-6 text-red-900 shrink-0 mt-1" />
                  <div>
                    <span className="block text-lg font-bold text-white uppercase italic">
                      {item.label}
                    </span>
                    <span className="text-slate-500 text-sm italic">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <Link 
              href="/pulse-check/assessment"
              className="inline-flex items-center gap-4 bg-red-600 hover:bg-white text-white hover:text-red-600 font-black py-6 px-12 uppercase tracking-[0.2em] text-[10px] transition-all duration-500 group"
            >
              Start Pulse Check
              <ChevronRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
