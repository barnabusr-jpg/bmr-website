"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, 
  X, Send, Clock, Search, BellRing, FileText, Monitor, ExternalLink, CheckCircle
} from "lucide-react";
import LZString from "lz-string";
import { supabase } from "@/lib/supabaseClient";

const SECTOR_MULTIPLIERS: Record<string, number> = {
  FINANCE: 1.35,
  FINANCIAL_SERVICES: 1.35,
  COMPLIANCE: 1.35,
  HEALTHCARE: 1.40,
  LIABILITY: 1.40,
  INDUSTRIAL: 1.15,
  MANUFACTURING: 1.15,
  OPERATIONS: 1.15,
  SERVICES: 1.20,
  LABOR: 1.20,
  DEFAULT: 1.28
};

const BMR_IP_SUITE = {
  directives: [
    { id: "DIR_01", label: "PIPELINE HARDENING & SCHEMA DRIFT INSULATION", price: "PHASE 01", description: "Establishes standardized ingestion contracts to isolate vendor schema drift and prevent model hallucinations.", color: "text-red-600" },
    { id: "DIR_02", label: "TELEMETRY DECOUPLING & OVERSIGHT OPTIMIZATION", price: "PHASE 02", description: "Suppresses alert fatigue and enforces human-in-the-loop oversight gates.", color: "text-slate-900" },
    { id: "DIR_03", label: "GOVERNANCE SUPPLEMENT", price: "BOARD GATE", description: "Enforces Purview DLP policies and API mutation circuit breakers.", color: "text-amber-700" },
    { id: "DIR_04", label: "PROMISE GAP™ AUDIT", price: "CONTINUOUS", description: "Continuous verification of machine-readable data guardrails.", color: "text-emerald-700" }
  ],
  services: [
    { tier: "TIER_01", title: "AI READINESS DIAGNOSTIC", icon: <ZoomIn size={24} />, description: "High-fidelity forensic audit of pre-automation infrastructure." },
    { tier: "TIER_02", title: "PIPELINE HARDENING", icon: <Shield size={24} />, description: "Constructing machine-readable data contracts and SLA gates." },
    { tier: "TIER_03", title: "PRE-AUTOMATION CONTROL PLANE", icon: <Hammer size={24} />, description: "Complete architectural preparation for safe enterprise AI scaling." }
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
      alert("Sign-in failed. Please check your credentials.");
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

  // 🎯 FETCH OPERATOR NODES (INCLUDES ACCESS_CODE & DUAL FOREIGN KEY SELECTION)
  const refreshActiveNodes = useCallback(async (auditId: string) => {
    if (isUpdating) return;
    const { data: nodes } = await supabase
      .from('operators')
      .select('persona_type, status, email, survey_completed, access_code')
      .or(`group_id.eq.${auditId},audit_id.eq.${auditId}`);
      
    if (nodes) {
      setNodeDetails(nodes);

      const completed360Count = nodes.filter(n => {
        const isDone = n.survey_completed === true || 
                       String(n.status).toUpperCase() === 'COMPLETED' || 
                       String(n.status).toUpperCase() === 'COMPLETE';
        return isDone;
      }).length;

      if (completed360Count >= 3) {
        await supabase
          .from('audits')
          .update({ status: 'COMPLETE' })
          .eq('id', auditId);

        fetchLedger();
      }
    }
  }, [isUpdating, fetchLedger]);

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
      if (!res.ok) throw new Error("Email dispatch failed.");
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
    const matchingNode = nodeDetails.find(n => 
      String(n.persona_type || '').toUpperCase().trim() === targetRoleKey.toUpperCase().trim()
    );

    if (!matchingNode || !matchingNode.email) {
      alert("Nudge failed: Recipient email address not found.");
      return;
    }
    
    setIsUpdating(true);
    try {
      const formattedPayload: Record<string, string> = {};
      formattedPayload[targetRoleKey.toUpperCase()] = matchingNode.email;

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
      
      if (res.ok) alert(`Reminder email sent to ${matchingNode.email}`);
      else throw new Error("Server timeout");
    } catch (err) {
      alert("Failed to send reminder email.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 🎯 DETERMINISTIC LAUNCH ROUTE USING ACCESS_CODE
  const handleLaunchPersonaWizard = (roleKey: string, auditRecord: any) => {
    const matchingNode = nodeDetails.find(n => 
      String(n.persona_type || '').toUpperCase().trim() === roleKey.toUpperCase().trim()
    );

    if (matchingNode?.access_code) {
      window.open(`/diagnostic/forensic?code=${matchingNode.access_code}`, '_blank');
      return;
    }

    const matrixPayload = {
      org: auditRecord.org_name,
      sec: String(auditRecord.sector || 'INDUSTRIAL').toUpperCase().trim(),
      ans: {}
    };

    const compressedToken = LZString.compressToEncodedURIComponent(JSON.stringify(matrixPayload));
    const targetEmail = matchingNode?.email || "hello@bmradvisory.co";

    window.open(
      `/diagnostic/forensic?id=${auditRecord.id}&matrix=${compressedToken}&track=${roleKey.toUpperCase()}&role=${roleKey.toUpperCase()}&org=${encodeURIComponent(auditRecord.org_name)}&email=${encodeURIComponent(targetEmail)}&auth=admin_verified_secure`,
      '_blank'
    );
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
        await supabase
          .from('audits')
          .update({ status: 'COMPLETE' })
          .eq('id', auditId);

        await fetchLedger();
        if (expandedRow === auditId) await refreshActiveNodes(auditId);
        alert("Diagnostic calculation and Roadmap synthesized successfully.");
      } else {
        alert("Failed to recalculate data.");
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
      console.error("Access toggle error:", err);
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
        console.error("Live slider sync error:", err);
      }
    }, 120);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, statusFilter]);

  // 📡 REALTIME LISTENERS
  useEffect(() => {
    if (!isAuthenticated) return;

    const channel = supabase
      .channel('realtime-dashboard-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'operators' },
        () => {
          if (expandedRow) refreshActiveNodes(expandedRow);
          fetchLedger();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'audits' },
        () => {
          fetchLedger();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, expandedRow, refreshActiveNodes, fetchLedger]);

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
      }, 3000); 
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form onSubmit={handleSignIn} className="bg-white border border-slate-200 p-12 max-w-md w-full text-center shadow-sm rounded-lg relative">
          <Key className="text-slate-900 mx-auto mb-6" size={48} />
          <p className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-6 font-bold">Admin Clearance Required</p>
          <div className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 p-3 text-center text-slate-900 font-sans outline-none focus:border-slate-900 rounded text-xs" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-50 border border-slate-200 p-3 text-center text-slate-900 font-sans outline-none focus:border-slate-900 rounded text-xs" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 mt-6 font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors rounded text-xs cursor-pointer">
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left antialiased overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-[60]" />

      <nav className="fixed top-1 left-0 right-0 h-20 bg-white border-b border-slate-200 z-50 px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8 w-full justify-between">
          <div className="flex items-center gap-3 shrink-0">
            <Activity className="text-slate-900" size={20} />
            <span className="text-slate-900 font-bold uppercase tracking-tight text-sm font-mono">Admin Control Panel</span>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setActiveTab('ledger')} className={`px-5 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${activeTab === 'ledger' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}>Audits Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-5 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${activeTab === 'frameworks' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}>Frameworks</button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const activeAudit = data.find(item => item.id === expandedRow);
                
                if (activeAudit) {
                  const sectorTag = String(activeAudit.sector || 'INDUSTRIAL').toUpperCase().trim();
                  
                  const matrixPayload = {
                    org: activeAudit.org_name,
                    sec: sectorTag,
                    ans: {} 
                  };

                  const compressedToken = LZString.compressToEncodedURIComponent(JSON.stringify(matrixPayload));
                  
                  window.open(
                    `/diagnostic/forensic?matrix=${compressedToken}&flow=quad_node&auth=admin_verified_secure`, 
                    '_blank'
                  );
                } else {
                  alert("Please expand an audit row below before configuring Quad Node.");
                }
              }}
              className={`px-5 py-1.5 text-xs font-bold uppercase tracking-wider rounded border transition-colors cursor-pointer ${
                expandedRow 
                  ? 'text-red-700 border-red-200 bg-red-50' 
                  : 'text-slate-600 border-slate-300 bg-white hover:text-slate-900'
              }`}
            >
              Configure Quad Node
            </button>

            {expandedRow && (
              <a
                href={`/results/${expandedRow}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono tracking-wider px-5 py-1.5 uppercase font-bold shrink-0 transition-colors flex items-center gap-2 rounded shadow-sm"
              >
                <ExternalLink size={12} />
                View Live Results
              </a>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border border-slate-200 p-10 max-w-xl w-full relative shadow-lg rounded-lg select-text">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 cursor-pointer"><X size={20}/></button>
              
              <h2 className="text-2xl font-bold uppercase text-slate-900 mb-1 tracking-tight">Assign Stakeholder Emails</h2>
              <p className="text-xs text-slate-500 font-mono tracking-wider">Assigning team access for: {selectedAudit.org_name}</p>
              
              <div className="space-y-3 mt-8 text-left">
                <input placeholder="Executive Stakeholder Email" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 font-sans text-xs focus:border-slate-900 outline-none rounded" />
                <input placeholder="Managerial Stakeholder Email" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 font-sans text-xs focus:border-slate-900 outline-none rounded" />
                <input placeholder="Technical Stakeholder Email" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 font-sans text-xs focus:border-slate-900 outline-none rounded" />
                
                <button onClick={triggerActivation} disabled={isUpdating} className="w-full bg-slate-900 text-white py-4 mt-4 font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors cursor-pointer rounded shadow-sm">
                  {isUpdating ? <Activity className="animate-spin" /> : <Send size={16} />} 
                  {isUpdating ? "Sending Access Links..." : "Send Assessment Access Links"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-32 px-8 max-w-[1600px] mx-auto pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "TOTAL ASSESSMENT RECORDS", value: totalCount, color: "border-slate-200 text-slate-900" },
                  { label: "ACTIVE MULTI-TRACK AUDITS", value: data.filter(d => d.status?.toUpperCase().includes("TRIANGULATION") || d.status?.toUpperCase().includes("TRIANGULATING") || d.status?.toUpperCase() === "IN_PROGRESS").length, color: "border-amber-200 text-amber-800" },
                  { label: "PROPOSED SOW DOSSIERS SENT", value: data.filter(d => d.sow_sent === true).length, color: "border-blue-200 text-blue-800" },
                  { label: "COMPLETED & VERIFIED", value: data.filter(d => d.is_paid === true || d.status?.toUpperCase() === "COMPLETE" || d.status?.toUpperCase() === "COMPLETED").length, color: "border-emerald-200 text-emerald-800" }
                ].map((stat) => (
                  <div key={stat.label} className={`bg-white border p-5 flex flex-col justify-between min-h-[100px] rounded-lg shadow-sm ${stat.color.split(" ")[0]}`}>
                    <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider uppercase">// {stat.label}</span>
                    <div className={`text-3xl font-extrabold tracking-tight mt-2 leading-none ${stat.color.split(" ")[1]}`}>
                      {stat.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search by organization or email..." 
                    className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 text-slate-900 font-sans text-xs focus:border-slate-900 outline-none rounded placeholder:text-slate-400"
                  />
                </div>
                
                <div className="flex bg-slate-100 p-1 gap-1 overflow-x-auto shrink-0 rounded-lg">
                  {([
                    { label: "All Audits", value: "ALL" },
                    { label: "New Leads", value: "LEAD" },
                    { label: "In Progress", value: "TRIANGULATING" },
                    { label: "Completed Reports", value: "COMPLETE" }
                  ] as const).map((tab) => (
                    <button 
                      key={tab.value} 
                      onClick={() => setStatusFilter(tab.value)}
                      className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors rounded ${statusFilter === tab.value ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {data.length === 0 ? (
                <div className="text-center p-16 border border-dashed border-slate-300 rounded-lg bg-white font-mono text-xs text-slate-500 uppercase tracking-wider">
                  No assessment records match this filter criteria.
                </div>
              ) : (
                data.map((audit) => {
                  const clientHasAccess = !!audit.is_released;

                  const dbDecay = audit.decay_pct || 24;
                  const sfi = audit.sfi_score || dbDecay;
                  const realFractures = audit.fractures || [];
                  const spend = parseFloat(audit.ai_spend) || 1.2;
                  const fte = audit.roi_pct ? audit.roi_pct : Math.round((spend * 1000000) / 200000) || 6;
                  
                  const laborMultiplier = 0.5;
                  const laborTax = (dbDecay / 100) * laborMultiplier * (fte * 160000 * 1.3);
                  
                  const rawSectorKey = String(audit.sector || 'SERVICES').toUpperCase().trim().replace(/\s+/g, '_');
                  const sectorInflationMultiplier = SECTOR_MULTIPLIERS[rawSectorKey] || SECTOR_MULTIPLIERS.DEFAULT;

                  const exposure = (0.22 * (dbDecay / 25) * (spend * 1000000)) * sectorInflationMultiplier;
                  const totalLeakage = laborTax + exposure;

                  let playbookHeadline = "Standard Pre-Automation Baseline";
                  let playbookNarrative = "Operational alignment metrics indicate standard system readiness. Interface parameters match baseline stability thresholds required for automation.";
                  let playbookPitch = "Deploy routine baseline optimization filters to preserve ongoing alignment tracks.";
                  let targetTier = "TRACK 01 // PIPELINE HARDENING";

                  const cleanStatus = String(audit.status || "").toUpperCase().trim();
                  const isAuditComplete = cleanStatus === "COMPLETE" || cleanStatus === "COMPLETED";

                  if (cleanStatus.includes("TRIANGULATION") || cleanStatus.includes("TRIANGULATING") || cleanStatus === "IN_PROGRESS") {
                    playbookHeadline = "Multi-Track Diagnostic In Progress";
                    playbookNarrative = "Stakeholder evaluation inputs are currently being gathered across Executive, Managerial, and Technical tracks.";
                    playbookPitch = "Recalculate matrix synthesis to combine multi-track responses into unified findings.";
                    targetTier = "TRACK 02 // MULTI-TRACK ASSESSMENT";
                  } else if (cleanStatus === "ARCHIVED") {
                    playbookHeadline = "Record Archived";
                    playbookNarrative = "This assessment record has been archived. Real-time metric calculation timers and client links are locked.";
                    playbookPitch = "Record archived for compliance and historical audit logs.";
                    targetTier = "ARCHIVED CONTENT";
                  } else if (sfi >= 45) {
                    playbookHeadline = "The Promise Gap™ Identified";
                    playbookNarrative = `An elevated AI Readiness Gap of ${100 - sfi}% reveals an infrastructure code deficit. While executive strategy emphasizes AI speed, underlying data pipelines lack automated guardrails.`;
                    playbookPitch = "Deploy machine-readable directives to close The Promise Gap™ before scaling automation.";
                    targetTier = "TRACKS 01 & 02 // PRE-AUTOMATION CONTROL PLANE";
                  } else if (sfi >= 0) {
                    playbookHeadline = "Operational Friction Area";
                    playbookNarrative = `Identified operational risks (${realFractures.length} detected) are currently concentrated inside mid-tier workflows. Teams are manually fixing data gaps to keep tools running.`;
                    playbookPitch = "Automate mid-tier data hand-offs to reduce manual work and free up developer time.";
                    targetTier = "TRACK 02 // WORKFLOW AUTOMATION";
                  }

                  return (
                    <div key={audit.id} className="border border-slate-200 bg-white hover:border-slate-300 transition-all rounded-lg shadow-sm overflow-hidden text-slate-900">
                      <div onClick={() => toggleRow(audit.id)} className="grid grid-cols-12 items-center p-6 cursor-pointer group">
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="bg-slate-100 p-3 border border-slate-200 rounded shrink-0">
                            <Building2 size={20} className={isAuditComplete ? "text-emerald-700" : "text-slate-700"} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-2xl tracking-tight leading-none">{audit.org_name || "ORGANIZATION RECORD"}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wider font-semibold">Assessment ID: {audit.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                        
                        <div className="col-span-4 text-center font-bold text-xs font-mono flex items-center justify-center gap-3">
                          {sfi >= 45 && cleanStatus !== "ARCHIVED" && (
                            <span className="bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase font-bold rounded shrink-0">
                              ⚠️ PROMISE GAP™ RISK
                            </span>
                          )}
                          <span className="text-slate-800">
                            {isAuditComplete && 'REPORT READY'}
                            {cleanStatus === 'LEAD' && 'NEW LEAD'}
                            {cleanStatus === 'ARCHIVED' && '📁 ARCHIVED'}
                            {(!isAuditComplete && cleanStatus !== 'LEAD' && cleanStatus !== 'ARCHIVED') && 'DIAGNOSTIC IN PROGRESS'}
                          </span>
                        </div>
                        
                        <div className="col-span-2 flex justify-end text-slate-400 group-hover:text-slate-900 transition-colors">{expandedRow === audit.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</div>
                      </div>
                      
                      {expandedRow === audit.id && (
                        <div className="p-8 pt-0 border-t border-slate-100 bg-slate-50/50 text-left select-text">
                          
                          <div className="grid grid-cols-3 gap-4 pt-6 mb-6">
                            {[
                              { label: 'EXECUTIVE TRACK', key: 'EXECUTIVE' },
                              { label: 'MANAGERIAL TRACK', key: 'MANAGERIAL' },
                              { label: 'TECHNICAL TRACK', key: 'TECHNICAL' }
                            ].map((role) => {
                              const node = nodeDetails.find(n => 
                                String(n.persona_type || '').toUpperCase().trim() === role.key.toUpperCase().trim()
                              );

                              const isDone = node?.survey_completed === true || 
                                             String(node?.status || '').toUpperCase() === 'COMPLETED' || 
                                             String(node?.status || '').toUpperCase() === 'COMPLETE';
                              
                              return (
                                <div key={role.label} className="border border-slate-200 p-5 bg-white rounded-lg relative min-h-[120px] flex flex-col justify-between shadow-sm group/node">
                                  <div className="flex justify-between items-start w-full border-b border-slate-100 pb-2">
                                    <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider uppercase">{role.label}</span>
                                    {isDone ? (
                                      <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                                        <CheckCircle size={12} /> COMPLETE
                                      </span>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <button 
                                          type="button"
                                          role="button"
                                          title="Send Email Reminder" 
                                          disabled={isUpdating || cleanStatus === "ARCHIVED"}
                                          onClick={(e) => { e.stopPropagation(); triggerNudge(role.key, audit); }}
                                          className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer disabled:opacity-20"
                                        >
                                          <BellRing size={12} />
                                        </button>
                                        <Clock className="text-amber-600 animate-pulse" size={12}/>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="text-center py-2 flex justify-center items-center">
                                    <button   
                                      type="button"
                                      onClick={() => handleLaunchPersonaWizard(role.key, audit)}   
                                      className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded transition-colors flex items-center gap-2 cursor-pointer ${   
                                        isDone 
                                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                                          : 'bg-slate-900 text-white hover:bg-slate-800'   
                                      }`} 
                                    >   
                                      {isDone ? '✔ Track Completed' : 'Open Diagnostic'}   
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm mb-6 space-y-4">
                            <span className="text-[10px] text-slate-500 font-bold font-mono tracking-wider uppercase block">// REAL-TIME PRESENTATION CALIBRATION STRIPS</span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono">
                                  <span className="text-slate-500">ANNUAL SYSTEM SOFTWARE SPEND:</span>
                                  <span className="text-slate-900 font-bold">${spend.toFixed(1)}M</span>
                                </div>
                                <input 
                                  type="range" min="0.1" max="25.0" step="0.1" value={spend}
                                  disabled={cleanStatus === "ARCHIVED"}
                                  onChange={(e) => handleLiveSliderChange(audit.id, "ai_spend", parseFloat(e.target.value))}
                                  className="w-full accent-slate-900 bg-slate-200 h-1.5 cursor-pointer disabled:opacity-40 rounded"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono">
                                  <span className="text-slate-500">IMPACTED WORKFORCE SCALE (FTES):</span>
                                  <span className="text-slate-900 font-bold">{fte} PEOPLE</span>
                                </div>
                                <input 
                                  type="range" min="1" max="250" step="1" value={fte}
                                  disabled={cleanStatus === "ARCHIVED"}
                                  onChange={(e) => handleLiveSliderChange(audit.id, "roi_pct", parseInt(e.target.value))}
                                  className="w-full accent-slate-900 bg-slate-200 h-1.5 cursor-pointer disabled:opacity-40 rounded"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                            <div className="lg:col-span-5 border border-slate-200 bg-white p-6 rounded-lg shadow-sm space-y-3 font-mono">
                              <div className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">// RUN_RATE_METRICS_LEDGER</div>
                              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                                <div className="flex justify-between"><span className="text-slate-500">AI Readiness Gap:</span><span className="text-slate-900 font-bold">{100 - sfi}% Readiness</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Active Logic Fractures:</span><span className="text-slate-900 font-bold">{realFractures.length} Variance Nodes</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Process Waste Tax:</span><span className="text-slate-900 font-bold">${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Total Promise Gap™ Exposure:</span><span className="text-slate-900 font-bold">${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                                <div className="flex justify-between border-t border-slate-100 pt-2 text-sm"><span className="text-slate-700 font-bold">Total Capital Exposure:</span><span className="text-red-700 font-bold">${totalLeakage.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                              </div>
                            </div>

                            <div className={`lg:col-span-7 border p-6 rounded-lg shadow-sm flex flex-col justify-between space-y-4 ${
                              cleanStatus === "ARCHIVED" ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white"
                            }`}>
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider block uppercase">// EXECUTIVE_BRIEFING_SCRIPT</span>
                                <div className="text-xl font-bold tracking-tight text-slate-900">{playbookHeadline}</div>
                                <p className="text-xs leading-relaxed text-slate-600 border-l-2 border-slate-900 pl-3 py-0.5">
                                  {playbookNarrative}
                                </p>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded text-xs text-slate-700 font-medium">
                                <strong className="text-slate-900 uppercase tracking-wider block text-[10px] font-mono font-bold mb-1">// RECOMMENDED_CLOSING_ANCHOR:</strong>
                                "{playbookPitch}"
                              </div>
                            </div>
                          </div>

                          {realFractures.length > 0 && (
                            <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm space-y-3 mb-6">
                              <div className="text-[10px] font-mono text-slate-500 font-bold tracking-wider uppercase">// IDENTIFIED_RISK_AREAS ({realFractures.length})</div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left font-mono text-xs border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                                      <th className="pb-2 w-1/6">RISK_ID</th>
                                      <th className="pb-2 w-1/12">SEVERITY</th>
                                      <th className="pb-2 w-1/2">DESCRIPTION</th>
                                      <th className="pb-2 w-1/4">RECOMMENDED_ACTION</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                                    {realFractures.map((frac: any) => (
                                      <tr key={frac.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-2.5 text-slate-500 font-bold">{frac.id}</td>
                                        <td className={`py-2.5 font-bold ${frac.severity === 'CRITICAL' ? 'text-red-700' : 'text-amber-700'}`}>{frac.severity}</td>
                                        <td className="py-2.5 pr-4 text-slate-700 leading-relaxed font-sans">{frac.description}</td>
                                        <td className="py-2.5 text-slate-900 font-bold uppercase">{frac.directive}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          <div className="bg-white text-slate-900 p-6 border-l-8 border-slate-900 border-y border-r border-slate-200 rounded-r-lg shadow-sm space-y-4 mb-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-3 gap-2">
                              <div>
                                <span className="text-[10px] font-mono tracking-wider text-slate-500 font-bold uppercase block">// ENGAGEMENT_ROADMAP_CONFIGURATION</span>
                                <h3 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">RECOMMENDED STATEMENT OF WORK</h3>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wider uppercase">{targetTier}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                              <div className="flex flex-col justify-between border border-slate-200 bg-slate-50 p-4 rounded space-y-2 relative">
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center font-mono text-[9px] text-slate-500 font-bold uppercase">
                                    <span>PHASE 01</span>
                                    <span className="text-red-700 font-bold">CRITICAL PRIORITY</span>
                                  </div>
                                  <h5 className="text-xs font-bold uppercase tracking-tight text-slate-900">TRACK 01 // PIPELINE HARDENING & SCHEMA DRIFT INSULATION</h5>
                                  <p className="text-xs leading-relaxed text-slate-600 font-normal">Prevents model hallucinations and silent pipeline breaks caused by third-party API mutations.</p>
                                </div>
                                <div className="font-mono text-lg font-bold text-slate-300 absolute bottom-1 right-2 select-none">01</div>
                              </div>

                              <div className="flex flex-col justify-between border border-slate-200 bg-slate-50 p-4 rounded space-y-2 relative">
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center font-mono text-[9px] text-slate-500 font-bold uppercase">
                                    <span>PHASE 02</span>
                                    <span className="text-amber-700 font-bold">HIGH PRIORITY</span>
                                  </div>
                                  <h5 className="text-xs font-bold uppercase tracking-tight text-slate-900">TRACK 02 // TELEMETRY DECOUPLING & OVERSIGHT OPTIMIZATION</h5>
                                  <p className="text-xs leading-relaxed text-slate-600 font-normal">Suppresses alert desensitization and ensures executives only sign off on critical exceptions.</p>
                                </div>
                                <div className="font-mono text-lg font-bold text-slate-300 absolute bottom-1 right-2 select-none">02</div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-6">
                            <div className="space-y-3">
                              <span className="text-[10px] font-mono text-slate-500 block tracking-wider uppercase font-bold">STATUS CONTROLS</span>
                              
                              <div className="flex gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded font-mono text-[10px] font-bold uppercase tracking-wider w-full">
                                <button 
                                  type="button"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const updatedState = !audit.sow_sent;
                                    await supabase.from('audits').update({ sow_sent: updatedState }).eq('id', audit.id);
                                    fetchLedger();
                                  }}
                                  className={`flex-1 py-1.5 border rounded transition-colors ${audit.sow_sent ? 'bg-blue-700 text-white border-blue-700' : 'text-slate-600 border-slate-300 hover:text-slate-900 bg-white'}`}
                                >
                                  Mark SOW Sent: {audit.sow_sent ? "✔ True" : "✘ False"}
                                </button>
                                
                                <button 
                                  type="button"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const updatedState = !audit.is_paid;
                                    await supabase.from('audits').update({ is_paid: updatedState }).eq('id', audit.id);
                                    fetchLedger();
                                  }}
                                  className={`flex-1 py-1.5 border rounded transition-colors ${audit.is_paid ? 'bg-emerald-700 text-white border-emerald-700' : 'text-slate-600 border-slate-300 hover:text-slate-900 bg-white'}`}
                                >
                                  Mark Paid: {audit.is_paid ? "✔ Paid" : "✘ Pending"}
                                </button>

                                <button 
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const isCurrentlyArchived = cleanStatus === 'ARCHIVED';
                                    const nextStatusState = isCurrentlyArchived ? 'COMPLETE' : 'ARCHIVED';
                                    
                                    if (!isCurrentlyArchived && !window.confirm(`Are you sure you want to archive ${audit.org_name}? This will lock results and freeze live counters.`)) {
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
                                      console.error("Archive error:", err);
                                      alert("Failed to update status.");
                                    } finally {
                                      setIsUpdating(false);
                                    }
                                  }}
                                  className={`flex-1 py-1.5 border rounded transition-colors cursor-pointer ${
                                    cleanStatus === 'ARCHIVED' 
                                      ? 'bg-red-100 text-red-800 border-red-300 font-bold' 
                                      : 'text-slate-600 border-slate-300 hover:text-red-700 bg-white'
                                  }`}
                                >
                                  Record Status: {cleanStatus === 'ARCHIVED' ? "🔒 Archived" : "📁 Archive Record"}
                                </button>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 space-y-2">
                                  <button type="button" disabled={cleanStatus === "ARCHIVED"} onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="w-full bg-slate-900 text-white px-4 py-3 font-bold uppercase text-xs tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 rounded shadow-sm cursor-pointer disabled:opacity-20"><Mail size={14} /> Send Invites</button>
                                  <button type="button" disabled={cleanStatus === "ARCHIVED"} onClick={(e) => { e.stopPropagation(); runSynthesis(audit.id); }} className="w-full bg-amber-600 text-white px-4 py-3 font-bold uppercase text-xs tracking-wider hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 rounded shadow-sm cursor-pointer disabled:opacity-20"><Zap size={14} /> Recalculate Findings</button>
                                </div>
                                <button type="button" disabled={cleanStatus === "ARCHIVED"} onClick={(e) => { e.stopPropagation(); toggleClientAccess(audit); }} className={`flex-1 px-6 py-4 font-bold uppercase text-xs tracking-wider transition-colors shadow-sm rounded flex flex-col items-center justify-center gap-2 border cursor-pointer disabled:opacity-20 ${clientHasAccess ? 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'}`}><Shield size={16} /><span>{clientHasAccess ? "Lock Results Page" : "Unlock Results Page"}</span></button>
                              </div>
                            </div>

                            <div className="space-y-3 md:border-l md:border-slate-200 md:pl-8">
                              <span className="text-[10px] font-mono text-slate-500 block tracking-wider uppercase font-bold">REPORTS & EXPORTS</span>
                              
                              <div className="w-full mb-2">
                                <input 
                                  type="text"
                                  disabled={cleanStatus === "ARCHIVED"}
                                  value={dossierNotes[audit.id] || ""}
                                  onChange={(e) => setDossierNotes({ ...dossierNotes, [audit.id]: e.target.value })}
                                  placeholder="Add an internal note to this record..."
                                  className="w-full bg-white border border-slate-200 p-2.5 text-xs font-sans text-slate-900 focus:border-slate-900 outline-none placeholder:text-slate-400 rounded disabled:opacity-30"
                                />
                              </div>

                              <div className="space-y-2">
                                <button 
                                  type="button" 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    const urlSafeLeakage = Math.round(totalLeakage);
                                    const urlSafeLaborTax = Math.round(laborTax);
                                    const activeSector = encodeURIComponent(audit.sector || 'SERVICES');
                                    window.open(`/results/${audit.id}?live_sync=true&decay=${sfi}&spend=${spend}&fte=${fte}&leakage=${urlSafeLeakage}&tax=${urlSafeLaborTax}&sector=${activeSector}`, '_blank'); 
                                  }} 
                                  className="w-full bg-white border border-slate-300 text-slate-900 px-6 py-3 font-bold uppercase text-xs tracking-wider hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 rounded shadow-sm cursor-pointer"
                                >
                                  <Monitor size={16} /> Open Interactive Report
                                </button>
                                <button type="button" onClick={(e) => { e.stopPropagation(); window.open(`/api/generate-pdf?id=${audit.id}`, "_blank"); }} className="w-full bg-slate-900 text-white px-6 py-3 font-bold uppercase text-xs tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 rounded shadow-sm cursor-pointer"><FileText size={16} /> Download PDF Dossier</button>
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
                <div className="flex items-center justify-between bg-white p-4 border border-slate-200 text-slate-500 font-mono text-xs uppercase tracking-wider rounded-lg shadow-sm mt-4">
                  <div>SHOWING {currentPage * ROWS_PER_PAGE + 1} - {Math.min((currentPage + 1) * ROWS_PER_PAGE, totalCount)} OF {totalCount} ACTIVE RECORDS</div>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                      className="px-4 py-1.5 border border-slate-300 hover:border-slate-900 disabled:opacity-30 transition-colors text-slate-900 font-bold rounded cursor-pointer"
                    >
                      PREV
                    </button>
                    <button 
                      type="button"
                      disabled={(currentPage + 1) * ROWS_PER_PAGE >= totalCount}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="px-4 py-1.5 border border-slate-300 hover:border-slate-900 disabled:opacity-30 transition-colors text-slate-900 font-bold rounded cursor-pointer"
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="frameworks" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
              <section>
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-3 font-bold">Public Service Mapping</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-bold">
                  {BMR_IP_SUITE.services.map((s) => (
                    <div key={s.tier} className="p-6 border border-slate-200 bg-white rounded-lg shadow-sm">
                      <div className="text-slate-900 mb-4">{s.icon}</div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">{s.tier}</span>
                      <h4 className="text-lg font-bold uppercase text-slate-900 mt-1 mb-2">{s.title}</h4>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-3 font-bold">Proprietary Directives</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-bold">
                  {BMR_IP_SUITE.directives.map((d) => (
                    <div key={d.id} className="p-8 border border-slate-200 bg-white hover:border-slate-400 transition-colors rounded-lg shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><Binary className={d.color} size={32} /></div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                        <div className="space-y-1">
                          <span className={`text-[10px] font-mono font-bold tracking-wider ${d.color}`}>PROTOCOL // {d.id}</span>
                          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">{d.label}</h2>
                        </div>
                        {d.price && <div className="bg-slate-900 text-white px-3 py-1 text-xs font-bold tracking-wider rounded">{d.price}</div>}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-4 font-normal">{d.description}</p>
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
