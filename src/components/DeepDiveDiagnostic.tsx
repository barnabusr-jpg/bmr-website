"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Activity, ChevronRight, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { DEEP_DIVE_QUESTIONS } from "@/data/DeepDiveMatrix";

export default function DeepDiveDiagnostic({ operatorId, userLens }: { operatorId: string, userLens: string }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeChapter, setActiveChapter] = useState("Introduction");

  // Filter questions for this specific user's lens (Executive, Technical, or Managerial)
  const lensQuestions = DEEP_DIVE_QUESTIONS.filter(q => q.lens === userLens.toUpperCase());

  useEffect(() => {
    async function validateAccess() {
      const { data } = await supabase.from('operators').select('is_authorized').eq('id', operatorId).single();
      if (data?.is_authorized) setIsAuthorized(true);
      setIsLoading(false);
    }
    validateAccess();
  }, [operatorId]);

  const handleNext = async (answer: string) => {
    const qId = lensQuestions[currentIdx].id;
    const updated = { ...answers, [qId]: answer };
    setAnswers(updated);

    // Update active chapter for FieldGuide
    setActiveChapter(lensQuestions[currentIdx].chapter);

    // Sync progress to database
    await supabase.from('audit_responses').upsert({
      operator_id: operatorId,
      question_id: qId,
      value: answer,
      lens: userLens
    });

    if (currentIdx < lensQuestions.length - 1) setCurrentIdx(currentIdx + 1);
    else finalizeLensSubmission();
  };

  const finalizeLensSubmission = () => {
    // Logic to notify Admin that 1/3 of the triangulation is complete
    alert("LENS_SUBMISSION_COMPLETE: Triangulation Pending Team Input.");
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse">AUTHORIZING_ACCESS...</div>;

  if (!isAuthorized) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-12 text-center font-sans">
      <div className="max-w-md space-y-6">
        <Lock className="mx-auto text-red-600 mb-4" size={48} />
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Diagnostic_Node_Locked</h2>
        <p className="text-slate-500 text-xs uppercase tracking-[0.2em] leading-relaxed">
          A completed Forensic Briefing and authorized credentials are required to engage the 30-Point Deep Dive.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row">
      {/* 🏛️ LEFT: THE DIGITAL FIELDGUIDE SIDEBAR */}
      <aside className="w-full md:w-96 bg-slate-950 border-r border-slate-900 p-10 space-y-12">
        <div className="flex items-center gap-3 text-red-600">
          <BookOpen size={20} />
          <h3 className="font-black uppercase italic text-sm tracking-tighter">BMR_FieldGuide_V3</h3>
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active_Chapter</label>
           <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-sm">
              <h4 className="text-white font-bold text-xs uppercase mb-2">{activeChapter}</h4>
              <p className="text-[11px] text-slate-400 italic leading-relaxed">
                Referencing original Field Guide data: {activeChapter.includes('HAI') ? "Focus on Expectation Continuity." : "Focus on Decision Explainability."}
              </p>
           </div>
        </div>

        <div className="pt-20">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Diagnostic_Progress</label>
           <div className="h-1.5 w-full bg-slate-900 mt-4 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-700" style={{ width: `${((currentIdx + 1) / 10) * 100}%` }} />
           </div>
        </div>
      </aside>

      {/* 🔬 RIGHT: THE MRI INTERFACE */}
      <main className="flex-1 p-12 md:p-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest mb-12 italic">
               <Activity size={14} className="animate-pulse" /> Zone_{lensQuestions[currentIdx].zone} // Lens_{userLens}
            </div>

            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight mb-16">
               {lensQuestions[currentIdx].text}
            </h1>

            <div className="grid grid-cols-1 gap-4">
              {["High Confidence / Documented", "Moderate Confidence / Verbal", "Zero Oversight / Theoretical"].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => handleNext(opt)}
                  className="w-full p-8 bg-slate-900/30 border border-slate-800 text-left hover:border-red-600 hover:bg-red-600/5 transition-all flex justify-between items-center group"
                >
                  <span className="font-black uppercase italic text-slate-400 group-hover:text-white transition-colors">{opt}</span>
                  <ChevronRight size={20} className="text-slate-800 group-hover:text-red-600 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
