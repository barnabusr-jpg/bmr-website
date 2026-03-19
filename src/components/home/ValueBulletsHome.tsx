"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Target, Cpu } from "lucide-react";

const signals = [
  { 
    id: "SIG-01", 
    title: "Responsible AI", 
    desc: "Hardening the boundary between human intent and automated output via ethical frameworks.", 
    icon: Shield 
  },
  { 
    id: "SIG-02", 
    title: "Measurable Results", 
    desc: "Eliminating value leak by driving outcomes with forensic data-driven insights.", 
    icon: Zap 
  },
  { 
    id: "SIG-03", 
    title: "Human-Centered", 
    desc: "Designing solutions that enhance human capabilities and stabilize shadow labor.", 
    icon: Target 
  },
  { 
    id: "SIG-04", 
    title: "Strategic Focus", 
    desc: "Establishing adaptive control loops that align AI initiatives with core organization goals.", 
    icon: Cpu 
  },
];

const ValueBullets = () => {
  return (
    <section className="py-24 px-6 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Added a Grid-based layout with 1px gaps for that "Dashboard" feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-slate-900/50 border border-slate-900 shadow-2xl">
          {signals.map((signal, i) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-10 bg-[#020617] group hover:bg-slate-900/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle accent hover effect */}
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500"></div>
              
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-slate-900/50 border border-slate-800 group-hover:border-[#14b8a6]/40 transition-colors">
                    <signal.icon className="h-6 w-6 text-[#14b8a6] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-[9px] font-black text-slate-800 group-hover:text-[#14b8a6] transition-colors tracking-[0.3em] italic">
                    {signal.id}
                  </span>
                </div>

                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4 leading-none group-hover:text-[#14b8a6] transition-colors">
                  {signal.title}
                </h3>
                
                <p className="text-sm text-slate-500 font-light italic leading-relaxed">
                  {signal.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueBullets;
