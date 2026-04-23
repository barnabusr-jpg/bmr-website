"use client";
import React from "react";
import { useRouter } from 'next/router';
import { 
  Zap, Shield, Gavel, Wrench, ArrowLeft, 
  CheckCircle2, Clock, Users, ChevronRight, 
  TrendingDown, Target, BarChart3
} from "lucide-react";

export default function TacticalProtocolMatrix() {
  const router = useRouter();
  const { id } = router.query;

  const QUADRANTS: any = {
    IMMEDIATE: { label: "Immediate_Remediation", color: "text-red-500", border: "border-red-900/40", icon: Zap, desc: "High-velocity fixes to stop capital leakage." },
    STRUCTURAL: { label: "Structural_Hardening", color: "text-blue-500", border: "border-blue-900/40", icon: Wrench, desc: "Core engineering rebuilds to eliminate drift." },
    GOVERNANCE: { label: "Governance_Overlay", color: "text-purple-500", border: "border-purple-900/40", icon: Gavel, desc: "Legal and executive indemnity alignment." },
    FORENSIC: { label: "Forensic_Continuity", color: "text-green-500", border: "border-green-900/40", icon: Shield, desc: "Long-term monitoring and snapshots." }
  };

  const PROTOCOLS = [
    { quad: 'IMMEDIATE', title: 'Deploy SIEM Forensic Logging', owner: 'DevOps', days: '3', impact: '40% Risk Reduc.', cost: '$25K' },
    { quad: 'GOVERNANCE', title: 'Align Executive Indemnity Clauses', owner: 'Legal', days: '14', impact: '25% Risk Reduc.', cost: '$15K' },
    { quad: 'STRUCTURAL', title: 'Rebuild Hardened Data Pipeline', owner: 'Engineering', days: '30', impact: '30% Risk Reduc.', cost: '$85K' },
    { quad: 'FORENSIC', title: 'Automate Anomaly Snapshots', owner: 'CTO', days: '90', impact: 'Continuity', cost: '$10K/mo' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10 font-sans tracking-tighter leading-none text-left">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end border-b border-slate-900 pb-10 mb-16">
          <div>
            <h1 className="text-red-600 text-5xl font-black uppercase italic tracking-tighter">Tactical_Roadmap</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic">Phase: Hardening_Execution // Triangulation_Ref: {id?.toString().slice(0,8)}</p>
          </div>
          <button onClick={() => router.back()} className="flex items-center gap-3 text-slate-500 hover:text-white transition-all text-[10px] font-mono font-black uppercase tracking-widest border border-slate-800 px-8 py-5">
            <ArrowLeft size={14} /> Back_to_Dossier
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20 text-left">
          {Object.keys(QUADRANTS).map((qKey) => {
            const config = QUADRANTS[qKey];
            const items = PROTOCOLS.filter(p => p.quad === qKey);
            const Icon = config.icon;
            return (
              <div key={qKey} className={`bg-slate-950 border ${config.border} p-10 relative overflow-hidden group text-left`}>
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div className="text-left">
                      <p className={`text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-2 ${config.color}`}>{qKey}_REMEDIATION</p>
                      <h3 className="text-3xl font-black italic uppercase text-white leading-none">{config.label.replace('_', ' ')}</h3>
                      <p className="text-slate-500 text-[10px] uppercase font-bold mt-4 tracking-widest italic">{config.desc}</p>
                   </div>
                   <Icon size={48} className={`${config.color} opacity-20`} />
                </div>
                <div className="space-y-4 relative z-10 text-left">
                  {items.map((item, idx) => (
                    <div key={idx} className="bg-black/60 border border-slate-900 p-8 flex flex-col md:flex-row justify-between items-center hover:border-slate-700 transition-all gap-8">
                       <div className="flex items-center gap-8 flex-1 text-left">
                          <div className={`w-[2px] h-16 ${config.color.replace('text', 'bg')}`} />
                          <div className="text-left">
                            <p className="text-xl font-black text-white italic uppercase leading-none mb-4">{item.title}</p>
                            <div className="flex flex-wrap gap-6">
                               <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-2 font-bold"><Users size={12}/> {item.owner}</span>
                               <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-2 font-bold"><Clock size={12}/> {item.days} Days</span>
                               <span className="text-[9px] font-mono text-green-500 uppercase flex items-center gap-2 font-black italic"><TrendingDown size={12}/> {item.impact}</span>
                            </div>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-4 min-w-[150px]">
                          <div className="text-right">
                             <div className="text-2xl font-black italic text-white leading-none">{item.cost}</div>
                             <p className="text-[8px] font-mono text-slate-600 uppercase font-bold mt-1">Est_Fee</p>
                          </div>
                          <button className={`text-[10px] font-mono font-black uppercase italic border-b-2 pb-1 ${config.color} border-current`}>Authorize</button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-red-600 p-12 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-left text-black">
              <h2 className="text-5xl font-black italic uppercase leading-none mb-3">Authorize_Master_Hardening</h2>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-90 italic">Commence full-spectrum remediation roadmap.</p>
           </div>
           <button className="bg-black text-white px-16 py-8 font-black uppercase italic text-sm tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all leading-none">
                APPROVE_ALL_DIRECTIVES →
           </button>
        </div>
      </div>
    </div>
  );
}
