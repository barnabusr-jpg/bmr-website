"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart, Activity, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// 1. THE DATA ENGINE (RE-INSTATED)
const LOCAL_QUESTIONS = [
  { id: "RT_01", text: "AI standard operating procedures (SOPs) are documented and followed.", options: [{ label: "Non-existent", weight: 10 }, { label: "Ad-hoc/Manual", weight: 6 }, { label: "Formalized", weight: 4 }, { label: "Automated/Optimized", weight: 2 }] },
  { id: "RT_02", text: "Our organization has a clear AI ethics and governance framework.", options: [{ label: "No framework", weight: 10 }, { label: "Basic guidelines", weight: 6 }, { label: "Formal audits", weight: 4 }, { label: "Continuous monitoring", weight: 2 }] },
  { id: "RT_03", text: "AI roles and responsibilities are clearly defined across teams.", options: [{ label: "Undefined", weight: 10 }, { label: "Informal roles", weight: 6 }, { label: "Dedicated AI team", weight: 4 }, { label: "Cross-functional matrix", weight: 2 }] },
  { id: "DG_01", text: "Our AI systems directly contribute to measurable business ROI.", options: [{ label: "Not tracked", weight: 10 }, { label: "Anecdotal evidence", weight: 6 }, { label: "Specific KPIs", weight: 4 }, { label: "Direct impact", weight: 2 }] },
  { id: "DG_02", text: "AI initiatives are aligned with the core strategic vision.", options: [{ label: "Disconnected", weight: 10 }, { label: "Loosely aligned", weight: 6 }, { label: "Integrated", weight: 4 }, { label: "Strategy-driven", weight: 2 }] },
  { id: "DG_03", text: "We have a budget and resources for AI scaling.", options: [{ label: "No budget", weight: 10 }, { label: "Project-based", weight: 6 }, { label: "Annual budget", weight: 4 }, { label: "Venture-scale", weight: 2 }] },
  { id: "SA_01", text: "AI vendors are assessed for risk before contract signing.", options: [{ label: "No oversight", weight: 10 }, { label: "Basic checks", weight: 6 }, { label: "Formal audits", weight: 4 }, { label: "Continuous monitoring", weight: 2 }] },
  { id: "SA_02", text: "Unauthorized AI tool usage is actively monitored and blocked.", options: [{ label: "No monitoring", weight: 10 }, { label: "Reactive", weight: 6 }, { label: "Alerts", weight: 4 }, { label: "Zero-Zero Token", weight: 2 }] },
  { id: "ED_01", text: "Our data infrastructure can handle real-time AI processing.", options: [{ label: "Legacy", weight: 10 }, { label: "Hybrid", weight: 6 }, { label: "Cloud-native", weight: 4 }, { label: "Edge", weight: 2 }] },
  { id: "ED_02", text: "We leverage proprietary datasets to train specialized models.", options: [{ label: "Public only", weight: 10 }, { label: "Minimal", weight: 6 }, { label: "Significant", weight: 4 }, { label: "Proprietary", weight: 2 }] },
  { id: "ED_03", text: "API and model versioning are strictly controlled.", options: [{ label: "Manual", weight: 10 }, { label: "Basic", weight: 6 }, { label: "Automated", weight: 4 }, { label: "MLOps", weight: 2 }] },
  { id: "ED_04", text: "Computing resources (GPU/Cloud) are managed efficiently.", options: [{ label: "High waste", weight: 10 }, { label: "Partial", weight: 6 }, { label: "Managed", weight: 4 }, { label: "Hyper", weight: 2 }] }
];

