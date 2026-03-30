"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Brain, Lock, CheckCircle, FileText } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ExpertiseRecovery() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 font-sans">
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center">
            {/* 🛠️ PULSING PROTOCOL INDICATOR */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block px-4 py-1 border border-purple-600/50 bg-purple-600/5 text-[10px] font-mono text-purple-500 uppercase tracking-[0.3em] italic mb-8"
            >
              PROTOCOL 03 ACTIVATED
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-6">
              EXPERTISE <br /><span className="text-purple-600 text-outline">RECOVERY.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium uppercase italic tracking-tight max-w-2xl mx-auto">
              Reversing the "Black Box" dependency to restore structural human capability.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <button className="bg-purple-600 hover:bg-white text-white hover:text-purple-600 px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] transition-all italic flex items-center gap-3">
              ACTIVATE PROTOCOL <Brain size={16} />
            </button>
            <button className="border border-slate-800 hover:border-purple-600 text-slate-500 hover:text-white px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] transition-all italic">
              DOWNLOAD FIELD MANUAL
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-slate-900/50 border border-slate-900">
            {/* SKILL DECAY ANALYSIS */}
            <div className="bg-slate-950 p-12 space-y-8">
              <div className="flex items-center gap-3 text-purple-500">
                <Brain size={20} />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">SKILL DECAY ANALYSIS</h2>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose text-left">
                Over reliance on AI logic creates systemic fragility. We identify these vulnerabilities:
              </p>
              <ul className="space-y-4 text-slate-400 text-sm italic font-medium text-left">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-purple-600 mt-1.5" /> Loss of first principles reasoning</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-purple-600 mt-1.5" /> Inability to detect complex hallucinations</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-purple-600 mt-1.5" /> Junior staff "logic lock" dependency</li>
              </ul>
            </div>

            {/* PROTOCOL OBJECTIVES */}
            <div className="bg-slate-950 p-12 space-y-8 border-l border-slate-900">
              <div className="flex items-center gap-3 text-purple-500">
                <Lock size={20} />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">PROTOCOL OBJECTIVES</h2>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose text-left">
                This protocol restores human operational integrity and sovereignty:
              </p>
              <ul className="space-y-4 text-slate-400 text-sm italic font-medium text-left">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-purple-600 mt-1.5" /> Establish "Blackout" manual proficiency</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-purple-600 mt-1.5" /> Implement mandatory logic trace audits</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-purple-600 mt-1.5" /> Restore internal expertise sovereignty</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
