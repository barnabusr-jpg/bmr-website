"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Activity, Building2, Send, X, Zap, CheckCircle, FileText, Globe, RefreshCw, ChevronDown, ChevronUp, Clock, Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [emails, setEmails] = useState({ exec: "", mgr: "", tech: "" });

  const fetchLedger = useCallback(async () => {
    const { data: audits } = await supabase
      .from('audits')
      .select('*')
      .order('created_at', { ascending: false });
    setData(audits || []);
  }, []);

  const toggleRow = async (auditId: string) => {
    if (expandedRow === auditId) {
      setExpandedRow(null);
      return;
    }
    setExpandedRow(auditId);
    const { data: nodes } = await supabase
      .from('operators')
      .select('persona_type, status')
      .eq('audit_id', auditId);
    setNodeDetails(nodes || []);
  };

  // RESTORED: This calls your dispatch-directives.ts
  const triggerActivation = async () => {
    if (!selectedAudit || isUpdating) return;
    setIsUpdating(true);
    try {
      const res = await fetch('/api/dispatch-directives', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: selectedAudit.org_name, 
          orgName: selectedAudit.org_name,
          parentAuditId: selectedAudit.id,
          emails: {
            EXECUTIVE: emails.exec.trim(),
            MANAGERIAL: emails.mgr.trim(),
            TECHNICAL: emails.tech.trim()
          }
        })
      });
      if (!res.ok) throw new Error("Dispatch Failed");
      setSelectedAudit(null);
      setEmails({ exec: "", mgr: "", tech: "" });
      await fetchLedger();
    } catch (err: any) {
      alert(`System Error: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const runSynthesis = async (auditId: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/synthesize-fracture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId })
      });
      if (res.ok) await fetchLedger();
    } catch (err) { console.error(err); }
    finally { setIsUpdating(false); }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLedger();
      const interval = setInterval(fetchLedger, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchLedger]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center relative shadow-2xl">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 placeholder:text-slate-900" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest">INITIALIZE_COMMAND</button>
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

      {/* DISPATCH MODAL (Component A) */}
      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
              <h2 className="text-4xl font-black uppercase italic text-white mb-2 tracking-tighter text-left leading-none">INITIATE_TRIANGULATION</h2>
              <p className="text-slate-500 font-mono text-[10px] uppercase mb-10 text-left tracking-[0.2em]">Entity: {selectedAudit.org_name}</p>
              <div className="space-y-4">
                <input placeholder="EXECUTIVE_NODE_EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="MANAGERIAL_NODE_EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="TECHNICAL_NODE_EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <button onClick={triggerActivation} disabled={isUpdating} className="w-full bg-red-600 text-white py-8 font-black uppercase italic text-xl tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all">
                  {isUpdating ? <Activity className="animate-spin" /> : <Send size={24} />} 
                  {isUpdating ? "DISPATCHING..." : "ACTIVATE_TRIANGULATION"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-10 text-left">
            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-6 italic tracking-widest">Cumulative_Rework_Tax</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">${data.reduce((a, c) => a + (Number(c.rework_tax) || 0), 0).toFixed(1)}M</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-10 text-left">
            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-6 italic tracking-widest">Active_Operations</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.filter(d => d.status !== 'COMPLETE').length}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-[10px] text-slate-600 uppercase tracking-[0.3em] border-b border-slate-900 font-bold">
                <th className="p-10">Entity_Signal</th>
                <th className="p-10 text-center">Protocol_Status</th>
                <th className="p-10 text-right">Action_Directives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data.map((audit) => (
                <React.Fragment key={audit.id}>
                  <tr onClick={() => toggleRow(audit.id)} className="hover:bg-white/[0.02] cursor-pointer transition-all">
                    <td className="p-10 text-left">
                      <div className="flex items-center gap-6">
                        <Building2 size={32} className={audit.status === 'COMPLETE' ? "text-green-500" : "text-red-600"} />
                        <div>
                          <div className="font-black text-white uppercase text-3xl italic tracking-tighter leading-none">{audit.org_name}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-2 uppercase">{audit.lead_email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-10 text-center">
                      <span className={`text-[10px] font-black uppercase italic px-4 py-2 ${audit.status === 'COMPLETE' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500 animate-pulse'}`}>
                        {audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : audit.status === 'LEAD' ? 'LEAD_CAPTURED' : 'IN_PROGRESS'}
                      </span>
                    </td>
                    <td className="p-10 text-right text-slate-600">
                      {expandedRow === audit.id ? <ChevronUp /> : <ChevronDown />}
                    </td>
                  </tr>

                  {/* DRILL-DOWN PANEL */}
                  <AnimatePresence>
                    {expandedRow === audit.id && (
                      <tr>
                        <td colSpan={3} className="bg-black/50 p-0 border-b border-slate-900">
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                              {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((persona) => {
                                const node = nodeDetails.find(n => n.persona_type?.toUpperCase().includes(persona.slice(0,3)));
                                const isDone = node?.status?.toLowerCase() === 'completed';
                                return (
                                  <div key={persona} className="bg-slate-950 border border-slate-800 p-8 flex flex-col justify-between min-h-[160px]">
                                    <div className="flex justify-between items-start">
                                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{persona}_NODE</span>
                                      {isDone ? <CheckCircle className="text-green-500" size={16}/> : <Clock className="text-slate-800" size={16}/>}
                                    </div>
                                    <div className={`text-2xl font-black italic uppercase tracking-tighter ${isDone ? 'text-white' : 'text-slate-800'}`}>
                                      {isDone ? 'CALCULATED' : 'WAITING'}
                                    </div>
                                  </div>
                                );
                              })}
                              
                              <div className="md:col-span-3 flex justify-between mt-8 border-t border-slate-900 pt-8 gap-4">
                                <div className="flex gap-4">
                                  {audit.status === 'LEAD' ? (
                                    <button onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="bg-red-600 text-white px-8 py-4 font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3">
                                      <Mail size={16} /> START_TRIANGULATION
                                    </button>
                                  ) : (
                                    <>
                                      <button onClick={(e) => { e.stopPropagation(); runSynthesis(audit.id); }} className="bg-yellow-600 text-black px-6 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-white transition-all flex items-center gap-2"><Zap size={14} /> Force_Synthesis</button>
                                      <button onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="bg-slate-800 text-white px-6 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2"><Send size={14} /> Re-Dispatch</button>
                                    </>
                                  )}
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); window.open(`/results/${audit.id}`, '_blank'); }} className="bg-white text-black px-8 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3"><FileText size={16} /> GENERATE_FORENSIC_DOSSIER</button>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
