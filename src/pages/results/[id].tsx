"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Fingerprint, Activity, Zap, ShieldCheck, AlertTriangle, Clock, Sliders } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);

  useEffect(() => {
    if (!id) return;

    const fetchAuditData = async () => {
      const [auditRes, nodesRes] = await Promise.all([
        supabase.from('audits').select('*').eq('id', id).single(),
        supabase.from('operators').select('*').eq('audit_id', id)
      ]);

      if (auditRes.data && nodesRes.data) {
        const audit = auditRes.data;
        const nodes = nodesRes.data;
        const resultsMap: any = {};

        nodes.forEach(n => {
          const persona = (n.persona_type || "").toUpperCase();
          const prefix = persona.includes("EXE") ? "EXE" : persona.includes("MGR") ? "MGR" : "TEC";
          if (n.raw_responses) {
            Object.entries(n.raw_responses).forEach(([qId, val]: any) => {
              const qNum = qId.includes('_') ? qId.split('_')[1] : qId.replace(/[^0-9]/g, '');
              resultsMap[`${prefix}_${qNum}`] = {
                answer: typeof val === 'object' ? val.answer : val,
                evidence: val?.evidence || n.evidence_log || "No technical evidence provided."
              };
            });
          }
        });

        const initialSpend = parseFloat(String(audit.ai_spend || "1.2").replace(/[^0-9.]/g, '')) || 1.2;
        setLiveSpend(initialSpend);
        
        setReportData({
          audit,
          nodes,
          resultsMap,
          org: audit.org_name
        });
      }
      setLoading(false);
    };

    fetchAuditData();
  }, [id]);

  // REACTIVE CALCULATION ENGINE
  const activeMetrics = useMemo(() => {
    if (!reportData) return null;

    let frictionScore = 0;
    let cumulativeReworkTax = 0;
    const fractures = [];
    const baseTaxMultiplier = parseFloat(String(reportData.audit.rework_tax || "0.9").replace(/[^0-9.]/g, '')) || 0.9;

    const isYes = (v: any) => {
      if (!v) return false;
      const s = String(v).toLowerCase().trim();
      return ["yes", "1", "6", "true", "y", "selected"].some(term => s.includes(term));
    };

    const isNo = (v: any) => {
      if (!v || v === "") return true; 
      const s = String(v).toLowerCase().trim();
      return ["no", "2", "false", "n", "0", "n/a"].includes(s);
    };

    // BMR-T1: INDEMNITY
    if (isYes(reportData.resultsMap.EXE_01?.answer) && isNo(reportData.resultsMap.TEC_01?.answer)) {
      const cost = 180000;
      fractures.push({
        code: "BMR-T1",
        impact: "CRITICAL",
        implicatedNodes: ['EXE', 'TEC'],
        title: "Indemnity Alignment Fracture",
        finding: "Executive policy assumes audit rights; Technical Node reports structural gaps.",
        directive: "DEPLOY SIEM FORENSIC LOGGING",
        action: "Establish immutable logging to stop the $180K/yr legal exposure.",
        cost: cost
      });
      frictionScore += 35;
      cumulativeReworkTax += cost;
    }

    // BMR-M1: SYSTEMIC REWORK TAX (Scales with Slider)
    if (isYes(reportData.resultsMap.MGR_01?.answer) && isNo(reportData.resultsMap.TEC_01?.answer)) {
      const cost = (liveSpend * 1000000) * baseTaxMultiplier * 0.15; 
      fractures.push({
        code: "BMR-M1",
        impact: "HIGH",
        implicatedNodes: ['MGR', 'TEC'],
        title: "Systemic Rework Tax Hemorrhage",
        finding: "Managerial validation claims exist, but Technical Node reports manual rework gaps.",
        directive: "INITIALIZE_REINFORCEMENT_LOOPS",
        action: "Automate validation checkpoints to eliminate manual engineering rework.",
        cost: cost,
        isSystemic: true
      });
      frictionScore += 35;
      cumulativeReworkTax += cost;
    }

    return {
      sfi: Math.min(frictionScore, 100),
      totalTax: cumulativeReworkTax,
      dailyBleed: (cumulativeReworkTax / 365),
      fractures,
      nodes: {
        exe: reportData.nodes.find((n:any) => n.persona_type?.toUpperCase().includes('EXE'))?.status === 'completed',
        mgr: reportData.nodes.find((n:any) => n.persona_type?.toUpperCase().includes('MGR'))?.status === 'completed',
        tec: reportData.nodes.find((n:any) => n.persona_type?.toUpperCase().includes('TEC'))?.status === 'completed',
      }
    };
  }, [reportData, liveSpend]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-600 font-mono italic animate-pulse tracking-[0.4em]">SYNTHESIZING_DOSSIER...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-6 font-sans text-left tracking-tighter leading-none">
      <div className="container mx-auto max-w-4xl">
        
        {/* HEADER */}
        <header className="flex justify-between items-end border-b border-slate-900 pb-8 mb-12">
          <div className="text-left">
            <h1 className="text-red-600 text-3xl font-black uppercase italic tracking-tighter">Forensic Dossier</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold">Entity: {reportData?.org} // Protocol Active</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Fingerprint className="text-slate-800" size={40} />
            <div className="bg-red-600/10 border border-red-600/30 px-4 py-2 flex items-center gap-2">
               <Clock size={14} className="text-red-600 animate-pulse" />
               <span className="text-[10px] font-mono font-black text-red-500 tracking-widest uppercase italic">
                 Bleed: ${activeMetrics?.dailyBleed?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}/Day
               </span>
            </div>
          </div>
        </header>

        {/* FIDUCIARY SLIDER PANEL */}
        <div className="bg-slate-950 border border-slate-900 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Sliders size={18} className="text-red-600" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-bold">Fiduciary Scaling Simulator</span>
            </div>
            <div className="text-xl font-black italic text-white">${liveSpend.toFixed(1)}M <span className="text-[10px] text-slate-500 not-italic ml-2 text-sans">SPEND</span></div>
          </div>
          <input 
            type="range" min="0.1" max="10" step="0.1" 
            value={liveSpend} 
            onChange={(e) => setLiveSpend(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-[8px] font-mono text-slate-600 mt-4 tracking-widest uppercase italic">
            <span>$0.1M Baseline</span>
            <span>Adjust AI Spend to Scale Potential Liability</span>
            <span>$10M Expansion</span>
          </div>
        </div>

        {/* SYSTEMIC ALERT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-black border border-slate-900 p-8 flex flex-col justify-center">
            <div className="text-4xl font-black italic text-white leading-none">${liveSpend}M</div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-2 font-bold">Projected AI Investment</div>
          </div>
          
          {activeMetrics?.fractures.some((f:any) => f.isSystemic) ? (
            <div className="bg-red-600/10 border border-red-600 p-8 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 bg-red-600 text-white text-[8px] font-black uppercase italic">Live_Scaling_Alert</div>
               <div className="text-2xl font-black text-red-500 leading-none uppercase italic">Systemic Gap Liability</div>
               <p className="text-[10px] text-slate-400 mt-2 font-mono uppercase font-bold tracking-tighter">
                 ${(activeMetrics?.fractures.find((f:any) => f.isSystemic)?.cost / 1000).toFixed(0)}K Rework Tax Detected
               </p>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-900 p-8 flex flex-col justify-center">
              <div className="text-2xl font-black text-slate-700 leading-none italic uppercase">No Systemic Gaps</div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">Cross-Node Validation Active</p>
            </div>
          )}
        </div>

        {/* SHEAR ZONE PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-12 text-left">
          <div className="col-span-2 bg-black border border-slate-900 p-12 relative overflow-hidden text-left">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-4 text-white leading-none text-left">THE <span className="text-red-600">SHEAR</span> ZONE</h2>
            <p className="text-slate-500 italic text-[11px] tracking-widest uppercase font-bold mt-6 text-left">Active Fractures: {activeMetrics?.fractures.length}</p>
            <div className="mt-10 h-2 w-full bg-slate-900 overflow-hidden">
              <motion.div animate={{ width: `${activeMetrics?.sfi}%` }} transition={{ duration: 0.5 }} className="h-full bg-red-600" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-950 to-black border border-red-600/30 p-12 text-center flex flex-col justify-center">
            <div className="text-7xl font-black italic text-white leading-none">{activeMetrics?.sfi}%</div>
            <p className="text-[10px] font-mono text-red-500 uppercase mt-2 font-black tracking-widest leading-none">SFI INDEX</p>
            <div className="mt-8 pt-6 border-t border-red-600/20">
              <div className="text-3xl font-black text-white leading-none">${(activeMetrics?.totalTax / 1000).toFixed(0)}K</div>
              <p className="text-[9px] font-mono text-red-400 uppercase font-bold italic mt-2 leading-none">ANNUAL REWORK TAX</p>
            </div>
          </div>
        </div>

        {/* TOPOLOGY MAP */}
        <div className="bg-slate-950 border border-slate-900 p-10 mb-12 text-left">
          <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-12 italic font-bold">Integrity Triangulation Map</h3>
          <div className="flex justify-between items-center max-w-2xl mx-auto relative px-10">
            <div className="absolute h-[1px] w-full bg-slate-900 top-1/2 -translate-y-1/2 left-0 z-0" />
            {[
              { label: 'EXECUTIVE', id: 'EXE', ok: activeMetrics?.nodes.exe },
              { label: 'MANAGER', id: 'MGR', ok: activeMetrics?.nodes.mgr },
              { label: 'TECHNICAL', id: 'TEC', ok: activeMetrics?.nodes.tec }
            ].map((n, i) => {
              const fracture = activeMetrics?.fractures.find((f: any) => f.implicatedNodes.includes(n.id));
              const isRed = fracture?.impact === 'CRITICAL';
              const isYellow = fracture?.impact === 'HIGH';

              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                    !n.ok ? 'border-slate-800 bg-black text-slate-700' :
                    isRed ? 'border-red-600 bg-red-600/20 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]' :
                    isYellow ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]' :
                    'border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                  }`}>
                    {!n.ok ? <Activity size={24} /> : isRed ? <AlertTriangle size={24} className="animate-pulse" /> : isYellow ? <Zap size={24} /> : <ShieldCheck size={24} />}
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest leading-none ${isRed ? 'text-red-500' : isYellow ? 'text-yellow-500' : 'text-slate-500'}`}>{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* FRACTURE CARDS */}
        <div className="space-y-6 mb-20 text-left">
          {activeMetrics?.fractures.map((f: any, i: number) => (
            <div key={i} className="group">
               <div className="bg-slate-950 border border-slate-900 p-10 flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-6 flex-1 text-left">
                    <div className="flex items-center gap-4">
                      <span className={`${f.impact === 'CRITICAL' ? 'bg-red-600' : 'bg-yellow-600'} text-white text-[9px] font-black px-3 py-1 uppercase italic tracking-widest`}>{f.impact}</span>
                      <span className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{f.title}</span>
                    </div>
                    <p className="text-slate-400 italic text-lg leading-snug border-l-2 border-slate-800 pl-8 font-light">"{f.finding}"</p>
                  </div>
                  <div className="text-right min-w-[140px]">
                    <div className="text-3xl font-black italic text-white leading-none">${(f.cost / 1000).toFixed(0)}K</div>
                    <p className="text-[9px] font-mono text-red-500 font-bold uppercase mt-2 leading-none italic text-right">REWORK TAX</p>
                  </div>
               </div>

               <div className="bg-black border-x border-b border-red-600/30 p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                  <div className="flex items-start gap-6 flex-1 text-left">
                    <div className="bg-red-600/10 p-3"><Zap className="text-red-600" size={24} /></div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.4em] mb-2 font-black italic leading-none">Hardening Directive // {f.directive}</p>
                      <p className="text-slate-200 font-bold text-sm leading-relaxed max-w-xl font-sans">{f.action}</p>
                    </div>
                  </div>
                  <button onClick={() => router.push(`/briefings`)} className="bg-red-600 text-white px-8 py-5 font-black uppercase italic text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-lg whitespace-nowrap leading-none">INITIALIZE ROADMAP →</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
