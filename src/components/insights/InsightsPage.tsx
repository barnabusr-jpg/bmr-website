"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Lock, ArrowUpRight, Terminal, ShieldAlert } from "lucide-react";

const BRIEFINGS = [
  {
    id: "CAS-772",
    date: "MAR 26, 2026",
    title: "Shadow Labor in LLM Deployment",
    summary: "Audit reveals 42% of human hours are spent &quot;correcting&quot; AI output without feedback loops. Systemic value leakage identified in Tier-1 logistics firm.",
    status: "UNCLASSIFIED",
    tag: "Operational Drift"
  },
  {
    id: "CAS-910",
    date: "MAR 12, 2026",
    title: "The Divergence Coefficient (Δ)",
    summary: "How technical optimism leads to architectural decay. Documentation of the 6-month window where AI utility drops below the human-cost floor.",
    status: "RESTRICTED",
    tag: "Architecture"
  }
];

const InsightsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 border-b border-slate-900 pb-12">
            <div className="border-l-4 border-red-600 pl-8">
              <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                Data_Repository // Access_Level_01
              </span>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter mt-2">
                Forensic <br /> <span className="text-slate-800">Briefings.</span>
              </h1>
            </div>
            
            <div className="flex flex-col items-end text-right font-mono text-slate-600">
              <div className="flex items-center gap-2 text-[10px] uppercase">
                <Terminal className="h-3 w-3" /> System Status: Online
              </div>
            </div>
          </div>

          {/* Briefings Grid */}
          <div className="grid gap-px bg-slate-900 border border-slate-900">
            {BRIEFINGS.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-slate-950 p-10 hover:bg-slate-900/30 transition-all cursor-pointer overflow-hidden"
              >
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center gap-4">
                      <span className="bg-red-600/10 text-red-600 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
                        {post.tag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                        {post.date} // {post.id}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter group-hover:text-red-600 transition-all leading-none mb-4">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-sm italic font-medium leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-12 w-12 border border-slate-800 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 transition-all">
                    <ArrowUpRight className="h-5 w-5 text-slate-600 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Encrypted Section */}
            <div className="bg-slate-950/50 p-12 flex flex-col items-center justify-center border-t border-slate-900 opacity-30">
              <Lock className="h-6 w-6 text-slate-800 mb-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-800 italic">
                Restricted_Case_Files // Auth_Required
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InsightsPage;
