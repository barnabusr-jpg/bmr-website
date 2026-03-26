import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  FileText,
  Upload,
  CheckCircle,
  Activity
} from 'lucide-react';

type QuestionType = {
  id: string;
  text: string;
  type: 'range' | 'select' | 'textarea' | 'file';
  min?: number;
  max?: number;
  options?: string[];
  required?: boolean;
  category: 'Rework Tax' | 'Shadow AI' | 'Expertise Debt' | 'Governance';
};

type AuditState = {
  role: 'executive' | 'managerial' | 'technical' | null;
  step: number;
  answers: Record<string, string | number | null>;
  artifacts: Record<string, File | null>;
  isComplete: boolean;
};

// Define questions outside to prevent re-renders
const questions: QuestionType[] = [
  { id: 'q1', text: 'Verify:Serve ratio? (Verification time vs. time saved)', type: 'range', min: 0.5, max: 3, category: 'Rework Tax' },
  { id: 'q2', text: 'Upload 5 examples of AI outputs requiring correction (PDF/CSV)', type: 'file', category: 'Rework Tax' },
  { id: 'q3', text: 'Average hourly cost of verification staff?', type: 'select', options: ['$20–$50', '$50–$100', '$100–$200', '$200+'], category: 'Rework Tax' },
  { id: 'q11', text: 'Number of unsanctioned AI tools currently used?', type: 'select', options: ['0', '1–3', '4–6', '7+'], category: 'Shadow AI' },
  { id: 'q19', text: 'Percentage of team able to perform tasks manually?', type: 'range', min: 0, max: 100, category: 'Expertise Debt' },
  { id: 'q26', text: 'Does your AI vendor notify you of "Silent Updates"?', type: 'select', options: ['Yes', 'No', 'Unknown'], category: 'Governance' }
  // ... Extend to 30 as needed following this schema
];

export default function ForensicAuditPage() {
  const [state, setState] = useState<AuditState>({
    role: null,
    step: 0,
    answers: {},
    artifacts: {},
    isComplete: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('bmr_forensic_audit');
    if (saved) setState(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('bmr_forensic_audit', JSON.stringify(state));
  }, [state]);

  const currentQuestion = state.step > 0 && state.step <= questions.length ? questions[state.step - 1] : null;
  const progress = Math.round((state.step / (questions.length + 1)) * 100);

  const handleRoleSelect = (role: 'executive' | 'managerial' | 'technical') => {
    setState(prev => ({ ...prev, role, step: 1 }));
  };

  const handleAnswer = (value: string | number | null) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion!.id]: value },
      step: prev.step + 1
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setState(prev => ({
        ...prev,
        artifacts: { ...prev.artifacts, [currentQuestion!.id]: file },
        answers: { ...prev.answers, [currentQuestion!.id]: file.name },
        step: prev.step + 1
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call and completion
    setTimeout(() => {
      setState(prev => ({ ...prev, isComplete: true }));
      setIsLoading(false);
    }, 2000);
  };

  if (state.isComplete) {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600">
        <Header />
        <main className="pt-40 pb-20 px-6 text-center max-w-2xl mx-auto">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-5xl font-black uppercase italic italic tracking-tighter mb-4">Audit Complete</h1>
          <p className="text-slate-400 mb-8 uppercase text-xs tracking-widest font-mono">Forensic artifacts logged. Analysis in progress.</p>
          <button className="w-full bg-red-600 p-6 font-black text-xs tracking-widest uppercase hover:bg-white hover:text-red-600 transition-all">
            Download PDF Verdict
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600">
      <Head><title>BMR | Forensic Audit</title></Head>
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        
        {/* PROGRESS TERMINAL */}
        <div className="mb-12 space-y-4">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-2"><Activity className="h-3 w-3 text-red-600" /> Byte Trace: {state.step} / {questions.length + 1}</span>
            <span>Progress: {progress}%</span>
          </div>
          <div className="h-1 w-full bg-slate-900">
            <motion.div 
              // @ts-expect-error - Width calculation is numeric progress percentage
              animate={{ width: `${progress}%` }} 
              className="h-full bg-red-600" 
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {state.step === 0 ? (
            <motion.div key="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-center">
              <h1 className="text-6xl font-black uppercase italic tracking-tighter">Choose Your Perspective</h1>
              <div className="grid md:grid-cols-3 gap-4">
                {['executive', 'managerial', 'technical'].map((r) => (
                  <button 
                    key={r}
                    onClick={() => handleRoleSelect(r as any)}
                    className="border border-slate-900 p-12 hover:bg-red-600 hover:border-red-600 transition-all font-black uppercase tracking-widest text-xs"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div key={currentQuestion.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
              <div className="text-red-600 font-mono text-[10px] uppercase tracking-widest">{currentQuestion.category}</div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-tight">{currentQuestion.text}</h2>
              
              <div className="pt-8">
                {currentQuestion.type === 'file' ? (
                  <label className="flex flex-col items-center p-12 border-2 border-dashed border-slate-900 cursor-pointer hover:border-red-600 transition-all">
                    <Upload className="h-8 w-8 mb-4 text-slate-700" />
                    <span className="text-xs font-black uppercase tracking-widest">Attach Forensic Artifact</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                ) : currentQuestion.type === 'select' ? (
                  <div className="grid gap-4">
                    {currentQuestion.options?.map(opt => (
                      <button key={opt} onClick={() => handleAnswer(opt)} className="text-left p-6 border border-slate-900 hover:bg-white hover:text-black font-bold transition-all uppercase text-xs">
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input 
                    type="range" 
                    min={currentQuestion.min} 
                    max={currentQuestion.max} 
                    className="w-full h-2 bg-slate-900 appearance-none cursor-pointer accent-red-600"
                    onChange={(e) => handleAnswer(Number(e.target.value))}
                  />
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="final" className="space-y-8 text-center">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Submit for Final Analysis</h2>
              <input 
                type="email" 
                placeholder="Work Email" 
                className="w-full bg-slate-950 border border-slate-900 p-6 text-white font-mono"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-red-600 p-6 font-black uppercase tracking-widest text-xs"
              >
                {isLoading ? 'Processing...' : 'Finalize Forensic Audit'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
