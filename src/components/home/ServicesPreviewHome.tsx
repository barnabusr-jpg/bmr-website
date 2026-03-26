"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, ZoomIn, Hammer, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    title: "Tier 1: Drift Diagnostics",
    description: "A high-fidelity forensic audit of existing AI deployments to identify where logic has diverged from intent. We locate the &quot;Log Rot&quot; before it hardens.",
    icon: <ZoomIn className="h-8 w-8 text-red-600" />,
    href: "/services#tier-1"
  },
  {
    title: "Tier 2: Structural Hardening",
    description: "Re-engineering the human-in-the-loop protocols. We build the safeguards and oversight loops necessary to prevent future value leakage.",
    icon: <Shield className="h-8 w-8 text-red-600" />,
    href: "/services#tier-2"
  },
  {
    title: "Tier 3: Logic Reconstruction",
    description: "For systems in active collapse. We perform a structural recovery of the AI strategy, stabilizing the platform for long-term defensibility.",
    icon: <Hammer className="h-8 w-8 text-red-600" />,
    href: "/services#tier-3"
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-32 bg-slate-950 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none mb-6">
              Forensic <span className="text-red-600">Protocols.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium italic leading-relaxed">
              Standard agencies offer &quot;optimization.&quot; BMR provides the 
              structural recovery required when AI-enabled systems decay under 
              real-world pressure.
            </p>
          </div>
          <Link 
            href="/services" 
            className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 hover:text-red-600 transition-colors flex items-center gap-3 border-b border-slate-900 pb-2"
          >
            All Tiers <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-slate-900 border border-slate-900">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-950 p-12 hover:bg-red-600/[0.02] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-slate-900 group-hover:bg-red-600 transition-colors" />
              
              <div className="mb-8 p-4 bg-slate-900/30 w-fit group-hover:bg-red-600/10 transition-colors">
                {service.icon}
              </div>

              <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-4 group-hover:text-red-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-slate-500 text-sm font-medium leading-relaxed italic mb-8">
                {service.description}
              </p>

              <Link 
                href={service.href}
                className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-700 group-hover:text-white transition-all"
              >
                Access Protocol <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
