"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Activity, ChevronRight, Lock, Skull, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { DEEP_DIVE_QUESTIONS } from "@/data/DeepDiveMatrix";
import Header from "@/components/Header";

export default function DeepDiveDiagnostic({ operatorId, userLens }: { operatorId: string, userLens: string }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeLens, setActiveLens] = useState(userLens);

  const LENS_SIGNAL = (userLens || activeLens || "EXECUTIVE").toUpperCase();
  const lensQuestions = DEEP_DIVE_QUESTIONS.filter((q) => q.lens === LENS_SIGNAL);

  useEffect(() => {
    async function validate() {
      const { data } = await supabase.from('operators').select('is_authorized, lens').eq('id', operatorId).single();
      if (data?.is_authorized) {
        setIsAuthorized(true);
        setActiveLens(data.lens); 
      }
      setIsLoading(false);
    }
    validate();
  }, [operatorId]);

  const handleNext = async (answer: string) => {
    if (!lensQuestions[currentIdx]) return;
    await supabase.from('audit_responses').insert([{
      operator_id: operatorId,
      question_id: lensQuestions[currentIdx].id,
      value: answer,
      lens: LENS_SIGNAL
    }]);

    if (currentIdx < lensQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // 🚨 NO REDIRECT: We change the state locally to avoid routing issues
      setIsCompleted(true);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-red-600 animate-pulse uppercase">Authorizing...</div>;
  if (!isAuthorized) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-black uppercase italic tracking-tighter">Node_Locked</div>;

  // 🏆 THE RESULTS VIEW: Physically anchored inside this component
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#020617] text-white py-24 px-6 font-sans">
        <Header />
        <div className="container mx-auto max-w-4xl mt-12">
          <header className="flex justify-between items-start border-b border-slate-900 pb-8 mb-12">
            <section>
              <h1 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter leading-none">
                VERIFIED TRIAGE ALERT
              </h1>
              <div className="flex gap-4 mt-2">
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-black">AUDIT SYSTEMIC_DRIFT</span>
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-black">STATUS VALIDATED</span>
              </div>
            </section>
            <Lock className="text-slate-700" size={24} />
          </header>

          {/* 🛠️ THE LENS ROW: Physically rendered here */}
          <div className="mb-12 flex justify-between items-center bg-white/5 p-6 border-l-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
             <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] font-black italic">Perspective_Node</span>
             </div>
             <span className="text-white font-black uppercase italic tracking-tighter text-sm bg-red-600/20 px-4 py-1.5 border border-red-600/30">
                {LENS_SIGNAL} // LENS
             </span>
          </div>

          <main className="text-center mb-24 relative py-12">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-white"><Skull size={300} /></div>
            <div className="text-[10rem] font-black italic tracking-tighter text-white relative z-10 leading-none">$1.1M</div>
            <p className="text-red-600 font-mono text-sm uppercase font-black tracking-[0.6em] mt-6 leading-relaxed">VALIDATED ANNUAL HEMORRHAGE SIGNAL</p>
          </main>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pt-12 border-t border-red-600/30">
            <article>
              <h3 className="text-white text-xl font-black uppercase italic mb-4 flex items-center gap-2"><TrendingUp size={20} className="text-red-600" /> The Compound Failure</h3>
              <p className="text-slate-400 text-sm italic leading-relaxed font-medium">&ldquo;Your $1.1M hemorrhage is a compounding liability scaling against your initial investment.&rdquo;</p>
            </article>
            <Card className="bg-slate-950 p-8 border-l-4 border-red-600 rounded-none border-y-0 border-r-0">
              <div className="flex justify-between mb-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest font-black"><span>VISIBLE TIP</span><span>$1.2M</span></div>
              <div className="h-px bg-slate-900 mb-4" />
              <div className="flex justify-between font-mono text-xs text-red-600 font-black tracking-widest italic"><span>TOTAL LIABILITY</span><span>$2.8M</span></div>
            </Card>
          </section>

          <footer className="bg-red-600 p-12 text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
            <h2 className="text-white text-3xl font-black uppercase italic mb-8 tracking-tighter">PREVENT THE TRAP</h2>
            <button className="bg-black text-white px-12 py-6 font-black uppercase italic tracking-[0.3em] text-[11px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 mx-auto border border-black">SCHEDULE DEEP DIVE AUDIT <ArrowRight size={18} /></button>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-96 bg-slate-950 border-r border-slate-900 p-10 space-y-12">
        <div className="flex items-center gap-3 text-red-600 font-black uppercase italic text-sm tracking-tighter italic">
          <BookOpen size={20} /> BMR_FieldGuide_V3
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
          <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight mb-16 font-sans">{lensQuestions[currentIdx]?.text}</h1>
          <div className="grid grid-cols-1 gap-4 font-sans">
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
