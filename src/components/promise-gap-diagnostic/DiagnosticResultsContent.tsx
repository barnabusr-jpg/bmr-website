"use client";
import React, { useEffect, useState } from 'react';
import { Download, ArrowRight, Activity, Lock, ShieldAlert, AlertTriangle, TrendingUp, Info, Skull } from 'lucide-react';

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [showMath, setShowMath] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [metrics, setMetrics] = useState({ estimate: 0, friction: 0, shadowLabor: 0, misalignment: 0, totalLiability: 0 });

  useEffect(() => {
    const vault = localStorage.getItem('bmr_triage_baseline');
    if (vault) {
      const parsed = JSON.parse(vault);
      setData(parsed);
      
      const roleWeights: any = { executive: 1.65, managerial: 1.25, technical: 1.0 };
      const integrityWeights: any = { legacy: 1.45, hybrid: 1.1, modern: 0.85 };
      const estimate = Math.round((parsed.nodes * 120000) * (roleWeights[parsed.role] || 1) * (integrityWeights[parsed.integrity] || 1) * 0.00032);
      
      setMetrics({
        estimate,
        friction: Math.round(estimate * 0.24),
        shadowLabor: Math.round(estimate * 0.34),
        misalignment: Math.round(estimate * 0.49),
        totalLiability: 20400000
      });
    }
  }, []);

  const handleBooking = () => {
    if (!data) return;
    const url = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&a1=Signal_$${metrics.estimate.toLocaleString()}`;
    window.open(url, '_blank');
  };

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-white font-sans">
      <div className="border-b border-slate-800 pb-8 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase text-red-600 tracking-tighter">Forensic Triage Alert</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-mono mt-1">Audit ID: {data.organization.toUpperCase()}_0401 // Status: Signal Detected</p>
        </div>
        <Lock className="text-slate-800" size={32} />
      </div>

      {!hasValidated ? (
        <div className="py-24 text-center bg-slate-950 border border-slate-900 rounded-sm relative overflow-hidden">
          <Activity className="absolute top-4 right-4 text-red-600 opacity-5" size={120} />
          <ShieldAlert className="mx-auto mb-6 text-[#14b8a6]" size={48} />
          <button onClick={() => setHasValidated(true)} className="bg-[#14b8a6] text-slate-950 px-12 py-5 font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all shadow-lg">Authorize Signal Reveal</button>
        </div>
      ) : (
        <div className="space-y-16 animate-in fade-in duration-1000">
          <section className="text-center">
            <h2 className="text-8xl font-black italic tracking-tighter mb-4">${metrics.estimate.toLocaleString()}</h2>
            <p className="text-[10px] text-red-600 uppercase font-black tracking-[0.5em]">Validated Annual Hemorrhage Signal (Median)</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-xl font-black italic uppercase flex items-center gap-2"><TrendingUp className="text-red-600" size={20} /> The Compound Failure</h3>
              <p className="text-sm text-slate-400 leading-relaxed italic">&quot;Your ${metrics.estimate.toLocaleString()} hemorrhage is not a one-time cost&mdash;it is a compounding liability. When you automate a {data.integrity.toUpperCase()} baseline, hidden costs scale this liability to <span className="text-white font-bold">$20.4M</span> by Q4 2026.&quot;</p>
              <button onClick={() => setShowMath(!showMath)} className="text-[10px] font-black uppercase text-red-600 flex items-center gap-2 hover:text-white transition-colors"><Info size={14} /> {showMath ? "Hide Forensic Breakdown" : "View Forensic Breakdown"}</button>
            </div>
            <div className="bg-slate-900/40 p-8 border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
              <div className="flex justify-between items-center border-b border-slate-800 pb-4"><span className="text-[10px] font-black uppercase text-slate-500">Visible Tip</span><span className="text-white font-mono font-bold">$1.2M</span></div>
              <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-red-600 italic">Total Liability</span><span className="text-red-600 font-mono font-bold">$20.4M</span></div>
            </div>
          </section>

          {showMath && (
            <div className="bg-slate-950 p-10 border border-slate-900 animate-in slide-in-from-top-4 duration-500 grid grid-cols-1 md:grid-cols-3 gap-8 text-center uppercase tracking-widest font-mono">
                <div className="space-y-1"><span className="text-[9px] font-black text-slate-600">Legacy Friction</span><div className="text-xl font-bold text-white">${metrics.friction.toLocaleString()}</div></div>
                <div className="space-y-1"><span className="text-[9px] font-black text-slate-600">Shadow Labor</span><div className="text-xl font-bold text-white">${metrics.shadowLabor.toLocaleString()}</div></div>
                <div className="space-y-1"><span className="text-[9px] font-black text-slate-600">Strategic Penalty</span><div className="text-xl font-bold text-white">${metrics.misalignment.toLocaleString()}</div></div>
            </div>
          )}

          <section className="bg-red-950/10 border border-red-900/30 p-10">
            <h3 className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2"><AlertTriangle size={14} /> The Kill Switch Fallacy</h3>
            <p className="text-sm text-slate-300 italic mb-8">&quot;Most organizations believe they would &apos;shut it down&apos; before costs spiral. Forensic data shows 70% of the hemorrhage occurs before leadership intervenes.&quot;</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] font-mono uppercase text-slate-500 border-t border-slate-800 pt-6">
               <div><span className="text-white block font-bold">87%</span> Budget Overrun by Q3</div>
               <div><span className="text-white block font-bold">63%</span> Sunk Cost Approvals</div>
               <div><span className="text-white block font-bold">70%</span> Leakage Before Stop</div>
            </div>
          </section>

          <div className="bg-red-600 p-12 text-center shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left text-white uppercase italic"><h4 className="text-2xl font-black">Prevent the Trap</h4><p className="text-[10px] font-bold tracking-widest opacity-70">Triage identifies signal. Deep Dive maps the cure.</p></div>
            <button onClick={handleBooking} className="bg-black text-white px-12 py-5 font-black uppercase text-xs tracking-[0.4em] hover:bg-slate-800 transition-all">Schedule Deep Dive Audit <ArrowRight size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticResultsContent;
