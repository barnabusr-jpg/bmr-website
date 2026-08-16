"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'; 
import ForensicDiagnosticWizard from '../../components/ForensicDiagnosticWizard'; 
import ForensicCommandCockpit from '../../components/ForensicCommandCockpit'; 
import { GovernanceSupplementView } from '../../components/GovernanceSupplementView';
import { 
  ShieldAlert, 
  ArrowRight, 
  Users, 
  CheckCircle, 
  Mail, 
  Loader2, 
  Lock, 
  FileText, 
  ChevronRight, 
  Copy, 
  Check, 
  Printer, 
  RotateCcw 
} from 'lucide-react'; 
import { supabase } from '../../lib/supabaseClient'; 
import { compressToEncodedURIComponent } from 'lz-string';
import { calculateForensicMetrics } from '../../lib/forensicCalculus';

type FunnelPillar = 'IGF' | 'AVS' | 'HAI'; 
type PersonaKey = 'EXECUTIVE' | 'TECH_MGMT' | 'OPS_MGMT' | 'SYSTEM_USER'; 

// HELPER: CANONICAL LOCALSTORAGE KEY NORMALIZER
const sanitizeOrgKey = (org: string): string => org.trim().replace(/\s+/g, ' ');

// STRICT QUAD NODE PERSONA TYPES + LEGACY ALIASES FOR DB READ/WRITE MATCHING
const QUAD_PERSONA_TYPES: Record<PersonaKey, string[]> = {
  EXECUTIVE: ['EXECUTIVE', 'EXEC', 'IGF'],
  TECH_MGMT: ['TECH_MGMT', 'TECH', 'TECHNICAL', 'AVS'],
  OPS_MGMT: ['OPS_MGMT', 'OPS', 'MANAGERIAL', 'HAI'],
  SYSTEM_USER: ['SYSTEM_USER', 'SYS', 'USER', 'OPERATOR'],
};

