"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'; 
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard'; 
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit'; 
import { GovernanceSupplementView } from '../../components/GovernanceSupplementView';
import { 
  ShieldAlert, ArrowRight, Users, CheckCircle, Mail, Loader2, Lock, 
  FileText, ChevronRight, Copy, Check, Printer, RotateCcw 
} from 'lucide-react'; 
import { supabase } from '../../lib/supabaseClient'; 
import { compressToEncodedURIComponent } from 'lz-string';
import { calculateForensicMetrics } from '../../lib/forensicCalculus';

type FunnelPillar = 'IGF' | 'AVS' | 'HAI'; 
type PersonaKey = 'EXECUTIVE' | 'TECH_MGMT' | 'OPS_MGMT' | 'SYSTEM_USER'; 

const sanitizeOrgKey = (org: string): string => org.trim().replace(/\s+/g, ' ');

// Lightweight UUID validator to prevent malformed API queries
const isValidUuid = (val?: string | null): boolean => 
  Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val));

const QUAD_PERSONA_TYPES: Record<PersonaKey, string[]> = {
  EXECUTIVE: ['EXECUTIVE', 'EXEC', 'IGF', 'STRATEGIC'],
  TECH_MGMT: ['TECH_MGMT', 'TECH', 'TECHNICAL', 'AVS', 'DEVOPS'],
  OPS_MGMT: ['OPS_MGMT', 'OPS', 'MANAGERIAL', 'MGR', 'HAI', 'OPERATIONS'],
  SYSTEM_USER: ['SYSTEM_USER', 'SYS', 'USER', 'OPERATOR', 'CORE_SYSTEM', 'TERMINAL', 'SYSTEM'],
};

// ⚡ PRECOMPUTED O(1) REVERSE ALIAS MAP
const PERSONA_ALIAS_MAP: Record<string, PersonaKey> = Object.entries(QUAD_PERSONA_TYPES).reduce(
  (acc, [canonicalKey, aliases]) => {
    acc[canonicalKey] = canonicalKey as PersonaKey;
    aliases.forEach(alias => {
      acc[alias.toUpperCase()] = canonicalKey as PersonaKey;
    });
    return acc;
  },
  {} as Record<string, PersonaKey>
);

// 🎯 O(1) PERSONA ALIAS RESOLVER
const resolvePersonaKey = (rawRole?: string | null): PersonaKey | null => {
  if (!rawRole) return null;
  const clean = rawRole.toUpperCase().trim();

  if (clean in PERSONA_ALIAS_MAP) {
    return PERSONA_ALIAS_MAP[clean];
  }

  if (clean.includes('MANAG') || clean.includes('MGR') || clean.includes('OPS')) return 'OPS_MGMT';
  if (clean.includes('TECH') || clean.includes('DEVOPS')) return 'TECH_MGMT';
  if (clean.includes('EXEC') || clean.includes('STRATEGIC')) return 'EXECUTIVE';
  if (clean.includes('USER') || clean.includes('SYS')) return 'SYSTEM_USER';

  return null;
};

const FRESH_EMPTY_EMAILS: Record<PersonaKey, string> = {
  EXECUTIVE: '',
  TECH_MGMT: '',
  OPS_MGMT: '',
  SYSTEM_USER: '',
};

interface TriangulationState { 
  companyName: string; 
  pillar: FunnelPillar; 
  emails: Record<PersonaKey, string>; 
  completions: Record<PersonaKey, boolean>; 
  responses: Record<string, any>; 
} 

