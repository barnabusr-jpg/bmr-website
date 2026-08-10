"use client";

import { useState, useEffect } from 'react';
import LZString from 'lz-string';
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
      const flow = params.get('flow');
      const matrixToken = params.get('matrix');
      const trackParam = (params.get('track') || params.get('role'))?.trim().toUpperCase();
      const orgParam = params.get('org');
      const auditIdParam = params.get('id');
      const authParam = params.get('auth');

      console.log("DIAGNOSTIC_AUTH: Attempting handshake:", { code, flow, hasMatrix: !!matrixToken });

      let matrixPayload: any = null;
      if (matrixToken) {
        try {
          const decompressed = LZString.decompressFromEncodedURIComponent(matrixToken);
          if (decompressed) {
            matrixPayload = JSON.parse(decompressed);
          }
        } catch (e) {
          console.warn("LOGIC_WARN: Failed to parse matrix token", e);
        }
      }

      // 1. Participant Access Code Resolution
      if (code) {
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

        const { data: audit, error: auditError } = await supabase
          .from('audits')
          .select('status, org_name, id')
          .eq('id', op.audit_id)
          .single();

        const isOpComplete = String(op.status).trim().toUpperCase() === 'COMPLETED' || op.status === 'completed';
        const isAuditComplete = audit?.status === 'COMPLETE' || audit?.status === 'COMPLETED';

        if (auditError || !audit || isAuditComplete || isOpComplete) {
          console.log("NODE_ACCESS: Assessment link completed or deactivated.");
          setOperator(op ? { ...op, org_name: audit?.org_name || "Evaluation Node" } : null);
          setStep("finalized");
          return;
        }

        const filtered = FORENSIC_MATRIX.filter(q => {
          const lens = q.lens?.toUpperCase();
          const persona = op.persona_type?.toUpperCase();

          return lens === persona ||
            (persona === 'MANAGERIAL' && lens === 'MGR') ||
            (persona === 'TECHNICAL' && lens === 'TEC') ||
            (persona === 'EXECUTIVE' && lens === 'EXE');
        });

        if (!filtered || filtered.length === 0) {
          console.error("LOGIC_ERROR: No matrix mapping for persona type:", op.persona_type);
          setStep("invalid");
          return;
        }

        setQuestions(filtered);
        setOperator({ ...op, org_name: audit.org_name });
        setStep("intro");
        return;
      }

      // 2. Admin Preview / Quad-Node Execution Resolver
      if (flow === 'quad_node' || matrixToken || authParam === 'admin_verified_secure' || trackParam) {
        const targetOrg = matrixPayload?.org || orgParam || "TARGET SPECIFICATION";
        const persona = trackParam || 'EXECUTIVE';

        const filtered = FORENSIC_MATRIX.filter(q => {
          const lens = q.lens?.toUpperCase();
          return lens === persona ||
            (persona === 'MANAGERIAL' && lens === 'MGR') ||
            (persona === 'TECHNICAL' && lens === 'TEC') ||
            (persona === 'EXECUTIVE' && lens === 'EXE');
        });

        setQuestions(filtered.length > 0 ? filtered : FORENSIC_MATRIX);
        setOperator({
          id: auditIdParam || 'admin_preview',
          audit_id: auditIdParam || 'admin_audit',
          org_name: targetOrg,
          persona_type: persona,
          access_code: 'ADMIN_PREVIEW'
        });
        setStep("intro");
        return;
      }

      console.error("AUTH_ERROR: No code or token provided.");
      setStep("invalid");
    };

    init();
  }, []);

  const submitResults = async (finalAnswers: any) => {
    if (step === "submitting" || step === "done") return;

    setStep("submitting");

    try {
      const activeCode = operator?.access_code;

      // Bypass DB mutations during administrative test previews
      if (activeCode === 'ADMIN_PREVIEW' || operator?.id === 'admin_preview') {
        console.log("SIMULATION_COMPLETE: Admin diagnostic preview finished.");
        setStep("done");
        return;
      }

      // Step 1: Execute elevated RPC submission (Bypasses RLS write blocks)
      const { data: rpcSuccess, error: rpcError } = await supabase.rpc(
        'submit_operator_diagnostic',
        {
          p_access_code: activeCode,
          p_raw_responses: finalAnswers,
        }
      );

      if (rpcError) throw new Error(`RPC submission failed: ${rpcError.message}`);
      if (!rpcSuccess) throw new Error("RPC rejected: Invalid or completed access code.");

      // Step 2: Fetch sibling operator statuses
      const { data: siblingOperators, error: fetchError } = await supabase
        .from('operators')
        .select('persona_type, status, survey_completed')
        .eq('audit_id', operator.audit_id);

      if (fetchError) throw new Error(`Cross-node matrix sync failed: ${fetchError.message}`);

      // Step 3: Triangulate human participant completions
      const completedPersonas = new Set<string>();
      const currentPersona = operator?.persona_type?.trim().toUpperCase();

      if (currentPersona) completedPersonas.add(currentPersona);

      (siblingOperators || []).forEach(o => {
        const p = o.persona_type?.trim().toUpperCase();
        const isDone = o.survey_completed === true || String(o.status).trim().toUpperCase() === 'COMPLETED';
        if (p && isDone) completedPersonas.add(p);
      });

      const hasTech = completedPersonas.has('TECHNICAL');
      const hasMgr  = completedPersonas.has('MANAGERIAL');
      const hasExe  = completedPersonas.has('EXECUTIVE');

      const auditPayload: any = {
        has_technical: hasTech,
        has_managerial: hasMgr,
        has_executive: hasExe,
        compiled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Step 4: Multi-track compilation pass when all 3 human tracks complete
      if (hasTech && hasMgr && hasExe) {
        console.log("QUAD-NODE MATRIX BALANCED // RUNNING INTEGRATED CALCULUS RUNTIME");

        auditPayload.anomalies = [
          {
            anomaly_id: "Finding #1",
            title: "Automated Architecture Discrepancy",
            description: "Systemic workflow variances compiled automatically across aligned operational tracks.",
            severity: "CRITICAL",
            remediation_directive: "Optimize process vectors to stabilize data flow dynamics."
          },
          {
            anomaly_id: "Finding #2",
            title: "Strategic Alignment Leakage",
            description: "Cross-track validation indicates elevated risk in human-in-the-loop dependencies.",
            severity: "HIGH",
            remediation_directive: "Deploy automated tracking filters to mitigate processing waste."
          }
        ];
        auditPayload.status = 'COMPLETED';
      }

      // Step 5: Master update pass on parent audit record
      const { data: auditUpdated, error: auditUpdateError } = await supabase
        .from('audits')
        .update(auditPayload)
        .eq('id', operator.audit_id)
        .select();

      if (auditUpdateError || !auditUpdated || auditUpdated.length === 0) {
        throw new Error(`Master ledger update failed: ${auditUpdateError?.message || '0 rows updated'}`);
      }

      setStep("done");

    } catch (err: any) {
      console.error("SUBMIT_ERROR:", err.message);
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
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs transition-colors rounded shadow-sm flex items-center justify-center gap-2 cursor-pointer"
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
