import React, { useState } from 'react';
import { ForensicEngine } from '../lib/diagnosticEngine';
import ForensicResultCard from '../components/ForensicResultCard';
import ForensicSlider from '../components/ForensicSlider';
import { ShieldAlert, Activity } from 'lucide-react';

export default function PulseCheck() {
  const [startTime] = useState(Date.now());
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<'executive' | 'technical' | null>(null);
  
  const [answers, setAnswers] = useState({
    reworkTax: 5,
    shadowAI: 5,
    expertiseDebt: 5,
    deltaGap: 5
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Artificial "Forensic Analysis" delay for psychological weight
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const duration = (Date.now() - startTime) / 1000;
    const finalResult = ForensicEngine.calculate(answers, duration);
    setResult(finalResult);
    setIsSubmitting(false);
  };

  if (result) return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 flex justify-center">
      <div className="max-w-2xl w-full">
        <ForensicResultCard result={result} onRestart={() => setResult(null)} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-48 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        {!role ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="border-l-2 border-red-600 pl-6 mb-12">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Initialize Audit</h1>
              <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Select Forensic Perspective to Begin</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => setRole('executive')} className="border border-slate-800 p-8 hover:border-red-600 transition-all text-left group">
                <div className="text-red-600 mb-2 font-mono text-[10px] tracking-widest">ROLE_01</div>
                <div className="text-xl font-black uppercase italic group-hover:text-red-600">Executive / Strategic</div>
              </button>
              <button onClick={() => setRole('technical')} className="border border-slate-800 p-8 hover:border-red-600 transition-all text-left group">
                <div className="text-red-600 mb-2 font-mono text-[10px] tracking-widest">ROLE_02</div>
                <div className="text-xl font-black uppercase italic group-hover:text-red-600">Technical / Operational</div>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="mb-16 flex justify-between items-center border-b border-slate-900 pb-8">
              <div>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Systemic Friction</h1>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Perspective: {role}</p>
              </div>
              <ShieldAlert className="text-red-600 h-8 w-8" />
            </div>

            <ForensicSlider label="Manual Rework Volume" zone="Rework Tax" value={answers.reworkTax} onChange={(v) => setAnswers({...answers, reworkTax: v})} />
            <ForensicSlider label="Shadow LLM Deployment" zone="Shadow AI" value={answers.shadowAI} onChange={(v) => setAnswers({...answers, shadowAI: v})} />
            <ForensicSlider label="Knowledge Decay Risk" zone="Expertise Debt" value={answers.expertiseDebt} onChange={(v) => setAnswers({...answers, expertiseDebt: v})} />
            <ForensicSlider label="Strategic Disconnect" zone="Delta Gap" value={answers.deltaGap} onChange={(v) => setAnswers({...answers, deltaGap: v})} />

            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="w-full mt-12 bg-red-600 hover:bg-white hover:text-black transition-all text-white py-6 font-black uppercase italic tracking-[0.3em] text-xs border border-red-600 flex items-center justify-center gap-4"
            >
              {isSubmitting ? <><Activity className="animate-spin h-4 w-4" /> Running Forensic Verdict...</> : 'Generate Audit Report'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
