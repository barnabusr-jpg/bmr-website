"use client";
import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Shield } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 relative overflow-x-hidden">
      <Header />
      
      <main className="flex-grow pt-48 lg:pt-64 px-8 pb-32">
        {/* The lg:grid-cols-2 forces the split layout on desktop */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: BRAND & GLOSSARY */}
          <div className="flex flex-col space-y-16">
            <div className="space-y-8 text-left">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] font-black italic border-l-4 border-red-600 pl-6">
                BMR Forensics | Structural Audit
              </p>
              <h1 className="text-[50px] sm:text-[80px] md:text-[110px] font-black uppercase italic tracking-tighter leading-[0.85]">
                <span className="text-red-600">THE <br /> PROMISE <br /> GAP<span className="text-[20px] lowercase font-mono align-top ml-1 opacity-20">tm</span></span> <br /> 
                <span className="text-slate-600 opacity-90">WHERE</span> <br />
                <span className="text-red-600">ROI GOES</span> <br /> 
                <span className="text-red-600">TO DIE.</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-slate-900 pt-10 max-w-lg text-left">
               <div>
                  <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Logic Shear:</span>
                  <p className="text-[12px] text-slate-500 uppercase tracking-widest leading-relaxed mt-2 italic font-bold">Friction created when human oversight and machine execution decouple.</p>
               </div>
               <div>
                  <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Capital Decay:</span>
                  <p className="text-[12px] text-slate-500 uppercase tracking-widest leading-relaxed mt-2 italic font-bold">The erosion of ROI caused by unmonitored system drift.</p>
               </div>
            </div>

            <button onClick={() => router.push('/pulse-check')} className="w-fit bg-red-600 text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-red-600 transition-all flex items-center gap-6 shadow-[0_20px_50px_rgba(220,38,38,0.2)]">
              Initialize Diagnostic <ArrowRight size={20} />
            </button>
          </div>

          {/* RIGHT: TARGET PERSONA BOX */}
          <div className="lg:mt-32 w-full">
            <div className="bg-slate-950 border border-slate-900 p-10 md:p-14 space-y-10 relative overflow-hidden text-left">
               <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-red-600/30" />
               <div className="space-y-4">
                 <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-white">FOR <span className="text-red-600">CTOS / OPS / TECH MGRS</span></h2>
                 <p className="text-slate-400 font-bold italic text-lg leading-tight uppercase tracking-tight">Uncertainty is a measurable liability.</p>
               </div>
               <div className="pl-6 border-l-2 border-red-600/40 space-y-8">
                 <p className="text-sm md:text-base text-slate-400 italic leading-relaxed font-medium">BMR provides the forensic tools to harden logic chains before architectural collapse becomes inevitable.</p>
                 <div className="pt-8 border-t border-slate-900 font-medium">
                   <p className="text-sm md:text-base text-slate-400 leading-relaxed italic">When human intent and machine execution decouple, you do not have an "optimization" problem. You have <span className="text-red-600 font-black uppercase italic">Systemic Rot.</span></p>
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </main>
      <Footer />

      {/* ADMIN PORTAL HIDDEN ACCESS */}
      <div onClick={() => router.push('/admin/dashboard')} className="fixed bottom-10 left-10 z-[110] cursor-crosshair group">
        <div className="w-10 h-10 flex items-center justify-center border border-slate-800 group-hover:border-red-600 transition-all rounded-full bg-slate-950/80 backdrop-blur-md">
          <Shield size={12} className="text-slate-800 group-hover:text-red-600 transition-all opacity-20 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}
