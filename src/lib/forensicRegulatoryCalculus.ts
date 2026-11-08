export type FunnelPillar = 'IGF' | 'AVS' | 'HAI';
export type RegulatoryViolationType = 'CRITICAL_BREACH' | 'DRIFT_RISK' | 'GOVERNANCE_GAP';
export type FrictionVectorType = 'SCHEMA_DRIFT' | 'ALERT_FATIGUE' | 'CONTEXT_INTEGRITY' | 'FIDUCIARY_GAP';

export interface RegulatoryAuditItem {
  id: string;
  standard: string;
  clause: string;
  violationType: RegulatoryViolationType;
  finding: string;
  statutoryRemedy: string;
  remediationPhase: 'PHASE 01' | 'PHASE 02' | 'PHASE 03';
  frictionVector: FrictionVectorType;
}

export interface FrictionProfile {
  hasSchemaDrift: boolean;
  hasAlertFatigue: boolean;
  hasContextIntegrityGap: boolean;
  hasFiduciaryGap: boolean;
  dominantVector: FrictionVectorType;
}

/**
 * Evaluates responses from quad_{SECTOR}-{INDEX}-{NODE} questions.
 * Options "C" and "D" indicate friction / degradation.
 * Baseline threshold: >= 1 degraded response activates vector detection.
 */
export function analyzeFrictionProfile(responses: Record<string, any> = {}): FrictionProfile {
  let techScore = 0;
  let mgmtScore = 0;
  let userScore = 0;
  let execScore = 0;

  Object.entries(responses).forEach(([key, value]) => {
    const val = String(value).toUpperCase();
    const isDegraded = val === 'C' || val === 'D';

    if (key.includes('-TECH') && isDegraded) techScore++;
    if (key.includes('-MGMT') && isDegraded) mgmtScore++;
    if (key.includes('-USER') && isDegraded) userScore++;
    if (key.includes('-EXEC') && isDegraded) execScore++;
  });

  const hasSchemaDrift = techScore >= 1;
  const hasAlertFatigue = mgmtScore >= 1;
  const hasContextIntegrityGap = userScore >= 1;
  const hasFiduciaryGap = execScore >= 1;

  const vectorScores: Array<{ vector: FrictionVectorType; score: number }> = [
    { vector: 'SCHEMA_DRIFT', score: techScore },
    { vector: 'ALERT_FATIGUE', score: mgmtScore },
    { vector: 'CONTEXT_INTEGRITY', score: userScore },
    { vector: 'FIDUCIARY_GAP', score: execScore },
  ];
  vectorScores.sort((a, b) => b.score - a.score);

  return {
    hasSchemaDrift,
    hasAlertFatigue,
    hasContextIntegrityGap,
    hasFiduciaryGap,
    dominantVector: vectorScores[0].score > 0 ? vectorScores[0].vector : 'SCHEMA_DRIFT'
  };
}

/**
 * Master catalog: US Primary + GDPR Privacy/Security Overlay
 */
