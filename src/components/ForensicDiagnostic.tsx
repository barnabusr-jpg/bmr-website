"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';
import { Fingerprint, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

interface Props {
  accessCode: string | null;
}

export default function ForensicDiagnostic({ accessCode }: Props) {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const verifyNode = async () => {
      if (!accessCode) {
        setStep("invalid");
        return;
      }

      // Query the ledger with the clean code passed from the page
      const { data: op, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', accessCode)
        .single();

      if (error || !op) {
        console.error("BMR_LEDGER_REJECTION:", error);
        setStep("invalid");
        return;
      }

      // Check if the link is already 'burned'
      if (op.status?.toLowerCase() === 'completed') {
        setOperator(op);
        setStep("finalized");
        return;
      }

      // Initialize the Persona Lens
      const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
      setOperator(op);
      setQuestions(filtered);
      setStep("intro");
    };

    verifyNode();
  }, [accessCode]);

  // --- SUBMIT LOGIC ---
  const submitResults = async (finalAnswers: any) => {
    setStep("submitting");
    await supabase
      .from('operators')
      .update({ status: 'completed', raw_responses: finalAnswers })
      .eq('id', operator.id);

    // Check if triangle is complete (3/3 nodes)
    const { data: nodes } = await supabase
      .from('operators')
      .select('status')
      .eq('group_id', operator.group_id)
      .eq('status', 'completed');

    if (nodes && nodes.length === 3) {
      await fetch('/api/synthesize-fractures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: operator.group_id })
      });
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
  if (step === "loading") return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic animate-pulse">
      VERIFYING_NODE_CREDENTIALS...
    </div>
  );
  
  if (step === "invalid") return (
    <div className="min-h-screen bg-black flex items-center justify-center p-12 text-center">
      <div className="border-2 border-red-600 p-16 bg-slate-950 shadow-2xl">
        <AlertTriangle className="text-red-600 mx-auto mb-8 animate-bounce" size={64} />
        <h1 className="text-white font-black uppercase italic text-4xl mb-6">Unauthorized_Node</h1>
        <p className="text-slate-400 font-mono text-sm uppercase">Ledger Code Rejected: {accessCode || "NULL"}</p>
      </div>
    </div>
  );

  if (step === "finalized") return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-slate-950 border-2 border-red-900/20 p-16 shadow-2xl relative font-mono">
        <Lock className="absolute top-4 right-4 text-red-600 opacity-20" size={40} />
        <CheckCircle className="text-green-500 mx-auto mb-6" size={60} />
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">NODE_SECURED</h2>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-4 leading-relaxed">
          Diagnostic finalized for {operator?.diagnostic_groups?.org_name}. Access link deactivated.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl">
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4">
          NODE_AUTHORIZED: {operator?.persona_type}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-5xl font-black italic mb-8 uppercase tracking-tighter leading-none">Protocol_Initialized</h1>
            <p className="mb-10 text-slate-400 leading-relaxed text-base italic uppercase font-bold text-red-600">
              {operator?.diagnostic_groups?.org_name}
            </p>
            <button onClick={() => setStep("diagnostic")} className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.4em] hover:bg-white hover:text-black transition-all">Start_Node_Audit</button>
          </div>
        )}

        {step === "diagnostic" && (
          <div className="animate-in slide-in-from-right-8 duration-500">
             <div className="text-[10px] text-slate-500 mb-4 uppercase font-black italic">Segment {currentIndex + 1} of 10</div>
             <h2 className="text-2xl font-black mb-12 italic uppercase text-white tracking-tight leading-tight">{questions[currentIndex].text}</h2>
             {!selectedAnswer ? (
               <div className="grid grid-cols-2 gap-6">
                 {["Yes", "No"].map(opt => (
                   <button key={opt} onClick={() => setSelectedAnswer(opt)} className="p-10 border-2 border-slate-800 text-center font-black uppercase italic text-2xl hover:bg-red-600 transition-all">{opt}</button>
                 ))}
               </div>
             ) : (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <select className="w-full bg-black border-2 border-red-900 p-6 mb-8 text-white font-black uppercase text-sm" onChange={(e) => handleFinalizeNode(e.target.value)} defaultValue="">
                   <option value="" disabled>Choose_Basis...</option>
                   {questions[currentIndex].evidenceOptions.map((opt: string) => (
                     <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>
                   ))}
                 </select>
               </div>
             )}
          </div>
        )}

        {(step === "submitting" || step === "done") && (
          <div className="text-center py-10">
            <h1 className="text-3xl font-black italic text-red-600 mb-6 uppercase tracking-[0.2em]">Segment_Secured</h1>
            <p className="text-slate-400 text-xs uppercase font-mono tracking-tighter italic">The forensic node is secure. Terminal may be closed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
