"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight } from "lucide-react";
import ForensicLoader from "@/components/ForensicLoader";
import { supabase } from "@/lib/supabaseClient";

const LOCAL_QUESTIONS = [
  { id: "RT_01", text: "AI standard operating procedures (SOPs) are documented and followed.", options: [{ label: "Non-existent", weight: 10 }, { label: "Ad-hoc/Manual", weight: 6 }, { label: "Formalized", weight: 4 }, { label: "Automated/Optimized", weight: 2 }] },
  { id: "RT_02", text: "Our organization has a clear AI ethics and governance framework.", options: [{ label: "No framework", weight: 10 }, { label: "Basic guidelines", weight: 6 }, { label: "Formal audits", weight: 4 }, { label: "Continuous monitoring", weight: 2 }] },
  { id: "DG_01", text: "Our AI systems directly contribute to measurable business ROI.", options: [{ label: "Not tracked", weight: 10 }, { label: "Anecdotal evidence", weight: 6 }, { label: "Specific KPIs", weight: 4 }, { label: "Direct impact", weight: 2 }] },
  { id: "SA_01", text: "AI vendors are assessed for risk before contract signing.", options: [{ label: "No oversight", weight: 10 }, { label: "Basic checks", weight: 6 }, { label: "Formal audits", weight: 4 }, { label: "Continuous monitoring", weight: 2 }] },
  { id: "SA_02", text: "Unauthorized AI tool usage is actively monitored and blocked.", options: [{ label: "No monitoring", weight: 10 }, { label: "Reactive", weight: 6 }, { label: "Alerts", weight: 4 }, { label: "Zero-Trust", weight: 2 }] },
  { id: "ED_01", text: "Our data infrastructure can handle real-time AI processing.", options: [{ label: "Legacy", weight: 10 }, { label: "Hybrid", weight: 6 }, { label: "Cloud-native", weight: 4 }, { label: "Edge", weight: 2 }] }
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
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverChallenge, setServerChallenge] = useState("");
  const [userInputKey, setUserInputKey] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const sectorWeights: any = { finance: 1.12, healthcare: 1.08, manufacturing: 1.15, retail: 1.02 };
    const coeff = sectorWeights[sector] || 1.0;
    const multiplier = Math.pow(aiSpend / 1.2, 1.15); 
    const scaledTotal = (totalSum * 0.04 * coeff) * multiplier;
    const decayRaw = scaledTotal === 0 ? 0 : Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100);
    const reworkTax = parseFloat((scaledTotal * 0.38).toFixed(1));
    return { decay: Math.min(decayRaw, 98), rework: reworkTax.toFixed(1) };
  };

  const logToDatabase = async (finalMetrics: any) => {
    const anchorOrg = entityName.trim().toUpperCase();
    const anchorEmail = email.trim().toLowerCase();
    const anchorName = operatorName.trim().toUpperCase();

    try {
      const { data: ent } = await supabase.from('entities').upsert({ name: anchorOrg }, { onConflict: 'name' }).select().single();
      const { data: op } = await supabase.from('operators').upsert({ email: anchorEmail, full_name: anchorName, entity_id: ent?.id }, { onConflict: 'email' }).select().single();
      
      const { data: auditData, error: auditError } = await supabase.from('audits').upsert([{ 
        org_name: anchorOrg,
        lead_email: anchorEmail,
        operator_id: op?.id,
        sector: sector,
        ai_spend: aiSpend,
        decay_pct: finalMetrics.decay,
        rework_tax: parseFloat(finalMetrics.rework),
        raw_responses: answers,
        status: 'LEAD' 
      }], { onConflict: 'org_name' }).select().single();

      if (auditError) throw auditError;
      return auditData.id;
    } catch (e) { 
      console.error("CRITICAL_HANDSHAKE_FAILURE:", e); 
      return null;
    }
  };

  const triggerForensicScan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/generate-key', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim().toLowerCase() }) });
      const data = await res.json();
      if (res.ok) { setServerChallenge(data.challenge); setStep("verify"); }
    } catch (err) { console.error(err); }
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
          <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 text-center">
            <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">THE LOGIC <span className="text-red-600">PULSE CHECK</span></h1>
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
          <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-center">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">PROTOCOL <span className="text-red-600">REGISTRATION</span></h2>
            <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="OPERATOR_NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase font-mono" />
                <input placeholder="ORGANIZATION" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase font-mono" />
                <input placeholder="SECURE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase font-mono" />
                <input placeholder="CONFIRM_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white w-full uppercase font-mono" />
              </div>
              <button disabled={!operatorName || email !== confirmEmail} onClick={triggerForensicScan} className="w-full py-8 font-black uppercase italic bg-red-600 text-white disabled:opacity-20 text-xl tracking-[0.2em]">Initialize Observation</button>
            </div>
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div key="verify" className="text-center space-y-12">
            <h2 className="text-6xl font-black uppercase italic text-white tracking-tighter italic">SECURE_<span className="text-red-600">VERIFICATION</span></h2>
            <div className="max-w-md mx-auto space-y-6">
              <div className="flex gap-4">
                <input maxLength={6} placeholder="000000" value={userInputKey} onChange={(e) => setUserInputKey(e.target.value)} className="flex-grow bg-slate-950 border-2 border-slate-900 p-8 text-4xl text-center text-white outline-none font-mono" />
                <button type="button" onClick={() => { if(userInputKey.trim() === serverChallenge.trim()) setStep("audit"); }} className="bg-white text-black px-10 font-black uppercase italic">Authorize</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'audit' && (
          <motion.div key="audit" className="space-y-12 text-left">
            <div className="flex items-center gap-4 text-red-600 font-black uppercase tracking-[0.4em] text-[10px]"><Activity size={16} className="animate-pulse" /> SEGMENT_0{currentDimension + 1}</div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white leading-tight min-h-[160px] tracking-tighter">{LOCAL_QUESTIONS[currentDimension]?.text}</h2>
            <div className="grid grid-cols-1 gap-4 mt-16">
              {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                <button key={i} className="py-10 px-12 border-2 border-slate-800 bg-slate-950/20 hover:border-red-600 transition-all text-left uppercase font-black text-slate-400 hover:text-white flex justify-between items-center group" 
                  onClick={async () => {
                    const updatedAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                    setAnswers(updatedAnswers);
                    if (currentDimension < LOCAL_QUESTIONS.length - 1) {
                      setCurrentDimension(currentDimension + 1);
                    } else {
                      setIsLoading(true);
                      const auditId = await logToDatabase(getLiveMetrics()); 
                      if (auditId) window.location.href = `/results/${auditId}`;
                    }
                  }}>
                    <span>{opt.label}</span>
                    <ChevronRight size={24} className="opacity-0 group-hover:opacity-100 transition-all text-red-600" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
