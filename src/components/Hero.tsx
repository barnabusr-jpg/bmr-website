"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [delta, setDelta] = useState(0.342);

  // Simulated Delta Drift Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setDelta(prev => parseFloat((prev + (Math.random() * 0.02 - 0.01)).toFixed(3)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 bg-slate-950 overflow-hidden">
      {/* Forensic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          
          {/* Status Indicator */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8 bg-slate-900/50 border border-slate-800 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
                Systemic Drift Detected
              </span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              Current Δ: {delta}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white mb-8"
          >
            Hardening <br />
            <span className="text-slate-700">The </span> 
            <span className="text-red-600">Logic Chain.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-12 font-medium leading-tight italic"
          >
            BMR Forensics identifies the &quot;Value Leakage&quot; in your AI systems. We stop the drift between strategic intent and operational reality.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/pulse-check"
              className="group flex items-center justify-center gap-3 bg-red-600 text-white px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-red-600 transition-all shadow-xl shadow-red-900/20"
            >
              <Activity className="h-4 w-4 group-hover:animate-pulse" />
              Initialize Probe
            </Link>
            
            <Link 
              href="/services"
              className="flex items-center justify-center gap-3 border-2 border-slate-800 text-white px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-800 transition-all"
            >
              <ShieldAlert className="h-4 w-4 text-red-600" />
              View Protocols
            </Link>
          </motion.div>

          {/* Forensic Metadata Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-24 w-full grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-900"
          >
            {[
              { label: "Audit Fidelity", value: "99.8%" },
              { label: "Override Reduction", value: "40.2%" },
              { label: "Logic Latency", value: "<12ms" },
              { label: "Compliance Status", value: "Hardened" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-1">{stat.label}</p>
                <p className="text-sm font-mono text-slate-300 uppercase">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
