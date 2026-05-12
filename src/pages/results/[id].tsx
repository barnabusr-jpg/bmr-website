"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Activity, BarChart3, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForensicVerdict() {
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🛡️ BROWSER FALLBACK: Manually parse the ID from the URL path
    const urlSegments = typeof window !== 'undefined' ? window.location.pathname.split('/') : [];
    const manualId = id || urlSegments[urlSegments.length - 1];

    if (!manualId || manualId === '[id]' || manualId === 'results') return;

    const fetchAuditData = async (retryCount = 0) => {
      // 🛡️ CLEANING: Force lower-case for UUID comparison
      const cleanUUID = String(manualId).trim().toLowerCase();

      const { data, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', cleanUUID)
        .maybeSingle();

      if (data) {
        setReportData(data);
        setLoading(false);
      } else if (retryCount < 6) {
        // Retry every 1s for 6s total
        setTimeout(() => fetchAuditData(retryCount + 1), 1000);
      } else {
        console.error("DATA_SIGNAL_LOST:", error);
        setLoading(false);
      }
    };

    fetchAuditData();
  }, [id, router.isReady]);

  if (loading) {
    return (
      <div className="bg-[#020617] min-h-screen text-red-600 flex flex-col items-center justify-center font-mono italic animate-pulse tracking-[0.4em] text-xl uppercase italic">
        <Activity size={48} className="mb-4 italic" />
        RECOVERING_SIGNAL_FILE...
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="bg-[#020617] min-h-screen text-slate-500 flex flex-col items-center justify-center font-mono italic uppercase tracking-widest text-center italic">
        <p className="text-red-600 text-2xl mb-4 font-black italic">ACCESS_DENIED // SIGNAL_LOST</p>
        <button onClick={() => window.location.href = '/'} className="underline hover:text-white mt-4 italic">RESET_LINK</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 font-sans italic text-left selection:bg-red-600/30 italic">
      <Header />
      <div className="container mx-auto max-w-4xl mt-24 italic">
        <header className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-10 italic">
          <div>
            <h1 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none italic">
              AI <span className="text-red-600 italic">EFFICIENCY</span> VERDICT
            </h1>
            <p className="text-slate-500 font-mono text-[11px] mt-6 uppercase tracking-[0.4em] font-black italic">
              ENTITY: {reportData.org_name} // CASE: {reportData.id.slice(0,8).toUpperCase()}
            </p>
          </div>
          <BarChart3 size={64} className="text-slate-800 italic" />
        </header>

        <div className="bg-white p-12 mb-16 border-l-[16px] border-red-600 shadow-2xl italic">
          <h2 className="text-black text-4xl font-black uppercase tracking-tighter mb-10 italic underline decoration-red-600/30">Forensic Briefing</h2>
          <p className="text-slate-800 text-2xl font-bold uppercase italic leading-tight italic font-black">
            Baseline decay calculated at <span className="text-red-600 font-black italic">{reportData.decay_pct}%</span>.
            <br />Estimated rework tax: <span className="text-red-600 font-black italic">${parseFloat(reportData.rework_tax).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>.
          </p>
        </div>

        <div className="bg-white p-16 flex flex-col md:flex-row justify-between items-center gap-12 group cursor-pointer hover:bg-slate-100 transition-all border-l-[20px] border-red-600 shadow-2xl italic" onClick={() => window.open('https://calendly.com/hello-bmradvisory/forensic-review')}>
          <div className="text-left italic">
            <h4 className="text-black text-5xl font-black italic uppercase tracking-tighter leading-none italic">Eradicate the Tax</h4>
            <p className="text-slate-600 text-[13px] font-black uppercase tracking-widest mt-6 max-w-md italic">Schedule briefing to recover engineering capacity.</p>
          </div>
          <div className="bg-red-600 text-white p-8 group-hover:translate-x-4 transition-transform shadow-lg italic font-black"><ArrowRight size={48} className="italic" /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
