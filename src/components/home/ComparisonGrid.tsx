"use client";
import React from 'react';
import { X, Check } from 'lucide-react';

const comparisonData = [
  { 
    area: "Audit Scope", 
    traditional: "Technical uptime and token usage volume.", 
    bmr: "Executive Node: Forensic analysis of fiduciary risk and logic rot." 
  },
  { 
    area: "Value Leakage", 
    traditional: "General project cost vs. static budget.", 
    bmr: "Managerial Node: Identifying 'Shadow Labor' and engineering capacity waste." 
  },
  { 
    area: "System Drift", 
    traditional: "Annual compliance checklists and static surveys.", 
    bmr: "Technical Node: Continuous validation probes to prevent architectural decay." 
  },
  { 
    area: "Final Output", 
    traditional: "High-level PPT summaries and general adoption metrics.", 
    bmr: "Hardened Roadmap: Structural recovery and logic-gate implementation." 
  }
];

export default function ComparisonGrid() {
  return (
    <section className="bg-[#020617] py-24 md:py-32 border-t border-slate-900 selection:bg-red-600/30">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 border-l-[6px] border-red-600 pl-10">
          <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] m-0">
            Traditional <span className="text-slate-800">vs</span><br />
            <span className="text-red-600">Forensic Audit.</span>
          </h2>
          <p className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] max-w-[280px] italic leading-relaxed m-0">
            Most agencies measure adoption. We measure the financial divergence between intent and reality.
          </p>
        </div>

        {/* COMPARISON TABLE */}
        <div className="overflow-x-auto border-2 border-slate-900 shadow-2xl">
          <table className="w-full border-collapse text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-950/80 border-b-2 border-slate-900">
                <th className="p-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic">Audit Vector</th>
                <th className="p-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic">Standard Approach</th>
                <th className="p-8 text-red-600 text-[10px] font-black uppercase tracking-[0.4em] italic">BMR Advisory</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className="border-b border-slate-900 group hover:bg-white/[0.01] transition-colors">
                  <td className="p-10 bg-slate-950/40 border-r border-slate-900">
                    <span className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter block leading-none">
                      {row.area}
                    </span>
                  </td>
                  <td className="p-10 border-r border-slate-900">
                    <div className="flex gap-4 items-start text-slate-500 italic text-base md:text-lg leading-tight">
                      <X size={20} className="shrink-0 text-slate-800" /> 
                      {row.traditional}
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="flex gap-4 items-start text-white font-bold italic text-base md:text-lg leading-tight group-hover:text-red-500 transition-colors">
                      <Check size={20} className="shrink-0 text-red-600" /> 
                      {row.bmr}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📊 FOOTER NOTE */}
        <div className="mt-12 text-center">
           <p className="text-[9px] font-mono font-black text-slate-700 uppercase tracking-[0.5em] italic">
             Forensic_Benchmark_Matrix // 2026_Standard
           </p>
        </div>
      </div>
    </section>
  );
}
