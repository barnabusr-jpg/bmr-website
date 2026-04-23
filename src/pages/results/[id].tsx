"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Lock, ShieldAlert, ArrowRight, Activity, Fingerprint, Zap, ShieldCheck, AlertTriangle } from "lucide-react";
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

        // 1. DATA NORMALIZATION (Prevents Logic Drift)
        nodes.forEach(n => {
          const persona = n.persona_type?.toUpperCase() || "";
          const prefix = persona.includes("EXE") ? "EXE" : persona.includes("MGR") ? "MGR" : "TEC";
          if (n.raw_responses) {
            Object.entries(n.raw_responses).forEach(([qId, val]: any) => {
              const qNum = qId.includes('_') ? qId.split('_')[1] : '01';
              results[`${prefix}_${qNum}`] = {
                answer: typeof val === 'object' ? val.answer : val,
                evidence: val?.evidence || "No technical evidence provided."
              };
            });
          }
        });

        // 2. THE FORENSIC BRAIN & COST ENGINE
        let frictionScore = 0;
        let cumulativeReworkTax = 0;
        const fractures = [];
        const baseTax = parseFloat(audit.rework_tax || "0");

        const isYes = (v: any) => ["Yes", "1", "6", "True", true].includes(v);
        const isNo = (v: any) => ["No", "2", "False", false].includes(v);

        // FRACTURE 01: INDEMNITY (EXE vs TEC)
        if (isYes(results.EXE_01?.answer) && isNo(results.TEC_01?.answer)) {
          const cost = 180000; 
          fractures.push({
            code: "BMR-T1",
            impact: "CRITICAL",
            title: "Indemnity Alignment Fracture",
            finding: `Executive assumes audit rights; Technical Node reports: "${results.TEC_01.evidence}"`,
            directive: "Deploy SIEM forensic logging to eliminate legal exposure.",
            cost: cost
          });
          frictionScore += 35;
          cumulativeReworkTax += cost;
        }

        // FRACTURE 02: REWORK TAX HEMORRHAGE (MGR vs TEC)
        if (isYes(results.MGR_01?.answer) && isNo(results.TEC_01?.answer)) {
          const cost = baseTax * 100000; 
          fractures.push({
            code: "BMR-M1",
            impact: "HIGH",
            title: "Rework Tax Hemorrhage",
            finding: `Missing validation loops creating systemic leakage. Technical evidence: "${results.TEC_01.evidence}"`,
            directive: "Implement automated reinforcement loops to reclaim manual rework hours.",
            cost: cost
          });
          frictionScore += 35;
          cumulativeReworkTax += cost;
        }

        setReport({
          org: audit.org_name,
          sfi: Math.min(frictionScore, 100),
          rework: baseTax,
          totalReworkTax: cumulativeReworkTax,
          nodes: {
            exe: nodes.some(n => n.persona_type === 'EXE' && n.status === 'completed'),
            mgr: nodes.some(n => n.persona_type === 'MGR' && n.status === 'completed'),
            tec: nodes.some(n => n.persona_type === 'TEC' && n.status === 'completed'),
          },
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
    <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans tracking-tighter leading-none text-left">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center border-b border-slate-900 pb-8 mb-20">
          <div>
            <h1 className="text-red-600 text-3xl font-black uppercase italic tracking-tighter leading-none">Forensic_Dossier</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic font-sans">Entity: {report?.org} // Protocol_Active</p>
          </div>
          <Fingerprint className="text-slate-800" size={48} />
        </header>

        {/* TOP PANEL: SHEAR ZONE + REWORK TAX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-12">
          <div className="col-span-2 bg-black border border-slate-900 p-12 relative overflow-hidden">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-4 text-white leading-none">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
            <p className="text-slate-500 italic text-[11px] tracking-widest uppercase font-bold mt-6">Logic Fractures Detected: {report?.fractures.length}</p>
            <div className="mt-10 h-2 w-full bg-slate-900 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${report?.sfi}%` }} transition={{ duration: 2 }} className="h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-900 to-black border border-red-600/30 p-12 text-center flex flex-col justify-center">
            <div className="text-7xl font-black italic text-white leading-none">{report?.sfi}%</div>
            <p className="text-[10px] font-mono text-red-500 uppercase mt-2 font-black tracking-widest">SFI_INDEX</p>
            <div className="mt-6 pt-6 border-t border-red-600/20">
              <div className="text-3xl font-black italic text-white leading-none">${(report?.totalReworkTax / 1000).toFixed(0)}K</div>
              <p className="text-[9px] font-mono text-red-400 uppercase font-bold tracking-widest mt-1">REWORK_TAX</p>
            </div>
          </div>
        </div>

        {/* FORENSIC TOPOLOGY MAP */}
        <div className="bg-slate-950 border border-slate-900 p-10 mb-12 relative">
          <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-12 italic font-bold">Forensic_Topology_Map</h3>
          <div className="flex justify-between items-center max-w-2xl mx-auto relative px-10">
            <div className="absolute h-[2px] w-full bg-slate-900 top-1/2 -translate-y-1/2 left-0 z-0" />
            {[
              { label: 'EXECUTIVE', ok: report?.nodes.exe },
              { label: 'MANAGER', ok: report?.nodes.mgr },
              { label: 'TECHNICAL', ok: report?.nodes.tec }
            ].map((n, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${n.ok ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-red-600 bg-red-600/10 text-red-600 animate-pulse'}`}>
                  {n.ok ? <ShieldCheck size={24} /> : <AlertTriangle size={24} />}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase text-slate-500 tracking-widest">{n.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EVIDENCE LOG & HARDENING DIRECTIVES */}
        <div className="space-y-6 mb-20">
          <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 italic font-bold">Evidence_Triangulation_Log</h3>
          {report?.fractures.map((f: any, i: number) => (
            <div key={i} className="bg-slate-950 border border-slate-900 overflow-hidden group">
              <div className="p-10 flex flex-col md:flex-row justify-between items-start gap-8 border-b border-slate-900">
                <div className="space-y-6 flex-1 text-left">
                  <div className="flex items-center gap-4">
                    <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase italic tracking-widest">{f.impact}</span>
                    <span className="text-3xl font-black uppercase italic tracking-tighter text-white">{f.title}</span>
                  </div>
                  <p className="text-slate-400 italic text-lg leading-snug border-l-2 border-slate-900 pl-8 font-light">"{f.finding}"</p>
                </div>
                <div className="text-right min-w-[120px]">
                  <div className="text-3xl font-black italic text-white leading-none">${(f.cost / 1000).toFixed(0)}K</div>
                  <p className="text-[9px] font-mono text-red-500 font-bold uppercase mt-1">REWORK_TAX</p>
                </div>
              </div>
              <div className="bg-black/40 p-10 flex flex-col md:flex-row justify-between items-center gap-8 group-hover:bg-red-600/5 transition-all text-left">
                <div className="flex items-start gap-5">
                  <Zap className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1 font-bold italic">Hardening_Directive</p>
                    <p className="text-white font-bold text-sm leading-tight max-w-md">{f.directive}</p>
                  </div>
                </div>
                <button className="bg-white text-black px-8 py-5 font-black uppercase italic text-[10px] tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all whitespace-nowrap">
                  SCHEDULE_HARDENING_SESSION →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL FINANCIAL PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-slate-950 border border-slate-900 p-12 text-left">
              <p className="text-[11px] font-mono text-slate-600 uppercase tracking-[0.3em] mb-6 italic font-bold">Cumulative_Exposure</p>
              <div className="text-7xl font-black text-white italic leading-none">${(report?.totalReworkTax / 1000).toFixed(0)}K</div>
           </div>
           <button onClick={() => router.push(`/protocols?id=${id}`)} className="bg-red-600 p-12 flex items-center justify-between group hover:bg-white transition-all duration-500">
              <div className="text-left text-black">
                <p className="text-[11px] font-mono uppercase tracking-[0.3em] mb-4 font-black">Countermeasure_Protocol</p>
                <div className="text-3xl font-black uppercase italic leading-none">Initialize Hardening</div>
              </div>
              <ArrowRight className="text-black group-hover:translate-x-4 transition-transform duration-500" size={48} />
           </button>
        </div>
      </div>
    </div>
  );
}
