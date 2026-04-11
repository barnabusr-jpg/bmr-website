"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, ArrowLeft, Unlock, CheckCircle, Send, X } from "lucide-react";

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
  
  // Modal State
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

  const handleFinalRelease = async (techEmail: string, mgrEmail: string) => {
    if (!activeAudit) return;
    
    const primaryOperator = activeAudit.operators;
    const entityName = primaryOperator?.entities?.name || "BMR_CLIENT";

    try {
      // 1. API Dispatch (Handles DB Registration & Email in one handshake)
      const res = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityId: primaryOperator.entity_id,
          primaryEmail: primaryOperator.email,
          techEmail,
          mgrEmail,
          entityName,
          reworkTax: activeAudit.rework_tax
        })
      });

      if (res.ok) {
        setData(prev => prev.map(item => 
          item.id === activeAudit.id ? { ...item, operators: { ...item.operators, is_authorized: true } } : item
        ));
        setIsModalOpen(false);
        alert("SUCCESS: MRI_DIRECTIVES_DISPATCHED");
      } else {
        throw new Error("TRANSMISSION_FRACTURE");
      }
    } catch (err) {
      console.error("RELEASE_ERROR:", err);
      alert("SYSTEM_ERROR: HANDSHAKE_FAILED");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchForensics() {
      const { data: auditData, error: supabaseError } = await supabase
        .from('audits')
        .select(`
          id, created_at, rework_tax,
          operators ( id, email, is_authorized, entity_id, entities ( name ) )
        `)
        .order('created_at', { ascending: false });
      if (!supabaseError) setData(auditData);
      setLoading(false);
    }
    fetchForensics();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 shadow-2xl">
          <h2 className="text-white text-center font-black italic uppercase tracking-tighter text-xl mb-8 tracking-widest">BMR_SOLUTIONS // SECURE_NODE</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ACCESS_KEY"
              className="w-full bg-slate-950 border border-slate-800 p-4 text-center text-red-600 font-black tracking-widest focus:outline-none focus:border-red-600"
              autoFocus
            />
            {error && <p className="text-[10px] text-red-500 text-center font-black animate-pulse">{error}</p>}
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
      {/* 📊 Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-red-600 uppercase tracking-widest block mb-2 font-black italic">Total_Rework_Tax</label>
          <div className="text-4xl font-black italic">${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}M</div>
        </div>
      </div>

      {/* 🏛️ Diagnostic Ledger */}
      <div className="bg-slate-900 border border-slate-800 max-w-7xl mx-auto">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h2 className="font-black italic uppercase tracking-widest text-xs flex items-center gap-2">
            <Activity size={14} className="text-red-600" /> BMR_SOLUTIONS // DIAGNOSTIC_HISTORY
          </h2>
          <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-600 hover:text-red-600 uppercase transition-colors flex items-center gap-2">
            End_Session <ArrowLeft size={10} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Entity_Audit</th>
                <th className="p-4 text-center">Triangulation_Status</th>
                <th className="p-4 text-right">Rework_Tax</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {data.map((audit) => (
                <tr key={audit.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-slate-500">{new Date(audit.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="font-bold text-white uppercase">{audit.operators?.entities?.name || "BMR_PROSPECT"}</div>
                    <div className="text-[9px] text-slate-600 italic tracking-tighter">{audit.operators?.email}</div>
                  </td>
                  <td className="p-4 text-center">
                    {audit.operators?.is_authorized ? (
                      <div className="text-green-500 font-black italic uppercase text-[9px] flex items-center justify-center gap-2">
                        <CheckCircle size={14} /> Directives_Live
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setActiveAudit(audit); setIsModalOpen(true); }}
                        className="px-4 py-2 bg-green-600/10 border border-green-600/30 text-green-500 hover:bg-green-600 hover:text-white transition-all font-black uppercase text-[9px] italic flex items-center gap-2 mx-auto"
                      >
                        <Unlock size={12} /> Release_MRI
                      </button>
                    )}
                  </td>
                  <td className="p-4 text-right font-black text-white italic tracking-tighter">${audit.rework_tax}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🛰️ PRE-FLIGHT MODAL */}
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

/** 🛠️ PRE-FLIGHT MODAL COMPONENT (Double-Entry Logic) */
function PreFlightModal({ audit, onClose, onConfirm }) {
  const [form, setForm] = useState({ t1: '', t2: '', m1: '', m2: '' });
  const techMatch = form.t1 && form.t1 === form.t2 && isBusinessEmail(form.t1);
  const mgrMatch = form.m1 && form.m1 === form.m2 && isBusinessEmail(form.m1);

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-mono">
      <div className="bg-slate-900 border border-red-900/30 p-8 max-w-2xl w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-600 hover:text-white"><X size={20}/></button>
        <h2 className="text-xl font-black text-white italic uppercase mb-2">Initialize_Triangulation</h2>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-8 border-b border-slate-800 pb-4">
          Client: {audit.operators?.entities?.name} // Lead Verification
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TECHNICAL */}
          <div className="space-y-3">
            <label className="text-[9px] text-red-600 uppercase font-black tracking-widest">Sector_02: Technical_Lead</label>
            <input type="email" placeholder="Business Email" className="w-full bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-red-600" onChange={e => setForm({...form, t1: e.target.value})} />
            <input type="email" placeholder="Confirm Business Email" className={`w-full bg-slate-950 border p-3 text-xs text-white outline-none ${form.t2 && !techMatch ? 'border-red-600' : 'border-slate-800'}`} onChange={e => setForm({...form, t2: e.target.value})} />
          </div>

          {/* MANAGERIAL */}
          <div className="space-y-3">
            <label className="text-[9px] text-red-600 uppercase font-black tracking-widest">Sector_03: Managerial_Lead</label>
            <input type="email" placeholder="Business Email" className="w-full bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-red-600" onChange={e => setForm({...form, m1: e.target.value})} />
            <input type="email" placeholder="Confirm Business Email" className={`w-full bg-slate-950 border p-3 text-xs text-white outline-none ${form.m2 && !mgrMatch ? 'border-red-600' : 'border-slate-800'}`} onChange={e => setForm({...form, m2: e.target.value})} />
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button 
            disabled={!techMatch || !mgrMatch}
            onClick={() => onConfirm(form.t1, form.m1)}
            className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${techMatch && mgrMatch ? 'bg-red-600 text-white hover:bg-white hover:text-black' : 'bg-slate-800 text-slate-600'}`}
          >
            <Send size={14} /> Dispatch_MRI_Directives
          </button>
        </div>
      </div>
    </div>
  );
}
