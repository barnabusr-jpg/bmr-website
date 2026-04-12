"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, ArrowLeft, Unlock, CheckCircle, Send, X, ShieldAlert } from "lucide-react";

/** * 🛠️ BUSINESS DOMAIN VALIDATOR 
 * Ensures triangulation nodes are anchored to professional domains.
 */
const isBusinessEmail = (email: string) => {
  const personalDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com', 'msn.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && !personalDomains.includes(domain);
};

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Modal & Focus State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAudit, setActiveAudit] = useState<any>(null);

  const ADMIN_PASSWORD = "KIMMALASR_03"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("ACCESS_DENIED: INVALID_CREDENTIALS");
    }
  };

  /**
   * 📡 MRI DISPATCH HANDSHAKE
   * Connects the Dashboard to the verified SendGrid / Supabase API.
   */
  const handleFinalRelease = async (techEmail: string, mgrEmail: string) => {
    if (!activeAudit) return;
    
    const primaryOperator = activeAudit.operators;
    const entityName = primaryOperator?.entities?.name || "BMR_CLIENT";

    try {
      const res = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityId: primaryOperator?.entity_id || activeAudit.operator_id,
          primaryEmail: primaryOperator?.email,
          techEmail,
          mgrEmail,
          entityName,
          reworkTax: activeAudit.rework_tax
        })
      });

      if (res.ok) {
        // Optimistic UI Update: Mark as Live locally
        setData(prev => prev.map(item => 
          item.id === activeAudit.id ? { ...item, operators: { ...item.operators, is_authorized: true } } : item
        ));
        setIsModalOpen(false);
        alert("SUCCESS: FORENSIC_DIRECTIVES_DISPATCHED");
      } else {
        throw new Error("TRANSMISSION_FRACTURE");
      }
    } catch (err) {
      console.error("RELEASE_ERROR:", err);
      alert("SYSTEM_ERROR: HANDSHAKE_FAILED");
    }
  };

  /**
   * 🔬 DATA SYNC (ISSUE #4 FIX)
   * Uses !left join to ensure audits appear even if user records are broken.
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchForensics() {
      setLoading(true);
      const { data: auditData, error: supabaseError } = await supabase
        .from('audits')
        .select(`
          id, 
          created_at, 
          rework_tax,
          operators!left ( 
            id, 
            email, 
            is_authorized, 
            entity_id, 
            entities ( name ) 
          )
        `)
        .order('created_at', { ascending: false });

      if (!supabaseError) {
        setData(auditData || []);
      } else {
        console.error("DASHBOARD_SYNC_ERROR:", supabaseError.message);
      }
      setLoading(false);
    }
    
    fetchForensics();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="flex justify-center mb-6"><Lock className="text-red-600" size={32} /></div>
          <h2 className="text-white text-center font-black italic uppercase tracking-widest text-lg mb-8">BMR_SOLUTIONS // SECURE_NODE</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ACCESS_KEY"
              className="w-full bg-slate-950 border border-slate-800 p-4 text-center text-red-600 font-black tracking-widest focus:outline-none focus:border-red-600"
              autoFocus
            />
            {error && <p className="text-[10px] text-red-500 text-center font-black animate-pulse uppercase tracking-widest">{error}</p>}
            <button type="submit" className="w-full bg-red-600 text-white py-4 font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">
              Authorize_Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8 pt-24 font-sans relative">
      {/* 📊 Metrics Container */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 shadow-xl">
            <label className="text-[10px] font-mono text-red-600 uppercase tracking-widest block mb-2 font-black italic">Total_Rework_Tax_Captured</label>
            <div className="text-4xl font-black italic text-white">
              ${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>

      {/* 🏛️ Diagnostic Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 max-w-7xl mx-auto shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h2 className="font-black italic uppercase tracking-widest text-xs flex items-center gap-3">
            <Activity size={16} className="text-red-600 animate-pulse" /> BMR_SOLUTIONS // DIAGNOSTIC_HISTORY
          </h2>
          <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-500 hover:text-red-600 uppercase transition-colors flex items-center gap-2 font-black">
            End_Session <ArrowLeft size={12} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] bg-slate-950/30">
                <th className="p-6">Timestamp</th>
                <th className="p-6">Entity_Lead</th>
                <th className="p-6 text-center">Triangulation_Nodes</th>
                <th className="p-6 text-right">Rework_Tax</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[11px]">
              {data.map((audit) => (
                <tr key={audit.id} className="border-b border-slate-800/50 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 text-slate-600 font-bold">{new Date(audit.created_at).toLocaleDateString()}</td>
                  <td className="p-6">
                    <div className="font-black text-white uppercase tracking-tighter text-sm italic">
                      {audit.operators?.entities?.name || "BMR_UNIDENTIFIED_LEAD"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 italic">{audit.operators?.email || "No email record found"}</div>
                  </td>
                  <td className="p-6 text-center">
                    {audit.operators?.is_authorized ? (
                      <div className="text-green-500 font-black italic uppercase text-[10px] flex items-center justify-center gap-2 tracking-widest">
                        <CheckCircle size={14} /> Directives_Live
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setActiveAudit(audit); setIsModalOpen(true); }}
                        className="px-5 py-2.5 bg-green-600/10 border border-green-600/30 text-green-500 hover:bg-green-600 hover:text-white transition-all font-black uppercase text-[10px] italic flex items-center gap-2 mx-auto tracking-widest"
                      >
                        <Unlock size={14} /> Release_MRI
                      </button>
                    )}
                  </td>
                  <td className="p-6 text-right font-black text-white italic text-base tracking-tighter">
                    ${Number(audit.rework_tax).toFixed(1)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && !loading && (
            <div className="p-20 text-center text-slate-700 font-mono uppercase text-xs tracking-widest italic">
              No diagnostic signals found in secure ledger.
            </div>
          )}
        </div>
      </div>

      {/* 🛰️ PRE-FLIGHT DEPLOYMENT MODAL */}
      {isModalOpen && (
        <PreFlightModal 
          audit={activeAudit} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleFinalRelease} 
        />
      )}
    </div>
  );
}

