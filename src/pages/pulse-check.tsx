"use client";
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, TrendingUp, ChevronRight } from 'lucide-react';

export default function PulseCheck() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = [
    { id: 'Executive', icon: ShieldCheck, label: 'Fiduciary_Hardening' },
    { id: 'Managerial', icon: TrendingUp, label: 'Capacity_Recovery' },
    { id: 'Technical', icon: Activity, label: 'Logic_Stabilization' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans">
      <Header />
      
      <main className="pt-44 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* 🔍 2.0 REFRAMED HEADER */}
          <header className="mb-20 border-l-8 border-red-600 pl-10 md:pl-16 space-y-6">
            <h2 className="text-red-600 font-mono text-xs font-black tracking-[0.5em] uppercase italic">
              BMR_SOLUTIONS // AI_EFFICIENCY_AUDIT
            </h2>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
              Initialize <br /> <span className="text-red-600">Intake.</span>
            </h1>
            <p className="text-slate-400 text-xl md:text-2xl italic font-medium leading-relaxed max-w-2xl">
              Most AI deployments leak capital through <span className="text-white">unmonitored systemic decay</span>. This decoupling of strategic intent from machine execution creates invisible financial fractures.
            </p>
          </header>

          {/* ⚡ PULSING STEP 1 HEADER */}
          <div className="mb-10 flex items-center gap-6 h-8">
            <h3 className={`text-[11px] font-mono font-black tracking-[0.4em] uppercase italic transition-all duration-700 ${
              !selectedNode 
                ? "text-red-600 animate-pulse scale-105 origin-left" 
                : "text-slate-700 opacity-50"
            }`}>
              Step 1: Choose Operational Focus
            </h3>
            
            <AnimatePresence>
              {selectedNode && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[9px] font-mono text-green-500 font-black uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-sm italic"
                >
                  [ SIGNAL_LOCKED ]
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* NODE SELECTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-10 border-2 transition-all duration-500 text-left group relative overflow-hidden ${
                  selectedNode === node.id 
                    ? "border-red-600 bg-red-600/5 shadow-[0_0_40px_rgba(220,38,38,0.15)]" 
                    : "border-slate-900 bg-slate-950/50 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                   <node.icon size={32} className={`${selectedNode === node.id ? "text-red-600" : "text-slate-700"}`} />
                   <span className={`text-[8px] font-mono font-black uppercase tracking-widest italic ${
                     selectedNode === node.id ? "text-red-600" : "text-slate-800"
                   }`}>
                     {node.label}
                   </span>
                </div>
                
                <span className={`text-3xl font-black italic uppercase tracking-tighter leading-none transition-colors ${
                  selectedNode === node.id ? "text-white" : "text-slate-500 group-hover:text-white"
                }`}>
                  {node.id}
                </span>

                {selectedNode === node.id && (
                  <motion.div 
                    layoutId="outline"
                    className="absolute inset-0 border-2 border-red-600 pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* DYNAMIC SUBMISSION PROMPT */}
          <div className="mt-16 pt-12 border-t border-slate-900">
            <AnimatePresence mode="wait">
              {!selectedNode ? (
                <motion.p 
                  key="prompt"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-red-600/40 font-mono text-[10px] font-black uppercase tracking-[0.4em] italic animate-bounce"
                >
                  [ Selection Required to Establish Forensic Signal ]
                </motion.p>
              ) : (
                <motion.button 
                  key="button"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white text-black px-12 py-6 font-black uppercase italic tracking-[0.3em] text-sm hover:bg-red-600 hover:text-white transition-all border-l-[12px] border-red-600 flex items-center gap-4"
                >
                  PROCEED_TO_NODE_AUDIT <ChevronRight size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
