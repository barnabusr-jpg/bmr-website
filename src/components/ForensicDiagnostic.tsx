import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';

export default function ForensicDiagnostic() {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const init = async () => {
      const { data: op, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', code)
        .single();

      if (op && !error) {
        setOperator(op);
        // Dynamically filter 10 questions for the authorized lens
        const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
        setQuestions(filtered);
        setStep("intro");
      } else { 
        setStep("invalid"); 
      }
    };
    if (code) init();
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
    // 1. Persist the individual node responses to the Ledger
    const { error: insertError } = await supabase.from('audits').insert([{
      operator_id: operator.id,
      group_id: operator.group_id,
      persona_type: operator.persona_type,
      raw_responses: finalAnswers,
      status: 'completed'
    }]);

    if (insertError) {
      console.error("LEDGER_COMMIT_ERROR:", insertError);
      return;
    }

    // 2. Poll for Group Completion Status
    const { data: groupAudits } = await supabase
      .from('audits')
      .select('persona_type')
      .eq('group_id', operator.group_id);

    // 3. If this is the 3rd node, trigger the Synthesis Engine
    if (groupAudits && groupAudits.length === 3) {
      await fetch('/api/synthesize-fractures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: operator.group_id })
      });
    }
    
    setStep("done");
  };

  if (step === "loading") return <div className="p-20 text-red-600 animate-pulse font-mono uppercase font-black">Establishing_Secure_Connection...</div>;
  if (step === "invalid") return <div className="p-20 text-red-600 font-mono uppercase font-black italic">Unauthorized: Access_Code_Null</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono">
      <div className="max-w-xl mx-auto border border-red-900/30 p-12 shadow-2xl shadow-red-900/10">
        <div className="text-[10px] text-red-600 mb-8 tracking-widest font-black uppercase">
          NODE: {operator?.persona_type} // {operator?.diagnostic_groups?.org_name}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-700">
            <h1 className="text-3xl font-black italic mb-6 text-red-600 uppercase tracking-tighter">Protocol_Initialized</h1>
            <p className="mb-8 text-slate-400 leading-relaxed text-sm">
              You are authorized for the Forensic Triangulation of the <strong>{operator?.persona_type}</strong> node. 
              10 cross-referenced data points are required for synthesis.
            </p>
            <button 
              onClick={() => setStep("diagnostic")} 
              className="px-8 py-4 bg-red-600 text-white font-black uppercase italic hover:bg-white hover:text-black transition-all duration-300"
            >
              Start_Node_Audit
            </button>
          </div>
        )}

        {step === "diagnostic" && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="text-[10px] text-slate-500 mb-2 uppercase font-black">Segment {currentIndex + 1} of 10</div>
            <h2 className="text-xl font-bold mb-8 italic uppercase leading-tight">{questions[currentIndex].text}</h2>
            
            {!selectedAnswer ? (
              <div className="flex flex-col gap-4">
                {["Yes", "No"].map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setSelectedAnswer(opt)} 
                    className="p-6 border border-slate-800 text-left font-black uppercase italic hover:bg-red-600 hover:border-red-600 transition-all duration-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <label className="text-[10px] text-red-600 font-black block mb-2 uppercase tracking-widest">Select_Evidence_Basis</label>
                <select 
                  className="w-full bg-black border border-red-900 p-5 mb-4 text-white font-bold outline-none uppercase appearance-none cursor-pointer focus:bg-red-950/20" 
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
                  className="text-[10px] text-slate-600 uppercase underline hover:text-red-600 transition-colors"
                >
                  Modify_Selection
                </button>
              </div>
            )}
          </div>
        )}

        {(step === "submitting" || step === "done") && (
          <div className="text-center py-10 animate-in zoom-in-95 duration-700">
            <div className="mb-6 flex justify-center">
              <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-2xl font-black italic text-red-600 mb-4 uppercase tracking-widest">
              {step === "submitting" ? "Transmitting_Segment..." : "Segment_Secured"}
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
              {step === "submitting" 
                ? "Recording node responses to the forensic ledger."
                : "Synthesis will begin once all nodes are secure. Terminal may be closed."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
