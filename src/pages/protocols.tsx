"use client";

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Zap, BrainCircuit, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PROTOCOLS = [
  { 
    id: '01', 
    title: 'RAPID DE-RISK', 
    desc: 'IMMEDIATE CONTAINMENT OF SHADOW AI INFILTRATION BEFORE OPERATIONAL INTEGRITY FRACTURES.', 
    color: 'text-red-600', 
    bg: 'bg-red-950/10', 
    path: '/briefings/chatbot-liability', 
    icon: ShieldCheck 
  },
  { 
    id: '02', 
    title: 'STRUCTURAL HARDENING', 
    desc: 'ELIMINATE THE REWORK TAX AND ESTABLISH MILITARY-GRADE GOVERNANCE FRAMEWORKS.', 
    color: 'text-blue-600', 
    bg: 'bg-blue-950/10', 
    path: '/briefings/algorithmic-shear', 
    icon: Zap 
  },
  { 
    id: '03', 
    title: 'EXPERTISE RECOVERY', 
    desc: 'REBUILD HUMAN CAPABILITY TO PREVENT CATASTROPHIC KNOWLEDGE COLLAPSE.', 
    color: 'text-purple-600', 
    bg: 'bg-purple-950/10', 
    path: '/briefings/helpline-collapse', 
    icon: BrainCircuit 
  }
];

export default function ProtocolsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | HARDENING PROTOCOLS</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-24">
          
          <section className="space-y-6 border-l-4 border-red-600 pl-8">
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
              HARDENING <br /><span className="text-red-600 uppercase">PROTOCOLS</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold leading-relaxed italic uppercase text-xs tracking-tight text-left">
              AUTHORIZED PERSONNEL ONLY: 03 MODULES ACTIVE. ACCESSING SYSTEM RECOVERY LAYERS.
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-6">
            {PROTOCOLS.map((protocol, i) => (
              <motion.div 
                key={protocol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => router.push(protocol.path)}
                className={`group border border-slate-900 ${protocol.bg} p-12 transition-all cursor-pointer hover:border-red-600 relative overflow-hidden flex flex-col justify-between h-[500px] shadow-2xl`}
              >
                <div>
                  <div className="flex justify-between items-start mb-16">
                    <protocol.icon className={`h-10 w-10 ${protocol.color}`} />
                    <span className="font-mono text-[10px] text-slate-700 group-hover:text-red-600 transition-colors uppercase font-black">P-{protocol.id}</span>
                  </div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6 leading-none text-white text-left">{protocol.title}</h2>
                  <p className="text-slate-500 text-sm italic leading-relaxed uppercase font-medium text-left">
                    {protocol.desc}
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-700 group-hover:text-white transition-colors font-black">
                  ACCESS BRIEFING <ChevronRight size={14} className="text-red-600" />
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-gradient-to-r from-slate-950 to-red-900/20 border-y-2 border-red-600/30 py-16 px-12 text-left shadow-2xl">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] text-left">THE AUTOMATED <br /> RECOVERY ENGINE</h2>
            <button 
              onClick={() => router.push('/pulse-check/assessment')} 
              className="mt-10 bg-white text-black px-14 py-8 font-black uppercase text-[12px] tracking-[0.5em] hover:bg-red-600 hover:text-white transition-all shadow-2xl flex items-center gap-3 group"
            >
              START AUDIT <Zap size={18} className="group-hover:animate-pulse" />
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
