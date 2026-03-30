"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react"; // Removed unused icons
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StructuralHardening() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans text-left">
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block px-4 py-1 border border-blue-600/50 bg-blue-600/5 text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] italic mb-8"
            >
              PROTOCOL 02 ACTIVATED
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-6 text-center">
              STRUCTURAL <br /><span className="text-blue-600">HARDENING.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium uppercase italic tracking-tight max-w-2xl mx-auto text-center">
              Eliminate the rework tax and establish military grade governance frameworks.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <button className="bg-blue-600 hover:bg-white text-white hover:text-blue-600 px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] transition-all italic flex items-center gap-3">
              ACTIVATE PROTOCOL <Zap size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-slate-900/50 border border-slate-900">
            <div className="bg-slate-950 p-12 space-y-8 text-left">
              <div className="flex items-center gap-3 text-blue-500">
                <Shield size={20} />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">SYSTEM DECAY ANALYSIS</h2>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose">
                The rework tax creates compounding operational debt. We identify these drift points:
              </p>
              <ul className="space-y-4 text-slate-400 text-sm italic font-medium">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-600 mt-1.5" /> Verify to serve ratios exceeding 2.0</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-600 mt-1.5" /> Silent updates creating system drift</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-600 mt-1.5" /> Accountability gaps in AI decisions</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-12 space-y-8 border-l border-slate-900 text-left">
              <div className="flex items-center gap-3 text-blue-500">
                <Zap size={20} />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">PROTOCOL OBJECTIVES</h2>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose">
                This protocol establishes structural integrity within the logic chain:
              </p>
              <ul className="space-y-4 text-slate-400 text-sm italic font-medium">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-600 mt-1.5" /> Reduce verify to serve ratio below 1.5</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-600 mt-1.5" /> Implement blind validation protocols</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-600 mt-1.5" /> Establish AI decision traceability</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
