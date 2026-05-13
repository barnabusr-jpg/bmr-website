"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Sliders, Activity, ArrowRight, BarChart3, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);
  const [liveBleed, setLiveBleed] = useState(0);

  useEffect(() => {
    // 🛡️ 1. DETECT ADMIN
    const params = new URLSearchParams(window.location.search);
    const adminActive = params.get('admin') === 'true';
    setIsAdmin(adminActive);

    // 🛡️ 2. INJECT SUPREME OVERRIDE (Suggestion #2 with !important)
    // This physically kills the blur if you are an admin.
    const style = document.createElement('style');
    style.id = "admin-force-clear";
    style.innerHTML = `
      .heavy-blur {
        filter: ${adminActive ? "none !important" : "blur(32px) !important"};
        opacity: ${adminActive ? "1 !important" : "0.6 !important"};
        pointer-events: ${adminActive ? "auto !important" : "none !important"};
        user-select: ${adminActive ? "auto !important" : "none !important"};
      }
    `;
    document.head.appendChild(style);

    // 3. FETCH DATA
    if (router.isReady) {
      const pathId = params.get('id') || window.location.pathname.split('/').pop();
      if (pathId && pathId !== '[id]' && pathId !== 'results') {
        fetchAuditData(pathId as string);
      }
    }

    return () => {
      const existing = document.getElementById("admin-force-clear");
      if (existing) document.head.removeChild(existing);
    };
  }, [router.isReady, isAdmin]);

  const fetchAuditData = async (pathId: string) => {
    const { data: audit } = await supabase.from('audits').select('*').eq('id', pathId).maybeSingle();
    if (audit) {
      setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
      setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000) || 5);
      setReportData(audit);
    }
    setLoading(false);
  };

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    const dbDecay = parseInt(reportData.decay_pct) || 0;
    const reworkPercent = (dbDecay / 100) * 0.40; 
    const annualReworkTax = (fteCount * reworkPercent) * (160000 * 1.3);
    const baseRisk = dbDecay > 60 ? 0.30 : 0.18;
    const inactionPenalty = (baseRisk * (liveSpend * 1000000)) * 1.15;
    const bleedPerSecond = inactionPenalty / 31536000;
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    
    return {
      decay: dbDecay,
      reworkTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      bleedPerSecond: bleedPerSecond,
      historicalBleed: ((Date.now() - createdAt) / 1000) * bleedPerSecond
    };
  }, [reportData, liveSpend, fteCount]);

  useEffect(() => {
    if (!activeMetrics?.bleedPerSecond) return;
    let currentAccumulated = activeMetrics.historicalBleed;
    const ticker = setInterval(() => {
      currentAccumulated += (activeMetrics.bleedPerSecond / 10);
      setLiveBleed(currentAccumulated);
    }, 100);
    return () => clearInterval(ticker);
  }, [activeMetrics]);

  if (loading || !reportData) return (
    <div className="bg-[#020617] h-screen flex items-center justify-center">
      <div className="text-red-600 font-mono italic animate-pulse">DECRYPTING_VAULT...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic uppercase font-black">
      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative italic font-black">
        
        {isAdmin && (
          <div className="fixed bottom-8 left-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-full font-mono text-[10px] uppercase font-black flex items-center gap-3 shadow-2xl border border-blue-400">
            <ShieldCheck size={16} /> ADMIN_DECRYPTION_ACTIVE
          </div>
        )}

        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10 font-black">
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            AI <span className="text-red-600">EFFICIENCY</span> VERDICT
          </h1>
          <BarChart3 size={64} className="text-slate-800" />
        </header>

        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl text-black font-black">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-2">
              <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter underline decoration-red-600/20">Executive Briefing</h2>
              <span className="text-slate-400 font-mono text-[10px] font-black block uppercase">ENTITY // {reportData.org_name}</span>
            </div>
            <div className="no-print text-right border-r-4 border-red-600 pr-4">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Accumulated_Inaction_Cost</span>
              <div className="text-xl font-black text-red-600 tabular-nums">${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 font-black italic uppercase">
            <div className="space-y-3 font-black">
              <span>Capacity Loss</span>
              <p className="text-[15px] leading-tight">Wasting <span className="text-red-600 text-xl font-black heavy-blur">{(activeMetrics?.decay * 0.4).toFixed(0)}%</span> Total.</p>
            </div>
            <div className="space-y-3 font-black">
              <span>Annual Rework Tax</span>
              <p className="text-[15px] leading-tight">Cost: <span className="text-red-600 text-xl font-black heavy-blur">${activeMetrics?.reworkTax.toLocaleString()}</span>.</p>
            </div>
            <div className="space-y-3 font-black">
              <span>Inaction Penalty</span>
              <p className="text-[15px] leading-tight">Risk: <span className="text-red-600 text-xl font-black heavy-blur">${activeMetrics?.inactionPenalty.toLocaleString()}</span>.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 italic font-black uppercase text-center">
          <div className="bg-slate-950 border border-slate-900 p-12">
            <div className="text-6xl font-black text-white heavy-blur">${activeMetrics?.reworkTax.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[11px] font-mono text-slate-500 mt-6">Annual Hidden Labor Tax</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 border-l-8 border-red-600">
            <div className="text-6xl font-black text-red-500 heavy-blur">${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[11px] font-mono text-red-400 mt-6">Total Capital Exposure</div>
          </div>
        </div>

        {!isAdmin && (
          <div className="bg-white p-16 flex justify-between items-center group cursor-pointer border-l-[20px] border-red-600 shadow-2xl no-print" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
            <div className="text-left font-black italic uppercase">
              <h4 className="text-black text-6xl tracking-tighter leading-none mb-4">Eradicate the Tax</h4>
              <p className="text-slate-600 text-[14px] font-bold italic leading-relaxed">Schedule your briefing to stop the bleed.</p>
            </div>
            <div className="bg-red-600 text-white p-10 group-hover:translate-x-4 transition-transform shadow-lg"><ArrowRight size={64} /></div>
          </div>
        )}
      </div>
      <div className="no-print"><Footer /></div>
    </div>
  );
}
