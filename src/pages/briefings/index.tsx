"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ShieldAlert, Zap, BarChart3, Fingerprint, DollarSign, UserCog, Shield, Gavel } from "lucide-react";

const RESEARCH = [
  {
    marker: "BMR_RESEARCH_01",
    title: "The Fiduciary Disconnect",
    icon: <ShieldAlert className="text-red-600" size={32} />,
    abstract: "Most companies have a list of AI rules. However, 70% of them can not prove that these rules are being followed. I call this the 'Proof Void.' If your AI makes a massive mistake, you are left with no forensic trail to defend your decisions.",
    operatorNotes: "I have spent 15 years in the trenches of software delivery, and I can tell you right now: a policy on paper is worthless. We build proof into the code itself. If it isn't logged, it didn't happen."
  },
  {
    marker: "BMR_RESEARCH_02",
    title: "The Rework Tax Calculus",
    icon: <Zap className="text-red-600" size={32} />,
    abstract: "AI is supposed to work for you, not the other way around. However, many companies are losing 30 cents of every dollar they spend on AI. Their staff is too busy correcting machine mistakes.",
    operatorNotes: "If you’re paying a senior salary for someone to manually check a machine's homework, your ROI is dead. I stop the bleeding by helping you build automated checkpoints."
  }
];

const PERSONA_ICONS = {
  CFO: <DollarSign size={24} className="text-red-600" />,
  COO: <UserCog size={24} className="text-red-600" />,
  CSO: <Shield size={24} className="text-red-600" />,
};

export default function BriefingsIndex() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Header />
      <main className="pt-56 px-6 container mx-auto pb-40 max-w-7xl text-left">
        <header className="space-y-8 border-l-4 border-red-600 pl-12 mb-32">
          <div className="text-red-600 font-mono text-xs font-black tracking-[0.5em] uppercase">BMR // METHODOLOGY_INDEX // V4.0</div>
          <h1 className="text-7xl md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.8]">Evidence <span className="text-red-600">Vault</span></h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {RESEARCH.map((ref, i) => (
            <div key={i} className="p-16 border border-slate-900 bg-slate-950/20 hover:border-red-600/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-12 text-red-600">
                  <span className="text-xs font-mono font-black uppercase tracking-[0.3em] italic">{ref.marker}</span>
                  {ref.icon}
                </div>
                <h3 className="text-5xl font-black italic uppercase leading-none mb-10 tracking-tighter">{ref.title}</h3>
                <p className="text-slate-400 text-xl leading-relaxed italic mb-12 border-l-2 border-slate-800 pl-8 font-medium">{ref.abstract}</p>
              </div>
              <div className="bg-slate-900/40 p-10 border border-slate-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <Fingerprint size={18} className="text-red-600" />
                  <span className="text-xs font-mono text-red-600 font-black uppercase tracking-widest">Operator_Notes</span>
                </div>
                <p className="text-slate-200 text-lg leading-relaxed font-bold italic">"{ref.operatorNotes}"</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
