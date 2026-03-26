import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Users,
  Upload,
  CheckCircle,
  Activity,
  ChevronRight,
  Cpu,
  AlertTriangle,
  FileDown
} from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  codename: string;
  urgency: 'IMMEDIATE' | 'HIGH' | 'CRITICAL';
  confidence: number;
  rationale: string[];
  nextSteps: string[];
  icon: React.ElementType;
}

type QuestionType = {
  id: string;
  text: string;
  type: 'range' | 'select' | 'file';
  min?: number;
  max?: number;
  options?: string[];
  category: 'Rework Tax' | 'Shadow AI' | 'Expertise Debt' | 'Governance';
};

interface AuditState {
  role: 'executive' | 'managerial' | 'technical' | null;
  step: number;
  answers: Record<string, string | number | null>;
  isComplete: boolean;
}

const questions: QuestionType[] = [
  { id: 'q1', text: 'Current Verify:Serve ratio? (Verification time vs. time saved)', type: 'range', min: 0.5, max: 3, category: 'Rework Tax' },
  { id: 'q2', text: 'Upload forensic examples of AI rework (PDF/CSV)', type: 'file', category: 'Rework Tax' },
  { id: 'q11', text: 'Unsanctioned AI tools currently active in your logic chain?', type: 'select', options: ['0', '1–3', '4–6', '7+'], category: 'Shadow AI' },
  { id: 'q19', text: 'Percentage of team able to perform tasks manually if AI is disabled?', type: 'range', min: 0, max: 100, category: 'Expertise Debt' }
];

