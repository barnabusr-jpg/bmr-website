export type ClientIndustry = 
  | 'HEALTHCARE_LIFE_SCIENCES' 
  | 'FINANCIAL_SERVICES' 
  | 'INDUSTRIAL_MANUFACTURING'
  | 'CROSS_SECTOR_ENTERPRISE';

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
 * Evaluates responses from quad diagnostic questions.
 * Options "C" and "D" indicate friction / degradation.
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
 * Master Statutory Catalog: Keyed strictly by Client Industry Sector
 */
const INDUSTRY_REGULATORY_CATALOG: Record<ClientIndustry, RegulatoryAuditItem[]> = {
  HEALTHCARE_LIFE_SCIENCES: [
    {
      id: 'HLTH-FHIR-01',
      standard: 'HL7 FHIR v4',
      clause: 'US Core Implementation Guide § 3.1',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'SCHEMA_DRIFT',
      finding: 'Unstructured context drift corrupts patient observational and clinical diagnostic schemas.',
      statutoryRemedy: 'Enforce strict schema-conformance validation adapters prior to EHR persistence.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'HLTH-HIPAA-02',
      standard: 'HIPAA Security Rule / HITECH Act',
      clause: '45 CFR § 164.312(b) // Sec 13402',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Clinical operator interactions record unmasked ePHI and diagnostic prompts into uninspected context buffers.',
      statutoryRemedy: 'Deploy automated PII/ePHI redaction and cryptographic audit trail logging for all agent queries.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'HLTH-GDPR-03',
      standard: 'GDPR / ISO 27701:2019',
      clause: 'Art. 5(1)(c) (Data Minimization) & Art. 32 (Security)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Patient telemetry retention exceeds statutory purpose limitation across downstream inference pipelines.',
      statutoryRemedy: 'Enforce tenant-isolated sovereign context boundaries and automated data-expiry runbooks.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'HLTH-FDA-04',
      standard: 'FDA Guidance on SaMD / NIST CSF 2.0',
      clause: 'Good Machine Learning Practice (GMLP) Principle 7',
      violationType: 'DRIFT_RISK',
      frictionVector: 'ALERT_FATIGUE',
      finding: 'Alarm fatigue from uncalibrated diagnostic warnings leads triage teams to bypass manual validation barriers.',
      statutoryRemedy: 'Deploy automated sensitivity thresholds and rate-limited clinical alert runbooks.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'HLTH-GOV-05',
      standard: 'NIST AI RMF 1.0 / HIPAA Admin Simplification',
      clause: 'GOVERN 2.1 // 45 CFR § 164.308',
      violationType: 'GOVERNANCE_GAP',
      frictionVector: 'FIDUCIARY_GAP',
      finding: 'Clinical governance oversight operates without verifiable telemetry feedback for automated agent decisions.',
      statutoryRemedy: 'Establish formal algorithmic governance committees with immutable sign-off gates.',
      remediationPhase: 'PHASE 03',
    },
  ],

  FINANCIAL_SERVICES: [
    {
      id: 'FIN-SOX-01',
      standard: 'Sarbanes-Oxley Act (SOX)',
      clause: 'Section 404 (Management Assessment of Internal Controls)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'SCHEMA_DRIFT',
      finding: 'Autonomous orchestration pipelines mutate general ledger transaction schemas without an immutable audit trail.',
      statutoryRemedy: 'Install cryptographically signed audit logs and schema mutation circuit breakers.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'FIN-PCI-02',
      standard: 'PCI-DSS v4.0 / GLBA Safeguards Rule',
      clause: 'Req 10.2 // 16 CFR Part 314',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Cardholder metadata and non-public personal financial records pass through uninspected model endpoints.',
      statutoryRemedy: 'Isolate sensitive transaction clusters and implement zero-trust egress proxies.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'FIN-GDPR-03',
      standard: 'GDPR / ISO 27001:2022',
      clause: 'Art. 25 (Privacy by Design) & Art. 32 (Security of Processing)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Customer account context strings and transaction records are ingested into external inference caches.',
      statutoryRemedy: 'Deploy tenant-isolated contextual redaction adapters before external API payload transmission.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'FIN-NIST-04',
      standard: 'NIST CSF 2.0 / FFIEC Guidelines',
      clause: 'DE.AE-02 (Anomaly Detection) // Appendix J',
      violationType: 'DRIFT_RISK',
      frictionVector: 'ALERT_FATIGUE',
      finding: 'Repetitive false-positive risk warnings desensitize compliance desks to genuine fraudulent anomaly flags.',
      statutoryRemedy: 'Calibrate anomaly detection sensitivity thresholds and automate tier-1 event reconciliation.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'FIN-SEC-05',
      standard: 'SEC Rule 17a-4 / FINRA Rule 4511',
      clause: 'WORM Compliance (Books and Records Preservation)',
      violationType: 'GOVERNANCE_GAP',
      frictionVector: 'FIDUCIARY_GAP',
      finding: 'Ephemeral agent trading directives and risk calculations lack statutory write-once-read-many immutable storage.',
      statutoryRemedy: 'Mandate WORM storage adapters for all runtime automated decisioning pipelines.',
      remediationPhase: 'PHASE 03',
    },
  ],

  INDUSTRIAL_MANUFACTURING: [
    {
      id: 'IND-ISO-01',
      standard: 'ISO 9001:2015',
      clause: 'Clause 8.5.1 (Control of Production & Service Provision)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'SCHEMA_DRIFT',
      finding: 'Unmonitored agent mutations trigger downstream serialization and assembly payload discrepancies.',
      statutoryRemedy: 'Deploy strict OpenAPI schema validation gates and microservice circuit breakers.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'IND-IEC-02',
      standard: 'IEC 62443-3-3 / NIST SP 800-82r3',
      clause: 'Security Requirements SR 5.2 (Zone Boundary Protection)',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Frontline agent endpoints traverse uninspected OT industrial boundary perimeters.',
      statutoryRemedy: 'Enforce dual-key shadow staging queues prior to runtime database or PLC execution.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'IND-GDPR-03',
      standard: 'GDPR / ISO 27001:2022',
      clause: 'GDPR Art. 25 & 32 // ISO Control A.8.28',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Operator prompts and industrial telemetry ingest identifiable employee and client identifiers into unencrypted context caches.',
      statutoryRemedy: 'Install Purview DLP tokenization proxies and automated context-scrubbing gates.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'IND-NIST-04',
      standard: 'NIST CSF 2.0 / NIST AI RMF 1.0',
      clause: 'DE.CM-01 (Continuous Monitoring) // MEASURE 2.6',
      violationType: 'DRIFT_RISK',
      frictionVector: 'ALERT_FATIGUE',
      finding: 'High volume alert noise across telemetry consoles forces triage desensitization and missed anomaly alarms.',
      statutoryRemedy: 'Deploy automated alarm threshold filtering and rate-limited escalation runbooks.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'IND-GOV-05',
      standard: 'NIST AI RMF 1.0',
      clause: 'GOVERN 1.2 (Accountability & Fiduciary Structures)',
      violationType: 'GOVERNANCE_GAP',
      frictionVector: 'FIDUCIARY_GAP',
      finding: 'Board-mandated governance policies lack continuous telemetry feedback to verify compliance ceilings.',
      statutoryRemedy: 'Implement runtime telemetry dashboards feeding executive risk committee dashboards.',
      remediationPhase: 'PHASE 03',
    },
  ],

  CROSS_SECTOR_ENTERPRISE: [
    {
      id: 'ENT-ISO-01',
      standard: 'ISO/IEC 27001:2022',
      clause: 'Control A.8.28 (Secure Coding) & Control A.8.8',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'SCHEMA_DRIFT',
      finding: 'Unmanaged API pipeline drift and unversioned runtime dependencies violate technical vulnerability management policies.',
      statutoryRemedy: 'Deploy automated OpenAPI schema gateways and release gate regression suites.',
      remediationPhase: 'PHASE 01',
    },
    {
      id: 'ENT-GDPR-02',
      standard: 'GDPR / CCPA / CPRA',
      clause: 'Art. 5 (Data Minimization) // Cal. Civ. Code § 1798.100',
      violationType: 'CRITICAL_BREACH',
      frictionVector: 'CONTEXT_INTEGRITY',
      finding: 'Unsanitized user and employee prompts ingest confidential and personal data into third-party inference perimeters.',
      statutoryRemedy: 'Implement tenant-isolated boundary proxies and automated DLP redaction.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'ENT-NIST-03',
      standard: 'NIST CSF 2.0',
      clause: 'PR.DS-01 (Data Security) & DE.AE-02 (Analysis)',
      violationType: 'DRIFT_RISK',
      frictionVector: 'ALERT_FATIGUE',
      finding: 'Operational monitoring noise causes operators to ignore anomalous pipeline dispatch events.',
      statutoryRemedy: 'Deploy automated alarm suppression and consolidated event aggregation.',
      remediationPhase: 'PHASE 02',
    },
    {
      id: 'ENT-NIST-04',
      standard: 'NIST AI RMF 1.0',
      clause: 'GOVERN 1.1 / MAP 1.5',
      violationType: 'GOVERNANCE_GAP',
      frictionVector: 'FIDUCIARY_GAP',
      finding: 'Executive oversight lacks verified telemetry mapping organizational AI risk exposure ceilings.',
      statutoryRemedy: 'Institute continuous telemetry dashboards linked directly to executive risk reporting.',
      remediationPhase: 'PHASE 03',
    },
  ]
};

