"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, ShieldAlert, ChevronRight } from "lucide-react";
import Link from 'next/link';

export default function EvidenceVault() {
  // Array ordered specifically to fill a 3-column grid by category (Stacked Vertically)
  const caseStudies = [
    // ROW 1: PRECEDENTS (Exec, Tech, Managerial)
    { id: "CASE_01", title: "EXECUTIVE VARIANCE", node: "EXECUTIVE", slug: "chatbot-liability", summary: "The Air Canada Precedent regarding autonomous agent liability." },
    { id: "CASE_02", title: "FORCEDLEAK AGENT", node: "TECHNICAL", slug: "salesforce-failure", summary: "Investigating Agentforce exfiltration bypass vulnerabilities." },
    { id: "CASE_03", title: "LOGIC SHEAR", node: "MANAGERIAL", slug: "lyft-logic-shear", summary: "Lyft $2B market volatility triggered by automated reporting error." },
    
    // ROW 2: 2025/2026 FRONTIER (Exec, Tech, Managerial)
    { id: "CASE_04", title: "FIDUCIARY SHEAR", node: "EXECUTIVE", slug: "fiduciary-gate-failure", summary: "UnitedHealth Fiduciary Failure and algorithmic supplantation." },
    { id: "CASE_05", title: "ZERO-CLICK DRIFT", node: "TECHNICAL", slug: "echoleak-vulnerability", summary: "Copilot M365 exfiltration via untrusted data ingestion." },
    { id: "CASE_06", title: "EXCESSIVE AGENCY", node: "MANAGERIAL", slug: "mexico-agency-breach", summary: "Mexico 150GB government breach via autonomous coding overreach." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 uppercase">
      <Header />
      <main className="pt-40 pb-20 px-6 max-w-[1600px] mx-auto text-left">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-2 border-slate-900 pb-12">
          <div className="border-l-4 border-red-600 pl-8">
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none text-white">
              EVIDENCE <br /><span className="text-red-600 italic">VAULT.</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mt-8 font-black italic">
              STATUS: PROTECTED_ACCESS // ARCHIVE_2026
            </p>
          </div>
          <Lock className="text-slate-900 opacity-20 hidden md:block mb-4" size={120} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((item) => (
            <Link key={item.slug} href={`/briefings/case-study/${item.slug}`} className="group no-underline">
              <div className="bg-slate-950 border-2 border-slate-900 p-8 lg:p-12 relative overflow-hidden group hover:border-red-600 transition-all shadow-2xl min-h-[550px] flex flex-col justify-between italic">
                <ShieldAlert className="absolute top-10 right-10 text-red-600 opacity-5 group-hover:opacity-20 transition-opacity" size={140} />
                
                <div className="relative z-10 w-full">
                  <div className="font-mono text-[10px] text-red-600 font-black tracking-widest uppercase italic">
                    FILE_REF: {item.id} // <span className="text-slate-500">{item.node}_NODE</span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-[40px] xl:text-[48px] font-black uppercase tracking-tight text-white mt-10 mb-8 leading-[0.85] break-words italic">
                    {item.title}
                  </h2>

                  <p className="text-base lg:text-lg text-slate-500 font-medium leading-relaxed mb-12 border-l-2 border-slate-800 pl-6 italic uppercase">
                    "{item.summary}"
                  </p>
                </div>

                <div className="inline-flex items-center gap-4 text-red-600 font-black uppercase italic text-[11px] tracking-[0.3em] group-hover:text-white transition-all mt-auto italic">
                  ACCESS CASE AUTOPSY 
                  <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
