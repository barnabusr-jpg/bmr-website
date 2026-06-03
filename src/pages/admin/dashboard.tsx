"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, 
  Monitor, X, Send, CheckCircle, Clock, Search, BellRing, FileText, Users
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// 🔗 Strict relative routing back from src/pages/admin/ into global src/components/
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

    let query = supabase
      .from('audits')
      .select('*', { count: 'exact' });

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
          emails: { 
            EXECUTIVE: emails.exec.trim(), 
            MANAGERIAL: emails.mgr.trim(), 
            TECHNICAL: emails.tech.trim(),
            USER: emails.user.trim()
          }
        })
      });
      if (!res.ok) throw new Error("Dispatch Failed");
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
    const matchingNode = nodeDetails.find(n => n.persona_type?.toUpperCase() === targetRoleKey);
    if (!matchingNode || !matchingNode.email) {
      alert("NUDGE ERROR: RECIPIENT NODE ROUTE NOT IDENTIFIED.");
      return;
    }
    
    setIsUpdating(true);
    try {
      const formattedPayload: Record<string, string> = {};
      formattedPayload[targetRoleKey] = matchingNode.email;

      const res = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: auditRecord.id,
          orgName: auditRecord.org_name,
          parentAuditId: auditRecord.id,
          emails: formattedPayload
        })
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
      
      const serverResponse = await res.json();
      
      if (res.ok) {
        setIsUpdating(false);
        const { data: cleanAudit } = await supabase.from('audits').select('*').eq('id', auditId).single();
        if (cleanAudit) {
          setData(prev => prev.map(item => item.id === auditId ? cleanAudit : item));
        }
        alert("SYNTHESIS ROOT LOGIC ENGINE RE-CALCULATED SUCCESSFULLY.");
      } else {
        alert(`SERVER REJECTION: ${serverResponse.error || 'UNEXPECTED SIGNAL OUTAGE'}`);
      }
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsUpdating(false); 
    }
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

  const handleLiveSliderChange = async (auditId: string, field: "ai_spend" | "roi_pct", value: number) => {
    setData(prev => prev.map(item => item.id === auditId ? { ...item, [field]: value } : item));

    const targetTimerKey = `${auditId}-${field}`;
    if (debounceTimersRef.current[targetTimerKey]) {
      clearTimeout(debounceTimersRef.current[targetTimerKey]);
    }

    debounceTimersRef.current[targetTimerKey] = setTimeout(async () => {
      try {
        await supabase
          .from('audits')
          .update({ [field]: value })
          .eq('id', auditId);
        
        delete debounceTimersRef.current[targetTimerKey];
      } catch (err) {
        console.error("LIVE_SLIDER_SYNC_ERROR:", err);
      }
    }, 120);
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
    return () => {
      Object.values(debounceTimersRef.current).forEach(clearTimeout);
    };
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

      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative italic">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
              
              <h2 className="text-4xl font-black uppercase italic text-white mb-2 tracking-tighter text-left leading-none">LAUNCH 3-NODE 360 COGNITIVE DIVE</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1 tracking-wider">ASSIGNING PRIMARY ONBOARDING ROUTES FOR: {selectedAudit.org_name}</p>
              
              <div className="space-y-4 mt-10 text-left">
                <div>
                  <label className="text-[9px] text-slate-500 font-mono tracking-wider block mb-1">NODE 01 // EXECUTIVE TRACK (10-DIAGNOSTIC CRITERIA)</label>
                  <input placeholder="EXECUTIVE LEADERSHIP EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-4 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 font-mono tracking-wider block mb-1">NODE 02 // MANAGERIAL TRACK (10-DIAGNOSTIC CRITERIA)</label>
                  <input placeholder="MANAGERIAL WORKFLOW LEAD EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-4 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 font-mono tracking-wider block mb-1">NODE 03 // TECHNICAL TRACK (10-DIAGNOSTIC CRITERIA)</label>
                  <input placeholder="TECHNICAL SYSTEMS ENGINEER EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-4 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                </div>
                <div className="opacity-30 border-t border-slate-900 pt-4">
                  <label className="text-[9px] text-slate-600 font-mono tracking-wider block mb-1">NODE 04 // OPTIONAL END-USER TELEMETRY (STAGE 2 OVERLAY ONLY)</label>
                  <input placeholder="USER STAKEHOLDER EMAIL (OPTIONAL)" value={emails.user} onChange={(e) => setEmails({...emails, user: e.target.value})} className="w-full bg-slate-950 border border-slate-900 p-4 text-slate-600 uppercase font-mono text-xs outline-none italic cursor-not-allowed" disabled />
                </div>
                
                <button onClick={triggerActivation} disabled={isUpdating} className="w-full bg-red-600 text-white py-6 mt-4 font-black uppercase italic text-xs tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all">
                  {isUpdating ? <Activity className="animate-spin" /> : <Send size={18} />} 
                  {isUpdating ? "DISPATCHING INTAKE BLUEPRINTS..." : "PROVISION LINKS & DISPATCH COGNITIVE DIVE"}
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
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
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
                    playbookNarrative = `An elevated Systemic Friction score of ${sfi} indicates an Asymmetric Translation Gap. Your strategic and operational leaders have built excellent structural frameworks, but a lack of specialized automation infrastructure forces engineering teams to manage edge-cases manually. The team is hyper-capable, but they are absorbing systemic friction at the cost of baseline engineering velocity.`;
                    playbookPitch = "Introduce permanent automated structural layers to bridge technical execution with corporate governance, removing the manual tax on your staff.";
                    targetTier = "TIER_03 // LOGIC RECONSTRUCTION";
                  } else if (sfi > 0) {
                    playbookHeadline = "OPERATIONAL ABSORPTION MAXIMA";
                    playbookNarrative = `Active logic fractures (${realFractures.length} detected) are currently concentrations inside mid-tier workflow operations. Teams are manually routing data dependencies to ensure strategic objectives remain shielded from infrastructure limitations. Both leadership and engineering tracks are functioning well, but the manual hand-offs between them require modern structural hardening.`;
                    playbookPitch = "Modernize mid-tier human-in-the-loop workflows to automate data pipelines and free up critical management bandwidth.";
                    targetTier = "TIER_02 // STRUCTURAL HARDENING";
                  }

                  return (
                    <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden italic text-white">
                      <div onClick={() => toggleRow(audit.id)} className="grid grid-cols-12 items-center p-8 cursor-pointer group">
                        <div className="col-span-6 flex items-center gap-6">
                          <div className="bg-slate-900 p-4 border border-slate-800 shrink-0 italic">
                            <Building2 size={24} className={cleanStatus.includes("COMPLETE") ? "text-green-500" : "text-red-600"} />
                          </div>
                          <div>
                            <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name || "PENDING SIGNAL"}</div>
                            <div className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic break-all">{audit.lead_email}</div>
                          </div>
                        </div>
                        
                        <div className="col-span-4 text-center font-black italic text-xs tracking-[0.2em] font-mono flex items-center justify-center gap-3">
                          {audit.sfi_score >= 45 && (
                            <span className="bg-red-600/10 text-red-500 border border-red-600/30 px-3 py-1 text-[9px] font-mono tracking-widest uppercase block font-black animate-pulse shrink-0">
                              ⚠️ CRITICAL EXPOSURE ALERT
                            </span>
                          )}
                          <span className="text-white">
                            {cleanStatus.includes("COMPLETE") && 'RESULT PUBLISHED'}
                            {cleanStatus === 'LEAD' && 'INTAKE DISCOVERY'}
                            {(cleanStatus.includes("TRIANGULATION") || cleanStatus.includes("TRIANGULATING")) && 'TRIANGULATION ACTIVE'}
                          </span>
                        </div>
                        
                        <div className="col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors italic">{expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}</div>
                      </div>
                      
                      {expandedRow === audit.id && (
                        <div className="p-10 pt-0 border-t border-slate-900/50 bg-black/20 italic text-left select-text">
                          
                          {/* ========================================================================= */}
                          {/* 🟩 STAGE 1: INTAKE & 3-NODE 360 COGNITIVE DIVE DISCOVERY                  */}
                          {/* ========================================================================= */}
                          <div className="pt-10 mb-8 border-b border-slate-900 pb-8">
                            <span className="text-[10px] text-red-500 font-mono font-black tracking-[0.2em] block mb-4">
                              // STAGE 01 // INITIAL ACCOUNT INTAKE & 3-NODE CORE TRIANGULATION
                            </span>
                            
                            {/* Presentation Calibration Sliders */}
                            <div className="border border-slate-900 bg-slate-950 p-6 mb-6 space-y-6">
                              <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase block">// INITIAL PRESENTATION ECONOMIC FOOTPRINT CALIBRATION</span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs font-mono">
                                    <span className="text-slate-500">ANNUAL SYSTEM SOFTWARE SPEND:</span>
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
                                    <span className="text-slate-500">IMPACTED WORKFORCE SCALE (FTES):</span>
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

                            {/* Execution Launch Vectors */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div className="flex gap-4">
                                <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="w-full bg-red-600 text-white px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-md italic font-black">
                                  <Mail size={14} /> Initialize & Launch 3-Node 360 Dive
                                </button>
                                <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/results/${audit.id}`, '_blank'); }} className="bg-slate-950 border border-slate-800 text-slate-400 px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:border-red-600 hover:text-white transition-all flex items-center justify-center gap-3 italic">
                                  <Monitor size={14} /> Open Onscreen Discovery Ledger
                                </button>
                              </div>
                              
                              <div className="text-[10px] font-mono bg-slate-900 text-slate-500 px-3 py-2 border border-slate-800">
                                PIPELINE STATUS: <span className="text-white font-bold">{cleanStatus === "LEAD" ? "DISCOVERY LOCK" : cleanStatus}</span>
                              </div>
                            </div>
                          </div>

                          {/* ========================================================================= */}
                          {/* 🟨 STAGE 2: 30-QUESTION REAL-TIME TELEMETRY MATRIX SENSORS                */}
                          {/* ========================================================================= */}
                          {(cleanStatus.includes("TRIANGULATION") || cleanStatus.includes("TRIANGULATING") || cleanStatus.includes("COMPLETE")) ? (
                            <div className="my-8 border-b border-slate-900 pb-8 animate-fadeIn">
                              <span className="text-[10px] text-yellow-500 font-mono font-black tracking-[0.2em] block mb-4">
                                // STAGE 02 // REAL-TIME 3-NODE SURVEY SENSORS (30 CORE DIAGNOSTIC SECTIONS)
                              </span>

                              {/* Explanatory, human-readable monitoring dashboard cards layout */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 italic">
                                {[
                                  { 
                                    label: 'NODE 01 // STRATEGY & GOVERNANCE', 
                                    key: 'EXECUTIVE', 
                                    icon: <Building2 size={14} />,
                                    inspects: 'Corporate Objectives & AI Risk Safeguards',
                                    criteria: '10 Core Strategy Constraints'
                                  },
                                  { 
                                    label: 'NODE 02 // LOGIC & TRANSLATION', 
                                    key: 'MANAGERIAL', 
                                    icon: <FileText size={14} />,
                                    inspects: 'Operational Hand-offs & Data Pipelines',
                                    criteria: '10 Core Process Constraints'
                                  },
                                  { 
                                    label: 'NODE 03 // SYSTEMS & EXECUTION', 
                                    key: 'TECHNICAL', 
                                    icon: <Binary size={14} />,
                                    inspects: 'Software Infrastructure & Code Implementations',
                                    criteria: '10 Core Engineering Constraints'
                                  }
                                ].map((role) => {
                                  const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role.key);
                                  const isDone = node?.status?.toLowerCase() === 'completed';
                                  return (
                                    <div key={role.label} className="border-2 border-slate-900 p-6 bg-slate-950/40 relative min-h-[160px] flex flex-col justify-between italic group/node">
                                      <div className="flex justify-between items-start w-full border-b border-slate-900/40 pb-2">
                                        <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase flex items-center gap-1.5">
                                          {role.icon} {role.label}
                                        </span>
                                        {!isDone && (
                                          <button 
                                            type="button" disabled={isUpdating}
                                            onClick={(e) => { e.stopPropagation(); triggerNudge(role.key, audit); }}
                                            className="text-red-500 hover:text-white transition-all cursor-pointer block"
                                            title="Resend Access Passkey Nudge"
                                          >
                                            <BellRing size={12} className="animate-bounce" />
                                          </button>
                                        )}
                                      </div>
                                      
                                      {/* Explanatory Context Copy Blocks */}
                                      <div className="my-2 py-1">
                                        <div className="text-[10px] text-slate-400 font-sans tracking-wide normal-case font-medium mb-1">
                                          <strong>Targeting:</strong> {role.inspects}
                                        </div>
                                        <div className="text-[9px] font-mono text-slate-600 tracking-wider">
                                          {role.criteria}
                                        </div>
                                      </div>

                                      <div className="border-t border-slate-900/60 pt-3 flex justify-between items-center w-full">
                                        <span className="text-[9px] font-mono text-slate-600">// STATE:</span>
                                        <div className={`font-mono text-xs uppercase tracking-wider font-black ${isDone ? 'text-green-500' : 'text-amber-500 animate-pulse'}`}>
                                          {isDone ? '✔ TELEMETRY_LOCKED' : '⏳ AWAITING_OPERATOR_INPUT'}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* High-density sub-surface tracking data strip wrapper (90 questions diagnostic metrics) */}
                              <div className="my-4">
                                <FidelityMetricsStrip auditId={audit.id} />
                              </div>

                              {/* Manual Override Engine Panel Controls */}
                              <div className="my-4">
                                <CentralCommandCockpit 
                                  initialAuditId={audit.id}
                                  initialGroupId={audit.id}
                                  initialOrgName={audit.org_name}
                                  onSuccess={() => {
                                    fetchLedger();
                                    refreshActiveNodes(audit.id);
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="my-8 bg-zinc-950/40 border border-dashed border-zinc-900 p-6 text-center font-mono text-[11px] text-zinc-600">
                              // STAGE 02 ACCESS LOCK: DEPLOY AND PROVISION THE 3 CORE TRIANGULATION NODES ABOVE TO UNLOCK LISTENING POSTS
                            </div>
                          )}

                          {/* ========================================================================= */}
                          {/* 🟦 STAGE 3: CLOSING INTEL DOSSIER & GENERATED RECOMMENDATIONS             */}
                          {/* ========================================================================= */}
                          {cleanStatus.includes("COMPLETE") ? (
                            <div className="mt-8 space-y-6 animate-fadeIn">
                              <span className="text-[10px] text-blue-500 font-mono font-black tracking-[0.2em] block mb-4">
                                // STAGE 03 // BOARDROOM PRESENTATION & REVENUE REALIZATION
                              </span>

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
                                <div className="lg:col-span-5 border border-slate-900 bg-slate-950 p-6 space-y-4 font-mono">
                                  <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">// FIXED_ECONOMIC_LEAKAGE_LEDGER</div>
                                  <div className="space-y-3 pt-2 border-t border-slate-900 text-xs">
                                    <div className="flex justify-between"><span className="text-slate-600">SYSTEMIC_FRICTION_INDEX:</span><span className="text-red-500 font-black">{sfi} / 100 SFI</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">ACTIVE_LOGIC_FRACTURES:</span><span className="text-white font-black">{realFractures.length} VARIANCE_NODES</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">ANNUAL_REWORK_TAX:</span><span className="text-white font-black">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">FORENSIC_INACTION_EXPOSURE:</span><span className="text-white font-black">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                    <div className="flex justify-between border-t border-slate-900 pt-2 text-sm"><span className="text-slate-400 font-black">TOTAL EXPENSE LEAKAGE:</span><span className="text-red-600 font-black">${(laborTax + exposure).toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                  </div>
                                </div>

                                <div className="lg:col-span-7 border border-slate-900 bg-slate-950 p-6 flex flex-col justify-between">
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-mono font-black text-slate-500 tracking-widest block">// STRATEGIC_BOARDROOM_DELIVERY_SCRIPT</span>
                                    <div className="text-xl font-black text-white uppercase">{playbookHeadline}</div>
                                    <p className="text-xs leading-relaxed font-sans text-slate-400 normal-case">{playbookNarrative}</p>
                                  </div>
                                  <div className="bg-black/40 border border-slate-900 p-3 font-mono text-[11px] text-yellow-600 mt-4">
                                    "{playbookPitch}"
                                  </div>
                                </div>
                              </div>

                              {/* Dynamic Statement of Work Previews Generated by Fracture Telemetry */}
                              <div className="bg-white text-black p-8 border-l-[16px] border-slate-900 shadow-2xl space-y-6 font-sans">
                                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                  <div>
                                    <span className="text-xs font-mono tracking-widest text-red-600 font-black uppercase">// DEPLOYABLE_PROPOSAL_MAPPING</span>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black mt-1">RECOMMENDED STATEMENT OF WORK</h3>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400 font-black uppercase">{targetTier}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                  {realFractures.length === 0 ? (
                                    <div className="col-span-3 text-center py-6 font-mono text-xs text-slate-400 uppercase tracking-widest">No active structural fractures found. Standard baseline optimizations apply.</div>
                                  ) : (
                                    realFractures.slice(0, 3).map((frac: any, index: number) => (
                                      <div key={frac.id} className="border border-slate-100 bg-slate-50/60 p-5 space-y-2 relative">
                                        <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">PHASE 0{index + 1} // {frac.severity} RISK</span>
                                        <h5 className="text-sm font-black italic text-slate-900 uppercase">{frac.directive.replace("Implement ", "")}</h5>
                                        <p className="text-[11px] font-sans text-slate-500 normal-case leading-relaxed">System recovery initialized via blueprint protocols: {frac.recovery}.</p>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>

                              {/* Closing Gateway Controls & Document Generation Exports */}
                              <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-900/60 gap-4 font-mono">
                                <div className="flex gap-4 p-2 bg-black/40 border border-slate-900 text-[10px] font-black uppercase tracking-wider">
                                  <button 
                                    type="button"
                                    onClick={async (e) => { e.stopPropagation(); const updated = !audit.sow_sent; await supabase.from('audits').update({ sow_sent: updated }).eq('id', audit.id); fetchLedger(); }}
                                    className={`px-4 py-2 border transition-all ${audit.sow_sent ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-500 border-slate-800 hover:text-white'}`}
                                  >
                                    MARK SOW SENT: {audit.sow_sent ? "✔ TRUE" : "✘ FALSE"}
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={async (e) => { e.stopPropagation(); const updated = !audit.is_paid; await supabase.from('audits').update({ is_paid: updated }).eq('id', audit.id); fetchLedger(); }}
                                    className={`px-4 py-2 border transition-all ${audit.is_paid ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-500 border-slate-800 hover:text-white'}`}
                                  >
                                    MARK REVENUE PAID: {audit.is_paid ? "✔ PAID" : "✘ PENDING"}
                                  </button>
                                </div>
                                
                                <div className="flex gap-4">
                                  <button type="button" onClick={(e) => { e.stopPropagation(); toggleClientAccess(audit); }} className={`px-6 py-4 text-[10px] tracking-widest font-black uppercase transition-all border ${clientHasAccess ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-red-600 text-white border-red-500 hover:bg-white hover:text-black'}`}>
                                    {clientHasAccess ? "✔ BLUR DOSSIER" : "✘ UNBLUR DOSSIER ACCESS"}
                                  </button>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/api/generate-pdf?id=${audit.id}`, "_blank"); }} className="bg-white text-black px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-2">
                                    <FileText size={14} /> EXPORT BOARD-READY PITCH (PDF)
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-8 bg-zinc-950/40 border border-dashed border-zinc-900 p-6 text-center font-mono text-[11px] text-zinc-600">
                              // STAGE 03 ACCESS LOCK: FETCH AND PROCESS TELEMETRY MATRICES TO PREVIEW DOSSIER SOW SPECIFICATIONS
                            </div>
                          )}

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
                    <button 
                      type="button"
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                      className="px-4 py-2 border border-slate-800 hover:border-white disabled:opacity-20 disabled:hover:border-slate-800 transition-all text-white font-black"
                    >
                      PREV
                    </button>
                    <button 
                      type="button"
                      disabled={(currentPage + 1) * ROWS_PER_PAGE >= totalCount}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="px-4 py-2 border border-slate-800 hover:border-white disabled:opacity-20 disabled:hover:border-slate-800 transition-all text-white font-black"
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="frameworks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 md:space-y-20 italic">
              <section className="italic">
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4 italic font-black">Public Service Mapping</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 italic font-black">
                  {BMR_IP_SUITE.services.map((s) => (
                    <div key={s.tier} className="p-8 border border-slate-800 bg-slate-900/20 italic">
                      <div className="text-red-600 mb-6 italic">{s.icon}</div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest italic font-black">{s.tier}</span>
                      <h4 className="text-xl md:text-2xl font-black italic uppercase text-white mt-2 mb-4 italic">{s.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-bold leading-relaxed italic normal-case">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="italic">
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4 italic font-black">Proprietary Directives</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 italic font-black">
                  {BMR_IP_SUITE.directives.map((d) => (
                    <div key={d.id} className="p-12 border-2 border-slate-900 bg-slate-950 hover:border-red-600 transition-all group relative overflow-hidden italic">
                      <div className="absolute top-0 right-0 p-4 opacity-10 italic"><Binary className={d.color} size={32} /></div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-10 italic">
                        <div className="space-y-2 italic">
                          <span className={`text-[9px] font-mono font-black tracking-widest ${d.color} italic font-black`}>PROTOCOL // {d.id}</span>
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white italic">{d.label}</h2>
                        </div>
                        {d.price && <div className="bg-red-600 text-white px-4 py-2 text-[10px] font-black italic tracking-widest italic font-black">{d.price}</div>}
                      </div>
                      <p className="text-xl text-slate-400 italic leading-relaxed mb-8 border-l-2 border-slate-800 pl-8 font-medium normal-case">{d.description}</p>
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
