import React, { useState, useEffect, useMemo } from 'react'; 
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard'; 
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit'; 
import { ShieldAlert, ArrowRight, Shield, Users, CheckCircle, Play, Mail, Lock, Building } from 'lucide-react'; 
import { supabase } from '../../lib/supabaseClient'; 

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
  const [viewState, setViewState] = useState<'INTAKE' | 'HUB' | 'WIZARD' | 'COCKPIT' | 'THANK_YOU'>('INTAKE'); 
  const [companyName, setCompanyName] = useState(''); 
  const [activePillar, setActivePillar] = useState<FunnelPillar>('IGF'); 
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

  const [baseSecurePath, setBaseSecurePath] = useState('https://www.bmradvisory.co/forensic'); 

  const roleLabels: Record<string, string> = { 
    EXECUTIVE: 'Executive Leadership (Strategic Oversight Node)', 
    TECH_MGMT: 'Technical Management (Infrastructure & DevOps Node)', 
    OPS_MGMT: 'Operations Management (Workflow & Process Node)', 
    SYSTEM_USER: 'Core System Operator (Terminal Execution Node)' 
  }; 

  // 📡 REAL-TIME CROSS-TAB SYNC LISTENER
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (triangulation && e.key === `bmr_matrix_run_${triangulation.companyName}` && e.newValue) {
        setTriangulation(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [triangulation]);

  useEffect(() => { 
    if (typeof window !== 'undefined') { 
      try { 
        setBaseSecurePath(`${window.location.origin}${window.location.pathname}`); 

        const params = new URLSearchParams(window.location.search); 
        const authVal = params.get('auth'); 
        const pillarParam = params.get('pillar') as FunnelPillar; 
        const entityParam = params.get('entity') || params.get('org') || params.get('entity_code'); 
        const roleParam = params.get('role') as PersonaKey; 

        const isAdminAuthenticated = (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true'); 
        const isParticipantRoute = !!(roleParam && entityParam && pillarParam); 

        if (entityParam) { 
          const targetCompanyId = entityParam.toUpperCase().replace(/\s+/g, '_'); 
          const savedSession = window.localStorage.getItem(`bmr_matrix_run_${targetCompanyId}`); 
          if (savedSession) { 
            setTriangulation(JSON.parse(savedSession)); 
            if (!roleParam && isAdminAuthenticated) setViewState('HUB'); 
          } 
        } 

        // Strictly avoid evaluation routing collisions by isolating admin configs from parameters-driven user paths
        if (isAdminAuthenticated && !roleParam) { 
          setAuthorizedAdmin(true); 
           
          const cleanPillar = pillarParam?.toUpperCase(); 
          if (cleanPillar && ['IGF', 'AVS', 'HAI'].includes(cleanPillar)) { 
            setActivePillar(cleanPillar as FunnelPillar); 
          } else { 
            setActivePillar('IGF'); 
          } 

          if (entityParam) { 
            const formattedCode = decodeURIComponent(entityParam) 
              .trim() 
              .toUpperCase() 
              .replace(/\s+/g, '_'); 
            setCompanyName(formattedCode); 
          }  

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
          const filterIncomingEmail = (paramKey: string): string => { 
            const rawVal = params.get(paramKey); 
            if (!rawVal) return ""; 
            const cleanVal = decodeURIComponent(rawVal).trim(); 
            return emailRegex.test(cleanVal) ? cleanVal : ""; 
          }; 

          setEmails({ 
            EXECUTIVE: filterIncomingEmail('exec'), 
            TECH_MGMT: filterIncomingEmail('tech_mgmt'), 
            OPS_MGMT: filterIncomingEmail('ops_mgmt'), 
            SYSTEM_USER: filterIncomingEmail('sys_user') 
          }); 

        } else if (isParticipantRoute) { 
          setAuthorizedAdmin(true); 
          setActivePillar(['IGF', 'AVS', 'HAI'].includes(pillarParam?.toUpperCase()) ? pillarParam : 'IGF'); 
          setCompanyName(entityParam.toUpperCase().replace(/\s+/g, '_')); 
          setActivePersona(roleParam); 

          setTriangulation(prev => prev || { 
            companyName: entityParam.toUpperCase().replace(/\s+/g, '_'), 
            pillar: ['IGF', 'AVS', 'HAI'].includes(pillarParam?.toUpperCase()) ? pillarParam : 'IGF', 
            emails: { EXECUTIVE: '', TECH_MGMT: '', OPS_MGMT: '', SYSTEM_USER: '' }, 
            completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false }, 
            responses: { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} } 
          }); 

          setViewState('WIZARD'); 
        } else { 
          setAuthorizedAdmin(false); 
        } 
      } catch (e) { 
        console.error("Hydration parsing interrupted by security policy filters:", e); 
        setAuthorizedAdmin(false); 
      } 
    } 
  }, []); 

  const handleLoadDemoParameters = () => { 
    setCompanyName('MONDAY_MORNING_TEST'); 
    setEmails({ 
      EXECUTIVE: 'barnabusr@gmail.com', 
      TECH_MGMT: 'barnabusr@outlook.com', 
      OPS_MGMT: 'hello@bmradvisory.co', 
      SYSTEM_USER: 'barnabusr@outlook.com' 
    }); 
    setInputError(''); 
  }; 

  const handleInitializeTriangulation = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    const sanitizedInput = companyName.trim().toUpperCase().replace(/\s+/g, '_'); 
         
    if (!sanitizedInput) { 
      setInputError('CRITICAL INPUT EXCEPTION: TARGET COMPLIANCE SPECIFICATION REQUIRES ENTITY CODE'); 
      return; 
    } 
    if (!emails.EXECUTIVE || !emails.TECH_MGMT || !emails.OPS_MGMT || !emails.SYSTEM_USER) { 
      setInputError('DISTRIBUTION ERROR: ALL FOUR PERSISTENT PERSONA EMAIL PATHS MANDATORY'); 
      return; 
    } 
         
    setInputError(''); 
         
    const initialTriangulationState = { 
      companyName: sanitizedInput, 
      pillar: activePillar, 
      emails: { ...emails }, 
      completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false }, 
      responses: { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} } 
    }; 

    if (typeof window !== 'undefined') { 
      window.localStorage.setItem(`bmr_matrix_run_${sanitizedInput}`, JSON.stringify(initialTriangulationState)); 
    } 

    setTriangulation(initialTriangulationState); 
    setViewState('HUB'); 

    try { 
      await fetch('/api/send-triangulation', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          companyName: sanitizedInput, 
          activePillar: activePillar, 
          endpoints: emails, 
          originUrl: baseSecurePath 
        }), 
      }); 
    } catch (error) { 
      console.error("BACKGROUND AUTOMATION HANDLER DISPATCH EXCEPTION:", error); 
    } 
  }; 

  const handleLaunchPersonaWizard = (persona: PersonaKey) => { 
    setActivePersona(persona); 
    setViewState('WIZARD'); 
  }; 

  const handlePersonaAnswersSaved = async (personaAnswers: Record<string, string>) => { 
    if (!triangulation || !activePersona) return; 

    const updatedState = { ...triangulation }; 
    updatedState.responses[activePersona] = personaAnswers; 
    updatedState.completions[activePersona] = true; 

    if (typeof window !== 'undefined') { 
      window.localStorage.setItem(`bmr_matrix_run_${updatedState.companyName}`, JSON.stringify(updatedState)); 
    } 
     
    setTriangulation(updatedState); 

    try { 
      const personaToBackendKey = { 
        EXECUTIVE: "EXECUTIVE", 
        TECH_MGMT: "TECHNICAL", 
        OPS_MGMT: "MANAGERIAL", 
        SYSTEM_USER: "TECHNICAL" 
      }[activePersona]; 

      let updateQuery = supabase 
        .from("operators") 
        .update({ 
          survey_completed: true, 
          status: "COMPLETED" 
        }) 
        .eq("persona_type", personaToBackendKey); 

      const params = new URLSearchParams(window.location.search); 
      const currentPersonaEmail = params.get('email') || triangulation.emails[activePersona] || params.get('exec') || params.get('tech_mgmt') || params.get('ops_mgmt') || params.get('sys_user'); 
       
      if (currentPersonaEmail) { 
        updateQuery = updateQuery.eq("email", decodeURIComponent(currentPersonaEmail).trim()); 
      } 
       
      const { error } = await updateQuery; 
      if (error) throw error; 

      console.log(`[NETWORK SUCCESS] Database payload synchronized for role vector: ${activePersona}`); 
    } catch (dbError) { 
      console.error("[CRITICAL NODE OUTAGE] Sync to database aborted via network mutation failure:", dbError); 
    } 

    setActivePersona(null); 

    if (typeof window !== 'undefined') { 
      const currentParams = new URLSearchParams(window.location.search); 
       
      if (currentParams.get('role')) { 
        setViewState('THANK_YOU'); 
      } else { 
        setViewState('HUB'); 
      } 
    } else { 
      setViewState('HUB'); 
    } 
  }; 

  const allPersonasComplete = triangulation   
    ? Object.values(triangulation.completions).every(status => status === true) 
    : false; 

  const handleSystemReset = () => { 
    if (typeof window !== 'undefined' && triangulation) { 
      window.localStorage.removeItem(`bmr_matrix_run_${triangulation.companyName}`); 
    } 
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

  const alignedCockpitMetrics = useMemo(() => { 
    const isAVS = activePillar === 'AVS'; 
    return { 
      multiplier: isAVS ? 1.25 : 1.00, 
      complianceScore: isAVS ? 64 : 85, 
      annualSalaryLeakage: isAVS ? 4160000 : 87360, 
      unhedgedLegalExposure: isAVS ? 2070000 : 248400, 
      isTierThreeExposure: isAVS, 
      regulatoryAlertActive: true 
    }; 
  }, [activePillar]); 

  if (authorizedAdmin === null) { 
    return ( 
      <div className="bg-black min-h-screen text-zinc-500 font-mono flex items-center justify-center"> 
        <span className="text-xs tracking-widest animate-pulse">// AUTHORIZING SECURITY PROTOCOLS...</span> 
      </div> 
    ); 
  } 

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
            <span className="font-mono text-[9px] font-black bg-red-950 text-red-500 border border-red-900 px-2 py-0.5 rounded-xs tracking-widest uppercase">LOCKED</span> </div> 

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

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans tracking-tighter text-left uppercase font-black overflow-x-hidden flex flex-col justify-center items-center py-12 px-4 selection:bg-red-600 selection:text-white italic"> 
               
      {viewState === 'INTAKE' && ( 
        <div className="w-full max-w-lg border border-slate-900 bg-slate-950/40 p-10 text-left rounded-sm shadow-2xl shadow-black/40 backdrop-blur-md"> 
          <div className="border-b border-slate-900 pb-5 mb-8 flex items-center gap-3"> 
            <ShieldAlert size={24} className="text-red-600 animate-pulse shrink-0" /> 
            <div> 
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
                  { id: 'IGF', title: 'Compliance & Legal (IGF)' }, 
                  { id: 'AVS', title: 'Technical Debt & Rework Tax (AVS)' }, 
                  { id: 'HAI', title: 'Automation Bias & Fatigue (HAI)' } 
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
              {(Object.keys(emails) as PersonaKey[]).map((role) => ( 
                <div key={role}> 
                  <span className="text-[9px] text-slate-600 block mb-1.5 font-black tracking-widest uppercase">// {role.replace('_', ' ')} ENDPOINT NODE</span> 
                  <input       
                    type="email" 
                    placeholder={`e.g., manager@domain.com`} 
                    value={emails[role]} 
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
                className="w-full bg-zinc-100 text-black font-sans text-sm font-black py-4 uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 text-center cursor-pointer shadow-md italic" 
              > 
                Assemble Triangulation Matrix <ArrowRight size={14}/> 
              </button> 

              <button 
                type="button" 
                onClick={handleLoadDemoParameters} 
                className="w-full bg-zinc-900 text-zinc-400 border border-slate-800 font-mono text-xs font-black py-3.5 uppercase tracking-widest rounded-sm hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center gap-2 text-center cursor-pointer tracking-wider" 
              > 
                <Play size={12} /> Run Extended Staging Simulation 
              </button> 
            </div> 
          </form> 
        </div> 
      )} 

      {viewState === 'HUB' && triangulation && ( 
        <div className="w-full max-w-2xl border border-slate-900 bg-slate-950/40 p-10 text-left rounded-sm shadow-2xl"> 
          <div className="border-b border-slate-900 pb-4 mb-6 flex justify-between items-center"> 
            <div className="flex items-center gap-3"> 
              <Users size={20} className="text-red-500" /> 
              <div> 
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
              const cleanLabel = roleLabels[persona] || persona; 
              return ( 
                <div key={persona} className="border border-slate-900 bg-black p-5 rounded-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
                  <div> 
                    <span className="text-lg font-black text-white uppercase tracking-wider font-sans italic">{persona.replace('_', ' ')} TELEMETRY STREAM</span> 
                    <span className="text-[11px] text-zinc-500 block font-mono mt-1 tracking-wide">{triangulation.emails[persona]}</span> 
                  </div> 

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end"> 
                    {!isDone && ( 
                      <button 
                        onClick={() => { 
                          const email = triangulation.emails[persona]; 
                          const subject = `CRITICAL ACTION REQUIRED: Triangulation Matrix Initialization for ${triangulation.companyName}`; 
                          const body = `Team,\n\nYour specific vantage point is required to complete our assessment matrix under the ${triangulation.pillar} framework for ${triangulation.companyName}.\n\nPlease access your gateway slot to log workspace metrics.\n\nSecure Terminal Link: ${baseSecurePath}?pillar=${triangulation.pillar}&role=${persona}&org=${encodeURIComponent(triangulation.companyName)}&email=${encodeURIComponent(email)}`; 
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

          {/* FINAL ENGINE COMPILE ACTION */} 
          <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
            <div className="text-left">
              <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-black block">// SECURE GATEWAY UNLOCK MATRIX DEPENDENCY</span> 
              
              {/* ⚡ THE ADMINISTRATIVE BYPASS LINK */}
              {!allPersonasComplete && authorizedAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("CRITICAL OVERRIDE: Force aggregation loop compilation using currently validated data segments?")) {
                      setViewState('COCKPIT');
                    }
                  }}
                  className="text-[10px] text-red-500 font-mono font-black uppercase tracking-wider hover:text-white transition-colors bg-transparent border-0 p-0 mt-1 cursor-pointer underline block"
                >
                  // Force Administrative Override & Compile Partial Matrix
                </button>
              )}
            </div>

            <button 
              onClick={() => setViewState('COCKPIT')} 
              disabled={!allPersonasComplete} 
              className={`w-full sm:w-auto px-6 py-4 font-black uppercase tracking-widest rounded-xs transition-all font-sans italic text-sm ${ 
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
        <div>
          {/* Admin Context Return Control Header Strip */}
          <div className="w-full max-w-[1600px] mx-auto mb-4 px-10 no-print flex justify-start">
            <button
              type="button"
              onClick={handleSystemReset}
              className="border border-slate-800 bg-black text-zinc-400 hover:text-white hover:border-red-600 text-xs font-mono font-black px-6 py-3 uppercase tracking-widest transition-all cursor-pointer rounded-xs"
            >
              &larr; // Terminate Session & Return to Intake Control
            </button>
          </div>
          <ForensicCommandCockpit         
            companyName={triangulation.companyName} 
            sector="ENTERPRISE_SAAS"
            metrics={alignedCockpitMetrics}
          /> 
        </div>
      )} 

      {viewState === 'THANK_YOU' && (
        <div className="w-full max-w-md border border-slate-900 bg-slate-950/40 p-10 text-left rounded-sm shadow-2xl backdrop-blur-md italic font-sans">
          <div className="border-b border-slate-900 pb-5 mb-6 flex items-center gap-3 not-italic font-mono">
            <CheckCircle size={24} className="text-green-500 shrink-0" />
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-widest leading-none">// NODE TRANSMISSION SUCCESSFUL</h2>
              <span className="text-[9px] text-zinc-500 tracking-wider block mt-1 uppercase">QUADRANT METRICS PARSED</span>
            </div>
          </div>

          <div className="space-y-6 not-italic font-sans normal-case text-sm text-slate-300 font-normal leading-relaxed">
            <p>
              Thank you for completing your assigned forensic assessment track. Your infrastructure insights have been safely aggregated into the core corporation matrix pipeline at BMR Solutions.
            </p>
            
            <div className="border-t border-slate-900 pt-5 mt-4 text-xs text-slate-400 font-mono uppercase tracking-wide space-y-1">
              <span className="block text-[10px] text-slate-500 font-black">// ADDITIONAL INQUIRIES</span>
              <p className="normal-case font-sans font-normal text-slate-300">
                If you have any questions regarding your team's structural data alignment mapping, please reach out to your designated supervisor or contact our advisory desk at:
              </p>
              <a 
                href="mailto:Hello@BMRAdvisory.co" 
                className="block text-red-500 font-bold hover:text-white transition-colors text-xs lowercase mt-2 tracking-normal"
              >
                Hello@BMRAdvisory.co
              </a>
            </div>
          </div>
        </div>
      )}

    </div> 
  ); 
}
