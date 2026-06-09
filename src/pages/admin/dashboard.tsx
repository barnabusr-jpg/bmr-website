"use client";
import React, { useState, useEffect } from "react";
import { Sliders, ShieldAlert, Radio, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function WorkshopControlDashboard() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuditId, setSelectedAuditId] = useState<string>("");

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("audits").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) {
      setAudits(data);
      setSelectedAuditId(data[0].id);
    }
    setLoading(false);
  };

  const activeAudit = audits.find(a => a.id === selectedAuditId);

  const handleSliderChange = async (column: string, value: number) => {
    if (!selectedAuditId) return;
    setAudits(prev => prev.map(a => a.id === selectedAuditId ? { ...a, [column]: value } : a));
    await supabase.from("audits").update({ [column]: value }).eq("id", selectedAuditId);
  };

  const triggerPhaseTwoReveal = async () => {
    if (!selectedAuditId) return;
    setAudits(prev => prev.map(a => a.id === selectedAuditId ? { ...a, status: "SYSTEM REALITY" } : a));
    await supabase.from("audits").update({ status: "SYSTEM REALITY" }).eq("id", selectedAuditId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-emerald-500 font-mono text-xs uppercase tracking-widest">
        LOADING WORKSHOP RUNTIMES...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-200 font-sans p-6 md:p-12 text-left selection:bg-emerald-500/30">
      <header className="max-w-5xl mx-auto border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <Radio className="text-emerald-500 animate-pulse" size={18} />
            BMR CONTROL PANEL // WORKSHOP SIMULATION CONSOLE
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">REAL-TIME PARAMETER ORCHESTRATION LAYERS</p>
        </div>
        <select 
          value={selectedAuditId} 
          onChange={(e) => setSelectedAuditId(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs px-4 py-2 focus:outline-none focus:border-emerald-500"
        >
          {audits.map((a) => (
            <option key={a.id} value={a.id}>{a.org_name || "UNNAMED TARGET"} ({a.status})</option>
          ))}
        </select>
      </header>

      {activeAudit && (
        <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          <div className="md:col-span-2 space-y-8 bg-slate-950/40 border border-slate-900 p-8 rounded-lg">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 font-mono uppercase flex items-center gap-2 mb-4">
              <Sliders size={16} className="text-emerald-500" /> Live Simulation Parameters
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400 uppercase">Logic Decay Coefficient</span>
                <span className="text-emerald-400 font-bold">{activeAudit.decay_pct || 24}%</span>
              </div>
              <input 
                type="range" min="5" max="95" 
                value={activeAudit.decay_pct || 24}
                onChange={(e) => handleSliderChange("decay_pct", parseInt(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400 uppercase">Annual Software Allocation</span>
                <span className="text-emerald-400 font-bold">${parseFloat(activeAudit.ai_spend || 11.3).toFixed(1)}M</span>
              </div>
              <input 
                type="range" min="1" max="50" step="0.5"
                value={activeAudit.ai_spend || 11.3}
                onChange={(e) => handleSliderChange("ai_spend", parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400 uppercase">Active Engineering Ecosystem</span>
                <span className="text-emerald-400 font-bold">{activeAudit.roi_pct || 150} FTEs</span>
              </div>
              <input 
                type="range" min="10" max="500" step="5"
                value={activeAudit.roi_pct || 150}
                onChange={(e) => handleSliderChange("roi_pct", parseInt(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-900 p-8 rounded-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-widest text-slate-400 font-mono uppercase flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-500" /> Operational Matrix
              </h2>
              <div className="bg-slate-950 p-4 border border-slate-900 font-mono text-xs space-y-2">
                <div className="text-slate-500">CURRENT STATUS:</div>
                <div className="text-white font-bold text-sm tracking-wider uppercase text-emerald-400">{activeAudit.status}</div>
              </div>
              <p className="text-slate-400 font-mono text-[11px] leading-relaxed italic normal-case">
                Clicking the master activation interface triggers a cascade that pushes updates through standard websocket routing to any active client session.
              </p>
            </div>

            <button
              onClick={triggerPhaseTwoReveal}
              disabled={activeAudit.status === "SYSTEM REALITY"}
              className={`w-full font-mono font-bold text-xs py-4 px-6 border tracking-widest transition-all uppercase flex items-center justify-center gap-2 ${
                activeAudit.status === "SYSTEM REALITY"
                  ? "bg-slate-900 text-slate-600 border-slate-950 cursor-not-allowed"
                  : "bg-red-950/40 text-red-400 border-red-900/60 hover:bg-red-900 hover:text-white"
              }`}
            >
              <RefreshCw size={14} className={activeAudit.status !== "SYSTEM REALITY" ? "animate-spin" : ""} />
              UNVEIL LIVE SYSTEM REALITY
            </button>
          </div>

        </main>
      )}
    </div>
  );
}
