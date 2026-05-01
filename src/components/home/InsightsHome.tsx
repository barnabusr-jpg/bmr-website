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
    excerpt: "Trust is a quantifiable mismatch between human mental models and system output. We identify where the promise gap creates shadow labor. Human employees must manually correct failed automated logic.",
    slug: "chatbot-liability"
  },
  {
    category: "AVS",
    title: "VALUE STREAM LEAKAGE",
    excerpt: "Activity is not achievement. Aligning technical tools with operational reality is the only way to stop systemic margin erosion. Most systems fail because they do not account for real world variables.",
    slug: "helpline-collapse"
  },
  {
    category: "IGF",
    title: "INSTITUTIONAL FIDELITY",
    excerpt: "Governance is not a checkbox. It is a reconstructible logic chain. You must harden your architecture to survive a regulatory forensic review. Documentation is the only defense against system decay.",
    slug: "algorithmic-shear"
  }
];

const InsightsHome = () => {
  return (
    <section style={{ borderTop: '1px solid #1e293b', paddingTop: '120px', paddingBottom: '120px', backgroundColor: '#020617' }}>
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-24 flex flex-col items-start text-left border-l-4 border-red-600 pl-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="h-5 w-5 text-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs italic">
              FORENSIC_INTELLIGENCE_BRIEFINGS // INDEX_V4
            </span>
          </div>
          <h2 className="text-7xl md:text-8xl font-black mb-8 text-white tracking-tighter italic uppercase leading-[0.85] text-left">
            FORENSIC <span className="text-slate-800">ANALYSIS</span>
          </h2>
          <p className="text-2xl text-slate-400 italic max-w-3xl leading-relaxed">
            Direct observation of the fractures where executive intent decouples from technical execution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {signalEntries.map((insight, index) => (
            <motion.div
              key={insight.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link href={`/briefings/${insight.slug}`} className="block h-full">
                <Card className="p-14 h-full bg-slate-950/40 border-slate-900 border-2 relative overflow-hidden group hover:border-red-600 transition-all duration-500 cursor-pointer flex flex-col justify-between rounded-none shadow-2xl">
                  {/* Decorative Progress Bar */}
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
                  
                  <div className="space-y-10 text-left">
                    <div className="flex items-center gap-4 text-red-600 text-left">
                      <Activity className="h-5 w-5 group-hover:animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-[0.4em] italic text-slate-600">
                        PROTOCOL: {insight.category}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl font-black text-white tracking-tighter italic uppercase group-hover:text-red-600 transition-colors text-left leading-none">
                      {insight.title}
                    </h3>
                    
                    <p style={{ fontSize: '1.4rem' }} className="text-slate-500 font-medium leading-relaxed italic border-l-2 border-slate-800 pl-8 text-left uppercase tracking-tight">
                      {insight.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-16 mt-auto flex items-center text-red-600 font-black uppercase tracking-[0.3em] text-xs italic text-left group-hover:gap-4 transition-all">
                    Access Forensic Briefing
                    <ArrowRight className="h-5 w-5 ml-3 transition-transform" />
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
