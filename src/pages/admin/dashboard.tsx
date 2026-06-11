"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, 
  Monitor, X, Send, CheckCircle, Clock, Search, BellRing, FileText, RotateCcw
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const BMR_IP_SUITE = {
  directives: [
    { id: "DIR_01", label: "IMMEDIATE HARDENING", price: "$45K - $75K", description: "The engine identifies where capital is leaking right now.", color: "text-red-600" },
    { id: "DIR_02", label: "STRUCTURAL ALIGNMENT", price: "$150K", description: "The system rebuilds the logic that connects your operational layers.", color: "text-blue-500" },
    { id: "DIR_03", label: "GOVERNANCE OVERLAY", price: "$25K/MO", description: "Developing new organizational rule sets to protect leadership.", color: "text-purple-500" },
    { id: "DIR_04", label: "FORENSIC CONTINUITY", description: "Monitoring structural health through specialized reporting cadence.", color: "text-green-500" }
  ],
  services: [
    { tier: "TIER_01", title: "DRIFT DIAGNOSTICS", icon: <ZoomIn size={24} />, description: "High-fidelity forensic audit of AI deployments." },
    { tier: "TIER_02", title: "STRUCTURAL HARDENING", icon: <Shield size={24} />, description: "Re-engineering human-in-the-loop protocols." },
    { tier: "TIER_03", title: "LOGIC RECONSTRUCTION", icon: <Hammer size={24} />, description: "Structural recovery for systems in active collapse." }
  ]
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'ledger' | 'frameworks'>('ledger');
  const [data, setData] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [emails, setEmails] = useState({ exec: "", mgr: "", tech: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "LEAD" | "TRIANGULATING" | "COMPLETE" | "SYSTEM REALITY">("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ROWS_PER_PAGE = 10;

  const [dossierNotes, setDossierNotes] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const debounceTimersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("AUTHORIZATION FAILED: UNRECOGNIZED SIGNAL");
      setLoading(false);
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const fetchLedger = useCallback(async () => {
    if (isUpdating) return;

    let query = supabase.from('audits').select('*', { count: 'exact' });

    if (statusFilter !== "ALL") {
      query = query.eq('status', statusFilter);
    }

    if (searchTerm.trim() !== "") {
      query = query.or(`org_name.ilike.%${searchTerm}%,lead_email.ilike.%${searchTerm}%`);
    }

    const startRange = currentPage * ROWS_PER_PAGE;
    const endRange = startRange + ROWS_PER_PAGE - 1;

    const { data: audits, count, error } = await query
      .order('created_at', { ascending: false })
      .range(startRange, endRange);

    if (!error && audits) {
      setData(prev => {
        return audits.map(newAudit => {
          const decayTimerKey = `${newAudit.id}-decay_pct`;
          const spendTimerKey = `${newAudit.id}-ai_spend`;
          const fteTimerKey = `${newAudit.id}-roi_pct`;
          const isUserActivelySliding = debounceTimersRef.current[decayTimerKey] || debounceTimersRef.current[spendTimerKey] || debounceTimersRef.current[fteTimerKey];
          
          if (isUserActivelySliding) {
            const currentMatch = prev.find(p => p.id === newAudit.id);
            if (currentMatch) {
              return { ...newAudit, decay_pct: currentMatch.decay_pct, ai_spend: currentMatch.ai_spend, roi_pct: currentMatch.roi_pct };
            }
          }
          return newAudit;
        });
      });
      setTotalCount(count || 0);
    }
  }, [statusFilter, searchTerm, currentPage, isUpdating]);

  const refreshActiveNodes = useCallback(async (auditId: string) => {
    if (isUpdating) return;
    const { data: nodes } = await supabase.from('operators').select('persona_type, status, email').eq('audit_id', auditId);
    if (nodes) setNodeDetails(nodes);
  }, [isUpdating]);

  const toggleRow = async (auditId: string) => {
    if (expandedRow === auditId) { setExpandedRow(null); return; }
    setExpandedRow(auditId);
    await refreshActiveNodes(auditId);
  };

  const triggerActivation = async () => {
    if (!selectedAudit || isUpdating) return;
    setIsUpdating(true);
    try {
      const res = await fetch('/api/dispatch-tokens', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: selectedAudit.id, 
          emails: { executive: emails.exec.trim(), managerial: emails.mgr.trim(), technical: emails.tech.trim() }
        })
      });
      if (!res.ok) throw new Error("Dispatch Failed");
      setSelectedAudit(null);
      setEmails({ exec: "", mgr: "", tech: "" });
      setToastMessage("🔒 3-NODE SURYEY PROTOCOLS ACTIVATED VIA SENDGRID");
      setTimeout(() => setToastMessage(null), 4000);
      fetchLedger();
    } catch (err: any) { 
      alert(err.message); 
    } finally { 
      setIsUpdating(false); 
    }
  };

  const triggerSystemRealityReveal = async (auditId: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase.from('audits').update({ status: "SYSTEM REALITY" }).eq('id', auditId);
      if (error) throw error;
      setToastMessage("LIVE UNMASKING: SYSTEM REALITY BROADCAST VECTOR DEPLOYED");
      setTimeout(() => setToastMessage(null), 4000);
      fetchLedger();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const rollbackToEfficiencyView = async (auditId: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase.from('audits').update({ status: "TRIANGULATING" }).eq('id', auditId);
      if (error) throw error;
      setToastMessage("VECTOR REVERTED: VIEW RESTORED TO STAGE 01 BASELINE FREEZE");
      setTimeout(() => setToastMessage(null), 4000);
      fetchLedger();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const triggerNudge = async (targetRoleKey: string, auditRecord: any) => {
    const matchingNode = nodeDetails.find(n => n.persona_type?.toUpperCase() === targetRoleKey);
    if (!matchingNode || !matchingNode.email) {
      alert("NUDGE ERROR: RECIPIENT NODE ROUTE NOT IDENTIFIED.");
      return;
    }
    
    setIsUpdating(true);
    try {
      const formattedPayload: Record<string, string> = {};
      formattedPayload[targetRoleKey] = matchingNode.email;

      const res = await fetch('/api/dispatch-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId: auditRecord.id, emails: formattedPayload })
      });
      
      if (res.ok) alert(`NUDGE SUCCESS: ACCESS REMINDER LINK FIRED TO ${matchingNode.email}`);
      else throw new Error("Gateway Timeout");
    } catch (err) {
      alert("NUDGE LOGISTICS FAILURE.");
    } finally {
      setIsUpdating(false);
    }
  };

  const runSynthesis = async (auditId: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/synthesize-fracture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId })
      });
      if (!res.ok) throw new Error("Synthesis Outage");
      fetchLedger();
      alert("SYNTHESIS ROOT LOGIC ENGINE RE-CALCULATED SUCCESSFULLY.");
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsUpdating(false); 
    }
  };

  const handleLiveSliderChange = async (auditId: string, field: "decay_pct" | "ai_spend" | "roi_pct", value: number) => {
    setData(prev => prev.map(item => item.id === auditId ? { ...item, [field]: value } : item));

    const targetTimerKey = `${auditId}-${field}`;
    if (debounceTimersRef.current[targetTimerKey]) {
      clearTimeout(debounceTimersRef.current[targetTimerKey]);
    }

    debounceTimersRef.current[targetTimerKey] = setTimeout(async () => {
      try {
        await supabase.from('audits').update({ [field]: value }).eq('id', auditId);
        delete debounceTimersRef.current[targetTimerKey];
      } catch (err) {
        console.error("LIVE_SLIDER_SYNC_ERROR:", err);
      }
    }, 120);
  };

  const toggleClientAccess = async (audit: any) => {
    setIsUpdating(true);
    const targetNewReleaseState = !audit.is_released;
    try {
      const { error } = await supabase
        .from('audits')
        .update({ is_released: targetNewReleaseState })
        .eq('id', audit.id);
        
      if (error) throw error;
      await fetchLedger();
    } catch (err) {
      console.error("ACCESS TOGGLE ERR ->", err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, statusFilter]);

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

  useEffect(() => {
    return () => { Object.values(debounceTimersRef.current).forEach(clearTimeout); };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <form onSubmit={handleSignIn} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center shadow-2xl relative italic">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black italic">ALPHA 7 CLEARANCE REQUIRED</p>
          <div className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="OPERATOR EMAIL" className="w-full bg-black border border-slate-800 p-4 text-center text-white font-mono outline-none focus:border-red-600 italic uppercase" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="SECURE PASSKEY" className="w-full bg-black border border-slate-800 p-4 text-center text-red-600 font-black outline-none tracking-[0.5em] text-xl focus:border-red-600" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all italic leading-none">
            {loading ? "VERIFYING..." : "INITIALIZE COMMAND"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 shrink-0"><Activity className="text-red-600 animate-pulse" size={20} /><span className="text-white font-black uppercase italic tracking-[0.1em] text-sm font-mono">FORENSIC COMMAND</span></div>
          <div className="flex gap-1 bg-slate-900 p-1 shrink-0">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP Framework</button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative italic">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
              
              <h2 className="text-4xl font-black uppercase italic text-white mb-2 tracking-tighter text-left leading-none">ASSIGN STAKEHOLDER EMAILS</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1 tracking-wider">PROVISIONING ASSOCIATION NODES FOR: {selectedAudit.org_name}</p>
              
              <div className="space-y-4 mt-10 text-left">
                <input placeholder="EXECUTIVE STAKEHOLDER EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                <input placeholder="MANAGERIAL STAKEHOLDER EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                <input placeholder="TECHNICAL STAKEHOLDER EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                
                <button onClick={triggerActivation} disabled={isUpdating} className="w-full bg-red-600 text-white py-6 mt-4 font-black uppercase italic text-xs tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all">
                  {isUpdating ? <Activity className="animate-spin" /> : <Send size={18} />} 
                  {isUpdating ? "GENERATING ACCESS KEYS..." : "Generate Access Keys"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-40 px-10 max-w-[1600px] mx-auto pb-32 italic">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 italic">
                {[
                  { label: "TOTAL ASSETS INGESTED", value: totalCount, color: "border-slate-800 text-white" },
                  { label: "ACTIVE TRIANGULATIONS", value: data.filter(d => d.status?.toUpperCase().includes("TRIANGULATION") || d.status?.toUpperCase().includes("TRIANGULATING")).length, color: "border-yellow-600/30 text-yellow-500" },
                  { label: "PROPOSED SOW DOSSIERS SENT", value: data.filter(d => d.sow_sent === true).length, color: "border-blue-600/30 text-blue-400" },
                  { label: "CLOSED/REVENUE REALIZED", value: data.filter(d => d.is_paid === true).length, color: "border-emerald-600/30 text-emerald-500" }
                ].map((stat) => (
                  <div key={stat.label} className={`bg-slate-950/60 border p-6 flex flex-col justify-between min-h-[110px] relative transition-all hover:bg-slate-950 ${stat.color.split(" ")[0]}`}>
                    <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase block">// {stat.label}</span>
                    <div className={`text-4xl font-black italic tracking-tighter mt-4 leading-none ${stat.color.split(" ")[1]}`}>
                      {stat.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-slate-950 p-4 border border-slate-900">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="PARSE BY COMPANY IDENTITY OR LEAD SIGNAL EMAIL..." 
                    className="w-full bg-black border border-slate-800 pl-12 pr-4 py-4 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic placeholder:text-slate-600"
                  />
                </div>
                
                <div className="flex bg-black border border-slate-800 p-1 gap-1 overflow-x-auto shrink-0">
                  {([
                    { label: "All Assets", value: "ALL" },
                    { label: "Initial Leads", value: "LEAD" },
                    { label: "Triangulating", value: "TRIANGULATING" },
                    { label: "Calculated Dossiers", value: "COMPLETE" }
                  ] as const).map((tab) => (
                    <button 
                      key={tab.value} onClick={() => setStatusFilter(tab.value)}
                      className={`px-4 py-2 font-mono text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${statusFilter === tab.value ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {data.length === 0 ? (
                <div className="text-center p-20 border border-dashed border-slate-900 font-mono text-xs text-slate-600 uppercase tracking-widest">
                  No corresponding forensic ledger entries located inside this category index.
                </div>
              ) : (
                data.map((audit) => {
                  const clientHasAccess = !!audit.is_released;
                  const isRealityActive = audit.status === "SYSTEM REALITY";
                  const sfi = audit.sfi_score || 0;
                  const realFractures = audit.fractures || [];
                  
                  const dbDecay = audit.decay_pct || 24;
                  const spend = parseFloat(audit.ai_spend) || 1.2;
                  const fte = audit.roi_pct || 6;
                  
                  const laborMultiplier = audit.sector === 'finance' ? 0.5 : audit.sector === 'healthcare' ? 0.45 : 0.4;
                  const laborTax = (dbDecay / 100) * laborMultiplier * (fte * 160000 * 1.3);
                  const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;

                  let playbookHeadline = "BALANCED INFRASTRUCTURE STATE";
                  let playbookNarrative = "Operational alignment metrics indicate standard operational velocity. Cross-functional communication tracks are solid, and system parameters are matching organizational intent.";
                  let playbookPitch = "Deploy routine baseline optimization filters to preserve ongoing alignment tracks.";
                  let targetTier = "TIER_01 // DRIFT DIAGNOSTICS";

                  const cleanStatus = (audit.status || "").toUpperCase();
                  if (cleanStatus.includes("TRIANGULATION") || cleanStatus.includes("TRIANGULATING") || sfi === 0) {
                    playbookHeadline = "PENDING SYSTEM ANALYSIS NODE RECONSTRUCTION";
                    playbookNarrative = "Multi-node operational telemetry validation parameters are matching initial baseline presets, or require structural evaluation. Click the gold executive engine switch below to compile results or force structural contradiction synthesis.";
                    playbookPitch = "Initialize matrix synthesis override engine to evaluate internal contradiction markers.";
                  } else if (sfi >= 45) {
                    playbookHeadline = "HIGH ASYMMETRIC TRANSLATION STRAIN";
                    playbookNarrative = `An elevated Systemic Friction score of ${sfi} indicates an Asymmetric Translation Gap. Strategic leaders have built excellent structural frameworks, but engineering teams are managing manual edge-cases.`;
                    playbookPitch = "Introduce permanent automated structural layers to bridge technical execution with corporate governance.";
                    targetTier = "TIER_03 // LOGIC RECONSTRUCTION";
                  }

                  return (
                    <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden italic text-white">
                      <div onClick={() => toggleRow(audit.id)} className="grid grid-cols-12 items-center p-8 cursor-pointer group">
                        <div className="col-span-6 flex items-center gap-6">
                          <div className="bg-slate-900 p-4 border border-slate-800 shrink-0 italic">
                            <Building2 size={24} className={isRealityActive ? "text-green-500" : "text-red-600"} />
                          </div>
                          <div>
                            <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name || "PENDING SIGNAL"}</div>
                            <div className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic break-all">{audit.lead_email}</div>
                          </div>
                        </div>
                        
                        <div className="col-span-4 text-center font-black italic text-xs tracking-[0.2em] font-mono flex items-center justify-center gap-3">
                          <span className="text-white">
                            {isRealityActive ? 'LIVE UNMASKED // REALITY ACTIVE' : `${cleanStatus} MODE`}
                          </span>
                        </div>
                        
                        <div className="col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors italic">{expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}</div>
                      </div>
                      
                      {expandedRow === audit.id && (
                        <div className="p-10 pt-0 border-t border-slate-900/50 bg-black/20 italic text-left select-text">
                          
                          <div className="grid grid-cols-3 gap-6 pt-10 mb-8 italic">
                            {[
                              { label: 'EXECUTIVE TRACK', key: 'EXE' },
                              { label: 'MANAGERIAL TRACK', key: 'MGR' },
                              { label: 'TECHNICAL TRACK', key: 'TEC' }
                            ].map((role) => {
                              const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role.key);
                              const isDone = node?.status?.toLowerCase() === 'completed';
                              return (
                                <div key={role.label} className="border-2 border-slate-900 p-6 bg-slate-950/40 relative min-h-[140px] flex flex-col justify-between italic">
                                  <span className="text-[9px] font-mono text-slate-600 font-black block">{role.label}</span>
                                  <div className="flex-1 flex flex-col justify-center items-center text-center py-4">
                                    <div className={`font-black uppercase text-xl ${isDone ? 'text-white' : 'text-slate-800 animate-pulse'}`}>
                                      {isDone ? 'DATA_COMPILED' : 'NODE_PENDING'}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* 3 PARAMETER SLIDERS: ADDS CLEAN INTEGRATION TO ADJUST DECAY COEFFICIENTS */}
                          <div className="border border-slate-900 bg-slate-950 p-6 mb-8 space-y-6">
                            <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase block">// REAL-TIME PRESENTATION CALIBRATION STRIPS</span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono">
                                  <span className="text-slate-400">LOGIC DECAY COEFFICIENT:</span>
                                  <span className="text-red-500 font-black">{dbDecay}%</span>
                                </div>
                                <input 
                                  type="range" min="5" max="95" step="1" value={dbDecay}
                                  onChange={(e) => handleLiveSliderChange(audit.id, "decay_pct", parseInt(e.target.value))}
                                  className="w-full accent-red-600 bg-slate-900 h-1.5 cursor-pointer"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono">
                                  <span className="text-slate-400">ANNUAL SYSTEM SOFTWARE SPEND:</span>
                                  <span className="text-red-500 font-black">${spend.toFixed(1)}M</span>
                                </div>
                                <input 
                                  type="range" min="0.1" max="25.0" step="0.1" value={spend}
                                  onChange={(e) => handleLiveSliderChange(audit.id, "ai_spend", parseFloat(e.target.value))}
                                  className="w-full accent-red-600 bg-slate-900 h-1.5 cursor-pointer"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono">
                                  <span className="text-slate-400">IMPACTED WORKFORCE SCALE (FTES):</span>
                                  <span className="text-red-500 font-black">{fte} PEOPLE</span>
                                </div>
                                <input 
                                  type="range" min="1" max="250" step="1" value={fte}
                                  onChange={(e) => handleLiveSliderChange(audit.id, "roi_pct", parseInt(e.target.value))}
                                  className="w-full accent-red-600 bg-slate-900 h-1.5 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                            <div className="lg:col-span-5 border border-slate-900 bg-slate-950 p-6 space-y-4 font-mono">
                              <div className="text-[10px] text-slate-500 font-black block">// RUN_RATE_METRICS_LEDGER</div>
                              <div className="space-y-3 pt-2 border-t border-slate-900 text-xs">
                                <div className="flex justify-between"><span className="text-slate-600">SYSTEMIC_FRICTION_INDEX:</span><span className="text-red-500 font-black">{sfi} / 100 SFI</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">ANNUAL_REWORK_TAX:</span><span className="text-white font-black">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">FORENSIC_INACTION_EXPOSURE:</span><span className="text-white font-black">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                <div className="flex justify-between border-t border-slate-900 pt-2 text-sm"><span className="text-slate-400 font-black">TOTAL EXPENSE LEAKAGE:</span><span className="text-red-600 font-black">${(laborTax + exposure).toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                              </div>
                            </div>

                            <div className="lg:col-span-7 border-2 border-red-900/60 bg-red-950/5 p-6 flex flex-col justify-between">
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono font-black text-red-500 block">// SECURE_BRIEFING_ALIGNMENT_SCRIPT</span>
                                <div className="text-2xl font-black text-white uppercase">{playbookHeadline}</div>
                                <p className="text-xs text-slate-300 border-l-2 border-red-600 pl-4 py-1 font-normal normal-case font-sans">{playbookNarrative}</p>
                              </div>
                            </div>
                          </div>

                          {/* DYNAMIC PERMANENT BUTTON CARD WRAPPER */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-900 pt-8">
                            <div className="flex flex-col space-y-3">
                              <span className="text-[9px] font-mono text-slate-600 block font-black uppercase">// PHASE GATEWAY CONTROLS</span>
                              
                              <div className="grid grid-cols-2 gap-3 w-full">
                                <button 
                                  type="button" 
                                  onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} 
                                  className="bg-red-900/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-900/60 p-4 font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                  <Mail size={12} /> Launch 360 Deep Dive
                                </button>
                                <button 
                                  type="button" 
                                  onClick={(e) => { e.stopPropagation(); runSynthesis(audit.id); }} 
                                  className="bg-yellow-600/20 hover:bg-yellow-600 text-yellow-500 hover:text-black border border-yellow-600/40 p-4 font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                  <Zap size={12} /> Compile Triangulation
                                </button>
                              </div>

                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); triggerSystemRealityReveal(audit.id); }} 
                                className={`w-full px-10 py-5 font-black uppercase text-[10px] tracking-widest border transition-all ${
                                  isRealityActive 
                                    ? 'bg-emerald-950/20 text-emerald-500 border-emerald-900/40' 
                                    : 'bg-red-600 text-white border-red-500 hover:bg-white hover:text-red-600'
                                }`}
                              >
                                <span>{isRealityActive ? "REALITY INTERLOCK ENGAGED" : "UNVEIL LIVE SYSTEM REALITY"}</span>
                              </button>

                              {isRealityActive && (
                                <button
                                  type="button" onClick={(e) => { e.stopPropagation(); rollbackToEfficiencyView(audit.id); }}
                                  className="w-full bg-slate-900/60 hover:bg-red-600 text-slate-400 hover:text-white border border-slate-800 hover:border-red-500 py-3 font-mono text-[9px] tracking-widest uppercase transition-all font-black flex items-center justify-center gap-2"
                                >
                                  ✕ ROLLBACK TO STAGE 01 (COMPRESSED BASELINE)
                                </button>
                              )}

                              {toastMessage && (
                                <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-400 font-mono text-[9px] tracking-widest py-3 px-4 uppercase text-center animate-pulse mt-2">
                                  🛰️ {toastMessage}
                                </div>
                              )}
                            </div>

                            <div className="space-y-4 md:border-l md:border-slate-900 md:pl-12">
                              <span className="text-[9px] font-mono text-slate-600 block tracking-widest uppercase font-black">INTERNAL ASSET EXPORTS</span>
                              <div className="w-full space-y-1 mb-2">
                                <input 
                                  type="text" value={dossierNotes[audit.id] || ""} onChange={(e) => setDossierNotes({ ...dossierNotes, [audit.id]: e.target.value })}
                                  placeholder="APPEND CUSTOM DOSSIER ANNOTATION NOTE..."
                                  className="w-full bg-black border border-slate-900 p-3 text-[10px] font-mono font-black italic uppercase text-slate-300 focus:border-red-600 outline-none"
                                />
                              </div>
                              <div className="space-y-3">
                                <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/results/${audit.id}`, '_blank'); }} className="w-full bg-slate-950 border border-red-600/30 text-red-600 px-10 py-5 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3"><Monitor size={18} /> OPEN ONSCREEN LEDGER</button>
                                <button type="button" onClick={(e) => { e.stopPropagation(); toggleClientAccess(audit); }} className={`w-full px-8 py-4 font-black uppercase text-[10px] tracking-widest transition-all border ${clientHasAccess ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-950 text-slate-400 border-slate-900 hover:text-white'}`}><Shield size={14} /> {clientHasAccess ? "Dossier Unblurred" : "Dossier Blurred"}</button>
                              </div>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
