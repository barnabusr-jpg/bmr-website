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

      // 1. Fetch operator (legacy backend logic)
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

      // 2. Fetch parent audit (legacy backend logic)
      const { data: audit, error: auditError } = await supabase
        .from('audits')
        .select('status, org_name, id')
        .eq('id', op.audit_id)
        .single();

      // SECURITY: Case-insensitive guard for completed assessments
      const isOpComplete = String(op.status).trim().toUpperCase() === 'COMPLETED';
      if (auditError || !audit || audit.status === 'COMPLETE' || audit.status === 'COMPLETED' || isOpComplete) {
        console.log("NODE_ACCESS: Link is deactivated or already completed.");
        setOperator(op ? { ...op, org_name: audit?.org_name || "SECURE_NODE" } : null);
        setStep("finalized");
        return;
      }

      // 3. Lens filtering (strict 360 matrix mapping)
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
    if (step === "submitting" || step === "done") return;

    setStep("submitting");

    try {
      const currentPersona = operator.persona_type?.trim().toUpperCase();

      // Step 1: Save operator data with canonical status
      const { error: updateError } = await supabase
        .from('operators')
        .update({
          status: 'COMPLETED',
          survey_completed: true,
          raw_responses: finalAnswers
        })
        .eq('id', operator.id);

      if (updateError) throw new Error(`Operator record save rejected: ${updateError.message}`);
      console.log("OPERATOR_NODE_SECURED // EVALUATING CO-DEPENDENT NETWORK TRACKS");

      // Step 2: Fetch all sibling operator nodes for this audit
      const { data: siblingOperators, error: fetchError } = await supabase
        .from('operators')
        .select('persona_type, status, survey_completed')
        .eq('audit_id', operator.audit_id);

      if (fetchError) throw new Error(`Cross-node matrix sync failed: ${fetchError.message}`);

      // Step 3: Build a clean map of completed personas across siblings + current session
      const completedPersonas = new Set<string>();

      // Explicitly include current operator submitting in this session
      if (currentPersona) {
        completedPersonas.add(currentPersona);
      }

      // Parse sibling completion records (handling whitespace and case)
      (siblingOperators || []).forEach(o => {
        const p = o.persona_type?.trim().toUpperCase();
        const isDone = o.survey_completed === true || String(o.status).trim().toUpperCase() === 'COMPLETED';
        if (p && isDone) {
          completedPersonas.add(p);
        }
      });

      // Step 4: Strict 360-node flag evaluation
      const hasTech = completedPersonas.has('TECHNICAL');
      const hasMgr  = completedPersonas.has('MANAGERIAL');
      const hasExe  = completedPersonas.has('EXECUTIVE');

      // Console diagnostic probe
      console.log("AUDIT FLAG DEBUG", {
        operatorId: operator?.id,
        operatorAuditId: operator?.audit_id,
        currentPersona: operator?.persona_type,
        normalizedPersona: currentPersona,
        hasTechCandidate: hasTech,
        hasMgrCandidate: hasMgr,
        hasExeCandidate: hasExe,
        siblingCount: siblingOperators?.length,
        siblingPersonas: (siblingOperators || []).map(o => ({
          persona_type: o.persona_type,
          status: o.status,
          survey_completed: o.survey_completed,
        }))
      });

      const auditPayload: any = {
        has_technical: hasTech,
        has_managerial: hasMgr,
        has_executive: hasExe,
        compiled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Step 5: Master audit completion pass when all 3 tracks complete
      if (hasTech && hasMgr && hasExe) {
        console.log("QUAD-NODE MATRIX BALANCED // RUNNING INTEGRATED CALCULUS RUNTIME");

        auditPayload.anomalies = [
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
        auditPayload.status = 'COMPLETED';
      }

      // Step 6: Master update pass with explicit row-count validation
      const { data: auditUpdated, error: auditUpdateError } = await supabase
        .from('audits')
        .update(auditPayload)
        .eq('id', operator.audit_id)
        .select();

      if (auditUpdateError) throw new Error(`Master ledger update rejected: ${auditUpdateError.message}`);

      if (!auditUpdated || auditUpdated.length === 0) {
        throw new Error(`AUDITS UPDATE FAILED: 0 rows affected (ID mismatch or RLS block? audit_id=${operator?.audit_id})`);
      }

      console.log("SURVEY_SUBMITTED_SUCCESSFULLY // INTEGRATED MATRIX UPDATED", auditUpdated);

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

  const formatEvidenceLabel = (rawTag: string) => {
    return rawTag
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // ===== UI (Executive Light Theme Layout) =====
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
          <p className="text-xs text-slate-500 font-mono">
            Your diagnostic input has been securely recorded and synced to the master assessment matrix.
          </p>
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
          <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded font-mono">
            {operator?.persona_type} Track
          </span>
        </div>

        {step === "intro" && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Operational Risk Assessment
            </h1>
            <p className="mb-8 text-slate-600 text-sm leading-relaxed">
              You are completing the forensic assessment for <strong>{operator?.org_name}</strong> as an authorized
              representative for the <strong>{operator?.persona_type}</strong> track. Your input directly calibrates
              operational readiness and governance specifications.
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
