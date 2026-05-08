"use client";
import React from 'react';
import { ShieldCheck, Activity, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const advisoryOutcomes = [
  { 
    icon: Activity, 
    label: "EXECUTIVE NODE", 
    title: "Fiduciary Assurance", 
    description: "Neutralizing legal and regulatory exposure by establishing reconstructible logic chains that survive board-level scrutiny." 
  },
  { 
    icon: TrendingUp, 
    label: "MANAGERIAL NODE", 
    title: "Capacity Recovery", 
    description: "Reclaiming up to 30% of engineering bandwidth lost to 'Shadow Labor' and manual validation loops." 
  },
  { 
    icon: ShieldCheck, 
    label: "TECHNICAL NODE", 
    title: "Structural Hardening", 
    description: "Removing systemic fragility to ensure resilient model performance in non-deterministic decision cycles." 
  }
];

export default function OutcomesHome() {
  return (
    <section className="bg-slate-950 py-32 border-y border-slate-900 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-left mb-20 border-l-8 border-red-600 pl-10">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[10px] italic">
            CLINICAL_NODE_AUDIT // SYSTEM_STABILIZATION
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] mt-4">
            HARDENED <br /><span className="text-slate-800">OUTCOMES.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advisoryOutcomes.map((outcome, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-12 shadow-2xl border-l-[12px] border-red-600 group hover:-translate-y-3 transition-all duration-500"
            >
              <div className="flex justify-between items-center mb-8">
                <outcome.icon size={48} className="text-red-600" />
                <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest italic">{outcome.label}</span>
              </div>
              <h3 className="text-4xl font-black text-black italic uppercase tracking-tighter mb-6 leading-none">
                {outcome.title}
              </h3>
              <p className="text-slate-600 font-bold uppercase text-xs leading-relaxed italic border-t border-slate-100 pt-6">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
