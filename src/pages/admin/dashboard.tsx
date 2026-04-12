"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, X, CheckCircle, Database, BarChart3, Fingerprint, ShieldAlert } from "lucide-react";

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
      setError("ACCESS_DENIED");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchForensics() {
      setLoading(true);
      const { data: auditData } = await supabase.from('audits').select(`*, operators (*, entities (name))`).order('created_at', { ascending: false });
      setData(auditData || []);
      setLoading(false);
    }
    fetchForensics();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono p-4">
        <div className="w-full max-w-md bg-slate-900 border-2 border-red-600/20 p-12 shadow-[0_0_60px_rgba(220,38,38,0.15)]">
          <div className="flex justify-center mb-8"><Lock className="text-red-600" size={40} /></div>
          <h2 className="text-white text-center font-black italic uppercase tracking-[0.2em] text-sm mb-10">BMR_SOLUTIONS // ADMIN_PORTAL</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="AUTHORIZATION_KEY" className="w-full bg-black border border-slate-800 p-5 text-center text-red-600 font-black tracking-widest focus:border-red-600 outline-none transition-all placeholder:text-slate-900" autoFocus />
            <button type="submit" className="w-full bg-red-600 text-white py-5 font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">Initialize_Secure_Session</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-red-600/30 antialiased">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-xl border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Activity className="text-red-600 animate-pulse" size={20} />
          <span className="font-black italic uppercase tracking-[0.15em] text-sm text-white block font-sans">Forensic_Command_Center</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 border border-slate-800 text-[10px] font-mono text-slate-500 hover:text-red-600 uppercase transition-all flex items-center gap-3 font-black bg-slate-950">Terminate_Session <X size={14} /></button>
      </nav>

      <main className="max-w-7xl mx-auto pt-40 pb-20 px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 font-sans">
          <div className="bg-slate-900/40 border border-slate-800 p-10 shadow-2xl relative overflow-hidden font-sans">
            <BarChart3 size={80} className="absolute -bottom-4 -right-4 text-red-600 opacity-5" />
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em] block mb-5 font-black italic border-l border-red-600 pl-3">Cumulative_Rework_Tax</label>
            <div className="text-6xl font-black italic text-white tracking-tighter leading-none">${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}<span className="text-red-600 ml-1 font-black italic tracking-tighter">M</span></div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-10 shadow-2xl relative overflow-hidden font-sans">
            <Fingerprint size={80} className="absolute -bottom-4 -right-4 text-slate-600 opacity-5" />
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em] block mb-5 font-black italic border-l border-slate-700 pl-3">Active_Signal_Nodes</label>
            <div className="text-6xl font-black italic text-white tracking-tighter leading-none font-sans">{data.length}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl">
          <div className="p-10 border-b border-slate-900 bg-slate-900/30 flex items-center gap-4 text-white">
             <Database size={20} className="text-red-600" /><span className="font-black italic uppercase tracking-[0.2em] text-xs">Diagnostic_Ledger // Signal_Feed</span>
          </div>
          <div className="overflow-x-auto font-sans">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em] bg-black">
                  <th className="p-10">Timestamp</th>
                  <th className="p-10">Entity_Identity</th>
                  <th className="p-10 text-center">Status</th>
                  <th className="p-10 text-right">Value_Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.map((audit) => (
                  <tr key={audit.id} className="hover:bg-red-600/[0.03] transition-colors group">
                    <td className="p-10 text-slate-500 font-mono text-[11px]">{new Date(audit.created_at).toLocaleString()}</td>
                    <td className="p-10 font-sans">
                      <div className="font-black text-white uppercase tracking-tighter text-xl italic leading-none mb-2 font-sans">{audit.operators?.entities?.name || "ANONYMOUS_NODE"}</div>
                      <div className="text-[10px] text-slate-600 font-mono italic">{audit.operators?.email || `ID: ${audit.id.slice(0, 12)}`}</div>
                    </td>
                    <td className="p-10 text-center font-sans">
                      <button onClick={() => { setActiveAudit(audit); setIsModalOpen(true); }} className="px-8 py-3.5 bg-red-600 text-white font-black uppercase text-[10px] italic hover:bg-white hover:text-black transition-all tracking-[0.15em] font-sans">Unlock_Directives</button>
                    </td>
                    <td className="p-10 text-right font-black text-white italic text-3xl tracking-tighter">${Number(audit.rework_tax).toFixed(1)}<span className="text-red-600 ml-1 italic font-black text-lg font-sans">M</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
