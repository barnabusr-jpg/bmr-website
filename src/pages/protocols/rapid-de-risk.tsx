import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  AlertTriangle,
  FileLock,
  Users,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function RapidDeRiskProtocol() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600">
      <Head><title>BMR | PROTOCOL 01: RAPID DE-RISK</title></Head>
      <Header />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-red-600/30 px-4 py-2 mb-8"
          >
            <span className="text-red-600 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" /> PROTOCOL 01 ACTIVATED
            </span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
            Rapid De-Risk
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto mb-8 font-light italic">
            Immediate containment of Shadow AI infiltration before operational integrity fractures.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-10 uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 group">
              Activate Protocol <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-slate-700 hover:bg-slate-800 text-white font-black py-4 px-10 uppercase text-xs tracking-widest transition-all">
              Download Field Manual
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-20 grid md:grid-cols-2 gap-1">
          <div className="border border-slate-800 bg-slate-900/20 p-10">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-black uppercase italic tracking-tight">Threat Assessment</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 font-mono uppercase tracking-tight">Shadow AI tools operate outside governance frameworks. They create:</p>
            <ul className="space-y-4">
              {['Data leakage into consumer-grade AI', 'Undetectable Silent Updates', 'Knowledge collapse from over-reliance'].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 text-sm italic">
                  <div className="w-1.5 h-1.5 bg-red-600 mt-2 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-800 bg-slate-900/20 p-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-black uppercase italic tracking-tight">Protocol Objectives</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 font-mono uppercase tracking-tight">This protocol establishes immediate containment measures:</p>
            <ul className="space-y-4">
              {['Identify all unsanctioned AI tools', 'Block data leakage in consumer AI', 'Establish emergency governance'].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 text-sm italic">
                  <div className="w-1.5 h-1.5 bg-red-600 mt-2 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-[0.4em] mb-12 text-center">Execution Phases</h2>
          <div className="grid gap-1">
            {[
              { phase: 'Phase 01', title: 'Shadow AI Detection', desc: 'Deploy network sensors to identify all unsanctioned AI tool usage.', icon: Users, time: '2–3 days' },
              { phase: 'Phase 02', title: 'Data Containment', desc: 'Implement emergency data loss prevention measures.', icon: FileLock, time: '3–4 days' },
              { phase: 'Phase 03', title: 'Governance Lockdown', desc: 'Establish emergency AI usage policies and controls.', icon: ShieldCheck, time: '2 days' }
            ].map((item, index) => (
              <div key={index} className="border border-slate-900 bg-slate-900/10 p-8 flex flex-col md:flex-row gap-8 items-center group hover:border-red-600 transition-colors">
                <div className="bg-red-600/10 p-4 border border-red-600/20"><item.icon className="h-8 w-8 text-red-600" /></div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    <span>{item.phase}</span>
                    <span className="h-1 w-1 bg-slate-800 rounded-full" />
                    <span>Duration: {item.time}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 text-sm mt-2">{item.desc}</p>
                </div>
                <ChevronRight className="h-6 w-6 text-slate-800 group-hover:text-red-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
