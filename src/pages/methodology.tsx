"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, Activity, ShieldAlert, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const CLINICAL_NODES = [
  { 
    title: "Executive Node", 
    q: "Do AI outcomes align with fiduciary obligations?", 
    f: "FRACTURE: Regulatory gaps and unmanaged liability exposure.", 
    risk: "Undetected drift leads to public failure and executive risk.", 
    fix: "Continuous integrity monitoring prevents fiduciary decay.", 
    id: "BMR-EXE-001" 
  },
  { 
    title: "Managerial Node", 
    q: "Is engineering capacity being lost to rework?", 
    f: "FRACTURE: AI costs exceeding realized labor savings.", 
    risk: "Small operational leaks turn into catastrophic budget failures.", 
    fix: "We align machine execution with realized operational value.", 
    id: "BMR-MGR-002" 
  },
  { 
    title: "Technical Node", 
    q: "Is logic drift corrupting your model outputs?", 
    f: "FRACTURE: Hallucinating models training on non-verified data.", 
    risk: "Logic rot erodes system trust and compromises the tech stack.", 
    fix: "Forensic Hardening identifies and seals logic fractures.", 
    id: "BMR-TEC-003" 
  }
];

export default function MethodologyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 text-left">
      <Header />
      <main className="flex-grow pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER SECTION */}
          <section className="space-y-12 mb-32 border-l-8 border-red-600 pl-10 md:pl-16">
            <div className="flex items-center gap-4 text-red-600 font-mono text-xs font-black uppercase tracking-[0.5em] italic">
              <Activity size={20} className="animate-pulse" /> Protocol: BMR-360-Triangulation
            </div>
            <h1 className="text-[70px] md:text-[110px] font-black uppercase italic tracking-tighter leading-[0.85] text-white">
              The Forensic <br /> <span className="text-red-600">Integrity</span> <br /> Standard.
            </h1>
            <p className="text-slate-400 text-2xl md:text-3xl italic max-w-3xl leading-relaxed font-medium">
              BMR identifies the <span className="text-white underline decoration-red-600 underline-offset-8">Logic Fractures</span> where AI spend falls short of strategic reality.
            </p>
          </section>

          {/* 🛡️ THE CLINICAL NODES (HIGH CONTRAST) */}
          <section className="py-24 border-t border-slate-900">
            <h2 className="text-4xl font-black italic uppercase tracking-widest mb-16 flex items-center gap-4">
              <ShieldAlert className="text-red-600" size={32} /> Operational_Node_Audit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CLINICAL_NODES.map((node, i) => (
                <div key={i} className="p-12 bg-white text-slate-800 shadow-2xl border-l-[12px] border-red-600 flex flex-col justify-between min-h-[500px] group hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="text-[10px] font-mono font-black text-red-600 uppercase tracking-widest block mb-4">CASE_FILE: {node.id}</span>
                    <h3 className="text-4xl font-black mb-6 italic uppercase tracking-tighter leading-none">{node.title}</h3>
                    <p className="text-lg text-slate-500 mb-10 italic font-bold leading-tight border-b border-slate-200 pb-6">{node.q}</p>
                    
                    <div className="space-y-6 text-[11px] font-mono uppercase tracking-widest font-black leading-relaxed">
                      <div className="text-red-600">Fracture: <span className="text-slate-900">{node.f}</span></div>
                      <div className="text-slate-500">Risk: {node.risk}</div>
                      <div className="text-green-600">Solution: {node.fix}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono font-black tracking-[0.4em] uppercase mt-12 pt-6 border-t border-slate-100 flex items-center gap-2 italic">
                    <FileText size={14} /> Node_Status // Secured
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* VAULT CTA */}
          <section className="py-24 bg-white p-16 text-left shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-l-[20px] border-red-600">
            <div className="max-w-3xl space-y-8">
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-black leading-none">The Evidence Vault</h2>
              <p className="text-2xl text-slate-600 leading-relaxed italic font-bold">
                Access protected forensic analysis to see where AI value leakage occurs in modern enterprise infrastructure.
              </p>
              <button 
                onClick={() => router.push('/vault')}
                className="inline-flex items-center gap-6 py-8 px-14 bg-red-600 hover:bg-black text-white font-black uppercase italic transition-all tracking-[0.3em] text-lg shadow-xl"
              >
                Access The Vault <ChevronRight size={28} />
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
