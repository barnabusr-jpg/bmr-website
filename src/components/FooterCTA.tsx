import React from 'react';
import Link from 'next/link'; // Added this import to fix the build error
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="py-32 bg-[#020617] border-t border-slate-900 relative overflow-hidden">
      {/* Subtle bottom-glow to give the section depth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#14b8a6]/20 to-transparent" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          Start a <span className="text-[#14b8a6]">Conversation</span>
        </h2>
        
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto font-light text-xl leading-relaxed">
          The first step in closing the Promise Gap™ is making your system behavior visible. 
          Connect with a strategist to discuss your diagnostic results.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button 
            className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-16 px-12 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.15)] group"
            onClick={() => window.location.href = 'mailto:hello@bmradvisory.co'}
          >
            Contact a Strategist 
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          {/* Fixed: Replaced <a> with <Link> to satisfy ESLint build requirements */}
          <Link 
            href="/field-guide" 
            className="text-slate-500 hover:text-white text-sm font-medium uppercase tracking-widest transition-colors py-4 px-6"
          >
            Explore the Field Guide
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
