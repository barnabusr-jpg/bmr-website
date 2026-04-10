"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowRight, Download, Banknote, Stethoscope, Factory, ShoppingCart } from "lucide-react";
import jsPDF from "jspdf";
import ForensicLoader from "@/components/ForensicLoader";
import LogicLeakTicker from "@/components/LogicLeakTicker";
import { supabase } from "@/lib/supabaseClient";

const LOCAL_QUESTIONS = [
  { id: "RT_01", text: "AI standard operating procedures (SOPs) are documented and followed.", options: [{ label: "Non-existent", weight: 10 }, { label: "Ad-hoc/Manual", weight: 6 }, { label: "Formalized", weight: 4 }, { label: "Automated/Optimized", weight: 2 }] },
  { id: "RT_02", text: "Our organization has a clear AI ethics and governance framework.", options: [{ label: "No framework", weight: 10 }, { label: "Basic guidelines", weight: 6 }, { label: "Formal audits", weight: 4 }, { label: "Continuous monitoring", weight: 2 }] },
  { id: "RT_03", text: "AI roles and responsibilities are clearly defined across teams.", options: [{ label: "Undefined", weight: 10 }, { label: "Informal roles", weight: 6 }, { label: "Dedicated AI team", weight: 4 }, { label: "Cross-functional matrix", weight: 2 }] },
  { id: "DG_01", text: "Our AI systems directly contribute to measurable business ROI.", options: [{ label: "Not tracked", weight: 10 }, { label: "Anecdotal evidence", weight: 6 }, { label: "Specific KPIs", weight: 4 }, { label: "Direct impact", weight: 2 }] },
  { id: "DG_02", text: "AI initiatives are aligned with the core strategic vision.", options: [{ label: "Disconnected", weight: 10 }, { label: "Loosely aligned", weight: 6 }, { label: "Integrated", weight: 4 }, { label: "Strategy-driven", weight: 2 }] },
  { id: "DG_03", text: "We have a dedicated budget and resources for AI scaling.", options: [{ label: "No budget", weight: 10 }, { label: "Project-based", weight: 6 }, { label: "Annual budget", weight: 4 }, { label: "Venture-scale", weight: 2 }] },
  { id: "SA_01", text: "AI vendors are assessed for risk before contract signing.", options: [{ label: "No oversight", weight: 10 }, { label: "Basic checks", weight: 6 }, { label: "Formal audits", weight: 4 }, { label: "Continuous monitoring", weight: 2 }] },
  { id: "SA_02", text: "Unauthorized AI tool usage is actively monitored and blocked.", options: [{ label: "No monitoring", weight: 10 }, { label: "Reactive", weight: 6 }, { label: "Alerts", weight: 4 }, { label: "Zero-Trust", weight: 2 }] },
  { id: "ED_01", text: "Our data infrastructure can handle real-time AI processing.", options: [{ label: "Legacy", weight: 10 }, { label: "Hybrid", weight: 6 }, { label: "Cloud-native", weight: 4 }, { label: "Edge", weight: 2 }] },
  { id: "ED_02", text: "We leverage proprietary datasets to train specialized models.", options: [{ label: "Public only", weight: 10 }, { label: "Minimal", weight: 6 }, { label: "Significant", weight: 4 }, { label: "Proprietary", weight: 2 }] },
  { id: "ED_03", text: "API and model versioning are strictly controlled.", options: [{ label: "Manual", weight: 10 }, { label: "Basic", weight: 6 }, { label: "Automated", weight: 4 }, { label: "MLOps", weight: 2 }] },
  { id: "ED_04", text: "Computing resources (GPU/Cloud) are managed efficiently.", options: [{ label: "High waste", weight: 10 }, { label: "Partial", weight: 6 }, { label: "Managed", weight: 4 }, { label: "Hyper", weight: 2 }] }
];

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance");
  const [aiSpend, setAiSpend] = useState(1.2);
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverChallenge, setServerChallenge] = useState("");
  const [userInputKey, setUserInputKey] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const e1 = email.trim().toLowerCase();
    const e2 = confirmEmail.trim().toLowerCase();
    if (e2.length > 0 && e1 !== e2) setValidationError("EMAIL_VERIFICATION_MISMATCH");
    else setValidationError(null);
  }, [email, confirmEmail]);

  const logToDatabase = async (finalMetrics: any) => {
    try {
      const { data: entityData, error: entityError } = await supabase
        .from('entities')
        .insert([{ name: entityName.trim().toUpperCase() }])
        .select().single();

      if (entityError) throw entityError;

      const { data: operatorData, error: operatorError } = await supabase
        .from('operators')
        .insert([{ 
          email: email.trim().toLowerCase(), 
          full_name: operatorName.trim().toUpperCase(), 
          entity_id: entityData.id 
        }])
        .select().single();

      if (operatorError) throw operatorError;

      await supabase.from('audits').insert([{
        operator_id: operatorData.id,
        sector: sector,
        ai_spend: aiSpend,
        decay_pct: finalMetrics.decay,
        rework_tax: parseFloat(finalMetrics.rework),
        roi_pct: parseFloat(finalMetrics.roi)
      }]);
    } catch (error) {
      console.error("DATABASE_LINK_SHEAR:", error);
    }
  };

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * coeff) * multiplier;
    const decayRaw = scaledTotal === 0 ? 0 : Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);

    return {
      decay: Math.min(decayRaw, 98),
      rework: (scaledTotal * 0.38).toFixed(1),
      delta: (scaledTotal * 0.32).toFixed(1),
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(1) : "0"
    };
  };

  const handleSecureBriefing = () => {
    if (typeof window === 'undefined') return;
    const m = getLiveMetrics();
    
    const vectorId = m.decay > 60 ? 'Vector 01' : 'Vector 02';
    
    // Safely encode parameters to prevent "Bad Request" errors
    const params = new URLSearchParams();
    params.append('name', operatorName.trim());
    params.append('email', email.trim());
    params.append('a1', vectorId); 
    params.append('utm_campaign', entityName.trim().toUpperCase());
    params.append('utm_source', 'Pulse_Check_V3');
    params.append('utm_content', `Decay_${m.decay}pct`); 
    
    const url = `https://calendly.com/hello-bmradvisory/forensic-review?${params.toString()}`;
    window.open(url, '_blank');
  };

  const generateForensicPDF = () => {
    const m = getLiveMetrics();
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString();

    doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 45, "F");
    doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC UNIT", 15, 20);
    doc.setFont("courier", "normal"); doc.setFontSize(8);
    doc.text(`NODE_ID: ${sector.toUpperCase()}_SEC_04 // CLEARANCE: ALPHA-7`, 15, 28);
    doc.text(`STAMP: ${dateStr} // BMR_V3_NY`, 15, 33);

    doc.setTextColor(2, 6, 23); doc.setFontSize(10); doc.text(`ENTITY: ${entityName.toUpperCase()}`, 15, 60);
    doc.text(`OPERATOR: ${operatorName.toUpperCase()}`, 15, 66);
    doc.setDrawColor(220, 38, 38); doc.line(15, 68, 80, 68);

    doc.setFillColor(2, 6, 23); doc.rect(15, 75, 180, 45, "F");
    doc.setTextColor(220, 38, 38); doc.setFontSize(55); doc.text(`${m.decay}%`, 25, 110);
    doc.setTextColor(255, 255, 255); doc.setFontSize(12); doc.text("CAPITAL_DECAY_INDEX", 25, 118);
    
    doc.save(`BMR_Forensic_${entityName}.pdf`);
  };

  const triggerForensicScan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/generate-key', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email: email.trim().toLowerCase() }) 
      });
      const data = await res.json();
      if (res.ok) {
        setServerChallenge(data.challenge);
        setStep("verify");
      } else {
        setValidationError("TRANSMISSION_REJECTED");
      }
    } catch (err) { setValidationError("LOGIC_SHEAR_DETECTION"); }
    setIsLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative min-h-[850px]">
      <AnimatePresence mode="wait">
        {isLoading && <ForensicLoader key="loader" onComplete={() => {}} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'triage' && (
          <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
            <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white text-center leading-none">THE LOGIC <span className="text-red-600">DECAY SCREENING</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {sectors.map((s) => (
                <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-48 group">
                  <div className="text-red-600">{s.icon}</div>
                  <div>
                    <h3 className="text-xl font-black uppercase italic text-white tracking-tighter leading-none">{s.label}</h3>
                    <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">{s.risk}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'intake' && (
          <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
            <div className="text-center"><h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">FORENSIC PROTOCOL <span className="text-red-600">ENGAGED</span></h2></div>
            <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full font-mono uppercase outline-none focus:border-red-600 transition-all" />
                <input placeholder="ENTITY" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full font-mono uppercase outline-none focus:border-red-600 transition-all" />
                <input placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full font-mono uppercase outline-none focus:border-red-600 transition-all" />
                <input placeholder="VERIFY EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full font-mono uppercase outline-none focus:border-red-600 transition-all" />
              </div>
              <button disabled={!email || email !== confirmEmail} onClick={triggerForensicScan} className="w-full py-8 font-black uppercase italic tracking-[0.4em] bg-red-600 text-white disabled:opacity-20 transition-all shadow-xl shadow-red-900/10">Initialize Audit Observation</button>
            </div>
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div key="verify" className="text-center space-y-12">
            <h2 className="text-6xl font-black uppercase italic text-white">VERIFICATION_<span className="text-red-600">REQUIRED</span></h2>
            <div className="max-w-md mx-auto flex gap-4">
              <input maxLength={6} placeholder="000000" value={userInputKey} onChange={(e) => setUserInputKey(e.target.value)} className="flex-grow bg-slate-950 border-2 border-slate-900 p-8 text-4xl text-center text-white font-mono outline-none focus:border-red-600" />
              <button onClick={() => { if(userInputKey === serverChallenge) setStep("audit"); }} className="bg-white text-black px-10 font-black uppercase italic hover:bg-red-600 hover:text-white transition-all">Authorize</button>
            </div>
          </motion.div>
        )}

        {step === 'audit' && (
          <motion.div key="audit" className="space-y-12 text-left">
            <div className="flex items-center gap-4 text-red-600"><Activity className="h-4 w-4 animate-pulse" /><span className="font-black uppercase tracking-[0.4em] text-[10px]">PROTOCOL_NODE_0{currentDimension + 1}</span></div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white leading-tight min-h-[160px]">{LOCAL_QUESTIONS[currentDimension]?.text}</h2>
            <div className="grid grid-cols-1 gap-4 mt-16">
              {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                <button key={i} className="py-10 px-12 border-2 border-slate-800 bg-slate-950/20 hover:border-red-600 transition-all text-left uppercase font-black text-slate-400 hover:text-white group relative" onClick={() => {
                  const updatedAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                  setAnswers(updatedAnswers);
                  if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(currentDimension + 1);
                  else { logToDatabase(getLiveMetrics()); setStep("verdict"); }
                }}>
                  <span className="relative z-10">{opt.label}</span>
                  <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'verdict' && (
          <motion.div key="verdict" className="space-y-12 text-center py-10">
            <h2 className="text-7xl font-black italic uppercase text-white leading-none">INVESTED CAPITAL HAS <span className="text-red-600">{getLiveMetrics().decay}% DECAY</span></h2>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-950 border border-slate-900 text-left"><p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-1">REWORK_TAX_ESTIMATE</p><p className="text-2xl font-black italic">${getLiveMetrics().rework}M / YR</p></div>
                <div className="p-6 bg-slate-950 border border-slate-900 text-left"><p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-1">DRIFT_PROBABILITY</p><p className="text-2xl font-black italic">{getLiveMetrics().delta}%</p></div>
              </div>
              <div className="bg-slate-950 p-8 border border-slate-900 space-y-6">
                <div className="flex justify-between items-end text-left font-black italic">
                   <div><label className="text-[10px] font-mono text-slate-500 uppercase">Capital_Exposure</label><p className="text-3xl">${aiSpend.toFixed(1)}M</p></div>
                   <div className="text-right text-red-600"><label className="text-[10px] font-mono uppercase">Dynamic_ROI</label><p className="text-3xl">{getLiveMetrics().roi}%</p></div>
                </div>
                <input type="range" min="0.1" max="10" step="0.1" value={aiSpend} onChange={(e) => setAiSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 accent-red-600 appearance-none cursor-pointer" />
              </div>
              <div className="flex flex-col gap-4">
                <button onClick={handleSecureBriefing} className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-widest text-xs hover:bg-white hover:text-black transition-all shadow-xl shadow-red-900/20">SECURE_FULL_FORENSIC_BRIEFING</button>
                <button onClick={generateForensicPDF} className="w-full py-4 border border-slate-800 text-slate-400 font-black uppercase italic text-[10px] flex items-center justify-center gap-4 hover:text-white transition-all"><Download size={14} /> DOWNLOAD_FORENSIC_SUMMARY_PDF</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <LogicLeakTicker />
    </div>
  );
}
