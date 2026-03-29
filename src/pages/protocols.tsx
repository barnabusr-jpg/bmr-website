"use client";

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Zap, BrainCircuit, Lock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Protocols = () => {
  const router = useRouter();
  const protocols = [
    { id: '01', title: 'RAPID DE-RISK', desc: 'Immediate containment of Shadow AI infiltration before operational integrity fractures.', color: 'text-red-600', bg: 'bg-red-950/10', path: '/briefings/chatbot-liability', icon: ShieldCheck },
    { id: '02', title: 'STRUCTURAL HARDENING', desc: 'Eliminate the Rework Tax and establish military-grade governance frameworks.', color: 'text-blue-600', bg: 'bg-blue-950/10', path: '/briefings/algorithmic-shear', icon: Zap },
    { id: '03', title: 'EXPERTISE RECOVERY', desc: 'Rebuild human capability to prevent catastrophic knowledge collapse.', color: 'text-purple-600', bg: 'bg-purple-950/10', path: '/briefings/helpline-collapse', icon: BrainCircuit }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-red-600/30">
      <Head><title>BMR | HARDENING PROTOCOLS</title></Head>
      <Header />
      <main className="pt-44 pb-24 px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-24">
          <section className="space-y-6 border-l-4 border-red-600 pl-8">
            <div className="flex items-center gap-4">
              <Lock className="text-red-600" size={14} />
              <span className="text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">ACTIVE MITIGATION ZONES</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
              HARDENING <br /><span className="text-red-600">PROTOCOLS</span>
            </h1>
          </section>

          <div className="grid md:grid-cols-3 gap-6">
            {protocols.map((protocol, i) => (
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
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-6 leading-none text-white">{protocol.title}</h3>
                  <p className="text-slate-500 text-sm italic leading-relaxed uppercase font-medium">
                    {protocol.desc}
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-700 group-hover:text-white transition-colors font-black">
                  ACCESS FORENSIC BRIEFING <ChevronRight size={14} className="text-red-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Protocols;
