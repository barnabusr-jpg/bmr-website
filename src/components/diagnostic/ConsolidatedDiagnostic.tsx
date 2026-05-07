"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

// ... [Keep your full LOCAL_QUESTIONS array here] ...

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [selectedLens, setSelectedLens] = useState<string | null>(null); 
  const [sector, setSector] = useState("finance");
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [aiSpend, setAiSpend] = useState(1.2);
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
      const { data: auditData } = await supabase.from('audits').insert([{ 
        org_name: entityName.toUpperCase(), lead_email: email.toLowerCase(), sector, ai_spend: aiSpend, 
        status: 'LEAD', decay_pct: finalMetrics.decay, rework_tax: parseFloat(finalMetrics.rework), raw_responses: answers 
      }]).select().single();

      if (auditData) {
        await supabase.from('operators').upsert({ 
          email: email.toLowerCase(), full_name: operatorName.toUpperCase(), entity_id: ent?.id, 
          audit_id: auditData.id, persona_type: selectedLens, raw_responses: answers, status: 'COMPLETED' 
        });
        window.location.href = `/results/${auditData.id}`;
      }
    } catch (e) { console.error(e); setIsLoading(false); }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">
        {step === 'triage' && (
          <motion.div key="triage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 text-center">
            <h1 className="text-[60px] md:text-[100px] font-black uppercase italic tracking-tighter text-white leading-none">
              CHOOSE_<span className="text-red-600">LENS</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {["EXECUTIVE", "OPERATIONAL", "TECHNICAL"].map((id) => (
                <button 
                  key={id} 
                  onClick={() => setSelectedLens(id)}
                  className={`p-8 border-2 transition-all font-black italic tracking-widest ${selectedLens === id ? 'bg-red-600 border-red-600 text-white' : 'bg-slate-950 border-slate-900 text-slate-500 hover:border-slate-700'}`}
                >
                  {id}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sectors.map((s) => (
                <button 
                  key={s.id} 
                  disabled={!selectedLens}
                  onClick={() => { setSector(s.id); setStep("intake"); }}
                  className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-44 disabled:opacity-10"
                >
                  <div className="text-red-600 mb-4">{s.icon}</div>
                  <h3 className="text-xl font-black uppercase italic text-white leading-none">{s.label}</h3>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ... [Rest of Intake & Audit Steps] ... */}
      </AnimatePresence>

      {isLoading && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center">
          <Activity className="text-red-600 animate-spin mb-4" size={48} />
          <span className="text-red-600 font-mono tracking-[0.5em] uppercase">Uploading_Logic_Blocks...</span>
        </div>
      )}
    </div>
  );
}
