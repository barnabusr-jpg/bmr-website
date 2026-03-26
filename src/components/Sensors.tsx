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
    <section className="bg-white py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-xs font-black tracking-[0.5em] text-slate-400 uppercase mb-4">
            The 4-Sensor Array
          </h2>
          <h3 className="text-4xl font-black italic text-slate-900 uppercase tracking-tight">
            Detecting Systemic Drift
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
          {SENSORS.map((sensor, index) => (
            <motion.div 
              key={sensor.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 group hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-900 text-white group-hover:bg-red-600 transition-colors">
                  {sensor.icon}
                </div>
                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                  {sensor.id}
                </span>
              </div>
              
              <h4 className="text-2xl font-black mb-4 italic uppercase tracking-tighter text-slate-900">
                {sensor.label}
              </h4>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm font-medium">
                {sensor.copy}
              </p>

              <div className="bg-slate-900 p-6 font-mono border-l-4 border-red-600">
                <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mb-2">
                  Forensic Probe:
                </p>
                <p className="text-white text-xs leading-relaxed">
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
