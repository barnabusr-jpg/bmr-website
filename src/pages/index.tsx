"use client";
import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Shield } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 relative">
      <Header />
      <main className="flex-grow pt-48 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic border-l-2 border-red-600 pl-4">
                BMR Forensics | Structural Audit
              </p>
              <h1 className="text-[55px] sm:text-[85px] md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.85] md:leading-[0.8]">
                <span className="text-red-600">
                  THE <br /> PROMISE <br /> GAP<span className="text-[2vw] lowercase font-mono align-top ml-1">tm</span>
                </span> <br /> 
                <span className="text-slate-600 opacity-90">WHERE</span> <br />
                <span className="text-red-600 font-black italic">ROI GOES</span> <br /> 
                <span className="text-red-600 font-black italic">TO DIE.</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-slate-900 pt-8 max-w-lg">
               <div>
                  <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-widest">Logic Shear:</span>
                  <p className="text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed mt-1 italic">
                    Friction created when human oversight and machine execution decouple.
                  </p>
               </div>
               <div>
                  <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-widest">Capital Decay:</span>
                  <p className="text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed mt-1 italic">
                    The erosion of ROI caused by unmonitored system drift.
                  </p>
               </div>
            </div>

            <button 
              onClick={() => router.push('/pulse-check')}
              className="bg-red-600 text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex items-center gap-6 shadow-[0_20px_50px_rgba(220,38,38,0.2)]"
            >
              Initialize Diagnostic <ArrowRight size={20} />
            </button>
          </div>

          <div className="bg-slate-900/10 border border-slate-900 p-8 md:p-12 space-y-8 mt-12 relative overflow-hidden">
             <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">
               For <span className="text-red-600 font-black italic">CTO / CIO / OPS</span>
             </h2>
             <p className="text-slate-400 font-bold italic text-lg leading-tight uppercase leading-none">
               Uncertainty is a measurable liability.
             </p>
             <div className="pl-6 border-l border-slate-800 space-y-6 text-slate-400">
               <p className="text-sm italic leading-relaxed">
                 BMR provides the forensic tools to harden logic chains before architectural collapse becomes inevitable.
               </p>
               <p className="text-sm leading-relaxed italic border-t border-slate-900 pt-4">
                 When human intent and machine execution decouple, you do not have an &quot;optimization&quot; problem. You have <span className="text-red-600 font-black uppercase italic">Systemic Rot.</span>
               </p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
      <div 
        onClick={() => router.push('/admin/dashboard')}
        className="fixed bottom-6 left-6 z-[100] cursor-crosshair group flex items-center gap-2 no-print"
      >
        <div className="w-8 h-8 flex items-center justify-center border border-slate-900/30 group-hover:border-red-600/50 transition-all rounded-full bg-slate-950/20 backdrop-blur-sm">
          <Shield size={10} className="text-slate-900 group-hover:text-red-600 opacity-10 group-hover:opacity-100 transition-all" />
        </div>
      </div>
    </div>
  );
}
