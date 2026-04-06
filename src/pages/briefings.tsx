"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Activity } from "lucide-react";

export default function Briefings() {
  const [mounted, setMounted] = useState(false);
  const [activeDossier, setActiveDossier] = useState<string | null>(null);

  const articles = [
    { 
      slug: "logic-decay-2026", 
      title: "Forensic Analysis of Logic Decay", 
      date: "April 01, 2026",
      summary: "QUANTIFYING THE RECURSIVE EROSION OF AUTONOMOUS LOGIC STACKS. DETECTED SIGNAL: 14% SYSTEMIC DRIFT." 
    },
    { 
      slug: "shadow-ai-emergence", 
      title: "The Emergence of Shadow AI Shear", 
      date: "March 15, 2026",
      summary: "IDENTIFYING UNDOCUMENTED MODEL INSTANCES WITHIN CORPORATE FIREWALLS. RISK_LEVEL: CRITICAL."
    }
  ];

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600 selection:text-white">
      <Header />
      
      <main className="pt-48 px-6 container mx-auto pb-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="mb-16 border-l-4 border-red-600 pl-8"
        >
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
            Forensic <span className="text-slate-500">Briefings</span>
          </h1>
          <p className="font-mono text-[10px] text-red-600 uppercase tracking-[0.4em] mt-4 font-black">
            BMR_SOLUTIONS // INTELLIGENCE_FEED_ACTIVE
          </p>
        </motion.div>

        <div className="grid gap-4 max-w-5xl">
          {articles.map((a, index) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveDossier(a.slug)}
              onMouseLeave={() => setActiveDossier(null)}
              className="relative p-8 border border-slate-900 bg-slate-950/50 hover:border-red-600 transition-all group cursor-crosshair overflow-hidden"
            >
              {/* Trace Accent */}
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-red-600 font-mono text-[10px] uppercase font-black tracking-widest block opacity-70 group-hover:opacity-100 transition-opacity">
                    {a.date}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black uppercase italic text-slate-500 group-hover:text-white transition-colors duration-300">
                    {a.title}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                   <div className="hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-red-600 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                   </div>
                   <span className="text-red-600 font-black italic text-xs tracking-widest group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                      VIEW DOSSIER <ArrowRight size={14} />
                   </span>
                </div>
              </div>

              {/* Forensic Summary Reveal */}
              <AnimatePresence>
                {activeDossier === a.slug && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 pt-6 border-t border-slate-900"
                  >
                    <p className="text-slate-500 font-mono text-[11px] uppercase leading-relaxed tracking-tight max-w-2xl">
                      {a.summary}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Forensic Footer */}
      <div className="fixed bottom-8 left-8 flex items-center gap-3 opacity-20 group">
        <Activity size={12} className="text-red-600 animate-pulse" />
        <span className="text-[9px] font-mono uppercase tracking-[0.3em]">System_Status: Stable</span>
      </div>
    </div>
  );
}
