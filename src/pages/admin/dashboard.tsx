"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Lock, ArrowLeft, Unlock, CheckCircle } from "lucide-react";

/**
 * 🛠️ BMR SOLUTIONS HELPER: BUSINESS DOMAIN VALIDATOR
 * Prevents "Shadow Operators" by rejecting personal/disposable domains.
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
   * 🔬 COMMAND: RELEASE_MRI
   * Purpose: Assigns Tech/Manager leads via Double-Entry & Business Domain validation.
   * Dispatches Operational Directives to initialize the 3-lens triangulation.
   */
  const handleReleaseMRI = async (audit: any) => {
    const primaryOperator = audit.operators;
    const entityName = primaryOperator?.entities?.name || "BMR_CLIENT";

    // 1. Requirement Notification
    const proceed = confirm(
      `BMR SOLUTIONS PROTOCOL:\n\n1. OFFICIAL BUSINESS EMAILS REQUIRED (No Gmail/Yahoo).\n2. DOUBLE-ENTRY VALIDATION ACTIVE (Prevents link drift).\n\nProceed to lead assignment?`
    );
    if (!proceed) return;

    // 2. Technical Lead - Double Entry + Domain Check
    const tech1 = prompt(`[TECHNICAL LEAD] Enter Business Email:`)?.toLowerCase().trim();
    if (!tech1) return;
    if (!isBusinessEmail(tech1)) {
      alert("ERROR: Personal domains are prohibited. Use an official business email.");
      return;
    }
    const tech2 = prompt(`[TECHNICAL LEAD] Confirm Business Email:`)?.toLowerCase().trim();
    if (tech1 !== tech2) {
      alert("TYPO_DETECTED: Technical lead emails do not match. Aborting.");
      return;
    }

    // 3. Managerial Lead - Double Entry + Domain Check
    const mgr1 = prompt(`[MANAGERIAL LEAD] Enter Business Email:`)?.toLowerCase().trim();
    if (!mgr1) return;
    if (!isBusinessEmail(mgr1)) {
      alert("ERROR: Personal domains are prohibited. Use an official business email.");
      return;
    }
    const mgr2 = prompt(`[MANAGERIAL LEAD] Confirm Business Email:`)?.toLowerCase().trim();
    if (mgr1 !== mgr2) {
      alert("TYPO_DETECTED: Managerial lead emails do not match. Aborting.");
      return;
    }

    try {
      // 4. Update Database: Register/Authorize All Three
      const leads = [
        { email: primaryOperator.email, lens: 'EXECUTIVE' },
        { email: tech1, lens: 'TECHNICAL' },
        { email: mgr1, lens: 'MANAGERIAL' }
      ];

      for (const lead of leads) {
        await supabase.from('operators').upsert({
          email: lead.email,
          entity_id: primaryOperator.entity_id,
          lens: lead.lens,
          is_authorized: true,
          authorized_at: new Date()
        }, { onConflict: 'email' });
      }

      // 5. API Dispatch: Trigger 3-way email broadcast
      const res = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryEmail: primaryOperator.email,
          techEmail: tech1,
          mgrEmail: mgr1,
          entityName,
          reworkTax: audit.rework_tax
        })
      });

      if (res.ok) {
        // Refresh local UI state
        setData(prev => prev.map(item => 
          item.operators?.id === primaryOperator.id ? { ...item, operators: { ...item.operators, is_authorized: true } } : item
        ));
        alert("SUCCESS: MRI Released. Operational directives dispatched to verified business domains.");
      } else {
        throw new Error("API_DISPATCH_FAILURE");
      }
    } catch (err) {
      console.error("MRI_RELEASE_ERROR:", err);
      alert("SYSTEM_FRACTURE: Authorization handshake failed. Check console/API logs.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchForensics() {
      const { data: auditData, error: supabaseError } = await supabase
        .from('audits')
        .select(`
          id,
          created_at,
          rework_tax,
          operators (
            id,
            email,
            is_authorized,
            entity_id,
            entities ( name )
          )
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
          <h2 className="text-white text-center font-black italic uppercase tracking-tighter text-xl mb-8">BMR_SOLUTIONS // SECURE_NODE</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ACCESS_KEY"
              className="w-full bg-slate-950 border border-slate-800 p-4 text-center text-red-600 font-black tracking-widest focus:outline-none focus:border-red-600"
              autoFocus
            />
            <button type="submit" className="w-full bg-red-600 text-white py-4 font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">
              Authorize_Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase tracking-widest">RECONSTRUCTING_LEDGER...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8 pt-24 font-sans">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-red-600 uppercase tracking-widest block mb-2 font-black italic">Total_Rework_Tax</label>
          <div className="text-4xl font-black italic">${data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0).toFixed(1)}M</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h2 className="font-black italic uppercase tracking-tighter tracking-widest">BMR_SOLUTIONS // DIAGNOSTIC_HISTORY</h2>
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
                <th className="p-4 text-center">3-Lens Triangulation</th>
                <th className="p-4 text-right italic underline decoration-red-900">Inaction_Cost</th>
                <th className="p-4 text-right">Rework_Tax</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {data.map((audit) => {
                const inactionCost = ((Number(audit.rework_tax) / 12) * 6 * 1.12).toFixed(2);
                const isAuthorized = audit.operators?.is_authorized;
                
                return (
                  <tr key={audit.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-slate-500">{new Date(audit.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="font-bold text-white uppercase">{audit.operators?.entities?.name || "BMR_PROSPECT"}</div>
                      <div className="text-[9px] text-slate-600 italic tracking-tighter">{audit.operators?.email}</div>
                    </td>
                    <td className="p-4 text-center">
                      {isAuthorized ? (
                        <div className="text-green-500 font-black italic uppercase text-[9px] flex items-center justify-center gap-2">
                          <CheckCircle size={14} /> Directives_Live
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleReleaseMRI(audit)}
                          className="px-4 py-2 bg-green-600/10 border border-green-600/30 text-green-500 hover:bg-green-600 hover:text-white transition-all font-black uppercase text-[9px] italic flex items-center gap-2 mx-auto"
                        >
                          <Unlock size={12} /> Release_MRI
                        </button>
                      )}
                    </td>
                    <td className="p-4 text-right font-black text-red-600 italic tracking-tighter">${inactionCost}M</td>
                    <td className="p-4 text-right font-black text-white italic tracking-tighter">${audit.rework_tax}M</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
