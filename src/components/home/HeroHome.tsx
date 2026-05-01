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
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 px-6 overflow-hidden bg-[#020617]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: BRAND & GLOSSARY */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 text-left">
            <div className="space-y-6 border-l-2 border-red-600/20 pl-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-red-600" />
                <p className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase italic leading-none">{subheadline}</p>
              </div>
              <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] text-white tracking-tighter italic uppercase text-left">
                The <span className="text-red-600">Promise Gap</span><br />
                <span className="text-slate-800">Where ROI Goes</span><br />
                <span className="text-red-600">To Die.</span>
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

            <button onClick={() => router.push('/pulse-check')} className="bg-red-600 text-white px-10 py-6 font-black uppercase italic tracking-widest text-xs flex items-center gap-4 hover:bg-white hover:text-black transition-all">
              Initialize Diagnostic <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* RIGHT: PERSONA BOX */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="lg:mt-32 w-full">
            <Card className="p-10 md:p-14 border-2 bg-slate-950/50 border-slate-900 rounded-none relative text-left">
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-600/20" />
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white leading-none">For <span className="text-red-600">CTOs / OPs / Tech Mgrs</span></h2>
              <p className="text-slate-400 font-bold italic text-lg uppercase mt-4 tracking-tight">Uncertainty is a measurable liability.</p>
              <div className="pl-6 border-l-2 border-red-600/40 mt-10 space-y-8">
                <p className="text-sm text-slate-400 italic leading-relaxed">BMR provides forensic tools to harden logic chains.</p>
                <p className="text-sm text-slate-400 italic border-t border-slate-900 pt-8 leading-relaxed font-bold uppercase italic">You have <span className="text-red-600">Systemic Rot.</span></p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
