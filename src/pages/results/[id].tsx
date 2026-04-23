"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Lock, ShieldAlert, ArrowRight, Activity, Fingerprint } from "lucide-react";
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

        // 1. HARDENED MAPPING
        // We explicitly pull the answer and evidence from the nested objects
        nodes.forEach(n => {
          if (n.raw_responses) {
            Object.entries(n.raw_responses).forEach(([qId, data]: any) => {
              results[qId] = {
                answer: data?.answer || "N/A",
                evidence: data?.evidence || "No supplementary evidence provided."
              };
            });
          }
        });

        // 2. THE FORENSIC BRAIN
        let frictionScore = 0;
        const fractures = [];
        const tax = parseFloat(audit.rework_tax || "0");

        // FRACTURE: INDEMNITY (EXE vs TEC)
        if (results.EXE_01?.answer === "Yes" && results.TEC_01?.answer === "No") {
          fractures.push({
            code: "BMR-T1",
            impact: "CRITICAL",
            title: "Indemnity Alignment Fracture",
            finding: `Executive policy assumes audit rights; Technical Node confirms: "${results.TEC_01.evidence}"`,
            directive: "Hardening Protocol: BMR-T1 Forensic Logging."
          });
          frictionScore += 35;
        }

        // FRACTURE: REWORK TAX (MGR vs TEC)
        if (results.MGR_01?.answer === "Yes" && results.TEC_01?.answer === "No") {
          const leakage = (tax * 0.4).toFixed(1);
          fractures.push({
            code: "BMR-M1",
            impact: "HIGH",
            title: "Rework Tax Hemorrhage",
            finding: `Structural validation gap creates $${leakage}M/yr in manual friction.`,
            directive: "Hardening Protocol: BMR-M1 Feedback Loops."
          });
          frictionScore += 35;
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
        <header className="flex justify-between items-center border-b border-slate-900 pb-8 mb-20">
          <div className="text-left">
            <h1 className="text-red-600 text-2xl font-black uppercase italic tracking-tighter leading-none">Forensic_Dossier</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-2 tracking-widest font-bold italic">Entity: {report?.org} // ID: {id?.toString().slice(0,8)}</p>
          </div>
          <Fingerprint className="text-slate-800" size={40} />
        </header>

        {/* SHEAR ZONE MRI */}
        <div className="bg-black border border-slate-900 p-12 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex-1 text-left">
              <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none text-white">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
              <p className="text-slate-400 italic text-sm tracking-wide uppercase font-bold">Detected Fractures: {report?.fractures.length}</p>
              <div className="mt-8 h-2 w-full bg-slate-900"><div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${report?.sfi}%` }} /></div>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-12 text-center min-w-[220px]">
              <div className="text-8xl font-black italic leading-none text-white">{report?.sfi}%</div>
              <p className="text-[10px] font-mono text-red-600 uppercase mt-4 font-black tracking-[0.3em]">SFI_INDEX</p>
            </div>
          </div>
        </div>

        {/* THE EVIDENCE LOG */}
        <div className="space-y-8 mb-20 text-left">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4 italic">Forensic_Evidence_Log</h3>
          {report?.fractures.length > 0 ? report.fractures.map((f: any, i: number) => (
            <div key={i} className="bg-slate-950 border-l-4 border-l-red-600 border border-slate-900 p-10 hover:bg-black transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase">{f.impact}</span>
                    <span className="text-xl font-black uppercase italic tracking-tighter text-white leading-none">{f.title}</span>
                  </div>
                  <p className="text-slate-400 italic text-sm leading-relaxed border-l border-slate-800 pl-6">"{f.finding}"</p>
                </div>
                <div className="text-right">
                  <button onClick={() => router.push(`/protocols?id=${id}`)} className="text-red-600 font-mono text-[10px] border-b border-red-600 pb-1 hover:text-white hover:border-white transition-all tracking-widest font-bold uppercase leading-none">
                    {f.code} _ ACCESS
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-slate-950 border border-slate-900 p-12 text-center">
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">No structural fractures detected in current node triangulation.</p>
            </div>
          )}
        </div>

        {/* FINANCIAL & ACTION PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-950 border border-slate-900 p-10 text-left">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4 italic font-bold">Est_Annual_Rework_Tax</p>
              <div className="text-6xl font-black text-white italic leading-none">${report?.rework}M</div>
           </div>
           <button onClick={() => router.push(`/protocols?id=${id}`)} className="bg-red-600 p-10 flex items-center justify-between group hover:bg-white transition-all">
              <div className="text-left">
                <p className="text-[10px] font-mono text-black uppercase tracking-[0.2em] mb-2 font-black leading-none">Structural_Hardening</p>
                <div className="text-2xl font-black uppercase italic text-black leading-none text-left">Initialize Protocols</div>
              </div>
              <ArrowRight className="text-black group-hover:translate-x-3 transition-transform" size={32} />
           </button>
        </div>
      </div>
    </div>
  );
}
