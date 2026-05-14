"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, FileText, 
  FileDown, Monitor, Target 
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("AUTHORIZATION_FAILED: UNRECOGNIZED_SIGNAL");
      setLoading(false);
    } else {
      setIsAuthenticated(true);
      setLoading(false);
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
    
    // Updated HTML to match the high-contrast [id] page layout
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
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black italic">ALPHA-7_CLEARANCE_REQUIRED</p>
          <div className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="OPERATOR_EMAIL" className="w-full bg-black border border-slate-800 p-4 text-center text-white font-mono outline-none focus:border-red-600 italic uppercase" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="SECURE_PASSKEY" className="w-full bg-black border border-slate-800 p-4 text-center text-red-600 font-black outline-none tracking-[0.5em] text-xl focus:border-red-600" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all italic leading-none">
            {loading ? "VERIFYING..." : "INITIALIZE_COMMAND"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans tracking-tighter text-left italic uppercase font-black overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/90 backdrop-blur-md border-b border-slate-900 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 shrink-0"><Activity className="text-red-600 animate-pulse" size={20} /><span className="text-white font-black uppercase italic tracking-[0.1em] text-sm font-mono">FORENSIC_COMMAND</span></div>
          <div className="flex gap-1 bg-slate-900 p-1 shrink-0">
            <button onClick={() => setActiveTab('ledger')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>Ledger</button>
            <button onClick={() => setActiveTab('frameworks')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'frameworks' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>IP_Framework</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 px-10 max-w-[1600px] mx-auto pb-32 italic">
        <AnimatePresence mode="wait">
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              {data.map((audit) => (
                <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden italic text-white">
                  <div onClick={() => toggleRow(audit.id)} className="grid grid-cols-12 items-center p-8 cursor-pointer group">
                    <div className="col-span-6 flex items-center gap-6">
                      <div className="bg-slate-900 p-4 border border-slate-800 shrink-0 italic"><Building2 size={24} className="text-red-600" /></div>
                      <div>
                        <div className="font-black text-white uppercase text-4xl italic tracking-tighter leading-none">{audit.org_name || "PENDING_SIGNAL"}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic break-all italic">{audit.lead_email}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-center font-black text-white italic text-xs tracking-[0.2em] font-mono">{audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : 'TRIANGULATION_ACTIVE'}</div>
                    <div className="col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors italic">{expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}</div>
                  </div>
                  {expandedRow === audit.id && (
                    <div className="p-10 pt-0 border-t border-slate-900/50 bg-black/20 italic">
                      <div className="grid grid-cols-3 gap-6 pt-10 mb-10 italic">
                        {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((role) => {
                          const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role);
                          const isDone = node?.status?.toLowerCase() === 'completed';
                          return (
                            <div key={role} className="border-2 border-slate-900 p-8 bg-slate-950/40 relative min-h-[140px] flex flex-col justify-between italic">
                              <span className="text-[9px] font-mono text-slate-600 font-black tracking-widest italic uppercase">{role}_NODE</span>
                              <div className={`text-5xl font-black italic uppercase tracking-tighter italic ${isDone ? 'text-white' : 'text-slate-900'}`}>{isDone ? 'CALCULATED' : 'WAITING'}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-900/50 pt-10 italic">
                        <div className="flex gap-4 italic">
                            <button className="bg-slate-900 text-slate-500 border border-slate-800 px-6 py-4 font-black uppercase italic text-[10px] tracking-widest hover:text-white transition-all flex items-center gap-3 italic font-black"><Mail size={16} /> RE-DISPATCH</button>
                            <button onClick={() => generateForensicPDF(audit)} className="bg-white text-black px-10 py-5 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3 shadow-xl italic font-black"><FileDown size={18} /> DOWNLOAD_DOSSIER_COPY</button>
                        </div>
                        {/* 🛡️ MASTER KEY INJECTED BELOW */}
                        <button onClick={() => window.open(`/results/${audit.id}?admin=true`, '_blank')} className="bg-slate-950 border border-red-600/30 text-red-600 px-10 py-5 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl italic font-black"><Monitor size={18} /> OPEN_ONSCREEN_LEDGER</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="frameworks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 md:space-y-20 italic">
              <section className="italic">
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4 italic font-black">Public_Service_Mapping</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 italic font-black">
                  {BMR_IP_SUITE.services.map((s) => (
                    <div key={s.tier} className="p-8 border border-slate-800 bg-slate-900/20 italic">
                      <div className="text-red-600 mb-6 italic">{s.icon}</div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest italic font-black">{s.tier}</span>
                      <h4 className="text-xl md:text-2xl font-black italic uppercase text-white mt-2 mb-4 italic">{s.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-bold leading-relaxed italic normal-case italic">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="italic">
                <h3 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-10 border-b border-slate-900 pb-4 italic font-black">Proprietary_Directives</h3>
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
                      <p className="text-xl text-slate-400 italic leading-relaxed mb-8 border-l-2 border-slate-800 pl-8 font-medium italic normal-case italic">{d.description}</p>
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