const REGULATORY_MASTER_CATALOG: Record<FunnelPillar, RegulatoryAuditItem[]> = {
  AVS: [
    {
      id: 'AVS-ISO-01',
      standard: 'ISO 9001:2015',
      clause: 'Clause 8.5.1 (Control of Production & Service Provision)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'SCHEMA_DRIFT',
      finding: 'Unmonitored agent mutations trigger downstream serialization and assembly payload discrepancies.',
      statutoryRemedy: 'Deploy strict OpenAPI schema validation gates and microservice circuit breakers.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'AVS-IEC-02',
      standard: 'IEC 62443-3-3 / NIST SP 800-82r3',
      clause: 'Security Requirements SR 5.2 (Zone Boundary Protection)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Frontline agent endpoints traverse uninspected OT industrial boundary perimeters.',
      statutoryRemedy: 'Enforce dual-key shadow staging queues prior to runtime database or PLC execution.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'AVS-GDPR-03',
      standard: 'GDPR / ISO 27001:2022',
      clause: 'GDPR Art. 25 & 32 // ISO Control A.8.28',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Operator prompts and industrial telemetry ingest identifiable employee and client identifiers into unencrypted context caches.',
      statutoryRemedy: 'Install Purview DLP tokenization proxies and automated context-scrubbing gates.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'AVS-NIST-04',
      standard: 'NIST CSF 2.0 / NIST AI RMF 1.0',
      clause: 'DE.CM-01 (Continuous Monitoring) // MEASURE 2.6',
      violationType: 'DRIFT_RISK',
      frictionVector: 'ALERT_FATIGUE',
      finding: 'High volume alert noise across telemetry consoles forces triage desensitization and missed anomaly alarms.',
      statutoryRemedy: 'Deploy automated alarm threshold filtering and rate-limited escalation runbooks.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'AVS-GOV-05',
      standard: 'NIST AI RMF 1.0',
      clause: 'GOVERN 1.2 (Accountability & Fiduciary Structures)',
      violationType: 'GOVERNANCE_GAP',
      frictionVector: 'FIDUCIARY_GAP',
      finding: 'Board-mandated governance policies lack continuous telemetry feedback to verify compliance ceilings.',
      statutoryRemedy: 'Implement runtime telemetry dashboards feeding executive risk committee dashboards.',
      remediationPhase: 'PHASE 03',
    },
  ],

  HAI: [
    {
      id: 'HAI-FHIR-01',
      standard: 'HL7 FHIR v4',
      clause: 'US Core Implementation Guide § 3.1',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'SCHEMA_DRIFT',
      finding: 'Unstructured model drift corrupts patient observational and clinical demographic schemas.',
      statutoryRemedy: 'Enforce strict JSON-schema conformance adapters before electronic health record ingestion.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'HAI-HIPAA-02',
      standard: 'HIPAA Security Rule / HITECH Act',
      clause: '45 CFR § 164.312(b) // Sec 13402',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Clinical operator interactions record unmasked ePHI and diagnostic queries into uninspected context buffers.',
      statutoryRemedy: 'Deploy automated DLP sanitization and cryptographic audit trail logging for all agent transactions.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'HAI-GDPR-03',
      standard: 'GDPR / ISO 27701:2019',
      clause: 'Art. 5(1)(c) (Data Minimization) & Art. 32 (Security)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Cross-border patient processing retains unredacted personal health data beyond statutory residency parameters.',
      statutoryRemedy: 'Enforce tenant-isolated sovereign context boundaries and automated data-expiry runbooks.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'HAI-FDA-04',
      standard: 'FDA SaMD Guidance / NIST CSF 2.0',
      clause: 'GMLP Principle 7 // PR.DS-01',
      violationType: 'DRIFT_RISK',
      frictionVector: 'ALERT_FATIGUE',
      finding: 'Alarm fatigue from uncalibrated diagnostic warnings leads clinical triage teams to override automated validation steps.',
      statutoryRemedy: 'Implement sensitivity dampening and multi-tier triage escalation hierarchies.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'HAI-GOV-05',
      standard: 'NIST AI RMF 1.0 / HIPAA Admin Simplification',
      clause: 'GOVERN 2.1 // 45 CFR § 164.308',
      violationType: 'GOVERNANCE_GAP',
      frictionVector: 'FIDUCIARY_GAP',
      finding: 'Executive oversight operates without verified risk metrics for downstream AI medical workflow delegation.',
      statutoryRemedy: 'Establish formal algorithmic governance committees with immutable sign-off gates.',
      remediationPhase: 'PHASE 03',
    },
  ],

  IGF: [
    {
      id: 'IGF-SOX-01',
      standard: 'Sarbanes-Oxley Act (SOX)',
      clause: 'Section 404 (Internal Financial Reporting Controls)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'SCHEMA_DRIFT',
      finding: 'Autonomous orchestration pipelines mutate general ledger transaction schemas without an immutable audit trail.',
      statutoryRemedy: 'Install cryptographically signed audit logs and schema mutation circuit breakers.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'IGF-PCI-02',
      standard: 'PCI-DSS v4.0 / GLBA Safeguards Rule',
      clause: 'Req 10.2 // 16 CFR Part 314',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Cardholder metadata and non-public personal financial assets transit uninspected inference workflows.',
      statutoryRemedy: 'Isolate sensitive transaction clusters and implement zero-trust egress proxies.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'IGF-GDPR-03',
      standard: 'GDPR / ISO 27001:2022',
      clause: 'Art. 25 (Privacy by Design) & Art. 32 (Security of Processing)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Customer banking context strings and transaction records are ingested into external foundation model caches.',
      statutoryRemedy: 'Deploy tenant-isolated contextual redaction adapters before external API payload transmission.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'IGF-NIST-04',
      standard: 'NIST CSF 2.0 / FFIEC Guidelines',
      clause: 'DE.AE-02 (Anomaly Detection) // Appendix J',
      violationType: 'DRIFT_RISK',
      frictionVector: 'ALERT_FATIGUE',
      finding: 'Repetitive false-positive risk warnings desensitize compliance desks to genuine fraudulent anomaly flags.',
      statutoryRemedy: 'Calibrate anomaly detection sensitivity thresholds and automate tier-1 event reconciliation.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'IGF-SEC-05',
      standard: 'SEC Rule 17a-4 / FINRA Rule 4511',
      clause: 'WORM Compliance (Books and Records Preservation)',
      violationType: 'GOVERNANCE_GAP',
      frictionVector: 'FIDUCIARY_GAP',
      finding: 'Ephemeral agent trading directives and risk calculations lack statutory write-once-read-many immutable storage.',
      statutoryRemedy: 'Mandate WORM storage adapters for all runtime automated decisioning pipelines.',
      remediationPhase: 'PHASE 03',
    },
  ],
};

/**
 * Selects standards based on:
 * 1. Sector Pillar (AVS / HAI / IGF)
 * 2. Active survey friction vectors (Schema, Noise, Context, Fiduciary)
 * 3. Exposure Severity / Alerts (Tier 3 includes full regime; alerts guarantee Criticals)
 */
export function computeRegulatoryAuditItems(params: {
  pillar: FunnelPillar;
  responses?: Record<string, any>;
  isTierThreeExposure?: boolean;
  regulatoryAlertActive?: boolean;
}): RegulatoryAuditItem[] {
  const { pillar, responses = {}, isTierThreeExposure, regulatoryAlertActive } = params;
  const catalog = REGULATORY_MASTER_CATALOG[pillar] || REGULATORY_MASTER_CATALOG.AVS;
  const friction = analyzeFrictionProfile(responses);

  return catalog.filter((item) => {
    // 1. Friction Node Vector Trigger
    if (item.frictionVector === 'SCHEMA_DRIFT' && friction.hasSchemaDrift) return true;
    if (item.frictionVector === 'ALERT_FATIGUE' && friction.hasAlertFatigue) return true;
    if (item.frictionVector === 'CONTEXT_INTEGRITY' && friction.hasContextIntegrityGap) return true;
    if (item.frictionVector === 'FIDUCIARY_GAP' && friction.hasFiduciaryGap) return true;

    // 2. Severity Overrides
    if (isTierThreeExposure) return true;
    if (regulatoryAlertActive && item.violationType === 'CRITICAL_BREACH') return true;

    return false;
  });
}
