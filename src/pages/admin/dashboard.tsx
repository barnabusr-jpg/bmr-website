"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, Send, X, Zap, CheckCircle, 
  FileText, ChevronDown, ChevronUp, Clock, Mail, Shield, Binary, Play 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'ledger' | 'frameworks'>('ledger');
  const [data, setData] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [emails, setEmails] = useState({ exec: "", mgr: "", tech: "" });

  const fetchLedger = useCallback(async () => {
    const { data: audits } = await supabase.from('audits').select('*').order('created_at', { ascending: false });
    setData(audits || []);
  }, []);

  const refreshNodes = useCallback(async (id: string) => {
    const { data: nodes } = await supabase.from('operators').select('persona_type, status').eq('audit_id', id);
    if (nodes) setNodeDetails(nodes);
  }, []);

  const toggleRow = async (auditId: string) => {
    if (expandedRow === auditId) { setExpandedRow(null); return; }
    setExpandedRow(auditId);
    await refreshNodes(auditId);
  };

  const triggerActivation = async () => {
    if (!selectedAudit || isUpdating) return;
    setIsUpdating(true);
    try {
      const res = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName: selectedAudit.org_name,
          parentAuditId: selectedAudit.id,
          emails: { EXECUTIVE: emails.exec, MANAGERIAL: emails.mgr, TECHNICAL: emails.tech }
        })
      });
      if (res.ok) {
        setSelectedAudit(null);
        setEmails({ exec: "", mgr: "", tech: "" });
        fetchLedger();
      }
    } catch (e) { console.error("DISPATCH_ERROR:", e); }
    finally { setIsUpdating(false); }
  };

  const runSynthesis = async (auditId: string) => {
    setIsUpdating(true);
    try {
      await fetch('/api/synthesize-fracture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId })
      });
      await fetchLedger();
    } catch (e) { console.error("SYNTHESIS_ERROR:", e); }
    finally { setIsUpdating(false); }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLedger();
      const interval = setInterval(() => {
        fetchLedger();
        if (expandedRow) refreshNodes(expandedRow);
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchLedger, expandedRow, refreshNodes]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center font-sans">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none">INITIALIZE_COMMAND</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Activity className="text-red-600" size={24} />
          <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">Forensic_Command_Center</span>
          <div className="flex gap-1 bg-slate-900 p-1">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
          </div>
        </div>
      </nav>

      {/* DISPATCH MODAL */}
      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
              <h2 className="text-4xl font-black uppercase italic text-white mb-2 tracking-tighter leading-none">INITIATE_TRIANGULATION</h2>
              <div className="space-y-4 mt-8">
                <input placeholder="EXECUTIVE_EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="MANAGERIAL_EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="TECHNICAL_EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <button onClick={triggerActivation} disabled={isUpdating} className="w-full bg-red-600 text-white py-8 font-black uppercase italic text-xl tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all">
                  {isUpdating ? <Activity className="animate-spin" /> : <Send size={24} />} 
                  {isUpdating ? "DISPATCHING..." : "ACTIVATE_TRIANGULATION"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-40 px-10 max-w-7xl mx-auto pb-32">
        <div className="bg-slate-950 border border-slate-900 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-[10px] text-slate-600 uppercase tracking-[0.3em] border-b border-slate-900">
                <th className="p-10">Entity_Signal</th>
                <th className="p-10 text-center">Protocol_Status</th>
                <th className="p-10 text-right">Action_Directives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data.map((audit) => (
                <React.Fragment key={audit.id}>
                  <tr onClick={() => toggleRow(audit.id)} className="hover:bg-white/[0.02] cursor-pointer transition-all">
                    <td className="p-10">
                      <div className="flex items-center gap-6">
                        <Building2 size={32} className={audit.status === 'COMPLETE' ? "text-green-500" : "text-red-600"} />
                        <div>
                          <div className="font-black text-white uppercase text-3xl italic tracking-tighter leading-none">{audit.org_name}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-2 uppercase">{audit.lead_email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-10 text-center">
                      <span className={`text-[10px] font-black uppercase italic px-4 py-2 border ${
                        audit.status === 'COMPLETE' ? 'text-green-500 border-green-500/20' : 
                        audit.status === 'LEAD' ? 'text-slate-500 border-slate-800' : 'text-yellow-500 border-yellow-500/20 animate-pulse'
                      }`}>
                        {audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : audit.status === 'LEAD' ? 'TRIANGULATION_PENDING' : 'TRIANGULATION_ACTIVE'}
                      </span>
                    </td>
                    <td className="p-10 text-right">{expandedRow === audit.id ? <ChevronUp /> : <ChevronDown />}</td>
                  </tr>
                  {expandedRow === audit.id && (
                    <tr>
                      <td colSpan={3} className="bg-black/50 p-12 border-b border-slate-900">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                          {['EXE', 'MGR', 'TEC'].map((role) => {
                            const node = nodeDetails.find(n => n.persona_type === role);
                            const isDone = node?.status?.toLowerCase() === 'completed';
                            return (
                              <div key={role} className="bg-slate-950 border border-slate-800 p-8 flex flex-col justify-between min-h-[160px]">
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{role}_NODE</span>
                                  {isDone ? <CheckCircle className="text-green-500" size={16}/> : <Clock className="text-slate-800" size={16}/>}
                                </div>
                                <div className={`text-2xl font-black italic uppercase tracking-tighter ${isDone ? 'text-white' : 'text-slate-900'}`}>
                                  {isDone ? 'CALCULATED' : 'WAITING'}
                                </div>
                              </div>
                            );
                          })}
                          <div className="md:col-span-3 flex justify-between mt-8 border-t border-slate-900 pt-8 gap-4">
                            <div className="flex gap-4">
                              {audit.status === 'LEAD' ? (
                                <button onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="bg-red-600 text-white px-8 py-4 font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3"><Mail size={16} /> START_TRIANGULATION</button>
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
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
