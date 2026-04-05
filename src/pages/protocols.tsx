"use client";
import React from "react";
import Header from "@/components/Header";
import { ShieldCheck, Zap, Activity, ArrowRight } from "lucide-react";

const protocols = [
  { id: "01", title: "Shadow AI Containment", desc: "Neutralize unsanctioned tool usage and secure data sovereignty.", duration: "7-14 Days", priority: "Immediate" },
  { id: "02", title: "Rework Tax Elimination", desc: "Re-engineering prompt logic and output verification.", duration: "4-8 Weeks", priority: "High" },
  { id: "03", title: "Expertise Recovery", desc: "Restoring the human-in-the-loop logic for high-stakes decisions.", duration: "Ongoing", priority: "Critical" }
];

export default function Protocols() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="pt-48 px-6 container mx-auto">
        <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity size={14} /> Systemic Correction Hub
        </p>
        <h1 className="text-[120px] font-black uppercase italic tracking-tighter leading-none mb-24">Hardening Protocols</h1>
        
        <div className="space-y-8 pb-32">
          {protocols.map((p) => (
            <div key={p.id} className="group bg-slate-900/20 border border-slate-900 p-12 flex justify-between items-center hover:border-red-600 transition-all">
              <div className="space-y-4">
                <span className="text-red-600 font-mono text-[10px] font-bold border border-red-600/30 px-3 py-1">PROTOCOL {p.id}</span>
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">{p.title}</h2>
                <p className="text-slate-500 max-w-xl text-sm italic">{p.desc}</p>
                <div className="flex gap-8 text-[10px] font-mono text-slate-600 uppercase">
                  <span>Duration: {p.duration}</span>
                  <span>Priority: {p.priority}</span>
                </div>
              </div>
              <button className="bg-white text-black p-6 hover:bg-red-600 hover:text-white transition-all">
                <ArrowRight />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
