import { DiagnosticExportState, TelemetryPreImage, PlaybookProvenance } from '../types/playbookExport';
import { computeStrictSha256 } from './canonicalHash';

export const REQUIRED_QUAD_NODE_MARKERS = [
  'QUAD_EXE_COMPLETE',
  'QUAD_TEC_COMPLETE',
  'QUAD_MGR_COMPLETE',
  'QUAD_SYS_COMPLETE',
] as const;

export function isQuadNodeTriangulationComplete(rawResponses?: Record<string, any> | null): boolean {
  if (!rawResponses || typeof rawResponses !== 'object') {
    return false;
  }

  // Reject preliminary intake funnels / pulse-check data
  if (
    rawResponses['flow_source'] === 'pulse_check' ||
    rawResponses['is_preliminary'] === true ||
    rawResponses['stage'] === 'pulse_check'
  ) {
    return false;
  }

  // Must have all four authoritative completion markers
  return REQUIRED_QUAD_NODE_MARKERS.every((marker) => Boolean(rawResponses[marker]));
}

export interface StructuredCustomerPlaybook {
  provenance: PlaybookProvenance;
  chapter1_executiveBriefing: {
    title: string;
    organization: string;
    sector: string;
    date: string;
    readinessScore: number;
    targetFocus: string;
    narrativeVerdict: string;
  };
  chapter2_financialTaxLedger: {
    title: string;
    processWasteTax: { value: number; scope: string; tag: string };
    promiseGapExposure: { value: number; scope: string; tag: string };
    hierarchyExplanation: string;
    unmanagedDriftImpact: string;
  };
  chapter3_nodeCapabilityMatrix: {
    title: string;
    nodes: Array<{
      nodeKey: string;
      title: string;
      observedPattern: string;
      operationalImpact: string;
      remediationGate: string;
      status: string;
      statusSource: string;
      insulationIntegrityPct: number;
    }>;
  };
  chapter4_complianceAudit: {
    title: string;
    safeguards: Array<{
      standard: string;
      clause: string;
      finding: string;
      severity: string;
      linkedPhase: string;
      linkedNode: string;
    }>;
  };
  chapter5_remediationRoadmap: {
    title: string;
    phases: Array<{
      phase: string;
      title: string;
      scope: string;
      deliverables: string[];
      timeline: string;
      allocation: string;
      status: string;
      gatingPrerequisiteMet: boolean;
    }>;
  };
  chapter6_deploymentGates: {
    title: string;
    gates: Array<{
      stage: string;
      name: string;
      thresholdTarget: string;
      enforcementRule: string;
      policyVersion: string;
      activeEnforcement: boolean;
    }>;
    architecturalStandard: string;
  };
}

function assertValidMetric(value: unknown, metricName: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || Number.isNaN(value)) {
    throw new Error(
      `Audit Pre-Image Validation Error: "${metricName}" must be a valid finite number. Received: ${value}`
    );
  }
  return value;
}

