"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, 
  Monitor, X, Send, CheckCircle, Search, BellRing, FileText, Plus
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

import CentralCommandCockpit from "../../components/CentralCommandCockpit";
import { FidelityMetricsStrip } from "../../components/FidelityMetricsStrip";

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
  const [statusFilter, setStatusFilter] = useState<"ALL" | "LEAD" | "TRIANGULATING" | "BRIDGE_ACTIVE" | "DIAGNOSTIC_ACTIVE" | "COMPLETE">("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ROWS_PER_PAGE = 10;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newSector, setNewSector] = useState<"finance" | "healthcare" | "enterprise">("finance");

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
      if (statusFilter === "LEAD") {
        query = query.in('status', ['LEAD', 'lead', 'Stage 1', 'STAGE_1', 'INTAKE', '']);
      } else if (statusFilter === "TRIANGULATING") {
        query = query.in('status', ['TRIANGULATING', 'triangulating', 'Stage 2', 'STAGE_2']);
      } else if (statusFilter === "BRIDGE_ACTIVE") {
        query = query.in('status', ['BRIDGE_ACTIVE', 'bridge_active', 'Stage 3', 'STAGE_3']);
      } else if (statusFilter === "DIAGNOSTIC_ACTIVE") {
        query = query.in('status', ['DIAGNOSTIC_ACTIVE', 'diagnostic_active', 'Stage 4', 'STAGE_4']);
      } else if (statusFilter === "COMPLETE") {
        query = query.in('status', ['COMPLETE', 'COMPLETED', 'completed']);
      }
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
          const spendTimerKey = `${newAudit.id}-ai_spend`;
          const fteTimerKey = `${newAudit.id}-roi_pct`;
          const isUserActivelySliding = debounceTimersRef.current[spendTimerKey] || debounceTimersRef.current[fteTimerKey];
          if (isUserActivelySliding) {
            const currentMatch = prev.find(p => p.id === newAudit.id);
            if (currentMatch) {
              return { ...newAudit, ai_spend: currentMatch.ai_spend, roi_pct: currentMatch.roi_pct };
            }
          }
          return newAudit;
        });
      });
      setTotalCount(count || 0);
    }
  }, [statusFilter, searchTerm, currentPage, isUpdating]);

  const handleCreateNewAuditRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim() || !newLeadEmail.trim() || isUpdating) return;
    setIsUpdating(true);
    try {
      const { data: newRecord, error } = await supabase
        .from('audits')
        .insert([
          {
            org_name: newOrgName.trim(),
            lead_email: newLeadEmail.trim().toLowerCase(),
            sector: newSector,
            status: 'LEAD',
            is_released: false,
            decay_pct: 24,
            ai_spend: 1.2,
            roi_pct: 6,
            sfi_score: 0 // Explicitly set to zero on fresh intake creation
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setIsCreateModalOpen(false);
      setNewOrgName("");
      setNewLeadEmail("");
      await fetchLedger();
      if (newRecord?.id) toggleRow(newRecord.id);
    } catch (err: any) {
      alert(`INTAKE INITIALIZATION ERROR: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

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
      const res = await fetch('/api/dispatch-directives', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: selectedAudit.id, 
          orgName: selectedAudit.org_name,
          parentAuditId: selectedAudit.id,
          emails: { EXECUTIVE: emails.exec.trim(), MANAGERIAL: emails.mgr.trim(), TECHNICAL: emails.tech.trim() }
        })
      });
      if (!res.ok) throw new Error("Dispatch Failed");
      await supabase.from('audits').update({ status: 'TRIANGULATING' }).eq('id', selectedAudit.id);
      setSelectedAudit(null);
      setEmails({ exec: "", mgr: "", tech: "" });
      fetchLedger();
    } catch (err: any) { alert(err.message); } finally { setIsUpdating(false); }
  };

  const triggerNudge = async (targetRoleKey: string, auditRecord: any) => {
    const matchingNode = nodeDetails.find(n => n.persona_type?.toUpperCase() === targetRoleKey);
    if (!matchingNode || !matchingNode.email) return;
    setIsUpdating(true);
    try {
      const formattedPayload: Record<string, string> = {};
      formattedPayload[targetRoleKey] = matchingNode.email;
      await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: auditRecord.id, orgName: auditRecord.org_name, parentAuditId: auditRecord.id, emails: formattedPayload })
      });
    } catch (err) { console.error(err); } finally { setIsUpdating(false); }
  };

  const runSynthesis = async (auditId: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/synthesize-fracture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId })
      });
      if (res.ok) {
        // 🟢 FIXED SURGICALLY: Changed legacy payload from COMPLETE to LEAD initialization specs
        await supabase.from('audits').update({ status: 'LEAD', sfi_score: 0 }).eq('id', auditId);
        setExpandedRow(null);
        await fetchLedger();
      }
    } catch (err) { console.error(err); } finally { setIsUpdating(false); }
  };

  const toggleClientAccess = async (audit: any) => {
    setIsUpdating(true);
    try {
      await supabase.from('audits').update({ is_released: !audit.is_released }).eq('id', audit.id);
      await fetchLedger();
    } catch (err) { console.error(err); } finally { setIsUpdating(false); }
  };

  const handleLiveSliderChange = async (auditId: string, field: "ai_spend" | "roi_pct", value: number) => {
    setData(prev => prev.map(item => item.id === auditId ? { ...item, [field]: value } : item));
    const targetTimerKey = `${auditId}-${field}`;
    if (debounceTimersRef.current[targetTimerKey]) clearTimeout(debounceTimersRef.current[targetTimerKey]);
    debounceTimersRef.current[targetTimerKey] = setTimeout(async () => {
      try {
        await supabase.from('audits').update({ [field]: value }).eq('id', auditId);
      } catch (err) { console.error(err); }
    }, 120);
  };

  const advanceToStageThreeBridge = async (auditId: string) => {
    setIsUpdating(true);
    try {
      await supabase.from('audits').update({ status: 'BRIDGE_ACTIVE' }).eq('id', auditId);
      await fetchLedger();
    } catch (err) { console.error(err); } finally { setIsUpdating(false); }
  };

  const advanceToStageFourCapstone = async (auditId: string) => {
    setIsUpdating(true);
    try {
      await supabase.from('audits').update({ status: 'DIAGNOSTIC_ACTIVE' }).eq('id', auditId);
      await fetchLedger();
    } catch (err) { console.error(err); } finally { setIsUpdating(false); }
  };

  useEffect(() => { setCurrentPage(0); }, [searchTerm, statusFilter]);
  useEffect(() => {
    if (isAuthenticated) {
      fetchLedger();
      const interval = setInterval(() => { fetchLedger(); }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchLedger]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <form onSubmit={handleSignIn} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center shadow-2xl relative italic">
          <Key className="text-red-600 mx-auto mb-10" size={64} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="OPERATOR EMAIL" className="w-full bg-black border border-slate-800 p-4 text-center text-white font-mono mb-4 outline-none uppercase text-xs tracking-widest" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="SECURE PASSKEY" className="w-full bg-black border border-slate-800 p-4 text-center text-red-600 font-black outline-none tracking-[0.5em] text-xl" />
          <button type="submit" className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all">INITIALIZE COMMAND</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden select-none">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3"><Activity className="text-red-600" size={20} /><span className="text-white font-black text-sm font-mono">FORENSIC COMMAND</span></div>
          <div className="flex gap-1 bg-slate-900 p-1">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] uppercase tracking-widest font-mono ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] uppercase tracking-widest font-mono ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500'}`}>IP Framework</button>
          </div>
        </div>
        <button onClick={() => setIsCreateModalOpen(true)} className="bg-red-600 text-white px-5 py-2.5 font-mono text-[10px] font-black tracking-widest flex items-center gap-2 border border-red-500 hover:bg-white hover:text-black transition-all">
          <Plus size={14} /> INITIALIZE INTAKE ASSET
        </button>
      </nav>

      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative italic">
              <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-6 right-6 text-slate-500"><X size={24}/></button>
              <h2 className="text-4xl font-black text-white mb-2 tracking-tighter leading-none">INITIALIZE NEW INTAKE ASSET</h2>
              <form onSubmit={handleCreateNewAuditRecord} className="space-y-4 mt-10 text-left">
                <input required placeholder="COMPANY NAME / IDENTITY" value={newOrgName} onChange={(e) => setNewOrgName(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-800 p-4 text-white font-mono text-xs outline-none focus:border-red-600" />
                <input required type="email" placeholder="PRIMARY LEAD SIGNAL EMAIL" value={newLeadEmail} onChange={(e) => setNewLeadEmail(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-800 p-4 text-white font-mono text-xs outline-none focus:border-red-600" />
                <select value={newSector} onChange={(e: any) => setNewSector(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-800 p-4 text-white font-mono text-xs outline-none cursor-pointer">
                  <option value="finance">FINANCIAL SERVICES (0.50 COEFFICIENT)</option>
                  <option value="healthcare">HEALTHCARE PROVIDERS (0.45 COEFFICIENT)</option>
                  <option value="enterprise">ENTERPRISE STANDARD (0.40 COEFFICIENT)</option>
                </select>
                <button type="submit" className="w-full bg-red-600 text-white py-5 font-black uppercase text-xs tracking-widest">DEPLOY LOCKED INTAKE ASSET</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500"><X size={24}/></button>
              <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">ASSIGN STAKEHOLDER EMAILS</h2>
              <div className="space-y-4 mt-10 text-left">
                <input placeholder="EXECUTIVE STAKEHOLDER EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white font-mono text-xs outline-none" />
                <input placeholder="MANAGERIAL STAKEHOLDER EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white font-mono text-xs outline-none" />
                <input placeholder="TECHNICAL STAKEHOLDER EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white font-mono text-xs outline-none" />
                <button onClick={triggerActivation} className="w-full bg-red-600 text-white py-6 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2"><Send size={18} /> GENERATE ACCESS KEYS</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-40 px-10 max-w-[1600px] mx-auto pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              
              <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-slate-950 p-4 border border-slate-900">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="PARSE BY COMPANY IDENTITY OR LEAD SIGNAL EMAIL..." className="w-full bg-black border border-slate-800 pl-12 pr-4 py-4 text-white font-mono text-xs focus:border-red-600 outline-none placeholder:text-slate-600" />
                </div>
              </div>

              {data.length === 0 ? (
                <div className="text-center p-20 border border-slate-900 font-mono text-xs text-slate-600 uppercase tracking-widest">No corresponding records found.</div>
              ) : (
                data.map((audit) => {
                  const clientHasAccess = !!audit.is_released;
                  const sfi = audit.sfi_score || 0;
                  const realFractures = audit.fractures || [];
                  const dbDecay = audit.decay_pct || 24;
                  const spend = parseFloat(audit.ai_spend) || 1.2;
                  const fte = audit.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 5;
                  const laborMultiplier = audit.sector === 'finance' ? 0.5 : audit.sector === 'healthcare' ? 0.45 : 0.4;
                  const laborTax = (dbDecay / 100) * laborMultiplier * (fte * 160000 * 1.3);
                  const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;

                  let playbookHeadline = "OPERATIONAL ASYMMETRIC FRICTION DETECTED";
                  let playbookNarrative = "Multi-node operational telemetry indicates systemic variance challenges structural communication lines across layers.";
                  let playbookPitch = "Initialize matrix synthesis override engine to evaluate internal contradiction markers.";
                  let targetTier = "TIER_02 // STRUCTURAL HARDENING";

                  if (sfi >= 45) {
                    playbookHeadline = "HIGH ASYMMETRIC TRANSLATION STRAIN";
                    playbookNarrative = `An elevated Systemic Friction score of ${sfi} indicates an Asymmetric Translation Gap.`;
                    playbookPitch = "Introduce permanent automated structural layers to bridge technical execution with corporate governance.";
                    targetTier = "TIER_03 // LOGIC RECONSTRUCTION";
                  }

                  // 🛡️ DYNAMIC DATA CHECKPOINT: Force Stage 01 if SFI has not been generated yet
                  let cleanStatus = "LEAD";
                  const rawStatus = (audit.status || "").toUpperCase().trim();
                  
                  if (sfi > 0) {
                    if (rawStatus === "TRIANGULATING") cleanStatus = "TRIANGULATING";
                    else if (rawStatus === "BRIDGE_ACTIVE") cleanStatus = "BRIDGE_ACTIVE";
                    else if (rawStatus === "DIAGNOSTIC_ACTIVE") cleanStatus = "DIAGNOSTIC_ACTIVE";
                    else if (rawStatus === "COMPLETE" || rawStatus === "COMPLETED") cleanStatus = "COMPLETE";
                  } else {
                    cleanStatus = "LEAD";
                  }

                  return (
                    <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden text-white">
                      <div onClick={() => toggleRow(audit.id)} className="grid grid-cols-12 items-center p-8 cursor-pointer group">
                        <div className="col-span-6 flex items-center gap-6">
                          <div className="bg-slate-900 p-4 border border-slate-800 shrink-0">
                            <Building2 size={24} className={cleanStatus === "COMPLETE" ? "text-green-500" : "text-red-600"} />
                          </div>
                          <div>
                            <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name || "PENDING SIGNAL"}</div>
                            <div className="text-[10px] text-slate-600 font-mono mt-2 break-all">{audit.lead_email}</div>
                          </div>
                        </div>
                        <div className="col-span-4 text-center font-black text-xs tracking-[0.2em] font-mono">
                          ACTIVE LIFECYCLE STAGE: <span className="text-red-500">
                            {(() => {
                              switch (cleanStatus) {
                                case "COMPLETE": return "04.5 // ARCHITECTURE DELIVERED";
                                case "DIAGNOSTIC_ACTIVE": return "04 // 90-QUESTION CAPSTONE AUDIT";
                                case "BRIDGE_ACTIVE": return "03 // BOARDROOM PROPOSAL BRIDGE";
                                case "TRIANGULATING": return "02 // 30-QUESTION DIAGNOSTIC WEDGE";
                                case "LEAD":
                                default: return "01 // CUSTOMER DISCOVERY INTAKE";
                              }
                            })()}
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-end text-slate-800 group-hover:text-red-600">{expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}</div>
                      </div>
                      
                      {expandedRow === audit.id && (
                        <div className="p-10 pt-0 border-t border-slate-900/50 bg-black/10 select-text">
                          <AnimatePresence mode="wait">
                            {(() => {
                              switch(cleanStatus) {
                                case "LEAD":
                                  return (
                                    <motion.div key="stage-01" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4">
                                      <span className="text-[10px] text-red-500 font-mono font-black tracking-[0.2em] block mb-4">// STAGE 01 // INITIAL ACCOUNT INTAKE</span>
                                      <div className="border border-slate-900 bg-slate-950 p-6 mb-4 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                          <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">ANNUAL SPEND:</span><span className="text-red-500 font-black">${spend.toFixed(1)}M</span></div>
                                            <input type="range" min="0.1" max="25.0" step="0.1" value={spend} onChange={(e) => handleLiveSliderChange(audit.id, "ai_spend", parseFloat(e.target.value))} className="w-full accent-red-600 bg-slate-900 h-1.5" />
                                          </div>
                                          <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">WORKFORCE SCALE:</span><span className="text-red-500 font-black">{fte} FTES</span></div>
                                            <input type="range" min="1" max="250" step="1" value={fte} onChange={(e) => handleLiveSliderChange(audit.id, "roi_pct", parseInt(e.target.value))} className="w-full accent-red-600 bg-slate-900 h-1.5" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="border border-slate-900 bg-slate-950 p-6 mb-6 font-mono text-xs space-y-2">
                                        <div className="flex justify-between"><span className="text-slate-600">CORE REWORK LABOR TAX:</span><span className="text-white font-black">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})} / YR</span></div>
                                        <div className="flex justify-between"><span className="text-slate-600">RISK INACTION EXPOSURE:</span><span className="text-white font-black">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})} / YR</span></div>
                                      </div>
                                      <div className="flex flex-wrap items-center justify-between bg-slate-950/60 border border-slate-900 p-6 mb-6">
                                        <span className="text-xs font-black text-white">Dossier Presentation Visibility Shield</span>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); toggleClientAccess(audit); }} className={`px-8 py-4 text-[10px] font-mono font-black border ${clientHasAccess ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                                          {clientHasAccess ? "✔ CLIENT DOSSIER VIEWABLE" : "✘ Shield Dossier (Blur Portal Access)"}
                                        </button>
                                      </div>
                                      <div className="flex gap-4">
                                        <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="bg-red-600 text-white px-6 py-4 font-black uppercase text-[10px] font-mono tracking-widest flex items-center gap-2"><Mail size={14} /> Initialize & Launch 3-Node 360 Dive</button>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/results/${audit.id}`, '_blank'); }} className="bg-slate-950 border border-slate-800 text-slate-400 px-6 py-4 font-black text-[10px] font-mono tracking-widest"><Monitor size={14} /> Open Discovery Screen Ledger</button>
                                      </div>
                                    </motion.div>
                                  );

                                case "TRIANGULATING":
                                  return (
                                    <motion.div key="stage-02" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4">
                                      <span className="text-[10px] text-yellow-500 font-mono font-black block mb-4">// STAGE 02 // 30-QUESTION TARGETED DIAGNOSTIC WEDGE</span>
                                      <div className="bg-slate-950 border border-slate-900 p-6 flex justify-between items-center">
                                        <span className="text-sm font-black text-white">Compile Management Gaps & Unlock Boardroom Proposal Bridge</span>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); advanceToStageThreeBridge(audit.id); }} className="bg-yellow-600 text-black font-black font-mono text-[10px] tracking-widest px-6 py-4 border border-yellow-600">Advance to Boardroom Proposal Bridge</button>
                                      </div>
                                    </motion.div>
                                  );

                                case "BRIDGE_ACTIVE":
                                  return (
                                    <motion.div key="stage-03" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4 space-y-6">
                                      <span className="text-[10px] text-blue-500 font-mono font-black block mb-4">// STAGE 03 // BOARDROOM PRESENTATION BRIDGE</span>
                                      <div className="flex justify-between items-center font-mono">
                                        <button type="button" onClick={async (e) => { e.stopPropagation(); await supabase.from('audits').update({ sow_sent: !audit.sow_sent }).eq('id', audit.id); fetchLedger(); }} className={`px-4 py-2 border text-[10px] ${audit.sow_sent ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>MARK PROPOSAL SENT: {audit.sow_sent ? "✔ TRUE" : "✘ FALSE"}</button>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); advanceToStageFourCapstone(audit.id); }} className="bg-blue-600 text-white px-6 py-4 font-black uppercase text-[10px] tracking-widest flex items-center gap-2"><Zap size={14} /> Unlock Stage 04 Forensic Capstone</button>
                                      </div>
                                    </motion.div>
                                  );

                                case "DIAGNOSTIC_ACTIVE":
                                  return (
                                    <motion.div key="stage-04" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4 space-y-6">
                                      <span className="text-[10px] text-purple-500 font-mono font-black block mb-4">// STAGE 04 // 90-QUESTION CAPSTONE DIAGNOSTIC ENGINE</span>
                                      <div className="my-4">{audit.id && <FidelityMetricsStrip auditId={audit.id} />}</div>
                                      <div className="my-4">{audit.id && <CentralCommandCockpit initialAuditId={audit.id} initialGroupId={audit.id} initialOrgName={audit.org_name || "PROSPECT"} onSuccess={() => { runSynthesis(audit.id); }} />}</div>
                                    </motion.div>
                                  );

                                case "COMPLETE":
                                  return (
                                    <motion.div key="stage-04-complete" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4 space-y-6">
                                      <span className="text-[10px] text-emerald-500 font-mono font-black block mb-4">// DELIVERED // EXPORT BLUEPRINTS</span>
                                      <div className="flex justify-between pt-6 border-t border-slate-900/60 font-mono">
                                        <button type="button" onClick={async (e) => { e.stopPropagation(); await supabase.from('audits').update({ is_paid: !audit.is_paid }).eq('id', audit.id); fetchLedger(); }} className={`px-6 py-4 border text-[10px] ${audit.is_paid ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>MARK CONTRACT REVENUE PAID: {audit.is_paid ? "✔ PAID" : "✘ PENDING"}</button>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/api/generate-pdf?id=${audit.id}`, "_blank"); }} className="bg-white text-black px-8 py-5 font-black uppercase text-[10px] tracking-widest flex items-center gap-2"><FileText size={14} /> EXPORT CONTAINER SPEC BLUEPRINT (PDF)</button>
                                      </div>
                                    </motion.div>
                                  );
                                  
                                default:
                                  return null;
                              }
                            })()}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </motion.div>
          ) : (
            <motion.div key="frameworks" className="space-y-12">
              <div className="text-slate-500 font-mono text-xs font-black">// REFERENCE MATERIALS LOADED CLEAN-ROOM SPEC</div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
