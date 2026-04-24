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
          
          {/* LEFT COLUMN: THE WALL OF TEXT */}
          <div className="space-y-12 text-white">
            <div className="space-y-6">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic border-l-2 border-red-600 pl-4">
                BMR Solutions | Fiduciary Intelligence
              </p>
              
              {/* RESTORED: Massive stacked typography with leading-[0.8] */}
              <h1 className="text-[90px] md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.8]">
                THE <br /> 
                PROMISE <br /> 
                {/* Styled GAP to pop in white like your screenshot */}
                <span className="text-white relative">GAP<sup className="text-[2vw] lowercase font-mono">tm</sup></span> <br /> 
                IS WHERE <br />
                <span className="text-red-600 font-black italic">ROI</span> <br /> 
                GOES TO <span className="text-red-600 font-black italic">DIE.</span>
              </h1>
            </div>

            <p className="text-slate-400 text-lg max-w-lg italic leading-relaxed font-medium">
              We do not give you new promises. We provide the forensic evidence required to bridge the gap between human intent and machine execution.
            </p>

            {/* RESTORED: Horizontal large-scale button */}
            <button 
              onClick={() => router.push('/pulse-check')}
              className="bg-red-600 text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex items-center gap-6 shadow-[0_20px_50px_rgba(220,38,38,0.2)] group"
            >
              Initialize Pulse Check <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* RIGHT COLUMN: THE BOXED PROTOCOL */}
          {/* RESTORED: The "Why Systems Drift" style box but with Phase logic */}
          <div className="bg-slate-900/10 border border-slate-900 p-12 space-y-8 mt-12 relative overflow-hidden text-white">
             <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
               The <span className="text-red-600">Identify / Quantify / Bridge</span> Protocol
             </h2>
             
             <p className="text-slate-400 font-bold italic text-lg leading-tight uppercase">
               AI failure is rarely a binary event.
             </p>

             <div className="pl-6 border-l border-slate-800 space-y-8 text-slate-400">
               <div className="space-y-2">
                 <p className="text-xs font-black text-white uppercase tracking-widest">01. Identify</p>
                 <p className="text-sm italic leading-relaxed">
                   Locate the logic shear where human intent and machine execution decouple.
                 </p>
               </div>

               <div className="space-y-2">
                 <p className="text-xs font-black text-white uppercase tracking-widest">02. Quantify</p>
                 <p className="text-sm italic leading-relaxed">
                   Translate operational drift into a measurable <span className="text-red-600 font-black uppercase italic">Annual Rework Tax.</span>
                 </p>
               </div>

               <div className="space-y-2">
                 <p className="text-xs font-black text-white uppercase tracking-widest">03. Bridge</p>
                 <p className="text-sm italic leading-relaxed">
                   Deploy zero-data hardening roadmaps to reclaim engineering capital.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 🛡️ HIDDEN ADMIN NODE ACCESS */}
      <div 
        onClick={() => router.push('/admin/dashboard')}
        className="fixed bottom-6 left-6 z-[100] cursor-crosshair group flex items-center gap-2"
      >
        <div className="w-8 h-8 flex items-center justify-center border border-slate-900/30 group-hover:border-red-600/50 transition-all rounded-full bg-slate-950/20 backdrop-blur-sm">
          <Shield size={10} className="text-slate-900 group-hover:text-red-600 opacity-10 group-hover:opacity-100 transition-all" />
        </div>
      </div>
    </div>
  );
}
