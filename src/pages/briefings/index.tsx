"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ShieldAlert, Lock, Terminal, Radio, ExternalLink } from "lucide-react";
import Link from "next/link";

// 1. THE TIMELY NEWS ARTICLES (SIGNALS)
const FORENSIC_SIGNALS = [
  { id: "SIG_01", date: "APR 2026", title: "The $4.2B Valuation Drift", source: "Enterprise Tech Journal", excerpt: "Analysis of the widening gap between AI infrastructure investment and actual operational ROI.", url: "#" },
  { id: "SIG_02", date: "MAR 2026", title: "Regulatory Proof Standards", source: "Compliance Weekly", excerpt: "New fiduciary standards demand 'Atomic Logging' for all autonomous decision nodes.", url: "#" },
  { id: "SIG_03", date: "FEB 2026", title: "Shadow AI & Engineering Waste", source: "Operational Excellence", excerpt: "Research identifies that 30% of senior engineering bandwidth is consumed by manual validation.", url: "#" }
];

// 2. THE COMPLETE EVIDENCE VAULT (ALL 3 NODES RESTORED)
const EVIDENCE_VAULT = [
  { 
    id: "NODE_01",
    title: "The Fiduciary Disconnect", 
    category: "GOVERNANCE_ANALYSIS", 
    focus: "Governance vs. Technical Defensibility",
    abstract: "An internal analysis of mid-market AI deployments reveals a 70% failure rate in audit defensibility. While organizations possess 'Board-Level' ethics policies, the absence of atomic-level technical logging creates a Proof Void. This disconnect compromises indemnity standing and leaves leadership exposed to $180K–$1.2M/yr in unmanaged algorithmic liability.",
    notes: "Policy is not proof. In 15 years of leading deployments, I’ve seen that governance is usually just a PDF in a drawer. If your AI makes a million-dollar mistake today, can you prove exactly what it did? 90% of the time, the answer is 'no' because the technical layer is just a bunch of ad hoc spreadsheets. I close these gaps by building atomic-level logging that makes your intent verifiable at the code level."
  },
  { 
    id: "NODE_02",
    title: "The Rework Tax Calculus", 
    category: "ROI_EROSION", 
    focus: "ROI Erosion vs. Engineering Waste",
    abstract: "We have quantified the ‘Hidden Labor’ of unoptimized AI. Current data suggests that for every $1 invested in automated logic, organizations are losing $0.30 to manual rework—human staff intervening to correct, validate, or re-run failed AI outputs. This Rework Tax effectively neutralizes the primary efficiency gains of the initiative.",
    notes: "I’ve managed senior engineering teams where 30% of their bandwidth was burned 'babysitting' AI models because the validation loops weren't automated. This is a quiet ROI killer. If you are paying senior salaries to check machine errors manually, your automation is a liability. Reclaiming that $320K–$2.1M/yr in wasted effort requires shifting to automated validation checkpoints."
  },
  { 
    id: "NODE_03",
    title: "Structural Logic Shear", 
    category: "SYSTEM_DRIFT", 
    focus: "Strategic Intent vs. Machine Execution",
    abstract: "Defining the phenomenon of Logic Shear: the point at which an organization’s strategic goals and its machine execution layers decouple. This briefing identifies the architectural markers of system drift, where unmonitored updates and shifting data contexts lead to a total collapse of the Promise Gap™.",
    notes: "Systems don't stay fixed; they drift. I’ve seen Logic Shear destroy enterprise ROI in months due to 'Shadow AI' and zero-drift monitoring. By the time the C-Suite notices the money is gone, the system has drifted so far from the roadmap that you have to rebuild. Neutralizing this requires a fiduciary layer that enforces alignment between your intent and the machine's execution."
  }
];

export default function BriefingsPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30">
      <Header />
      
      <main className="pt-48 pb-32 px-10 max-w-7xl mx-auto text-left">
        <header className="mb-32 border-l-4 border-red-600 pl-12">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert size={18} className="text-red-600" />
            <p className="text-red-600 font-black uppercase tracking-[0.5em] text-[10px] italic">BMR_VAULT // INTEL_DISTRIBUTION</p>
          </div>
          <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
            Evidence <br /><span className="text-slate-800">Vault.</span>
          </h1>
        </header>

        {/* SECTION 1: SIGNALS */}
        <section className="mb-40">
          <h3 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.5em] mb-12 border-b border-red-900/30 pb-4 italic font-black flex items-center gap-4">
            <Radio size={14} className="animate-pulse" /> LIVE_FORENSIC_SIGNALS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FORENSIC_SIGNALS.map((sig) => (
              <div key={sig.id} className="p-10 border border-slate-900 bg-slate-950 hover:border-red-600/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[9px] font-mono text-slate-600 font-black tracking-widest">{sig.date}</span>
                    <ExternalLink size={12} className="text-slate-800" />
                  </div>
                  <h4 className="text-xl font-black italic uppercase text-white mb-4 leading-tight">{sig.title}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-4">{sig.source}</p>
                  <p className="text-sm text-slate-400 italic leading-relaxed mb-6">{sig.excerpt}</p>
                </div>
                <div className="text-[10px] font-black text-red-600 uppercase tracking-widest italic flex items-center gap-2">
                  TRACE_SIGNAL <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: EVIDENCE NODES */}
        <section>
          <h3 className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.5em] mb-12 border-b border-slate-900 pb-4 italic font-black">SUPPORTING_EVIDENCE_NODES</h3>
          <div className="grid grid-cols-1 gap-12">
            {EVIDENCE_VAULT.map((node) => (
              <div key={node.id} className="border-2 border-slate-900 bg-slate-950/20 p-12 md:p-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ShieldAlert size={120} className="text-white" />
                  </div>
                  <span className="text-[10px] font-mono text-red-600 font-black tracking-widest uppercase block mb-4">{node.category} // {node.id}</span>
                  <h4 className="text-5xl font-black italic uppercase text-white leading-none mb-8">{node.title}</h4>
                  <div className="grid md:grid-cols-2 gap-16 relative z-10">
                    <div className="space-y-4">
                        <p className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black italic">ABSTRACT_DECRYPT</p>
                        <p style={{ fontSize: '1.4rem' }} className="text-slate-400 italic leading-relaxed font-medium">&gt; &quot;{node.abstract}&quot;</p>
                    </div>
                    <div className="bg-black/40 p-10 border border-slate-900">
                      <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4 font-black flex items-center gap-2">
                        <Terminal size={14} /> OPERATOR_NOTES
                      </p>
                      <p className="text-lg text-slate-500 font-medium leading-relaxed italic">&quot;{node.notes}&quot;</p>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-40 pt-16 border-t border-slate-900">
           <p className="text-slate-900 font-black uppercase tracking-[0.6em] text-[10px] italic">
              VAULT_INTEGRITY_VERIFIED // NO_DRIFT_DETECTED
           </p>
        </footer>
      </main>

      <Footer />
    </div>
  );
}
