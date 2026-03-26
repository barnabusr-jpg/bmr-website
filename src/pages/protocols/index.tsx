import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Users,
  FileLock,
  Cpu,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

// Strict union types to prevent "Unused @ts-expect-error" or type mismatch errors
interface Protocol {
  id: string;
  title: string;
  codename: string;
  description: string;
  icon: React.ElementType;
  urgency: 'IMMEDIATE' | 'HIGH' | 'CRITICAL';
  duration: string;
  counterZone: string;
}

const protocols: Protocol[] = [
  {
    id: 'PROTOCOL 01',
    title: "Shadow AI Containment",
    codename: "SILENT_SWEEP",
    urgency: 'IMMEDIATE',
    duration: '7–14 DAYS',
    counterZone: 'Shadow AI Shear',
    description: "Neutralize unsanctioned tool usage and secure data sovereignty. This protocol stops the immediate data bleed identified in your Forensic Audit.",
    icon: FileLock
  },
  {
    id: 'PROTOCOL 02',
    title: "Rework Tax Elimination",
    codename: "VERIFY_SERVE",
    urgency: 'HIGH',
    duration: '4–8 WEEKS',
    counterZone: 'Rework Tax',
    description: "Re-engineering prompt logic and output verification. This protocol targets the profit hemorrhage surfaced in your Pulse Check.",
    icon: Zap
  },
  {
    id: 'PROTOCOL 03',
    title: "Expertise Recovery",
    codename: "CAPABILITY_HARDENING",
    urgency: 'CRITICAL',
    duration: '12–24 WEEKS',
    counterZone: 'Expertise Debt',
    description: "Hardening human capability through manual 'blackout' drills. Restores structural integrity when AI logic fails or decays.",
    icon: Users
  }
];

export default function ProtocolsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600">
      <Head><title>BMR | Hardening Protocols</title></Head>
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="mb-20 space-y-4">
          <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest">
            <Cpu className="h-4 w-4" /> 
            Systemic Correction Hub
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
            Hardening <br /> Protocols
          </h1>
        </div>

        <div className="grid gap-1">
          {protocols.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border border-slate-900 bg-slate-900/10 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:border-red-600 transition-all"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-red-600 border border-red-600/30 px-2 py-1">
                    {p.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full animate-pulse ${
                      p.urgency === 'IMMEDIATE' ? 'bg-red-600' : 
                      p.urgency === 'CRITICAL' ? 'bg-purple-600' : 'bg-orange-500'
                    }`} />
                    <span className="text-[10px] font-mono text-slate-500">{p.urgency}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-black uppercase italic tracking-tight flex items-center gap-3 text-white group-hover:text-red-600 transition-colors">
                  <p.icon className="h-6 w-6" />
                  {p.title}
                </h2>
                
                <p className="text-slate-400 text-sm max-w-xl">{p.description}</p>
                
                <div className="flex gap-6 pt-2 font-mono text-[10px] text-slate-500 uppercase">
                  <span>Duration: <span className="text-white">{p.duration}</span></span>
                  <span>Counter: <span className="text-white">{p.counterZone}</span></span>
                </div>
              </div>

              <button 
                onClick={() => window.location.href='/audit'}
                className="w-full md:w-auto flex items-center justify-between gap-8 bg-white text-black p-6 font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all group"
              >
                ACTIVATE {p.id}
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Global Security Warning - Uses AlertTriangle and ShieldCheck to satisfy linter */}
        <div className="mt-20 border border-red-600/50 p-8 bg-red-950/10 flex flex-col md:flex-row items-center gap-6">
          <AlertTriangle className="h-12 w-12 text-red-600 shrink-0" />
          <div className="text-center md:text-left">
            <h4 className="font-black uppercase italic">Deployment Restriction Notice</h4>
            <div className="text-xs text-slate-500 uppercase font-mono mt-1 flex items-center justify-center md:justify-start gap-2">
              Protocols cannot be initiated without a verified <ShieldCheck className="h-3 w-3 text-red-600" /> Forensic Artifact Log.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
