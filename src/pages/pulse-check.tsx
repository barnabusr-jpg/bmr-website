"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

  useEffect(() => { setMounted(true); }, []);

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
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30 font-sans italic overflow-x-hidden">
      <Header />
      <main className="max-w-6xl mx-auto py-40 px-6 relative min-h-[900px] text-left">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-950/98 z-[9999] flex flex-col items-center justify-center text-red-600">
              <Activity className="animate-spin mb-4" size={64} />
              <p className="font-black uppercase tracking-[0.5em] text-sm italic">SYNTHESIZING_VALUATION...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === 'triage' && (
            <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16 text-center">
              <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none italic">AI <span className="text-red-600">EFFICIENCY</span> AUDIT</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((node) => (
                  <button key={node} onClick={() => setSelectedLens(node)} className={`p-10 border-2 flex flex-col items-center gap-3 transition-all ${selectedLens === node ? 'bg-red-600 border-red-600 shadow-2xl' : 'bg-slate-950 border-slate-900'}`}>
                    {selectedLens === node ? <Unlock size={24} /> : <Lock size={24} />}
                    <span className="font-black italic text-lg uppercase">{node}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {sectors.map((s) => (
                  <button key={s.id} disabled={!selectedLens} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950 border-2 border-slate-900 hover:border-red-600 disabled:opacity-20 flex flex-col h-48 text-left justify-between">
                    <div className="text-red-600">{s.icon}</div>
                    <h3 className="text-2xl font-black uppercase italic">{s.label}</h3>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'intake' && (
            <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
              <h2 className="text-5xl font-black uppercase italic text-center">PROTOCOL <span className="text-red-600">REGISTRATION</span></h2>
              <div className="bg-slate-950 border border-slate-900 p-12 space-y-8">
                <input placeholder="NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-black border-b border-slate-800 p-6 text-white w-full uppercase outline-none focus:border-red-600" />
                <input placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black border-b border-slate-800 p-6 text-white w-full uppercase outline-none focus:border-red-600" />
                <button disabled={!operatorName || !email} onClick={() => setStep("audit")} className="w-full py-8 font-black uppercase italic bg-red-600 text-white tracking-widest text-2xl italic">Initialize Observation</button>
              </div>
            </motion.div>
          )}

          {step === 'audit' && (
            <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-5xl mx-auto">
              <div className="text-red-600 font-mono text-[10px] tracking-[0.4em] italic uppercase">CASE_BMR_2026_SEG_0{currentDimension + 1}</div>
              <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-none min-h-[200px]">{LOCAL_QUESTIONS[currentDimension]?.text}</h2>
              <div className="grid grid-cols-1 gap-4">
                {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                  <button key={i} className="py-8 px-10 border-2 border-slate-900 bg-slate-950/40 hover:border-red-600 transition-all text-left uppercase font-black text-2xl flex justify-between items-center group" 
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
                    {opt.label} <ChevronRight size={32} className="opacity-0 group-hover:opacity-100 transition-all" />
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
