import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/10 text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-8">
              <Mail className="h-3 w-3" /> Synthesis Dispatched
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Observation <span className="text-[#14b8a6]">Complete.</span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12">
              Your preliminary diagnostic signals have been delivered to your inbox. 
              Our team is now mapping these results against the BMR Promise Gap™ framework.
            </p>
            
            <div className="p-10 border-2 border-slate-800 bg-slate-900/20 rounded-2xl relative overflow-hidden group text-left">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
              <h3 className="text-2xl font-bold mb-4 text-white">Review your health picture.</h3>
              <p className="text-slate-400 mb-8 font-light">
                Every Promise Gap is unique. Book a 15-minute briefing with a BMR strategist to interpret 
                your pillar scores and identify immediate de-risking opportunities.
              </p>
              <Button 
                className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-14 px-8 w-full md:w-auto"
                onClick={() => window.open('https://calendly.com/bmr-advisory', '_blank')}
              >
                Schedule Briefing <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