export const CLIENT_INDUSTRY_OPTIONS: Array<{ value: ClientIndustry; label: string; description: string }> = [
  {
    value: 'HEALTHCARE_LIFE_SCIENCES',
    label: 'Healthcare & Life Sciences',
    description: 'HIPAA, HL7 FHIR v4, FDA SaMD, and HITECH data protection boundaries'
  },
  {
    value: 'FINANCIAL_SERVICES',
    label: 'Financial Services & Banking',
    description: 'SOX 404, PCI-DSS v4.0, GLBA Safeguards, and SEC/FINRA WORM controls'
  },
  {
    value: 'INDUSTRIAL_MANUFACTURING',
    label: 'Industrial & Supply Chain',
    description: 'ISO 9001, IEC 62443, NIST SP 800-82, and OT production boundaries'
  },
  {
    value: 'CROSS_SECTOR_ENTERPRISE',
    label: 'Cross-Sector Enterprise',
    description: 'ISO/IEC 27001:2022, NIST CSF 2.0, NIST AI RMF, and GDPR/CCPA'
  }
];

/**
 * Normalizes values stored in audits.sector into a valid ClientIndustry enum value.
 */
export function resolveClientIndustry(rawSector?: string | null): ClientIndustry {
  if (!rawSector) return 'CROSS_SECTOR_ENTERPRISE';
  const clean = rawSector.toUpperCase().trim();

  // 1. Direct enum matches
  if (clean === 'HEALTHCARE_LIFE_SCIENCES') return 'HEALTHCARE_LIFE_SCIENCES';
  if (clean === 'FINANCIAL_SERVICES') return 'FINANCIAL_SERVICES';
  if (clean === 'INDUSTRIAL_MANUFACTURING') return 'INDUSTRIAL_MANUFACTURING';
  if (clean === 'CROSS_SECTOR_ENTERPRISE') return 'CROSS_SECTOR_ENTERPRISE';

  // 2. Healthcare & Clinical Indicators
  if (
    clean.includes('HEALTH') || 
    clean.includes('HOSPITAL') || 
    clean.includes('CLINIC') || 
    clean.includes('PHARMA') || 
    clean.includes('BIOTECH') || 
    clean.includes('LIFE_SCIENCE') ||
    clean === 'HAI_HEALTHCARE'
  ) {
    return 'HEALTHCARE_LIFE_SCIENCES';
  }

  // 3. Banking, Capital Markets & Insurance Indicators
  if (
    clean.includes('FINANC') || 
    clean.includes('BANK') || 
    clean.includes('CAPITAL') || 
    clean.includes('INSUR') || 
    clean.includes('WEALTH') || 
    clean.includes('INVEST') ||
    clean === 'FINANCE' ||
    clean === 'IGF_FINANCE'
  ) {
    return 'FINANCIAL_SERVICES';
  }

  // 4. Industrial, Automotive & Supply Chain Indicators
  if (
    clean.includes('INDUST') || 
    clean.includes('MANUF') || 
    clean.includes('SUPPLY') || 
    clean.includes('AUTO') || 
    clean.includes('LOGIST') ||
    clean === 'INDUSTRIAL' ||
    clean === 'AVS_INDUSTRIAL'
  ) {
    return 'INDUSTRIAL_MANUFACTURING';
  }

  // Default safely to cross-sector enterprise
  return 'CROSS_SECTOR_ENTERPRISE';
}

