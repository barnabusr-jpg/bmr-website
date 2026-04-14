"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';
import { Fingerprint, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

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
      const code = params.get('code')?.trim();

      if (!code) {
        console.error("BMR_AUTH: No code detected in URL.");
        setStep("invalid");
        return;
      }

      // 1. Fetch operator and join with group for org name
      const { data: op, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', code)
        .single();

      // DEBUG LOG: Helps identify if DB status is mismatching
      console.log("BMR_AUTH_DEBUG: Accessing Node...", { 
        code, 
        status: op?.status, 
        found: !!op 
      });

      if (error || !op) {
        console.error("BMR_AUTH: Ledger verification failed.", error);
        setStep("invalid");
        return;
      }

      // 2. HARDENED STATUS CHECK: Only block if EXPLICITLY completed
      // This allows 'pending', null, or empty strings to proceed to the test
      const normalizedStatus = op.status ? op.status.toLowerCase() : 'active';
      
      if (normalizedStatus === 'completed') {
        setOperator(op);
        setStep("finalized");
        return;
      }

      // 3. Initialize questions if link is valid and not yet finished
      const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
      setOperator(op);
      setQuestions(filtered);
      setStep("intro");
    };

    init();
  }, []);

  const handleFinalizeNode = async (evidence: string) => {
    if (!selectedAnswer || !evidence) return;
    
    const qId = questions[currentIndex].id;
    const newAnswers = { ...answers, [qId]: { answer: selectedAnswer, evidence } };
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep("submitting");
      await submitResults(newAnswers);
    }
  };

  const submitResults = async (finalAnswers: any) => {
    // 1. Update status to 'completed' to burn the link for future access
    const { error: updateError } = await supabase
      .from('operators')
      .update({ 
        status: 'completed',
        raw_responses: finalAnswers 
      })
      .eq('id', operator.id);

    if (updateError) {
      console.error("BMR_LEDGER_ERROR:", updateError);
      return;
    }

    // 2. Check if the Triangulation is complete (3/3 nodes)
    const { data: groupNodes } = await supabase
      .from('operators')
      .select('status')
      .eq('group_id', operator.group_id)
      .eq('status', 'completed');

    if (groupNodes && groupNodes.length === 3) {
      console.log("BMR_LOG: Triangulation achieved. Initializing Synthesis...");
      await fetch('/api/synthesize-fractures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: operator.group_id })
      });
    }
    
    setStep("done");
  };

  // --- RENDER STATES ---

  if (step === "loading") return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-black uppercase tracking-[0.5em] animate-pulse italic">
      Establishing_Secure_Connection...
    </div>
  );
  
  if (step === "invalid") return (
    <div className="min-h-screen bg-black flex items-center justify-center p-12">
      <div className="border-2 border-red-600 p-16 text-center max-w-xl bg-slate-950 shadow-2xl">
        <AlertTriangle className="text-red-600 mx-auto mb-8 animate-bounce" size={64} />
        <h1 className="text-white font-black uppercase italic text-4xl mb-6 tracking-tighter leading-none">Unauthorized_Node</h1>
        <p className="text-slate-400 font-mono text-sm uppercase leading-relaxed">
          The access code is invalid or the node session has been terminated.
        </p>
      </div>
    </div>
  );

  if (step === "finalized") return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center font-mono">
      <div className="max-w-md space-y-8 bg-slate-950 border-2 border-red-900/20 p-16 shadow-2xl relative overflow-hidden">
        <Lock className="absolute top-4 right-4 text-red-600 opacity-20" size={40} />
        <CheckCircle className="text-green-500 mx-auto mb-6" size={60} />
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">NODE_SECURED</h2>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
          The diagnostic for <strong>{operator?.diagnostic_groups?.org_name}</strong> has been finalized. 
          <br/><br/>
          Forensic integrity requires that this link remains deactivated.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Fingerprint size={100} className="text-red-600" />
        </div>
        
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4 leading-none">
          NODE_AUTHORIZED: {operator?.persona_type} // {operator?.email}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-5xl font-black italic mb-8 text-white uppercase tracking-tighter leading-none">
              Protocol_<span className="text-red-600">Initialized</span>
            </h1>
            <p className="mb-10 text-slate-400 leading-relaxed text-base italic uppercase">
              Authenticated for the Forensic Triangulation of the <strong>{operator?.persona_type}</strong> lens.
            </p>
            <button onClick={() => setStep("diagnostic")} className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.4em] hover:bg-white hover:text-black transition-all">Start_Node_Audit</button>
          </div>
        )}

        {step === "diagnostic" && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <div className="text-[10px] text-slate-500 mb-4 uppercase font-black tracking-widest">Segment {currentIndex + 1} of 10</div>
            <h2 className="text-2xl font-black mb-12 italic uppercase leading-tight text-white tracking-tight">{questions[currentIndex].text}</h2>
            {!selectedAnswer ? (
              <div className="grid grid-cols-2 gap-6">
                {["Yes", "No"].map(opt => (
                  <button key={opt} onClick={() => setSelectedAnswer(opt)} className="p-10 border-2 border-slate-800 text-center font-black uppercase italic text-2xl hover:bg-red-600 hover:border-red-600 transition-all">{opt}</button>
                ))}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <select className="w-full bg-black border-2 border-red-900 p-6 mb-8 text-white font-black uppercase appearance-none" onChange={(e) => handleFinalizeNode(e.target.value)} defaultValue="">
                  <option value="" disabled>Choose_Evidence_Basis...</option>
                  {questions[currentIndex].evidenceOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>
                  ))}
                </select>
                <button onClick={() => setSelectedAnswer(null)} className="text-[10px] text-slate-600 uppercase italic underline hover:text-red-600 transition-colors">Back_To_Selection</button>
              </div>
            )}
          </div>
        )}

        {(step === "submitting" || step === "done") && (
          <div className="text-center py-10">
            <h1 className="text-3xl font-black italic text-red-600 mb-6 uppercase tracking-[0.2em]">
              {step === "submitting" ? "Transmitting..." : "Segment_Secured"}
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto uppercase font-mono tracking-tighter">
              The diagnostic for this node is complete. Closing this terminal will not affect the forensic ledger.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
