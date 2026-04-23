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
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="flex items-center gap-2 mb-4 justify-center">
             <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] italic">
               Validation Standards
             </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter italic uppercase">
            Hardened <span className="text-slate-500">Outcomes</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed italic">
            Restoring alignment between intent, execution, and lived experience before systemic risk hardens into permanent failure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forensicOutcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="p-8 h-full bg-slate-900/20 border-slate-900 border-2 relative overflow-hidden group rounded-none transition-all duration-500">
                
                {/* Forensic Red Vertical Highlight */}
                <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-red-600 transition-all duration-500 ease-in-out"></div>
                
                <div className="flex flex-col gap-5 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-red-600/10 w-fit">
                      <outcome.icon className="h-6 w-6 text-red-600 group-hover:animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black font-mono text-slate-700 tracking-[0.3em]">
                      {outcome.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-3 text-white tracking-tight italic uppercase group-hover:text-red-600 transition-colors">
                      {outcome.title}
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed italic text-sm border-l border-slate-800 pl-4">
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
          className="mt-20 text-center"
        >
          <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-[10px] italic">
            &quot;Systemic recovery begins with the rejection of technical optimism.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Outcomes;
