"use client";

import React from 'react';
import { ShieldAlert, Activity, FileText, AlertCircle } from 'lucide-react';
import TopologyMap from './TopologyMap'; 

export default function ForensicResultCard({ result, lens }: any) {
  const protocolDetails: any = {
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
    <div id="forensic-report-container" className="flex flex-col gap-0 bg-black">
      
      {/* PAGE 1: EXECUTIVE DIAGNOSTIC SUMMARY */}
      <div className="border border-slate-800 bg-[#020617] overflow-hidden font-sans text-white min-h-[1050px] flex flex-col">
        {/* HEADER */}
        <div className="p-12 border-b border-slate-900 bg-slate-900/20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <protocol.icon className={`h-5 w-5 ${protocol.color}`} />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-black">
                BMR SOLUTIONS // {result.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-red-600 italic">
              <AlertCircle size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest font-black">CONDITION_CRITICAL</span>
            </div>
          </div>

          {/* PERSPECTIVE NODE */}
          <div className="mb-12 flex justify-between items-center bg-white/5 p-6 border-l-4 border-red-600">
             <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] font-black italic">Perspective_Node</span>
             </div>
             <span className="text-white font-black uppercase italic tracking-tighter text-sm bg-red-600/20 px-4 py-1">
                {lens} // LENS
             </span>
          </div>

          <div className="flex items-end gap-4 mb-3">
            <h2 className="text-[100px] font-black italic uppercase tracking-tighter leading-none">
              {result.frictionIndex}<span className="text-red-600 text-4xl">/100</span>
            </h2>
          </div>
          <p className="text-slate-500 text-[11px] uppercase font-mono tracking-[0.4em] font-black italic">Systemic Friction Index</p>
        </div>

        {/* METRICS & ACTION */}
        <div className="p-12 space-y-12 flex-grow">
          <div className="flex justify-between items-center pb-12 border-b border-slate-900/50">
              <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic">Reported Rework Tax</p>
                  <p className="text-4xl font-black italic text-red-600">$1.1M<span className="text-xs text-slate-500 ml-1">/YR</span></p>
              </div>
              <div className="text-right space-y-2">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic">6-Month Inaction Cost</p>
                  <p className="text-4xl font-black italic text-white">$0.62M</p>
              </div>
          </div>

          <div className="max-w-xl">
            <h4 className="text-white font-black uppercase italic mb-3 tracking-widest text-lg">RECOMMENDED: {protocol.title}</h4>
            <p className="text-slate-500 text-sm italic tracking-wide leading-relaxed mb-10">
              {protocol.desc} This intervention focuses on stabilizing reported fractures to prevent further capital decay.
            </p>
          </div>

          {/* CTA: ONLY VISIBLE ON WEB, HIDDEN IN PDF */}
          <div className="print:hidden">
            <button className="w-full bg-red-600 text-white font-black py-6 uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3">
              <FileText size={18} /> Download Forensic Briefing
            </button>
          </div>
        </div>
        
        <div className="p-12 pt-0">
           <p className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em]">End_Section // Page_01</p>
        </div>
      </div>

      {/* PAGE BREAK: ESSENTIAL FOR PDF GENERATION */}
      <div className="html2pdf__page-break h-0 w-full" />

      {/* PAGE 2: FORENSIC TOPOLOGY EXHIBIT */}
      <div className="min-h-[1050px] bg-black border border-slate-800 flex flex-col">
        <TopologyMap sfiScore={result.frictionIndex} />
        <div className="p-12 pt-0 flex-grow bg-black">
           <p className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em] mt-8">Exhibit_B // Page_02</p>
        </div>
      </div>
      
    </div>
  );
}
