"use client";

import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Shield, Activity, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30 relative">
      <Header />
      
      <main className="flex-grow pt-48 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN: THE MANDATE */}
          <div className="space-y-12 text-white">
            <div className="space-y-6">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic border-l-2 border-red-600 pl-4">
                BMR Solutions | Fiduciary Intelligence
              </p>
              <h1 className="text-[70px] md:text-[100px] font-black uppercase italic tracking-tighter leading-[0.8] mb-8">
                The <br /> Promise <br /> 
                <span className="text-red-600">Gap™</span> <br /> 
                Is Where <br />
                ROI Goes <br /> To Die.
              </h1>
            </div>

            <p className="text-slate-400 text-lg max-w-lg italic leading-relaxed font-medium">
              We do not give you new promises. We provide the forensic evidence required to bridge the gap between human intent and machine execution.
            </p>

            <button 
              onClick={() => router.push('/pulse-check')}
              className="bg-red-600 text-white px-12 py-8 font-black uppercase italic tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all flex items-center gap-6 shadow-[0_20px_50px_rgba(220,38,38,0.2)] group"
            >
              Initialize Pulse Check <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* RIGHT COLUMN: THE METHODOLOGY */}
          <div className="space-y-8 mt-12 relative overflow-hidden text-white font-sans">
              <div className="bg-slate-900/10 border border-slate-900 p-10 space-y-10">
                
                {/* PHASE 01 */}
                <div className="flex gap-6">
                    <Activity className="text-red-600 shrink-0" size={24} />
                    <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase italic leading-none tracking-tight">01. Identify</h3>
                        <p className="text-xs text-slate-500 font-mono uppercase tracking-widest leading-relaxed">
                            Locate the Logic Shear between human intent and AI execution. We don't look for bugs; we find fractures in governance.
                        </p>
                    </div>
                </div>

                {/* PHASE 02 */}
                <div className="flex gap-6">
                    <Zap className="text-red-600 shrink-0" size={24} />
                    <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase italic leading-none tracking-tight">02. Quantify</h3>
                        <p className="text-xs text-slate-500 font-mono uppercase tracking-widest leading-relaxed">
                            Translate operational drift into the Annual Rework Tax. Turn gut feelings into hard-dollar liabilities.
                        </p>
                    </div>
                </div>

                {/* PHASE 03 */}
                <div className="flex gap-6">
                    <ShieldCheck className="text-red-600 shrink-0" size={24} />
                    <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase italic leading-none tracking-tight">03. Bridge</h3>
                        <p className="text-xs text-slate-500 font-mono uppercase tracking-widest leading-relaxed">
                            Deploy Zero-Data Hardening Blueprints. Close the gap and reclaim your engineering capital.
                        </p>
                    </div>
                </div>

              </div>
              
              <div className="p-10 border border-slate-900 border-t-0 bg-red-600/5">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed font-bold italic">
                    BMR Solutions provides the forensic evidence required to identify, quantify, and bridge the promise gap between human intent and AI execution.
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
