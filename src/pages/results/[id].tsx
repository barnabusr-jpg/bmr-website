"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Lock, ShieldAlert, ArrowRight, Activity, Fingerprint, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

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

        // --- THE NORMALIZATION LAYER ---
        // This ensures DG_01 from a Technical node is read as TEC_01
        nodes.forEach(n => {
          const persona = n.persona_type?.toUpperCase() || "";
          const prefix = persona.includes("EXE") ? "EXE" : persona.includes("MGR") ? "MGR" : "TEC";
          
          if (n.raw_responses) {
            Object.entries(n.raw_responses).forEach(([qId, val]: any) => {
              // Extract number from key (e.g., DG_01 -> 01)
              const qNumber = qId.includes('_') ? qId.split('_')[1] : '01';
              const normalizedKey = `${prefix}_${qNumber}`;
              
              results[normalizedKey] = {
                answer: typeof val === 'object' ? val.answer : val,
                evidence: val?.evidence || "No supplementary evidence provided."
              };
            });
          }
        });

        // --- THE FORENSIC BRAIN (MATH LAYER) ---
        let frictionScore = 0;
        const fractures = [];
        const tax = parseFloat(audit.rework_tax || "0");

        // Helper to catch all signal variants (Labels, Indices, Booleans)
        const isYes = (val: any) => ["Yes", "1", "6", "True", true].includes(val);
        const isNo = (val: any) => ["No", "2", "False", false].includes(val);

        // FRACTURE 01: INDEMNITY (EXE_01 vs TEC_01)
        if (isYes(results.EXE_01?.answer) && isNo(results.TEC_01?.answer)) {
          fractures.push({
            code: "BMR-T1",
            impact: "CRITICAL",
            title: "Indemnity Alignment Fracture",
            finding: `Executive policy assumes audit rights; Technical Node confirms: "${results.TEC_01.evidence}"`,
            directive: "Hardening Protocol: BMR-T1 Forensic Logging."
          });
          frictionScore += 35;
        }

        // FRACTURE 02: REWORK TAX (MGR_01 vs TEC_01)
        if (isYes(results.MGR_01?.answer) && isNo(results.TEC_01?.answer)) {
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

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-4 font-mono">
      <Activity className="text-red-600 animate-spin" size={40} />
      <div className="text-red-600 italic text-[10px] tracking-[0.5em] uppercase">Synthesizing_Dossier...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans tracking-tighter leading-none">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center border-b border-slate-900 pb-8 mb-20 text-left">
          <div>
            <h1 className="text-red-600 text-3xl font-black uppercase italic tracking-tighter leading-none">Forensic_Dossier</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic">Entity: {report?.org} // Protocol_Active</p>
          </div>
          <Fingerprint className="text-slate-800" size={48} />
        </header>

        {/* SHEAR ZONE MRI */}
        <div className="bg-black border border-slate-900 p-12 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10 text-left">
            <div className="flex-1">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-4 text-white leading-none">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
              <p className="text-slate-500 italic text-[11px] tracking-widest uppercase font-bold mt-6">Logic Fractures Detected: {report?.fractures.length}</p>
              <div className="mt-10 h-2 w-full bg-slate-900 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${report?.sfi}%` }} 
                  transition={{ duration: 2, ease: "circOut" }}
                  className="h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]" 
                />
              </div>
            </div>
            <div className="bg-red-600/5 border border-red-600/20 p-12 text-center min-w-[240px]">
              <div className="text-9xl font-black italic text-white leading-none">{report?.sfi}%</div>
              <p className="text-[11px] font-mono text-red-600 uppercase mt-4 font-black tracking-[0.4em]">SFI_INDEX</p>
            </div>
          </div>
        </div>

        {/* EVIDENCE LOG */}
        <div className="space-y-8 mb-20 text-left">
          <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 italic font-bold">Evidence_Triangulation_Log</h3>
          {report?.fractures.length > 0 ? report.fractures.map((f: any, i: number) => (
            <div key={i} className="bg-slate-950 border-l-8 border-l-red-600 border border-slate-900 p-12 hover:bg-black transition-all group relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                <div className="space-y-6 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest italic">{f.impact}</span>
                    <span className="text-3xl font-black uppercase italic tracking-tighter text-white">{f.title}</span>
                  </div>
                  <p className="text-slate-400 italic text-lg leading-snug border-l-2 border-slate-900 pl-8 font-light">"{f.finding}"</p>
                </div>
                <div className="pt-2">
                  <button onClick={() => router.push(`/protocols?id=${id}`)} className="text-red-600 font-mono text-[10px] border-b-2 border-red-600 pb-2 hover:text-white hover:border-white transition-all tracking-[0.2em] font-black uppercase">
                    {f.code} _ ACCESS_DIRECTIVE
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-slate-950 border-2 border-dashed border-slate-900 p-20 text-center">
              <AlertCircle className="text-slate-800 mx-auto mb-6" size={48} />
              <p className="text-slate-600 font-mono text-xs uppercase tracking-[0.3em]">No structural fractures detected. Systemic alignment within tolerance.</p>
            </div>
          )}
        </div>

        {/* FINANCIAL & ACTION PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-slate-950 border border-slate-900 p-12 text-left">
              <p className="text-[11px] font-mono text-slate-600 uppercase tracking-[0.3em] mb-6 italic font-bold">Est_Annual_Leakage_Exposure</p>
              <div className="text-7xl font-black text-white italic leading-none">${report?.rework}M</div>
           </div>
           <button onClick={() => router.push(`/protocols?id=${id}`)} className="bg-red-600 p-12 flex items-center justify-between group hover:bg-white transition-all duration-500">
              <div className="text-left">
                <p className="text-[11px] font-mono text-black uppercase tracking-[0.3em] mb-4 font-black">Countermeasure_Protocol</p>
                <div className="text-3xl font-black uppercase italic text-black leading-none">Initialize Hardening</div>
              </div>
              <ArrowRight className="text-black group-hover:translate-x-4 transition-transform duration-500" size={48} />
           </button>
        </div>
      </div>
    </div>
  );
}
