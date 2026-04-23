"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { TrendingUp, ArrowRight, Skull, Lock, BookOpen, AlertTriangle, Banknote, Fingerprint } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const FIELDGUIDE_MAPPING: Record<string, string> = {
  EXE: "Section 1.2: The Governance Gap & Fiduciary AI Oversight",
  MGR: "Section 3.4: SME Rework Tax & Operational Alpha Capture",
  TEC: "Section 5.1: Forensic Logging & API Logic Hardening"
};

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query; // Grabs the ID from the URL
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTriangulatedData = async () => {
      const { data: audit, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', id)
        .single();

      if (audit) {
        setData({
          sfi_score: audit.sfi_score || 0,
          total: audit.rework_tax || "0",
          sectorLabel: audit.org_name || "UNKNOWN_ENTITY",
          status: audit.status
        });
      }
    };

    fetchTriangulatedData();
  }, [id]);

  if (!data) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono">
        <div className="text-red-600 font-black animate-pulse tracking-widest uppercase italic text-sm">
            Accessing_Secure_Dossier_{id}...
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans">
      <div className="container mx-auto max-w-4xl mt-12">
        <header className="flex justify-between items-start border-b border-slate-900 pb-8 mb-12">
          <section>
            <h1 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter leading-none">
              VERIFIED SYSTEMIC AUDIT
            </h1>
            <div className="flex gap-4 mt-2">
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-black">ENTITY: {data.sectorLabel}</span>
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-black">PROTOCOL: {data.status}</span>
            </div>
          </section>
          <Lock className="text-slate-700" size={24} />
        </header>

        {/* SECTION 01: THE SHEAR ZONE */}
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
                The triangulation detected a <span className="text-white">{data.sfi_score}%</span> friction index. 
                This gap represents the distance between your strategic promise and your technical reality.
              </p>

              <div className="space-y-3 pt-6">
                <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase"><span>Strategic_Intent</span><span>92%</span></div>
                    <div className="h-1 w-full bg-slate-900"><div className="h-full bg-white w-[92%] transition-all duration-1000"></div></div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-red-600 uppercase"><span>Forensic_Truth</span><span>{Math.max(5, 100 - data.sfi_score)}%</span></div>
                    <div className="h-1 w-full bg-slate-900"><div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${Math.max(5, 100 - data.sfi_score)}%` }}></div></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 bg-red-600/5 border border-red-600/20 p-8 text-center relative group">
                <Fingerprint className="absolute inset-0 m-auto text-red-600 opacity-5 pointer-events-none" size={120} />
                <label className="text-[9px] font-mono text-red-600 uppercase font-black block mb-2 tracking-widest italic">SFI_Decay_Rate</label>
                <div className="text-7xl font-black text-white italic leading-none mb-2 tracking-tighter">{data.sfi_score}%</div>
            </div>
          </div>
        </div>

        {/* SECTION 02: THE HEMORRHAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
          <div className="space-y-6">
            <h3 className="text-white text-2xl font-black uppercase italic flex items-center gap-3 tracking-tighter leading-none">
                <Banknote className="text-red-600" /> Capital_Exfiltration
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
              Your annual rework tax has been triangulated across three independent organizational nodes.
            </p>
            <div className="h-5 w-full bg-slate-900 overflow-hidden flex border border-white/5">
                <div className="h-full bg-green-500" style={{ width: `${100 - data.sfi_score}%` }}></div>
                <div className="h-full bg-red-600" style={{ width: `${data.sfi_score}%` }}></div>
            </div>
          </div>

          <main className="text-right py-6">
             <div className="text-[6rem] md:text-[8rem] font-black italic tracking-tighter text-white leading-none">
                ${data.total}<span className="text-red-600">M</span>
             </div>
             <p className="text-red-600 font-mono text-[10px] uppercase font-black tracking-[0.5em] mt-2 italic">ANNUAL_HEMORRHAGE_SIGNAL</p>
          </main>
        </div>

        <footer className="bg-red-600 p-12 text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h2 className="text-white text-4xl font-black uppercase italic mb-8 tracking-tighter">PREVENT THE TRAP</h2>
          <button 
            onClick={() => router.push(`/deep-dive/${id}`)}
            className="bg-black text-white px-10 py-6 font-black uppercase italic tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 border border-black group mx-auto"
          >
               INITIALIZE DEEP DIVE PROTOCOL <ArrowRight size={18} />
          </button>
        </footer>
      </div>
    </div>
  );
}
