"use client";
import React, { useState } from 'react';
import { ShieldAlert, Activity, FileText } from 'lucide-react';
import { ForensicEngine } from '../lib/diagnosticEngine';
import type { DiagnosticResult } from '../lib/diagnosticEngine';
import ForensicResultCard from '../components/ForensicResultCard';
import ForensicSlider from '../components/ForensicSlider';
import TriageCaptureModal from '../components/TriageCaptureModal';
import ForensicPDFGenerator from '../lib/pdfGenerator';

export default function PulseCheck() {
  const [startTime] = useState(Date.now());
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<'executive' | 'technical' | null>(null);
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  const [answers, setAnswers] = useState({ reworkTax: 5, shadowAI: 5, expertiseDebt: 5, deltaGap: 5 });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const savedBaseline = typeof window !== 'undefined' ? localStorage.getItem('bmr_triage_baseline') : null;
    const baseline = savedBaseline 
      ? JSON.parse(savedBaseline) 
      : { nodes: 500, role: role || 'executive', integrity: 'hybrid' };
    
    const duration = (Date.now() - startTime) / 1000;
    
    // FIX: Passing the 3rd argument (baseline) to satisfy the type definition
    const finalResult = ForensicEngine.calculate(answers, duration, baseline);
    
    setResult(finalResult);
    setIsSubmitting(false);
    setShowTriageModal(true);
  };

  const handleTriageSuccess = async (email: string) => {
    if (!result) return;
    setShowTriageModal(false);
    const url = await ForensicPDFGenerator.generate(result, email);
    setPdfUrl(url);
  };

  if (result && !showTriageModal) return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <ForensicResultCard result={result} onRestart={() => { setResult(null); setPdfUrl(null); setRole(null); }} />
        {pdfUrl && (
          <a href={pdfUrl} download={`BMR_BRIEFING.pdf`} className="w-full mt-4 bg-slate-900 border border-slate-800 text-white py-4 px-6 flex items-center justify-center gap-3 transition-all font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black">
            <FileText size={14} /> Download Secure Briefing PDF
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-48 pb-20 px-6 font-sans">
      <div className="max-w-xl mx-auto">
        {!role ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="border-l-2 border-red-600 pl-6 mb-12">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">Initialize Audit</h1>
              <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Select Perspective</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => setRole('executive')} className="border border-slate-800 p-8 hover:border-red-600 transition-all text-left group bg-slate-900/20">
                <div className="text-red-600 mb-2 font-mono text-[10px]">NODE_01</div>
                <div className="text-xl font-black uppercase italic group-hover:text-red-600">Executive / Strategic</div>
              </button>
              <button onClick={() => setRole('technical')} className="border border-slate-800 p-8 hover:border-red-600 transition-all text-left group bg-slate-900/20">
                <div className="text-red-600 mb-2 font-mono text-[10px]">NODE_02</div>
                <div className="text-xl font-black uppercase italic group-hover:text-red-600">Technical / Operational</div>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="mb-12 flex justify-between items-center border-b border-slate-900 pb-8">
              <h2 className="text-xl font-black italic uppercase text-white tracking-tighter">Systemic Friction</h2>
              <ShieldAlert className="text-red-600 h-6 w-6" />
            </div>
            <div className="space-y-6">
                <ForensicSlider label="Rework Volume" zone="Rework Tax" value={answers.reworkTax} onChange={(v) => setAnswers({...answers, reworkTax: v})} />
                <ForensicSlider label="Unsanctioned LLMs" zone="Shadow AI" value={answers.shadowAI} onChange={(v) => setAnswers({...answers, shadowAI: v})} />
                <ForensicSlider label="Knowledge Decay" zone="Expertise Debt" value={answers.expertiseDebt} onChange={(v) => setAnswers({...answers, expertiseDebt: v})} />
                <ForensicSlider label="Strategic Gap" zone="Delta Gap" value={answers.deltaGap} onChange={(v) => setAnswers({...answers, deltaGap: v})} />
            </div>
            <button onClick={handleSubmit} disabled={isSubmitting} className="w-full mt-12 bg-red-600 hover:bg-white hover:text-black text-white py-6 font-black uppercase italic tracking-[0.3em] text-[10px] border border-red-600 flex items-center justify-center gap-4 transition-all disabled:opacity-50">
              {isSubmitting ? <><Activity className="animate-spin h-4 w-4" /> Analyzing...</> : 'Generate Forensic Report'}
            </button>
          </div>
        )}
      </div>
      {showTriageModal && result && (
        <TriageCaptureModal result={result} onClose={() => setShowTriageModal(false)} onSuccess={handleTriageSuccess} />
      )}
    </div>
  );
}
