"use client";
import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Activity, ArrowRight } from "lucide-react";

export default function PulseCheckPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center space-y-16">
          <div className="flex flex-col items-center gap-8">
            <Activity className="text-red-600 animate-pulse" size={80} />
            <h1 className="text-[120px] font-black uppercase italic tracking-tighter leading-none">System <br /> Diagnostic</h1>
            <p className="text-red-600 font-mono text-xs uppercase tracking-[0.5em] font-black italic leading-none">
               Pulse Check V3.2 // Forensic Intake
            </p>
          </div>

          <p className="text-slate-400 text-xl italic max-w-2xl mx-auto leading-relaxed font-medium uppercase">
            This 12-QUESTION DIAGNOSTIC SEQUENCE identifies the primary friction points in your AI logic chain. Do not exit the terminal before completion.
          </p>

          <div className="grid grid-cols-3 gap-12 py-16 border-y border-slate-900/50">
             <div className="space-y-4">
                <p className="text-[9px] font-mono uppercase text-slate-600 tracking-[0.3em]">Logic Trace Status</p>
                <p className="text-sm font-black uppercase italic text-white tracking-widest">Active</p>
             </div>
             <div className="space-y-4">
                <p className="text-[9px] font-mono uppercase text-slate-600 tracking-[0.3em]">Session Identity</p>
                <p className="text-sm font-black uppercase italic text-white tracking-widest">Anonymized</p>
             </div>
             <div className="space-y-4">
                <p className="text-[9px] font-mono uppercase text-slate-600 tracking-[0.3em]">Data Protection</p>
                <p className="text-sm font-black uppercase italic text-white tracking-widest">AES-256 Encryption</p>
             </div>
          </div>

          <button 
            onClick={() => router.push('/vault-alpha')} 
            className="w-full bg-red-600 py-12 font-black uppercase italic tracking-[0.5em] text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4"
          >
            Initiate Forensic Trace <ArrowRight size={20} />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
