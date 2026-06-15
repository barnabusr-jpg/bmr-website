import { LocalQuestion } from '../types/forensicRuntime';

export const forensicQuestions: Record<string, LocalQuestion> = {
  // ===========================================================================
  // PILLAR 1: INSTITUTIONAL GOVERNANCE/FIDELITY [IGF] (QUESTIONS 01-30)
  // ===========================================================================
  
  // --- IGF: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "IGF-01-EXEC": {
    id: "IGF-01-EXEC", pillar: "IGF", subarea: "Regulatory Black-Box Exposure", target_node: "EXECUTIVE",
    symptomatic_scenario: "An autonomous model handles automated user tier assignment and evaluation choices. How does corporate governance verify process transparency parameters?",
    choices: {
      A: { key: 'A', text: "Absolute Regulatory Parity: Platform rules require every runtime to record immutable logic traces, matching global compliance baselines.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Contractual Compliance Models: Leadership trusts third-party framework specifications, assuming platform design ensures transparency.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "High Unhedged Legal Exposure: Systems operate as a black box; leadership tracks zero intermediate logic weights during internal reviews.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "GDPR Article 22 Infraction Exposure" },
      D: { key: 'D', text: "Total Audit Compliance Collapse: Automated choices execute with zero logic metadata persistence, leaving the firm fully exposed to statutory fines.", symptom_weight: 2.0, bandwidth_multiplier: 4.0, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-02-EXEC": {
    id: "IGF-02-EXEC", pillar: "IGF", subarea: "Vendor Concentration Risk", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate the corporate risk strategy managing dependency perimeters when core values pipelines connect to a single third-party model engine.",
    choices: {
      A: { key: 'A', text: "Cloud-Agnostic Abstraction: Structural policies force pipelines to use decoupled interfaces, enabling immediate hot-swapping between vendors.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Service Contract Protection: Standing SLAs protect network uptime bounds, but track zero mitigation tracks for vendor logic drift.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "High Single-Vendor Vulnerability: Platform applications bind directly to one vendor API model specification, ignoring platform change risks.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Total Infrastructure Interruption: External updates deploy straight to production lines with zero isolation filters or cloud failover options.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Supply Chain Collapse Hazard" }
    }
  },
  "IGF-03-EXEC": {
    id: "IGF-03-EXEC", pillar: "IGF", subarea: "Staging Privacy Isolation", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does executive leadership guarantee that private customer datasets cloned into testing or non-production staging containers remain safe from exfiltration?",
    choices: {
      A: { key: 'A', text: "Automated Token Isolation: Central data rules execute inline cryptographic masking across all testing databases automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scripted Data Cleansing: Custom developer pipelines strip explicit indicators like name tags, but preserve secondary matching variables.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unhardened Staging Environments: Personal client records copy to test environments fully unmasked, open to engineering contractors.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "HIPAA / GDPR Data Privacy Breach Vector" },
      D: { key: 'D', text: "Total Environment Exposure: Staging environments share production keys, allowing wide network access with zero logging control tracks.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Material Corporate Data Loss Event Vector" }
    }
  },
  "IGF-04-EXEC": {
    id: "IGF-04-EXEC", pillar: "IGF", subarea: "Immutable Recordkeeping", target_node: "EXECUTIVE",
    symptomatic_scenario: "Identify the boardroom control standard applied to guarantee that historical software system choice histories cannot be altered by database users.",
    choices: {
      A: { key: 'A', text: "Chained WORM Architecture: Policies mandate that metrics save to non-volatile Write-Once-Read-Many repositories, blocking cell updates.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Cloud Log Collectors: Processing logs stream to central indexing repositories, but user role modification permissions are un-audited.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Mutable Database Frameworks: Internal administrative database roles hold permission keys to alter or wipe historical records directly.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Zero Log Retention Gaps: Audit metrics stream to temporary server memory limits that overwrite completely every 7 operational days.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "IGF-05-EXEC": {
    id: "IGF-05-EXEC", pillar: "IGF", subarea: "Insider Leak Minimization", target_node: "EXECUTIVE",
    symptomatic_scenario: "Select the structural access filter applied to prevent internal user accounts from executing unauthorized bulk downloads of customer databases.",
    choices: {
      A: { key: 'A', text: "Synchronous DLP Interceptors: Data Loss Prevention structures evaluate traffic velocity dynamically, auto-revoking access on data spikes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Volume Floor Ceilings: Platform rules restrict extraction file downloads to 10,000 table rows, but allow users to split queries.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ungated Export Control: Users with standard dashboard access variables can download complete system tables with zero audit logs.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Insider Threat Capital Protection Failure" },
      D: { key: 'D', text: "Shared Account Token Profiles: Teams use shared group administrative passwords, making tracing bulk data downloads to individuals impossible.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "ISO 27001 Access Control Governance Failure" }
    }
  },
  "IGF-06-EXEC": {
    id: "IGF-06-EXEC", pillar: "IGF", subarea: "Geographic Sovereignty Compliance", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does governance guarantee that automated computational engines adhere to international cross-border data sovereignty mandates?",
    choices: {
      A: { key: 'A', text: "Sovereign Cloud Isolation: Strict routing rules lock server storage resources to localized regional cloud datacenter environments.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Contract Assurances: Vendor SLAs record geographic storage location declarations, lacking automated data trace auditing features.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unmapped Global Cloud Networks: Ingestion payloads stream through multi-tenant cloud networks across alternate geographical zones.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Data Sovereignty Compliance Transgression Risk" },
      D: { key: 'D', text: "Total Spatial Opacity: System applications process and cache dataset columns across unverified regions with zero tracking logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Cross-Border Sovereign Regulatory Infraction Risk" }
    }
  },
  "IGF-07-EXEC": {
    id: "IGF-07-EXEC", pillar: "IGF", subarea: "Algorithmic Control Disclosures", target_node: "EXECUTIVE",
    symptomatic_scenario: "What control paradigm ensures that production application logic routes match corporate public financial risk disclosures explicitly?",
    choices: {
      A: { key: 'A', text: "Synchronous Policy Compilation: Rule changes require matched cryptographic token signatures from compliance teams before pipeline integration.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Variable Verification: Compliance leads audit model codebase limits manually ahead of regulatory reporting deadlines.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Loose Code Alignment: Technical teams adjust algorithmic constraint ceilings inline within files without matching public risk statements.", symptom_weight: 1.4, bandwidth_multiplier: 1.9, regulatory_tag: "Change Control Policy Compliance Fracture" },
      D: { key: 'D', text: "Total Disconnect Opacity: System processing configurations are set ad-hoc by development teams, entirely hidden from executive risk reviews.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "SEC Operational Control Hazard Vector" }
    }
  },

  // --- IGF: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "IGF-08-MGMT": {
    id: "IGF-08-MGMT", pillar: "IGF", subarea: "Audit Timeline Latency", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an external regulatory examiner demands an end-to-end trace of a disputed automated decision path, calculate the team's average recovery window.",
    choices: {
      A: { key: 'A', text: "Zero-Latency Generation: Central management interfaces extract human-readable log trace sheets via an automated single-key request.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Multi-Shift Technical Tickets: Product leads must submit critical tasks to engineering teams, delaying response loops as files are pulled.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Approximate Reconstruction Sprints: Developers spend multiple days collecting scattered server text logs, producing an approximate timeline.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "SOX 404 Internal Controls Operational Gap" },
      D: { key: 'D', text: "Complete Trace Black Box: Automated metadata values are completely unrecorded; management lacks tools to defend logic state choices.", symptom_weight: 2.0, bandwidth_multiplier: 4.0, regulatory_tag: "Catastrophic Audit Collapse Vector" }
    }
  },
  "IGF-09-MGMT": {
    id: "IGF-09-MGMT", pillar: "IGF", subarea: "Right-to-Erasure Propagation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an individual executes an erasure request (e.g., GDPR Right to be Forgotten), describe how management audits compliance across backup networks.",
    choices: {
      A: { key: 'A', text: "Distributed Invalidation Arrays: Wiping records triggers cascade deletions downstream, dropping metadata copies code-wide automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Data Scrubber Sprints: Management coordinates manual data cleaning scripts across secondary cloud systems twice per year.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Primary Row Removal Only: Applications delete database lines while customer profile strings remain saved inside offline text logs.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Statutory Data Retention Violations Risk" },
      D: { key: 'D', text: "Total Data Retention Failure: Deletion workflows are un-tracked; customer parameters stay saved permanently inside analysis models.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-10-MGMT": {
    id: "IGF-10-MGMT", pillar: "IGF", subarea: "Vendor Privacy Alignment", target_node: "MANAGERIAL",
    symptomatic_scenario: "An integrated cloud tracking provider adjusts their privacy terms, asserting rights to save customer payload profiles for internal optimization models. Review management tracks.",
    choices: {
      A: { key: 'A', text: "Zero-Data Retention API Keys: Management configures connection keys with hard flags that legally block vendor data saving parameters.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Cyclical Contract Reviews: Compliance audits updated contract terms manually during renewals, lacking live payload filtering blocks.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unmonitored Data Streaming: Customer data feeds connect directly to partner endpoints without filtering or role masking checks.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Third-Party Risk Framework Gap" },
      D: { key: 'D', text: "Total Privacy Exfiltration: Production records stream to external cloud storage nodes with zero un-encrypted row isolation applied.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Proprietary Data Loss IP Infraction" }
    }
  },
  "IGF-11-MGMT": {
    id: "IGF-11-MGMT", pillar: "IGF", subarea: "Data Lineage Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does your management tier ensure that dataset transformation paths remain auditable across multi-platform enterprise integrations?",
    choices: {
      A: { key: 'A', text: "Continuous Lineage Automation: Specialized governance applications map and track structural transformations across data networks automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Lineage Mapping: Product managers execute structural query checks manually ahead of scheduled compliance reviews.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Undocumented Value Mutations: Teams alter data schemas inside independent code blocks, creating untraceable data properties.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Data Lineage Structural Failure" },
      D: { key: 'D', text: "Complete Lineage Fracture: Pipelines strip validation variables inline during transformations, creating permanent audit data gaps.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Data Provenance Structural Audit Deficit" }
    }
  },
  "IGF-12-MGMT": {
    id: "IGF-12-MGMT", pillar: "IGF", subarea: "Contractor Account Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "What management process tracks and manages system access permissions granted to third-party consulting or contractor developer accounts?",
    choices: {
      A: { key: 'A', text: "Time-Locked Dynamic Controls: Identity systems utilize ephemeral access profiles that self-delete credentials unless manually extended.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Token Audits: HR cross-references active access tokens against contractor files manually every six months.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Persistent Global Keys: External contractors hold high-level administrative access credentials that remain active after contracts end.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Access Management Internal Control Failure" },
      D: { key: 'D', text: "Shared Access Profile Codes: Multi-contractor teams share a collective developer password with zero logging of individual data adjustments.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-13-MGMT": {
    id: "IGF-13-MGMT", pillar: "IGF", subarea: "Vendor Log Redundancy", target_node: "MANAGERIAL",
    symptomatic_scenario: "If an integrated external AI processing service encounters a multi-hour system crash, evaluate management's continuity strategy.",
    choices: {
      A: { key: 'A', text: "Hot-Swap Gateway Multiplexing: Dynamic routers monitor endpoint health, auto-shifting traffic to backup models if latency drifts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Configuration Re-pointing: Tech leads adjust endpoint string targets manually inside configuration variables, adding delays.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Single-Gateway System Halt: Processing lines freeze completely during vendor drops, causing immediate customer-facing outages.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Degraded Security Boundary" },
      D: { key: 'D', text: "Cascading Table Erasures: Outages break ongoing API streams, corrupting database records across internal value streams.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Supply Chain Collapse Vector" }
    }
  },
  "IGF-14-MGMT": {
    id: "IGF-14-MGMT", pillar: "IGF", subarea: "Code Change Policy Matching", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management confirm that live software changes inside algorithmic models match risk authorization sign-offs?",
    choices: {
      A: { key: 'A', text: "Automated Policy Validation: Build systems match git commit hashes against risk authorization tokens before compilation runs.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Log Auditing: Managers compare task tracking items against commit repository history files manually before major rollouts.", symptom_weight: 0.4, bandwidth_multiplier: 0.7 },
      C: { key: 'C', text: "Unhardened Code Merges: Developers edit model constraint metrics inline inside files without linking changes to compliance sign-off logs.", symptom_weight: 1.5, bandwidth_multiplier: 2.1, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" },
      D: { key: 'D', text: "Live Console Parameter Tuning: Tech teams alter active algorithmic rules via live backend database consoles with zero management logging.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "IGF-15-MGMT": {
    id: "IGF-15-MGMT", pillar: "IGF", subarea: "Compliance Release Testing", target_node: "MANAGERIAL",
    symptomatic_scenario: "What testing framework maps business validation rules across deep neural networks or complex logic layers prior to release version updates?",
    choices: {
      A: { key: 'A', text: "Behavioral Assertion Testing: CI build systems test calculation weights against versioned compliance scenario tables automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Staging Interface Spot-Checking: Teams review random sample transaction records manually inside staging dashboards before release builds.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Syntax-Tree Validation: Deployment checks analyze code compilation parameters and formatting flags but ignore data compliance rules.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Algorithmic Control Lifecycle Failure" },
      D: { key: 'D', text: "Direct Production Scaling: Updated models scale output parameters live inside production with zero automated compliance testing runs.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- IGF: TECHNICAL NODE (CORE EXECUTION) ---
  "IGF-16-TECH": {
    id: "IGF-16-TECH", pillar: "IGF", subarea: "WORM Storage Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "From an operational architecture perspective, where are active system log archives and transaction histories written?",
    choices: {
      A: { key: 'A', text: "Write-Once Hardware Vaults: Log streams route to cryptographically locked WORM repositories that block data modification.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Cloud Log Centralization: System text logs save to central cloud aggregators, managed via standard access credentials.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Mutable Database Frameworks: Operational traces write directly to primary application schemas, remaining vulnerable to master user mutation keys.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Zero Log Buffering Array: Logs append to transient processing container loops that purge files completely every 7 operational days.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "IGF-17-TECH": {
    id: "IGF-17-TECH", pillar: "IGF", subarea: "Decoupled Verification Layers", target_node: "TECHNICAL",
    symptomatic_scenario: "How is data parity verified between primary processing databases and downstream reporting nodes to protect transaction stability?",
    choices: {
      A: { key: 'A', text: "Dynamic Parity Heartbeats: Isolated worker tasks execute cryptographic hash comparisons cross-cutting databases every 60 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Batch Rebalancing Jobs: Database synchronization runners compile table states automatically during off-peak weekend windows.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unverified Ledger Assumptions: Tech layers run pipelines blindly, assuming internal protocols match without tracing mutation balances.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Total Ledger Splitting: Mismatched structural adjustments overwrite records, generating permanent analytical distortions across departmental arrays.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "IGF-18-TECH": {
    id: "IGF-18-TECH", pillar: "IGF", subarea: "Ephemeral Identity Containment", target_node: "TECHNICAL",
    symptomatic_scenario: "Review the authentication lifecycle governing backend access tokens utilized by autonomous worker processes inside cloud environments.",
    choices: {
      A: { key: 'A', text: "KMS Federated Roles: Runtimes pull short-lived ephemeral identity keys that self-terminate within 15 minutes via automated token rotation.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Static Vault Parameter Calls: Framework containers read permanent application passwords from security vaults via continuous sessions.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Hardcoded Property Variables: Authentication credentials save as static plaintext string values inside container repository config records.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "Shared Master root Profiles: Multiple autonomous modules share an identical root credential block, bypass logging filters entirely.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-19-TECH": {
    id: "IGF-19-TECH", pillar: "IGF", subarea: "Immutable Trace Architectures", target_node: "TECHNICAL",
    symptomatic_scenario: "Detail the system trace mechanism used to document developer modifications applied to configuration variables in production lines.",
    choices: {
      A: { key: 'A', text: "Signed Git Commit Gates: Change requests enforce hardware MFA sign-off validation steps before generating immutable environment logs.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Application Tracing: Infrastructure platforms log environment modifications, but retention settings remain mutable by admin keys.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Untracked Environment Tuning: Infrastructure operators edit running cloud configuration states manually without linking patches to change logs.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" },
      D: { key: 'D', text: "Direct Console Rule Inject: Developers execute database value edits directly via terminal access prompts with zero operational tracing.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "IGF-20-TECH": {
    id: "IGF-20-TECH", pillar: "IGF", subarea: "Cryptographic Non-Repudiation", target_node: "TECHNICAL",
    symptomatic_scenario: "When an autonomous pipeline module finishes a client record adjustment, how is that transaction block permanently sealed against modification?",
    choices: {
      A: { key: 'A', text: "SHA-256 Block Hashing: Ingestion pipelines write a unique cryptographic signature string across rows, making text updates auditable.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Relational Index Locking: Database parameters prevent row adjustments once data states flag a 'FINALIZED' completion tag.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Standard Relational Commits: Rows execute as standard relational records, vulnerable to direct modification via standard administrative DB software.", symptom_weight: 1.4, bandwidth_multiplier: 2.1, regulatory_tag: "System Traceability Infrastructure Void" },
      D: { key: 'D', text: "Total History Overwriting: Optimization scripts clean disk footprints by purging historical row updates, keeping only current values.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Data Lineage Structural Failure" }
    }
  },
  "IGF-21-TECH": {
    id: "IGF-21-TECH", pillar: "IGF", subarea: "Network Boundary Isolation", target_node: "TECHNICAL",
    symptomatic_scenario: "What firewall perimeter isolation standard safeguards internal model computation pools from public cloud routing access?",
    choices: {
      A: { key: 'A', text: "Zero-Trust Private VPCs: Internal runtimes bind strictly to non-routable private addresses, communicating via mutual TLS gateways.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Security Group Rules: Access parameters match specified IP ranges, but leave database ports visible to general network blocks.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Public Endpoint Mapping: Code modules interface with external systems via open internet endpoints, relying on application passwords alone.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "NIST SP 800-171 Network Boundary Failure" },
      D: { key: 'D', text: "Total Security Deregulation: Core database connection ports open directly to all inbound traffic variables to simplify contractor access.", symptom_weight: 2.0, bandwidth_multiplier: 3.9, regulatory_tag: "Material Data Exfiltration Vulnerability Risk" }
    }
  },
  "IGF-22-TECH": {
    id: "IGF-22-TECH", pillar: "IGF", subarea: "Dependency Manifest Auditing", target_node: "TECHNICAL",
    symptomatic_scenario: "How frequently are external framework libraries and third-party code objects analyzed for structural vulnerability exposures?",
    choices: {
      A: { key: 'A', text: "Continuous In-Pipeline SCA: Automated software composition analysis runners check dependencies on every build, blocking broken merges.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scheduled Engineering Sweeps: Technical architects run package update validations manually ahead of annual infrastructure audits.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ad-Hoc Library Pulls: Developers import external software modules arbitrarily from open public repositories to solve sprint problems fast.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Supply Chain Risk Failure" },
      D: { key: 'D', text: "Zero Code Package Checking: Open-source dependencies compile straight to production lines with zero automated security analysis runs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- IGF: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "IGF-23-USER": {
    id: "IGF-23-USER", pillar: "IGF", subarea: "GDPR Explanation Access", target_node: "USER",
    symptomatic_scenario: "When a customer demands an explicit rationale for an automated tier assignment or evaluation choice, select the resource provided by the interface.",
    choices: {
      A: { key: 'A', text: "Automated Provenance Manifests: The dashboard includes an export key that prints an instant, plain-English summary of choice metrics.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Raw Metadata Variable Fields: The screen prints internal trace codes and calculation integers that users cannot translate cleanly.", symptom_weight: 0.6, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "The Rationale Vacuum: Panels display simple flat outcome text flags (e.g., 'DENIED'), forcing operators to stall clients with standard templates.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "GDPR Article 22 Infraction Exposure" },
      D: { key: 'D', text: "Complete Workspace Blindness: UI blocks tracking histories entirely; operators must forward all client choice disputes straight to legal teams.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-24-USER": {
    id: "IGF-24-USER", pillar: "IGF", subarea: "Data Erasure Tracking", target_node: "USER",
    symptomatic_scenario: "Detail user interface tasks required when processing a customer's formal right-to-erasure request across system records.",
    choices: {
      A: { key: 'A', text: "Cascade Removal Anchors: Clicking 'Purge Record' deletes account rows cross-cutting all integrated databases and analytical caches automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Ticket Coordination: Staff log account cleanup tasks across multiple departments, generating manual tracking steps over week-long cycles.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Surface Database Wiping: Interfaces delete primary table rows while historical transaction values stay saved inside local user text notes.", symptom_weight: 1.4, bandwidth_multiplier: 2.1, regulatory_tag: "Statutory Data Retention Violations Risk" },
      D: { key: 'D', text: "Total Data Deletion Neglect: Right-to-erasure workflows are unrecorded; customer tracking matrices remain fully active inside background calculation models.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
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
    symptomatic_scenario: "When using integrated external chat components on your dashboard, how are customer record strings filtered before packet transmission?",
    choices: {
      A: { key: 'A', text: "Inline Regex Scrubber Filters: Edge components intercept text entries, replacing sensitive profile patterns with token strings.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Operational Warning Modals: Popups advise workers to omit customer records before pasting text into chat panes.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unchecked Metric Streaming: Complete client rows paste directly into external chat boxes, exposing PII strings to partner AI logs.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Third-Party Risk Framework Gap" },
      D: { key: 'D', text: "Total Privacy Exfiltration: Unfiltered client records route straight to public external cloud storage nodes with zero encryption applied.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Proprietary Data Loss IP Infraction" }
    }
  },
  "IGF-30-USER": {
    id: "IGF-30-USER", pillar: "IGF", subarea: "Emergency Lock Verification", target_node: "USER",
    symptomatic_scenario: "If an operator flags a suspect cyber threat loop, review the interface control available to execute an immediate profile freeze.",
    choices: {
      A: { key: 'A', text: "Unified Interface Freeze: Staff execute a master lockdown sequence shortcut, isolating connected database access fields within 5 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manager Escalation Channels: Operators must register an ticket token to get technical leads to pause active system routes.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Siloed IT Support Queues: Lockdown steps require submitting phone tickets to external support centers, adding hours of delay.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Algorithmic Control Control Failure" },
      D: { key: 'D', text: "Zero Core Intervention: No workspace system freeze control exists; stopping threat routes requires rebuilding server containers manually.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },

  // ===========================================================================
  // PILLAR 2: AUTONOMOUS VALUE STREAMS [AVS] (QUESTIONS 31-60)
  // ===========================================================================
  
  // --- AVS: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "AVS-31-EXEC": {
    id: "AVS-31-EXEC", pillar: "AVS", subarea: "Data Infrastructure Foundations", target_node: "EXECUTIVE",
    symptomatic_scenario: "When allocating software roadmap budgets, how does corporate strategy quantify technical debt and data infrastructure risk weights?",
    choices: {
      A: { key: 'A', text: "Continuous Debt Modeling: Investment strategies evaluate precise system rework metrics and pipeline velocity limits explicitly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Cyclical Maintenance Windows: Relational data layers undergo technical refactoring loops on scheduled multi-year hardware leases.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Feature-Driven Engineering: Capital profiles favor customer-facing additions, shifting database optimization tasks to future backlogs.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "BCBS 239 Risk Data Aggregation Deficit" },
      D: { key: 'D', text: "Total Structural Blindness: Storage networks expand without mapping memory constraints, risking catastrophic multi-node timeout loops.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Scalability Controls Structural Framework Gap" }
    }
  },
  "AVS-32-EXEC": {
    id: "AVS-32-EXEC", pillar: "AVS", subarea: "Velocity Scaling Matrices", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does corporate leadership manage intense delivery timelines from business units without compromising core software contract safety bounds?",
    choices: {
      A: { key: 'A', text: "Automated Compliance Enforcers: Build architectures trigger programmatic safety tests, blocking merges that bypass schema limits.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Prioritized Sprint Buffers: Project timelines contain padding windows to let developers run stability checks and indexing optimizations.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Speed-First Mandates: Leadership rewards rapid features rollout, encouraging engineering to bypass validation scripts to meet dates.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Degraded Quality Control Standards" },
      D: { key: 'D', text: "Total Structural Deregulation: Data pipelines push to production with zero architecture checks to secure immediate commercial value.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Catastrophic Structural Drift" }
    }
  },
  "AVS-33-EXEC": {
    id: "AVS-33-EXEC", pillar: "AVS", subarea: "Resource Waste Optimization", target_node: "EXECUTIVE",
    symptomatic_scenario: "Select the metric model applied by leadership to monitor technical capital waste within cloud-hosted computing clusters.",
    choices: {
      A: { key: 'A', text: "Tag-Based Unit Economics: Analytical tools link computing costs directly to specific microservices and value ingestion lanes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Aggregated Bill Verification: Financial teams trace broad computing invoices, lacking visibility into un-optimized database loops.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Reactive Resource Ceilings: Compute limits are scaled manually whenever performance drops hit production, increasing cost waste.", symptom_weight: 1.6, bandwidth_multiplier: 2.3, regulatory_tag: "Infrastructure Cost Control Efficiency Deficit" },
      D: { key: 'D', text: "Total Expense Opacity: Overages process automatically as fixed operational costs with zero cost-efficiency tracing loops.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Material Operating Resource Waste Tracker" }
    }
  },
  "AVS-34-EXEC": {
    id: "AVS-34-EXEC", pillar: "AVS", subarea: "Composable Design Standards", target_node: "EXECUTIVE",
    symptomatic_scenario: "What architectural requirement ensures that decoupled software engineering groups produce modular, reusable value components?",
    choices: {
      A: { key: 'A', text: "Central Package Deployment: Software rules force development groups to import pre-hardened validation logic blocks exclusively.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Design Framework Manuals: Product teams record structural code architecture standards inside static shared documentation repositories.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Siloed Codespace Development: Separate teams write custom data connectors from scratch, duplicating structural codebase flaws.", symptom_weight: 1.4, bandwidth_multiplier: 2.0 },
      D: { key: 'D', text: "Absolute Code Fragmentation: Engineering lines apply completely different design patterns across all active software repositories.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "ISO 27001 Software Lifecycle Failure" }
    }
  },
  "AVS-35-EXEC": {
    id: "AVS-35-EXEC", pillar: "AVS", subarea: "Multi-Cloud Interoperability", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate corporate strategy for managing payload data translation errors when running services across AWS, Azure, and private cloud configurations.",
    choices: {
      A: { key: 'A', text: "Cloud-Agnostic Infrastructure Specs: Platform guidelines force pipelines to use open data definitions, preventing vendor lock-in.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Custom Interface Adapters: Dedicated software scripts connect cloud platforms manually, requiring continuous engineering maintenance.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Native Component Saturation: Data storage tracks rely on cloud-exclusive table architectures, preventing cloud database failover operations.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Multi-Cloud Complexity Architecture Risk" },
      D: { key: 'D', text: "Total Network Disconnection: Microservices connect across cloud boundaries via open ports with zero central tracking frameworks.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Business Continuity Strategic Control Failure" }
    }
  },
  "AVS-36-EXEC": {
    id: "AVS-36-EXEC", pillar: "AVS", subarea: "Portfolio Modernization Planning", target_node: "EXECUTIVE",
    symptomatic_scenario: "Determine the strategic framework applied to modernizing legacy data engines without degrading active user-facing transactions.",
    choices: {
      A: { key: 'A', text: "Decoupled Proxy Routing: Legacy database connections shift to modern microservices gradually via decoupled routing layers.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Off-Peak Modernization Sprints: Legacy codebase migrations run manually during low-traffic holiday or weekend processing windows.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unhardened Core Interface Wrapping: Outdated database engines are hidden behind current interface skins, leaving raw logic errors unaddressed.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Legacy Systemic Vulnerability Hazard Vector" },
      D: { key: 'D', text: "Absolute Migration Stagnation: Legacy systems are left completely un-optimized out of fear that codebase alterations will trigger platform crashes.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Application Portfolio Modernization Collapse" }
    }
  },
  "AVS-37-EXEC": {
    id: "AVS-37-EXEC", pillar: "AVS", subarea: "Synthetic Data Risk Management", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does corporate strategy verify analytical record accuracy when data streams ingest synthetic or machine-generated data profiles?",
    choices: {
      A: { key: 'A', text: "Continuous Statistical Auditing: Runtimes execute dynamic divergence checks, dropping synthetic variations automatically at boundaries.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Data Profiling: Specialist validation teams execute manual batch analysis queries against synthetic pools twice per year.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unchecked Pipeline Aggregation: Models ingest synthetic datasets directly with zero edge filtering, risking model collapse outputs.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "BCBS 239 Risk Data Aggregation Deficit" },
      D: { key: 'D', text: "Total Data Contamination: Machine-generated values mix into core production ledgers with zero source categorization flags.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Model Corruption Target" }
    }
  },

  -- --- AVS: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "AVS-38-MGMT": {
    id: "AVS-38-MGMT", pillar: "AVS", subarea: "Upstream Mutation Tracking", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an external vendor modifies their payload data models unannounced, how does your management layer capture the resulting pipeline failure?",
    choices: {
      A: { key: 'A', text: "Central Interface Tracking: Version control monitors highlight structural API model updates side-by-side without developer input.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Automated Error Escalation: Code exceptions fire alerts to technicians, generating itemized stability bugs inside sprint backlogs.", symptom_weight: 0.4, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Client-Driven Incident Tracking: Managers remain unaware of structure mutations until users report that metric view screens are blank.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "SLA Control Management Breakdown" },
      D: { key: 'D', text: "Total Ingestion Blindness: Processing pathways are completely unmapped; management runs server reboots without locating the mutation.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Data Pipeline Idempotency Control Deficit" }
    }
  },
  "AVS-39-MGMT": {
    id: "AVS-39-MGMT", pillar: "AVS", subarea: "Delivery Constraint Calibration", target_node: "MANAGERIAL",
    symptomatic_scenario: "Evaluate management's strategy for balancing structural database refactoring tasks against competing product delivery features.",
    choices: {
      A: { key: 'A', text: "Fixed Capacity Allocations: Management guarantees that 20% of every team sprint is allocated exclusively to tracking structural debt parameters.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Negotiated Stability Windows: Codebase optimizations are prioritized manually when pipeline error triggers breach monthly ceilings.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Feature Backlog Domination: Compliance and query updates are pushed out indefinitely to maintain commercial feature velocity.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "Continuous Software Life-Cycle Control Void" },
      D: { key: 'D', text: "Total Technical Debt Neglect: Database degradation is un-tracked until persistent timeout exceptions crash down-stream integrations.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Operational Quality Drop Hazard Vector" }
    }
  },
  "AVS-40-MGMT": {
    id: "AVS-40-MGMT", pillar: "AVS", subarea: "Tribal Memory Mitigations", target_node: "MANAGERIAL",
    symptomatic_scenario: "If your core data architect exits the organization suddenly, what asset ensures your management tier can scale data assets smoothly?",
    choices: {
      A: { key: 'A', text: "Declarative Schema Specification: Code frameworks write conversion parameters automatically to open API design logs.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Centralized Topology Wikis: System transformation steps and vendor dataset targets save inside shared document repositories.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Tribal Memory Dependence: Integration structures exist strictly within developer memory, lacking centralized tracing history logs.", symptom_weight: 1.5, bandwidth_multiplier: 2.3 },
      D: { key: 'D', text: "Total Architecture Opacity: Data routing lines are unmapped black boxes that internal staff cannot modify without breaking code strings.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "System Traceability Infrastructure Void" }
    }
  },
  "AVS-41-MGMT": {
    id: "AVS-41-MGMT", pillar: "AVS", subarea: "Cross-Functional Dependency Mapping", target_node: "MANAGERIAL",
    symptomatic_scenario: "How are dataset transformation pipelines mapped across business lines when executing inter-departmental tool integrations?",
    choices: {
      A: { key: 'A', text: "Dynamic Lineage Modeling: Distribution tracers log data movement vectors across all database networks automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Intermittent Design Audits: Managers assemble functional cross-team data mapping documents manually before annual reviews.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Isolated Team Engineering: Departments compile internal write connections independently, producing untraceable data lineage gaps.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Cross-Functional Escalation Operational Void" },
      D: { key: 'D', text: "Total Grid Fragmentation: Inter-system database maps are non-existent; troubleshooting calculation drops requires emergency multi-team debugging.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-42-MGMT": {
    id: "AVS-42-MGMT", pillar: "AVS", subarea: "SLA Latency Mitigation", target_node: "MANAGERIAL",
    symptomatic_scenario: "Calculate the average management latency required to restore user-facing application speed when a logic drift error stalls an execution queue.",
    choices: {
      A: { key: 'A', text: "Automated Circuit Resiliency: Decoupled circuit breakers auto-isolate slow routes, running fallback environments in under 180 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Container Scaling: Tech administrators provision secondary container images manually from build repos, adding hours of delay.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Complex Multi-Stage Triage: System recovery requires pulling developers from active roadmaps to debug compiled microservices inline.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Emergency Operational Intercept Failure" },
      D: { key: 'D', text: "Indeterminate System Outage: Resource contentions deadlock database clusters permanently, requiring a complete data stack cold start.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Pipeline Operational Continuity Failure" }
    }
  },
  "AVS-43-MGMT": {
    id: "AVS-43-MGMT", pillar: "AVS", subarea: "API Contract Tracking", target_node: "MANAGERIAL",
    symptomatic_scenario: "What interface tracking pattern validates that external partner integrations align with company data-sharing safety filters?",
    choices: {
      A: { key: 'A', text: "Strict Version Gateway Audits: Automated OpenAPI checkers analyze dataset shapes before allowing endpoint connections to execute.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Developer Security Approvals: Engineering leads verify data extraction scripts manually before allowing branch merges to production.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unvalidated Partner Connections: External entities attach data links directly to codebase endpoints without setting system safety checks.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Total Data Interface Deregulation: Open data access tokens are distributed across contractor teams without tracking query variables.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "AVS-44-MGMT": {
    id: "AVS-44-MGMT", pillar: "AVS", subarea: "Engineering Budget Efficiency", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management evaluate developer hours lost to slow query execution scans within autonomous processing loops?",
    choices: {
      A: { key: 'A', text: "Continuous Instrumentation Metrics: Testing runners profile query latency profiles automatically during deployment build loops.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Server Cost Analysis: Management isolates processing resource spikes manually when cloud bills cross predefined constraints.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Anecdotal Team Feedback: Query performance lag stays hidden inside repositories until a developer reports slow loops manually.", symptom_weight: 1.3, bandwidth_multiplier: 1.9 },
      D: { key: 'D', text: "Total Efficiency Blindness: Unindexed relational table loops run continuously unmonitored, draining server capacity enterprise-wide.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Resource Usage Monitoring Structural Gap" }
    }
  },
  "AVS-45-MGMT": {
    id: "AVS-45-MGMT", pillar: "AVS", subarea: "Regression Controls Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "When logic changes slow down record verification speed across your primary product arrays, identify management's tracking model.",
    choices: {
      A: { key: 'A', text: "Declarative Integration Gates: Code build systems block production branch updates automatically if calculation latency spikes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Staging Performance Reviews: Tech leads test processing metrics manually ahead of major platform version rollouts.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Post-Release Patch Sprints: Performance drops pass to production builds, requiring reactive code refactoring after users encounter lag.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Regression Testing Operational Control Failure" },
      D: { key: 'D', text: "Total Latency Acceptance: Response delays compound across releases, degrading workforce output with zero tracking logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- AVS: TECHNICAL NODE (CORE EXECUTION) ---
  "AVS-46-TECH": {
    id: "AVS-46-TECH", pillar: "AVS", subarea: "Polymorphic Validation Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "Review your technical group's data layout architecture when incoming metadata payloads append custom tracking properties.",
    choices: {
      A: { key: 'A', text: "Dynamic Satellite Mappings: Relational tables isolate custom extensions to independent satellite tables, preserving core index paths.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Flexible JSONB Objects: Data stores dump incoming variables into untyped JSON blocks, reducing data query performance parameters.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Brute Database Migrations: Engineers execute relational table modifications manually inside live production environments under load.", symptom_weight: 1.4, bandwidth_multiplier: 2.4, regulatory_tag: "High Rework Tax Performance Drag" },
      D: { key: 'D', text: "Total Schema Corruption: Data fields overwrite mismatching columns blindly, breaking query calculations downstream.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-47-TECH": {
    id: "AVS-47-TECH", pillar: "AVS", subarea: "Idempotent Stream Processing", target_node: "TECHNICAL",
    symptomatic_scenario: "What database architecture safeguard isolates backend data tables when separate autonomous workers write matching records concurrently?",
    choices: {
      A: { key: 'A', text: "Optimistic Concurrency Constraints: Target records verify row version attributes, auto-retrying saves if state collisions hit.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Pessimistic Row Locks: Storage clusters freeze target index blocks on write steps, creating thread queues under traffic load.", symptom_weight: 0.4, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unchecked Race Conditions: Pipelines execute writes concurrently with zero sequence validation, allowing newer records to wipe out prior edits.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Data Multi-Tenant Concurrency Control Failure" },
      D: { key: 'D', text: "Cascading Deadlock Exceptions: Overlapping update actions crash core database memory states, blocking all connected services.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Data Pipeline Idempotency Control Deficit" }
    }
  },
  "AVS-48-TECH": {
    id: "AVS-48-TECH", pillar: "AVS", subarea: "Non-Blocking Message Buffers", target_node: "TECHNICAL",
    symptomatic_scenario: "Describe the codebase buffering configuration deployed to handle ingestion tasks when primary storage networks encounter network disconnections.",
    choices: {
      A: { key: 'A', text: "Persistent Event Messengers: Processing channels write inputs to non-volatile message queues, replaying data once connections restore.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Synchronous Server Exceptions: Application routes return immediate 500 error codes, forcing upstream client platforms to rerun loops.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Volatile RAM Buffering: Ingestion scripts hold inputs in local application memory, dropping records when memory heaps overflow.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Infrastructure Resiliency Component Void" },
      D: { key: 'D', text: "Thread Contention Deadlocks: Blocked destination targets freeze all running application processes, crashing the server cluster entirely.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "SOX 404 Infrastructure Gap" }
    }
  },
  "AVS-49-TECH": {
    id: "AVS-49-TECH", pillar: "AVS", subarea: "Read Replica Decoupling", target_node: "TECHNICAL",
    symptomatic_scenario: "When an automated background service executes an analytical query across 10 million relational rows, select the database load isolation blueprint.",
    choices: {
      A: { key: 'A', text: "Decoupled Mirror Replicas: Processing scripts check dedicated read-only replica data mirrors, leaving production clusters untouched.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Off-Peak Cron Scheduling: Analytical queries run manually during low-traffic midnight windows to avoid database locks.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Live Primary Execution: Scans run directly against the live production master node, slowing down concurrent user operations code-wide.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Database Resource Contention Control Deficit" },
      D: { key: 'D', text: "Cascading Master Deadlocks: Complex analytical loops lock master database pools permanently, dropping connections across the network.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Resource Usage Monitoring Structural Gap" }
    }
  },
  "AVS-50-TECH": {
    id: "AVS-50-TECH", pillar: "AVS", subarea: "Active-Active Disaster Recovery", target_node: "TECHNICAL",
    symptomatic_scenario: "What fallback orchestration asset protects pipeline data states if your core computing cluster encounters a regional network blackout?",
    choices: {
      A: { key: 'A', text: "Multi-Zone Active Failover: Core gateways utilize active-active regional mirrors, rerouting traffic parameters in under 30 seconds automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Image Spin-Ups: Infrastructure personnel provision secondary container images manually from vaults, adding hours of delay.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Siloed Regional Freezes: Ingestion lines stop completely during blackouts, requiring manual server cluster creation inside separate zones.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Disaster Recovery Compliance Regulatory Gap" },
      D: { key: 'D', text: "Data Corruption Drops: Power disconnections break active database update actions, producing incomplete or corrupt relational table properties.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },
  "AVS-51-TECH": {
    id: "AVS-51-TECH", pillar: "AVS", subarea: "Cache Invalidation Webhooks", target_node: "TECHNICAL",
    symptomatic_scenario: "How are runtime caching engines (e.g., Redis containers) validated to prevent old data properties from skewing decision algorithms?",
    choices: {
      A: { key: 'A', text: "Synchronous Invalidation Webhooks: Core table modifications trigger immediate cache clears across all server containers automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Time-To-Live Counters: Cached elements include automated timeout variables, but expiration counters do not track live updates.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Zero Cache Validation: Caching states persist until manual cache flushes run, outputting stale metrics to data views.", symptom_weight: 1.5, bandwidth_multiplier: 2.0, regulatory_tag: "Cache Parity Verification Controls Failure" },
      D: { key: 'D', text: "Stale State Distortions: Out-of-date cache files feed invalid columns to system loops, increasing query exception logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Cache Parity Verification Controls Failure" }
    }
  },
  "AVS-52-TECH": {
    id: "AVS-52-TECH", pillar: "AVS", subarea: "Distributed Serialization Normalizers", target_node: "TECHNICAL",
    symptomatic_scenario: "Evaluate the technical tracing tools used to measure latency bottlenecks generated by heavy variable serialization across microservice routes.",
    choices: {
      A: { key: 'A', text: "Continuous Distributed Tracing: Base monitoring wrappers evaluate serialization duration cross-cutting all internal messaging routes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual APM Profiling: Technical architects audit microservice transaction latency parameters manually during performance reviews.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Zero Integration Tracking: Systems route diverse payload formats without central profiling, masking communication bottlenecks.", symptom_weight: 1.4, bandwidth_multiplier: 1.9, regulatory_tag: "Distributed Architecture Infrastructure Deficit" },
      D: { key: 'D', text: "Network Thread Contention: High serialization conversion overhead jams messaging channels, triggering server disconnections.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "System Traceability Infrastructure Void" }
    }
  },

  // --- AVS: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "AVS-53-USER": {
    id: "AVS-53-USER", pillar: "AVS", subarea: "Manual Scrubbing Taxes", target_node: "USER",
    symptomatic_scenario: "When automated data pipelines output missing, mismatched, or corrupt properties onto your primary workspace views, detail user routines.",
    choices: {
      A: { key: 'A', text: "Zero Manual Cleaning: Self-healing edge filters infer missing cell properties automatically using rolling historical averages.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Integrated Exception UI: Interface blocks display data format alerts, letting staff modify records within a single workspace layout.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "The Shadow Spreadsheet Patch: Operators manually reject automated metrics, tracking data fields inside independent local Excel sheets.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Shadow Data Pipeline Expansion" },
      D: { key: 'D', text: "Total System Avoidance: Ground operators process data tasks manually via legacy offline text files, ignoring platform views completely.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Total Architecture Rejection" }
    }
  },
  "AVS-54-USER": {
    id: "AVS-54-USER", pillar: "AVS", subarea: "Interface Data Loss Discrepancies", target_node: "USER",
    symptomatic_scenario: "If ingestion scripts drop invalid payload properties automatically to maintain server uptime, how is that data loss handled on your operational screen?",
    choices: {
      A: { key: 'A', text: "Dynamic Error Banners: The interface prints clear structural missing-field warnings, directing users to data origin issues.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Blank Profile Cells: The dashboard leaves fields blank with zero explanation, forcing operators to guess missing transaction values.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Silent Record Disappearance: Corrupted items vanish from workflow tables with zero alert text, leading staff to execute double entries.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Operational Quality Control Failure" },
      D: { key: 'D', text: "Cascading Browser Crashes: Formatting mutations crash the active web layout entirely, blocking user data entry lines.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Operational Interface Failure" }
    }
  },
  "AVS-55-USER": {
    id: "AVS-55-USER", pillar: "AVS", subarea: "Typing Error Disconnects", target_node: "USER",
    symptomatic_scenario: "When an external microservice modification updates database types (e.g., streaming string properties to numeric columns), select the layout impact on user tasks.",
    choices: {
      A: { key: 'A', text: "Dynamic Format Casting: Interface normalizers translate and recast column data shapes smoothly with zero screen distortion.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Numeric Field Conversions: Screens convert type errors to empty zero cells, displaying incorrect transaction pricing metrics to users.", symptom_weight: 0.6, bandwidth_multiplier: 1.3 },
      C: { key: 'C', text: "Interface Loading Freezes: Control panels lock on data rendering loops, blocking workspace functionality for active workers.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "System Type Validation Control Failure" },
      D: { key: 'D', text: "Total Screen Outages: Type exceptions trigger application crashes globally, blocking data entry functions until server patches run.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-56-USER": {
    id: "AVS-56-USER", pillar: "AVS", subarea: "Duplicate Record Skews", target_node: "USER",
    symptomatic_scenario: "Evaluate the frequency where ground-level operators identify duplicate transaction rows printing inside active account ledger summaries.",
    choices: {
      A: { key: 'A', text: "Zero Record Duplication: Boundary middleware filters double writes perfectly, keeping transaction views pristine code-wide.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Rare Processing Artifacts: Duplicate rows show up less than once a quarter, resolved via manual manager adjustment inputs.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Continuous Balance Skews: Duplicate lines populate weekly, forcing staff to run manual math calculations to compute real metrics.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Absolute Metric Distrust: Duplications corrupt ledger summaries continuously; operators verify all inputs via offline personal logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "AVS-57-USER": {
    id: "AVS-57-USER", pillar: "AVS", subarea: "Character Encoding Distortions", target_node: "USER",
    symptomatic_scenario: "How does your operations workforce address international client files when database text strings display corrupted encoding character text strings?",
    choices: {
      A: { key: 'A', text: "Dynamic Transcoding Normalization: Edge components translate character encoding strings automatically, keeping workspace text pristine.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Variable Overwriting: Operators use administrative panels to manually adjust broken text lines cell-by-cell.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Corrupt Profile Acceptance: Broken text blocks are saved directly to tables, creating un-searchable indices inside database logs.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Data Normalization Operational Control Void" },
      D: { key: 'D', text: "Cascading Document Crashes: Corrupted character strings crash automated invoice tools, stopping outbound client communication.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Operational Quality Drop Hazard Vector" }
    }
  },
  "AVS-58-USER": {
    id: "AVS-58-USER", pillar: "AVS", subarea: "Database Indexing Latency", target_node: "USER",
    symptomatic_scenario: "When automated data pipelines experience massive traffic acceleration, describe the immediate impact on dashboard record search speeds.",
    choices: {
      A: { key: 'A', text: "Zero Search Interruption: Optimized database index mapping processes query searches in under 200ms despite background load.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Slowing Workspace Speeds: Query lookups delay by 5 to 10 seconds under load, creating minor operational data entry stalls.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Persistent Network Timeouts: Lookups return connection failure boxes, forcing staff to execute searches multiple times to load data.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Database Resource Contention Deficit" },
      D: { key: 'D', text: "Terminal Interface Halts: Storage indexing congestion freezes user screen loading completely, locking out operators for hours.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Workforce Disconnection Hazard" }
    }
  },
  "AVS-59-USER": {
    id: "AVS-59-USER", pillar: "AVS", subarea: "Cache State Contention", target_node: "USER",
    symptomatic_scenario: "Review your operational team's workaround behavior when interface view fields populate out-of-date metrics due to server cache latency.",
    choices: {
      A: { key: 'A', text: "Absolute Cache Parity: Invalidation webhooks clear memory frames instantly when backend relational values change.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Continuous Browser Reloading: Operators clear browser history states manually using hard reload commands throughout the shift.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Stale Metric Processing: Operators complete transactions using outdated display parameters, producing balance calculation errors.", symptom_weight: 1.6, bandwidth_multiplier: 2.4, regulatory_tag: "Cache Parity Verification Controls Failure" },
      D: { key: 'D', text: "Total Workspace Misalignment: Cache latency causes users to overwrite matching database rows, saving conflicting update logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Operational Interface Failure" }
    }
  },
  "AVS-60-USER": {
    id: "AVS-60-USER", pillar: "AVS", subarea: "Outage Data Recovery", target_node: "USER",
    symptomatic_scenario: "When a cloud data infrastructure blackout drops background data systems, what recovery tasks are required from users once connections restore?",
    choices: {
      A: { key: 'A', text: "Zero Manual Reconciliation: Distributed message lines queue and replay data entries automatically with zero value leaks.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Balance Audits: Operators run consistency spot-checks against recent entries manually to verify process completion.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Bulk Transaction Re-Keying: Staff expend hours manually typing in client operations that failed to commit during the outage window.", symptom_weight: 1.5, bandwidth_multiplier: 2.7, regulatory_tag: "Disaster Recovery Compliance Regulatory Gap" },
      D: { key: 'D', text: "Total Data Splitting Chaos: Broken pipeline writes corrupt ledger histories permanently, forcing complex data cleanup sprints.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Scalability Controls Structural Framework Gap" }
    }
  },

  -- ===========================================================================
  -- PILLAR 3: HUMAN-AUTONOMOUS INTERACTION [HAI] (QUESTIONS 61-90)
  -- ===========================================================================
  
  -- --- HAI: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "HAI-61-EXEC": {
    id: "HAI-61-EXEC", pillar: "HAI", subarea: "Automated Verification Loops", target_node: "EXECUTIVE",
    symptomatic_scenario: "An autonomous optimization engine updates corporate pricing models dynamically. How does corporate governance verify that runtime margin changes adhere to boardroom risk strategy parameters?",
    choices: {
      A: { key: 'A', text: "Hard Strategic Caps: Policies mandate hard programmatic validation limits at the database boundary layer to prevent unchecked variations.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Retrospective Confidence: Governance checks summarized execution tables monthly, relying on lower execution tiers to catch drifts.", symptom_weight: 0.7, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Strategic Abdication: Management assumes underlying model engines are inherently self-correcting, tracking zero micro-margin metrics.", symptom_weight: 1.5, bandwidth_multiplier: 2.0, regulatory_tag: "SEC Rule 10b-5 Exposure Vector" },
      D: { key: 'D', text: "Total Boundary Blindness: Processing bounds are modified inline by teams without setting formal enterprise oversight rules.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Omission" }
    }
  },
  "HAI-62-EXEC": {
    id: "HAI-62-EXEC", pillar: "HAI", subarea: "System Reskilling & Fallbacks", target_node: "EXECUTIVE",
    symptomatic_scenario: "A cloud infrastructure drop takes your primary autonomous processing engines offline completely. How is the continuity runway managed at the leadership tier?",
    choices: {
      A: { key: 'A', text: "Active Parallel Training: Executive rules mandate scheduled manual drill runs where staff process core actions fully out-of-band.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Documented Runbook Trust: Leadership references static operational wikis, assuming teams retain manual domain re-entry capabilities.", symptom_weight: 0.6, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Operational Inertia Blindness: Management accepts that an infrastructure drop freezes output velocity indefinitely due to workforce deskilling.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "NIST SP 800-53 Operational Continuity Risk" },
      D: { key: 'D', text: "Total Operational Void: No alternative recovery blueprints or manual domain protocols exist; drops cause absolute organizational standstills.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Material Operating Capital Loss Omission Vector" }
    }
  },
  "HAI-63-EXEC": {
    id: "HAI-63-EXEC", pillar: "HAI", subarea: "Fiduciary Boundary Hardening", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate how your executive node ensures that third-party algorithmic components processing user records comply with localized data rights parameters.",
    choices: {
      A: { key: 'A', text: "Continuous Legal Auditing: Compliance teams run schema contract validations before code is committed to deployment blocks.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Vendor Terms Reliance: Corporate policy assumes premium platform vendor agreements update target legal bounds automatically.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ex-Post Enforcement Reaction: Breaches are identified only after an external legal notification or data sovereignty audit challenge arrives.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "GDPR Article 22 Compliance Exposure" },
      D: { key: 'D', text: "Total Compliance Vacuum: Transactions run without tracking geographical location coordinates or user regulatory parameters.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Cross-Border Sovereign Regulatory Infraction Risk" }
    }
  },
  "HAI-64-EXEC": {
    id: "HAI-64-EXEC", pillar: "HAI", subarea: "Capital Allocation Transparency", target_node: "EXECUTIVE",
    symptomatic_scenario: "How is the cumulative operational waste and engineering rework tax of automated platform elements surfaced to boardroom stakeholders?",
    choices: {
      A: { key: 'A', text: "Granular Loss Ledgers: Financial dashboards map compute friction costs and developer debugging hours explicitly every sprint.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Aggregated IT Expense Reporting: Management reviews broad IT operational budgets that bundle and mask systemic resource waste tokens.", symptom_weight: 0.6, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Qualitative ROI Assumptions: Value assessments rely on unverified vendor marketing decks showing generic satisfaction variables.", symptom_weight: 1.5, bandwidth_multiplier: 2.2 },
      D: { key: 'D', text: "Total Financial Opacity: Operational friction is unrecorded until infrastructure breakdowns cause catastrophic client SLA breaches.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "HAI-65-EXEC": {
    id: "HAI-65-EXEC", pillar: "HAI", subarea: "Access Governance Hierarchies", target_node: "EXECUTIVE",
    symptomatic_scenario: "Determine the corporate governance directive controlling who holds the authority to adjust automated workflow transaction limits inside production layers.",
    choices: {
      A: { key: 'A', text: "Dual-Token Cryptographic Gates: Changes require matched token signatures from both technical and compliance executive keys before live injection.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Managerial Backlog Approval: Limits are adjusted via prioritized developer tickets, requiring product manager sprint verification.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unhardened Developer Discretion: Engineers can alter system threshold variables inline without formal change control validation.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "SOX 404 Control Deficiency Marker" },
      D: { key: 'D', text: "Shared Core Password Access: Administrative root keys are distributed widely across internal development teams via unencrypted text channels.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" }
    }
  },
  "HAI-66-EXEC": {
    id: "HAI-66-EXEC", pillar: "HAI", subarea: "Strategic Trust Calibration", target_node: "EXECUTIVE",
    symptomatic_scenario: "Following an operational failure induced by an autonomous system anomaly, select the protocol used by leadership to recalibrate trust limits.",
    choices: {
      A: { key: 'A', text: "Policy-As-Code Recalibration: System boundaries are hardcoded into validation middleware rules, preventing failure repetition.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Runbook Updates: Incidents are logged inside static operational wikis, requiring teams to cross-reference guides during future faults.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Ad-Hoc Team Debriefs: Remediation occurs via chat threads; development teams patch code inline without modifying overall risk equations.", symptom_weight: 1.3, bandwidth_multiplier: 1.8 },
      D: { key: 'D', text: "Passive State Re-engagement: Errors are classified as non-recurring anomalies; systems resume live workflows with zero parameter adjustments.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Continuous Logic Risk Mitigation Gap" }
    }
  },
  "HAI-67-EXEC": {
    id: "HAI-67-EXEC", pillar: "HAI", subarea: "Autonomous Scale Thresholds", target_node: "EXECUTIVE",
    symptomatic_scenario: "When transitioning automated processing nodes from isolated pilots to full enterprise-wide scale, how does governance verify boundary security?",
    choices: {
      A: { key: 'A', text: "Statistical Cohort Gating: Infrastructure expansions match strict performance filters, auto-pausing on logic variance alerts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Velocity-Driven Integration: Automation is deployed rapidly across business lines to hit immediate commercial milestones, delaying edge validation.", symptom_weight: 0.8, bandwidth_multiplier: 1.5 },
      C: { key: 'C', text: "Uncapped Infrastructure Scale: Systems scale out without setting hard centralized compute bounds or transaction ceiling flags.", symptom_weight: 1.6, bandwidth_multiplier: 2.4, regulatory_tag: "Uncontrolled Capital Allocation Hazard Vector" },
      D: { key: 'D', text: "Total Scale Deregulation: Code models enter production lines with zero monitoring layers configured to trace enterprise market distortions.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Material Operating Capital Loss Omission Vector" }
    }
  },

  // --- HAI: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "HAI-68-MGMT": {
    id: "HAI-68-MGMT", pillar: "HAI", subarea: "Telemetry Noise Saturation", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does the volume of unaggregated system notifications and warnings impact your management layer's ability to monitor core sprint delivery parameters?",
    choices: {
      A: { key: 'A', text: "Zero Noise Disruption: Edge filters abstract low-priority telemetry, exposing only actionable compliance exceptions to management views.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Degraded Team Focus: Developers allocate significant sprint hours to tracking false positives, delaying new feature releases.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Operational Signal Blindness: Continuous log noise saturates communication lines, hiding real logic drifts behind walls of text.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "High Alarm Fatigue Operational Breakdown" },
      D: { key: 'D', text: "Global Notification Silencing: Teams mute entire tracking categories to clear console space, missing high-severity outages.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Risk Management Escalation Circuit Failure" }
    }
  },
  "HAI-69-MGMT": {
    id: "HAI-69-MGMT", pillar: "HAI", subarea: "Cross-Node Error Escalation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When a logic drift validation failure breaks processing stability inside a value stream, evaluate the cross-functional coordination protocol.",
    choices: {
      A: { key: 'A', text: "Triangulated Notification Sync: Monitoring layers push tailored impact summaries to technical, management, and risk teams instantly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Ticket Isolation: Managers generate task items, routing code corrections through standard agile task priorities.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Siloed Technical Containment: Incidents are handled strictly within infrastructure logs; business leadership remains completely blind.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Cross-Functional Escalation Operational Void" },
      D: { key: 'D', text: "Total Operational Interruption: Fault logs drop into an unmonitored mailbox, delaying remediation until a systemic platform crash occurs.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Pipeline Operational Continuity Failure" }
    }
  },
  "HAI-70-MGMT": {
    id: "HAI-70-MGMT", pillar: "HAI", subarea: "SLA Control Management", target_node: "MANAGERIAL",
    symptomatic_scenario: "Calculate the average managerial latency required to isolate and address an active automation drift error that is actively corrupting user metrics.",
    choices: {
      A: { key: 'A', text: "Zero-Latency Intercept: Monitoring elements identify errors and isolate compromised model vectors within 180 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Single-Shift Tracking Sync: Teams expend a full business day parsing distributed infrastructure layers to map code anomalies.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Customer-Driven Remediation: Management remains unaware of data corruption errors until external entities log formal SLA dispute notices.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "SLA Control Management Breakdown" },
      D: { key: 'D', text: "Indeterminate State Recovery: Lineage pathways are completely unmapped; management cycles container servers without isolating core malfunctions.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Data Provenance Structural Audit Deficit" }
    }
  },
  "HAI-71-MGMT": {
    id: "HAI-71-MGMT", pillar: "HAI", subarea: "Compliance Logic Translation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When localized financial or operational compliance metrics change, describe the management workflow used to re-align active model routes.",
    choices: {
      A: { key: 'A', text: "Unified Gateway Compilation: Managers update target variables via an isolated control plane, compiling changes code-wide instantly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Configuration Patch Deployment: Adjustments deploy via standard code variables, lacking real-time constraint checking triggers.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Manual Sprint Prioritization: Policy updates are added to engineering backlogs, creating an open compliance drift window of over 21 business days.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "High Compliance Logic Drift Exposure" },
      D: { key: 'D', text: "Undocumented Engineering Patches: Developers tweak algorithmic constraints directly inside active repositories, bypassing management.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Change Control Policy Compliance Fracture" }
    }
  },
  "HAI-72-MGMT": {
    id: "HAI-72-MGMT", pillar: "HAI", subarea: "Bandwidth Leakage Allocation", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management trace and account for the cumulative development velocity lost to repairing automated data payload breakdowns?",
    choices: {
      A: { key: 'A', text: "Friction Metric Logging: Project management systems track and surface system rework taxes directly on delivery dashboards.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Task Tracking: Engineering hours map to broad bug metrics, but financial leakage equations are never compiled.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Obfuscated Operational Burn: Engineering rework is logged under general code maintenance, hiding systems decay from business leaders.", symptom_weight: 1.4, bandwidth_multiplier: 2.0 },
      D: { key: 'D', text: "Total Waste Opacity: Rework loops are unrecorded; developers debug structural errors informally under continuous fire-fighting strain.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Material Operating Capital Loss Omission" }
    }
  },
  "HAI-73-MGMT": {
    id: "HAI-73-MGMT", pillar: "HAI", subarea: "Third-Party Integration Safety", target_node: "MANAGERIAL",
    symptomatic_scenario: "Evaluate management's process for verifying that external machine learning layers map accurately to enterprise risk limits.",
    choices: {
      A: { key: 'A', text: "Sandboxed Contract Validation: Core middleware executes end-to-end integration constraints against external vendor payloads before live routing.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "SLA Metric Assumptions: Management assumes vendor technical certifications guarantee compliance alignment without running custom audits.", symptom_weight: 0.6, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Ambiguous Operational Boundaries: Third-party integration agreements lack explicit accountability definitions for model drift errors.", symptom_weight: 1.3, bandwidth_multiplier: 1.8, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Unhardened Core Ingestion: Vendor endpoints interface directly with write-access processing databases without safety checks.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Third-Party Risk Framework Gap" }
    }
  },
  "HAI-74-MGMT": {
    id: "HAI-74-MGMT", pillar: "HAI", subarea: "Intervention Intercept Controls", target_node: "MANAGERIAL",
    symptomatic_scenario: "If an on-duty analyst identifies an anomaly, outline the permission matrix required to execute an emergency freeze across a data workflow.",
    choices: {
      A: { key: 'A', text: "Unified Interface Intercept: Staff utilize a single role-restricted dashboard toggle that safely pauses the pipeline while locking in-memory records.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Multi-Tier Approval Chains: Halting execution loops requires creating urgent tickets, delaying action as errors accumulate.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Siloed DevOps Access: Shutdown scripts are restricted to specific infrastructure teams, requiring managers to route steps over chat.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Emergency Operational Intercept Failure Risk" },
      D: { key: 'D', text: "Zero Intervention Controls: No operational freeze mechanism exists; stopping drift loops requires rebuilding cloud node clusters manually.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },
  "HAI-75-MGMT": {
    id: "HAI-75-MGMT", pillar: "HAI", subarea: "Internal Governance Documentation", target_node: "MANAGERIAL",
    symptomatic_scenario: "During an audit engagement, what verifiable history proves that your management layer actively calibrates automated system choice paths?",
    choices: {
      A: { key: 'A', text: "Cryptographic Action Registries: System architectures log every managerial modification and logic balance adjustment to an immutable ledger.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Reconstructed Dev Logs: Managers cross-reference agile task completion timestamps against general code environment updates manually.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Fragmented History Tracking: Oversight histories are compiled ad-hoc from scattered chat transcripts, personal files, and code notes.", symptom_weight: 1.5, bandwidth_multiplier: 2.1, regulatory_tag: "SOX 404 Internal Controls Oversight Operational Abdication" },
      D: { key: 'D', text: "Zero Auditable Trails: Retention filters purge application state logs weekly; management cannot produce clear documentation of system oversight.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Fiduciary Record-Keeping Risk Gaps" }
    }
  },

  // --- HAI: TECHNICAL NODE (CORE EXECUTION) ---
  "HAI-76-TECH": {
    id: "HAI-76-TECH", pillar: "HAI", subarea: "Deterministic Exception Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "Review your engineering team's exact technical routine when an active autonomous pipeline engine generates a runtime format exception.",
    choices: {
      A: { key: 'A', text: "Automated Sandbox Isolation: Core middleware isolates anomalies inside staging containers, parsing side-by-side git diff readouts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Inline Production Code Fixes: Developers rewrite code logic parameters directly inside live production clusters under active outage constraints.", symptom_weight: 0.8, bandwidth_multiplier: 1.5 },
      C: { key: 'C', text: "Brute Instance Resets: Engineering clears exception stacks by cycling server container tasks without isolating underlying data mutations.", symptom_weight: 1.4, bandwidth_multiplier: 2.4, regulatory_tag: "High Rework Tax Performance Drag" },
      D: { key: 'D', text: "Cascading Microservice Freezes: Unhandled exceptions jam database connection pools, triggering timeout errors across adjacent services.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Emergency Operational Intercept Failure Vector" }
    }
  },
  "HAI-77-TECH": {
    id: "HAI-77-TECH", pillar: "HAI", subarea: "Alert Telemetry Hardening", target_node: "TECHNICAL",
    symptomatic_scenario: "Describe the codebase configuration applied to prevent lower-severity system stack traces from overwhelming developer tracking dashboards.",
    choices: {
      A: { key: 'A', text: "Declarative Rule Filtering: Centralized monitoring middleware suppresses non-actionable warnings, surfacing only explicit logic infractions.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Isolated View Customization: Software engineers create personalized log strings locally, but settings lack multi-node synchronization.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unified Log Compression: Tech logs and transaction validation indicators flow to a single stream, forcing manual query string isolation.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "NIST SP 800-53 Operational Telemetry Deficiencies" },
      D: { key: 'D', text: "Zero Alert Filtering: Platform runtimes broadcast all infrastructure notices blindly, inducing terminal terminal saturation.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Operational Interface Cognitive Overload Risk" }
    }
  },
  "HAI-78-TECH": {
    id: "HAI-78-TECH", pillar: "HAI", subarea: "Non-Repudiation Ledgers", target_node: "TECHNICAL",
    symptomatic_scenario: "Where are intermediate parameter states, probability choices, and verification records written during an active automated calculation cycle?",
    choices: {
      A: { key: 'A', text: "Append-Only WORM Repositories: Runtimes write metric states straight to decoupled, cryptographically verified Write-Once-Read-Many storage blocks.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Relational Database Rows: Variable parameters save to shared production indices, accessible to direct internal user updates.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Rolling Text Logs: Tracing records stream to local server files configured with an unmonitored 14-day deletion rule.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Immediate Memory Evacuation: Systems write only the final mutation variable to disk; all intermediate reasoning paths dissolve instantly.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "HAI-79-TECH": {
    id: "HAI-79-TECH", pillar: "HAI", subarea: "Access Control Token Security", target_node: "TECHNICAL",
    symptomatic_scenario: "What identity architecture schema protects platform configuration variables and API master keys within your automated execution containers?",
    choices: {
      A: { key: 'A', text: "Dynamic Cloud Identity Roles: Systems utilize ephemeral tokens that expire automatically within 15 minutes, validating access via KMS encryption.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Secure Key Vault Mapping: Access parameters match centralized security lockers, but connection tokens hold long lifecycle validations.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Plaintext Environment Mappings: Administrative credentials save as static, unencrypted string variables inside localized app properties.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "Shared In-Code Token Variables: Master system infrastructure strings are saved directly within open code repositories, visible to contractors.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "HAI-80-TECH": {
    id: "HAI-80-TECH", pillar: "HAI", subarea: "Idempotency Architecture Specs", target_node: "TECHNICAL",
    symptomatic_scenario: "When a cloud routing delay causes a third-party pipeline connector to re-transmit an identical data payload transaction batch, how does the codebase respond?",
    choices: {
      A: { key: 'A', text: "Idempotent Key Verification: Boundary middleware hashes payload layouts, dropping duplicate strings before executing database writes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Database Unique Constraints: Table indexes block identical rows, but trigger unhandled backend script crashes that stall the processing line.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Double-Commit Leakage: Relational databases record both entries cleanly, silently corrupting downstream transaction and balance metrics.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Infinite Thread Contention Locks: Queues loop endlessly attempting to resolve overlapping rows, crashing parallel ingestion pools.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Multi-Tenant Concurrency Control Failure" }
    }
  },
  "HAI-81-TECH": {
    id: "HAI-81-TECH", pillar: "HAI", subarea: "Regression Testing Coverage", target_node: "TECHNICAL",
    symptomatic_scenario: "What continuous integration framework configuration evaluates pipeline processing velocity regressions before merging pull requests?",
    choices: {
      A: { key: 'A', text: "Automated Build Latency Gates: Deployment test pipelines run automated capacity checks, blocking modifications that slow processing speeds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Staging Load Runs: Core technical leads coordinate bulk transaction volume stress checks manually ahead of version updates.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Functional Verification Limits: Build assertions test syntax trees and basic logical states but completely ignore runtime latency profiles.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Regression Testing Operational Control Failure" },
      D: { key: 'D', text: "Zero Pre-Release Load Checks: Code alterations deploy straight to production lines with zero automated latency profiling.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },
  "HAI-82-TECH": {
    id: "HAI-82-TECH", pillar: "HAI", subarea: "Data Lineage Resolution", target_node: "TECHNICAL",
    symptomatic_scenario: "If a down-stream value stream output exhibits data corruption anomalies, detail the tool configuration used to locate the input origin vector.",
    choices: {
      A: { key: 'A', text: "Automated Lineage Mapping: Distributed tracing software instruments and charts the payload transformation journey across system boundaries automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Cross-DB Querying: Engineers run ad-hoc SQL comparison scripts across separate database partitions to reconstruct history.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Static Topology Documentation: Engineers reference outdated system architecture maps to guess origin blocks, adding verification delay.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "System Traceability Infrastructure Void" },
      D: { key: 'D', text: "Complete Lineage Erasure: Inline optimization functions strip origin metadata from headers, making historical trace mapping mathematically impossible.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Data Lineage Structural Failure" }
    }
  },

  // --- HAI: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "HAI-83-USER": {
    id: "HAI-83-USER", pillar: "HAI", subarea: "Automation Bias Exploitation", target_node: "USER",
    symptomatic_scenario: "When an automated operational dashboard presents a processing recommendation that looks highly anomalous, evaluate your team's standard routine.",
    choices: {
      A: { key: 'A', text: "Active System Interception: Operators lock the transaction block instantly, triggering an out-of-band manual verification review.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Escalated Discussion Gaps: Staff pause execution to verify parameters with team leads over chat, inducing multi-hour processing stalls.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unchecked Resignation: Operators execute the distorted machine suggestion blindly, assuming the codebase overrides human intuition.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Internal Controls Oversight Operational Abdication" },
      D: { key: 'D', text: "Quota-Driven Data Clearing: Operators clear warning prompts rapidly without validation to hit daily task volume metrics.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Operational Quality Control Failure" }
    }
  },
  "HAI-84-USER": {
    id: "HAI-84-USER", pillar: "HAI", subarea: "Workforce Workaround Tracks", target_node: "USER",
    symptomatic_scenario: "If an automated system logic update inserts high processing friction or interface delays into your primary task loop, how do operators adapt?",
    choices: {
      A: { key: 'A', text: "Integrated Exception Logging: Users activate an inline bypass toggle that routes tasks to backup queues while auto-reporting friction locations.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual UI Overwriting: Staff modify output text windows field-by-field manually, resolving processing blocks cell-by-cell.", symptom_weight: 0.4, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "The Shadow Spreadsheet Patch: Operators abandon the automated screen entirely, building private Excel sheets to process workflows on time.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "Shadow Data Pipeline Expansion" },
      D: { key: 'D', text: "Complete System Avoidance: Staff process daily transactions entirely via offline manual communication channels, ignoring the platform tools.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Total Architecture Rejection" }
    }
  },
  "HAI-85-USER": {
    id: "HAI-85-USER", pillar: "HAI", subarea: "Explainability Gap Friction", target_node: "USER",
    symptomatic_scenario: "When a customer demands an immediate explanation for an automated account block or scoring rejection, what asset does the interface provide?",
    choices: {
      A: { key: 'A', text: "Automated Rationale Manifests: The screen features an oversight button that prints an instant, plain-English summary of underlying choice weights.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Technical Variable Blocks: The interface displays raw system error codes and metadata strings that operators struggle to articulate to clients.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "The Rationale Vacuum: Panels output simple generic status tags (e.g., 'REJECTED'), forcing staff to stall clients with standard placeholders.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "GDPR Article 22 Infraction" },
      D: { key: 'D', text: "Complete Operations Blackout: UI tools block tracking views completely; staff must route all customer choice disputes straight to legal teams.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Consumer Privacy Protection Violation Risk" }
    }
  },
  "HAI-86-USER": {
    id: "HAI-86-USER", pillar: "HAI", subarea: "Alarm Dismissal Routines", target_node: "USER",
    symptomatic_scenario: "When multiple validation warning modals flash concurrently across user screens during peak operating volume, review typical clearing habits.",
    choices: {
      A: { key: 'A', text: "Itemized Action Tokens: The UI requires an authorized access token and specific reason string before removing each alert box.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Unreviewed Comment Entry: Operators input random character text strings inside comments boxes to satisfy UI clearing forms rapidly.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Single-Click Global Dismissal: Staff clear the workspace warning views instantly via a master 'Dismiss All' box to unblock their screens.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Unverified Alarm Dismissal Routine" },
      D: { key: 'D', text: "Systemic Visual Bypassing: Staff cover error lights physically or place alert view layers off-screen to finish data entry unhindered.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "HAI-87-USER": {
    id: "HAI-87-USER", pillar: "HAI", subarea: "User Trust Disconnection", target_node: "USER",
    symptomatic_scenario: "Evaluate the absolute level of trust your ground-level workforce holds toward the data summaries populated on the main enterprise view screens.",
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
    symptomatic_scenario: "Calculate the operational time required to alter a client record when an automated validation check applies an incorrect system lock.",
    choices: {
      A: { key: 'A', text: "Instant Core Unlocking: Operators use authorized shortcut keys to clear erroneous locks and edit fields within 60 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Escalated Manager Resets: Modifying blocks requires administrative keys held by engineering leads, stalling work for multiple hours.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Cross-Department Ticket Chains: Clearing restrictions requires raising formal alignment tasks, grounding user tasks for multiple days.", symptom_weight: 1.5, bandwidth_multiplier: 2.7, regulatory_tag: "Emergency Operational Intercept Failure" },
      D: { key: 'D', text: "Immutable Interface Deadlocks: System blocks are unmodifiable via user interfaces; accounts remain frozen until database alterations execute.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },
  "HAI-90-USER": {
    id: "HAI-90-USER", pillar: "HAI", subarea: "Onboarding Training Drift", target_node: "USER",
    symptomatic_scenario: "Describe the operational onboarding methodology applied to prepare new team hires to manage automated exception parameters.",
    choices: {
      A: { key: 'A', text: "Deterministic Simulation Labs: Hires practice processing simulated error vectors inside isolated training environment sandboxes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Static Text Review: Onboarding relies on reading software wikis and engineering configuration logs during week one, without live runs.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ad-Hoc Peer Shadowing: New hires replicate ground-level tasks by copying senior users, absorbing undocumented shortcut tracks.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Operational Training Lifecycle Drift" },
      D: { key: 'D', text: "Immediate Live Execution: Hires manage live production workflows immediately with zero prior training on system failure boundaries.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Internal Controls Operational Abdication" }
    }
  }
};
