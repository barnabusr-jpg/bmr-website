"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight, Lock, Unlock, AlertTriangle } from "lucide-react";
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

export default function PulseCheck() {
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
  const [emailError, setEmailError] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const isBusinessEmail = (val: string) => {
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'live.com', 'msn.com'];
    const domain = val.split('@')[1]?.toLowerCase();
    return domain && !personalDomains.includes(domain);
  };

  const validateIntake = () => {
    if (!operatorName || !entityName || !email) return false;
    if (email !== confirmEmail) return false;
    if (!isBusinessEmail(email)) return false;
    return true;
  };

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const scaledTotal = (totalSum * 0.04);
    const decayRaw = Math.round((1 - (1 / (1 + (totalSum * 0.05) / 10))) * 100);
    return { decay: Math.min(decayRaw, 98), rework: scaledTotal.toFixed(2) };
  };

  const logToDatabase = async (metrics: any) => {
    try {
      const { data: ent } = await supabase.from('entities').upsert({ name: entityName.toUpperCase() }, { onConflict: 'name' }).select().single();
      const { data: auditData, error: auditError } = await supabase.from('audits').insert([{ 
        org_name: entityName.toUpperCase(),
        lead_email: email.toLowerCase(),
        sector: sector,
        decay_pct: metrics.decay,
        rework_tax: parseFloat(metrics.rework),
        raw_responses: answers,
        status: 'COMPLETED' 
      }]).select('id').single();

      if (auditError) throw auditError;

      await supabase.from('operators').upsert({ 
        email: email.toLowerCase(), 
        full_name: operatorName.toUpperCase(), 
        entity_id: ent?.id,
        audit_id: auditData.id,
        persona_type: selectedLens,
        status: 'COMPLETED'
      });

      return auditData.id;
    } catch (e) { 
      console.error("Database Log Failure:", e);
      return null; 
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans italic overflow-x-hidden uppercase font-black flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto py-20 md:py-40 px-6 relative flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-950/98 z-[9999] flex flex-col items-center justify-center text-red-600">
              <Activity className="animate-spin mb-4" size={64} />
              <p className="font-black uppercase tracking-[0.5em] text-sm italic">SYNTHESIZING_STRATEGY_DATA...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* STEP 1: TRIAGE */}
          {step === 'triage' && (
            <motion.div key="triage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16 text-center">
              <h1 className="text-5xl md:text-9xl font-black uppercase italic tracking-tighter leading-none italic">STRATEGY <span className="text-red-600">INTAKE</span></h1>
              <div className="max-w-3xl mx-auto pt-8 border-t border-slate-900">
                
                {/* 🔴 PULSATING SIGNAL LINE */}
                <motion.div 
                  animate={{ opacity: [0.2, 1, 0.2] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center justify-center gap-3 mb-10"
                >
                  <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)]" />
                  <p className="text-[10px] md:text-[11px] font-mono text-red-500 uppercase tracking-[0.4em] font-black italic underline decoration-red-600/30 underline-offset-8">
                    Step 1: Choose Operational Focus
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((node) => (
                    <button key={node} onClick={() => setSelectedLens(node)} 
                      className={`p-10 border-2 flex flex-col items-center gap-4 transition-all min-h-[160px] group ${selectedLens === node ? 'bg-red-600 border-red-600 text-white shadow-[0_0_50px_rgba(220,38,38,0.3)] scale-105' : 'bg-slate-950 border-slate-900 text-slate-700 hover:border-slate-700'}`}>
                      {selectedLens === node ? <Unlock size={28} /> : <Lock size={28} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                      <span className="font-black italic text-xl tracking-[0.1em] uppercase">{node}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
                {sectors.map((s) => (
                  <button key={s.id} disabled={!selectedLens} onClick={() => { setSector(s.id); setStep("intake"); }} 
                    className="p-6 md:p-10 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-48 md:h-56 group disabled:opacity-20 disabled:grayscale">
                    <div className="text-red-600 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <div>
                      <h3 className="text-xl md:text-3xl font-black uppercase italic text-white tracking-tighter leading-none">{s.label}</h3>
                      <p className="text-[10px] md:text-[11px] font-mono font-bold text-red-600 uppercase tracking-widest mt-2 italic">{s.risk}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: INTAKE */}
          {step === 'intake' && (
            <motion.div key="intake" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 text-center max-w-4xl mx-auto italic">
              <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none italic">ENTITY <span className="text-red-600">REGISTRATION</span></h2>
              
              {/* 🔴 STATUS PULSE FOR REGISTRATION */}
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }} 
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex items-center justify-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <p className="text-[9px] font-mono tracking-[0.3em] text-red-600/70">STATUS: PROVIDE_ENTITY_DETAILS</p>
              </motion.div>

              <div className="bg-slate-950/40 border-2 border-slate-900 p-8 md:p-12 space-y-10 text-left shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Full Name</label>
                    <input placeholder="ENTER NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none text-xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Organization</label>
                    <input placeholder="ENTER COMPANY" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none text-xl font-bold" />
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Business Email</label>
                    <input placeholder="USER@COMPANY.COM" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        if(e.target.value && !isBusinessEmail(e.target.value)) setEmailError("BUSINESS_DOMAIN_REQUIRED");
                        else setEmailError("");
                      }} className={`bg-black border-b-2 p-6 text-white w-full uppercase font-mono outline-none text-xl font-bold ${emailError ? 'border-red-600' : 'border-slate-800 focus:border-red-600'}`} />
                    {emailError && <p className="text-red-600 font-mono text-[9px] mt-2 tracking-widest flex items-center gap-2 uppercase"><AlertTriangle size={12}/> {emailError}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Verify Email</label>
                    <input placeholder="CONFIRM EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none text-xl font-bold" />
                  </div>
                </div>
                <button 
                  disabled={!validateIntake()} 
                  onClick={() => setStep("audit")} 
                  className="w-full py-8 md:py-10 px-4 font-black uppercase italic bg-red-600 text-white disabled:opacity-20 text-lg md:text-3xl tracking-[0.1em] md:tracking-[0.2em] hover:bg-white hover:text-red-600 transition-all shadow-[0_20px_50_rgba(220,38,38,0.2)] leading-tight"
                >
                  INITIALIZE INTAKE
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: AUDIT */}
          {step === 'audit' && (
            <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-5xl mx-auto italic">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-slate-900 pb-8">
                <div className="bg-red-600 text-white px-4 py-1 w-fit font-mono text-[10px] font-black tracking-[0.2em] uppercase italic">FORENSIC_SIGNAL_ACTIVE</div>
                <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase italic">
                  <Activity size={16} className="text-red-600 animate-pulse" />
                  <span>INTEL_LOG: BMR_2026_UNIT_0{currentDimension + 1}</span>
                  <span className="text-red-600/50">SECTOR_REF: {sector.toUpperCase()}_{selectedLens}</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-7xl font-black italic uppercase leading-[1.1] min-h-[120px] md:min-h-[200px] tracking-tighter text-left md:text-center break-words">
                {LOCAL_QUESTIONS[currentDimension]?.text}
              </h2>
              <div className="grid grid-cols-1 gap-4 pt-8">
                {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                  <button key={i} className="py-6 md:py-8 px-6 md:px-10 border-2 border-slate-900 bg-slate-950/40 hover:border-red-600 transition-all text-left uppercase font-black text-xl md:text-2xl flex justify-between items-center group italic" 
                    onClick={async () => {
                      const updatedAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                      setAnswers(updatedAnswers);
                      if (currentDimension < LOCAL_QUESTIONS.length - 1) {
                        setCurrentDimension(currentDimension + 1);
                      } else {
                        setIsLoading(true);
                        const auditId = await logToDatabase(getLiveMetrics());
                        if (auditId) window.location.href = `/results/${auditId}`;
                        else setIsLoading(false);
                      }
                    }}>
                    <span className="max-w-[85%]">{opt.label}</span>
                    <ChevronRight size={32} className="opacity-0 group-hover:opacity-100 transition-all text-red-600 shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
