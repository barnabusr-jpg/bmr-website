import {
  DiagnosticExportState,
  NodeEvaluationRecord,
  Level2RunbookPhase,
  ComplianceAuditRecord,
  GovernancePolicyGate,
  GateStatus,
} from '../types/playbookExport';
import { forensicQuestions } from '../data/forensicQuestions';

export interface AdapterInput {
  companyName: string;
  sector: string;
  rawResponses: Record<string, any>;
  readinessValue: number;
  wasteTaxValue: number;
  promiseGapValue: number;
  activeStabilizationFocus: string;
  unmanagedDriftImpact: string;
}

const AUTONOMOUS_ASSURANCE_THRESHOLD = 70;

export interface StatusProvenanceBadgeResult {
  label: string;
  provenance: string;
  badgeClass: string;
  pdfBgHex: string;
  pdfBorderHex: string;
  pdfTextHex: string;
}

export function getStatusProvenanceBadge(
  status: GateStatus,
  source: 'RESPONSE_DERIVED' | 'METHODOLOGY_BASELINE'
): StatusProvenanceBadgeResult {
  switch (status) {
    case 'VERIFIED':
      return {
        label: 'GATE VERIFIED',
        provenance: source === 'RESPONSE_DERIVED' ? '[TELEMETRY VALIDATED]' : '[ASSURANCE BASELINE]',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        pdfBgHex: '#ecfdf5',
        pdfBorderHex: '#a7f3d0',
        pdfTextHex: '#047857',
      };

    case 'ACTION_REQUIRED':
      return {
        label: 'ACTION REQUIRED',
        provenance: source === 'METHODOLOGY_BASELINE' ? '[TIER 2 POLICY CEILING]' : '[TELEMETRY DEFICIT]',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        pdfBgHex: '#fffbeb',
        pdfBorderHex: '#fde68a',
        pdfTextHex: '#b45309',
      };

    case 'MONITORED':
      return {
        label: 'RUNTIME MONITORED',
        provenance: source === 'RESPONSE_DERIVED' ? '[SHADOW STAGING ACTIVE]' : '[SHADOW STAGING REQUIRED]',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
        pdfBgHex: '#eff6ff',
        pdfBorderHex: '#bfdbfe',
        pdfTextHex: '#1d4ed8',
      };

    case 'DISCREPANCY':
    default:
      return {
        label: 'DISCREPANCY',
        provenance:
          source === 'RESPONSE_DERIVED'
            ? '[CRITICAL DRIFT // VERIFIED]'
            : '[CONTROL GAP // UNVERIFIED IN RUNTIME]',
        badgeClass: 'bg-red-50 text-red-700 border-red-200',
        pdfBgHex: '#fef2f2',
        pdfBorderHex: '#fecaca',
        pdfTextHex: '#b91c1c',
      };
  }
}

const CHOICE_INSULATION_SCORE: Record<string, number> = {
  A: 100,
  B: 72,
  C: 38,
  D: 12,
};

interface NodeTelemetryEvaluation {
  status: GateStatus;
  source: 'RESPONSE_DERIVED' | 'METHODOLOGY_BASELINE';
  insulationPct: number;
  observedPattern: string;
}

