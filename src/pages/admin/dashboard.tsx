"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Activity, Building2, ChevronUp, ChevronDown, 
  Shield, Zap, Binary, ZoomIn, Hammer, Mail, FileText, 
  Download, ArrowRight 
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

  // 🏛️ UPDATED ASSET (Design.png)
  const CHEVRON_URL = "https://jxjoyuyonulthsypiami.supabase.co/storage/v1/object/public/Assets/Design.png";

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

  // 📄 RE-ENGINEERED FULL-WIDTH PDF ENGINE
  const generateForensicPDF = async (audit: any) => {
    const laborTax = "$83,200";
    const exposure = "$248,400";
    const capacityLoss = "8%";

    const printArea = document.createElement('div');
    printArea.style.position = 'absolute';
    printArea.style.left = '-9999px';
    // Calibrated to 1100px for high-impact horizontal stretch
    printArea.innerHTML = `
      <div style="width: 1100px; background: #020617; padding: 60px; font-family: sans-serif; color: white;">
        
        <div style="border-left: 20px solid #dc2626; padding: 60px; background: #ffffff; color: #000000; width: 100%; box-sizing: border-box;">
          <h1 style="text-transform: uppercase; font-weight: 900; font-style: italic; margin: 0; font-size: 64px; letter-spacing: -4px; line-height: 1;">Executive Briefing</h1>
          <p style="font-family: monospace; font-size: 14px; color: #666; letter-spacing: 8px; margin-top: 20px; font-weight: 900;">ENTITY // ${audit.org_name.toUpperCase()}</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; margin-top: 80px; width: 100%;">
            <div>
              <p style="font-size: 12px; font-weight: 900; color: #999; margin: 0; letter-spacing: 4px;">CAPACITY LOSS</p>
              <p style="font-weight: 900; margin-top: 10px; font-size: 24px; font-style: italic;">WASTING <span style="color: #dc2626;">${capacityLoss}</span> CAPACITY</p>
            </div>
            <div>
              <p style="font-size: 12px; font-weight: 900; color: #999; margin: 0; letter-spacing: 4px;">FINANCIAL LEAK</p>
              <p style="font-weight: 900; margin-top: 10px; font-size: 24px; font-style: italic;">LABOR TAX: <span style="color: #dc2626;">${laborTax}</span></p>
            </div>
            <div>
              <p style="font-size: 12px; font-weight: 900; color: #999; margin: 0; letter-spacing: 4px;">EXPOSURE</p>
              <p style="font-weight: 900; margin-top: 10px; font-size: 24px; font-style: italic;">EXPOSES: <span style="color: #dc2626;">${exposure}</span></p>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 30px; margin-top: 60px; width: 100%;">
          <div style="flex: 1; border: 5px solid #1e293b; padding: 100px 40px; text-align: center; background: #0f172a;">
            <p style="font-size: 110px; font-weight: 900; margin: 0; font-style: italic; color: #ffffff; letter-spacing: -6px;">${laborTax}</p>
            <p style="font-size: 16px; font-weight: 900; color: #475569; margin-top: 30px; letter-spacing: 8px;">ANNUAL_LABOR_WASTE</p>
          </div>
          <div style="flex: 1; border: 5px solid #dc2626; padding: 100px 40px; text-align: center; background: #450a0a;">
            <p style="font-size: 110px; font-weight: 900; margin: 0; font-style: italic; color: #dc2626; letter-spacing: -6px;">${exposure}</p>
            <p style="font-size: 16px; font-weight: 900; color: #dc2626; margin-top: 30px; letter-spacing: 8px;">TOTAL_CAPITAL_EXPOSURE</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(printArea);

    try {
      const canvas = await html2canvas(printArea, {
        backgroundColor: "#020617",
        scale: 2,
        useCORS: true
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // Black Background Header
      pdf.setFillColor(2, 6, 23);
      pdf.rect(0, 0, pdfWidth, 50, "F");
      
      // Brand Seal - Large Authorized Stamp
      pdf.addImage(CHEVRON_URL, "PNG", pdfWidth - 50, 8, 40, 35);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      pdf.text("BMR // FORENSIC_VERDICT", 15, 22);
      
      pdf.setFontSize(8);
      pdf.setTextColor(220, 38, 38);
      pdf.text(`SIGNAL_ID: ${audit.id.toUpperCase()}`, 15, 30);

      // MAP IMAGE TO FULL WIDTH (5mm margin)
      const imgProps = pdf.getImageProperties(imgData);
      const pdfImageWidth = pdfWidth - 10; 
      const imgHeight = (imgProps.height * pdfImageWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 5, 50, pdfImageWidth, imgHeight);

      // Watermark
      pdf.setGState(new pdf.GState({ opacity: 0.03 }));
      pdf.addImage(CHEVRON_URL, "PNG", pdfWidth / 4, 120, 100, 100);

      pdf.save(`BMR_DOSSIER_${audit.org_name}.pdf`);
      document.body.removeChild(printArea);
    } catch (err) {
      console.error(err);
      document.body.removeChild(printArea);
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
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 italic">
        <form onSubmit={handleSignIn} className="bg-slate-950 border-2 border-red-600/20 p-16 max-w-md w-full text-center relative shadow-2xl">
          <Key className="text-red-600 mx-auto mb-10 animate-pulse" size={64} />
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black italic">ALPHA-7_CLEARANCE_REQUIRED</p>
          <div className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="OPERATOR_EMAIL" className="w-full bg-black border border-slate-800 p-4 text-center text-white font-mono outline-none focus:border-red-600 placeholder:text-slate-900 italic" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="SECURE_PASSKEY" className="w-full bg-black border border-slate-800 p-4 text-center text-red-600 font-black outline-none tracking-[0.5em] text-xl focus:border-red-600 placeholder:text-slate-900 italic" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-6 mt-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-red-600 transition-all leading-none italic disabled:opacity-50">
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
          {activeTab === 'ledger' ? (
            <motion.div key="ledger" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <div className="hidden md:grid grid-cols-12 px-10 mb-6 opacity-30 font-mono text-[9px] font-black uppercase tracking-[0.4em] italic">
                <div className="col-span-6">ENTITY_SIGNAL</div>
                <div className="col-span-4 text-center">PROTOCOL_STATUS</div>
                <div className="col-span-2 text-right">DIRECTIVES</div>
              </div>

              {data.map((audit) => (
                <div key={audit.id} className="border border-slate-900 bg-slate-950/40 hover:border-red-600/30 transition-all overflow-hidden italic">
                  <div onClick={() => toggleRow(audit.id)} className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center p-6 md:p-8 cursor-pointer group gap-6 md:gap-0 italic text-white">
                    <div className="w-full md:col-span-6 flex items-center gap-4 md:gap-6 min-w-0 italic">
                      <div className="bg-slate-900 p-3 md:p-4 border border-slate-800 shrink-0 italic"><Building2 size={24} className="text-red-600" /></div>
                      <div className="min-w-0 italic">
                        <div className="font-black text-white uppercase text-2xl md:text-4xl italic tracking-tighter leading-none break-words italic">{audit.org_name || "PENDING_SIGNAL"}</div>
                        <div className="text-[9px] md:text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-widest font-black italic break-all italic">{audit.lead_email}</div>
                      </div>
                    </div>
                    <div className="w-full md:col-span-4 md:text-center font-black text-white italic text-[10px] md:text-xs tracking-[0.2em] font-mono border-y border-slate-900 md:border-none py-4 md:py-0 italic">
                      {audit.status === 'COMPLETE' ? 'RESULT_PUBLISHED' : 'TRIANGULATION_ACTIVE'}
                    </div>
                    <div className="w-full md:col-span-2 flex justify-end text-slate-800 group-hover:text-red-600 transition-colors italic">
                      {expandedRow === audit.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                    </div>
                  </div>
                  {expandedRow === audit.id && (
                    <div className="p-6 md:p-10 pt-0 border-t border-slate-900/50 bg-black/20 italic">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-10 mb-10 italic">
                        {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((role) => {
                          const node = nodeDetails.find(n => n.persona_type?.toUpperCase() === role);
                          const isDone = node?.status?.toLowerCase() === 'completed';
                          return (
                            <div key={role} className="border-2 border-slate-900 p-6 md:p-8 bg-slate-950/40 relative min-h-[140px] flex flex-col justify-between italic text-white">
                              <span className="text-[9px] font-mono text-slate-600 font-black tracking-widest italic">{role}_NODE</span>
                              <div className={`text-3xl md:text-5xl font-black italic uppercase tracking-tighter italic ${isDone ? 'text-white' : 'text-slate-900'}`}>{isDone ? 'CALCULATED' : 'WAITING'}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-t border-slate-900/50 pt-10 italic">
                        <div className="flex gap-4 w-full md:w-auto italic">
                           <button className="bg-red-600/80 text-white px-6 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-600 flex items-center justify-center gap-3 italic"><Mail size={16} /> RE-DISPATCH</button>
                           <button onClick={() => generateForensicPDF(audit)} className="bg-white text-black px-10 py-5 font-black uppercase italic text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl italic"><Download size={18} /> GENERATE_FORENSIC_DOSSIER</button>
                        </div>
                        <button onClick={() => window.open(`/results/${audit.id}`, '_blank')} className="w-full md:w-auto text-slate-600 hover:text-red-600 transition-colors py-5 font-black uppercase italic text-[10px] tracking-widest italic flex items-center gap-2">VIEW_BRIEFING <ArrowRight size={14}/></button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 italic">
                  {BMR_IP_SUITE.services.map((s) => (
                    <div key={s.tier} className="p-8 border border-slate-800 bg-slate-900/20 italic text-white">
                      <div className="text-red-600 mb-6 italic">{s.icon}</div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest italic">{s.tier}</span>
                      <h4 className="text-xl md:text-2xl font-black italic uppercase text-white mt-2 mb-4 leading-none italic">{s.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-bold leading-relaxed italic normal-case italic">{s.description}</p>
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
