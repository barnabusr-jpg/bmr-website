"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, 
  X, Send, CheckCircle, Clock, Search, BellRing, FileText, Monitor
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
      .select('id, org_name, status, sfi_score, decay_pct, fractures, is_released, ai_spend, roi_pct, created_at, sow_sent, is_paid, sector', { count: 'exact' });

    if (statusFilter !== "ALL") {
      query = query.eq('status', statusFilter);
    }

    if (searchTerm.trim() !== "") {
      query = query.ilike('org_name', `%${searchTerm}%`);
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
    const { data: nodes } = await supabase
      .from('operators')
      .select('persona_type, status, email, survey_completed')
      .eq('audit_id', auditId);
      
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
      setSelectedAudit(null);
      setEmails({ exec: "", mgr: "", tech: "" });
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
        let query = supabase.from('audits').select('id, org_name, status, sfi_score, decay_pct, fractures, is_released, ai_spend, roi_pct, created_at, sow_sent, is_paid, sector').eq('id', auditId).single();
        const { data: cleanAudit } = await query;
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
      if (!selectedAudit) {
        fetchLedger();
      }
      const interval = setInterval(() => { 
        if (!selectedAudit) {
          fetchLedger(); 
          if (expandedRow) refreshActiveNodes(expandedRow); 
        }
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchLedger, expandedRow, refreshActiveNodes, selectedAudit]);

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
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 shrink-0"><Activity className="text-red-600 animate-pulse" size={20} /><span className="text-white font-black uppercase italic tracking-[0.1em] text-sm font-mono">FORENSIC COMMAND</span></div>
          <div className="flex gap-1 bg-slate-900 p-1 shrink-0">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP Framework</button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const activeAudit = data.find(item => item.id === expandedRow);
                
                if (activeAudit) {
                  const entityCode = `${activeAudit.org_name.toUpperCase().replace(/\s+/g, '_')}_GLOBAL`;
                  const targetPillar = (activeAudit.sfi_score || activeAudit.decay_pct) >= 45 ? "AVS" : "IGF"; 
                  
                  const execNode = nodeDetails.find(n => n.persona_type?.toUpperCase() === 'EXECUTIVE');
                  const mgrNode  = nodeDetails.find(n => n.persona_type?.toUpperCase() === 'MANAGERIAL');
                  const techNode = nodeDetails.find(n => n.persona_type?.toUpperCase() === 'TECHNICAL');

                  const execEmail = encodeURIComponent(execNode?.email || "");
                  const techEmail = encodeURIComponent(techNode?.email || "");
                  const opsEmail  = encodeURIComponent(mgrNode?.email || "");
                  const sysEmail  = encodeURIComponent(techNode?.email || ""); 

                  window.open(
                    `/forensic?entity_code=${encodeURIComponent(entityCode)}&pillar=${targetPillar}&exec=${execEmail}&tech_mgmt=${techEmail}&ops_mgmt=${opsEmail}&sys_user=${sysEmail}&auth=admin_verified_secure`, 
                    '_blank'
                  );
                } else {
                  alert("ATTENTION: Please expand an active ledger row below to prime the configuration matrix before initializing the engine.");
                }
              }}
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all border cursor-pointer ${
                expandedRow 
                  ? 'text-red-500 border-red-900/40 bg-red-950/10 animate-pulse' 
                  : 'text-slate-500 border-slate-800 bg-transparent hover:text-slate-300'
              }`}
            >
              Configure Quad-Node Engine
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative italic select-text">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white cursor-pointer"><X size={24}/></button>
              
              <h2 className="text-4xl font-black uppercase italic text-white mb-2 tracking-tighter text-left leading-none">ASSIGN STAKEHOLDER EMAILS</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1 tracking-wider">PROVISIONING ASSOCIATION NODES FOR: {selectedAudit.org_name}</p>
              
              <div className="space-y-4 mt-10 text-left">
                <input placeholder="EXECUTIVE STAKEHOLDER EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                <input placeholder="MANAGERIAL STAKEHOLDER EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                <input placeholder="TECHNICAL STAKEHOLDER EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none italic" />
                
                <button onClick={triggerActivation} disabled={isUpdating} className="w-full bg-red-600 text-white py-6 mt-4 font-black uppercase italic text-xs tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all cursor-pointer">
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

                  const dbDecay = audit.decay_pct || 24;
                  // 🛡️ HARMONIZED TRACKER FALLBACK: Reconciles empty index markers to scale cleanly against Phase 1 entry weights
                  const sfi = audit.sfi_score || dbDecay;
                  const realFractures = audit.fractures || [];
                  const spend = parseFloat(audit.ai_spend) || 1.2;
                  const fte = audit.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 6;
                  
                  const laborMultiplier = audit.sector === 'finance' ? 0.5 : audit.sector === 'healthcare' ? 0.45 : 0.4;
                  const laborTax = (dbDecay / 100) * laborMultiplier * (fte * 160000 * 1.3);
                  
                  // 🧮 HARMONIZED MATHEMATICAL EQUATION: Matching the metric layer with Admin view calculations
                  const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;
                  const totalLeakage = laborTax + exposure;

                  let playbookHeadline = "BALANCED INFRASTRUCTURE STATE";
                  let playbookNarrative = "Operational alignment metrics indicate standard operational velocity. Cross-functional communication tracks are solid, and system parameters are matching organizational intent.";
                  let playbookPitch = "Deploy routine baseline optimization filters to preserve ongoing alignment tracks.";
                  let targetTier = "TIER_01 // DRIFT DIAGNOSTICS";

                  const cleanStatus = (audit.status || "").toUpperCase();
                  
                  if (cleanStatus.includes("TRIANGULATION") || cleanStatus.includes("TRIANGULATING")) {
                    playbookHeadline = "PENDING SYSTEM ANALYSIS NODE RECONSTRUCTION";
                    playbookNarrative = "Multi-node operational telemetry validation parameters are matching initial baseline presets, or require structural evaluation. Click the gold executive engine switch below to compile results or force structural contradiction synthesis.";
                    playbookPitch = "Initialize matrix synthesis override engine to evaluate internal contradiction markers.";
                    targetTier = "TIER_02 // MULTI-NODE TRIANGULATION";
                  } else if (cleanStatus === "ARCHIVED") {
                    playbookHeadline = "RECORD DEACTIVATED // HISTORICAL STORAGE";
                    playbookNarrative = "This architectural record has been formally decommissioned and stored inside server archives. Dynamic metric aggregation timers and client-facing telemetry channels are hard-locked.";
                    playbookPitch = "System metrics are now preserved for permanent historical reference compliance logs.";
                    targetTier = "ARCHIVED VAULT CONTENT";
                  } else if (sfi >= 45) {
                    playbookHeadline = "HIGH ASYMMETRIC TRANSLATION STRAIN";
                    playbookNarrative = `An elevated Systemic Friction score of ${sfi} indicates an Asymmetric Translation Gap. Your strategic and operational leaders have built excellent structural frameworks, but a lack of specialized automation infrastructure forces engineering teams to manage edge-cases manually. The team is hyper-capable, but they are absorbing systemic friction at the cost of baseline engineering velocity.`;
                    playbookPitch = "Introduce permanent automated structural layers to bridge technical execution with corporate governance, removing the manual tax on your staff.";
                    targetTier = "TIER_03 // LOGIC RECONSTRUCTION";
                  } else if (sfi >= 0) {
                    playbookHeadline = "OPERATIONAL ABSORPTION MAXIMA";
                    playbookNarrative = `Active logic fractures (${realFractures.length} detected) are currently concentrating inside mid-tier workflow operations. Teams are manually routing data dependencies to ensure strategic objectives remain shielded from infrastructure limitations. Both leadership and engineering tracks are functioning well, but the manual hand-offs between them require modern structural hardening.`;
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
                            <div className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic break-all">LEAD_RECORD_NODE</div>
                          </div>
                        </div>
                        
                        <div className="col-span-4 text-center font-black italic text-xs tracking-[0.2em] font-mono flex items-center justify-center gap-3">
                          {sfi >= 45 && cleanStatus !== "ARCHIVED" && (
                            <span className="bg-red-600/10 text-red-500 border border-red-600/30 px-3 py-1 text-[9px] font-mono tracking-widest uppercase block font-black animate-pulse shrink-0">
                              ⚠️ CRITICAL EXPOSURE ALERT
                            </span>
                          )}
                          <span className="text-white">
                            {cleanStatus.includes("COMPLETE") && 'RESULT PUBLISHED'}
                            {cleanStatus === 'LEAD' && 'LEAD CAPTURED'}
                            {cleanStatus === 'ARCHIVED' && '📁 ARCHIVED INACTIVE'}
                            {(cleanStatus.includes("TRIANGULATION") || cleanStatus.includes("TRIANGULATING")) && 'TRIANGULATION ACTIVE'}
                          </span>
                        </div>
                        
                        <div className="col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors italic">{expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}</div>
                      </div>
                      
                      {expandedRow === audit.id && (
                        <div className="p-10 pt-0 border-t border-slate-900/50 bg-black/20 italic text-left select-text">
                          <div className="grid grid-cols-3 gap-6 pt-10 mb-8 italic">
                            {[
                              { label: 'EXECUTIVE TRACK', key: 'EXECUTIVE' },
                              { label: 'MANAGERIAL TRACK', key: 'MANAGERIAL' },
                              { label: 'TECHNICAL TRACK', key: 'TECHNICAL' }
                            ].map((role) => {
                              const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role.key);
                              const isDone = node?.survey_completed === true || node?.status?.toLowerCase() === 'completed';
                              
                              return (
                                <div key={role.label} className="border-2 border-slate-900 p-6 bg-slate-950/40 relative min-h-[140px] flex flex-col justify-between italic group/node">
                                  <div className="flex justify-between items-start w-full border-b border-slate-900/40 pb-2">
                                    <span className="text-[9px] font-mono text-slate-600 font-black tracking-widest uppercase">{role.label}</span>
                                    {isDone ? (
                                      <CheckCircle className="text-green-500" size={14}/>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <button 
                                          type="button"
                                          title="Fire Email Reminder Nudge" 
                                          disabled={isUpdating || cleanStatus === "ARCHIVED"}
                                          onClick={(e) => { e.stopPropagation(); triggerNudge(role.key, audit); }}
                                          className="text-red-500 hover:text-white transition-all cursor-pointer opacity-40 group-hover/node:opacity-100 disabled:opacity-10"
                                        >
                                          <BellRing size={12} className={cleanStatus === "ARCHIVED" ? "" : "animate-bounce"} />
                                        </button>
                                        <Clock className="text-slate-700" size={14}/>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="text-center py-4">
                                    <div className={`font-black uppercase tracking-tighter transition-all ${isDone ? 'text-xl text-green-500' : 'text-2xl text-slate-800 animate-pulse'}`}>
                                      {isDone ? 'DATA_COMPILED' : 'NODE_PENDING'}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="border border-slate-900 bg-slate-950 p-6 mb-8 space-y-6">
                            <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase block">// REAL-TIME PRESENTATION CALIBRATION STRIPS</span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono">
                                  <span className="text-slate-500">ANNUAL SYSTEM SOFTWARE SPEND:</span>
                                  <span className="text-red-500 font-black">${spend.toFixed(1)}M</span>
                                </div>
                                <input 
                                  type="range" min="0.1" max="25.0" step="0.1" value={spend}
                                  disabled={cleanStatus === "ARCHIVED"}
                                  onChange={(e) => handleLiveSliderChange(audit.id, "ai_spend", parseFloat(e.target.value))}
                                  className="w-full accent-red-600 bg-slate-900 h-1.5 cursor-pointer disabled:opacity-40"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono">
                                  <span className="text-slate-500">IMPACTED WORKFORCE SCALE (FTES):</span>
                                  <span className="text-red-500 font-black">{fte} PEOPLE</span>
                                </div>
                                <input 
                                  type="range" min="1" max="250" step="1" value={fte}
                                  disabled={cleanStatus === "ARCHIVED"}
                                  onChange={(e) => handleLiveSliderChange(audit.id, "roi_pct", parseInt(e.target.value))}
                                  className="w-full accent-red-600 bg-slate-900 h-1.5 cursor-pointer disabled:opacity-40"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                            <div className="lg:col-span-5 border border-slate-900 bg-slate-950 p-6 space-y-4 font-mono">
                              <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">// RUN_RATE_METRICS_LEDGER</div>
                              <div className="space-y-3 pt-2 border-t border-slate-900 text-xs">
                                <div className="flex justify-between"><span className="text-slate-600">SYSTEMIC_FRICTION_INDEX:</span><span className="text-red-500 font-black">{sfi} / 100 SFI</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">ACTIVE_LOGIC_FRACTURES:</span><span className="text-white font-black">{realFractures.length} VARIANCE_NODES</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">ANNUAL_REWORK_TAX:</span><span className="text-white font-black">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">FORENSIC_INACTION_EXPOSURE:</span><span className="text-white font-black">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                <div className="flex justify-between border-t border-slate-900 pt-2 text-sm"><span className="text-slate-400 font-black">TOTAL EXPENSE LEAKAGE:</span><span className="text-red-600 font-black">${totalLeakage.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                              </div>
                            </div>

                            <div className={`lg:col-span-7 border-2 p-6 flex flex-col justify-between space-y-4 ${
                              cleanStatus === "ARCHIVED" ? "border-slate-800 bg-slate-900/5" : "border-red-900/60 bg-red-950/5"
                            }`}>
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono font-black text-red-500 tracking-widest block">// SECURE_BRIEFING_ALIGNMENT_SCRIPT</span>
                                <div className="text-2xl font-black italic tracking-tighter text-white uppercase">{playbookHeadline}</div>
                                <p className="text-xs leading-relaxed font-sans text-slate-300 normal-case font-normal border-l-2 border-red-600 pl-4 py-1">
                                  {playbookNarrative}
                                </p>
                              </div>
                              <div className="bg-black/40 border border-slate-900 p-4 font-sans normal-case text-xs text-slate-400 font-medium">
                                <strong className="text-white uppercase tracking-wider block text-[10px] font-mono font-black text-red-500 mb-1">// COLLABORATIVE_CLOSING_ANCHOR:</strong>
                                "{playbookPitch}"
                              </div>
                            </div>
                          </div>

                          {realFractures.length > 0 && (
                            <div className="border border-slate-900 bg-slate-950 p-6 space-y-4 mb-8">
                              <div className="text-[10px] font-mono text-red-500 font-black tracking-widest uppercase">// IDENTIFIED_LOGIC_FRACTURES_INVENTORY ({realFractures.length})</div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left font-mono text-[11px] border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-900 text-slate-500 font-black">
                                      <th className="pb-2 w-1/6">FRACTURE_ID</th>
                                      <th className="pb-2 w-1/12">SEVERITY</th>
                                      <th className="pb-2 w-1/2">TRIANGULATED_REALITY_DESCRIPTION</th>
                                      <th className="pb-2 w-1/4">REQUIRED_IP_DIRECTIVE</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-900/50 text-white font-medium">
                                    {realFractures.map((frac: any) => (
                                      <tr key={frac.id} className="hover:bg-white/5 transition-all">
                                        <td className="py-3 text-slate-400 font-black">{frac.id}</td>
                                        <td className={`py-3 font-black ${frac.severity === 'CRITICAL' ? 'text-red-500' : 'text-yellow-600'}`}>{frac.severity}</td>
                                        <td className="py-3 pr-4 normal-case font-sans text-slate-300 font-normal leading-relaxed">{frac.description}</td>
                                        <td className="py-3 text-red-400 font-black uppercase italic">{frac.directive}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          <div className="bg-white text-black p-8 border-l-[16px] border-slate-900 shadow-2xl space-y-6 mb-10 font-sans">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-4 gap-2">
                              <div>
                                <span className="text-xs font-mono tracking-widest text-red-600 font-black uppercase">// ENGAGEMENT_ROADMAP_CONFIGURATION</span>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black leading-none mt-1">RECOMMENDED STATEMENT OF WORK</h3>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase">{targetTier}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                              {realFractures.length === 0 ? (
                                <div className="col-span-3 text-center py-6 font-mono text-xs text-slate-400 uppercase tracking-widest">No active structural fractures found. Standard baseline optimizations apply.</div>
                              ) : (
                                realFractures.slice(0, 3).map((frac: any, index: number) => (
                                  <div key={frac.id} className="flex flex-col justify-between border border-slate-100 bg-slate-50/60 p-5 space-y-3 relative">
                                    <div className="space-y-1">
                                      <div className="flex justify-between items-center font-mono text-[9px] text-slate-400 font-black uppercase">
                                        <span>PHASE 0{index + 1}</span>
                                        <span className="text-red-600 font-black uppercase">{frac.severity} RISK</span>
                                      </div>
                                      <h5 className="text-sm font-black italic uppercase tracking-tight text-slate-900">{frac.directive.replace("Implement ", "")} Integration</h5>
                                      <p className="text-[11px] leading-relaxed text-slate-500 font-medium font-sans normal-case">Targeting system recovery through deployment of core blueprint protocols: {frac.recovery}.</p>
                                    </div>
                                    <div className="font-mono text-xl font-black text-slate-200/60 absolute bottom-1 right-2 select-none">0{index + 1}</div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-900 pt-8 italic text-left">
                            <div className="space-y-4">
                              <span className="text-[9px] font-mono text-slate-600 block tracking-widest uppercase font-black">PHASE GATEWAY CONTROLS</span>
                              
                              <div className="flex gap-3 mb-2 p-2 bg-black/40 border border-slate-900 font-mono text-[9px] font-black uppercase tracking-wider w-full">
                                <button 
                                  type="button"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const updatedState = !audit.sow_sent;
                                    await supabase.from('audits').update({ sow_sent: updatedState }).eq('id', audit.id);
                                    fetchLedger();
                                  }}
                                  className={`flex-1 py-2 border transition-all ${audit.sow_sent ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-500 border-slate-800 hover:text-white'}`}
                                >
                                  MARK SOW SENT: {audit.sow_sent ? "✔ TRUE" : "✘ FALSE"}
                                </button>
                                
                                <button 
                                  type="button"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const updatedState = !audit.is_paid;
                                    await supabase.from('audits').update({ is_paid: updatedState }).eq('id', audit.id);
                                    fetchLedger();
                                  }}
                                  className={`flex-1 py-2 border transition-all ${audit.is_paid ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-500 border-slate-800 hover:text-white'}`}
                                >
                                  MARK PAID: {audit.is_paid ? "✔ PAID" : "✘ PENDING"}
                                </button>

                                <button 
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const isCurrentlyArchived = cleanStatus === 'ARCHIVED';
                                    const nextStatusState = isCurrentlyArchived ? 'COMPLETE' : 'ARCHIVED';
                                    
                                    if (!isCurrentlyArchived && !window.confirm(`CRITICAL DEACTIVATION PROTOCOL:\nAre you sure you want to ARCHIVE ${audit.org_name}?\nThis action immediately locks and freezes all live ticker telemetry.`)) {
                                      return;
                                    }

                                    setIsUpdating(true);
                                    try {
                                      const { error } = await supabase
                                        .from('audits')
                                        .update({ status: nextStatusState })
                                        .eq('id', audit.id);

                                      if (error) throw error;
                                      if (nextStatusState === 'ARCHIVED') setExpandedRow(null);
                                      await fetchLedger();
                                    } catch (err) {
                                      console.error("ARCHIVE_MUTATION_CRASH:", err);
                                      alert("CRITICAL TRANSMISSION INTERRUPTION: Failed to mutate database entry posture.");
                                    } finally {
                                      setIsUpdating(false);
                                    }
                                  }}
                                  className={`flex-1 py-2 border transition-all cursor-pointer ${
                                    cleanStatus === 'ARCHIVED' 
                                      ? 'bg-red-950 text-red-500 border-red-900/60 font-black tracking-widest' 
                                      : 'text-slate-500 border-slate-800 hover:text-red-500 hover:border-red-900/40'
                                  }`}
                                >
                                  FILE STATUS: {cleanStatus === 'ARCHIVED' ? "🔒 ARCHIVED" : "📁 ARCHIVE RECORD"}
                                </button>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 space-y-3">
                                  <button type="button" disabled={cleanStatus === "ARCHIVED"} onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="w-full bg-red-600 text-white px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-md italic font-black cursor-pointer disabled:opacity-20"><Mail size={14} /> Launch 360 Deep Dive</button>
                                  <button type="button" disabled={cleanStatus === "ARCHIVED"} onClick={(e) => { e.stopPropagation(); runSynthesis(audit.id); }} className="w-full bg-yellow-600 text-black px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-md italic font-black cursor-pointer disabled:opacity-20"><Zap size={14} /> COMPILE PARTIAL ANSWERS</button>
                                </div>
                                <button type="button" disabled={cleanStatus === "ARCHIVED"} onClick={(e) => { e.stopPropagation(); toggleClientAccess(audit); }} className={`flex-1 px-10 py-5 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl flex flex-col items-center justify-center gap-3 border cursor-pointer disabled:opacity-20 ${clientHasAccess ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700' : 'bg-red-600 text-white border-red-500 hover:bg-white hover:text-red-600'}`}><Shield size={18} /><span>{clientHasAccess ? "Blur Dossier" : "Unblur Dossier"}</span></button>
                              </div>
                            </div>
                            
                            <div className="space-y-4 md:border-l md:border-slate-900 md:pl-12">
                              <span className="text-[9px] font-mono text-slate-600 block tracking-widest uppercase font-black">INTERNAL ASSET EXPORTS</span>
                              
                              <div className="w-full space-y-1 mb-2">
                                <input 
                                  type="text"
                                  disabled={cleanStatus === "ARCHIVED"}
                                  value={dossierNotes[audit.id] || ""}
                                  onChange={(e) => setDossierNotes({ ...dossierNotes, [audit.id]: e.target.value })}
                                  placeholder="APPEND CUSTOM DOSSIER ANNOTATION NOTE..."
                                  className="w-full bg-black border border-slate-900 p-3 text-[10px] font-mono font-black italic uppercase text-slate-300 focus:border-red-600 outline-none placeholder:text-slate-700 tracking-wider disabled:opacity-30"
                                />
                              </div>

                              <div className="space-y-3">
                                <button 
                                  type="button" 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    window.open(`/results/${audit.id}?live_sync=true&decay=${dbDecay}&spend=${spend}&fte=${fte}&leakage=${exposure + laborTax}&tax=${laborTax}`, '_blank');
                                  }} 
                                  className="w-full bg-slate-950 border border-red-600/30 text-red-600 px-10 py-5 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl italic font-black cursor-pointer"
                                >
                                  <Monitor size={18} /> Open Onscreen Ledger
                                </button>
                                <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/api/generate-pdf?id=${audit.id}`, "_blank"); }} className="w-full bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-md italic font-black cursor-pointer"><FileText size={16} /> PRINT FORENSIC LEDGER (PDF)</button>
                              </div>
                            </div>
                          </div>

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
                      className="px-4 py-2 border border-slate-800 hover:border-white disabled:opacity-20 disabled:hover:border-slate-800 transition-all text-white font-black cursor-pointer"
                    >
                      PREV
                    </button>
                    <button 
                      type="button"
                      disabled={(currentPage + 1) * ROWS_PER_PAGE >= totalCount}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="px-4 py-2 border border-slate-800 hover:border-white disabled:opacity-20 disabled:hover:border-slate-800 transition-all text-white font-black cursor-pointer"
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
