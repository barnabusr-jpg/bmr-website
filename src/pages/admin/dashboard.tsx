"use client";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Lock, X, CheckCircle, Database, BarChart3, Fingerprint, Zap, ShieldAlert, Building2, Download, ChevronDown, ChevronUp, Terminal } from "lucide-react";
import jsPDF from "jspdf";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAudit, setActiveAudit] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchForensics = useCallback(async () => {
    const { data: auditData, error } = await supabase
      .from('audits')
      .select(`*, diagnostic_groups (id, is_complete, sfi_score, operators (role, status, raw_responses))`)
      .order('created_at', { ascending: false });

    if (!error) setData(auditData || []);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchForensics(); 
    const channel = supabase.channel('master-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audits' }, () => fetchForensics())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'diagnostic_groups' }, () => fetchForensics())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'operators' }, () => fetchForensics())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAuthenticated, fetchForensics]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-900 border-2 border-red-600/20 p-12 shadow-2xl text-center">
          <Lock className="text-red-600 mx-auto mb-8" size={40} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="AUTHORIZATION_KEY" className="w-full bg-black border border-slate-800 p-5 text-center text-red-600 font-black outline-none focus:border-red-600 font-mono" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-5 font-black uppercase italic mt-6">Initialize_Session</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-10 pt-32 font-sans">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-5 text-white font-black uppercase tracking-widest text-sm italic">
          <Activity className="text-red-600 animate-pulse" size={20} />
          Forensic_Command_Center_v7.5
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 uppercase">Terminate_Session</button>
      </nav>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-mono text-slate-600 uppercase bg-black tracking-widest">
                <th className="p-10">Entity_Signal</th>
                <th className="p-10 text-center">Status</th>
                <th className="p-10 text-right">Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data.map((audit) => {
                const group = audit.diagnostic_groups?.[0];
                const operators = group?.operators || [];
                const completedCount = operators.filter((op: any) => op.status === 'completed').length;
                const isFinished = group?.is_complete === true || completedCount === 3;
                const isExpanded = expandedId === audit.id;

                return (
                  <React.Fragment key={audit.id}>
                    <tr onClick={() => setExpandedId(isExpanded ? null : audit.id)} className={`cursor-pointer transition-all ${isExpanded ? 'bg-red-600/[0.04]' : 'hover:bg-white/[0.02]'}`}>
                      <td className="p-10">
                        <div className="flex items-center gap-3"><Building2 size={16} className="text-red-600" /><div className="font-black text-white uppercase text-2xl italic tracking-tighter">{audit.org_name || "ANONYMOUS"}</div></div>
                        <div className="text-[10px] text-slate-500 font-mono mt-2 uppercase">{audit.lead_email}</div>
                      </td>
                      <td className="p-10 text-center">
                        {isFinished ? (
                          <div className="text-green-500 text-[10px] font-black uppercase italic flex items-center justify-center gap-2"><CheckCircle size={14} /> RESULT_PUBLISHED</div>
                        ) : audit.status === 'TRIANGULATING' ? (
                          <div className="text-yellow-500 text-[10px] font-black uppercase italic flex items-center justify-center gap-2"><Zap size={14} className="animate-pulse" /> ACTIVE_SYNTHESIS ({completedCount}/3)</div>
                        ) : (
                          <div className="text-slate-600 text-[10px] font-black uppercase italic flex items-center justify-center gap-2"><Activity size={14} /> INITIALIZED</div>
                        )}
                      </td>
                      <td className="p-10 text-right"><div className="flex justify-end gap-6 items-center"><span className="text-3xl font-black text-white italic tracking-tighter">${Number(audit.rework_tax).toFixed(1)}M</span>{isExpanded ? <ChevronUp size={20} className="text-red-600" /> : <ChevronDown size={20} className="text-slate-700" />}</div></td>
                    </tr>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto", minHeight: 180 }} exit={{ opacity: 0, height: 0 }} className="bg-black/60 border-l-2 border-red-600">
                          <td colSpan={3} className="p-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {['EXECUTIVE', 'MANAGER', 'TECHNICAL'].map((role) => {
                                const op = operators.find((o: any) => o.role === role);
                                return (
                                  <div key={role} className="bg-slate-900/50 border border-slate-800 p-6 rounded-sm">
                                    <div className="flex justify-between items-start mb-4"><span className="text-[9px] font-black text-red-600 uppercase italic">{role}_NODE</span><span className={`text-[8px] font-mono px-2 py-0.5 rounded ${op?.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500 animate-pulse'}`}>{op ? op.status.toUpperCase() : 'PENDING'}</span></div>
                                    <div className="text-[10px] text-slate-400 font-mono bg-black/40 p-4 border border-slate-800/50 max-h-40 overflow-y-auto">
                                      {op?.raw_responses ? <pre className="whitespace-pre-wrap break-words">{JSON.stringify(op.raw_responses, null, 2)}</pre> : <div className="flex items-center gap-2 text-slate-600 italic"><Terminal size={10} className="animate-pulse" />Awaiting_Signal_Packet...</div>}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center">
                              <div className="text-[9px] font-mono text-slate-600 uppercase italic">Chain_of_Custody: <span className={isFinished ? "text-green-500" : "text-yellow-600"}>{isFinished ? "VERIFIED" : "INCOMPLETE"}</span></div>
                              {isFinished && <button onClick={(e) => { e.stopPropagation(); }} className="bg-white text-black px-10 py-4 font-black uppercase italic text-xs flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all"><Download size={16} /> DOWNLOAD_FULL_DOSSIER</button>}
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
