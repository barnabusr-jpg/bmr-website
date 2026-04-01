"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ForensicEngine } from '../lib/diagnosticEngine';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Download, 
  ArrowRight, 
  Activity, 
  Lock, 
  ShieldAlert, 
  TrendingUp, 
  Info, 
  Skull,
  Loader2 
} from 'lucide-react'; // Fix: Corrected module name

export default function DiagnosticResults() {
  const [data, setData] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [showMath, setShowMath] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const baseline = localStorage.getItem('bmr_triage_baseline');
    const answers = localStorage.getItem('bmr_diagnostic_answers') || '{}';
    
    if (baseline) {
      const parsedBaseline = JSON.parse(baseline);
      setData(parsedBaseline);
      const output = ForensicEngine.calculate(JSON.parse(answers), 120, parsedBaseline);
      setResult(output);
    }
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDownloading(false);
    alert("SECURE_DOSSIER_TRANSMISSION_COMPLETE");
  };

  const handleBooking = () => {
    if (!data || !result) return;
    const url = `https://calendly.com/hello-bmradvisory/forensic-review?` + 
      `name=${encodeURIComponent(data.name)}&` +
      `email=${encodeURIComponent(data.email)}&` +
      `a1=Signal_$${result.financials.estimate.toLocaleString()}`;
    window.open(url, '_blank');
  };

  if (!data || !result) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="text-[#14b8a6] animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-600/30">
      <Head>
        <title>Forensic Verdict | BMR Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header />
      
      <main className="flex-grow py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="border-b border-slate-800 pb-8 mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter text-red-600">
                Forensic Triage <span className="text-white">Alert</span>
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-mono mt-1 italic">
                Audit: {data.organization.toUpperCase()}_0401 // Status: {result.status}
              </p>
            </div>
            <Lock className="text-slate-800" size={32} />
          </div>

          {!hasValidated ? (
            <div className="py-24 text-center bg-slate-900/20 border border-slate-900 rounded-sm relative overflow-hidden">
              <Activity className="absolute top-4 right-4 text-red-600 opacity-5" size={120} />
              <ShieldAlert className="mx-auto mb-6 text-[#14b8a6]" size={48} />
              <button 
                onClick={() => setHasValidated(true)} 
                className="bg-[#14b8a6] text-black px-12 py-5 font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all shadow-lg"
              >
                Authorize Signal Reveal
              </button>
            </div>
          ) : (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              <section className="text-center relative">
                <Skull className="absolute -top-12 left-1/2 -translate-x-1/2 text-red-600 opacity-10" size={80} />
                <h2 className="text-8xl font-black italic tracking-tighter mb-4">
                  ${result.financials.estimate.toLocaleString()}
                </h2>
                <p className="text-[10px] text-red-600 uppercase font-black tracking-[0.5em]">Validated Annual Hemorrhage Signal</p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <h3 className="text-xl font-black italic uppercase flex items-center gap-2">
                    <TrendingUp className="text-red-600" size={20} /> The Compound Failure
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    &quot;Your ${result.financials.estimate.toLocaleString()} hemorrhage is a compounding liability scaling to <span className="text-white font-bold">$20.4M</span>.&quot;
                  </p>
                  <button 
                    onClick={() => setShowMath(!showMath)} 
                    className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Info size={14} /> {showMath ? "Hide Breakdown" : "View Breakdown"}
                  </button>
                </div>

                <div className="bg-slate-900/40 p-8 border border-slate-800 space-y-6 relative overflow-hidden text-[10px] font-mono uppercase tracking-widest">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <span>Visible Tip</span><span className="text-white font-bold">$1.2M</span>
                  </div>
                  <div className="flex justify-between items-center text-red-600">
                    <span className="italic font-bold tracking-widest">Total Liability</span><span>$20.4M</span>
                  </div>
                </div>
              </section>

              {showMath && (
                <div className="bg-slate-950 p-10 border border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-8 text-center uppercase tracking-widest font-mono animate-in slide-in-from-top-4">
                  <div><span className="text-[9px] text-slate-600">Friction</span><div className="text-xl font-bold text-white">${result.financials.friction.toLocaleString()}</div></div>
                  <div><span className="text-[9px] text-slate-600">Shadow Labor</span><div className="text-xl font-bold text-white">${result.financials.shadowLabor.toLocaleString()}</div></div>
                  <div><span className="text-[9px] text-slate-600">Gap Penalty</span><div className="text-xl font-bold text-white">${result.financials.misalignment.toLocaleString()}</div></div>
                </div>
              )}

              <div className="bg-red-600 p-12 text-center shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left text-white uppercase italic">
                  <h4 className="text-2xl font-black">Prevent the Trap</h4>
                  <p className="text-[10px] font-bold tracking-widest opacity-70">Audit identifies signal. Deep Dive maps the cure.</p>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <button 
                    onClick={handleBooking}
                    className="bg-black text-white px-12 py-5 font-black uppercase text-xs tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-xl"
                  >
                    Schedule Deep Dive Audit <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={handleDownload} 
                    disabled={isDownloading}
                    className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white flex items-center justify-center gap-2"
                  >
                    <Download size={14} className={isDownloading ? "animate-spin" : ""} /> 
                    {isDownloading ? "Processing..." : "Download Dossier"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
