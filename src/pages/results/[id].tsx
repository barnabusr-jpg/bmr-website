"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Fingerprint, Activity, Zap, ShieldCheck, AlertTriangle, Clock, Sliders, Lock, ArrowRight, CheckCircle2, Info } from "lucide-react";
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
    const timer = setInterval(() => setSecondsElapsed(Math.floor((Date.now() - sessionStart) / 1000)), 1000);
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
        const resultsMap: any = {};
        nodesRes.data.forEach(n => {
          const persona = (n.persona_type || "").toUpperCase();
          const prefix = persona.includes("EXE") ? "EXE" : persona.includes("MGR") ? "MGR" : "TEC";
          if (n.raw_responses) {
            Object.entries(n.raw_responses).forEach(([qId, val]: any) => {
              const qNum = qId.includes('_') ? qId.split('_')[1] : qId.replace(/[^0-9]/g, '');
              resultsMap[`${prefix}_${qNum}`] = {
                answer: typeof val === 'object' ? val.answer : val,
                evidence: val?.evidence || n.evidence_log || "ANALYSIS_PENDING"
              };
            });
          }
        });
        setLiveSpend(parseFloat(String(audit.ai_spend || "1.2").replace(/[^0-9.]/g, '')) || 1.2);
        setReportData({ audit, nodes: nodesRes.data, resultsMap, org: audit.org_name });
      }
      setLoading(false);
    };
    fetchAuditData();
  }, [id]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    let frictionScore = 0; let cumulativeReworkTax = 0; const fractures = [];
    const isYes = (v: any) => ["yes", "1", "6", "true", "y"].some(term => String(v || "").toLowerCase().includes(term));
    const isNo = (v: any) => !v || ["no", "2", "false", "n", "0"].includes(String(v).toLowerCase().trim());

    const rawAnswers = Object.values(reportData.resultsMap || {});
    const totalWeight = rawAnswers.reduce((acc: number, curr: any) => acc + (parseInt(curr.answer) || 0), 0);
    const calculatedSFI = Math.min(Math.round((totalWeight / 120) * 100), 100) || 74;

    if (isYes(reportData.resultsMap.EXE_01?.answer) && isNo(reportData.resultsMap.TEC_01?.answer)) {
      const cost = 180000;
      fractures.push({ 
        code: "BMR-T1", 
        impact: "CRITICAL", 
        title: "Indemnity Alignment Gap", 
        finding: "Leadership assumes audit rights, but ATLAS reports zero immutable logging. This creates manual labor overhead of $180K/yr (2 FTEs @ $90K/yr).", 
        action: "Deploy SIEM logging in 3 days.", 
        cost 
      });
      cumulativeReworkTax += cost;
    }

    const systemicLeak = (liveSpend * 1000000) * (calculatedSFI / 100) * 0.15;
    const totalTax = cumulativeReworkTax + systemicLeak;
    const dailyBleed = totalTax / 365;

    return {
      sfi: calculatedSFI,
      totalTax: totalTax,
      inactionPenalty: totalTax * 1.2,
      dailyBleed, 
      currentSessionBleed: (dailyBleed / 86400) * secondsElapsed, 
      fractures
    };
  }, [reportData, liveSpend, secondsElapsed]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-600 font-mono italic animate-pulse tracking-[0.4em]">SYNTHESIZING_VERDICT...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-6 font-sans text-left tracking-tighter leading-none">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-end border-b border-slate-900 pb-8 mb-4">
          <div className="text-left">
            <h1 className="text-red-600 text-3xl font-black uppercase italic tracking-tighter leading-none">Audit Verdict</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic leading-none">
              Ref ID: {id?.slice(0,8).toUpperCase()} // Primary Node: {reportData?.nodes?.[0]?.persona_type || "AUTHORIZED"}
            </p>
          </div>
          <div className="bg-red-600/10 border border-red-600/30 px-4 py-2 flex items-center gap-2 animate-pulse">
             <Clock size={14} className="text-red-600" />
             <span className="text-[10px] font-mono font-black text-red-500 tracking-widest uppercase italic leading-none">
               Cost of Delay: +${activeMetrics?.currentSessionBleed?.toFixed(4)}
             </span>
          </div>
        </header>

        {/* FINANCIAL SUMMARY: SELF-EXPLANATORY DEFINITIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="group relative bg-slate-950 border border-slate-900 p-10 flex flex-col justify-center overflow-visible">
            <div className="text-6xl font-black italic text-white leading-none">${(activeMetrics?.totalTax / 1000).toFixed(0)}K</div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-4 font-black italic">Annual Rework Tax</div>
            <p className="text-[10px] text-slate-500 font-mono mt-4 uppercase tracking-tighter leading-tight font-bold italic">
              Hidden overhead caused by manual validation of unverified AI outputs.
            </p>
            <div className="absolute top-2 right-2 p-4 opacity-20 group-hover:opacity-100 transition-opacity bg-red-600 text-[8px] font-mono uppercase text-white p-2">Bridge: Spend x SFI (${activeMetrics?.sfi}%) x 15%</div>
          </div>
          <div className="bg-red-950/20 border border-red-600/50 p-10 flex flex-col justify-center">
            <div className="text-6xl font-black text-red-500 leading-none italic leading-none">${(activeMetrics?.inactionPenalty / 1000).toFixed(0)}K</div>
            <div className="text-[9px] font-mono text-red-400 uppercase font-black tracking-tighter mt-4 italic">12-Month Inaction Penalty</div>
            <p className="text-[10px] text-red-900 font-mono mt-4 uppercase tracking-tighter leading-tight font-bold italic">
              Projected financial leakage if identified fractures remain unaddressed.
            </p>
          </div>
        </div>

        {/* SCALE SIMULATOR */}
        <div className="bg-slate-950 border border-slate-900 p-8 mb-12">
          <div className="flex justify-between items-center mb-6 text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-bold italic leading-none">
            <div className="flex items-center gap-3"><Sliders size={18} className="text-red-600" /> Capital Exposure Simulator</div>
            <div className="text-xl font-black italic text-white">${liveSpend.toFixed(1)}M SPEND</div>
          </div>
          <input type="range" min="0.1" max="10" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </div>

        {/* CONCISE TRIANGULATION EXPLANATION */}
        <div className="mb-12 bg-slate-950/50 border border-slate-800 p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-red-600/10 p-4 border border-red-600/30">
               <Info className="text-red-600" size={32} />
            </div>
            <div>
               <h3 className="text-xs font-black uppercase tracking-widest text-white mb-2 italic">Provisional Accuracy Warning</h3>
               <p className="text-[11px] font-mono uppercase tracking-widest leading-relaxed text-slate-500 font-bold">
                 This verdict reflects a <span className="text-white">single-node perspective</span>. Full Triangulation is required to cross-reference Executive, Managerial, and Technical datasets to identify <span className="text-red-600">Logic Shear</span> and finalize your Hardening Roadmap.
               </p>
            </div>
        </div>

        {/* RECOVERY ROADMAP */}
        <div className="mb-12">
           <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] mb-8 italic font-bold">Quick Wins // 3-Day Recovery Roadmap</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-8 hover:border-green-500/50 transition-all group">
                 <div className="flex justify-between items-start mb-4">
                    <CheckCircle2 size={24} className="text-green-500" />
                    <span className="text-[9px] font-mono text-slate-600 group-hover:text-green-500 transition-colors uppercase font-bold tracking-widest">3-Day Fix</span>
                 </div>
                 <h4 className="text-white font-black italic uppercase text-lg leading-tight mb-2">Deploy Forensic Snapshots</h4>
                 <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-widest font-bold italic leading-none">Closes $180K/yr Indemnity Gap immediately via automated logging.</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-8 hover:border-yellow-500/50 transition-all group">
                 <div className="flex justify-between items-start mb-4">
                    <Zap size={24} className="text-yellow-500" />
                    <span className="text-[9px] font-mono text-slate-600 group-hover:text-yellow-500 transition-colors uppercase font-bold tracking-widest">5-Day Fix</span>
                 </div>
                 <h4 className="text-white font-black italic uppercase text-lg leading-tight mb-2">Initialize Loop Checks</h4>
                 <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-widest font-bold italic leading-none">Reduces Manual Rework by 30% through automated TITAN node validation.</p>
              </div>
           </div>
        </div>

        {/* UPDATED CTA: POINTS TO BRIEFINGS */}
        <div className="bg-white p-12 flex flex-col md:flex-row justify-between items-center gap-8 group cursor-pointer hover:bg-red-600 transition-all border-l-8 border-red-600" onClick={() => window.location.href = '/briefings'}>
           <div className="text-left">
              <h4 className="text-black text-3xl font-black italic uppercase tracking-tighter leading-none group-hover:text-white transition-colors">Start 360° Triangulation</h4>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2 group-hover:text-red-100 transition-colors italic">Access the Evidence Vault to validate these provisional findings.</p>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-black text-black group-hover:text-white uppercase tracking-widest">Enter Vault</span>
              <ArrowRight className="text-black group-hover:text-white transition-colors" size={40} />
           </div>
        </div>
      </div>
    </div>
  );
}
