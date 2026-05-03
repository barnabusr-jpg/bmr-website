"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldAlert, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

const EVIDENCE_VAULT = [
  { id: "NODE_01", title: "The Fiduciary Disconnect", category: "GOVERNANCE_ANALYSIS", abstract: "An internal analysis reveals a 70% failure rate in audit defensibility.", notes: "I close these gaps by building atomic-level logging.", caseStudy: "/briefings/case-study/unitedhealth-ai" },
  { id: "NODE_02", title: "The Rework Tax Calculus", category: "ROI_EROSION", abstract: "Organizations are losing $0.30 of every $1 invested in automated logic to manual rework.", notes: "Reclaiming that effort requires automated validation.", caseStudy: "/briefings/case-study/lyft-earnings" },
  { id: "NODE_03", title: "Structural Logic Shear", category: "SYSTEM_DRIFT", abstract: "The point at which strategic goals and machine execution layers decouple.", notes: "Neutralizing this requires a fiduciary layer enforcing alignment.", caseStudy: "/briefings/case-study/pentagon-leak" }
];

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 text-left">
      <Header />
      <main className="pt-48 pb-32 px-10 max-w-7xl mx-auto">
        <header className="mb-32 border-l-4 border-red-600 pl-12">
          <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
            Evidence <br /><span className="text-slate-800">Vault.</span>
          </h1>
        </header>
        <div className="grid grid-cols-1 gap-12">
          {EVIDENCE_VAULT.map((node) => (
            <div key={node.id} id={node.id} style={{ scrollMarginTop: '140px' }} className="border-2 border-slate-900 bg-slate-950/20 p-12 md:p-16 relative overflow-hidden">
              <span className="text-[10px] font-mono text-red-600 font-black tracking-widest uppercase block mb-4">{node.category} // {node.id}</span>
              <h4 className="text-5xl font-black italic uppercase mb-8 leading-none">{node.title}</h4>
              <div className="grid md:grid-cols-2 gap-16 relative z-10 mb-8">
                <p className="text-2xl text-slate-400 italic font-medium leading-relaxed">"{node.abstract}"</p>
                <div className="bg-black/40 p-10 border border-slate-900">
                  <p className="text-lg text-slate-500 font-medium italic">"{node.notes}"</p>
                </div>
              </div>
              <Link href={node.caseStudy} className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-red-600 hover:text-white transition-colors border-t border-slate-900 pt-8 w-full">
                Access Forensic Case Study <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