/** 🛠️ MODAL COMPONENT (Ensures Double-Entry Integrity) */
function PreFlightModal({ audit, onClose, onConfirm }: any) {
  const [form, setForm] = useState({ t1: '', t2: '', m1: '', m2: '' });
  
  const techMatch = form.t1 && form.t1 === form.t2 && isBusinessEmail(form.t1);
  const mgrMatch = form.m1 && form.m1 === form.m2 && isBusinessEmail(form.m1);
  const isValid = techMatch && mgrMatch;

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-mono">
      <div className="bg-slate-900 border border-red-900/30 p-10 max-w-2xl w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-600 hover:text-white transition-colors"><X size={24}/></button>
        
        <div className="flex items-center gap-3 text-red-600 mb-2">
          <ShieldAlert size={20} className="animate-pulse" />
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Initialize_Triangulation</h2>
        </div>
        
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mb-10 border-b border-slate-800 pb-4 italic">
          Client: {audit.operators?.entities?.name || "BMR_CLIENT"} // Data Verification Step
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* TECHNICAL SECTOR */}
          <div className="space-y-4">
            <label className="text-[10px] text-red-600 uppercase font-black tracking-widest italic flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" /> Sector_02: Technical_Lead
            </label>
            <input type="email" placeholder="Business Email" className="w-full bg-slate-950 border border-slate-800 p-4 text-xs text-white outline-none focus:border-red-600 transition-all font-bold" onChange={e => setForm({...form, t1: e.target.value})} />
            <input type="email" placeholder="Confirm Business Email" className={`w-full bg-slate-950 border p-4 text-xs text-white outline-none transition-all font-bold ${form.t2 && !techMatch ? 'border-red-600 bg-red-600/5' : 'border-slate-800'}`} onChange={e => setForm({...form, t2: e.target.value})} />
          </div>

          {/* MANAGERIAL SECTOR */}
          <div className="space-y-4">
            <label className="text-[10px] text-red-600 uppercase font-black tracking-widest italic flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" /> Sector_03: Managerial_Lead
            </label>
            <input type="email" placeholder="Business Email" className="w-full bg-slate-950 border border-slate-800 p-4 text-xs text-white outline-none focus:border-red-600 transition-all font-bold" onChange={e => setForm({...form, m1: e.target.value})} />
            <input type="email" placeholder="Confirm Business Email" className={`w-full bg-slate-950 border p-4 text-xs text-white outline-none transition-all font-bold ${form.m2 && !mgrMatch ? 'border-red-600 bg-red-600/5' : 'border-slate-800'}`} onChange={e => setForm({...form, m2: e.target.value})} />
          </div>
        </div>

        <div className="mt-12">
          <button 
            disabled={!isValid}
            onClick={() => onConfirm(form.t1, form.m1)}
            className={`w-full py-5 text-[12px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 italic ${isValid ? 'bg-red-600 text-white hover:bg-white hover:text-black shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
          >
            <Send size={16} /> Dispatch_Operational_Directives
          </button>
          {!isValid && (form.t2 || form.m2) && (
            <p className="text-[9px] text-red-600/60 uppercase font-black text-center mt-4 tracking-widest animate-pulse">
              * Verification failed: check for typing errors or non-business domains.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
