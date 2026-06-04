"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, 
  Monitor, X, Send, CheckCircle, Clock, Search, BellRing, FileText, Users
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

// 🔗 High-fidelity component tracking channels
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
  const [emails, setEmails] = useState({ exec: "", mgr: "", tech: "", user: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "LEAD" | "TRIANGULATING" | "COMPLETE">("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ROWS_PER_PAGE = 10;

  const [dossierNotes, setDossierNotes] = useState<Record<string, string>>({});
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
    if (statusFilter !== "ALL") query = query.eq('status', statusFilter);
    if (searchTerm.trim() !== "") {
      query = query.or(`org_name.ilike.%${searchTerm}%,lead_email.ilike.%${searchTerm}%`);
    }

    const startRange = currentPage * ROWS_PER_PAGE;
    const endRange = startRange + ROWS_PER_PAGE - 1;

    const { data: audits, count, error } = await query
      .order('created_at', { ascending: false })
      .range(startRange, endRange);

    if (!error && audits) {
      setData(prev => audits.map(newAudit => {
        const spendTimerKey = `${newAudit.id}-ai_spend`;
        const fteTimerKey = `${newAudit.id}-roi_pct`;
        if (debounceTimersRef.current[spendTimerKey] || debounceTimersRef.current[fteTimerKey]) {
          const match = prev.find(p => p.id === newAudit.id);
          if (match) return { ...newAudit, ai_spend: match.ai_spend, roi_pct: match.roi_pct };
        }
        return newAudit;
      }));
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
      setEmails({ exec: "", mgr: "", tech: "", user: "" });
      fetchLedger();
    } catch (err: any) { 
      alert(err.message); 
    } finally { 
      setIsUpdating(false); 
    }
  };

  const triggerNudge = async (targetRoleKey: string, auditRecord: any) => {
    const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === targetRoleKey);
    if (!node || !node.email) return alert("NUDGE ERROR: RECIPIENT ROUTE NOT IDENTIFIED.");
    setIsUpdating(true);
    try {
      const res = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: auditRecord.id, orgName: auditRecord.org_name, parentAuditId: auditRecord.id, emails: { [targetRoleKey]: node.email } })
      });
      if (res.ok) alert(`NUDGE SUCCESS: REMINDER DISPATCHED TO ${node.email}`);
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
      if (res.ok) {
        await supabase.from('audits').update({ status: 'COMPLETE' }).eq('id', auditId);
        setExpandedRow(null);
        await fetchLedger();
        alert("SYNTHESIS COMPLETE: STRUCTURAL ANALYSIS RE-CALCULATED.");
      }
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsUpdating(false); 
    }
  };

  const toggleClientAccess = async (audit: any) => {
    setIsUpdating(true);
    try {
      await supabase.from('audits').update({ is_released: !audit.is_released }).eq('id', audit.id);
      await fetchLedger();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLiveSliderChange = async (auditId: string, field: "ai_spend" | "roi_pct", value: number) => {
    setData(prev => prev.map(item => item.id === auditId ? { ...item, [field]: value } : item));
    const key = `${auditId}-${field}`;
    if (debounceTimersRef.current[key]) clearTimeout(debounceTimersRef.current[key]);
    debounceTimersRef.current[key] = setTimeout(async () => {
      await supabase.from('audits').update({ [field]: value }).eq('id', auditId);
      delete debounceTimersRef.current[key];
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
      const interval = setInterval(() => { fetchLedger(); if (expandedRow) refreshActiveNodes(expandedRow); }, 5000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchLedger, expandedRow, refreshActiveNodes]);

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
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden select-none">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 shrink-0"><Activity className="text-red-600 animate-pulse" size={20} /><span className="text-white font-black uppercase italic tracking-[0.1em] text-sm font-mono">FORENSIC COMMAND</span></div>
          <div className="flex gap-1 bg-slate-900 p-1 shrink-0">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP Framework</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 px-10 max-w-[1600px] mx-auto pb-32 italic">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="PARSE BY COMPANY IDENTITY OR LEAD SIGNAL EMAIL..." 
                    className="w-full bg-black border border-slate-800 pl-12 pr-4 py-4 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic placeholder:text-slate-700"
                  />
                </div>
                <div className="flex bg-black border border-slate-800 p-1 gap-1 overflow-x-auto shrink-0">
                  {([
                    { label: "All Assets", value: "ALL" },
                    { label: "Stage 01 Intake", value: "LEAD" },
                    { label: "Stage 02 Triangulation", value: "TRIANGULATING" },
                    { label: "Stage 04 Closing", value: "COMPLETE" }
                  ] as const).map((tab) => (
                    <button 
                      key={tab.value} 
                      onClick={() => setStatusFilter(tab.value)}
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
                  const sfi = audit.sfi_score || 0;
                  const realFractures = audit.fractures || [];
                  const dbDecay = audit.decay_pct || 24;
                  const spend = parseFloat(audit.ai_spend) || 1.2;
                  const fte = audit.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 5;
                  
                  const laborTax = (dbDecay / 100) * 0.4 * (fte * 160000 * 1.3);
                  const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;

                  let playbookHeadline = "PENDING SYSTEM ANALYSIS NODE RECONSTRUCTION";
                  let playbookNarrative = "Multi-node operational telemetry validation parameters require survey response aggregation.";
                  let playbookPitch = "Initialize matrix synthesis override engine to evaluate internal contradiction markers.";
                  let targetTier = "TIER_01 // DRIFT DIAGNOSTICS";

                  if (sfi >= 45) {
                    playbookHeadline = "HIGH ASYMMETRIC TRANSLATION STRAIN";
                    playbookNarrative = `An elevated Systemic Friction score of ${sfi} indicates an Asymmetric Translation Gap. Strategic leaders remain completely disconnected from operational engineering layers.`;
                    playbookPitch = "Introduce permanent automated structural layers to bridge technical execution with corporate governance.";
                    targetTier = "TIER_03 // LOGIC RECONSTRUCTION";
                  } else if (sfi > 0) {
                    playbookHeadline = "OPERATIONAL ABSORPTION MAXIMA";
                    playbookNarrative = `Active logic fractures (${realFractures.length} detected) are concentrating inside mid-tier workflows.`;
                    playbookPitch = "Modernize mid-tier workflows to automate data pipelines and free up critical management bandwidth.";
                    targetTier = "TIER_02 // STRUCTURAL HARDENING";
                  }

                  const cleanStatus = (audit.status || "").toUpperCase();

                  return (
                    <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden italic text-white">
                      <div onClick={() => toggleRow(audit.id)} className="grid grid-cols-12 items-center p-8 cursor-pointer group">
                        <div className="col-span-6 flex items-center gap-6">
                          <div className="bg-slate-900 p-4 border border-slate-800 shrink-0">
                            <Building2 size={24} className={cleanStatus === "COMPLETE" ? "text-green-500" : "text-red-600"} />
                          </div>
                          <div>
                            <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name || "PENDING SIGNAL"}</div>
                            <div className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic break-all">{audit.lead_email}</div>
                          </div>
                        </div>
                        <div className="col-span-4 text-center font-black text-xs tracking-[0.2em] font-mono">
                          ACTIVE STAGE: <span className="text-red-500">
                            {cleanStatus === "COMPLETE" && "04 // BOARDROOM CLOSING"}
                            {cleanStatus === "DIAGNOSTIC_ACTIVE" && "03 // 90-QUESTION DIAGNOSTIC"}
                            {cleanStatus === "BRIDGE_ACTIVE" && "02.5 // SOW FUNDING BRIDGE"}
                            {cleanStatus === "TRIANGULATING" && "02 // 30-QUESTION TRIANGULATION"}
                            {(cleanStatus === "LEAD" || cleanStatus === "") && "01 // CUSTOMER DISCOVERY INTAKE"}
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors">{expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}</div>
                      </div>
                      
                      {expandedRow === audit.id && (
                        <div className="p-10 pt-0 border-t border-slate-900/50 bg-black/10 select-text">
                          <AnimatePresence mode="wait">
                            
                            {/* ========================================================================= */}
                            {/* 🟩 STAGE 01: INITIAL CUSTOMER DISCOVERY INTAKE (12-QUESTIONS)             */}
                            {/* ========================================================================= */}
                            {(cleanStatus === "LEAD" || cleanStatus === "") && (
                              <motion.div key="stage-01" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4">
                                <span className="text-[10px] text-red-500 font-mono font-black tracking-[0.2em] block mb-4">// STAGE 01 // INITIAL ACCOUNT INTAKE & 12-QUESTION HOOK</span>
                                
                                <div className="border border-slate-900 bg-slate-950 p-6 mb-4 space-y-6">
                                  <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase block">// PRESENTATION ECONOMIC FOOTPRINT CALIBRATION</span>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">ANNUAL SYSTEM SOFTWARE SPEND:</span><span className="text-red-500 font-black">${spend.toFixed(1)}M</span></div>
                                      <input type="range" min="0.1" max="25.0" step="0.1" value={spend} onChange={(e) => handleLiveSliderChange(audit.id, "ai_spend", parseFloat(e.target.value))} className="w-full accent-red-600 bg-slate-900 h-1.5 cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">IMPACTED WORKFORCE SCALE (FTES):</span><span className="text-red-500 font-black">{fte} PEOPLE</span></div>
                                      <input type="range" min="1" max="250" step="1" value={fte} onChange={(e) => handleLiveSliderChange(audit.id, "roi_pct", parseInt(e.target.value))} className="w-full accent-red-600 bg-slate-900 h-1.5 cursor-pointer" />
                                    </div>
                                  </div>
                                </div>

                                <div className="border border-slate-900 bg-slate-950 p-6 mb-6 font-mono text-xs space-y-3">
                                  <div className="text-[10px] text-slate-500 font-black tracking-widest block mb-2">// INTRODUCTORY FIXED_ECONOMIC_LEAKAGE_LEDGER</div>
                                  <div className="flex justify-between"><span className="text-slate-600">ESTIMATED CORE REWORK LABOR TAX:</span><span className="text-white font-black">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})} / YR</span></div>
                                  <div className="flex justify-between"><span className="text-slate-600">FORENSIC RISK INACTION EXPOSURE:</span><span className="text-white font-black">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})} / YR</span></div>
                                  <div className="flex justify-between border-t border-slate-900 pt-2 text-sm"><span className="text-slate-400 font-black">TOTAL ESTIMATED RUN-RATE TAX LEAKAGE:</span><span className="text-red-600 font-black">${(laborTax + exposure).toLocaleString(undefined, {maximumFractionDigits:0})} / YR</span></div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between bg-slate-950/60 border border-slate-900 p-6 mb-6 gap-4">
                                  <div>
                                    <span className="text-[10px] text-slate-500 font-mono tracking-wider block">// CLIENT PRIVILEGE ACCESS PROTOCOL</span>
                                    <h4 className="text-xs font-black text-white mt-1 uppercase">Dossier Presentation Visibility Shield</h4>
                                  </div>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); toggleClientAccess(audit); }} className={`px-8 py-4 text-[10px] tracking-widest font-black uppercase transition-all border ${clientHasAccess ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700' : 'bg-red-600 text-white border-red-500 hover:bg-white hover:text-black'}`}>
                                    {clientHasAccess ? "✔ CLIENT DOSSIER VIEWABLE" : "✘ Shield Dossier (Blur Portal Access)"}
                                  </button>
                                </div>

                                <div className="flex gap-4">
                                  <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="bg-red-600 text-white px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2"><Mail size={14} /> Initialize & Launch 3-Node 360 Dive</button>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/results/${audit.id}`, '_blank'); }} className="bg-slate-950 border border-slate-800 text-slate-400 px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:border-white transition-all"><Monitor size={14} /> Open Discovery Screen Ledger</button>
                                </div>
                              </motion.div>
                            )}

                            {/* ========================================================================= */}
                            {/* 🟨 STAGE 02: 30-QUESTION CORE TRIANGULATION DIAGNOSTIC WEDGE (PAID GATE 1) */}
                            {/* ========================================================================= */}
                            {cleanStatus === "TRIANGULATING" && (
                              <motion.div key="stage-02" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4">
                                <span className="text-[10px] text-yellow-500 font-mono font-black tracking-[0.2em] block mb-4">// STAGE 02 // 30-QUESTION TARGETED DIAGNOSTIC WEDGE (MANAGEMENT TRIANGULATION)</span>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                  {[
                                    { label: 'NODE 01 // STRATEGY & RISK', key: 'EXECUTIVE', icon: <Building2 size={14} />, inspects: 'Corporate Objectives & AI Risk Safeguards' },
                                    { label: 'NODE 02 // LOGIC TRANSLATION', key: 'MANAGERIAL', icon: <FileText size={14} />, inspects: 'Operational Hand-offs & Data Pipelines' },
                                    { label: 'NODE 03 // CORE EXECUTION', key: 'TECHNICAL', icon: <Binary size={14} />, inspects: 'Software Infrastructure & Code Implementations' }
                                  ].map((role) => {
                                    const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role.key);
                                    const isDone = node?.status?.toLowerCase() === 'completed';
                                    return (
                                      <div key={role.label} className="border-2 border-slate-900 p-6 bg-slate-950/40 relative min-h-[140px] flex flex-col justify-between group/node">
                                        <div className="flex justify-between border-b border-slate-900/40 pb-2">
                                          <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase flex items-center gap-1.5">{role.icon} {role.label}</span>
                                          {!isDone && <button type="button" onClick={(e) => { e.stopPropagation(); triggerNudge(role.key, audit); }} className="text-red-500 hover:text-white transition-all"><BellRing size={12} className="animate-bounce" /></button>}
                                        </div>
                                        <div className="my-2 py-1 text-xs normal-case font-sans font-normal text-slate-400"><strong>Targeting:</strong> {role.inspects}</div>
                                        <div className="border-t border-slate-900/60 pt-3 flex justify-between items-center"><span className="text-[9px] font-mono text-slate-600">// NODE STATE:</span><span className={`font-mono text-xs font-black ${isDone ? 'text-green-500' : 'text-amber-500 animate-pulse'}`}>{isDone ? '✔ TELEMETRY_LOCKED' : '⏳ AWAITING_OPERATOR_INPUT'}</span></div>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                <div className="bg-slate-950 border border-slate-900 p-6 flex justify-between items-center">
                                  <div>
                                    <span className="text-[10px] font-mono block text-slate-500">// ALIGNMENT COMMITTAL EDGE</span>
                                    <h4 className="text-sm font-black text-white mt-1 uppercase">Compile Management Gaps & Unlock Boardroom Proposal Bridge</h4>
                                  </div>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); advanceToStageThreeBridge(audit.id); }} className="bg-yellow-600 hover:bg-white text-black font-black font-mono text-[10px] tracking-widest px-6 py-4 uppercase border border-yellow-600">
                                    Advance to Boardroom Proposal Bridge
                                  </button>
                                </div>
                              </motion.div>
                            )}

                            {/* ========================================================================= */}
                            {/* 🟦 STAGE 03: BOARDROOM PROPOSAL PRESENTATION & SOW CLOSING BRIDGE          */}
                            {/* ========================================================================= */}
                            {cleanStatus === "BRIDGE_ACTIVE" && (
                              <motion.div key="stage-03" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4 space-y-6">
                                <span className="text-[10px] text-blue-500 font-mono font-black tracking-[0.2em] block">// STAGE 03 // BOARDROOM PRESENTATION & SOW FUNDING CLOSING BRIDGE</span>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                  <div className="lg:col-span-5 border border-slate-900 bg-slate-950 p-6 font-mono text-xs space-y-3">
                                    <div className="text-[10px] text-slate-500 font-black tracking-widest block mb-2">// INITIAL_FRICTION_MARKERS_LEDGER</div>
                                    <div className="flex justify-between"><span className="text-slate-600">MANAGEMENT FRICTION INDEX:</span><span className="text-red-500 font-black">CALCULATING GAP VARIANCE</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">ESTIMATED RUN-RATE TAX:</span><span className="text-white font-black">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">INACTION RISK EXPOSURE:</span><span className="text-white font-black">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                  </div>
                                  <div className="lg:col-span-7 border border-slate-900 bg-slate-950 p-6 flex flex-col justify-between">
                                    <div>
                                      <span className="text-[10px] font-mono font-black text-slate-500 tracking-widest block mb-1">// CIO_BOARDROOM_DELIVERY_SCRIPT</span>
                                      <div className="text-xl font-black text-white uppercase">{playbookHeadline}</div>
                                      <p className="text-xs leading-relaxed font-sans text-slate-400 normal-case mt-2">{playbookNarrative}</p>
                                    </div>
                                    <div className="bg-black/40 border border-slate-900 p-3 font-mono text-[11px] text-yellow-600 mt-4">"{playbookPitch}"</div>
                                  </div>
                                </div>

                                <div className="bg-white text-black p-8 border-l-[16px] border-slate-900 shadow-2xl space-y-6 font-sans">
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-4 gap-2">
                                    <div><span className="text-xs font-mono tracking-widest text-red-600 font-black uppercase">// SECURED_FUNDING_PROPOSAL_MAPPING</span><h3 className="text-2xl font-black tracking-tighter text-black mt-1">RECOMMENDED STATEMENT OF WORK</h3></div>
                                    <span className="text-[10px] font-mono text-slate-400 font-black uppercase">{targetTier}</span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {realFractures.slice(0, 3).map((frac: any, index: number) => (
                                      <div key={frac.id} className="border border-slate-100 bg-slate-50/60 p-5 space-y-2">
                                        <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase">PHASE 0{index + 1} // {frac.severity} RISK</span>
                                        <h5 className="text-sm font-black text-slate-900 uppercase">{frac.directive.replace("Implement ", "")}</h5>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-900/60 gap-4 font-mono">
                                  <div className="flex gap-4 p-2 bg-black/40 border border-slate-900 text-[10px] font-black uppercase tracking-wider">
                                    <button type="button" onClick={async (e) => { e.stopPropagation(); await supabase.from('audits').update({ sow_sent: !audit.sow_sent }).eq('id', audit.id); fetchLedger(); }} className={`px-4 py-2 border transition-all ${audit.sow_sent ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-500 border-slate-800 hover:text-white'}`}>MARK PROPOSAL SENT: {audit.sow_sent ? "✔ TRUE" : "✘ FALSE"}</button>
                                  </div>
                                  <div className="flex gap-4">
                                    <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/api/generate-pdf?id=${audit.id}`, "_blank"); }} className="bg-slate-950 border border-slate-800 text-slate-400 px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:border-white transition-all"><FileText size={14} /> Export Board Pitch (PDF)</button>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); advanceToStageFourCapstone(audit.id); }} className="bg-blue-600 text-white px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2">
                                      <Zap size={14} /> Unlock Stage 04 Forensic Capstone
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* ========================================================================= */}
                            {/* 🟪 STAGE 04: THE 90-QUESTION FORENSIC CAPSTONE EVENT (PAID GATE 2)        */}
                            {/* ========================================================================= */}
                            {cleanStatus === "DIAGNOSTIC_ACTIVE" && (
                              <motion.div key="stage-04" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4 space-y-6">
                                <span className="text-[10px] text-purple-500 font-mono font-black tracking-[0.2em] block">// STAGE 04 // 90-QUESTION CAPSTONE DIAGNOSTIC ENGINE (4-WAY VARIANCE MAPPING)</span>
                                
                                <div className="my-4">
                                  <FidelityMetricsStrip auditId={audit.id} />
                                </div>

                                <div className="my-4">
                                  <CentralCommandCockpit initialAuditId={audit.id} initialGroupId={audit.id} initialOrgName={audit.org_name} onSuccess={() => { runSynthesis(audit.id); }} />
                                </div>
                              </motion.div>
                            )}

                            {/* ========================================================================= */}
                            {/* 🟦 STAGE 04.5: FINALIZED CLEAN-ROOM ARCHITECTURE CONTAINER DELIVERABLES    */}
                            {/* ========================================================================= */}
                            {cleanStatus === "COMPLETE" && (
                              <motion.div key="stage-04-complete" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-10 pb-4 space-y-6">
                                <span className="text-[10px] text-emerald-500 font-mono font-black tracking-[0.2em] block">// FINAL DELIVERABLE // CLEAN-ROOM REFERENCE ARCHITECTURE CONTAINER SPEC</span>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                  <div className="lg:col-span-5 border border-slate-900 bg-slate-950 p-6 font-mono text-xs space-y-3">
                                    <div className="text-[10px] text-slate-500 font-black tracking-widest block mb-2">// FINALIZED_VERIFIED_ECONOMIC_LEAKAGE</div>
                                    <div className="flex justify-between"><span className="text-slate-600">SYSTEMIC_FRICTION_INDEX:</span><span className="text-red-500 font-black">{sfi} / 100 SFI</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">VERIFIED LOGIC FRACTURES:</span><span className="text-white font-black">{realFractures.length} VARIANCE_NODES</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">ANNUAL_REWORK_TAX:</span><span className="text-white font-black">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">FORENSIC_INACTION_EXPOSURE:</span><span className="text-white font-black">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                    <div className="flex justify-between border-t border-slate-900 pt-2 text-sm"><span className="text-slate-400 font-black">TOTAL EXPENSE LEAKAGE RECOVERED:</span><span className="text-red-600 font-black">${(laborTax + exposure).toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                  </div>
                                  <div className="lg:col-span-7 border border-slate-900 bg-slate-950 p-6 flex flex-col justify-between">
                                    <div>
                                      <span className="text-[10px] font-mono font-black text-slate-500 tracking-widest block mb-1">// PROVEN_GROUND_TRUTH_USER_WORKAROUNDS</span>
                                      <div className="text-xl font-black text-white uppercase">4-WAY VARIANCE TELEMETRY SYNTHESIZED</div>
                                      <p className="text-xs leading-relaxed font-sans text-slate-400 normal-case mt-2">Shadow infrastructure, manual spreadsheets, and governance logic fractures have been mapped cleanly into an isolated enterprise reference container.</p>
                                    </div>
                                    <div className="bg-black/40 border border-slate-900 p-3 font-mono text-[11px] text-emerald-500 mt-4">// DELIVERY SPECIFICATION: NOMINAL ISOLATED NETWORK CONTAINER PROVISIONED.</div>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-900/60 gap-4 font-mono">
                                  <button type="button" onClick={async (e) => { e.stopPropagation(); await supabase.from('audits').update({ is_paid: !audit.is_paid }).eq('id', audit.id); fetchLedger(); }} className={`px-6 py-4 border text-[10px] tracking-widest transition-all ${audit.is_paid ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-500 border-slate-800 hover:text-white'}`}>MARK CONTRACT REVENUE PAID: {audit.is_paid ? "✔ PAID" : "✘ PENDING"}</button>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/api/generate-pdf?id=${audit.id}`, "_blank"); }} className="bg-white text-black px-8 py-5 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2"><FileText size={14} /> EXPORT CLEAN-ROOM REFERENCE BLUEPRINT (PDF)</button>
                                </div>
                              </motion.div>
                            )}

                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {totalCount > ROWS_PER_PAGE && (
                <div className="flex items-center justify-between bg-slate-950 p-6 border border-slate-900 text-slate-500 font-mono text-[10px] uppercase tracking-wider mt-4">
                  <div>SHOWING {currentPage * ROWS_PER_PAGE + 1} - {Math.min((currentPage + 1) * ROWS_PER_PAGE, totalCount)} OF {totalCount} ACTIVE RECORDS</div>
                  <div className="flex gap-2">
                    <button type="button" disabled={currentPage === 0} onClick={() => setCurrentPage(p => Math.max(0, p - 1))} className="px-4 py-2 border border-slate-800 hover:border-white disabled:opacity-20 disabled:hover:border-slate-800 transition-all text-white font-black">PREV</button>
                    <button type="button" disabled={(currentPage + 1) * ROWS_PER_PAGE >= totalCount} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 border border-slate-800 hover:border-white disabled:opacity-20 disabled:hover:border-slate-800 transition-all text-white font-black">NEXT</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
