import React, { useState } from 'react';
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard';
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit';
import { ShieldAlert, ArrowRight, Shield, Users, CheckCircle, Play, Mail } from 'lucide-react';
import { InMemoryCalculatedMetrics } from '../../types/forensicRuntime';

type FunnelPillar = 'IGF' | 'AVS' | 'HAI';
type PersonaKey = 'EXECUTIVE' | 'TECH_MGMT' | 'OPS_MGMT' | 'SYSTEM_USER';

interface TriangulationState {
  companyName: string;
  pillar: FunnelPillar;
  emails: Record<PersonaKey, string>;
  completions: Record<PersonaKey, boolean>;
  responses: Record<PersonaKey, Record<string, string>>;
}

export default function ForensicEngineRoot() {
  const [viewState, setViewState] = useState<'INTAKE' | 'HUB' | 'WIZARD' | 'COCKPIT'>('INTAKE');
  const [companyName, setCompanyName] = useState('');
  const [activePillar, setActivePillar] = useState<FunnelPillar>('IGF');
  
  const [emails, setEmails] = useState<Record<PersonaKey, string>>({
    EXECUTIVE: '',
    TECH_MGMT: '',
    OPS_MGMT: '',
    SYSTEM_USER: ''
  });

  const [triangulation, setTriangulation] = useState<TriangulationState | null>(null);
  const [activePersona, setActivePersona] = useState<PersonaKey | null>(null);
  const [inputError, setInputError] = useState('');

  // Refinement 3: Demo Mode Injector for Sales Optimization
  const handleLoadDemoParameters = () => {
    setCompanyName('METRIC_DRIFT_CORP');
    setEmails({
      EXECUTIVE: 'executive-office@metricdrift.com',
      TECH_MGMT: 'engineering-lead@metricdrift.com',
      OPS_MGMT: 'operations-director@metricdrift.com',
      SYSTEM_USER: 'platform-operator@metricdrift.com'
    });
    setActivePillar('IGF');
    setInputError('');
  };

  const handleInitializeTriangulation = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedInput = companyName.trim().toUpperCase();
    
    if (!sanitizedInput) {
      setInputError('CRITICAL INPUT EXCEPTION: TARGET COMPLIANCE SPECIFICATION REQUIRES ENTITY CODE');
      return;
    }
    if (!emails.EXECUTIVE || !emails.TECH_MGMT || !emails.OPS_MGMT || !emails.SYSTEM_USER) {
      setInputError('DISTRIBUTION ERROR: ALL FOUR PERSISTENT PERSONA EMAIL PATHS MANDATORY');
      return;
    }
    
    setInputError('');
    
    setTriangulation({
      companyName: sanitizedInput,
      pillar: activePillar,
      emails: { ...emails },
      completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false },
      responses: { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} }
    });
    setViewState('HUB');
  };

  const handleLaunchPersonaWizard = (persona: PersonaKey) => {
    setActivePersona(persona);
    setViewState('WIZARD');
  };

  const handlePersonaAnswersSaved = (personaAnswers: Record<string, string>) => {
    if (!triangulation || !activePersona) return;

    const updatedState = { ...triangulation };
    updatedState.responses[activePersona] = personaAnswers;
    updatedState.completions[activePersona] = true;

    setTriangulation(updatedState);
    setActivePersona(null);
    setViewState('HUB');
  };

  const allPersonasComplete = triangulation 
    ? Object.values(triangulation.completions).every(status => status === true)
    : false;

  return (
    <div className="bg-black min-h-screen text-zinc-100 font-mono flex flex-col justify-center items-center py-12 px-4 selection:bg-red-600 selection:text-white">
      
      {/* CASE 1: MASTER SETUP SCREEN WITH DEMO ACCELERATOR */}
      {viewState === 'INTAKE' && (
        <div className="w-full max-w-lg border border-zinc-900 bg-zinc-950/40 p-8 text-left italic rounded-sm shadow-xl shadow-black/40">
          <div className="border-b border-zinc-900 pb-4 mb-6 flex items-center gap-3">
            <ShieldAlert size={20} className="text-red-500 animate-pulse shrink-0" />
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none">// QUAD-NODE ENGINE SETUP</h2>
              <span className="text-[9px] text-zinc-500 tracking-wider block mt-1">ZERO-DATABASE ZERO-TRUST EXPLORATION GATE</span>
            </div>
          </div>

          <form onSubmit={handleInitializeTriangulation} className="space-y-4 not-italic">
            <div>
              <label className="text-[10px] text-zinc-500 block font-black tracking-widest uppercase mb-1">// ENTITY ANALYSIS CODE</label>
              <input 
                type="text"
                autoComplete="off"
                placeholder="E.G., SIGMA_TIER_GLOBAL"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-sm px-4 py-3 text-xs text-white uppercase font-mono tracking-widest focus:outline-none focus:border-red-600 placeholder:text-zinc-700 transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-500 block font-black tracking-widest uppercase mb-2">// PRIMARY FUNNEL PILLAR STRATIFICATION</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'IGF', title: 'Compliance & Legal (IGF)', desc: 'Regulatory exposures & opaque decision metrics' },
                  { id: 'AVS', title: 'Technical Debt & Rework Tax (AVS)', desc: 'Wasted developer allocation & architecture drift' },
                  { id: 'HAI', title: 'Automation Bias & Fatigue (HAI)', desc: 'Alarm failures & unhedged balance-sheet profit leaks' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePillar(p.id as FunnelPillar)}
                    className={`w-full p-3 text-left border rounded-sm transition-all flex flex-col justify-center cursor-pointer ${
                      activePillar === p.id ? 'border-red-600 bg-red-950/10' : 'border-zinc-800 bg-black hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs font-black text-zinc-200">{p.title}</span>
                    <span className="text-[10px] text-zinc-500 font-sans mt-0.5 normal-case">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-zinc-900">
              <label className="text-[10px] text-zinc-500 block font-black tracking-widest uppercase mb-1">// ENTER ALIGNMENT VECTOR ROUTING PATHS</label>
              {Object.keys(emails).map((role) => (
                <div key={role}>
                  <span className="text-[9px] text-zinc-500 block mb-1 font-black tracking-widest">// {role.replace('_', ' ')} ENDPOINT</span>
                  <input 
                    type="email"
                    placeholder={`e.g., manager@domain.com`}
                    value={emails[role as PersonaKey]}
                    onChange={(e) => setEmails({ ...emails, [role]: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-sm px-3 py-2 text-xs text-zinc-300 font-mono tracking-wider focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              ))}
            </div>

            {inputError && (
              <span className="text-[9px] text-red-500 font-mono block font-bold uppercase tracking-wider">{inputError}</span>
            )}

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-zinc-100 text-black font-mono text-xs font-black py-4 uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Assemble Triangulation matrix <ArrowRight size={14}/>
              </button>

              <button
                type="button"
                onClick={handleLoadDemoParameters}
                className="w-full bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs font-black py-3 uppercase tracking-widest rounded-sm hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={12} /> Inject High-Exposure Demo Parameters
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CASE 2: CENTRAL COORDINATION OPERATOR HUB WITH PROGRESS OVERVIEW */}
      {viewState === 'HUB' && triangulation && (
        <div className="w-full max-w-2xl border border-zinc-900 bg-zinc-950/40 p-8 text-left rounded-sm shadow-2xl">
          <div className="border-b border-zinc-900 pb-4 mb-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Users size={18} className="text-red-500" />
              <div>
                <h2 className="text-xs font-black text-white uppercase tracking-widest leading-none">// INFRASTRUCTURE TRIANGULATION MONITOR</h2>
                <span className="text-[9px] text-zinc-500 block mt-1">TARGET COMPANY ID: {triangulation.companyName} // PILLAR STREAM: {triangulation.pillar}</span>
              </div>
            </div>
          </div>

          {/* Refinement 1: Floating Progress Dashboard Component */}
          <div className="bg-black border border-zinc-900 p-4 mb-6 rounded-sm">
            <span className="text-[9px] text-zinc-500 block font-black tracking-widest uppercase mb-3">// REAL-TIME MATRIX COMPLETION POSTURE</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(Object.keys(triangulation.completions) as PersonaKey[]).map((persona) => {
                const completed = triangulation.completions[persona];
                return (
                  <div key={persona} className="border border-zinc-950 bg-zinc-950/40 p-3 rounded-xs text-center flex flex-col items-center justify-center min-h-[64px]">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-tight block mb-1 font-mono font-bold leading-none">{persona.replace('_', ' ')}</span>
                    {completed ? (
                      <CheckCircle size={14} className="text-green-500 mt-1" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-zinc-900 border-2 border-zinc-700 animate-pulse mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PERSISTENT NODE ACTIONS MATRIX LOOP */}
          <div className="space-y-3">
            {(Object.keys(triangulation.emails) as PersonaKey[]).map((persona) => {
              const isDone = triangulation.completions[persona];
              return (
                <div key={persona} className="border border-zinc-900 bg-black p-4 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-black text-white uppercase tracking-wider">{persona.replace('_', ' ')} STREAM</span>
                    <span className="text-[10px] text-zinc-500 block font-mono mt-0.5">{triangulation.emails[persona]}</span>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Refinement 2: Native Mailto Out-of-Band Crisis Reminders */}
                    {!isDone && (
                      <button
                        onClick={() => {
                          const email = triangulation.emails[persona];
                          const subject = `CRITICAL ACTION REQUIRED: Complete Assessment for ${triangulation.companyName}`;
                          const body = `Team,\n\nYour specific organizational vantage point is required to map our unhedged exposure under the ${triangulation.pillar} framework for ${triangulation.companyName}.\n\nPlease synchronize inputs directly with our account architect at your earliest convenience.\n\nSecure Session Access Port: ${window.location.href}\n\nEncryption Protocol Verified: Pure Client-Side In-Memory Sandbox`;
                          window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                        className="text-[9px] text-zinc-500 font-bold hover:text-red-400 transition-colors uppercase tracking-widest flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
                      >
                        <Mail size={12}/> Trigger Nudge
                      </button>
                    )}

                    <button
                      onClick={() => handleLaunchPersonaWizard(persona)}
                      className={`px-4 py-2 text-[10px] uppercase tracking-widest font-black rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                        isDone ? 'bg-zinc-900 text-zinc-500 hover:text-white' : 'bg-zinc-100 text-black hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      {isDone ? 'Override Matrix' : 'Open Posture'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest">// SECURE GATEWAY UNLOCK MATRIX DEPENDENCY</span>
            <button
              onClick={() => setViewState('COCKPIT')}
              disabled={!allPersonasComplete}
              className={`w-full sm:w-auto px-6 py-4 text-xs font-black uppercase tracking-widest rounded-sm transition-all ${
                allPersonasComplete
                  ? 'bg-red-600 text-white hover:bg-white hover:text-black cursor-pointer shadow-lg shadow-red-900/10'
                  : 'bg-zinc-950 text-zinc-700 border border-zinc-900 cursor-not-allowed'
              }`}
            >
              Compile Triangulated Cockpit
            </button>
          </div>
        </div>
      )}

      {/* CASE 3: DIAGNOSTIC MATRIX ENGINE BLOCK */}
      {viewState === 'WIZARD' && triangulation && activePersona && (
        <ForensicDiagnosticWizard 
          companyName={`${triangulation.companyName}::${activePersona}`}
          activePillar={triangulation.pillar}
          onCalculated={() => {
            if (typeof window !== 'undefined') {
              const cachedAnswers = JSON.parse(window.sessionStorage.getItem(`bmr_wizard_state_cache`) || '{}');
              handlePersonaAnswersSaved(cachedAnswers);
            } else {
              handlePersonaAnswersSaved({});
            }
          }} 
        />
      )}

      {/* CASE 4: PREMIUM ALIGNED DASHBOARD VIEWS CONTAINER */}
      {viewState === 'COCKPIT' && triangulation && (
        <ForensicCommandCockpit 
          companyName={triangulation.companyName} 
          onReset={handleSystemReset} 
        />
      )}

    </div>
  );
}
