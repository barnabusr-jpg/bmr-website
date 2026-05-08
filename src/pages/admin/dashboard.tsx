"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, FileText, X, CheckCircle, Clock 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// 🏛️ 2.0 PROPRIETARY IP SUITE (MATCHED TO MAIN)
const BMR_IP_SUITE = {
  directives: [
    { 
      id: "DIR_01", 
      label: "IMMEDIATE HARDENING", 
      price: "$45K - $75K",
      description: "Identify where capital is leaking. Analyze alignment between nodes to isolate systemic rot without perimeter compromise.", 
      color: "text-red-600" 
    },
    { 
      id: "DIR_02", 
      label: "STRUCTURAL ALIGNMENT", 
      price: "$150K",
      description: "Rebuild logic connecting operational layers. Ensure executive intent matches technical execution to stop capital leaks.", 
      color: "text-blue-500" 
    },
    { 
      id: "DIR_03", 
      label: "GOVERNANCE OVERLAY", 
      price: "$25K/MO",
      description: "Develop new rule sets to protect fiduciary leadership. Establishes financial and operational safety.", 
      color: "text-purple-500" 
    },
    { 
      id: "DIR_04", 
      label: "FORENSIC CONTINUITY", 
      description: "Monitoring structural health through specialized reporting. Detects variance before the rework tax accrues.", 
      color: "text-green-500" 
    }
  ],
  services: [
    { tier: "TIER_01", title: "DRIFT DIAGNOSTICS", icon: <ZoomIn size={24} />, description: "High-fidelity forensic audit. Locating 'Log Rot' before it hardens." },
    { tier: "TIER_02", title: "STRUCTURAL HARDENING", icon: <Shield size={24} />, description: "Re-engineering human-in-the-loop protocols. Building safeguards against value leakage." },
    { tier: "TIER_03", title: "LOGIC RECONSTRUCTION", icon: <Hammer size={24} />, description: "Structural recovery for systems in collapse. Stabilizing long-term defensibility." }
  ]
};

export default function AdminDashboard() {
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 italic">
        <form onSubmit={(e) => { e.preventDefault(); if(password === "KIMMALASR_03") setIsAuthenticated(true); }} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center relative shadow-2xl">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black">ALPHA-7_CLEARANCE_REQUIRED</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="MASTER_KEY" className="w-full bg-black border border-slate-800 p-6 text-center text-red-600 font-black outline-none tracking-[0.5em] text-2xl focus:border-red-600 placeholder:text-slate-900" autoFocus />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none">INITIALIZE_COMMAND</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left selection:bg-red-600/30 italic">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Activity className="text-red-600 animate-pulse" size={24} />
            <span className="text-white font-black uppercase tracking-[0.2em] text-sm font-mono">FORENSIC_COMMAND_CENTER</span>
          </div>
          <div className="flex gap-1 bg-slate-900 p-1">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Live_Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP_Frameworks</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 px-10 max-w-[1600px] mx-auto pb-32 font-sans">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
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
                        <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name || "PENDING_SIGNAL"}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic">{audit.lead_email}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-center font-black text-white italic text-xs tracking-[0.2em] font-mono">
                      {audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : 'TRIANGULATION_ACTIVE'}
                    </div>
                    <div className="col-span-2 text-right text-slate-800 group-hover:text-red-600 transition-colors">
                      {expandedRow === audit.id ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedRow === audit.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="p-10 pt-0 border-t border-slate-900/50 bg-black/20">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 mb-10">
                            {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((role) => {
                              const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role);
                              const isDone = node?.status?.toLowerCase() === 'completed';
                              return (
                                <div key={role} className="border-2 border-slate-900 p-8 bg-slate-950/40 relative min-h-[160px] flex flex-col justify-between">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-mono text-slate-600 font-black tracking-widest italic">{role}_NODE</span>
                                    {isDone ? <CheckCircle className="text-red-600" size={18}/> : <Clock className="text-slate-800" size={18}/>}
                                  </div>
                                  <div className={`text-5xl font-black italic uppercase tracking-tighter ${isDone ? 'text-white' : 'text-slate-900'}`}>{isDone ? 'CALCULATED' : 'WAITING'}</div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-900/50 pt-10">
                            <div className="flex gap-4">
                               <button className="bg-red-600/80 text-white px-8 py-5 font-black uppercase italic text-[11px] tracking-widest hover:bg-red-600 flex items-center gap-3"><Mail size={18} /> RE-DISPATCH_PROTOCOL</button>
                               <button className="bg-[#b48c3b] text-black px-8 py-5 font-black uppercase italic text-[11px] tracking-widest hover:bg-yellow-500 flex items-center gap-3"><Zap size={18} /> FORCE_SYNTHESIS</button>
                            </div>
                            <button onClick={() => window.open(`/results/${audit.id}`, '_blank')} className="bg-white text-black px-12 py-5 font-black uppercase italic text-[11px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3 shadow-xl"><FileText size={20} /> GENERATE_FORENSIC_DOSSIER</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="frameworks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-20">
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

              <section>
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4">Proprietary_Directives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BMR_IP_SUITE.directives.map((d) => (
                    <div key={d.id} className="p-12 border-2 border-slate-900 bg-slate-950 hover:border-red-600 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><Binary className={d.color} size={40} /></div>
                      <div className="flex justify-between items-start mb-10">
                        <div className="space-y-2">
                          <span className={`text-[10px] font-mono font-black tracking-widest ${d.color}`}>PROTOCOL // {d.id}</span>
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">{d.label}</h2>
                        </div>
                        {d.price && <div className="bg-red-600 text-white px-6 py-2 text-xs font-black italic tracking-widest">{d.price}</div>}
                      </div>
                      <p className="text-xl text-slate-400 italic leading-relaxed mb-8 border-l-2 border-slate-800 pl-8 font-medium">{d.description}</p>
                      <div className="pt-8 border-t border-slate-900 flex items-center gap-3 text-slate-600 font-mono text-[10px] uppercase tracking-widest">
                        <Shield size={14} /> Fiduciary_Encryption_Active
                      </div>
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
