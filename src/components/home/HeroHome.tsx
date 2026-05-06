"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from "lucide-react";

export default function HeroHome() {
  const router = useRouter();

  return (
    <section className="bg-[#020617] text-white pt-32 pb-16 md:pt-56 md:pb-32 w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[55%] text-left shrink-0">
          <div className="border-l-[6px] border-red-600 pl-6 md:pl-10 mb-10 md:mb-16">
            <p className="text-red-600 font-black text-[10px] md:text-xs tracking-[0.4em] mb-5 font-mono">
              NODE_ACCESS: FORENSIC_ENVIRONMENT
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-[clamp(4rem,9vw,8rem)] font-black italic leading-[0.85] md:leading-[0.8] uppercase m-0 font-sans">
              The <span className="text-red-600">Promise Gap</span><br />
              <span className="text-slate-800">Where ROI Goes</span><br />
              <span className="text-red-600">To Die.</span>
            </h1>
          </div>
          
          <div className="border-t border-slate-900 pt-10 max-w-[550px]">
            <span className="text-red-600 font-black text-[10px] md:text-[11px] tracking-[0.4em] font-mono">LOGIC SHEAR:</span>
            <p className="text-slate-400 text-xl md:text-2xl font-medium italic mt-4 font-sans uppercase leading-tight">
              Friction created when human oversight and machine execution decouple.
            </p>
            <button 
              onClick={() => router.push('/pulse-check')} 
              className="mt-10 bg-red-600 text-white py-5 px-10 md:py-6 md:px-12 font-black uppercase tracking-[0.3em] text-[11px] md:text-xs hover:bg-white hover:text-black transition-all flex items-center gap-4"
            >
              INITIALIZE DIAGNOSTIC <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CTO BOX */}
        <div className="w-full lg:w-[40%] mt-8 lg:mt-24 shrink-0">
          <div className="bg-slate-900/20 border-2 border-slate-900 p-8 md:p-14 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-red-600" />
            <h2 className="text-4xl md:text-5xl font-black italic uppercase m-0 font-sans leading-none text-white">
              For <span className="text-red-600">CTOs / OPs</span>
            </h2>
            <div className="border-l-2 border-red-600 pl-6 md:pl-8 mt-10">
              <p className="text-slate-400 italic font-sans text-lg md:text-xl leading-relaxed">
                BMR provides forensic tools to harden logic chains. Uncertainty is a measurable liability.
              </p>
              <div className="mt-8 border-t border-slate-900 pt-8">
                <p className="text-red-600 font-black uppercase font-sans text-xl md:text-2xl">
                  YOU HAVE <span className="italic">SYSTEMIC ROT.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

