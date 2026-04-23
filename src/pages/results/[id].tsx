"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Lock, ShieldAlert, ArrowRight, Activity, Fingerprint, AlertCircle, Zap, ShieldCheck, AlertTriangle, Clock } from "lucide-react";
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

        // 1. DATA NORMALIZATION LAYER
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

        // BMR-T1: INDEMNITY (EXE vs TEC)
        if (isYes(results.EXE_01?.answer) && isNo(results.TEC_01?.answer)) {
          const cost = 180000;
          fractures.push({
            code: "BMR-T1",
            impact: "CRITICAL",
            implicatedNodes: ['EXE', 'TEC'],
            title: "Indemnity Alignment Fracture",
            finding: `Executive policy assumes audit rights; Technical Node reports: "${results.TEC_01.evidence}"`,
            directive: "DEPLOY_SIEM_FORENSIC_LOGGING",
            action: "Establish real-time indemnity verification via immutable logging to stop the $180K/yr bleed.",
            cost: cost
          });
          frictionScore += 35;
          cumulativeReworkTax += cost;
        }

        // BMR-M1: REWORK TAX (MGR vs TEC)
        if (isYes(results.MGR_01?.answer) && isNo(results.TEC_01?.answer)) {
          const cost = baseTax * 70000; // Calculated friction based on baseline
          fractures.push({
            code: "BMR-M1",
            impact: "HIGH",
            implicatedNodes: ['MGR', 'TEC'],
            title: "Rework Tax Hemorrhage",
            finding: `Structural validation gap creates systemic manual friction.`,
            directive: "INITIALIZE_REINFORCEMENT_LOOPS",
            action: "Automate validation checkpoints to reclaim manual rework hours and associated tax.",
            cost: cost
          });
          frictionScore += 35;
          cumulativeReworkTax += cost;
        }

        setReport({
          org: audit.org_name,
          sfi: Math.min(frictionScore, 100),
          totalTax: cumulativeReworkTax,
          dailyBleed: (cumulativeReworkTax / 365),
          nodes: {
            exe: nodes.find(n => n.persona_type === 'EXE')?.status === 'completed',
            mgr: nodes.find(n => n.persona_type === 'MGR')?.status === 'completed',
            tec: nodes.find(n => n.persona_type === 'TEC')?.status === 'completed',
          },
          fractures
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
    <div className="min-h-screen bg-[#020617] text-white py-20 px-6 font-sans text-left tracking-tighter leading-none">
      <div className="container mx-auto max-w-4xl">
        {/* HEADER WITH DAILY BLEED TIMER */}
        <header className="flex justify-between items-end border-b border-slate-900 pb-8 mb-12">
          <div className="text-left">
            <h1 className="text-red-600 text-3xl font-black uppercase italic tracking-tighter">Forensic_Dossier</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic">Entity: {report?.org} // Protocol_Active</p>
          </div>
          <div className="flex flex-col items-end gap-3 text-right">
            <Fingerprint className="text-slate-800" size={40} />
            <div className="bg-red-600/10 border border-red-600/30 px-4 py-2 flex items-center gap-2">
               <Clock size={14} className="text-red-600 animate-pulse" />
               <span className="text-[10px] font-mono font-black text-red-500 tracking-widest uppercase italic">Leakage: ${report?.dailyBleed.toFixed(2)}/Day</span>
            </div>
          </div>
        </header>

        {/* SHEAR ZONE PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-12 text-left">
          <div className="col-span-2 bg-black border border-slate-900 p-12 relative overflow-hidden">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-4 text-white leading-none">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
            <p className="text-slate-500 italic text-[11px] tracking-widest uppercase font-bold mt-6 leading-none">Active Fractures: {report?.fractures.length}</p>
            <div className="mt-10 h-2 w-full bg-slate-900 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${report?.sfi}%` }} transition={{ duration: 2 }} className="h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-950 to-black border border-red-600/30 p-12 text-center flex flex-col justify-center">
            <div className="text-7xl font-black italic text-white leading-none">{report?.sfi}%</div>
            <p className="text-[10px] font-mono text-red-500 uppercase mt-2 font-black tracking-widest leading-none">SFI_INDEX</p>
            <div className="mt-8 pt-6 border-t border-red-600/20">
              <div className="text-3xl font-black italic text-white leading-none">${(report?.totalTax / 1000).toFixed(0)}K</div>
              <p className="text-[9px] font-mono text-red-400 uppercase font-bold tracking-widest mt-2 leading-none italic">REWORK_TAX_ANNUAL</p>
            </div>
          </div>
        </div>

        {/* INTEGRITY TOPOLOGY MAP (DYNAMC ICONS) */}
        <div className="bg-slate-950 border border-slate-900 p-10 mb-12 relative overflow-hidden text-left">
          <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-12 italic font-bold">Integrity_Triangulation_Map</h3>
          <div className="flex justify-between items-center max-w-2xl mx-auto relative px-10">
            <div className="absolute h-[1px] w-full bg-slate-900 top-1/2 -translate-y-1/2 left-0 z-0" />
            {[
              { label: 'EXECUTIVE', id: 'EXE', ok: report?.nodes.exe },
              { label: 'MANAGER', id: 'MGR', ok: report?.nodes.mgr },
              { label: 'TECHNICAL', id: 'TEC', ok: report?.nodes.tec }
            ].map((n, i) => {
              const fracture = report?.fractures.find((f: any) => f.implicatedNodes.includes(n.id));
              const isRed = fracture?.impact === 'CRITICAL';
              const isYellow = fracture?.impact === 'HIGH';

              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                    !n.ok ? 'border-slate-800 bg-black text-slate-700' :
                    isRed ? 'border-red-600 bg-red-600/20 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]' :
                    isYellow ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' :
                    'border-green-500 bg-green-500/10 text-green-500'
                  }`}>
                    {!n.ok ? <Activity size={24} /> : isRed ? <AlertTriangle size={24} className="animate-pulse" /> : isYellow ? <Zap size={24} /> : <ShieldCheck size={24} />}
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest leading-none ${isRed ? 'text-red-500' : isYellow ? 'text-yellow-500' : 'text-slate-500'}`}>{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* FRACTURES & HARDENING DIRECTIVES */}
        <div className="space-y-6 mb-20 text-left">
          {report?.fractures.map((f: any, i: number) => (
            <div key={i} className="group">
               <div className="bg-slate-950 border border-slate-900 p-10 flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-6 flex-1 text-left">
                    <div className="flex items-center gap-4">
                      <span className={`${f.impact === 'CRITICAL' ? 'bg-red-600' : 'bg-yellow-600'} text-white text-[9px] font-black px-3 py-1 uppercase italic tracking-widest leading-none`}>{f.impact}</span>
                      <span className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{f.title}</span>
                    </div>
                    <p className="text-slate-400 italic text-lg leading-snug border-l-2 border-slate-800 pl-8 font-light text-left">"{f.finding}"</p>
                  </div>
                  <div className="text-right min-w-[140px]">
                    <div className="text-3xl font-black italic text-white leading-none">${(f.cost / 1000).toFixed(0)}K</div>
                    <p className="text-[9px] font-mono text-red-500 font-bold uppercase mt-2 leading-none italic text-right">REWORK_TAX_ANNUAL</p>
                  </div>
               </div>

               <div className="bg-black border-x border-b border-red-600/30 p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative text-left">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                  <div className="flex items-start gap-6 flex-1 text-left">
                    <div className="bg-red-600/10 p-3"><Zap className="text-red-600" size={24} /></div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.4em] mb-2 font-black italic leading-none text-left">Hardening_Directive // {f.directive}</p>
                      <p className="text-slate-200 font-bold text-sm leading-relaxed max-w-xl text-left">{f.action}</p>
                    </div>
                  </div>
                  <button onClick={() => router.push(`/protocols?id=${id}`)} className="bg-red-600 text-white px-8 py-5 font-black uppercase italic text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 shadow-lg whitespace-nowrap leading-none">
                    INITIALIZE_TACTICAL_ROADMAP →
                  </button>
               </div>
            </div>
          ))}
        </div>

        {/* FINAL FINANCIAL PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-slate-950 border border-slate-900 p-12 text-left">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-6 italic font-bold text-left">Cumulative_Exposure</p>
              <div className="text-7xl font-black text-white italic leading-none text-left">${(report?.totalTax / 1000).toFixed(0)}K</div>
           </div>
           <button onClick={() => router.push(`/protocols?id=${id}`)} className="bg-red-600 p-12 flex items-center justify-between group hover:bg-white transition-all duration-500">
              <div className="text-left">
                <p className="text-[10px] font-mono text-black uppercase tracking-[0.3em] mb-4 font-black text-left">Forensic_Remediation</p>
                <div className="text-3xl font-black uppercase italic text-black leading-none text-left">Deploy Protocols</div>
              </div>
              <ArrowRight className="text-black group-hover:translate-x-4 transition-transform duration-500" size={48} />
           </button>
        </div>
      </div>
    </div>
  );
}
