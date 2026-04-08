import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STRESS_TEST_MANIFEST } from '@/data/stressTestManifest';
import { Lens, EvidenceBasis, UserResponse } from '@/data/types';
import { analyzeForensicResults } from '@/utils/forensicEngine';
import { generateBMRVerdict } from '@/utils/generateVerdict';
import { ShieldAlert, Activity, Database, ChevronRight, Download } from 'lucide-react';

export const StressTestUI = () => {
  const [activeLens, setActiveLens] = useState<Lens>("EXECUTIVE");
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [verdict, setVerdict] = useState<any>(null);

  const activeQuestions = STRESS_TEST_MANIFEST.filter(q => q.lens === activeLens);
  const currentQuestion = activeQuestions[step];

  const submitResponse = (answer: boolean, evidence: EvidenceBasis, confidence: "HIGH" | "MEDIUM" | "LOW") => {
    const newResponse: UserResponse = {
      nodeId: currentQuestion.id,
      answer,
      evidence,
      confidence
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    if (step < activeQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // Rotate Lenses or Finalize
      if (activeLens === "EXECUTIVE") {
        setActiveLens("MANAGERIAL");
        setStep(0);
      } else if (activeLens === "MANAGERIAL") {
        setActiveLens("TECHNICAL");
        setStep(0);
      } else {
        const result = analyzeForensicResults(updatedResponses);
        setVerdict(result);
      }
    }
  };

  if (verdict) return <VerdictSummary verdict={verdict} />;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
        {/* Clinical Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-blue-400 tracking-tighter uppercase mb-1">Active_Lens_Scan</p>
            <h1 className="text-xl font-bold tracking-tight">{activeLens} PERSPECTIVE</h1>
          </div>
          <div className="flex gap-2">
            <div className={`h-2 w-8 rounded-full ${activeLens === 'EXECUTIVE' ? 'bg-blue-500' : 'bg-slate-700'}`} />
            <div className={`h-2 w-8 rounded-full ${activeLens === 'MANAGERIAL' ? 'bg-blue-500' : 'bg-slate-700'}`} />
            <div className={`h-2 w-8 rounded-full ${activeLens === 'TECHNICAL' ? 'bg-blue-500' : 'bg-slate-700'}`} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-10"
          >
            <p className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-wide">
              {currentQuestion.zone === 'FIDUCIARY' && <ShieldAlert size={16} />}
              {currentQuestion.zone === 'OPERATIONAL' && <Activity size={16} />}
              {currentQuestion.zone === 'INFRASTRUCTURE' && <Database size={16} />}
              ZONE: {currentQuestion.zone}
            </p>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-10 leading-tight">
              {currentQuestion.text}
            </h2>

            {/* Evidence Picker - The Masterclass Enhancement */}
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Select Basis of Evidence</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: 'AUDIT_LOG', label: 'Audit Log / System Data' },
                  { id: 'CODE_REVIEW', label: 'Technical Code Review' },
                  { id: 'INTERVIEW', label: 'Stakeholder Interview' },
                  { id: 'VERBAL_ASSURANCE', label: 'Verbal Assurance' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => submitResponse(true, item.id as EvidenceBasis, "HIGH")}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded hover:border-blue-600 hover:bg-blue-50 transition text-left group"
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => submitResponse(false, "NONE", "LOW")}
                className="w-full p-4 mt-4 border border-dashed border-red-200 text-red-600 rounded hover:bg-red-50 transition font-mono text-xs uppercase"
              >
                Confirm Absence of Evidence (Stress Trigger)
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
