"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, X, CheckCircle, Database, BarChart3, Fingerprint, Send } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAudit, setActiveAudit] = useState<any>(null);

  const ADMIN_PASSWORD = "KIMMALASR_03"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
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

  const handleDispatch = async (tech: string, mgr: string) => {
    const res = await fetch('/api/dispatch-directives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entityId: activeAudit.id,
        primaryEmail: activeAudit.operators?.email,
        techEmail: tech,
        mgrEmail: mgr,
        reworkTax: activeAudit.rework_tax,
        entityName: activeAudit.operators?.entities?.name || "BMR_CLIENT"
      })
    });
    if (res.ok) {
      setData(prev => prev.map(a => a.id === activeAudit.id ? {...a, status: 'RELEASED'} : a));
      setIsModalOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border-2 border-red-600/20 p-12 shadow-2xl">
          <Lock className="text-red-600 mx-auto mb-8" size={40} />
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="AUTHORIZATION_KEY" className="w-full bg-black border border-slate-800 p-5 text-center text-red-600 font-black tracking-widest outline-none focus:border-red-600" autoFocus />
            <button type="submit" className="w-full bg-red-600 text-white py-5 font-black uppercase italic">Initialize_Session</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-10 pt-32 font-sans">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Activity className="text-red-600 animate-pulse" size={20} />
          <span className="font-black italic uppercase tracking-widest text-sm text-white">Forensic_Command_Center</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 uppercase font-black">Terminate_Session</button>
      </nav>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative overflow-hidden">
            <BarChart3 size={80} className="absolute -bottom-4 -right-4 text-red-600 opacity-5" />
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-5">Cumulative_Rework_Tax</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}<span className="text-red-600 ml-1">M</span></div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative overflow-hidden">
            <Fingerprint size={80} className="absolute -bottom-4 -right-4 text-slate-600 opacity-5" />
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-5">Active_Nodes</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.length}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-slate-900 bg-slate-900/30 flex items-center gap-4">
             <Database size={20} className="text-red-600" />
             <span className="font-black italic uppercase tracking-widest text-xs text-white">Diagnostic_Ledger</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="text-[10px] font-mono text-slate-600 uppercase tracking-widest bg-black">
                  <th className="p-10">Timestamp</th>
                  <th className="p-10">Entity</th>
                  <th className="p-10 text-center">Status</th>
                  <th className="p-10 text-right">Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.map((audit) => (
                  <tr key={audit.id} className="hover:bg-red-600/[0.03] transition-colors">
                    <td className="p-10 text-slate-500 font-mono text-[11px]">{new Date(audit.created_at).toLocaleString()}</td>
                    <td className="p-10">
                      <div className="font-black text-white uppercase text-xl italic leading-none mb-2">{audit.operators?.entities?.name || "SHADOW_SIGNAL"}</div>
                      <div className="text-[10px] text-slate-600 font-mono italic">{audit.operators?.email || audit.id.slice(0, 12)}</div>
                    </td>
                    <td className="p-10 text-center">
                      {audit.status === 'RELEASED' ? (
                        <div className="text-green-500 text-[10px] font-black uppercase italic tracking-widest flex items-center justify-center gap-2"><CheckCircle size={14}/> Released</div>
                      ) : (
                        <button onClick={() => { setActiveAudit(audit); setIsModalOpen(true); }} className="px-8 py-3.5 bg-red-600 text-white font-black uppercase text-[10px] italic">Unlock_Directives</button>
                      )}
                    </td>
                    <td className="p-10 text-right font-black text-white italic text-3xl">${Number(audit.rework_tax).toFixed(1)}<span className="text-red-600 ml-1 text-lg">M</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal audit={activeAudit} onClose={() => setIsModalOpen(false)} onConfirm={handleDispatch} />}
    </div>
  );
}

function Modal({ audit, onClose, onConfirm }: any) {
  const [tech, setTech] = useState("");
  const [mgr, setMgr] = useState("");
  return (
    <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center z-[100] p-6">
      <div className="bg-slate-900 border-2 border-red-600/30 p-16 max-w-3xl w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-600 hover:text-white"><X size={32}/></button>
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-12 font-sans">Initialize_Dispatch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 font-mono text-[10px]">
          <div className="space-y-4">
            <label className="text-red-600 uppercase font-black tracking-widest">Sector_01: Technical</label>
            <input type="email" placeholder="EMAIL_REQUIRED" value={tech} onChange={e => setTech(e.target.value)} className="w-full bg-black border border-slate-800 p-4 text-white outline-none focus:border-red-600 uppercase font-bold" />
          </div>
          <div className="space-y-4">
            <label className="text-red-600 uppercase font-black tracking-widest">Sector_02: Managerial</label>
            <input type="email" placeholder="EMAIL_REQUIRED" value={mgr} onChange={e => setMgr(e.target.value)} className="w-full bg-black border border-slate-800 p-4 text-white outline-none focus:border-red-600 uppercase font-bold" />
          </div>
        </div>
        <button onClick={() => onConfirm(tech, mgr)} className="w-full py-7 bg-red-600 text-white font-black uppercase italic tracking-[0.5em] text-xs hover:bg-white hover:text-black transition-all">Execute_MRI_Dispatch</button>
      </div>
    </div>
  );
}
