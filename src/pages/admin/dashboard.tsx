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

  const fetchLedger = useCallback(async () => {
    setLoading(true);
    try {
      // Fetching all audit responses to populate the HUD
      const { data: audits, error: auditError } = await supabase
        .from('audit_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (auditError) throw auditError;

      // Fetch operators separately to ensure the UI doesn't "ghost" rows
      const { data: allOperators } = await supabase.from('operators').select('*');

      const enriched = (audits || []).map(audit => ({
        ...audit,
        operators: (allOperators || []).filter(op => op.audit_id === audit.id)
      }));

      setData(enriched);
    } catch (err) {
      console.error("COMMAND_CENTER_SYNC_ERROR:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchLedger(); 
    
    const channel = supabase.channel('ledger-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audit_responses' }, () => fetchLedger())
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  }, [isAuthenticated, fetchLedger]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans">
        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} 
          className="bg-slate-950 border-2 border-red-600/20 p-16 shadow-[0_0_100px_rgba(220,38,38,0.1)] text-center max-w-md w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <div className="space-y-8">
            <h2 className="text-white font-black uppercase italic tracking-[0.3em] text-xs">Forensic_Command_Auth</h2>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="MASTER_KEY" 
              className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 transition-all placeholder:text-slate-900"
              autoFocus 
            />
            <button type="submit" className="w-full bg-red-600 text-white py-6 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all text-lg shadow-2xl">
              INITIALIZE_COMMAND
            </button>
          </div>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10 pt-32 font-sans tracking-tighter">
      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 border-b border-slate-900 z-50 px-10 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-5 text-white font-black italic uppercase tracking-widest text-sm leading-none">
          <Activity className="text-red-600 animate-pulse" size={20} />
          Forensic_Command_Center <span className="text-slate-600 font-mono not-italic ml-2 text-[10px]">v7.5_STABLE</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hover:text-red-600 transition-colors">Terminate_Session</button>
      </nav>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* HUD STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Cumulative_Rework_Tax", val: `$${data?.reduce((a, c) => a + (Number(c.rework_tax) || 0), 0).toFixed(1)}M`, icon: <BarChart3 className="text-red-600" /> },
            { label: "Active_Signal_Nodes", val: data?.length || 0, icon: <Fingerprint className="text-slate-500" /> },
            { label: "Critical_Fractures", val: 0, icon: <ShieldAlert className="text-red-600" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-10 relative group hover:border-red-600/50 transition-all shadow-xl">
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
              <label className="text-[10px] font-mono text-slate-500 uppercase block mb-6 italic tracking-widest">{stat.label}</label>
              <div className="text-6xl font-black italic text-white leading-none tracking-tighter">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* LEDGER TABLE */}
        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-mono text-slate-600 uppercase bg-black tracking-[0.3em] border-b border-slate-900">
                  <th className="p-10">Entity_Signal</th>
                  <th className="p-10 text-center">Status</th>
                  <th className="p-10 text-right">Rework_Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.length === 0 && !loading && (
                  <tr><td colSpan={3} className="p-20 text-center text-slate-700 font-mono text-xs uppercase italic tracking-[0.3em]">No active diagnostic signals detected in ledger.</td></tr>
                )}
                {data.map((audit) => {
                  const ops = audit.operators || [];
                  const isFinished = ops.length >= 1;
                  const isExpanded = expandedId === audit.id;

                  return (
                    <React.Fragment key={audit.id}>
                      <tr onClick={() => setExpandedId(isExpanded ? null : audit.id)} className={`cursor-pointer transition-all ${isExpanded ? 'bg-red-600/[0.06]' : 'hover:bg-white/[0.03]'}`}>
                        <td className="p-10">
                          <div className="flex items-center gap-6 leading-tight">
                            <Building2 size={32} className={isFinished ? 'text-green-500' : 'text-red-600'} />
                            <div>
                              <div className="font-black text-white uppercase text-3xl italic tracking-tighter leading-none">{audit.org_name || "LEAD_INTAKE"}</div>
                              <div className="text-[11px] text-slate-500 font-mono mt-1 uppercase italic tracking-widest">{audit.lead_email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-10 text-center">
                          <div className={`${isFinished ? 'text-green-500' : 'text-yellow-500 animate-pulse'} text-[11px] font-black uppercase italic flex items-center justify-center gap-2 tracking-[0.15em]`}>
                            {isFinished ? <CheckCircle size={14} /> : <Zap size={14} />} {isFinished ? 'Result_Published' : 'Active_Synthesis'}
                          </div>
                        </td>
                        <td className="p-10 text-right font-black text-white italic text-5xl tracking-tighter leading-none">
                          <div className="flex justify-end items-center gap-6 leading-none">
                            ${Number(audit.rework_tax || 0).toFixed(1)}M
                            {isExpanded ? <ChevronUp size={24} className="text-red-600" /> : <ChevronDown size={24} className="text-slate-800" />}
                          </div>
                        </td>
                      </tr>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-black/60 border-l-2 border-red-600 overflow-hidden">
                            <td colSpan={3} className="p-10">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {['EXECUTIVE', 'MANAGER', 'TECHNICAL'].map((role) => {
                                  const op = ops.find((o: any) => o.persona_type === role);
                                  return (
                                    <div key={role} className="bg-slate-900 border border-slate-800 p-8 rounded-sm relative group hover:border-red-600/30 transition-all">
                                      <div className="flex justify-between items-start mb-8 font-black uppercase text-[10px]">
                                        <span className="text-red-600 italic tracking-widest">{role}_NODE</span>
                                        <span className="text-slate-400 font-mono tracking-widest">{op ? 'VERIFIED' : 'AWAITING'}</span>
                                      </div>
                                      <div className="bg-black/40 p-6 border border-slate-800/50 text-[11px] font-mono text-slate-400 max-h-64 overflow-y-auto">
                                        {op ? <pre className="whitespace-pre-wrap leading-relaxed">{JSON.stringify(op.raw_responses, null, 2)}</pre> : <div className="py-12 text-center opacity-30 italic font-mono tracking-[0.2em]"><Terminal size={20} className="mx-auto mb-4" />SYNCING_NODE...</div>}
                                      </div>
                                    </div>
                                  );
                                })}
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
    </div>
  );
}
