"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, ZoomIn, Hammer, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    tier: "TIER_01",
    title: "Drift Diagnostics",
    description: "A high-fidelity forensic audit of existing AI deployments to identify where logic has diverged from intent. We locate the \"Log Rot\" before it hardens.",
    icon: <ZoomIn className="h-10 w-10 text-red-600" />,
    href: "/services#tier-1"
  },
  {
    tier: "TIER_02",
    title: "Structural Hardening",
    description: "Re-engineering the human-in-the-loop protocols. We build the safeguards and oversight loops necessary to prevent future value leakage.",
    icon: <Shield className="h-10 w-10 text-red-600" />,
    href: "/services#tier-2"
  },
  {
    tier: "TIER_03",
    title: "Logic Reconstruction",
    description: "For systems in active collapse. We perform a structural recovery of the AI strategy, stabilizing the platform for long-term defensibility.",
    icon: <Hammer className="h-10 w-10 text-red-600" />,
    href: "/services#tier-3"
  }
];

const ServicesPreview = () => {
  return (
    <section style={{ borderTop: '1px solid #1e293b', paddingTop: '140px', paddingBottom: '140px', backgroundColor: '#020617' }}>
      <div className="container mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12 border-l-4 border-red-600 pl-12">
          <div className="max-w-3xl">
            <h2 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-8">
              Forensic <br /><span className="text-red-600">Protocols.</span>
            </h2>
            <p className="text-2xl text-slate-400 font-medium italic leading-relaxed max-w-2xl">
              Standard agencies offer &quot;optimization.&quot; BMR provides the 
              structural recovery required when AI-enabled systems decay under 
              real-world pressure.
            </p>
          </div>
          <Link 
            href="/services" 
            className="text-xs font-black uppercase tracking-[0.5em] text-slate-600 hover:text-red-600 transition-all flex items-center gap-4 border-b-2 border-slate-900 pb-4 mt-12"
          >
            VIEW_ALL_TIERS <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-slate-900 border-2 border-slate-900">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#020617] p-16 hover:bg-red-600/[0.02] transition-all relative overflow-hidden flex flex-col justify-between min-h-[500px]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-900 group-hover:bg-red-600 transition-all duration-500" />
              
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                    <div className="p-5 bg-slate-900/30 w-fit group-hover:bg-red-600/10 transition-colors border border-slate-800">
                        {service.icon}
                    </div>
                    <span className="text-[10px] font-mono font-black text-slate-800 tracking-[0.4em] uppercase">
                        {service.tier}
                    </span>
                </div>

                <h3 className="text-3xl font-black text-white italic uppercase tracking-tight group-hover:text-red-600 transition-colors leading-none">
                  {service.title}
                </h3>

                <p style={{ fontSize: '1.5rem' }} className="text-slate-500 font-medium leading-relaxed italic border-l-2 border-slate-900 pl-8">
                  {service.description}
                </p>
              </div>

              <Link 
                href={service.href}
                className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-slate-700 group-hover:text-white transition-all mt-16"
              >
                ACCESS PROTOCOL <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
