"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Briefings() {
  const articles = [
    { slug: "logic-decay-2026", title: "Forensic Analysis of Logic Decay", date: "April 01, 2026" },
    { slug: "shadow-ai-emergence", title: "The Emergence of Shadow AI Shear", date: "March 15, 2026" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main className="pt-48 px-6 container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-black uppercase italic tracking-tighter mb-12"
        >
          Forensic <span className="text-red-600">Briefings</span>
        </motion.h1>

        <div className="grid gap-4 max-w-5xl">
          {articles.map((a) => (
            <Link 
              key={a.slug} 
              href={`/briefings/${a.slug}`} 
              className="group relative p-8 border border-slate-900 bg-slate-950/50 hover:border-red-600 transition-all flex justify-between items-center overflow-hidden"
            >
              {/* Hover Accent */}
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500" />
              
              <div>
                <span className="text-red-600 font-mono text-[10px] uppercase mb-2 block font-black tracking-widest opacity-70">
                  {a.date}
                </span>
                <h2 className="text-2xl md:text-4xl font-black uppercase italic text-slate-500 group-hover:text-white transition-colors">
                  {a.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-600 font-black italic text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW DOSSIER
                </span>
                <ArrowRight className="text-red-600 group-hover:translate-x-2 transition-transform" size={20} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
