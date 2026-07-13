"use client";
import React from "react";
import { useRouter } from 'next/router';
import { 
  Zap, Shield, Gavel, Wrench, ArrowLeft, 
  Clock, Users, TrendingDown
} from "lucide-react";

export default function TacticalProtocolMatrix() {
  const router = useRouter();
  const { id } = router.query;

  // Configuration for the 4 Quadrant Remediations
  const QUADRANTS: any = {
    IMMEDIATE: { 
      label: "Immediate Remediation", 
      color: "text-red-600", 
      border: "border-red-900/40", 
      icon: Zap, 
      desc: "High velocity configuration modifications to halt active capital leakage." 
    },
    STRUCTURAL: { 
      label: "Structural Hardening", 
      color: "text-blue-500", 
      border: "border-blue-900/40", 
      icon: Wrench, 
      desc: "Core pipeline engineering adjustments to eliminate root cause runtime drift." 
    },
    GOVERNANCE: { 
      label: "Governance Overlay", 
      color: "text-purple-500", 
      border: "border-purple-900/40", 
      icon: Gavel, 
      desc: "Organizational alignment of technical boundaries and data contracts." 
    },
    FORENSIC: { 
      label: "Forensic Continuity", 
      color: "text-green-500", 
      border: "border-green-900/40", 
      icon: Shield, 
      desc: "Continuous monitoring telemetry to prevent future structural degradation." 
    }
  };

  const PROTOCOLS = [
    { quad: 'IMMEDIATE', title: 'Deploy Input Schema Validation Contracts', owner: 'Engineering', days: '3', impact: '45% Bleed Reduc.', cost: '$14,500' },
    { quad: 'GOVERNANCE', title: 'Establish Third Party Interface Agreements', owner: 'Product', days: '14', impact: '20% Risk Reduc.', cost: '$12,000' },
    { quad: 'STRUCTURAL', title: 'Construct Gateway Proxy Abstraction Layers', owner: 'Architecture', days: '30', impact: '35% Drift Reduc.', cost: '$52,500' },
    { quad: 'FORENSIC', title: 'Automate Telemetry Ingestion Profiling', owner: 'DevOps', days: '60', impact: 'Continuity', cost: '$8,360' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-10 font-sans tracking-tighter leading-none text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* TACTICAL HEADER */}
        <header className="flex justify-between items-end border-b border-slate-900 pb-10 mb-16">
          <div className="text-left">
            <h1 className="text-red-600 text-5xl font-black uppercase italic tracking-tighter">Tactical Roadmap</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic text-left">Phase: Hardening Execution // Ref: {id?.toString().slice(0,8)}</p>
          </div>
          <button onClick={() => router.back()} className="flex items-center gap-3 text-slate-500 hover:text-white transition-all text-[10px] font-mono font-black uppercase tracking-widest border border-slate-800 px-8 py-5">
            <ArrowLeft size={14} /> Back to Dossier
          </button>
        </header>

        {/* STRATEGIC OVERVIEW STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20 text-left">
          {Object.keys(QUADRANTS).map((qKey) => {
            const config = QUADRANTS[qKey];
            const items = PROTOCOLS.filter(p => p.quad === qKey);
            const Icon = config.icon;

            return (
              <div key={qKey} className={`bg-slate-950 border ${config.border} p-10 relative overflow-hidden group text-left`}>
                <div className="flex justify-between items-start mb-12 relative z-10 text-left">
                   <div className="text-left">
                      <p className={`text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-2 ${config.color} text-left`}>{qKey} PROTOCOL</p>
                      <h3 className="text-3xl font-black italic uppercase text-white leading-none text-left">{config.label}</h3>
                      <p className="text-slate-500 text-[10px] uppercase font-bold mt-4 tracking-widest italic text-left leading-tight">{config.desc}</p>
                   </div>
                   <Icon size={48} className={`${config.color} opacity-20`} />
                </div>

                <div className="space-y-4 relative z-10 text-left">
                  {items.map((item, idx) => (
                    <div key={idx} className="bg-black/60 border border-slate-900 p-8 flex flex-col justify-between hover:border-slate-700 transition-all gap-8 text-left">
                       <div className="text-left">
                          <p className="text-xl font-black text-white italic uppercase leading-none mb-4 text-left">{item.title}</p>
                          <div className="flex flex-wrap gap-6 text-left">
                             <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-2 font-bold"><Users size={12}/> {item.owner}</span>
                             <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-2 font-bold"><Clock size={12}/> {item.days} Days</span>
                             <span className="text-[9px] font-mono text-green-500 uppercase flex items-center gap-2 font-black italic"><TrendingDown size={12}/> {item.impact}</span>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-4">
                          <div className="text-right">
                             <div className="text-2xl font-black italic text-white leading-none">{item.cost}</div>
                             <p className="text-[8px] font-mono text-slate-600 uppercase font-bold mt-1 tracking-widest">Resource Cost Value</p>
                          </div>
                          <button className={`text-[10px] font-mono font-black uppercase italic border-b-2 pb-1 ${config.color} border-current w-fit`}>
                            View Action Framework
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* MASTER AUTH BOX */}
        <div className="bg-red-600 p-12 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-left text-black">
              <h2 className="text-5xl font-black italic uppercase leading-none mb-3">Export Master Hardening Blueprint</h2>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-90 italic text-left">Generate full spectrum remediation roadmap dossier for internal team execution.</p>
           </div>
           <button className="bg-black text-white px-16 py-8 font-black uppercase italic text-sm tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all leading-none">
                GENERATE BLUEPRINT DOSSIER →
           </button>
        </div>
      </div>
    </div>
  );
}