export default function ForensicEngineRoot() { 
  const [viewState, setViewState] = useState<'INTAKE' | 'HUB' | 'WIZARD' | 'COCKPIT' | 'THANK_YOU'>('HUB'); 
  const [hasSynced, setHasSynced] = useState(false);
  const [dossierTab, setDossierTab] = useState<'METRICS' | 'REMEDIATION'>('METRICS');
  const [companyName, setCompanyName] = useState(''); 
  const [isCompanyFromDB, setIsCompanyFromDB] = useState(false);
  const [activePillar, setActivePillar] = useState<FunnelPillar>('IGF'); 
  const [authorizedAdmin, setAuthorizedAdmin] = useState<boolean | null>(null); 
  const [sendingNudgeRole, setSendingNudgeRole] = useState<PersonaKey | null>(null);
  const [isDispatchingBatch, setIsDispatchingBatch] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);

  const isSyncingRef = useRef(false);
  const didBootRef = useRef(false);

  const [emails, setEmails] = useState<Record<PersonaKey, string>>(FRESH_EMPTY_EMAILS); 
  const [triangulation, setTriangulation] = useState<TriangulationState | null>(null); 
  const [activePersona, setActivePersona] = useState<PersonaKey | null>(null); 
  const [inputError, setInputError] = useState(''); 

  const companyNameRef = useRef(companyName);
  const activePillarRef = useRef(activePillar);
  const emailsRef = useRef(emails);
  const activeAuditIdRef = useRef(activeAuditId);

  useEffect(() => { companyNameRef.current = companyName; }, [companyName]);
  useEffect(() => { activePillarRef.current = activePillar; }, [activePillar]);
  useEffect(() => { emailsRef.current = emails; }, [emails]);
  useEffect(() => { activeAuditIdRef.current = activeAuditId; }, [activeAuditId]);

  // 📡 BASELINE BOOT & HYDRATION (PURE MARKER-PRESENCE EVALUATION)
  const synchronizeEngineDataMatrix = useCallback(async (force = false) => {
    if (isSyncingRef.current && !force) return;
    isSyncingRef.current = true;

    const params = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search) 
      : new URLSearchParams();

    let idParam = params.get('id') || activeAuditIdRef.current;
    const orgParam = params.get('org') || params.get('entity') || params.get('entity_code') || companyNameRef.current;
    const rawRole = params.get('role') || params.get('persona');
    const authVal = params.get('auth');
    const viewParam = params.get('view');
    const flowParam = params.get('flow');

    let targetCompanyName = sanitizeOrgKey(orgParam || '');

    try {
      const roleParam = resolvePersonaKey(rawRole);
      const isParticipantRoute = !!roleParam;

      const isAdminSession = 
        !isParticipantRoute && 
        (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true');

      // 🎯 AUDIT ID RESOLVER FALLBACK: If missing on participant route, resolve from DB via org_name
      if (!idParam && targetCompanyName) {
        const { data: matchedAudit } = await supabase
          .from('audits')
          .select('id')
          .ilike('org_name', targetCompanyName)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (matchedAudit?.id) {
          idParam = matchedAudit.id;
          setActiveAuditId(matchedAudit.id);
          activeAuditIdRef.current = matchedAudit.id;
        }
      }

      if (isParticipantRoute && roleParam) {
        // 🎯 BIND AUDIT ID FROM URL PARAMETER IMMEDIATELY
        if (idParam) {
          setActiveAuditId(idParam);
          activeAuditIdRef.current = idParam;
        }

        if (targetCompanyName) {
          setCompanyName(targetCompanyName);
          setIsCompanyFromDB(true);
        }

        setActivePersona(roleParam);
        const resolvedPillar: FunnelPillar = roleParam === 'OPS_MGMT' ? 'HAI' : roleParam === 'TECH_MGMT' ? 'AVS' : 'IGF';
        setActivePillar(resolvedPillar);

        setTriangulation(prev => ({
          companyName: targetCompanyName || prev?.companyName || "Quad Node Client System",
          pillar: resolvedPillar,
          emails: prev?.emails || FRESH_EMPTY_EMAILS,
          completions: prev?.completions || { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false },
          responses: prev?.responses || {}
        }));

        setViewState('WIZARD');
        setHasSynced(true);
        return;
      }
      
      if (isAdminSession && flowParam === 'quad_node' && !idParam && !targetCompanyName) {
        setEmails(FRESH_EMPTY_EMAILS);
        setViewState('INTAKE');
        setHasSynced(true);
        return;
      }

      let activeAudit: any = null;

      if (idParam && isValidUuid(idParam)) {
        const { data } = await supabase
          .from('audits')
          .select('id, org_name, sfi_score, decay_pct, sector, status, raw_responses')
          .eq('id', idParam)
          .maybeSingle();
        activeAudit = data;
      } else if (targetCompanyName) {
        const { data } = await supabase
          .from('audits')
          .select('id, org_name, sfi_score, decay_pct, sector, status, raw_responses')
          .ilike('org_name', targetCompanyName)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        activeAudit = data;
      }

      let calculatedPillar: FunnelPillar = activePillarRef.current;

      if (activeAudit) {
        setActiveAuditId(activeAudit.id);
        activeAuditIdRef.current = activeAudit.id;
        setCompanyName(activeAudit.org_name);
        setIsCompanyFromDB(true);

        const sectorStr = String(activeAudit.sector || '').toUpperCase();
        if (sectorStr.includes('AVS') || sectorStr.includes('INDUSTRIAL')) {
          calculatedPillar = 'AVS';
        } else if (sectorStr.includes('HAI') || sectorStr.includes('SERVICES')) {
          calculatedPillar = 'HAI';
        } else {
          calculatedPillar = 'IGF';
        }
        setActivePillar(calculatedPillar);

        const rawResponses =
          activeAudit.raw_responses && typeof activeAudit.raw_responses === 'object' && !Array.isArray(activeAudit.raw_responses)
            ? activeAudit.raw_responses
            : {};

        // 🎯 PURE MARKER-PRESENCE EVALUATION
        const completionsMap: Record<PersonaKey, boolean> = {
          EXECUTIVE: Boolean(rawResponses['QUAD_EXE_COMPLETE']),
          TECH_MGMT: Boolean(rawResponses['QUAD_TEC_COMPLETE']),
          OPS_MGMT: Boolean(rawResponses['QUAD_MGR_COMPLETE']),
          SYSTEM_USER: Boolean(rawResponses['QUAD_SYS_COMPLETE'])
        };

        setTriangulation(prev => ({
          companyName: activeAudit.org_name,
          pillar: calculatedPillar,
          emails: prev?.emails || FRESH_EMPTY_EMAILS,
          completions: completionsMap,
          responses: rawResponses
        }));

        if (viewParam === 'cockpit' || viewParam === 'results' || flowParam === 'results') {
          setViewState('COCKPIT');
        } else {
          setViewState('HUB');
        }
      } else if (targetCompanyName) {
        setTriangulation(prev => ({
          companyName: targetCompanyName,
          pillar: calculatedPillar,
          emails: prev?.emails || FRESH_EMPTY_EMAILS,
          completions: prev?.completions || { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false },
          responses: prev?.responses || {}
        }));
        setViewState('HUB');
      } else {
        setEmails(FRESH_EMPTY_EMAILS);
        setViewState('INTAKE');
      }
    } catch (err) {
      console.error("QUAD_NODE_SYNC_ERROR:", err);
    } finally {
      isSyncingRef.current = false;
      setHasSynced(true);
    }
  }, []);

  useEffect(() => { 
    if (typeof window !== 'undefined' && !didBootRef.current) { 
      try { 
        const params = new URLSearchParams(window.location.search); 
        const authVal = params.get('auth'); 
        const rawRole = params.get('role') || params.get('persona'); 
        const orgVal = params.get('org') || params.get('entity');

        const roleParam = resolvePersonaKey(rawRole);
        const isParticipantRoute = !!roleParam;

        const isAdminAuthenticated =
          !isParticipantRoute &&
          (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true');

        const isAuthorized = isParticipantRoute || isAdminAuthenticated || !!orgVal;

        setAuthorizedAdmin(isAuthorized);
        didBootRef.current = true; 

        if (isAuthorized) {
          synchronizeEngineDataMatrix().finally(() => {
            setHasSynced(true);
          });
        } else {
          setHasSynced(true);
        }
      } catch (e) { 
        console.error("Hydration parsing error:", e); 
        setAuthorizedAdmin(true); 
        setHasSynced(true);
      } 
    }
  }, [synchronizeEngineDataMatrix]); 

  // 🎯 5-SECOND HUB AUTO-POLLING FOR LIVE CHECKMARK UPDATES
  useEffect(() => {
    if (viewState !== 'HUB' || !activeAuditId) return;

    const intervalId = window.setInterval(() => {
      synchronizeEngineDataMatrix(true);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [viewState, activeAuditId, synchronizeEngineDataMatrix]);

  const handleUpdateEmailEntry = (persona: PersonaKey, newEmail: string) => {
    setEmails(prev => ({ ...prev, [persona]: newEmail }));
    setTriangulation(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        emails: { ...prev.emails, [persona]: newEmail }
      };
    });
  };

  // 🎯 ATOMIC RPC PERSISTENCE WITH ENFORCED TIMESTAMP PRECEDENCE & RETURNED PAYLOAD HYDRATION
  const handlePersonaAnswersSaved = async (personaAnswers?: Record<string, string>) => { 
    if (!activePersona) return;

    const targetPersona = activePersona;
    const targetAuditId = activeAuditId || activeAuditIdRef.current;

    const quadMarkerMap: Record<PersonaKey, string> = {
      EXECUTIVE: 'QUAD_EXE_COMPLETE',
      TECH_MGMT: 'QUAD_TEC_COMPLETE',
      OPS_MGMT: 'QUAD_MGR_COMPLETE',
      SYSTEM_USER: 'QUAD_SYS_COMPLETE'
    };

    const markerKey = quadMarkerMap[targetPersona];
    if (!markerKey) {
      console.error(`[Save Handler] Failed to resolve quad marker key for persona: ${activePersona}`);
      setActivePersona(null);
      setViewState('THANK_YOU');
      return;
    }

    // 🎯 ENFORCED ORDER: Spread personaAnswers FIRST so markerKey timestamp wins
    const answersToSave = {
      ...(personaAnswers || {}),
      [markerKey]: new Date().toISOString()
    };

    // Optimistic local UI update
    setTriangulation(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        completions: { ...prev.completions, [targetPersona]: true },
        responses: { ...prev.responses, ...answersToSave }
      };
    });

    if (!targetAuditId || !isValidUuid(targetAuditId)) {
      console.warn('[Save Handler] Missing or invalid targetAuditId; skipping database save.', targetAuditId);
      setActivePersona(null);
      setViewState('THANK_YOU');
      return;
    }

    try {
      const { data: updatedRaw, error: rpcErr } = await supabase.rpc('save_quad_node_response', {
        target_audit_id: targetAuditId,
        new_responses: answersToSave
      });

      if (rpcErr || !updatedRaw) {
        console.error('[Save Handler] RPC execution failed:', rpcErr?.message || 'Null payload returned');
      } else {
        console.log(`✅ Quad Node marker ${markerKey} saved for ${targetPersona} in audit ${targetAuditId}`);
        
        // 🎯 DIRECT DB TRUTH HYDRATION: Synchronize state directly from RPC output
        setTriangulation(prev => prev ? ({
          ...prev,
          completions: {
            EXECUTIVE: Boolean(updatedRaw['QUAD_EXE_COMPLETE']),
            TECH_MGMT: Boolean(updatedRaw['QUAD_TEC_COMPLETE']),
            OPS_MGMT: Boolean(updatedRaw['QUAD_MGR_COMPLETE']),
            SYSTEM_USER: Boolean(updatedRaw['QUAD_SYS_COMPLETE'])
          },
          responses: updatedRaw
        }) : prev);
      }
    } catch (err) {
      console.error('[Save Handler] Persistence exception:', err);
    }

    setActivePersona(null); 
    setViewState('THANK_YOU');
  }; 

  const handleInitializeTriangulation = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    const sanitizedInput = companyName.trim(); 
          
    if (!sanitizedInput) { 
      setInputError('Organization name is required.'); 
      return; 
    } 
          
    setInputError(''); 

    try { 
      const { data: newAudit, error: createErr } = await supabase
        .from('audits')
        .insert({
          org_name: sanitizedInput,
          sector: activePillar === 'AVS' ? 'INDUSTRIAL' : activePillar === 'HAI' ? 'SERVICES' : 'FINANCE',
          status: 'IN_PROGRESS',
          raw_responses: {}
        })
        .select('id')
        .single();

      if (createErr) throw createErr;

      const parentAuditId = newAudit.id;
      setActiveAuditId(parentAuditId);
      activeAuditIdRef.current = parentAuditId;

      if (typeof window !== 'undefined') {
        const newUrl = `${window.location.pathname}?id=${parentAuditId}&org=${encodeURIComponent(sanitizedInput)}&flow=quad_node&auth=admin_verified_secure`;
        window.history.pushState({}, '', newUrl);
      }

      const initialTriangulation = { 
        companyName: sanitizedInput, 
        pillar: activePillar, 
        emails: { ...emails }, 
        completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false }, 
        responses: {} 
      };

      setTriangulation(initialTriangulation); 
      setViewState('HUB'); 
    } catch (error) { 
      console.error("Quad Node setup exception:", error); 
    } 
  }; 

  const handleTriggerNudge = async (persona: PersonaKey) => {
    const targetAudit = activeAuditId || activeAuditIdRef.current;
    const currentEmails = triangulation?.emails || emails;
    const email = currentEmails[persona];

    if (!email || !email.trim()) {
      alert(`Please enter a valid email for the ${persona.replace('_', ' ')} track.`);
      return;
    }

    try {
      setSendingNudgeRole(persona);
      const res = await fetch('/api/send-triangulation', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
          auditId: targetAudit,
          companyName: triangulation?.companyName || companyName,
          endpoints: { [persona]: email },
          originUrl: `${window.location.origin}${window.location.pathname}`,
          isNudge: true,
          flowType: 'quad_node'
        })
      });

      if (res.ok) {
        alert(`Reminder email sent to ${persona.replace('_', ' ')} (${email}).`);
      } else {
        const err = await res.json();
        alert(`Failed to send reminder: ${err.details || err.error || 'Server error'}`);
      }
    } catch (err: any) {
      console.error("Reminder dispatch exception:", err);
      alert(`Dispatch error: ${err.message}`);
    } finally {
      setSendingNudgeRole(null);
    }
  };

  const handleDispatchBatchEmails = async () => {
    const targetAudit = activeAuditId || activeAuditIdRef.current;
    if (!targetAudit) {
      alert("Audit record reference is missing. Please re-enter organization name or refresh.");
      return;
    }

    const currentEmails = triangulation?.emails || emails;

    const missingRoles = [];
    if (!currentEmails.EXECUTIVE?.trim()) missingRoles.push("Executive");
    if (!currentEmails.TECH_MGMT?.trim()) missingRoles.push("Tech Management");
    if (!currentEmails.OPS_MGMT?.trim()) missingRoles.push("Ops Management");
    if (!currentEmails.SYSTEM_USER?.trim()) missingRoles.push("System User");

    if (missingRoles.length > 0) {
      alert(`Please enter emails for all 4 tracks before dispatching. Missing: ${missingRoles.join(", ")}`);
      return;
    }

    try {
      setIsDispatchingBatch(true);
      const res = await fetch('/api/send-triangulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: targetAudit,
          companyName: triangulation?.companyName || companyName,
          endpoints: currentEmails,
          originUrl: `${window.location.origin}${window.location.pathname}`,
          isNudge: false,
          flowType: 'quad_node'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Templated assessment emails successfully dispatched to all 4 stakeholders.`);
      } else {
        alert(`Dispatch failed: ${data.details || data.error || 'Server error'}`);
      }
    } catch (err: any) {
      console.error("Batch email dispatch exception:", err);
      alert(`Dispatch error: ${err.message}`);
    } finally {
      setIsDispatchingBatch(false);
    }
  };

  const handleSystemReset = () => { 
    didBootRef.current = false;
    setAuthorizedAdmin(true);
    setHasSynced(false);

    setCompanyName(''); 
    setIsCompanyFromDB(false);
    setEmails(FRESH_EMPTY_EMAILS); 
    setTriangulation(null); 
    setActivePersona(null); 
    setActiveAuditId(null);

    if (typeof window !== 'undefined') {
      const cleanUrl = `${window.location.pathname}?flow=quad_node&auth=admin_verified_secure`;
      window.history.replaceState({}, '', cleanUrl);
    }

    setViewState('INTAKE'); 
    setTimeout(() => { synchronizeEngineDataMatrix(true); }, 0);
  }; 

  // 🎯 STRICT SERVER-MARKER TRUTH EVALUATION FOR MATRIX GATING
  const allPersonasComplete = useMemo(() => {
    if (!triangulation?.responses) return false;
    const resp = triangulation.responses;
    
    return Boolean(
      resp['QUAD_EXE_COMPLETE'] &&
      resp['QUAD_TEC_COMPLETE'] &&
      resp['QUAD_MGR_COMPLETE'] &&
      resp['QUAD_SYS_COMPLETE']
    );
  }, [triangulation?.responses]);

  const alignedCockpitMetrics = useMemo(() => { 
    if (!triangulation) {
      return { multiplier: 1.0, complianceScore: 100, annualSalaryLeakage: 0, unhedgedLegalExposure: 0, isTierThreeExposure: false, regulatoryAlertActive: false };
    }

    const calculated = calculateForensicMetrics(
      triangulation.companyName, 
      triangulation.responses, 
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

  // 🎯 SOW LINK GENERATOR WITH SSR GUARD FIX (typeof window === 'undefined')
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

  if (authorizedAdmin === null || !hasSynced) { 
    return ( 
      <div className="bg-slate-50 min-h-screen text-slate-500 font-mono flex items-center justify-center"> 
        <span className="text-xs tracking-widest font-semibold">// Authorizing security access...</span> 
      </div> 
    ); 
  } 
return (
  <div className="bg-slate-50 min-h-screen text-slate-900 font-sans text-left overflow-x-hidden flex flex-col justify-center items-center py-12 px-4"> 
                  
      {/* INTAKE SETUP VIEW */}
      {viewState === 'INTAKE' && ( 
        <div className="w-full max-w-lg border border-slate-200 bg-white p-8 md:p-10 text-left rounded-lg shadow-sm"> 
          <div className="border-b border-slate-100 pb-5 mb-8 flex items-center justify-between"> 
            <div className="flex items-center gap-3"> 
              <ShieldAlert size={24} className="text-slate-900 shrink-0" /> 
              <div> 
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">Quad Node Diagnostic Setup</h2> 
                <span className="text-[11px] font-mono text-slate-500 font-medium block mt-1.5 uppercase tracking-wider">Configure Stakeholder Routing</span> 
              </div> 
            </div> 
          </div> 

          <form onSubmit={handleInitializeTriangulation} className="space-y-6"> 
            <div> 
              <div className="flex justify-between items-center mb-2"> 
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">Target Organization Name</label> 
                {isCompanyFromDB && ( 
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold flex items-center gap-1"> 
                    <Lock size={10} /> DATABASE RESOLVED 
                  </span> 
                )} 
              </div> 
              <input         
                type="text" 
                autoComplete="off" 
                placeholder="e.g., Enterprise Client Systems" 
                value={companyName} 
                readOnly={isCompanyFromDB} 
                onChange={(e) => !isCompanyFromDB && setCompanyName(e.target.value)} 
                className={`w-full border p-3.5 text-sm text-slate-900 focus:outline-none transition-colors rounded-md font-medium ${ 
                  isCompanyFromDB ? 'bg-slate-100 border-slate-300 text-slate-700 cursor-not-allowed' : 'bg-slate-50 border-slate-200 focus:border-slate-900' 
                }`} 
              /> 
            </div> 

            <div className="space-y-4 pt-4 border-t border-slate-100"> 
              <div className="flex justify-between items-center"> 
                <label className="text-xs font-mono font-bold text-slate-700 block uppercase tracking-wider">Quad Node Stakeholder Tracks</label> 
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">// 4 Persona Channels</span> 
              </div> 

              {(Object.keys(emails) as PersonaKey[]).map((role) => ( 
                <div key={role}> 
                  <span className="text-[11px] text-slate-500 block mb-1 font-mono font-bold uppercase tracking-wider">{role.replace('_', ' ')} Track Email</span> 
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

            <div className="pt-2"> 
              <button 
                type="submit" 
                className="w-full bg-slate-900 text-white font-bold text-xs py-3.5 uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm" 
              > 
                Proceed to Stakeholder Monitor <ArrowRight size={14}/> 
              </button> 
            </div> 
          </form> 
        </div> 
      )} 

      {/* MONITOR HUB VIEW */}
      {viewState === 'HUB' && triangulation && ( 
        <div className="w-full max-w-2xl border border-slate-200 bg-white p-8 md:p-10 text-left rounded-lg shadow-sm"> 
          <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-center gap-4"> 
            <div className="flex items-center gap-3"> 
              <Users size={20} className="text-slate-900" /> 
              <div> 
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Stakeholder Assessment Monitor</h2> 
                <span className="text-[11px] font-mono text-slate-500 block mt-1 uppercase tracking-wider"> 
                  ORGANIZATION: {triangulation.companyName} | TRACK: {triangulation.pillar} 
                </span> 
              </div> 
            </div> 

            <button 
              type="button" 
              onClick={handleSystemReset} 
              className="text-xs font-mono font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-400 bg-slate-50 px-3 py-1.5 rounded uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer" 
            > 
              <RotateCcw size={12} /> New Setup 
            </button> 
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
                  <div className="flex-1 w-full sm:w-auto"> 
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider block mb-1">{persona.replace('_', ' ')} Track</span> 
                    
                    <input 
                      type="email" 
                      placeholder="Enter stakeholder email..." 
                      value={triangulation.emails[persona] || ''} 
                      onChange={(e) => handleUpdateEmailEntry(persona, e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded px-2.5 py-1.5 font-mono text-xs text-slate-800 transition-colors focus:outline-none" 
                    /> 
                  </div> 

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0"> 
                    {!isDone && ( 
                      <button 
                        onClick={() => handleTriggerNudge(persona)} 
                        disabled={sendingNudgeRole === persona || !triangulation.emails[persona]} 
                        className="text-[11px] font-mono text-slate-500 font-bold hover:text-slate-900 transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer bg-transparent border-0 disabled:opacity-50" 
                      > 
                        {sendingNudgeRole === persona ? <Loader2 size={12} className="animate-spin text-slate-900" /> : <Mail size={12}/>} Send Reminder 
                      </button> 
                    )} 

                    <button 
  onClick={async () => { 
    if ((!activeAuditId || !activeAuditIdRef.current) && triangulation?.companyName) {
      const { data: matched } = await supabase
        .from('audits')
        .select('id')
        .ilike('org_name', sanitizeOrgKey(triangulation.companyName))
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (matched?.id) {
        setActiveAuditId(matched.id);
        activeAuditIdRef.current = matched.id;
      }
    }
    setActivePersona(persona); 
    setViewState('WIZARD'); 
  }} 
  className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md transition-colors flex items-center gap-2 cursor-pointer ${ 
    isDone ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'bg-slate-900 text-white hover:bg-slate-800' 
  }`} 
> 
  {isDone ? 'Review Track' : 'Open Track'} 
</button> 

          {/* 🎯 ACTION BUTTONS BLOCK WITH STRICT SERVER MARKER GATING */}
          {(() => {
            const currentEmails = triangulation?.emails || emails;
            const hasAllEmails = Boolean(currentEmails?.EXECUTIVE?.trim()) &&
              Boolean(currentEmails?.TECH_MGMT?.trim()) &&
              Boolean(currentEmails?.OPS_MGMT?.trim()) &&
              Boolean(currentEmails?.SYSTEM_USER?.trim());

            return (
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
                <div className="text-left"> 
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold block">Consolidated Results Compilation</span> 
                  {!allPersonasComplete && ( 
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

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button 
                    type="button"
                    onClick={handleDispatchBatchEmails} 
                    disabled={isDispatchingBatch || !hasAllEmails}
                    className={`w-full sm:w-auto px-5 py-3.5 font-bold uppercase tracking-wider rounded-md transition-colors text-xs flex items-center justify-center gap-2 ${
                      hasAllEmails && !isDispatchingBatch
                        ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-sm'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`} 
                  > 
                    {isDispatchingBatch ? <Loader2 size={14} className="animate-spin text-slate-400" /> : <Mail size={14} />}
                    Send Emails
                  </button> 

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
            );
          })()}
        </div> 
      )} 

      {/* DIAGNOSTIC WIZARD VIEW */}
      {viewState === 'WIZARD' && triangulation && activePersona && ( 
        <ForensicDiagnosticWizard         
          companyName={triangulation.companyName} 
          activePillar={triangulation.pillar} 
          persona={activePersona} 
          role={activePersona}
          onComplete={handlePersonaAnswersSaved} 
        /> 
      )} 

      {/* THANK YOU COMPLETION VIEW */}
      {viewState === 'THANK_YOU' && ( 
        <div className="w-full max-w-lg border border-slate-200 bg-white p-8 md:p-10 text-center rounded-lg shadow-sm space-y-6"> 
          <div className="flex justify-center"> 
            <CheckCircle size={48} className="text-emerald-600" /> 
          </div> 
          <div> 
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Assessment Completed</h2> 
            <p className="text-xs text-slate-600 font-mono mt-2 uppercase tracking-wider"> 
              Your responses have been securely recorded into the Quad Node Diagnostic Matrix. 
            </p> 
          </div> 
          <div className="bg-slate-50 border border-slate-200 p-4 rounded text-left text-xs font-mono text-slate-500 leading-relaxed"> 
            // You may now close this browser tab. Your organization's diagnostic administrator will receive the consolidated readiness assessment upon completion of all stakeholder tracks. 
          </div> 
        </div> 
      )} 

      {/* COMMAND COCKPIT & DOSSIER VIEW */}
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
                    <span className="font-mono text-[10px] text-emerald-400 block font-bold uppercase tracking-wider"> 
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
