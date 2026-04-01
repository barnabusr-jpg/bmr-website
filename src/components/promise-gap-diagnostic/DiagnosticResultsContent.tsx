"use client";
import React, { useEffect, useState } from 'react';
import { Download, ArrowRight, Activity, Lock, ShieldAlert, AlertTriangle, TrendingUp, Info, Skull } from 'lucide-react';

const DiagnosticResultsContent = () => {
  const [data, setData] = useState<any>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [showMath, setShowMath] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Forensic Calculation Logic (Proprietary Coefficients Obfuscated)
  const [metrics, setMetrics] = useState({
    estimate: 0,
    friction: 0,
    shadowLabor: 0,
    misalignment: 0,
    totalLiability: 0
  });

  useEffect(() => {
    const vault = localStorage.getItem('bmr_triage_baseline');
    if (vault) {
      try {
        const parsed = JSON.parse(vault);
        setData(parsed);
        setHasValidated(false); // Force fresh calibration on every load
      } catch (err) {
        console.error("Vault Error:", err);
      }
    }
  }, []);

  const handleForensicLock = () => {
    if (!data) return;

    // Logic Architecture: Nodes * Authority * Integrity
    const roleWeights: Record<string, number> = { executive: 1.65, managerial: 1.25, technical: 1.0 };
    const integrityWeights: Record<string, number> = { legacy: 1.45, hybrid: 1.1, modern: 0.85 };
    
    const baseValue = data.nodes * 120000;
    const rWeight = roleWeights[data.role] || 1.0;
    const iWeight = integrityWeights[data.integrity] || 1.0;
    const decayFactor = Math.log10(data.nodes + 100) / 2.7;
    
    const estimate = Math.round(baseValue * rWeight * iWeight * decayFactor * 0.082);

    setMetrics({
      estimate,
      friction: Math.round(estimate * 0.24),
      shadowLabor: Math.round(estimate * 0.34),
      misalignment: Math.round(estimate * 0.49),
      totalLiability: 20400000 // Trajectory benchmark for 2026
    });

    setHasValidated(true);
  };

  const handleBooking = () => {
    if (!data || !hasValidated) return;
    const url = `https://calendly.com/hello-bmradvisory/forensic-review?` + 
      `name=${encodeURIComponent(data.name)}&` +
      `email=${encodeURIComponent(data.email)}&` + 
      `organization=${encodeURIComponent(data.organization)}&` +
      `a1=Vector_02&a2=Signal_$${metrics.estimate.toLocaleString()}`;

    window.open(url, '_blank');
  };

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-white font-sans">
      {/* 1. Forensic Header */}
      <div className="border-b border-slate-800 pb-8 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-red-600">
            Forensic Triage <span className="text-white">Alert</span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-[10px] font-mono uppercase text-slate-500">
            <div>Subject: <span className="text-white">{data.name}</span></div>
            <div>Org: <span className="text-white">{data.organization}</span></div>
            <div>Scale: <span className="text-white">{data.nodes} FTE</span></div>
            <div>Vector: <span className="text-white">{data.role}</span></div>
          </div>
        </div>
        <Lock className="text-slate-800" size={32} />
      </div>

      {!hasValidated ? (
        /* 2. Mandatory Calibration Gate */
        <div className="py-24 text-center bg-slate-950 border border-slate-900 rounded-sm">
          <ShieldAlert className="mx-auto mb-6 text-[#14b8a6]" size={48} />
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.5em] mb-8 font-black">Awaiting Forensic Decryption</p>
          <button 
            onClick={handleForensicLock}
            className="bg-[#14b8a6] text-slate-950 px-12 py-5 font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all shadow-[0_0_40px_rgba(20,184,166,0.15)]"
          >
            Authorize Signal Reveal
          </button>
        </div>
      ) : (
        /* 3. The Decrypted Verdict */
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <section className="text-center">
            <h2 className="text-8xl font-black italic tracking-tighter mb-4">${metrics.estimate.toLocaleString()}</h2>
            <p className="text-[10px] text-red-600 uppercase font-black tracking-[0.5em]">Validated Annual Hemorrhage Signal (Median)</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-2">
                <TrendingUp className="text-red-600" size={20} /> 
                The Compound Failure
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "Your ${metrics.estimate.toLocaleString()} hemorrhage is not a one-time cost—it is a compounding liability. When you automate a {data.integrity.toUpperCase()} baseline, hidden costs scale this liability to <span className="text-white font-bold">$20.4M</span> by Q4 2026."
              </p>
              <button 
                onClick={() => setShowMath(!showMath)}
                className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2 hover:text-white transition-colors"
              >
                <Info size={14} /> {showMath ? "Hide Forensic Breakdown" : "View Forensic Breakdown"}
              </button>
            </div>

            <div className="bg-slate-900/40 p-8 border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Visible Tip</span>
                <span className="text-white font-mono font-bold">$1.2M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-red-600 italic tracking-widest">Total Liability</span>
                <span className="text-red-600 font-mono font-bold">$20.4M</span>
              </div>
              <p className="text-[9px] text-slate-600 uppercase font-mono leading-tight">
                *The $1.2M implementation is the catalyst. The $20.4M is the mathematical outcome of applying modern tools to unmodernized logic.
              </p>
            </div>
          </section>

          {showMath && (
            <div className="bg-slate-950 p-10 border border-slate-900 animate-in slide-in-from-top-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Legacy Friction</span>
                    <div className="text-xl font-bold text-white">${metrics.friction.toLocaleString()}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Shadow AI Overrides</span>
                    <div className="text-xl font-bold text-white">${metrics.shadowLabor.toLocaleString()}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Strategic Penalty</span>
                    <div className="text-xl font-bold text-white">${metrics.misalignment.toLocaleString()}</div>
                  </div>
               </div>
            </div>
          )}

          <section className="bg-red-950/10 border border-red-900/30 p-10">
            <h3 className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <AlertTriangle size={14} /> The Kill Switch Fallacy
            </h3>
            <p className="text-sm text-slate-300 italic mb-8">
              "Most organizations believe they would 'shut it down' before costs spiral. Forensic data shows 70% of the hemorrhage occurs before leadership intervenes."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] font-mono uppercase text-slate-500">
               <div className="border-l border-slate-800 pl-4"><span className="text-white block font-bold">87%</span> Budget Overrun by Q3</div>
               <div className="border-l border-slate-800 pl-4"><span className="text-white block font-bold">63%</span> Sunk Cost Approvals</div>
               <div className="border-l border-slate-800 pl-4"><span className="text-white block font-bold">70%</span> Leakage Before Stop</div>
            </div>
          </section>

          <div className="bg-red-600 p-12 text-center shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h4 className="text-white text-2xl font-black uppercase italic mb-1">Prevent the Trap</h4>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Triage identifies the signal. Deep Dive maps the cure.</p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <button 
                onClick={handleBooking}
                className="bg-black text-white px-12 py-5 font-black uppercase text-xs tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-slate-800 transition-all"
              >
                Schedule Deep Dive Audit <ArrowRight size={18} />
              </button>
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} className={isDownloading ? "animate-bounce" : ""} />
                {isDownloading ? "Generating Dossier..." : "Download Triage Summary"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticResultsContent;
