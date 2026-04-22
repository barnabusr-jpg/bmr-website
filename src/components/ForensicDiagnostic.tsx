"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';
import { Lock, CheckCircle, ShieldAlert } from 'lucide-react';

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

      // 1. Fetch operator by code
      const { data: op, error: opError } = await supabase
        .from('operators')
        .select('*')
        .eq('access_code', code)
        .single();

      if (opError || !op) {
        setStep("invalid");
        return;
      }

      // 2. Fetch parent audit using the UUID anchor (audit_id)
      const { data: audit, error: auditError } = await supabase
        .from('audits')
        .select('status, org_name, id')
        .eq('id', op.audit_id)
        .single();

      // SECURITY CHECK: Lock if op is completed or audit is fully COMPLETE
      if (auditError || !audit || audit.status === 'COMPLETE' || op.status === 'completed') {
        setOperator(op ? { ...op, org_name: audit?.org_name || "SECURE_NODE" } : null);
        setStep("finalized");
      } else {
        // Load the right questions based on the persona (EXE, MGR, TEC)
        const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
        setOperator({ ...op, org_name: audit.org_name });
        setQuestions(filtered);
        setStep("intro");
      }
    };

    init();
  }, []);

  const submitResults = async (finalAnswers: any) => {
    setStep("submitting");

    // SCALE FIX: Update ONLY this operator's specific UUID row
    const { error: updateError } = await supabase
      .from('operators')
      .update({ 
        status: 'completed', 
        raw_responses: finalAnswers 
      })
      .eq('id', operator.id); 

    if (updateError) {
      console.error("SUBMISSION_ERROR:", updateError);
      alert("SIGNAL_LOST: Database rejected the entry.");
      setStep("diagnostic");
      return;
    }

    // TRIGGER TRIANGULATION: Check for 3 completed nodes under this UUID
    const { data: nodes } = await supabase
      .from('operators')
      .select('status')
      .eq('audit_id', operator.audit_id)
      .eq('status', 'completed');

    if (nodes && nodes.length === 3) {
      // Pass the audit UUID to the synthesis engine
      fetch('/api/synthesize-fractures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId: operator.audit_id }) 
      }).catch(err => console.error("Synthesis trigger error:", err));
    }

    setStep("done");
  };

  const handleFinalizeNode = (evidence: string) => {
    const qId = questions[currentIndex].id;
    const newAnswers = { ...answers, [qId]: { answer: selectedAnswer, evidence } };
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else submitResults(newAnswers);
  };

  // UI RENDERING
  if (step === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono animate-pulse uppercase tracking-[0.3em]">Handshake_Initializing...</div>;
  if (step === "invalid") return <div className="min-h-screen bg-black flex items-center justify-center p-12 text-center text-white font-mono uppercase tracking-widest"><ShieldAlert className="mb-4 text-red-600 mx-auto" size={48} /> Unauthorized_Node</div>;
  if (step === "finalized") return <div className="min-h-screen bg-black flex items-center justify-center p-16 text-center text-slate-500 font-mono uppercase tracking-widest border-2 border-red-900/10"><Lock className="mr-4 text-red-600 inline" /> NODE_SECURED: LINK_DEACTIVATED</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl relative">
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4 leading-none">
          NODE_AUTHORIZED: {operator?.persona_type} // TARGET: {operator?.org_name}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-700">
            <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter leading-none">Protocol_Initialized</h1>
            <p className="mb-10 text-slate-400 text-sm uppercase italic leading-tight">Authenticating forensics for {operator?.org_name}. Entry is isolated to your specific node link.</p>
            <button onClick={() => setStep("diagnostic")} className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.4em] hover:bg-white hover:text-black transition-all">Start_Audit</button>
          </div>
        )}

        {step === "diagnostic" && (
          <div className="animate-in slide-in-from-right-4 duration-500">
             <div className="text-[10px] text-slate-500 mb-4 uppercase font-black italic tracking-widest">Segment {currentIndex + 1} of {questions.length}</div>
             <h2 className="text-2xl font-black mb-12 uppercase text-white tracking-tight leading-tight">{questions[currentIndex].text}</h2>
             {!selectedAnswer ? (
               <div className="grid grid-cols-2 gap-6">
                 {["Yes", "No"].map(opt => <button key={opt} onClick={() => setSelectedAnswer(opt)} className="p-10 border-2 border-slate-800 text-center font-black uppercase italic text-2xl hover:bg-red-600 transition-all">{opt}</button>)}
               </div>
             ) : (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <select className="w-full bg-black border-2 border-red-900 p-6 mb-8 text-white font-black uppercase text-sm appearance-none cursor-pointer outline-none" onChange={(e) => handleFinalizeNode(e.target.value)} defaultValue="">
                   <option value="" disabled>Choose_Evidence_Basis...</option>
                   {questions[currentIndex].evidenceOptions.map((opt: string) => <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>)}
                 </select>
               </div>
             )}
          </div>
        )}

        {step === "submitting" && <div className="text-center py-20 font-black animate-pulse text-red-600 uppercase italic tracking-widest leading-none">Syncing_Ledger...</div>}
        {step === "done" && (
          <div className="text-center py-10 animate-in zoom-in duration-500">
            <CheckCircle className="mx-auto text-red-600 mb-6" size={48} />
            <div className="font-black italic text-red-600 uppercase tracking-widest text-3xl">Segment_Secured</div>
            <p className="text-slate-500 mt-4 text-[10px] uppercase">Forensic data packet transmitted.</p>
          </div>
        )}
      </div>
    </div>
  );
}
