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
          <div className="space-y-12 text-white">
            <div className="space-y-6">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic border-l-2 border-red-600 pl-4">
                BMR Forensics | Structural Audit
              </p>
              
              {/* RESTORED: Exact typography stack from original screenshot */}
              <h1 className="text-[90px] md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.8]">
                THE <br /> 
                <span className="text-red-600 relative">
                  PROMISE
                  {/* TM anchored to the top corner of the P */}
                  <span className="absolute text-[2vw] lowercase font-mono font-bold tracking-normal -left-[2.2vw] top-[1vw]">tm</span>
                </span> <br /> 
                <span className="text-red-600">GAP</span> <br /> 
                <span className="text-slate-800 opacity-90 font-black italic">WHERE</span> <br />
                <span className="text-red-600 font-black italic text-red-600">ROI GOES</span> <br /> 
                <span className="text-red-600 font-black italic">TO DIE.</span>
              </h1>
            </div>

            <p className="text-slate-400 text-lg max-w-lg italic leading-relaxed font-medium">
              We do not give you new promises. We provide the forensic tools to 
              make the old ones work.
            </p>

            <button 
              onClick={() => router.push('/pulse-check')}
              className="bg-red-600 text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex items-center gap-6 shadow-[0_20px_50px_rgba(220,38,38,0.2)]"
            >
              Initialize Diagnostic <ArrowRight size={20} />
            </button>
          </div>

          {/* RESTORED: Original "Why Systems Quietly Drift" box and layout */}
          <div className="bg-slate-900/10 border border-slate-900 p-12 space-y-8 mt-12 relative overflow-hidden text-white font-sans">
             <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
               Why Systems <span className="text-red-600 font-black">Quietly Drift</span>
             </h2>
             <p className="text-slate-400 font-bold italic text-lg leading-tight uppercase">
               AI failure is rarely a binary event.
             </p>
             <div className="pl-6 border-l border-slate-800 space-y-6 text-slate-400 font-sans">
               <p className="text-sm italic leading-relaxed">
                 It is a slow, structural divergence where AI-enabled logic decays under operating conditions leaders cannot see.
               </p>
               <p className="text-sm leading-relaxed italic">
                 When human intent and machine execution decouple, you do not have an &quot;optimization&quot; problem. You have <span className="text-red-600 font-black uppercase italic">Systemic Rot.</span>
               </p>
             </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* 🛡️ HIDDEN ADMIN NODE ACCESS */}
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
