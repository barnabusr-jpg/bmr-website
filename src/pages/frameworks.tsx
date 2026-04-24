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
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <section className="border-l-2 border-red-600 pl-8 text-left">
            <h1 className="text-[60px] md:text-[85px] font-black uppercase italic tracking-tighter leading-none text-white">
              THE BMR <span className="text-red-600 text-outline">FRAMEWORKS.</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mt-4">
              Operational Recovery Framework // Non-Invasive Inference
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            {frameworkDirectives.map((d) => (
              <div key={d.id} className={`bg-black/40 border ${d.border} p-8 flex flex-col h-full hover:bg-slate-900/40 transition-colors duration-500 group`}>
                <div className="mb-10 text-left">
                  <span className={`text-[9px] font-mono font-black tracking-[0.3em] uppercase ${d.color}`}>
                    {d.label}
                  </span>
                  <h2 className="text-white text-2xl font-black italic uppercase tracking-tighter leading-tight mt-2 pb-4 border-b border-white/5 group-hover:border-white/10">
                    {d.title}
                  </h2>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-light flex-grow italic text-left">
                  {d.description}
                </p>
                <div className="mt-10 pt-4 flex justify-between items-center border-t border-white/5">
                  <span className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em]">
                    DIRECTIVE // {d.id}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${d.color.replace('text', 'bg')} animate-pulse`} />
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
