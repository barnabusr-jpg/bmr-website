import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  Users,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  History,
  Lock
} from 'lucide-react';

export default function ExpertiseRecoveryProtocol() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-600">
      <Head>
        <title>BMR | PROTOCOL 03: EXPERTISE RECOVERY</title>
      </Head>
      <Header />

      <main className="pt-32 pb-20 px-6">
        {/* Mission Header */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="inline-block border border-purple-600/30 px-4 py-2 mb-8"
          >
            <span className="text-purple-600 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <History className="h-3 w-3" /> Protocol 03 Activated
            </span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 leading-none">
            Expertise <br /> Recovery
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto mb-8 font-light italic">
            Reversing the &quot;Black Box&quot; dependency to restore structural human capability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-purple-600 hover:bg-white hover:text-black text-white font-black py-4 px-10 uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 group">
              Activate Protocol <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-slate-700 hover:bg-slate-800 text-white font-black py-4 px-10 uppercase text-xs tracking-widest transition-all">
              Download Field Manual
            </button>
          </div>
        </div>

        {/* Cognitive Decay Analysis */}
        <div className="max-w-6xl mx-auto mb-20 grid md:grid-cols-2 gap-1">
          <div className="border border-slate-800 bg-slate-900/20 p-10">
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-black uppercase italic tracking-tight">Skill Decay Analysis</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 font-mono uppercase tracking-tight">
              Over-reliance on AI logic creates systemic fragility:
            </p>
            <ul className="space-y-4">
              {[
                'Loss of first-principles reasoning', 
                'Inability to detect complex hallucinations', 
                'Junior staff &quot;logic-lock&quot; dependency'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 text-sm italic">
                  <div className="w-1.5 h-1.5 bg-purple-600 mt-2 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-800 bg-slate-900/20 p-10">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-black uppercase italic tracking-tight">Protocol Objectives</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 font-mono uppercase tracking-tight">
              This protocol restores human operational integrity:
            </p>
            <ul className="space-y-4">
              {[
                'Establish &quot;Blackout&quot; manual proficiency', 
                'Implement mandatory logic-trace audits', 
                'Restore internal expertise sovereignty'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 text-sm italic">
                  <div className="w-1.5 h-1.5 bg-purple-600 mt-2 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recovery Phases */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-[0.4em] mb-12 text-center flex items-center justify-center gap-4 text-white">
            <ShieldCheck className="h-4 w-4 text-purple-600" /> Recovery Phases
          </h2>
          <div className="grid gap-1">
            {[
              { 
                phase: 'Phase 01', 
                title: 'Blackout Drills', 
                desc: 'Execute manual task performance without AI assistance to benchmark decay.', 
                icon: Users, 
                time: '1 week' 
              },
              { 
                phase: 'Phase 02', 
                title: 'Logic Hardening', 
                desc: 'Training staff to identify and neutralize algorithmic hallucinations.', 
                icon: BrainCircuit, 
                time: '3 weeks' 
              },
              { 
                phase: 'Phase 03', 
                title: 'Sovereignty Audit', 
                desc: 'Final verification of the team to function during system failure.', 
                icon: ShieldCheck, 
                time: '2 weeks' 
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="border border-slate-900 bg-slate-900/10 p-8 flex flex-col md:flex-row gap-8 items-center group hover:border-purple-600 transition-colors"
              >
                <div className="bg-purple-600/10 p-4 border border-purple-600/20">
                  <item.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    <span>{item.phase}</span>
                    <span className="h-1 w-1 bg-slate-800 rounded-full" />
                    <span>Duration: {item.time}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 text-sm mt-2">{item.desc}</p>
                </div>
                <ChevronRight className="h-6 w-6 text-slate-800 group-hover:text-purple-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
