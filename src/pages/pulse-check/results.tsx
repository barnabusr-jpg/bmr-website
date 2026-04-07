"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldAlert, FileText, ArrowRight, Activity, Download } from "lucide-react";
import jsPDF from "jspdf"; // 👈 Now active via your package.json
import { format } from "date-fns";

export default function DiagnosticResults() {
  const router = useRouter();
  const { score } = router.query;
  const [riskData, setRiskData] = useState({ tier: "ANALYZING", color: "text-slate-500", desc: "" });

  useEffect(() => {
    const s = Number(score) || 0;
    if (s > 100) {
      setRiskData({ tier: "TERMINAL", color: "text-red-600", desc: "SYSTEMIC LOGIC SHEAR DETECTED. IMMEDIATE INTERVENTION REQUIRED." });
    } else if (s > 50) {
      setRiskData({ tier: "CRITICAL", color: "text-orange-500", desc: "HIGH-VELOCITY FRICTION DETECTED IN OPERATIONAL ARRAYS." });
    } else {
      setRiskData({ tier: "MONITORED", color: "text-green-500", desc: "LOGIC GATES ARE FUNCTIONAL. CONTINUOUS MONITORING ADVISED." });
    }
  }, [score]);

  // 🛡️ THE EXECUTION LOGIC: Generates the branded BMR Indictment
  const downloadIndictment = () => {
    const doc = new jsPDF();
    const timestamp = format(new Date(), "yyyy-MM-dd HH:mm");
    const finalScore = score || "0";

    // Style: Dark Mode Forensic
    doc.setFillColor(2, 6, 23); 
    doc.rect(0, 0, 210, 297, "F");

    // Header
    doc.setTextColor(220, 38, 38);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("BMR FORENSIC INDICTMENT", 20, 40);

    // Meta Data
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("courier", "bold");
    doc.text(`DATE_STAMP: ${timestamp}`, 20, 55);
    doc.text(`RISK_STATUS: ${riskData.tier}`, 20, 62);
    doc.text(`INTENSITY_SCORE: ${finalScore}/150`, 20, 69);

    doc.setDrawColor(220, 38, 38);
    doc.line(20, 80, 190, 80);

    // Body
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.text("EXECUTIVE SUMMARY:", 20, 95);
    doc.setFont("helvetica", "normal");
    doc.text(riskData.desc, 20, 105, { maxWidth: 170 });

    // Footer
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(8);
    doc.text("CLASSIFIED // BMR_ADVISORY_SECURITY_PROTOCOL_7", 20, 280);

    doc.save(`BMR_Indictment_${riskData.tier}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-48 px-6 container mx-auto max-w-4xl text-center pb-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center gap-3 text-red-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
              <Activity size={14} className="animate-pulse" /> DIAGNOSTIC_COMPLETE // RECON_SUCCESS
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              Risk <span className="text-red-600">Report</span>
            </h1>
          </div>

          <div className="bg-slate-950/50 border border-slate-900 p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            <div className="space-y-6">
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Calculated Intensity Level:</p>
              <h2 className={`text-7xl md:text-9xl font-black italic uppercase tracking-tighter ${riskData.color}`}>
                {riskData.tier}
              </h2>
              <p className="text-slate-400 font-bold uppercase text-sm tracking-widest max-w-md mx-auto italic leading-relaxed">
                {riskData.desc}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 🛡️ NOW FUNCTIONAL: Triggers the PDF Generation */}
            <div 
              onClick={downloadIndictment} 
              className="bg-red-600 p-10 text-left space-y-6 group cursor-pointer hover:bg-white transition-all shadow-lg"
            >
              <FileText className="text-white group-hover:text-red-600" size={40} />
              <h3 className="text-2xl font-black uppercase italic text-white group-hover:text-black leading-none tracking-tighter">Download Board-Level Indictment (PDF)</h3>
              <button className="flex items-center gap-2 text-white group-hover:text-red-600 font-black font-mono text-[10px] uppercase tracking-[0.2em]">
                Secure_Download <Download size={14} />
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-10 text-left space-y-6 hover:border-red-600 transition-all group">
              <ShieldAlert className="text-red-600" size={40} />
              <h3 className="text-2xl font-black uppercase italic text-white leading-none tracking-tighter text-[1.4rem]">Schedule Forensic Consultation</h3>
              <button onClick={() => window.location.href='mailto:hello@bmradvisory.co'} className="flex items-center gap-2 text-red-600 font-black font-mono text-[10px] uppercase tracking-[0.2em] group-hover:text-white">
                Request Briefing <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
