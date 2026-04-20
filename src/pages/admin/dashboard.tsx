"use client";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, X, CheckCircle, Database, BarChart3, Fingerprint, Zap, ShieldAlert, Mail, Building2, Download } from "lucide-react";
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

  // --- MEMOIZED DATA FETCH ---
  const fetchForensics = useCallback(async () => {
    setLoading(true);
    const { data: auditData, error } = await supabase
      .from('audits')
      .select(`*, org_name, lead_email, persona_type, sfi_score, fractures, operators (*, entities (name))`)
      .order('created_at', { ascending: false });

    if (error) console.error("LEDGER_FETCH_ERROR:", error);
    else setData(auditData || []);
    setLoading(false);
  }, []);

  // --- REALTIME SUBSCRIPTION LOOP ---
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchForensics(); // Initial load

    // Setup Realtime Channel to listen for data entry (INSERT) and status changes (UPDATE)
    const channel = supabase
      .channel('admin-ledger-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'audits' },
        (payload) => {
          console.log("Forensic Signal Inbound:", payload);
          fetchForensics(); // Automatically refresh dashboard data
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, fetchForensics]);

  // --- PDF GENERATOR: UPDATED BRANDING ---
  const generateForensicReport = (audit: any) => {
    const doc = new jsPDF();
    const sfi = audit.sfi_score || 0;
    const org = audit.org_name || "BMR_ENTITY";

    // 1. Forensic Header (Branding Purge: Advisory -> SOLUTIONS)
    doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 50, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold"); doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC VERDICT", 15, 25);
    doc.setFont("courier", "normal"); doc.setFontSize(8);
    doc.text(`AUDIT_ID: ${audit.id.substring(0, 8).toUpperCase()} // STATUS: PUBLISHED`, 15, 35);
    doc.text(`ENTITY: ${org.toUpperCase()} // LEDGER_VERIFIED: TRUE`, 15, 40);

    // 2. The Promise Gap Narrative
    doc.setTextColor(2, 6, 23); doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text("01 // THE PROMISE GAP™ ANALYSIS", 15, 65);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text(`Your SFI of ${sfi}% indicates a major fracture between strategic intent and operational reality.`, 15, 75);
    
    // 3. High Frequency Data Box
    doc.setFillColor(245, 245, 245); doc.rect(15, 85, 180, 45, "F");
    doc.setTextColor(220, 38, 38); doc.setFontSize(24); doc.setFont("helvetica", "bold");
    doc.text(`$${Number(audit.rework_tax).toFixed(1)}M`, 25, 110);
    doc.setTextColor(2, 6, 23); doc.setFontSize(9); doc.setFont("courier", "bold");
    doc.text("VALIDATED ANNUAL HEMORRHAGE", 25, 120);
    doc.setFontSize(24); doc.text(`${sfi}%`, 130, 110);
    doc.setFontSize(9); doc.text("SYSTEMIC FRICTION INDEX", 130, 120);

    // 4. Field Guide Layers
    doc.setFontSize(12); doc.setFont("helvetica", "bold");
    doc.text("02 // STABILIZATION ARCHITECTURE", 15, 145);
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    doc.text("- HAI (Human Alignment): Anchor adoption by ensuring transparency.", 15, 155);
    doc.text("- BVC (Business Value): Establish the governing mechanism for mission value.", 15, 163);
    doc.text("- SES (Safe Evolution): Implement the safeguard loop for future scale.", 15, 171);

    doc.save(`BMR_Forensic_Report_${org.replace(/\s/g, '_')}.pdf`);
  };

  const handleReleaseTriangulation = async (emails: { EXECUTIVE: string, MANAGER: string, TECHNICAL: string }) => {
    const { data: group, error: groupError } = await supabase
      .from('diagnostic_groups')
      .insert([{ parent_audit_id: activeAudit.id, org_name: activeAudit.org_name || "BMR_PROVISION_ORG" }])
      .select().single();

    if (groupError) return alert(`GROUP_ERR: ${groupError.message}`);

    const res = await fetch('/api/dispatch-directives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: group.id, orgName: group.org_name, emails: emails, parentAuditId: activeAudit.id })
    });

    if (res.ok) {
      // Data will refresh automatically via Realtime channel
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
        <div className="flex items-center gap-5 text-white">
          <Activity className="text-red-600 animate-pulse" size={20} />
          <span className="font-black italic uppercase tracking-widest text-sm">Forensic_Command_Center</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 uppercase font-black">Terminate_Session</button>
      </nav>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative overflow-hidden">
            <BarChart3 size={80} className="absolute -bottom-4 -right-4 text-red-600 opacity-5" />
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-5">Cumulative_Rework_Tax</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}<span className="text-red-600 ml-1 text-4xl">M</span></div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-10 relative overflow-hidden">
            <Fingerprint size={80} className="absolute -bottom-4 -right-4 text-slate-600 opacity-5" />
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-5">Active_Nodes</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.length}</div>
          </div>
          <div className="bg-slate-900/40 border border-red-900/40 p-10 relative overflow-hidden">
            <ShieldAlert size={80} className="absolute -bottom-4 -right-4 text-red-600 opacity-10" />
            <label className="text-[9px] font-mono text-red-600 uppercase tracking-widest block mb-5">Critical_Fractures</label>
            <div className="text-6xl font-black italic text-white tracking-tighter">{data.reduce((acc, curr) => acc + (curr.fractures?.length || 0), 0)}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-slate-900 bg-slate-900/30 flex items-center gap-4 text-white">
             <Database size={20} className="text-red-600" />
             <span className="font-black italic uppercase tracking-widest text-xs">Diagnostic_Ledger</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="text-[10px] font-mono text-slate-600 uppercase tracking-widest bg-black">
                  <th className="p-10">Timestamp</th>
                  <th className="p-10">Entity_Signal</th>
                  <th className="p-10 text-center">Status</th>
                  <th className="p-10 text-right">Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {data.map((audit) => (
                  <tr key={audit.id} className="hover:bg-red-600/[0.03] transition-colors align-top">
                    <td className="p-10 text-slate-500 font-mono text-[11px]">
                      {new Date(audit.created_at).toLocaleDateString()}<br/>
                      {new Date(audit.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-10">
                      <div className="flex items-center gap-3 mb-1">
                        <Building2 size={16} className="text-red-600" />
                        <div className="font-black text-white uppercase text-2xl italic tracking-tighter">{audit.org_name || "ANONYMOUS"}</div>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mb-4">{audit.lead_email}</div>
                      
                      {audit.status === 'COMPLETE' && (
                        <div className="mt-6 p-6 bg-slate-900/50 border-l-4 border-red-600 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-white uppercase italic tracking-widest">Forensic_Verdict_Ready</span>
                              <span className="text-2xl font-black text-red-600 italic">{audit.sfi_score}% SFI</span>
                            </div>
                            <button 
                               onClick={() => generateForensicReport(audit)}
                               className="w-full py-3 bg-white text-black font-black uppercase text-[9px] italic flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"
                            >
                               <Download size={14} /> Download_Forensic_Field_Guide
                            </button>
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
                    <td className="p-10 text-right font-black text-white italic text-3xl">${Number(audit.rework_tax).toFixed(1)}M</td>
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
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-600 hover:text-white transition-colors"><X size={32}/></button>
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Forensic_Release</h2>
        <div className="space-y-6 mb-12">
          {['EXECUTIVE', 'MANAGER', 'TECHNICAL'].map(role => (
            <div key={role} className="space-y-2">
              <label className="text-red-600 uppercase font-black tracking-widest text-[10px]">Protocol_Node: {role}</label>
              <input type="email" placeholder={`ENTER_${role}_EMAIL`} value={(emails as any)[role]} onChange={e => setEmails({ ...emails, [role]: e.target.value })} className="w-full bg-black border border-slate-800 p-5 text-white outline-none focus:border-red-600 uppercase font-bold text-sm" />
            </div>
          ))}
        </div>
        <button onClick={() => onConfirm(emails)} className="w-full py-7 bg-red-600 text-white font-black uppercase italic tracking-[0.5em] text-xs hover:bg-white hover:text-black transition-all">Execute_Persona_Dispatch</button>
      </div>
    </div>
  );
}
