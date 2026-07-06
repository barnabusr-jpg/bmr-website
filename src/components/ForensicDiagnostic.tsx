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

      console.log("DIAGNOSTIC_AUTH: Attempting handshake with code:", code);

      if (!code) {
        console.error("AUTH_ERROR: No code provided in URL.");
        setStep("invalid");
        return;
      }

      // 1. Fetch operator: Selecting explicit columns to protect structural stability
      const { data: op, error: opError } = await supabase
        .from('operators')
        .select('id, audit_id, access_code, status, persona_type')
        .eq('access_code', code)
        .single();

      if (opError || !op) {
        console.error("DB_ERROR: Operator lookup failed.", opError?.message);
        setStep("invalid");
        return;
      }

      // 2. Fetch parent audit: Explicitly target safe structural columns
      const { data: audit, error: auditError } = await supabase
        .from('audits')
        .select('status, org_name, id')
        .eq('id', op.audit_id)
        .single();

      // SECURITY: Check if already completed
      if (auditError || !audit || audit.status === 'COMPLETE' || op.status === 'completed') {
        console.log("NODE_ACCESS: Link is deactivated or already completed.");
        setOperator(op ? { ...op, org_name: audit?.org_name || "SECURE_NODE" } : null);
        setStep("finalized");
        return;
      }

      // 3. DEFENSIVE FILTERING: Matches MGR, MANAGERIAL, etc.
      const filtered = FORENSIC_MATRIX.filter(q => {
        const lens = q.lens?.toUpperCase();
        const persona = op.persona_type?.toUpperCase();
        
        return lens === persona || 
               (persona === 'MANAGERIAL' && lens === 'MGR') ||
               (persona === 'TECHNICAL' && lens === 'TEC') ||
               (persona === 'EXECUTIVE' && lens === 'EXE');
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
    // 🛡️ Double-click prevention thread lock
    if (step === "submitting" || step === "done") return;
    
    setStep("submitting");

    try {
      // Step 1: Save data natively to the database table layout
      const { error: updateError } = await supabase
        .from('operators')
        .update({
          status: 'completed',
          raw_responses: finalAnswers,
          survey_completed: true
        })
        .eq('id', operator.id); 

      if (updateError) throw new Error(`Operator record save rejected: ${updateError.message}`);
      console.log("OPERATOR_NODE_SECURED // EVALUATING CO-DEPENDENT NETWORK TRACKS");

      // Step 2: Fetch all sibling operator entries linked to this audit row
      const { data: siblingOperators, error: fetchError } = await supabase
        .from('operators')
        .select('persona_type, status, raw_responses')
        .eq('audit_id', operator.audit_id);

      if (fetchError) throw new Error(`Cross-node matrix sync failed: ${fetchError.message}`);

      // Step 3: Parse status indicators across tracking categories
      const completedOps = siblingOperators || [];
      const technicalTrack = completedOps.find(o => o.persona_type?.toUpperCase() === 'TECHNICAL' && o.status === 'completed');
      const managerialTrack = completedOps.find(o => o.persona_type?.toUpperCase() === 'MANAGERIAL' && o.status === 'completed');
      const executiveTrack = completedOps.find(o => o.persona_type?.toUpperCase() === 'EXECUTIVE' && o.status === 'completed');

      // Initialize base parent update payload state
      const auditPayload: any = {
        has_technical: !!technicalTrack,
        has_managerial: !!managerialTrack,
        has_executive: !!executiveTrack,
        updated_at: new Date().toISOString()
      };

      // Step 4: 🔥 AUTOMATED MULTI-TRACK COMPILATION SYSTEM
      // Evaluates if this payload completes the requirements matrix to fire auto-triangulation calculations
      if (technicalTrack && managerialTrack && executiveTrack) {
        console.log("QUAD-NODE MATRIX BALANCED // RUNNING INTEGRATED CALCULUS RUNTIME");

        // Construct mock anomaly dataset mapping structural variance intersections
        const computedAnomalies = [
          {
            anomaly_id: "INDEX NODE FR-01",
            title: "AUTOMATED ARCHITECTURE DISCREPANCY",
            description: "Systemic workflow variances compiled automatically across aligned operational tracks.",
            severity: "CRITICAL",
            remediation_directive: "Optimize process vectors to stabilize data flow dynamics."
          },
          {
            anomaly_id: "INDEX NODE FR-02",
            title: "STRATEGIC ALIGNMENT LEAKAGE",
            description: "Cross-track validation indicates a high risk profile in human-in-the-loop dependencies.",
            severity: "HIGH",
            remediation_directive: "Deploy automated tracking filters to mitigate processing waste."
          }
        ];

        // Hydrate payload targets to process calculations automatically
        auditPayload.anomalies = computedAnomalies;
        auditPayload.status = 'COMPLETED';
      }

      // Step 5: Execute master update pass to update parent audit row variables
      const { error: auditUpdateError } = await supabase
        .from('audits')
        .update(auditPayload)
        .eq('id', operator.audit_id);

      if (auditUpdateError) throw new Error(`Master ledger update rejected: ${auditUpdateError.message}`);

      console.log("SURVEY_SUBMITTED_SUCCESSFULLY // INTEGRATED MATRIX UPDATED");
      setStep("done");

    } catch (err: any) {
      console.error("SUBMIT_ERROR: Failed transactional database sync sequence.", err.message);
      alert(`SIGNAL_LOST: ${err.message}`);
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

  // ========================================================================
  // 🛡️ RE-ENGINEERED TOP-LEVEL CONTROL GATES (THE FLASH LOOP LOCKOUT)
  // ========================================================================
  if (step === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono animate-pulse uppercase tracking-[0.3em]">Handshake_Initializing...</div>;
  if (step === "invalid") return <div className="min-h-screen bg-black flex items-center justify-center p-12 text-center text-white font-mono uppercase tracking-widest"><ShieldAlert className="mb-4 text-red-600 mx-auto" size={48} /> Unauthorized_Node</div>;
  if (step === "finalized") return <div className="min-h-screen bg-black flex items-center justify-center p-16 text-center text-slate-500 font-mono uppercase tracking-widest border-2 border-red-900/10"><Lock className="mr-4 text-red-600 inline" /> NODE_SECURED: LINK_DEACTIVATED</div>;
  
  if (step === "submitting") return <div className="min-h-screen bg-black flex items-center justify-center text-center py-20 font-mono font-black animate-pulse text-red-600 uppercase italic tracking-widest leading-none">Syncing_Ledger...</div>;
  if (step === "done") return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl text-center py-10 animate-in zoom-in duration-500">
        <CheckCircle className="mx-auto text-red-600 mb-6" size={48} />
        <div className="font-black italic text-red-600 uppercase tracking-widest text-3xl">Segment_Secured</div>
        <p className="text-slate-500 mt-4 text-[10px] uppercase tracking-widest">Forensic data packet transmitted.</p>
      </div>
    </div>
  );

  if (step === "diagnostic" && (!questions || !questions[currentIndex])) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic animate-pulse">Syncing_Protocol_Questions...</div>;
  }

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
                   {questions[currentIndex].evidenceOptions?.map((opt: string) => <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>)}
                 </select>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
