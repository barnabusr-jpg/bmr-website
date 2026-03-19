import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Shield, Zap, Target, CheckCircle2 } from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Systemic Readiness",
    description: "Reducing operational friction to ensure rapid and sustainable user integration across all levels of the organization."
  },
  {
    icon: Users,
    title: "Expectation Continuity",
    description: "Aligning system performance with human mental models to prevent trust erosion during high stakes decision cycles."
  },
  {
    icon: Shield,
    title: "Defensible Compliance",
    description: "Establishing automated audit trails and governance structures to navigate shifting regulatory expectations with certainty."
  },
  {
    icon: Zap,
    title: "Structural Hardening",
    description: "Eliminating systemic drift to ensure consistent and resilient performance within AI enabled workflows."
  },
  {
    icon: Target,
    title: "Operational Resonance",
    description: "Linking artificial intelligence initiatives directly to core mission objectives to ensure strategic intent matches execution."
  },
  {
    icon: CheckCircle2,
    title: "Verified ROI",
    description: "Identifying and capturing organizational value that is frequently leaked during the initial implementation phase."
  }
];

const Outcomes = () => {
  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight italic uppercase">
            Hardened <span className="text-[#14b8a6]">Outcomes</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Restoring alignment between intent, execution, and lived experience before systemic risk hardens into permanent failure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="p-8 h-full bg-slate-900/30 border-slate-800 transition-all duration-500 border-2 relative overflow-hidden group">
                
                {/* THE STANDARDIZED FIX: Top-down vertical build highlight */}
                <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500 ease-in-out"></div>
                
                <div className="flex flex-col gap-5 relative z-10">
                  <div className="p-3 rounded-lg bg-[#14b8a6]/10 w-fit">
                    <outcome.icon className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white tracking-tight italic uppercase">
                      {outcome.title}
                    </h3>
                    <p className="text-slate-400 font-light leading-relaxed">
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
          <p className="text-slate-500 font-light italic text-sm">
            &quot;Progress is achieved by identifying the smallest set of targeted interventions 
            required to materially change organizational outcomes.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Outcomes;
