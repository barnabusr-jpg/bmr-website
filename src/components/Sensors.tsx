"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Search, ShieldAlert, Zap, Microscope } from "lucide-react";

const SENSORS = [
  {
    id: "SIG-01",
    icon: <ShieldAlert className="h-5 w-5" />,
    label: "Authority Vacuum Detection",
    copy: "When humans override AI decisions without a recorded audit, you have a governance fracture. This creates unmanaged shadow labor. We measure the drift between intended logic and manual intervention.",
    probe: "Does your current dashboard identify every instance where a human manually corrected an AI output? If you cannot, you have an authority vacuum."
  },
  {
    id: "SIG-02",
    icon: <Zap className="h-5 w-5" />,
    label: "Value Leakage Audit",
    copy: "AI systems fail gradually. They leak value through rework and misalignment. This erosion of profit is often invisible to leadership. We quantify operational resonance to find where margin decays.",
    probe: "Does your profit margin on AI-assisted tasks match your initial projections? Discrepancies in these figures indicate systemic value leakage."
  },
  {
    id: "SIG-03",
    icon: <Search className="h-5 w-5" />,
    label: "Log Rot Forensic",
    copy: "Audit trails that lack context are useless for defense. We ensure your logs survive a hostile regulatory review. We analyze audit fidelity to maintain structural integrity over time.",
    probe: "Pick a random AI decision from the last quarter. Can you prove the logic chain to a regulator today? If you cannot, you have log rot."
  },
  {
    id: "SIG-04",
    icon: <Microscope className="h-5 w-5" />,
    label: "Trust Erosion Mapping",
    copy: "We map the gap between what your AI claims to perform and what users actually experience. We calculate the integrity score. This identifies where user trust has decoupled from system output.",
    probe: "Is there a measurable difference between your internal accuracy reports and the volume of support tickets? This gap is trust erosion."
  }
];

export default function Sensors() {
  return (
    <section className="bg-[#020617] py-32 px-6 border-y border-slate-900">
      <div className="container mx-auto max-w-7xl">
        
        {/* HEADER SECTION: Synchronized with Hero "Node Access" theme */}
        <div className="mb-20 text-left border-l-4 border-red-600 pl-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-red-600/50" />
            <h2 className="text-[10px] font-black tracking-[0.5em] text-red-600 uppercase italic">
              NODE_STREAM: SENSOR_ARRAY_V3 // ACTIVE_SCAN
            </h2>
          </div>
          <h3 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
            DETECTING SYSTEMIC <span className="text-red-600">DRIFT.</span>
          </h3>
        </div>

        {/* SENSOR GRID */}
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
                <div className="p-3 bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] group-hover:bg-white group-hover:text-red-600 transition-colors">
                  {sensor.icon}
                </div>
                <span className="text-[10px] font-black text-slate-700 tracking-widest uppercase font-mono italic">
                  {sensor.id}
                </span>
              </div>
              
              <h4 className="text-3xl font-black mb-4 italic uppercase tracking-tighter text-white group-hover:text-red-600 transition-colors">
                {sensor.label}
              </h4>
              <p className="text-slate-500 mb-10 leading-relaxed text-sm font-medium italic uppercase tracking-tight text-left">
                {sensor.copy}
              </p>

              <div className="bg-black/40 p-8 border-l-2 border-red-600 text-left">
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
