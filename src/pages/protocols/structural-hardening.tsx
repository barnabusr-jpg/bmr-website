import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  Zap,
  Cpu,
  FileText,
  ChevronRight,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function StructuralHardeningProtocol() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600">
      <Head><title>BMR | PROTOCOL 02: STRUCTURAL HARDENING</title></Head>
      <Header />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block border border-blue-600/30 px-4 py-2 mb-8">
            <span className="text-blue-600 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Cpu className="h-3 w-3" /> Protocol 02 Activated
            </span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">Structural Hardening</h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto mb-8 font-light italic">
            Eliminate the Rework Tax and establish military-grade governance frameworks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-white hover:text-black text-white font-black py-4 px-10 uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 group">
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
              <ShieldAlert className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-black uppercase italic tracking-tight">System Decay Analysis</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 font-mono uppercase tracking-tight">The Rework Tax creates compounding operational debt:</p>
            <ul className="space-y-4">
              {['Verify:Serve ratios exceeding 2.0', 'Silent Updates creating system drift', 'Accountability gaps in AI decisions'].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 text-sm italic">
                  <div className="w-1.5 h-1.5 bg-blue-600 mt-2 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-800 bg-slate-900/20 p-10">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-black uppercase italic tracking-tight">Protocol Objectives</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 font-mono uppercase tracking-tight">This protocol establishes structural integrity:</p>
            <ul className="space-y-4">
              {['Reduce Verify:Serve ratio to below 1.5', 'Implement blind validation protocols', 'Establish AI decision traceability'].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 text-sm italic">
                  <div className="w-1.5 h-1.5 bg-blue-600 mt-2 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-[0.4em] mb-12 text-center text-white flex items-center justify-center gap-4">
            <FileText className="h-4 w-4 text-blue-600" /> Execution Framework
          </h2>
          <div className="grid gap-1">
            {[
              { phase: 'Phase 01', title: 'Tax Elimination', desc: 'Implement validation protocols to reduce rework overhead.', icon: Zap, time: '2 weeks' },
              { phase: 'Phase 02', title: 'Governance Hardening', desc: 'Establish usage policies and military-grade controls.', icon: Cpu, time: '3 weeks' },
              { phase: 'Phase 03', title: 'Traceability System', desc: 'Create decision audit trails for all AI-assisted outputs.', icon: FileText, time: '3 weeks' }
            ].map((item, index) => (
              <div key={index} className="border border-slate-900 bg-slate-900/10 p-8 flex flex-col md:flex-row gap-8 items-center group hover:border-blue-600 transition-colors">
                <div className="bg-blue-600/10 p-4 border border-blue-600/20"><item.icon className="h-8 w-8 text-blue-600" /></div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    <span>{item.phase}</span>
                    <span className="h-1 w-1 bg-slate-800 rounded-full" />
                    <span>Duration: {item.time}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 text-sm mt-2">{item.desc}</p>
                </div>
                <ChevronRight className="h-6 w-6 text-slate-800 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
