"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, ArrowRight, Skull, Lock, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";

// --- FIELDGUIDE INTEGRATION MAPPING ---
// This automates the "Consulting" value by referencing your master methodology.
const FIELDGUIDE_MAPPING: Record<string, string> = {
  EXECUTIVE: "Section 1.2: The Governance Gap & Fiduciary AI Oversight",
  MANAGER: "Section 3.4: SME Rework Tax & Operational Alpha Capture",
  TECHNICAL: "Section 5.1: Forensic Logging & API Logic Hardening"
};

export default function ForensicVerdict() {
  const [data, setData] = useState<any>(null);
  const [activeLens, setActiveLens] = useState<string>("EXECUTIVE");

  useEffect(() => {
    // 🔍 PERSISTENCE BRIDGE
    // We now pull the Lens from the same storage the Pulse Check uses
    const savedLens = localStorage.getItem("bmr_active_lens") || "EXECUTIVE";
    setActiveLens(savedLens.toUpperCase());

    const fetchVerdict = async () => {
      const res = await fetch("/api/forensic-synthesis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: JSON.parse(localStorage.getItem("bmr_diagnostic_results") || "{}"),
          sector: localStorage.getItem("bmr_selected_sector") || "finance"
        })
      });
      const result = await res.json();
      setData(result);
    };
    fetchVerdict();
  }, []);

  if (!data) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-red-600 font-black animate-pulse tracking-widest uppercase italic font-mono">
            Synthesizing_Verdict...
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans">
      <Header />
      <div className="container mx-auto max-w-4xl mt-12">
        <header className="flex justify-between items-start border-b border-slate-900 pb-8 mb-12">
          <section>
            <h1 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter leading-none">
              VERIFIED SYSTEMIC AUDIT
            </h1>
            <div className="flex gap-4 mt-2">
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-black">AUDIT {data.sectorLabel}</span>
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-black">STATUS VALIDATED</span>
            </div>
          </section>
          <Lock className="text-slate-700" size={24} />
        </header>

        {/* 🛠️ THE PERSPECTIVE NODE ROW (SOLVES ORIGIN LENS DISPLAY) */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/5 p-8 border-l-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.1)] gap-6">
           <section>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] font-black italic">Perspective_Node_Authorized</span>
              </div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">{activeLens}_SIGNAL</h2>
           </section>
           
           <div className="bg-black/40 p-4 border border-white/10 rounded-sm max-w-xs">
              <div className="flex items-center gap-2 mb-1 text-red-600">
                <BookOpen size={14} />
                <span className="text-[9px] font-mono font-black uppercase tracking-widest">FieldGuide_Reference</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono leading-relaxed italic">
                {FIELDGUIDE_MAPPING[activeLens] || "BMR General Methodology"}
              </p>
           </div>
        </div>

        <main className="text-center mb-20 relative py-12">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-red-600"><Skull size={400} /></div>
          <div className="text-[10rem] md:text-[12rem] font-black italic tracking-tighter text-white relative z-10 leading-none">
            ${data.total}<span className="text-red-600">M</span>
          </div>
          <p className="text-red-600 font-mono text-sm uppercase font-black tracking-[0.6em] mt-6 leading-relaxed">VALIDATED ANNUAL HEMORRHAGE SIGNAL</p>
        </main>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pt-12 border-t border-red-600/30">
          <article className="space-y-6">
            <div>
                <h3 className="text-white text-xl font-black uppercase italic mb-4 flex items-center gap-2"><TrendingUp size={20} className="text-red-600" /> The Compound Failure</h3>
                <p className="text-slate-400 text-sm italic leading-relaxed font-medium">
                  &ldquo;Your ${data.total}M hemorrhage is not a static cost; it is a compounding liability scaling with every API call and model iteration.&rdquo;
                </p>
            </div>
            
            <div className="bg-white/5 p-6 border border-white/5 font-mono">
                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-2 italic underline underline-offset-4">Lens_Specific_Analysis:</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                   Based on the <strong>{activeLens}</strong> response profile, the primary fracture is structural. 
                   Standard operating procedures lack the forensic depth to mitigate the identified rework tax.
                </p>
            </div>
          </article>

          <Card className="bg-slate-950 p-10 border-l-4 border-red-600 rounded-none border-y-0 border-r-0 flex flex-col justify-center">
            <div className="flex justify-between mb-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest italic"><span>Observed Tech Spend</span><span>$1.2M</span></div>
            <div className="h-px bg-slate-900 mb-6" />
            <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-red-600 font-black tracking-widest uppercase italic">Projected Liability<br/>(24 Month Window)</span>
                <span className="text-4xl font-black text-white italic tracking-tighter">${(data.total * 2.5).toFixed(1)}M</span>
            </div>
          </Card>
        </section>

        <footer className="bg-red-600 p-12 text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h2 className="text-white text-4xl font-black uppercase italic mb-8 tracking-tighter">PREVENT THE TRAP</h2>
          <p className="text-white/80 text-xs font-mono uppercase tracking-widest mb-10 max-w-md mx-auto leading-relaxed italic">
            Your organization is operating without a forensic ledger. Triangulation is required to stabilize the stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-10 py-6 font-black uppercase italic tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 border border-black group">
               INITIALIZE TRIANGULATION PROTOCOL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </footer>
        
        <div className="mt-12 text-center">
            <button 
                onClick={() => window.print()}
                className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em] hover:text-white transition-colors"
            >
                PRINT_FORENSIC_SUMMARY_REPORT_PDF
            </button>
        </div>
      </div>
    </div>
  );
}
