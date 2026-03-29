"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Search, ShieldAlert, Zap, Microscope } from "lucide-react";

const SENSORS = [
  {
    id: "SIG-01",
    icon: <ShieldAlert className="h-5 w-5" />,
    label: "Authority Vacuum Detection",
    copy: "When humans override AI decisions without logging it, you have a governance fracture. We measure Shadow Labor and Δ Override Rates.",
    probe: "Show us the last 5 AI decisions manually corrected. If >20% are unlogged, Δ increases."
  },
  {
    id: "SIG-02",
    icon: <Zap className="h-5 w-5" />,
    label: "Value Leakage Audit",
    copy: "AI systems fail gradually, leaking value through rework and misalignment. We quantify Operational Resonance (AVS) to pinpoint where ROI erodes.",
    probe: "Provide the last 10 AI-driven outcomes. If >15% required manual correction, value leakage detected."
  },
  {
    id: "SIG-03",
    icon: <Search className="h-5 w-5" />,
    label: "Log Rot Forensic",
    copy: "Audit trails that lack context are useless for defense. We analyze IGF (Audit Fidelity) to ensure your logs survive a hostile regulatory review.",
    probe: "Can you reconstruct the 'Logic Chain' of a decision made 90 days ago? If not, you have Log Rot."
  },
  {
    id: "SIG-04",
    icon: <Microscope className="h-5 w-5" />,
    label: "Trust Erosion Mapping",
    copy: "We map the gap between what your AI claims to do and what users actually experience, calculating the HAI (Human-AI Integrity) score.",
    probe: "Compare your marketing 'Accuracy Rate' against your 'Support Ticket Rate' for AI errors."
  }
];

export default function Sensors() {
  return (
    <section className="bg-[#020617] py-32 px-6 border-y border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 text-left border-l-4 border-red-600 pl-8">
          <h2 className="text-[10px] font-black tracking-[0.5em] text-red-600 uppercase mb-4 italic">
            SIGNAL ANALYSIS // SENSOR-ARRAY-V3
          </h2>
          <h3 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
            DETECTING SYSTEMIC <span className="text-red-600">DRIFT</span>
          </h3>
        </div>

        {/* Removed the white background grid and replaced with a clean gap */}
        <div className="grid md:grid-cols-2 gap-6">
          {SENSORS.map((sensor, index) => (
            <motion.div 
              key={sensor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/10 border border-slate-900 p-12 group hover:border-red-600/50 transition-all shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  {sensor.icon}
                </div>
                <span className="text-[10px] font-black text-slate-700 tracking-widest uppercase font-mono italic">
                  {sensor.id}
                </span>
              </div>
              
              <h4 className="text-3xl font-black mb-4 italic uppercase tracking-tighter text-white">
                {sensor.label}
              </h4>
              <p className="text-slate-500 mb-10 leading-relaxed text-sm font-medium italic uppercase tracking-tight">
                {sensor.copy}
              </p>

              <div className="bg-black/40 p-8 border-l-2 border-red-600">
                <p className="text-[9px] text-red-600 font-black uppercase tracking-[0.4em] mb-3 italic">
                  FORENSIC PROBE //
                </p>
                <p className="text-slate-400 text-xs font-mono leading-relaxed uppercase tracking-tighter">
                  {sensor.probe}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
