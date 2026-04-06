"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, Zap, Banknote, Stethoscope, Factory, ShoppingCart } from "lucide-react";
import DiagnosticStep from "./DiagnosticStep";

// 🛡️ MOVE QUESTIONS INSIDE TO PREVENT IMPORT CRASH
const LOCAL_QUESTIONS = [
  {
    id: "RT_01",
    protocol: "reworkTax",
    text: "AI standard operating procedures (SOPs) are documented and followed.",
    options: [
      { label: "Non-existent", weight: 10, impact: "High Rework Risk" },
      { label: "Ad-hoc/Manual", weight: 6, impact: "Manual Friction" },
      { label: "Formalized", weight: 4, impact: "Managed Risk" },
      { label: "Automated/Optimized", weight: 2, impact: "Zero Waste" }
    ]
  },
  {
    id: "RT_02",
    protocol: "reworkTax",
    text: "Our organization has a clear AI ethics and governance framework.",
    options: [
      { label: "No framework", weight: 10, impact: "Compliance Hemorrhage" },
      { label: "Basic guidelines", weight: 6, impact: "Policy Drift" },
      { label: "Comprehensive policy", weight: 4, impact: "Stable" },
      { label: "Audited compliance", weight: 2, impact: "Shielded" }
    ]
  },
  {
    id: "DG_01",
    protocol: "deltaGap",
    text: "Our AI systems directly contribute to measurable business ROI.",
    options: [
      { label: "Not tracked", weight: 10, impact: "Value Leakage" },
      { label: "Anecdotal evidence", weight: 6, impact: "Unverified Gains" },
      { label: "Specific KPIs", weight: 4, impact: "ROI Stable" },
      { label: "Direct revenue impact", weight: 2, impact: "ROI Maximized" }
    ]
  }
  // ... (You can add the rest later once we confirm this works)
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

  const calculateSynthesis = () => {
    const totalVals = Object.values(answers).map(v => parseInt(v || "0"));
    const totalSum = totalVals.reduce((a, b) => a + b, 0);
    return {
      total: (totalSum * 0.04).toFixed(1),
      decay: Math.round((totalSum / 120) * 100)
    };
  };

  // --- VIEWS ---

  const Triage = (
    <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
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
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter">FORENSIC PROTOCOL <span className="text-red-600">ENGAGED</span></h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">Sector Lock: {sector?.toUpperCase() || "PENDING"}</p>
      </div>
      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600" />
          <input placeholder="ENTITY_NAME" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-950 border border-slate-800 p-6 text-sm uppercase outline-none focus:border-red-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" placeholder="CORPORATE_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600/30' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600`} />
          <input type="email" placeholder="VERIFY_EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`bg-slate-950 border ${validationError ? 'border-red-600 animate-pulse' : 'border-slate-800'} p-6 text-sm uppercase outline-none focus:border-red-600`} />
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
          {validationError && <p className="text-red-600 font-mono text-[10px] uppercase font-black tracking-widest">⚠️ {validationError}</p>}
        </div>
        <button 
          disabled={!!validationError || !email || !confirmEmail || !userRole || !entityName}
          onClick={() => setStep("audit")} 
          className="w-full py-8 font-black uppercase italic text-xs tracking-[0.4em] bg-red-600 text-white hover:bg-white hover:text-black transition-all"
        >
          Initialize Audit Observation
        </button>
      </div>
    </motion.div>
  );

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-white">
      {LOCAL_QUESTIONS[currentDimension] ? (
        <>
          <DiagnosticStep 
            dimensionTitle={`PROTOCOL_NODE_${(currentDimension + 1).toString().padStart(2, '0')}`}
            questionText={LOCAL_QUESTIONS[currentDimension].text}
            options={LOCAL_QUESTIONS[currentDimension].options}
            answers={answers}
            questionId={LOCAL_QUESTIONS[currentDimension].id}
            onAnswerChange={(id, val) => setAnswers(prev => ({ ...prev, [id]: val }))}
          />
          <div className="flex justify-between items-center pt-8 border-t border-slate-900">
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest italic font-bold">Signal {currentDimension + 1} of {LOCAL_QUESTIONS.length}</span>
            <button 
              onClick={() => {
                if (currentDimension < LOCAL_QUESTIONS.length - 1) setCurrentDimension(prev => prev + 1);
                else setStep("verdict");
              }} 
              className="bg-red-600 px-12 py-6 text-white font-black uppercase italic tracking-widest text-xs"
            >
              Next Protocol
            </button>
          </div>
        </>
      ) : (
        <div>NODE_ERROR</div>
      )}
    </motion.div>
  );

  const Verdict = (
    <div className="text-white text-center py-20">
      <h2 className="text-5xl font-black italic uppercase">Synthesis Complete</h2>
      <p className="text-red-600 font-mono mt-4 tracking-widest italic uppercase">Hemorrhage: ${calculateSynthesis().total}M</p>
    </div>
  );

  const stepMap: Record<string, React.ReactNode> = { triage: Triage, intake: Intake, audit: Audit, verdict: Verdict };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <AnimatePresence mode="wait">
        {stepMap[step]}
      </AnimatePresence>
    </div>
  );
}
