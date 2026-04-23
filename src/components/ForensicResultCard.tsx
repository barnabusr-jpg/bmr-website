"use client";

import React from 'react';
import { ShieldAlert, Activity, FileText, AlertCircle } from 'lucide-react';
import TopologyMap from './TopologyMap'; 
import DossierEngine from '../lib/dossierEngine'; 

interface ResultData {
  frictionIndex: number;
  reworkTax: string;
  inactionCost: string;
  status: string;
  protocol: 'DRIFT_DIAGNOSTICS' | 'STRUCTURAL_HARDENING';
}

interface ForensicProps {
  result: ResultData;
  lens: string;
}

export default function ForensicResultCard({ result, lens }: ForensicProps) {
  const protocolDetails = {
    DRIFT_DIAGNOSTICS: {
      title: 'DRIFT DIAGNOSTICS',
      color: 'text-blue-500',
      icon: ShieldAlert,
      desc: 'A four-week de-risking engagement designed to isolate specific logic friction points.',
    },
    STRUCTURAL_HARDENING: {
      title: 'STRUCTURAL HARDENING',
      color: 'text-red-600',
      icon: Activity,
      desc: 'An eight-week architectural reinforcement of critical logic pathways.',
    }
  };

  const protocol = protocolDetails[result.protocol] || protocolDetails.STRUCTURAL_HARDENING;

  return (
    <div id="forensic-report-container" className="flex flex-col gap-0 bg-black w-full border-x border-slate-900">
      
      {/* SECTION 1: EXECUTIVE BRIEFING */}
      <div className="border-b border-slate-800 bg-[#020617] overflow-hidden font-sans text-white p-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <protocol.icon className={`h-5 w-5 ${protocol.color}`} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-black">
              BMR SOLUTIONS // {result.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-red-600 italic">
            <AlertCircle size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest font-black underline decoration-red-900/50">CONDITION_CRITICAL</span>
          </div>
        </div>

        {/* LENS METADATA */}
        <div className="mb-12 flex justify-between items-center bg-white/5 p-6 border-l-4 border-red-600">
           <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] font-black italic">Perspective_Node</span>
           </div>
           <span className="text-white font-black uppercase italic tracking-tighter text-sm bg-red-600/20 px-4 py-1">
              {lens} // LENS
           </span>
        </div>

        {/* PRIMARY SCORE */}
        <div className="mb-12">
          <h2 className="text-[100px] font-black italic uppercase tracking-tighter leading-none">
            {result.frictionIndex}<span className="text-red-600 text-4xl">/100</span>
          </h2>
          <p className="text-slate-500 text-[11px] uppercase font-mono tracking-[0.4em] font-black italic mt-2">Systemic Friction Index</p>
        </div>

        {/* FINANCIALS */}
        <div className="flex justify-between items-center py-10 border-y border-slate-900/50 mb-12">
            <div className="space-y-2">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic">Reported Rework Tax</p>
                <p className="text-4xl font-black italic text-red-600">${result.reworkTax}<span className="text-xs text-slate-500 ml-1">/YR</span></p>
            </div>
            <div className="text-right space-y-2">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic">6-Month Inaction Cost</p>
                <p className="text-4xl font-black italic text-white">${result.inactionCost}M</p>
            </div>
        </div>

        {/* RECOMMENDATION */}
        <div className="max-w-xl mb-12">
          <h4 className="text-white font-black uppercase italic mb-3 tracking-widest text-lg">PROTOCOL: {protocol.title}</h4>
          <p className="text-slate-400 text-sm italic tracking-wide leading-relaxed">
            {protocol.desc} This intervention focuses on stabilizing logic fractures to prevent further capital decay identified in the {lens} node.
          </p>
        </div>

        {/* PDF TRIGGER (v7.5) */}
        <button 
          onClick={() => DossierEngine.generate(result, lens)}
          className="w-full bg-red-600 text-white font-black py-8 uppercase text-sm tracking-[0.4em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
        >
          <FileText size={20} /> Download Final Forensic Briefing
        </button>
      </div>

      {/* SECTION 2: LIVE TOPOLOGY ENGINE */}
      <div className="bg-black border-t border-slate-800">
        <TopologyMap sfiScore={result.frictionIndex} />
        <div className="px-12 pb-12 bg-black">
           <p className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em] italic">Exhibit_B // Live Logic Topology // Normalized to Ideal State</p>
        </div>
      </div>
      
    </div>
  );
}
