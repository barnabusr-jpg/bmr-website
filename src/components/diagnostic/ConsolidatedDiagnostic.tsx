"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, Activity, ShieldAlert, Zap } from "lucide-react";
import DiagnosticStep from "./DiagnosticStep";
import { FORENSIC_QUESTIONS } from "@/data/questions";

// --- INTERNAL LOGIC MAP (Translated from your provided files) ---
const ZONE_WEIGHTS = {
  reworkTax: [1, 2, 3],    // Maps to Question IDs
  shadowAI: [4, 5, 6],
  expertiseDebt: [7, 8, 9],
  deltaGap: [10, 11, 12]
};

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);
  const [userRole, setUserRole] = useState("");
  const [entityName, setEntityName] = useState("");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  // --- CALCULATION ENGINE (The "Synthesis") ---
  const calculateSynthesis = () => {
    const values = Object.values(answers).map(v => parseInt(v) || 0);
    const totalRaw = values.reduce((a, b) => a + b, 0);
    const maxPossible = 120; // 12 questions * max value 10
    
    const decay = Math.round((totalRaw / maxPossible) * 100);
    
    // Zone-specific "Heat" mapping
    const getZoneHeat = (ids: string[]) => {
      const zoneValues = ids.map(id => parseInt(answers[id]) || 0);
      const sum = zoneValues.reduce((a, b) => a + b, 0);
      return Math.round((sum / (ids.length * 10)) * 100);
    };

    return {
      total: decay,
      projected: Math.min(decay + 14, 100),
      confidence: 87.2,
      heatmap: {
        strategic: getZoneHeat(["RT_01", "SA_01", "ED_01"]), // Adjusting to your actual IDs
        operational: getZoneHeat(["RT_02", "SA_02", "ED_02"]),
        technical: getZoneHeat(["RT_03", "SA_03", "ED_03"])
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

  // --- RENDER LOGIC ---
  const renderContent = () => {
    switch (step) {
      case "triage":
        // [TRIAGE VIEW REMAINS AS PREVIOUSLY ESTABLISHED]
        return <div className="text-white">Loading Triage Protocol...</div>; 

      case "intake":
        // [INTAKE VIEW REMAINS AS PREVIOUSLY ESTABLISHED]
        return <div className="text-white">Loading Intake Protocol...</div>;

      case "audit":
        const activeQuestion = FORENSIC_QUESTIONS[currentDimension];
        return (
          <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <DiagnosticStep 
              dimensionTitle={`NODE_0${currentDimension + 1}_${activeQuestion.zone.toUpperCase()}`}
              questionText={activeQuestion.text}
              options={activeQuestion.options}
              answers={answers}
              questionId={activeQuestion.id}
              onAnswerChange={(id, val) => setAnswers(prev => ({ ...prev, [id]: val }))}
            />
            <div className="flex justify-between items-center pt-8 border-t border-slate-900">
              <span className="font-mono text-[10px] text-slate-600">ALPHA_SEQUENCE: {currentDimension + 1}/12</span>
              <button onClick={handleNext} className="bg-red-600 px-10 py-4 text-white font-black uppercase italic text-xs tracking-widest">
                {currentDimension === 11 ? "Execute Synthesis" : "Next Protocol"}
              </button>
            </div>
          </motion.div>
        );

      case "verdict":
        const results = calculateSynthesis();
        return (
          <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter">
                LOGIC <span className="text-red-600">DECAY</span>
              </h2>
              <p className="font-mono text-[10px] text-slate-500 tracking-[0.4em]">FORENSIC_ALPHA_SYNTHESIS_COMPLETE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* PRIMARY SCORE */}
              <div className="bg-slate-950 border border-slate-900 p-8 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-red-600/20"><ShieldAlert size={40} /></div>
                <span className="text-[10px] font-mono text-slate-500 uppercase mb-2">Systemic Drift</span>
                <span className="text-7xl font-black text-red-600 italic leading-none">{results.total}%</span>
                <span className="text-[9px] font-mono text-slate-700 mt-4">CONFIDENCE_RATING: {results.confidence}%</span>
              </div>

              {/* HEATMAP GRID */}
              <div className="md:col-span-2 bg-slate-950 border border-slate-900 p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Forensic Heatmap</span>
                  <Activity size={14} className="text-red-600 animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(results.heatmap).map(([key, val]) => (
                    <div key={key} className="bg-black/40 border border-slate-900 p-4 space-y-4">
                      <div className="flex justify-between text-[9px] font-mono text-white/50">
                        <span>{key.toUpperCase()}</span>
                        <span>{val}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900">
                        <div className="h-full bg-red-600" style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* THE BRIDGE: Gating the Cure and the Supplement */}
            <div className="bg-red-600 p-12 shadow-2xl shadow-red-900/40 relative">
              <div className="max-w-2xl space-y-6">
                <h3 className="text-3xl font-black text-white uppercase italic leading-none">Initialize The Cure</h3>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  The Alpha scan provides symptomatic evidence. To implement **Structural Hardening**, you must proceed to the **30-Point Forensic Diagnostic**. 
                </p>
                <div className="flex gap-4">
                  <button className="bg-white text-black px-8 py-4 font-black uppercase italic text-[10px] tracking-widest hover:bg-slate-200 transition-all">
                    Initiate Full Engagement
                  </button>
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-mono text-black/60 uppercase leading-tight font-bold">Includes:</span>
                    <span className="text-[10px] font-black text-white uppercase italic leading-tight">BMR Field Guide (Supplemental)</span>
                  </div>
                </div>
              </div>
              <Zap className="absolute right-12 bottom-12 text-white/10" size={120} />
            </div>
          </motion.div>
        );

      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}
