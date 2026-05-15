"use client";
import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Activity, Target, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black relative flex flex-col">
      <Header />
      
      <main className="flex-grow pt-44 pb-24 px-6 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT COLUMN: THE HOOK --- */}
          <div className="lg:col-span-7 space-y-12">
            <div className="border-l-8 border-red-600 pl-10">
              <span className="text-red-600 font-mono text-[11px] font-black tracking-[0.4em] uppercase">
                NODE_ACCESS: BMR_SOLUTIONS_FORENSIC_UNIT
              </span>
              <h1 className="text-7xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.8] mt-6 italic">
                RECOVER<br />
                <span className="text-red-600">WASTED</span><br />
                AI CAPITAL<br />
                AT SCALE.
              </h1>
            </div>

            <p className="text-xl md:text-3xl text-white max-w-2xl leading-tight font-black italic normal-case">
              We identify hidden risks in autonomous systems before they manifest as legal disasters. Built from over twenty years of leadership, including a decade at Microsoft protecting secure government networks.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
              <button 
                onClick={() => router.push('/pulse-check')} 
                className="group relative w-full md:w-auto bg-red-600 text-white px-16 py-8 text-2xl font-black italic tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl border-2 border-red-600"
              >
                EXECUTE_STRATEGY
                <Target className="absolute -top-4 -right-4 text-white group-hover:text-red-600 transition-all" size={32} />
              </button>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] tracking-[0.4em] font-black italic uppercase">
                  <Activity size={14} className="animate-pulse text-red-600" />
                  12 QUERIES // ~3 MINUTE COMPLETION
                </div>
                <p className="text-red-600 font-mono text-[9px] tracking-[0.2em] font-black italic uppercase">
                  IMMEDIATE_FORENSIC_VERDICT_PROVIDED
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: THE REWORK TAX --- */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 border-2 border-slate-900 p-12 shadow-2xl relative group">
              <div className="absolute -top-1 -right-1 w-24 h-24 border-t-4 border-r-4 border-red-600 opacity-20 group-hover:opacity-100 transition-all" />
              
              <h2 className="text-6xl font-black text-red-600 italic tracking-tighter leading-none mb-10">
                THE<br />REWORK<br />TAX.
              </h2>

              <div className="space-y-8 border-l-2 border-red-600/30 pl-8">
                <p className="text-slate-400 text-lg leading-relaxed font-black italic normal-case">
                  BMR provides forensic tools to terminate "shadow labor." We isolate the manual effort hidden inside automated systems.
                </p>
                
                <div className="pt-4">
                  <span className="text-white font-black text-2xl italic uppercase tracking-tight">
                    YOU HAVE <span className="text-red-600 underline decoration-4 underline-offset-8">HIDDEN CAPACITY.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* 🛠️ GHOST ADMIN SHORTCUT: INCONSPICUOUS ENTRY POINT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        onClick={() => router.push('/admin/dashboard')} 
        className="fixed bottom-10 left-10 z-[10000] cursor-crosshair p-3 group transition-all"
      >
        <Shield size={18} className="text-slate-800 group-hover:text-red-600 transition-colors" />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[7px] font-mono py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border-l-2 border-red-600 pointer-events-none">
          SYSTEM_ACCESS_REQUIRED // AUTH_NODE_01
        </span>
      </motion.div>
    </div>
  );
}
