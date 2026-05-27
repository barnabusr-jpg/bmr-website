"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, 
  FileDown, Monitor, X, Send, CheckCircle, Clock, Search, BellRing
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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

  const generateForensicPDF = async (audit: any) => {
    const sfi = audit.sfi_score || 0;
    const dbDecay = audit.decay_pct || 24;
    const spend = parseFloat(audit.ai_spend) || 1.2;
    const fte = Math.round((spend * 1000000) / 200000) || 5;
    const laborMultiplier = audit.sector === 'finance' ? 0.5 : audit.sector === 'healthcare' ? 0.45 : 0.4;
    const laborTax = (dbDecay / 100) * laborMultiplier * (fte * 160000 * 1.3);
    const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;
    const totalLeakage = laborTax + exposure;

    let playbookHeadline = "BALANCED INFRASTRUCTURE STATE";
    if (sfi >= 45) playbookHeadline = "HIGH ASYMMETRIC TRANSLATION STRAIN";
    else if (sfi > 0) playbookHeadline = "OPERATIONAL ABSORPTION MAXIMA";

    const addedNote = dossierNotes[audit.id]?.trim() || "";
    const noteHTML = addedNote 
      ? `<div style="margin-top: 45px; padding: 40px; border: 2px solid #dc2626; background: #fff5f5; font-family: monospace; font-size: 15px; line-height: 1.6; color: #000; text-transform: uppercase; box-sizing: border-box;">
           <strong style="color: #dc2626; display: block; margin-bottom: 8px; font-weight: 900; letter-spacing: 2px;">// ADVISOR EXECUTIVE ANNOTATION:</strong>
           ${addedNote}
         </div>`
      : "";

    const printArea = document.createElement('div');
    printArea.style.position = 'fixed';
    printArea.style.left = '-9999px';
    printArea.style.top = '0';
    
    printArea.innerHTML = `
      <div id="capture-root" style="width: 1400px; background: #020617; padding: 0; margin: 0; font-family: 'Helvetica', 'Arial', sans-serif; color: white; display: flex; flex-direction: column; box-sizing: border-box;">
        <div style="background: #01040a; width: 100%; padding: 60px 100px; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 8px solid #dc2626; box-sizing: border-box;">
            <div>
                <h1 style="font-size: 44px; font-weight: 900; margin: 0; letter-spacing: 4px; font-style: italic; text-transform: uppercase; color: #fff;">FORENSIC ANALYSIS DOSSIER</h1>
                <p style="color: #64748b; font-family: monospace; font-size: 15px; margin-top: 15px; font-weight: 900; letter-spacing: 3px;">SIGNAL UUID: ${audit.id.toUpperCase()}</p>
            </div>
            <div style="text-align: right;">
                <p style="color: #dc2626; font-family: monospace; font-size: 18px; margin: 0; font-weight: 900; letter-spacing: 2px;">STATUS // CONFIDENTIAL</p>
            </div>
        </div>
        <div style="padding: 80px 100px 100px 100px; flex-grow: 1; box-sizing: border-box;">
            <div style="background: white; color: black; padding: 80px; border-left: 60px solid #dc2626; width: 100%; box-sizing: border-box; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
              <span style="font-size: 14px; font-weight: 900; color: #dc2626; font-family: monospace; tracking: 3px; text-transform: uppercase;">// STRATEGIC DIAGNOSTIC SUMMARY</span>
              <h1 style="font-size: 68px; font-weight: 900; font-style: italic; margin: 10px 0 0 0; text-transform: uppercase; letter-spacing: -3px; line-height: 0.9; color: #0f172a;">${audit.org_name?.toUpperCase() || 'CLIENT NODE'}</h1>
              
              <div style="margin-top: 40px; padding: 25px; background: #f8fafc; border-left: 4px solid #475569;">
                <p style="font-size: 13px; font-weight: 900; color: #64748b; font-family: monospace; margin: 0; tracking: 2px;">DIAGNOSTIC VERDICT</p>
                <p style="font-size: 24px; font-weight: 900; font-style: italic; color: #0f172a; margin: 5px 0 0 0; text-transform: uppercase;">${playbookHeadline}</p>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px; border-top: 2px solid #e2e8f0; padding-top: 40px;">
                <div>
                  <p style="font-size: 13px; font-weight: 900; color: #64748b; text-transform: uppercase; font-family: monospace; margin: 0;">SYSTEMIC FRICTION RATING</p>
                  <p style="font-size: 48px; font-weight: 900; font-style: italic; margin: 10px 0 0 0; color: #dc2626;">${sfi} / 100 SFI</p>
                </div>
                <div>
                  <p style="font-size: 13px; font-weight: 900; color: #64748b; text-transform: uppercase; font-family: monospace; margin: 0;">TOTAL ANNUAL LOSS REALITY</p>
                  <p style="font-size: 48px; font-weight: 900; font-style: italic; margin: 10px 0 0 0; color: #0f172a;">$${totalLeakage.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 30px; border-top: 1px dashed #e2e8f0; padding-top: 30px;">
                <div>
                  <p style="font-size: 12px; font-weight: 900; color: #94a3b8; text-transform: uppercase; font-family: monospace; margin: 0;">ANNUAL REWORK TAX</p>
                  <p style="font-size: 28px; font-weight: 900; font-style: italic; margin: 5px 0 0 0; color: #334155;">$${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                </div>
                <div>
                  <p style="font-size: 12px; font-weight: 900; color: #94a3b8; text-transform: uppercase; font-family: monospace; margin: 0;">INACTION PENALTY RISK</p>
                  <p style="font-size: 28px; font-weight: 900; font-style: italic; margin: 5px 0 0 0; color: #334155;">$${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                </div>
              </div>

              ${noteHTML}
            </div>
        </div>
      </div>
    `;
    document.body.appendChild(printArea);

    try {
      await new Promise(r => setTimeout(r, 400));
      const canvas = await html2canvas(printArea, { backgroundColor: "#020617", scale: 2, width: 1400 });
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const scaledHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
      pdf.save(`BMR_STRATEGIC_DOSSIER_${audit.org_name || 'EXPORT'}.pdf`);
      document.body.removeChild(printArea);
    } catch (err) {
      console.error("PDF GENERATION EXCEPTION:", err);
      if (document.body.contains(printArea)) document.body.removeChild(printArea);
    }
  };

  const fetchLedger = useCallback(async () => {
    // 🛡️ POLLING PROTECTION GUARD: Stop active data overwrites during a calculation transaction
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
      setData(audits);
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
        let query = supabase.from('audits').select('*').eq('id', auditId).single();
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
              
              {/* 🚀 TRANSACTION VELOCITY PIPELINE METRICS FUNNEL */}
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

              {/* 🛠️ INTEGRATED HIGH VOLUME CONTROLS TOOLBAR */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-slate-950
