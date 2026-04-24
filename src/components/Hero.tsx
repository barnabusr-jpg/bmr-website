"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ShieldAlert, Activity, ArrowRight } from "lucide-react"; 
import Link from "next/link";

const Hero = () => {
  const [delta, setDelta] = useState(0.342);

  useEffect(() => {
    const interval = setInterval(() => {
      setDelta(prev => parseFloat((prev + (Math.random() * 0.02 - 0.01)).toFixed(3)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-48 pb-32 px-6 bg-[#020617] overflow-hidden min-h-screen flex flex-col justify-center">
      {/* BACKGROUND WATERMARK */}
      <div className="absolute top-1/4 -left-10 opacity-[0.03] pointer-events-none select-none hidden md:block">
        <h2 className="text-[20vw] font-black leading-none uppercase italic tracking-tighter">
          FIDUCIARY
        </h2>
      </div>

      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          
          {/* SYSTEM STATUS BAR */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-12 bg-slate-900/50 border border-slate-800 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 font-mono">
                Systemic Drift Detected
              </span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              Current Δ: {delta}
            </span>
          </motion.div>

          {/* THE PROMISE GAP™ MANDATE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-[8vw] font-black uppercase italic tracking-tighter leading-[0.8] text-white">
              THE <span className="text-red-600 underline decoration-red-600/20">PROMISE</span>
            </h1>
            <h1 className="text-6xl md:text-[8vw] font-black uppercase italic tracking-tighter leading-[0.8] text-white">
              GAP™ IS WHERE
            </h1>
            <h1 className="text-6xl md:text-[8vw] font-black uppercase italic tracking-tighter leading-[0.8] text-red-600">
              ROI GOES TO DIE.
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-16"
          >
            <div className="space-y-6">
              <p className="text-xl md:text-3xl font-mono text-slate-400 uppercase tracking-widest leading-tight italic font-bold">
                We do not give you new promises. <br className="hidden md:block" />
                We provide the forensic tools to <br className="hidden md:block" />
                make the old ones work.
              </p>
              <p className="text-xs md:text-sm font-mono text-slate-500 uppercase tracking-[0.3em] leading-relaxed border-l-2 border-red-600 pl-6 max-w-lg font-bold">
                BMR Solutions provides the forensic evidence required to <span className="text-white">identify</span>, <span className="text-white">quantify</span>, and <span className="text-white">bridge</span> the promise gap between human intent and AI execution.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center">
              <Link 
                href="/pulse-check"
                className="group relative bg-white text-black px-12 py-10 font-black uppercase italic text-2xl md:text-3xl hover:bg-red-600 hover:text-white transition-all shadow-[15px_15px_0px_0px_rgba(220,38,38,1)] active:shadow-none active:translate-x-[5px] active:translate-y-[5px] w-full md:w-auto text-center"
              >
                <div className="flex items-center justify-center gap-4">
                    INITIALIZE_AUDIT
                    <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* STAT GRID */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-900"
          >
            {[
              { label: "Audit Fidelity", value: "99.8%" },
              { label: "Override Reduction", value: "40.2%" },
              { label: "Logic Latency", value: "<12ms" },
              { label: "Compliance Status", value: "Hardened" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 mb-2">{stat.label}</p>
                <p className="text-lg font-mono text-slate-300 uppercase italic">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
