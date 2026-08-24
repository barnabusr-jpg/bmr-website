"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Shield, ChevronRight, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { forensicQuestions } from '../data/forensicQuestions';
import { calculateForensicMetrics } from '../lib/forensicCalculus';

type PillarType = 'IGF' | 'AVS' | 'HAI';

interface ForensicDiagnosticWizardProps {
  companyName: string;
  activePillar: PillarType;
  role?: string;
  persona?: string;
  track?: string;
  onCalculated?: (answers: Record<string, string>, metrics?: any) => void;
  onComplete?: (answers: Record<string, string>, metrics?: any) => void;
  onSubmit?: (answers: Record<string, string>, metrics?: any) => void;
}

function findContradictions(matrix: Record<string, string>) {
  const contradictions = [];
  if (matrix['deepdive_Q1'] === 'A' && matrix['quad_Q14'] === 'D') {
    contradictions.push("CRITICAL GOVERNANCE MISMATCH: Executive reports formalized AI policy gates // Operational leads report unmonitored context ingestion.");
  }
  if (matrix['deepdive_Q5'] === 'A' && matrix['quad_Q32'] === 'D') {
    contradictions.push("PRE-AUTOMATION FRICTION FLAGGED: Management reports structured integration budgeting // Technical team reports unhedged schema drift.");
  }
  return contradictions;
}

