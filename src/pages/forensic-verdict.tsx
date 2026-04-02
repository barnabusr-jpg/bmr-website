"use client";
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { TrendingUp, AlertTriangle, ShieldAlert, Download, Zap, FileText, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ForensicVerdict() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchVerdict = async () => {
      const res = await fetch('/api/forensic-synthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alpha: JSON.parse(localStorage.getItem('bmr_vault_alpha_results') || '{}'),
          beta: JSON.parse(localStorage.getItem('bmr_vault_beta_results') || '{}'),
          gamma: JSON.parse(localStorage.getItem('bmr_vault_gamma_results') || '{}'),
          sector: localStorage.getItem('bmr_selected_sector') || 'finance'
        })
      });
      setData(await res.json());
    };
    fetchVerdict();
  }, []);

  if (!data) return <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-red-600 uppercase tracking-widest">Synthesizing Verdict...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6 font-sans selection:bg-red-600/30">
      <Head><title>Forensic Verdict | BMR Advisory</title></Head>
      <div className="container mx-auto max-w-5xl">
        
        {/* MATERIAL RISK WARNING */}
        {data.isMaterialRisk && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-red-600/10 p-6 rounded-sm border border-red-600 mb-12">
            <div className="flex items-center gap-4 mb-3">
              <AlertTriangle className="text-red-600" size={24} />
              <h3 className="text-red-600 text-lg font-black uppercase italic tracking-tighter">Material Risk Disclosure Required</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed uppercase font-mono tracking-tight">
              Calculated hemorrhage of <span className="text-white font-bold">${data.total}M</span> exceeds the threshold for systemic financial risk. Audit trail suggests disclosure may be required under current sector regulations.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* TRIANGULATION HEATMAP */}
          <Card className="lg:col-span-2 p-12 bg-slate-950 border-slate-900 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">Triangulation Heatmap</h3>
            <div className="flex justify-center items-center py-12 relative">
              <div className="relative w-64 h-64 border-2 border-slate-900 rotate-45 flex items-center justify-center">
                 <div className={`absolute top-0 left-0 w-10 h-10 rounded-full blur-2xl ${data.heatmap.strategic > 0.5 ? 'bg-red-600' : 'bg-green-500'}`} />
                 <div className={`absolute bottom-0 right-0 w-14 h-14 rounded-full blur-3xl ${data.heatmap.technical > 0.5 ? 'bg-red-600' : 'bg-green-500'}`} />
                 <div className="text-center -rotate-45">
                    <p className="text-4xl font-black italic text-red-600 animate-pulse tracking-tighter">CONFLICT</p>
                 </div>
              </div>
            </div>
            <div className="flex justify-center gap-6 text-[8px] font-mono uppercase tracking-[0.2em] mb-8">
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full" /> Aligned Node</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> Critical Friction</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center border-t border-slate-900 pt-8 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
               <div>Strategic</div><div>Operational</div><div>Technical</div>
            </div>
          </Card>

          {/* VELOCITY FORECAST */}
          <Card className="p-8 bg-slate-950 border-red-600/20 border flex flex-col justify-between shadow-2xl">
            <div>
              <Zap className="text-red-600 mb-6" size={28} />
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">12-Month Drift Velocity</h4>
              <p className="text-5xl font-black italic tracking-tighter mb-4 text-white">${data.projected}M</p>
              <div className="space-y-1 mb-8">
                <p className="text-red-600 text-xl font-black italic tracking-tighter">+${data.driftLoss}M</p>
                <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Additional Loss Next Fiscal Year</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-900">
               <p className="text-[10px] text-slate-400 italic leading-relaxed uppercase tracking-wider">
                 Logic decay scales exponentially. Delaying remediation increases hemorrhage by 22% annually.
               </p>
            </div>
          </Card>
        </div>

        {/* PRIMARY SIGNAL */}
        <Card className="p-20 bg-slate-950 border-2 border-red-600 mb-16 text-center relative shadow-[0_0_60px_rgba(220,38,38,0.1)]">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600"></div>
           <h2 className="text-[10px] font-mono text-red-600 uppercase font-black tracking-[0.6em] mb-8">Annual Logic Decay Hemorrhage</h2>
           <span className="text-9xl font-black italic tracking-tighter text-white">${data.total}M</span>
           <div className="mt-12 flex justify-center gap-12 font-black italic uppercase tracking-tighter">
              <div className="text-left">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Variance Penalty</p>
                <p className="text-2xl text-red-600">+{data.variance}%</p>
              </div>
              <div className="text-left border-l border-slate-900 pl-12">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Forensic Confidence</p>
                <p className="text-2xl text-green-500">{data.confidence}% <span className="text-xs text-slate-600">±1.2%</span></p>
              </div>
           </div>
        </Card>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-24">
          <button onClick={() => router.push('/corrective-protocol')} className="bg-red-600 hover:bg-white text-white hover:text-black font-black py-8 px-16 uppercase tracking-[0.4em] text-[12px] italic border border-red-600 transition-all flex items-center justify-center gap-4">
             Unlock Corrective Protocol ($49,000) <ArrowRight size={18} />
          </button>
          <button onClick={() => window.print()} className="bg-slate-900 hover:bg-slate-800 text-white font-black py-8 px-16 uppercase tracking-[0.4em] text-[12px] italic border border-slate-800 transition-all flex items-center justify-center gap-4">
             Export Board Deck <FileText size={18} />
          </button>
        </div>

        {/* PROVENANCE WATERMARK */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-t border-slate-900 font-mono text-[9px] text-slate-700 uppercase tracking-widest">
           <div className="flex items-center gap-4">
              <ShieldAlert size={14} className="text-red-600" />
              <span>Dossier ID: {data.provenance.audit_id}</span>
              <span className="italic">Verification: {new Date(data.provenance.timestamp).toLocaleString()}</span>
           </div>
           <div className="flex gap-12 items-center">
              <p className="italic text-[8px] text-slate-800">Generated via BMR Forensic Logic Engine 3.4.1</p>
           </div>
        </div>

      </div>
    </div>
  );
}
