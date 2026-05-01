"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { ArrowRight, ShieldAlert, Zap, BarChart3, Fingerprint, DollarSign, UserCog, Shield, Gavel } from "lucide-react";

const METHODOLOGY_BRIEFINGS = [
  {
    marker: "BMR_RESEARCH_01",
    title: "The Fiduciary Disconnect",
    icon: <ShieldAlert className="text-red-600" size={24} />,
    abstract: "Most companies have a list of AI rules. However, 70% of them can not prove that these rules are being followed. I call this the 'Proof Void.' If your AI makes a massive mistake, you are left with no forensic trail to defend your decisions. You are not simply at risk; you are flying blind.",
    operatorNotes: "I have spent 15 years in the trenches of software delivery, and I can tell you right now: a policy on paper is worthless. In most audits, I found that 'oversight' is a few emails, IMs, or a spreadsheet. You cannot defend a million-dollar lawsuit with an IM thread. I identify these gaps and assist in building proof into the code itself. If it isn't logged, it didn't happen."
  },
  {
    marker: "BMR_RESEARCH_02",
    title: "The Rework Tax Calculus",
    icon: <Zap className="text-red-600" size={24} />,
    abstract: "AI is supposed to work for you, not the other way around. However, many companies are losing 30 cents of every dollar they spend on AI. Why? Their staff is too busy correcting machine mistakes. This is the 'Rework Tax,' and it kills profit margins and burns out your best people.",
    operatorNotes: "I have led engineering teams where senior guys were spending hours a day 'babysitting' outputs. Again, a massive waste of resources. If you’re paying a senior salary for someone to check a machine's homework, your ROI is dead. I stop the bleeding by helping you build automated checkpoints which effectively fix the process, so your team can get back to building, not babysitting."
  },
  {
    marker: "BMR_RESEARCH_03",
    title: "Structural Logic Shear",
    icon: <BarChart3 className="text-red-600" size={24} />,
    abstract: "Set it and forget it does not work with systems as they drift. 'Logic Shear' happens when your business goals and your technology stop talking to each other. It usually starts small with a few unmonitored updates. By then, the investment is usually a total loss.",
    operatorNotes: "I have seen firsthand how 'drift' destroys great projects. It is a slow and methodical architectural collapse. First, you see a little 'Shadow AI' here, then an unlogged update there. Before long, you are rebuilding from scratch. Building a fiduciary layer that keeps your tech aligned with your goals in real time is critical. We help you keep the machine on YOUR roadmap."
  }
];

const CASE_STUDIES = [
  { slug: "lyft-logic-shear", title: "The Lyft Earnings Phantom", node: "PHOENIX (EXE)", impact: "$2.0B Market Cap Loss", persona: "CFO", hook: "A single unverified data point + high-speed bots = $2B market cap loss." },
  { slug: "clinical-logic-shear", title: "UnitedHealth AI Care Denial", node: "TITAN (MGR)", impact: "Regulatory Sanction", persona: "COO", hook: "AI overrode clinical judgment, causing patient harm and $2.4B in operational fallout." },
  { slug: "defense-intelligence-shear", title: "Pentagon 'Shadow' LLM Leak", node: "ATLAS (TEC)", impact: "Data Exfiltration", persona: "CSO", hook: "A 'helpful' AI summarization tool exfiltrated data via public LLM endpoints." },
  { slug: "chatbot-liability", title: "The Air Canada Precedent", node: "PHOENIX (EXE)", impact: "Binding Legal Liability", persona: "GC", hook: "The bot’s hallucination became a binding legal contract, creating an $812K liability." }
];

const PERSONA_ICONS = {
  CFO: <DollarSign size={20} className="text-red-600" />,
  COO: <UserCog size={20} className="text-red-600" />,
  CSO: <Shield size={20} className="text-red-600" />,
  GC: <Gavel size={20} className="text-red-600" />,
};

