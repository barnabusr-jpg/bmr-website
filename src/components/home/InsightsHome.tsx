"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

const signalEntries = [
  {
    category: "HAI", 
    title: "The Human Trust Gap",
    excerpt: "Trust is a quantifiable mismatch between human mental models and system output. We identify where the 'Promise Gap' creates shadow labor.",
    slug: "real-trust-gap"
  },
  {
    category: "AVS",
    title: "Value Stream Leakage",
    excerpt: "Activity is not achievement. Aligning technical tools with operational reality is the only way to stop systemic margin erosion.",
    slug: "adoption-value-system"
  },
  {
    category: "IGF",
    title: "Institutional Fidelity",
    excerpt: "Governance is not a checkbox; it is a reconstructible logic chain. Harden your architecture to survive regulatory forensic review.",
    slug: "executive-readiness"
  }
];

const InsightsHome = () => {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-4 w-4 text-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] italic">
              Intelligence Briefings
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter italic uppercase leading-none">
            Forensic <span className="text-slate-500">Analysis</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {signalEntries.map((insight, index) => (
            <motion.div
              key={insight.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link href={`/insights/${insight.slug}`}>
                <Card className="p-10 h-full bg-slate-900/20 border-slate-900 border-2 relative overflow-hidden group hover:border-red-600/40 transition-all duration-500 cursor-pointer flex flex-col justify-between rounded-none shadow-2xl">
                  {/* Hover Forensic Highlight */}
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-red-600">
                      <Activity className="h-4 w-4 group-hover:animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-slate-500">
                        PROTOCOL: {insight.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight italic uppercase group-hover:text-red-600 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed italic text-sm border-l border-slate-800 pl-4">
                      {insight.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-10 mt-auto flex items-center text-red-600 font-black uppercase tracking-[0.2em] text-[10px] italic">
                    Access Forensic Briefing
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

export default InsightsHome;
