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
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeOperatorId, setActiveOperatorId] = useState(initialId);
  const [activeLens, setActiveLens] = useState(initialLens);

  // 🎯 CAPTURE INITIAL INPUT FOR UI
  const LENS_SIGNAL = (initialLens || activeLens || "EXECUTIVE").toUpperCase();

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
        setActiveLens(data.lens); 
      }
      setIsLoading(false);
    }
    validateAccess();
  }, [activeOperatorId]);

  const handleNext = async (answer: string) => {
    if (!lensQuestions[currentIdx]) return;
    await supabase.from('audit_responses').insert([{
      operator_id: activeOperatorId,
      question_id: lensQuestions[currentIdx].id,
      value: answer,
      lens: activeLens
    }]);

    if (currentIdx < lensQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase">Authorizing...</div>;

  if (!isAuthorized) return <div className="min-h-screen bg-[#020617] flex items-center justify-center p-12 text-white"><h2 className="text-3xl font-black uppercase italic">Node_Locked</h2></div>;

  /**
   * 🏆 INTEGRATED VERDICT RENDER
   * If you see the blue bar below, you will see the Node row.
   */
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col font-sans">
        {/* 🚨 SIGNAL VERIFICATION BAR */}
        <div className="w-full bg-blue-600 text-white text-center py-2 font-black uppercase tracking-[0.3em] text-[10px] z-[9999] relative">
          SIGNAL_VERIFIED // VERDICT_MODE_ACTIVE
        </div>

        <div className="flex-grow flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full bg-slate-900 border border-slate-800 p-12 shadow-2xl relative overflow-hidden text-white">
            
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 italic font-black">
              <Activity size={14} className="animate-pulse" /> Diagnostic_Finalized
            </div>

            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 border-b border-red-600 pb-6 leading-none">
              Formal Audit <br/> Verdict
            </h2>

            <div className="space-y-1 relative z-10">
              {/* 🔍 THE GUARANTEED LENS ROW */}
              <div className="flex justify-between items-center py-5 border-b border-slate-800/50 bg-white/5 px-4 -mx-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">Perspective_Node</span>
                </div>
                <span className="text-white font-black uppercase italic tracking-tighter bg-red-600/20 px-3 py-1 border border-red-600/40 text-xs">
                  {LENS_SIGNAL} // LENS
                </span>
              </div>

              <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Systemic_Friction_Index</span>
                <span className="text-white font-black uppercase italic tracking-tighter">75/100</span>
              </div>

              <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">Identified_Rework_Tax</span>
                <span className="text-white font-black uppercase italic tracking-tighter text-red-600">$1.1M/yr</span>
              </div>

              <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic underline decoration-red-900">6-Month_Inaction_Cost</span>
                <span className="text-white font-black uppercase italic tracking-tighter">$0.62M</span>
              </div>
            </div>

            <button className="w-full mt-12 bg-red-600 text-white py-6 font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
              <FileText size={18} /> Download_Forensic_Briefing_PDF
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <div className="w-full bg-blue-600 text-white text-center py-2 font-black uppercase tracking-[0.3em] text-[10px] z-[9999] relative">
          SIGNAL_VERIFIED // DIAGNOSTIC_MODE_ACTIVE
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <aside className="w-full md:w-96 bg-slate-950 border-r border-slate-900 p-10">
          <h3 className="text-red-600 font-black uppercase italic text-sm tracking-tighter mb-12">BMR_FieldGuide_V3</h3>
          <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-sm">
            <h4 className="text-white font-bold text-[11px] uppercase mb-2">{lensQuestions[currentIdx]?.chapter}</h4>
          </div>
        </aside>

        <main className="flex-1 p-12 md:p-24 overflow-y-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest mb-12 italic font-black">
               <Activity size={14} className="animate-pulse" /> Zone_{lensQuestions[currentIdx]?.zone} // Lens_{LENS_SIGNAL}
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight mb-16">{lensQuestions[currentIdx]?.text}</h1>
            <div className="grid grid-cols-1 gap-4">
              {["High Confidence", "Moderate Confidence", "Theoretical"].map((opt) => (
                <button key={opt} onClick={() => handleNext(opt)} className="w-full p-8 bg-slate-900/30 border border-slate-800 text-left hover:border-red-600 transition-all flex justify-between items-center group font-black uppercase italic text-slate-400 hover:text-white">
                  {opt} <ChevronRight size={20} className="text-slate-800 group-hover:text-red-600" />
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
