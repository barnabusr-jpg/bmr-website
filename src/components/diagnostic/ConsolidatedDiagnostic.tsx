"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// --- [CONSTANTS: SECTORS & QUESTIONS] ---
const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

const LOCAL_QUESTIONS = [
  { id: "RT_01", text: "AI standard operating procedures (SOPs) are documented and followed.", options: [{ label: "Non-existent", weight: 10 }, { label: "Ad-hoc", weight: 6 }, { label: "Formalized", weight: 4 }, { label: "Optimized", weight: 2 }] },
  // ... [Keep your existing question array here] ...
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance");
  const [selectedLens, setSelectedLens] = useState<string | null>(null); 
  const [aiSpend, setAiSpend] = useState(1.2);
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const scaledTotal = (totalSum * 0.04) * Math.pow(aiSpend / 1.2, 1.15);
    return { 
      decay: Math.min(Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100), 98), 
      rework: (scaledTotal * 0.38).toFixed(1) 
    };
  };

  const logToDatabase = async () => {
    setIsLoading(true);
    const finalMetrics = getLiveMetrics();
    try {
      const { data: ent } = await supabase.from('entities').upsert({ name: entityName.toUpperCase() }, { onConflict: 'name' }).select().single();

      const { data: auditData, error: auditErr } = await supabase.from('audits').insert([{ 
        org_name: entityName.toUpperCase(), 
        lead_email: email.toLowerCase(), 
        sector, 
        ai_spend: aiSpend, 
        status: 'LEAD',
        decay_pct: finalMetrics.decay,
        rework_tax: parseFloat(finalMetrics.rework),
        raw_responses: answers 
      }]).select().single();

      if (auditErr || !auditData) throw new Error("AUDIT_FAILED");

      await supabase.from('operators').upsert({ 
        email: email.toLowerCase(), 
        full_name: operatorName.toUpperCase(), 
        entity_id: ent?.id, 
        audit_id: auditData.id, 
        persona_type: selectedLens, 
        raw_responses: answers, 
        status: 'COMPLETED' 
      });

      window.location.href = `/results/${auditData.id}`;
    } catch (e) { 
      console.error("DATA_FRACTURE:", e);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-6">
      <AnimatePresence mode="wait">
        {step === "triage" && (
          <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto text-center space-y-12">
            <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter">Choose_Lens</h1>
            <div className="grid grid-cols-3 gap-4">
              {["EXECUTIVE", "OPERATIONAL", "TECHNICAL"].map(l => (
                <button key={l} onClick={() => setSelectedLens(l)} className={`p-6 border-2 font-black italic tracking-widest ${selectedLens === l ? 'bg-red-600 border-red-600' : 'bg-black border-slate-900 text-slate-500'}`}>{l}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {sectors.map(s => (
                <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-black border-2 border-slate-900 hover:border-red-600 text-white font-black italic uppercase text-xs">{s.label}</button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "intake" && (
          <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
            <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="w-full bg-black border border-slate-800 p-6 text-white font-mono uppercase" />
            <input placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-slate-800 p-6 text-white font-mono uppercase" />
            <button onClick={() => setStep("audit")} className="w-full bg-red-600 py-6 text-white font-black italic uppercase tracking-widest">Start_Audit</button>
          </motion.div>
        )}

        {step === "audit" && (
          <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">{LOCAL_QUESTIONS[currentDimension].text}</h2>
            <div className="grid grid-cols-1 gap-4">
              {LOCAL_QUESTIONS[currentDimension].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    const nextAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                    setAnswers(nextAnswers);
                    if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(prev => prev + 1);
                    else logToDatabase();
                  }}
                  className="p-8 bg-black border-2 border-slate-900 text-left hover:border-red-600 group transition-all"
                >
                  <span className="text-slate-400 group-hover:text-white font-black uppercase italic tracking-widest">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center text-red-600 font-black italic tracking-widest animate-pulse">
          SYNCHRONIZING_DATABASE...
        </div>
      )}
    </div>
  );
}
