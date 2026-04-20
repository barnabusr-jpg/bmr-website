"use client";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, X, CheckCircle, Database, BarChart3, Fingerprint, Zap, ShieldAlert, Building2, Download } from "lucide-react";
import jsPDF from "jspdf";

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

  // --- 1. THE DATA ENGINE: EVIDENCE-BASED FETCH ---
  const fetchForensics = useCallback(async () => {
    setLoading(true);
    // We pull the diagnostic_groups AND their operators to verify completion manually
    const { data: auditData, error } = await supabase
      .from('audits')
      .select(`
        *,
        org_name,
        lead_email,
        sfi_score,
        fractures,
        status,
        created_at,
        diagnostic_groups (
          id,
          is_complete,
          sfi_score,
          operators (status)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) console.error("LEDGER_FETCH_ERROR:", error);
    else setData(auditData || []);
    setLoading(false);
  }, []);

  // --- 2. MULTI-SIGNAL REALTIME SUBSCRIPTION ---
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchForensics(); 

    const channel = supabase
      .channel('forensic-master-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audits' }, () => fetchForensics())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'diagnostic_groups' }, () => fetchForensics())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'operators' }, () => fetchForensics())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isAuthenticated, fetchForensics]);

  const generateForensicReport = (audit: any) => {
    const doc = new jsPDF();
    const org = audit.org_name || "BMR_ENTITY";
    doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 50, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold"); doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC VERDICT", 15, 25);
    doc.save(`BMR_Forensic_Report_${org.replace(/\s/g, '_')}.pdf`);
  };

  const handleReleaseTriangulation = async (emails: { EXECUTIVE: string, MANAGER: string, TECHNICAL: string }) => {
    const entityId = activeAudit.operators?.entity_id || null;
    const { data: group, error: groupError } = await supabase
      .from('diagnostic_groups')
      .insert([{ 
        parent_audit_id: activeAudit.id, 
        org_name: activeAudit.org_name || "BMR_PROVISION_ORG",
        entity_id: entityId 
      }])
      .select().single();

    if (groupError) return alert(`GROUP_ERR: ${groupError.message}`);

    const res = await fetch('/api/dispatch-directives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: group.id, orgName: group.org_name, emails, parentAuditId: activeAudit.id, entityId })
    });

    if (res.ok) setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border-2 border-red-600/20 p-12 shadow-2xl text-center">
          <Lock className="text-red-600 mx-auto mb-8" size={40} />
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="AUTHORIZATION_KEY" className="w-full bg-black border border-slate-800 p-5 text-center text-red-600 font-black outline-none focus:border-red-600 font-mono" autoFocus />
            <button type="submit" className="w-full bg-red-600 text-white py-5 font-black uppercase italic italic">Initialize_Session</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-10 pt-32 font-sans">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-5 text-white font-black italic uppercase tracking-widest text-sm">
          <Activity className="text-red-600 animate-pulse" size={20} />
          Forensic_Command_Center
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 uppercase">Terminate_Session</button>
      </nav>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative">
            <label className="text-[9px] font-mono text-slate-500 uppercase block mb-5">Cumulative_Rework_Tax</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}<span className="text-red-600 ml-1 text-4xl">M</span></div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative">
            <label className="text-[9px] font-mono text-slate-500 uppercase block mb-5">Active_Nodes</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.length}</div>
          </div>
          <div className="bg-slate-900/40 border border-red-900/40 p-10 relative">
            <label className="text-[9px] font-mono text-red-600 uppercase block mb-5">Critical_Fractures</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.reduce((acc, curr) => acc + (curr.fractures?.length || 0), 0)}</div>
          </div>
        </div>

        {/* LEDGER */}
        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-slate-900 bg-slate-900/30 flex items-center gap-4 text-white uppercase italic tracking-widest text-xs">
             <Database size={20} className="text-red-600" /> Diagnostic_Ledger
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-mono text-slate-600 uppercase bg-black">
                  <th className="p-10">Entity_Signal</th>
                  <th className="p-10 text-center">Status</th>
                  <th className="p-10 text-right">Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.map((audit) => {
                  const group = audit.diagnostic_groups?.[0];
                  const operators = group?.operators || [];
                  
                  // EVIDENCE CHECK: If we have 3 completed operators, override the group flag
                  const completedCount = operators.filter((op: any) => op.status === 'completed').length;
                  const isFinished = group?.is_complete === true || completedCount === 3;

                  return (
                    <tr key={audit.id} className="hover:bg-red-600/[0.03]">
                      <td className="p-10">
                        <div className="flex items-center gap-3">
                          <Building2 size={16} className="text-red-600" />
                          <div className="font-black text-white uppercase text-2xl italic">{audit.org_name || "ANONYMOUS"}</div>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-2">{audit.lead_email}</div>
                      </td>
                      <td className="p-10 text-center">
                        {isFinished ? (
                          <div className="text-green-500 text-[10px] font-black uppercase italic flex items-center justify-center gap-2">
                             <CheckCircle size={14} /> Result_Published
                          </div>
                        ) : audit.status === 'TRIANGULATING' ? (
                          <div className="text-yellow-500 text-[10px] font-black uppercase italic flex items-center justify-center gap-2">
                             <Zap size={14} className="animate-pulse" /> Active_Synthesis ({completedCount}/3)
                          </div>
                        ) : (
                          <button onClick={() => { setActiveAudit(audit); setIsModalOpen(true); }} className="px-8 py-3.5 bg-red-600 text-white font-black uppercase text-[10px] italic">Initialize_Triangulation</button>
                        )}
                      </td>
                      <td className="p-10 text-right font-black text-white italic text-3xl">${Number(audit.rework_tax).toFixed(1)}M</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && <TriangulationModal audit={activeAudit} onClose={() => setIsModalOpen(false)} onConfirm={handleReleaseTriangulation} />}
    </div>
  );
}

function TriangulationModal({ audit, onClose, onConfirm }: any) {
  const [emails, setEmails] = useState({ EXECUTIVE: "", MANAGER: "", TECHNICAL: "" });
  return (
    <div className="fixed inset-0 bg-black/98 flex items-center justify-center z-[100] p-6">
      <div className="bg-slate-900 border-2 border-red-600/30 p-16 max-w-3xl w-full relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-600"><X size={32}/></button>
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4 text-center">Forensic_Release</h2>
        <div className="space-y-6 mb-12">
          {['EXECUTIVE', 'MANAGER', 'TECHNICAL'].map(role => (
            <div key={role} className="space-y-2">
              <label className="text-red-600 uppercase font-black text-[10px]">Protocol_Node: {role}</label>
              <input type="email" placeholder={`ENTER_${role}_EMAIL`} value={(emails as any)[role]} onChange={e => setEmails({ ...emails, [role]: e.target.value })} className="w-full bg-black border border-slate-800 p-5 text-white outline-none focus:border-red-600 uppercase font-bold text-sm font-mono" />
            </div>
          ))}
        </div>
        <button onClick={() => onConfirm(emails)} className="w-full py-7 bg-red-600 text-white font-black uppercase italic tracking-[0.5em] text-xs">Execute_Persona_Dispatch</button>
      </div>
    </div>
  );
}
