import {
  DiagnosticExportState,
  NodeEvaluationRecord,
  Level2RunbookPhase,
  ComplianceAuditRecord,
  GovernancePolicyGate,
  GateStatus,
} from '../types/playbookExport';

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
        provenance: '[DATA GAP // UNVERIFIED]',
        badgeClass: 'bg-red-50 text-red-700 border-red-200',
        pdfBgHex: '#fef2f2',
        pdfBorderHex: '#fecaca',
        pdfTextHex: '#b91c1c',
      };
  }
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

  const node1Complete = Boolean(rawResponses['QUAD_EXE_COMPLETE']);
  const node2Complete = Boolean(rawResponses['QUAD_TEC_COMPLETE']);
  const node3Complete = Boolean(rawResponses['QUAD_MGR_COMPLETE']);
  const node4Complete = Boolean(
    rawResponses['RUNTIME_SHADOW_QUEUE_ACTIVE'] ?? rawResponses['QUAD_SYS_COMPLETE']
  );

  const resolveNodeMetrics = (
    isComplete: boolean,
    weightFactor: number,
    nodeKey: 'NODE_01' | 'NODE_02' | 'NODE_03' | 'NODE_04'
  ): { status: GateStatus; source: 'RESPONSE_DERIVED' | 'METHODOLOGY_BASELINE'; insulationPct: number } => {
    if (!isComplete) {
      return {
        status: nodeKey === 'NODE_04' ? 'MONITORED' : 'DISCREPANCY',
        source: 'METHODOLOGY_BASELINE',
        insulationPct: Math.round(readinessValue * weightFactor),
      };
    }

    if (readinessValue < AUTONOMOUS_ASSURANCE_THRESHOLD) {
      if (nodeKey === 'NODE_04') {
        return {
          status: 'VERIFIED',
          source: 'RESPONSE_DERIVED',
          insulationPct: Math.min(Math.round(readinessValue * (1 + (1 - weightFactor))), 100),
        };
      }
      return {
        status: 'ACTION_REQUIRED',
        source: 'METHODOLOGY_BASELINE',
        insulationPct: Math.min(Math.round(readinessValue * (1 + (1 - weightFactor))), 100),
      };
    }

    return {
      status: 'VERIFIED',
      source: 'RESPONSE_DERIVED',
      insulationPct: Math.min(readinessValue + 10, 100),
    };
  };

  const n1 = resolveNodeMetrics(node1Complete, 0.85, 'NODE_01');
  const n2 = resolveNodeMetrics(node2Complete, 0.70, 'NODE_02');
  const n3 = resolveNodeMetrics(node3Complete, 0.75, 'NODE_03');
  const n4 = resolveNodeMetrics(node4Complete, 0.95, 'NODE_04');

  const nodeMatrix: NodeEvaluationRecord[] = [
    {
      nodeKey: 'NODE_01',
      nodeLabel: 'Executive Governance (Node 01)',
      observedPattern: 'Board policy established without runtime telemetry verification.',
      operationalImpact: 'Executive vision diverges from live execution, creating governance friction and audit trail gaps.',
      recommendedGate: 'Enforce runtime telemetry verification before scaling.',
      status: n1.status,
      statusSource: n1.source,
      insulationIntegrityPct: n1.insulationPct,
    },
    {
      nodeKey: 'NODE_02',
      nodeLabel: 'Engineering & Infrastructure (Node 02)',
      observedPattern: 'Unmonitored schema mutations and sliding API payloads trigger integration friction.',
      operationalImpact: 'Downstream serialization failures and silent context contamination across pipelines.',
      recommendedGate: 'Deploy GraphQL/OpenAPI schema validation gates and microservice circuit breakers.',
      status: n2.status,
      statusSource: n2.source,
      insulationIntegrityPct: n2.insulationPct,
    },
    {
      nodeKey: 'NODE_03',
      nodeLabel: 'Operations & Management (Node 03)',
      observedPattern: 'Alert noise proliferation and verification fatigue.',
      operationalImpact: 'Engineering squads exhaust 25%–40% sprint capacity on repeat manual reconciliations.',
      recommendedGate: 'Enforce Purview sensitivity tagging and dependency isolation runbooks.',
      status: n3.status,
      statusSource: n3.source,
      insulationIntegrityPct: n3.insulationPct,
    },
    {
      nodeKey: 'NODE_04',
      nodeLabel: 'Frontline System Execution (Node 04)',
      observedPattern: 'Manual triage masking pipeline failure; runtime human-in-the-loop fallback staging.',
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
