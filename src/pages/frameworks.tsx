"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const frameworkDirectives = [
  {
    id: "01",
    label: "IMMEDIATE PROTOCOL",
    title: "IMMEDIATE HARDENING",
    description: "The engine identifies where capital is leaking right now. We do not require access to your private data or source code. We analyze the alignment between organizational nodes. This identifies systemic rot without compromising your security perimeter.",
    color: "text-red-600",
    border: "border-red-900/30"
  },
  {
    id: "02",
    label: "STRUCTURAL PROTOCOL",
    title: "STRUCTURAL ALIGNMENT",
    description: "The system rebuilds the logic that connects your operational layers. We ensure that executive intent matches technical execution. This prevents system drift and ensures that every dollar of capital expenditure creates measurable value.",
    color: "text-blue-500",
    border: "border-blue-900/30"
  },
  {
    id: "03",
    label: "GOVERNANCE PROTOCOL",
    title: "GOVERNANCE OVERLAY",
    description: "With your input, we assist in developing new organizational rule sets to protect fiduciary leadership and technical staff. This ensures that all nodes remain responsible for identical outcomes, creating a state of financial and operational safety.",
    color: "text-purple-500",
    border: "border-purple-900/30"
  },
  {
    id: "04",
    label: "FORENSIC PROTOCOL",
    title: "FORENSIC CONTINUITY",
    description: "We provide the framework to monitor your structural health. We observe the pulse of your operations through a specialized reporting cadence. If a variance starts to grow, the system will detect it. You will not pay a hidden rework tax again.",
    color: "text-green-500",
    border: "border-green-900/30"
  }
];

export default function FrameworksPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Header />
      
      <main className="flex-grow pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          <section className="border-l-4 border-red-600 pl-12 text-left space-y-6">
            <h1 className="text-[80px] md:text-[110px] font-black uppercase italic tracking-tighter leading-[0.8] text-white">
              THE BMR <br /><span className="text-red-600">FRAMEWORKS.</span>
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.5em] font-bold">
              Operational Recovery Framework // Non-Invasive Inference // V4.0
            </p>
          </section>

          <section className="max-w-4xl text-left">
             <p className="text-2xl text-slate-400 italic leading-relaxed font-medium">
                Our frameworks are structural requirements for the survival of machine-enabled organizations. We provide the hard logic necessary to bridge the gap between human intent and automated output.
             </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {frameworkDirectives.map((d) => (
              <div 
                key={d.id} 
                className={`bg-slate-900/10 border-2 ${d.border} p-10 flex flex-col h-full hover:bg-slate-900/40 transition-all duration-500 group relative overflow-hidden`}
              >
                <div className="absolute -right-4 -top-4 text-7xl font-black text-white/5 italic select-none">
                    {d.id}
                </div>

                <div className="mb-12 text-left relative z-10">
                  <span className={`text-[11px] font-mono font-black tracking-[0.3em] uppercase ${d.color}`}>
                    {d.label}
                  </span>
                  <h2 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-none mt-4 pb-6 border-b border-white/10">
                    {d.title}
                  </h2>
                </div>

                <p className="text-slate-400 text-lg leading-relaxed font-medium flex-grow italic text-left relative z-10">
                  {d.description}
                </p>

                <div className="mt-12 pt-6 flex justify-between items-center border-t border-white/10 relative z-10">
                  <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-[0.3em]">
                    DIRECTIVE // {d.id}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${d.color.replace('text', 'bg')} animate-pulse`} />
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

