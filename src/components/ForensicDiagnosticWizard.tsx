"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Shield, ChevronRight, Activity, AlertCircle } from 'lucide-react';
import { forensicQuestions } from '../data/forensicQuestions';
import { calculateForensicMetrics } from '../lib/forensicCalculus';
import { decompressFromEncodedURIComponent } from 'lz-string';

type PillarType = 'IGF' | 'AVS' | 'HAI';

function findContradictions(matrix: Record<string, string>) {
  const contradictions = [];
  
  if (matrix['deepdive_Q1'] === 'A' && matrix['quad_Q14'] === 'D') {
    contradictions.push("CRITICAL COMPLIANCE MISMATCH: Executive claims formalized policy fencing // System User reports complete oversight vacuum.");
  }
  
  if (matrix['deepdive_Q5'] === 'A' && matrix['quad_Q32'] === 'D') {
    contradictions.push("ARCHITECTURAL OVERHEAD TAX FLAGGED: Management reports structured debt mitigation budget // Engineering reports active systemic fracture leakage.");
  }

  return contradictions;
}

function evaluateProtocolOfAcceptance(matrix: Record<string, string>): string[] {
  const directives: string[] = [];
  
  // ✨ FIXED: Corrected closure lookup variable token matching reference
  const totalDFlaws = Object.keys(matrix).filter(k => matrix[k] === 'D').length;
  if (totalDFlaws >= 5 || matrix['quad_Q14'] === 'D') {
    directives.push("TIER_03_CRITICAL_FRACTURE_MITIGATION_DIRECTIVE");
  } else if (totalDFlaws >= 2) {
    directives.push("TIER_02_PERFORMANCE_OVERHEAD_OPTIMIZATION_DIRECTIVE");
  } else {
    directives.push("TIER_01_STANDARD_HYGIENE_MAINTENANCE_DIRECTIVE");
  }
  
  return directives;
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
  
  // ✨ NEW STATE LAYER: Tracks the active runtime role locally to trigger dependencies cleanly
  const [activeRole, setActiveRole] = useState<string>('');

  // 📥 GLOBAL MOUNT HYDRATION & SECURE PAIRING
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      const roleParam = params.get('role');
      
      if (emailParam) window.sessionStorage.setItem('stakeholder_runtime_email', emailParam);
      if (roleParam) {
        window.sessionStorage.setItem('stakeholder_runtime_role', roleParam);
        setActiveRole(roleParam); // Force localized state hook update pass
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

  // 📡 ROLE-BASED DYNAMIC VECTOR ROUTER FILTER
  const activeQuestions = useMemo(() => {
    const rawList = Object.values(forensicQuestions);

    // ✨ FIXED: Depend on activeRole state vector tracking parameters to completely avoid hydration lag
    if (activeRole === 'TECH_MGMT' || activeRole === 'SYSTEM_USER') {
      return rawList.filter(q => q.pillar?.toUpperCase() === 'AVS');
    } else if (activeRole === 'OPS_MGMT') {
      return rawList.filter(q => q.pillar?.toUpperCase() === 'HAI');
    } else {
      return rawList.filter(q => q.pillar?.toUpperCase() === 'IGF');
    }
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
    <div className="bg-[#020617] text-slate-200 font-sans tracking-tighter text-left uppercase font-black overflow-x-hidden p-10 max-w-4xl mx-auto my-12 border border-slate-900 shadow-2xl backdrop-blur-md italic">
      
      {/* Structural Progression Control Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 mb-8 gap-4 no-print font-mono not-italic">
        <div className="flex items-center gap-3">
          <Activity className="text-red-600 animate-pulse shrink-0" size={20} />
          <span className="text-xs font-black uppercase tracking-widest text-white">
            ENTERPRISE WIDE DIAGNOSTIC // QUAD-NODE MONITOR ROUTING
          </span>
        </div>
        <div className="text-[10px] text-slate-500 tracking-widest font-black shrink-0">
          TOTAL SECTOR PROGRESS: {currentStepAnsweredCount} / {currentStepTotal}
        </div>
      </div>

      {/* Narrative Context Alert Header */}
      <div className="bg-slate-950 border border-slate-900 p-5 mb-8 text-xs text-slate-400 not-italic normal-case font-medium font-sans leading-relaxed flex items-start gap-3 rounded-xs">
        <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
        <div>
          This targeted diagnostic interface captures pipeline vectors sequentially, cross-validating telemetry configurations across independent organizational node viewpoints.
        </div>
      </div>

      {/* Scenario Ingestion Loop */}
      <div className="space-y-10 mb-10">
        {activeQuestions.map((question, index) => {
          const targetKey = `quad_${question.id}`;
          const currentSelection = answers[targetKey] || answers[question.id];
          
          return (
            <div key={question.id} className="border border-slate-900 bg-slate-950/40 p-8 relative rounded-sm group/card">
              <span className="text-[9px] font-mono text-slate-600 block mb-3 font-black tracking-widest not-italic">
                // SEGMENT LAYER: {question.pillar} // TARGET NODE: {question.target_node || 'STAKEHOLDER'} // ID: {question.id}
              </span>

              <p className="text-2xl md:text-3xl text-white uppercase leading-tight tracking-tighter font-black mb-6 font-sans">
                {index + 1}. {question.symptomatic_scenario}
              </p>
              
              <div className="grid grid-cols-1 gap-3 mt-6 font-mono not-italic text-sm">
                {(Object.keys(question.choices) as Array<'A' | 'B' | 'C' | 'D'>).map((key) => {
                  const choice = question.choices[key];
                  const isSelected = currentSelection === key;
                  return (
                    <div 
                      key={key}
                      onClick={() => handleSelectOption(question.id, key)}
                      className="border p-5 cursor-pointer transition-all flex items-start gap-4 rounded-xs border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-900/30"
                      style={isSelected ? { backgroundColor: 'rgba(153, 27, 27, 0.1)', borderColor: '#dc2626', color: '#ffffff' } : {}}
                    >
                      <span className={`text-xs font-black px-3 py-1 border shrink-0 transition-all rounded-xs ${
                        isSelected 
                          ? 'bg-red-600 text-white border-red-500' 
                          : 'bg-slate-900 text-slate-500 border-slate-800 group-hover/card:text-slate-300'
                      }`}>
                        {key}
                      </span>

                      <p className={`leading-relaxed font-sans normal-case text-sm font-semibold pt-0.5 transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-400'
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
      <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono not-italic">
        <div className="text-[10px] text-slate-500 tracking-wider flex items-center gap-2 font-black">
          <Shield size={14} className={isPillarIncomplete ? "text-slate-700" : "text-red-500"} /> 
          {isPillarIncomplete ? "ALL ACTIVE SECTOR OBSERVATIONS MANDATORY TO RESOLVE POSTURE" : "CORE MATRIX VECTOR VALIDATED // READY TO COMPUTE"}
        </div>
        
        <button
          type="button"
          disabled={isPillarIncomplete || isCompiling}
          onClick={compileActiveNodePosture}
          className={`w-full sm:w-auto px-8 py-4 font-sans font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all italic rounded-sm shadow-md ${
            isPillarIncomplete 
              ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-red-600 hover:text-white shadow-lg'
          }`}
        >
          {isCompiling ? "COMPILING SYSTEM LOGS..." : "Save & Close Node Posture"} 
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
