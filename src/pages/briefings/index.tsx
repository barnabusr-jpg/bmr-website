"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, ShieldAlert, ChevronRight } from "lucide-react";
import Link from 'next/link';

export default function EvidenceVault() {
  const caseStudies = [
    { id: "CASE_01", title: "EXECUTIVE VARIANCE", node: "EXECUTIVE", slug: "chatbot-liability" },
    { id: "CASE_02", title: "FORENSIC INSIGHTS", node: "TECHNICAL", slug: "salesforce-failure" },
    { id: "CASE_03", title: "LOGIC SHEAR", node: "MANAGERIAL", slug: "lyft-logic-shear" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30">
      <Header />
      <main className="pt-40 pb-20 px-6 max-w-[1600px] mx-auto text-left">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-2 border-slate-900 pb-12">
          <div className="border-l-4 border-red-600 pl-8">
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
              EVIDENCE <br /><span className="text-red-600 italic">VAULT.</span>
            </h1>
          </div>
          <Lock className="text-slate-900 hidden md:block mb-4 opacity-20" size={120} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((item) => (
            <Link key={item.id} href={`/briefings/case-study/${item.slug}`} className="group no-underline">
              <div className="bg-slate-950 border-2 border-slate-900 p-8 lg:p-12 relative overflow-hidden group hover:border-red-600 transition-all shadow-2xl min-h-[550px] flex flex-col justify-between">
                <ShieldAlert className="absolute top-10 right-10 text-red-600 opacity-5 group-hover:opacity-20 transition-opacity" size={140} />
                
                <div className="relative z-10 w-full">
                  {/* 🛡️ METADATA FIX: Extra tight tracking and nowrap for 'EXECUTIVE' and 'FORENSIC' */}
                  <div className="font-mono text-[9px] md:text-[10px] text-red-600 font-black tracking-[-0.02em] md:tracking-[0.2em] uppercase italic whitespace-nowrap overflow-hidden text-ellipsis">
                    FILE_REF: {item.id} // <span className="text-slate-400">{item.node}_NODE</span>
                  </div>
                  
                  {/* 🛡️ HEADER SCALE FIX: Using clamp-style logic to fit long words */}
                  <h2 className="text-4xl lg:text-[38px] xl:text-[48px] font-black uppercase italic tracking-tighter text-white mt-10 mb-8 leading-[0.8] break-words">
                    {item.title}
                  </h2>

                  <p className="text-base lg:text-lg text-slate-500 font-medium italic leading-relaxed mb-12 border-l-2 border-slate-800 pl-6">
                    "70% of AI governance failures stem from logic drift."
                  </p>
                </div>

                <div className="inline-flex items-center gap-4 text-red-600 font-black uppercase italic text-[11px] tracking-[0.3em] group-hover:text-white transition-all mt-auto">
                  ACCESS CASE AUTOPSY <ChevronRight size={18} />
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
