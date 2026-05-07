"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Banknote, Stethoscope, Factory, ShoppingCart, 
  ChevronRight, ArrowRight, ShieldCheck 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// SECTOR DEFINITIONS
const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

// QUESTION ARCHITECTURE
const LOCAL_QUESTIONS = [
  { id: "RT_01", text: "AI standard operating procedures (SOPs) are documented and followed.", options: [{ label: "Non-existent", weight: 10 }, { label: "Ad-hoc/Manual", weight: 6 }, { label: "Formalized", weight: 4 }, { label: "Automated/Optimized", weight: 2 }] },
  { id: "RT_02", text: "Regular audits of AI model outputs for accuracy and bias are conducted.", options: [{ label: "Never", weight: 10 }, { label: "Infrequently", weight: 7 }, { label: "Regularly", weight: 4 }, { label: "Continuous/Real-time", weight: 2 }] },
  { id: "RT_03", text: "Data privacy and security protocols specifically for AI are in place.", options: [{ label: "None", weight: 10 }, { label: "Basic/General", weight: 6 }, { label: "Specific/Robust", weight: 3 }, { label: "Advanced/Certified", weight: 1 }] },
  { id: "RT_04", text: "Staff are trained on the ethical and safe use of AI tools.", options: [{ label: "No training", weight: 10 }, { label: "Basic awareness", weight: 7 }, { label: "Role-specific training", weight: 4 }, { label: "Comprehensive/Ongoing", weight: 2 }] },
  { id: "RT_05", text: "A clear framework exists for human-in-the-loop oversight of AI decisions.", options: [{ label: "No oversight", weight: 10 }, { label: "Minimal/Manual", weight: 6 }, { label: "Defined protocols", weight: 4 }, { label: "Strictly enforced", weight: 2 }] }
];

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
      // 1. Ensure Entity Exists
      const { data: ent } = await supabase.from('entities')
        .upsert({ name: entityName.toUpperCase() }, { onConflict: 'name' })
        .select().single();

      // 2. Create Audit Record (Primary ID)
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

      if (auditErr || !auditData) throw new Error("AUDIT_SYNC_FAILURE");

      // 3. Link Operator & Save Answers
      await supabase.from('operators').upsert({ 
        email: email.toLowerCase(), 
        full_name: operatorName.toUpperCase(), 
        entity_id: ent?.id, 
        audit_id: auditData.id, 
        persona_type: selectedLens, 
        raw_responses: answers, 
        status: 'COMPLETED' 
      });

      // 4. Final Redirect to Forensic Dossier
      window.location.href = `/results/${auditData.id}`;
    } catch (e) { 
      console.error("DATA_FRACTURE:", e);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 min-h-[700px] relative">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: TRIAGE */}
        {step === 'triage' && (
          <motion.div key="triage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-16 text-center">
            <header className="space-y-4">
              <h1 className="text-[50px] md:text-[90px] font-black uppercase italic tracking-tighter text-white leading-none">
                THE LOGIC <span className="text-red-600">PULSE CHECK</span>
              </h1>
              <p className="text-slate-500 font-mono text-[10px] tracking-[0.5em] uppercase">Initialize Forensic Environment Assessment</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {["EXECUTIVE", "OPERATIONAL", "TECHNICAL"].map((id) => (
                <button 
                  key={id} 
                  onClick={() => setSelectedLens(id)}
                  className={`p-8 border-2 transition-all font-black italic tracking-widest text-xs ${selectedLens === id ? 'bg-red-600 border-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)]' : 'bg-slate-950 border-slate-900 text-slate-500 hover:border-slate-700'}`}
                >
                  {id}_LENS
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sectors.map((s) => (
                <button 
                  key={s.id} 
                  disabled={!selectedLens}
                  onClick={() => { setSector(s.id); setStep("intake"); }}
                  className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-44 group disabled:opacity-10"
                >
                  <div className="text-red-600 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div>
                    <h3 className="text-xl font-black uppercase italic text-white leading-none mb-1">{s.label}</h3>
                    <p className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">{s.risk}_RISK</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: INTAKE */}
        {step === 'intake' && (
          <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-12 py-20 text-center">
            <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter">PROTOCOL <span className="text-red-600">REGISTRATION</span></h2>
            <div className="grid grid-cols-1 gap-4">
              <input placeholder="NAME / OPERATOR_ID" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white uppercase font-mono text-sm focus:border-red-600 outline-none" />
              <input placeholder="ORGANIZATION / ENTITY" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white uppercase font-mono text-sm focus:border-red-600 outline-none" />
              <input placeholder="INTEL_CHANNEL (EMAIL)" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-white uppercase font-mono text-sm focus:border-red-600 outline-none" />
              <button 
                onClick={() => setStep("audit")} 
                disabled={!email || !entityName}
                className="bg-red-600 text-white py-8 font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                INITIALIZE_OBSERVATION <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: AUDIT QUESTIONS */}
        {step === 'audit' && (
          <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
            <header className="flex justify-between items-end border-b border-slate-900 pb-6">
              <div className="text-[10px] font-mono text-red-600 font-black tracking-[0.4em] uppercase italic">Dimension_{currentDimension + 1}_of_5</div>
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{selectedLens} // {sector}</div>
            </header>

            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter leading-tight">
              {LOCAL_QUESTIONS[currentDimension]?.text}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    const nextAnswers = { ...answers, [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() };
                    setAnswers(nextAnswers);
                    if (currentDimension < LOCAL_QUESTIONS.length - 1) {
                      setCurrentDimension(prev => prev + 1);
                    } else {
                      logToDatabase();
                    }
                  }}
                  className="p-8 bg-slate-950/30 border-2 border-slate-900 text-left hover:border-red-600 group transition-all flex justify-between items-center"
                >
                  <span className="text-slate-400 group-hover:text-white font-black uppercase italic tracking-widest text-lg">{opt.label}</span>
                  <ChevronRight size={24} className="text-red-600 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSISTENT LOADING OVERLAY */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center">
          <Activity className="text-red-600 animate-spin mb-6" size={64} />
          <div className="text-red-600 font-black italic tracking-[0.5em] uppercase text-xl animate-pulse">Synchronizing_Database...</div>
          <p className="text-slate-600 font-mono text-[10px] mt-4 uppercase tracking-widest">Generating Forensic Result ID</p>
        </div>
      )}
    </div>
  );
}
