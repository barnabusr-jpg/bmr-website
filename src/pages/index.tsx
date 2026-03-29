"use client";

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";
import Hero from "@/components/home/HeroHome";
import Sensors from "@/components/Sensors";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import Outcomes from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import { Activity, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const Index = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-500/30">
      <Head>
        <title>BMR | AI FORENSIC & HARDENING</title>
      </Head>
      <Header />
      
      <main>
        {/* --- Phase 1: Authentication & Hook --- */}
        <Hero />
        
        {/* --- Phase 2: Evidence & Sensory Data --- */}
        <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />
        <Sensors />
        
        {/* --- Phase 3: Capability Preview --- */}
        <ServicesPreview />
        <Outcomes />
        
        {/* --- Phase 4: Competitive Analysis --- */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ComparisonGrid />

        {/* --- Phase 5: The Tactical CTA --- */}
        <section className="py-32 px-6 border-t border-slate-900 bg-[#020617]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-12 italic tracking-tighter uppercase text-white leading-none">
              READY TO <br /><span className="text-red-600">CLOSE THE GAP?</span>
            </h2>

            <div className="max-w-2xl mx-auto text-left">
              <div className="p-10 bg-red-950/5 border-2 border-red-900/20 hover:border-red-600/40 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
                
                <div>
                  <Activity className="text-red-600 mb-6 h-10 w-10 group-hover:animate-pulse" />
                  <h3 className="text-3xl font-black mb-4 italic uppercase text-white tracking-tight">
                    SYSTEM DIAGNOSTIC
                  </h3>
                  <p className="text-slate-400 mb-10 font-medium leading-relaxed text-sm italic uppercase tracking-tight">
                    Our 12-question pulse check identifies your primary friction points and defines your System Archetype. Secure your operational integrity now.
                  </p>
                </div>
                
                <button 
                  onClick={() => router.push('/pulse-check/assessment')}
                  className="w-full inline-flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-7 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-red-600 transition-all shadow-2xl"
                >
                  INITIALIZE FORENSIC REVIEW <ArrowRight size={14} />
                </button>
              </div>
              
              <p className="text-center mt-12 text-[9px] text-slate-700 font-black uppercase tracking-[0.5em] italic">
                AUTHORIZED SESSION: NODE-SEC-04 // BMR FORENSIC V3
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