function evaluateNodeFromResponses(
  rawResponses: Record<string, any>,
  isComplete: boolean,
  fallbackWeight: number,
  readinessValue: number,
  nodeKey: 'NODE_01' | 'NODE_02' | 'NODE_03' | 'NODE_04',
  defaultPattern: string
): NodeTelemetryEvaluation {
  const targetMatches = (targetNode?: string): boolean => {
    const t = String(targetNode || '').toUpperCase();
    if (nodeKey === 'NODE_01') return t.includes('EXEC');
    if (nodeKey === 'NODE_02') return t.includes('TECH');
    if (nodeKey === 'NODE_03') return t.includes('MGMT') || t.includes('MANAG') || t.includes('OPS');
    if (nodeKey === 'NODE_04') return t.includes('USER') || t.includes('SYS');
    return false;
  };

  const matchedAnswers: Array<{
    choice: string;
    score: number;
    subarea: string;
  }> = [];

  for (const [key, val] of Object.entries(rawResponses || {})) {
    if (!key.startsWith('quad_')) continue;
    const questionId = key.replace(/^quad_/, '');
    const questionMeta = forensicQuestions[questionId];
    if (!questionMeta || !targetMatches(questionMeta.target_node)) continue;

    const choice = String(val || '').toUpperCase().trim();
    if (choice in CHOICE_INSULATION_SCORE) {
      matchedAnswers.push({
        choice,
        score: CHOICE_INSULATION_SCORE[choice],
        subarea: questionMeta.subarea || questionId,
      });
    }
  }

  const noQuadLetters = matchedAnswers.length === 0;

  // Marker-only completion: stakeholder completed the track, derive status from completion + readiness
  if (noQuadLetters && isComplete) {
    const derived = Math.round(readinessValue * fallbackWeight);
    const insulationPct = Math.min(100, Math.max(55, derived));

    let status: GateStatus = 'ACTION_REQUIRED';
    if (insulationPct >= AUTONOMOUS_ASSURANCE_THRESHOLD) {
      status = 'VERIFIED';
    } else if (insulationPct >= 45) {
      status = nodeKey === 'NODE_04' ? 'MONITORED' : 'ACTION_REQUIRED';
    }

    return {
      status,
      source: 'RESPONSE_DERIVED',
      insulationPct,
      observedPattern:
        nodeKey === 'NODE_04'
          ? 'Stakeholder track verified; runtime human-in-the-loop staging active pending threshold gate.'
          : 'Stakeholder track verified; control plane telemetry calibrated against organizational readiness baseline.',
    };
  }

  // Incomplete track with no recorded responses: return baseline control-gap state
  if (noQuadLetters && !isComplete) {
    return {
      status: nodeKey === 'NODE_04' ? 'MONITORED' : 'DISCREPANCY',
      source: 'METHODOLOGY_BASELINE',
      insulationPct: Math.max(15, Math.min(95, Math.round(readinessValue * fallbackWeight))),
      observedPattern: defaultPattern,
    };
  }

  // Full response-derived calculation from quad_* choice letters (A/B/C/D)
  const insulationPct = Math.round(
    matchedAnswers.reduce((sum, item) => sum + item.score, 0) / matchedAnswers.length
  );

  const severeSubareas = matchedAnswers
    .filter((a) => a.choice === 'C' || a.choice === 'D')
    .map((a) => a.subarea);

  const moderateSubareas = matchedAnswers
    .filter((a) => a.choice === 'B')
    .map((a) => a.subarea);

  let observedPattern = defaultPattern;
  if (severeSubareas.length > 0) {
    const highlighted = Array.from(new Set(severeSubareas)).slice(0, 2).join(', ');
    observedPattern = `High drift exposure detected across ${highlighted} (${severeSubareas.length} of ${matchedAnswers.length} controls uninsulated).`;
  } else if (moderateSubareas.length > 0) {
    const highlighted = Array.from(new Set(moderateSubareas)).slice(0, 2).join(', ');
    observedPattern = `Manual verification controls active across ${highlighted}; automated enforcement gates absent.`;
  } else {
    observedPattern = `Automated control boundaries verified across all ${matchedAnswers.length} assessed node vectors.`;
  }

  let status: GateStatus = 'ACTION_REQUIRED';
  if (insulationPct >= AUTONOMOUS_ASSURANCE_THRESHOLD) {
    status = 'VERIFIED';
  } else if (insulationPct >= 45) {
    status = nodeKey === 'NODE_04' ? 'MONITORED' : 'ACTION_REQUIRED';
  } else {
    status = 'DISCREPANCY';
  }

  return {
    status,
    source: 'RESPONSE_DERIVED',
    insulationPct,
    observedPattern,
  };
}

