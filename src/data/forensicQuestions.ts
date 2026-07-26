import { LocalQuestion } from '../types/forensicRuntime';

export const forensicQuestions: Record<string, LocalQuestion> = {
  // ===========================================================================
  // PILLAR 1: INSTITUTIONAL GOVERNANCE/FIDELITY [IGF] (QUESTIONS 01-30)
  // ===========================================================================
  
  // --- IGF: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "IGF-01-EXEC": {
    id: "IGF-01-EXEC", pillar: "IGF", subarea: "Regulatory Black-Box Exposure", target_node: "EXECUTIVE",
    symptomatic_scenario: "An autonomous AI agent handles automated tier assignment and evaluation choices. How does corporate governance verify model decision transparency and context boundaries?",
    choices: {
      A: { key: 'A', text: "Absolute Model Governance: Platform policies enforce machine-readable ingestion contracts and immutable prompt/response logging.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Contractual Model Trust: Leadership relies on third-party model vendor assertions, assuming standard SaaS guardrails ensure transparency.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "High Unhedged Model Exposure: AI agents operate as black boxes; leadership tracks zero intermediate context weights during reviews.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "GDPR Article 22 Infraction Exposure" },
      D: { key: 'D', text: "Total AI Compliance Vacuum: Autonomous choices execute with zero context metadata retention, exposing the firm to statutory fines.", symptom_weight: 2.0, bandwidth_multiplier: 4.0, regulatory_tag: "EU AI Act Non-Compliance Threat Vector" }
    }
  },
  "IGF-02-EXEC": {
    id: "IGF-02-EXEC", pillar: "IGF", subarea: "Vendor Concentration Risk", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate the corporate AI risk strategy managing dependency perimeters when core automation pipelines depend on a single proprietary LLM provider.",
    choices: {
      A: { key: 'A', text: "Model-Agnostic Control Plane: Structural policies force pipelines to use abstract adapter layers, enabling hot-swapping between model vendors.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Provider SLA Protection: SLAs protect uptime, but track zero mitigation protocols for vendor API model schema drift.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "High Single-Model Vulnerability: Applications bind directly to one vendor API specification, ignoring silent model deprecation risks.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Total Agent Interruption: Vendor API schema updates deploy straight to production lines with zero isolation filters or model failovers.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Supply Chain Collapse Hazard" }
    }
  },
  "IGF-03-EXEC": {
    id: "IGF-03-EXEC", pillar: "IGF", subarea: "Staging Privacy Isolation", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does executive leadership guarantee that sensitive customer datasets ingested into model testing or fine-tuning sandboxes remain safe from leakage?",
    choices: {
      A: { key: 'A', text: "Automated Data Masking & DLP: Central Purview guardrails execute inline cryptographic sanitization before model ingestion.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scripted Data Cleansing: Custom developer pipelines strip explicit indicators like name tags, but preserve secondary context vectors.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unhardened AI Sandboxes: Unmasked client records stream to evaluation datasets, exposed to third-party model tuning runtimes.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "HIPAA / GDPR Data Privacy Breach Vector" },
      D: { key: 'D', text: "Total Context Exposure: Fine-tuning sandboxes share production keys, allowing raw PII data ingestion with zero audit logging.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Material Corporate Data Loss Event Vector" }
    }
  },
  "IGF-04-EXEC": {
    id: "IGF-04-EXEC", pillar: "IGF", subarea: "Immutable Recordkeeping", target_node: "EXECUTIVE",
    symptomatic_scenario: "Identify the boardroom control standard applied to guarantee that historical autonomous agent decisions cannot be altered or purged by system users.",
    choices: {
      A: { key: 'A', text: "Chained WORM Audit Ledgers: Policies mandate that agent decision metrics save to non-volatile Write-Once-Read-Many repositories.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Cloud Log Collectors: Agent interaction logs stream to central indexing repositories, but administrative role permissions remain un-audited.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Mutable Telemetry Storage: Administrative database roles hold permission keys to modify or clear agent interaction logs directly.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Zero Prompt History Retention: Agent context histories stream to temporary memory buffers that overwrite completely every 7 operational days.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "IGF-05-EXEC": {
    id: "IGF-05-EXEC", pillar: "IGF", subarea: "Insider Leak Minimization", target_node: "EXECUTIVE",
    symptomatic_scenario: "Select the structural access filter applied to prevent internal user accounts from executing unauthorized bulk context downloads via AI interfaces.",
    choices: {
      A: { key: 'A', text: "Synchronous Purview DLP Gates: Data Loss Prevention filters evaluate prompt/export velocity dynamically, blocking anomalous context dumps.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Query Volume Ceilings: Platform rules restrict export files to 10,000 records, but allow operators to bypass via split prompt queries.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ungated Agent Access: Users with standard dashboard credentials can extract complete system datasets via AI prompt tools with zero logging.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Insider Threat Capital Protection Failure" },
      D: { key: 'D', text: "Shared Access Profiles: Teams share administrative AI agent tokens, making it impossible to trace context exfiltration to individuals.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "ISO 27001 Access Control Governance Failure" }
    }
  },
  "IGF-06-EXEC": {
    id: "IGF-06-EXEC", pillar: "IGF", subarea: "Geographic Sovereignty Compliance", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does governance guarantee that automated AI computation nodes adhere to international cross-border data sovereignty mandates?",
    choices: {
      A: { key: 'A', text: "Sovereign AI Enclaves: Strict routing rules bind model inference endpoints to localized regional cloud data center boundaries.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Contract Assurances: Vendor SLAs state regional storage declarations but lack automated context path auditing features.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unmapped Global Model Endpoints: Ingestion payloads stream through multi-tenant cloud provider clusters across alternate geographical zones.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Data Sovereignty Compliance Transgression Risk" },
      D: { key: 'D', text: "Total Spatial Opacity: AI applications process and cache sensitive dataset vectors across unverified regions with zero tracking logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Cross-Border Sovereign Regulatory Infraction Risk" }
    }
  },
  "IGF-07-EXEC": {
    id: "IGF-07-EXEC", pillar: "IGF", subarea: "Algorithmic Control Disclosures", target_node: "EXECUTIVE",
    symptomatic_scenario: "What control paradigm ensures that production AI agent execution rules match corporate public financial risk disclosures explicitly?",
    choices: {
      A: { key: 'A', text: "Policy-as-Code Compilation: Agent rule adjustments require matched token signatures from compliance teams before model integration.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Policy Auditing: Compliance leads review agent prompt logic and thresholds manually ahead of regulatory reporting deadlines.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unsanctioned Prompt Edits: Technical teams adjust model system prompts and thresholds inline without matching public risk disclosures.", symptom_weight: 1.4, bandwidth_multiplier: 1.9, regulatory_tag: "Change Control Policy Compliance Fracture" },
      D: { key: 'D', text: "Total Disconnect Opacity: AI agent behavior guidelines are set ad-hoc by engineering, entirely hidden from executive risk reviews.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "SEC Operational Control Hazard Vector" }
    }
  },

  // --- IGF: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "IGF-08-MGMT": {
    id: "IGF-08-MGMT", pillar: "IGF", subarea: "Audit Timeline Latency", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an external regulatory examiner demands an end-to-end trace of a disputed automated AI decision path, calculate the team's recovery window.",
    choices: {
      A: { key: 'A', text: "Zero-Latency Trace Manifests: Management interfaces extract plain-English context logs and prompt states via automated requests.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Multi-Shift Technical Tickets: Product leads must submit tasks to engineering, delaying response loops as model logs are extracted.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Approximate Reconstruction Sprints: Developers spend days parsing scattered server text logs, producing an incomplete decision timeline.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "SOX 404 Internal Controls Operational Gap" },
      D: { key: 'D', text: "Complete Decision Black Box: Model reasoning metadata is unrecorded; management lacks tools to defend autonomous execution paths.", symptom_weight: 2.0, bandwidth_multiplier: 4.0, regulatory_tag: "Catastrophic Audit Collapse Vector" }
    }
  },
  "IGF-09-MGMT": {
    id: "IGF-09-MGMT", pillar: "IGF", subarea: "Right-to-Erasure Propagation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an individual executes a data erasure request (e.g., GDPR), describe how management verifies removal from AI context stores and vectors.",
    choices: {
      A: { key: 'A', text: "Automated Vector Purging: Wiping records triggers cascade deletions downstream, dropping embedding vectors code-wide automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Scrubber Sprints: Management coordinates manual script cleanup across secondary vector stores twice per year.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Primary Row Removal Only: Systems delete SQL table rows while customer context embeddings remain saved inside model caches.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Statutory Data Retention Violations Risk" },
      D: { key: 'D', text: "Total Vector Erasure Failure: Deletion workflows are un-tracked; customer data remains permanently embedded inside production AI models.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-10-MGMT": {
    id: "IGF-10-MGMT", pillar: "IGF", subarea: "Vendor Privacy Alignment", target_node: "MANAGERIAL",
    symptomatic_scenario: "An integrated AI model vendor adjusts privacy terms, claiming rights to retain prompt data for internal training. Review management's safeguards.",
    choices: {
      A: { key: 'A', text: "Zero-Data Retention Enclaves: Management enforces API endpoints configured with zero-retention flags to block vendor model training.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Cyclical Contract Reviews: Compliance audits contract terms manually during renewals, lacking real-time API payload filtering.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unmonitored Prompt Streaming: Enterprise data feeds connect directly to partner AI endpoints without DLP filtering or role masking.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Third-Party Risk Framework Gap" },
      D: { key: 'D', text: "Total Data Exfiltration: Sensitive operational payloads stream to public model endpoints with zero encryption or privacy isolation.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Proprietary Data Loss IP Infraction" }
    }
  },
  "IGF-11-MGMT": {
    id: "IGF-11-MGMT", pillar: "IGF", subarea: "Data Lineage Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does your management tier ensure that data transformation paths remain auditable across multi-platform AI and automation integrations?",
    choices: {
      A: { key: 'A', text: "Continuous Lineage Automation: Governance software tracks structural data transformations across AI ingestion pipelines automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Lineage Audits: Product managers execute structural mapping checks manually ahead of scheduled compliance reviews.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Undocumented Schema Mutations: Teams alter data transformations inside custom microservices, creating untraceable model input states.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Data Lineage Structural Failure" },
      D: { key: 'D', text: "Complete Lineage Fracture: Pipelines strip origin metadata during transformations, creating permanent audit gaps prior to model ingestion.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Data Provenance Structural Audit Deficit" }
    }
  },
  "IGF-12-MGMT": {
    id: "IGF-12-MGMT", pillar: "IGF", subarea: "Contractor Account Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "What management process tracks and manages system access permissions granted to third-party consultants building custom AI tools?",
    choices: {
      A: { key: 'A', text: "Time-Locked Ephemeral Credentials: Identity systems issue short-lived credentials that auto-terminate unless explicitly renewed.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Access Audits: HR cross-references active access tokens against contractor files manually every six months.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Persistent Administrative Keys: External contractors hold high-level API keys that remain active after engagements conclude.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Access Management Internal Control Failure" },
      D: { key: 'D', text: "Shared Access Profile Codes: Contractor teams share master AI model keys with zero individual tracking of prompt history or data edits.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-13-MGMT": {
    id: "IGF-13-MGMT", pillar: "IGF", subarea: "Vendor Log Redundancy", target_node: "MANAGERIAL",
    symptomatic_scenario: "If an integrated external AI model service encounters an extended outage or severe rate-limiting, evaluate management's failover protocol.",
    choices: {
      A: { key: 'A', text: "Hot-Swap Model Multiplexing: Smart routers monitor API health, automatically failing over to secondary LLM endpoints on latency drift.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Configuration Re-pointing: Tech leads update API endpoint strings manually in config files, introducing hours of delay.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Single-Model Workflow Freeze: Automated pipelines halt completely during model vendor drops, causing immediate service outages.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Degraded Security Boundary" },
      D: { key: 'D', text: "Cascading Workflow Corruption: Outages break active payload streams, corrupting records across downstream business operations.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Supply Chain Collapse Vector" }
    }
  },
  "IGF-14-MGMT": {
    id: "IGF-14-MGMT", pillar: "IGF", subarea: "Code Change Policy Matching", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management confirm that live prompt adjustments and agent logic changes match executive risk authorization sign-offs?",
    choices: {
      A: { key: 'A', text: "Automated Policy Validation: Build systems verify git commit hashes against risk authorization tokens prior to agent deployment.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Commit Auditing: Managers compare task items against repository history files manually before major model releases.", symptom_weight: 0.4, bandwidth_multiplier: 0.7 },
      C: { key: 'C', text: "Unhardened Prompt Merges: Engineers modify agent system prompts inline inside production repositories without compliance sign-offs.", symptom_weight: 1.5, bandwidth_multiplier: 2.1, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" },
      D: { key: 'D', text: "Live Console Prompt Tuning: Tech teams edit active agent system prompts directly in production consoles with zero management logging.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "IGF-15-MGMT": {
    id: "IGF-15-MGMT", pillar: "IGF", subarea: "Compliance Release Testing", target_node: "MANAGERIAL",
    symptomatic_scenario: "What testing framework maps business validation rules across autonomous AI agents prior to model or prompt version rollouts?",
    choices: {
      A: { key: 'A', text: "Behavioral Assertion Suites: CI pipelines test agent outputs against versioned compliance scenario matrices automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Staging Dashboard Spot-Checking: Teams review random sample agent outputs manually in staging environments before release.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Syntax-Only Validation: Deployment checks verify code formatting and compilation, completely ignoring AI context and logic compliance.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Algorithmic Control Lifecycle Failure" },
      D: { key: 'D', text: "Direct Production Scaling: Updated AI models scale output parameters live in production with zero automated compliance testing.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- IGF: TECHNICAL NODE (CORE EXECUTION) ---
  "IGF-16-TECH": {
    id: "IGF-16-TECH", pillar: "IGF", subarea: "WORM Storage Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "From an operational architecture perspective, where are active AI prompt logs, model responses, and decision histories persisted?",
    choices: {
      A: { key: 'A', text: "Write-Once Hardware Vaults: Log streams route to cryptographically locked WORM repositories that block record modification.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Cloud Log Centralization: Interaction logs save to central cloud aggregators, managed via standard administrative credentials.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Mutable Database Storage: Operational logs write directly to primary app schemas, vulnerable to administrative user edits.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Transient Buffer Evacuation: Logs append to transient container buffers that purge files completely every 7 operational days.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "IGF-17-TECH": {
    id: "IGF-17-TECH", pillar: "IGF", subarea: "Decoupled Verification Layers", target_node: "TECHNICAL",
    symptomatic_scenario: "How is data parity verified between primary database stores and downstream AI model context caches to protect operational stability?",
    choices: {
      A: { key: 'A', text: "Dynamic Parity Heartbeats: Isolated worker tasks execute hash comparisons cross-checking database state and vector caches continuously.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Batch Rebalancing Jobs: Sync scripts reconcile vector store embeddings against primary SQL tables during off-peak windows.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unverified Vector Sync: Pipelines stream updates blindly, assuming AI embeddings match source data without verifying state parity.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Total Context Drift: Mismatched schema updates corrupt vector embeddings, generating permanent hallucinations in production models.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "IGF-18-TECH": {
    id: "IGF-18-TECH", pillar: "IGF", subarea: "Ephemeral Identity Containment", target_node: "TECHNICAL",
    symptomatic_scenario: "Review the authentication lifecycle governing API access tokens used by autonomous worker tasks inside cloud AI runtimes.",
    choices: {
      A: { key: 'A', text: "KMS Ephemeral Roles: Worker runtimes fetch short-lived token profiles that self-terminate within 15 minutes via automated rotation.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Vault Parameter Calls: Framework containers fetch permanent API keys from security vaults during continuous session runtimes.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Hardcoded API Keys: Authentication keys save as static plaintext string values inside application repository configuration records.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "Shared Master Profiles: Multiple autonomous modules share an identical master root credential, bypassing granular audit logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-19-TECH": {
    id: "IGF-19-TECH", pillar: "IGF", subarea: "Immutable Trace Architectures", target_node: "TECHNICAL",
    symptomatic_scenario: "Detail the system trace mechanism used to document developer modifications applied to AI agent prompts and rules in production.",
    choices: {
      A: { key: 'A', text: "Signed Commit Gates: Prompt changes enforce hardware MFA sign-offs before deploying to immutable environment logs.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard App Tracing: Platforms log configuration changes, but log retention settings remain mutable by admin keys.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Untracked Config Tuning: Engineers edit running model hyperparameters manually without linking patches to change management logs.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" },
      D: { key: 'D', text: "Direct Console Parameter Edits: Developers update live model prompts directly via terminal prompts with zero operational tracing.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "IGF-20-TECH": {
    id: "IGF-20-TECH", pillar: "IGF", subarea: "Cryptographic Non-Repudiation", target_node: "TECHNICAL",
    symptomatic_scenario: "When an autonomous AI agent completes an account action, how is that transaction sealed against post-execution modification?",
    choices: {
      A: { key: 'A', text: "Cryptographic SHA-256 Hashing: Ingestion pipelines attach unique cryptographic signatures across transaction rows upon completion.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Relational Index Locking: Database rules block row modifications once an action flags a 'COMPLETED' status tag.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Standard Database Commits: Records commit as standard relational rows, vulnerable to direct edits via administrative software.", symptom_weight: 1.4, bandwidth_multiplier: 2.1, regulatory_tag: "System Traceability Infrastructure Void" },
      D: { key: 'D', text: "Total History Overwriting: Optimization scripts clean storage by overwriting prior decision states, keeping only final outcomes.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Data Lineage Structural Failure" }
    }
  },
  "IGF-21-TECH": {
    id: "IGF-21-TECH", pillar: "IGF", subarea: "Network Boundary Isolation", target_node: "TECHNICAL",
    symptomatic_scenario: "What firewall perimeter isolation standard safeguards internal model context databases from unauthenticated public cloud routing?",
    choices: {
      A: { key: 'A', text: "Zero-Trust Private VPCs: Internal runtimes bind strictly to non-routable private addresses, communicating via mutual TLS gateways.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Security Groups: Access rules match specified IP ranges, but leave model database ports visible to general network blocks.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Public Endpoint Exposure: AI modules interface with external systems via open internet endpoints, relying on simple passwords.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "NIST SP 800-171 Network Boundary Failure" },
      D: { key: 'D', text: "Total Security Deregulation: Core vector database ports open directly to all inbound traffic variables to simplify development access.", symptom_weight: 2.0, bandwidth_multiplier: 3.9, regulatory_tag: "Material Data Exfiltration Vulnerability Risk" }
    }
  },
  "IGF-22-TECH": {
    id: "IGF-22-TECH", pillar: "IGF", subarea: "Dependency Manifest Auditing", target_node: "TECHNICAL",
    symptomatic_scenario: "How frequently are open-source AI libraries (e.g., LangChain, LlamaIndex, PyTorch) audited for security vulnerabilities?",
    choices: {
      A: { key: 'A', text: "Continuous In-Pipeline SCA: Automated software composition analysis runners check dependencies on every build, blocking vulnerable merges.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scheduled Engineering Sweeps: Technical architects run package updates manually ahead of annual infrastructure audits.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ad-Hoc Package Imports: Developers import external AI packages arbitrarily from open repositories to solve sprint blockers fast.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Supply Chain Risk Failure" },
      D: { key: 'D', text: "Zero Dependency Auditing: Open-source AI libraries compile straight to production lines with zero security analysis runs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- IGF: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "IGF-23-USER": {
    id: "IGF-23-USER", pillar: "IGF", subarea: "GDPR Explanation Access", target_node: "USER",
    symptomatic_scenario: "When a customer demands an explicit rationale for an automated AI decision, select the resource provided by your interface.",
    choices: {
      A: { key: 'A', text: "Automated Rationale Manifests: The dashboard includes an export button that prints a plain-English summary of model decision vectors.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Raw Metadata Output: The screen prints internal model confidence scores and vector distances that staff cannot translate cleanly.", symptom_weight: 0.6, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "The Rationale Vacuum: Panels display simple status flags (e.g., 'REJECTED'), forcing operators to stall clients with generic templates.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "GDPR Article 22 Infraction Exposure" },
      D: { key: 'D', text: "Complete Workspace Blindness: UI tools hide decision histories entirely; operators must forward all client disputes to legal teams.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-24-USER": {
    id: "IGF-24-USER", pillar: "IGF", subarea: "Data Erasure Tracking", target_node: "USER",
    symptomatic_scenario: "Detail user interface tasks required when processing a customer's formal right-to-erasure request across system AI records.",
    choices: {
      A: { key: 'A', text: "Cascade Erasure Anchors: Clicking 'Purge Record' deletes customer data across relational tables and AI vector caches automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Ticket Coordination: Staff log cleanup tasks across multiple engineering teams, creating manual tracking steps over week-long cycles.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Surface Database Wiping: Interfaces delete primary SQL table rows while customer context embeddings remain saved in offline AI stores.", symptom_weight: 1.4, bandwidth_multiplier: 2.1, regulatory_tag: "Statutory Data Retention Violations Risk" },
      D: { key: 'D', text: "Total Erasure Neglect: Right-to-erasure workflows are unrecorded; customer data remains active inside background training sets.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-25-USER": {
    id: "IGF-25-USER", pillar: "IGF", subarea: "Export Permission Hardening", target_node: "USER",
    symptomatic_scenario: "Review what happens on operational screens when a standard user account attempts to export a customer contact datastore spreadsheet.",
    choices: {
      A: { key: 'A', text: "MFA Token Re-Verification: The application blocks download loops until an administrative token authorization validation executes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Volume Restriction Ceilings: Interface structures limit data extractions to 1,000 table rows, displaying a warning notice to managers.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Ungated File Extraction: Workers can extract extensive data spreadsheets via standard browser layout tools with zero verification logging.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Insider Threat Capital Protection Failure" },
      D: { key: 'D', text: "Shared Access Token Workarounds: Team operators use a shared administrative profile link to extract large volumes via unmonitored sessions.", symptom_weight: 2.0, bandwidth_multiplier: 3.7, regulatory_tag: "ISO 27001 Access Control Governance Failure" }
    }
  },
  "IGF-26-USER": {
    id: "IGF-26-USER", pillar: "IGF", subarea: "Audit Trace Validation", target_node: "USER",
    symptomatic_scenario: "When auditing operational steps recorded on user dashboards, how do supervisors confirm that actions match security profiles?",
    choices: {
      A: { key: 'A', text: "Signed Activity Timelines: Operational screens show immutable, cryptographically signed audit logs for every individual status edit.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Event Reconciliation: Management matches system updates against developer tickets manually using spreadsheets before reviews.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Fragmented Event Logs: Action logs capture broad data updates, but omit timestamps and operator identities from user viewports.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "SOX 404 Internal Controls Operational Gap" },
      D: { key: 'D', text: "Zero Operational Documentation: Retention scripts purge history views weekly; supervisors have zero capacity to verify user action bounds.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Fiduciary Record-Keeping Risk Gaps" }
    }
  },
  "IGF-27-USER": {
    id: "IGF-27-USER", pillar: "IGF", subarea: "Data Masking Real-Time Check", target_node: "USER",
    symptomatic_scenario: "How do customer records (e.g., credit numbers, SSN) render on the primary workspace views used by standard call operators?",
    choices: {
      A: { key: 'A', text: "Full Structural Masking: Sensitive strings display as hashed characters automatically, showing only the final 4 index values to workers.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Role-Based Panel Unlocking: Fields stay hidden until operators input explicit support ticket codes to reveal profile values.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Plaintext Record Rendering: Full identity variables print openly on standard browser monitors, visible to anyone walking past.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "HIPAA / GDPR Data Privacy Breach Vector" },
      D: { key: 'D', text: "Total Data Exposure: Unmasked client metrics compile straight to browser local caches, easily exfiltrated via simple browser scripts.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Material Corporate Data Loss Event Vector" }
    }
  },
  "IGF-28-USER": {
    id: "IGF-28-USER", pillar: "IGF", subarea: "Access Session Timeouts", target_node: "USER",
    symptomatic_scenario: "If an operator leaves their workstation terminal unattended while a customer management view is open, detail system safeguards.",
    choices: {
      A: { key: 'A', text: "Biometric Session Invalidation: The application monitors inactivity, locking the screen layout completely after 5 inactive minutes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Window Logouts: Active access tokens invalidate automatically after 60 continuous tracking minutes.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Infinite Active Standby: Workspaces remain logged in indefinitely, keeping private database profiles visible to floor cleaners.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "Shared Console Terminal Bypasses: Terminals are locked to persistent shared browser sessions that stay active across all working shifts.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-29-USER": {
    id: "IGF-29-USER", pillar: "IGF", subarea: "Third-Party Data Exfiltration", target_node: "USER",
    symptomatic_scenario: "When using integrated AI copilot components on your dashboard, how are customer records filtered before model context ingestion?",
    choices: {
      A: { key: 'A', text: "Inline DLP Scrubber Filters: Middleware intercepts prompt entries, replacing sensitive PII patterns with anonymized tokens automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Operational Warning Modals: Interface popups advise workers to manually omit client PII before submitting prompts to AI tools.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unchecked Context Ingestion: Complete client profiles paste directly into AI copilot boxes, exposing PII to external model logs.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Third-Party Risk Framework Gap" },
      D: { key: 'D', text: "Total Data Exfiltration: Unfiltered client records route straight to public external LLM provider endpoints with zero DLP controls.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Proprietary Data Loss IP Infraction" }
    }
  },
  "IGF-30-USER": {
    id: "IGF-30-USER", pillar: "IGF", subarea: "Emergency Lock Verification", target_node: "USER",
    symptomatic_scenario: "If an operator flags a hallucinating or rogue autonomous agent loop, review the interface control available to execute an immediate circuit break.",
    choices: {
      A: { key: 'A', text: "Unified Agent Kill-Switch: Staff execute a master circuit breaker shortcut, isolating connected AI agent tasks within 5 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manager Escalation Channels: Operators must submit an urgent ticket to get engineering leads to pause active AI agent processes.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Siloed Support Queues: Halting rogue agents requires phone tickets to external support centers, adding hours of operational delay.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Algorithmic Control Control Failure" },
      D: { key: 'D', text: "Zero Operational Intercept: No kill-switch control exists; stopping rogue agents requires rebuilding cloud containers manually.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },

  // ===========================================================================
  // PILLAR 2: AUTONOMOUS VALUE STREAMS [AVS] (QUESTIONS 31-60)
  // ===========================================================================
  
  // --- AVS: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "AVS-31-EXEC": {
    id: "AVS-31-EXEC", pillar: "AVS", subarea: "Data Infrastructure Foundations", target_node: "EXECUTIVE",
    symptomatic_scenario: "When allocating automation roadmap budgets, how does corporate strategy quantify technical debt and pre-automation readiness gaps?",
    choices: {
      A: { key: 'A', text: "Continuous Readiness Modeling: Investment strategies evaluate exact process waste tax metrics and schema stability limits explicitly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Cyclical Refactoring Windows: Relational data layers undergo structural updates on scheduled multi-year software lease cycles.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Feature-Driven Engineering: Capital profiles favor user-facing features, shifting data ingestion contracts to future backlogs.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "BCBS 239 Risk Data Aggregation Deficit" },
      D: { key: 'D', text: "Total Structural Blindness: Automation expands without mapping data quality foundations, risking catastrophic model context failures.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Scalability Controls Structural Framework Gap" }
    }
  },
  "AVS-32-EXEC": {
    id: "AVS-32-EXEC", pillar: "AVS", subarea: "Velocity Scaling Matrices", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does corporate leadership manage aggressive delivery deadlines from business units without compromising pre-automation AI safety bounds?",
    choices: {
      A: { key: 'A', text: "Automated Ingestion Contracts: CI/CD architectures enforce programmatic schema tests, blocking deployments that lack data contracts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Prioritized Sprint Buffers: Timelines include dedicated windows for developers to run data contract validations and schema audits.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Speed-First Mandates: Leadership rewards rapid agent rollouts, encouraging engineering to bypass data sanitization to hit launch dates.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Degraded Quality Control Standards" },
      D: { key: 'D', text: "Total Structural Deregulation: AI agents deploy to production with zero data foundation checks to capture immediate commercial value.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Catastrophic Structural Drift" }
    }
  },
  "AVS-33-EXEC": {
    id: "AVS-33-EXEC", pillar: "AVS", subarea: "Resource Waste Optimization", target_node: "EXECUTIVE",
    symptomatic_scenario: "Select the metric model applied by leadership to monitor technical capital waste and token overspend within cloud AI processing clusters.",
    choices: {
      A: { key: 'A', text: "Unit Economics Tagging: Monitoring tools link token spend and compute costs directly to specific business lines and agent workflows.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Aggregated Invoice Review: Finance tracks broad cloud AI invoices, lacking visibility into redundant agent prompt loops.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Reactive Cost Ceilings: Compute and token limits are scaled manually whenever budget overruns occur, increasing resource waste.", symptom_weight: 1.6, bandwidth_multiplier: 2.3, regulatory_tag: "Infrastructure Cost Control Efficiency Deficit" },
      D: { key: 'D', text: "Total Expense Opacity: Token overages process automatically as fixed operating expenses with zero cost-efficiency tracing.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Material Operating Resource Waste Tracker" }
    }
  },
  "AVS-34-EXEC": {
    id: "AVS-34-EXEC", pillar: "AVS", subarea: "Composable Design Standards", target_node: "EXECUTIVE",
    symptomatic_scenario: "What architectural requirement ensures that engineering teams build modular, reusable AI model adapters and data integration layers?",
    choices: {
      A: { key: 'A', text: "Central Interface Repositories: Platform guidelines force teams to import pre-hardened validation and model adapter modules exclusively.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Architecture Manuals: Product teams document AI integration standards inside static documentation repositories.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Siloed Agent Development: Separate teams build custom model connectors from scratch, duplicating integration flaws and context noise.", symptom_weight: 1.4, bandwidth_multiplier: 2.0 },
      D: { key: 'D', text: "Absolute Pipeline Fragmentation: Engineering groups apply completely different AI integration patterns across software repositories.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "ISO 27001 Software Lifecycle Failure" }
    }
  },
  "AVS-35-EXEC": {
    id: "AVS-35-EXEC", pillar: "AVS", subarea: "Multi-Cloud Interoperability", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate corporate strategy for managing schema translation errors when running AI models across AWS Bedrock, Azure OpenAI, and private clusters.",
    choices: {
      A: { key: 'A', text: "Model-Agnostic Abstraction Layers: Platform standards mandate open data wrappers, preventing model vendor lock-in.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Custom Interface Adapters: Dedicated scripts link alternate AI platforms manually, requiring continuous developer maintenance.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Vendor-Lock Saturation: Automation pipelines rely on cloud-exclusive model features, preventing model failover operations.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Multi-Cloud Complexity Architecture Risk" },
      D: { key: 'D', text: "Total Network Disconnection: Microservices connect across model endpoints via open ports with zero central tracking frameworks.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Business Continuity Strategic Control Failure" }
    }
  },
  "AVS-36-EXEC": {
    id: "AVS-36-EXEC", pillar: "AVS", subarea: "Portfolio Modernization Planning", target_node: "EXECUTIVE",
    symptomatic_scenario: "Determine the strategic framework applied to modernizing legacy data pipelines prior to deploying autonomous AI agents.",
    choices: {
      A: { key: 'A', text: "Decoupled Adapter Routing: Legacy databases route through modern schema-validation proxies before reaching AI context stores.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Off-Peak Modernization Sprints: Legacy data migrations execute manually during low-traffic holiday or weekend windows.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unhardened Core Wrapping: Outdated databases are wrapped in basic API interfaces, leaving unstructured data errors unaddressed.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Legacy Systemic Vulnerability Hazard Vector" },
      D: { key: 'D', text: "Absolute Migration Stagnation: Legacy pipelines remain un-optimized due to fears that updates will crash dependent systems.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Application Portfolio Modernization Collapse" }
    }
  },
  "AVS-37-EXEC": {
    id: "AVS-37-EXEC", pillar: "AVS", subarea: "Synthetic Data Risk Management", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does corporate strategy verify analytical record accuracy when AI pipelines ingest synthetic or machine-generated data profiles?",
    choices: {
      A: { key: 'A', text: "Continuous Statistical Auditing: Runtimes execute dynamic divergence checks, filtering out synthetic hallucinations at data boundaries.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Data Profiling: Specialist validation teams execute batch analysis queries against synthetic pools twice per year.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unchecked Pipeline Ingestion: AI models ingest synthetic datasets directly with zero edge filtering, risking model collapse outputs.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "BCBS 239 Risk Data Aggregation Deficit" },
      D: { key: 'D', text: "Total Data Contamination: Unverified machine-generated values mix into core production ledgers with zero source categorization flags.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Model Corruption Target" }
    }
  },

  // --- AVS: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "AVS-38-MGMT": {
    id: "AVS-38-MGMT", pillar: "AVS", subarea: "Upstream Mutation Tracking", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an external software vendor modifies their payload schema unannounced, how does management capture the resulting pipeline failure?",
    choices: {
      A: { key: 'A', text: "Automated Ingestion Contracts: Middleware monitors detect third-party API model schema drift instantly, alerting leads before context corruption.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Automated Error Escalation: Schema errors trigger alerts to technicians, generating itemized stability bugs inside sprint backlogs.", symptom_weight: 0.4, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "User-Driven Incident Tracking: Managers remain unaware of vendor schema drift until operators report blank dashboard fields.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "SLA Control Management Breakdown" },
      D: { key: 'D', text: "Total Ingestion Blindness: Processing pathways are unmapped; management cycles container servers without locating the root schema shift.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Data Pipeline Idempotency Control Deficit" }
    }
  },
  "AVS-39-MGMT": {
    id: "AVS-39-MGMT", pillar: "AVS", subarea: "Delivery Constraint Calibration", target_node: "MANAGERIAL",
    symptomatic_scenario: "Evaluate management's strategy for balancing pre-automation pipeline hardening against competing business feature requests.",
    choices: {
      A: { key: 'A', text: "Fixed Capacity Allocations: Management allocates 20% of every sprint exclusively to platform insulation and data guardrails.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Negotiated Stability Windows: Pipeline refactoring is prioritized when error triggers breach monthly operational ceilings.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Feature Backlog Domination: Data hardening tasks are delayed indefinitely to maintain aggressive commercial feature velocity.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "Continuous Software Life-Cycle Control Void" },
      D: { key: 'D', text: "Total Technical Debt Neglect: Schema drift is un-tracked until persistent timeout exceptions crash downstream integrations.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Operational Quality Drop Hazard Vector" }
    }
  },
  "AVS-40-MGMT": {
    id: "AVS-40-MGMT", pillar: "AVS", subarea: "Tribal Memory Mitigations", target_node: "MANAGERIAL",
    symptomatic_scenario: "If your lead AI engineer exits the organization, what asset ensures your management tier can maintain and scale automation pipelines smoothly?",
    choices: {
      A: { key: 'A', text: "Declarative Schema Contracts: Integration frameworks write data transformations and prompt templates automatically to open API specs.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Central Topology Wikis: Data transformations and model API target parameters are documented inside shared repositories.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Tribal Memory Dependence: Integration setups exist strictly in developer memory, lacking centralized tracing and runbook history.", symptom_weight: 1.5, bandwidth_multiplier: 2.3 },
      D: { key: 'D', text: "Total Architecture Opacity: AI pipelines are unmapped black boxes that staff cannot modify without causing unexpected system failures.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "System Traceability Infrastructure Void" }
    }
  },
  "AVS-41-MGMT": {
    id: "AVS-41-MGMT", pillar: "AVS", subarea: "Cross-Functional Dependency Mapping", target_node: "MANAGERIAL",
    symptomatic_scenario: "How are data pipelines mapped across business lines when executing inter-departmental automation and AI tool integrations?",
    choices: {
      A: { key: 'A', text: "Dynamic Lineage Modeling: Observability tools map data movement vectors across all database and AI networks automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Intermittent Design Audits: Managers assemble functional cross-team data flow diagrams manually before annual reviews.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Isolated Team Engineering: Departments compile internal integration pipelines independently, producing untraceable data lineage gaps.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Cross-Functional Escalation Operational Void" },
      D: { key: 'D', text: "Total Grid Fragmentation: Inter-system data maps are non-existent; troubleshooting calculation errors requires emergency multi-team debugging.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-42-MGMT": {
    id: "AVS-42-MGMT", pillar: "AVS", subarea: "SLA Latency Mitigation", target_node: "MANAGERIAL",
    symptomatic_scenario: "Calculate average management latency required to restore application speed when prompt context overload stalls an AI execution queue.",
    choices: {
      A: { key: 'A', text: "Automated Circuit Breakers: Decoupled circuit breakers isolate slow model endpoints, routing to fallback models in under 180 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Container Provisioning: Technicians provision secondary worker containers manually, adding hours of operational delay.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Complex Multi-Stage Triage: System recovery requires pulling developers from active roadmaps to debug model worker processes inline.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Emergency Operational Intercept Failure" },
      D: { key: 'D', text: "Indeterminate System Outage: Context overload deadlocks worker pools permanently, requiring a complete cold restart of background systems.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Pipeline Operational Continuity Failure" }
    }
  },
  "AVS-43-MGMT": {
    id: "AVS-43-MGMT", pillar: "AVS", subarea: "API Contract Tracking", target_node: "MANAGERIAL",
    symptomatic_scenario: "What interface tracking pattern validates that third-party AI integration endpoints align with company data-sharing safety filters?",
    choices: {
      A: { key: 'A', text: "Strict Version Gateway Audits: Automated OpenAPI checkers validate dataset shapes before allowing endpoint connections to execute.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Developer Security Approvals: Engineering leads verify data ingestion scripts manually before approving code merges to production.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unvalidated Partner Endpoints: External partners connect data feeds directly to internal endpoints without automated schema checks.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Total Data Interface Deregulation: Open access tokens are distributed across contractor teams without tracking query variables.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "AVS-44-MGMT": {
    id: "AVS-44-MGMT", pillar: "AVS", subarea: "Engineering Budget Efficiency", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management evaluate engineering hours lost to manual debugging caused by unmapped third-party API mutations?",
    choices: {
      A: { key: 'A', text: "Continuous Process Waste Logging: Project tools profile developer debugging hours and schema drift taxes automatically on dashboards.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Server Cost Analysis: Management isolates processing resource spikes manually when cloud bills cross predefined constraints.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Anecdotal Team Feedback: Debugging time remains hidden in task boards until developers report firefighting friction manually.", symptom_weight: 1.3, bandwidth_multiplier: 1.9 },
      D: { key: 'D', text: "Total Waste Opacity: Unindexed schema shifts cause continuous manual rework, draining engineering capacity enterprise-wide.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Resource Usage Monitoring Structural Gap" }
    }
  },
  "AVS-45-MGMT": {
    id: "AVS-45-MGMT", pillar: "AVS", subarea: "Regression Controls Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "When model prompt updates degrade execution speed across primary product workflows, identify management's tracking model.",
    choices: {
      A: { key: 'A', text: "Automated Integration Gates: CI/CD build systems block production branch updates automatically if calculation latency spikes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Staging Performance Reviews: Tech leads test processing metrics manually ahead of major platform version rollouts.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Post-Release Patch Sprints: Performance drops pass to production builds, requiring reactive code refactoring after users encounter lag.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Regression Testing Operational Control Failure" },
      D: { key: 'D', text: "Total Latency Acceptance: Response delays compound across releases, degrading workforce output with zero tracking logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- AVS: TECHNICAL NODE (CORE EXECUTION) ---
  "AVS-46-TECH": {
    id: "AVS-46-TECH", pillar: "AVS", subarea: "Polymorphic Validation Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "Review your technical group's ingestion architecture when external vendor payloads append unannounced tracking properties.",
    choices: {
      A: { key: 'A', text: "Dynamic Ingestion Adapters: Ingestion gateways isolate custom extensions into satellite schema tables, preserving core database indices.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Untyped Storage Blocks: Data stores dump incoming variables into untyped JSON blocks, degrading downstream query performance.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Brute Database Migrations: Engineers execute schema modifications manually inside live production environments under active load.", symptom_weight: 1.4, bandwidth_multiplier: 2.4, regulatory_tag: "High Rework Tax Performance Drag" },
      D: { key: 'D', text: "Total Schema Corruption: Data fields overwrite mismatching columns blindly, breaking query calculations downstream.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-47-TECH": {
    id: "AVS-47-TECH", pillar: "AVS", subarea: "Idempotent Stream Processing", target_node: "TECHNICAL",
    symptomatic_scenario: "What architecture safeguard isolates backend data tables when separate autonomous AI agents attempt to write matching records concurrently?",
    choices: {
      A: { key: 'A', text: "Optimistic Concurrency Controls: Target records verify row version attributes, auto-retrying saves if state collisions hit.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Pessimistic Row Locks: Storage clusters freeze target index blocks on write steps, creating thread queues under traffic load.", symptom_weight: 0.4, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unchecked Race Conditions: Agents execute writes concurrently with zero sequence validation, allowing newer records to overwrite prior edits.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Data Multi-Tenant Concurrency Control Failure" },
      D: { key: 'D', text: "Cascading Deadlock Exceptions: Overlapping agent update actions crash database memory states, blocking all connected services.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Data Pipeline Idempotency Control Deficit" }
    }
  },
  "AVS-48-TECH": {
    id: "AVS-48-TECH", pillar: "AVS", subarea: "Non-Blocking Message Buffers", target_node: "TECHNICAL",
    symptomatic_scenario: "Describe the codebase buffering configuration deployed to handle AI prompt ingestion when primary storage networks experience disconnections.",
    choices: {
      A: { key: 'A', text: "Persistent Event Queues: Ingestion channels write prompts to non-volatile message queues, replaying data once connections restore.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Synchronous Server Exceptions: Application routes return immediate 500 error codes, forcing upstream systems to rerun loops.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Volatile RAM Buffering: Ingestion scripts hold inputs in local application memory, dropping records when memory heaps overflow.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Infrastructure Resiliency Component Void" },
      D: { key: 'D', text: "Thread Contention Deadlocks: Blocked destination targets freeze all running application processes, crashing the server cluster entirely.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "SOX 404 Infrastructure Gap" }
    }
  },
  "AVS-49-TECH": {
    id: "AVS-49-TECH", pillar: "AVS", subarea: "Read Replica Decoupling", target_node: "TECHNICAL",
    symptomatic_scenario: "When an automated AI agent executes an analytical context query across 10 million relational rows, select the load isolation blueprint.",
    choices: {
      A: { key: 'A', text: "Decoupled Read Replicas: AI context queries check dedicated read-only replica data mirrors, leaving production databases untouched.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Off-Peak Cron Scheduling: Heavy analytical queries run manually during low-traffic midnight windows to avoid database locks.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Live Master Node Execution: Model queries run directly against live production master nodes, slowing down concurrent user operations.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Database Resource Contention Control Deficit" },
      D: { key: 'D', text: "Cascading Master Deadlocks: Complex context retrieval loops lock master database pools permanently, dropping network connections.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Resource Usage Monitoring Structural Gap" }
    }
  },
  "AVS-50-TECH": {
    id: "AVS-50-TECH", pillar: "AVS", subarea: "Active-Active Disaster Recovery", target_node: "TECHNICAL",
    symptomatic_scenario: "What fallback orchestration asset protects AI agent data states if your primary computing cluster encounters a regional network outage?",
    choices: {
      A: { key: 'A', text: "Multi-Zone Active Failover: Gateways utilize active-active regional mirrors, rerouting agent traffic automatically in under 30 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Image Provisioning: Infrastructure personnel provision secondary worker container images manually, adding hours of delay.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Siloed Regional Freezes: Ingestion lines stop completely during outages, requiring manual server cluster creation inside separate zones.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Disaster Recovery Compliance Regulatory Gap" },
      D: { key: 'D', text: "Data Corruption Drops: Outages break active database updates, producing incomplete or corrupt relational table properties.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },
  "AVS-51-TECH": {
    id: "AVS-51-TECH", pillar: "AVS", subarea: "Cache Invalidation Webhooks", target_node: "TECHNICAL",
    symptomatic_scenario: "How are runtime caching engines (e.g., Redis vector stores) validated to prevent stale data embeddings from skewing AI model choices?",
    choices: {
      A: { key: 'A', text: "Synchronous Invalidation Webhooks: Primary table edits trigger immediate cache flushes across all vector stores automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Time-To-Live Counters: Cached vector elements include timeout variables, but expiration counters do not track live data edits.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Zero Cache Validation: Vector caching states persist until manual flushes run, outputting stale embeddings to AI models.", symptom_weight: 1.5, bandwidth_multiplier: 2.0, regulatory_tag: "Cache Parity Verification Controls Failure" },
      D: { key: 'D', text: "Stale Vector Distortions: Out-of-date vector caches feed invalid context to AI models, generating high hallucination rates.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Cache Parity Verification Controls Failure" }
    }
  },
  "AVS-52-TECH": {
    id: "AVS-52-TECH", pillar: "AVS", subarea: "Distributed Serialization Normalizers", target_node: "TECHNICAL",
    symptomatic_scenario: "Evaluate the technical tracing tools used to measure latency bottlenecks generated by variable serialization across microservice routes.",
    choices: {
      A: { key: 'A', text: "Continuous Distributed Tracing: Base monitoring wrappers evaluate serialization duration across all internal messaging routes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual APM Profiling: Technical architects audit microservice transaction latency parameters manually during performance reviews.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Zero Integration Tracking: Systems route diverse payload formats without central profiling, masking communication bottlenecks.", symptom_weight: 1.4, bandwidth_multiplier: 1.9, regulatory_tag: "Distributed Architecture Infrastructure Deficit" },
      D: { key: 'D', text: "Network Thread Contention: High serialization conversion overhead jams messaging channels, triggering server disconnections.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "System Traceability Infrastructure Void" }
    }
  },

  // --- AVS: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "AVS-53-USER": {
    id: "AVS-53-USER", pillar: "AVS", subarea: "Manual Scrubbing Taxes", target_node: "USER",
    symptomatic_scenario: "When automated data pipelines output missing, mismatched, or corrupted records onto your workspace views, detail user routines.",
    choices: {
      A: { key: 'A', text: "Zero Manual Cleaning: Self-healing edge filters infer missing properties automatically using rolling historical averages.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Integrated Exception UI: Workspace panels display data format warnings, letting staff modify records within a single interface.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "The Shadow Spreadsheet Patch: Operators manually fix automated errors, tracking corrected data fields in local Excel sheets.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Shadow Data Pipeline Expansion" },
      D: { key: 'D', text: "Total System Avoidance: Ground operators process data tasks manually via offline text files, ignoring platform views completely.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Total Architecture Rejection" }
    }
  },
  "AVS-54-USER": {
    id: "AVS-54-USER", pillar: "AVS", subarea: "Interface Data Loss Discrepancies", target_node: "USER",
    symptomatic_scenario: "If ingestion scripts drop invalid payload properties automatically to maintain server uptime, how is that handled on your workspace screen?",
    choices: {
      A: { key: 'A', text: "Dynamic Error Banners: The interface displays structural missing-field warnings, directing users to the data source issue.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Blank Profile Cells: The dashboard leaves fields blank with zero explanation, forcing operators to guess missing transaction values.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Silent Record Disappearance: Corrupted items vanish from workflow tables with zero alert text, leading staff to execute double entries.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Operational Quality Control Failure" },
      D: { key: 'D', text: "Cascading Browser Crashes: Formatting mutations crash the web layout entirely, blocking user data entry lines.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Operational Interface Failure" }
    }
  },
  "AVS-55-USER": {
    id: "AVS-55-USER", pillar: "AVS", subarea: "Typing Error Disconnects", target_node: "USER",
    symptomatic_scenario: "When an external microservice update modifies database column types, select the layout impact on user workspace tasks.",
    choices: {
      A: { key: 'A', text: "Dynamic Format Casting: Interface normalizers translate and recast data shapes smoothly with zero screen distortion.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Numeric Field Conversions: Screens convert type errors to empty zero cells, displaying incorrect pricing metrics to users.", symptom_weight: 0.6, bandwidth_multiplier: 1.3 },
      C: { key: 'C', text: "Interface Loading Freezes: Control panels lock on data rendering loops, blocking workspace functionality for active workers.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "System Type Validation Control Failure" },
      D: { key: 'D', text: "Total Screen Outages: Type exceptions trigger application crashes globally, blocking data entry functions until server patches run.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-56-USER": {
    id: "AVS-56-USER", pillar: "AVS", subarea: "Duplicate Record Skews", target_node: "USER",
    symptomatic_scenario: "Evaluate the frequency with which ground-level operators identify duplicate transaction rows printing inside active account summaries.",
    choices: {
      A: { key: 'A', text: "Zero Record Duplication: Boundary middleware filters double writes perfectly, keeping transaction views pristine code-wide.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Rare Processing Artifacts: Duplicate rows appear less than once a quarter, resolved via manual manager adjustment inputs.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Continuous Balance Skews: Duplicate lines populate weekly, forcing staff to run manual calculations to compute real metrics.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Absolute Metric Distrust: Duplications corrupt ledger summaries continuously; operators verify all inputs via offline personal logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "AVS-57-USER": {
    id: "AVS-57-USER", pillar: "AVS", subarea: "Character Encoding Distortions", target_node: "USER",
    symptomatic_scenario: "How does your operations workforce address international client files when database text strings display corrupted encoding character strings?",
    choices: {
      A: { key: 'A', text: "Dynamic Transcoding Normalization: Edge components translate character encoding strings automatically, keeping text pristine.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Field Overwriting: Operators use administrative panels to manually adjust broken text lines cell-by-cell.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Corrupt Profile Acceptance: Broken text blocks save directly to tables, creating un-searchable indices inside database logs.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Data Normalization Operational Control Void" },
      D: { key: 'D', text: "Cascading Document Crashes: Corrupted character strings crash automated invoice tools, stopping outbound client communications.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Operational Quality Drop Hazard Vector" }
    }
  },
  "AVS-58-USER": {
    id: "AVS-58-USER", pillar: "AVS", subarea: "Database Indexing Latency", target_node: "USER",
    symptomatic_scenario: "When background data pipelines experience massive volume acceleration, describe the immediate impact on workspace search speeds.",
    choices: {
      A: { key: 'A', text: "Zero Search Interruption: Optimized database index mapping processes queries in under 200ms despite background load.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Slowing Workspace Speeds: Query lookups delay by 5 to 10 seconds under load, creating minor data entry stalls.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Persistent Connection Timeouts: Lookups return error boxes, forcing staff to re-run searches multiple times to load data.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Database Resource Contention Deficit" },
      D: { key: 'D', text: "Terminal Interface Halts: Storage indexing congestion freezes user screen loading completely, locking out operators for hours.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Workforce Disconnection Hazard" }
    }
  },
  "AVS-59-USER": {
    id: "AVS-59-USER", pillar: "AVS", subarea: "Cache State Contention", target_node: "USER",
    symptomatic_scenario: "Review your operational team's workaround behavior when interface view fields populate out-of-date metrics due to server cache latency.",
    choices: {
      A: { key: 'A', text: "Absolute Cache Parity: Invalidation webhooks clear memory frames instantly when backend values change.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Continuous Browser Reloading: Operators clear browser history states manually using hard reload commands throughout the shift.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Stale Metric Processing: Operators complete transactions using outdated display parameters, producing balance calculation errors.", symptom_weight: 1.6, bandwidth_multiplier: 2.4, regulatory_tag: "Cache Parity Verification Controls Failure" },
      D: { key: 'D', text: "Total Workspace Misalignment: Cache latency causes users to overwrite matching database rows, saving conflicting update logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Operational Interface Failure" }
    }
  },
  "AVS-60-USER": {
    id: "AVS-60-USER", pillar: "AVS", subarea: "Outage Data Recovery", target_node: "USER",
    symptomatic_scenario: "When a cloud data infrastructure outage drops background data systems, what recovery tasks are required from users once connections restore?",
    choices: {
      A: { key: 'A', text: "Zero Manual Reconciliation: Distributed message queues replay data entries automatically with zero value leaks.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Balance Spot-Checks: Operators run consistency spot-checks against recent entries manually to verify process completion.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Bulk Transaction Re-Keying: Staff spend hours manually typing in client operations that failed to commit during the outage window.", symptom_weight: 1.5, bandwidth_multiplier: 2.7, regulatory_tag: "Disaster Recovery Compliance Regulatory Gap" },
      D: { key: 'D', text: "Total Data Corruption Chaos: Broken pipeline writes corrupt ledger histories permanently, forcing complex data cleanup sprints.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Scalability Controls Structural Framework Gap" }
    }
  },

  // ===========================================================================
  // PILLAR 3: HUMAN-AUTONOMOUS INTERACTION [HAI] (QUESTIONS 61-90)
  // ===========================================================================
  
  // --- HAI: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "HAI-61-EXEC": {
    id: "HAI-61-EXEC", pillar: "HAI", subarea: "Automated Verification Loops", target_node: "EXECUTIVE",
    symptomatic_scenario: "An autonomous AI pricing engine updates commercial offers dynamically. How does corporate governance verify that runtime margin shifts adhere to boardroom risk limits?",
    choices: {
      A: { key: 'A', text: "Hard Strategic Caps: Policies enforce programmatic validation limits at the database boundary to prevent unchecked variations.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Retrospective Confidence: Governance checks summarized execution tables monthly, relying on lower execution tiers to catch drift.", symptom_weight: 0.7, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Strategic Abdication: Management assumes underlying model engines are self-correcting, tracking zero micro-margin metrics.", symptom_weight: 1.6, bandwidth_multiplier: 2.0, regulatory_tag: "SEC Rule 10b-5 Exposure Vector" },
      D: { key: 'D', text: "Total Boundary Blindness: Processing bounds are modified inline by teams without setting formal enterprise oversight rules.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Omission" }
    }
  },
  "HAI-62-EXEC": {
    id: "HAI-62-EXEC", pillar: "HAI", subarea: "System Reskilling & Fallbacks", target_node: "EXECUTIVE",
    symptomatic_scenario: "A cloud outage takes primary autonomous AI processing engines offline completely. How is the operational continuity runway managed at the leadership tier?",
    choices: {
      A: { key: 'A', text: "Active Parallel Drills: Executive rules mandate scheduled manual drill runs where staff process core actions fully out-of-band.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Documented Runbook Trust: Leadership references static operational wikis, assuming teams retain manual domain re-entry capabilities.", symptom_weight: 0.6, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Operational Inertia Blindness: Management accepts that an AI system outage freezes output velocity indefinitely due to workforce deskilling.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "NIST SP 800-53 Operational Continuity Risk" },
      D: { key: 'D', text: "Total Operational Void: No alternative recovery blueprints or manual domain protocols exist; outages cause absolute organizational standstills.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Material Operating Capital Loss Omission Vector" }
    }
  },
  "HAI-63-EXEC": {
    id: "HAI-63-EXEC", pillar: "HAI", subarea: "Fiduciary Boundary Hardening", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate how your executive node ensures that third-party AI agent components processing user records comply with localized data privacy mandates.",
    choices: {
      A: { key: 'A', text: "Continuous Legal Auditing: Compliance teams run schema contract validations before agent code is committed to deployment blocks.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Vendor Terms Reliance: Policy assumes premium AI platform vendor agreements update target legal bounds automatically.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ex-Post Enforcement Reaction: Breaches are identified only after an external legal notification or data privacy challenge arrives.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "GDPR Article 22 Compliance Exposure" },
      D: { key: 'D', text: "Total Compliance Vacuum: AI transactions run without tracking geographical location coordinates or user regulatory parameters.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Cross-Border Sovereign Regulatory Infraction Risk" }
    }
  },
  "HAI-64-EXEC": {
    id: "HAI-64-EXEC", pillar: "HAI", subarea: "Capital Allocation Transparency", target_node: "EXECUTIVE",
    symptomatic_scenario: "How is the cumulative operational waste and engineering Process Waste Tax of automated AI elements surfaced to boardroom stakeholders?",
    choices: {
      A: { key: 'A', text: "Granular Loss Ledgers: Financial dashboards map compute friction costs and developer debugging hours explicitly every sprint.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Aggregated IT Expense Reporting: Management reviews broad IT budgets that bundle and mask systemic resource waste tokens.", symptom_weight: 0.6, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Qualitative ROI Assumptions: Value assessments rely on unverified vendor marketing decks showing generic satisfaction variables.", symptom_weight: 1.5, bandwidth_multiplier: 2.2 },
      D: { key: 'D', text: "Total Financial Opacity: Operational friction is unrecorded until infrastructure breakdowns cause catastrophic client SLA breaches.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "HAI-65-EXEC": {
    id: "HAI-65-EXEC", pillar: "HAI", subarea: "Access Governance Hierarchies", target_node: "EXECUTIVE",
    symptomatic_scenario: "Determine the corporate governance directive controlling who holds authority to adjust automated AI workflow execution limits in production.",
    choices: {
      A: { key: 'A', text: "Dual-Token Cryptographic Gates: Changes require matched token signatures from both technical and compliance executive keys before live injection.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Managerial Backlog Approval: Limits are adjusted via prioritized developer tickets, requiring product manager sprint verification.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unhardened Developer Discretion: Engineers alter agent threshold variables inline without formal change control validation.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "SOX 404 Control Deficiency Marker" },
      D: { key: 'D', text: "Shared Core Password Access: Administrative root keys are distributed widely across internal development teams via unencrypted text channels.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" }
    }
  },
  "HAI-66-EXEC": {
    id: "HAI-66-EXEC", pillar: "HAI", subarea: "Strategic Trust Calibration", target_node: "EXECUTIVE",
    symptomatic_scenario: "Following an operational failure induced by an autonomous AI model anomaly, select the protocol used by leadership to recalibrate trust limits.",
    choices: {
      A: { key: 'A', text: "Policy-as-Code Recalibration: Agent boundaries are hardcoded into validation middleware rules, preventing failure repetition.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Runbook Updates: Incidents are logged in static operational wikis, requiring teams to reference guides during future faults.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Ad-Hoc Team Debriefs: Remediation occurs via chat threads; development teams patch prompt text without modifying risk equations.", symptom_weight: 1.3, bandwidth_multiplier: 1.8 },
      D: { key: 'D', text: "Passive State Re-engagement: Errors are classified as non-recurring anomalies; AI agents resume live workflows with zero parameter edits.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Continuous Logic Risk Mitigation Gap" }
    }
  },
  "HAI-67-EXEC": {
    id: "HAI-67-EXEC", pillar: "HAI", subarea: "Autonomous Scale Thresholds", target_node: "EXECUTIVE",
    symptomatic_scenario: "When transitioning automated AI agents from isolated pilots to enterprise-wide scale, how does governance verify boundary security?",
    choices: {
      A: { key: 'A', text: "Statistical Cohort Gating: Agent expansions match strict performance filters, auto-pausing on logic variance alerts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Velocity-Driven Integration: AI is deployed rapidly across business lines to hit commercial milestones, delaying edge validation.", symptom_weight: 0.8, bandwidth_multiplier: 1.5 },
      C: { key: 'C', text: "Uncapped Infrastructure Scale: Agents scale out without setting hard centralized compute bounds or transaction ceiling flags.", symptom_weight: 1.6, bandwidth_multiplier: 2.4, regulatory_tag: "Uncontrolled Capital Allocation Hazard Vector" },
      D: { key: 'D', text: "Total Scale Deregulation: AI models enter production lines with zero monitoring layers configured to trace market distortions.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Material Operating Capital Loss Omission Vector" }
    }
  },

  // --- HAI: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "HAI-68-MGMT": {
    id: "HAI-68-MGMT", pillar: "HAI", subarea: "Telemetry Noise Saturation", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does the volume of unaggregated system notifications impact your management layer's ability to monitor core team delivery parameters?",
    choices: {
      A: { key: 'A', text: "Track 02 Telemetry Decoupling: Edge filters abstract low-priority telemetry, surfacing only actionable exceptions to management views.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Degraded Team Focus: Developers allocate significant sprint hours to tracking false positive alerts, delaying feature releases.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Validation Fatigue: Continuous log noise saturates communication lines, hiding real logic drift behind walls of alert text.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "High Alarm Fatigue Operational Breakdown" },
      D: { key: 'D', text: "Global Notification Silencing: Teams mute entire notification channels to clear workspace screens, missing high-severity outages.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Risk Management Escalation Circuit Failure" }
    }
  },
  "HAI-69-MGMT": {
    id: "HAI-69-MGMT", pillar: "HAI", subarea: "Cross-Node Error Escalation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an AI logic drift validation failure breaks processing stability inside a value stream, evaluate the cross-functional coordination protocol.",
    choices: {
      A: { key: 'A', text: "Triangulated Notification Sync: Monitoring layers push tailored impact summaries to technical, management, and risk teams instantly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Ticket Isolation: Managers generate task items, routing code corrections through standard sprint priorities.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Siloed Technical Containment: Incidents are handled strictly within engineering logs; business leadership remains completely blind.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Cross-Functional Escalation Operational Void" },
      D: { key: 'D', text: "Total Operational Interruption: Fault logs drop into an unmonitored mailbox, delaying remediation until a systemic platform crash occurs.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Pipeline Operational Continuity Failure" }
    }
  },
  "HAI-70-MGMT": {
    id: "HAI-70-MGMT", pillar: "HAI", subarea: "SLA Control Management", target_node: "MANAGERIAL",
    symptomatic_scenario: "Calculate average managerial latency required to isolate and address an active AI automation drift error that is corrupting user metrics.",
    choices: {
      A: { key: 'A', text: "Zero-Latency Intercept: Monitoring elements identify errors and isolate compromised agent vectors within 180 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Single-Shift Tracking Sync: Teams spend a full business day parsing distributed infrastructure layers to map prompt anomalies.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Customer-Driven Remediation: Management remains unaware of data errors until external entities log formal SLA dispute notices.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "SLA Control Management Breakdown" },
      D: { key: 'D', text: "Indeterminate State Recovery: Pipeline pathways are unmapped; management restarts container servers without isolating core malfunctions.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Data Provenance Structural Audit Deficit" }
    }
  },
  "HAI-71-MGMT": {
    id: "HAI-71-MGMT", pillar: "HAI", subarea: "Compliance Logic Translation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When operational or financial compliance rules change, describe the management workflow used to re-align active AI agent prompts.",
    choices: {
      A: { key: 'A', text: "Unified Gateway Compilation: Managers update target rules via an isolated control plane, compiling changes code-wide instantly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Configuration Patch Deployment: Adjustments deploy via standard code variables, lacking real-time constraint checking triggers.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Manual Sprint Prioritization: Policy updates enter engineering backlogs, creating an open compliance drift window of over 21 days.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "High Compliance Logic Drift Exposure" },
      D: { key: 'D', text: "Undocumented Engineering Patches: Developers tweak prompt rules directly inside active repositories, bypassing management.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Change Control Policy Compliance Fracture" }
    }
  },
  "HAI-72-MGMT": {
    id: "HAI-72-MGMT", pillar: "HAI", subarea: "Bandwidth Leakage Allocation", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management trace and account for cumulative development velocity lost to repairing automated data payload breakdowns?",
    choices: {
      A: { key: 'A', text: "Process Waste Tax Logging: Project management systems surface system rework and schema drift costs directly on delivery dashboards.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Task Tracking: Engineering hours map to broad bug metrics, but financial leakage equations are never compiled.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Obfuscated Operational Burn: Engineering rework is logged under general maintenance, hiding systems decay from business leaders.", symptom_weight: 1.4, bandwidth_multiplier: 2.0 },
      D: { key: 'D', text: "Total Waste Opacity: Rework loops are unrecorded; developers debug structural errors informally under continuous firefighting strain.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Material Operating Capital Loss Omission" }
    }
  },
  "HAI-73-MGMT": {
    id: "HAI-73-MGMT", pillar: "HAI", subarea: "Third-Party Integration Safety", target_node: "MANAGERIAL",
    symptomatic_scenario: "Evaluate management's process for verifying that external machine learning layers map accurately to enterprise risk limits.",
    choices: {
      A: { key: 'A', text: "Sandboxed Contract Validation: Core middleware executes integration constraints against external vendor payloads before live routing.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "SLA Metric Assumptions: Management assumes vendor certifications guarantee compliance alignment without custom audits.", symptom_weight: 0.6, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Ambiguous Operational Boundaries: Third-party integration agreements lack explicit accountability for AI model drift errors.", symptom_weight: 1.3, bandwidth_multiplier: 1.8, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Unhardened Core Ingestion: Vendor AI endpoints interface directly with write-access processing databases without safety checks.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Third-Party Risk Framework Gap" }
    }
  },
  "HAI-74-MGMT": {
    id: "HAI-74-MGMT", pillar: "HAI", subarea: "Intervention Intercept Controls", target_node: "MANAGERIAL",
    symptomatic_scenario: "If an operator identifies an AI model anomaly, outline the permission matrix required to execute an emergency freeze across a workflow.",
    choices: {
      A: { key: 'A', text: "Unified Interface Intercept: Staff utilize a single role-restricted dashboard toggle that safely pauses the pipeline while locking state.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Multi-Tier Approval Chains: Halting execution loops requires creating urgent tickets, delaying action as errors accumulate.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Siloed DevOps Access: Shutdown scripts are restricted to infrastructure teams, requiring managers to route requests over chat.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Emergency Operational Intercept Failure Risk" },
      D: { key: 'D', text: "Zero Intervention Controls: No operational freeze mechanism exists; stopping drift loops requires rebuilding cloud node clusters manually.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },
  "HAI-75-MGMT": {
    id: "HAI-75-MGMT", pillar: "HAI", subarea: "Internal Governance Documentation", target_node: "MANAGERIAL",
    symptomatic_scenario: "During an audit engagement, what verifiable history proves that your management layer actively calibrates automated AI agent choice paths?",
    choices: {
      A: { key: 'A', text: "Cryptographic Action Registries: Architectures log every managerial modification and prompt adjustment to an immutable ledger.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Reconstructed Dev Logs: Managers cross-reference task completion timestamps against general code updates manually.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Fragmented History Tracking: Oversight histories are compiled ad-hoc from scattered chat transcripts, personal files, and code notes.", symptom_weight: 1.5, bandwidth_multiplier: 2.1, regulatory_tag: "SOX 404 Internal Controls Oversight Operational Abdication" },
      D: { key: 'D', text: "Zero Auditable Trails: Retention filters purge application logs weekly; management cannot produce clear documentation of system oversight.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Fiduciary Record-Keeping Risk Gaps" }
    }
  },

  // --- HAI: TECHNICAL NODE (CORE EXECUTION) ---
  "HAI-76-TECH": {
    id: "HAI-76-TECH", pillar: "HAI", subarea: "Deterministic Exception Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "Review your engineering team's exact routine when an active autonomous AI pipeline engine generates a runtime format exception.",
    choices: {
      A: { key: 'A', text: "Automated Sandbox Isolation: Core middleware isolates anomalies inside staging containers, parsing side-by-side git diff readouts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Inline Production Fixes: Developers rewrite prompt or code logic parameters directly inside live production clusters under active load.", symptom_weight: 0.8, bandwidth_multiplier: 1.5 },
      C: { key: 'C', text: "Brute Instance Resets: Engineering clears exception stacks by cycling container tasks without isolating underlying data mutations.", symptom_weight: 1.4, bandwidth_multiplier: 2.4, regulatory_tag: "High Rework Tax Performance Drag" },
      D: { key: 'D', text: "Cascading Microservice Freezes: Unhandled exceptions jam database connection pools, triggering timeout errors across adjacent services.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Emergency Operational Intercept Failure Vector" }
    }
  },
  "HAI-77-TECH": {
    id: "HAI-77-TECH", pillar: "HAI", subarea: "Alert Telemetry Hardening", target_node: "TECHNICAL",
    symptomatic_scenario: "Describe the codebase configuration applied to prevent lower-severity system stack traces from overwhelming developer tracking dashboards.",
    choices: {
      A: { key: 'A', text: "Declarative Rule Filtering: Monitoring middleware suppresses non-actionable warnings, surfacing only explicit schema and logic drift.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Isolated View Customization: Software engineers create personalized log strings locally, but settings lack multi-node synchronization.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unified Log Compression: Tech logs and transaction validation indicators flow to a single stream, forcing manual query isolation.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "NIST SP 800-53 Operational Telemetry Deficiencies" },
      D: { key: 'D', text: "Zero Alert Filtering: Runtimes broadcast all infrastructure notices blindly, inducing severe validation fatigue.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Operational Interface Cognitive Overload Risk" }
    }
  },
  "HAI-78-TECH": {
    id: "HAI-78-TECH", pillar: "HAI", subarea: "Non-Repudiation Ledgers", target_node: "TECHNICAL",
    symptomatic_scenario: "Where are intermediate parameter states, probability weights, and prompt/response records written during an automated calculation cycle?",
    choices: {
      A: { key: 'A', text: "Append-Only WORM Repositories: Runtimes write metric states straight to decoupled, cryptographically verified storage blocks.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Relational DB Rows: Variable parameters save to shared production indices, accessible to direct user edits.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Rolling Text Logs: Tracing records stream to local server files configured with an unmonitored 14-day deletion rule.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Immediate Memory Evacuation: Systems write only the final mutation variable; intermediate reasoning paths dissolve instantly.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "HAI-79-TECH": {
    id: "HAI-79-TECH", pillar: "HAI", subarea: "Access Control Token Security", target_node: "TECHNICAL",
    symptomatic_scenario: "What identity architecture schema protects platform configuration variables and AI model master API keys within execution containers?",
    choices: {
      A: { key: 'A', text: "Dynamic Cloud Identity Roles: Systems utilize ephemeral tokens that expire automatically within 15 minutes, validating access via KMS.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Secure Key Vault Mapping: Access parameters match centralized security lockers, but connection tokens hold long lifecycle validations.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Plaintext Environment Variables: API keys save as static, unencrypted string variables inside localized app properties.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "In-Code Token Variables: Master system API strings save directly within open code repositories, visible to contractors.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "HAI-80-TECH": {
    id: "HAI-80-TECH", pillar: "HAI", subarea: "Idempotency Architecture Specs", target_node: "TECHNICAL",
    symptomatic_scenario: "When a cloud routing delay causes a third-party pipeline connector to re-transmit an identical prompt payload batch, how does the codebase respond?",
    choices: {
      A: { key: 'A', text: "Idempotent Key Verification: Middleware hashes payload layouts, dropping duplicate strings before executing database writes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Database Unique Constraints: Table indexes block identical rows, but trigger unhandled backend script crashes that stall the pipeline.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Double-Commit Leakage: Relational databases record both entries cleanly, silently corrupting downstream metrics.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Infinite Thread Contention Locks: Queues loop endlessly attempting to resolve overlapping rows, crashing parallel ingestion pools.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Multi-Tenant Concurrency Control Failure" }
    }
  },
  "HAI-81-TECH": {
    id: "HAI-81-TECH", pillar: "HAI", subarea: "Regression Testing Coverage", target_node: "TECHNICAL",
    symptomatic_scenario: "What continuous integration framework configuration evaluates pipeline processing velocity regressions before merging pull requests?",
    choices: {
      A: { key: 'A', text: "Automated Latency Gates: Test pipelines run automated capacity checks, blocking code or prompt modifications that slow processing speeds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Staging Load Runs: Core technical leads coordinate bulk transaction volume stress checks manually ahead of version updates.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Functional Verification Limits: Build assertions test syntax trees and basic logical states, completely ignoring runtime latency profiles.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Regression Testing Operational Control Failure" },
      D: { key: 'D', text: "Zero Pre-Release Load Checks: Code alterations deploy straight to production lines with zero automated latency profiling.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },
  "HAI-82-TECH": {
    id: "HAI-82-TECH", pillar: "HAI", subarea: "Data Lineage Resolution", target_node: "TECHNICAL",
    symptomatic_scenario: "If a downstream AI value stream output exhibits data corruption or hallucination, detail the tool configuration used to locate the input vector.",
    choices: {
      A: { key: 'A', text: "Automated Lineage Tracing: Distributed tracing software instruments and charts the context transformation journey across system boundaries.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Cross-DB Querying: Engineers run ad-hoc SQL comparison scripts across separate database partitions to reconstruct history.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Static Topology Documentation: Engineers reference outdated system maps to guess origin blocks, adding verification delay.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "System Traceability Infrastructure Void" },
      D: { key: 'D', text: "Complete Lineage Erasure: Optimization functions strip origin metadata from headers, making historical trace mapping mathematically impossible.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Data Lineage Structural Failure" }
    }
  },

  // --- HAI: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "HAI-83-USER": {
    id: "HAI-83-USER", pillar: "HAI", subarea: "Automation Bias Exploitation", target_node: "USER",
    symptomatic_scenario: "When an automated AI operational dashboard presents a processing recommendation that looks highly anomalous, evaluate your team's routine.",
    choices: {
      A: { key: 'A', text: "Active Human-in-the-Loop Gate: Operators lock the transaction block instantly, triggering an out-of-band manual verification review.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Escalated Discussion Gaps: Staff pause execution to verify parameters with team leads over chat, inducing multi-hour processing stalls.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unchecked Automation Bias: Operators execute the distorted machine suggestion blindly, assuming the model overrides human intuition.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Internal Controls Oversight Operational Abdication" },
      D: { key: 'D', text: "Quota-Driven Data Clearing: Operators clear warning prompts rapidly without validation to hit daily volume metrics.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Operational Quality Control Failure" }
    }
  },
  "HAI-84-USER": {
    id: "HAI-84-USER", pillar: "HAI", subarea: "Workforce Workaround Tracks", target_node: "USER",
    symptomatic_scenario: "If an automated AI logic update inserts high processing friction or interface delays into your primary task loop, how do operators adapt?",
    choices: {
      A: { key: 'A', text: "Integrated Exception Logging: Users activate an inline bypass toggle that routes tasks to backup queues while auto-reporting friction locations.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual UI Overwriting: Staff modify output text windows field-by-field manually, resolving processing blocks cell-by-cell.", symptom_weight: 0.4, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "The Shadow Spreadsheet Patch: Operators abandon the automated screen, building private Excel sheets to process workflows on time.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "Shadow Data Pipeline Expansion" },
      D: { key: 'D', text: "Complete System Avoidance: Staff process daily transactions entirely via offline manual communication channels, ignoring platform tools.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Total Architecture Rejection" }
    }
  },
  "HAI-85-USER": {
    id: "HAI-85-USER", pillar: "HAI", subarea: "Explainability Gap Friction", target_node: "USER",
    symptomatic_scenario: "When a customer demands an immediate explanation for an automated AI account block or scoring rejection, what asset does the interface provide?",
    choices: {
      A: { key: 'A', text: "Automated Rationale Manifests: The screen features an oversight button that prints an instant, plain-English summary of underlying choice weights.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Technical Variable Blocks: The interface displays raw system error codes and metadata strings that operators struggle to articulate to clients.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "The Rationale Vacuum: Panels output simple generic status tags (e.g., 'REJECTED'), forcing staff to stall clients with standard placeholders.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "GDPR Article 22 Infraction" },
      D: { key: 'D', text: "Complete Operations Blackout: UI tools block tracking views completely; staff must route all customer choice disputes straight to legal teams.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Consumer Privacy Protection Violation Risk" }
    }
  },
  "HAI-86-USER": {
    id: "HAI-86-USER", pillar: "HAI", subarea: "Alarm Dismissal Routines", target_node: "USER",
    symptomatic_scenario: "When multiple validation warning modals flash concurrently across workspace screens during peak volume, review typical clearing habits.",
    choices: {
      A: { key: 'A', text: "Itemized Action Tokens: The UI requires an authorized access token and specific reason string before removing each alert box.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Unreviewed Comment Entry: Operators input random character text strings inside comment boxes to satisfy UI clearing forms rapidly.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Single-Click Global Dismissal: Staff clear workspace warnings instantly via a master 'Dismiss All' box due to validation fatigue.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Unverified Alarm Dismissal Routine" },
      D: { key: 'D', text: "Systemic Visual Bypassing: Staff cover error lights physically or place alert view layers off-screen to finish data entry unhindered.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "HAI-87-USER": {
    id: "HAI-87-USER", pillar: "HAI", subarea: "User Trust Disconnection", target_node: "USER",
    symptomatic_scenario: "Evaluate the absolute level of trust your ground-level workforce holds toward the data summaries populated on main AI view screens.",
    choices: {
      A: { key: 'A', text: "Complete Metric Parity: Interface statistics align cleanly with business parameters; operators use metrics without cross-checking calculations.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Tactical Spot Verification: Operators compute manual sanity checks across roughly 10% of outputs to monitor data consistency.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Systemic Core Distrust: Workers treat app values as fundamentally unreliable, running offline validation tasks to check calculations.", symptom_weight: 1.5, bandwidth_multiplier: 2.3 },
      D: { key: 'D', text: "Active Platform Hostility: Operators assume screen metrics are incorrect by default, actively designing tasks to reverse platform outputs.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Workforce Disconnection Hazard" }
    }
  },
  "HAI-88-USER": {
    id: "HAI-88-USER", pillar: "HAI", subarea: "Interface Sync Delays", target_node: "USER",
    symptomatic_scenario: "When background network congestion induces payload processing latency, how is that data lag surfaced to the active platform user?",
    choices: {
      A: { key: 'A', text: "Dynamic Sync Timers: Real-time latency meters display on the interface header, stating exactly when data blocks last synchronized.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Static Loading Windows: Screens freeze on un-quantified loading wheels, leaving staff to guess if backend system tasks are dead or running.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Silent Stale Displays: UI boxes display hours-old cached values without warnings, causing users to execute actions using dead data.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Cache Parity Control Failure" },
      D: { key: 'D', text: "Cascading Layout Freezes: Outages cause browser framework crashes that lock workspace layouts, requiring a full app cache reset.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Operational Interface Cognitive Overload Risk" }
    }
  },
  "HAI-89-USER": {
    id: "HAI-89-USER", pillar: "HAI", subarea: "Manual Override Friction", target_node: "USER",
    symptomatic_scenario: "Calculate the operational time required to alter a client record when an automated AI validation check applies an incorrect system lock.",
    choices: {
      A: { key: 'A', text: "Instant Core Unlocking: Operators use authorized shortcut keys to clear erroneous locks and edit fields within 60 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Escalated Manager Resets: Modifying blocks requires administrative keys held by engineering leads, stalling work for multiple hours.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Cross-Department Ticket Chains: Clearing restrictions requires raising formal alignment tasks, grounding user tasks for multiple days.", symptom_weight: 1.5, bandwidth_multiplier: 2.7, regulatory_tag: "Emergency Operational Intercept Failure" },
      D: { key: 'D', text: "Immutable Interface Deadlocks: System blocks are unmodifiable via user interfaces; accounts remain frozen until database edits execute.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },
  "HAI-90-USER": {
    id: "HAI-90-USER", pillar: "HAI", subarea: "Onboarding Training Drift", target_node: "USER",
    symptomatic_scenario: "Describe the operational onboarding methodology applied to prepare new team hires to manage automated AI exception parameters.",
    choices: {
      A: { key: 'A', text: "Deterministic Simulation Labs: Hires practice processing simulated error vectors inside isolated training environment sandboxes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Static Text Review: Onboarding relies on reading software wikis and engineering logs during week one, without live runs.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ad-Hoc Peer Shadowing: New hires replicate ground-level tasks by copying senior users, absorbing undocumented shortcut tracks.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Operational Training Lifecycle Drift" },
      D: { key: 'D', text: "Immediate Live Execution: Hires manage live production workflows immediately with zero prior training on system failure boundaries.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Internal Controls Operational Abdication" }
    }
  }
};
