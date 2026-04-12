"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Activity, ChevronRight, Lock, FileText } from "lucide-react";
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
  
  // 🔄 STATE MANAGEMENT
  const [activeOperatorId, setActiveOperatorId] = useState(initialId);
  const [activeLens, setActiveLens] = useState(initialLens);

  // 🎯 THE ANCHOR: We lock the lens from the initial input to prevent DB drift
  const FINAL_DISPLAY_LENS = (initialLens || activeLens || "EXECUTIVE").toUpperCase();

  const lensQuestions = DEEP_DIVE_QUESTIONS.filter(
    (q) => q.lens === (activeLens?.toUpperCase() || "EXECUTIVE")
  );

  useEffect(() => {
    async function validateAccess() {
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get('email');
      let query = supabase.from('operators').select('id, is_authorized, lens');
      
      if (emailParam) {
        query = query.eq('email', decodeURIComponent(emailParam));
      } else {
        query = query.eq('id', activeOperatorId);
      }

      const { data } = await query.single();
      if (data?.is_authorized) {
        setIsAuthorized(true);
        setActiveOperatorId(data.id);
        // We still update this for the DB logic, but the UI will use our Anchor
        setActiveLens(data.lens); 
      }
      setIsLoading(false);
    }
    validateAccess();
  }, [activeOperatorId]);

  const handleNext = async (answer: string) => {
    if (!lensQuestions[currentIdx]) return;
    const qId = lensQuestions[currentIdx].id;
    const multiplier = (answer.includes("High") && (evidenceBasis === "VERBAL" || evidenceBasis === "NONE")) ? 2.5 : 1.0;

    await supabase.from('audit_responses').insert([{
      operator_id: activeOperatorId,
      question_id: qId,
      value: answer,
      lens: activeLens,
      evidence_basis: evidenceBasis,
      vulnerability_multiplier: multiplier,
    }]);

    if (currentIdx < lensQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setEvidenceBasis("NONE"); 
    } else {
      setIsCompleted(true);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase tracking-widest">Authorizing_Clearance...</div>;

  if (!isAuthorized) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-12 text-center">
      <div className="max-w-md space-y-6">
        <Lock className="mx-auto text-red-600 mb-4 opacity-50" size={48} />
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Diagnostic_Node_Locked</h2>
      </div>
    </div>
  );

  /**
   * 🏆 FINAL VERDICT RENDER
   * This uses FINAL_DISPLAY_LENS which is captured from the initial input.
   */
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full bg-slate-900 border border-slate-800 p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Activity size={120} className="text-red-600" /></div>
          
          <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 italic font-black">
            <Activity size={14} className="animate-pulse" /> Diagnostic_Finalized
          </div>

          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-8 border-b border-red-600 pb-6">
            Formal_Audit_Verdict
          </h2>

          <div className="space-y-1 relative z-10">
            {/* 🔍 THE GUARANTEED FIX: Using the captured input signal */}
            <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Perspective_Node</span>
              </div>
              <span className="text-white font-black uppercase italic tracking-tighter bg-red-600/10 px-3 py-1 border border-red-600/20 text-xs">
                {FINAL_DISPLAY_LENS} // LENS
              </span>
            </div>

            <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Systemic_Friction_Index</span>
              <span className="text-white font-black uppercase italic tracking-tighter">75/100</span>
            </div>

            <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Identified_Rework_Tax</span>
              <span className="text-white font-black uppercase italic tracking-tighter text-red-600">$4.7M/yr</span>
            </div>

            <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic underline decoration-red-900">6-Month_Inaction_Cost</span>
              <span className="text-white font-black uppercase italic tracking-tighter">$2.63M</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-10 leading-relaxed italic border-l-2 border-red-600 pl-4">
            Projections based on {FINAL_DISPLAY_LENS} lens data. Secure the full MRI via Triangulation to finalize the Structural Resilience Index.
          </p>

          <button className="w-full mt-12 bg-red-600 text-white py-6 font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
            <FileText size={18} /> Download_Forensic_Briefing_PDF
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-96 bg-slate-950 border-r border-slate-900 p-10 space-y-12">
        <div className="flex items-center gap-3 text-red-600">
          <BookOpen size={20} />
          <h3 className="font-black uppercase italic text-sm tracking-tighter">BMR_FieldGuide_V3</h3>
        </div>
        <div className="space-y-4">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Active_Chapter</label>
           <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-sm">
              <h4 className="text-white font-bold text-[11px] uppercase mb-2">{lensQuestions[currentIdx]?.chapter}</h4>
           </div>
        </div>
        <div className="pt-20">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic font-black">Diagnostic_Progress</label>
           <div className="h-1 w-full bg-slate-900 mt-4 overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-700" style={{ width: `${((currentIdx + 1) / lensQuestions.length) * 100}%` }} />
           </div>
        </div>
      </aside>

      <main className="flex-1 p-12 md:p-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl">
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest mb-12 italic font-black">
               <Activity size={14} className="animate-pulse" /> Zone_{lensQuestions[currentIdx]?.zone} // Lens_{FINAL_DISPLAY_LENS}
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight mb-16">{lensQuestions[currentIdx]?.text}</h1>
            <div className="grid grid-cols-1 gap-4 mb-12">
              {["High Confidence / Documented", "Moderate Confidence / Verbal", "Zero Oversight / Theoretical"].map((opt) => (
                <button key={opt} onClick={() => handleNext(opt)} className="w-full p-8 bg-slate-900/30 border border-slate-800 text-left hover:border-red-600 hover:bg-red-600/5 transition-all flex justify-between items-center group">
                  <span className="font-black uppercase italic text-slate-400 group-hover:text-white transition-colors tracking-tighter">{opt}</span>
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
