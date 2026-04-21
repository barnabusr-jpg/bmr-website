"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Key, Activity, BarChart3, Fingerprint, Building2, Download, CheckCircle, Zap } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import jsPDF from "jspdf";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any[]>([]);

  // --- PDF GENERATOR: BMR SOLUTIONS BRANDING ---
  const generateForensicReport = (audit: any) => {
    const doc = new jsPDF();
    const sfi = audit.sfi_score || 0;
    const org = audit.org_name || "BMR_ENTITY";

    // 1. Forensic Header
    doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 50, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold"); doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC VERDICT", 15, 25);
    doc.setFont("courier", "normal"); doc.setFontSize(8);
    doc.text(`AUDIT_ID: ${audit.id.substring(0, 8).toUpperCase()} // STATUS: PUBLISHED`, 15, 35);
    doc.text(`ENTITY: ${org.toUpperCase()} // LEDGER_VERIFIED: TRUE`, 15, 40);

    // 2. Narrative
    doc.setTextColor(2, 6, 23); doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text("01 // THE PROMISE GAP™ ANALYSIS", 15, 65);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text(`Your SFI of ${sfi}% indicates a major fracture between strategic intent and operational reality.`, 15, 75);
    
    // 3. Data Box
    doc.setFillColor(245, 245, 245); doc.rect(15, 85, 180, 45, "F");
    doc.setTextColor(220, 38, 38); doc.setFontSize(24); doc.setFont("helvetica", "bold");
    doc.text(`$${Number(audit.rework_tax).toFixed(1)}M`, 25, 110);
    doc.setTextColor(2, 6, 23); doc.setFontSize(9); doc.setFont("courier", "bold");
    doc.text("VALIDATED ANNUAL HEMORRHAGE", 25, 120);
    doc.setFontSize(24); doc.text(`${sfi}%`, 130, 110);
    doc.setFontSize(9); doc.text("SYSTEMIC FRICTION INDEX", 130, 120);

    // 4. Stabilization Architecture
    doc.setFontSize(12); doc.setFont("helvetica", "bold");
    doc.text("02 // STABILIZATION ARCHITECTURE (FIELD GUIDE REF)", 15, 145);
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    doc.text("- HAI (The Trust Lens): Anchor adoption by ensuring transparency and empathy.", 15, 155);
    doc.text("- AVS (The Govern Lens): Establish the governing mechanism for mission value.", 15, 163);
    doc.text("- IGF (The Evolve Lens): Implement the safeguard loop to enable rapid evolution.", 15, 171);

    // 5. Directives
    doc.setFontSize(12); doc.setFont("helvetica", "bold");
    doc.text("03 // HARDENING DIRECTIVES", 15, 185);
    let yPos = 195;
    audit.fractures?.slice(0, 3).forEach((f: any) => {
      doc.setFontSize(8); doc.setFont("courier", "bold"); doc.setTextColor(220, 38, 38);
      doc.text(`[${f.id.toUpperCase()}]`, 15, yPos);
      doc.setTextColor(2, 6, 23); doc.setFont("helvetica", "normal");
      doc.text(f.directive, 15, yPos + 5, { maxWidth: 180 });
      yPos += 15;
    });

    doc.save(`BMR_Solutions_Verdict_${org.replace(/\s/g, '_')}.pdf`);
  };

  const fetchLedger = useCallback(async () => {
    // UPDATED: Points to 'audits' table for the full data set
    const { data: audits, error } = await supabase
        .from('audits')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) console.error("FETCH_ERROR:", error);
    setData(audits || []);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchLedger();
  }, [isAuthenticated, fetchLedger]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 placeholder:text-slate-900" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all text-lg">INITIALIZE_COMMAND</button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-10 pt-32 font-sans tracking-tighter">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b border-slate-900 z-50 px-10 flex items-center gap-5">
        <Activity className="text-red-600" size={24} />
        <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">BMR_Solutions_Command_Center</span>
      </nav>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative overflow-hidden">
            <BarChart3 className="absolute top-6 right-6 text-red-600 opacity-20" />
            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-6 italic tracking-widest">Cumulative_Rework_Tax</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">${data.reduce((a, c) => a + (Number(c.rework_tax) || 0), 0).toFixed(1)}M</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative overflow-hidden">
            <Fingerprint className="absolute top-6 right-6 text-slate-500 opacity-20" />
            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-6 italic tracking-widest">Active_Signals</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.length}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-[10px] text-slate-600 uppercase tracking-[0.3em] border-b border-slate-900">
                <th className="p-10">Entity</th>
                <th className="p-10 text-center">Status</th>
                <th className="p-10 text-right">Rework_Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data.map((audit) => (
                <tr key={audit.id} className="hover:bg-white/[0.02] transition-all align-top">
                  <td className="p-10">
                    <div className="flex items-center gap-6">
                      <Building2 size={32} className="text-red-600" />
                      <div>
                        <div className="font-black text-white uppercase text-3xl italic tracking-tighter">{audit.org_name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-1">{audit.lead_email}</div>
                        
                        {audit.status === 'COMPLETE' && (
                           <button 
                            onClick={() => generateForensicReport(audit)}
                            className="mt-4 px-6 py-2 bg-white text-black font-black uppercase text-[9px] italic flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all"
                           >
                             <Download size={12} /> Download_Forensic_Field_Guide
                           </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-10 text-center">
                    {audit.status === 'COMPLETE' ? (
                        <div className="flex items-center justify-center gap-2 text-green-500 text-[10px] font-black uppercase italic tracking-widest">
                            <CheckCircle size={14} /> Result_Published
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-yellow-500 text-[10px] font-black uppercase italic tracking-widest">
                            <Zap size={14} className="animate-pulse" /> Active_Synthesis
                        </div>
                    )}
                  </td>
                  <td className="p-10 text-right font-black text-white italic text-5xl tracking-tighter">
                    ${Number(audit.rework_tax || 0).toFixed(1)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
