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
import Insights from "@/components/home/InsightsHome";
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BrainCircuit, 
  ChevronRight,
  Lock
} from "lucide-react";

const Index = () => {
  const router = useRouter();

  const protocols = [
    {
      id: '01',
      title: 'RAPID DE-RISK',
      desc: 'Immediate containment of Shadow AI infiltration before operational integrity fractures.',
      color: 'text-red-600',
      bg: 'bg-red-950/10',
      href: '/protocols/rapid-de-risk',
      icon: ShieldCheck
    },
    {
      id: '02',
      title: 'STRUCTURAL HARDENING',
      desc: 'Eliminate the Rework Tax and establish military-grade governance frameworks.',
      color: 'text-blue-600',
      bg: 'bg-blue-950/10',
      href: '/protocols/structural-hardening',
      icon: Zap
    },
    {
      id: '03',
      title: 'EXPERTISE RECOVERY',
      desc: 'Rebuild human capability to prevent catastrophic knowledge collapse.',
      color: 'text-purple-600',
      bg: 'bg-purple-950/10',
      href: '/protocols/expertise-recovery',
      icon: BrainCircuit
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500/30">
      <Head>
        <title>BMR | AI FORENSIC & HARDENING</title>
      </Head>
      <Header />
      
      <main>
        <Hero />
        <CommercialVideo src="https://uuyq3t7kfckwh0je.public.blob.vercel-storage.com/bmr-commercial.mp4" />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Sensors />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ServicesPreview />

        {/* NEW: HARDENED PROTOCOL SELECTION GRID */}
        <section className="py-24 px-6 bg-slate-950 border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <div className="text-red-600 font-mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Lock className="h-3 w-3" /> ACTIVE MITIGATION ZONES
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-white">
                  HARDENING <br /> PROTOCOLS
                </h2>
              </div>
              <div className="text-slate-500 font-mono text-[10px] uppercase tracking-widest border-b border-slate-800 pb-2 italic">
                Authorized Personnel Only: 03 Modules Active
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-1">
              {protocols.map((protocol) => (
                <div 
                  key={protocol.id}
                  onClick={() => router.push(protocol.href)}
                  className={`group border border-slate-900 ${protocol.bg} p-10 transition-all cursor-pointer hover:border-white relative overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-16">
                    <protocol.icon className={`h-8 w-8 ${protocol.color}`} />
                    <span className="font-mono text-[10px] text-slate-700 group-hover:text-white transition-colors">P-{protocol.id}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none text-white">
                    {protocol.title}
                  </h3>
                  <p className="text-slate-500 text-sm italic mb-10 group-hover:text-slate-300 transition-colors leading-relaxed">
                    {protocol.desc}
                  </p>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-700 group-hover:text-white transition-colors">
                    Access Briefing <ChevronRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Outcomes />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <ComparisonGrid />
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <Insights />
        
        {/* FINAL CONVERSION SECTION: Diagnostic remains anchored here */}
        <section className="py-32 px-6 border-t border-slate-900 bg-slate-950">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tighter uppercase text-white">
              Ready to Close the Gap?
            </h2>
            <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto font-light leading-relaxed italic">
              Whether you are troubleshooting a current deployment or architecting a new initiative, 
              start with the BMR framework to eliminate shadow labor and value leak.
            </p>

            <div className="max-w-2xl mx-auto text-left">
              <div className="p-10 bg-red-950/5 border-2 border-red-900/20 rounded-none flex flex-col justify-between hover:border-red-600/40 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-red-600 transition-all duration-500"></div>
                
                <div>
                  <Activity className="text-red-600 mb-6 h-10 w-10 group-hover:animate-pulse" />
                  <h3 className="text-2xl font-black mb-4 italic uppercase text-white tracking-tight">
                    System Diagnostic
                  </h3>
                  <p className="text-slate-300 mb-10 font-light leading-relaxed text-sm italic">
                    Ready for a forensic view? Our 12-question pulse check identifies your 
                    primary friction points and defines your System Archetype.
                  </p>
                </div>
                
                <button 
                  onClick={() => router.push('/pulse-check')}
                  className="inline-flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-6 rounded-none font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-red-600 transition-all shadow-lg shadow-red-900/10"
                >
                  Begin Diagnostic <ArrowRight size={14} />
                </button>
              </div>
              
              <p className="text-center mt-8 text-[9px] text-slate-700 font-black uppercase tracking-widest italic">
                Authorized Session: Forensic Review V3
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
