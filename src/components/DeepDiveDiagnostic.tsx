"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Activity, ChevronRight, Lock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { DEEP_DIVE_QUESTIONS } from "@/data/DeepDiveMatrix";
import ForensicResultCard from "@/components/ForensicResultCard";

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

  // 🎯 ANCHOR: Captured initial input to ensure UI consistency
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

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase tracking-[0.2em]">Authorizing...</div>;

  if (!isAuthorized) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-12 text-white">
      <div className="text-center">
        <Lock size={48} className="mx-auto text-red-600 mb-6 opacity-50" />
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Node_Locked</h2>
      </div>
    </div>
  );

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#020617] p-6 flex items-center justify-center font-sans">
        <div className="max-w-4xl w-full">
          <ForensicResultCard 
            lens={LENS_SIGNAL}
            result={{
              protocol: 'STRUCTURAL_HARDENING',
              frictionIndex: 75,
              status: 'VERIFIED',
              shearZones: {
                HumanAIAlignment: 8,
                AlgorithmicValueStream: 6,
                InstitutionalGovernance: 9
              }
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-96 bg-slate-950 border-r border-slate-900 p-10 space-y-12">
        <div className="flex items-center gap-3 text-red-600 font-black uppercase italic text-sm tracking-tighter">
          <BookOpen size={20} />
          BMR_FieldGuide_V3
        </div>
        <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-sm">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block mb-2">Active_Chapter</label>
           <h4 className="text-white font-bold text-[11px] uppercase">{lensQuestions[currentIdx]?.chapter}</h4>
        </div>
      </aside>

      <main className="flex-1 p-12 md:p-24 overflow-y-auto bg-[#020617]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest mb-12 italic font-black">
             <Activity size={14} className="animate-pulse" /> Zone_{lensQuestions[currentIdx]?.zone} // Lens_{LENS_SIGNAL}
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight mb-16">{lensQuestions[currentIdx]?.text}</h1>
          <div className="grid grid-cols-1 gap-4">
            {["High Confidence", "Moderate Confidence", "Theoretical"].map((opt) => (
              <button key={opt} onClick={() => handleNext(opt)} className="w-full p-8 bg-slate-900/30 border border-slate-800 text-left hover:border-red-600 transition-all flex justify-between items-center group font-black uppercase italic text-slate-400 hover:text-white">
                {opt} <ChevronRight size={20} className="text-slate-800 group-hover:text-red-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
