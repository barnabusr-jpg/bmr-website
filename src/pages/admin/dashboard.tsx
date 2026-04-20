"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Key, Activity, BarChart3, Fingerprint, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any[]>([]);

  const fetchLedger = useCallback(async () => {
    const { data: audits } = await supabase.from('audit_responses').select('*').order('created_at', { ascending: false });
    setData(audits || []);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchLedger();
  }, [isAuthenticated, fetchLedger]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-950 border border-slate-900 p-12 max-w-md w-full text-center shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
          <Key className="text-red-600 mx-auto mb-8 animate-pulse" size={48} />
          <div className="space-y-6">
            <h2 className="text-white font-black uppercase italic tracking-widest text-sm">Command_Center_Auth</h2>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="MASTER_KEY" 
              className="w-full bg-black border border-slate-800 p-5 text-center text-red-600 font-black outline-none tracking-[0.3em] focus:border-red-600"
              autoFocus
            />
            <button 
              onClick={() => { if(password === "KIMMALASR_03") setIsAuthenticated(true); }}
              className="w-full bg-red-600 text-white py-5 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all"
            >
              INITIALIZE_COMMAND
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-10 pt-32 font-sans tracking-tighter">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b border-slate-900 z-50 px-10 flex items-center gap-5">
        <Activity className="text-red-600" />
        <span className="text-white font-black uppercase italic tracking-widest">Forensic_Command_Center</span>
      </nav>

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 p-8">
            <label className="text-[9px] font-mono text-slate-500 uppercase block mb-4 italic tracking-widest">Cumulative_Rework_Tax</label>
            <div className="text-5xl font-black italic text-white">${data.reduce((a, c) => a + (Number(c.rework_tax) || 0), 0).toFixed(1)}M</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-8">
            <label className="text-[9px] font-mono text-slate-500 uppercase block mb-4 italic tracking-widest">Active_Signals</label>
            <div className="text-5xl font-black italic text-white">{data.length}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black text-[10px] text-slate-600 uppercase tracking-widest">
                <th className="p-8">Entity</th>
                <th className="p-8 text-right">Rework_Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {data.map((audit) => (
                <tr key={audit.id} className="hover:bg-white/[0.03]">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <Building2 size={24} className="text-red-600" />
                      <div>
                        <div className="font-black text-white uppercase text-2xl italic">{audit.org_name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{audit.lead_email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 text-right font-black text-white italic text-4xl">${Number(audit.rework_tax || 0).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
