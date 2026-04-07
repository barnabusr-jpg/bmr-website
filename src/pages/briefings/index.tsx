"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Briefings() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🛡️ UPDATED: NEDA removed, Salesforce integrated to match [slug].tsx CONTENT
  const articles = [
    { 
      slug: "chatbot-liability", 
      title: "The Air Canada Precedent", 
      date: "February 20, 2024" 
    },
    { 
      slug: "salesforce-failure", 
      title: "Salesforce AI Data Exfiltration", 
      date: "March 15, 2024" 
    },
    { 
      slug: "algorithmic-shear", 
      title: "The Zillow iBuying Autopsy", 
      date: "November 01, 2021" 
    }
  ];

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30">
      <Header />
      <main className="pt-48 px-6 container mx-auto pb-32">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter mb-12 leading-none"
        >
          Forensic <span className="text-red-600">Briefings</span>
        </motion.h1>

        <div className="grid gap-4 max-w-5xl">
          {articles.map((a, index) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/briefings/${a.slug}`} 
                className="group relative p-8 border border-slate-900 bg-slate-950/50 hover:border-red-600 transition-all flex justify-between items-center overflow-hidden block"
              >
                {/* Left Trace Accent */}
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500" />
                
                <div>
                  <span className="text-red-600 font-mono text-[10px] uppercase mb-2 block font-black tracking-widest opacity-70">
                    {a.date}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black uppercase italic text-slate-500 group-hover:text-white transition-colors duration-300">
                    {a.title}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-red-600 font-black italic text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    VIEW DOSSIER
                  </span>
                  <ArrowRight className="text-red-600 group-hover:translate-x-2 transition-transform" size={20} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      
      {/* 📡 Integrating the ticker here for atmospheric consistency */}
      <LogicLeakTicker />
    </div>
  );
}
