"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Shield, Users, DollarSign, Eye, RefreshCw } from "lucide-react";
import { AuditRecord } from "@/types/database.types";

export default function AdminCoreDashboard() {
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [sliderSpend, setSliderSpend] = useState<number>(1.2);
  const [sliderWorkforce, setSliderWorkforce] = useState<number>(5);

  useEffect(() => {
    fetchLatestAudit();
  }, []);

  const fetchLatestAudit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) {
        const record = data[0] as AuditRecord;
        setSelectedAudit(record);
        setSliderSpend(parseFloat(String(record?.ai_spend)) || 1.2);
        setSliderWorkforce(record?.roi_pct ? parseInt(String(record.roi_pct)) : Math.round(((parseFloat(String(record?.ai_spend)) || 1.2) * 1000000) / 200000) || 5);
      }
    } catch (err) {
      console.error("FETCH_ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = async (field: "ai_spend" | "roi_pct", value: number) => {
    if (!selectedAudit) return;
    setSelectedAudit(prev => prev ? { ...prev, [field]: value } : null);
    try {
      await supabase.from("audits").update({ [field]: value }).eq("id", selectedAudit.id);
    } catch (err) {
      console.error("UPDATE_ERROR:", err);
    }
  };

  const togglePhaseGate = async () => {
    if (!selectedAudit) return;
    const targetState = !selectedAudit.is_released;
    setSelectedAudit(prev => prev ? { ...prev, is_released: targetState } : null);
    try {
      await supabase.from("audits").update({ is_released: targetState }).eq("id", selectedAudit.id);
    } catch (err) {
      console.error("TOGGLE_ERROR:", err);
    }
  };

  if (loading && !selectedAudit) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-green-500 font-mono text-xs uppercase tracking-widest">
        <Activity className="animate-spin mb-4" size={32} />
        INITIALIZING_ADMINISTRATIVE_LEDGER_CORE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono flex flex-col uppercase text-xs text-left italic font-black">
      <header className="h-20 bg-black border-b border-slate-900 px-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Shield className="text-green-500" size={20} />
          <div>
            <h1 className="text-sm font-black tracking-widest text-white">BMR_CENTRAL_COMMAND_DECK</h1>
            <span className="text-[9px] text-slate-500 tracking-wider block mt-0.5">ADMINISTRATIVE INTERFACE // PORTAL CONTROLLER</span>
          </div>
        </div>
        <button onClick={fetchLatestAudit} className="p-2.5 bg-slate-950 border border-slate-850 text-slate-400">
          <RefreshCw size={14} />
        </button>
      </header>

      <main className="flex-1 p-12 bg-slate-950/10 flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full space-y-10">
          <div className="border border-slate-900 p-6 bg-slate-950/40 space-y-4">
            <span className="text-[10px] text-slate-500 tracking-widest font-black block">// TARGET DOSSIER ANCHOR</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 text-[9px] block">ORGANIZATION NAME:</span>
                <div className="text-white text-sm mt-0.5">{selectedAudit?.org_name || "UNSPECIFIED"}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[9px] block">UNIQUE RECORD HASH ID:</span>
                <div className="text-slate-400 font-sans text-[11px] mt-1 tracking-tight select-all">{selectedAudit?.id}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border-2 border-slate-900 p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
              <div className="text-slate-400 font-black tracking-widest text-[10px]">// REAL-TIME WORKSHOP TUNING PANEL</div>
              <span className={`px-2 py-0.5 text-[9px] font-black tracking-widest ${selectedAudit?.is_released ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                {selectedAudit?.is_released ? 'STATUS: PHASE_TWO_LIVE' : 'STATUS: PHASE_ONE_BENCHMARK'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between font-black tracking-tight text-white items-end">
                <span className="flex items-center gap-2 text-slate-400"><DollarSign size={14} className="text-green-500" /> SYSTEM ANNUAL SOFTWARE SPEND:</span>
                <span className="text-green-500 text-sm font-bold">${sliderSpend.toFixed(1)}M</span>
              </div>
              <input type="range" min="0.1" max="25.0" step="0.1" value={sliderSpend} onChange={(e) => { setSliderSpend(parseFloat(e.target.value)); handleSliderChange("ai_spend", parseFloat(e.target.value)); }} className="w-full accent-green-500 bg-slate-900 h-2 cursor-pointer transition-all" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between font-black tracking-tight text-white items-end">
                <span className="flex items-center gap-2 text-slate-400"><Users size={14} className="text-blue-500" /> IMPACTED WORKFORCE SCALE (FTES):</span>
                <span className="text-blue-500 text-sm font-bold">{sliderWorkforce} PEOPLE</span>
              </div>
              <input type="range" min="1" max="250" step="1" value={sliderWorkforce} onChange={(e) => { setSliderWorkforce(parseInt(e.target.value)); handleSliderChange("roi_pct", parseInt(e.target.value)); }} className="w-full accent-blue-500 bg-slate-900 h-2 cursor-pointer transition-all" />
            </div>

            <div className="pt-4 border-t border-slate-900 flex flex-col gap-3">
              <button onClick={togglePhaseGate} className={`w-full py-4 font-black tracking-widest text-center transition-all border ${selectedAudit?.is_released ? 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-red-950 hover:text-red-400 hover:border-red-900' : 'bg-green-600 text-white border-green-500 hover:bg-white hover:text-black hover:border-white'}`}>
                {selectedAudit?.is_released ? '[ 🔒 DE-ACTIVATE PHASE TWO CORE DATA ]' : '[ 🔓 RELEASE PHASE TWO SYSTEM REALITY ]'}
              </button>
            </div>
          </div>

          <button onClick={() => window.open(`/results/${selectedAudit?.id}`, "_blank")} className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-300 py-3 flex items-center justify-center gap-2 transition-all">
            <Eye size={14} /> LAUNCH CLIENT PORTAL VIEW
          </button>
        </div>
      </main>
    </div>
  );
}
