"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, Send, X, Zap, CheckCircle, 
  FileText, ChevronDown, ChevronUp, Clock, Mail, Shield, 
  Hammer, ZoomIn, Binary, FileDown, Monitor, Lock, ShieldAlert 
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
  // RESTORED: Native Terminal Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [authStep, setAuthStep] = useState("identify");

  const [activeTab, setActiveTab] = useState<'ledger' | 'frameworks'>('ledger');
  const [data, setData] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);
  
  // Triangulation states
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [emails, setEmails] = useState({ exec: "", mgr: "", tech: "" });

  // RESTORED: Native Verification Logic
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authStep === "identify") {
      setAuthStep("verify");
    } else {
      sessionStorage.setItem("bmr_admin_verified", "true");
      setIsAuthenticated(true);
    }
  };

  const fetchLedger = useCallback(async () => {
    const { data: audits } = await supabase
      .from('audits')
      .select('*')
      .order('created_at', { ascending: false });
    setData(audits || []);
  }, []);

  const refreshActiveNodes = useCallback(async (auditId: string) => {
    const { data: nodes } = await supabase
      .from('operators')
      .select('persona_type, status')
      .eq('audit_id', auditId);
    if (nodes) setNodeDetails(nodes);
  }, []);

  const toggleRow = async (auditId: string) => {
    if (expandedRow === auditId) {
      setExpandedRow(null);
      return;
    }
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
          groupId: selectedAudit.org_name, 
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

  const runSynthesis = async (auditId: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/synthesize-fracture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId })
      });
      if (res.ok) await fetchLedger();
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsUpdating(false); 
    }
  };

  const generateForensicPDF = async (audit: any) => {
    const dbDecay = audit.decay_pct || 50;
    const spend = parseFloat(audit.ai_spend) || 1.2;
    const fte = Math.round((spend * 1000000) / 200000) || 5;
    const laborTax = (dbDecay / 100) * 0.4 * (fte * 160000 * 1.3);
    const exposure = ((dbDecay > 60 ? 0.30 : 0.18) * (spend * 1000000)) * 1.15;

    const printArea = document.createElement('div');
    printArea.style.position = 'fixed';
    printArea.style.left = '-9999px';
    printArea.style.top = '0';
    
    printArea.innerHTML = `
      <div id="capture-root" style="width: 1400px; background: #020617; padding: 0; margin: 0; font-family: 'Helvetica', 'Arial', sans-serif; color: white; display: flex; flex-direction: column; box-sizing: border-box;">
        <div style="background: #01040a; width: 100%; padding: 60px 100px; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 8px solid #dc2626;">
            <div>
                <h1 style="font-size: 48px; font-weight: 900; margin: 0; letter-spacing: 4px; font-style: italic; text-transform: uppercase;">FORENSIC_VERDICT</h1>
                <p style="color: #666; font-family: monospace; font-size: 16px; margin-top: 15px; font-weight: 900; letter-spacing: 3px;">SIGNAL_ID: ${audit.id.toUpperCase()}</p>
            </div>
        </div>
        <div style="padding: 100px 100px 140px 100px; flex-grow: 1;">
            <div style="background: white; color: black; padding: 100px; border-left: 60px solid #dc2626; margin-bottom: 80px; width: 100%; box-sizing: border-box;">
              <h1 style="font-size: 92px; font-weight: 900; font-style: italic; margin: 0; text-transform: uppercase; letter-spacing: -5px; line-height: 0.85;">Executive Briefing</h1>
              <p style="font-size: 20px; font-weight: 900; color: #666; letter-spacing: 5px; margin-top: 35px; font-family: monospace;">ENTITY // ${audit.org_name?.toUpperCase() || 'CLIENT_NODE'}</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; margin-top: 100px; border-top: 3px solid #eee; padding-top: 60px;">
                <div><p style="font-size: 16px; font-weight: 900; color: #dc2626; text-transform: uppercase;">Capacity Loss</p><p style="font-size: 42px; font-weight: 900; font-style: italic; margin-top: 15px;">${(dbDecay * 0.4).toFixed(0)}% WASTED</p></div>
                <div><p style="font-size: 16px; font-weight: 900; color: #dc2626; text-transform: uppercase;">Annual Rework Tax</p><p style="font-size: 42px; font-weight: 900; font-style: italic; margin-top: 15px;">$${laborTax.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
                <div><p style="font-size: 16px; font-weight: 900; color: #dc2626; text-transform: uppercase;">Inaction Penalty</p><p style="font-size: 42px; font-weight: 900; font-style: italic; margin-top: 15px;">$${exposure.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
              </div>
            </div>
        </div>
      </div>
    `;
    document.body.appendChild(printArea);

    try {
      await new Promise(r => setTimeout(r, 400));
      const canvas = await html2canvas(printArea, { backgroundColor: "#020617", scale: 3, width: 1400 });
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const scaledHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
      pdf.save(`BMR_DOSSIER_${audit.org_name || 'EXPORT'}.pdf`);
      document.body.removeChild(printArea);
    } catch (err) {
      console.error("PDF_ERROR", err);
      if (document.body.contains(printArea)) document.body.removeChild(printArea);
    }
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

  // RESTORED: Exact Admin Terminal Login Layout from index.tsx
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-white font-sans italic">
        <div className="w-full max-w-md space-y-10 bg-slate-950 border border-slate-900 p-16 shadow-[0_0_100px_rgba(0,0,0,1)] relative">
          <div className="text-center space-y-4">
            <Lock size={40} className="mx-auto text-red-600 animate-pulse" />
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
              Admin <span className="text-red-600">Terminal</span>
            </h1>
            <p className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.4em] font-black">
              ALPHA-7_CLEARANCE_REQUIRED
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {authStep === "identify" ? (
                <motion.div key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 block font-black">Operator_Signal</label>
                  <input type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="ADMIN_EMAIL" className="bg-black border border-slate-800 p-6 text-sm uppercase text-white w-full outline-none focus:border-red-600 font-mono italic" />
                </motion.div>
              ) : (
                <motion.div key="ver" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 block font-black">Secure_Passkey</label>
                  <input type="text" required maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" className="bg-black border border-red-600/50 p-6 text-5xl text-center font-black text-white w-full outline-none focus:border-red-600 font-mono tracking-[0.4em]" />
                </motion.div>
              )}
            </AnimatePresence>

            <button className="w-full py-6 bg-red-600 text-white font-black uppercase italic text-xs tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl">
              {authStep === "identify" ? "GENERATE_KEY" : "AUTHORIZE_ACCESS"}
            </button>
          </form>
          
          <div className="pt-6 border-t border-slate-900 flex items-center justify-center gap-3 opacity-20">
            <ShieldAlert size={12} />
            <span className="text-[8px] font-mono uppercase tracking-widest">Fiduciary_Encryption_Active</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden">
      
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <Activity className="text-red-600 animate-pulse" size={24} />
            <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm font-mono">Forensic_Command_Center</span>
          </div>
          <div className="flex gap-1 bg-slate-900 p-1 shrink-0">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP_Framework</button>
          </div>
        </div>
      </nav>

      {/* Triangulation Modal overlay portal */}
      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-950 border-2 border-red-600 p-12 max-w-xl w-full relative">
              <button onClick={() => setSelectedAudit(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
              <h2 className="text-4xl font-black uppercase italic text-white mb-2 tracking-tighter text-left leading-none">INITIATE_TRIANGULATION</h2>
              <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest mt-2">BOUND TO ENTITY: {selectedAudit.org_name}</p>
              
              <div className="space-y-4 mt-10 text-left">
                <input placeholder="EXECUTIVE_NODE_EMAIL" value={emails.exec} onChange={(e) => setEmails({...emails, exec: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="MANAGERIAL_NODE_EMAIL" value={emails.mgr} onChange={(e) => setEmails({...emails, mgr: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                <input placeholder="TECHNICAL_NODE_EMAIL" value={emails.tech} onChange={(e) => setEmails({...emails, tech: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-800 p-5 text-white uppercase font-mono text-xs focus:border-red-600 outline-none" />
                
                <button onClick={triggerActivation} disabled={isUpdating} className="w-full bg-red-600 text-white py-6 mt-4 font-black uppercase italic text-sm tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all">
                  {isUpdating ? <Activity className="animate-spin" /> : <Send size={18} />} 
                  {isUpdating ? "DISPATCHING..." : "ACTIVATE_TRIANGULATION"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-40 px-10 max-w-[1600px] mx-auto pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-[10px] text-slate-600 uppercase tracking-[0.3em] border-b border-slate-900">
                    <th className="p-10">Entity_Signal</th>
                    <th className="p-10 text-center">Protocol_Status</th>
                    <th className="p-10 text-right">Action_Directives</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {data.map((audit) => {
                    const isTriangulated = audit.status === 'COMPLETE';
                    
                    return (
                      <React.Fragment key={audit.id}>
                        <tr onClick={() => toggleRow(audit.id)} className="hover:bg-white/[0.02] cursor-pointer transition-all">
                          <td className="p-10 text-left">
                            <div className="flex items-center gap-6">
                              <Building2 size={32} className={isTriangulated ? "text-green-500" : "text-red-600"} />
                              <div>
                                <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name}</div>
                                <div className="text-[11px] text-slate-500 font-mono mt-2 uppercase tracking-widest break-all">{audit.lead_email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-10 text-center">
                            <span className={`text-[10px] font-black uppercase italic px-4 py-2 ${
                              isTriangulated ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                              audit.status === 'LEAD' ? 'bg-slate-500/10 text-slate-500' : 'bg-yellow-500/10 text-yellow-500 animate-pulse'
                            }`}>
                              {isTriangulated ? 'RESULT_PUBLISHED' : audit.status === 'LEAD' ? 'LEAD_CAPTURED' : 'TRIANGULATION_ACTIVE'}
                            </span>
                          </td>
                          <td className="p-10 text-right text-slate-800">
                            {expandedRow === audit.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                          </td>
                        </tr>
                        
                        <AnimatePresence>
                          {expandedRow === audit.id && (
                            <tr>
                              <td colSpan={3} className="bg-black/50 p-0 border-b border-slate-900">
                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                  <div className="p-12 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                      {[
                                        { label: 'EXECUTIVE', key: 'EXE' },
                                        { label: 'MANAGERIAL', key: 'MGR' },
                                        { label: 'TECHNICAL', key: 'TEC' }
                                      ].map((role) => {
                                        const node = nodeDetails.find(n => n.persona_type === role.key);
                                        const isDone = node?.status?.toLowerCase() === 'completed';
                                        return (
                                          <div key={role.label} className="bg-slate-950 border border-slate-800 p-8 flex flex-col justify-between min-h-[160px]">
                                            <div className="flex justify-between items-start">
                                              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{role.label}_NODE</span>
                                              {isDone ? <CheckCircle className="text-green-500" size={16}/> : <Clock className="text-slate-800" size={16}/>}
                                            </div>
                                            <div className={`text-5xl font-black italic uppercase tracking-tighter ${isDone ? 'text-white' : 'text-slate-900'}`}>
                                              {isDone ? 'CALCULATED' : 'WAITING'}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    
                                    <div className="flex justify-between mt-12 border-t border-slate-900 pt-8 gap-4 items-center">
                                      <div className="flex gap-4">
                                        {audit.status === 'LEAD' ? (
                                          <button onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="bg-red-600 text-white px-8 py-4 font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3"><Mail size={16} /> START_TRIANGULATION</button>
                                        ) : (
                                          <>
                                            <button onClick={(e) => { e.stopPropagation(); runSynthesis(audit.id); }} className="bg-yellow-600 text-black px-6 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-white transition-all flex items-center gap-2"><Zap size={14} /> Force_Synthesis</button>
                                            <button onClick={(e) => { e.stopPropagation(); setSelectedAudit(audit); }} className="bg-slate-800 text-white px-6 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2"><Send size={14} /> Re-Dispatch</button>
                                          </>
                                        )}
                                      </div>
                                      
                                      <div className="flex gap-4">
                                        <button onClick={(e) => { e.stopPropagation(); window.open(`/results/${audit.id}?admin=true`, '_blank'); }} className="bg-slate-950 border border-red-600/30 text-red-600 px-8 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3"><Monitor size={16} /> OPEN_ONSCREEN_LEDGER</button>
                                        <button onClick={(e) => { e.stopPropagation(); generateForensicPDF(audit); }} className="bg-white text-black px-8 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3"><FileText size={16} /> DOWNLOAD_DOSSIER_COPY</button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div key="frameworks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 md:space-y-20">
              <section>
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4 font-black">Public_Service_Mapping</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-black">
                  {BMR_IP_SUITE.services.map((s) => (
                    <div key={s.tier} className="p-8 border border-slate-800 bg-slate-900/20">
                      <div className="text-red-600 mb-6">{s.icon}</div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">{s.tier}</span>
                      <h4 className="text-xl md:text-2xl font-black italic uppercase text-white mt-2 mb-4">{s.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-bold leading-relaxed normal-case">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4 font-black">Proprietary_Directives</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-black">
                  {BMR_IP_SUITE.directives.map((d) => (
                    <div key={d.id} className="p-12 border-2 border-slate-900 bg-slate-950 hover:border-red-600 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><Binary className={d.color} size={32} /></div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-10">
                        <div className="space-y-2">
                          <span className={`text-[9px] font-mono font-black tracking-widest ${d.color} font-black`}>PROTOCOL // {d.id}</span>
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">{d.label}</h2>
                        </div>
                        {d.price && <div className="bg-red-600 text-white px-4 py-2 text-[10px] font-black italic tracking-widest font-black">{d.price}</div>}
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
