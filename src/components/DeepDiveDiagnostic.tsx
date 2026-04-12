"use client";
import React, { useState, useEffect } from "react";
import { BookOpen, Activity, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { DEEP_DIVE_QUESTIONS } from "@/data/DeepDiveMatrix";

export default function DeepDiveDiagnostic({ operatorId, userLens }: { operatorId: string, userLens: string }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  const LENS_SIGNAL = (userLens || "EXECUTIVE").toUpperCase();
  const lensQuestions = DEEP_DIVE_QUESTIONS.filter((q) => q.lens === LENS_SIGNAL);

  useEffect(() => {
    async function validate() {
      const { data } = await supabase.from('operators').select('is_authorized').eq('id', operatorId).single();
      if (data?.is_authorized) setIsAuthorized(true);
      setIsLoading(false);
    }
    validate();
  }, [operatorId]);

  const handleNext = async (answer: string) => {
    if (!lensQuestions[currentIdx]) return;

    // Log individual response
    await supabase.from('audit_responses').insert([{
      operator_id: operatorId,
      question_id: lensQuestions[currentIdx].id,
      value: answer,
      lens: LENS_SIGNAL
    }]);

    if (currentIdx < lensQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // 🚨 THE ATOMIC HANDSHAKE
      const finalReworkTax = 1.3; 

      // 1. Force the Operator (Parent) to exist first
      await supabase.from('operators').upsert({
        id: operatorId,
        is_authorized: true,
        lens: LENS_SIGNAL
      }, { onConflict: 'id' });

      // 2. Insert the Audit (Child) and AWAIT confirmation
      const { error } = await supabase.from('audits').insert([{
        operator_id: operatorId,
        rework_tax: finalReworkTax,
        status: 'PENDING_RELEASE',
        lens: LENS_SIGNAL
      }]);

      if (error) {
        alert(`DATABASE_REJECTION: ${error.message}`);
        return;
      }

      // 3. Only redirect once Step 2 is confirmed
      localStorage.setItem("bmr_active_lens", LENS_SIGNAL);
      window.location.href = '/forensic-verdict';
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase">Authorizing_Node...</div>;
  if (!isAuthorized) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-black uppercase italic tracking-tighter">Node_Locked</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-96 bg-slate-950 border-r border-slate-900 p-10 space-y-12">
        <div className="flex items-center gap-3 text-red-600 font-black uppercase italic text-sm tracking-tighter"><BookOpen size={20} /> BMR_FieldGuide_V3</div>
        <div className="p-6 border border-slate-800 bg-slate-900/40">
           <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Active_Chapter</label>
           <h4 className="text-white font-bold text-[11px] uppercase">{lensQuestions[currentIdx]?.chapter}</h4>
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
                {opt} <ChevronRight size={20} className="text-slate-800 group-hover:text-red-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
