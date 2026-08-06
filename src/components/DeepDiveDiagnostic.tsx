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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-mono text-xs text-slate-600 animate-pulse font-bold uppercase tracking-wider">
        Authorizing Node...
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
        Node Locked // Authorization Required
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans antialiased">
      
      {/* SIDEBAR NAVIGATION / FIELD GUIDE */}
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-8 md:p-10 space-y-8 shadow-sm">
        <div className="flex items-center gap-2.5 text-slate-900 font-mono font-bold uppercase text-xs tracking-wider">
          <BookOpen size={18} className="text-slate-900" /> BMR Field Guide V3
        </div>

        <div className="p-5 border border-slate-200 bg-slate-50/70 rounded-md space-y-1">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block">
            Active Chapter
          </label>
          <h4 className="text-slate-900 font-bold text-xs uppercase leading-snug">
            {lensQuestions[currentIdx]?.chapter || 'Overview'}
          </h4>
        </div>
      </aside>

      {/* MAIN QUESTION WORKBENCH */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-3xl space-y-8">
          
          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-4">
            <Activity size={16} className="text-slate-900 animate-pulse" /> Zone {lensQuestions[currentIdx]?.zone} // Lens: {LENS_SIGNAL}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {lensQuestions[currentIdx]?.text}
          </h1>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {["High Confidence", "Moderate Confidence", "Theoretical"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleNext(opt)}
                className="w-full p-5 bg-white border border-slate-200 text-slate-800 text-left hover:border-slate-900 hover:bg-slate-50 transition-all flex justify-between items-center group font-sans font-semibold text-xs md:text-sm rounded-md shadow-sm cursor-pointer"
              >
                <span>{opt}</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
              </button>
            ))}
          </div>

        </div>
      </main>

    </div>
  );
}
