// src/components/ForensicDiagnostic.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';

export default function ForensicDiagnostic() {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const init = async () => {
      const { data: op } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', code).single();
      if (op) {
        setOperator(op);
        setQuestions(FORENSIC_MATRIX.filter(q => q.lens === op.persona_type));
        setStep("intro");
      } else { setStep("invalid"); }
    };
    if (code) init();
  }, []);

  const handleFinalizeNode = async (evidence) => {
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

  const submitResults = async (finalAnswers) => {
    // 1. Save the persona's results
    await supabase.from('audits').insert([{
      operator_id: operator.id,
      group_id: operator.group_id,
      persona_type: operator.persona_type,
      raw_responses: finalAnswers,
      status: 'completed'
    }]);

    // 2. Check for Group Completion
    const { data: groupAudits } = await supabase
      .from('audits').select('raw_responses, persona_type')
      .eq('group_id', operator.group_id);

    if (groupAudits.length === 3) {
      // 3. Trigger Synthesis (Edge Function)
      await fetch('/api/synthesize-fractures', {
        method: 'POST',
        body: JSON.stringify({ groupId: operator.group_id })
      });
    }
    setStep("done");
  };

  if (step === "loading") return <div className="p-20 text-red-600 animate-pulse font-mono uppercase">Connecting to Forensic Ledger...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono">
      <div className="max-w-xl mx-auto border border-red-900/30 p-12">
        <div className="text-[10px] text-red-600 mb-8">NODE: {operator?.persona_type} // {operator?.diagnostic_groups?.org_name}</div>
        
        {step === "diagnostic" && (
          <div>
            <h2 className="text-xl font-bold mb-8 italic uppercase">{questions[currentIndex].text}</h2>
            {!selectedAnswer ? (
              <div className="flex flex-col gap-4">
                {["Yes", "No"].map(opt => (
                  <button key={opt} onClick={() => setSelectedAnswer(opt)} className="p-6 border border-slate-800 text-left font-bold hover:bg-red-600">{opt}</button>
                ))}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <label className="text-[10px] text-red-600 font-bold block mb-2">SELECT_EVIDENCE_BASIS</label>
                <select className="w-full bg-black border border-red-900 p-4 mb-4 text-white" onChange={(e) => handleFinalizeNode(e.target.value)}>
                  <option>Select...</option>
                  {questions[currentIndex].evidenceOptions.map(opt => <option key={opt} value={opt}>{opt.replace("_", " ")}</option>)}
                </select>
              </div>
            )}
          </div>
        )}
        {step === "done" && <div className="text-center italic text-red-600 uppercase font-black">Segment Transmitted. Synthesis Pending Stakeholder Completion.</div>}
      </div>
    </div>
  );
}
