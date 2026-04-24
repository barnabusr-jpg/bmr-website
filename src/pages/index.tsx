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
      
      {/* ADD_PT-32 for Header clearance */}
      <main className="flex-grow pt-48 px-6 pb-32">
        {/* MAINTAINED THE EXACT text-center | max-w-7xl centered flex-col structure */}
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* IDENTIFY (Branded Header) */}
          <div className="space-y-4 mb-16 text-white max-w-4xl">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic border-l-2 border-red-600 pl-4">
                BMR Solutions | Fiduciary Intelligence
              </p>
              {/* RESTORED the stacked typography and leading-[0.8] stack */}
              <h1 className="text-[70px] md:text-[110px] font-black uppercase italic tracking-tighter leading-[0.8]">
                THE <br /> PROMISE <br />
                {/* TM SYMBOL: Positioned as an inline, raised marker */}
                <span className="text-white relative">GAP<sup className="text-[2vw] relative -top-[3vw]">™</sup></span> <br /> 
                IS WHERE <br />
                <span className="text-red-600 font-black italic">ROI</span> <br /> 
                GOES TO <span className="text-red-600 font-black italic">DIE.</span>
              </h1>
          </div>

          {/* QUANTIFY (Revised Methodology Copy) */}
          <div className="bg-slate-950 border border-slate-800 p-12 max-w-4xl text-left mb-16 space-y-6">
              <h2 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-white">The Identify/Quantify/Bridge Protocol</h2>
              <div className="space-y-6 text-slate-400 font-mono text-xs uppercase tracking-widest leading-relaxed border-l-2 border-red-600 pl-6 max-w-2xl">
                  <p>
                      BMR Forensics provides the tools required to <span className="text-white">identify</span> the logic shear, <span className="text-white">quantify</span> the Annual Rework Tax, and <span className="text-white">bridge</span> the promise gap between human intent and machine execution.
                  </p>
                  <p>
                      We do not give you new promises. We provide the forensic tools to make the old ones work.
                  </p>
              </div>
          </div>

          {/* BRIDGE (Final Injunction and Triage Request) */}
          <div className="space-y-12 flex flex-col items-center">
            <p className="text-slate-500 font-mono text-xs max-w-xl italic uppercase tracking-[0.2em] leading-relaxed">
              Initialize a Perceptual Fracture Audit to locate the capital leakage.
            </p>

            {/* RESTORED the exact horizontal, large-offset button and Arrow icon */}
            <button 
              onClick={() => router.push('/pulse-check')}
              className="group relative bg-white text-black px-16 py-10 font-black uppercase italic text-2xl md:text-4xl hover:bg-red-600 hover:text-white transition-all shadow-[15px_15px_0px_0px_rgba(220,38,38,1)] active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
            >
              <div className="flex items-center gap-6">
                  INITIALIZE_AUDIT
                  <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* 🛡️ HIDDEN ADMIN NODE ACCESS (Preserved) */}
      <div 
        onClick={() => router.push('/admin/dashboard')}
        className="fixed bottom-6 left-6 z-[100] cursor-crosshair group flex items-center gap-2"
        title="Admin_Node_Login"
      >
        <div className="w-8 h-8 flex items-center justify-center border border-slate-900/30 group-hover:border-red-600/50 transition-all duration-700 rounded-full bg-slate-950/20 backdrop-blur-sm">
          <Shield size={10} className="text-slate-900 group-hover:text-red-600 opacity-10 group-hover:opacity-100 transition-all" />
        </div>
        <span className="text-[7px] font-mono text-slate-900 uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-500">
          ALPHA-7_LOG_IN
        </span>
      </div>
    </div>
  );
}
