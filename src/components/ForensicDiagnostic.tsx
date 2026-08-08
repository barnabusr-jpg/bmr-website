"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';
import { Lock, CheckCircle, ShieldAlert, Activity, ArrowRight } from 'lucide-react';

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

      console.log("DIAGNOSTIC_AUTH: Attempting handshake with code:", code);

      if (!code) {
        console.error("AUTH_ERROR: No code provided in URL.");
        setStep("invalid");
        return;
      }

      // 1. Fetch operator record safely
      const { data: op, error: opError } = await supabase
        .from('operators')
        .select('id, audit_id, access_code, status, persona_type')
        .eq('access_code', code)
        .maybeSingle();

      if (opError || !op) {
        console.error("DB_ERROR: Operator lookup failed.", opError?.message);
        setStep("invalid");
        return;
      }

      // 2. Fetch parent audit record
      const { data: audit, error: auditError } = await supabase
        .from('audits')
        .select('status, org_name, id')
        .eq('id', op.audit_id)
        .maybeSingle();

      // SECURITY: Check if link is completed or deactivated
      if (auditError || !audit || audit.status === 'COMPLETE' || op.status === 'completed') {
        console.log("NODE_ACCESS: Link is deactivated or already completed.");
        setOperator(op ? { ...op, org_name: audit?.org_name || "Evaluation Node" } : null);
        setStep("finalized");
        return;
      }

      // 3. Filter matrix questions by persona lens (EXE, TEC, MGR)
      const normalizedPersona = op.persona_type?.toUpperCase() || '';
      const filtered = FORENSIC_MATRIX.filter(q => {
        const lens = q.lens?.toUpperCase() || '';
        return lens === normalizedPersona || 
               (normalizedPersona.includes('MAN') && lens === 'MGR') ||
               (normalizedPersona.includes('TECH') && lens === 'TEC') ||
               (normalizedPersona.includes('EXEC') && lens === 'EXE');
      });
      
      console.log(`LENS_CHECK: Persona is [${op.persona_type}]. Questions found: ${filtered.length}`);

      if (!filtered || filtered.length === 0) {
        console.error("LOGIC_ERROR: No matrix mapping for persona type:", op.persona_type);
        setStep("invalid");
        return;
      }

      setQuestions(filtered);
      setOperator({ ...op, org_name: audit.org_name });
      setStep("intro");
    };

    init();
  }, []);

  const submitResults = async (finalAnswers: any) => {
    if (step === "submitting" || step === "done") return;
    
    setStep("submitting");

    try {
      // 1. Save raw responses directly to operator node
      const { error: updateError } = await supabase
        .from('operators')
        .update({
          status: 'completed',
          raw_responses: finalAnswers,
          survey_completed: true
        })
        .eq('id', operator.id); 

      if (updateError) throw new Error(`Operator record save rejected: ${updateError.message}`);

      // 2. Query all sibling nodes for this parent audit
      const { data: siblingOperators, error: fetchError } = await supabase
        .from('operators')
        .select('persona_type, status')
        .eq('audit_id', operator.audit_id);

      if (fetchError) throw new Error(`Cross-node matrix sync failed: ${fetchError.message}`);

      // 3. Strict status check across all 3 tracks
      const ops = siblingOperators || [];
      const technicalDone = ops.some(o => o.persona_type?.toUpperCase() === 'TECHNICAL' && o.status === 'completed');
      const managerialDone = ops.some(o => o.persona_type?.toUpperCase() === 'MANAGERIAL' && o.status === 'completed');
      const executiveDone = ops.some(o => o.persona_type?.toUpperCase() === 'EXECUTIVE' && o.status === 'completed');

      const allThreeComplete = technicalDone && managerialDone && executiveDone;

      // 4. Update parent audit timestamp & mark COMPLETED only when all tracks pass
      const auditPayload: Record<string, any> = {
        compiled_at: new Date().toISOString()
      };

      if (allThreeComplete) {
        auditPayload.status = 'COMPLETED';
      }

      const { error: auditUpdateError } = await supabase
        .from('audits')
        .update(auditPayload)
        .eq('id', operator.audit_id);

      if (auditUpdateError) throw new Error(`Master ledger update rejected: ${auditUpdateError.message}`);

      setStep("done");

    } catch (err: any) {
      console.error("SUBMIT_ERROR: Transaction failed.", err.message);
      alert(`Submission Error: ${err.message}`);
      setStep("diagnostic");
    }
  };

  const handleFinalizeNode = (evidence: string) => {
    const qId = questions[currentIndex]?.id;
    if (!qId) return;

    const newAnswers = { ...answers, [qId]: { answer: selectedAnswer, evidence } };
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitResults(newAnswers);
    }
  };

  const formatEvidenceLabel = (rawTag: string) => {
    return rawTag
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex items-center gap-3 text-slate-900 font-mono text-xs uppercase tracking-wider font-bold">
          <Activity className="animate-spin text-slate-900" size={18} />
          Initializing Diagnostic Access...
        </div>
      </div>
    );
  }

  if (step === "invalid") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-slate-200 p-12 max-w-md w-full text-center shadow-sm rounded-lg">
          <ShieldAlert className="mb-4 text-slate-900 mx-auto" size={48} />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 font-mono">The diagnostic code provided is missing or invalid.</p>
        </div>
      </div>
    );
  }

  if (step === "finalized") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-slate-200 p-12 max-w-md w-full text-center shadow-sm rounded-lg">
          <Lock className="mb-4 text-slate-900 mx-auto" size={48} />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Diagnostic Complete</h2>
          <p className="text-xs text-slate-500 font-mono">This assessment link has already been completed and deactivated.</p>
        </div>
      </div>
    );
  }

  if (step === "submitting") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex items-center gap-3 text-slate-900 font-mono text-xs uppercase tracking-wider font-bold">
          <Activity className="animate-spin text-slate-900" size={18} />
          Submitting Diagnostic Findings...
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-6 font-sans flex items-center justify-center">
        <div className="max-w-md w-full border border-slate-200 p-10 bg-white shadow-sm rounded-lg text-center">
          <CheckCircle className="mx-auto text-emerald-700 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Section Complete</h2>
          <p className="text-xs text-slate-500 font-mono">Your diagnostic input has been securely recorded and synced to the master assessment matrix.</p>
        </div>
      </div>
    );
  }

  if (step === "diagnostic" && (!questions || !questions[currentIndex])) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex items-center gap-3 text-slate-900 font-mono text-xs uppercase tracking-wider font-bold">
          <Activity className="animate-spin text-slate-900" size={18} />
          Loading Assessment Questions...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-2xl w-full border border-slate-200 p-8 md:p-12 bg-white shadow-sm rounded-lg relative">
        <div className="text-xs font-mono text-slate-500 mb-8 font-bold uppercase tracking-wider border-b border-slate-100 pb-3 flex justify-between items-center">
          <span>Target: {operator?.org_name}</span>
          <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded font-mono">{operator?.persona_type} Track</span>
        </div>
        
        {step === "intro" && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Operational Risk Assessment
            </h1>
            <p className="mb-8 text-slate-600 text-sm leading-relaxed">
              You are completing the forensic assessment for <strong>{operator?.org_name}</strong> as an authorized representative for the <strong>{operator?.persona_type}</strong> track. Your input directly calibrates operational readiness and governance specifications.
            </p>
            <button 
              onClick={() => setStep("diagnostic")} 
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs transition-colors rounded shadow-sm flex items-center justify-center gap-2"
            >
              Begin Diagnostic
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "diagnostic" && (
          <div>
            <div className="text-xs font-mono text-slate-500 mb-3 font-semibold uppercase tracking-wider">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-slate-900 tracking-tight leading-snug">
              {questions[currentIndex].text}
            </h2>

            {!selectedAnswer ? (
              <div className="grid grid-cols-2 gap-4">
                {["Yes", "No"].map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setSelectedAnswer(opt)} 
                    className="p-8 border border-slate-200 bg-slate-50/50 hover:bg-slate-900 hover:text-white text-slate-900 font-bold uppercase text-lg transition-colors rounded shadow-sm cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-xs font-mono text-slate-500 font-bold uppercase tracking-wider mb-2">
                  Select Evidence / Verification Basis:
                </label>
                <select 
                  className="w-full bg-slate-50 border border-slate-300 p-4 text-slate-900 font-medium text-sm rounded outline-none focus:border-slate-900 cursor-pointer" 
                  onChange={(e) => handleFinalizeNode(e.target.value)} 
                  defaultValue=""
                >
                  <option value="" disabled>Choose verification documentation...</option>
                  {questions[currentIndex].evidenceOptions?.map((opt: string) => (
                    <option key={opt} value={opt}>
                      {formatEvidenceLabel(opt)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
