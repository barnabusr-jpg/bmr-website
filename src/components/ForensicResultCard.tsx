import React from 'react';
import { ShieldAlert, Activity, FileText, AlertCircle } from 'lucide-react';

export default function ForensicResultCard({ result, lens }: any) {
  const protocolDetails: any = {
    DRIFT_DIAGNOSTICS: {
      title: 'DRIFT DIAGNOSTICS',
      color: 'text-blue-500',
      icon: ShieldAlert,
      desc: '4-week de-risking engagement to isolate friction points.',
    },
    STRUCTURAL_HARDENING: {
      title: 'STRUCTURAL HARDENING',
      color: 'text-red-600',
      icon: Activity,
      desc: '8-week architectural reinforcement of logic pathways.',
    }
  };

  const protocol = protocolDetails[result.protocol] || protocolDetails.STRUCTURAL_HARDENING;

  return (
    <div className="border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl font-sans text-white">
      {/* 🟢 HEADER SECTION */}
      <div className="p-10 border-b border-slate-900 bg-slate-900/20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <protocol.icon className={`h-5 w-5 ${protocol.color}`} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-black">
              FORENSIC_AUDIT // {result.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-red-600 animate-pulse">
            <AlertCircle size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest font-black">SYSTEM_DECAY_CRITICAL</span>
          </div>
        </div>

        {/* 🔍 THE LENS ROW: Physically anchored in the UI */}
        <div className="mb-10 flex justify-between items-center bg-white/5 p-5 border-l-4 border-red-600">
           <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] font-black">Perspective_Node</span>
           </div>
           <span className="text-white font-black uppercase italic tracking-tighter text-sm bg-red-600/20 px-3 py-1">
              {lens} // LENS
           </span>
        </div>

        <div className="flex items-end gap-4 mb-2">
          <h2 className="text-7xl font-black italic uppercase tracking-tighter">
            {result.frictionIndex}<span className="text-red-600 text-3xl">/100</span>
          </h2>
        </div>
        <p className="text-slate-500 text-[10px] uppercase font-mono tracking-[0.3em] font-black">Systemic Friction Index</p>
      </div>

      {/* 📊 METRICS SECTION */}
      <div className="p-10 bg-slate-950">
        <div className="flex justify-between items-center mb-10 pb-10 border-b border-slate-900/50">
            <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic text-slate-500">Identified Rework Tax</p>
                <p className="text-2xl font-black italic text-red-600">$1.1M/yr</p>
            </div>
            <div className="text-right space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic text-slate-500">6-Month Inaction Cost</p>
                <p className="text-2xl font-black italic text-white">$0.62M</p>
            </div>
        </div>

        <h4 className="text-white font-black uppercase italic mb-2 tracking-tight">RECOMMENDED: {protocol.title}</h4>
        <p className="text-slate-500 text-xs italic tracking-wide mb-8 leading-relaxed max-w-md">{protocol.desc}</p>

        <button className="w-full bg-red-600 text-white font-black py-6 uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3 shadow-xl">
          <FileText size={18} /> Download Forensic Briefing
        </button>
      </div>
    </div>
  );
}
