"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { 
  Fingerprint, Activity, Zap, ShieldCheck, AlertTriangle, 
  Clock, Sliders, Lock, ArrowRight, CheckCircle2, Info 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

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
          // Normalize persona matching
          const persona = (n.persona_type || "").toUpperCase();
          let prefix = "EXE";
          if (persona.includes("MGR") || persona.includes("MANAG")) prefix = "MGR";
          if (persona.includes("TEC")) prefix = "TEC";

          if (n.raw_responses) {
            Object.entries(n.raw_responses).forEach(([qId, val]: any) => {
              const qNum = qId.replace(/[^0-9]/g, '');
              const numericAnswer = typeof val === 'object' ? val.answer : val;
              
              resultsMap[`${prefix}_${qNum}`] = {
                answer: parseInt(numericAnswer) || 0,
                evidence: val?.evidence || n.evidence_log || "ANALYSIS_SECURED"
              };
            });
          }
        });

        // Pull unique spend from this specific audit
        const dbSpend = parseFloat(String(audit.ai_spend || "1.2").replace(/[^0-9.]/g, ''));
        setLiveSpend(dbSpend || 1.2);
        setReportData({ audit, nodes: nodesRes.data, resultsMap });
      }
      setLoading(false);
    };
    fetchAuditData();
  }, [id]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    
    const results = reportData.resultsMap;
    const rawAnswers = Object.values(results || {});
    
    // 🧠 THE BRAIN: Remove hardcoded "|| 74" to allow unique math
    const totalWeight = rawAnswers.reduce((acc: number, curr: any) => acc + (parseInt(curr.answer as string) || 0), 0);
    
    // Calculate SFI dynamically based on questions answered
    const maxPossible = rawAnswers.length > 0 ? rawAnswers.length * 10 : 120;
    const calculatedSFI = maxPossible > 0 ? Math.min(Math.round((totalWeight / maxPossible) * 100), 100) : 0;

    // 🛡️ Logic Shear Triggers
    const isFormalized = (v: any) => parseInt(v || "10") <= 4;
    const isLegacy = (v: any) => parseInt(v || "0") >= 6;
    const isHighWaste = (v: any) => parseInt(v || "0") >= 8;

    const triggerAlpha = isFormalized(results.MGR_02?.answer) && isLegacy(results.TEC_01?.answer);
    const triggerBeta = isFormalized(results.MGR_04?.answer) && isHighWaste(results.TEC_04?.answer);

    // Financial Engine
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
      isOptimized: calculatedSFI < 40 && !triggerAlpha && !triggerBeta
    };
  }, [reportData, liveSpend, secondsElapsed]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-600 font-mono italic animate-pulse tracking-[0.4em]">SYNTHESIZING_VERDICT...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-6 font-sans text-left tracking-tighter leading-none">
      <div className="container mx-auto max-w-4xl">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-900 pb-8 mb-4 gap-4">
          <div className="text-left">
            <h1 className="text-red-600 text-3xl font-black uppercase italic tracking-tighter leading-none">Audit Verdict</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-4 tracking-widest font-bold italic leading-none">
              Ref ID: {String(id).slice(0,8).toUpperCase()} // Operator: {reportData?.audit?.org_name || "AUTHORIZED"}
            </p>
          </div>
          <div className="bg-red-600/10 border border-red-600/30 px-4 py-2 flex items-center gap-2">
             <Clock size={14} className="text-red-600 animate-pulse" />
             <span className="text-[10px] font-mono font-black text-red-500 tracking-widest uppercase italic leading-none">
                Cost of Delay: +${activeMetrics?.currentSessionBleed?.toFixed(4)}
             </span>
          </div>
        </header>

        {/* 📊 DYNAMIC METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="group relative bg-slate-950 border border-slate-900 p-10 flex flex-col justify-center">
            <div className="text-6xl font-black italic text-white leading-none">
              ${activeMetrics ? (activeMetrics.totalTax / 1000).toFixed(0) : "0"}K
            </div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-4 font-black italic">Annual Rework Tax</div>
          </div>
          <div className="bg-red-950/20 border border-red-600/50 p-10 flex flex-col justify-center">
            <div className="text-6xl font-black text-red-500 leading-none italic">
              ${activeMetrics ? (activeMetrics.inactionPenalty / 1000).toFixed(0) : "0"}K
            </div>
            <div className="text-[9px] font-mono text-red-400 uppercase font-black tracking-tighter mt-4 italic">12-Month Inaction Penalty</div>
          </div>
        </div>

        {/* 🎚️ SIMULATOR SECTION */}
        <div className="bg-slate-950 border border-slate-900 p-8 mb-12">
          <div className="mb-6 space-y-2 text-left">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-bold italic leading-none gap-4">
              <div className="flex items-center gap-3"><Sliders size={18} className="text-red-600" /> Capital Exposure Simulator</div>
              <div className="text-xl font-black italic text-white">${liveSpend.toFixed(1)}M SPEND</div>
            </div>
          </div>
          <input 
            type="range" min="0.1" max="10" step="0.1" 
            value={liveSpend} 
            onChange={(e) => setLiveSpend(parseFloat(e.target.value))} 
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600 mt-4" 
          />
        </div>

        {/* 🛡️ DYNAMIC LOGIC SHEAR ANALYSIS */}
        <div className="mb-12">
          <div className="mb-8 border-l-2 border-red-600 pl-4">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">
              {activeMetrics?.isOptimized ? "No Immediate Contradictions Detected" : "Logic Contradictions Detected"}
            </h3>
            <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mt-3 font-bold italic">
              {activeMetrics?.isOptimized ? "Signal Scan: Nominal" : "Detected high probability of Logic Shear across organizational layers."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeMetrics?.triggerAlpha && (
              <div className="bg-slate-950 border border-slate-900 p-8 space-y-4">
                <div className="flex justify-between items-center text-red-600 font-black font-mono text-[9px] uppercase italic">
                  <Fingerprint size={20} /> Signal_Alpha
                </div>
                <h4 className="text-white font-black italic uppercase text-lg leading-tight">Governance vs. Reality</h4>
                <p className="text-slate-500 text-xs leading-relaxed italic">Misalignment between oversight nodes and active execution deployments.</p>
              </div>
            )}
            {activeMetrics?.triggerBeta && (
              <div className="bg-slate-950 border border-slate-900 p-8 space-y-4">
                <div className="flex justify-between items-center text-red-600 font-black font-mono text-[9px] uppercase italic">
                  <Activity size={20} /> Signal_Beta
                </div>
                <h4 className="text-white font-black italic uppercase text-lg leading-tight">Efficiency vs. Rework</h4>
                <p className="text-slate-500 text-xs leading-relaxed italic">Operational friction causing compounding technical debt and rework tax.</p>
              </div>
            )}
          </div>
        </div>

        {/* 📅 CALENDLY CTA */}
        <div 
          className="bg-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 group cursor-pointer hover:bg-slate-100 transition-all border-l-8 border-red-600" 
          onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review', '_blank')}
        >
           <div className="text-left">
              <h4 className="text-black text-3xl font-black italic uppercase tracking-tighter leading-none">Initialize 360° Triangulation</h4>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2 italic">Schedule your briefing for Ref ID: {String(id).slice(0,8).toUpperCase()}.</p>
           </div>
           <ArrowRight className="text-black group-hover:translate-x-2 transition-transform" size={40} />
        </div>
      </div>
    </div>
  );
}
