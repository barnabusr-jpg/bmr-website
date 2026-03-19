"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { ArrowRight, BarChart3, ShieldCheck, Users, Activity } from "lucide-react";

export default function StrategicAdvisoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      
      <main>
        {/* Hero Section for the Video */}
        <section className="pt-20 pb-12 px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight uppercase italic">
              Strategic <span className="text-[#14b8a6]">Advisory</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light italic">
              Bridging the Promise Gap through systemic AI architecture and high-fidelity governance.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-none overflow-hidden border border-slate-800 shadow-2xl">
            <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />
          </div>
        </section>

        {/* Advisory Pillars */}
        <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-800/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <BarChart3 className="h-10 w-10 text-[#14b8a6]" />
              <h3 className="text-xl font-bold text-white uppercase italic tracking-tight">Systemic Mapping</h3>
              <p className="text-slate-400 font-light">We identify structural leakage in AI implementations that prevent value realization.</p>
            </div>
            <div className="space-y-4">
              <ShieldCheck className="h-10 w-10 text-[#14b8a6]" />
              <h3 className="text-xl font-bold text-white uppercase italic tracking-tight">Trust Architecture</h3>
              <p className="text-slate-400 font-light">Designing the AVS and IGF layers to ensure AI systems remain responsible and resilient.</p>
            </div>
            <div className="space-y-4">
              <Users className="h-10 w-10 text-[#14b8a6]" />
              <h3 className="text-xl font-bold text-white uppercase italic tracking-tight">Executive Alignment</h3>
              <p className="text-slate-400 font-light">Bridging the gap between technical promise and boardroom expectations.</p>
            </div>
          </div>
        </section>

        {/* FINAL CONVERSION SECTION: CENTERED PULSE CHECK */}
        <section className="py-32 px-6 border-t border-slate-900 bg-[#020617]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-16 italic tracking-tighter uppercase text-white leading-none">
              Ready to <span className="text-[#14b8a6]">Close the Gap?</span>
            </h2>
            
            <div className="max-w-2xl mx-auto text-left">
              <Card className="p-12 bg-slate-950/40 border-2 border-slate-900 rounded-none relative overflow-hidden group hover:border-[#14b8a6]/20 transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500" />
                
                <Activity className="text-[#14b8a6] mb-8 h-12 w-12" />
                
                <h3 className="text-3xl font-black mb-4 italic uppercase text-white tracking-tight">
                  Pulse Check
                </h3>
                
                <p className="text-slate-400 mb-12 font-light leading-relaxed text-lg italic">
                  Ready for a forensic view? Our 12-question protocol identifies 
                  your primary friction points and defines your System Archetype.
                </p>
                
                <button 
                  onClick={() => router.push('/diagnostic')}
                  className="w-full bg-[#14b8a6] text-[#020617] px-8 py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all duration-500 shadow-2xl"
                >
                  Initialize Pulse Check <ArrowRight size={16} className="ml-3 inline" />
                </button>
              </Card>

              <div className="mt-12 text-center">
                <button 
                  onClick={() => router.push('/diagnostic')}
                  className="text-slate-600 font-black uppercase tracking-[0.4em] text-[9px] hover:text-[#14b8a6] transition-colors italic"
                >
                  Access the Operational Protocol // Auth Required
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
