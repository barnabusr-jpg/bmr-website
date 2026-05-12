"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight, Lock, Unlock } from "lucide-react";
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
  const [selectedLens, setSelectedLens] = useState<string | null>(null); 
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // 🛡️ RE-ENGINEERED DATABASE LOGGING (ACCEPTED PARAMETERS TO BYPASS STATE DELAY)
  const logToDatabase = async (finalMetrics: any, finalAnswers: any) => {
    try {
      const { data: ent } = await supabase.from('entities').upsert({ name: entityName.toUpperCase() }, { onConflict: 'name' }).select().single();
      
      const { data: auditData, error: auditError } = await supabase.from('audits').insert([{ 
        org_name: entityName.toUpperCase(),
        lead_email: email.toLowerCase(),
        sector: sector,
        ai_spend: 1.2,
        decay_pct: finalMetrics.decay,
        rework_tax: parseFloat(finalMetrics.rework),
        raw_responses: finalAnswers,
        status: 'COMPLETE' 
      }]).select('id').single();

      if (auditError) throw auditError;

      await supabase.from('operators').upsert({ 
        email: email.toLowerCase(), 
        full_name: operatorName.toUpperCase(), 
        entity_id: ent?.id,
        audit_id: auditData.id,
        persona_type: selectedLens,
        status: 'COMPLETE',
        raw_responses: finalAnswers
      }, { onConflict: 'email,audit_id' });

      return auditData.id;
    } catch (e) { 
      console.error("DB_LOG_FAILURE:", e);
      return null; 
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 relative min-h-[850px] text-left italic font-sans selection:bg-red-600/30">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-950/98 z-[9999] flex flex-col items-center justify-center text-red-600">
            <Activity className="animate-spin mb-4" size={64} />
            <p className="font-black uppercase tracking-[0.5em] text-sm">GENERATING_CASE_FILE...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'triage' && (
          <motion.div key="triage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 text-center">
            <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter text-white leading-none">
                AI <span className="text-red-600 italic">EFFICIENCY</span> AUDIT
              </h1>
              <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-2xl font-bold italic leading-relaxed uppercase">
                Identify operational focus to begin triangulation.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto pt-8 border-t border-slate-900">
              <p className="text-[11px] font-mono text-red-500 uppercase tracking-[0.4em] mb-10 font-black">Step 1: Choose Operational Focus</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((node) => (
                  <button key={node} onClick={() => setSelectedLens(node)} className={`p-10 border-2 flex flex-col items-center gap-4 transition-all min-h-[180px] group ${selectedLens === node ? 'bg-red-600 border-red-600 text-white' : 'bg-slate-950 border-slate-900 text-slate-700 hover:border-slate-700'}`}>
                    {selectedLens === node ? <Unlock size={28} /> : <Lock size={28} className="opacity-20" />}
                    <span className="font-black text-xl tracking-[0.1em] uppercase italic">{node}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-10">
              {sectors.map((s) => (
                <button key={s.id} disabled={!selectedLens} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-10 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-56 group disabled:opacity-20 disabled:grayscale">
                  <div className="text-red-600 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div>
                    <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter leading-none italic">{s.label}</h3>
                    <p className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-widest mt-2 italic">{s.risk}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'intake' && (
          <motion.div key="intake" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 text-center max-w-4xl mx-auto italic">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">PROTOCOL <span className="text-red-600">REGISTRATION</span></h2>
            <div className="bg-slate-950/40 border-2 border-slate-900 p-12 space-y-10 text-left shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black">Full Name</label>
                  <input placeholder="OPERATOR_ID" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black">Organization</label>
                  <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black">Email Address</label>
                  <input placeholder="INTEL_CHANNEL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black">Confirm Email</label>
                  <input placeholder="VERIFY_CHANNEL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                </div>
              </div>
              <button 
                disabled={!operatorName || !entityName || email !== confirmEmail || !email} 
                onClick={() => setStep("audit")} 
                className="w-full py-10 font-black uppercase bg-red-600 text-white disabled:opacity-20 text-3xl tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all leading-none mt-6 shadow-[0_20px_50px_rgba(220,38,38,0.2)]"
              >
                Initialize Observation
              </button>
            </div>
          </motion.div>
        )}

        {step === 'audit' && (
          <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-left max-w-5xl mx-auto italic">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16 border-b border-slate-900 pb-8">
              <div className="bg-red-600 text-white px-4 py-1">
                <p className="font-mono text-[10px] font-black tracking-[0.2em] uppercase">LIVE_SIGNAL_ACTIVE</p>
              </div>
              <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px] font-bold tracking-[0.3em] uppercase">
                <Activity size={16} className="text-red-600 animate-pulse" />
                <span>CASE_FILE: BMR_2026_SEG_0{currentDimension + 1}</span>
                <span className="text-slate-800">//</span>
                <span className="text-red-600/50">TRNGL_REF: {sector.toUpperCase()}_{selectedLens}</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-7xl font-black uppercase text-white leading-[0.9] tracking-tighter">
              {LOCAL_QUESTIONS[currentDimension]?.text}
            </h2>

            <div className="grid grid-cols-1 gap-4 mt-20">
              {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                <button key={i} className="py-10 px-12 border-2 border-slate-900 bg-slate-950/40 hover:border-red-600 transition-all text-left uppercase font-black text-slate-500 hover:text-white flex justify-between items-center group relative overflow-hidden italic shadow-xl" 
                  onClick={async () => {
                    // 🛡️ CAPTURE UPDATED STATE IN CONSTANT TO BYPASS REACT DELAY
                    const updatedAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                    setAnswers(updatedAnswers);

                    if (currentDimension < LOCAL_QUESTIONS.length - 1) {
                      setCurrentDimension(currentDimension + 1);
                    } else {
                      setIsLoading(true);
                      
                      // CALCULATE FINAL METRICS ATOMICALLY
                      const totalSum = Object.values(updatedAnswers).reduce((a, b) => a + parseInt(b || "0"), 0);
                      const scaledTotal = (totalSum * 0.04);
                      const decayRaw = Math.round((1 - (1 / (1 + (totalSum * 0.05) / 10))) * 100);
                      const finalMetrics = { decay: Math.min(decayRaw, 98), rework: scaledTotal.toFixed(2) };

                      const auditId = await logToDatabase(finalMetrics, updatedAnswers); 
                      
                      if (auditId) {
                        // FORCE REDIRECT
                        window.location.assign(`/results/${auditId}`);
                      } else {
                        setIsLoading(false);
                        alert("SIGNAL_LOSS: DATABASE_SYNC_FAILED.");
                      }
                    }
                  }}>
                  <span className="text-2xl md:text-4xl tracking-tighter transition-transform group-hover:translate-x-4">{opt.label}</span>
                  <ChevronRight size={40} className="opacity-0 group-hover:opacity-100 transition-all text-red-600 -translate-x-8 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
