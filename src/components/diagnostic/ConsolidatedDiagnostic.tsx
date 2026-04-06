"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart } from "lucide-react";
import DiagnosticStep from "./DiagnosticStep";
import { FORENSIC_QUESTIONS } from "@/data/questions";

const sectors = [
  { id: "finance", label: "FINANCE", risk: "COMPLIANCE", icon: <Banknote size={24} /> },
  { id: "healthcare", label: "HEALTHCARE", risk: "LIABILITY", icon: <Stethoscope size={24} /> },
  { id: "manufacturing", label: "INDUSTRIAL", risk: "OPERATIONS", icon: <Factory size={24} /> },
  { id: "retail", label: "SERVICES", risk: "LABOR", icon: <ShoppingCart size={24} /> }
];

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);
  const [entityName, setEntityName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (confirmEmail.length > 0 && email !== confirmEmail) {
      setValidationError("EMAIL_VERIFICATION_MISMATCH");
    } else {
      setValidationError(null);
    }
  }, [email, confirmEmail]);

  if (!mounted) return null;

  // --- CALCULATION ENGINE (WITH NULL GUARDS) ---
  const calculateSynthesis = () => {
    // Ensure FORENSIC_QUESTIONS exists to prevent crash
    if (!FORENSIC_QUESTIONS || FORENSIC_QUESTIONS.length === 0) {
        return { total: "0.0", decay: 0, reworkTax: "0.0", deltaGap: "0.0" };
    }

    const getHemorrhage = (protocol: string) => {
      const pQs = FORENSIC_QUESTIONS.filter(q => q.protocol === protocol);
      const pVals = pQs.map(q => parseInt(answers[q.id] || "0")); // Added "0" fallback
      const sum = pVals.reduce((a, b) => a + b, 0);
      return (sum * 0.04).toFixed(1);
    };

    const totalVals = Object.values(answers).map(v => parseInt(v || "0"));
    const totalSum = totalVals.reduce((a, b) => a + b, 0);
    
    return {
      total: (totalSum * 0.04).toFixed(1),
      decay: Math.round((totalSum / 120) * 100),
      reworkTax: getHemorrhage('reworkTax'),
      deltaGap: getHemorrhage('deltaGap')
    };
  };

  const handleNext = () => {
    if (currentDimension < (FORENSIC_QUESTIONS?.length || 0) - 1) {
      setCurrentDimension(prev => prev + 1);
    } else {
      setStep("verdict");
    }
  };

  // --- VIEWS ---

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
      <div className="text-center">
        <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white">
          THE LOGIC <span className="text-red-600">DECAY SCREENING</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left flex flex-col justify-between h-48 group">
            <div className="text-red-600 mb-4">{s.icon}</div>
            <div>
              <h3 className="text-xl font-black uppercase italic text-white leading-none">{s.label}</h3>
              <p className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">{s.risk}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-white">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter italic">FORENSIC PROTOCOL <span className="text-red-600">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic leading-none">Sector Lock: {sector?.toUpperCase() || "PENDING"}</p>
      </div>
      
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600" />
          <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600/30' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600 transition-colors`} />
          <input type="email" placeholder="VERIFY_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600 transition-colors`} />
        </div>

        <div className="w-full">
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none cursor-pointer focus:border-red-600 appearance-none w-full italic">
            <option value="" disabled>SELECT_OPERATOR_ROLE</option>
            <option value="executive">EXECUTIVE_PERSPECTIVE</option>
            <option value="managerial">MANAGERIAL_PERSPECTIVE</option>
            <option value="technical">TECHNICAL_PERSPECTIVE</option>
          </select>
        </div>

        <div className="h-6 flex items-center justify-center">
          <AnimatePresence>
            {validationError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 font-mono text-[10px] uppercase text-center font-black tracking-widest leading-none">
                ⚠️ {validationError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button 
          disabled={!!validationError || !email || !confirmEmail || !userRole || !entityName}
          onClick={() => setStep("audit")} 
          className={`w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] transition-all ${validationError || !email ? 'bg-slate-900 text-slate-700 cursor-not-allowed opacity-50' : 'bg-red-600 text-white hover:bg-white hover:text-black shadow-xl shadow-red-900/10'}`}
        >
          Initialize Audit Observation
        </button>
      </div>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      {/* 🛡️ CRITICAL SAFETY GUARD: Prevents undefined access crash */}
      {FORENSIC_QUESTIONS && FORENSIC_QUESTIONS[currentDimension] ? (
        <>
          <DiagnosticStep 
            dimensionTitle={`PROTOCOL_NODE_${(currentDimension + 1).toString().padStart(2, '0')}`}
            questionText={FORENSIC_QUESTIONS[currentDimension].text}
            options={FORENSIC_QUESTIONS[currentDimension].options}
            answers={answers}
            questionId={FORENSIC_QUESTIONS[currentDimension].id}
            onAnswerChange={(id, val) => setAnswers(prev => ({ ...prev, [id]: val }))}
          />
          <div className="flex justify-between items-center pt-8 border-t border-slate-900">
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest italic font-bold leading-none">Signal {currentDimension + 1} of 12</span>
            <button onClick={handleNext} className="bg-red-600 px-12 py-6 text-white font-black uppercase italic tracking-widest text-xs hover:invert transition-all shadow-lg">
              {currentDimension === 11 ? "Execute Synthesis" : "Next Protocol"}
            </button>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-red-600 font-mono text-xs uppercase animate-pulse">
            Terminal_Data_Error: Question_Node_Undefined
        </div>
      )}
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-white">
      <div className="text-center py-12 border-b border-slate-900">
        <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none">HEMORRHAGE <span className="text-red-600">${calculateSynthesis().total}M</span></h2>
        <p className="text-slate-500 font-mono text-[10px] mt-4 uppercase tracking-[0.5em] font-bold italic leading-none">Forensic Alpha Synthesis Complete</p>
      </div>
      {/* ... (Rest of Verdict view remains same) */}
    </motion.div>
  );

  const stepMap: Record<string, React.ReactNode> = { triage: Triage, intake: Intake, audit: Audit, verdict: Verdict };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">
        {stepMap[step] || Triage}
      </AnimatePresence>
    </div>
  );
}
