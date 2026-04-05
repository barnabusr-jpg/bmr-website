"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface FieldGuideProps {
  sector: string;
}

export default function FieldGuide({ sector }: FieldGuideProps) {
  const sectorLabel = sector ? sector.toUpperCase() : "GENERAL";

  return (
    <div className="space-y-12 py-12 border-t border-slate-900 mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] tracking-[0.3em] font-bold uppercase">
            <BookOpen size={14} />
            <span>FIELD GUIDE 01 // STRATEGIC ALIGNMENT</span>
          </div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            <span>OPERATIONAL </span><span className="text-red-600">FRONTIERS</span>
          </h2>
        </div>
        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-sm">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            <span>Sector Lock: </span><span className="text-white font-bold">{sectorLabel}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-slate-900/20 border border-slate-900 hover:border-red-600/50 transition-all group">
          <AlertCircle className="text-red-600 mb-6" size={24} />
          <h3 className="text-lg font-black uppercase italic text-white mb-4 tracking-tight"><span>The Promise Gap</span></h3>
          <p className="text-sm text-slate-400 leading-relaxed font-light">
            <span>Most AI initiatives fail because they solve for </span><span className="text-white italic">Technical Capability</span><span> while ignoring </span><span className="text-white italic">Structural Logic</span><span>. This creates a $20M liability gap.</span>
          </p>
        </div>
        {/* ... Repeated hardened cards ... */}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-red-600/5 border border-red-600/20 p-8 rounded-sm text-center">
        <p className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] font-black">
          <span>Closing the Gap Requires Active Intervention</span>
        </p>
      </motion.div>
    </div>
  );
}
