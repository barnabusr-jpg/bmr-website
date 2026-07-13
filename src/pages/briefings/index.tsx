"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, ShieldAlert, ChevronRight } from "lucide-react";
import Link from 'next/link';

export default function EvidenceVault() {
  const categories = [
    {
      node: "EXECUTIVE",
      cases: [
        { id: "CASE_01", title: "FIDUCIARY REGRET", slug: "fiduciary-regret", summary: "Analysis of corporate operational setbacks following aggressive automated workforce downsizing." },
        { id: "CASE_04", title: "SYSTEM OVERESTIMATION", slug: "system-overestimation", summary: "Technology providers reverse rapid position reductions to patch severe system outage vulnerabilities." },
      ]
    },
    {
      node: "TECHNICAL",
      cases: [
        { id: "CASE_02", title: "FORD GRAY_BEARD", slug: "ford-gray-beard", summary: "Emergency deployment of three hundred fifty veteran engineers to manually reconstruct broken design pipelines." },
        { id: "CASE_05", title: "DRIVE_THRU DRIFT", slug: "drive-thru-drift", summary: "Termination of automated lane trials after uninsulated raw voice data corrupts transactional menus." },
      ]
    },
    {
      node: "MANAGERIAL",
      cases: [
        { id: "CASE_03", title: "KLARNA HYBRID_SHIFT", slug: "klarna-hybrid-shift", summary: "Restructuring of customer service protocols after automated deployment fractures retention metrics." },
        { id: "CASE_06", title: "BOT ERROR_CASCADE", slug: "bot-error-cascade", summary: "Rescinded staff redundancies following call queue volume surges caused by voice bot limitations." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 uppercase font-black overflow-x-hidden">
      <Header />
      
      <main className="pt-44 pb-20 px-6 max-w-[1600px] mx-auto text-left italic">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-2 border-slate-900 pb-12 italic">
          <div className="border-l-4 border-red-600 pl-8 font-black italic">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
              BRIEFING <br /><span className="text-red-600 italic">VAULT.</span>
            </h1>
          </div>
          <Lock className="text-slate-900 opacity-20 hidden md:block mb-4" size={120} />
        </div>

        {/* --- THREE COLUMN SILO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 italic items-start">
          {categories.map((cat) => (
            <div key={cat.node} className="flex flex-col gap-8 italic">
              {/* Node Identifier */}
              <div className="text-slate-700 font-mono text-[10px] tracking-[0.5em] mb-2 border-b border-slate-900 pb-4 italic font-black">
                {cat.node}_NODE_FLOW
              </div>

              {cat.cases.map((item) => (
                <Link key={item.slug} href={`/briefings/case-study/${item.slug}`} className="group no-underline block w-full italic">
                  <div className="bg-slate-950 border-2 border-slate-900 p-8 lg:p-12 relative overflow-hidden hover:border-red-600 transition-all shadow-2xl min-h-[500px] flex flex-col justify-between italic">
                    <ShieldAlert className="absolute top-10 right-10 text-red-600 opacity-5 group-hover:opacity-20 transition-opacity italic" size={140} />
                    
                    <div className="relative z-10 w-full italic">
                      <div className="font-mono text-[10px] text-red-600 font-black tracking-widest uppercase italic">
                        FILE_REF: {item.id} // <span className="text-slate-500 italic">{cat.node}_NODE</span>
                      </div>
                      <h2 className="text-4xl lg:text-[40px] font-black uppercase tracking-tight text-white mt-10 mb-8 leading-[0.9] break-words italic">
                        {item.title}
                      </h2>
                      <p className="text-base text-slate-500 border-l-2 border-slate-800 pl-6 font-black italic uppercase leading-tight normal-case italic">
                        "{item.summary}"
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-4 text-red-600 font-black uppercase italic text-[11px] tracking-[0.3em] group-hover:text-white transition-all mt-auto italic">
                      ACCESS CASE AUTOPSY 
                      <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform italic" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
