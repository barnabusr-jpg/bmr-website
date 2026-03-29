"use client";

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesPreview from "@/components/home/ServicesPreviewHome";
import Outcomes from "@/components/home/OutcomesHome";
import { ShieldCheck, Zap, BrainCircuit, ChevronRight } from "lucide-react";

export default function ProtocolsPage() {
  const protocols = [
    { id: '01', title: 'RAPID DE-RISK', path: '/briefings/chatbot-liability', icon: ShieldCheck },
    { id: '02', title: 'STRUCTURAL HARDENING', path: '/briefings/algorithmic-shear', icon: Zap },
    { id: '03', title: 'EXPERTISE RECOVERY', path: '/briefings/helpline-collapse', icon: BrainCircuit }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30">
      <Head><title>BMR | HARDENING PROTOCOLS</title></Head>
      <Header />
      <main className="pt-44">
        <ServicesPreview />
        
        <section className="py-24 px-6 bg-[#020617]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-1">
            {protocols.map((p) => (
              <div key={p.id} onClick={() => { window.location.href = p.path; }} className="border border-slate-900 bg-slate-900/10 p-12 hover:border-red-600 transition-all cursor-pointer group shadow-2xl">
                <p.icon className="h-10 w-10 text-red-600 mb-12 group-hover:animate-pulse" />
                <h3 className="text-3xl font-black uppercase italic mb-6 leading-none tracking-tighter">PROTOCOL <br /> {p.id}</h3>
                <div className="flex items-center gap-3 font-mono text-[10px] text-slate-600 group-hover:text-white transition-colors uppercase font-black tracking-widest italic">
                  <ChevronRight size={14} className="text-red-600"/> ACCESS BRIEFING
                </div>
              </div>
            ))}
          </div>
        </section>

        <Outcomes />
      </main>
      <Footer />
    </div>
  );
}
