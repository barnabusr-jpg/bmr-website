"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'; 
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard'; 
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit'; 
import { GovernanceSupplementView } from '../../components/GovernanceSupplementView';
import { ShieldAlert, ArrowRight, Users, CheckCircle, Mail, Loader2 } from 'lucide-react'; 
import { supabase } from '../../lib/supabaseClient'; 
import { calculateForensicMetrics } from '../../lib/forensicCalculus';

type FunnelPillar = 'IGF' | 'AVS' | 'HAI'; 
type PersonaKey = 'EXECUTIVE' | 'MANAGERIAL' | 'TECHNICAL'; 

interface TriangulationState { 
  companyName: string; 
  pillar: FunnelPillar; 
  emails: Record<PersonaKey, string>; 
  completions: Record<PersonaKey, boolean>; 
  responses: Record<PersonaKey, Record<string, string>>; 
} 

export default function ForensicEngineRoot() { 
  const [viewState, setViewState] = useState<'INTAKE' | 'HUB' | 'WIZARD' | 'COCKPIT' | 'THANK_YOU'>('INTAKE'); 
  const [dossierTab, setDossierTab] = useState<'METRICS' | 'REMEDIATION'>('METRICS');
  const [companyName, setCompanyName] = useState(''); 
  const [activePillar, setActivePillar] = useState<FunnelPillar>('IGF'); 
  const [authorizedAdmin, setAuthorizedAdmin] = useState<boolean | null>(null); 
  const [sendingNudgeRole, setSendingNudgeRole] = useState<PersonaKey | null>(null);
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);

  const isSyncingRef = useRef(false);

  const [emails, setEmails] = useState<Record<PersonaKey, string>>({ 
    EXECUTIVE: '', 
    MANAGERIAL: '', 
    TECHNICAL: '' 
  }); 

  const [triangulation, setTriangulation] = useState<TriangulationState | null>(null); 
  const [activePersona, setActivePersona] = useState<PersonaKey | null>(null); 
  const [inputError, setInputError] = useState(''); 

  const synchronizeEngineDataMatrix = useCallback(async () => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;

    try {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get('id'); 
      const codeParam = params.get('code');
      const entityParam = params.get('entity') || params.get('org') || params.get('entity_code');

      let targetCompanyName = (entityParam || companyName || '').trim().replace(/\s+/g, ' ');
      let activeAudit = null;
      let matchedOperator = null;

      if (codeParam) {
        const { data: opData } = await supabase
          .from('operators')
          .select('id, group_id, audit_id, persona_type, email, survey_completed, status')
          .eq('access_code', codeParam.toUpperCase().trim())
          .maybeSingle();

        matchedOperator = opData;
        const targetAuditId = matchedOperator?.audit_id || matchedOperator?.group_id;

        if (targetAuditId) {
          const { data: auditData } = await supabase
            .from('audits')
            .select('id, org_name, sfi_score, decay_pct, sector, status, has_executive, has_managerial, has_technical')
            .eq('id', targetAuditId)
            .maybeSingle();

          activeAudit = auditData;
          if (activeAudit) targetCompanyName = activeAudit.org_name;
        }
      } else if (idParam || activeAuditId) {
        const queryId = idParam || activeAuditId;
        const { data } = await supabase
          .from('audits')
          .select('id, org_name, sfi_score, decay_pct, sector, status, has_executive, has_managerial, has_technical')
          .eq('id', queryId)
          .maybeSingle();
        activeAudit = data;
        if (activeAudit && !targetCompanyName) targetCompanyName = activeAudit.org_name;
      }

      if (activeAudit) {
        setActiveAuditId(activeAudit.id);
        setCompanyName(targetCompanyName);

        const sectorStr = String(activeAudit.sector || '').toUpperCase();
        let targetCalculatedPillar: FunnelPillar = 'IGF';
        if (sectorStr.includes('AVS') || sectorStr.includes('MANUFACTURING') || sectorStr.includes('INDUSTRIAL')) {
          targetCalculatedPillar = 'AVS';
        } else if (sectorStr.includes('HAI') || sectorStr.includes('SERVICES')) {
          targetCalculatedPillar = 'HAI';
        }
        setActivePillar(targetCalculatedPillar);

        // Fetch operators linked by either audit_id OR group_id
        const { data: databaseNodes } = await supabase
          .from('operators')
          .select('persona_type, email, status, survey_completed, raw_responses')
          .or(`group_id.eq.${activeAudit.id},audit_id.eq.${activeAudit.id}`);

        const completedOps = databaseNodes || [];

        const isOpDone = (pType: string) => {
          const node = completedOps.find(n => n.persona_type?.toUpperCase() === pType);
          if (!node) return false;
          const statusUpper = String(node.status || '').toUpperCase();
          return node.survey_completed === true || statusUpper === 'COMPLETED' || statusUpper === 'COMPLETE';
        };

        // Fallback check against audit table master boolean flags
        const liveCompletions = {
          EXECUTIVE: isOpDone('EXECUTIVE') || Boolean(activeAudit.has_executive),
          MANAGERIAL: isOpDone('MANAGERIAL') || Boolean(activeAudit.has_managerial),
          TECHNICAL: isOpDone('TECHNICAL') || Boolean(activeAudit.has_technical)
        };

        const dbExecNode = completedOps.find(n => n.persona_type?.toUpperCase() === 'EXECUTIVE');
        const dbMgrNode  = completedOps.find(n => n.persona_type?.toUpperCase() === 'MANAGERIAL');
        const dbTechNode = completedOps.find(n => n.persona_type?.toUpperCase() === 'TECHNICAL');

        const freshDBEmails = {
          EXECUTIVE: dbExecNode?.email || "",
          MANAGERIAL: dbMgrNode?.email || "",
          TECHNICAL: dbTechNode?.email || ""
        };

        setEmails(prev => ({
          EXECUTIVE: freshDBEmails.EXECUTIVE || prev.EXECUTIVE,
          MANAGERIAL: freshDBEmails.MANAGERIAL || prev.MANAGERIAL,
          TECHNICAL: freshDBEmails.TECHNICAL || prev.TECHNICAL,
        }));

        const liveResponses = {
          EXECUTIVE: dbExecNode?.raw_responses || {},
          MANAGERIAL: dbMgrNode?.raw_responses || {},
          TECHNICAL: dbTechNode?.raw_responses || {}
        };

        setTriangulation({
          companyName: targetCompanyName,
          pillar: targetCalculatedPillar,
          emails: freshDBEmails,
          completions: liveCompletions,
          responses: liveResponses
        });

        if (matchedOperator) {
          const rawPersona = String(matchedOperator.persona_type || '').toUpperCase().trim();
          if (rawPersona === 'EXECUTIVE' || rawPersona === 'MANAGERIAL' || rawPersona === 'TECHNICAL') {
            setActivePersona(rawPersona as PersonaKey);
          }

          if (matchedOperator.survey_completed || String(matchedOperator.status).toUpperCase() === 'COMPLETED') {
            setViewState('THANK_YOU');
          } else {
            setViewState('WIZARD');
          }
        }
      }
    } catch (err) {
      console.error("COCKPIT_SYNC_ERROR: Matrix re-sync failed", err);
    } finally {
      isSyncingRef.current = false;
    }
  }, [companyName, activeAuditId]);

  // Window focus auto-resync
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onFocus = () => {
      synchronizeEngineDataMatrix();
    };

    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [synchronizeEngineDataMatrix]);

  // Trigger sync on HUB view mount
  useEffect(() => {
    if (viewState === 'HUB') {
      synchronizeEngineDataMatrix();
    }
  }, [viewState, synchronizeEngineDataMatrix]);

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
        const params = new URLSearchParams(window.location.search); 
        const authVal = params.get('auth'); 
        const codeParam = params.get('code');
        const roleParam = params.get('role') as PersonaKey; 

        const isAdminAuthenticated = (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true'); 
        const isParticipantRoute = !!(codeParam || roleParam); 

        if (isAdminAuthenticated || isParticipantRoute) { 
          setAuthorizedAdmin(true); 
          synchronizeEngineDataMatrix();
        } else { 
          setAuthorizedAdmin(false); 
        } 
      } catch (e) { 
        console.error("Hydration parsing error:", e); 
        setAuthorizedAdmin(false); 
      } 
    } 
  }, [synchronizeEngineDataMatrix]); 

  const handleInitializeTriangulation = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    const sanitizedInput = companyName.trim(); 
          
    if (!sanitizedInput) { 
      setInputError('Organization name is required.'); 
      return; 
    } 
    if (!emails.EXECUTIVE || !emails.MANAGERIAL || !emails.TECHNICAL) { 
      setInputError('All 3 stakeholder track emails are required.'); 
      return; 
    } 
          
    setInputError(''); 

    try { 
      let { data: parentAudit } = await supabase
        .from('audits')
        .select('id')
        .ilike('org_name', sanitizedInput)
        .maybeSingle();

      if (!parentAudit) {
        const { data: newAudit, error: createErr } = await supabase
          .from('audits')
          .insert({
            org_name: sanitizedInput,
            sector: activePillar === 'AVS' ? 'INDUSTRIAL' : activePillar === 'HAI' ? 'SERVICES' : 'FINANCE',
            status: 'IN_PROGRESS'
          })
          .select('id')
          .single();

        if (createErr) throw createErr;
        parentAudit = newAudit;
      }

      setActiveAuditId(parentAudit.id);

      setTriangulation({ 
        companyName: sanitizedInput, 
        pillar: activePillar, 
        emails: { ...emails }, 
        completions: { EXECUTIVE: false, MANAGERIAL: false, TECHNICAL: false }, 
        responses: { EXECUTIVE: {}, MANAGERIAL: {}, TECHNICAL: {} } 
      }); 
      setViewState('HUB'); 

      await fetch('/api/dispatch-directives', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          parentAuditId: parentAudit.id,
          orgName: sanitizedInput, 
          emails: {
            executive: emails.EXECUTIVE,
            managerial: emails.MANAGERIAL,
            technical: emails.TECHNICAL
          }
        }), 
      }); 
    } catch (error) { 
      console.error("Dispatch directives exception:", error); 
    } 
  }; 

  const handleTriggerNudge = async (persona: PersonaKey) => {
    if (!triangulation || !activeAuditId) return;
    const email = triangulation.emails[persona];
    if (!email) return;

    try {
      setSendingNudgeRole(persona);
      const res = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentAuditId: activeAuditId,
          orgName: triangulation.companyName,
          emails: { [persona.toLowerCase()]: email }
        })
      });

      if (res.ok) {
        alert(`Reminder dispatch sent to ${persona} (${email}).`);
      } else {
        alert("Failed to send reminder.");
      }
    } catch (err) {
      console.error("Nudge API exception:", err);
      alert("Error sending notification.");
    } finally {
      setSendingNudgeRole(null);
    }
  };

  const handleLaunchPersonaWizard = (persona: PersonaKey) => { 
    setActivePersona(persona); 
    setViewState('WIZARD'); 
  }; 

  const handlePersonaAnswersSaved = async (personaAnswers?: Record<string, string>) => { 
    if (!activePersona) return;

    const answersToSave = (personaAnswers && Object.keys(personaAnswers).length > 0) 
      ? personaAnswers 
      : { status: "completed_via_wizard", completed_at: new Date().toISOString() };

    if (triangulation) {
      const updatedState = { ...triangulation }; 
      updatedState.responses[activePersona] = answersToSave; 
      updatedState.completions[activePersona] = true; 
      setTriangulation(updatedState); 
    }

    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code')?.toUpperCase().trim() || null;

    let updateSuccess = false;

    // STEP 1: Execute RPC function for secure mutation
    if (codeParam) {
      const { error: rpcErr } = await supabase.rpc('submit_operator_diagnostic', {
        p_access_code: codeParam,
        p_raw_responses: answersToSave
      });
      if (!rpcErr) updateSuccess = true;
    }

    // STEP 2: Direct fallback update by Group ID / Audit ID
    if (!updateSuccess && activeAuditId && activePersona) {
      const { data: updateGroupData } = await supabase
        .from("operators")
        .update({
          survey_completed: true,
          status: "COMPLETED",
          raw_responses: answersToSave,
        })
        .or(`group_id.eq.${activeAuditId},audit_id.eq.${activeAuditId}`)
        .ilike("persona_type", activePersona)
        .select();

      if (updateGroupData && updateGroupData.length > 0) updateSuccess = true;
    }

    // STEP 3: Re-sync state from database
    await synchronizeEngineDataMatrix();

    setActivePersona(null); 
    if (params.get('code') || params.get('role')) { 
      setViewState('THANK_YOU'); 
    } else { 
      setViewState('HUB'); 
    } 
  }; 

  const allPersonasComplete = triangulation       
    ? Object.values(triangulation.completions).every(status => status === true) 
    : false; 

  const handleSystemReset = () => { 
    setCompanyName(''); 
    setEmails({ EXECUTIVE: '', MANAGERIAL: '', TECHNICAL: '' }); 
    setTriangulation(null); 
    setActivePersona(null); 
    setViewState('INTAKE'); 
  }; 

  const alignedCockpitMetrics = useMemo(() => { 
    if (!triangulation) {
      return { multiplier: 1.0, complianceScore: 100, annualSalaryLeakage: 0, unhedgedLegalExposure: 0, isTierThreeExposure: false, regulatoryAlertActive: false };
    }

    const consolidatedResponses: Record<string, string> = {};
    Object.values(triangulation.responses).forEach(personaAnswers => {
      Object.assign(consolidatedResponses, personaAnswers);
    });

    const calculated = calculateForensicMetrics(
      triangulation.companyName, 
      consolidatedResponses, 
      activePillar === 'AVS' ? 'INDUSTRIAL' : activePillar === 'HAI' ? 'SERVICES' : 'FINANCE'
    );

    return { 
      multiplier: calculated.multiplier, 
      complianceScore: calculated.complianceScore, 
      annualSalaryLeakage: calculated.annualSalaryLeakage, 
      unhedgedLegalExposure: calculated.forensicInactionLiability, 
      isTierThreeExposure: calculated.isTierThreeExposure, 
      regulatoryAlertActive: calculated.regulatoryAlertActive 
    }; 
  }, [triangulation, activePillar]); 

  const governanceMetrics = useMemo(() => ({
    totalLaborTaxPool: alignedCockpitMetrics.annualSalaryLeakage,
    exposure: alignedCockpitMetrics.unhedgedLegalExposure,
    decay: 24,
    spend: 1.2
  }), [alignedCockpitMetrics]);

  const governanceAnalytics = useMemo(() => ({
    reliabilityIndex: alignedCockpitMetrics.complianceScore,
    dominantBasis: "TECHNICAL_DEBT_AVS",
    dominantDriver: "PIPELINE_DRIFT",
    dominantVisibility: "PARTIAL",
    sampleSize: 10000
  }), [alignedCockpitMetrics.complianceScore]);

  if (authorizedAdmin === null) { 
    return ( 
      <div className="bg-slate-50 min-h-screen text-slate-500 font-mono flex items-center justify-center"> 
        <span className="text-xs tracking-widest font-semibold">// Authorizing security access...</span> 
      </div> 
    ); 
  } 

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans text-left overflow-x-hidden flex flex-col justify-center items-center py-12 px-4"> 
                  
      {viewState === 'INTAKE' && ( 
        <div className="w-full max-w-lg border border-slate-200 bg-white p-8 md:p-10 text-left rounded-lg shadow-sm"> 
          <div className="border-b border-slate-100 pb-5 mb-8 flex items-center gap-3"> 
            <ShieldAlert size={24} className="text-slate-900 shrink-0" /> 
            <div> 
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">360° Assessment Setup</h2> 
              <span className="text-[11px] font-mono text-slate-500 font-medium block mt-1.5 uppercase tracking-wider">Stakeholder Triangulation</span> 
            </div> 
          </div> 

          <form onSubmit={handleInitializeTriangulation} className="space-y-6"> 
            <div> 
              <label className="text-xs font-mono font-bold text-slate-700 block uppercase tracking-wider mb-2">Target Organization Name</label> 
              <input         
                type="text" 
                autoComplete="off" 
                placeholder="e.g., Enterprise Client Systems" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 p-3.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors rounded-md font-medium" 
              /> 
            </div> 

            <div className="space-y-4 pt-4 border-t border-slate-100"> 
              <label className="text-xs font-mono font-bold text-slate-700 block uppercase tracking-wider mb-2">360° Stakeholder Emails</label> 
              {(Object.keys(emails) as PersonaKey[]).map((role) => ( 
                <div key={role}> 
                  <span className="text-[11px] text-slate-500 block mb-1 font-mono font-bold uppercase tracking-wider">{role} Track Email</span> 
                  <input         
                    type="email" 
                    placeholder={`e.g., ${role.toLowerCase()}@company.com`} 
                    value={emails[role]} 
                    onChange={(e) => setEmails({ ...emails, [role]: e.target.value })} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-3 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors" 
                  /> 
                </div> 
              ))} 
            </div> 

            {inputError && ( 
              <span className="text-xs text-red-600 font-mono block font-semibold">{inputError}</span> 
            )} 

            <div className="pt-4 space-y-3"> 
              <button 
                type="submit" 
                className="w-full bg-slate-900 text-white font-bold text-xs py-3.5 uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm" 
              > 
                Dispatch 360° Invites <ArrowRight size={14}/> 
              </button> 
            </div> 
          </form> 
        </div> 
      )} 

      {viewState === 'HUB' && triangulation && ( 
        <div className="w-full max-w-2xl border border-slate-200 bg-white p-8 md:p-10 text-left rounded-lg shadow-sm"> 
          <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-center"> 
            <div className="flex items-center gap-3"> 
              <Users size={20} className="text-slate-900" /> 
              <div> 
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Stakeholder Assessment Monitor</h2> 
                <span className="text-[11px] font-mono text-slate-500 block mt-1 uppercase tracking-wider">Organization: {triangulation.companyName}</span> 
              </div> 
            </div> 
          </div> 

          <div className="space-y-3"> 
            {(Object.keys(triangulation.emails) as PersonaKey[]).map((persona) => { 
              const isDone = triangulation.completions[persona]; 
              return ( 
                <div key={persona} className="border border-slate-200 bg-white p-5 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
                  <div> 
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">{persona} Track</span> 
                    <span className="text-xs text-slate-500 block font-mono mt-1">{triangulation.emails[persona]}</span> 
                  </div> 

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end"> 
                    {!isDone && ( 
                      <button 
                        onClick={() => handleTriggerNudge(persona)} 
                        disabled={sendingNudgeRole === persona}
                        className="text-[11px] font-mono text-slate-500 font-bold hover:text-slate-900 transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer bg-transparent border-0 disabled:opacity-50" 
                      > 
                        {sendingNudgeRole === persona ? <Loader2 size={12} className="animate-spin text-slate-900" /> : <Mail size={12}/>} Send Reminder 
                      </button> 
                    )} 

                    <button 
                      onClick={() => handleLaunchPersonaWizard(persona)} 
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md transition-colors flex items-center gap-2 cursor-pointer ${ 
                        isDone ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'bg-slate-900 text-white hover:bg-slate-800' 
                      }`} 
                    > 
                      {isDone ? 'Review Track' : 'Open Track'} 
                    </button> 
                  </div> 
                </div> 
              ); 
            })} 
          </div> 

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end"> 
            <button 
              onClick={() => setViewState('COCKPIT')} 
              disabled={!allPersonasComplete} 
              className={`px-6 py-3.5 font-bold uppercase tracking-wider rounded-md transition-colors text-xs ${ 
                allPersonasComplete 
                  ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-sm' 
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
              }`} 
            > 
              Compile Diagnostic Matrix 
            </button> 
          </div> 
        </div> 
      )} 

      {viewState === 'WIZARD' && triangulation && activePersona && ( 
        <ForensicDiagnosticWizard         
          companyName={`${triangulation.companyName}`} 
          activePillar={triangulation.pillar} 
          onCalculated={(finalAnswers?: Record<string, string>) => handlePersonaAnswersSaved(finalAnswers)} 
          onComplete={(finalAnswers?: Record<string, string>) => handlePersonaAnswersSaved(finalAnswers)} 
          onSubmit={(finalAnswers?: Record<string, string>) => handlePersonaAnswersSaved(finalAnswers)} 
        /> 
      )} 

      {viewState === 'THANK_YOU' && (
        <div className="w-full max-w-lg border border-slate-200 bg-white p-8 md:p-10 text-center rounded-lg shadow-sm">
          <CheckCircle size={40} className="text-emerald-600 mx-auto mb-4" />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Diagnostic Complete</h2>
          <p className="text-xs font-mono text-slate-500 mt-2 uppercase tracking-wider">
            Your assessment responses have been recorded and synchronized to the organization command cockpit.
          </p>
        </div>
      )}

      {viewState === 'COCKPIT' && triangulation && ( 
        <div className="w-full max-w-[1600px] mx-auto text-left"> 
          <div className="mb-4 px-10 no-print flex justify-start"> 
            <button 
              type="button" 
              onClick={handleSystemReset} 
              className="border border-slate-200 bg-white text-slate-700 hover:text-slate-900 text-xs font-mono font-bold px-5 py-2.5 uppercase tracking-wider transition-colors cursor-pointer rounded-md shadow-sm" 
            > 
              ← Return to Setup Control 
            </button> 
          </div> 

          <ForensicCommandCockpit         
            companyName={triangulation.companyName} 
            sector={triangulation.pillar === 'AVS' ? 'INDUSTRIAL' : triangulation.pillar === 'HAI' ? 'SERVICES' : 'FINANCE'} 
            metrics={alignedCockpitMetrics} 
            onSelectSOW={() => setDossierTab('REMEDIATION')}
          /> 

          <div className="mx-10 my-8">
            <GovernanceSupplementView
              metrics={governanceMetrics}
              forensicAnalytics={governanceAnalytics}
              orgName={triangulation.companyName.replace(/_/g, ' ')}
            />
          </div>
        </div> 
      )} 
    </div> 
  ); 
}
