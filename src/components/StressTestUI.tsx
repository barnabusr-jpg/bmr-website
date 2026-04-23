import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STRESS_TEST_MANIFEST } from '@/data/stressTestManifest';
import { Lens, EvidenceBasis, UserResponse } from '@/data/types';
import { ShieldAlert, Activity, Database, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';

export const StressTestUI = () => {
  // 1. URL Parameter Detection (Ensures representative isolation)
  const [activeLens, setActiveLens] = useState<Lens | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lensParam = params.get('lens') as Lens;
    const projectParam = params.get('projectId'); // Assuming projectId is in URL
    
    if (lensParam) setActiveLens(lensParam);
    if (projectParam) setProjectId(projectParam);
  }, []);

  const activeQuestions = STRESS_TEST_MANIFEST.filter(q => q.lens === activeLens);
  const currentQuestion = activeQuestions[step];

  const handleFinalSubmit = async (finalResponses: UserResponse[]) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          lens: activeLens,
          responses: finalResponses,
          timestamp: new Date().toISOString()
        }),
      });
      
      if (res.ok) setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      // 2. Trigger the clinical hold instead of showing results
      handleFinalSubmit(updatedResponses);
    }
  };

  // 3. Clinical Hold Screen (The "Radiology Waiting Room")
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border border-slate-200 p-10 text-center rounded-lg shadow-sm"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Scan Complete</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            Your representative data for the <strong>{activeLens}</strong> lens has been logged for forensic reconciliation. 
            The final Verdict is currently being processed by BMR Advisory.
          </p>
          <div className="py-2 px-4 bg-slate-100 border rounded text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Status: Awaiting Owner Authorization
          </div>
        </motion.div>
      </div>
    );
  }

  if (!activeLens || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs text-slate-400">
        INITIALIZING_FORENSIC_PROTOCOL...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
        {/* Clinical Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-blue-400 tracking-tighter uppercase mb-1">Active_Lens_Scan</p>
            <h1 className="text-xl font-bold tracking-tight uppercase">{activeLens} PERSPECTIVE</h1>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-mono text-slate-500 uppercase">Step {step + 1} of {activeQuestions.length}</p>
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
            {isSubmitting ? (
              <div className="flex flex-col items-center py-20">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
                <p className="font-mono text-xs text-slate-500 uppercase">Transmitting_Data...</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-wide">
                  {currentQuestion.zone === 'FIDUCIARY' && <ShieldAlert size={16} />}
                  {currentQuestion.zone === 'OPERATIONAL' && <Activity size={16} />}
                  {currentQuestion.zone === 'INFRASTRUCTURE' && <Database size={16} />}
                  ZONE: {currentQuestion.zone}
                </p>
                
                <h2 className="text-3xl font-bold text-slate-800 mb-10 leading-tight">
                  {currentQuestion.text}
                </h2>

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
                        disabled={isSubmitting}
                        onClick={() => submitResponse(true, item.id as EvidenceBasis, "HIGH")}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded hover:border-blue-600 hover:bg-blue-50 transition text-left group disabled:opacity-50"
                      >
                        <span className="text-sm font-medium">{item.label}</span>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600" />
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    onClick={() => submitResponse(false, "NONE", "LOW")}
                    className="w-full p-4 mt-4 border border-dashed border-red-200 text-red-600 rounded hover:bg-red-50 transition font-mono text-xs uppercase disabled:opacity-50"
                  >
                    Confirm Absence of Evidence (Structural Friction)
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
