"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';

export default function PulseCheck() {
  const router = useRouter();

  const handleStartAudit = (node: string) => {
    // Logic: Clicking the node target initializes the forensic session immediately
    console.log(`Forensic Payload Initialized for: ${node}`);
    router.push(`/assessment?node=${node.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans italic">
      <Header />
      <main className="pt-44 pb-32 w-full px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 text-left">
          
          <div className="w-full lg:w-[55%]">
            <div className="border-l-[6px] border-red-600 pl-10 mb-16">
              <h2 className="text-red-600 font-mono text-[11px] font-black tracking-[0.5em] uppercase italic mb-5">BMR_SOLUTIONS // SYSTEM_INTAKE</h2>
              <h1 className="text-6xl md:text-8xl font-black italic leading-[0.85] uppercase tracking-tighter m-0 italic">Initialize <br /><span className="text-red-600 italic">Intake.</span></h1>
            </div>

            <div className="border-t border-slate-900 pt-10">
              <h3 className="text-red-600 animate-pulse text-[11px] font-mono font-black tracking-[0.4em] uppercase mb-10 italic underline decoration-red-600/30 underline-offset-8">Step 1: Choose Operational Focus</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Executive', 'Managerial', 'Technical'].map((node) => (
                  <button 
                    key={node} 
                    onClick={() => handleStartAudit(node)} 
                    className="group py-12 px-8 border-2 border-slate-900 bg-slate-950 hover:border-red-600 hover:bg-red-600/5 transition-all text-left relative overflow-hidden shadow-xl"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600 translate-y-[-100%] group-hover:translate-y-0 transition-transform" />
                    <span className="block text-[9px] font-mono text-slate-700 mb-4 uppercase tracking-widest italic group-hover:text-red-600 transition-colors italic">Target://{node}_Node</span>
                    <span className="text-2xl font-black italic uppercase text-slate-500 group-hover:text-white transition-colors italic">{node}</span>
                  </button>
                ))}
              </div>
              <p className="mt-8 text-slate-700 font-mono text-[9px] uppercase italic tracking-widest">[ SELECT TARGET TO ESTABLISH FORENSIC SIGNAL ]</p>
            </div>
          </div>

          <div className="w-full lg:w-[40%] mt-24">
            <div className="bg-slate-950/50 border-2 border-slate-900 p-14 relative shadow-2xl">
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-red-600" />
              <p className="text-slate-400 text-xl md:text-3xl font-medium italic uppercase leading-tight italic">
                Most AI deployments leak capital through <span className="text-white italic underline decoration-red-600">unmonitored systemic decay</span>. Select your node to begin the forensic triangulation.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
