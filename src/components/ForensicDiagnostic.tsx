"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FORENSIC_MATRIX } from '@/lib/forensicMatrix';

export default function ForensicDiagnostic() {
  const [step, setStep] = useState("loading");
  const [operator, setOperator] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code')?.trim().toUpperCase();

      if (!code) {
        setStep("invalid");
        return;
      }

      // STEP 1: Fetch operator only (No joins, no broken bridges)
      const { data: op, error: opError } = await supabase
        .from('operators')
        .select('*')
        .eq('access_code', code)
        .single();

      if (opError || !op) {
        // Character Swap Fallback (0 vs O)
        const alt = code.includes('0') ? code.replace(/0/g, 'O') : code.replace(/O/g, '0');
        const { data: retry } = await supabase
          .from('operators')
          .select('*')
          .eq('access_code', alt)
          .single();
        
        if (!retry) {
          setStep("invalid");
          return;
        }
        await enrichAndSetup(retry);
      } else {
        await enrichAndSetup(op);
      }
    };

    const enrichAndSetup = async (op: any) => {
      // STEP 2: Fetch the group separately
      const { data: group } = await supabase
        .from('diagnostic_groups')
        .select('org_name')
        .eq('id', op.group_id)
        .single();

      const enriched = { ...op, diagnostic_groups: group };
      const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
      
      setOperator(enriched);
      setQuestions(filtered);
      setStep("intro");
    };

    init();
  }, []);

  if (step === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic animate-pulse">ESTABLISHING_HANDSHAKE...</div>;
  if (step === "invalid") return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono border-2 border-red-600 p-12 text-center uppercase tracking-widest">Unauthorized_Node</div>;

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl">
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4">
          NODE_AUTHORIZED: {operator?.persona_type}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter leading-none">Protocol_Initialized</h1>
            <p className="mb-10 text-slate-400 text-sm uppercase italic">
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
        
        {/* Placeholder for the rest of the UI */}
      </div>
    </div>
  );
}
