"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Fingerprint, Activity, Zap, ShieldCheck, AlertTriangle, Clock, Sliders, ShieldAlert, Lock, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [sessionStart] = useState(Date.now());
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStart]);

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
                evidence: val?.evidence || n.evidence_log || "LOG_DATA_ENCRYPTED"
              };
            });
          }
        });
        setLiveSpend(parseFloat(String(audit.ai_spend || "1.2").replace(/[^0-9.]/g, '')) || 1.2);
        setReportData({ audit, nodes, resultsMap, org: audit.org_name });
      }
      setLoading(false);
    };
    fetchAuditData();
  }, [id]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    let frictionScore = 0;
    let cumulativeReworkTax = 0;
    const fractures = [];
    const baseTaxMultiplier = parseFloat(String(reportData.audit.rework_tax || "0.9").replace(/[^0-9.]/g, '')) || 0.9;
    const isYes = (v: any) => ["yes", "1", "6", "true", "y"].some(term => String(v || "").toLowerCase().includes(term));
    const isNo = (v: any) => !v || ["no", "2", "false", "n", "0"].includes(String(v).toLowerCase().trim());

    if (isYes(reportData.resultsMap.EXE_01?.answer) && isNo(reportData.resultsMap.TEC_01?.answer)) {
      const cost = 180000;
      fractures.push({ code: "BMR-T1", impact: "CRITICAL", implicatedNodes: ['PHOENIX', 'ATLAS'], title: "Indemnity Alignment Fracture", finding: "PHOENIX assumes audit rights; ATLAS reports zero immutable SIEM logging.", directive: "STRUCTURAL_HARDENING_REQUIRED", action: "Deploy BMR Forensic snapshots to close the $180K/yr liability gap.", cost });
      frictionScore += 35; cumulativeReworkTax += cost;
    }
    if (isYes(reportData.resultsMap.MGR_01?.answer) && isNo(reportData.resultsMap.TEC_01?.answer)) {
      const cost = (liveSpend * 1000000) * baseTaxMultiplier * 0.15; 
      fractures.push({ code: "BMR-M1", impact: "HIGH", implicatedNodes: ['TITAN', 'ATLAS'], title: "Validation Latency Fracture", finding: "Perceptual gap detected between TITAN assumptions and ATLAS ground truth.", directive: "INITIALIZE_REINFORCEMENT_LOOPS", action: "Automate cross-node checkpoints to eliminate manual engineering rework.", cost, isSystemic: true });
      frictionScore += 35; cumulativeReworkTax += cost;
    }

    const totalTax = cumulativeReworkTax;
    const dailyBleed = totalTax / 365;
    return {
      sfi: Math.min(frictionScore, 100),
      totalTax,
      inactionPenalty: totalTax * 1.2,
      dailyBleed,
      currentSessionBleed: (dailyBleed / 86400) * secondsElapsed,
      fractures,
      nodes: {
        exe: reportData.nodes.find((n:any) => n.persona_type?.toUpperCase().includes('EXE'))?.status === 'completed',
        mgr: reportData.nodes.find((n:any) => n.persona_type?.toUpperCase().includes('MGR'))?.status === 'completed',
        tec: reportData.nodes.find((n:any) => n.persona_type?.toUpperCase().includes('TEC'))?.status === 'completed',
      }
    };
  }, [reportData, liveSpend, secondsElapsed]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-600 font-mono italic animate-pulse tracking-[0.4em]">SYNTHESIZING_PERCEPTUAL_AUDIT...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-6 font-sans text-left tracking-tighter leading-none">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-end border-b border-slate-900 pb-8 mb-4">
          <div className="text-left">
            <h1 className="text-red-600 text-3xl font-black uppercase italic tracking-tighter leading-none">Perceptual Fracture Audit</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold">Ref ID: {id?.slice(0,8).toUpperCase()} // EYES ONLY (EXECUTIVE)</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Fingerprint className="text-slate-800" size={40} />
            <div className="bg-red-600/10 border border-red-600/30 px-4 py-2 flex items-center gap-2 animate-pulse">
               <Clock size={14} className="text-red-600" />
               <span className="text-[10px] font-mono font-black text-red-500 tracking-widest uppercase italic leading-none">Cost of Delay: +${activeMetrics?.currentSessionBleed?.toFixed(4)}</span>
            </div>
          </div>
        </header>

        <div className="bg-yellow-600/5 border-y border-yellow-600/20 py-3 mb-12 flex items-center justify-center gap-4">
          <ShieldAlert size={14} className="text-yellow-600" />
          <span className="text-[8px] font-mono text-yellow-600 uppercase tracking-[0.4em] font-bold">Provisional Assessment // 360° Triangulation Pending // Fiduciary Discovery in Progress</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-950 border border-slate-900 p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="text-5xl font-black italic text-white leading-none">${(activeMetrics?.totalTax / 1000).toFixed(0)}K</div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-4 font-bold">Annual Rework Tax Liability</div>
            <div className="absolute top-2 right-2 text-slate-800 opacity-20"><Lock size={12} /></div>
          </div>
          <div className="bg-red-950/20 border border-red-600/50 p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-red-600 text-white text-[8px] font-black uppercase italic">Inaction_Penalty_12MO</div>
            <div className="text-5xl font-black text-red-500 leading-none italic leading-none">${(activeMetrics?.inactionPenalty / 1000).toFixed(0)}K</div>
            <div className="text-[9px] font-mono text-red-400 uppercase font-bold tracking-tighter mt-4">Projected Cost of Doing Nothing</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 p-8 mb-8">
          <div className="flex justify-between items-center mb-6 text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-bold">
            <div className="flex items-center gap-3"><Sliders size={18} className="text-red-600" /> Fiduciary Scaling Simulator</div>
            <div className="text-xl font-black italic text-white">${liveSpend.toFixed(1)}M SPEND</div>
          </div>
          <input type="range" min="0.1" max="10" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </div>

        <div className="bg-red-900/10 border border-red-900/30 p-8 mb-12 text-[9px] font-mono text-red-500 uppercase tracking-[0.2em] leading-relaxed italic">
          ⚠️ <strong>LEGAL DISCLAIMER:</strong> This audit identifies material misalignments between leadership assumptions and technical reality. Failure to address these fractures may result in regulatory exposure or financial leakage.
        </div>

        <div className="bg-slate-950 border border-slate-900 p-10 mb-12">
          <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-12 italic font-bold">Perceptual Triangulation Map (Codenamed)</h3>
          <div className="flex justify-between items-center max-w-2xl mx-auto relative px-10">
            <div className="absolute h-[1px] w-full bg-slate-900 top-1/2 -translate-y-1/2 left-0 z-0" />
            {[{ label: 'PHOENIX (EXE)', id: 'PHOENIX', ok: activeMetrics?.nodes.exe }, { label: 'TITAN (MGR)', id: 'TITAN', ok: activeMetrics?.nodes.mgr }, { label: 'ATLAS (TEC)', id: 'ATLAS', ok: activeMetrics?.nodes.tec }].map((n, i) => {
              const fracture = activeMetrics?.fractures.find((f: any) => f.implicatedNodes.includes(n.id));
              const isRed = fracture?.impact === 'CRITICAL';
              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${!n.ok ? 'border-slate-800 bg-black text-slate-700' : isRed ? 'border-red-600 bg-red-600/20 text-red-600' : 'border-green-500 bg-green-500/10 text-green-500'}`}>
                    {!n.ok ? <Lock size={20} className="text-slate-800" /> : isRed ? <AlertTriangle size={24} className="animate-pulse" /> : <ShieldCheck size={24} />}
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isRed ? 'text-red-500' : 'text-slate-500'}`}>{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 mb-20">
          {activeMetrics?.fractures.map((f: any, i: number) => (
            <div key={i} className="group">
               <div className="bg-slate-950 border border-slate-900 p-10 flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-6 flex-1 text-left">
                    <div className="flex items-center gap-4">
                      <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 uppercase italic tracking-widest">Fiduciary Discovery</span>
                      <span className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{f.title}</span>
                    </div>
                    <p className="text-slate-400 italic text-lg leading-snug border-l-2 border-slate-800 pl-8 font-light">"{f.finding}"</p>
                  </div>
                  <div className="text-right min-w-[140px]">
                    <div className="text-3xl font-black italic text-white leading-none">${(f.cost / 1000).toFixed(0)}K</div>
                    <p className="text-[9px] font-mono text-red-500 font-bold uppercase mt-2 italic text-right leading-none">ANNUAL_OVERHEAD_LEAK</p>
                  </div>
               </div>
               <div className="bg-black border-x border-b border-red-600/30 p-10 flex flex-col md:flex-row justify-between items-start gap-8 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                  <div className="flex-1">
                    <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.4em] mb-4 font-black italic leading-none flex items-center gap-2"><EyeOff size={14} /> 🔒 Classified: Full 360° Audit Preview</p>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed font-bold">This Perceptual Fracture Audit reflects one node’s perspective. A full BMR Engagement includes:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">
                       <li className="flex items-center gap-2"><Zap size={10} className="text-red-600" /> PHOENIX/TITAN/ATLAS Triangulation</li>
                       <li className="flex items-center gap-2"><Zap size={10} className="text-red-600" /> Hardening Roadmap (ROI: 6.2x)</li>
                    </ul>
                  </div>
                  <button onClick={() => router.push(`/briefings`)} className="bg-red-600 text-white px-10 py-6 font-black uppercase italic text-[10px] tracking-[0.2em] hover:bg-white hover:text-red-600 transition-all shadow-xl self-end leading-none">REQUEST_CLEARANCE →</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
