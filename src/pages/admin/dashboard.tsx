"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, X, CheckCircle, Database, BarChart3, Fingerprint, Zap, AlertTriangle, ShieldAlert } from "lucide-react";

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
      const { data: auditData } = await supabase
        .from('audits')
        .select(`*, sfi_score, fractures, operators (*, entities (name))`)
        .order('created_at', { ascending: false });
      setData(auditData || []);
      setLoading(false);
    }
    fetchForensics();
  }, [isAuthenticated]);

  const handleReleaseTriangulation = async (emails: { EXECUTIVE: string, MANAGER: string, TECHNICAL: string }) => {
    const { data: group, error: groupError } = await supabase
      .from('diagnostic_groups')
      .insert([{ 
        parent_audit_id: activeAudit.id, 
        org_name: activeAudit.operators?.entities?.name || "BMR_PROVISION_ORG" 
      }])
      .select().single();

    if (groupError) return alert(`GROUP_INITIALIZATION_FAILED: ${groupError.message}`);

    const res = await fetch('/api/dispatch-directives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        groupId: group.id,
        orgName: group.org_name,
        emails: emails,
        parentAuditId: activeAudit.id
      })
    });

    if (res.ok) {
      setData(prev => prev.map(a => a.id === activeAudit.id ? {...a, status: 'TRIANGULATING'} : a));
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div className="bg-slate-900/40 border border-red-900/40 p-10 relative overflow-hidden">
            <ShieldAlert size={80} className="absolute -bottom-4 -right-4 text-red-600 opacity-10" />
            <label className="text-[9px] font-mono text-red-600 uppercase tracking-widest block mb-5">Critical_Fractures</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">
              {data.reduce((acc, curr) => acc + (curr.fractures?.length || 0), 0)}
            </div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-slate-900 bg-slate-900/30 flex items-center gap-4 text-white">
             <Database size={20} className="text-red-600" />
             <span className="font-black italic uppercase tracking-widest text-xs">Diagnostic_Ledger</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="text-[10px] font-mono text-slate-600 uppercase tracking-widest bg-black">
                  <th className="p-10">Timestamp</th>
                  <th className="p-10">Entity / Findings</th>
                  <th className="p-10 text-center">Status</th>
                  <th className="p-10 text-right">Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.map((audit) => (
                  <tr key={audit.id} className="hover:bg-red-600/[0.03] transition-colors align-top">
                    <td className="p-10 text-slate-500 font-mono text-[11px]">{new Date(audit.created_at).toLocaleString()}</td>
                    <td className="p-10">
                      <div className="font-black text-white uppercase text-xl italic leading-none mb-2">{audit.operators?.entities?.name || "BMR_CLIENT"}</div>
                      <div className="text-[10px] text-slate-600 font-mono italic mb-4">{audit.operators?.email}</div>
                      
                      {audit.status === 'COMPLETE' && (
                        <div className="mt-8 space-y-6 border-t border-slate-800 pt-8 animate-in fade-in zoom-in-95">
                          <div className="flex justify-between items-end">
                            <div>
                              <label className="text-[9px] font-mono text-red-600 uppercase tracking-[0.3em]">Forensic_Verdict</label>
                              <h3 className="text-2xl font-black italic text-white uppercase">Hardening_Required</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-4xl font-black text-red-600 italic">{audit.sfi_score}%</div>
                              <div className="text-[8px] text-slate-500 uppercase font-mono">Systemic_Friction_Index</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {audit.fractures?.map((f: any, i: number) => (
                              <div key={i} className="bg-slate-900/50 border-l-4 border-red-600 p-6 relative group overflow-hidden">
                                <div className="flex justify-between items-start mb-2">
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded ${f.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-black'}`}>
                                    {f.severity}
                                  </span>
                                  {f.recovery && <span className="text-[10px] font-mono text-green-500 uppercase font-bold">{f.recovery}</span>}
                                </div>
                                <h4 className="text-xs font-bold text-white uppercase mb-2">{f.id.replace("_", " ")}</h4>
                                <p className="text-[11px] text-slate-400 mb-5 leading-relaxed">{f.description}</p>
                                <div className="bg-black/60 p-4 border border-red-900/20 text-[10px] font-mono">
                                  <span className="text-red-600 font-black uppercase block mb-1">Hardening_Directive:</span>
                                  <p className="italic text-slate-300">{f.directive}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="p-10 text-center">
                      {audit.status === 'TRIANGULATING' ? (
                        <div className="text-yellow-500 text-[10px] font-black uppercase italic tracking-widest flex items-center justify-center gap-2">
                           <Zap size={14} className="animate-pulse" /> Active_Synthesis
                        </div>
                      ) : audit.status === 'COMPLETE' ? (
                        <div className="text-green-500 text-[10px] font-black uppercase italic tracking-widest flex items-center justify-center gap-2">
                           <CheckCircle size={14} /> Result_Published
                        </div>
                      ) : (
                        <button onClick={() => { setActiveAudit(audit); setIsModalOpen(true); }} className="px-8 py-3.5 bg-red-600 text-white font-black uppercase text-[10px] italic hover:bg-white hover:text-red-600 transition-all">Initialize_Triangulation</button>
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

      {isModalOpen && <TriangulationModal audit={activeAudit} onClose={() => setIsModalOpen(false)} onConfirm={handleReleaseTriangulation} />}
    </div>
  );
}

function TriangulationModal({ audit, onClose, onConfirm }: any) {
  const [emails, setEmails] = useState({ EXECUTIVE: "", MANAGER: "", TECHNICAL: "" });

  return (
    <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center z-[100] p-6">
      <div className="bg-slate-900 border-2 border-red-600/30 p-16 max-w-3xl w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-600 hover:text-white"><X size={32}/></button>
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4 font-sans italic">Forensic_Release</h2>
        <p className="text-slate-500 font-mono text-xs uppercase mb-12 tracking-widest">Target_Entity: {audit.operators?.entities?.name}</p>
        
        <div className="space-y-6 mb-12 font-mono text-[10px]">
          {['EXECUTIVE', 'MANAGER', 'TECHNICAL'].map(role => (
            <div key={role} className="space-y-2">
              <label className="text-red-600 uppercase font-black tracking-widest">Protocol_Node: {role}</label>
              <input 
                type="email" 
                placeholder={`ENTER_${role}_EMAIL`}
                value={(emails as any)[role]}
                onChange={e => setEmails({ ...emails, [role]: e.target.value })} 
                className="w-full bg-black border border-slate-800 p-5 text-white outline-none focus:border-red-600 uppercase font-bold text-sm" 
              />
            </div>
          ))}
        </div>
        <button 
          onClick={() => onConfirm(emails)} 
          className="w-full py-7 bg-red-600 text-white font-black uppercase italic tracking-[0.5em] text-xs hover:bg-white hover:text-black transition-all"
        >
          Execute_Persona_Dispatch
        </button>
      </div>
    </div>
  );
}
