import React from 'react';
import { motion } from "framer-motion";
import Header from "@/components/Header";
import FooterCTA from "@/components/home/FooterCTAHome";
import { Button } from "@/components/ui/button";

const ApproachPage = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pillars = [
    {
      step: "01",
      title: "Diagnostic Rigor",
      desc: "We don't rely on sentiment. We use proprietary diagnostics to measure the delta between your intent and reality."
    },
    {
      step: "02",
      title: "System Mapping",
      desc: "Visualizing the 'invisible' friction points in your operational loops that cause strategic drift."
    },
    {
      step: "03",
      title: "Behavioral Re-coding",
      desc: "Redesigning incentive structures and communication flows to align with your high-level promise."
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
              The <span className="text-[#0D9488]">Approach</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl font-light">
              We don't fix people; we fix the systems that constrain them.
            </p>
          </motion.div>

          {/* Core Philosophy Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-32 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Systems Over Sentiments.</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Most consulting focuses on culture as an isolated variable. At BMR Advisory, 
                we recognize that <strong>culture is an output</strong> of your system's architecture. 
                If your system rewards speed over quality, a "quality-first" culture is impossible.
              </p>
              <Button 
                onClick={scrollToContact}
                className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold h-14 px-10 rounded-xl"
              >
                Learn the Methodology
              </Button>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
               
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-4">Systemic Feedback Loop Analysis</p>
            </div>
          </div>

          {/* The Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-slate-800 rounded-2xl hover:bg-slate-900/50 transition-all group"
              >
                <span className="text-[#0D9488] font-mono text-sm block mb-4 group-hover:translate-x-1 transition-transform">
                  PILLAR_{pillar.step}
                </span>
                <h4 className="text-xl font-bold mb-4">{pillar.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <FooterCTA />
    </div>
  );
};

export default ApproachPage;