export default function BriefingsIndex() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans tracking-tighter">
      <Header />
      <main className="pt-48 px-6 container mx-auto pb-32 max-w-6xl">
        
        {/* SECTION 1: PROPRIETARY METHODOLOGY (THE EVIDENCE VAULT) */}
        <div className="mb-24 space-y-12">
          <div className="space-y-6 border-l-4 border-red-600 pl-8">
            <div className="text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">BMR // FORENSIC_METHODOLOGY</div>
            <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">Evidence <span className="text-red-600">Vault</span></h1>
            <p className="text-slate-500 font-mono text-[11px] uppercase tracking-widest max-w-2xl leading-relaxed italic">
              15+ Years Operational Deployment. These research briefings define the mechanics of Structural Logic Shear and the ROI of Signal Neutralization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {METHODOLOGY_BRIEFINGS.map((ref, i) => (
              <div key={i} className="p-10 border border-slate-900 bg-slate-950/20 hover:border-red-600 transition-all group flex flex-col min-h-[580px]">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[9px] font-mono text-red-600 font-black uppercase tracking-widest italic border-b border-red-600/30 pb-1">{ref.marker}</span>
                    {ref.icon}
                  </div>
                  <h3 className="text-3xl font-black italic uppercase leading-none mb-6 tracking-tighter">{ref.title}</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed italic mb-8 border-l border-slate-800 pl-4">{ref.abstract}</p>
                  
                  <div className="bg-slate-900/40 p-6 border border-slate-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Fingerprint size={14} className="text-red-600" />
                      <span className="text-[9px] font-mono text-red-600 font-black uppercase tracking-widest text-[8px]">Operator_Notes</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed font-medium italic">"{ref.operatorNotes}"</p>
                  </div>
                </div>
                <div className="pt-8 mt-8 border-t border-slate-900/50">
                   <button onClick={() => window.location.href = 'https://calendly.com/hello-bmradvisory/forensic-review'} 
                           className="w-full text-left text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest group-hover:text-white transition-colors flex items-center justify-between">
                     Request Full Briefing <ArrowRight size={14} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: CASE STUDY ARCHIVE */}
        <div className="space-y-12">
          <div className="space-y-6 border-l-4 border-slate-800 pl-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-slate-600">Case_Study <span className="text-white">Archive</span></h2>
            <p className="text-slate-500 font-mono text-[11px] uppercase tracking-widest max-w-2xl leading-relaxed italic">
              Verified dossiers of systemic AI failure. High-speed logic drift mapped to operational nodes.
            </p>
          </div>

          <div className="grid gap-4">
            {CASE_STUDIES.map((a) => (
              <Link key={a.slug} href={`/briefings/${a.slug}`} className="group p-10 border border-slate-900 bg-slate-950/20 hover:border-red-600/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4 max-w-2xl text-left">
                  <div className="flex items-center gap-4">
                    {PERSONA_ICONS[a.persona as keyof typeof PERSONA_ICONS]}
                    <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-widest">Implicated: {a.node}</span>
                    <span className="text-slate-600 font-mono text-[8px] uppercase tracking-widest">{a.impact}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase italic text-slate-400 group-hover:text-white transition-colors leading-none">{a.title}</h2>
                  <p className="text-slate-500 font-bold uppercase text-[11px] italic group-hover:text-slate-200">{a.hook}</p>
                </div>
                <ArrowRight size={32} className="text-slate-900 group-hover:text-red-600 transition-transform group-hover:translate-x-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* FINAL CONVERSION CALLOUT */}
        <div className="mt-24 p-12 bg-white flex flex-col md:flex-row justify-between items-center gap-10 border-l-8 border-red-600">
          <div className="text-left">
            <h2 className="text-black text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">Neutralize Your Logic Shear</h2>
            <p className="text-slate-600 text-[10px] font-mono font-black uppercase tracking-[0.3em]">Schedule a 360° Triangulation to protect your capital investment.</p>
          </div>
          <button 
            onClick={() => window.location.href = 'https://calendly.com/hello-bmradvisory/forensic-review'} 
            className="px-12 py-6 bg-red-600 text-white text-xs font-black uppercase italic tracking-widest hover:bg-black transition-all flex items-center gap-4"
          >
            Book Triangulation <ArrowRight size={20} />
          </button>
        </div>
      </main>
      <LogicLeakTicker />
      <Footer />
    </div>
  );
}
