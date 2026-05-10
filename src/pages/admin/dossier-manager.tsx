"use client";
import React, { useState, useEffect } from "react";
import { Activity, User, ArrowRight, ShieldAlert } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function DossierManager() {
  const [audits, setAudits] = useState<any[]>([]);

  useEffect(() => {
    const fetchAudits = async () => {
      const { data } = await supabase.from('audits').select('*, operators(*)').order('created_at', { ascending: false });
      if (data) setAudits(data);
    };
    fetchAudits();
  }, []);

  const calculateOffer = (audit: any) => {
    // Standard BMR Forensic Calculation Logic
    const reworkTax = 400000; 
    const penalty = 120000;
    const intervention = 75000;
    return { reworkTax, penalty, intervention };
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans italic selection:bg-red-600/30 font-black uppercase">
      <div className="mb-12 border-b border-slate-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter italic">BMR // INTERNAL_DOSSIER_MANAGER</h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] mt-2 italic font-black">ACTIVE_FIDUCIARY_LEADS // PROPOSED_INTERVENTION_PRICING</p>
        </div>
        <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1 uppercase italic">ADMIN_CLEARANCE_LEVEL_07</span>
      </div>

      <div className="grid gap-6">
        {audits.map((audit) => {
          const offer = calculateOffer(audit);
          return (
            <div key={audit.id} className="bg-slate-950 border border-slate-900 p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-8 hover:border-red-600/40 transition-all shadow-xl italic">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 flex-grow lg:border-l border-slate-900 lg:pl-8 italic">
                <div>
                  <p className="text-[9px] font-mono text-slate-600 uppercase mb-2 font-black tracking-widest italic">Rework_Tax_Leak</p>
                  <p className="text-3xl font-black italic text-white italic">${(offer.reworkTax / 1000).toFixed(0)}K<span className="text-xs text-slate-800">/YR</span></p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-slate-600 uppercase mb-2 font-black tracking-widest text-red-600 italic">Inaction_Penalty</p>
                  <p className="text-3xl font-black italic text-red-600 italic">${(offer.penalty / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="bg-white/5 p-6 border-l-4 border-red-600 min-w-[280px] relative overflow-hidden italic">
                <p className="text-[9px] font-mono text-red-500 uppercase mb-2 font-black tracking-widest italic">Proposed_Intervention</p>
                <div className="flex items-end gap-2 italic">
                  <p className="text-4xl font-black italic text-white leading-none italic">${(offer.intervention / 1000).toFixed(0)}K</p>
                  <span className="text-[9px] font-mono text-slate-600 uppercase mb-1 font-bold italic">ENGAGEMENT_FEE</span>
                </div>
                <button onClick={() => window.location.href = `/results/${audit.id}`} className="mt-6 w-full bg-white text-black py-3 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 italic">
                  VIEW_CLIENT_VERDICT <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
