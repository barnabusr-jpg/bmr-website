import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import DiagnosticFrameworks from "@/components/home/DiagnosticFrameworks"; 
import Outcomes from "@/components/home/OutcomesHome";
import FooterCTA from "@/components/FooterCTA"; // Added for conversion consistency

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        {/* Hero Section - Standardized with Architecture/Services pages */}
        <section className="max-w-5xl mx-auto px-6 mb-24">
          <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            The Strategic Baseline
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 italic uppercase tracking-tighter leading-none text-white">
            Our <span className="text-slate-500 text-nowrap">Approach</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-light italic">
            {"A systemic framework for bridging the Promise Gap by addressing manual friction and system disconnects at the architectural level."}
          </p>
        </section>
        
        {/* Core Sections */}
        <div className="space-y-0">
          <ServicesPreview />
          
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-20" />
          </div>
          
          <DiagnosticFrameworks />
          
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-20" />
          </div>
          
          <Outcomes />
        </div>

        {/* Closing the loop */}
        <FooterCTA />
      </main>

      <Footer />
    </div>
  );
}
