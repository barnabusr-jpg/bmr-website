"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { 
  Sliders, Users, Activity, Clock, ArrowRight, Info, AlertTriangle, Fingerprint, ShieldAlert
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 🛡️ DUAL-INPUT SIMULATOR STATE
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSecondsElapsed(Math.floor((Date.now() - sessionStart) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchAuditData = async () => {
      const { data: audit } = await supabase.from('audits').select('*').eq('id', id).single();
      if (audit) {
        setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
        // Calibrate FTE based on 1 per $200k benchmark
        setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000));
        setReportData(audit);
      }
      setLoading(false);
    };
    fetchAuditData();
  }, [id]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    
    const dbDecay = parseInt(reportData.decay_pct) || 50;
    const currentSpend = liveSpend * 1000000;
    const sector = reportData.sector?.toLowerCase() || 'retail';

    // 🛡️ TACTICAL REFINEMENT 1: Industry Severity
    const baseRiskPercent = (sector === 'healthcare' || sector === 'finance')
        ? Math.max(0.25, Math.min(0.30, dbDecay / 200))
        : Math.max(0.18, Math.min(0.22, dbDecay / 200));

    // 🧮 CALCULATION: ANNUAL REWORK TAX
    const reworkPercent = (dbDecay / 100) * 0.4; 
    const annualReworkTax = (fteCount * reworkPercent) * 160000 * 1.3;

    // 🧮 CALCULATION: INACTION PENALTY (With Drift Accelerator)
    // Assuming drift accelerator based on initial decay as a proxy for system age/fragility
    const annualDriftRate = dbDecay > 70 ? 0.20 : 0.15; 
    const inactionPenalty = (baseRiskPercent * currentSpend) * (1 + annualDriftRate);

    return {
      totalTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      wasteRatio: reworkPercent * 100,
      ghostFTEs: Math.round(fteCount * reworkPercent),
      riskLevel: baseRiskPercent > 0.24 ? 'HIGH' : 'MODERATE'
    };
  }, [reportData, liveSpend, fteCount]);

  if (loading) return <div className="bg-black min-h-screen text-red-600 p-20 font-mono italic animate-pulse">SYNTHESIZING_VERDICT...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-6 font-sans text-left tracking-tighter leading-none">
      <div className="container mx-auto max-w-4xl">
        
        <header className="flex justify-between items-end border-b border-slate-900 pb-8 mb-12">
          <div>
            <h1 className="text-red-600 text-4xl font-black uppercase italic">Forensic Verdict</h1>
            <p className="text-[10px] font-mono text-slate-500 mt-4 tracking-widest uppercase italic font-bold">
              REF_ID: {id?.toString().slice(0,8).toUpperCase()} // NODE: {activeMetrics?.riskLevel}_EXPOSURE
            </p>
          </div>
          <div className={`px-4 py-2 border font-mono text-[10px] font-black italic tracking-widest ${activeMetrics?.riskLevel === 'HIGH' ? 'bg-red-600/10 border-red-600 text-red-600 animate-pulse' : 'bg-yellow-600/10 border-yellow-600 text-yellow-600'}`}>
            {activeMetrics?.riskLevel}_RISK_DETECTED
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-950 border border-slate-900 p-10 flex flex-col justify-center">
            <div className="text-6xl font-black italic text-white leading-none">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-4 font-black italic">Annual Rework Tax</div>
          </div>

          <div className="bg-red-950/20 border border-red-600/50 p-10 flex flex-col justify-center">
            <div className="text-6xl font-black text-red-500 leading-none italic">${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
            <div className="text-[9px] font-mono text-red-400 uppercase font-black tracking-tighter mt-4 italic">12-Month Inaction Penalty</div>
          </div>
        </div>

        {/* 🛡️ REFINEMENT 3: WASTE RATIO VISUALIZATION */}
        <div className="bg-slate-950 border border-slate-900 p-10 mb-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <ShieldAlert size={80} className="text-red-600" />
            </div>
            <div className="text-5xl font-black italic text-white mb-2">{activeMetrics?.wasteRatio.toFixed(0)}%</div>
            <div className="text-[10px] font-mono text-red-600 uppercase font-black tracking-widest mb-6 italic italic">Engineering Waste Ratio</div>
            <p className="text-[11px] text-slate-400 font-mono uppercase tracking-tight leading-relaxed max-w-xl font-bold italic">
                Your team of <span className="text-white">{fteCount} engineers</span> is spending <span className="text-white">{activeMetrics?.wasteRatio.toFixed(0)}%</span> of their capacity on manual rework—equivalent to losing <span className="text-red-500">{activeMetrics?.ghostFTEs} full-time salaries</span> to structural drift.
            </p>
        </div>

        <div className="bg-slate-950 border border-slate-900 p-10 space-y-12 mb-12">
          <h3 className="text-[10px] font-mono text-red-600 font-black uppercase tracking-[0.4em] italic leading-none flex items-center gap-2">
            <Sliders size={16}/> Dual-Variable Exposure Simulator
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold italic">Capital_Spend</span>
                <span className="text-xl font-black italic text-white">${liveSpend.toFixed(1)}M</span>
              </div>
              <input type="range" min="0.1" max="50" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 accent-red-600 appearance-none cursor-pointer" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold italic">Headcount</span>
                <span className="text-xl font-black italic text-white">{fteCount} FTEs</span>
              </div>
              <input type="range" min="1" max="200" step="1" value={fteCount} onChange={(e) => setFteCount(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 accent-red-600 appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="bg-white p-12 flex justify-between items-center group cursor-pointer hover:bg-slate-100 transition-all border-l-8 border-red-600" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left">
            <h4 className="text-black text-3xl font-black italic uppercase tracking-tighter leading-none">Initialize 360° Triangulation</h4>
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2 italic">Ref ID: {id?.toString().slice(0,8).toUpperCase()} requires immediate clinical validation.</p>
          </div>
          <ArrowRight className="text-black group-hover:translate-x-4 transition-transform" size={40} />
        </div>

      </div>
    </div>
  );
}
