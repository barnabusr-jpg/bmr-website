"use client";

import React from 'react';
import { ShieldAlert, Activity, FileText, AlertCircle } from 'lucide-react';
import TopologyMap from './TopologyMap'; 
import ForensicPDFGenerator from '@/lib/pdfGenerator';

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
    <div id="forensic-report-container" className="flex flex-col gap-0 bg-black w-full">
      
      {/* PAGE 1: EXECUTIVE DIAGNOSTIC SUMMARY */}
      <div className="border border-slate-800 bg-[#020617] overflow-hidden font-sans text-white min-h-[1050px] flex flex-col">
        {/* ... (Keep your Header, Perspectives, and Index code here) ... */}

        {/* CTA BUTTON: THE ARCHITECT TRIGGER */}
        <div className="p-12 pt-0 print:hidden">
          <button 
            onClick={async () => {
              // Pass the data directly to the generator
              const url = await ForensicPDFGenerator.generate(result, lens);
              // Open in new tab to force a fresh render
              window.open(url, '_blank');
            }}
            className="w-full bg-red-600 text-white font-black py-6 uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3"
          >
            <FileText size={18} /> Download Forensic Briefing
          </button>
        </div>
      </div>

      {/* PAGE 2: FORENSIC TOPOLOGY EXHIBIT (Web-view only) */}
      <div className="min-h-[1050px] bg-black border border-slate-800 flex flex-col">
        <TopologyMap sfiScore={result.frictionIndex} />
        <div className="p-12 pt-0 flex-grow bg-black">
           <p className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em] mt-8">Exhibit_B // Page_02</p>
        </div>
      </div>
    </div>
  );
}
