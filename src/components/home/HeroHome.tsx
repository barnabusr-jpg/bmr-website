"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { Activity, Target } from "lucide-react";

export default function HeroHome() {
  const router = useRouter();

  return (
    <section className="bg-[#020617] text-white pt-32 pb-16 md:pt-56 md:pb-32 w-full overflow-hidden text-left italic font-black uppercase">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 italic">
        
        <div className="w-full lg:w-[60%] shrink-0 italic">
          <div className="border-l-[6px] border-red-600 pl-6 md:pl-10 mb-10 md:mb-16 italic">
            <p className="text-red-600 font-mono text-[10px] md:text-xs tracking-[0.5em] mb-5 font-black italic">MISSION_STATUS: BMR_SOLUTIONS_ACTIVE</p>
            <h1 className="text-5xl sm:text-6xl md:text-[clamp(4rem,8.5vw,7.5rem)] font-black italic leading-[0.85] md:leading-[0.8] uppercase m-0 tracking-tighter italic">
              STOP THE <br /> <span className="text-red-600 italic">LOGIC</span><br />
              <span className="text-red-600 italic">FRACTURE.</span>
            </h1>
          </div>
          
          <div className="border-t border-slate-900 pt-10 max-w-[600px] italic">
            <p className="text-white text-xl md:text-3xl font-black italic mt-4 normal-case leading-tight italic">
              We find the hidden risks in your AI systems before they become legal disasters. Built from twenty years of leadership at Microsoft protecting secure government networks.
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12 italic">
              <button 
                onClick={() => router.push('/pulse-check')} 
                className="bg-red-600 text-white py-5 px-10 md:py-8 md:px-16 font-black uppercase tracking-[0.3em] text-[16px] hover:bg-white hover:text-red-600 transition-all flex items-center gap-4 shadow-2xl italic border-2 border-red-600"
              >
                START_PULSE_CHECK <Target size={24} />
              </button>

              <div className="flex flex-col italic">
                <div className="flex items-center gap-3 text-white font-black text-[12px] tracking-widest italic">
                  <Activity size={18} className="text-red-600 animate-pulse italic" />
                  12 QUESTIONS // ~3 MINUTE COMPLETION
                </div>
                <p className="text-slate-500 text-[9px] tracking-[0.3em] mt-2 font-black italic">
                  IMMEDIATE FORENSIC INDICTMENT PROVIDED
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%] mt-8 lg:mt-24 shrink-0 italic">
          <div className="bg-slate-950/50 border-2 border-slate-900 p-8 md:p-12 relative overflow-hidden shadow-2xl italic">
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-red-600 italic" />
            <h2 className="text-3xl md:text-5xl font-black italic uppercase m-0 leading-none text-white tracking-tighter italic">THE <span className="text-red-600 italic">REWORK TAX.</span></h2>
            <div className="border-l-2 border-red-600 pl-6 md:pl-8 mt-10 italic">
              <p className="text-slate-400 italic text-lg md:text-xl font-bold normal-case italic leading-snug">
                Unwatched AI makes mistakes that force humans to step back in. This creates a hidden tax on your time and money.
              </p>
              <div className="mt-8 border-t border-slate-900 pt-8 italic">
                <p className="text-red-600 font-black uppercase text-xl md:text-2xl italic tracking-tighter italic">RECOVER <span className="text-white italic">HIDDEN CAPACITY.</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