export async function compileCustomerStory(
  companyName: string,
  sector: string,
  diagState: DiagnosticExportState,
  rawResponses: Record<string, any> = {}
): Promise<StructuredCustomerPlaybook> {
  // Fail-closed gate: Strict rejection of preliminary pulse-check intake data
  if (!isQuadNodeTriangulationComplete(rawResponses)) {
    throw new Error(
      `AUDIT_INTEGRITY_VIOLATION: Cannot compile Control Plane Playbook. ` +
      `Preliminary pulse-check data rejected. The playbook strictly requires finalized 4-node triangulated telemetry (${REQUIRED_QUAD_NODE_MARKERS.join(', ')}).`
    );
  }

  const sortedKeys = Object.keys(rawResponses || {}).sort();

  const structuralTypeFingerprint = sortedKeys
    .map((k) => {
      const val = rawResponses[k];
      const typeLabel = val === null ? 'null' : Array.isArray(val) ? 'array' : typeof val;
      const isPopulated = val !== null && val !== undefined && val !== '';
      return `${k}:${typeLabel}:${isPopulated ? '1' : '0'}`;
    })
    .join('|');

  const preImage: TelemetryPreImage = {
    companyName: (companyName || 'Target Organization').trim(),
    sector: (sector || 'FINANCIAL SERVICES').trim(),
    telemetryComplete: true,
    readinessScore: assertValidMetric(diagState.readinessIndex?.value, 'readinessIndex'),
    processWasteTaxAmount: assertValidMetric(diagState.processWasteTax?.value, 'processWasteTax'),
    promiseGapExposureAmount: assertValidMetric(diagState.promiseGapRisk?.value, 'promiseGapExposure'),
    rawResponseKeys: sortedKeys,
    responseVerificationChecksum: `SCHEMA-V2::NODES-${sortedKeys.length}::TYPESIG-${structuralTypeFingerprint.length}`,
  };

  const inputTelemetryHash = await computeStrictSha256(preImage);
  const timestamp = new Date().toISOString();
  const docId = `BMR-PLBK-${companyName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${Date.now().toString(36).toUpperCase()}`;

  return {
    provenance: {
      documentId: docId,
      schemaVersion: '2026.2.0-STRICT',
      generatedAt: timestamp,
      originatingSource: 'Pre-Automation Control Plane Diagnostic Engine',
      inputTelemetryHash,
      preImage,
      classification: 'LEVEL 2 CONTROL PLANE // AUDIT-READY RESTRICTED ACCESS',
    },
    chapter1_executiveBriefing: {
      title: '01 // Executive Briefing & Threat Horizon',
      organization: companyName.replace(/_/g, ' '),
      sector,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readinessScore: diagState.readinessIndex.value,
      targetFocus: diagState.activeStabilizationFocus,
      narrativeVerdict: diagState.hierarchyVerdictText,
    },
    chapter2_financialTaxLedger: {
      title: '02 // Process Waste Tax Ledger & The Promise Gap™',
      processWasteTax: {
        value: diagState.processWasteTax.value,
        scope: diagState.processWasteTax.scope,
        tag: diagState.processWasteTax.tag,
      },
      promiseGapExposure: {
        value: diagState.promiseGapRisk.value,
        scope: diagState.promiseGapRisk.scope,
        tag: diagState.promiseGapRisk.tag,
      },
      hierarchyExplanation:
        'The Automation Readiness Index evaluates core verification strength; the Process Waste Tax quantifies recurring sprint friction and manual reconciliation drag; the Promise Gap™ annualizes unhedged operational risk should uninsulated automations scale.',
      unmanagedDriftImpact: diagState.unmanagedDriftImpact,
    },
    chapter3_nodeCapabilityMatrix: {
      title: '03 // Node Capability Matrix & Operational Drift Analysis',
      nodes: diagState.nodeMatrix.map((n) => ({
        nodeKey: n.nodeKey,
        title: n.nodeLabel,
        observedPattern: n.observedPattern,
        operationalImpact: n.operationalImpact,
        remediationGate: n.recommendedGate,
        status: n.status,
        statusSource: n.statusSource,
        insulationIntegrityPct: n.insulationIntegrityPct,
      })),
    },
    chapter4_complianceAudit: {
      title: '04 // Regulatory Non-Compliance Safeguards Audit',
      safeguards: diagState.complianceSafeguards.map((s) => ({
        standard: s.standard,
        clause: s.clause,
        finding: s.finding,
        severity: s.severity,
        linkedPhase: s.linkedPhase,
        linkedNode: s.linkedNode,
      })),
    },
    chapter5_remediationRoadmap: {
      title: '05 // Level 2 Remediation Runbooks (Statement of Work)',
      phases: diagState.evaluatedPhases.map((p) => ({
        phase: p.phase,
        title: p.title,
        scope: p.scope,
        deliverables: p.deliverables,
        timeline: p.timeline,
        allocation: p.allocation,
        status: p.status,
        gatingPrerequisiteMet: p.gatingPrerequisiteMet,
      })),
    },
    chapter6_deploymentGates: {
      title: '06 // Graduated Autonomy Framework & Deployment Gate Enforcement',
      gates: diagState.governanceGates,
      architecturalStandard:
        'No automated system or agent model may execute write operations directly against core records without clearing graduated autonomy thresholds and human-in-the-loop shadow staging.',
    },
  };
}
