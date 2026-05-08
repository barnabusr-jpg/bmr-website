"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Activity, Building2, ChevronUp, ChevronDown, FileText, CheckCircle, Clock, Shield } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);

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
        <form onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/30 p-20 max-w-md w-full text-center rounded-lg">
          <Shield className="text-red-600 mx-auto mb-10" size={80} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-3xl focus:border-red-600 transition-colors" />
          <button type="submit" className="w-full bg-red-600 text-white py-8 mt-10 font-black uppercase italic tracking-widest text-xl hover:bg-white hover:text-red-600 transition-all">Command_Entry</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b-2 border-slate-900 z-50 px-12 flex items-center gap-10">
          <Activity className="text-red-600" size={32} />
          <span className="text-white font-black uppercase italic tracking-[0.4em] text-sm">Forensic_Command_Center</span>
      </nav>

      <main className="pt-44 px-12 max-w-7xl mx-auto pb-40">
            <div className="bg-slate-950 border-2 border-slate-900 overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-[11px] text-slate-600 uppercase tracking-[0.4em] border-b-2 border-slate-900 italic font-black">
                    <th className="p-12">Entity_Signal</th>
                    <th className="p-12 text-center">Case_ID</th>
                    <th className="p-12 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-900">
                  {data.map((audit) => (
                    <React.Fragment key={audit.id}>
                      <tr onClick={() => toggleRow(audit.id)} className="hover:bg-white/[0.03] cursor-pointer transition-all">
                        <td className="p-12">
                          <div className="flex items-center gap-8">
                            <Building2 size={40} className="text-red-600" />
                            <div>
                              <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name}</div>
                              <div className="text-[12px] text-slate-500 font-mono mt-3 uppercase font-bold">{audit.lead_email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-12 text-center uppercase italic font-black text-[12px] font-mono tracking-widest">BMR-2026-{audit.id.slice(0,4).toUpperCase()}</td>
                        <td className="p-12 text-right text-slate-700">{expandedRow === audit.id ? <ChevronUp size={28}/> : <ChevronDown size={28}/>}</td>
                      </tr>
                      {expandedRow === audit.id && (
                        <tr>
                          <td colSpan={3} className="bg-black/60 p-16 border-b-2 border-slate-900">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                              {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((label) => {
                                const node = nodeDetails.find(n => n.persona_type === label);
                                const isDone = node?.status?.toLowerCase() === 'completed';
                                return (
                                  <div key={label} className="bg-slate-950 border-2 border-slate-800 p-10 flex flex-col justify-between min-h-[140px] relative overflow-hidden">
                                    <div className="flex justify-between items-start relative z-10">
                                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black italic">{label}_NODE</span>
                                      {isDone ? <CheckCircle className="text-red-600" size={24}/> : <Clock className="text-slate-900" size={24}/>}
                                    </div>
                                    <div className={`text-3xl font-black italic uppercase relative z-10 ${isDone ? 'text-white' : 'text-slate-900'}`}>{isDone ? 'CALCULATED' : 'PENDING'}</div>
                                    {isDone && <div className="absolute inset-0 bg-red-600/5" />}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex justify-end pt-12 mt-12 gap-6 border-t-2 border-slate-900">
                                <button onClick={(e) => { e.stopPropagation(); window.open(`/results/${audit.id}`, '_blank'); }} className="bg-white text-black px-12 py-5 font-black uppercase italic text-[11px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-4 shadow-2xl">
                                  <FileText size={20} /> OPEN_FORENSIC_DOSSIER
                                </button>
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