export default function ForensicAuditPage() {
  const [state, setState] = useState<AuditState>({
    role: null,
    step: 0,
    answers: {},
    isComplete: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('bmr_forensic_audit');
    if (saved) { try { setState(JSON.parse(saved)); } catch (e) { console.error(e); } }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('bmr_forensic_audit', JSON.stringify(state));
  }, [state]);

  const generateRecommendation = (): Recommendation => {
    const shadowVal = String(state.answers['q11']);
    const reworkVal = Number(state.answers['q1']) || 0;
    const expertiseVal = Number(state.answers['q19']) || 100;

    // Logic Priority 1: Shadow AI (Immediate Risk)
    if (shadowVal !== '0' && shadowVal !== 'undefined') {
      return {
        id: 'P01',
        title: "Shadow AI Containment",
        codename: "SILENT_SWEEP",
        urgency: 'IMMEDIATE',
        confidence: 0.95,
        icon: ShieldCheck,
        rationale: [
          "Audit identified critical Shadow AI infiltration.",
          "Unsanctioned tools are bypassing corporate governance.",
          "Immediate containment is required to prevent data leakage."
        ],
        nextSteps: ["Activate Shadow IT amnesty", "Schedule containment briefing"]
      };
    }

    // Logic Priority 2: Rework Tax (Profit Hemorrhage)
    if (reworkVal > 1.5) {
      return {
        id: 'P02',
        title: "Rework Tax Elimination",
        codename: "VERIFY_SERVE",
        urgency: 'HIGH',
        confidence: 0.92,
        icon: Zap,
        rationale: [
          "Verify:Serve ratio indicates severe profit hemorrhage.",
          "Human correction costs exceed AI efficiency gains.",
          "Structural hardening required for logic chains."
        ],
        nextSteps: ["Implement blind validation", "Execute prompt logic audit"]
      };
    }

    // Default: Expertise Recovery
    return {
      id: 'P03',
      title: "Expertise Recovery",
      codename: "CAPABILITY_HARDENING",
      urgency: 'CRITICAL',
      confidence: 0.88,
      icon: Users,
      rationale: [
        `Team manual capability is at ${expertiseVal}%.`,
        "Knowledge collapse risk detected within 12 months.",
        "Hardening required to restore black-out proficiency."
      ],
      nextSteps: ["Initiate manual task drills", "Audit skill decay vectors"]
    };
  };

  const handleRoleSelect = (role: 'executive' | 'managerial' | 'technical') => setState(prev => ({ ...prev, role, step: 1 }));
  const handleAnswer = (value: string | number | null) => setState(prev => ({ ...prev, answers: { ...prev.answers, [questions[state.step - 1].id]: value }, step: prev.step + 1 }));

  if (state.isComplete) {
    const rec = generateRecommendation();
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans">
        <Header />
        <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="text-center">
              <div className="inline-block border border-green-500/30 px-4 py-2 mb-6">
                <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest">Mission Status: Audit Complete</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Hardening Recommendation</h1>
            </div>

            <div className="border border-slate-800 bg-slate-900/50 p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Recommended Protocol</div>
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter">{rec.codename}</h2>
                  <div className="flex items-center gap-3 mt-4">
                    <div className={`h-2 w-2 rounded-full animate-pulse ${rec.urgency === 'IMMEDIATE' ? 'bg-red-600' : 'bg-orange-500'}`} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Urgency: {rec.urgency}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-green-500">{Math.round(rec.confidence * 100)}%</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Confidence Score</div>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase border-b border-slate-800 pb-2 mb-4">Rationale</div>
                  {rec.rationale.map((line, i) => (
                    <div key={i} className="flex gap-4 items-start text-slate-300 text-sm italic mb-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" /> {line}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase border-b border-slate-800 pb-2 mb-4">Immediate Next Steps</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {rec.nextSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-mono text-slate-400 uppercase">
                        <Zap className="h-3 w-3 text-blue-500" /> {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => window.location.href='/protocols'} className="flex-1 bg-red-600 hover:bg-white hover:text-black text-white font-black py-6 uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Activate {rec.title}
                </button>
                <button className="flex-1 border border-slate-700 hover:bg-slate-800 text-white font-black py-6 uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2">
                  <FileDown className="h-4 w-4" /> Download Full Report
                </button>
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="mb-12 space-y-4">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-2"><Cpu className="h-3 w-3 text-red-600" /> Byte Trace: {state.step} / {questions.length + 1}</span>
            <span>Progress: {Math.round((state.step / (questions.length + 1)) * 100)}%</span>
          </div>
          <div className="h-1 w-full bg-slate-900">
            <motion.div animate={{ width: `${Math.round((state.step / (questions.length + 1)) * 100)}%` }} className="h-full bg-red-600" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {state.step === 0 ? (
            <motion.div key="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-12">
              <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">Choose <br/>Perspective</h1>
              <div className="grid md:grid-cols-3 gap-4">
                {['executive', 'managerial', 'technical'].map((r) => (
                  <button key={r} onClick={() => handleRoleSelect(r as any)} className="border border-slate-900 p-12 hover:bg-red-600 transition-all font-black uppercase tracking-widest text-xs">
                    <Users className="h-4 w-4 mx-auto mb-4 opacity-50" /> {r}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : state.step <= questions.length ? (
            <motion.div key={questions[state.step - 1].id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
              <div className="text-red-600 font-mono text-[10px] uppercase tracking-widest">{questions[state.step - 1].category}</div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-tight">{questions[state.step - 1].text}</h2>
              <div className="pt-8">
                {questions[state.step - 1].type === 'select' ? (
                  <div className="grid gap-4">
                    {questions[state.step - 1].options?.map(opt => (
                      <button key={opt} onClick={() => handleAnswer(opt)} className="text-left p-6 border border-slate-900 hover:bg-white hover:text-black font-bold transition-all uppercase text-xs">
                        <Activity className="inline h-3 w-3 mr-4" /> {opt}
                      </button>
                    ))}
                  </div>
                ) : questions[state.step - 1].type === 'file' ? (
                  <label className="flex flex-col items-center p-12 border-2 border-dashed border-slate-900 cursor-pointer hover:border-red-600 transition-all">
                    <Upload className="h-8 w-8 mb-4 text-slate-700" />
                    <span className="text-xs font-black uppercase tracking-widest">Attach Artifact</span>
                    <input type="file" className="hidden" onChange={() => handleAnswer('artifact_uploaded')} />
                  </label>
                ) : (
                  <input type="range" min={questions[state.step - 1].min} max={questions[state.step - 1].max} step="0.1" className="w-full h-2 bg-slate-900 appearance-none accent-red-600" onChange={(e) => handleAnswer(Number(e.target.value))} />
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="final" className="space-y-8 text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Seal Forensic Log</h2>
              <input type="email" placeholder="Secure Work Email" className="w-full bg-slate-950 border border-slate-900 p-6 text-white font-mono" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button onClick={() => { setIsLoading(true); setTimeout(() => { setState(prev => ({ ...prev, isComplete: true })); setIsLoading(false); }, 1500); }} className="w-full bg-red-600 p-6 font-black uppercase tracking-widest text-xs">
                {isLoading ? 'Processing Signal...' : 'Finalize Trace'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
