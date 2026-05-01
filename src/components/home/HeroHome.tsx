"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const HeroHome = () => {
  const router = useRouter();
  const subheadline = "NODE_ACCESS: FORENSIC_ENVIRONMENT // STRUCTURAL_AUDIT_V3";

  return (
    <section className="relative min-h-[90vh] flex items-center py-32 px-6 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/grid.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: HERO + GLOSSARY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 text-left"
          >
            <div className="space-y-6 text-left border-l-2 border-red-600/20 pl-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-red-600" />
                <p className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase italic">
                  {subheadline}
                </p>
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] text-white tracking-tighter italic uppercase">
                The <span className="text-red-600 font-black">Promise Gap<span className="text-[20px] lowercase font-mono align-top ml-1 opacity-20 text-slate-500">tm</span></span>
                <span className="text-slate-800 block mt-2">Where ROI Goes</span>
                <span className="text-red-600 block font-black">To Die.</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-slate-900 pt-10 max-w-lg">
               <div>
                  <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Logic Shear:</span>
                  <p className="text-[12px] text-slate-500 uppercase tracking-widest leading-relaxed mt-2 italic font-bold">Friction created when human oversight and machine execution decouple.</p>
               </div>
               <div>
                  <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Capital Decay:</span>
                  <p className="text-[12px] text-slate-500 uppercase tracking-widest leading-relaxed mt-2 italic font-bold">The erosion of ROI caused by unmonitored system drift.</p>
               </div>
            </div>

            <button 
              onClick={() => router.push('/pulse-check')}
              className="group bg-red-600 hover:bg-white text-white hover:text-red-600 font-black h-16 px-10 uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 transition-all duration-500 shadow-xl shadow-red-900/20"
            >
              <Activity className="h-4 w-4 group-hover:animate-pulse" />
              Initialize Diagnostic <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* RIGHT COLUMN: FOR CTOs BOX */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:mt-24 w-full"
          >
            <Card className="p-10 md:p-14 border-2 shadow-2xl bg-slate-950/50 backdrop-blur-md border-slate-900 rounded-none relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-600/20" />
              <div className="space-y-4 leading-none">
                 <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">
                   FOR <span className="text-red-600 font-black">CTOs / OPs / Tech Mgrs</span>
                 </h2>
                 <p className="text-slate-400 font-bold italic text-lg uppercase tracking-tight leading-none mt-2">Uncertainty is a measurable liability.</p>
               </div>
               <div className="pl-6 border-l-2 border-red-600/40 mt-10 space-y-8">
                 <p className="text-sm md:text-base text-slate-400 italic leading-relaxed font-medium">BMR provides the forensic tools to harden logic chains before architectural collapse becomes inevitable.</p>
                 <div className="pt-8 border-t border-slate-900 font-medium">
                   <p className="text-sm md:text-base text-slate-400 leading-relaxed italic">When human intent and machine execution decouple, you do not have an "optimization" problem. You have <span className="text-red-600 font-black uppercase italic">Systemic Rot.</span></p>
                 </div>
               </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
