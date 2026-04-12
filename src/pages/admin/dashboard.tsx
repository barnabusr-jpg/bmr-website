"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, ArrowLeft, CheckCircle, Send, X, ShieldAlert, Database, BarChart3 } from "lucide-react";
import Header from "@/components/Header";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAudit, setActiveAudit] = useState<any>(null);

  const ADMIN_PASSWORD = "KIMMALASR_03"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("ACCESS_DENIED: INVALID_CREDENTIALS");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchForensics() {
      setLoading(true);
      // 🔬 FAULT-TOLERANT FETCH: Includes Shadow Signals (unlinked audits)
      const { data: auditData, error: supabaseError } = await supabase
        .from('audits')
        .select(`
          *,
          operators (
            id, email, is_authorized, entity_id,
            entities ( name )
          )
        `)
        .order('created_at', { ascending: false });

      if (!supabaseError) {
        setData(auditData || []);
      }
      setLoading(false);
    }
    fetchForensics();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono p-4">
        <div className="w-full max-w-md bg-slate-900 border-2 border-red-600/20 p-12 shadow-[0_0_50px_rgba(220,38,38,0.1)]">
          <div className="flex justify-center mb-8"><Lock className="text-red-600" size={40} /></div>
          <h2 className="text-white text-center font-black italic uppercase tracking-[0.2em] text-sm mb-10">BMR_SOLUTIONS // ADMIN_PORTAL</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="AUTHORIZATION_KEY"
              className="w-full bg-black border border-slate-800 p-5 text-center text-red-600 font-black tracking-widest focus:border-red-600 outline-none transition-all placeholder:text-slate-800"
              autoFocus
            />
            {error && <p className="text-[10px] text-red-500 text-center font-black animate-pulse uppercase tracking-widest">{error}</p>}
            <button type="submit" className="w-full bg-red-600 text-white py-5 font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">
              Initialize_Secure_Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-red-600/30">
      {/* 🛠️ NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-md border-b border-slate-900 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Activity className="text-red-600 animate-pulse" size={20} />
          <span className="font-black italic uppercase tracking-widest text-sm text-white">Forensic_Command_Center</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 hover:text-red-600 uppercase transition-all flex items-center gap-2 font-black">
          Terminate_Session <X size={14} />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {/* 📊 METRICS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/50 border border-slate-800 p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
               <BarChart3 size={60} className="text-red-600" />
            </div>
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4 font-black italic">Cumulative_Rework_Tax</label>
            <div className="text-5xl font-black italic text-white tracking-tighter">
              ${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}M
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-8 shadow-2xl">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4 font-black italic">Active_Trace_Nodes</label>
            <div className="text-5xl font-black italic text-white tracking-tighter">{data.length}</div>
          </div>
        </div>

        {/* 🏛️ SIGNAL LEDGER */}
        <div className="bg-slate-950 border border-slate-900 shadow-2xl rounded-none">
          <div className="p-8 border-b border-slate-900 bg-slate-900/40 flex items-center gap-4 text-white">
            <Database size={18} className="text-red-600" />
            <span className="font-black italic uppercase tracking-widest text-xs">Diagnostic_Ledger_V2</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em] bg-black/50">
                  <th className="p-8">Trace_Timestamp</th>
                  <th className="p-8">Entity_Identifier</th>
                  <th className="p-8 text-center">Directive_Release</th>
                  <th className="p-8 text-right">Validated_Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.map((audit) => (
                  <tr key={audit.id} className="hover:bg-red-600/[0.03] transition-colors group">
                    <td className="p-8 text-slate-500 font-mono text-xs uppercase tracking-tighter">
                       {new Date(audit.created_at).toLocaleString()}
                    </td>
                    <td className="p-8">
                      <div className="font-black text-white uppercase tracking-tighter text-lg italic leading-none mb-1">
                        {audit.operators?.entities?.name || "ANONYMOUS_ENTITY"}
                      </div>
                      <div className="text-[10px] text-slate-600 font-mono italic">
                        {audit.operators?.email || `ID: ${audit.id.slice(0, 8)}`}
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      {audit.operators?.is_authorized ? (
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-950/30 border border-green-500/30 text-green-500 text-[10px] font-black uppercase italic tracking-widest">
                          <CheckCircle size={14} /> LIVE_NODE
                        </div>
                      ) : (
                        <button 
                          onClick={() => { setActiveAudit(audit); setIsModalOpen(true); }}
                          className="px-6 py-3 bg-red-600 text-white font-black uppercase text-[10px] italic hover:bg-white hover:text-black transition-all tracking-widest shadow-lg shadow-red-900/20"
                        >
                          Release_Directives
                        </button>
                      )}
                    </td>
                    <td className="p-8 text-right font-black text-white italic text-2xl tracking-tighter">
                      ${Number(audit.rework_tax).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && !loading && (
              <div className="p-24 text-center text-slate-800 font-mono uppercase text-[10px] tracking-widest italic">
                No forensic signals detected in secure channel.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🛰️ MODAL INTERFACE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-6">
           <div className="bg-slate-900 border-2 border-red-600/30 p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(220,38,38,0.2)]">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Manual_Dispatch</h2>
                  <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-black italic">Target: {activeAudit?.operators?.entities?.name || "EXTERNAL_CLIENT"}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-600 hover:text-white transition-colors"><X size={28}/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 font-mono text-[10px]">
                  <div className="p-6 bg-black border border-slate-800">
                    <label className="text-red-600 uppercase block mb-4 font-black">Node_01: Technical</label>
                    <input type="email" placeholder="EMAIL_REQUIRED" className="w-full bg-transparent border-b border-slate-800 py-3 outline-none focus:border-red-600 text-white uppercase font-bold" />
                  </div>
                  <div className="p-6 bg-black border border-slate-800">
                    <label className="text-red-600 uppercase block mb-4 font-black">Node_02: Managerial</label>
                    <input type="email" placeholder="EMAIL_REQUIRED" className="w-full bg-transparent border-b border-slate-800 py-3 outline-none focus:border-red-600 text-white uppercase font-bold" />
                  </div>
              </div>
              <button className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all">
                Execute_MRI_Directives
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
