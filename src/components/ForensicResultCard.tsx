"use client";

import React from 'react';
import { ShieldAlert, Activity, FileText, AlertCircle } from 'lucide-react';
import TopologyMap from './TopologyMap'; 
import { jsPDF } from 'jspdf'; // WE IMPORT THE ENGINE DIRECTLY HERE

export default function ForensicResultCard({ result, lens }: any) {
  const protocolDetails: any = {
    DRIFT_DIAGNOSTICS: { title: 'DRIFT DIAGNOSTICS', color: 'text-blue-500', icon: ShieldAlert },
    STRUCTURAL_HARDENING: { title: 'STRUCTURAL HARDENING', color: 'text-red-600', icon: Activity }
  };

  const protocol = protocolDetails[result.protocol] || protocolDetails.STRUCTURAL_HARDENING;

  // --- THE INTERNALIZED ARCHITECT ENGINE (v4.0) ---
  const handleDownload = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const timestamp = new Date().toLocaleString();

    // --- PAGE 1: EXECUTIVE SUMMARY ---
    doc.setFillColor(2, 6, 23); // BMR Slate
    doc.rect(0, 0, 210, 297, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // BMR Red
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 20, 70);
    doc.text(`REWORK TAX: $${result.reworkTax || '1.1'}M / YR`, 20, 85);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text(`INTERNAL USE // GENERATED: ${timestamp} // PAGE_01`, 20, 285);

    // --- PAGE 2: EXHIBIT B (THE GUARANTEED BREAK) ---
    doc.addPage();
    doc.setFillColor(2, 6, 23);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("EXHIBIT B // TOPOLOGY MAP", 20, 30);
    
    // Draw the Topology Triangle Manually
    doc.setDrawColor(220, 38, 38);
    doc.line(105, 60, 50, 150); 
    doc.line(105, 60, 160, 150);
    doc.line(50, 150, 160, 150);

    doc.setFontSize(7);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    // Create a Blob to force a fresh, un-cached memory stream
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div id="forensic-report-container" className="flex flex-col bg-black">
      <div className="border border-slate-800 bg-[#020617] min-h-[1050px] p-12 text-white">
        <div className="flex justify-between items-center mb-10">
           <h1 className="text-2xl font-black text-red-600 italic uppercase">BMR SOLUTIONS // FORENSIC</h1>
           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{lens} // LENS</span>
        </div>

        <div className="mb-20 text-center">
           <h2 className="text-[120px] font-black italic uppercase leading-none tracking-tighter">
             {result.frictionIndex}<span className="text-red-600 text-5xl">/100</span>
           </h2>
           <p className="text-slate-500 font-mono tracking-[0.4em] uppercase text-[12px]">Systemic Friction Index</p>
        </div>

        {/* v4.0 TRIGGER - BYPASSES ALL EXTERNAL LIB FILES */}
        <button 
          onClick={handleDownload}
          className="w-full bg-red-600 text-white font-black py-8 uppercase text-sm tracking-[0.4em] hover:bg-white hover:text-black transition-all border border-red-600 flex items-center justify-center gap-3"
        >
          <FileText size={20} /> Download Forensic Dossier (v4.0)
        </button>
      </div>

      <div className="min-h-[1050px] bg-black border border-slate-800 p-12">
        <TopologyMap sfiScore={result.frictionIndex} />
        <p className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em] mt-8">Exhibit_B // Page_02</p>
      </div>
    </div>
  );
}
