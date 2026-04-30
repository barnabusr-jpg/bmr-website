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
    
    const results = reportData.resultsMap;
    // Signal Detection Helpers
    const isFormalized = (v: any) => parseInt(v || "10") <= 4;
    const isLegacy = (v: any) => parseInt(v || "0") >= 6;
    const isHighWaste = (v: any) => parseInt(v || "0") >= 8;

    // CONTRACTION TRIGGERS
    // Alpha: Intent (RT_02) doesn't match Tech (ED_01)
    const triggerAlpha = isFormalized(results.MGR_02?.answer) && isLegacy(results.TEC_01?.answer);
    // Beta: ROI Impact (DG_01) doesn't match Waste (ED_04)
    const triggerBeta = isFormalized(results.MGR_04?.answer) && isHighWaste(results.TEC_04?.answer);

    const rawAnswers = Object.values(results || {});
    const totalWeight = rawAnswers.reduce((acc: number, curr: any) => acc + (parseInt(curr.answer) || 0), 0);
    const calculatedSFI = Math.min(Math.round((totalWeight / 120) * 100), 100) || 74;

    const systemicLeak = (liveSpend * 1000000) * (calculatedSFI / 100) * 0.15;
    const totalTax = systemicLeak;

    return {
      sfi: calculatedSFI,
      totalTax: totalTax,
      inactionPenalty: totalTax * 1.2,
      dailyBleed: totalTax / 365,
      currentSessionBleed: ((totalTax / 365) / 86400) * secondsElapsed,
      triggerAlpha,
      triggerBeta,
      isSystemic: triggerAlpha && triggerBeta,
      isOptimized: !triggerAlpha && !triggerBeta
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
              Ref ID: {id?.slice(0,8).toUpperCase()} // Operator: {reportData?.nodes?.[0]?.full_name || "AUTHORIZED"}
            </p>
          </div>
          <div className="bg-red-600/10 border border-red-600/30 px-4 py-2 flex items-center gap-2 animate-pulse">
             <Clock size={14} className="text-red-600" />
             <span className="text-[10px] font-mono font-black text-red-500 tracking-widest uppercase italic leading-none">
               Cost of Delay: +${activeMetrics?.currentSessionBleed?.toFixed(4)}
             </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="group relative bg-slate-950 border border-slate-900 p-10 flex flex-col justify-center">
            <div className="text-6xl font-black italic text-white leading-none">${(activeMetrics?.totalTax / 1000).toFixed(0)}K</div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-4 font-black italic">Annual Rework Tax</div>
            <p className="text-[10px] text-slate-500 font-mono mt-4 uppercase tracking-tighter leading-tight font-bold italic italic">
              Measuring existing capital waste caused by manual validation and logic drift.
            </p>
          </div>
          <div className="bg-red-950/20 border border-red-600/50 p-10 flex flex-col justify-center">
            <div className="text-6xl font-black text-red-500 leading-none italic">${(activeMetrics?.inactionPenalty / 1000).toFixed(0)}K</div>
            <div className="text-[9px] font-mono text-red-400 uppercase font-black tracking-tighter mt-4 italic">12-Month Inaction Penalty</div>
            <p className="text-[10px] text-red-900 font-mono mt-4 uppercase tracking-tighter leading-tight font-bold italic">
              The projected financial cost of allowing identified fractures to remain unaddressed.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 p-8 mb-12">
          <div className="mb-6 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-bold italic leading-none">
              <div className="flex items-center gap-3"><Sliders size={18} className="text-red-600" /> Capital Exposure Simulator</div>
              <div className="text-xl font-black italic text-white">${liveSpend.toFixed(1)}M SPEND</div>
            </div>
            <p className="text-[9px] font-mono text-red-600 uppercase tracking-widest animate-pulse font-bold">
              Adjust the slider to modify AI Spend numbers to reveal adjusted results.
            </p>
          </div>
          <input type="range" min="0.1" max="10" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </div>

        {/* DYNAMIC LOGIC CONTRADICTIONS SECTION */}
        <div className="mb-12">
          <div className="mb-8 border-l-2 border-red-600 pl-4">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">
              Logic Contradictions Detected
            </h3>
            <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mt-3 font-bold italic">
              {activeMetrics?.isOptimized 
                ? "Initial inputs do not frame immediate logic contradictions." 
                : "Your response frames an internal misalignment, indicating a high probability of Logic Shear."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeMetrics?.triggerAlpha && (
              <div className="bg-slate-950 border border-slate-900 p-8 space-y-4">
                <div className="flex justify-between items-center text-red-600">
                  <Fingerprint size={20} />
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest italic font-bold">Signal_Alpha</span>
                </div>
                <h4 className="text-white font-black italic uppercase text-lg leading-tight">Governance vs. Reality</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-medium italic">
                  Your input frames an oversight disconnect with a potential to impact your indemnity standing and long-term regulatory compliance.
                </p>
              </div>
            )}

            {activeMetrics?.triggerBeta && (
              <div className="bg-slate-950 border border-slate-900 p-8 space-y-4">
                <div className="flex justify-between items-center text-red-600">
                  <Activity size={20} />
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest italic font-bold">Signal_Beta</span>
                </div>
                <h4 className="text-white font-black italic uppercase text-lg leading-tight">Efficiency vs. Rework</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-medium italic">
                  Your input frames a significant ROI friction point with a potential to impact your operational scale and margin preservation.
                </p>
              </div>
            )}

            {activeMetrics?.isSystemic && (
              <div className="md:col-span-2 bg-red-950/10 border border-red-900/50 p-8 space-y-4">
                <div className="flex items-center gap-3 text-red-500">
                  <AlertTriangle size={20} />
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest italic font-bold italic">Critical_Status</span>
                </div>
                <h4 className="text-white font-black italic uppercase text-xl leading-tight text-red-500 italic">Total Structural Logic Shear</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium italic">
                  Your input frames a state of total structural drift with a potential to impact your Rework Tax by compounding technical debt.
                </p>
              </div>
            )}

            {activeMetrics?.isOptimized && (
              <div className="md:col-span-2 bg-slate-950 border border-slate-900 p-8">
                <p className="text-slate-500 text-[11px] font-mono uppercase tracking-widest leading-relaxed font-bold italic">
                  Your input does not frame immediate logic contradictions. However, a single-node audit cannot account for cross-departmental friction.
                </p>
              </div>
            )}
          </div>
        </div>

        <div 
          className="bg-white p-12 flex flex-col md:flex-row justify-between items-center gap-8 group cursor-pointer hover:bg-slate-100 transition-all border-l-8 border-red-600" 
          onClick={() => window.location.href = 'https://calendly.com/hello-bmradvisory/forensic-review'}
        >
           <div className="text-left">
              <h4 className="text-black text-3xl font-black italic uppercase tracking-tighter leading-none">Initialize 360° Triangulation</h4>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2 italic">Schedule your clinical briefing to verify Ref ID: {id?.slice(0,8).toUpperCase()}.</p>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-black text-black uppercase tracking-widest">Schedule Briefing</span>
              <ArrowRight className="text-black group-hover:translate-x-2 transition-transform" size={40} />
           </div>
        </div>

        <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.href = '/briefings'}
              className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.3em] hover:text-red-600 transition-colors font-bold italic"
            >
              View Evidence Vault // Forensic Briefings →
            </button>
        </div>
      </div>
    </div>
  );
}
