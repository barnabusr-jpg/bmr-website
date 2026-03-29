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
    <div className="min-h-screen bg-[#020617] text-white">
      <Head><title>BMR | HARDENING PROTOCOLS</title></Head>
      <Header />
      <main className="pt-44">
        {/* The Services Content we moved from Home */}
        <ServicesPreview />
        
        {/* Protocol Grid */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-1">
            {protocols.map((p) => (
              <div key={p.id} className="border border-slate-900 bg-slate-900/10 p-10 hover:border-red-600 transition-all cursor-pointer">
                <p.icon className="h-8 w-8 text-red-600 mb-8" />
                <h3 className="text-2xl font-black uppercase italic mb-4">PROTOCOL {p.id}</h3>
                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase"><ChevronRight size={12}/> Access Briefing</div>
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
