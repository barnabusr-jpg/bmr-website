import React from 'react';
import { motion } from "framer-motion";
import Header from "@/components/Header";
import FooterCTA from "@/components/home/FooterCTAHome";
import { Button } from "@/components/ui/button";

const PromiseGapPage = () => {
  // Logic to glide to the FooterCTA at the bottom of the page
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white selection:bg-[#0D9488]/30">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          
          {/* HERO SECTION: Fluid Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
              The <span className="text-[#0D9488]">Promise Gap™</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl leading-relaxed font-light">
              The friction between strategic intent and operational reality. Where leadership 
              vision meets the gravity of existing systems.
            </p>
          </motion.div>

          {/* DIAGRAMMATIC LAYOUT: Stacks on Mobile */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-32 items-center">
            <div className="space-y-8 text-lg text-slate-300 leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">The Invisibility Problem</h3>
                <p>
                  Most leaders cannot see the Promise Gap™ because they are looking at 
                  lagging indicators—financials and quarterly reports.
                </p>
                <p>
                  We look at <strong>system behavior</strong>. We measure the drag 
                  created when your processes contradict your culture, causing 
                  strategic drift and high-performer burnout.
                </p>
              </div>

              <Button 
                onClick={scrollToContact}
                className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold h-14 px-10 rounded-xl transition-all"
              >
                Audit Your Gap
              </Button>
            </div>
            
            <div className="relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0D9488] to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative border border-slate-800 rounded-3xl p-10 bg-slate-900/40 backdrop-blur-xl">
                <div className="space-y-10">
                  <div className="border-l-4 border-[#0D9488] pl-6 py-2">
                    <h4 className="text-white text-xl font-bold mb-1">Strategic Intent</h4>
                    <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">The Market Promise</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="h-20 w-[2px] bg-gradient-to-b from-[#0D9488] via-red-500 to-red-600"></div>
                  </div>

                  <div className="border-l-4 border-red-600 pl-6 py-2">
                    <h4 className="text-white text-xl font-bold mb-1">System Reality</h4>
                    <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Operational Friction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY VALUE PROP */}
          <div className="border-t border-slate-900 pt-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">How we close it.</h2>
            <div className="grid md:grid-cols-3 gap-8 text-slate-400">
              <div className="p-8 border border-slate-900 rounded-2xl hover:border-slate-800 transition-colors">
                <h4 className="text-[#0D9488] font-bold mb-4 uppercase text-xs tracking-widest">Step 01</h4>
                <p className="text-white text-lg mb-2">Exposure</p>
                <p className="text-sm">Mapping the hidden friction points within your decision-making loops.</p>
              </div>
              <div className="p-8 border border-slate-900 rounded-2xl hover:border-slate-800 transition-colors">
                <h4 className="text-[#0D9488] font-bold mb-4 uppercase text-xs tracking-widest">Step 02</h4>
                <p className="text-white text-lg mb-2">Alignment</p>
                <p className="text-sm">Re-coding systems to reward the behaviors that fulfill the promise.</p>
              </div>
              <div className="p-8 border border-slate-900 rounded-2xl hover:border-slate-800 transition-colors">
                <h4 className="text-[#0D9488] font-bold mb-4 uppercase text-xs tracking-widest">Step 03</h4>
                <p className="text-white text-lg mb-2">Integrity</p>
                <p className="text-sm">Achieving a state where "What we say" is exactly "What we do."</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* The Global Contact Form - The Target of scrollToContact */}
      <FooterCTA />
    </div>
  );
};

export default PromiseGapPage;
