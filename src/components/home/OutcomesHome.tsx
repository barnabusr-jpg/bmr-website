"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Activity, 
  ZapOff, 
  Database, 
  Scaling, 
  Binary 
} from "lucide-react";

const forensicOutcomes = [
  {
    icon: ZapOff,
    category: "OC-01",
    title: "Drift Containment",
    description: "Identifying and neutralizing the delta (Δ) between automated outputs and human operational reality before trust collapses."
  },
  {
    icon: Activity,
    category: "OC-02",
    title: "Resonance Mapping",
    description: "Aligning system performance with human mental models to stop shadow labor and unlogged manual overrides."
  },
  {
    icon: ShieldCheck,
    category: "OC-03",
    title: "Fidelity Assurance",
    description: "Establishing reconstructible logic chains that survive hostile regulatory review and internal accountability audits."
  },
  {
    icon: Binary,
    category: "OC-04",
    title: "Structural Hardening",
    description: "Removing systemic fragility to ensure resilient performance in high-stakes, non-deterministic decision cycles."
  },
  {
    icon: Scaling,
    category: "OC-05",
    title: "Governance Scaling",
    description: "Linking AI initiatives directly to core mission objectives, ensuring strategic intent is not lost in technical execution."
  },
  {
    icon: Database,
    category: "OC-06",
    title: "Leakage Recovery",
    description: "Capturing leaked organizational value by reconciling technical precision with operational adoption rates."
  }
];

const Outcomes = () => {
  return (
    <section style={{ borderTop: '1px solid #1e293b', paddingTop: '120px', paddingBottom: '120px', backgroundColor: '#020617' }}>
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-left mb-24 border-l-4 border-slate-800 pl-12"
        >
          <div className="flex items-center gap-3 mb-6">
             <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs italic">
                VALIDATION_STANDARDS // SYSTEM_RECOVERY
             </span>
          </div>
          <h2 className="text-7xl md:text-8xl font-black mb-8 text-white tracking-tighter italic uppercase leading-[0.85]">
            Hardened <span className="text-slate-800">Outcomes</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-400 max-w-4xl font-light leading-relaxed italic">
            Restoring alignment between intent, execution, and lived experience before systemic risk hardens into permanent failure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {forensicOutcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="p-12 h-full bg-slate-950/40 border-slate-900 border-2 relative overflow-hidden group rounded-none transition-all duration-500 shadow-2xl">
                
                {/* Forensic Red Vertical Highlight */}
                <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-red-600 transition-all duration-500 ease-in-out"></div>
                
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="p-4 bg-red-600/10 border border-red-600/20">
                      <outcome.icon className="h-8 w-8 text-red-600 group-hover:animate-pulse" />
                    </div>
                    <span className="text-[11px] font-black font-mono text-slate-800 tracking-[0.4em] uppercase">
                      {outcome.category}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-white tracking-tighter italic uppercase group-hover:text-red-600 transition-colors leading-none">
                      {outcome.title}
                    </h3>
                    <p style={{ fontSize: '1.4rem' }} className="text-slate-500 font-medium leading-relaxed italic border-l-2 border-slate-800 pl-8 text-left uppercase tracking-tight">
                      {outcome.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-left"
        >
          <p className="text-slate-800 font-black uppercase tracking-[0.6em] text-xs italic border-t border-slate-900 pt-12">
            &quot;Systemic recovery begins with the rejection of technical optimism.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Outcomes;
