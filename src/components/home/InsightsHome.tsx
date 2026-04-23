"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

const signalEntries = [
  {
    category: "HAI", 
    title: "THE HUMAN TRUST GAP",
    excerpt: "Trust is a quantifiable mismatch between human mental models and system output. We identify where the promise gap creates shadow labor. Human employees must manually correct failed automated logic. This creates a hidden operational cost.",
    slug: "chatbot-liability"
  },
  {
    category: "AVS",
    title: "VALUE STREAM LEAKAGE",
    excerpt: "Activity is not achievement. Aligning technical tools with operational reality is the only way to stop systemic margin erosion. Most systems fail because they do not account for real world variables. This results in invisible profit loss.",
    slug: "helpline-collapse"
  },
  {
    category: "IGF",
    title: "INSTITUTIONAL FIDELITY",
    excerpt: "Governance is not a checkbox. It is a reconstructible logic chain. You must harden your architecture to survive a regulatory forensic review. Documentation is the only defense against system decay. We ensure your records are audit ready.",
    slug: "algorithmic-shear"
  }
];

const InsightsHome = () => {
  return (
    <section className="py-24 px-0 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-20 flex flex-col items-start text-left border-l-2 border-slate-900 pl-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-4 w-4 text-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] italic">
              FORENSIC_INTELLIGENCE_BRIEFINGS
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter italic uppercase leading-none text-left">
            FORENSIC <span className="text-slate-800">ANALYSIS</span>
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
              <Link href={`/briefings/${insight.slug}`}>
                <Card className="p-10 h-full bg-slate-900/10 border-slate-900 border-2 relative overflow-hidden group hover:border-red-600/40 transition-all duration-500 cursor-pointer flex flex-col justify-between rounded-none shadow-2xl">
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
                  
                  <div className="space-y-6 text-left">
                    <div className="flex items-center gap-3 text-red-600 text-left">
                      <Activity className="h-4 w-4 group-hover:animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-slate-600">
                        PROTOCOL: {insight.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tighter italic uppercase group-hover:text-red-600 transition-colors text-left leading-none">
                      {insight.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed italic text-xs border-l border-slate-800 pl-4 text-left uppercase tracking-tight">
                      {insight.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-10 mt-auto flex items-center text-red-600 font-black uppercase tracking-[0.2em] text-[10px] italic text-left">
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
