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

  // 📥 STATE HYDRATION & MOUNT CAPTURE: Restores total survey progress from cache memory
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
      }

      // Pre-populate the local component state with historical answers across all active pillars
      const cachedState = window.sessionStorage.getItem(`bmr_wizard_state_cache`);
      if (cachedState) {
        try {
          const parsedCache = JSON.parse(cachedState);
          setAnswers(parsedCache);
        } catch (err) {
          console.error("Failed to hydrate historical wizard memory:", err);
        }
      }
    }
  }, [activePillar]); // Hydrates cleanly whenever changing between funnel segments

  // 🔒 STRICT BOUNDARY FILTER: Restricts view to only the active framework lane
  const activeQuestions = useMemo(() => {
    return Object.values(forensicQuestions).filter(
      q => q.pillar === activePillar
    );
  }, [activePillar]);

  const handleSelectOption = (questionId: string, choiceKey: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => {
      const updated = { ...prev, [questionId]: choiceKey };
      // Keep backing cache updated immediately during click loops
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(`bmr_wizard_state_cache`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  // 🛰️ GLOBAL CORE COMPILATION FIX
  const compileActiveNodePosture = () => {
    setIsCompiling(true);
    
    let combinedAnswers = { ...answers };
    
    if (typeof window !== 'undefined') {
      const cachedState = window.sessionStorage.getItem(`bmr_wizard_state_cache`);
      if (cachedState) {
        try {
          // Pull and merge all historical answer nodes across the three layout lanes
          const parsedCache = JSON.parse(cachedState);
          combinedAnswers = { ...parsedCache, ...answers };
        } catch (err) {
          console.error("Cache memory triangulation bypass:", err);
        }
      }
    }

    // Execute multi-pillar equations simultaneously without wiping lane states
    const computedResults = calculateForensicMetrics(companyName, combinedAnswers);
    
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(
        `bmr_runtime_${companyName}`, 
        JSON.stringify(computedResults)
      );
      window.sessionStorage.setItem(`bmr_wizard_state_cache`, JSON.stringify(combinedAnswers));
    }
    
    onCalculated(computedResults);
    setIsCompiling(false);
  };

  const currentStepTotal = activeQuestions.length;
  const currentStepAnsweredCount = activeQuestions.filter(q => !!answers[q.id]).length;
  const isPillarIncomplete = currentStepAnsweredCount < currentStepTotal;

  return (
    <div className="bg-[#020617] text-slate-200 font-sans tracking-tighter text-left uppercase font-black overflow-x-hidden p-10 max-w-4xl mx-auto my-12 border border-slate-900 shadow-2xl backdrop-blur-md italic">
      
      {/* Structural Progression Control Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 mb-8 gap-4 no-print font-mono not-italic">
        <div className="flex items-center gap-3">
          <Activity className="text-red-600 animate-pulse shrink-0" size={20} />
          <span className="text-xs font-black uppercase tracking-widest text-white">
            {activePillar === 'IGF' && "HYBRID FUNNEL SECTION 01 // THE LEGAL BLACK BOX (IGF)"}
            {activePillar === 'AVS' && "HYBRID FUNNEL SECTION 02 // THE REWORK TAX (AVS)"}
            {activePillar === 'HAI' && "HYBRID FUNNEL SECTION 03 // THE AUTO-PILOT TRAP (HAI)"}
          </span>
        </div>
        <div className="text-[10px] text-slate-500 tracking-widest font-black shrink-0">
          STAGE SECTOR PROGRESS: {currentStepAnsweredCount} / {currentStepTotal}
        </div>
      </div>

      {/* Narrative Context Alert Header */}
      <div className="bg-slate-950 border border-slate-900 p-5 mb-8 text-xs text-slate-400 not-italic normal-case font-medium font-sans leading-relaxed flex items-start gap-3 rounded-xs">
        <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
        <div>
          {activePillar === 'IGF' && "This layer examines spiking security validation trails, data compliance fractures, and statutory exposures under global guidelines."}
          {activePillar === 'AVS' && "This layer maps structural data pipeline waste, technical debt indices, and schema mutation risks. These metrics quantify corporate developer bandwidth leakage."}
          {activePillar === 'HAI' && "This layer maps automation anomalies, alarm fatigue thresholds, and strategic operational drift. These metrics isolate silent balance-sheet profit bleeding."}
        </div>
      </div>

      {/* Scenario Ingestion Loop */}
      <div className="space-y-10 mb-10">
        {activeQuestions.map((question, index) => (
          <div key={question.id} className="border border-slate-900 bg-slate-950/40 p-8 relative rounded-sm group/card">
            
            <span className="text-[9px] font-mono text-slate-600 block mb-3 font-black tracking-widest not-italic">
              // TARGET NODE: {question.target_node || 'STAKEHOLDER'} // ID: {question.id}
            </span>

            <p className="text-2xl md:text-3xl text-white uppercase leading-tight tracking-tighter font-black mb-6 font-sans">
              {index + 1}. {question.symptomatic_scenario}
            </p>
            
            <div className="grid grid-cols-1 gap-3 mt-6 font-mono not-italic text-sm">
              {(Object.keys(question.choices) as Array<'A' | 'B' | 'C' | 'D'>).map((key) => {
                const choice = question.choices[key];
                const isSelected = answers[question.id] === key;
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
        ))}
      </div>

      {/* Bottom Pipeline Status Controller */}
      <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono not-italic">
        <div className="text-[10px] text-slate-500 tracking-wider flex items-center gap-2 font-black">
          <Shield size={14} className={isPillarIncomplete ? "text-slate-700" : "text-red-500"} /> 
          {isPillarIncomplete ? "ALL POSTURE SECTIONS MANDATORY" : "STAGE SECTOR VALIDATED // READY TO COMPUTE"}
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
