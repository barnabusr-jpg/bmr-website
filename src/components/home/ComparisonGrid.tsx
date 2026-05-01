"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ShieldAlert, X, Check } from 'lucide-react';

const ComparisonGrid = () => {
  const data = [
    {
      area: "Audit Scope",
      traditional: "Technical uptime and token usage volume.",
      bmr: "HAI: Forensic analysis of human-in-the-loop logic rot."
    },
    {
      area: "Leakage Detection",
      traditional: "General project cost vs. static budget.",
      bmr: "AVS: Identifying \"Shadow Labor\" and systemic value leakage."
    },
    {
      area: "System Drift",
      traditional: "Annual compliance checklists and surveys.",
      bmr: "IGF: Continuous Δ (Delta) probes to prevent architectural decay."
    },
    {
      area: "Final Output",
      traditional: "Executive summary and high-level PPT.",
      bmr: "Drift Diagnostic: Structural recovery and protocol hardening."
    }
  ];

  return (
    <section style={{ borderTop: '1px solid #1e293b', paddingTop: '140px', paddingBottom: '140px', backgroundColor: '#020617' }}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12 border-l-4 border-red-600 pl-12">
          <div className="max-w-2xl text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-red-600/10 p-3 w-fit mb-6 border border-red-600/20"
            >
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-[0.85]">
              Traditional <br />
              <span className="text-slate-800">vs.</span> <br />
              <span className="text-red-600">Forensic Audit.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.5em] max-w-[320px] leading-relaxed border-l-2 border-slate-900 pl-8 italic mt-12">
            Most agencies measure adoption metrics. We measure the systemic divergence between intent and reality.
          </p>
        </div>
        
        <div style={{ border: '2px solid #0f172a', background: 'rgba(15, 23, 42, 0.2)' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '2px solid #0f172a', background: 'rgba(15, 23, 42, 0.5)' }}>
                <th className="p-10 text-xs font-black text-slate-500 uppercase tracking-[0.5em]">Audit Vector</th>
                <th className="p-10 text-xs font-black text-slate-500 uppercase tracking-[0.5em]">Standard Approach</th>
                <th className="p-10 text-xs font-black text-red-600 uppercase tracking-[0.5em]">BMR Forensics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data.map((row, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-red-600/[0.02] transition-colors"
                >
                  <td className="p-12 text-white font-black italic uppercase text-2xl tracking-tight bg-slate-950/40 border-r border-slate-900">
                    {row.area}
                  </td>
                  <td className="p-12 text-slate-500 text-xl italic leading-relaxed">
                    <div className="flex items-start gap-4">
                      <X className="h-6 w-6 text-slate-800 mt-1 shrink-0" />
                      {row.traditional}
                    </div>
                  </td>
                  <td className="p-12 text-slate-200 text-xl leading-relaxed font-bold italic border-l-2 border-slate-900">
                    <div className="flex items-start gap-4">
                      <Check className="h-6 w-6 text-red-600 mt-1 shrink-0" />
                      <span className="text-white">{row.bmr}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonGrid;
