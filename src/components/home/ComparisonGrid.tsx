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
      bmr: "AVS: Identifying &quot;Shadow Labor&quot; and systemic value leakage."
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
    <section className="py-32 bg-slate-950 px-6 border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl text-left">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="bg-red-600/10 p-2 w-fit mb-4"
             >
              <ShieldAlert className="h-6 w-6 text-red-600" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
              Traditional <span className="text-slate-700">vs.</span> <br />
              <span className="text-red-600">Forensic Audit.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] max-w-[240px] leading-relaxed border-l border-slate-800 pl-6 italic">
            Most agencies measure adoption. We measure the divergence between intent and reality.
          </p>
        </div>
        
        <div className="overflow-hidden border border-slate-900 bg-slate-900/10 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-900/40">
                <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Audit Vector</th>
                <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Standard Approach</th>
                <th className="p-8 text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">BMR Forensics</th>
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
                  <td className="p-8 text-white font-black italic uppercase text-xs tracking-tight bg-slate-900/20">
                    {row.area}
                  </td>
                  <td className="p-8 text-slate-500 text-sm italic leading-relaxed">
                    <div className="flex items-start gap-3">
                      <X className="h-4 w-4 text-slate-800 mt-0.5 shrink-0" />
                      {row.traditional}
                    </div>
                  </td>
                  <td className="p-8 text-slate-200 text-sm leading-relaxed font-bold italic border-l border-slate-900">
                    <div className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                      {row.bmr}
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
