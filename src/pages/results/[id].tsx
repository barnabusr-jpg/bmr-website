"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { ArrowRight, BarChart3, ShieldCheck, Printer } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);
  const [liveBleed, setLiveBleed] = useState(0);

  useEffect(() => {
    // 🛡️ SECURITY PROTOCOL
    const params = new URLSearchParams(window.location.search);
    const adminActive = params.get('admin') === 'true';
    setIsAdmin(adminActive);
    setMounted(true);

    if (router.isReady) {
      const pathId = params.get('id') || window.location.pathname.split('/').pop();
      if (pathId && pathId !== '[id]' && pathId !== 'results') {
        fetchAuditData(pathId as string);
      } else {
        setLoading(false);
      }
    }
  }, [router.isReady]);

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
    const reworkTaxCalculated = (fteCount * (dbDecay / 100) * 0.40) * (160000 * 1.3);
    const inactionPenaltyCalculated = ((dbDecay > 60 ? 0.30 : 0.18) * (liveSpend * 1000000)) * 1.15;
    const bleedPerSecond = inactionPenaltyCalculated / 31536000;
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    
    return {
      decay: dbDecay,
      reworkTax: reworkTaxCalculated,
      inactionPenalty: inactionPenaltyCalculated,
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

  // 🛡️ SECURE BY DEFAULT: If not admin, the class is "heavy-blur"
  const blurClass = (mounted && isAdmin) ? "" : "heavy-blur";

  const handlePrint = () => { window.print(); };

  if (loading || !reportData) return (
    <div className="bg-[#020617] h-screen flex items-center justify-center font-mono italic text-red-600">
      AUTHENTICATING_VAULT...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic selection:bg-red-600/30 uppercase font-black">
      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative">
        
        {/* PDF EXPORT (no-print) */}
        <div className="absolute -top-12 right-0 no-print">
          <button onClick={handlePrint} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] tracking-[0.3em] font-mono">
            <Printer size={14} /> GENERATE_PDF_REPORT
          </button>
        </div>

        {isAdmin && (
          <div className="fixed bottom-8 left-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-full font-mono text-[10px] uppercase font-black flex items-center gap-3 shadow-2xl border border-blue-400 no-print">
            <ShieldCheck size={16} /> ADMIN_DECRYPTION_ACTIVE
          </div>
        )}

        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl text-black">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-2">
              <h2 className="text-black text-4xl font-black uppercase tracking-tighter underline">Executive Briefing</h2>
              <span className="text-slate-400 font-mono text-[10px] block uppercase font-black">ENTITY // {reportData.org_name}</span>
            </div>
            <div className="text-right border-r-4 border-red-600 pr-4">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Accumulated_Inaction_Cost</span>
              <div className="text-xl font-black text-red-600 tabular-nums">${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 font-black italic">
            <div className="space-y-3">
              <span className="text-red-600 text-[11px] font-mono tracking-widest">Capacity Loss</span>
              <p className="text-[15px] leading-tight">Wasting <span className={`text-red-600 text-xl font-black ${blurClass}`}>{(activeMetrics?.decay * 0.4).toFixed(0)}%</span> Total.</p>
            </div>
            <div className="space-y-3">
              <span className="text-red-600 text-[11px] font-mono tracking-widest">Annual Rework Tax</span>
              <p className="text-[15px] leading-tight">Cost: <span className={`text-red-600 text-xl font-black ${blurClass}`}>${activeMetrics?.reworkTax.toLocaleString()}</span>.</p>
            </div>
            <div className="space-y-3">
              <span className="text-red-600 text-[11px] font-mono tracking-widest">Inaction Penalty</span>
              <p className="text-[15px] leading-tight">Risk: <span className={`text-red-600 text-xl font-black ${blurClass}`}>${activeMetrics?.inactionPenalty.toLocaleString()}</span>.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 text-center">
          <div className="bg-slate-950 border border-slate-900 p-12">
            <div className={`text-6xl font-black text-white ${blurClass}`}>${activeMetrics?.reworkTax.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[11px] font-mono text-slate-500 mt-6 tracking-widest uppercase">Annual Hidden Labor Tax</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 border-l-8 border-red-600">
            <div className={`text-6xl font-black text-red-500 ${blurClass}`}>${activeMetrics?.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            <div className="text-[11px] font-mono text-red-400 mt-6 tracking-widest uppercase">Total Capital Exposure</div>
          </div>
        </div>

        {!isAdmin && (
          <div className="bg-white p-16 flex justify-between items-center group cursor-pointer border-l-[20px] border-red-600 shadow-2xl no-print" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
            <div className="text-left font-black italic uppercase">
              <h4 className="text-black text-6xl tracking-tighter leading-none mb-4">Eradicate the Tax</h4>
              <p className="text-slate-600 text-[14px] font-bold">Schedule your briefing to stop the bleed.</p>
            </div>
            <div className="bg-red-600 text-white p-10 group-hover:translate-x-4 transition-transform shadow-lg"><ArrowRight size={64} /></div>
          </div>
        )}
      </div>
      <div className="no-print"><Footer /></div>
    </div>
  );
}
