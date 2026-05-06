"use client";
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ShieldCheck, X, FileSearch, Lock } from "lucide-react";

// 1. Data updated to include the "Full Content" for the overlay
const EVIDENCE_VAULT = [
  { 
    id: "NODE_01", 
    title: "The Fiduciary Disconnect", 
    category: "GOVERNANCE_ANALYSIS", 
    abstract: "An internal analysis reveals a 70% failure rate in audit defensibility.", 
    notes: "I close these gaps by building atomic-level logging.", 
    content: "The UnitedHealth AI deployment highlights a critical failure in automated decision-making transparency. When machine logic is divorced from human fiduciary accountability, the result is unmitigated regulatory risk. Our audit identified a 'Black Box' denial logic that was impossible to reconstruct during standard review, leading to a breakdown in audit defensibility." 
  },
  { 
    id: "NODE_02", 
    title: "The Rework Tax Calculus", 
    category: "ROI_EROSION", 
    abstract: "Organizations are losing $0.30 of every $1 invested in automated logic to manual rework.", 
    notes: "Reclaiming that effort requires automated validation.", 
    content: "The Lyft earnings event is a textbook case of ROI erosion. A clerical error in the automated reporting layer propagated at machine speed, resulting in immediate margin volatility. The true cost was not the error, but the 'Rework Tax'—the massive human effort required to neutralize the drift after the fact because no automated validation layer existed." 
  },
  { 
    id: "NODE_03", 
    title: "Structural Logic Shear", 
    category: "SYSTEM_DRIFT", 
    abstract: "The point at which strategic goals and machine execution layers decouple.", 
    notes: "Neutralizing this requires a fiduciary layer enforcing alignment.", 
    content: "Strategic goals and machine execution layers often decouple during high-velocity deployments. This 'Logic Shear' creates a vulnerability where system behavior no longer aligns with institutional intent. Neutralizing this requires a fiduciary layer enforcing alignment." 
  }
];

export default function VaultPage() {
  // 2. State to track the open dossier
  const [activeDossier, setActiveDossier] = useState<any | null>(null);

  // Prevent background scroll when dossier is open
  useEffect(() => {
    if (activeDossier) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeDossier]);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 text-left relative">
      <Header />
      
      <main className="pt-48 pb-32 px-10 max-w-7xl mx-auto">
        <header className="mb-32 border-l-4 border-red-600 pl-12">
          <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
            Evidence <br /><span className="text-slate-800">Vault.</span>
          </h1>
        </header>

        {/* VAULT CARDS */}
        <div className="grid grid-cols-1 gap-12">
          {EVIDENCE_VAULT.map((node) => (
            <div key={node.id} className="border-2 border-slate-900 bg-slate-950/20 p-12 md:p-16 relative overflow-hidden group hover:border-red-600/40 transition-all">
              <span className="text-[10px] font-mono text-red-600 font-black tracking-widest uppercase block mb-4">{node.category} // {node.id}</span>
              <h4 className="text-5xl font-black italic uppercase mb-8 leading-none">{node.title}</h4>
              <div className="grid md:grid-cols-2 gap-16 relative z-10 mb-8">
                <p className="text-2xl text-slate-400 italic font-medium leading-relaxed">"{node.abstract}"</p>
                <div className="bg-black/40 p-10 border border-slate-900">
                  <p className="text-lg text-slate-500 font-medium italic">"{node.notes}"</p>
                </div>
              </div>
              
              {/* BUTTON TRIGGER */}
              <button 
                onClick={() => setActiveDossier(node)}
                className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-red-600 group-hover:text-white transition-colors border-t border-slate-900 pt-8 w-full text-left"
              >
                Access Forensic Case Study <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* 3. THE DOSSIER OVERLAY (MODAL) */}
      {activeDossier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#020617]/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#050b1a] border-2 border-red-600 w-full max-w-5xl max-h-[85vh] overflow-y-auto relative shadow-[0_0_80px_rgba(220,38,38,0.2)]">
            
            {/* Dossier Controls */}
            <div className="sticky top-0 bg-[#050b1a] border-b border-slate-900 p-8 flex justify-between items-center z-20">
              <div className="flex items-center gap-4 text-red-600 font-black uppercase text-[10px] tracking-[0.4em]">
                <ShieldCheck size={18} /> Authentication_Confirmed // File_{activeDossier.id}
              </div>
              <button onClick={() => setActiveDossier(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={32} />
              </button>
            </div>

            {/* Dossier Content */}
            <div className="p-12 md:p-24">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-16 leading-tight max-w-4xl">
                {activeDossier.title}
              </h2>

              <div className="max-w-3xl border-l-4 border-red-600 pl-12 space-y-12">
                <p className="text-2xl md:text-3xl text-slate-300 italic leading-relaxed font-medium">
                  {activeDossier.content}
                </p>
                
                <div className="bg-slate-900/30 p-8 border border-slate-800 flex items-center gap-6">
                  <Lock className="text-red-600 shrink-0" size={24} />
                  <p className="text-sm font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
                    Access to secondary evidence nodes is restricted to active advisory engagements.
                  </p>
                </div>
              </div>
            </div>

            {/* Dossier Footer */}
            <div className="p-12 border-t border-slate-900 flex justify-between items-center opacity-30 text-[9px] font-mono tracking-[0.5em] text-slate-500 uppercase font-black">
               <span>BMR_Advisory_Forensics</span>
               <span className="hidden md:block text-red-600">Confidential_Access_Only</span>
               <span>Terminal_Secure</span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
