import React, { useState } from 'react';
import { Shield, ChevronRight, CheckSquare, Activity, AlertCircle } from 'lucide-react';
import { forensicQuestions } from '../data/forensicQuestions';
import { calculateForensicMetrics } from '../lib/forensicCalculus';

type PillarType = 'IGF' | 'AVS' | 'HAI';

export default function ForensicDiagnosticWizard({ 
  companyName, 
  onCalculated 
}: { 
  companyName: string; 
  onCalculated: (metrics: any) => void; 
}) {
  // Hybrid Funnel sequence dictates leading with IGF (Compliance Risks) first
  const [currentPillar, setCurrentPillar] = useState<PillarType>('IGF');
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isCompiling, setIsCompiling] = useState(false);

  // Filter out the questions dedicated exclusively to the running active pillar lane
  const activeQuestions = Object.values(forensicQuestions).filter(
    q => q.pillar === currentPillar
  );

  const handleSelectOption = (questionId: string, choiceKey: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({ ...prev, [questionId]: choiceKey }));
  };

  const advancePillarPipeline = () => {
    if (currentPillar === 'IGF') {
      setCurrentPillar('AVS'); // Shift to Pillar 2: Rework Tax
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPillar === 'AVS') {
      setCurrentPillar('HAI'); // Shift to Pillar 3: Auto-Pilot Trap
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPillar === 'HAI') {
      setIsCompiling(true);
      
      // Execute the pure client-side mathematical calculations out-of-band
      const computedResults = calculateForensicMetrics(companyName, answers);
      
      // Cache values securely in the user's browser sandbox session
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(
          `bmr_runtime_${companyName}`, 
          JSON.stringify(computedResults)
        );
      }
      
      // Hand the output properties straight back to the parent layout container
      onCalculated(computedResults);
      setIsCompiling(false);
    }
  };

  const currentStepTotal = activeQuestions.length;
  const currentStepAnsweredCount = activeQuestions.filter(q => !!answers[q.id]).length;
  const isPillarIncomplete = currentStepAnsweredCount < currentStepTotal;

  return (
    <div className="bg-black text-zinc-100 font-mono p-8 border border-zinc-900 max-w-4xl mx-auto my-12 text-left select-none italic">
      
      {/* Structural Progression Control Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-4 mb-8 gap-2">
        <div className="flex items-center gap-3">
          <Activity className="text-red-600 animate-pulse shrink-0" size={16} />
          <span className="text-xs font-black uppercase tracking-widest text-white not-italic">
            {currentPillar === 'IGF' && "HYBRID FUNNEL SECTION 01 // THE LEGAL BLACK BOX (IGF)"}
            {currentPillar === 'AVS' && "HYBRID FUNNEL SECTION 02 // THE REWORK TAX (AVS)"}
            {currentPillar === 'HAI' && "HYBRID FUNNEL SECTION 03 // THE AUTO-PILOT TRAP (HAI)"}
          </span>
        </div>
        <div className="text-[10px] text-zinc-500 tracking-widest font-black shrink-0">
          STAGE SECTOR PROGRESS: {currentStepAnsweredCount} / {currentStepTotal}
        </div>
      </div>

      {/* Narrative Context Alert Header */}
      <div className="bg-zinc-950 border border-zinc-900 p-4 mb-8 text-xs text-zinc-400 not-italic normal-case leading-relaxed flex items-start gap-3">
        <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
        <div>
          {currentPillar === 'IGF' && "This layer examines algorithmic decision trails, data privacy isolations, and compliance failure exposures. These boundaries carry structural statutory liabilities under global regulatory guidelines."}
          {currentPillar === 'AVS' && "This layer maps structural data pipeline waste, technical debt indices, and schema mutation risks. These metrics quantify corporate developer bandwidth leakage."}
          {currentPillar === 'HAI' && "This layer maps automation anomalies, alarm fatigue thresholds, and strategic operational drift. These metrics isolate silent balance-sheet profit bleeding."}
        </div>
      </div>

      {/* Scenario Ingestion Loop */}
      <div className="space-y-8 mb-10">
        {activeQuestions.map((question, index) => (
          <div key={question.id} className="border border-zinc-950 bg-zinc-950/40 p-6 relative rounded-sm">
            <span className="text-[9px] font-mono text-zinc-600 block mb-2 font-black tracking-widest">// TARGET LAYER NODE: {question.target_node} // ID: {question.id}</span>
            <p className="text-xs text-zinc-200 uppercase leading-relaxed tracking-wide font-black mb-4 not-all-caps">{index + 1}. {question.symptomatic_scenario}</p>
            
            <div className="grid grid-cols-1 gap-2 mt-4 font-sans normal-case font-medium text-xs">
              {(Object.keys(question.choices) as Array<'A' | 'A' | 'B' | 'C' | 'D'>).map((key) => {
                const choice = question.choices[key];
                const isSelected = answers[question.id] === key;
                return (
                  <div 
                    key={key}
                    onClick={() => handleSelectOption(question.id, key)}
                    className={`border p-4 cursor-pointer transition-all flex items-start gap-4 rounded-sm ${isSelected ? 'bg-red-950/10 border-red-600 text-white' : 'bg-black border-zinc-900 text-zinc-400 hover:border-zinc-700'}`}
                  >
                    <span className={`font-mono text-xs font-black px-2 py-0.5 border shrink-0 ${isSelected ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}>{key}</span>
                    <p className="leading-relaxed text-zinc-300 font-normal">{choice.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Pipeline Status Controller */}
      <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-[10px] text-zinc-500 tracking-wider flex items-center gap-2 not-italic">
          <Shield size={12} className={isPillarIncomplete ? "text-zinc-600" : "text-green-500"} /> 
          {isPillarIncomplete ? "ALL POSTURE SECTIONS MANDATORY" : "STAGE SECTOR VALIDATED // READY TO ADVANCE"}
        </div>
        
        <button
          type="button"
          disabled={isPillarIncomplete || isCompiling}
          onClick={advancePillarPipeline}
          className={`w-full sm:w-auto px-8 py-4 font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all not-italic rounded-sm ${isPillarIncomplete ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-white hover:text-black shadow-lg shadow-red-900/10'}`}
        >
          {isCompiling ? "COMPILING LOCAL METRICS..." : currentPillar === 'HAI' ? "Compile Forensic Profile" : "Advance System Tier"} 
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
