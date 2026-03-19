"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialVideo from "@/components/CommercialVideo";
import Hero from "@/components/home/HeroHome";
import ValueBullets from "@/components/home/ValueBulletsHome";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import DiagnosticFrameworks from "@/components/home/DiagnosticFrameworks"; 
import Outcomes from "@/components/home/OutcomesHome";
import ComparisonGrid from "@/components/home/ComparisonGrid";
import Insights from "@/components/home/InsightsHome";
import { Card } from "@/components/ui/card";
import { Activity, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main>
        <Hero />
        <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ValueBullets />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ServicesPreview />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <DiagnosticFrameworks /> 
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Outcomes />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ComparisonGrid />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Insights />
        
        {/* FINAL CONVERSION SECTION: CENTERED PULSE CHECK (REPLACED FIELD GUIDE) */}
        <section className="py-32 px-6 border-t border-slate-900 bg-[#020617]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-16 italic tracking-tighter uppercase text-white leading-none">
              Ready to <span className="text-[#14b8a6]">Close the Gap?</span>
            </h2>
            
            <div className="max-w-2xl mx-auto text-left">
              <Card className="p-12 bg-slate-950/40 border-2 border-slate-900 rounded-none relative overflow-hidden group hover:border-[#14b8a6]/20 transition-all duration-500 shadow-2xl">
                {/* Visual Accent Line */}
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

              {/* Protocol Footer Link */}
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
};

export default Index;