// FRESH QUAD NODE ARCHITECTURE: CONSTANT FOR FORCED FRESH EMAILS
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
  responses: Record<PersonaKey, Record<string, string>>; 
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
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);

  // INLINE EMAIL EDITING STATE
  const [editingPersona, setEditingPersona] = useState<PersonaKey | null>(null);
  const [tempEmailInput, setTempEmailInput] = useState<string>('');

  const isSyncingRef = useRef(false);
  const didBootRef = useRef(false);

  const [emails, setEmails] = useState<Record<PersonaKey, string>>(FRESH_EMPTY_EMAILS); 

  const [triangulation, setTriangulation] = useState<TriangulationState | null>(null); 
  const [activePersona, setActivePersona] = useState<PersonaKey | null>(null); 
  const [inputError, setInputError] = useState(''); 

  // IDENTITY REFS TO PREVENT STALE CLOSURES
  const companyNameRef = useRef(companyName);
  const activePillarRef = useRef(activePillar);
  const emailsRef = useRef(emails);
  const activeAuditIdRef = useRef(activeAuditId);

  useEffect(() => { companyNameRef.current = companyName; }, [companyName]);
  useEffect(() => { activePillarRef.current = activePillar; }, [activePillar]);
  useEffect(() => { emailsRef.current = emails; }, [emails]);
  useEffect(() => { activeAuditIdRef.current = activeAuditId; }, [activeAuditId]);

  const synchronizeEngineDataMatrix = useCallback(async (force = false) => {
    if (isSyncingRef.current && !force) {
      console.log('[sync] skipped due to active sync lock', { force, isSyncing: isSyncingRef.current });
      return;
    }

    console.log('[sync] enter', { force, isSyncingRef: isSyncingRef.current });
    isSyncingRef.current = true;

    const params = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search) 
      : new URLSearchParams();

    const idParam = params.get('id') || activeAuditIdRef.current;
    const codeParam = params.get('code');
    const entityParam = params.get('entity') || params.get('org') || params.get('entity_code');

    const latestCompanyName = companyNameRef.current;
    const latestActivePillar = activePillarRef.current;

    let targetCompanyName = sanitizeOrgKey(entityParam || latestCompanyName || '');

    try {
      const flowParam = params.get('flow');
      const roleParam = params.get('role') as PersonaKey;
      const pillarParam = params.get('pillar') as FunnelPillar;
      const authVal = params.get('auth');
      const viewParam = params.get('view');

      const isAdminSession = (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true');
      const isParticipantRoute = !isAdminSession && !!(codeParam || roleParam);

      // 1. PARTICIPANT ROUTE FROM EMAIL LINK
      if (isParticipantRoute && roleParam) {
        const targetPillar = (pillarParam && ['IGF', 'AVS', 'HAI'].includes(pillarParam.toUpperCase()))
          ? (pillarParam.toUpperCase() as FunnelPillar)
          : latestActivePillar;

        if (targetCompanyName) {
          setCompanyName(targetCompanyName);
          setIsCompanyFromDB(true);

          if (!idParam) {
            const { data: participantAudit } = await supabase
              .from('audits')
              .select('id')
              .eq('org_name', targetCompanyName)
              .eq('status', 'IN_PROGRESS')
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (participantAudit?.id) {
              setActiveAuditId(participantAudit.id);
              activeAuditIdRef.current = participantAudit.id;
            }
          } else {
            setActiveAuditId(idParam);
            activeAuditIdRef.current = idParam;
          }
        }

        setActivePersona(roleParam);
        setActivePillar(targetPillar);

        setTriangulation(prev => {
          const nextOrg = (targetCompanyName || "Quad Node Client System").trim().toLowerCase();
          const prevOrg = prev?.companyName?.trim().toLowerCase();

          if (!prev || !prevOrg || prevOrg !== nextOrg) {
            return {
              companyName: targetCompanyName || "Quad Node Client System",
              pillar: targetPillar,
              emails: FRESH_EMPTY_EMAILS,
              completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false },
              responses: { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} }
            };
          }
          return prev;
        });

        // PRE-FLIGHT CHECK: HAS PARTICIPANT ALREADY COMPLETED THIS SURVEY?
        const currentAuditId = idParam || activeAuditIdRef.current;
        if (currentAuditId) {
          const { data: checkOps } = await supabase
            .from('operators')
            .select('survey_completed, status, raw_responses')
            .or(`audit_id.eq.${currentAuditId},group_id.eq.${currentAuditId}`)
            .in('persona_type', QUAD_PERSONA_TYPES[roleParam]);

          const isAlreadyCompleted = (checkOps ?? []).some(checkOp => {
            const isCompletedBool = checkOp.survey_completed === true || String(checkOp.survey_completed) === 'true';
            const isCompletedStatus = ['COMPLETED', 'COMPLETE'].includes(String(checkOp.status ?? '').toUpperCase());
            const hasRawResp = checkOp.raw_responses && Object.keys(checkOp.raw_responses).length > 0;
            return isCompletedBool || isCompletedStatus || hasRawResp;
          });

          if (isAlreadyCompleted) {
            if (typeof window !== 'undefined') {
              const url = new URL(window.location.href);
              url.searchParams.delete('code');
              url.searchParams.delete('role');
              url.searchParams.delete('track');
              url.searchParams.delete('pillar');
              url.searchParams.delete('flow');
              url.searchParams.delete('view');
              window.history.replaceState({}, '', url.toString());
            }
            setViewState('THANK_YOU');
            return;
          }
        }

        // HARD-CLEAR PARTICIPANT ROUTE PARAMS ONCE RESOLVED TO PREVENT RE-TRIGGER LOOPS
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('code');
          url.searchParams.delete('role');
          url.searchParams.delete('track');
          url.searchParams.delete('pillar');
          url.searchParams.delete('flow');
          url.searchParams.delete('view');
          window.history.replaceState({}, '', url.toString());
        }

        if (viewParam === 'cockpit' || viewParam === 'results' || flowParam === 'results') {
          setViewState('COCKPIT');
        } else {
          setViewState('WIZARD');
        }
        return;
      }

      // 2. ADMIN CLEAN EXPLICIT INTAKE ROUTE
      if (isAdminSession && flowParam === 'quad_node' && !idParam && !targetCompanyName) {
        setEmails(FRESH_EMPTY_EMAILS);
        setViewState('INTAKE');
        return;
      }

      // 3. REHYDRATE EXISTING AUDIT BY NAME, ID, OR MATRIX
      let cachedCompletions = { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false };
      let cachedResponses = { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} };

      if (typeof window !== 'undefined' && targetCompanyName) {
        const cacheKey = `bmr_matrix_run_${sanitizeOrgKey(targetCompanyName)}`;
        const rawCache = window.localStorage.getItem(cacheKey);
        if (rawCache) {
          try {
            const parsed = JSON.parse(rawCache);
            if (sanitizeOrgKey(parsed?.companyName || '') === sanitizeOrgKey(targetCompanyName) && parsed?.completions) {
              cachedCompletions = parsed.completions;
            }
            if (parsed?.responses) cachedResponses = parsed.responses;
          } catch (e) { console.error('[Quad Cache] Parse error:', e); }
        }
      }

      let activeAudit: any = null;
      let matchedOperator: any = null;

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
            .select('id, org_name, sfi_score, decay_pct, sector, status')
            .eq('id', targetAuditId)
            .maybeSingle();

          activeAudit = auditData;
        }
      } else if (idParam) {
        const { data } = await supabase
          .from('audits')
          .select('id, org_name, sfi_score, decay_pct, sector, status')
          .eq('id', idParam)
          .maybeSingle();
        activeAudit = data;
      } else if (targetCompanyName) {
        const { data } = await supabase
          .from('audits')
          .select('id, org_name, sfi_score, decay_pct, sector, status')
          .eq('org_name', targetCompanyName)
          .eq('status', 'IN_PROGRESS')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        activeAudit = data;
      }

      let targetCalculatedPillar: FunnelPillar = latestActivePillar;

      if (activeAudit) {
        setActiveAuditId(activeAudit.id);
        activeAuditIdRef.current = activeAudit.id;
        setCompanyName(activeAudit.org_name);
        setIsCompanyFromDB(true);

        const sectorStr = String(activeAudit.sector || '').toUpperCase();
        if (sectorStr.includes('AVS') || sectorStr.includes('MANUFACTURING') || sectorStr.includes('INDUSTRIAL')) {
          targetCalculatedPillar = 'AVS';
        } else if (sectorStr.includes('HAI') || sectorStr.includes('SERVICES')) {
          targetCalculatedPillar = 'HAI';
        } else {
          targetCalculatedPillar = 'IGF';
        }
        setActivePillar(targetCalculatedPillar);

        const { data: existingOperators } = await supabase
          .from('operators')
          .select('persona_type, email, survey_completed, status, audit_id, group_id, raw_responses')
          .or(`group_id.eq.${activeAudit.id},audit_id.eq.${activeAudit.id}`);

        // TELEMETRY-HARDENED COMPLETION EVALUATOR WITH PERMISSIVE BOOLEAN CHECKS
        const checkDbDone = (pKey: PersonaKey) => {
          if (!existingOperators || existingOperators.length === 0) return false;
          const allowedTypes = QUAD_PERSONA_TYPES[pKey];

          const matches = existingOperators.filter(o => {
            const rawPersona = String(o.persona_type || '').toUpperCase().trim();
            return allowedTypes.includes(rawPersona);
          });

          return matches.some(m => {
            const rawSurveyVal = (m as any).survey_completed;
            const isSurveyCompletedBool = 
              rawSurveyVal === true || 
              rawSurveyVal === 1 || 
              ['TRUE', 'T', '1', 'YES'].includes(String(rawSurveyVal ?? '').toUpperCase().trim());

            const isCompletedFlag = 
              isSurveyCompletedBool || 
              ['COMPLETED', 'COMPLETE'].includes(String(m.status ?? '').toUpperCase().trim());

            const rr = (m as any).raw_responses;

            let hasResponses = false;
            if (rr) {
              if (typeof rr === 'object') {
                const values = Array.isArray(rr) ? rr : Object.values(rr);
                hasResponses = values.length > 0 && values.some(v => {
                  if (v === null || v === undefined) return false;
                  if (typeof v === 'object') return Object.keys(v).length > 0;
                  return String(v).trim().length > 0;
                });
              } else if (typeof rr === 'string') {
                hasResponses = rr.trim().length > 0 && rr !== '{}' && rr !== '[]';
              }
            }

            const finalEvaluatedResult = isCompletedFlag || hasResponses;

            console.log('[checkDbDone debug]', {
              pKey,
              matchedPersonaType: m.persona_type,
              survey_completed: m.survey_completed,
              status: m.status,
              isCompletedFlag,
              hasResponses,
              EVALUATED_RESULT: finalEvaluatedResult
            });

            return finalEvaluatedResult;
          });
        };

        const mergedCompletions: Record<PersonaKey, boolean> = {
          EXECUTIVE: checkDbDone('EXECUTIVE'),
          TECH_MGMT: checkDbDone('TECH_MGMT'),
          OPS_MGMT: checkDbDone('OPS_MGMT'),
          SYSTEM_USER: checkDbDone('SYSTEM_USER'),
        };

        setTriangulation(prev => {
          const resolvedOrg = (activeAudit?.org_name ?? targetCompanyName)?.trim();
          const prevOrg = prev?.companyName?.trim();

          const isMatchingOrg =
            !!resolvedOrg &&
            !!prevOrg &&
            prevOrg.toLowerCase() === resolvedOrg.toLowerCase();

          const currentActiveEmails = {
            EXECUTIVE: prev?.emails?.EXECUTIVE || emailsRef.current.EXECUTIVE || '',
            TECH_MGMT: prev?.emails?.TECH_MGMT || emailsRef.current.TECH_MGMT || '',
            OPS_MGMT: prev?.emails?.OPS_MGMT || emailsRef.current.OPS_MGMT || '',
            SYSTEM_USER: prev?.emails?.SYSTEM_USER || emailsRef.current.SYSTEM_USER || '',
          };

          setEmails(currentActiveEmails);

          return {
            companyName: resolvedOrg || prev?.companyName || targetCompanyName,
            pillar: targetCalculatedPillar,
            emails: currentActiveEmails,
            completions: mergedCompletions,
            responses: (isMatchingOrg && prev?.responses && Object.keys(prev.responses).length > 0)
              ? prev.responses
              : cachedResponses,
          };
        });

        if (viewParam === 'cockpit' || viewParam === 'results' || flowParam === 'results') {
          setViewState('COCKPIT');
          return;
        }

        if (matchedOperator && !isAdminSession) {
          const rawPersona = String(matchedOperator.persona_type || '').toUpperCase().trim();
          let mappedKey: PersonaKey = 'EXECUTIVE';
          if (QUAD_PERSONA_TYPES.TECH_MGMT.includes(rawPersona)) mappedKey = 'TECH_MGMT';
          if (QUAD_PERSONA_TYPES.OPS_MGMT.includes(rawPersona)) mappedKey = 'OPS_MGMT';
          if (QUAD_PERSONA_TYPES.SYSTEM_USER.includes(rawPersona)) mappedKey = 'SYSTEM_USER';

          setActivePersona(mappedKey);

          if (matchedOperator.survey_completed || String(matchedOperator.status).toUpperCase() === 'COMPLETED') {
            setViewState('THANK_YOU');
          } else {
            setViewState('WIZARD');
          }
          return;
        }

        setViewState('HUB');
      } else if (targetCompanyName) {
        setTriangulation(prev => {
          const nextOrg = targetCompanyName.trim().toLowerCase();
          const prevOrg = prev?.companyName?.trim().toLowerCase();

          const currentActiveEmails = {
            EXECUTIVE: prev?.emails?.EXECUTIVE || emailsRef.current.EXECUTIVE || '',
            TECH_MGMT: prev?.emails?.TECH_MGMT || emailsRef.current.TECH_MGMT || '',
            OPS_MGMT: prev?.emails?.OPS_MGMT || emailsRef.current.OPS_MGMT || '',
            SYSTEM_USER: prev?.emails?.SYSTEM_USER || emailsRef.current.SYSTEM_USER || '',
          };

          setEmails(currentActiveEmails);

          const isMatchingOrg =
            !!nextOrg &&
            !!prevOrg &&
            prevOrg === nextOrg;

          return {
            companyName: targetCompanyName,
            pillar: latestActivePillar,
            emails: currentActiveEmails,
            completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false },
            responses: (isMatchingOrg && prev?.responses) ? prev.responses : cachedResponses,
          };
        });

        if (viewParam === 'cockpit' || viewParam === 'results' || flowParam === 'results') {
          setViewState('COCKPIT');
        } else {
          setViewState('HUB');
        }
      } else {
        setEmails(FRESH_EMPTY_EMAILS);
        setViewState('INTAKE');
      }
    } catch (err) {
      console.error("QUAD_NODE_SYNC_ERROR: Matrix re-sync failed", err);
    } finally {
      isSyncingRef.current = false;
      setHasSynced(true);
    }
  }, []);

  // REALTIME DATABASE LISTENER WITH FORCED REFRESH
  useEffect(() => {
    if (!activeAuditId) return;

    const channel = supabase
      .channel(`audit-operators-${activeAuditId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'operators' },
        () => {
          console.log('[Realtime] Operator table change detected. Forcing matrix sync...');
          synchronizeEngineDataMatrix(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeAuditId, synchronizeEngineDataMatrix]);

  // SECURITY AND AUTHORIZATION GATE
  useEffect(() => { 
    if (typeof window === 'undefined' || didBootRef.current) return; 

    try { 
      const params = new URLSearchParams(window.location.search); 
      const authVal = params.get('auth'); 
      const codeParam = params.get('code');
      const roleParam = params.get('role') as PersonaKey; 

      const isAdminAuthenticated = (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true'); 
      const isParticipantRoute = !isAdminAuthenticated && !!(codeParam || roleParam); 
      const isAuthorized = isParticipantRoute || isAdminAuthenticated;

      setAuthorizedAdmin(isAuthorized);

      if (isAuthorized) { 
        didBootRef.current = true; 
        synchronizeEngineDataMatrix(); 
      } else {
        setHasSynced(true);
      }
    } catch (e) { 
      console.error("Hydration parsing error:", e); 
      setAuthorizedAdmin(false); 
      setHasSynced(true);
    } 
  }, [synchronizeEngineDataMatrix]); 

  const handlePersonaAnswersSaved = async (personaAnswers?: Record<string, string>) => { 
    if (!activePersona) return;

    const targetPersona = activePersona;
    const answersToSave = (personaAnswers && Object.keys(personaAnswers).length > 0) 
      ? personaAnswers 
      : { status: "completed_via_wizard", completed_at: new Date().toISOString() };

    // 1. OPTIMISTIC LOCAL STATE UPDATE
    setTriangulation(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        completions: {
          ...prev.completions,
          [targetPersona]: true
        },
        responses: {
          ...prev.responses,
          [targetPersona]: answersToSave
        }
      };
    });

    // 2. HARDENED EXACT AUDIT RESOLUTION
    let targetAuditId = activeAuditId || activeAuditIdRef.current;

    if (typeof window !== 'undefined' && !targetAuditId) {
      const params = new URLSearchParams(window.location.search);
      const idFromUrl = params.get('id');
      if (idFromUrl) {
        targetAuditId = idFromUrl;
        setActiveAuditId(idFromUrl);
        activeAuditIdRef.current = idFromUrl;
      }
    }

    const targetOrgName = (companyName || triangulation?.companyName || companyNameRef.current)?.trim();

    if (!targetAuditId && targetOrgName) {
      const { data: auditLookup, error: lookupErr } = await supabase
        .from('audits')
        .select('id')
        .eq('org_name', targetOrgName)
        .eq('status', 'IN_PROGRESS')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (auditLookup?.id) {
        targetAuditId = auditLookup.id;
        setActiveAuditId(targetAuditId);
        activeAuditIdRef.current = targetAuditId;
      } else if (lookupErr) {
        console.error(`[handlePersonaAnswersSaved] Audit lookup error:`, lookupErr.message);
      }
    }

    // CHECK IF THIS WAS A PARTICIPANT SESSION BEFORE WE PURGE URL PARAMS
    let isParticipantSession = false;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const authVal = params.get('auth');
      const isAdmin = (authVal === 'admin_verified_secure' || authVal === 'admin' || authVal === 'true');
      isParticipantSession = !isAdmin && !!(params.get('code') || params.get('role'));
    }

    // 3. PERSIST COMPLETION STATUS TO SUPABASE
    if (targetAuditId) {
      const aliases = QUAD_PERSONA_TYPES[targetPersona];

      try {
        const { data: updatedRows, error: updateErr } = await supabase
          .from('operators')
          .update({
            survey_completed: true,
            status: 'COMPLETED',
            raw_responses: answersToSave,
            updated_at: new Date().toISOString()
          })
          .or(`audit_id.eq.${targetAuditId},group_id.eq.${targetAuditId}`)
          .in('persona_type', aliases)
          .select('id');

        console.log('[handlePersonaAnswersSaved] Update result:', {
          targetAuditId,
          targetPersona,
          aliases,
          updatedCount: updatedRows?.length ?? 0,
          updateErr
        });

        if (!updateErr && (!updatedRows || updatedRows.length === 0)) {
          console.warn(`[handlePersonaAnswersSaved] No pre-existing row found for ${targetPersona} in audit ${targetAuditId}. Upserting dynamic operator row...`);
          
          const fallbackEmail = 
            (triangulation?.emails?.[targetPersona] ?? emailsRef.current[targetPersona]) || 
            `stakeholder_${targetPersona.toLowerCase()}@quadnode.internal`;

          const { data: insertedRows, error: insertErr } = await supabase
            .from('operators')
            .insert({
              audit_id: targetAuditId,
              group_id: targetAuditId,
              persona_type: targetPersona,
              email: fallbackEmail,
              survey_completed: true,
              status: 'COMPLETED',
              raw_responses: answersToSave,
              updated_at: new Date().toISOString()
            })
            .select('id, audit_id, group_id, persona_type, survey_completed, status');

          console.log('[handlePersonaAnswersSaved] INSERT fallback result:', {
            targetAuditId,
            targetPersona,
            insertErr: insertErr?.message || null,
            insertedRowsLength: insertedRows?.length ?? 0,
            insertedRecord: insertedRows?.[0] ?? null
          });
        }

        // HARD-CLEAR ALL PARTICIPANT PARAMETERS FROM URL BEFORE RE-SYNC
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('role');
          url.searchParams.delete('track');
          url.searchParams.delete('code');
          url.searchParams.delete('pillar');
          url.searchParams.delete('view');
          url.searchParams.delete('flow');
          window.history.replaceState({}, '', url.toString());
        }

      } catch (dbErr) {
        console.error('[Save Handler] Database persistence exception:', dbErr);
      }
    }

    setActivePersona(null); 

    // ROUTE PARTICIPANTS TO THANK YOU VIEW; ADMINS TO HUB MONITOR
    if (isParticipantSession) {
      setViewState('THANK_YOU');
    } else {
      setViewState('HUB');
      await synchronizeEngineDataMatrix(true);
    }
  }; 

  const handleInitializeTriangulation = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    const sanitizedInput = companyName.trim(); 
          
    if (!sanitizedInput) { 
      setInputError('Organization record was not resolved.'); 
      return; 
    } 
    if (!emails.EXECUTIVE || !emails.TECH_MGMT || !emails.OPS_MGMT || !emails.SYSTEM_USER) { 
      setInputError('All 4 Quad Node stakeholder emails are required.'); 
      return; 
    } 
          
    setInputError(''); 

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(`bmr_matrix_run_${sanitizeOrgKey(sanitizedInput)}`);
      ['EXECUTIVE', 'TECH_MGMT', 'OPS_MGMT', 'SYSTEM_USER'].forEach(p => {
        window.sessionStorage.removeItem(`quad_cache_${sanitizeOrgKey(sanitizedInput)}_${p}`);
      });
    }

    try { 
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

      const parentAuditId = newAudit.id;
      setActiveAuditId(parentAuditId);

      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('id', parentAuditId);
        url.searchParams.set('flow', 'quad_node');
        window.history.replaceState({}, '', url.toString());
      }

      await supabase
        .from('operators')
        .delete()
        .or(`audit_id.eq.${parentAuditId},group_id.eq.${parentAuditId}`);

      const rowsToInsert = (Object.keys(emails) as PersonaKey[]).map(pKey => ({
        audit_id: parentAuditId,
        group_id: parentAuditId,
        persona_type: pKey,
        email: emails[pKey],
        survey_completed: false,
        status: 'PENDING',
        raw_responses: {},
        updated_at: new Date().toISOString()
      }));

      const { error: insertErr } = await supabase
        .from('operators')
        .insert(rowsToInsert);

      if (insertErr) {
        console.error('[Provisioning Error] Failed to insert fresh operator rows:', insertErr.message);
      }

      const initialTriangulation = { 
        companyName: sanitizedInput, 
        pillar: activePillar, 
        emails: { ...emails }, 
        completions: { EXECUTIVE: false, TECH_MGMT: false, OPS_MGMT: false, SYSTEM_USER: false }, 
        responses: { EXECUTIVE: {}, TECH_MGMT: {}, OPS_MGMT: {}, SYSTEM_USER: {} } 
      };

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(`bmr_matrix_run_${sanitizeOrgKey(sanitizedInput)}`, JSON.stringify(initialTriangulation));
      }

      setTriangulation(initialTriangulation); 
      setViewState('HUB'); 

      await fetch('/api/send-triangulation', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          companyName: sanitizedInput, 
          auditId: parentAuditId,
          endpoints: emails, 
          originUrl: `${window.location.origin}${window.location.pathname}` 
        }), 
      }); 
    } catch (error) { 
      console.error("Quad Node notification dispatch exception:", error); 
    } 
  }; 

  const handleTriggerNudge = async (persona: PersonaKey, overrideEmail?: string) => {
    if (!triangulation) return;
    const email = overrideEmail || triangulation.emails[persona];
    if (!email) return;

    try {
      setSendingNudgeRole(persona);
      const res = await fetch('/api/send-triangulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: triangulation.companyName,
          auditId: activeAuditId || activeAuditIdRef.current,
          endpoints: { [persona]: email },
          isNudge: true,
          originUrl: `${window.location.origin}${window.location.pathname}`
        })
      });

      const payload = await res.json().catch(() => null);

      if (res.ok && payload?.success !== false) {
        alert(`Quad Node reminder notification sent to ${persona.replace('_', ' ')} (${email}).`);
      } else {
        console.warn("Quad Node reminder dispatch returned warning or failure:", payload);
      }
    } catch (err) {
      console.error("Nudge API exception:", err);
    } finally {
      setSendingNudgeRole(null);
    }
  };

  const handleUpdatePersonaEmail = async (persona: PersonaKey) => {
    const newEmail = tempEmailInput.trim();
    if (!newEmail || !triangulation) return;

    const targetAuditId = activeAuditId || activeAuditIdRef.current;

    const updatedEmails = { ...triangulation.emails, [persona]: newEmail };
    const updatedState = { ...triangulation, emails: updatedEmails };

    setTriangulation(updatedState);
    setEmails(updatedEmails);

    if (typeof window !== 'undefined') {
      const cacheKey = `bmr_matrix_run_${sanitizeOrgKey(triangulation.companyName)}`;
      window.localStorage.setItem(cacheKey, JSON.stringify(updatedState));
    }

    if (targetAuditId) {
      try {
        await supabase
          .from('operators')
          .update({ email: newEmail, updated_at: new Date().toISOString() })
          .or(`audit_id.eq.${targetAuditId},group_id.eq.${targetAuditId}`)
          .in('persona_type', QUAD_PERSONA_TYPES[persona]);
      } catch (dbErr) {
        console.error("Failed to update email in operators table:", dbErr);
      }
    }

    setEditingPersona(null);

    try {
      await handleTriggerNudge(persona, newEmail);
    } catch (err) {
      console.warn("Email updated in DB, reminder dispatch skipped:", err);
    }
  };

  // ADMIN TRACK LAUNCH: REMOVES ROLE PARAMETERS FROM URL TO PREVENT SHORT-CIRCUITING
  const handleLaunchPersonaWizard = (persona: PersonaKey) => { 
    setActivePersona(persona); 

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('role');
      url.searchParams.delete('track');
      url.searchParams.delete('code');
      window.history.replaceState({}, '', url.toString());
    }

    setViewState('WIZARD'); 
  }; 

  // SETUP RESET: KEEPS ADMIN AUTHORIZED AND EXPLICITLY KICKS OFF SYNC
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

    setTimeout(() => {
      synchronizeEngineDataMatrix(true);
    }, 0);
  }; 

  const allPersonasComplete = triangulation       
    ? Object.values(triangulation.completions).every(status => status === true) 
    : false; 

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

  if (authorizedAdmin === null || !hasSynced) { 
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
                Dispatch Quad Node Invites <ArrowRight size={14}/> 
              </button> 
            </div> 
          </form> 
        </div> 
      )} 

      {/* FULL UI HUB VIEW WITH 4-NODE STATUS GRID */}
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
              const isEditing = editingPersona === persona;

              return ( 
                <div key={persona} className="border border-slate-200 bg-white p-5 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
                  <div className="flex-1 w-full sm:w-auto"> 
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">{persona.replace('_', ' ')} Track</span> 
                    
                    {isEditing ? (
                      <div className="flex items-center gap-2 mt-1.5 w-full max-w-sm">
                        <input
                          type="email"
                          value={tempEmailInput}
                          onChange={(e) => setTempEmailInput(e.target.value)}
                          placeholder="enter corrected email..."
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-900"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdatePersonaEmail(persona)}
                          className="bg-slate-900 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider hover:bg-slate-800"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPersona(null)}
                          className="text-slate-500 font-mono text-[10px] hover:text-slate-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 block font-mono font-normal">
                          {triangulation.emails[persona] || <span className="italic text-slate-400">No email assigned</span>}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPersona(persona);
                            setTempEmailInput(triangulation.emails[persona] || '');
                          }}
                          className="text-[10px] font-mono text-slate-400 hover:text-slate-900 underline uppercase font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div> 

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0"> 
                    {!isDone && !isEditing && ( 
                      <button 
                        onClick={() => handleTriggerNudge(persona)} 
                        disabled={sendingNudgeRole === persona || !triangulation.emails[persona]}
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

      {/* WIZARD VIEW */}
      {viewState === 'WIZARD' && triangulation && activePersona && ( 
        <ForensicDiagnosticWizard         
          companyName={`${triangulation.companyName}`} 
          activePillar={triangulation.pillar} 
          role={activePersona}
          persona={activePersona}
          onComplete={(finalAnswers?: Record<string, string>) => handlePersonaAnswersSaved(finalAnswers)} 
        /> 
      )} 

      {/* PARTICIPANT THANK YOU VIEW */}
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

      {/* COMMAND COCKPIT VIEW */}
      {viewState === 'COCKPIT' && triangulation && ( 
        <div className="w-full max-w-[1600px] mx-auto text-left"> 
          <div className="mb-4 px-10 no-print flex justify-start"> 
            <button 
              type="button" 
              onClick={handleSystemReset} 
              className="border border-slate-200 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-xs font-mono font-bold px-5 py-2.5 uppercase tracking-wider transition-colors cursor-pointer rounded-md shadow-sm" 
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
