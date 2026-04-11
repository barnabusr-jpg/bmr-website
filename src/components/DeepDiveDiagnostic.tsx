"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Activity, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { DEEP_DIVE_QUESTIONS } from "@/data/DeepDiveMatrix";

export default function DeepDiveDiagnostic({ 
  operatorId: initialId, 
  userLens: initialLens 
}: { 
  operatorId: string, 
  userLens: string 
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [evidenceBasis, setEvidenceBasis] = useState("NONE");
  const [isCompleted, setIsCompleted] = useState(false);

  // 🔄 DYNAMIC STATE: Tracks the identity found via URL or Prop
  const [activeOperatorId, setActiveOperatorId] = useState(initialId);
  const [activeLens, setActiveLens] = useState(initialLens);

  // Filter questions dynamically based on the active lens identified
  const lensQuestions = DEEP_DIVE_QUESTIONS.filter(
    (q) => q.lens === (activeLens?.toUpperCase() || "EXECUTIVE")
  );

  useEffect(() => {
    async function validateAccess() {
      // 1. Capture email from URL (The Lead's entry point from SendGrid)
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get('email');

      let query = supabase.from('operators').select('id, is_authorized, lens');
      
      if (emailParam) {
        // Identify lead by email from the secure link
        query = query.eq('email', decodeURIComponent(emailParam));
      } else {
        // Fallback to initial prop for the primary operator
        query = query.eq('id', activeOperatorId);
      }

      const { data, error } = await query.single();

      if (data?.is_authorized) {
        setIsAuthorized(true);
        setActiveOperatorId(data.id);
        setActiveLens(data.lens); // Auto-configures UI for Technical/Managerial
      }
      
      setIsLoading(false);
    }
    
    validateAccess();
  }, [activeOperatorId]);

  const handleNext = async (answer: string) => {
    if (!lensQuestions[currentIdx]) return;

    const qId = lensQuestions[currentIdx].id;
    
    // 🧮 VULNERABILITY LOGIC: Verbal/None evidence + High Confidence = High Risk Multiplier
    const multiplier = (answer.includes("High") && (evidenceBasis === "VERBAL" || evidenceBasis === "NONE")) ? 2.5 : 1.0;

    await supabase.from('audit_responses').upsert({
      operator_id: activeOperatorId,
      question_id: qId,
      value: answer,
      evidence_basis: evidenceBasis,
      vulnerability_multiplier: multiplier,
      lens: activeLens
    });

    if (currentIdx < lensQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setEvidenceBasis("NONE"); // Reset for next forensic data point
    } else {
      setIsCompleted(true);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase tracking-widest">
      Authorizing_Clearance...
    </div>
  );

  if (!isAuthorized) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-12 text-center">
      <div className="max-w-md space-y-6">
        <Lock className="mx-auto text-red-600 mb-4 opacity-50" size={48} />
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Diagnostic_Node_Locked</h2>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
          Forensic Briefing required to engage Alpha-7 deep dive sequence. Contact system administrator for authorization.
        </p>
      </div>
    </div>
  );

  if (isCompleted) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-12 text-center font-sans">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md space-y-6">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
          LENS_SUBMISSION<br/><span className="text-green-500">COMPLETE</span>
        </h2>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] leading-loose pt-4">
          Data secured in evidence locker. The final MRI report will crystallize once the remaining team leads complete their audit lenses.
        </p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row">
      {/* 🏛️ LEFT: THE RADIOLOGY FIELDGUIDE SIDEBAR */}
      <aside className="w-full md:w-96 bg-slate-950 border-r border-slate-900 p-10 space-y-12">
        <div className="flex items-center gap-3 text-red-600">
          <BookOpen size={20} />
          <h3 className="font-black uppercase italic text-sm tracking-tighter">BMR_FieldGuide_V3</h3>
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Active_Chapter</label>
           <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-sm">
              <h4 className="text-white font-bold text-[11px] uppercase mb-2">
                {lensQuestions[currentIdx]?.chapter || "IDENTIFYING_CHAPTER"}
              </h4>
              <p className="text-[11px] text-slate-400 italic leading-relaxed">
                {lensQuestions[currentIdx]?.chapter.includes('HAI') && "Focus: Mental Model Alignment & Trust Continuity."}
                {lensQuestions[currentIdx]?.chapter.includes('AVS') && "Focus: Strategic Integrity & Decision Explainability."}
                {lensQuestions[currentIdx]?.chapter.includes('IGF') && "Focus: Institutional Memory & Technical Hardening."}
              </p>
           </div>
        </div>

        <div className="pt-20">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic font-black">Diagnostic_Progress</label>
           <div className="h-1 w-full bg-slate-900 mt-4 overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all duration-700" 
                style={{ width: `${((currentIdx + 1) / lensQuestions.length) * 100}%` }} 
              />
           </div>
        </div>
      </aside>

      {/* 🔬 RIGHT: THE MRI INTERFACE */}
      <main className="flex-1 p-12 md:p-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest mb-12 italic font-black">
               <Activity size={14} className="animate-pulse" /> Zone_{lensQuestions[currentIdx]?.zone} // Lens_{activeLens}
            </div>

            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight mb-16">
               {lensQuestions[currentIdx]?.text}
            </h1>

            {/* ANSWER SELECTION */}
            <div className="grid grid-cols-1 gap-4 mb-12">
              {["High Confidence / Documented", "Moderate Confidence / Verbal", "Zero Oversight / Theoretical"].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => handleNext(opt)}
                  className="w-full p-8 bg-slate-900/30 border border-slate-800 text-left hover:border-red-600 hover:bg-red-600/5 transition-all flex justify-between items-center group"
                >
                  <span className="font-black uppercase italic text-slate-400 group-hover:text-white transition-colors tracking-tighter">{opt}</span>
                  <ChevronRight size={20} className="text-slate-800 group-hover:text-red-600 transition-colors" />
                </button>
              ))}
            </div>

            {/* EVIDENCE BASIS SELECTOR */}
            <div className="border-t border-slate-900 pt-8 mt-12">
               <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 block font-black">Declare_Evidence_Basis:</label>
               <div className="flex flex-wrap gap-3">
                  {['AUDIT_LOG', 'CODE_REVIEW', 'INTERVIEW', 'VERBAL', 'NONE'].map((basis) => (
                    <button 
                      key={basis} 
                      onClick={() => setEvidenceBasis(basis)}
                      className={`px-4 py-2 text-[10px] font-mono font-black border transition-all ${evidenceBasis === basis ? 'border-red-600 text-red-600 bg-red-600/10' : 'border-slate-800 text-slate-600 hover:text-slate-300'}`}
                    >
                      {basis}
                    </button>
                  ))}
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
