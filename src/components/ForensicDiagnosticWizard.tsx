"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Shield, ChevronRight, Activity, AlertCircle } from 'lucide-react';
import { forensicQuestions } from '../data/forensicQuestions';
import { calculateForensicMetrics } from '../lib/forensicCalculus';

type PillarType = 'IGF' | 'AVS' | 'HAI';

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

  // 📥 GLOBAL MOUNT HYDRATION
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      const roleParam = params.get('role');
      
      if (emailParam) window.sessionStorage.setItem('stakeholder_runtime_email', emailParam);
      if (roleParam) window.sessionStorage.setItem('stakeholder_runtime_role', roleParam);

      // Restore session logs across all three pillar lanes to allow cross-functional mapping
      const savedAnswers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
      ['IGF', 'AVS', 'HAI'].forEach(pillar => {
        const cached = window.sessionStorage.getItem(`quad_cache_${pillar}`);
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

  // 📡 CROSS-ORGANIZATIONAL OPEN HORIZON FILTER
  // Pulls a balanced cross-section from all three vectors to ensure multi-dimensional visibility
  const activeQuestions = useMemo(() => {
    const rawList = Object.values(forensicQuestions);
    
    // Extracts an even distribution from your complete dataset pool
    const igfSet = rawList.filter(q => q.pillar === 'IGF').slice(0, 3);
    const avsSet = rawList.filter(q => q.pillar === 'AVS').slice(0, 3);
    const haiSet = rawList.filter(q => q.pillar === 'HAI').slice(0, 3);
    
    return [...igfSet, ...avsSet, ...haiSet];
  }, []);

  const handleSelectOption = (questionId: string, choiceKey: 'A' | 'B' | 'C' | 'D') => {
    // Dynamically look up the target question to save it into its designated track cache
    const targetQuestion = Object.values(forensicQuestions).find(q => q.id === questionId);
    const targetPillar = targetQuestion?.pillar || activePillar;

    setAnswers(prev => {
      const prefixedKey = `quad_${questionId}`;
      const updated = { ...prev, [prefixedKey]: choiceKey };
      
      if (typeof window !== 'undefined') {
        // Isolate the answers belonging strictly to this target pillar group
        const targetPillarAnswers: Record<string, string> = {};
        Object.keys(updated).forEach(key => {
          const cleanId = key.replace(/^quad_/, '');
          const qObj = Object.values(forensicQuestions).find(q => q.id === cleanId);
          if (qObj?.pillar === targetPillar) {
            targetPillarAnswers[key] = updated[key];
          }
        });

        window.sessionStorage.setItem(`quad_cache_${targetPillar}`, JSON.stringify(targetPillarAnswers));
      }
      return updated;
    });
  };

  // 🛰️ CROSS-POSTURE COMPILATION EDGE
  const compileActiveNodePosture = () => {
    setIsCompiling(true);
    let fullyCompiledMatrix: Record<string, string> = {};
    
    if (typeof window !== 'undefined') {
      try {
        const ddIgf = JSON.parse(window.sessionStorage.getItem(`deepdive_cache_IGF`) || '{}');
        const ddAvs = JSON.parse(window.sessionStorage.getItem(`deepdive_cache_AVS`) || '{}');
        const ddHai = JSON.parse(window.sessionStorage.getItem(`deepdive_cache_HAI`) || '{}');

        const quadIgf = JSON.parse(window.sessionStorage.getItem(`quad_cache_IGF`) || '{}');
        const quadAvs = JSON.parse(window.sessionStorage.getItem(`quad_cache_AVS`) || '{}');
        const quadHai = JSON.parse(window.sessionStorage.getItem(`quad_cache_HAI`) || '{}');
        
        const fullQuadSet = { 
          ...quadIgf, 
          ...quadAvs, 
          ...quadHai, 
          ...answers 
        };
        
        const fullDeepDiveSet = { ...ddIgf, ...ddAvs, ...ddHai };

        Object.keys(fullDeepDiveSet).forEach(key => {
          const cleanKey = key.startsWith('deepdive_') ? key : `deepdive_${key}`;
          fullyCompiledMatrix[cleanKey] = fullDeepDiveSet[key];
        });

        Object.keys(fullQuadSet).forEach(key => {
          const cleanKey = key.startsWith('quad_') ? key : `quad_${key}`;
          fullyCompiledMatrix[cleanKey] = fullQuadSet[key];
        });

      } catch (err) {
        console.error("Post-compilation matrix union break:", err);
      }
    }

    const computedResults = calculateForensicMetrics(companyName, fullyCompiledMatrix);
    
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(`bmr_runtime_${companyName}`, JSON.stringify(computedResults));
      window.sessionStorage.setItem(`bmr_wizard_state_cache`, JSON.stringify(fullyCompiledMatrix));
    }
    
    onCalculated(computedResults);
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
            ENTERPRISE WIDE DIAGNOSTIC // COMBINED 360 TRIANGULATION
          </span>
        </div>
        <div className="text-[10px] text-slate-500 tracking-widest font-black shrink-0">
          TOTAL MIXED SECTOR PROGRESS: {currentStepAnsweredCount} / {currentStepTotal}
        </div>
      </div>

      {/* Narrative Context Alert Header */}
      <div className="bg-slate-950 border border-slate-900 p-5 mb-8 text-xs text-slate-400 not-italic normal-case font-medium font-sans leading-relaxed flex items-start gap-3 rounded-xs">
        <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
        <div>
          This multi-persona triage layer acts as a cross-functional probe, scanning regulatory changes (IGF), structural code infrastructure waste (AVS), and systemic automation drift parameters (HAI) simultaneously.
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
          {isPillarIncomplete ? "ALL CHANNELS MANDATORY FOR BALANCED TRIANGULATION" : "COMPREHENSIVE MATRIX VECTOR VALIDATED // READY TO COMPUTE"}
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
