"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Shield, Users, DollarSign, Eye, RefreshCw } from "lucide-react";
import { AuditRecord } from "@/types/database.types";

export default function AdminCoreDashboard() {
  const [audits, setAudits] = useState<AuditRecord[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [sliderSpend, setSliderSpend] = useState<number>(1.2);
  const [sliderWorkforce, setSliderWorkforce] = useState<number>(5);

  useEffect(() => {
    fetchAuditsLedger();
  }, []);

  const fetchAuditsLedger = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAudits((data as AuditRecord[]) || []);
      
      if (data && data.length > 0) {
        if (selectedAudit) {
          const updated = data.find(a => a.id === selectedAudit.id);
          handleAuditSelection(updated || data[0]);
        } else {
          handleAuditSelection(data[0]);
        }
      }
    } catch (err) {
      console.error("ADMIN_LEDGER_FETCH_ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuditSelection = (audit: any) => {
    setSelectedAudit(audit as AuditRecord);
    setSliderSpend(parseFloat(audit?.ai_spend) || 1.2);
    // 🏷️ Destructures the database column 'roi_pct' natively into local workforce state context
    setSliderWorkforce(audit?.roi_pct ? parseInt(audit.roi_pct) : Math.round(((parseFloat(audit?.ai_spend) || 1.2) * 1000000) / 200000) || 5);
  };

  const pushSliderUpdate = async (field: "ai_spend" | "roi_pct", value: number) => {
    if (!selectedAudit) return;
    try {
      const { error } = await supabase
        .from("audits")
        .update({ [field]: value })
        .eq("id", selectedAudit.id);
      
      if (error) throw error;
      setSelectedAudit((prev: any) => prev ? ({ ...prev, [field]: value }) : null);
    } catch (err) {
      console.error("REALTIME_DB_PUSH_FAILURE:", err);
    }
  };

  const togglePhaseGate = async () => {
    if (!selectedAudit) return;
    const targetState = !selectedAudit.is_released;
    try {
      const { error } = await supabase
        .from("audits")
        .update({ is_released: targetState })
        .eq("id", selectedAudit.id);

      if (error) throw error;
      setSelectedAudit((prev: any) => prev ? ({ ...prev, is_released: targetState }) : null);
      fetchAuditsLedger();
    } catch (err) {
      console.error("GATE_TOGGLE_FAILURE:", err);
    }
  };

  if (loading && audits.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-green-500 font-mono text-xs uppercase italic tracking-widest">
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
            <span className="text-[9px] text-slate-500 tracking-wider block mt-0.5">ADMINISTRATIVE INTERFACE // REPURPOSED DESTRUCTURING TYPE LOCKS</span>
          </div>
        </div>
        <button 
          onClick={fetchAuditsLedger}
          className="p-2.5 bg-slate-950 border border-slate-850 hover:bg-slate-900 transition-colors text-slate-400"
        >
          <RefreshCw size={14} />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-96 border-r border-slate-900/80 bg-slate-950/40 overflow-y-auto">
          <div className="p-4 bg-black/40 border-b border-slate-900 text-[10px] text-slate-500 tracking-widest font-bold">
            // LIVE CAPTURED INTAKE STREAMS ({audits.length})
          </div>
          <div className="divide-y divide-slate-900">
            {audits.map((item) => {
              const isActive = selectedAudit?.id === item.id;
              const sector = (item.sector || "general").toLowerCase();
              const tagColor = sector === "finance" ? "text-green-500" : sector === "healthcare" ? "text-blue-500" : "text-red-600";

              return (
                <div
                  key={item.id}
                  onClick={() => handleAuditSelection(item)}
                  className={`p-5 cursor-pointer text-left transition-all relative ${
                    isActive ? "bg-slate-900/60 border-l-4 border-green-500" : "hover:bg-slate-900/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white text-xs font-black tracking-tight block truncate max-w-[180px]">
                      {item.org_name || "UNKNOWN SYSTEM"}
                    </span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 bg-slate-950 border border-slate-850 tracking-widest ${tagColor}`}>
                      {sector}
                    </span>
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                    <span>DECAY: {item.decay_pct}%</span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 p-12 bg-slate-950/10 overflow-y-auto flex flex-col justify-start items-start">
          {selectedAudit ? (
            <div className="max-w-3xl w-full space-y-10">
              <div className="border border-slate-900 p-6 bg-slate-950/40 space-y-4">
                <span className="text-[10px] text-slate-500 tracking-widest font-black block">// TARGET DOSSIER ANCHOR</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 text-[9px] block">ORGANIZATION NAME:</span>
                    <div className="text-white text-sm mt-0.5">{selectedAudit.org_name || "UNSPECIFIED"}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] block">UNIQUE RECORD HASH ID:</span>
                    <div className="text-slate-400 font-sans text-[11px] mt-1 tracking-tight select-all">{selectedAudit.id}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border-2 border-slate-900 p-8 space-y-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <div className="text-slate-400 font-black tracking-widest text-[10px]">// REAL-TIME WORKSHOP TUNING PANEL</div>
                  <span className={`px-2 py-0.5 text-[9px] font-black tracking-widest ${selectedAudit.is_released ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                    {selectedAudit.is_released ? 'STATUS: PHASE_TWO_LIVE' : 'STATUS: PHASE_ONE_BENCHMARK'}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between font-black tracking-tight text-white items-end">
                    <span className="flex items-center gap-2 text-slate-400"><DollarSign size={14} className="text-green-500" /> SYSTEM ANNUAL SOFTWARE SPEND:</span>
                    <span className="text-green-500 text-sm font-bold">${sliderSpend.toFixed(1)}M</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="25.0" step="0.1" 
                    value={sliderSpend} 
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setSliderSpend(val);
                      pushSliderUpdate("ai_spend", val);
                    }}
                    className="w-full accent-green-500 bg-slate-900 h-2 cursor-pointer transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between font-black tracking-tight text-white items-end">
                    {/* 🏷️ UI Label notes that we are editing corporate staff scale while updating the roi_pct column under the hood */}
                    <span className="flex items-center gap-2 text-slate-400"><Users size={14} className="text-blue-500" /> IMPACTED WORKFORCE SCALE (FTES) [MAPPED TO ROI_PCT]:</span>
                    <span className="text-blue-500 text-sm font-bold">{sliderWorkforce} PEOPLE</span>
                  </div>
                  <input 
                    type="range" min="1" max="250" step="1" 
                    value={sliderWorkforce} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setSliderWorkforce(val);
                      pushSliderUpdate("roi_pct", val); // Writes natively to roi_pct column block
                    }}
                    className="w-full accent-blue-500 bg-slate-900 h-2 cursor-pointer transition-all"
                  />
                </div>

                <div className="pt-6 border-t border-slate-900 flex flex-col gap-3">
                  <button
                    onClick={togglePhaseGate}
                    className={`w-full py-4 font-black tracking-widest text-center transition-all border ${
                      selectedAudit.is_released 
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-red-950 hover:text-red-400 hover:border-red-900' 
                        : 'bg-green-600 text-white border-green-500 hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    {selectedAudit.is_released ? '[ 🔒 DE-ACTIVATE PHASE TWO CORE DATA ]' : '[ 🔓 RELEASE PHASE TWO SYSTEM REALITY ]'}
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => window.open(`/results/${selectedAudit.id}`, "_blank")}
                  className="flex-1 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-300 py-3 flex items-center justify-center gap-2 transition-all"
                >
                  <Eye size={14} /> LAUNCH CLIENT PORTAL VIEW
                </button>
              </div>
            </div>
          ) : (
            <div className="m-auto text-slate-600 italic">NO ACTIVE RECONSTRUCTION ROW HIGHLIGHTED.</div>
          )}
        </main>
      </div>
    </div>
  );
}