export function computeRegulatoryAuditItems(params: {
  industry?: ClientIndustry | string;
  responses?: Record<string, any>;
  isTierThreeExposure?: boolean;
  regulatoryAlertActive?: boolean;
}): RegulatoryAuditItem[] {
  const { industry, responses = {}, isTierThreeExposure, regulatoryAlertActive } = params;
  const resolved = resolveClientIndustry(typeof industry === 'string' ? industry : undefined);
  const catalog = INDUSTRY_REGULATORY_CATALOG[resolved] || INDUSTRY_REGULATORY_CATALOG.CROSS_SECTOR_ENTERPRISE;
  const friction = analyzeFrictionProfile(responses);

  return catalog.filter((item) => {
    if (item.frictionVector === 'SCHEMA_DRIFT' && friction.hasSchemaDrift) return true;
    if (item.frictionVector === 'ALERT_FATIGUE' && friction.hasAlertFatigue) return true;
    if (item.frictionVector === 'CONTEXT_INTEGRITY' && friction.hasContextIntegrityGap) return true;
    if (item.frictionVector === 'FIDUCIARY_GAP' && friction.hasFiduciaryGap) return true;

    if (isTierThreeExposure) return true;
    if (regulatoryAlertActive && item.violationType === 'CRITICAL_BREACH') return true;

    return false;
  });
}
