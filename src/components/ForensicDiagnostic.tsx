"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';
import { Fingerprint, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

interface Props {
  accessCode: string | null;
}

export default function ForensicDiagnostic({ accessCode }: Props) {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const verifyNode = async () => {
      if (!accessCode) {
        setStep("invalid");
        return;
      }

      // Brute-force handshake: try exact first, then fallback to character swaps
      const tryFetch = async (target: string) => {
        const { data } = await supabase
          .from('operators')
          .select('*, diagnostic_groups(org_name)')
          .eq('access_code', target)
          .single();
        return data;
      };

      let op = await tryFetch(accessCode);
      // Fallback for character confusion if the first attempt failed
      if (!op) op = await tryFetch(accessCode.replace(/O/g, "0")); 

      if (!op) {
        setStep("invalid");
        return;
      }

      // Check if node is already completed
      if (op.status?.toLowerCase() === 'completed') {
        setOperator(op);
        setStep("finalized");
      } else {
        const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
        setOperator(op);
        setQuestions(filtered);
        setStep("intro");
      }
    };

    verifyNode();
  }, [accessCode]);

  // ... (Keep your existing render logic for Step === "loading", "invalid", "finalized", and "intro")
  // Ensure "invalid" step displays the accessCode for your debugging
  if (step === "invalid") return (
    <div className="min-h-screen bg-black flex items-center justify-center p-12 text-center text-white border-2 border-red-600 font-mono uppercase">
      Unauthorized_Node: {accessCode || "SIGNAL_LOST"}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      {/* Existing UI logic goes here */}
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl">
        <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter">Protocol_Initialized</h1>
        <p className="text-slate-400 mb-8 uppercase text-xs italic">{operator?.diagnostic_groups?.org_name}</p>
        <button onClick={() => setStep("diagnostic")} className="w-full py-6 bg-red-600 font-black uppercase tracking-widest italic">Start_Node_Audit</button>
      </div>
    </div>
  );
}
