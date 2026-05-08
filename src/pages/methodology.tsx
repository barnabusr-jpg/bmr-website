"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Activity, ShieldAlert, ArrowRight, Zap, Target, Search } from "lucide-react";
import Link from 'next/link';

const METHODOLOGY_LENSES = [
  { 
    id: "HAI", 
    label: "HUMAN-AI INTERFACE", 
    description: "Detecting the Trust Gap. We measure where shadow labor replaces system efficiency.",
    icon: <Search className="text-red-600" size={24} /> 
  },
  { 
    id: "AVS", 
    label: "ADOPTION VALUE SYSTEM", 
    description: "Analyzing operational resonance. We identify activity that fails to translate into impact.",
    icon: <Zap className="text-red-600" size={24} /> 
  },
  { 
    id: "IGF", 
    label: "INSTITUTIONAL FIDELITY", 
    description: "Hardening the safeguard loop. Ensuring logic explainability remains under leadership control.",
    icon: <Target className="text-red-600" size={24} /> 
  }
];

export default function Methodology() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30">
      <Header />
      
      <main className="pt-44 pb-32 px-6 max-w-7xl mx-auto text-left">
        {/* 🛡️ MAIN BRANCH HEADER STYLE */}
        <div className="mb-24 border-l-4 border-red-600 pl-12">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert size={20} className="text-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] italic">BMR_PROPRIETARY_FRAMEWORK</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] mb-12">
            SIGNAL <br /><span className="text-white">ARCHITECTURE.</span>
          </h1>
          <p className="max-w-2xl text-2xl text-slate-400 font-medium leading-relaxed italic">
            Most organizations observe symptoms. BMR identifies the underlying logic fractures through a clinical diagnostic cadence.
          </p>
        </div>

        {/* 🛡️ THE LENS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {METHODOLOGY_LENSES.map((lens) => (
            <div key={lens.id} className="bg-slate-950/40 border border-slate-900 p-12 hover:border-red-600/50 transition-all flex flex-col justify-between min-h-[400px] shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="bg-slate-900 p-4 border border-slate-800">
                    {lens.icon}
                  </div>
                  <span className="font-mono text-[11px] text-slate-700 font-black tracking-widest uppercase italic">LENS_{lens.id}</span>
                </div>
                
                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none">
                  {lens.label}
                </h3>
                
                <p className="text-lg text-slate-500 font-medium leading-relaxed italic border-l border-slate-800 pl-6">
                  {lens.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🛡️ RECONSTRUCTION SECTION (Matches the bottom of Main) */}
        <section className="mt-32 pt-20 border-t border-slate-900 flex flex-col md:flex-row gap-20 items-start">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-8 italic">THE INTERVENTION.</h2>
            <p className="text-xl text-slate-500 leading-relaxed italic">
              Once the signal is identified, we deploy the Hardening Protocol. This is not a "project"—it is a structural recovery of the logic chain. We ensure that every AI action is defensible, measurable, and strategically aligned.
            </p>
          </div>
          <div className="md:w-1/2 bg-red-600 p-16 shadow-2xl">
             <h3 className="text-white text-3xl font-black uppercase italic mb-6 italic tracking-tight">Ready to Audit?</h3>
             <p className="text-red-100 text-lg mb-10 italic font-bold">Uncover the fractures in your environment before the rework tax hardens.</p>
             <Link 
              href="/pulse-check" 
              className="inline-flex items-center gap-4 bg-white text-red-600 px-10 py-6 font-black uppercase italic text-sm tracking-widest hover:bg-slate-100 transition-all shadow-xl"
            >
              INITIALIZE_DIAGNOSTIC <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
