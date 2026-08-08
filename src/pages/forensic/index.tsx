"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react'; 
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard'; 
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit'; 
import { GovernanceSupplementView } from '../../components/GovernanceSupplementView';
import { ShieldAlert, ArrowRight, Users, CheckCircle, Play, Mail, Lock, Building, FileText, ChevronRight, Loader2, Copy, Check, Printer } from 'lucide-react'; 
import { supabase } from '../../lib/supabaseClient'; 
import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from 'lz-string';
import { calculateForensicMetrics } from '../../lib/forensicCalculus';

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
  const [dossierTab, setDossierTab] = useState<'METRICS' | 'REMEDIATION'>('METRICS');
  const [companyName, setCompanyName] = useState(''); 
  const [activePillar, setActivePillar] = useState<FunnelPillar>('IGF'); 
  const [authorizedAdmin, setAuthorizedAdmin] = useState<boolean | null>(null); 
  const [sendingNudgeRole, setSendingNudgeRole] = useState<PersonaKey | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);

  const isSyncingRef = useRef(false);

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

  // 📡 UNIFIED SOURCE-OF-TRUTH RECOVERY & REAL-TIME SYNC
  const synchronizeEngineDataMatrix = async () => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;

    try {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get('id'); 
      const matrixToken = params.get('matrix');
      const entityParam = params.get('entity') || params.get('org') || params.get('entity_code');
      const roleParam = params.get('role') as PersonaKey;

      let decryptedData: Record<string, any> = {};
      if (matrixToken) {
        try {
          decryptedData = JSON.parse(decompressFromEncodedURIComponent(matrixToken) || '{}');
        } catch (tokenErr) {
          console.error("Token structural matrix parsing error:", tokenErr);
        }
      }

      let targetCompanyName = (decryptedData.companyName || decryptedData.org || entityParam || companyName || '').trim().replace(/\s+/g, ' ');

      let activeAudit = null;

      if (idParam) {
        const { data } = await supabase
          .from('audits')
          .select('id, org_name, sfi_score, decay_pct, sector, status, hai_raw_score, avs_raw_score, igf_raw_score')
          .eq('id', idParam)
          .maybeSingle();
        activeAudit = data;

        if (activeAudit && !targetCompanyName) {
          targetCompanyName = activeAudit.org_name;
          setCompanyName(targetCompanyName);
        }
      } else if (targetCompanyName) {
        const cleanOrgLookup = targetCompanyName.replace(/_GLOBAL$/, '').replace(/_/g, ' ');
        const { data } = await supabase
          .from('audits')
          .select('id, org_name, sfi_score, decay_pct, sector, status, hai_raw_score, avs_raw_score, igf_raw_score')
          .ilike('org_name', cleanOrgLookup)
          .maybeSingle();
        activeAudit = data;
      }

      if (activeAudit) {
        setActiveAuditId(activeAudit.id);

        const decay = activeAudit.decay_pct || 24;
        const sfi = activeAudit.sfi_score || decay;
        const sectorStr = String(activeAudit.sector || '').toUpperCase();

        let targetCalculatedPillar: FunnelPillar = 'IGF';
        if (sfi >= 45) {
          targetCalculatedPillar = 'AVS'; 
        } else if (sectorStr.includes('IGF') || sectorStr.includes('FINANCE') || sectorStr.includes('COMPLIANCE')) {
          targetCalculatedPillar = 'IGF';
        } else if (sectorStr.includes('AVS') || sectorStr.includes('MANUFACTURING') || sectorStr.includes('INDUSTRIAL')) {
          targetCalculatedPillar = 'AVS';
        } else {
          targetCalculatedPillar = 'HAI'; 
        }

        setActivePillar(targetCalculatedPillar);

        const { data: databaseNodes } = await supabase
          .from('operators')
          .select('persona_type, email, status, survey_completed, raw_responses')
          .eq('audit_id', activeAudit.id);

        if (!databaseNodes || databaseNodes.length === 0) {
          const emptyEmails = { EXECUTIVE: "", TECH_MGMT: "", OPS_MGMT: "", SYSTEM_USER: "" };
          const emptyTriangulation: TriangulationState = {
            companyName: targetCompanyName,
            pillar: targetCalculatedPillar,
            emails: emptyEmails,
            completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false },
            responses: { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} }
          };

          setEmails(emptyEmails);
          setTriangulation(emptyTriangulation);
          if (targetCompanyName) {
            window.localStorage.setItem(`bmr_matrix_run_${targetCompanyName}`, JSON.stringify(emptyTriangulation));
          }
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const filterIncomingEmail = (val: string | null): string => { 
          if (!val) return ""; 
          const cleanVal = decodeURIComponent(val).trim(); 
          return emailRegex.test(cleanVal) ? cleanVal : ""; 
        };

        // 🎯 EXACT PERSONA NODE MATCHING (No fallback to dbTechNode)
        const dbExecNode = databaseNodes.find(n => n.persona_type?.toUpperCase() === 'EXECUTIVE');
        const dbTechNode = databaseNodes.find(n => n.persona_type?.toUpperCase() === 'TECHNICAL');
        const dbMgrNode  = databaseNodes.find(n => n.persona_type?.toUpperCase() === 'MANAGERIAL');
        const dbUserNode = databaseNodes.find(n => n.persona_type?.toUpperCase() === 'SYSTEM_USER' || n.persona_type?.toUpperCase() === 'USER');

        const freshDBEmails = {
          EXECUTIVE: filterIncomingEmail(dbExecNode?.email || ""),
          TECH_MGMT: filterIncomingEmail(dbTechNode?.email || ""),
          OPS_MGMT: filterIncomingEmail(dbMgrNode?.email || ""),
          SYSTEM_USER: filterIncomingEmail(dbUserNode?.email || "")
        };

        setEmails(freshDBEmails);

        // 🛡️ STRICT COMPLETION CHECK: Prevents premature lockout
        const isTrackDone = (node: any) => {
          if (!node) return false;
          const statusUpper = String(node.status || '').toUpperCase();
          return node.survey_completed === true && (statusUpper === 'COMPLETED' || statusUpper === 'COMPLETE');
        };

        const liveCompletions = {
          EXECUTIVE: isTrackDone(dbExecNode),
          TECH_MGMT: isTrackDone(dbTechNode),
          OPS_MGMT: isTrackDone(dbMgrNode),
          SYSTEM_USER: isTrackDone(dbUserNode)
        };

        const liveResponses = {
          EXECUTIVE: dbExecNode?.raw_responses || {},
          TECH_MGMT: dbTechNode?.raw_responses || {},
          OPS_MGMT: dbMgrNode?.raw_responses || {},
          SYSTEM_USER: dbUserNode?.raw_responses || {}
        };

        const updatedTriangulation: TriangulationState = {
          companyName: targetCompanyName,
          pillar: targetCalculatedPillar,
          emails: freshDBEmails,
          completions: liveCompletions,
          responses: liveResponses
        };

        setTriangulation(updatedTriangulation);
        if (targetCompanyName) {
          window.localStorage.setItem(`bmr_matrix_run_${targetCompanyName}`, JSON.stringify(updatedTriangulation));
        }

        // 🛡️ ISOLATED PARTICIPANT ROUTE GATE
        if (roleParam) {
          if (liveCompletions[roleParam]) {
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
  };

  useEffect(() => { 
    if (typeof window !== 'undefined') { 
      try { 
        setBaseSecurePath(`${window.location.origin}${window.location.pathname}`); 

        const params = new URLSearchParams(window.location.search); 
        const authVal = params.get('auth'); 
        const matrixToken = params.get('matrix');
        const idParam = params.get('id'); 
        const pillarParam = params.get('pillar') as FunnelPillar; 
        const entityParam = params.get('entity') || params.get('org') || params.get('entity_code'); 
        const roleParam = params.get('role') as PersonaKey; 

        const isAdminAuthenticated = (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true'); 
        const isParticipantRoute = !!(roleParam && (entityParam || idParam) && pillarParam); 

        let decryptedData: Record<string, any> = {};
        if (matrixToken) {
          try {
            decryptedData = JSON.parse(decompressFromEncodedURIComponent(matrixToken) || '{}');
          } catch (tokenErr) {
            console.error("Token structural matrix parsing error:", tokenErr);
          }
        }

        let targetCompanyName = (decryptedData.companyName || decryptedData.org || entityParam || '').trim().replace(/\s+/g, ' ');

        if (targetCompanyName) { 
          setCompanyName(targetCompanyName); 
          const savedSession = window.localStorage.getItem(`bmr_matrix_run_${targetCompanyName}`); 
          if (savedSession) { 
            setTriangulation(JSON.parse(savedSession)); 
            if (!roleParam && isAdminAuthenticated) setViewState('HUB'); 
          } 
        } 

        if (isAdminAuthenticated && !roleParam) { 
          setAuthorizedAdmin(true); 
          synchronizeEngineDataMatrix();
        } else if (isParticipantRoute) { 
          setAuthorizedAdmin(true); 
          setActivePillar(['IGF', 'AVS', 'HAI'].includes(pillarParam?.toUpperCase()) ? pillarParam : 'IGF'); 
          setCompanyName(targetCompanyName); 
          setActivePersona(roleParam); 

          setTriangulation(prev => prev || { 
            companyName: targetCompanyName, 
            pillar: ['IGF', 'AVS', 'HAI'].includes(pillarParam?.toUpperCase()) ? pillarParam : 'IGF', 
            emails: { EXECUTIVE: '', TECH_MGMT: '', OPS_MGMT: '', SYSTEM_USER: '' }, 
            completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false }, 
            responses: { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} } 
          }); 

          setViewState('WIZARD'); 
          synchronizeEngineDataMatrix();
        } else { 
          setAuthorizedAdmin(false); 
        } 
      } catch (e) { 
        console.error("Hydration parsing interrupted by security policy filters:", e); 
        setAuthorizedAdmin(false); 
      } 
    } 
  }, []); 

  useEffect(() => {
    const handleFocus = () => {
      if (authorizedAdmin) {
        synchronizeEngineDataMatrix();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [authorizedAdmin, companyName]);

  const handleLoadDemoParameters = () => { 
    setCompanyName('Evaluation Client System'); 
    setEmails({ 
      EXECUTIVE: 'executive@example.com', 
      TECH_MGMT: 'technical@example.com', 
      OPS_MGMT: 'operations@example.com', 
      SYSTEM_USER: 'user@example.com' 
    }); 
    setInputError(''); 
  }; 

  const handleInitializeTriangulation = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    const sanitizedInput = companyName.trim(); 
          
    if (!sanitizedInput) { 
      setInputError('Organization name or evaluation code is required.'); 
      return; 
    } 
    if (!emails.EXECUTIVE || !emails.TECH_MGMT || !emails.OPS_MGMT || !emails.SYSTEM_USER) { 
      setInputError('All stakeholder email tracks are required for evaluation.'); 
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
          originUrl: `${window.location.origin}${window.location.pathname}` 
        }), 
      }); 
    } catch (error) { 
      console.error("Background notification dispatch exception:", error); 
    } 
  }; 

  const handleTriggerNudge = async (persona: PersonaKey) => {
    if (!triangulation) return;
    const email = triangulation.emails[persona];
    if (!email) return;

    try {
      setSendingNudgeRole(persona);
      const res = await fetch('/api/send-triangulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: triangulation.companyName,
          activePillar: triangulation.pillar,
          endpoints: { [persona]: email },
          isNudge: true,
          originUrl: `${window.location.origin}${window.location.pathname}`
        })
      });

      if (res.ok) {
        alert(`Reminder notification sent to ${persona.replace('_', ' ')} (${email}).`);
      } else {
        alert("Failed to send reminder via BMR platform.");
      }
    } catch (err) {
      console.error("Nudge API exception:", err);
      alert("Error sending notification via API.");
    } finally {
      setSendingNudgeRole(null);
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
        SYSTEM_USER: "SYSTEM_USER" 
      }[activePersona]; 

      if (!activeAuditId) {
        console.warn("WIZARD_SYNC: activeAuditId missing; aborting operator update.");
        return;
      }

      let updateQuery = supabase 
        .from("operators") 
        .update({ 
          survey_completed: true, 
          status: "COMPLETED",
          raw_responses: personaAnswers
        }) 
        .eq("audit_id", activeAuditId)
        .eq("persona_type", personaToBackendKey); 

      const params = new URLSearchParams(window.location.search); 
      const currentPersonaEmail = params.get('email') || triangulation.emails[activePersona]; 
          
      if (currentPersonaEmail) { 
        updateQuery = updateQuery.eq("email", decodeURIComponent(currentPersonaEmail).trim()); 
      } 
          
      const { error } = await updateQuery; 
      if (error) throw error; 

      console.log(`[NETWORK SUCCESS] Database payload synchronized for role track: ${activePersona}`); 
    } catch (dbError) { 
      console.error("[CRITICAL OUTAGE] Sync to database aborted via network mutation failure:", dbError); 
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
      title: "Pipeline Drift & Rework Tax Track (AVS)", 
      exposure: "Quantifies silent schema fractures and engineering budget drain across operational systems.", 
      metric: "Avg. Loss: $425,000 to $637,500 per 100 deployments due to unhedged architectural drift." 
    }; 
    if (activePillar === 'HAI') return { 
      title: "Automation Bias & Alarm Fatigue Track (HAI)", 
      exposure: "Exposes critical downstream model anomalies and operational efficiency leakage.", 
      metric: "Avg. Loss: $270,000 to $430,000 due to telemetry alert desensitization." 
    }; 
    return { 
      title: "Compliance & Governance Alignment Track (IGF)", 
      exposure: "Identifies unmapped decision paths carrying compliance liabilities under standard frameworks.", 
      metric: "Avg. Risk: Regulatory penalties or audit findings under unhedged validation trails." 
    }; 
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

  const sowShareLink = useMemo(() => {
    if (typeof window === 'undefined' || !triangulation) return '';
    const payload = {
      org: triangulation.companyName,
      pillar: triangulation.pillar,
      ans: triangulation.responses,
      expires: Date.now() + 86400000
    };
    const compressed = compressToEncodedURIComponent(JSON.stringify(payload));
    return `${window.location.origin}/sow-generator?matrix=${compressed}`;
  }, [triangulation]);

  const handleCopySOWLink = async () => {
    try {
      await navigator.clipboard.writeText(sowShareLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Clipboard write exception:', err);
    }
  };

  if (authorizedAdmin === null) { 
    return ( 
      <div className="bg-slate-50 min-h-screen text-slate-500 font-mono flex items-center justify-center"> 
        <span className="text-xs tracking-widest font-semibold">// Authorizing security access...</span> 
      </div> 
    ); 
  } 

  if (authorizedAdmin === false) { 
    return ( 
      <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col justify-center items-center py-12 px-4 font-sans"> 
        <div className="w-full max-w-xl border border-slate-200 bg-white p-8 text-left rounded-lg shadow-sm"> 
                      
          <div className="border-b border-slate-100 pb-5 mb-6 flex items-center justify-between"> 
            <div className="flex items-center gap-3"> 
              <Lock size={18} className="text-red-600 shrink-0" /> 
              <div> 
                <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider leading-none">Access Restricted</h2> 
                <span className="text-[11px] text-slate-500 tracking-wide block mt-1">Organizational authorization required</span> 
              </div> 
            </div> 
            <span className="font-mono text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded uppercase">Restricted</span> 
          </div> 

          <div className="space-y-6"> 
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-md"> 
              <span className="font-mono text-[11px] text-slate-500 block font-bold uppercase tracking-wider mb-1">Assessment Track</span> 
              <h3 className="text-sm font-bold text-slate-900 mb-2">{getPillarNodeDetails().title}</h3> 
              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4"> 
                {getPillarNodeDetails().exposure} 
              </p> 
              <div className="border-t border-slate-200 pt-4 flex items-center gap-2 text-red-600 font-mono text-[11px] font-semibold uppercase"> 
                <ShieldAlert size={14} className="shrink-0" /> {getPillarNodeDetails().metric} 
              </div> 
            </div> 

            <div className="border border-slate-200 bg-white p-6 rounded-md flex items-start gap-4"> 
              <Building size={20} className="text-slate-400 shrink-0 mt-0.5" /> 
              <div> 
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Administrative Access Required</h4> 
                <p className="text-sm text-slate-600 leading-relaxed font-normal"> 
                  This operational assessment can only be authorized and initialized by a licensed administrator. Please contact your workspace administrator to request direct access links for your assigned track. 
                </p> 
              </div> 
            </div> 

            <div className="pt-4 border-t border-slate-100"> 
              <a                     
                href="/dashboard" 
                className="w-full bg-slate-900 text-white text-xs font-bold py-3.5 uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-center" 
              > 
                Return to Master Dashboard <ArrowRight size={14} /> 
              </a> 
            </div> 
          </div> 

        </div> 
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
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">Assessment Setup</h2> 
              <span className="text-[11px] font-mono text-slate-500 font-medium block mt-1.5 uppercase tracking-wider">Multi-Track Operational Setup</span> 
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
                className="w-full bg-slate-50 border border-slate-200 p-3.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-slate-400 transition-colors rounded-md font-medium" 
              /> 
            </div> 

            <div> 
              <label className="text-xs font-mono font-bold text-slate-700 block uppercase tracking-wider mb-2">Primary Assessment Track</label> 
              <div className="grid grid-cols-1 gap-2.5"> 
                {[ 
                  { id: 'IGF', title: 'Compliance & Governance Alignment Track (IGF)' }, 
                  { id: 'AVS', title: 'Pipeline Drift & Rework Tax Track (AVS)' }, 
                  { id: 'HAI', title: 'Automation Bias & Fatigue Track (HAI)' } 
                ].map((p) => ( 
                  <button   
                    key={p.id} 
                    type="button" 
                    onClick={() => setActivePillar(p.id as FunnelPillar)} 
                    className={`w-full p-3.5 text-left border rounded-md transition-all flex flex-col justify-center cursor-pointer ${ 
                      activePillar === p.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300' 
                    }`} 
                  > 
                    <span className="text-xs font-bold tracking-wide">{p.title}</span> 
                  </button> 
                ))} 
              </div> 
            </div> 

            <div className="space-y-4 pt-4 border-t border-slate-100"> 
              <label className="text-xs font-mono font-bold text-slate-700 block uppercase tracking-wider mb-2">Stakeholder Track Emails</label> 
              {(Object.keys(emails) as PersonaKey[]).map((role) => ( 
                <div key={role}> 
                  <span className="text-[11px] text-slate-500 block mb-1 font-mono font-bold uppercase tracking-wider">{role.replace('_', ' ')} Track Email</span> 
                  <input         
                    type="email" 
                    placeholder={`e.g., manager@company.com`} 
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
                Initialize Multi-Track Assessment <ArrowRight size={14}/> 
              </button> 

              <button 
                type="button" 
                onClick={handleLoadDemoParameters} 
                className="w-full bg-white text-slate-700 border border-slate-200 font-mono text-xs font-bold py-3 uppercase tracking-wider rounded-md hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer" 
              > 
                <Play size={12} /> Load Staging Parameters 
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
                <span className="text-[11px] font-mono text-slate-500 block mt-1 uppercase tracking-wider">Organization: {triangulation.companyName} | Track: {triangulation.pillar}</span> 
              </div> 
            </div> 
          </div> 

          <div className="bg-slate-50 border border-slate-200 p-5 mb-6 rounded-md"> 
            <span className="text-[11px] font-mono text-slate-500 block font-bold uppercase tracking-wider mb-4">Completion Status</span> 
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"> 
              {(Object.keys(triangulation.completions) as PersonaKey[]).map((persona) => { 
                const completed = triangulation.completions[persona]; 
                return ( 
                  <div key={persona} className="border border-slate-200 bg-white p-4 rounded-md text-center flex flex-col items-center justify-center min-h-[74px]"> 
                    <span className="text-[11px] font-mono text-slate-700 uppercase tracking-wider block mb-2 font-bold">{persona.replace('_', ' ')}</span> 
                    {completed ? ( 
                      <CheckCircle size={16} className="text-emerald-600 mt-1" /> 
                    ) : ( 
                      <div className="w-3 h-3 rounded-full bg-slate-200 border-2 border-slate-400 animate-pulse mt-1" /> 
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
                <div key={persona} className="border border-slate-200 bg-white p-5 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
                  <div> 
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">{persona.replace('_', ' ')} Track</span> 
                    <span className="text-xs text-slate-500 block font-mono mt-1">{triangulation.emails[persona]}</span> 
                  </div> 

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end"> 
                    {!isDone && ( 
                      <button 
                        onClick={() => handleTriggerNudge(persona)} 
                        disabled={sendingNudgeRole === persona}
                        className="text-[11px] font-mono text-slate-500 font-bold hover:text-slate-900 transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer bg-transparent border-0 disabled:opacity-50" 
                      > 
                        {sendingNudgeRole === persona ? (
                          <>
                            <Loader2 size={12} className="animate-spin text-slate-900" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail size={12}/> Send Reminder 
                          </>
                        )}
                      </button> 
                    )} 

                    <button 
                      onClick={() => handleLaunchPersonaWizard(persona)} 
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md transition-colors flex items-center gap-2 cursor-pointer ${ 
                        isDone ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800' 
                      }`} 
                    > 
                      {isDone ? 'Review Track' : 'Open Track'} 
                    </button> 
                  </div> 
                </div> 
              ); 
            })} 
          </div> 

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
            <div className="text-left"> 
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold block">Consolidated Results Compilation</span> 
                
              {!allPersonasComplete && authorizedAdmin && ( 
                <button 
                  type="button" 
                  onClick={() => { 
                    if (window.confirm("Compile diagnostic metrics using currently available response data?")) { 
                      setViewState('COCKPIT'); 
                    } 
                  }} 
                  className="text-xs text-red-600 font-mono font-bold uppercase tracking-wider hover:underline bg-transparent border-0 p-0 mt-1 cursor-pointer block" 
                > 
                  Compile Partial Results 
                </button> 
              )} 
            </div> 

            <button 
              onClick={() => setViewState('COCKPIT')} 
              disabled={!allPersonasComplete} 
              className={`w-full sm:w-auto px-6 py-3.5 font-bold uppercase tracking-wider rounded-md transition-colors text-xs ${ 
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
              className="border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-300 text-xs font-mono font-bold px-5 py-2.5 uppercase tracking-wider transition-colors cursor-pointer rounded-md shadow-sm" 
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

          <div className="mt-8 mx-10 border border-slate-200 bg-white rounded-lg shadow-sm p-8 md:p-10 text-left">
            <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <FileText size={22} className="text-slate-900 shrink-0" />
                <div>
                  <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-slate-900 leading-none">
                    BMR Solutions // Explanatory Summary & Active SOW
                  </h3>
                  <span className="text-xs font-mono text-slate-500 block uppercase tracking-wider mt-1">
                    Companion Leave-Behind Document // Statement of Work Matrix
                  </span>
                </div>
              </div>

              <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-md font-mono text-xs font-bold uppercase tracking-wider">
                <button 
                  onClick={() => setDossierTab('METRICS')}
                  className={`px-4 py-2 transition-colors cursor-pointer rounded-sm ${dossierTab === 'METRICS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  01 // Risk Matrix
                </button>
                <button 
                  onClick={() => setDossierTab('REMEDIATION')}
                  className={`px-4 py-2 transition-colors cursor-pointer rounded-sm ${dossierTab === 'REMEDIATION' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  02 // Alignment Track SOW
                </button>
              </div>
            </div>

            {dossierTab === 'METRICS' && (
              <div className="space-y-6">
                <p className="text-sm text-slate-600 font-sans leading-relaxed">
                  This framework maps live cross-persona diagnostic responses to identify risk vectors across engineering pipelines for <strong className="text-slate-900 font-bold">{companyName.replace(/_/g, ' ')}</strong>. Below is the tactical summary of your current operational posture.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="border border-slate-200 bg-slate-50 p-5 rounded-md">
                    <span className="font-mono text-xs text-slate-900 block font-bold uppercase tracking-wider mb-2">
                      Integrity Index ({alignedCockpitMetrics.complianceScore}/100)
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Measures the alignment gap between governance mandate and operational velocity. A rating of {alignedCockpitMetrics.complianceScore} highlights where technical environments lack automated policy guardrails.
                    </p>
                  </div>

                  <div className="border border-slate-200 bg-slate-50 p-5 rounded-md">
                    <span className="font-mono text-xs text-amber-600 block font-bold uppercase tracking-wider mb-2">
                      Process Waste Tax (${alignedCockpitMetrics.annualSalaryLeakage.toLocaleString()})
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Quantifies internal capacity run-rate loss due to architectural drift. This translates to approximately engineering hours exhausted resolving schema drift and manual firefighting.
                    </p>
                  </div>

                  <div className="border border-slate-200 bg-slate-50 p-5 rounded-md">
                    <span className="font-mono text-xs text-red-600 block font-bold uppercase tracking-wider mb-2">
                      Total Promise Gap™ Exposure (${alignedCockpitMetrics.unhedgedLegalExposure.toLocaleString()})
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Projects total compliance fines and operational risk incurred if data pipelines remain uninsulated prior to expanding AI automation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {dossierTab === 'REMEDIATION' && (
              <div className="space-y-8 font-sans">
                <div className="bg-slate-900 text-white p-6 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                      // Active Remediation Statement of Work Matrix
                    </span>
                    <h4 className="text-xl font-extrabold tracking-tight mt-0.5">
                      Target Implementation SOW: {companyName.replace(/_/g, ' ')}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => typeof window !== 'undefined' && window.print()}
                      className="bg-white text-slate-900 px-4 py-2 font-bold uppercase tracking-wider rounded hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Printer size={14} /> Print SOW Contract
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 font-mono text-slate-700 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold">Phase</th>
                        <th className="p-4 font-bold">Remediation Scope</th>
                        <th className="p-4 font-bold">Technical Deliverables</th>
                        <th className="p-4 font-bold">Timeline</th>
                        <th className="p-4 font-bold">Resource Allocation</th>
                        <th className="p-4 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-4 font-mono font-bold text-slate-900 whitespace-nowrap">PHASE 01</td>
                        <td className="p-4 font-bold text-slate-900">
                          Pipeline Hardening & Schema Abstraction
                        </td>
                        <td className="p-4 text-slate-600 leading-relaxed">
                          Deploy strict GraphQL/OpenAPI schema validation gates, microservice adapter decoupling, and circuit breakers.
                        </td>
                        <td className="p-4 font-mono text-slate-700 whitespace-nowrap">Weeks 1 – 3</td>
                        <td className="p-4 font-mono text-slate-700 whitespace-nowrap">Senior Data Eng + SecOps</td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <span className="bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[10px] font-bold px-2 py-1 rounded uppercase">
                            Pending Approval
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono font-bold text-slate-900 whitespace-nowrap">PHASE 02</td>
                        <td className="p-4 font-bold text-slate-900">
                          Telemetry Decoupling & Alarm Filtering
                        </td>
                        <td className="p-4 text-slate-600 leading-relaxed">
                          Implement Purview/DLP sensitivity tagging, suppress alert fatigue loops, and install audit trail logging.
                        </td>
                        <td className="p-4 font-mono text-slate-700 whitespace-nowrap">Weeks 4 – 6</td>
                        <td className="p-4 font-mono text-slate-700 whitespace-nowrap">DevOps + Platform Lead</td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <span className="bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[10px] font-bold px-2 py-1 rounded uppercase">
                            Queued
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono font-bold text-slate-900 whitespace-nowrap">PHASE 03</td>
                        <td className="p-4 font-bold text-slate-900">
                          Autonomous Governance & Deployment Gates
                        </td>
                        <td className="p-4 text-slate-600 leading-relaxed">
                          Automate Purview data loss prevention policies, continuous model evaluation pipelines, and executive steering dashboards.
                        </td>
                        <td className="p-4 font-mono text-slate-700 whitespace-nowrap">Weeks 7 – 8</td>
                        <td className="p-4 font-mono text-slate-700 whitespace-nowrap">Enterprise Architect</td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <span className="bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[10px] font-bold px-2 py-1 rounded uppercase">
                            Queued
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border border-slate-200 bg-slate-50 p-6 rounded-md">
                  <span className="font-mono text-xs text-slate-900 block font-bold uppercase tracking-wider mb-3">
                    // Regulatory Non-Compliance Standards Audit
                  </span>
                  
                  <div className="space-y-3 font-mono text-xs text-slate-700">
                    <div className="flex gap-2 items-start"><ChevronRight size={14} className="text-red-600 shrink-0 mt-0.5" /> <span><strong className="text-red-600">[NON-COMPLIANT]</strong> ISO 9001:2015 // Clause 8.5.1: Messaging anomalies create unmapped distribution risk.</span></div>
                    <div className="flex gap-2 items-start"><ChevronRight size={14} className="text-red-600 shrink-0 mt-0.5" /> <span><strong className="text-red-600">[NON-COMPLIANT]</strong> HL7 FHIR v4 // Data Conformance: Unstructured drift triggers serialization failures.</span></div>
                    <div className="flex gap-2 items-start"><ChevronRight size={14} className="text-red-600 shrink-0 mt-0.5" /> <span><strong className="text-red-600">[NON-COMPLIANT]</strong> PCI-DSS v4.0 // Req 10.2: Processing delays interrupt automated auditing boundaries.</span></div>
                    <div className="flex gap-2 items-start"><ChevronRight size={14} className="text-red-600 shrink-0 mt-0.5" /> <span><strong className="text-red-600">[NON-COMPLIANT]</strong> SOX Act // Section 404: Telemetry friction degrades financial reporting controls.</span></div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-md space-y-3 font-sans no-print">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block font-bold uppercase tracking-wider">
                      // Stateless Deployable SOW Link Generator
                    </span>
                    <h5 className="text-sm font-extrabold uppercase mt-0.5">
                      Shareable Permanent SOW Token Interface
                    </h5>
                    <p className="text-xs text-slate-300 font-normal mt-1 leading-relaxed">
                      Copy this encrypted token to open or share this exact Statement of Work blueprint independently without requiring database session locks.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch gap-2 font-mono text-xs">
                    <input
                      type="text"
                      value={sowShareLink}
                      readOnly
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      className="flex-1 bg-slate-950 border border-slate-700 p-3 text-slate-300 font-mono text-[11px] rounded focus:outline-none truncate selection:bg-emerald-900 selection:text-emerald-300"
                    />
                    <button
                      type="button"
                      onClick={handleCopySOWLink}
                      className={`px-5 py-3 font-mono font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer ${
                        copiedLink ? 'bg-emerald-600 text-white' : 'bg-emerald-700 text-white hover:bg-emerald-800'
                      }`}
                    >
                      {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                      {copiedLink ? 'COPIED' : 'COPY SOW LINK'}
                    </button>
                  </div>
                </div>

              </div>
            )}

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              <span>BMR Solutions © 2026 // Independent Operational Governance</span>
              <span>Pre-Automation Control Plane</span>
            </div>
          </div>
        </div> 
      )} 
    </div> 
  ); 
}
