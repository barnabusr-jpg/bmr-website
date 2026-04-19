"use client";

import React from 'react';
import { ShieldAlert, Activity, FileText, AlertCircle } from 'lucide-react';
import TopologyMap from './TopologyMap'; 
import { jsPDF } from 'jspdf'; // Direct dependency

export default function ForensicResultCard({ result, lens }: any) {
  const protocolDetails: any = {
    DRIFT_DIAGNOSTICS: { title: 'DRIFT DIAGNOSTICS', color: 'text-blue-500', icon: ShieldAlert },
    STRUCTURAL_HARDENING: { title: 'STRUCTURAL HARDENING', color: 'text-red-600', icon: Activity }
  };

  const protocol = protocolDetails[result.protocol] || protocolDetails.STRUCTURAL_HARDENING;

  // --- INTERNAL PDF ENGINE (v3.0 - BMR SOLUTIONS) ---
  const handleDownload = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const timestamp = new Date().toLocaleString();

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); // Dark Slate
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // BMR Red
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 20, 70);
    doc.text(`REWORK TAX: $${result.reworkTax || '1.1'}M / YR`, 20, 82);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text(`INTERNAL USE ONLY // TIMESTAMP: ${timestamp} // PAGE_01`, 20, 285);

    // --- PAGE 2: EXHIBIT B (The Hard Break) ---
    doc.addPage();
    doc.setFillColor(2, 6, 23);
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("EXHIBIT B // TOPOLOGY MAP", 20, 30);
    
    // Draw Triangle Map (No snapshot needed)
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(105, 60, 50, 150); 
    doc.line(105, 60, 160, 150);
    doc.line(50, 150, 160, 150);

    doc.setFontSize(8);
    doc.text("NODE_01: HUMAN ALIGNMENT", 80, 55);
    doc.text("NODE_02: BUSINESS VALUE", 25, 158);
    doc.text("NODE_03: SAFE EVOLUTION", 145, 158);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    // Generate Blob and Open
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div id="forensic-report-container" className="flex flex-col bg-black">
      <div className="border border-slate-800 bg-[#020617] min-h-[1050px] p-12 text-white flex flex-col">
        <div className="flex justify-between items-center mb-10">
           <h1 className="text-2xl font-black text-red-600 italic">BMR SOLUTIONS // FORENSIC</h1>
           <span className="text-[10px] font-mono text-slate-500 uppercase">{lens} // LENS</span>
        </div>

        <div className="mb-20">
           <h2 className="text-[100px] font-black italic uppercase leading-none tracking-tighter">
             {result.frictionIndex}<span className="text-red-600 text-4xl">/100</span>
           </h2>
           <p className="text-slate-500 font-mono tracking-[0.4em] uppercase text-[10px]">Systemic Friction Index</p>
        </div>

        {/* FINANCIAL DATA PREVIEW */}
        <div className="grid grid-cols-2 gap-8 mb-12 border-y border-slate-900 py-12">
            <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Rework Tax</p>
                <p className="text-4xl font-black italic text-red-600">${result.reworkTax || '1.1'}M</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Inaction Cost</p>
                <p className="text-4xl font-black italic text-white">${result.inactionCost || '0.62'}M</p>
            </div>
        </div>

        <div className="flex-grow">
          <button 
            onClick={handleDownload}
            className="w-full bg-red-600 text-white font-black py-8 uppercase text-sm tracking-[0.4em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3"
          >
            <FileText size={20} /> Download Final Forensic Briefing (v3.0)
          </button>
        </div>
      </div>

      <div className="min-h-[1050px] bg-black border border-slate-800 p-24 flex items-center justify-center">
        <TopologyMap sfiScore={result.frictionIndex} />
      </div>
    </div>
  );
}
