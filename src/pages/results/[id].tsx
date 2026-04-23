"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Lock, ShieldAlert, ArrowRight, Activity, AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const calculateForensics = async () => {
      const [auditRes, nodesRes] = await Promise.all([
        supabase.from('audits').select('*').eq('id', id).single(),
        supabase.from('operators').select('*').eq('audit_id', id)
      ]);

      if (auditRes.data && nodesRes.data) {
        const audit = auditRes.data;
        const nodes = nodesRes.data;
        const results: any = {};

        // 1. DATA MAPPING (Extracting the 'Box' of data)
        nodes.forEach(n => {
          Object.entries(n.raw_responses || {}).forEach(([qId, data]: any) => {
            results[qId] = {
              answer: data?.answer || "N/A",
              evidence: data?.evidence || "No technical evidence provided.",
              timestamp: data?.timestamp || ""
            };
          });
        });

        // 2. FORENSIC BRAIN
        let frictionScore = 0;
        const fractures = [];
        const tax = parseFloat(audit.rework_tax || "0");

        // T1: Indemnity (EXE vs TEC)
        if (results.EXE_01?.answer === "Yes" && results.TEC_01?.answer === "No") {
          fractures.push({ 
            code: "BMR-T1", 
            impact: "CRITICAL", 
            title: "Indemnity Alignment Fracture",
            desc: `Executive assumes audit rights; Technical Node reports: "${results.TEC_01.evidence}"`
          });
          frictionScore += 25;
        }

        // T2: Rework Tax (MGR vs TEC)
        if (results.MGR_01?.answer === "Yes" && results.TEC_01?.answer === "No") {
          const leakage = (tax * 0.4).toFixed(1);
          fractures.push({ 
            code: "BMR-M1", 
            impact: "HIGH", 
            title: "Rework Tax Hemorrhage",
            desc: `Missing reinforcement loops creating $${leakage}M/yr in friction. Technical evidence: "${results.TEC_01.evidence}"`
          });
          frictionScore += 25;
        }

        setReport({
          org: audit.org_name,
          sfi: Math.min(frictionScore, 100),
          rework: tax,
          fractures: fractures
        });
      }
      setLoading(false);
    };

    calculateForensics();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-600 font-mono italic animate-pulse">SYNTHESIZING_FORENSIC_DOSSIER...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center border-b border-slate-900 pb-8 mb-12">
          <h1 className="text-red-600 text-2xl font-black uppercase italic tracking-tighter">Forensic_Dossier // {report?.org}</h1>
          <Lock className="text-slate-700" size={20} />
        </header>

        {/* SHEAR ZONE GAUGE */}
        <div className="bg-black border border-slate-900 p-12 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex-1">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
              <p className="text-slate-400 italic text-sm">Vital signs: {report?.fractures.length} logic fractures detected.</p>
              <div className="mt-8 h-1 w-full bg-slate-900"><div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${report?.sfi}%` }} /></div>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-10 text-center min-w-[200px]">
              <div className="text-7xl font-black italic">{report?.sfi}%</div>
              <p className="text-[10px] font-mono text-red-600 uppercase mt-2 font-bold tracking-widest">SFI_INDEX</p>
            </div>
          </div>
        </div>

        {/* EVIDENCE DOSSIER (The Paid Content) */}
        <div className="space-y-6 mb-16">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-8">Forensic_Evidence_Log</h3>
          {report?.fractures.map((f: any, i: number) => (
            <div key={i} className="bg-slate-950 border border-slate-900 p-8 hover:border-red-600 transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1">{f.impact}</span>
                    <span className="text-xl font-black uppercase italic tracking-tighter">{f.title}</span>
                  </div>
                  <p className="text-slate-400 text-sm italic leading-relaxed border-l border-slate-800 pl-6">"{f.desc}"</p>
                </div>
                <button onClick={() => router.push(`/protocols?id=${id}`)} className="text-red-600 font-mono text-[10px] uppercase border-b border-red-600 pb-1 whitespace-nowrap hover:text-white hover:border-white transition-all tracking-widest font-bold">
                  {f.code} _ Directives
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ACTION PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-950 border border-slate-900 p-8">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 italic">Est_Annual_Leakage</p>
              <div className="text-5xl font-black text-white italic">${report?.rework}M</div>
           </div>
           <button onClick={() => router.push(`/protocols?id=${id}`)} className="bg-red-600 p-8 flex items-center justify-between group hover:bg-white transition-all">
              <div className="text-left">
                <p className="text-[10px] font-mono text-black uppercase tracking-widest mb-2 font-bold">Protocol_Matrix</p>
                <div className="text-xl font-black uppercase italic text-black">Initialize Hardening</div>
              </div>
              <ArrowRight className="text-black group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
}
