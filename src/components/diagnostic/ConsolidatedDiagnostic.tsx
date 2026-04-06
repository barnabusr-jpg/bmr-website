"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, Activity, Zap, ShieldAlert, Banknote, Stethoscope, Factory, ShoppingCart } from "lucide-react";
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
  const [userRole, setUserRole] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const calculateSynthesis = () => {
    const vals = Object.values(answers).map(v => parseInt(v) || 0);
    const totalRaw = vals.reduce((a, b) => a + b, 0);
    const decay = Math.round((totalRaw / 120) * 100);
    
    const getZoneHeat = (zone: string) => {
      const zoneQs = FORENSIC_QUESTIONS.filter(q => q.zone === zone);
      const zoneVals = zoneQs.map(q => parseInt(answers[q.id]) || 0);
      const sum = zoneVals.reduce((a, b) => a + b, 0);
      return Math.round((sum / (zoneQs.length * 10)) * 100);
    };

    return {
      total: decay,
      heatmap: {
        strategic: getZoneHeat('reworkTax'),
        operational: getZoneHeat('shadowAI'),
        technical: getZoneHeat('expertiseDebt')
      }
    };
  };

  const handleNext = () => {
    if (currentDimension < FORENSIC_QUESTIONS.length - 1) {
      setCurrentDimension(prev => prev + 1);
    } else {
      setStep("verdict");
    }
  };

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white">
          <span>THE LOGIC </span><span className="text-red-600">DECAY SCREENING</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button key={s.id} onClick={() => { setSector(s.id); setStep("intake"); }} className="p-8 bg-slate-950/50 border-2 border-slate-900 hover:border-red-600 transition-all text-left group flex flex-col justify-between h-48">
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
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic text-white tracking-tighter italic">FORENSIC PROTOCOL <span className="text-red-600 uppercase">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Sector Lock: {sector?.toUpperCase()}</p>
      </div>
      
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm text-white uppercase outline-none focus:border-red-600" />
          <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm text-white uppercase outline-none focus:border-red-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="email"
            placeholder="CORPORATE_EMAIL" 
            value={email}
            onChange={(e) => { setEmail(e.target.value); setValidationError(null); }}
            className={`bg-slate-950 border ${validationError === "EMAIL_PROTOCOL_ERROR" || validationError === "EMAIL_MISMATCH" ? 'border-red-600' : 'border-slate-800'} p-6 text-sm text-white uppercase outline-none focus:border-red-600`} 
          />
          <input 
            type="email"
            placeholder="VERIFY_EMAIL" 
            value={confirmEmail}
            onChange={(e) => { setConfirmEmail(e.target.value); setValidationError(null); }}
            className={`bg-slate-950 border ${validationError === "EMAIL_MISMATCH" ? 'border-red-600' : 'border-slate-800'} p-6 text-sm text-white uppercase outline-none focus:border-red-600`} 
          />
        </div>

        <div className="w-full">
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm text-white uppercase outline-none cursor-pointer focus:border-red-600 appearance-none w-full">
            <option value="" disabled>SELECT_ROLE</option>
            <option value="executive">EXECUTIVE</option>
            <option value="managerial">MANAGERIAL</option>
            <option value="technical">TECHNICAL</option>
          </select>
        </div>

        <div className="h-4">
          <AnimatePresence>
            {validationError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 font-mono text-[10px] uppercase text-center font-bold tracking-widest">
                ⚠️ {validationError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              setValidationError("EMAIL_PROTOCOL_ERROR");
            } else if (email !== confirmEmail) {
              setValidationError("EMAIL_MISMATCH");
            } else if (!userRole || !entityName) {
              setValidationError("CORE_FIELDS_INCOMPLETE");
            } else {
              setStep("audit");
            }
          }} 
          className="w-full bg-red-600 py-8 text-white font-black uppercase italic text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all"
        >
          Initialize Audit Observation
        </button>
      </div>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <DiagnosticStep 
        dimensionTitle={`PROTOCOL_NODE_${(currentDimension + 1).toString().padStart(2, '0')}`}
        questionText={FORENSIC_QUESTIONS[currentDimension].text}
        options={FORENSIC_QUESTIONS[currentDimension].options}
        answers={answers}
        questionId={FORENSIC_QUESTIONS[currentDimension].id}
        onAnswerChange={(id, val) => setAnswers(prev => ({ ...prev, [id]: val }))}
      />
      <div className="flex justify-between items-center pt-8 border-t border-slate-900">
        <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest text-xs italic">Sequence Step {currentDimension + 1}/12</span>
        <button onClick={handleNext} className="bg-red-600 px-12 py-6 text-white font-black uppercase italic tracking-widest text-xs hover:invert transition-all">
          {currentDimension === 11 ? "Execute Synthesis" : "Next Protocol"}
        </button>
      </div>
    </motion.div>
  );

  const Verdict = (
    <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="text-center py-12 border-b border-slate-900">
        <h2 className="text-7xl font-black uppercase italic text-white tracking-tighter">DECAY <span className="text-red-600 italic">{calculateSynthesis().total}%</span></h2>
        <p className="text-slate-500 font-mono text-[10px] mt-4 uppercase tracking-[0.5em] font-bold italic">Forensic Alpha Scan Complete</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950 border border-slate-900 p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <ShieldAlert className="absolute top-0 right-0 p-2 text-red-600/10" size={60} />
          <span className="text-[10px] font-mono text-slate-500 uppercase mb-4 font-bold">Total Margin Drift</span>
          <span className="text-6xl font-black text-red-600 italic leading-none">{calculateSynthesis().total}%</span>
          <span className="text-[9px] font-mono text-slate-700 mt-6 uppercase font-bold">Confidence: 87.2%</span>
        </div>

        <div className="md:col-span-2 bg-slate-950 border border-slate-900 p-8 space-y-8">
          <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Decay Heatmap</span><Activity size={14} className="text-red-600 animate-pulse" /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(calculateSynthesis().heatmap).map(([key, val]) => (
              <div key={key} className="bg-black/40 border border-slate-900 p-6 space-y-4">
                <div className="flex justify-between text-[10px] font-mono text-white/50 font-black italic"><span>{key.toUpperCase()}</span><span>{val}%</span></div>
                <div className="w-full h-1 bg-slate-900"><div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${val}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-red-600 p-12 shadow-2xl shadow-red-900/40 relative group overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h3 className="text-4xl font-black text-white uppercase italic leading-none">Initialize The Cure</h3>
          <p className="text-white/90 text-sm leading-relaxed font-bold uppercase tracking-tight italic">The Alpha scan is symptomatic. For Structural Hardening, you must proceed to the 30-Point Forensic Diagnostic.</p>
          <div className="flex gap-6 items-center">
            <button className="bg-white text-black px-10 py-5 font-black uppercase italic text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-black/20">Initiate Full Engagement</button>
            <span className="text-[9px] font-mono text-white/60 uppercase leading-tight font-black italic border-l border-white/20 pl-4 tracking-tighter">Includes Supplemental<br/>BMR Field Guide</span>
          </div>
        </div>
        <Zap className="absolute right-[-20px] bottom-[-20px] text-white/10 group-hover:text-white/20 transition-all duration-700" size={240} />
      </div>
    </motion.div>
  );

  const stepMap: Record<string, React.ReactNode> = { triage: Triage, intake: Intake, audit: Audit, verdict: Verdict };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">{stepMap[step] || Triage}</AnimatePresence>
    </div>
  );
}
