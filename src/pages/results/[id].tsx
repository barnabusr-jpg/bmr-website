"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import { Sliders, Activity, ArrowRight, BarChart3, Lock, ShieldAlert, Zap, Hammer, Printer } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id, clearance } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);
  const [displayPenalty, setDisplayPenalty] = useState(0);

  // 🛡️ ADMIN CHECK: Is this the unredacted version?
  const isAdminView = clearance === 'alpha7';

  useEffect(() => {
    const pathId = id || window.location.pathname.split('/').pop();
    if (!pathId || pathId === '[id]' || pathId === 'results') return;

    const fetchAuditData = async () => {
      const cleanId = String(pathId).trim().toLowerCase();
      const { data: audit } = await supabase.from('audits').select('*').eq('id', cleanId).maybeSingle();
      if (audit) {
        setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
        setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000) || 5);
        setReportData(audit);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchAuditData();
  }, [id]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    const dbDecay = parseInt(reportData.decay_pct) || 0;
    const currentSpend = liveSpend * 1000000;
    const reworkPercent = (dbDecay / 100) * 0.4; 
    const annualReworkTax = (fteCount * reworkPercent) * 160000 * 1.3;
    const ghostFTEs = Math.round(fteCount * reworkPercent);
    const dynamicMultiplier = (dbDecay / 100) * 0.35; 
    const inactionPenalty = (dynamicMultiplier * currentSpend) * 1.15;

    return {
      totalTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      wasteRatio: reworkPercent * 100,
      ghostFTEs: ghostFTEs,
      riskStatus: dbDecay > 60 ? 'CRITICAL_FRACTURE' : 'UNSTABLE_DRIFT'
    };
  }, [reportData, liveSpend, fteCount]);

  useEffect(() => {
    if (activeMetrics?.inactionPenalty) {
      let start = displayPenalty;
      const end = activeMetrics.inactionPenalty;
      const increment = (end - start) / 90;
      const timer = setInterval(() => {
        start += increment;
        if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
          setDisplayPenalty(end);
          clearInterval(timer);
        } else {
          setDisplayPenalty(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [activeMetrics?.inactionPenalty]);

  if (loading || !reportData) return <div className="bg-[#020617] h-screen text-red-600 flex items-center justify-center font-mono italic">INITIALIZING_SIGNAL...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic text-left">
      
      {/* 🛡️ TICKER: Only show exact count if Admin or Paid */}
      {isAdminView && (
        <div className="no-print fixed top-6 right-6 z-[60] bg-red-600 text-white px-6 py-4 border-l-4 border-white shadow-[0_0_50px_rgba(220,38,38,0.5)] italic">
          <div className="flex flex-col items-end italic font-black">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase opacity-80 mb-1">LIVE_EXPOSURE_TICKER</span>
            <div className="text-3xl font-black tracking-tighter leading-none">${displayPenalty.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      )}

      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative italic font-black">
        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
              {isAdminView ? 'FORENSIC' : 'PRELIMINARY'} <span className="text-red-600">VERDICT</span>
            </h1>
            <p className="text-red-600 font-mono text-[11px] uppercase tracking-[0.4em] mt-6 italic">AUTHORIZED BY: BMR SOLUTIONS // CLEARANCE: {isAdminView ? 'ALPHA_7' : 'LEVEL_1'}</p>
          </div>
        </header>

        {/* --- BRIEFING BOX: Exact Data for Admin, Ranges for User --- */}
        <div className="bg-white p-12 mb-8 border-l-[16px] border-red-600 text-black">
          <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter mb-10 underline decoration-red-600/30">Forensic Briefing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-black">
            <div className="space-y-3">
              <span className="text-[11px] uppercase text-red-600 font-mono italic">Efficiency Decay</span>
              <p className="text-[15px] font-bold italic">
                {isAdminView ? <span className="text-red-600 text-xl font-black">{activeMetrics?.wasteRatio.toFixed(0)}% Capacity</span> : "15%–40% Decay"}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[11px] uppercase text-red-600 font-mono italic">Ghost Headcount</span>
              <p className="text-[15px] font-bold italic">
                {isAdminView ? <span className="text-red-600 text-xl font-black">{activeMetrics?.ghostFTEs} FTEs</span> : "Multiple FTE Waste"}
              </p>
            </div>
            <div className="space-y-3 font-black">
              <span className="text-[11px] uppercase text-red-600 font-mono italic">Financial Leak</span>
              <p className="text-[15px] font-bold italic">
                {isAdminView ? <span className="text-red-600 text-xl font-black">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span> : "6-Figure Annual Tax"}
              </p>
            </div>
          </div>
        </div>

        {/* --- GATE: Only show to Users --- */}
        {!isAdminView && (
          <div className="bg-slate-900 border border-red-600/50 p-8 mb-16 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="flex-1">
              <h3 className="text-white text-2xl font-black uppercase italic mb-2">Unlock Full Forensic Triangulation</h3>
              <p className="text-slate-400 text-[13px] leading-relaxed italic normal-case">Exact "Ghost FTE" counts and recovery playbooks require Level 7 Clearance.</p>
            </div>
            <button onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')} className="bg-red-600 text-white px-10 py-6 font-black uppercase italic">ERADICATE THE TAX</button>
          </div>
        )}

        {/* --- DIRECTIVES: Blurred for User, Sharp for Admin --- */}
        <div className={`space-y-6 mb-16 ${!isAdminView ? 'opacity-30 grayscale' : ''}`}>
          <div className="flex items-center gap-4 text-red-600 mb-8 font-black">
            <ShieldAlert size={24} />
            <h3 className="text-[12px] font-mono uppercase tracking-[0.5em] italic font-black">Required_Directives</h3>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${!isAdminView ? 'blur-[6px] select-none pointer-events-none' : ''}`}>
             <div className="bg-slate-950 border border-slate-900 p-8">
                <span className="text-red-600 font-mono text-[9px] font-black uppercase">DIR_01</span>
                <h4 className="text-xl text-white uppercase italic mt-2">Immediate Hardening</h4>
                <p className="text-slate-500 text-xs italic">Neutralize the structural logic fractures causing ${activeMetrics?.totalTax.toLocaleString()} labor tax.</p>
             </div>
             <div className="bg-slate-950 border border-slate-900 p-8">
                <span className="text-blue-500 font-mono text-[9px] font-black uppercase">DIR_02</span>
                <h4 className="text-xl text-white uppercase italic mt-2">Structural Alignment</h4>
                <p className="text-slate-500 text-xs italic">Recover {activeMetrics?.ghostFTEs} lost FTE capacity via node re-alignment.</p>
             </div>
          </div>
        </div>
      </div>
      <div className="no-print"><Footer /></div>
    </div>
  );
}
