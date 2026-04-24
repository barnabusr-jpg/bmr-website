"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Shield, DollarSign, ArrowRight, User, Building, Activity } from 'lucide-react';

export default function DossierManager() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('audits')
        .select(`
          *,
          operators (full_name, email, persona_type)
        `)
        .order('created_at', { ascending: false });

      if (data) setAudits(data);
      setLoading(false);
    }
    fetchLeads();
  }, []);

  // PROPRIETARY PRICING CALCULATOR (Mirroring the results page)
  const calculateOffer = (audit: any) => {
    const spend = audit.ai_spend || 1.2;
    const friction = audit.decay_pct || 74;
    const reworkTax = audit.rework_tax || (spend * 1000000 * (friction / 100) * 0.15);
    
    return {
      reworkTax: reworkTax,
      interventionPrice: Math.round(reworkTax * 0.25), // Offering to fix the leak for 25% of the tax cost
      inactionPenalty: reworkTax * 1.2
    };
  };

  if (loading) return <div className="p-20 bg-black text-red-600 font-mono italic uppercase">Accessing_Vault...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-sans tracking-tighter">
      <div className="mb-12 border-b border-slate-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase">BMR // Internal Dossier Manager</h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">Active Fiduciary Leads & Proposed Pricing</p>
        </div>
        <div className="text-right">
            <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase italic">Admin_Clearance_Active</span>
        </div>
      </div>

      <div className="grid gap-4">
        {audits.map((audit) => {
          const offer = calculateOffer(audit);
          return (
            <div key={audit.id} className="bg-slate-950 border border-slate-900 p-8 flex flex-col md:flex-row justify-between gap-8 hover:border-red-600/50 transition-all">
              {/* OPERATOR INFO */}
              <div className="space-y-4 min-w-[250px]">
                <div className="flex items-center gap-3">
                  <User size={16} className="text-red-600" />
                  <span className="font-black uppercase text-sm">{audit.operators?.full_name || "Unknown Operator"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                  <Building size={14} /> {audit.org_name}
                </div>
                <div className="inline-block bg-slate-900 px-3 py-1 text-[9px] font-mono text-slate-400 uppercase">
                  Node: {audit.operators?.persona_type || "PHOENIX"}
                </div>
              </div>

              {/* REWORK DATA */}
              <div className="grid grid-cols-2 gap-8 flex-grow">
                <div>
                  <p className="text-[9px] font-mono text-slate-600 uppercase mb-1">Rework Tax (Leak)</p>
                  <p className="text-2xl font-black italic text-white">${(offer.reworkTax / 1000).toFixed(0)}K<span className="text-xs text-slate-700">/YR</span></p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-slate-600 uppercase mb-1">Inaction Penalty</p>
                  <p className="text-2xl font-black italic text-red-600">${(offer.inactionPenalty / 1000).toFixed(0)}K</p>
                </div>
              </div>

              {/* THE PROPOSED OFFER */}
              <div className="bg-white/5 p-6 border-l-2 border-red-600 min-w-[280px]">
                <p className="text-[9px] font-mono text-red-500 uppercase mb-2 font-black">Proposed Intervention Price</p>
                <div className="flex items-end gap-2">
                    <p className="text-3xl font-black italic text-white leading-none">${(offer.interventionPrice / 1000).toFixed(0)}K</p>
                    <span className="text-[10px] font-mono text-slate-500 uppercase mb-1">Engagement Fee</span>
                </div>
                <button 
                  onClick={() => window.location.href = `/results/${audit.id}`}
                  className="mt-4 w-full bg-white text-black py-2 font-black uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  View Client Verdict <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
