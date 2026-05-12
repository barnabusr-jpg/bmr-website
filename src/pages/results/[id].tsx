"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { Sliders, Activity, ArrowRight, ShieldAlert, BarChart3, Printer } from "lucide-react";
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
    // 🛡️ Fallback: Capture ID from URL path if router isn't ready
    const pathId = id || window.location.pathname.split('/').pop();
    if (!pathId || pathId === '[id]' || pathId === 'results') return;

    const fetchAuditData = async (retryCount = 0) => {
      // 🛡️ Format Fix: Force lowercase UUID to match Postgres standards
      const cleanId = String(pathId).trim().toLowerCase();

      const { data: audit, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', cleanId)
        .maybeSingle();

      if (audit) {
        setLiveSpend(parseFloat(audit.ai_spend) || 1.2);
        setFteCount(Math.round((parseFloat(audit.ai_spend) * 1000000) / 200000) || 5);
        setReportData(audit);
        setLoading(false);
      } else if (retryCount < 5) {
        // 🛡️ Polling: Retry every 1s for 5s to allow for DB replication lag
        setTimeout(() => fetchAuditData(retryCount + 1), 1000);
      } else {
        console.error("DATA_FETCH_TIMEOUT:", error);
        setLoading(false);
      }
    };

    fetchAuditData();
  }, [id, router.isReady]);

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    const dbDecay = parseInt(reportData.decay_pct) || 50;
    const currentSpend = liveSpend * 1000000;
    const reworkPercent = (dbDecay / 100) * 0.4; 
    const annualReworkTax = (fteCount * reworkPercent) * 160000 * 1.3;
    const baseRiskPercent = dbDecay > 70 ? 0.30 : 0.18;
    const inactionPenalty = (baseRiskPercent * currentSpend) * 1.15;

    return {
      totalTax: annualReworkTax,
      inactionPenalty: inactionPenalty,
      wasteRatio: reworkPercent * 100,
      ghostFTEs: Math.round(fteCount * reworkPercent),
      riskStatus: dbDecay > 60 ? 'FRACTURED' : 'STABLE'
    };
  }, [reportData, liveSpend, fteCount]);

  if (loading) {
    return (
      <div className="bg-[#020617] min-h-screen text-red-600 flex flex-col items-center justify-center font-mono italic animate-pulse uppercase tracking-[0.5em] text-2xl text-center">
        <Activity size={48} className="mb-4" />
        GENERATING_CASE_FILE...
      </div>
    );
  }

  if (!activeMetrics || !reportData) {
    return (
      <div className="bg-[#020617] min-h-screen text-slate-500 flex flex-col items-center justify-center font-mono italic uppercase tracking-widest text-center">
        <p className="text-red-600 text-2xl mb-4 font-black">ACCESS_DENIED // SIGNAL_LOST</p>
        <button onClick={() => window.location.href = '/'} className="underline hover:text-white mt-4 italic">RE-INITIALIZE</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic text-left selection:bg-red-600/30 print:bg-white print:text-black">
      {/* 🖨️ Global Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          header, footer { display: none !important; }
          body { background: white !important; color: black !important; }
          .container { margin-top: 0 !important; max-width: 100% !important; padding: 0 !important; }
          .text-white { color: black !important; }
          .bg-slate-950 { background-color: #f8fafc !important; border: 1px solid #000 !important; }
          .print-black { color: black !important; }
        }
      `}</style>

      <div className="no-print">
        <Header />
      </div>

      <div className="container mx-auto max-w-4xl mt-24 relative italic">
        
        {/* 🖨️ PDF Export Button */}
        <button 
          onClick={() => window.print()} 
          className="no-print absolute -top-16 right-0 flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-red-600 text-white px-6 py-2 rounded-sm font-mono text-[10px] uppercase tracking-[0.2em] transition-all italic"
        >
          <Printer size={14} /> EXPORT_FORENSIC_VERDICT
        </button>

        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10 italic">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none print:text-black italic">
              AI <span className="text-red-600 italic">EFFICIENCY</span> VERDICT
            </h1>
            <div className="space-y-1 mt-6 font-mono text-[11px] uppercase tracking-[0.4em] font-black italic">
              <p className="text-slate-500">
                CASE_FILE: BMR-2026-{reportData.id.slice(0,4).toUpperCase()} // STATUS: {activeMetrics.riskStatus}
              </p>
              {/* 🛡️ HARDCODED AUTHORIZATION HEADER */}
              <p className="text-red-600">
                AUTHORIZED BY: BMR SOLUTIONS
              </p>
            </div>
          </div>
          <BarChart3 size={64} className="text-slate-800 print:text-black" />
        </header>

        <div className="mb-12 border-l-4 border-red-600 pl-8 py-2 italic">
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black italic mb-4">
            DIAGNOSTIC_OBSERVATION // ALPHA_7_INTAKE
          </p>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed italic font-medium max-w-3xl print:text-slate-800">
            These metrics serve as a forensic baseline for organizational health. 
            Your responses identify specific logic fractures from your immediate perspective. 
            The system projects the fiscal impact of these fractures, converting observations 
            into high-probability drift currently occurring at your node.
          </p>
        </div>

        {/* Executive Briefing Section */}
        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl print:shadow-none italic text-black">
          <div className="flex justify-between items-center mb-10 italic">
            <h2 className="text-black text-4xl font-black uppercase italic tracking-tighter underline decoration-red-600/30 italic">Executive Briefing</h2>
            <span className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest italic">ENTITY // {reportData.org_name}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-800 italic">
            <div className="space-y-3 italic font-black">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Capacity Loss</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic font-black">Wasting <span className="text-red-600 text-xl font-black">{activeMetrics.wasteRatio.toFixed(0)}%</span> total capacity.</p>
            </div>
            <div className="space-y-3 italic font-black">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Financial Leak</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic font-black">Hidden labor tax of <span className="text-red-600 text-xl font-black">${activeMetrics.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span>.</p>
            </div>
            <div className="space-y-3 italic font-black">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-widest font-mono italic">Exposure</span>
              <p className="text-[15px] font-bold leading-relaxed uppercase italic font-black">Inaction exposes <span className="text-red-600 text-xl font-black">${activeMetrics.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}</span>.</p>
            </div>
          </div>
        </div>

        {/* Impact Visual Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 italic">
          <div className="bg-slate-950 border border-slate-900 p-12 flex flex-col justify-center print:bg-slate-100 italic">
            <div className="text-6xl md:text-7xl font-black italic text-white leading-none tracking-tighter print:text-black italic tracking-tighter italic font-black">
              ${activeMetrics.totalTax.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-6 font-black italic">Annual Labor Waste</div>
          </div>
          <div className="bg-red-950/20 border-2 border-red-600/50 p-12 flex flex-col justify-center border-l-8 border-red-600 print:bg-red-50 italic">
            <div className="text-6xl md:text-7xl font-black text-red-500 leading-none italic tracking-tighter italic tracking-tighter italic font-black">
              ${activeMetrics.inactionPenalty.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className="text-[11px] font-mono text-red-400 uppercase font-black tracking-widest mt-6 italic">Total Capital Exposure</div>
          </div>
        </div>

        {/* Forensic Simulator - Hidden on Print */}
        <div className="bg-slate-950/40 border border-slate-800 p-12 space-y-16 mb-16 rounded-xl no-print italic">
          <div className="flex items-center gap-4 text-red-600 italic">
            <Sliders size={24} />
            <h3 className="text-[12px] font-mono font-black uppercase tracking-[0.5em] italic">Forensic Exposure Simulator</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 italic">
            <div className="space-y-6 italic">
              <div className="flex justify-between items-end italic"><span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Spend</span><span className="text-2xl font-black italic text-white italic font-black">${liveSpend.toFixed(1)}M</span></div>
              <input type="range" min="0.1" max="50" step="0.1" value={liveSpend} onChange={(e) => setLiveSpend(parseFloat(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600 italic" />
            </div>
            <div className="space-y-6 italic">
              <div className="flex justify-between items-end italic"><span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Headcount</span><span className="text-2xl font-black italic text-white italic font-black">{fteCount} FTEs</span></div>
              <input type="range" min="1" max="500" step="1" value={fteCount} onChange={(e) => setFteCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600 italic" />
            </div>
          </div>
        </div>

        {/* Calendly CTA - Hidden on Print */}
        <div className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl no-print italic" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left italic">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none italic font-black">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 italic leading-relaxed max-w-md italic font-black">Schedule your clinical briefing to recover lost engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg italic"><ArrowRight size={48} /></div>
        </div>
      </div>
      
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
