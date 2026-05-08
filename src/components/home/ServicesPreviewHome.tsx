"use client";
import React from 'react';
import { ZoomIn, Shield, Hammer, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  { tier: "TIER_01", title: "DRIFT DIAGNOSTICS", icon: <ZoomIn className="h-10 w-10 text-red-600" />, href: "/methodology", description: "A high-fidelity forensic audit of existing AI deployments to identify where logic has diverged from intent." },
  { tier: "TIER_02", title: "STRUCTURAL HARDENING", icon: <Shield className="h-10 w-10 text-red-600" />, href: "/methodology", description: "Re-engineering the human-in-the-loop protocols. We build the safeguards and oversight loops." },
  { tier: "TIER_03", title: "LOGIC RECONSTRUCTION", icon: <Hammer className="h-10 w-10 text-red-600" />, href: "/methodology", description: "For systems in active collapse. We perform a structural recovery of the AI strategy." }
];

export default function ServicesPreviewHome() {
  return (
    <section className="bg-[#020617] pt-[140px] pb-[140px] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12 border-l-4 border-red-600 pl-12 text-left">
          <h2 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
            Forensic <br /><span className="text-red-600">Protocols.</span>
          </h2>
        </div>

        {/* 🛡️ BORDER FIX: bg-slate-900 acts as the border color between items */}
        <div className="grid md:grid-cols-3 gap-[2px] bg-slate-900 border-[2px] border-slate-900">
          {SERVICES.map((service, index) => (
            <Link key={index} href={service.href} className="group block no-underline bg-[#020617] h-full">
              <div className="p-12 md:p-16 hover:bg-red-600/[0.04] transition-all relative flex flex-col justify-between min-h-[600px] h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-900 group-hover:bg-red-600 transition-all duration-500" />
                <div className="space-y-10 text-left">
                  <div className="flex justify-between items-start">
                    <div className="p-5 bg-slate-900/30 w-fit group-hover:bg-red-600/10 border border-slate-800">
                      {service.icon}
                    </div>
                    <span className="text-[10px] font-mono font-black text-slate-700 tracking-[0.4em] uppercase">{service.tier}</span>
                  </div>
                  {/* 🛡️ FONT SCALE: ensure 'FORENSIC' fits in the landing grid */}
                  <h3 className="text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter group-hover:text-red-600 transition-colors leading-none">
                    {service.title}
                  </h3>
                  <p className="text-2xl text-slate-500 font-medium italic border-l-2 border-slate-800 pl-8 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 group-hover:text-white transition-all mt-16">
                  VIEW PUBLIC CAPABILITIES <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
