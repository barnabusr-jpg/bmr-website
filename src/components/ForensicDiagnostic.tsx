"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';

export default function ForensicDiagnostic({ accessCode }: { accessCode: string | null }) {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      if (!accessCode) return;

      // STEP 1: Find the operator
      const { data: op, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', accessCode)
        .single();

      if (error || !op) {
        // STEP 2: Character Swap Fallback (0 vs O)
        const alt = accessCode.includes('0') ? accessCode.replace(/0/g, 'O') : accessCode.replace(/O/g, '0');
        const { data: retry } = await supabase
          .from('operators')
          .select('*, diagnostic_groups(org_name)')
          .eq('access_code', alt)
          .single();
        
        if (!retry) { setStep("invalid"); return; }
        setup(retry);
      } else {
        setup(op);
      }
    };

    const setup = (op: any) => {
      const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
      setOperator(op);
      setQuestions(filtered);
      setStep("intro");
    };

    init();
  }, [accessCode]);

  if (step === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic">ESTABLISHING_HANDSHAKE...</div>;
  if (step === "invalid") return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono border-2 border-red-600 uppercase">Unauthorized_Node: {accessCode}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center text-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950">
        <h1 className="text-4xl font-black italic mb-4 uppercase">Protocol_Initialized</h1>
        <p className="mb-8 text-slate-500 text-xs">ORG: {operator?.diagnostic_groups?.org_name || "BMR_SECURE_CLIENT"}</p>
        <button onClick={() => setStep("diagnostic")} className="w-full py-6 bg-red-600 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Start_Node_Audit</button>
      </div>
    </div>
  );
}"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';

export default function ForensicDiagnostic({ accessCode }: { accessCode: string | null }) {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      if (!accessCode) return;

      // STEP 1: Find the operator
      const { data: op, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', accessCode)
        .single();

      if (error || !op) {
        // STEP 2: Character Swap Fallback (0 vs O)
        const alt = accessCode.includes('0') ? accessCode.replace(/0/g, 'O') : accessCode.replace(/O/g, '0');
        const { data: retry } = await supabase
          .from('operators')
          .select('*, diagnostic_groups(org_name)')
          .eq('access_code', alt)
          .single();
        
        if (!retry) { setStep("invalid"); return; }
        setup(retry);
      } else {
        setup(op);
      }
    };

    const setup = (op: any) => {
      const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
      setOperator(op);
      setQuestions(filtered);
      setStep("intro");
    };

    init();
  }, [accessCode]);

  if (step === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic">ESTABLISHING_HANDSHAKE...</div>;
  if (step === "invalid") return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono border-2 border-red-600 uppercase">Unauthorized_Node: {accessCode}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center text-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950">
        <h1 className="text-4xl font-black italic mb-4 uppercase">Protocol_Initialized</h1>
        <p className="mb-8 text-slate-500 text-xs">ORG: {operator?.diagnostic_groups?.org_name || "BMR_SECURE_CLIENT"}</p>
        <button onClick={() => setStep("diagnostic")} className="w-full py-6 bg-red-600 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Start_Node_Audit</button>
      </div>
    </div>
  );
}
