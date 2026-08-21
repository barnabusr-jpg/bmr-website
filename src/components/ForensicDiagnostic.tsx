"use client";

import { useState, useEffect, useRef } from "react";
import LZString from "lz-string";
import { FORENSIC_MATRIX } from "@/lib/forensicMatrix";
import { Lock, CheckCircle, ShieldAlert, Activity, ArrowRight, Mail, Network, FileQuestion } from "lucide-react";

export default function ForensicDiagnostic() {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const submitInFlightRef = useRef(false);

  const [quadEmails, setQuadEmails] = useState({
    executive: "",
    managerial: "",
    technical: "",
  });

  useEffect(() => {
    const init = async () => {
      // Robust parameter extractor with window.location.href regex fallback
      const getParam = (key: string): string | null => {
        if (typeof window === "undefined") return null;
        
        // 1. Standard URLSearchParams lookup
        const searchParams = new URLSearchParams(window.location.search);
        const val = searchParams.get(key);
        if (val && val.trim().length > 0) return val;

        // 2. Direct regex fallback against address bar string
        const match = window.location.href.match(new RegExp(`[?&]${key}=([^&#]*)`, "i"));
        return match ? decodeURIComponent(match[1]) : null;
      };

      // Resolve access code across aliases (code, access_code, c)
      const rawCode = getParam("code") || getParam("access_code") || getParam("c");
      
      let codeParam = (rawCode ?? "").trim().toUpperCase();
      if (codeParam.startsWith("=3D")) codeParam = codeParam.slice(3);
      if (codeParam.startsWith("3D")) codeParam = codeParam.slice(2);
      const code = codeParam;

      if (rawCode && !code) {
        console.error("CODE_NORMALIZED_EMPTY: Received code param but it collapsed during sanitization.", { rawCode });
      }

      const flow = getParam("flow");
      const matrixToken = getParam("matrix");
      const trackParam = (getParam("track") || getParam("role"))?.trim().toUpperCase();
      const orgParam = getParam("org");
      const auditIdParam = getParam("id");
      const authParam = getParam("auth");

      console.log("DIAGNOSTIC_AUTH_DEBUG:", { 
        href: typeof window !== "undefined" ? window.location.href : "",
        rawCode,
        normalizedCode: code, 
        flow, 
        hasMatrix: !!matrixToken 
      });

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

      if (code) {
        const res = await fetch(`/api/verify-code?code=${encodeURIComponent(code)}`);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.error("VERIFY_CODE_FAILED:", { status: res.status, body: errData });
          setStep("invalid");
          return;
        }

        const { op, audit } = await res.json();
        console.log("VERIFY_CODE_RESULT:", { op, audit });

        const isOpComplete =
          String(op?.status).trim().toUpperCase() === "COMPLETED" || String(op?.status).trim().toLowerCase() === "completed";
        const isAuditComplete =
          audit?.status === "COMPLETE" || audit?.status === "COMPLETED";

        if (!audit || isAuditComplete || isOpComplete) {
          console.log("NODE_ACCESS: Assessment link completed or deactivated.");
          setOperator(op ? { ...op, org_name: audit?.org_name || "Evaluation Node" } : null);
          setStep("finalized");
          return;
        }

        const filtered = FORENSIC_MATRIX.filter((q) => {
          const lens = String(q.lens ?? "").trim().toUpperCase();
          const persona = String(op.persona_type ?? "").trim().toUpperCase();

          if (!persona) return false;

          if (persona === "EXECUTIVE" && lens === "EXE") return true;
          if (persona === "MANAGERIAL" && lens === "MGR") return true;
          if (persona === "TECHNICAL" && lens === "TEC") return true;

          if (lens === persona) return true;

          return false;
        });

        if (!filtered || filtered.length === 0) {
          console.error("MATRIX_FILTER_EMPTY: No question mapping found for persona:", { 
            rawPersona: op.persona_type,
            trimmedPersona: String(op.persona_type ?? "").trim().toUpperCase(),
            code 
          });
          setStep("persona_mismatch");
          return;
        }

        setQuestions(filtered);
        setOperator({ ...op, org_name: audit.org_name });
        setStep("intro");
        return;
      }

      if (flow === "quad_node" || (matrixToken && !trackParam)) {
        const targetOrg = matrixPayload?.org || orgParam || "TARGET SPECIFICATION";

        setOperator({
          id: auditIdParam || "quad_node_admin",
          audit_id: auditIdParam || "quad_node_audit",
          org_name: targetOrg,
          persona_type: "QUAD_NODE",
          access_code: "ADMIN_QUAD_NODE",
        });
        setStep("quad_landing");
        return;
      }

      if (trackParam || authParam === "admin_verified_secure") {
        const targetOrg = matrixPayload?.org || orgParam || "TARGET SPECIFICATION";
        const persona = trackParam || "EXECUTIVE";

        const filtered = FORENSIC_MATRIX.filter((q) => {
          const lens = String(q.lens ?? "").trim().toUpperCase();
          const p = String(persona ?? "").trim().toUpperCase();

          return (
            lens === p ||
            (p === "MANAGERIAL" && lens === "MGR") ||
            (p === "TECHNICAL" && lens === "TEC") ||
            (p === "EXECUTIVE" && lens === "EXE")
          );
        });

        setQuestions(filtered.length > 0 ? filtered : FORENSIC_MATRIX);
        setOperator({
          id: auditIdParam || "admin_preview",
          audit_id: auditIdParam || "admin_audit",
          org_name: targetOrg,
          persona_type: persona,
          access_code: "ADMIN_PREVIEW",
        });
        setStep("intro");
        return;
      }

      console.error("HANDSHAKE_MISSING_PARAMETERS: No valid access code or track specified.");
      setStep("invalid");
    };

    init();
  }, []);

  const handleStartQuadDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quadEmails.executive || !quadEmails.managerial || !quadEmails.technical) {
      alert("Please provide routing emails for all three stakeholder tracks.");
      return;
    }

    setStep("submitting");

    try {
      if (operator?.audit_id && operator?.audit_id !== "quad_node_audit") {
        const res = await fetch("/api/dispatch-directives", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId: operator.audit_id,
            orgName: operator.org_name,
            parentAuditId: operator.audit_id,
            emails: {
              EXECUTIVE: quadEmails.executive.trim(),
              MANAGERIAL: quadEmails.managerial.trim(),
              TECHNICAL: quadEmails.technical.trim(),
            },
          }),
        });

        if (!res.ok) throw new Error("Failed to dispatch stakeholder access links.");
      }

      const filtered = FORENSIC_MATRIX.filter(
        (q) => q.lens?.toUpperCase() === "EXE" || q.lens?.toUpperCase() === "EXECUTIVE"
      );
      setQuestions(filtered.length > 0 ? filtered : FORENSIC_MATRIX);
      setOperator((prev: any) => ({ ...prev, persona_type: "EXECUTIVE" }));
      setStep("intro");
    } catch (err: any) {
      console.error("QUAD_DISPATCH_ERROR:", err.message);
      alert(`Dispatch Error: ${err.message}`);
      setStep("quad_landing");
    }
  };

  const submitResults = async (finalAnswers: any) => {
    if (step === "submitting" || step === "done") return;
    if (submitInFlightRef.current) return;

    submitInFlightRef.current = true;
    setStep("submitting");

    try {
      const activeCode = operator?.access_code;

      if (
        activeCode === "ADMIN_PREVIEW" ||
        activeCode === "ADMIN_QUAD_NODE" ||
        operator?.id === "admin_preview" ||
        operator?.id === "quad_node_admin"
      ) {
        console.log("SIMULATION_COMPLETE: Admin diagnostic preview finished.");
        setStep("done");
        return;
      }

      if (!activeCode) {
        throw new Error("Missing access code. Unable to finalize diagnostic.");
      }

      const res = await fetch("/api/diagnostic/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessCode: activeCode,
          rawResponses: finalAnswers,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409 || data.error === "ALREADY_COMPLETED") {
          setStep("finalized");
          return;
        }

        if (res.status === 401 || data.error === "INVALID_ACCESS_CODE") {
          setStep("invalid");
          return;
        }

        throw new Error(data.message || "Failed to submit assessment responses.");
      }

      setStep("done");
    } catch (err: any) {
      console.error("SUBMIT_ERROR:", err?.message || err);
      alert(`Submission Error: ${err?.message || "Submission failed."}`);
      setStep("diagnostic");
    } font-mono
    finally {
      submitInFlightRef.current = false;
    }
  };

  const handleFinalizeNode = (evidence: string) => {
    const qId = questions[currentIndex]?.id;
    if (!qId) return;

    if (!selectedAnswer) {
      alert("Please select a response prior to attaching verification evidence.");
      return;
    }

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
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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

  if (step === "persona_mismatch") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-slate-200 p-12 max-w-md w-full text-center shadow-sm rounded-lg">
          <FileQuestion className="mb-4 text-amber-600 mx-auto" size={48} />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Invalid Configuration</h2>
          <p className="text-xs text-slate-500 font-mono">No operational matrix questions match the assigned operational track.</p>
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

  if (step === "quad_landing") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12 flex items-center justify-center">
        <div className="max-w-xl w-full border border-slate-200 p-8 md:p-10 bg-white shadow-sm rounded-lg">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
            <Network size={20} className="text-slate-900" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              QUAD-NODE CONFIGURATION // STAKEHOLDER ROUTING
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Configure Multi-Track Assessment
          </h1>
          <p className="text-xs text-slate-600 mb-8 leading-relaxed font-sans">
            Enter target stakeholder email addresses for <strong>{operator?.org_name}</strong> to initialize 360° triangulation and route assessment links across all operational vectors.
          </p>

          <form onSubmit={handleStartQuadDiagnostic} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1.5">
                Executive Stakeholder Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="email"
                  required
                  value={quadEmails.executive}
                  onChange={(e) => setQuadEmails({ ...quadEmails, executive: e.target.value })}
                  placeholder="executive@organization.com"
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-xs text-slate-900 font-sans rounded outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1.5">
                Managerial Stakeholder Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="email"
                  required
                  value={quadEmails.managerial}
                  onChange={(e) => setQuadEmails({ ...quadEmails, managerial: e.target.value })}
                  placeholder="managerial@organization.com"
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-xs text-slate-900 font-sans rounded outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1.5">
                Technical Stakeholder Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="email"
                  required
                  value={quadEmails.technical}
                  onChange={(e) => setQuadEmails({ ...quadEmails, technical: e.target.value })}
                  placeholder="technical@organization.com"
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-xs text-slate-900 font-sans rounded outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs transition-colors rounded shadow-sm flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              Initialize Quad-Node Assessment
              <ArrowRight size={16} />
            </button>
          </form>
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

  const isSubmitting = step === "submitting" || submitInFlightRef.current;

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
              {questions[currentIndex].text || questions[currentIndex].question}
            </h2>

            {!selectedAnswer ? (
              <div className="grid grid-cols-2 gap-4">
                {["Yes", "No"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedAnswer(opt)}
                    disabled={isSubmitting}
                    className={`p-8 border border-slate-200 bg-slate-50/50 hover:bg-slate-900 hover:text-white text-slate-900 font-bold uppercase text-lg transition-colors rounded shadow-sm ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
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
                  disabled={isSubmitting}
                  className={`w-full bg-slate-50 border border-slate-300 p-4 text-slate-900 font-medium text-sm rounded outline-none focus:border-slate-900 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onChange={(e) => handleFinalizeNode(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Choose verification documentation...</option>
                  {(questions[currentIndex].evidenceOptions || ["LOG_RECORD", "API_CONTRACT", "SLA_METRIC", "PROCESS_DOC"]).map((opt: string) => (
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
