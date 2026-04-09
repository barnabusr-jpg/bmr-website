"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function ProtocolsPage() {
  const router = useRouter();

  // IDs mapped to ConsolidatedDiagnostic logic dimensions
  const protocols = [
    { 
      id: "shadowAI", 
      title: "Shadow AI Containment", 
      desc: "Neutralize unsanctioned tool usage and secure data sovereignty.", 
      duration: "7-14 Days", 
      counter: "Shadow AI Shear" 
    },
    { 
      id: "reworkTax", 
      title: "Rework Tax Elimination", 
      desc: "Re-engineering prompt logic and output verification.", 
      duration: "4-8 Weeks", 
      counter: "Rework Tax" 
    },
    { 
      id: "expertiseDebt", 
      title: "Expertise Recovery", 
      desc: "Restoring human-in-the-loop logic for high-stakes decisions.", 
      duration: "Ongoing", 
      counter: "Logic Decay" 
    }
  ];

  const handleProtocolActivation = (id: string) => {
    // Gateway resolution: Pass the ID to skip triage and trigger the verification handshake
    router.push(`/pulse-check?initialProtocol=${id}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-6xl">
        <div className="space-y-4 mb-24">
          <h1 className="text-[100px] font-black uppercase italic tracking-tighter leading-none">
            Hardening <br /> Protocols
          </h1>
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] ml-2">
            Node_Selection_Required // Alpha-7_Clearance_Gate
          </p>
        </div>

        <div className="space-y-6">
          {protocols.map((p) => (
            <div 
              key={p.id} 
              className="bg-slate-950 border border-slate-900 p-12 flex flex-col md:flex-row justify-between items-center gap-12 group hover:border-red-600 transition-all"
            >
              <div className="space-y-6 flex-grow">
                <div className="flex items-center gap-4">
                   <span className="text-red-600 font-mono text-xs font-bold">[PROTOCOL_{p.id.toUpperCase()}]</span>
                </div>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                  {p.title}
                </h2>
                <p className="text-slate-400 italic max-w-xl">{p.desc}</p>
                <div className="flex gap-8 pt-2">
                   <div>
                     <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Duration</p>
                     <p className="text-sm font-bold uppercase">{p.duration}</p>
                   </div>
                   <div>
                     <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Focus_Metric</p>
                     <p className="text-sm font-bold uppercase">{p.counter}</p>
                   </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleProtocolActivation(p.id)}
                className="bg-white text-black px-12 py-6 font-black uppercase italic text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-4 whitespace-nowrap shadow-xl"
              >
                Activate Protocol <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
