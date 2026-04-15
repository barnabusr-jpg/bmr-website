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
      // Don't fire the query until the Page hands us the code
      if (!accessCode) return;

      const { data: op, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', accessCode)
        .single();

      if (error || !op) {
        // QUICK FALLBACK: Try character swap (0 vs O) if first fetch failed
        const alt = accessCode.includes('0') ? accessCode.replace(/0/g, 'O') : accessCode.replace(/O/g, '0');
        const { data: retry } = await supabase
          .from('operators')
          .select('*, diagnostic_groups(org_name)')
          .eq('access_code', alt)
          .single();
        
        if (!retry) { 
          setStep("invalid"); 
          return; 
        }
        setupNode(retry);
      } else {
        setupNode(op);
      }
    };

    const setupNode = (op: any) => {
      // Match the persona_type (e.g. TECHNICAL) to the matrix
      const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
      setOperator(op);
      setQuestions(filtered);
      setStep("intro");
    };

    init();
  }, [accessCode]);

  // --- RENDERING PROTOCOLS ---

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic animate-pulse">
        ESTABLISHING_SECURE_HANDSHAKE...
      </div>
    );
  }

  if (step === "invalid") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono border-2 border-red-600 p-12 text-center">
        <div>
          <h1 className="text-2xl font-black mb-4 uppercase">Unauthorized_Node</h1>
          <p className="text-slate-500 text-xs">Ledger Rejection: {accessCode}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl">
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4">
          NODE_AUTHORIZED: {operator?.persona_type}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter leading-none">Protocol_Initialized</h1>
            <p className="mb-10 text-slate-400 leading-relaxed text-sm uppercase italic">
              Authenticated for: {operator?.diagnostic_groups?.org_name || "BMR_SECURE_CLIENT"}
            </p>
            <button 
              onClick={() => setStep("diagnostic")} 
              className="w-full py-6 bg-red-600 text-white font-black uppercase italic tracking-[0.4em] hover:bg-white hover:text-black transition-all"
            >
              Start_Node_Audit
            </button>
          </div>
        )}

        {/* Diagnostic question rendering will go here once the handshake is proven */}
      </div>
    </div>
  );
}
