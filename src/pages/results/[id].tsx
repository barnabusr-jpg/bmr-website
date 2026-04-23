"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Lock, BookOpen, AlertTriangle, Banknote, Fingerprint, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchAudit = async () => {
      const { data: audit } = await supabase.from('audits').select('*').eq('id', id).single();
      if (audit) setData(audit);
    };
    fetchAudit();
  }, [id]);

  if (!data) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-600 font-mono italic animate-pulse">RETRIVING_SECURE_DOSSIER...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-start border-b border-slate-900 pb-8 mb-12">
          <section>
            <h1 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter leading-none">VERIFIED SYSTEMIC AUDIT</h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase mt-2 font-black">ENTITY: {data.org_name} // STATUS: {data.status}</p>
          </section>
          <Lock className="text-slate-700" size={24} />
        </header>

        {/* SHEAR ZONE */}
        <div className="mb-20 bg-black border border-slate-900 p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
              <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                Logic fractures detected. The gap between leadership intent and technical execution is <span className="text-white font-bold">{data.sfi_score}%</span>.
              </p>
              {/* Progress Bars */}
              <div className="space-y-3 pt-6">
                 <div className="h-1 w-full bg-slate-900"><div className="h-full bg-white transition-all duration-1000" style={{width: '92%'}}></div></div>
                 <div className="h-1 w-full bg-slate-900"><div className="h-full bg-red-600 transition-all duration-1000" style={{width: `${100 - data.sfi_score}%`}}></div></div>
              </div>
            </div>
            <div className="w-full md:w-64 bg-red-600/5 border border-red-600/20 p-8 text-center relative group">
                <Fingerprint className="absolute inset-0 m-auto text-red-600 opacity-5 pointer-events-none" size={120} />
                <div className="text-7xl font-black text-white italic leading-none mb-2 tracking-tighter">{data.sfi_score}%</div>
                <p className="text-[9px] text-slate-500 font-mono uppercase italic">SFI_DECAY_RATE</p>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <footer className="bg-red-600 p-12 text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h2 className="text-white text-4xl font-black uppercase italic mb-8 tracking-tighter">PREVENT THE TRAP</h2>
          <button 
            onClick={() => router.push(`/deep-dive?id=${id}`)}
            className="bg-black text-white px-10 py-6 font-black uppercase italic tracking-[0.2em] text-[11px] flex items-center justify-center gap-4 border border-black group mx-auto"
          >
               INITIALIZE DEEP DIVE PROTOCOL <ArrowRight size={18} />
          </button>
        </footer>
      </div>
    </div>
  );
}
