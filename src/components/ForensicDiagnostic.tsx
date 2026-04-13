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
        // Filter the 30-question matrix down to the 10 for this persona
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
    // 1. Save the individual persona's results
    await supabase.from('audits').insert([{
      operator_id: operator.id,
      group_id: operator.group_id,
      persona_type: operator.persona_type,
      raw_responses: finalAnswers,
      status: 'completed'
    }]);

    // 2. Check for Group Completion (Have all 3 personas finished?)
    const { data: groupAudits } = await supabase
      .from('audits')
      .select('persona_type')
      .eq('group_id', operator.group_id);

    if (groupAudits && groupAudits.length === 3) {
      // 3. Trigger the Synthesis Engine
      await fetch('/api/synthesize-fractures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: operator.group_id })
      });
    }
    setStep("done");
  };

  if (step === "loading") return <div className="p-20 text-red-600 animate-pulse font-mono uppercase">Connecting to Forensic Ledger...</div>;
  if (step === "invalid") return <div className="p-20 text-red-600 font-mono uppercase font-black italic">Error: Invalid_Access_Code</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono">
      <div className="max-w-xl mx-auto border border-red-900/30 p-12 shadow-2xl shadow-red-900/10">
        <div className="text-[10px] text-red-600 mb-8 tracking-widest font-black uppercase">
          NODE: {operator?.persona_type} // {operator?.diagnostic_groups?.org_name}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-700">
            <h1 className="text-3xl font-black italic mb-6 text-red-600 uppercase tracking-tighter">Protocol_Initialized</h1>
            <p className="mb-8 text-slate-400 leading-relaxed">You are entering the Forensic Triangulation node for the <strong>{operator?.persona_type}</strong> lens. 10 data points are required for synthesis.</p>
            <button 
              onClick={() => setStep("diagnostic")} 
              className="px-8 py-4 bg-red-600 font-black uppercase italic hover:bg-white hover:text-black transition-all"
            >
              Start_Segment_Audit
            </button>
          </div>
        )}

        {step === "diagnostic" && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="text-[10px] text-slate-500 mb-2 uppercase font-black">Question {currentIndex + 1} of 10</div>
            <h2 className="text-xl font-bold mb-8 italic uppercase leading-tight">{questions[currentIndex].text}</h2>
            
            {!selectedAnswer ? (
              <div className="flex flex-col gap-4">
                {["Yes", "No"].map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setSelectedAnswer(opt)} 
                    className="p-6 border border-slate-800 text-left font-black uppercase italic hover:bg-red-600 hover:border-red-600 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <label className="text-[10px] text-red-600 font-black block mb-2 uppercase tracking-widest">Select_Evidence_Basis</label>
                <select 
                  className="w-full bg-black border border-red-900 p-5 mb-4 text-white font-bold outline-none uppercase" 
                  onChange={(e) => handleFinalizeNode(e.target.value)}
                >
                  <option value="">Choose_Evidence...</option>
                  {questions[currentIndex].evidenceOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>
                  ))}
                </select>
                <button onClick={() => setSelectedAnswer(null)} className="text-[10px] text-slate-600 uppercase underline">Change Answer</button>
              </div>
            )}
          </div>
        )}

        {(step === "submitting" || step === "done") && (
          <div className="text-center py-10 animate-in zoom-in-95">
            <h1 className="text-2xl font-black italic text-red-600 mb-4 uppercase tracking-widest">Segment_Transmitted</h1>
            <p className="text-slate-500 text-sm leading-relaxed">Synthesis of the final Forensic Report will begin automatically once all stakeholder nodes are complete. You may now close this terminal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
