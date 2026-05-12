"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Sliders, Activity, ArrowRight, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveSpend, setLiveSpend] = useState<number>(1.2);
  const [fteCount, setFteCount] = useState<number>(5);

  useEffect(() => {
    // 🛡️ NUCLEAR PATH PARSING: Don't rely solely on Next.js query
    const manualId = id || window.location.pathname.split('/').pop();
    if (!manualId || manualId === '[id]') return;

    const fetchAuditData = async (retryCount = 0) => {
      const { data: audit } = await supabase
        .from('audits')
        .select('*')
        .eq('id', manualId)
        .single();

      if (audit) {
        setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
        setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000) || 5);
        setReportData(audit);
        setLoading(false);
      } else if (retryCount < 5) {
        setTimeout(() => fetchAuditData(retryCount + 1), 1000);
      } else {
        setLoading(false);
      }
    };

    fetchAuditData();
  }, [id, router.isReady]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    const dbDecay = parseInt(reportData.decay_pct) || 50;
    const reworkPercent = (dbDecay / 100) * 0.4; 
    const annualReworkTax = (fteCount * reworkPercent) * 160000 * 1.3;
    const inactionPenalty = (0.2 * (liveSpend * 1000000)) * 1.15;

    return {
      totalTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      wasteRatio: reworkPercent * 100,
      riskStatus: dbDecay > 60 ? 'FRACTURED' : 'STABLE'
    };
  }, [reportData, liveSpend, fteCount]);

  if (loading) {
    return (
      <div className="bg-[#020617] min-h-screen text-red-600 flex flex-col items-center justify-center font-mono italic animate-pulse uppercase tracking-[0.5em] text-2xl text-center italic">
        <Activity size={48} className="mb-4 italic" />
        GENERATING_CASE_FILE...
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="bg-[#020617] min-h-screen text-slate-500 flex flex-col items-center justify-center font-mono italic uppercase tracking-widest text-center italic">
        <p className="text-red-600 text-2xl mb-4 font-black italic">SIGNAL_ID_NOT_FOUND</p>
        <button onClick={() => window.location.href = '/'} className="underline hover:text-white italic">Re-Initialize Triage</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic text-left selection:bg-red-600/30 italic">
      <Header />
      <div className="container mx-auto max-w-4xl mt-24 italic font-sans italic">
        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10 italic">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none italic font-black">
              AI <span className="text-red-600 italic">EFFICIENCY</span> VERDICT
            </h1>
            <p className="text-slate-500 font-mono text-[11px] mt-6 uppercase tracking-[0.4em] font-black italic">
              STATUS: {activeMetrics?.riskStatus}
            </p>
          </div>
          <BarChart3 size={64} className="text-slate-800 italic" />
        </header>

        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl italic">
          <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter mb-10 underline decoration-red-600/30 italic">Executive Briefing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 italic">
            <div className="space-y-3 italic">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Capacity Loss</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">Wasting <span className="text-red-600 text-xl font-black italic">{activeMetrics?.wasteRatio.toFixed(0)}%</span> total capacity.</p>
            </div>
            <div className="space-y-3 italic">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Financial Leak</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic">Labor tax: <span className="text-red-600 text-xl font-black italic">${activeMetrics?.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl italic" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left italic">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none italic">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 italic max-w-md italic">Schedule briefing to recover engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg italic"><ArrowRight size={48} className="italic" /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
