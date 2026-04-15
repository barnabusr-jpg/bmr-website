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

      // THE DIRECT FETCH
      const { data, error } = await supabase
        .from('operators')
        .select('*, diagnostic_groups(org_name)')
        .eq('access_code', code)
        .single();

      if (error) {
        // THIS IS THE TRUTH SEEKER:
        // If this pops up, read the message. 
        // "PGRST116" means the code isn't in the DB.
        // "42501" means RLS is blocking you.
        alert(`DB_REPORT: ${error.message} | Code: ${error.code}`);
        setStep("invalid");
        return;
      }

      if (data) {
        const filtered = FORENSIC_MATRIX.filter(q => q.lens === data.persona_type);
        setOperator(data);
        setQuestions(filtered);
        setStep("intro");
      }
    };

    init();
  }, []);

  if (step === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono">ESTABLISHING_HANDSHAKE...</div>;
  
  if (step === "invalid") return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono border-2 border-red-600 p-12 text-center">
      <h1 className="text-2xl font-black mb-4 uppercase">Unauthorized_Node</h1>
      <p className="text-slate-500 text-xs italic uppercase">Check terminal for ledger rejection.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full border border-red-900/30 p-16 bg-slate-950 shadow-2xl">
        <div className="text-[10px] text-red-600 mb-10 tracking-[0.3em] font-black uppercase border-b border-red-900/20 pb-4">
          NODE_AUTHORIZED: {operator?.persona_type}
        </div>
        
        {step === "intro" && (
          <div className="animate-in fade-in duration-1000">
            <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter">Protocol_Initialized</h1>
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
      </div>
    </div>
  );
}
