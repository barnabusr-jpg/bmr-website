"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Shield, ChevronRight, Activity, AlertCircle } from 'lucide-react';
import { forensicQuestions } from '../data/forensicQuestions';
import { calculateForensicMetrics } from '../lib/forensicCalculus';

type PillarType = 'IGF' | 'AVS' | 'HAI';

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
  onCalculated 
}: { 
  companyName: string; 
  activePillar: PillarType;
  onCalculated: (metrics: any) => void; 
}) {
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isCompiling, setIsCompiling] = useState(false);
  const [activeRole, setActiveRole] = useState<string>('');

  // 📥 GLOBAL MOUNT HYDRATION & SECURE PAIRING
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      const roleParam = params.get('role');
      
      if (emailParam) {
        window.sessionStorage.setItem('stakeholder_runtime_email', emailParam);
      }
      if (roleParam) {
        window.sessionStorage.setItem('stakeholder_runtime_role', roleParam);
        setActiveRole(roleParam); 
      } else {
        const cachedRole = window.sessionStorage.getItem('stakeholder_runtime_role');
        if (cachedRole) setActiveRole(cachedRole);
      }

      const savedAnswers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
      ['IGF', 'AVS', 'HAI'].forEach(pillar => {
        const cached = window.sessionStorage.getItem(`quad_cache_${pillar.toUpperCase()}`);
        if (cached) {
          try {
            Object.assign(savedAnswers, JSON.parse(cached));
          } catch (e) {
            console.error(`Failed to combine track cache for ${pillar}:`, e);
          }
        }
      });
      setAnswers(savedAnswers);
    }
  }, [activePillar]);

  // 📡 ROLE-BASED VECTOR ROUTER FILTER
  const activeQuestions = useMemo(() => {
    const rawList = Object.values(forensicQuestions);
    const normalizedRole = activeRole?.toUpperCase() || '';

    let filtered = [];

    if (normalizedRole.includes('TECH') || normalizedRole.includes('MGMT')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'AVS' && 
        (q.target_node?.toUpperCase().includes('MGMT') || q.target_node?.toUpperCase().includes('MANAGE'))
      );
    } else if (normalizedRole.includes('USER') || normalizedRole.includes('SYS')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'AVS' && 
        (q.target_node?.toUpperCase().includes('USER') || q.target_node?.toUpperCase().includes('TECH'))
      );
    } else if (normalizedRole.includes('OPS')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'HAI' && 
        q.target_node?.toUpperCase().includes('MGMT')
      );
    } else if (normalizedRole.includes('EXEC')) {
      filtered = rawList.filter(q => 
        q.pillar?.toUpperCase() === 'IGF' && 
        q.target_node?.toUpperCase().includes('EXEC')
      );
    }

    if (filtered.length === 0) {
      return rawList.filter(q => q.pillar?.toUpperCase() === activePillar.toUpperCase());
    }

    return filtered;
  }, [activePillar, activeRole]);

  const handleSelectOption = (questionId: string, choiceKey: 'A' | 'B' | 'C' | 'D') => {
    const targetQuestion = Object.values(forensicQuestions).find(q => q.id === questionId);
    const targetPillar = targetQuestion?.pillar || activePillar;

    setAnswers(prev => {
      const prefixedKey = `quad_${questionId}`;
      const updated = { ...prev, [prefixedKey]: choiceKey };
      
      if (typeof window !== 'undefined') {
        const targetPillarAnswers: Record<string, string> = {};
        Object.keys(updated).forEach(key => {
          const cleanId = key.replace(/^quad_/, '');
          const qObj = Object.values(forensicQuestions).find(q => q.id === cleanId);
          
          if (qObj?.pillar?.toUpperCase() === targetPillar.toUpperCase()) {
            targetPillarAnswers[key] = updated[key];
          }
        });

        window.sessionStorage.setItem(`quad_cache_${targetPillar.toUpperCase()}`, JSON.stringify(targetPillarAnswers));
      }
      return updated;
    });
  };

  const compileActiveNodePosture = () => {
    setIsCompiling(true);
    let fullyCompiledMatrix: Record<string, string> = {};
    
    if (typeof window !== 'undefined') {
      try {
        const ddIgf = JSON.parse(window.sessionStorage.getItem('deepdive_cache_IGF') || '{}');
        const ddAvs = JSON.parse(window.sessionStorage.getItem('deepdive_cache_AVS') || '{}');
        const ddHai = JSON.parse(window.sessionStorage.getItem('deepdive_cache_HAI') || '{}');

        const quadIgf = JSON.parse(window.sessionStorage.getItem('quad_cache_IGF') || '{}');
        const quadAvs = JSON.parse(window.sessionStorage.getItem('quad_cache_AVS') || '{}');
        const quadHai = JSON.parse(window.sessionStorage.getItem('quad_cache_HAI') || '{}');
        
        Object.keys(ddIgf).forEach(k => fullyCompiledMatrix[`deepdive_${k.replace(/^deepdive_/, '')}`] = ddIgf[k]);
        Object.keys(ddAvs).forEach(k => fullyCompiledMatrix[`deepdive_${k.replace(/^deepdive_/, '')}`] = ddAvs[k]);
        Object.keys(ddHai).forEach(k => fullyCompiledMatrix[`deepdive_${k.replace(/^deepdive_/, '')}`] = ddHai[k]);

        Object.keys(quadIgf).forEach(k => fullyCompiledMatrix[`quad_${k.replace(/^quad_/, '')}`] = quadIgf[k]);
        Object.keys(quadAvs).forEach(k => fullyCompiledMatrix[`quad_${k.replace(/^quad_/, '')}`] = quadAvs[k]);
        Object.keys(quadHai).forEach(k => fullyCompiledMatrix[`quad_${k.replace(/^quad_/, '')}`] = quadHai[k]);

        Object.keys(answers).forEach(k => {
          const cleanKey = k.startsWith('quad_') ? k : `quad_${k}`;
          fullyCompiledMatrix[cleanKey] = answers[k];
        });

        const contradictions = findContradictions(fullyCompiledMatrix);
        if (contradictions.length > 0) {
          console.warn("[INTEGRITY WARNING] Contradictions cross-validated:", contradictions);
        }

        const computedResults = calculateForensicMetrics(companyName, fullyCompiledMatrix, {
          quadWeight: 2,
          deepDiveWeight: 1
        });

        window.sessionStorage.setItem(`bmr_wizard_state_cache`, JSON.stringify(fullyCompiledMatrix));
        window.sessionStorage.setItem(`bmr_runtime_${companyName}`, JSON.stringify(computedResults));

        onCalculated(computedResults);
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
    <div className="bg-slate-50 text-slate-900 font-sans text-left antialiased p-8 md:p-12 max-w-4xl mx-auto my-12 border border-slate-200 shadow-sm rounded-lg">
      
      {/* Structural Progression Control Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 mb-8 gap-4 font-mono">
        <div className="flex items-center gap-3">
          <Activity className="text-slate-900 animate-pulse shrink-0" size={18} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            PRE-AUTOMATION DIAGNOSTIC // STAKEHOLDER NODE ROUTING
          </span>
        </div>
        
        <div className="text-xs text-slate-500 font-bold tracking-wider shrink-0">
          SECTOR READINESS PROGRESS: {String(currentStepAnsweredCount).padStart(2, '0')} / {String(currentStepTotal).padStart(2, '0')}
        </div>
      </div>

      {/* Narrative Context Alert Header */}
      <div className="bg-white border border-slate-200 p-5 mb-8 text-xs text-slate-600 leading-relaxed flex items-start gap-3 rounded shadow-sm">
        <AlertCircle size={18} className="text-slate-900 shrink-0 mt-0.5" />
        <div>
          This pre-automation diagnostic evaluates pipeline readiness, schema stability, and operational friction to establish machine-readable guardrails prior to scaling AI deployments.
        </div>
      </div>

      {/* Scenario Ingestion Loop */}
      <div className="space-y-8 mb-10">
        {activeQuestions.map((question, index) => {
          const targetKey = `quad_${question.id}`;
          const currentSelection = answers[targetKey] || answers[question.id];
          
          return (
            <div key={question.id} className="border border-slate-200 bg-white p-6 md:p-8 relative rounded-lg shadow-sm group/card">
              
              <span className="text-xs font-mono text-slate-500 block mb-3 font-semibold tracking-wider">
                Question {String(index + 1).padStart(2, '0')} of {String(activeQuestions.length).padStart(2, '0')}
              </span>

              <p className="text-xl md:text-2xl text-slate-900 font-bold tracking-tight mb-6">
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
                      className={`border p-4 cursor-pointer transition-colors flex items-start gap-4 rounded ${
                        isSelected 
                          ? 'border-slate-900 bg-slate-900 text-white' 
                          : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      <span className={`text-xs font-bold px-3 py-1 border shrink-0 transition-colors rounded ${
                        isSelected 
                          ? 'bg-white text-slate-900 border-white font-mono' 
                          : 'bg-white text-slate-600 border-slate-200 font-mono'
                      }`}>
                        {key}
                      </span>

                      <p className={`leading-relaxed text-sm font-medium pt-0.5 transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-700'
                      }`}>
                        {choice.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Pipeline Status Controller */}
      <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono">
        <div className="text-xs text-slate-500 tracking-wider flex items-center gap-2 font-bold">
          <Shield size={14} className={isPillarIncomplete ? "text-slate-400" : "text-slate-900"} /> 
          {isPillarIncomplete ? "ALL ACTIVE SECTOR OBSERVATIONS REQUIRED TO RESOLVE POSTURE" : "PRE-AUTOMATION VECTORS VALIDATED // READY TO COMPUTE"}
        </div>
        
        <button
          type="button"
          disabled={isPillarIncomplete || isCompiling}
          onClick={compileActiveNodePosture}
          className={`w-full sm:w-auto px-8 py-3.5 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded shadow-sm ${
            isPillarIncomplete 
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isCompiling ? "COMPILING VECTOR LOGS..." : "Save & Close Node Posture"} 
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
