"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { ArrowRight, ShieldAlert, Zap, BarChart3, Fingerprint, DollarSign, UserCog, Shield, Gavel } from "lucide-react";

const RESEARCH = [
  {
    marker: "BMR_RESEARCH_01",
    title: "The Fiduciary Disconnect",
    icon: <ShieldAlert className="text-red-600" size={32} />,
    abstract: "Most companies have a list of AI rules. However, 70% of them can not prove that these rules are being followed. I call this the 'Proof Void.' If your AI makes a massive mistake, you are left with no forensic trail to defend your decisions.",
    operatorNotes: "I have led engineering teams where oversight was just a few emails or a spreadsheet. You cannot defend a million-dollar lawsuit with an IM thread. We build proof into the code itself. If it isn't logged, it didn't happen."
  },
  {
    marker: "BMR_RESEARCH_02",
    title: "The Rework Tax Calculus",
    icon: <Zap className="text-red-600" size={32} />,
    abstract: "AI is supposed to work for you, not the other way around. many companies are losing 30 cents of every dollar spent on AI. Your staff is too busy correcting machine mistakes. This is the 'Rework Tax.'",
    operatorNotes: "If you are paying a senior salary for someone to manually check a machine's homework, your ROI is dead. We stop the bleeding by building automated checkpoints so your team can get back to building, not babysitting."
  }
];

const CASES = [
  { slug: "lyft-logic-shear", title: "The Lyft Earnings Phantom", node: "PHOENIX (EXE)", impact: "$2.0B Market Cap Loss", persona: "CFO", hook: "A single unverified data point + high-speed bots = $2B market cap loss." },
  { slug: "clinical-logic-shear", title: "UnitedHealth AI Care Denial", node: "TITAN (MGR)", impact: "Regulatory Sanction", persona: "COO", hook: "AI overrode clinical judgment, causing patient harm and $2.4B in operational fallout." }
];

const PERSONA_ICONS = {
  CFO: <DollarSign size={24} className="text-red-600" />,
  COO: <UserCog size={24} className="text-red-600" />,
  CSO: <Shield size={24} className="text-red-600" />,
  GC: <Gavel size={24} className="text-red-600" />,
};

export default function BriefingsIndex() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30 overflow-x-hidden">
      <Header />
      
      <main className="pt-56 px-6 container mx-auto pb-40 max-w-7xl">
        
        {/* RESEARCH SECTION: THE VAULT */}
        <div className="mb-40 space-y-20">
          <header className="space-y-8 border-l-4 border-red-600 pl-12">
            <div className="text-red-600 font-mono text-xs font-black tracking-[0.5em] uppercase">BMR // METHODOLOGY_INDEX // V4.0</div>
            <h1 className="text-7xl md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.8] text-white">
              Evidence <span className="text-red-600">Vault</span>
            </h1>
            <p className="text-2xl text-slate-400 italic max-w-3xl leading-relaxed">
               Forensic intelligence on systemic capital decay and the erosion of operational trust.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {RESEARCH.map((ref, i) => (
              <div key={i} className="p-16 border border-slate-900 bg-slate-950/20 hover:border-red-600/40 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-12 text-red-600">
                    <span className="text-xs font-mono font-black uppercase tracking-[0.3em] italic">{ref.marker}</span>
                    {ref.icon}
                  </div>
                  <h3 className="text-5xl font-black italic uppercase leading-none mb-10 tracking-tighter text-white">{ref.title}</h3>
                  <p className="text-slate-400 text-xl leading-relaxed italic mb-12 border-l-2 border-slate-800 pl-8 font-medium">
                    {ref.abstract}
                  </p>
                </div>

                <div className="bg-slate-900/40 p-10 border border-slate-800/50 mt-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Fingerprint size={18} className="text-red-600" />
                    <span className="text-xs font-mono text-red-600 font-black uppercase tracking-widest">Operator_Notes</span>
                  </div>
                  <p className="text-slate-200 text-lg leading-relaxed font-bold italic">
                    "{ref.operatorNotes}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CASE STUDY SECTION: THE ARCHIVE */}
        <div className="space-y-20">
          <header className="space-y-8 border-l-4 border-slate-800 pl-12">
             <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-slate-800">
                Case_Study <span className="text-white">Archive</span>
             </h2>
          </header>

          <div className="grid gap-6">
            {CASES.map((a) => (
              <Link 
                key={a.slug} 
                href={`/briefings/${a.slug}`} 
                className="group p-12 border border-slate-900 bg-slate-950/20 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
              >
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center gap-6">
                    {PERSONA_ICONS[a.persona as keyof typeof PERSONA_ICONS]}
                    <span className="text-red-600 font-mono text-xs font-black uppercase tracking-[0.3em] italic">Implicated: {a.node}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-600 group-hover:text-white transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-slate-400 font-bold uppercase text-sm italic group-hover:text-slate-200 tracking-widest">
                    {a.hook}
                  </p>
                </div>
                <ArrowRight size={48} className="text-slate-900 group-hover:text-red-600 transition-transform group-hover:translate-x-4 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
