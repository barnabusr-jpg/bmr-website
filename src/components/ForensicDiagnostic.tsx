"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';
import { Lock, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ForensicDiagnostic() {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code')?.trim().toUpperCase();

      if (!code) {
        setStep("invalid");
        return;
      }

      // STEP 1: Fetch operator (Manual fetch to avoid Join errors)
      const { data: op, error: opError } = await supabase
        .from('operators')
        .select('*')
        .eq('access_code', code)
        .single();

      if (opError || !op) {
        // Fallback for 0 vs O confusion
        const alt = code.includes('0') ? code.replace(/0/g, 'O') : code.replace(/O/g, '0');
        const { data: retry } = await supabase.from('operators').select('*').eq('access_code', alt).single();
        
        if (!retry) { setStep("invalid"); return; }
        await enrichAndSetup(retry);
      } else {
        await enrichAndSetup(op);
      }
    };

    const enrichAndSetup = async (op: any) => {
      // STEP 2: Fetch group separately
      const { data: group } = await supabase
        .from('diagnostic_groups')
        .select('org_name')
        .eq('id', op.group_id)
        .single();

      const enriched = { ...op, diagnostic_groups: group };
      
      // STEP 3: Check completion status
      if (op.status?.toLowerCase() === 'completed') {
        setOperator(enriched);
        setStep("finalized");
      } else {
        const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
        setOperator(enriched);
        setQuestions(filtered);
        setStep("intro");
      }
    };

    init();
  }, []);

  const submitResults = async (finalAnswers: any) => {
    setStep("submitting");
    
    // 1. Update the record
    const { error: updateError } = await supabase
      .from('operators')
      .update({ 
        status: 'completed', 
        raw_responses: finalAnswers 
      })
      .eq('id', operator.id);

    if (updateError) {
      alert("SYNC_ERROR: Data could not be saved.");
      setStep("intro");
      return;
    }

    // 2. Check for synthesis trigger (3 nodes completed)
    const { data: nodes } = await supabase
      .from('operators')
      .select('status')
      .eq('group_id', operator.group_id)
      .eq('status', 'completed');

    if (nodes && nodes.length === 3) {
      try {
        await fetch('/api/synthesize-fractures', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ groupId: operator.group_id })
        });
      } catch (e) {
        console.error("Synthesis trigger failed:", e);
      }
    }

    setStep("done");
  };

  const handleFinalizeNode = (evidence: string) => {
    const qId = questions[currentIndex].id;
    const newAnswers = { ...answers, [qId]: { answer: selectedAnswer, evidence } };
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitResults(newAnswers);
    }
  };

  // --- RENDER STATES ---

  if (step === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono animate-pulse uppercase tracking-[0.3em]">Handshake_Initializing...</div>;
  
  if (step === "invalid") return <div className="min-h-screen bg-black flex items-center justify-center p-12 text-center text-white border-2 border-red-600 font-mono uppercase">Unauthorized_Node</div>;

  if (step === "finalized") return <div className="min-h-screen bg-black flex items-center justify-center p-16 text-center text-slate-500 font-mono border-2 border-red-900/20"><Lock className="mr-4 text-red-600" /> NODE_SECURED: LINK_DEACTIVATED</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl relative">
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4 leading-none">
          NODE_AUTHORIZED: {operator?.persona_type}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter leading-none">Protocol_Initialized</h1>
            <p className="mb-10 text-slate-400 text-sm uppercase italic">Authenticated for: {operator?.diagnostic_groups?.org_name || "BMR_SECURE_CLIENT"}</p>
            <button onClick={() => setStep("diagnostic")} className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.4em] hover:bg-white hover:text-black transition-all">Start_Node_Audit</button>
          </div>
        )}

        {step === "diagnostic" && (
          <div className="animate-in slide-in-from-right-8 duration-500">
             <div className="text-[10px] text-slate-500 mb-4 uppercase font-black italic">Segment {currentIndex + 1} of {questions.length}</div>
             <h2 className="text-2xl font-black mb-12 uppercase text-white tracking-tight leading-tight">{questions[currentIndex].text}</h2>
             {!selectedAnswer ? (
               <div className="grid grid-cols-2 gap-6">
                 {["Yes", "No"].map(opt => <button key={opt} onClick={() => setSelectedAnswer(opt)} className="p-10 border-2 border-slate-800 text-center font-black uppercase italic text-2xl hover:bg-red-600 transition-all">{opt}</button>)}
               </div>
             ) : (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <select className="w-full bg-black border-2 border-red-900 p-6 mb-8 text-white font-black uppercase text-sm appearance-none cursor-pointer" onChange={(e) => handleFinalizeNode(e.target.value)} defaultValue="">
                   <option value="" disabled>Choose_Evidence_Basis...</option>
                   {questions[currentIndex].evidenceOptions.map((opt: string) => <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>)}
                 </select>
               </div>
             )}
          </div>
        )}

        {step === "submitting" && <div className="text-center py-20 font-black animate-pulse text-red-600 uppercase italic">Syncing_Ledger...</div>}
        {step === "done" && (
          <div className="text-center py-10 animate-in zoom-in duration-500">
            <CheckCircle className="mx-auto text-red-600 mb-6" size={48} />
            <div className="font-black italic text-red-600 uppercase tracking-widest text-3xl">Segment_Secured</div>
            <p className="mt-4 text-slate-500 text-xs uppercase">Handshake Complete. Link Expired.</p>
          </div>
        )}
      </div>
    </div>
  );
}
