"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Activity, ShieldAlert } from "lucide-react"; 
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ActivationModal from '@/components/modals/ActivationModal';

export default function RapidDeRisk() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-500/30 font-sans text-left">
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block px-4 py-1 border border-red-600/50 bg-red-600/5 text-[10px] font-mono text-red-600 uppercase tracking-[0.3em] italic mb-8"
            >
              PROTOCOL 01 ACTIVATED
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-6 text-center text-white">
              RAPID <br /><span className="text-red-600">DE-RISK.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium uppercase italic tracking-tight max-w-2xl mx-auto text-center">
              Identify architectural drift and stabilize automated logic within forty eight hours.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 hover:bg-white text-white hover:text-red-600 px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] transition-all italic flex items-center gap-3"
            >
              ACTIVATE PROTOCOL <Activity size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-slate-900/50 border border-slate-900">
            <div className="bg-slate-950 p-12 space-y-8 text-left">
              <div className="flex items-center gap-3 text-red-600 text-left">
                <ShieldAlert size={20} />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">DRIFT ANALYSIS</h2>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose text-left">
                Immediate detection of systemic instability and logic decay:
              </p>
              <ul className="space-y-4 text-slate-400 text-sm italic font-medium text-left">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-600 mt-1.5" /> Mapping the &quot;Promise Gap&quot; in system output</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-600 mt-1.5" /> Identifying unlogged manual overrides</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-600 mt-1.5" /> Measuring latent rework tax velocity</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-12 space-y-8 border-l border-slate-900 text-left">
              <div className="flex items-center gap-3 text-red-600 text-left">
                <Activity size={20} />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">STABILIZATION OBJECTIVES</h2>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose text-left">
                This protocol achieves immediate operational hardening:
              </p>
              <ul className="space-y-4 text-slate-400 text-sm italic font-medium text-left">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-600 mt-1.5" /> Establish real time logic trace logs</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-600 mt-1.5" /> Standardize the &quot;Human in the Loop&quot; audit</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-600 mt-1.5" /> Secure the architectural logic boundary</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <ActivationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        protocolName="RAPID DE-RISK"
      />
      <Footer />
    </div>
  );
}
