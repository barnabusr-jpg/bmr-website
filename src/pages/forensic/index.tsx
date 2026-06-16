import React, { useState, useEffect, useMemo } from 'react';
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard';
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit';
import { ShieldAlert, ArrowRight, Shield, Users, CheckCircle, Play, Mail, Lock, Building } from 'lucide-react';

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
  
  // State-backed security variables to prevent Vercel hydration overrides
  const [authorizedAdmin, setAuthorizedAdmin] = useState<boolean | null>(null);

  const [emails, setEmails] = useState<Record<PersonaKey, string>>({
    EXECUTIVE: '',
    TECH_MGMT: '',
    OPS_MGMT: '',
    SYSTEM_USER: ''
  });

  const [triangulation, setTriangulation] = useState<TriangulationState | null>(null);
  const [activePersona, setActivePersona] = useState<PersonaKey | null>(null);
  const [inputError, setInputError] = useState('');

  // Securely intercept parameters inside an active client mount hook
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const authVal = params.get('auth');
      const pillarParam = params.get('pillar') as FunnelPillar;
      const entityParam = params.get('entity');

      // Update validation parameters state-dependently
      const isAdminAuthenticated = (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true');
      setAuthorizedAdmin(isAdminAuthenticated);

      if (pillarParam && ['IGF', 'AVS', 'HAI'].includes(pillarParam)) {
        setActivePillar(pillarParam);
      }
      if (entityParam) {
        setCompanyName(entityParam.toUpperCase());
      }
    }
  }, []);

  const handleLoadDemoParameters = () => {
    setCompanyName('METRIC_DRIFT_CORP');
    setEmails({
      EXECUTIVE: 'executive-office@metricdrift.com',
      TECH_MGMT: 'engineering-lead@metricdrift.com',
      OPS_MGMT: 'operations-director@metricdrift.com',
      SYSTEM_USER: 'platform-operator@metricdrift.com'
    });
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

  const handleSystemReset = () => {
    setCompanyName('');
    setEmails({ EXECUTIVE: '', TECH_MGMT: '', OPS_MGMT: '', SYSTEM_USER: '' });
    setTriangulation(null);
    setActivePersona(null);
    setViewState('INTAKE');
  };

  const getPillarNodeDetails = () => {
    if (activePillar === 'AVS') return {
      title: "PIPELINE DRIFT & REWORK TAX NODE (AVS)",
      exposure: "Quantifies silent schema fractures and engineering budget drain across systems.",
      metric: "Avg. Loss: $425,000 to $637,500 per 100 deployments due to unhedged architectural drift."
    };
    if (activePillar === 'HAI') return {
      title: "AUTOMATION BIAS & ALARM FATIGUE NODE (HAI)",
      exposure: "Exposes critical downstream model anomalies and balance-sheet structural profit leakage.",
      metric: "Avg. Loss: $270,000 to $430,000 due to telemetry alert blindness."
    };
    return {
      title: "COMPLIANCE & REGULATORY EXPOSURE NODE (IGF)",
      exposure: "Exposes opaque decision paths carrying severe statutory liabilities under global regulatory frameworks.",
      metric: "Avg. Statutory Risk: Up to €20M or 4% of global turnover under unchecked validation trails."
    };
  };

  // 1. Loading Phase: Avoid flashing wrong views before query parsing finishes
  if (authorizedAdmin === null) {
    return (
      <div className="bg-black min-h-screen text-zinc-500 font-mono flex items-center justify-center">
        <span className="text-xs tracking-widest animate-pulse">// AUTHORIZING SECURITY PROTOCOLS...</span>
      </div>
    );
  }

  // 2. Client Paywall Gate: Rendered explicitly if auth parameters fail validation
  if (authorizedAdmin === false) {
    return (
      <div className="bg-black min-h-screen text-zinc-100 flex flex-col justify-center items-center py-12 px-4 selection:bg-red-600 selection:text-white">
        <div className="w-full max-w-xl border border-zinc-900 bg-zinc-950/30 p-8 text-left rounded-sm shadow-2xl">
          
          <div className="border-b border-zinc-900 pb-5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-red-500 shrink-0" />
              <div className="font-mono">
                <h2 className="text-xs font-black text-white uppercase tracking-widest leading-none">// SECURE GATEWAY ENFORCED</h2>
                <span className="text-[9px] text-zinc-500 tracking-wider block mt-1 uppercase">ORGANIZATIONAL SUITE LICENSE REQUIRED</span>
              </div>
            </div>
            <span className="font-mono text-[9px] font-black bg-red-950 text-red-500 border border-red-900 px-2 py-0.5 rounded-xs tracking-widest uppercase">LOCKED</span>
          </div>

          <div className="space-y-6">
            <div className="bg-black border border-zinc-900 p-6 rounded-sm">
              <span className="font-mono text-[9px] text-zinc-500 block font-black tracking-widest uppercase mb-1">// SYSTEM DETECTED ASSESSMENT SECTOR</span>
              <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider mb-2">{getPillarNodeDetails().title}</h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed tracking-normal font-normal mb-4">
                {getPillarNodeDetails().exposure}
              </p>
              <div className="border-t border-zinc-900 pt-4 flex items-center gap-2 text-red-500 font-mono text-[10px] font-black tracking-widest uppercase">
                <ShieldAlert size={12} className="shrink-0" /> {getPillarNodeDetails().metric}
              </div>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/60 p-6 rounded-sm flex items-start gap-4">
              <Building size={20} className="text-zinc-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs font-black text-zinc-300 uppercase tracking-widest mb-2">Administrative Access Required</h4>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed tracking-normal font-normal">
                  This triangulated assessment stream can only be authorized and initialized by a licensed administrator. Please contact your organization's workspace system supervisor to request access links for your assigned node endpoints.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 font-mono">
              <a 
                href="/dashboard"
                className="w-full bg-zinc-100 text-black text-xs font-black py-4 uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 text-center cursor-pointer shadow-md"
              >
                Return to Master Workspace Dashboard <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 3. Authorized View: Safely unlocked for validated admin states
  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans tracking-tighter text-left uppercase font-black overflow-x-hidden flex flex-col justify-center items-center py-12 px-4 selection:bg-red-600 selection:text-white italic">
      
      {viewState === 'INTAKE' && (
        <div className="w-full max-w-lg border border-slate-900 bg-slate-950/40 p-10 text-left rounded-sm shadow-2xl shadow-black/40 backdrop-blur-md">
          <div className="border-b border-slate-900 pb-5 mb-8 flex items-center gap-3">
            <ShieldAlert size={24} className="text-red-600 animate-pulse shrink-0" />
            <div>
              {/* 🎯 BUMPED HEADER: Matching dashboard row title formatting weights */}
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none font-sans">// QUAD-NODE ENGINE SETUP</h2>
              <span className="text-[9px] font-mono font-black tracking-widest uppercase block mt-2 text-red-500 not-italic">// PRIVILEGED SYSTEM SPACE // SECURE RUNTIME CONTROL</span>
            </div>
          </div>

          <form onSubmit={handleInitializeTriangulation} className="space-y-6 not-italic font-mono">
            <div>
              <label className="text-[10px] text-slate-500 block font-black tracking-widest uppercase mb-2">// ENTITY ANALYSIS CODE</label>
              <input 
                type="text"
                autoComplete="off"
                placeholder="E.G., SIGMA_TIER_GLOBAL"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-black border border-slate-800 p-4 text-sm text-white uppercase tracking-widest focus:outline-none focus:border-red-600 placeholder:text-zinc-800 transition-colors rounded-xs italic font-black"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block font-black tracking-widest uppercase mb-2">// ACTIVE PRESCRIBED PILLAR SECTOR</label>
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
                    className={`w-full p-4 text-left border rounded-xs transition-all flex flex-col justify-center cursor-pointer ${
                      activePillar === p.id ? 'border-red-600 bg-red-950/10' : 'border-slate-800 bg-black hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-200 tracking-wider uppercase italic">{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-900">
              <label className="text-[10px] text-slate-500 block font-black tracking-widest uppercase mb-2">// ASSIGN VECTOR TARGET ROLES</label>
              {Object.keys(emails).map((role) => (
                <div key={role}>
                  <span className="text-[9px] text-slate-600 block mb-1.5 font-black tracking-widest uppercase">// {role.replace('_', ' ')} ENDPOINT NODE</span>
                  <input 
                    type="email"
                    placeholder={`e.g., manager@domain.com`}
                    value={emails[role as PersonaKey]}
                    onChange={(e) => setEmails({ ...emails, [role]: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-900 rounded-sm px-4 py-3.5 text-xs text-zinc-300 font-mono tracking-wider focus:outline-none focus:border-red-600 transition-colors uppercase"
                  />
                </div>
              ))}
            </div>

            {inputError && (
              <span className="text-[10px] text-red-500 font-mono block font-black uppercase tracking-wider">{inputError}</span>
            )}

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                className="w-full bg-zinc-100 text-black font-sans text-sm font-black py-4 uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md italic"
              >
                Assemble Triangulation Matrix <ArrowRight size={14}/>
              </button>

              <button
                type="button"
                onClick={handleLoadDemoParameters}
                className="w-full bg-zinc-900 text-zinc-400 border border-slate-800 font-mono text-xs font-black py-3.5 uppercase tracking-widest rounded-sm hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer tracking-wider"
              >
                <Play size={12} /> Inject High-Exposure Demo Parameters
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 📊 THE HUB MONITOR VIEW — TEXT SCALE ALIGNED TO LEDGER */}
      {viewState === 'HUB' && triangulation && (
        <div className="w-full max-w-2xl border border-slate-900 bg-slate-950/40 p-10 text-left rounded-sm shadow-2xl">
          <div className="border-b border-slate-900 pb-4 mb-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-red-500" />
              <div>
                {/* 🎯 BUMPED HEADER */}
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none font-sans">// INFRASTRUCTURE TRIANGULATION MONITOR</h2>
                <span className="text-[9px] text-zinc-500 block mt-2 tracking-widest uppercase">// TARGET COMPANY ID: {triangulation.companyName} // PILLAR STREAM: {triangulation.pillar}</span>
              </div>
            </div>
          </div>

          <div className="bg-black border border-slate-900 p-5 mb-6 rounded-xs">
            <span className="text-[10px] font-mono text-slate-500 block font-black tracking-widest uppercase mb-4">// REAL-TIME MATRIX COMPLETION POSTURE</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(Object.keys(triangulation.completions) as PersonaKey[]).map((persona) => {
                const completed = triangulation.completions[persona];
                return (
                  <div key={persona} className="border border-slate-900 bg-zinc-950/40 p-4 rounded-sm text-center flex flex-col items-center justify-center min-h-[74px]">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-black leading-none">{persona.replace('_', ' ')}</span>
                    {completed ? (
                      <CheckCircle size={16} className="text-green-500 mt-1" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-slate-900 border-2 border-red-600 animate-pulse mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {(Object.keys(triangulation.emails) as PersonaKey[]).map((persona) => {
              const isDone = triangulation.completions[persona];
              return (
                <div key={persona} className="border border-slate-900 bg-black p-5 rounded-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    {/* 🎯 BUMPED HEADER */}
                    <span className="text-lg font-black text-white uppercase tracking-wider font-sans italic">{persona.replace('_', ' ')} TELEMETRY STREAM</span>
                    <span className="text-[11px] text-zinc-500 block font-mono mt-1 tracking-wide">{triangulation.emails[persona]}</span>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {!isDone && (
                      <button
                        onClick={() => {
                          const email = triangulation.emails[persona];
                          const subject = `CRITICAL ACTION REQUIRED: Complete Assessment for ${triangulation.companyName}`;
                          const body = `Team,\n\nYour specific vantage point is required to complete our assessment matrix under the ${triangulation.pillar} framework for ${triangulation.companyName}.\n\nPlease access the gateway platform at your convenience.\n\nSecure Terminal Link: ${window.location.origin}${window.location.pathname}?pillar=${triangulation.pillar}`;
                          window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                        className="text-[10px] text-zinc-500 font-black hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
                      >
                        <Mail size={12}/> Trigger Nudge
                      </button>
                    )}

                    <button
                      onClick={() => handleLaunchPersonaWizard(persona)}
                      className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-black rounded-xs transition-all flex items-center gap-2 cursor-pointer ${
                        isDone ? 'bg-slate-900 text-slate-500 hover:text-white border border-slate-800' : 'bg-zinc-100 text-black hover:bg-red-600 hover:text-white'
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
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-black">// SECURE GATEWAY UNLOCK MATRIX DEPENDENCY</span>
            <button
              onClick={() => setViewState('COCKPIT')}
              disabled={!allPersonasComplete}
              className={`w-full sm:w-auto px-6 py-4 text-xs font-black uppercase tracking-widest rounded-xs transition-all font-sans italic text-sm ${
                allPersonasComplete
                  ? 'bg-red-600 text-white hover:bg-white hover:text-black cursor-pointer shadow-lg'
                  : 'bg-slate-950 text-slate-700 border border-slate-900 cursor-not-allowed'
              }`}
            >
              Compile Triangulated Cockpit
            </button>
          </div>
        </div>
      )}

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

      {viewState === 'COCKPIT' && triangulation && (
        <ForensicCommandCockpit 
          companyName={triangulation.companyName} 
          onReset={handleSystemReset} 
        />
      )}

    </div>
  );
}
