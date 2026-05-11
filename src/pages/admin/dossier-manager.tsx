"use client";
import React, { useState, useEffect } from "react";
import { Activity, User, Download, ShieldCheck, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function DossierManager() {
  const [audits, setAudits] = useState<any[]>([]);
  // 🏛️ OFFICIAL BRAND SEAL URL
  const CHEVRON_URL = "https://jxjoyuyonulthsypiami.supabase.co/storage/v1/object/public/Assets/Chevron%20Transperent.png";

  useEffect(() => {
    const fetchAudits = async () => {
      const { data } = await supabase.from('audits').select('*, operators(*)').order('created_at', { ascending: false });
      if (data) setAudits(data);
    };
    fetchAudits();
  }, []);

  // 🛡️ THE PDF EXPORT ENGINE
  const generateForensicPDF = async (audit: any, offer: any) => {
    const element = document.getElementById(`audit-card-${audit.id}`);
    if (!element) return;

    // Capture the UI component at high resolution (3x scale for print quality)
    const canvas = await html2canvas(element, {
      backgroundColor: "#020617",
      scale: 3,
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    
    // 1. HEADER RECTANGLE (BMR Branding)
    pdf.setFillColor(2, 6, 23); // Slate-950
    pdf.rect(0, 0, pdfWidth, 50, "F");
    
    // 2. INSERT METALLIC CHEVRON SEAL
    pdf.addImage(CHEVRON_URL, "PNG", pdfWidth - 40, 10, 30, 30);

    // 3. HEADER TYPOGRAPHY
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(255, 255, 255);
    pdf.text("BMR // FORENSIC_VERDICT", 15, 25);
    
    pdf.setFontSize(8);
    pdf.setFont("courier", "bold");
    pdf.setTextColor(220, 38, 38); // Red-600
    pdf.text(`FILE_REF: ${audit.id.toUpperCase()}`, 15, 35);
    pdf.setTextColor(100, 116, 139); // Slate-500
    pdf.text(`ISSUED: ${new Date().toLocaleString().toUpperCase()}`, 15, 40);

    // 4. THE DATA CONTENT (The Audit Card)
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * (pdfWidth - 30)) / imgProps.width;
    pdf.addImage(imgData, "PNG", 15, 60, pdfWidth - 30, imgHeight);

    // 5. SECURITY WATERMARK (Subtle background Chevron)
    pdf.setGState(new pdf.GState({ opacity: 0.04 }));
    pdf.addImage(CHEVRON_URL, "PNG", pdfWidth / 4, 120, 110, 110);

    // 6. FOOTER COMPLIANCE
    pdf.setGState(new pdf.GState({ opacity: 1 }));
    pdf.setFontSize(7);
    pdf.setTextColor(51, 65, 85);
    pdf.text("THIS DOCUMENT CONTAINS PROPRIETARY INTELLECTUAL PROPERTY. UNAUTHORIZED SHARING PROHIBITED.", 15, 285);
    pdf.text("VERIFIED VIA BMR_STRUCTUREAL_HARDENING_PROTOCOL_V2", 15, 289);

    pdf.save(`BMR_DOSSIER_${audit.org_name || "LEAD"}.pdf`);
  };

  const calculateOffer = (audit: any) => {
    const reworkTax = 400000; 
    const penalty = 120000;
    const intervention = 75000;
    return { reworkTax, penalty, intervention };
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans italic selection:bg-red-600/30 font-black uppercase">
      {/* --- PAGE HEADER --- */}
      <div className="mb-12 border-b border-slate-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">BMR // DOSSIER_COMMAND</h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] mt-2 font-black">ACTIVE_FIDUCIARY_LEADS // PROPOSED_INTERVENTION_PRICING</p>
        </div>
        <div className="flex items-center gap-3 text-red-600">
           <ShieldCheck size={20} />
           <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1 uppercase italic">ADMIN_CLEARANCE_07</span>
        </div>
      </div>

      {/* --- DOSSIER LIST --- */}
      <div className="grid gap-8">
        {audits.map((audit) => {
          const offer = calculateOffer(audit);
          return (
            <div 
              id={`audit-card-${audit.id}`} 
              key={audit.id} 
              className="bg-slate-950 border-2 border-slate-900 p-8 flex flex-col lg:flex-row justify-between gap-8 hover:border-red-600 transition-all shadow-2xl relative"
            >
              <div className="space-y-4 min-w-[250px]">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-red-600" />
                  <span className="font-black uppercase text-xl tracking-tighter text-white italic">{audit.org_name || "PENDING_SIGNAL"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] uppercase tracking-widest font-bold italic">
                  <User size={14} /> {audit.operators?.[0]?.full_name || "UNKNOWN_OPERATOR"}
                </div>
                <div className="inline-block bg-red-600/10 border border-red-600/20 px-3 py-1 text-[9px] font-mono text-red-500 uppercase font-black italic">
                  NODE: {audit.operators?.[0]?.persona_type || "UNDEFINED"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 flex-grow lg:border-x border-slate-900 lg:px-8 italic">
                <div>
                  <p className="text-[9px] font-mono text-slate-600 uppercase mb-2 font-black tracking-widest italic">Rework_Tax_Leak</p>
                  <p className="text-3xl font-black italic text-white italic">${(offer.reworkTax / 1000).toFixed(0)}K<span className="text-xs text-slate-800">/YR</span></p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-slate-600 uppercase mb-2 font-black tracking-widest text-red-600 italic">Inaction_Penalty</p>
                  <p className="text-3xl font-black italic text-red-600 italic">${(offer.penalty / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="bg-white/5 p-6 border-l-4 border-red-600 min-w-[300px] flex flex-col justify-between italic">
                <div>
                    <p className="text-[9px] font-mono text-red-500 uppercase mb-2 font-black tracking-widest italic">Proposed_Intervention</p>
                    <div className="flex items-end gap-2 italic">
                        <p className="text-4xl font-black italic text-white leading-none italic">${(offer.intervention / 1000).toFixed(0)}K</p>
                        <span className="text-[9px] font-mono text-slate-600 uppercase mb-1 font-bold italic">ENGAGEMENT_FEE</span>
                    </div>
                </div>
                
                {/* 🛡️ PDF EXPORT TRIGGER */}
                <button 
                  onClick={() => generateForensicPDF(audit, offer)}
                  className="mt-6 w-full bg-red-600 text-white py-3 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 italic"
                >
                  GENERATE_FORENSIC_DOSSIER <Download size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