export function deriveDynamicDiagnosticSnapshot(input: AdapterInput): DiagnosticExportState {
  const {
    companyName,
    sector,
    rawResponses,
    readinessValue,
    wasteTaxValue,
    promiseGapValue,
    activeStabilizationFocus,
    unmanagedDriftImpact,
  } = input;

  const raw = rawResponses || {};
  const hasMarker = (val: unknown): boolean =>
    val !== undefined && val !== null && val !== false && String(val).trim() !== '';

  const node1Complete = hasMarker(raw['QUAD_EXE_COMPLETE']);
  const node2Complete = hasMarker(raw['QUAD_TEC_COMPLETE']);
  const node3Complete = hasMarker(raw['QUAD_MGR_COMPLETE']);
  const node4Complete = Boolean(
    raw['RUNTIME_SHADOW_QUEUE_ACTIVE'] ?? hasMarker(raw['QUAD_SYS_COMPLETE'])
  );

  const n1 = evaluateNodeFromResponses(
    raw,
    node1Complete,
    0.85,
    readinessValue,
    'NODE_01',
    'Board policy established without runtime telemetry verification.'
  );
  const n2 = evaluateNodeFromResponses(
    raw,
    node2Complete,
    0.70,
    readinessValue,
    'NODE_02',
    'Unmonitored schema mutations and sliding API payloads trigger integration friction.'
  );
  const n3 = evaluateNodeFromResponses(
    raw,
    node3Complete,
    0.75,
    readinessValue,
    'NODE_03',
    'Alert noise proliferation and verification fatigue.'
  );
  const n4 = evaluateNodeFromResponses(
    raw,
    node4Complete,
    0.95,
    readinessValue,
    'NODE_04',
    'Manual triage masking pipeline failure; runtime human-in-the-loop fallback staging.'
  );

  const nodeMatrix: NodeEvaluationRecord[] = [
    {
      nodeKey: 'NODE_01',
      nodeLabel: 'Executive Governance (Node 01)',
      observedPattern: n1.observedPattern,
      operationalImpact: 'Executive vision diverges from live execution, creating governance friction and audit trail gaps.',
      recommendedGate: 'Enforce runtime telemetry verification before scaling.',
      status: n1.status,
      statusSource: n1.source,
      insulationIntegrityPct: n1.insulationPct,
    },
    {
      nodeKey: 'NODE_02',
      nodeLabel: 'Engineering & Infrastructure (Node 02)',
      observedPattern: n2.observedPattern,
      operationalImpact: 'Downstream serialization failures and silent context contamination across pipelines.',
      recommendedGate: 'Deploy GraphQL/OpenAPI schema validation gates and microservice circuit breakers.',
      status: n2.status,
      statusSource: n2.source,
      insulationIntegrityPct: n2.insulationPct,
    },
    {
      nodeKey: 'NODE_03',
      nodeLabel: 'Operations & Management (Node 03)',
      observedPattern: n3.observedPattern,
      operationalImpact: 'Engineering squads exhaust 25%–40% sprint capacity on repeat manual reconciliations.',
      recommendedGate: 'Enforce Purview sensitivity tagging and dependency isolation runbooks.',
      status: n3.status,
      statusSource: n3.source,
      insulationIntegrityPct: n3.insulationPct,
    },
    {
      nodeKey: 'NODE_04',
      nodeLabel: 'Frontline System Execution (Node 04)',
      observedPattern: n4.observedPattern,
      operationalImpact: 'Unchecked agent writes risk directly mutating core database systems of record.',
      recommendedGate: 'Establish draft shadow queue staging prior to write access.',
      status: n4.status,
      statusSource: n4.source,
      insulationIntegrityPct: n4.insulationPct,
    },
  ];

  const evaluatedPhases: Level2RunbookPhase[] = [
    {
      phase: 'PHASE 01',
      title: 'Pipeline Hardening & Schema Abstraction',
      scope: 'Deploy strict GraphQL/OpenAPI schema validation gates, microservice adapter decoupling, circuit breakers.',
      deliverables: [
        'OpenAPI/JSON Schema Contract Gate Specifications',
        'Microservice Ingestion Decoupling Layer',
        'Automated Circuit Breaker Protocol (<18.8% operational drift trip)',
      ],
      timeline: 'Weeks 1 – 3',
      allocation: 'Senior Data Eng + SecOps',
      status: node2Complete ? 'ACTIVE' : 'PENDING_APPROVAL',
      gatingPrerequisiteMet: true,
    },
    {
      phase: 'PHASE 02',
      title: 'Telemetry Decoupling & Alarm Filtering',
      scope: 'Implement Purview/DLP sensitivity tagging, suppress alert fatigue loops, install audit trail logging.',
      deliverables: [
        'Purview/DLP Automated Sensitivity Tagging Pipeline',
        'Alert Noise Suppression Rulebook (reduces 70% triage loops)',
        'Tamper-Evident Forensic Audit Logging Engine',
      ],
      timeline: 'Weeks 4 – 6',
      allocation: 'DevOps + Platform Lead',
      status: node2Complete && readinessValue > 50 ? 'PENDING_APPROVAL' : 'QUEUED',
      gatingPrerequisiteMet: node2Complete && readinessValue > 50,
    },
    {
      phase: 'PHASE 03',
      title: 'Autonomous Governance & Deployment Gate Enforcement',
      scope: 'Automate Purview data loss prevention policies, continuous model evaluation pipelines, executive dashboards.',
      deliverables: [
        'Automated Deployment Gate Boundary Controller',
        'Continuous Model Drift Evaluation Pipeline',
        'Board-Level Executive Steering Telemetry Mirror',
      ],
      timeline: 'Weeks 7 – 8',
      allocation: 'Enterprise Architect',
      status: 'QUEUED',
      gatingPrerequisiteMet: false,
    },
  ];

  const complianceSafeguards: ComplianceAuditRecord[] = [
    {
      standard: 'ISO 9001:2015',
      clause: 'Clause 8.5.1',
      finding: 'Messaging anomalies create unmapped distribution risk across processing boundaries.',
      severity: 'HIGH',
      linkedPhase: 'PHASE 01',
      linkedNode: 'NODE 02',
    },
    {
      standard: 'HL7 FHIR v4 / Conformance',
      clause: 'Data Conformance Layer',
      finding: 'Unstructured payload drift triggers silent serialization failures during automated execution.',
      severity: 'CRITICAL',
      linkedPhase: 'PHASE 01',
      linkedNode: 'NODE 02',
    },
    {
      standard: 'PCI-DSS v4.0',
      clause: 'Req 10.2 (Audit Boundaries)',
      finding: 'Telemetry processing latency interrupts automated auditing and compliance isolation.',
      severity: 'HIGH',
      linkedPhase: 'PHASE 02',
      linkedNode: 'NODE 03',
    },
    {
      standard: 'SOX Act (Section 404)',
      clause: 'Internal Controls Over Financial Reporting',
      finding: 'Operational drift compromises internal reporting telemetry integrity and financial boundaries.',
      severity: 'MEDIUM',
      linkedPhase: 'PHASE 03',
      linkedNode: 'NODE 01',
    },
  ];

  const governanceGates: GovernancePolicyGate[] = [
    {
      stage: 'PHASE 01',
      name: 'Human-in-the-Loop Shadow Queue',
      thresholdTarget: '98%+ verification requirement for all autonomous agent proposals',
      enforcementRule: 'All AI agent decisions staged to quarantine queue prior to data lake ingestion',
      policyVersion: 'v2026.2-strict',
      activeEnforcement: true,
    },
    {
      stage: 'PHASE 02',
      name: 'Confidence-Based Auto-Execution Gate',
      thresholdTarget: 'Confidence Score >= 0.992 on low-dollar / low-risk transaction units',
      enforcementRule: 'Automated execution permitted only if schema signature and confidence band align',
      policyVersion: 'v2026.2-strict',
      activeEnforcement: readinessValue >= AUTONOMOUS_ASSURANCE_THRESHOLD,
    },
    {
      stage: 'PHASE 03',
      name: 'Verified Autonomous Action (System of Record Writes)',
      thresholdTarget: 'Zero unmapped schema exceptions over 72-hour rolling verification window',
      enforcementRule: 'Direct writes permitted exclusively behind isolated circuit-breaker proxies',
      policyVersion: 'v2026.2-strict',
      activeEnforcement: false,
    },
  ];

  return {
    isHydrated: true,
    readinessIndex: {
      metricKey: 'AUTOMATION_READINESS_INDEX',
      value: readinessValue,
      label: 'Automation Readiness Index',
      tag: '[BASELINE / 100]',
      scope: 'ANNUALIZED_SINGLE_YEAR',
      currency: 'SCORE_POINTS',
    },
    processWasteTax: {
      metricKey: 'PROCESS_WASTE_TAX',
      value: wasteTaxValue,
      label: 'Process Waste Tax',
      tag: '[ANNUAL]',
      scope: 'ANNUALIZED_SINGLE_YEAR',
      currency: 'USD',
    },
    promiseGapRisk: {
      metricKey: 'PROMISE_GAP_EXPOSURE',
      value: promiseGapValue,
      label: 'Promise Gap™ Annual Risk',
      tag: '[ANNUAL RISK]',
      scope: 'ANNUALIZED_SINGLE_YEAR',
      currency: 'USD',
    },
    hierarchyVerdictText: `Based on assessed verification and workflow control patterns, current alignment indicates an estimated Process Waste Tax impact of approximately $${wasteTaxValue.toLocaleString()} annually (Readiness Index: ${readinessValue}/100).`,
    activeStabilizationFocus,
    unmanagedDriftImpact,
    nodeMatrix,
    evaluatedPhases,
    complianceSafeguards,
    governanceGates,
  };
}
