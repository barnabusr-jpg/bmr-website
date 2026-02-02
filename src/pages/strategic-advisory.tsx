import React from 'react';
import { motion } from "framer-motion";
import Header from "@/components/Header";
import FooterCTA from "@/components/home/FooterCTAHome";
import { Button } from "@/components/ui/button";

const StrategicAdvisoryPage = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { title: "Systemic Audit", description: "A deep-dive diagnostic of your current operational loops to identify where strategy is being lost in translation." },
    { title: "Executive Alignment", description: "Facilitated sessions to ensure the leadership team&apos;s promise matches the system&apos;s actual capacity." },
    { title: "Operational Re-coding", description: "Direct intervention to redesign workflows, incentives, and communication protocols for long-term integrity." }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
              Strategic <span className="text-[#0D9488]">Advisory</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl font-light">
              High-leverage interventions for organizations that value operational integrity over corporate theater.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 mb-32 items-start">
            <div className="md:sticky md:top-32 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How we partner.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We don&apos;t provide 200-page slide decks. We provide the <strong>visibility</strong> and <strong>architectural changes</strong> required to make your strategy self-evident.
              </p>
              <Button onClick={scrollToContact} className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold h-14 px-10 rounded-xl">
                Request a Consultation
              </Button>
            </div>
            <div className="space-y-8">
              {services.map((service, index) => (
                <div key={index} className="p-10 border border-slate-800 rounded-3xl bg-slate-900/20 hover:border-[#0D9488]/50 transition-colors group">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#0D9488] transition-colors">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-32 p-12 border border-[#0D9488]/20 rounded-3xl bg-[#0D9488]/5 text-center">
            <h3 className="text-2xl md:text-4xl font-bold mb-6">Ready to close the Gap?</h3>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
              Our advisory spots are limited to ensure high-touch systemic change. 
              Fill out the diagnostic or reach out directly to start the audit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button onClick={scrollToContact} className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold h-14 px-8">
                Contact Strategist
              </Button>
               <Button variant="outline" onClick={() => window.open('/diagnostic', '_blank')} className="border-slate-800 text-white h-14 px-8">
                View Diagnostic
              </Button>
            </div>
          </div>
        </div>
      </main>
      <FooterCTA />
    </div>
  );
};

export default StrategicAdvisoryPage;
