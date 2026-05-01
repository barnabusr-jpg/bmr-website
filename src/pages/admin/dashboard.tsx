"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, LayoutDashboard, Binary, Eye, 
  ZoomIn, Hammer 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// INTERNAL IP: THE BMR FRAMEWORKS & SERVICE TIERS
const BMR_IP_SUITE = {
  directives: [
    { id: "DIR_01", label: "IMMEDIATE HARDENING", price: "$45K - $75K", description: "The engine identifies where capital is leaking right now. We analyze the alignment between organizational nodes. This identifies systemic rot without compromising your security perimeter.", color: "text-red-600" },
    { id: "DIR_02", label: "STRUCTURAL ALIGNMENT", price: "$150K", description: "The system rebuilds the logic that connects your operational layers. We ensure that executive intent matches technical execution to stop capital leaks.", color: "text-blue-500" },
    { id: "DIR_03", label: "GOVERNANCE OVERLAY", price: "$25K/MO", description: "Developing new organizational rule sets to protect fiduciary leadership and technical staff. This creates a state of financial and operational safety.", color: "text-purple-500" },
    { id: "DIR_04", label: "FORENSIC CONTINUITY", description: "Monitoring structural health through specialized reporting cadence. If a variance starts to grow, the system will detect it before the rework tax accrues.", color: "text-green-500" }
  ],
  services: [
    { tier: "TIER_01", title: "DRIFT DIAGNOSTICS", icon: <ZoomIn size={24} />, description: "High-fidelity forensic audit of AI deployments. Locating 'Log Rot' before it hardens." },
    { tier: "TIER_02", title: "STRUCTURAL HARDENING", icon: <Shield size={24} />, description: "Re-engineering human-in-the-loop protocols. Building safeguards to prevent value leakage." },
    { tier: "TIER_03", title: "LOGIC RECONSTRUCTION", icon: <Hammer size={24} />, description: "Structural recovery for systems in active collapse. Stabilizing long-term defensibility." }
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
    if (isAuthenticated && activeTab === 'ledger') {
      fetchLedger();
      const interval = setInterval(() => { 
        fetchLedger(); 
        if (expandedRow) refreshActiveNodes(expandedRow); 
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, activeTab, fetchLedger, expandedRow, refreshActiveNodes]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center relative font-sans">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 placeholder:text-slate-900" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none">INITIALIZE_COMMAND</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter">
      {/* PERSISTENT COMMAND NAV */}
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

      <main className="pt-40 px-10 max-w-7xl mx-auto pb-32 text-left">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-slate-950 border border-slate-900 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-[10px] text-slate-600 uppercase tracking-[0.3em] border-b border-slate-900">
                    <th className="p-10">Entity_Signal</th>
                    <th className="p-10 text-center">Protocol_Status</th>
                    <th className="p-10 text-right">Action_Directives</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {data.map((audit) => (
                    <React.Fragment key={audit.id}>
                      <tr onClick={() => toggleRow(audit.id)} className="hover:bg-white/[0.02] cursor-pointer transition-all">
                        <td className="p-10">
                          <div className="flex items-center gap-6">
                            <Building2 size={32} className={audit.status === 'COMPLETE' ? "text-green-500" : "text-red-600"} />
                            <div>
                              <div className="font-black text-white uppercase text-3xl italic tracking-tighter leading-none">{audit.org_name}</div>
                              <div className="text-[11px] text-slate-500 font-mono mt-2 uppercase">{audit.lead_email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-10 text-center uppercase italic font-black text-[10px]">{audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : 'TRIANGULATION_ACTIVE'}</td>
                        <td className="p-10 text-right text-slate-600">{expandedRow === audit.id ? <ChevronUp /> : <ChevronDown />}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div key="frameworks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-20">
              
              {/* SUB-SECTION: SERVICE TIERS (THE HOOK) */}
              <section>
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4">Public_Service_Mapping</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BMR_IP_SUITE.services.map((s) => (
                    <div key={s.tier} className="p-8 border border-slate-800 bg-slate-900/20">
                      <div className="text-red-600 mb-6">{s.icon}</div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{s.tier}</span>
                      <h4 className="text-2xl font-black italic uppercase text-white mt-2 mb-4 leading-none">{s.title}</h4>
                      <p className="text-xs text-slate-400 uppercase font-bold leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SUB-SECTION: PROPRIETARY DIRECTIVES (THE ENGINE) */}
              <section>
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4">Proprietary_Directives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BMR_IP_SUITE.directives.map((d) => (
                    <div key={d.id} className="p-12 border-2 border-slate-900 bg-slate-950 hover:border-red-600 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity"><Binary className={d.color} size={40} /></div>
                      <div className="flex justify-between items-start mb-10">
                        <div className="space-y-2">
                          <span className={`text-[10px] font-mono font-black tracking-widest ${d.color}`}>PROTOCOL // {d.id}</span>
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">{d.label}</h2>
                        </div>
                        {d.price && <div className="bg-red-600 text-white px-6 py-2 text-xs font-black italic tracking-widest">{d.price}</div>}
                      </div>
                      <p className="text-xl text-slate-400 italic leading-relaxed mb-8 border-l-2 border-slate-800 pl-8">{d.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
