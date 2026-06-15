import React, { useState } from 'react';
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard';
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit';
import { Shield, ShieldAlert, ArrowRight, Play } from 'lucide-react';
import { InMemoryCalculatedMetrics } from '../../types/forensicRuntime';

export default function ForensicEngineRoot() {
  const [viewState, setViewState] = useState<'INTAKE' | 'WIZARD' | 'COCKPIT'>('INTAKE');
  const [companyName, setCompanyName] = useState('');
  const [calculatedMetrics, setCalculatedMetrics] = useState<InMemoryCalculatedMetrics | null>(null);
  const [inputError, setInputError] = useState('');

  const handleStartIngestion = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedInput = companyName.trim().toUpperCase();
    
    if (!sanitizedInput) {
      setInputError('CRITICAL INPUT EXCEPTION: SYSTEM REQUIREMENT SPECIFICATION MANDATES VALID ENTITY CODE');
      return;
    }
    
    setInputError('');
    setCompanyName(sanitizedInput);
    setViewState('WIZARD');
  };

  const handleCalculationComplete = (metrics: InMemoryCalculatedMetrics) => {
    setCalculatedMetrics(metrics);
    setViewState('COCKPIT');
  };

  const handleSystemReset = () => {
    // Purge temporary browser memory states safely upon restart request
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(`bmr_runtime_${companyName}`);
    }
    setCalculatedMetrics(null);
    setCompanyName('');
    setViewState('INTAKE');
  };

  return (
    <div className="bg-black min-h-screen text-zinc-100 font-mono flex flex-col justify-center items-center px-4 selection:bg-red-600 selection:text-white">
      
      {/* View Matrix Case Router */}
      {viewState === 'INTAKE' && (
        <div className="w-full max-w-md border border-zinc-900 bg-zinc-950/40 p-8 text-left italic rounded-sm shadow-xl shadow-black/40">
          
          {/* Intake Branding Array Header */}
          <div className="border-b border-zinc-900 pb-4 mb-6 flex items-center gap-3">
            <ShieldAlert size={20} className="text-red-500 animate-pulse shrink-0" />
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none">// FORENSIC INITIALIZATION</h2>
              <span className="text-[9px] text-zinc-500 tracking-wider block mt-1">ZERO-DATABASE STANDALONE APP TIER</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 font-sans normal-case leading-relaxed font-normal mb-6">
            Welcome to the Level 3 High-Density Risk Ingestion Scanner. This program analyzes multi-node system postures out-of-band to map corporate balance-sheet exposure values.
          </p>

          {/* Local Form State Capture Engine */}
          <form onSubmit={handleStartIngestion} className="space-y-4 not-italic">
            <div>
              <label htmlFor="companyNameInput" className="text-[10px] text-zinc-500 block font-black tracking-widest uppercase mb-1 font-mono">// TARGET CORPORATION ENTITY CODE</label>
              <input 
                id="companyNameInput"
                type="text"
                autoComplete="off"
                placeholder="E.G., ACME_CORP_LEGAL"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-sm px-4 py-3 text-xs text-white uppercase font-mono tracking-widest focus:outline-none focus:border-red-600 placeholder:text-zinc-700 placeholder:italic transition-colors"
              />
              {inputError && (
                <span className="text-[9px] text-red-500 font-mono block mt-1.5 font-bold uppercase tracking-wider">{inputError}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-100 text-black font-mono text-xs font-black py-4 uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/20"
            >
              Initialize System Posture Run <ArrowRight size={14}/>
            </button>
          </form>

          {/* Encryption Protocol Baseline Footer Notice */}
          <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center gap-2 text-[9px] text-zinc-600 font-mono not-italic uppercase tracking-widest">
            <Shield size={10} className="text-green-600" /> All operations isolated inside local browser runtime sandbox.
          </div>
        </div>
      )}

      {viewState === 'WIZARD' && (
        <ForensicDiagnosticWizard 
          companyName={companyName} 
          onCalculated={handleCalculationComplete} 
        />
      )}

      {viewState === 'COCKPIT' && (
        <ForensicCommandCockpit 
          companyName={companyName} 
          onReset={handleSystemReset} 
        />
      )}

    </div>
  );
}
