"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, FileText, CheckCircle, Clock 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const BMR_IP_SUITE = {
  directives: [
    { 
      id: "DIR_01", label: "IMMEDIATE HARDENING", price: "$45K - $75K",
      description: "The engine identifies where capital is leaking right now. We analyze the alignment between organizational nodes.", color: "text-red-600" 
    },
    { 
      id: "DIR_02", label: "STRUCTURAL ALIGNMENT", price: "$150K",
      description: "The system rebuilds the logic that connects your operational layers.", color: "text-blue-500" 
    },
    { 
      id: "DIR_03", label: "GOVERNANCE OVERLAY", price: "$25K/MO",
      description: "Developing new organizational rule sets to protect fiduciary leadership.", color: "text-purple-500" 
    },
    { 
      id: "DIR_04", label: "FORENSIC CONTINUITY", 
      description: "Monitoring structural health through specialized reporting cadence.", color: "text-green-500" 
    }
  ],
  services: [
    { tier: "TIER_01", title: "DRIFT DIAGNOSTICS", icon: <ZoomIn size={24} />, description: "High-fidelity forensic audit of AI deployments." },
    { tier: "TIER_02", title: "STRUCTURAL HARDENING", icon: <Shield size={24} />, description: "Re-engineering human-in-the-loop protocols." },
    { tier: "TIER_03", title: "LOGIC RECONSTRUCTION", icon: <Hammer size={24} />, description: "Structural recovery for systems in active collapse." }
  ]
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'ledger' | 'frameworks'>('ledger');
  const [data, setData] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 italic">
        <form onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center relative shadow-2xl">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black italic">ALPHA-7_CLEARANCE_REQUIRED</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 italic" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none italic">INITIALIZE_COMMAND</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left selection:bg-red-600/30 italic uppercase font-black overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <Activity className="text-red-600 animate-pulse" size={20} />
            <span className="text-white font-black uppercase italic tracking-[0.1em] text-[10px] md:text-sm font-mono hidden sm:inline">FORENSIC_COMMAND</span>
          </div>
          <div className="flex gap-1 bg-slate-900 p-1 shrink-0">
            <button onClick={() => setActiveTab('ledger')} className={`px-3 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-3 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP_Framework</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 md:pt-40 px-4 md:px-10 max-w-[1600px] mx-auto pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <div className="hidden md:grid grid-cols-12 px-10 mb-6 opacity-30 font-mono text-[9px] font-black uppercase tracking-[0.4em] italic">
                <div className="col-span-6">ENTITY_SIGNAL</div>
                <div className="col-span-4 text-center">PROTOCOL_STATUS</div>
                <div className="col-span-2 text-right">DIRECTIVES</div>
              </div>

              {data.map((audit) => (
                <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden italic">
                  <div onClick={() => toggleRow(audit.id)} className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center p-6 md:p-8 cursor-pointer group gap-6 md:gap-0 italic">
                    <div className="w-full md:col-span-6 flex items-center gap-4 md:gap-6 min-w-0 italic">
                      <div className="bg-slate-900 p-3 md:p-4 border border-slate-800 shrink-0 italic"><Building2 size={24} className="text-red-600" /></div>
                      <div className="min-w-0 italic">
                        <div className="font-black text-white uppercase text-2xl md:text-4xl italic tracking-tighter leading-none break-words italic">{audit.org_name || "PENDING_SIGNAL"}</div>
                        <div className="text-[9px] md:text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic break-all italic">{audit.lead_email}</div>
                      </div>
                    </div>
                    <div className="w-full md:col-span-4 md:text-center font-black text-white italic text-[10px] md:text-xs tracking-[0.2em] font-mono border-y border-slate-900 md:border-none py-4 md:py-0 italic">
                      {audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : 'TRIANGULATION_ACTIVE'}
                    </div>
                    <div className="w-full md:col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors italic">
                      {expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                    </div>
                  </div>
                  {expandedRow === audit.id && (
                    <div className="p-6 md:p-10 pt-0 border-t border-slate-900/50 bg-black/20 italic">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-10 mb-10 italic">
                        {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((role) => {
                          const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role);
                          const isDone = node?.status?.toLowerCase() === 'completed';
                          return (
                            <div key={role} className="border-2 border-slate-900 p-6 md:p-8 bg-slate-950/40 relative min-h-[140px] flex flex-col justify-between italic">
                              <span className="text-[9px] font-mono text-slate-600 font-black tracking-widest italic">{role}_NODE</span>
                              <div className={`text-3xl md:text-5xl font-black italic uppercase tracking-tighter italic ${isDone ? 'text-white' : 'text-slate-900'}`}>{isDone ? 'CALCULATED' : 'WAITING'}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="frameworks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 italic">
              {/* Framework content here */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
