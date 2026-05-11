"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, FileText, 
  Download, ArrowRight, Monitor, FileDown
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ledger' | 'frameworks'>('ledger');
  const [data, setData] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("AUTHORIZATION_FAILED");
      setLoading(false);
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const generateForensicPDF = async (audit: any) => {
    const laborTax = "$83,200";
    const exposure = "$248,400";
    const capacityLoss = "8%";

    const printArea = document.createElement('div');
    printArea.style.position = 'absolute';
    printArea.style.left = '-9999px';
    printArea.style.top = '0';
    
    // 🛡️ RE-ENGINEERED: EXACT REPLICATION OF VERDICT SCREEN
    printArea.innerHTML = `
      <div style="width: 850px; min-height: 1200px; background: #020617; padding: 0; margin: 0; font-family: 'Arial', sans-serif; color: white; display: flex; flex-direction: column; box-sizing: border-box;">
        
        <div style="background: #01040a; width: 100%; padding: 40px 60px; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #dc2626; box-sizing: border-box;">
            <div style="flex: 1;">
                <h1 style="font-size: 28px; font-weight: 900; margin: 0; letter-spacing: 2px; font-style: italic; text-transform: uppercase;">BMR // FORENSIC_VERDICT</h1>
                <p style="color: #666; font-family: monospace; font-size: 9px; margin-top: 10px; font-weight: 900; letter-spacing: 1px;">SIGNAL_ID: ${audit.id.toUpperCase()}</p>
            </div>
            <div style="text-align: right; border-left: 1px solid #1e293b; padding-left: 20px;">
                <p style="font-size: 8px; font-weight: 900; color: #dc2626; margin: 0; letter-spacing: 2px;">AUTHORIZED_BY</p>
                <p style="font-size: 10px; font-weight: 400; color: #fff; margin-top: 4px; font-family: monospace;">${email.toUpperCase()}</p>
                <p style="font-size: 7px; color: #444; margin-top: 3px; font-family: monospace;">VERIFIED: ${new Date().toLocaleDateString()}</p>
            </div>
        </div>

        <div style="padding: 60px; flex-grow: 1; box-sizing: border-box;">
            
            <div style="margin-bottom: 50px;">
                <h2 style="font-size: 72px; font-weight: 900; font-style: italic; margin: 0; text-transform: uppercase; letter-spacing: -4px; line-height: 1;">
                  AI <span style="color: #dc2626;">EFFICIENCY</span> VERDICT
                </h2>
                <p style="font-size: 10px; font-weight: 900; color: #475569; letter-spacing: 4px; margin-top: 15px; font-family: monospace;">CASE_FILE: BMR-2026-${audit.id.slice(0,4).toUpperCase()} // STATUS: STABLE</p>
            </div>

            <div style="border-left: 4px solid #dc2626; padding: 30px 40px; background: rgba(220, 38, 38, 0.05); margin-bottom: 50px;">
                <p style="font-size: 9px; font-weight: 900; color: #666; letter-spacing: 3px; margin-bottom: 15px; font-family: monospace;">DIAGNOSTIC_OBSERVATION // ALPHA_7_INTAKE</p>
                <p style="font-size: 16px; font-style: italic; line-height: 1.6; color: #94a3b8; margin: 0;">
                  These metrics serve as a forensic baseline for organizational health. Your responses identify specific logic fractures from your immediate perspective. The system projects the fiscal impact of these fractures, converting observations into high-probability drift currently occurring at your node.
                </p>
            </div>

            <div style="background: white; color: black; padding: 50px; border-left: 30px solid #dc2626; margin-bottom: 40px; width: 100%; box-sizing: border-box;">
              <h1 style="font-size: 52px; font-weight: 900; font-style: italic; margin: 0; text-transform: uppercase; letter-spacing: -3px; line-height: 0.85;">Executive Briefing</h1>
              <p style="font-size: 12px; font-weight: 900; color: #666; letter-spacing: 5px; margin-top: 15px; font-family: monospace;">ENTITY // ${audit.org_name.toUpperCase()}</p>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px;">
                <div>
                  <p style="font-size: 10px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 2px;">Capacity Loss</p>
                  <p style="font-size: 20px; font-weight: 900; font-style: italic; margin-top: 8px;">Wasting <span style="color: #dc2626;">${capacityLoss}</span></p>
                </div>
                <div>
                  <p style="font-size: 10px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 2px;">Financial Leak</p>
                  <p style="font-size: 20px; font-weight: 900; font-style: italic; margin-top: 8px;">Tax: <span style="color: #dc2626;">${laborTax}</span></p>
                </div>
                <div>
                  <p style="font-size: 10px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 2px;">Exposure</p>
                  <p style="font-size: 20px; font-weight: 900; font-style: italic; margin-top: 8px;">Risk: <span style="color: #dc2626;">${exposure}</span></p>
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; box-sizing: border-box;">
              <div style="background: #050b1a; border: 1px solid #1e293b; padding: 60px 20px; text-align: center;">
                <h2 style="font-size: 90px; font-weight: 900; font-style: italic; margin: 0; letter-spacing: -6px; line-height: 1;">${laborTax}</h2>
                <p style="font-size: 11px; font-weight: 900; color: #475569; letter-spacing: 8px; margin-top: 20px; text-transform: uppercase;">Annual Labor Waste</p>
              </div>
              <div style="background: #050b1a; border: 8px solid #dc2626; padding: 60px 20px; text-align: center;">
                <h2 style="font-size: 90px; font-weight: 900; font-style: italic; margin: 0; color: #dc2626; letter-spacing: -6px; line-height: 1;">${exposure}</h2>
                <p style="font-size: 12px; font-weight: 900; color: #dc2626; letter-spacing: 8px; margin-top: 20px; text-transform: uppercase;">Total Capital Exposure</p>
              </div>
            </div>
        </div>

        <div style="background: #01040a; padding: 30px; text-align: center; border-top: 1px solid #1e293b;">
            <p style="font-size: 8px; color: #334155; font-family: monospace; letter-spacing: 4px; font-weight: 900;">INTERNAL USE ONLY // CLASSIFIED FORENSIC DATA</p>
        </div>
      </div>
    `;
    document.body.appendChild(printArea);

    try {
      const canvas = await html2canvas(printArea, { 
        backgroundColor: "#020617", 
        scale: 3, 
        useCORS: true,
        width: 850,
        height: 1200
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`BMR_VERDICT_${audit.org_name.replace(/\s+/g, '_')}.pdf`);
      document.body.removeChild(printArea);
    } catch (err) {
      console.error(err);
      if (document.body.contains(printArea)) document.body.removeChild(printArea);
    }
  };

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
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <form onSubmit={handleSignIn} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center shadow-2xl relative italic">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black">ALPHA-7_CLEARANCE_REQUIRED</p>
          <div className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="OPERATOR_EMAIL" className="w-full bg-black border border-slate-800 p-4 text-center text-white font-mono outline-none focus:border-red-600 italic" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="SECURE_PASSKEY" className="w-full bg-black border border-slate-800 p-4 text-center text-red-600 font-black outline-none tracking-[0.5em] text-xl focus:border-red-600 italic" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none italic disabled:opacity-50">
            {loading ? "VERIFYING..." : "INITIALIZE_COMMAND"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left selection:bg-red-600/30 italic uppercase font-black overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <Activity className="text-red-600 animate-pulse" size={20} />
            <span className="text-white font-black uppercase italic tracking-[0.1em] text-[10px] md:text-sm font-mono hidden sm:inline">FORENSIC_COMMAND</span>
          </div>
          <div className="flex gap-1 bg-slate-900 p-1 shrink-0">
            <button onClick={() => setActiveTab('ledger')} className={`px-3 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-3 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP_Framework</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 md:pt-40 px-4 md:px-10 max-w-[1600px] mx-auto pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' && (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              {data.map((audit) => (
                <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden italic">
                  <div onClick={() => toggleRow(audit.id)} className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center p-6 md:p-8 cursor-pointer group gap-6 md:gap-0">
                    <div className="w-full md:col-span-6 flex items-center gap-4 md:gap-6 min-w-0 text-white">
                      <div className="bg-slate-900 p-3 md:p-4 border border-slate-800 shrink-0 italic"><Building2 size={24} className="text-red-600" /></div>
                      <div className="min-w-0">
                        <div className="font-black text-white uppercase text-2xl md:text-4xl italic tracking-tighter leading-none break-words font-black">{audit.org_name || "PENDING_SIGNAL"}</div>
                        <div className="text-[9px] md:text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black break-all font-black">{audit.lead_email}</div>
                      </div>
                    </div>
                    <div className="w-full md:col-span-4 md:text-center font-black text-white italic text-[10px] md:text-xs tracking-[0.2em] font-mono border-y border-slate-900 md:border-none py-4 md:py-0 font-black">
                      {audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : 'TRIANGULATION_ACTIVE'}
                    </div>
                    <div className="w-full md:col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors">
                      {expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                    </div>
                  </div>
                  {expandedRow === audit.id && (
                    <div className="p-6 md:p-10 pt-0 border-t border-slate-900/50 bg-black/20 text-white">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-10 mb-10 italic">
                        {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((role) => {
                          const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role);
                          const isDone = node?.status?.toLowerCase() === 'completed';
                          return (
                            <div key={role} className="border-2 border-slate-900 p-6 md:p-8 bg-slate-950/40 relative min-h-[140px] flex flex-col justify-between">
                              <span className="text-[9px] font-mono text-slate-600 font-black tracking-widest uppercase">{role}_NODE</span>
                              <div className={`text-3xl md:text-5xl font-black italic uppercase tracking-tighter ${isDone ? 'text-white' : 'text-slate-900'}`}>{isDone ? 'CALCULATED' : 'WAITING'}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* 🛡️ RE-ENGINEERED ACTION BAR: CLEAR CHOICE BETWEEN SCREEN & PDF */}
                      <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-t border-slate-900/50 pt-10">
                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                           <button className="bg-slate-900 text-slate-500 border border-slate-800 px-6 py-4 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all flex items-center gap-3">
                             <Mail size={16} /> RE-DISPATCH
                           </button>
                           <button 
                             onClick={() => generateForensicPDF(audit)}
                             className="bg-white text-black px-10 py-5 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3 shadow-xl"
                           >
                             <FileDown size={18} /> DOWNLOAD_DOSSIER_COPY
                           </button>
                        </div>
                        
                        <button 
                          onClick={() => window.open(`/results/${audit.id}`, '_blank')}
                          className="w-full md:w-auto bg-slate-950 border border-red-600/30 text-red-600 px-10 py-5 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                          <Monitor size={18} /> OPEN_ONSCREEN_LEDGER
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