// ✨ FIX: Standardized IDs to match database tracking constants exactly
const sectors = [
  { id: "FINANCE", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "HEALTHCARE", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "INDUSTRIAL", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "SERVICES", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function PulseCheck() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("FINANCE");
  const [selectedLens, setSelectedLens] = useState<string | null>(null);
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  
  // 2. STATE FOR QUESTIONS (RE-INSTATED)
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const validateIntake = () => {
    return operatorName.length > 1 && entityName.length > 1 && email.includes('@') && email === confirmEmail;
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
        sector: sector, // Always maps cleanly to uppercase rules now
        decay_pct: metrics.decay,
        rework_tax: parseFloat(metrics.rework),
        raw_responses: answers,
        status: 'COMPLETED',
        roi_pct: 6,
        ai_spend: 1.2
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
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans italic overflow-x-hidden uppercase font-black relative flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-40 px-6 relative text-center">
        <AnimatePresence mode="wait">
          
          {isLoading && (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-950/90 z-[9999] flex flex-col items-center justify-center text-red-600">
              <Activity className="animate-spin mb-4" size={64} />
              <p className="font-black uppercase tracking-[0.5em] text-sm italic">SYNTHESIZING_STRATEGY_DATA...</p>
            </motion.div>
          )}

          {step === 'triage' && (
            <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl space-y-16">
              <div className="border-b border-slate-900 pb-12 flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white italic">
                  STRATEGY <span className="text-red-600">INTAKE</span>
                </h1>

                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center gap-4 mt-8 text-red-600"
                >
                   <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]" />
                   <p className="text-[10px] font-mono uppercase tracking-[0.5em] font-bold">
                     {selectedLens ? `STATUS: FOCUS LOCKED [${selectedLens}] // SELECT SECTOR` : "STATUS: AWAITING FOCUS SELECTION"}
                   </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((node) => (
                  <button key={node} onClick={() => setSelectedLens(node)}
                    className={`p-10 border-2 flex flex-col items-center justify-center gap-4 transition-all min-h-[180px] ${selectedLens === node ? 'bg-red-600 border-red-600 text-white shadow-2xl scale-105' : 'bg-slate-950 border-slate-900 text-slate-700 hover:border-slate-500'}`}>
                    <span className="font-black italic text-xl tracking-[0.1em] uppercase">{node}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full pt-10">
                {sectors.map((s) => (
                  <button key={s.id} disabled={!selectedLens} onClick={() => { setSector(s.id); setStep("intake"); }}
                    className="p-10 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-center flex flex-col items-center justify-between h-64 group disabled:opacity-20">
                    <div className="text-red-600 group-hover:scale-110 transition-transform mb-4">{s.icon}</div>
                    <div>
                      <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter leading-none">{s.label}</h3>
                      <p className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-widest mt-2 italic">{s.risk}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'intake' && (
            <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl space-y-12 italic text-center">
              <div className="border-b border-slate-900 pb-10 flex flex-col items-center">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none italic">
                  ENTITY <span className="text-red-600 italic">REGISTRATION</span>
                </h2>
                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center gap-4 mt-8 text-red-600"
                >
                   <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]" />
                   <p className="text-[10px] font-mono uppercase tracking-[0.5em] font-bold">
                     {validateIntake() ? "VALIDATION COMPLETE // INITIALIZE INTAKE" : "STATUS: PROVIDE ENTITY DETAILS"}
                   </p>
                </motion.div>
              </div>

              <div className="bg-slate-950 border border-slate-900 p-12 space-y-12 shadow-2xl text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Full Name</label>
                    <input placeholder="ENTER NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Organization</label>
                    <input placeholder="ENTER COMPANY" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Business Email</label>
                    <input placeholder="USER@COMPANY.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black italic">Verify Email</label>
                    <input placeholder="CONFIRM EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-black border-b-2 border-slate-800 p-6 text-white w-full uppercase font-mono focus:border-red-600 outline-none transition-colors text-xl font-bold" />
                  </div>
                </div>
                <div className="pt-6">
                  <button disabled={!validateIntake()} onClick={() => setStep("audit")}
                    className="w-full py-8 font-black uppercase italic bg-red-600 text-white disabled:opacity-10 text-2xl tracking-[0.2em] hover:bg-white hover:text-red-600 transition-all border-2 border-red-600 flex items-center justify-center">
                    INITIALIZE INTAKE
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. THE AUDIT STEP RENDER (RE-INSTATED) */}
          {step === 'audit' && (
            <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl space-y-12 text-center italic">
              <div className="flex flex-col items-center border-b border-slate-900 pb-10 mb-12">
                 <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-tight tracking-tighter min-h-[160px]">
                   {LOCAL_QUESTIONS[currentDimension]?.text}
                 </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                  <button 
                    key={i} 
                    className="p-8 border-2 border-slate-900 bg-slate-950/50 hover:border-red-600 transition-all text-left uppercase font-black text-xl md:text-2xl flex justify-between items-center group"
                    onClick={async () => {
                      const updatedAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                      setAnswers(updatedAnswers);
                      
                      if (currentDimension < LOCAL_QUESTIONS.length - 1) {
                        setCurrentDimension(currentDimension + 1);
                      } else {
                        setIsLoading(true);
                        
                        const metrics = getLiveMetrics();
                        const auditId = await logToDatabase(metrics);
                        
                        if (auditId) {
                          try {
                            await fetch('/api/send-vault-link', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                email: email.toLowerCase().trim(),
                                orgName: entityName.toUpperCase().trim(),
                                auditId: auditId,
                                userName: operatorName.trim()
                              })
                            });
                          } catch (emailErr) {
                            console.error("Transactional background pipeline email error:", emailErr);
                          }

                          window.location.href = `/results/${auditId}`;
                        } else {
                          setIsLoading(false);
                        }
                      }
                    }}
                  >
                    {opt.label}
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
