"use client";
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function PulseCheck() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans">
      <Header />
      
      <main className="pt-32 pb-16 md:pt-56 md:pb-32 w-full overflow-hidden px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 text-left">
          
          <div className="w-full lg:w-[55%] shrink-0">
            <div className="border-l-[6px] border-red-600 pl-6 md:pl-10 mb-10 md:mb-16">
              <h2 className="text-red-600 font-mono text-xs font-black tracking-[0.5em] uppercase italic mb-5">
                BMR_SOLUTIONS // AI_EFFICIENCY_AUDIT
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-[clamp(3.5rem,8vw,7rem)] font-black italic leading-[0.85] uppercase m-0 tracking-tighter">
                Initialize <br /><span className="text-red-600">Intake.</span>
              </h1>
            </div>

            <div className="border-t border-[#1e293b] pt-10 mb-12">
               <h3 className={`text-[11px] font-mono font-black tracking-[0.4em] uppercase italic transition-all duration-700 mb-8 ${
                !selectedNode ? "text-red-600 animate-pulse scale-105 origin-left" : "text-slate-700 opacity-50"
              }`}>
                Step 1: Choose Operational Focus {selectedNode && <span className="text-green-500 ml-4">[ SIGNAL_LOCKED ]</span>}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Executive', 'Managerial', 'Technical'].map((node) => (
                  <button
                    key={node}
                    onClick={() => setSelectedNode(node)}
                    className={`py-8 px-6 border-2 font-black uppercase italic tracking-widest text-xs transition-all text-left ${
                      selectedNode === node 
                        ? "border-red-600 bg-red-600/10 text-white" 
                        : "border-slate-900 bg-slate-950 text-slate-500 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {node}_Node
                  </button>
                ))}
              </div>
            </div>

            <div className="h-20">
              {selectedNode && (
                <button className="bg-white text-black py-6 px-12 font-black uppercase tracking-[0.3em] text-xs hover:bg-red-600 hover:text-white transition-all flex items-center gap-4">
                  INITIATE_DIAGNOSTIC <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[40%] mt-8 lg:mt-24 shrink-0">
            <div className="bg-[#0f172a]/40 border-2 border-[#1e293b] p-8 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-red-600" />
              <p className="text-slate-400 text-xl md:text-2xl font-medium italic font-sans uppercase leading-tight">
                Most AI deployments leak capital through <span className="text-white">unmonitored systemic decay</span>. This decoupling of strategic intent from machine execution creates invisible financial fractures.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
