"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { 
  Zap, Shield, Gavel, Tool, ArrowLeft, 
  CheckCircle2, Clock, Users, ChevronRight, 
  TrendingDown, Target, BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

export default function TacticalProtocolMatrix() {
  const router = useRouter();
  const { id } = router.query;

  // Quadrant Configuration for the Hardening Strategy
  const QUADRANTS: any = {
    IMMEDIATE: { 
        label: "Immediate_Remediation", 
        color: "text-red-500", 
        border: "border-red-900/40", 
        bg: "bg-red-500/5", 
        icon: Zap,
        description: "High-velocity fixes to stop immediate capital leakage." 
    },
    STRUCTURAL: { 
        label: "Structural_Hardening", 
        color: "text-blue-500", 
        border: "border-blue-900/40", 
        bg: "bg-blue-500/5", 
        icon: Tool,
        description: "Core engineering rebuilds to eliminate root-cause drift."
    },
    GOVERNANCE: { 
        label: "Governance_Overlay", 
        color: "text-purple-500", 
        border: "border-purple-900/40", 
        bg: "bg-purple-500/5", 
        icon: Gavel,
        description: "Legal and executive alignment of indemnity protocols."
    },
    FORENSIC: { 
        label: "Forensic_Continuity", 
        color: "text-green-500", 
        border: "border-green-900/40", 
        bg: "bg-green-500/5", 
        icon: Shield,
        description: "Long-term monitoring to prevent future logic fractures."
    }
  };

  // Bespoke Action Roadmap
  const PROTOCOLS = [
    { quad: 'IMMEDIATE', title: 'Deploy SIEM Forensic Logging', owner: 'DevOps', days: '3', impact: '40% Risk Reduc.', cost: '$25K' },
    { quad: 'GOVERNANCE', title: 'Align Executive Indemnity Clauses', owner: 'Legal', days: '14', impact: '25% Risk Reduc.', cost: '$15K' },
    { quad: 'STRUCTURAL', title: 'Rebuild Hardened Data Pipeline', owner: 'Engineering', days: '30', impact: '30% Risk Reduc.', cost: '$85K' },
    { quad: 'FORENSIC', title: 'Automate Anomaly Snapshots', owner: 'CTO', days: '90', impact: 'Continuity', cost: '$10K/mo' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10 font-sans tracking-tighter leading-none text-left selection:bg-red-600">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-end border-b border-slate-900 pb-10 mb-16">
          <div>
            <h1 className="text-red-600 text-5xl font-black uppercase italic tracking-tighter leading-none">Tactical_Roadmap</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic">Status: Hardening_Phase // Triangulation_Ref: {id?.toString().slice(0,8)}</p>
          </div>
          <button onClick={() => router.back()} className="flex items-center gap-3 text-slate-500 hover:text-white transition-all text-[10px] font-mono font-black uppercase tracking-widest border border-slate-800 px-8 py-5 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back_to_Dossier
          </button>
        </header>

        {/* STRATEGIC OVERVIEW STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 font-sans">
           {[
             { label: 'Risk_Mitigation', val: '85%', icon: Target },
             { label: 'Hardening_Window', val: '90 Days', icon: Clock },
             { label: 'Reclaimed_Tax', val: '$250K', icon: BarChart3 },
             { label: 'Auth_Directives', val: '04', icon: CheckCircle2 },
           ].map((stat, i) => (
             <div key={i} className="bg-slate-950 border border-slate-900 p-8 flex flex-col justify-between h-44">
                <stat.icon size={20} className="text-red-600" />
                <div>
                   <div className="text-4xl font-black italic uppercase leading-none">{stat.val}</div>
                   <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-3 font-bold">{stat.label}</div>
                </div>
             </div>
           ))}
        </div>

        {/* 4-QUADRANT TACTICAL MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20">
          {Object.keys(QUADRANTS).map((qKey) => {
            const config = QUADRANTS[qKey];
            const items = PROTOCOLS.filter(p => p.quad === qKey);
            const Icon = config.icon;

            return (
              <div key={qKey} className={`bg-slate-950 border ${config.border} p-10 relative overflow-hidden group`}>
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div>
                      <p className={`text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-2 ${config.color}`}>{qKey}_REMEDIATION</p>
                      <h3 className="text-3xl font-black italic uppercase text-white leading-none">{config.label.replace('_', ' ')}</h3>
                      <p className="text-slate-500 text-[10px] uppercase font-bold mt-4 tracking-widest italic">{config.description}</p>
                   </div>
                   <Icon size={48} className={`${config.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                </div>

                <div className="space-y-4 relative z-10">
                  {items.map((item, idx) => (
                    <div key={idx} className="bg-black/60 border border-slate-900 p-8 flex flex-col md:flex-row justify-between items-center hover:border-slate-700 transition-all group/item gap-8">
                       <div className="flex items-center gap-8 flex-1">
                          <div className={`w-[2px] h-16 ${config.color.replace('text', 'bg')}`} />
                          <div>
                            <p className="text-xl font-black text-white italic uppercase tracking-tight leading-none mb-4">{item.title}</p>
                            <div className="flex flex-wrap gap-6">
                               <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-2 font-bold"><Users size={12}/> {item.owner}</span>
                               <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-2 font-bold"><Clock size={12}/> {item.days} Days</span>
                               <span className="text-[9px] font-mono text-green-500 uppercase flex items-center gap-2 font-black italic tracking-widest"><TrendingDown size={12}/> {item.impact}</span>
                            </div>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-4 min-w-[150px]">
                          <div className="text-right">
                             <div className="text-2xl font-black italic text-white leading-none">{item.cost}</div>
                             <p className="text-[8px] font-mono text-slate-600 uppercase font-bold mt-1 tracking-widest">Est_Service_Fee</p>
                          </div>
                          <button className={`text-[10px] font-mono font-black uppercase italic tracking-[0.2em] border-b-2 pb-1 transition-all ${config.color} hover:text-white border-current leading-none`}>
                            Authorize_Directive
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* MASTER AUTHORIZATION FOOTER */}
        <div className="bg-red-600 p-12 flex flex-col md:flex-row justify-between items-center gap-10 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
           <div className="text-left text-black">
              <h2 className="text-5xl font-black italic uppercase leading-none mb-3">Authorize_Master_Hardening</h2>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-90 font-sans italic">Commence full-spectrum remediation roadmap to reclaim $250,000 in annual rework tax.</p>
           </div>
           <div className="flex items-center gap-12">
              <div className="text-right">
                <div className="text-5xl font-black italic text-black leading-none">$250K</div>
                <p className="text-[10px] font-mono text-black font-black uppercase tracking-widest mt-2 leading-none text-right italic">Capital_Protection</p>
              </div>
              <button className="bg-black text-white px-16 py-8 font-black uppercase italic text-sm tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all duration-500 shadow-2xl leading-none">
                APPROVE_ALL_DIRECTIVES →
              </button>
           </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-900 text-center">
           <p className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.5em] font-bold italic">Forensic_Architecture // Hardening_Protocol_v4.2</p>
        </footer>
      </div>
    </div>
  );
}
