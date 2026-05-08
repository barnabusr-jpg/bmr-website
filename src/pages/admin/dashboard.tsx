"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, FileText, CheckCircle, Clock 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  // 🛡️ SECURITY STATE (Restored from Main)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [activeTab, setActiveTab] = useState<'ledger' | 'frameworks'>('ledger');
  const [data, setData] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

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
      const interval = setInterval(() => { 
        fetchLedger(); 
        if (expandedRow) refreshActiveNodes(expandedRow); 
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchLedger, expandedRow, refreshActiveNodes]);

  // 🛡️ THE SECURITY GATE (Restored 2.0 Visuals)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 italic">
        <form 
          onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} 
          className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center relative shadow-2xl"
        >
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black">ALPHA-7_CLEARANCE_REQUIRED</p>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="MASTER_KEY" 
            className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 placeholder:text-slate-900" 
            autoFocus 
          />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none">
            INITIALIZE_COMMAND
          </button>
        </form>
      </div>
    );
  }

  // 🏛️ RENDER DASHBOARD ONLY IF AUTHENTICATED
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left selection:bg-red-600/30 italic">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Activity className="text-red-600" size={24} />
            <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">Forensic_Command_Center</span>
          </div>
          <div className="flex gap-1 bg-slate-900 p-1">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Live_Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP_Frameworks</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 px-10 max-w-[1600px] mx-auto pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' && (
            <motion.div key="ledger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-12 px-10 mb-6 opacity-30 font-mono text-[9px] font-black uppercase tracking-[0.4em]">
                <div className="col-span-6">ENTITY_SIGNAL</div>
                <div className="col-span-4 text-center">PROTOCOL_STATUS</div>
                <div className="col-span-2 text-right">ACTION_DIRECTIVES</div>
              </div>

              {data.map((audit) => (
                <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all">
                  <div onClick={() => toggleRow(audit.id)} className="grid grid-cols-12 items-center p-8 cursor-pointer group">
                    <div className="col-span-6 flex items-center gap-6">
                      <div className="bg-slate-900 p-4 border border-slate-800"><Building2 size={32} className="text-red-600" /></div>
                      <div>
                        <div className="font-black text-white uppercase text-4xl italic tracking-tighter">{audit.org_name || "UNKNOWN_SIGNAL"}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-2 uppercase">{audit.lead_email}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-center font-black text-white text-xs font-mono">TRIANGULATION_ACTIVE</div>
                    <div className="col-span-2 text-right text-slate-800 group-hover:text-red-600">
                      {expandedRow === audit.id ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </div>
                  </div>
                  
                  {expandedRow === audit.id && (
                    <div className="p-10 pt-0 border-t border-slate-900/50">
                      {/* Sub-node grid and Action Bar logic here */}
                      <div className="flex justify-between items-center pt-10">
                        <div className="flex gap-4">
                           <button className="bg-red-600 text-white px-8 py-4 font-black uppercase italic text-[11px]">RE-DISPATCH</button>
                           <button className="bg-yellow-600 text-black px-8 py-4 font-black uppercase italic text-[11px]">FORCE_SYNTHESIS</button>
                        </div>
                        <button onClick={() => window.open(`/results/${audit.id}`)} className="bg-white text-black px-10 py-4 font-black uppercase italic text-[11px]">VIEW_DOSSIER</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
