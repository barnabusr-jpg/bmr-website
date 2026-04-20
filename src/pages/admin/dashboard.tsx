"use client";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Lock, CheckCircle, Database, BarChart3, 
  Fingerprint, Zap, ShieldAlert, Building2, Download, 
  ChevronDown, ChevronUp, Terminal, Key
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchForensics = useCallback(async () => {
    setLoading(true);
    try {
      // FIXED: Query operators DIRECTLY via the audit_id relation
      const { data: auditData, error } = await supabase
        .from('audits')
        .select(`
          *,
          operators (
            role,
            status,
            raw_responses,
            persona_type
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(auditData || []);
    } catch (err) {
      console.error("DASHBOARD_FETCH_ERROR:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchForensics(); 
    const channel = supabase.channel('ledger-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audits' }, () => fetchForensics())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'operators' }, () => fetchForensics())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAuthenticated, fetchForensics]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} 
          className="bg-slate-900 border-2 border-red-600/20 p-12 shadow-2xl text-center max-w-md w-full"
        >
          <Key className="text-red-600 mx-auto mb-8" size={40} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="AUTHORIZATION_KEY" className="w-full bg-black border border-slate-800 p-5 text-center text-red-600 font-black outline-none font-mono tracking-widest focus:border-red-600 transition-all" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-5 font-black uppercase italic mt-6 hover:bg-white hover:text-red-600 transition-all tracking-[0.2em]">Initialize_Command</button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10 pt-32 font-sans tracking-tighter overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 border-b border-slate-900 z-50 px-10 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-5 text-white font-black italic uppercase tracking-widest text-sm">
          <Activity className="text-red-600 animate-pulse" size={20} />
          Forensic_Command_Center <span className="text-slate-600 font-mono not-italic ml-2 text-[10px]">v7.5_STABLE</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 uppercase hover:text-red-600 transition-colors">Terminate_Session</button>
      </nav>

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Cumulative_Rework_Tax", val: `$${data?.reduce((a, c) => a + (Number(c.rework_tax) || 0), 0).toFixed(1)}M`, icon: <BarChart3 className="text-red-600" /> },
            { label: "Active_Signal_Nodes", val: data?.length || 0, icon: <Fingerprint className="text-slate-500" /> },
            { label: "Critical_Fractures", val: data?.reduce((a, c) => a + (c.fractures?.length || 0), 0), icon: <ShieldAlert className="text-red-600" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 relative group hover:border-red-600/50 transition-all">
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
              <label className="text-[9px] font-mono text-slate-500 uppercase block mb-4 italic tracking-widest">{stat.label}</label>
              <div className="text-5xl font-black italic text-white leading-none">{stat.val}</div>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-mono text-slate-600 uppercase bg-black tracking-[0.2em]">
                <th className="p-8">Entity_Signal</th>
                <th className="p-8 text-center">Status</th>
                <th className="p-8 text-right">Rework_Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data?.length === 0 && (
                <tr><td colSpan={3} className="p-20 text-center text-slate-700 font-mono text-xs uppercase italic">No active diagnostic signals detected.</td></tr>
              )}
              {data?.map((audit) => {
                const operators = audit?.operators || [];
                const isFinished = operators.filter((op: any) => op.status === 'completed').length >= 1; 
                const isExpanded = expandedId === audit.id;

                return (
                  <React.Fragment key={audit.id}>
                    <tr onClick={() => setExpandedId(isExpanded ? null : audit.id)} className={`cursor-pointer transition-all ${isExpanded ? 'bg-red-600/[0.06]' : 'hover:bg-white/[0.03]'}`}>
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <Building2 size={24} className={isFinished ? 'text-green-500' : 'text-red-600'} />
                          <div>
                            <div className="font-black text-white uppercase text-2xl italic tracking-tighter leading-tight">{audit.org_name}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase italic tracking-widest">{audit.lead_email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-8 text-center uppercase italic font-black text-[10px] tracking-widest">
                        {isFinished ? <span className="text-green-500 flex items-center justify-center gap-2"><CheckCircle size={14}/> Result_Published</span> : <span className="text-yellow-500 animate-pulse flex items-center justify-center gap-2"><Zap size={14}/> Active_Synthesis</span>}
                      </td>
                      <td className="p-8 text-right font-black text-white italic text-4xl tracking-tighter">
                        <div className="flex justify-end items-center gap-4">
                          ${Number(audit.rework_tax).toFixed(1)}M
                          {isExpanded ? <ChevronUp size={20} className="text-red-600" /> : <ChevronDown size={20} className="text-slate-800" />}
                        </div>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-black/60 border-l-2 border-red-600 overflow-hidden">
                          <td colSpan={3} className="p-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {['EXECUTIVE', 'MANAGER', 'TECHNICAL'].map((role) => {
                                const op = operators?.find((o: any) => o.role === role || o.persona_type === role);
                                return (
                                  <div key={role} className="bg-slate-900 border border-slate-800 p-6 rounded-sm relative group hover:border-red-600/30 transition-all">
                                    <div className="flex justify-between items-start mb-6 font-black uppercase text-[10px]">
                                      <span className="text-red-600 italic tracking-widest">{role}_NODE</span>
                                      <span className="text-slate-400 font-mono">{op ? 'VERIFIED' : 'AWAITING'}</span>
                                    </div>
                                    <div className="bg-black/40 p-4 border border-slate-800/50 text-[10px] font-mono text-slate-400 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-red-600">
                                      {op ? <pre className="whitespace-pre-wrap leading-relaxed">{`// CAPTURE_START\n` + JSON.stringify(op.raw_responses, null, 2) + `\n// END`}</pre> : <div className="py-8 text-center opacity-30"><Terminal size={16} className="mx-auto mb-2" />SYNCING_NODE...</div>}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-8 flex justify-end">
                               <button className="bg-white text-black px-10 py-4 font-black uppercase italic text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3">
                                  <Download size={16} /> DOWNLOAD_FORENSIC_DOSSIER
                               </button>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
