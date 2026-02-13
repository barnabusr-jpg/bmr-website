import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Shield, Zap, Target, CheckCircle2 } from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Accelerated Adoption",
    description: "Move forward more decisively when uncertainty and misalignment are reduced."
  },
  {
    icon: Users,
    title: "Enhanced Trust",
    description: "Stakeholders gain confidence when AI use is understandable, consistent, and accountable."
  },
  {
    icon: Shield,
    title: "Regulatory Confidence",
    description: "Navigate expectations with fewer surprises when governance decisions are coherent."
  },
  {
    icon: Zap,
    title: "Operational Stability",
    description: "AI-enabled workflows become more predictable and resilient when decision friction is addressed."
  },
  {
    icon: Target,
    title: "Strategic Alignment",
    description: "AI initiatives reinforce organizational priorities rather than competing with them."
  },
  {
    icon: CheckCircle2,
    title: "Evidence of Value",
    description: "Gain clearer visibility into whether AI efforts are contributing to meaningful outcomes over time."
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
          {/* UPDATED: Added Italic/Uppercase for Forensic consistency */}
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight italic uppercase">Outcome <span className="text-[#14b8a6]">Snapshot</span></h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Restoring alignment between intent, execution, and lived experience before risk hardens into outcome.
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
              {/* UPDATED: Swapped hover:border for consistent forensic highlight */}
              <Card className="p-8 h-full bg-slate-900/30 border-slate-800 transition-all duration-500 border-2 relative overflow-hidden group">
                
                {/* THE FIX: Left-side accent that matches Frameworks and Insights */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                
                <div className="flex flex-col gap-5 relative z-10">
                  <div className="p-3 rounded-lg bg-[#14b8a6]/10 w-fit">
                    <outcome.icon className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <div>
                    {/* UPDATED: Added italic uppercase to title */}
                    <h3 className="text-xl font-bold mb-3 text-white tracking-tight italic uppercase">{outcome.title}</h3>
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
            &quot;Progress typically comes from identifying the smallest set of targeted interventions 
            required to materially change outcomes.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Outcomes;
