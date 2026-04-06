"use client";

import React, { useState, useEffect } from "react";
// ... (previous imports remain the same)

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);
  
  // 🛡️ BACKEND DATA NODES
  const [userRole, setUserRole] = useState("");
  const [entityName, setEntityName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentDimension, setCurrentDimension] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[600px] bg-[#020617]" />;

  // --- VIEW: INTAKE (DATA CAPTURE ENABLED) ---
  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">
          <span>FORENSIC PROTOCOL </span><span className="text-red-600">ENGAGED</span>
        </h2>
      </div>

      <div className="bg-slate-950/30 border border-slate-900 p-12 max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input placeholder="OPERATOR_NAME" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none focus:border-red-600" />
          <input placeholder="CORPORATE_EMAIL" className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none focus:border-red-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* ENTITY CAPTURE */}
          <input 
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            placeholder="ENTITY_NAME" 
            className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none focus:border-red-600" 
          />
          
          {/* ROLE CAPTURE (Crucial for Backend Weights) */}
          <select 
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono text-white uppercase outline-none cursor-pointer focus:border-red-600 appearance-none"
          >
            <option value="" disabled>SELECT_OPERATOR_ROLE</option>
            <option value="executive">EXECUTIVE_STRATEGY</option>
            <option value="managerial">MANAGERIAL_OPERATIONS</option>
            <option value="technical">TECHNICAL_IMPLEMENTATION</option>
          </select>
        </div>

        <button 
          onClick={() => setStep("audit")} 
          className="w-full bg-red-600 py-8 text-white font-black uppercase italic tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all"
        >
          <span>Initialize Audit Observation</span>
        </button>
      </div>
    </motion.div>
  );

  // --- VIEW: AUDIT & VERDICT (OMITTED FOR BREVITY - SAME AS PREVIOUS) ---

  // ... (stepMap logic remains the same)
}
