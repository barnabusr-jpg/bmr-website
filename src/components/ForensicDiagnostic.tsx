"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';
import { Fingerprint, AlertTriangle } from 'lucide-react';

export default function ForensicDiagnostic() {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      // 1. Extract code from URL safely
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code')?.trim();

      if (!code) {
        setStep("invalid");
        return;
      }

      // 2. Query the Ledger for this specific access code
      const { data: op, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', code)
        .single();

      if (error || !op) {
        console.error("BMR_AUTH_CRITICAL: Ledger verification failed.", error);
        setStep("invalid");
        return;
      }

      // 3. Populate questions for the authorized lens
      setOperator(op);
      const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
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
    // 1. Commit individual node responses to the ledger
    const { error: insertError } = await supabase.from('audits').insert([{
      operator_id: operator.id,
      group_id: operator.group_id,
      persona_type: operator.persona_type,
      raw_responses: finalAnswers,
      status: 'completed'
    }]);

    if (insertError) {
      console.error("BMR_LEDGER_ERROR:", insertError);
      return;
    }

    // 2. Fetch current group status to determine if synthesis is ready
    const { data: groupAudits } = await supabase
      .from('audits')
      .select('persona_type')
      .eq('group_id', operator.group_id);

    // 3. Trigger Synthesis Engine if this is the final (3rd) node submission
    if (groupAudits && groupAudits.length === 3) {
      await fetch('/api/synthesize-fractures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: operator.group_id })
      });
    }
    
    setStep("done");
  };

  // --- STATE RENDERING ---

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-600 font-black uppercase tracking-[0.5em] animate-pulse italic">
          Establishing_Secure_Connection...
        </div>
      </div>
    );
  }

  if (step === "invalid") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-12">
        <div className="border-2 border-red-600 p-16 text-center max-w-xl bg-slate-950 shadow-2xl">
          <AlertTriangle className="text-red-600 mx-auto mb-8 animate-bounce" size={64} />
          <h1 className="text-white font-black uppercase italic text-4xl mb-6 tracking-tighter">Unauthorized_Node</h1>
          <p className="text-slate-400 font-mono text-sm uppercase leading-relaxed mb-8">
            The forensic access code provided was not found in the diagnostic ledger. 
            The node may have been terminated or the link is corrupted.
          </p>
          <div className="text-[10px] text-red-900 font-mono uppercase tracking-widest">ERROR_CODE: 403_SIGNAL_LOSS</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
           <Fingerprint size={250} className="text-red-600" />
        </div>
        
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4">
          NODE: {operator?.persona_type} // {operator?.diagnostic_groups?.org_name}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-5xl font-black italic mb-8 text-white uppercase tracking-tighter leading-none">
              Protocol_<span className="text-red-600">Initialized</span>
            </h1>
            <p className="mb-10 text-slate-400 leading-relaxed text-base italic uppercase">
              Authenticated for the Forensic Triangulation of the <strong>{operator?.persona_type}</strong> lens. 
              Transmission of 10 data points is required to complete the diagnostic ledger.
            </p>
            <button 
              onClick={() => setStep("diagnostic")} 
              className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 shadow-lg shadow-red-900/20"
            >
              Start_Node_Audit
            </button>
          </div>
        )}

        {step === "diagnostic" && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <div className="text-[10px] text-slate-500 mb-4 uppercase font-black tracking-widest">
              Data_Segment {currentIndex + 1} of 10
            </div>
            <h2 className="text-2xl font-black mb-12 italic uppercase leading-tight text-white tracking-tight underline decoration-red-900/50 underline-offset-8">
              {questions[currentIndex].text}
            </h2>
            
            {!selectedAnswer ? (
              <div className="grid grid-cols-2 gap-6">
                {["Yes", "No"].map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setSelectedAnswer(opt)} 
                    className="p-10 border-2 border-slate-800 text-center font-black uppercase italic text-2xl hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
                  >
                    <span className="group-hover:tracking-[0.2em] transition-all">{opt}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label className="text-[11px] text-red-600 font-black block mb-4 uppercase tracking-[0.2em]">
                  Select_Evidence_Basis
                </label>
                <select 
                  className="w-full bg-black border-2 border-red-900 p-6 mb-8 text-white font-black outline-none uppercase appearance-none cursor-pointer focus:bg-red-950/40 rounded-none text-sm tracking-widest" 
                  onChange={(e) => handleFinalizeNode(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Choose_Evidence_Basis...</option>
                  {questions[currentIndex].evidenceOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setSelectedAnswer(null)} 
                  className="text-[10px] text-slate-600 uppercase italic underline hover:text-red-600 transition-colors tracking-widest"
                >
                  Back_To_Selection
                </button>
              </div>
            )}
          </div>
        )}

        {(step === "submitting" || step === "done") && (
          <div className="text-center py-10 animate-in zoom-in-95 duration-1000">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-3xl font-black italic text-red-600 mb-6 uppercase tracking-[0.2em]">
              {step === "submitting" ? "Transmitting_Segment..." : "Segment_Secured"}
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto uppercase font-mono tracking-tighter">
              {step === "submitting" 
                ? "Writing node responses to the forensic diagnostic ledger. Do not terminate connection."
                : "The forensic node is secure. Synthesis begins automatically once all nodes respond. Terminal may be closed."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
