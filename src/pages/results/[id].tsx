"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import { ArrowRight, ShieldCheck, Printer, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveBleed, setLiveBleed] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') setIsAdmin(true);

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
      setReportData(audit);
    }
    setLoading(false);
  };

  const activeMetrics = useMemo(() => {
    if (!reportData) return null;
    
    // BACK TO BASICS: Using ONLY your branch's database fields.
    const dbDecay = parseInt(reportData.decay_pct) || 0;
    const reworkTax = parseFloat(reportData.rework_tax) || 0;
    
    // Original branch ticker math: 15% of rework tax over a year.
    const bleedPerSecond = (reworkTax * 0.15) / 31536000;
    const createdAt = new Date(reportData.created_at || Date.now()).getTime();
    
    return {
      decay: dbDecay,
      reworkTax: reworkTax,
      bleedPerSecond: bleedPerSecond,
      historicalBleed: ((Date.now() - createdAt) / 1000) * bleedPerSecond
    };
  }, [reportData]);

  useEffect(() => {
    if (!activeMetrics?.bleedPerSecond) return;
    let currentAccumulated = activeMetrics.historicalBleed;
    const ticker = setInterval(() => {
      currentAccumulated += (activeMetrics.bleedPerSecond / 10);
      setLiveBleed(currentAccumulated);
    }, 100);
    return () => clearInterval(ticker);
  }, [activeMetrics]);

  const blurStyle = {
    filter: isAdmin ? 'none' : 'blur(15px)',
    WebkitFilter: isAdmin ? 'none' : 'blur(15px)',
    transition: 'filter 0.5s ease-in-out',
  } as React.CSSProperties;

  if (loading || !reportData) return (
    <div className="bg-[#020617] h-screen flex flex-col items-center justify-center gap-6 font-mono italic text-red-600 font-black uppercase">
      <Activity className="animate-spin" size={48} />
      AUTHENTICATING_VERDICT_VAULT...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-4 md:px-6 font-sans italic selection:bg-red-600/30 uppercase font-black overflow-x-hidden">
      <div className="no-print"><Header /></div>

      <div className="container mx-auto max-w-4xl mt-24 relative print:mt-0">
        
        {/* PDF EXPORT */}
        <div className="absolute -top-12 right-0 no-print">
          <button onClick={() => window.print()} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] tracking-[0.2em] font-mono font-black italic">
            <Printer size={14} /> GENERATE_FORENSIC_DOSSIER
          </button>
        </div>

        {/* TOP VERDICT CARD */}
        <div className="bg-white p-6 md:p-12 mb-12 border-l-[12px] md:border-l-[20px] border-red-600 shadow-2xl text-black overflow-hidden relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-100 pb-10 gap-6">
            <div className="space-y-2 text-left flex-1 min-w-0">
              <h2 className="text-black text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none break-words">
                EXPOSURE_VERDICT
              </h2>
              <span className="text-slate-400 font-mono text-[10px] block font-black uppercase tracking-widest italic mt-2">
                ENTITY_REF // {reportData.org_name}
              </span>
            </div>

            <div className="text-left md:text-right flex flex-col items-start md:items-end shrink-0">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black italic leading-none mb-1">
                CAPITAL_EROSION_RATE
              </span>
              <div className="text-4xl md:text-5xl font-black text-red-600 tabular-nums tracking-tighter italic leading-none">
                ${liveBleed.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-800 text-left font-black italic">
            <div className="space-y-2">
              <span className="text-red-600 text-[11px] font-mono tracking-widest font-black uppercase">LOGIC_DECAY_COEFFICIENT</span>
              <p className="text-lg md:text-xl leading-tight font-black uppercase">
                Detecting <span className="text-red-600 text-2xl font-black" style={blurStyle}>
                  {activeMetrics?.decay}%
                </span> Divergence.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-red-600 text-[11px] font-mono tracking-widest font-black uppercase">REWORK_LIABILITY</span>
              <p className="text-lg md:text-xl leading-tight font-black uppercase">
                Exposure: <span className="text-red-600 text-2xl font-black" style={blurStyle}>
                  ${activeMetrics?.reworkTax.toLocaleString(undefined, {maximumFractionDigits:0})}
                </span>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA BOX - THE CLIPPING FIX ONLY */}
        {!isAdmin && (
          <div 
            className="bg-white p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer border-l-[12px] md:border-l-[20px] border-red-600 shadow-2xl no-print mb-20 italic overflow-hidden gap-8" 
            onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}
          >
            <div className="text-left font-black italic uppercase flex-1 min-w-0">
              <h4 className="text-black text-4xl md:text-7xl tracking-tighter leading-[0.9] mb-4 italic break-words">
                EXECUTE_RECONSTRUCTION_PLAN
              </h4>
              <p className="text-slate-600 text-sm font-black italic mt-4">Initialize recovery protocols to stabilize operational capital.</p>
            </div>
            <div className="bg-red-600 text-white p-8 md:p-12 group-hover:translate-x-4 transition-transform shadow-lg shrink-0">
              <ArrowRight size={48} className="md:w-[64px] md:h-[64px]" />
            </div>
          </div>
        )}
      </div>
      <div className="no-print mt-20"><Footer /></div>
    </div>
  );
}
