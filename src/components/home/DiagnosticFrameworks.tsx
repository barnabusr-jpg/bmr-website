"use client";

import React from 'react';
import { Fingerprint, Target, ShieldCheck } from "lucide-react";

const lenses = [
  {
    id: 'HAI',
    title: 'THE TRUST LENS',
    description: 'Evaluates the psychological and operational readiness of the organization by identifying where human mental models diverge from system outputs.',
    icon: Fingerprint,
  },
  {
    id: 'AVS',
    title: 'THE GOVERN LENS',
    description: 'Audits the alignment of artificial intelligence workflows with strategic intent to ensure automated activity translates into verifiable value.',
    icon: Target,
  },
  {
    id: 'IGF',
    title: 'THE EVOLVE LENS',
    description: 'Establishes the architecture for long term resilience through the Safeguard Loop to ensure autonomous adaptation remains under leadership control.',
    icon: ShieldCheck,
  }
];

const DiagnosticFrameworks = () => {
  return (
    <section className="py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#14b8a6] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block italic">Forensic Methodology</span>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            Triple-Lens <span className="text-[#14b8a6]">Architecture</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lenses.map((lens) => (
            <div key={lens.id} className="p-10 bg-slate-900/20 border-2 border-slate-900 rounded-none relative group hover:border-[#14b8a6]/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <lens.icon className="text-[#14b8a6] h-8 w-8" />
                  <span className="text-white font-black italic uppercase tracking-tighter text-3xl">
                    {lens.id}
                  </span>
                </div>
                {/* FIXED: Removed the "VECTOR" span that was previously here */}
              </div>
              <h3 className="text-[#14b8a6] font-black uppercase tracking-[0.2em] text-[11px] mb-3 italic">
                {lens.title}
              </h3>
              <p className="text-slate-400 text-sm font-light italic leading-relaxed">
                {lens.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticFrameworks;
