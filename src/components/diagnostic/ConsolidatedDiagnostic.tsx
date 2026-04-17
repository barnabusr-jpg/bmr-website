"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Download, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight, Fingerprint } from "lucide-react";
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
  const [selectedLens, setSelectedLens] = useState("EXECUTIVE"); 
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

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const e1 = email.trim().toLowerCase();
    const e2 = confirmEmail.trim().toLowerCase();
    if (e2.length > 0 && e1 !== e2) setValidationError("EMAIL_VERIFICATION_MISMATCH");
    else setValidationError(null);
  }, [email, confirmEmail]);

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * coeff) * multiplier;
    
    const decayRaw = scaledTotal === 0 ? 0 : Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);
    const reworkTax = parseFloat((scaledTotal * 0.38).toFixed(1));
    const monthlyBleed = reworkTax / 12;
    const inactionPenalty = (monthlyBleed * 6 * 1.12).toFixed(2);

    return {
      decay: Math.min(decayRaw, 98),
      rework: reworkTax.toFixed(1),
      delta: (scaledTotal * 0.32).toFixed(1),
      roi: aiSpend > 0 ? -((scaledTotal / aiSpend) * 100).toFixed(1) : "0",
      inactionCost: inactionPenalty
    };
  };

  const logToDatabase = async (finalMetrics: any) => {
    try {
      const { data: entityData, error: entityError } = await supabase
        .from('entities')
        .upsert({ name: entityName.trim().toUpperCase() }, { onConflict: 'name' })
        .select().single();

      if (entityError) throw entityError;

      const { data: operatorData, error: operatorError } = await supabase
        .from('operators')
        .upsert({ 
          email: email.trim().toLowerCase(), 
          full_name: operatorName.trim().toUpperCase(), 
          entity_id: entityData.id 
        }, { onConflict: 'email' })
        .select().single();

      if (operatorError) throw operatorError;

      await supabase.from('audits').insert([{
        operator_id: operatorData.id,
        sector: sector,
        ai_spend: aiSpend,
        decay_pct: finalMetrics.decay,
        rework_tax: parseFloat(finalMetrics.rework),
        roi_pct: parseFloat(finalMetrics.roi),
        persona_type: selectedLens, 
        org_name: entityName.trim().toUpperCase(), 
        lead_email: email.trim().toLowerCase(), 
        raw_responses: answers,
        status: 'LEAD'
      }]);
    } catch (error: any) {
      console.error("BMR_SYNC_CRITICAL_FAILURE:", error.message);
    }
  };

  const handleSecureBriefing = () => {
    if (typeof window === 'undefined') return;
    const m = getLiveMetrics();
    const params = new URLSearchParams();
    params.append('name', operatorName.trim());
    params.append('email', email.trim());
    params.append('utm_campaign', entityName.trim().toUpperCase());
    params.append('utm_content', `SFI_${m.decay}_Rework_${m.rework}M`);
    window.open(`https://calendly.com/hello-bmradvisory/forensic-review?${params.toString()}`, '_blank');
  };

  const generateForensicPDF = () => {
    const m = getLiveMetrics();
    const doc = new jsPDF();
    doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("BMR ADVISORY // SYSTEMIC FRICTION AUDIT", 15, 15);
    doc.setFont("courier", "normal"); doc.setFontSize(8);
    doc.text(`AUDIT_REF: ${entityName.toUpperCase()} // ORIGIN: ${selectedLens}`, 15, 22);

    doc.setTextColor(2, 6, 23); doc.setFontSize(10); doc.setFont("helvetica", "bold");
    doc.text("EXECUTIVE DIAGNOSTIC SUMMARY", 15, 45);
    doc.line(15, 47, 75, 47);
    doc.setFont("helvetica", "normal");
    doc.text(`Entity: ${entityName.toUpperCase()}`, 15, 55);
    doc.text(`Lead Persona: ${selectedLens}`, 15, 61);

    doc.setFillColor(245, 245, 245); doc.rect(15, 75, 180, 45, "F");
    doc.text("Systemic Friction Index (SFI)", 20, 90); doc.text(`${m.decay}%`, 160, 90);
    doc.text("Current Annual Rework Tax", 20, 100); doc.text(`$${m.rework}M`, 160, 100);
    doc.setTextColor(220, 38, 38); doc.text("6-Month Inaction Cost", 20, 110); doc.text(`$${m.inactionCost}M`, 160, 110);
    doc.save(`BMR_Forensic_Pulse_${entityName}.pdf`);
  };

  const triggerForensicScan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/generate-key', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim().toLowerCase() }) });
      const data = await res.json();
      if (res.ok) { setServerChallenge(data.challenge); setStep("verify"); }
      else { setValidationError("TRANSMISSION_REJECTED"); }
    } catch (err) { setValidationError("LOGIC_SHEAR_DETECTION"); }
    setIsLoading(false);
  };

  if (!mounted) return null;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isReady = isEmailValid && email === confirmEmail && operatorName && entityName;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative min-h-[850px]">
      <AnimatePresence mode="wait">
        {isLoading && <ForensicLoader key="loader" onComplete={() => {}} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'triage' && (
          <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
            <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white text-center leading-none">THE LOGIC <span className="text-red-600">PULSE CHECK</span></h1>
            
            <div className="flex justify-center gap-4 mb-8">
                {["EXECUTIVE", "MANAGER", "TECHNICAL"].map((lens) => (
                    <button 
                        key={lens} 
                        onClick={() => {
                          setSelectedLens(lens);
                          localStorage.setItem("bmr_active_lens", lens);
                        }}
                        className={`px-6 py-2 border-2 font-black italic text-xs tracking-[0.2em] transition-all ${selectedLens === lens ? 'bg-red-600 border-red-600 text-white' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
                    >
                        {lens}_NODE
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {sectors.map((s) => (
                <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-48 group">
                  <div className="text-red-600">{s.icon}</div>
                  <div><h3 className="text-xl font-black uppercase italic text-white tracking-tighter leading-none">{s.label}</h3><p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">{s.risk}</p></div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'intake' && (
          <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-center">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">PROTOCOL <span className="text-red-600">REGISTRATION</span></h2>
            <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto space-y-6 shadow-2xl shadow-red-900/10 relative overflow-hidden">
               <Fingerprint className="absolute -top-10 -right-10 text-red-600 opacity-5" size={200} />
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <input placeholder="OPERATOR_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase outline-none focus:border-red-600 transition-all font-mono" />
                <input placeholder="ORGANIZATION" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase outline-none focus:border-red-600 transition-all font-mono" />
                <input placeholder="SECURE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase outline-none focus:border-red-600 transition-all font-mono" />
                <input placeholder="CONFIRM_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase outline-none focus:border-red-600 transition-all font-mono" />
              </div>
              <button disabled={!isReady} onClick={triggerForensicScan} className="w-full py-8 font-black uppercase italic bg-red-600 text-white disabled:opacity-20 transition-all text-xl tracking-[0.2em] relative z-10">Initialize Diagnostic Observation</button>
            </div>
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div key="verify" className="text-center space-y-12">
            <h2 className="text-6xl font-black uppercase italic text-white tracking-tighter">SECURE_<span className="text-red-600">VERIFICATION</span></h2>
            <div className="max-w-md mx-auto space-y-6">
              <div className="flex gap-4">
                <input maxLength={6} placeholder="000000" value={userInputKey} onChange={(e) => setUserInputKey(e.target.value)} className="flex-grow bg-slate-950 border-2 border-slate-900 p-8 text-4xl text-center text-white outline-none focus:border-red-600 font-mono" />
                <button onClick={() => { if(userInputKey === serverChallenge) setStep("audit"); }} className="bg-white text-black px-10 font-black uppercase italic">Authorize</button>
              </div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">A secure challenge key has been dispatched to your email.</p>
            </div>
          </motion.div>
        )}

        {step === 'audit' && (
          <motion.div key="audit" className="space-y-12 text-left">
            <div className="flex items-center gap-4 text-red-600"><Activity size={16} className="animate-pulse" /><span className="font-black uppercase tracking-[0.4em] text-[10px]">PULSE_SEGMENT_0{currentDimension + 1} // LENS: {selectedLens}</span></div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white leading-tight min-h-[160px] tracking-tighter">{LOCAL_QUESTIONS[currentDimension]?.text}</h2>
            <div className="grid grid-cols-1 gap-4 mt-16">
              {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                <button key={i} className="py-10 px-12 border-2 border-slate-800 bg-slate-950/20 hover:border-red-600 transition-all text-left uppercase font-black text-slate-400 hover:text-white flex justify-between items-center group" onClick={() => {
                  const updatedAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                  setAnswers(updatedAnswers);
                  if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(currentDimension + 1);
                  else { 
                    logToDatabase(getLiveMetrics()); 
                    localStorage.setItem("bmr_diagnostic_results", JSON.stringify(updatedAnswers));
                    setStep("verdict"); 
                  }
                }}>
                    <span>{opt.label}</span>
                    <ChevronRight size={24} className="opacity-0 group-hover:opacity-100 transition-all text-red-600" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'verdict' && (
          <motion.div key="verdict" className="space-y-12 text-white py-10">
            <div className="text-left border-l-4 border-red-600 pl-6 mb-12">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-2">PULSE CHECK <span className="text-red-600">VERDICT</span></h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Entity: {entityName.toUpperCase()} // Lead Lens: {selectedLens}</p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                  <Fingerprint size={160} />
               </div>
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-800 bg-slate-900 text-[10px] font-mono text-slate-500 uppercase tracking-widest"><th className="p-4 px-10">Metric</th><th className="p-4 px-10 text-right">Value</th></tr></thead>
                <tbody className="font-mono text-sm">
                  {/* Systemic Friction Index */}
                  <tr className="border-b border-slate-800">
                    <td className="p-10">
                      <div className="text-white uppercase font-black tracking-tighter text-xl italic mb-1">Systemic Friction Index</div>
                      <p className="text-[10px] leading-relaxed text-slate-500 font-mono normal-case max-w-md tracking-normal">
                        A measure of structural decay within your AI workflows; higher percentages indicate severe misalignment between executive intent and technical execution.
                      </p>
                    </td>
                    <td className="p-10 text-right font-black text-white text-3xl italic">{getLiveMetrics().decay}%</td>
                  </tr>

                  {/* Identified Rework Tax */}
                  <tr className="border-b border-slate-800">
                    <td className="p-10">
                      <div className="text-white uppercase font-black tracking-tighter text-xl italic mb-1">Identified Rework Tax</div>
                      <p className="text-[10px] leading-relaxed text-slate-500 font-mono normal-case max-w-md tracking-normal">
                        The hidden annual cost of your SMEs and engineers manually correcting, 'babysitting,' and verifying unreliable AI outputs.
                      </p>
                    </td>
                    <td className="p-10 text-right font-black text-white text-3xl italic">${getLiveMetrics().rework}M/yr</td>
                  </tr>

                  {/* 6-Month Inaction Cost */}
                  <tr className="border-b border-slate-800 bg-red-600/5">
                    <td className="p-10">
                      <div className="text-red-600 font-bold italic underline uppercase tracking-tighter text-xl mb-1">6-Month Inaction Cost</div>
                      <p className="text-[10px] leading-relaxed text-red-900/60 font-mono normal-case max-w-md tracking-normal">
                        The projected capital loss your organization will absorb over the next two quarters if current architectural fractures remain unaddressed.
                      </p>
                    </td>
                    <td className="p-10 text-right font-black text-red-600 text-3xl italic">${getLiveMetrics().inactionCost}M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-950 p-8 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-[10px] font-mono text-white uppercase tracking-widest italic">Capital Exposure Simulation (AI Spend)</label>
                    <p className="text-[9px] text-slate-500 font-mono uppercase mt-1 tracking-wider">
                      // Adjust slider to simulate your current annual budget and visualize risk
                    </p>
                  </div>
                  <p className="text-2xl font-black text-white italic">${aiSpend.toFixed(1)}M</p>
                </div>
                <input type="range" min="0.1" max="10" step="0.1" value={aiSpend} onChange={(e) => setAiSpend(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 accent-red-600 appearance-none cursor-pointer" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={handleSecureBriefing} className="flex-1 py-6 bg-red-600 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">SCHEDULE_SECURE_BRIEFING <ChevronRight size={16} /></button>
              <button onClick={generateForensicPDF} className="flex-1 py-6 border border-slate-800 text-slate-400 font-black uppercase text-[10px] flex items-center justify-center gap-4 hover:text-white transition-all"><Download size={16} /> DOWNLOAD_DIAGNOSTIC_PDF</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <LogicLeakTicker />
    </div>
  );
}
