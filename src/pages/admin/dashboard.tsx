"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Activity, BarChart3, Fingerprint, Building2, Send, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any[]>([]);
  
  // --- FUNCTIONAL ADDITION: MODAL STATE ---
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [emails, setEmails] = useState({ exec: "", mgr: "", tech: "" });

  const fetchLedger = useCallback(async () => {
    // --- FUNCTIONAL CHANGE: POINT TO NEW 'audits' TABLE ---
    const { data: audits } = await supabase.from('audits').select('*').order('created_at', { ascending: false });
    setData(audits || []);
  }, []);

  // --- FUNCTIONAL ADDITION: TRIANGULATION TRIGGER ---
  const activateTriangulation = async () => {
    if (!selectedAudit) return;
    const { error } = await supabase
      .from('audits')
      .update({ 
        status: 'ACTIVE_SYNTHESIS',
        exec_email: emails.exec,
        mgr_email: emails.mgr,
        tech_email: emails.tech
      })
      .eq('id', selectedAudit.id);

    if (!error) {
      setSelectedAudit(null);
      setEmails({ exec: "", mgr: "", tech: "" });
      fetchLedger();
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchLedger();
  }, [isAuthenticated, fetchLedger]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 placeholder:text-slate-900" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all text-lg">INITIALIZE_COMMAND</button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-10 pt-32 font-sans tracking-tighter">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b border-slate-900 z-50 px-10 flex items-center gap-5">
        <Activity className="text-red-600" size={24} />
        <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">Forensic_Command_Center</span>
      </nav>

      {/* --- FUNCTIONAL ADDITION: TRIANGULATION MODAL --- */}
      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
              <h2 className="text-3xl font-black uppercase italic text-white mb-8">INITIATE_TRIANGULATION</h2>
              <div className="space-y-4 text-left">
                <input placeholder="EXECUTIVE_NODE_EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-black border border-slate-900 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="MANAGERIAL_NODE_EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-black border border-slate-900 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="TECHNICAL_NODE_EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-black border border-slate-900 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <button onClick={activateTriangulation} className="w-full bg-red-600 text-white py-6 font-black uppercase italic hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                  <Send size={18} /> ACTIVATE_NODES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative">
            <BarChart3 className="absolute top-6 right-6 text-red-600 opacity-20" />
            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-6 italic tracking-widest">Cumulative_Rework_Tax</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">${data.reduce((a, c) => a + (Number(c.rework_tax) || 0), 0).toFixed(1)}M</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative">
            <Fingerprint className="absolute top-6 right-6 text-slate-500 opacity-20" />
            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-6 italic tracking-widest">Active_Signals</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.length}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-[10px] text-slate-600 uppercase tracking-[0.3em] border-b border-slate-900">
                <th className="p-10">Entity</th>
                <th className="p-10 text-right">Rework_Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data.map((audit) => (
                <tr key={audit.id} className="hover:bg-white/[0.02] transition-all">
                  <td className="p-10">
                    <div className="flex items-center gap-6">
                      <Building2 size={32} className="text-red-600" />
                      <div>
                        <div className="font-black text-white uppercase text-3xl italic tracking-tighter">{audit.org_name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-1">{audit.lead_email}</div>
                        
                        {/* --- FUNCTIONAL ADDITION: THE START BUTTON --- */}
                        {audit.status === 'LEAD' && (
                          <button onClick={() => setSelectedAudit(audit)} className="mt-4 px-4 py-1.5 bg-red-600 text-white font-black uppercase text-[9px] italic hover:bg-white hover:text-black transition-all">Start_Triangulation</button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-10 text-right font-black text-white italic text-5xl tracking-tighter">${Number(audit.rework_tax || 0).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
