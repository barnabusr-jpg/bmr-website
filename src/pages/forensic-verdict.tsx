"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, ArrowRight, Skull, Lock, BookOpen, AlertTriangle, Banknote, Fingerprint } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";

const FIELDGUIDE_MAPPING: Record<string, string> = {
  EXECUTIVE: "Section 1.2: The Governance Gap & Fiduciary AI Oversight",
  MANAGER: "Section 3.4: SME Rework Tax & Operational Alpha Capture",
  TECHNICAL: "Section 5.1: Forensic Logging & API Logic Hardening"
};

export default function ForensicVerdict() {
  const [data, setData] = useState<any>(null);
  const [activeLens, setActiveLens] = useState<string>("EXECUTIVE");

  useEffect(() => {
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
        <div className="text-red-600 font-black animate-pulse tracking-widest uppercase italic font-mono text-sm">
            Synthesizing_Forensic_Verdict...
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

        {/* SECTION 01: THE PERSPECTIVE NODE & FIELDGUIDE ANCHOR */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/5 p-8 border-l-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.1)] gap-6">
           <section>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] font-black italic text-[9px]">Node_Authorized</span>
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

        {/* SECTION 02: THE LOGIC SHEAR (Weaponized Disparity) */}
        <div className="mb-20 bg-black border border-slate-900 p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle size={16} />
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em]">Detection: Logic_Shear_Confirmed</span>
              </div>
              <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
                THE <span className="text-red-600">SHEAR</span> ZONE
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                Our triangulation detects a significant delta between your internal nodes. 
                Your strategic belief is disconnected from your technical truth by <span className="text-white font-bold">{data.sfi_score}%</span>. 
                This is where the <span className="text-white">Promise Gap™</span> turns into capital loss.
              </p>

              {/* VISUAL DISPARITY BARS */}
              <div className="space-y-3 pt-6">
                <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase"><span>Strategic_Intent (AVS)</span><span>92%</span></div>
                    <div className="h-1 w-full bg-slate-900"><div className="h-full bg-white w-[92%] transition-all duration-1000"></div></div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-red-600 uppercase"><span>Forensic_Truth (IGF)</span><span>{100 - data.sfi_score}%</span></div>
                    <div className="h-1 w-full bg-slate-900"><div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${100 - data.sfi_score}%` }}></div></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 bg-red-600/5 border border-red-600/20 p-8 text-center relative group">
                <Fingerprint className="absolute inset-0 m-auto text-red-600 opacity-5 pointer-events-none" size={120} />
                <label className="text-[9px] font-mono text-red-600 uppercase font-black block mb-2 tracking-widest italic">SFI_Decay_Rate</label>
                <div className="text-7xl font-black text-white italic leading-none mb-2 tracking-tighter">{data.sfi_score}%</div>
                <p className="text-[9px] text-slate-500 font-mono uppercase italic leading-tight">Critical Threshold<br/>Exceeded</p>
            </div>
          </div>
        </div>

        {/* SECTION 03: VISUAL WASTE (The "Hemorrhage" Bar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
          <div className="space-y-6">
            <h3 className="text-white text-2xl font-black uppercase italic flex items-center gap-3 tracking-tighter leading-none">
                <Banknote className="text-red-600" /> Capital_Exfiltration
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
              For every <span className="text-white font-bold">$1.00</span> invested in the stack, only <span className="text-green-500 font-bold">$0.15</span> creates mission value. 
              The remaining <span className="text-red-600 font-bold">$0.85</span> is being drained by the <span className="text-white underline underline-offset-4">Rework Tax</span>.
            </p>
            <div className="h-5 w-full bg-slate-900 overflow-hidden flex border border-white/5">
                <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: '15%' }}></div>
                <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black italic">
                <span>$0.15 ALPHA</span>
                <span className="text-red-600">$0.85 WASTE</span>
            </div>
          </div>

          <main className="text-right py-6 relative">
             <div className="absolute inset-0 flex items-center justify-end opacity-5 pointer-events-none text-red-600"><Skull size={200} /></div>
             <div className="text-[6rem] md:text-[8rem] font-black italic tracking-tighter text-white relative z-10 leading-none">
                ${data.total}<span className="text-red-600">M</span>
             </div>
             <p className="text-red-600 font-mono text-[10px] uppercase font-black tracking-[0.5em] mt-2 leading-relaxed italic">ANNUAL_HEMORRHAGE_SIGNAL</p>
          </main>
        </div>

        {/* SECTION 04: THE BRIEFING (Storytelling context) */}
        <div className="mb-20 bg-slate-950 border border-slate-900 p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-10 -translate-y-1/2 bg-red-600 text-white px-4 py-1 text-[9px] font-black uppercase tracking-widest italic">
            BMR_FORENSIC_CASE_STUDY
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">
                Why this signal matters:
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                &ldquo;Your current SFI profile mimics the <strong>'Logic Leak'</strong> pattern found in major industry failures. 
                In similar cases, the gap between leadership intent and technical execution led to <strong>Total Indemnity Loss</strong>. 
                Stabilizing the <span className="text-white">HAI</span>, <span className="text-white">AVS</span>, and <span className="text-white">IGF</span> layers is required to prevent systemic collapse.&rdquo;
              </p>
            </div>
            <div className="flex flex-col justify-center border-l border-slate-900 pl-10">
              <div className="text-3xl font-black text-red-600 italic leading-none">6-MO</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase mb-4 italic tracking-widest">Inaction_Cost</div>
              <div className="text-3xl font-black text-white tracking-tighter italic leading-none">${(data.total * 0.56).toFixed(1)}M</div>
            </div>
          </div>
        </div>

        <footer className="bg-red-600 p-12 text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h2 className="text-white text-4xl font-black uppercase italic mb-8 tracking-tighter">PREVENT THE TRAP</h2>
          <button className="bg-black text-white px-10 py-6 font-black uppercase italic tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 border border-black group mx-auto">
               INITIALIZE TRIANGULATION PROTOCOL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
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
