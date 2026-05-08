"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { ArrowRight } from "lucide-react";

export default function HeroHome() {
  const router = useRouter();

  return (
    <section className="bg-[#020617] text-white pt-32 pb-16 md:pt-56 md:pb-32 w-full overflow-hidden text-left">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
        
        <div className="w-full lg:w-[55%] shrink-0">
          <div className="border-l-[6px] border-red-600 pl-6 md:pl-10 mb-10 md:mb-16">
            <p className="text-red-600 font-black text-[10px] md:text-xs tracking-[0.5em] mb-5 font-mono italic uppercase">NODE_ACCESS: BMR_SOLUTIONS_FORENSIC_UNIT</p>
            <h1 className="text-5xl sm:text-6xl md:text-[clamp(4rem,9vw,8rem)] font-black italic leading-[0.85] md:leading-[0.8] uppercase m-0 tracking-tighter italic">
              Recover <span className="text-red-600 italic">Wasted</span><br />
              <span className="text-[#1e293b] italic">AI Capital</span><br />
              <span className="text-red-600 italic">At Scale.</span>
            </h1>
          </div>
          
          <div className="border-t border-[#1e293b] pt-10 max-w-[550px]">
            <span className="text-red-600 font-black text-[11px] tracking-[0.4em] font-mono italic uppercase">Systemic Decay:</span>
            <p className="text-slate-400 text-xl md:text-2xl font-medium italic mt-4 uppercase leading-tight italic">
              Friction created when strategic intent and machine execution layers decouple.
            </p>
            <button 
              onClick={() => router.push('/pulse-check')} 
              className="mt-10 bg-red-600 text-white py-5 px-10 md:py-6 md:px-12 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-black transition-all flex items-center gap-4 italic"
            >
              INITIATE_DIAGNOSTIC <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[40%] mt-8 lg:mt-24 shrink-0">
          <div className="bg-[#0f172a]/40 border-2 border-[#1e293b] p-8 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-red-600" />
            <h2 className="text-3xl md:text-5xl font-black italic uppercase m-0 leading-none text-white tracking-tighter italic">The <span className="text-red-600 underline decoration-2 underline-offset-8 italic">Rework Tax</span></h2>
            <div className="border-l-2 border-red-600 pl-6 md:pl-8 mt-10">
              <p className="text-slate-400 italic text-lg md:text-xl leading-relaxed font-bold uppercase italic">
                BMR provides forensic tools to stop "Shadow Labor." The manual effort hidden inside automated systems.
              </p>
              <div className="mt-8 border-t border-[#1e293b] pt-8">
                <p className="text-red-600 font-black uppercase text-xl md:text-2xl italic tracking-tighter italic">YOU HAVE <span className="text-white italic">HIDDEN CAPACITY.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
