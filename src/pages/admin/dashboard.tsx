"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, ShieldAlert, Lock } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔑 THE ACCESS KEY (Change this to whatever you want)
  const ADMIN_PASSWORD = "KIMMALA_72"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("ACCESS_DENIED: INVALID_CREDENTIALS");
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
          sector,
          rework_tax,
          decay_pct,
          operators (
            full_name,
            email,
            entities ( name )
          )
        `)
        .order('created_at', { ascending: false });

      if (!supabaseError) setData(auditData);
      setLoading(false);
    }
    fetchForensics();
  }, [isAuthenticated]);

  // 🛡️ GATEKEEPER UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-mono">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-red-600/10 rounded-full border border-red-600/20">
              <Lock className="text-red-600 h-8 w-8" />
            </div>
          </div>
          <h2 className="text-white text-center font-black italic uppercase tracking-tighter text-xl mb-2">
            Secure_Node_Access
          </h2>
          <p className="text-slate-500 text-[10px] text-center uppercase tracking-[0.3em] mb-8">
            Clearance_Level: Alpha-7_Required
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER_ACCESS_KEY"
              className="w-full bg-slate-950 border border-slate-800 p-4 text-center text-red-600 font-black tracking-[0.5em] focus:outline-none focus:border-red-600 transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-[10px] text-red-600 text-center font-bold animate-pulse uppercase">
                {error}
              </p>
            )}
            <button 
              type="submit"
              className="w-full bg-red-600 text-white py-4 font-black uppercase italic tracking-widest text-xs hover:bg-white hover:text-black transition-all"
            >
              Authorize_Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 📊 THE ACTUAL DASHBOARD (Rendered only after password)
  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase tracking-widest">Reconstructing_Forensic_Ledger...</div>;

  const totalRework = data.reduce((acc, curr) => acc + (Number(curr.rework_tax) || 0), 0);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8 pt-24 font-sans">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-red-600 uppercase tracking-widest block mb-2 font-black italic">Total_Rework_Tax_Identified</label>
          <div className="text-4xl font-black italic">${totalRework.toFixed(1)}M</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Active_Operators</label>
          <div className="text-4xl font-black italic">{data.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">System_Status</label>
          <div className="text-xl font-black italic text-green-500 uppercase flex items-center gap-2">
            <Activity size={20} /> Operational
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <h2 className="font-black italic uppercase tracking-tighter">Diagnostic_History_Log</h2>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-[10px] font-mono text-slate-600 hover:text-red-600 uppercase transition-colors"
          >
            End_Session
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Operator/Entity</th>
                <th className="p-4">Sector</th>
                <th className="p-4 text-right">Decay</th>
                <th className="p-4 text-right">Rework Tax</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {data.map((audit) => (
                <tr key={audit.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4 text-slate-500">
                    {new Date(audit.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white uppercase">{audit.operators?.full_name || "Unknown"}</div>
                    <div className="text-[10px] text-slate-500">{audit.operators?.entities?.name || "Independent"}</div>
                  </td>
                  <td className="p-4 uppercase text-slate-400">{audit.sector}</td>
                  <td className="p-4 text-right font-bold text-red-600">{audit.decay_pct}%</td>
                  <td className="p-4 text-right font-bold text-white">${audit.rework_tax}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
