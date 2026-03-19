"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

const insights = [
  {
    category: "HAI", 
    title: "The Real Trust Gap",
    excerpt: "Trust is a constant mismatch between a human's mental model and a system's output. We identify where the Promise Gap creates shadow labor.",
    slug: "real-trust-gap"
  },
  {
    category: "AVS",
    title: "The Adoption Value System",
    excerpt: "Activity is not an achievement. Aligning technical tools with operational reality is where one finds true value.",
    slug: "adoption-value-system"
  },
  {
    category: "IGF",
    title: "Executive Readiness",
    excerpt: "Building an architecture that stays under your control so that your company can grow with confidence is a must.",
    slug: "executive-readiness"
  }
];

const Insights = () => {
  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <span className="text-[#14b8a6] font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">
            Strategic Intelligence
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter italic uppercase">
            Technical <span className="text-[#14b8a6]">Briefings</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link href={`/insights/${insight.slug}`}>
                <Card className="p-10 h-full bg-slate-900/10 border-slate-900 border-2 relative overflow-hidden group hover:border-[#14b8a6]/40 transition-all duration-500 cursor-pointer flex flex-col justify-between rounded-none shadow-2xl">
                  {/* Forensic Hover Line */}
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-[#14b8a6]">
                      <Activity className="h-4 w-4 group-hover:animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">
                        ID: {insight.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white tracking-tight italic uppercase group-hover:text-[#14b8a6] transition-colors leading-tight">
                      {insight.title}
                    </h3>
                    
                    <p className="text-slate-500 font-light leading-relaxed italic text-sm group-hover:text-slate-400 transition-colors">
                      {insight.excerpt}
                    </p>
                  </div>
                    
                  <div className="pt-10 mt-auto flex items-center text-[#14b8a6] font-black uppercase tracking-[0.2em] text-[10px] group-hover:gap-4 transition-all italic">
                    Open Forensic Briefing
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
