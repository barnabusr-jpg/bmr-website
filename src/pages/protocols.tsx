"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap } from "lucide-react";

export default function ProtocolsPage() {
  const protocols = [
    { id: "01", title: "Shadow AI Containment", desc: "Neutralize unsanctioned tool usage and secure data sovereignty.", duration: "7-14 Days", counter: "Shadow AI Shear" },
    { id: "02", title: "Rework Tax Elimination", desc: "Re-engineering prompt logic and output verification.", duration: "4-8 Weeks", counter: "Rework Tax" },
    { id: "03", title: "Expertise Recovery", desc: "Restoring human-in-the-loop logic for high-stakes decisions.", duration: "Ongoing", counter: "Logic Decay" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Header />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-6xl">
        <div className="mb-20 flex items-center gap-4">
           <Zap size={14} className="text-red-600" />
           <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] font-black italic leading-none">Systemic Correction Hub</p>
        </div>
        <h1 className="text-[120px] font-black uppercase italic tracking-tighter leading-none mb-24">Hardening <br /> Protocols</h1>
        <div className="space-y-6">
          {protocols.map((p) => (
            <div key={p.id} className="bg-slate-900/10 border border-slate-900 p-12 flex flex-col md:flex-row justify-between items-center gap-12 group hover:border-red-600 transition-all">
              <div className="space-y-6 flex-grow">
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-mono text-white font-bold border border-slate-800 px-3 py-1 uppercase">Protocol {p.id}</span>
                   <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic font-bold">Immediate</span>
                </div>
                <h2 className="text-6xl font-black uppercase italic tracking-tighter">{p.title}</h2>
                <p className="text-slate-400 max-w-2xl italic leading-relaxed">{p.desc}</p>
                <div className="flex gap-8 text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold">
                  <span>Duration: {p.duration}</span>
                  <span>Counter: {p.counter}</span>
                </div>
              </div>
              <button className="bg-white text-black px-12 py-6 font-black uppercase italic text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-4">
                Activate <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