export default function ForensicDiagnosticWizard({ 
  companyName, 
  activePillar,
  role,
  persona,
  track,
  onCalculated,
  onComplete,
  onSubmit
}: ForensicDiagnosticWizardProps) {
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isCompiling, setIsCompiling] = useState(false);
  const [activeRole, setActiveRole] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    const roleParam = params.get('role');
    const trackParam = params.get('track');
    const personaParam = params.get('persona');
    
    if (emailParam) {
      window.sessionStorage.setItem('stakeholder_runtime_email', emailParam);
    }

    const resolvedRole = role || persona || track || roleParam || trackParam || personaParam || '';
    const cleanOrg = companyName.trim();

    if (resolvedRole && cleanOrg) {
      const cleanRole = resolvedRole.toUpperCase().trim();
      window.sessionStorage.setItem('stakeholder_runtime_role', cleanRole);
      setActiveRole(cleanRole); 

      const scopedCacheKey = `quad_cache_${cleanOrg}_${cleanRole}`;
      const cachedAnswers = window.sessionStorage.getItem(scopedCacheKey);

      if (cachedAnswers) {
        try {
          setAnswers(JSON.parse(cachedAnswers));
        } catch (e) {
          console.error("Failed to parse scoped answer cache:", e);
          setAnswers({});
        }
      } else {
        setAnswers({});
      }
    } else {
      setAnswers({});
    }
  }, [companyName, role, persona, track]);

  // QUESTION SELECTION IS COMPLETELY DECOUPLED FROM activePillar
  const activeQuestions = useMemo(() => {
    const rawList = Object.values(forensicQuestions);
    const normalizedRole = activeRole?.toUpperCase() || "";

    let filtered: any[] = [];
    const nodeStrOf = (q: any) => String(q?.target_node ?? "").toUpperCase();

    if (
      normalizedRole === "SYSTEM_USER" ||
      normalizedRole.includes("USER") ||
      normalizedRole.includes("SYS")
    ) {
      const allowedTarget = ["USER", "SYS", "SYSTEM", "CORE_SYSTEM", "OPERATOR", "TERMINAL"];
      filtered = rawList.filter((q: any) => {
        const nodeStr = nodeStrOf(q);
        return !q.target_node || allowedTarget.some((tok) => nodeStr.includes(tok));
      });
    } else if (normalizedRole === "TECH_MGMT" || normalizedRole.includes("TECH")) {
      filtered = rawList.filter((q: any) => {
        const nodeStr = nodeStrOf(q);
        return (
          nodeStr.includes("TECH") ||
          nodeStr.includes("AVS") ||
          nodeStr === "TECHNICAL"
        );
      });
    } else if (
      normalizedRole === "OPS_MGMT" || 
      normalizedRole.includes("OPS") || 
      normalizedRole.includes("MANAGERIAL")
    ) {
      filtered = rawList.filter((q: any) => {
        const nodeStr = nodeStrOf(q);
        return (
          nodeStr.includes("MGMT") ||
          nodeStr.includes("OPS") ||
          nodeStr.includes("HAI") ||
          nodeStr === "MANAGERIAL"
        );
      });
    } else if (normalizedRole === "EXECUTIVE" || normalizedRole.includes("EXEC")) {
      filtered = rawList.filter((q: any) => {
        const nodeStr = nodeStrOf(q);
        return (
          nodeStr.includes("EXEC") ||
          nodeStr.includes("IGF") ||
          nodeStr.includes("STRATEGIC")
        );
      });
    }

    if (filtered.length === 0) {
      console.warn("[Wizard Warning] No node matches found for role:", normalizedRole, "Returning full question pool.");
      return rawList;
    }

    return filtered;
  }, [activeRole]);

  const handleSelectOption = (questionId: string, choiceKey: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => {
      const prefixedKey = `quad_${questionId}`;
      const updated = { ...prev, [prefixedKey]: choiceKey };
      
      if (typeof window !== 'undefined' && companyName && activeRole) {
        const cleanOrg = companyName.trim();
        const cleanRole = activeRole.toUpperCase().trim();
        const scopedCacheKey = `quad_cache_${cleanOrg}_${cleanRole}`;
        window.sessionStorage.setItem(scopedCacheKey, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const compileActiveNodePosture = () => {
    setIsCompiling(true);
    let fullyCompiledMatrix: Record<string, string> = {};
    
    if (typeof window !== 'undefined') {
      try {
        Object.keys(answers).forEach(k => {
          const cleanKey = k.startsWith('quad_') ? k : `quad_${k}`;
          fullyCompiledMatrix[cleanKey] = answers[k];
        });

        const contradictions = findContradictions(fullyCompiledMatrix);
        if (contradictions.length > 0) {
          console.warn("[INTEGRITY WARNING] Contradictions cross-validated:", contradictions);
        }

        let computedResults = null;
        try {
          const targetSector = activePillar === 'AVS' ? 'INDUSTRIAL' : activePillar === 'HAI' ? 'SERVICES' : 'FINANCE';
          computedResults = calculateForensicMetrics(companyName, fullyCompiledMatrix, targetSector);
        } catch (calcErr) {
          console.warn("[Wizard] Non-blocking metrics calculation warning:", calcErr);
        }

        window.sessionStorage.setItem(`bmr_wizard_state_cache`, JSON.stringify(fullyCompiledMatrix));
        if (computedResults) {
          window.sessionStorage.setItem(`bmr_runtime_${companyName}`, JSON.stringify(computedResults));
        }

        console.log('[Wizard] Invoking completion callbacks with answers:', fullyCompiledMatrix);

        if (typeof onCalculated === 'function') onCalculated(fullyCompiledMatrix, computedResults);
        if (typeof onComplete === 'function') onComplete(fullyCompiledMatrix, computedResults);
        if (typeof onSubmit === 'function') onSubmit(fullyCompiledMatrix, computedResults);

      } catch (err) {
        console.error("Post-compilation matrix union break:", err);
      }
    }
    setIsCompiling(false);
  };

  const currentStepTotal = activeQuestions.length;
  const currentStepAnsweredCount = activeQuestions.filter(q => !!answers[`quad_${q.id}`] || !!answers[q.id]).length;
  const isPillarIncomplete = currentStepAnsweredCount < currentStepTotal;

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left antialiased p-6 md:p-10 max-w-4xl mx-auto my-8 border border-slate-200 shadow-sm rounded-lg">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 mb-6 gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <Activity className="text-slate-900 animate-pulse shrink-0" size={18} />
          <span className="font-bold uppercase tracking-wider text-slate-900">
            PRE-AUTOMATION DIAGNOSTIC // STAKEHOLDER NODE ROUTING
          </span>
        </div>
        
        <div className="text-slate-500 font-bold tracking-wider shrink-0 bg-slate-100 border border-slate-200 px-3 py-1 rounded">
          SECTOR READINESS PROGRESS: {String(currentStepAnsweredCount).padStart(2, '0')} / {String(currentStepTotal).padStart(2, '0')}
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-4 mb-6 text-xs text-slate-600 leading-relaxed flex items-start gap-3 rounded shadow-sm">
        <AlertCircle size={18} className="text-slate-900 shrink-0 mt-0.5" />
        <div>
          This pre-automation diagnostic evaluates pipeline readiness, schema stability, and operational friction to establish machine-readable guardrails prior to scaling AI deployments.
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {activeQuestions.map((question, index) => {
          const targetKey = `quad_${question.id}`;
          const currentSelection = answers[targetKey] || answers[question.id];
          
          return (
            <div key={question.id} className="border border-slate-200 bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 font-mono text-xs">
                <span className="text-red-600 font-bold uppercase tracking-wider">
                  // Question {String(index + 1).padStart(2, '0')} of {String(activeQuestions.length).padStart(2, '0')}
                </span>
                {question.target_node && (
                  <span className="text-slate-400 font-semibold uppercase">
                    Node: {question.target_node}
                  </span>
                )}
              </div>

              <p className="text-xl md:text-2xl text-slate-900 font-bold tracking-tight leading-snug">
                {question.symptomatic_scenario}
              </p>
              
              <div className="grid grid-cols-1 gap-3 font-sans text-sm">
                {(Object.keys(question.choices) as Array<'A' | 'B' | 'C' | 'D'>).map((key) => {
                  const choice = question.choices[key];
                  const isSelected = currentSelection === key;
                  return (
                    <div 
                      key={key}
                      onClick={() => handleSelectOption(question.id, key)}
                      className={`border p-4 cursor-pointer transition-all flex items-start gap-4 rounded-md ${
                        isSelected 
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100/80'
                      }`}
                    >
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-white text-slate-900 border-white' 
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}>
                        {key}
                      </span>

                      <p className={`leading-relaxed text-sm font-medium pt-0.5 flex-1 transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-700'
                      }`}>
                        {choice.text}
                      </p>

                      {isSelected && (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs">
        <div className="text-slate-500 tracking-wider flex items-center gap-2 font-bold">
          <Shield size={16} className={isPillarIncomplete ? "text-slate-400" : "text-emerald-600"} /> 
          {isPillarIncomplete ? "ALL ACTIVE SECTOR OBSERVATIONS REQUIRED TO RESOLVE POSTURE" : "PRE-AUTOMATION VECTORS VALIDATED // READY TO COMPUTE"}
        </div>
        
        <button
          type="button"
          disabled={isPillarIncomplete || isCompiling}
          onClick={compileActiveNodePosture}
          className={`w-full sm:w-auto px-8 py-3.5 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded-md shadow-sm ${
            isPillarIncomplete 
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
              : 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer'
          }`}
        >
          {isCompiling ? "COMPILING VECTOR LOGS..." : "Save & Close Node Posture"} 
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
