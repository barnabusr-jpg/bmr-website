"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Activity, Building2, Send, X, Zap, CheckCircle, FileText, Clock, Mail, Shield, ChevronUp, ChevronDown } from "lucide-react";
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
    const { data: audits } = await supabase.from('audits').select('*').order('created_at', { ascending: false });
    setData(audits || []);
  }, []);

  const refreshActiveNodes = useCallback(async (auditId: string) => {
    const { data: nodes } = await supabase.from('operators').select('persona_type, status').eq('audit_id', auditId);
    if (nodes) setNodeDetails(nodes);
  }, []);

  const toggleRow = async (auditId: string) => {
    if (expandedRow === auditId) { setExpandedRow(null); return; }
    setExpandedRow(auditId);
    await refreshActiveNodes(auditId);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLedger();
      const interval = setInterval(() => { fetchLedger(); if (expandedRow) refreshActiveNodes(expandedRow); }, 5000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchLedger, expandedRow, refreshActiveNodes]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center relative font-sans">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 placeholder:text-slate-900" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none">INITIALIZE_COMMAND</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-10 pt-32 font-sans tracking-tighter text-left leading-none">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b border-slate-900 z-50 px-10 flex items-center gap-5">
        <Activity className="text-red-600" size={24} />
        <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">Forensic_Command_Center</span>
      </nav>

      <div className="max-w-7xl mx-auto space-y-12">
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
                    <td className="p-10 text-center uppercase italic font-black text-[10px]">
                      {audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : 'TRIANGULATION_ACTIVE'}
                    </td>
                    <td className="p-10 text-right text-slate-600">
                      {expandedRow === audit.id ? <ChevronUp /> : <ChevronDown />}
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedRow === audit.id && (
                      <tr>
                        <td colSpan={3} className="bg-black/50 p-0 border-b border-slate-900">
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="p-12 space-y-12">
                              {/* NODE STATUS */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {['EXE', 'MGR', 'TEC'].map((role) => {
                                  const node = nodeDetails.find(n => n.persona_type === role);
                                  const isDone = node?.status?.toLowerCase() === 'completed';
                                  return (
                                    <div key={role} className="bg-slate-950 border border-slate-800 p-8 flex flex-col justify-between min-h-[160px]">
                                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest leading-none">{role}_NODE</span>
                                      <div className={`text-2xl font-black italic uppercase tracking-tighter ${isDone ? 'text-green-500' : 'text-slate-800'}`}>
                                        {isDone ? 'CALCULATED' : 'WAITING'}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* INTERNAL REMEDIATION FRAMEWORK (SECRET SAUCE) */}
                              <div className="border-t border-slate-900 pt-12 text-left">
                                <div className="flex items-center gap-3 mb-8">
                                  <Shield size={20} className="text-red-600" />
                                  <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black italic leading-none">Internal_Remediation_Directives</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {[
                                    { id: "DIR_01", type: "IMMEDIATE", label: "Indemnity Shield™", price: "$45K - $75K", focus: "Closing the 'Proof Void' and establishing atomic logging." },
                                    { id: "DIR_02", type: "STRUCTURAL", label: "Rework Eradicator™", price: "$150K", focus: "Automating validation loops to reclaim engineering bandwidth." },
                                    { id: "DIR_03", type: "STABILIZING", label: "Fiduciary Layer™", price: "$25K/mo", focus: "Ongoing drift monitoring and real-time intent alignment." }
                                  ].map((framework) => (
                                    <div key={framework.id} className="bg-slate-900/30 border border-slate-800 p-6 space-y-4">
                                      <div className="flex justify-between items-center">
                                        <span className="text-[8px] font-mono text-red-600 font-black">{framework.type}</span>
                                        <span className="text-[10px] font-mono text-white font-black">{framework.price}</span>
                                      </div>
                                      <h4 className="text-xl font-black italic uppercase text-white tracking-tighter leading-none">{framework.label}</h4>
                                      <p className="text-[10px] text-slate-500 uppercase leading-relaxed font-bold">{framework.focus}</p>
                                    </div>
                                  ))}
                                </div>
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
