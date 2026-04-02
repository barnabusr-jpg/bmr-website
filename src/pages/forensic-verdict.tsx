"use client";
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, ShieldAlert, Lock, Zap, Skull } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ForensicVerdict() {
  const [data, setData] = useState<any>(null);
  const [activePersona, setActivePersona] = useState<'executive' | 'manager' | 'technical'>('executive');

  useEffect(() => {
    const fetchVerdict = async () => {
      const res = await fetch('/api/forensic-synthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alpha: JSON.parse(localStorage.getItem('bmr_vault_alpha_results') || '{}'),
          beta: JSON.parse(localStorage.getItem('bmr_vault_beta_results') || '{}'),
          gamma: JSON.parse(localStorage.getItem('bmr_vault_gamma_results') || '{}'),
          sector: localStorage.getItem('bmr_selected_sector') || 'finance'
        })
      });
      setData(await res.json());
    };
    fetchVerdict();
  }, []);

  if (!data) return <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-red-600 animate-pulse uppercase tracking-[0.4em]">Synthesizing Sector Signal...</div>;

  const currentTrap = data.personaContent[activePersona];

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans selection:bg-red-600/30">
      <Head><title>Forensic Dossier | BMR Solutions</title></Head>
      <div className="container mx-auto max-w-4xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-start border-b border-slate-900 pb-8 mb-16">
          <div>
            <h1 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter">
              FORENSIC TRIAGE <span className="text-white">ALERT</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">
              AUDIT: {data.sectorLabel} // STATUS: VALIDATED SIGNAL
            </p>
          </div>
          <div className="bg-slate-900 p-3 border border-slate-800 rounded-sm">
            <Lock size={18} className="text-slate-500" />
          </div>
        </div>

        {/* PRIMARY HEMORRHAGE SIGNAL */}
        <div className="text-center mb-24 relative py-12">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Skull size={320} />
           </div>
           <span className="text-[12rem] font-black italic tracking-tighter text-white relative z-10 leading-none">
             ${data.total}M
           </span>
           <p className="text-red-600 font-mono text-sm uppercase font-black tracking-[0.6em] mt-6">
             VALIDATED ANNUAL HEMORRHAGE SIGNAL
           </p>
        </div>

        {/* PERSONA PERSPECTIVE SWITCHER */}
        <div className="flex justify-center gap-3 mb-8">
          {['executive', 'manager', 'technical'].map((p) => (
            <button
              key={p}
              onClick={() => setActivePersona(p as any)}
              className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] italic border-2 transition-all ${
                activePersona === p ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-transparent border-slate-900 text-slate-500 hover:border-slate-700'
              }`}
            >
              {p} Perspective
            </button>
          ))}
        </div>

        {/* THE COMPOUND FAILURE & MENTAL TRAP */}
        <Card className="bg-slate-950 border-2 border-red-600 p-12 mb-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-white text-2xl font-black uppercase italic mb-6 flex items-center gap-3">
                <TrendingUp size={24} className="text-red-600" /> THE {currentTrap.hook}
              </h3>
              <p className="text-xl font-bold italic tracking-tight text-slate-300 leading-tight mb-8">
                "{currentTrap.anxiety}"
              </p>
              <div className="bg-slate-900/50 p-6 border-l-2 border-slate-800 font-mono text-[10px] text-slate-500 uppercase leading-loose tracking-wider italic">
                 Hemorrhage scales at {data.ratio}x against initial ${data.visibleTip}M industry anchor.
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-black/40 p-8 border border-slate-900">
                <div className="flex justify-between mb-4 font-mono text-[9px] text-slate-600 uppercase tracking-[0.2em]">
                  <span>Authorized Investment</span>
                  <span>${data.visibleTip}M</span>
                </div>
                <div className="h-[1px] bg-slate-900 mb-6" />
                <div className="flex justify-between font-mono text-xs text-red-600 font-black tracking-widest">
                  <span>Logic Decay Loss</span>
                  <span>${data.total}M</span>
                </div>
              </div>

              <button className="w-full bg-red-600 py-8 font-black uppercase italic tracking-[0.4em] text-xs text-white hover:bg-white hover:text-black transition-all shadow-[0_15px_40px_rgba(220,38,38,0.2)] flex items-center justify-center gap-4 border-2 border-red-600">
                {currentTrap.cta} <ArrowRight size={20} />
              </button>
              <p className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em] text-center">
                *ESTABLISH REMEDIATION PROVENANCE WITHIN 72H
              </p>
            </div>
          </div>
        </Card>

        {/* PROVENANCE WATERMARK */}
        <div className="flex flex-col md:flex-row justify-between items-center py-12 border-t border-slate-900 font-mono text-[10px] text-slate-700 uppercase tracking-widest">
           <div className="flex items-center gap-4">
              <ShieldAlert size={14} className="text-red-600" />
              <span>Dossier: {data.provenance.audit_id}</span>
              <span className="px-4">|</span>
              <Zap size={14} />
              <span>Verified: {new Date(data.provenance.timestamp).toLocaleTimeString()}</span>
           </div>
           <button className="mt-8 md:mt-0 text-slate-500 hover:text-white transition-colors border-b border-slate-900 pb-1">Archive Forensic Session</button>
        </div>

      </div>
    </div>
  );
}
