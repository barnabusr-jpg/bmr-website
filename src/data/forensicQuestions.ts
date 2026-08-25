import { LocalQuestion } from '../types/forensicRuntime';

// Clean single-shape dataset dictionary
export const forensicQuestions: Record<string, LocalQuestion> = {
  // ====================================================================
  // PILLAR 1: INSTITUTIONAL GOVERNANCE/FIDELITY [IGF] (QUESTIONS 01–30)
  // ====================================================================

  // --- IGF: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "IGF-01-EXEC": {
    id: "IGF-01-EXEC",
    pillar: "IGF",
    subarea: "Regulatory Black-Box Exposure",
    target_node: "EXECUTIVE",
    symptomatic_scenario: "An automated AI agent makes independent customer evaluation choices.",
    choices: {
      A: { key: 'A', text: "Full Governance Rules: Platform policies enforce data safety rules." },
      B: { key: 'B', text: "Contractual Vendor Trust: Leadership relies on vendor promises." },
      C: { key: 'C', text: "High Unmonitored Exposure: AI agents operate as black boxes." },
      D: { key: 'D', text: "Total Compliance Gap: Autonomous choices execute with zero records." }
    }
  }
  // === KEEP ALL YOUR EXISTING 940+ LINES OF QUESTIONS HERE ===
  "IGF-02-EXEC": {
    id: "IGF-02-EXEC", pillar: "IGF", subarea: "Vendor Concentration Risk", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate the corporate strategy managing operational risks when core automated workflows depend entirely on a single AI provider.",
    choices: {
      A: { key: 'A', text: "Vendor-Neutral Strategy: Modular system designs allow smooth switching between different AI model providers if an outage occurs.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Service Guarantees: Service agreements cover uptime, but lack backup plans for sudden vendor system changes.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "High Single-Vendor Dependency: Systems bind directly to one provider, ignoring risks of sudden service changes or pricing hikes.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Total System Outage Hazard: Vendor updates deploy straight to active operations with zero isolation barriers or backup options.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Supply Chain Collapse Hazard" }
    }
  },
  "IGF-03-EXEC": {
    id: "IGF-03-EXEC", pillar: "IGF", subarea: "Staging Privacy Isolation", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does executive leadership guarantee that sensitive customer datasets used in testing environments remain protected from privacy leaks?",
    choices: {
      A: { key: 'A', text: "Automated Data Masking: Central safety guardrails automatically strip and scramble private details before data enters testing systems.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Data Cleansing: Custom developer scripts strip explicit names, but leave secondary client details unmasked.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unprotected Testing Environments: Unmasked client records stream into testing datasets, exposed to external model services.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "HIPAA / GDPR Data Privacy Breach Vector" },
      D: { key: 'D', text: "Total Customer Data Exposure: Testing environments use live operational access keys, allowing raw private data entry without tracking.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Material Corporate Data Loss Event Vector" }
    }
  },
  "IGF-04-EXEC": {
    id: "IGF-04-EXEC", pillar: "IGF", subarea: "Immutable Recordkeeping", target_node: "EXECUTIVE",
    symptomatic_scenario: "What governance standard guarantees that historical AI decisions cannot be altered or deleted after the fact?",
    choices: {
      A: { key: 'A', text: "Protected Audit Ledgers: Governance policies mandate saving all AI activity logs into secure, tamper-proof archives.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Activity Logging: Logs save to central storage, but system administrator access rights remain un-audited.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Modifiable Record Stores: System administrator accounts hold permissions to edit or clear decision histories directly.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Zero Record Retention: AI activity history saves to temporary memory buffers that completely overwrite every 7 days.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "IGF-05-EXEC": {
    id: "IGF-05-EXEC", pillar: "IGF", subarea: "Insider Leak Minimization", target_node: "EXECUTIVE",
    symptomatic_scenario: "Select the security control applied to prevent internal user accounts from executing unauthorized bulk data downloads via AI interfaces.",
    choices: {
      A: { key: 'A', text: "Automated Data Safeguards: Security filters monitor download speeds dynamically, blocking unusual bulk data extractions instantly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "File Size Download Limits: System rules restrict individual export file sizes, but allow users to bypass limits using multiple smaller queries.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Unmonitored System Access: Standard user accounts can extract complete company databases through AI tools without generating alerts.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Insider Threat Capital Protection Failure" },
      D: { key: 'D', text: "Shared Access Accounts: Teams share master login credentials, making it impossible to trace data downloads back to specific individuals.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "ISO 27001 Access Control Governance Failure" }
    }
  },
  "IGF-06-EXEC": {
    id: "IGF-06-EXEC", pillar: "IGF", subarea: "Geographic Sovereignty Compliance", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does leadership guarantee that AI computing systems comply with international cross-border data privacy rules?",
    choices: {
      A: { key: 'A', text: "Localized Regional Processing: Strict system routing rules lock data processing inside approved regional data centers.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Basic Vendor Assurances: Vendor agreements declare regional data storage, but lack automated location tracking features.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unmapped Data Routes: System requests stream through shared cloud provider clusters located in unverified global regions.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Data Sovereignty Compliance Transgression Risk" },
      D: { key: 'D', text: "Total Location Opacity: AI software processes and stores sensitive data in unverified foreign regions with zero tracking logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Cross-Border Sovereign Regulatory Infraction Risk" }
    }
  },
  "IGF-07-EXEC": {
    id: "IGF-07-EXEC", pillar: "IGF", subarea: "Algorithmic Control Disclosures", target_node: "EXECUTIVE",
    symptomatic_scenario: "What oversight process ensures that live AI operation rules strictly match corporate public risk statements?",
    choices: {
      A: { key: 'A', text: "Automated Policy Checks: System rule changes require explicit compliance team sign-off before being introduced into active software.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Policy Reviews: Compliance managers review AI prompts and operational rules manually before reporting deadlines.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unapproved Rule Edits: Technical teams adjust AI prompt guidelines internally without matching public risk statements.", symptom_weight: 1.4, bandwidth_multiplier: 1.9, regulatory_tag: "Change Control Policy Compliance Fracture" },
      D: { key: 'D', text: "Total Operational Disconnect: AI behavior guidelines are changed casually by technical staff, hidden from executive risk reviews.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "SEC Operational Control Hazard Vector" }
    }
  },

  // --- IGF: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "IGF-08-MGMT": {
    id: "IGF-08-MGMT", pillar: "IGF", subarea: "Audit Timeline Latency", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an external regulator demands an end-to-end audit trace of a disputed AI decision, how quickly can your team produce the history?",
    choices: {
      A: { key: 'A', text: "Instant Audit Reports: Management tools produce plain-English decision histories and prompt logs automatically on demand.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Multi-Day Technical Requests: Operational leads must submit support tickets, waiting days for developers to pull system logs.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Manual Log Reconstructions: Technical staff spend days sifting through scattered server logs to piece together an incomplete timeline.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "SOX 404 Internal Controls Operational Gap" },
      D: { key: 'D', text: "Complete Decision Black Box: AI reasoning records are unsaved; management has no way to trace or defend autonomous actions.", symptom_weight: 2.0, bandwidth_multiplier: 4.0, regulatory_tag: "Catastrophic Audit Collapse Vector" }
    }
  },
  "IGF-09-MGMT": {
    id: "IGF-09-MGMT", pillar: "IGF", subarea: "Right-to-Erasure Propagation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When a customer submits a formal data deletion request (e.g., GDPR), how does management verify complete removal from AI storage systems?",
    choices: {
      A: { key: 'A', text: "Automated Data Removal: Deleting a record triggers automated cleanup across all connected AI systems and cached data stores.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Cleanup Sprints: Operations coordinates manual cleanup scripts across secondary databases twice per year.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Main Database Deletion Only: Systems clear main database records while customer information remains stored inside AI model memory.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Statutory Data Retention Violations Risk" },
      D: { key: 'D', text: "Total Deletion Failure: Customer data removal is untracked; private details remain permanently stored inside active AI models.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-10-MGMT": {
    id: "IGF-10-MGMT", pillar: "IGF", subarea: "Vendor Privacy Alignment", target_node: "MANAGERIAL",
    symptomatic_scenario: "An AI software vendor updates terms to retain company prompts for their own training. Review management's safeguards.",
    choices: {
      A: { key: 'A', text: "Zero Data Retention Enforcement: Management configures connection rules that block vendors from storing or training on company data.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Annual Contract Reviews: Compliance checks contract terms manually during renewal periods, lacking live data filters.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unmonitored Data Transfers: Operational data feeds connect directly to partner AI systems without data privacy filters.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Third-Party Risk Framework Gap" },
      D: { key: 'D', text: "Total Data Exfiltration: Sensitive business payloads stream to public AI tools with zero encryption or privacy isolation.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Proprietary Data Loss IP Infraction" }
    }
  },
  "IGF-11-MGMT": {
    id: "IGF-11-MGMT", pillar: "IGF", subarea: "Data Lineage Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management ensure that step-by-step data changes remain fully auditable across multi-software AI workflows?",
    choices: {
      A: { key: 'A', text: "Automated Data Tracking: Tracking software monitors data transformations across automated workflows continuously.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Data Audits: Operational managers perform manual mapping checks prior to scheduled compliance reviews.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Undocumented Data Changes: Technical teams modify data rules inside custom scripts, creating untraceable system states.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Data Lineage Structural Failure" },
      D: { key: 'D', text: "Complete Tracking Loss: Automated pipelines strip origin information during processing, creating permanent audit gaps.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Data Provenance Structural Audit Deficit" }
    }
  },
  "IGF-12-MGMT": {
    id: "IGF-12-MGMT", pillar: "IGF", subarea: "Contractor Account Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "What management process tracks system permissions granted to third-party consultants building custom AI tools?",
    choices: {
      A: { key: 'A', text: "Time-Limited Credentials: Login systems issue temporary credentials that automatically expire unless explicitly extended.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Access Audits: HR cross-references active login accounts against contractor contracts manually every six months.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Permanent Admin Keys: External contractors hold high-level access keys that remain active long after project completion.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Access Management Internal Control Failure" },
      D: { key: 'D', text: "Shared Access Accounts: Contractor teams share master login credentials with zero individual tracking of work history or edits.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-13-MGMT": {
    id: "IGF-13-MGMT", pillar: "IGF", subarea: "Vendor Log Redundancy", target_node: "MANAGERIAL",
    symptomatic_scenario: "If an integrated external AI vendor service encounters an extended outage, evaluate management's recovery plan.",
    choices: {
      A: { key: 'A', text: "Automated Provider Failover: Smart routers monitor connection health, automatically switching to backup AI tools during outages.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual System Re-pointing: Technical leads update server connection strings manually, introducing hours of downtime.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Single-Vendor System Freeze: Automated workflows stop completely during vendor outages, halting customer services.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Degraded Security Boundary" },
      D: { key: 'D', text: "Cascading Workflow Corruption: Vendor outages interrupt active data streams, corrupting records across daily operations.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Supply Chain Collapse Vector" }
    }
  },
  "IGF-14-MGMT": {
    id: "IGF-14-MGMT", pillar: "IGF", subarea: "Code Change Policy Matching", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management confirm that live prompt adjustments and AI logic changes match executive risk sign-offs?",
    choices: {
      A: { key: 'A', text: "Automated Approval Verification: Deployment systems check software update codes against risk sign-off tokens before launch.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Release Audits: Managers cross-check task approvals against project records manually before major software updates.", symptom_weight: 0.4, bandwidth_multiplier: 0.7 },
      C: { key: 'C', text: "Unsanctioned Prompt Edits: Technical staff modify AI prompts directly in live system repositories without compliance approval.", symptom_weight: 1.5, bandwidth_multiplier: 2.1, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" },
      D: { key: 'D', text: "Direct Live Prompt Editing: Technical teams edit active AI prompt instructions in live admin screens with zero management logging.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "IGF-15-MGMT": {
    id: "IGF-15-MGMT", pillar: "IGF", subarea: "Compliance Release Testing", target_node: "MANAGERIAL",
    symptomatic_scenario: "What testing framework verifies business safety rules across autonomous AI tools prior to new prompt rollouts?",
    choices: {
      A: { key: 'A', text: "Automated Safety Testing: Testing pipelines check AI outputs against compliance scenarios automatically before release.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Spot-Checking: Teams review random sample AI outputs manually in staging environments before launching updates.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Basic Code Formatting Checks: Release checks verify basic formatting, completely ignoring whether AI logic follows business rules.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Algorithmic Control Lifecycle Failure" },
      D: { key: 'D', text: "Direct Unchecked Deployment: Updated AI tools launch directly into live operations with zero automated compliance testing.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- IGF: TECHNICAL NODE (CORE EXECUTION) ---
  "IGF-16-TECH": {
    id: "IGF-16-TECH", pillar: "IGF", subarea: "WORM Storage Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "From an operational system perspective, where are active AI prompt histories, model responses, and decision records stored?",
    choices: {
      A: { key: 'A', text: "Protected Vault Repositories: Log streams save directly to secure, write-locked repositories that block record edits.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Central Cloud Log Storage: Activity logs write to central cloud aggregators managed via standard administrator accounts.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Modifiable App Databases: Operational logs save directly to main application tables, vulnerable to admin edits.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Temporary Buffer Storage: Activity logs write to temporary server buffers that auto-delete completely every 7 days.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "IGF-17-TECH": {
    id: "IGF-17-TECH", pillar: "IGF", subarea: "Decoupled Verification Layers", target_node: "TECHNICAL",
    symptomatic_scenario: "How is data consistency verified between primary databases and AI memory stores to preserve operational accuracy?",
    choices: {
      A: { key: 'A', text: "Continuous Accuracy Checks: Isolated verification tasks cross-check database records and AI memory stores automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scheduled Batch Syncing: Synchronization scripts update AI memory stores to match primary tables during off-peak hours.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unverified Data Streaming: Pipelines push updates blindly, assuming AI memory stores match main database records without checking.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Total Data Desynchronization: Out-of-date records corrupt AI memory stores, generating permanent false outputs in live operations.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "IGF-18-TECH": {
    id: "IGF-18-TECH", pillar: "IGF", subarea: "Ephemeral Identity Containment", target_node: "TECHNICAL",
    symptomatic_scenario: "Review the login security lifecycle governing API access keys used by automated worker tasks inside cloud AI software.",
    choices: {
      A: { key: 'A', text: "Short-Lived Temporary Tokens: Worker processes use temporary access tokens that expire automatically within 15 minutes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Central Vault Password Calls: Software processes fetch permanent API keys from security vaults during continuous sessions.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Hardcoded API Access Keys: Security keys save as plain text strings directly inside software configuration files.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "Shared Master Login Credentials: Multiple automated processes share a single root access key, bypassing individual logging.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-19-TECH": {
    id: "IGF-19-TECH", pillar: "IGF", subarea: "Immutable Trace Architectures", target_node: "TECHNICAL",
    symptomatic_scenario: "Detail the audit tracking mechanism used to document developer modifications made to live AI agent prompts and rules.",
    choices: {
      A: { key: 'A', text: "Secure Change Sign-Offs: Prompt modifications require multi-factor sign-off before saving to permanent system logs.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Application Tracing: Systems record configuration edits, but log retention settings remain editable by administrators.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Untracked System Adjustments: Developers change AI prompt settings manually without linking updates to change records.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" },
      D: { key: 'D', text: "Direct Admin Screen Edits: Developers update live AI prompts directly via admin consoles with zero system tracking.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "IGF-20-TECH": {
    id: "IGF-20-TECH", pillar: "IGF", subarea: "Cryptographic Non-Repudiation", target_node: "TECHNICAL",
    symptomatic_scenario: "When an automated AI tool completes an operational action, how is that transaction locked against post-execution changes?",
    choices: {
      A: { key: 'A', text: "Tamper-Proof Digital Signatures: Data pipelines attach unique digital verification signatures to completed transaction records.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Database Status Locking: Table rules prevent record modifications once an action is marked with a 'COMPLETED' status tag.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Standard Unlocked Database Rows: Records save as standard database rows, vulnerable to direct editing via administrator tools.", symptom_weight: 1.4, bandwidth_multiplier: 2.1, regulatory_tag: "System Traceability Infrastructure Void" },
      D: { key: 'D', text: "Total History Overwriting: System scripts clean storage by overwriting past decision states, keeping only final outcomes.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Data Lineage Structural Failure" }
    }
  },
  "IGF-21-TECH": {
    id: "IGF-21-TECH", pillar: "IGF", subarea: "Network Boundary Isolation", target_node: "TECHNICAL",
    symptomatic_scenario: "What security boundary isolation safeguards internal AI data stores from unauthenticated internet traffic?",
    choices: {
      A: { key: 'A', text: "Isolated Private Networks: Internal systems bind strictly to private network addresses, communicating via encrypted security gateways.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Firewall Rules: Access rules restrict specific IP ranges, but leave database ports exposed to general corporate networks.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Public Internet Exposure: AI tools connect across public web addresses, relying on basic passwords for protection.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "NIST SP 800-171 Network Boundary Failure" },
      D: { key: 'D', text: "Total Security Deregulation: Core database ports are open to all inbound internet traffic to simplify development access.", symptom_weight: 2.0, bandwidth_multiplier: 3.9, regulatory_tag: "Material Data Exfiltration Vulnerability Risk" }
    }
  },
  "IGF-22-TECH": {
    id: "IGF-22-TECH", pillar: "IGF", subarea: "Dependency Manifest Auditing", target_node: "TECHNICAL",
    symptomatic_scenario: "How frequently are open-source AI software components audited for hidden security vulnerabilities?",
    choices: {
      A: { key: 'A', text: "Automated Continuous Scans: Automated security checkers inspect software dependencies on every build, blocking vulnerable code.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scheduled Maintenance Reviews: Technical leads run software updates manually ahead of annual IT audits.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ad-Hoc External Package Imports: Developers import external software packages arbitrarily from public sources to hit tight deadlines.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Supply Chain Risk Failure" },
      D: { key: 'D', text: "Zero Software Dependency Audits: External AI libraries compile straight into live software with zero security checks.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- IGF: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "IGF-23-USER": {
    id: "IGF-23-USER", pillar: "IGF", subarea: "GDPR Explanation Access", target_node: "USER",
    symptomatic_scenario: "When a customer asks for a clear explanation of an automated AI decision, what information does your user interface provide?",
    choices: {
      A: { key: 'A', text: "Automated Plain-English Summaries: The screen includes an export button that generates a clear summary of decision factors.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Raw Technical Metrics: The screen displays internal confidence scores and technical codes that staff cannot explain to clients.", symptom_weight: 0.6, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Status Tag Only: Panels display simple status flags (e.g., 'REJECTED'), forcing staff to stall clients with generic templates.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "GDPR Article 22 Infraction Exposure" },
      D: { key: 'D', text: "Complete Workspace Blindness: Interface tools hide decision reasoning completely; staff must forward all client disputes to legal teams.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-24-USER": {
    id: "IGF-24-USER", pillar: "IGF", subarea: "Data Erasure Tracking", target_node: "USER",
    symptomatic_scenario: "Detail user interface steps required when processing a customer's formal right-to-erasure request across AI records.",
    choices: {
      A: { key: 'A', text: "One-Click Data Purging: Clicking 'Purge Record' deletes customer details across main tables and AI memory stores automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Ticket Management: Staff submit cleanup tickets across engineering teams, causing manual tracking over week-long cycles.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Surface Table Deletion: Interfaces delete primary database rows while customer details remain saved in offline AI stores.", symptom_weight: 1.4, bandwidth_multiplier: 2.1, regulatory_tag: "Statutory Data Retention Violations Risk" },
      D: { key: 'D', text: "Total Deletion Neglect: Right-to-erasure tasks are unrecorded; customer data remains active inside background training sets.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "EU GDPR Non-Compliance Threat Vector" }
    }
  },
  "IGF-25-USER": {
    id: "IGF-25-USER", pillar: "IGF", subarea: "Export Permission Hardening", target_node: "USER",
    symptomatic_scenario: "Review what happens on operational screens when a standard user account attempts to export a customer contact spreadsheet.",
    choices: {
      A: { key: 'A', text: "Manager Authorization Prompts: The system blocks file downloads until an administrative approval token is entered.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Export Row Limits: Interface rules limit data extractions to 1,000 rows, displaying an automated notice to managers.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unrestricted Data Exports: Operators can extract complete customer spreadsheets via browser tools with zero verification logging.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Insider Threat Capital Protection Failure" },
      D: { key: 'D', text: "Shared Admin Account Bypasses: Team members use shared administrator profiles to download large files via unmonitored sessions.", symptom_weight: 2.0, bandwidth_multiplier: 3.7, regulatory_tag: "ISO 27001 Access Control Governance Failure" }
    }
  },
  "IGF-26-USER": {
    id: "IGF-26-USER", pillar: "IGF", subarea: "Audit Trace Validation", target_node: "USER",
    symptomatic_scenario: "When auditing daily operational tasks recorded on user dashboards, how do supervisors confirm that actions follow safety rules?",
    choices: {
      A: { key: 'A', text: "Protected Activity Timelines: Operational screens display immutable, verified audit logs for every individual status change.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Event Matching: Management compares system updates against support tickets manually using spreadsheets.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Incomplete Activity Logs: Logs record general updates, but omit exact timestamps and staff identities from dashboard views.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "SOX 404 Internal Controls Operational Gap" },
      D: { key: 'D', text: "Zero Operational Documentation: Cleanup scripts delete history views weekly; supervisors have no way to verify staff actions.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Fiduciary Record-Keeping Risk Gaps" }
    }
  },
  "IGF-27-USER": {
    id: "IGF-27-USER", pillar: "IGF", subarea: "Data Masking Real-Time Check", target_node: "USER",
    symptomatic_scenario: "How do sensitive customer records (e.g., credit card numbers, SSNs) render on primary screen views used by standard operators?",
    choices: {
      A: { key: 'A', text: "Automated Data Masking: Sensitive numbers display as hidden characters automatically, showing only the final 4 digits.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Ticket-Based Field Unlocking: Fields stay hidden until operators enter explicit support ticket numbers to view full details.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Plain Text Record Display: Full private details display openly on standard monitors, visible to anyone walking past.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "HIPAA / GDPR Data Privacy Breach Vector" },
      D: { key: 'D', text: "Total Data Exposure: Unmasked client details save directly to browser memory, easily extracted via basic browser scripts.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Material Corporate Data Loss Event Vector" }
    }
  },
  "IGF-28-USER": {
    id: "IGF-28-USER", pillar: "IGF", subarea: "Access Session Timeouts", target_node: "USER",
    symptomatic_scenario: "If an operator leaves their computer screen unattended while a customer account view is open, detail system safeguards.",
    choices: {
      A: { key: 'A', text: "Automated Screen Locking: The application monitors inactivity, locking the display completely after 5 idle minutes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Account Logouts: Active user logins log out automatically after 60 minutes of total continuous time.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Continuous Active Standby: Workspaces remain logged in indefinitely, keeping private customer profiles open on unattended screens.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "Shared Terminal Access: Computer terminals run on shared, persistent browser logins that stay active across all working shifts.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "IGF-29-USER": {
    id: "IGF-29-USER", pillar: "IGF", subarea: "Third-Party Data Exfiltration", target_node: "USER",
    symptomatic_scenario: "When using integrated AI assistant tools on your dashboard, how are customer records filtered before being sent to external models?",
    choices: {
      A: { key: 'A', text: "Automated Privacy Filters: Middleware inspects prompt entries, replacing private customer details with anonymous tokens automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Pop-Up Warning Notices: Screen pop-ups remind staff to manually remove private client details before submitting prompts.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unchecked Prompt Ingestion: Complete client profiles paste directly into AI assistant boxes, exposing private details to external logs.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Third-Party Risk Framework Gap" },
      D: { key: 'D', text: "Total Data Exfiltration: Unfiltered client records route straight to public external AI providers with zero privacy controls.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Proprietary Data Loss IP Infraction" }
    }
  },
  "IGF-30-USER": {
    id: "IGF-30-USER", pillar: "IGF", subarea: "Emergency Lock Verification", target_node: "USER",
    symptomatic_scenario: "If an operator spots a malfunctioning or rogue autonomous AI tool, review the interface controls available to stop it immediately.",
    choices: {
      A: { key: 'A', text: "One-Click Emergency Stop: Staff can click a master emergency stop button, instantly pausing connected AI tasks within 5 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manager Support Tickets: Operators must submit an urgent ticket to request that engineering leads pause active AI processes.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "External Support Delays: Stopping rogue AI tools requires phone requests to external vendors, adding hours of operational delay.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Algorithmic Control Control Failure" },
      D: { key: 'D', text: "Zero Emergency Controls: No emergency stop button exists; stopping rogue AI tools requires rebuilding cloud servers manually.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },

  // ===========================================================================
  // PILLAR 2: AUTONOMOUS VALUE STREAMS [AVS] (QUESTIONS 31-60)
  // ===========================================================================
  
  // --- AVS: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "AVS-31-EXEC": {
    id: "AVS-31-EXEC", pillar: "AVS", subarea: "Data Infrastructure Foundations", target_node: "EXECUTIVE",
    symptomatic_scenario: "When allocating automation roadmap budgets, how does corporate strategy evaluate data quality gaps and system readiness limits?",
    choices: {
      A: { key: 'A', text: "Continuous Readiness Reviews: Investment plans measure exact process waste tax metrics and data format stability limits directly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scheduled Technology Upgrades: Core database systems receive structural updates on multi-year software renewal cycles.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Feature-First Funding: Capital budgets favor user-facing features, pushing data safety rules into future backlogs.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "BCBS 239 Risk Data Aggregation Deficit" },
      D: { key: 'D', text: "Total Foundation Blindness: Automation expands without checking data foundations, risking sudden system failures.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Scalability Controls Structural Framework Gap" }
    }
  },
  "AVS-32-EXEC": {
    id: "AVS-32-EXEC", pillar: "AVS", subarea: "Velocity Scaling Matrices", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does corporate leadership handle aggressive delivery deadlines without bypassing pre-automation AI safety rules?",
    choices: {
      A: { key: 'A', text: "Automated Data Verification: Release systems enforce automated data checks, blocking software rollouts that lack data safety rules.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Scheduled Project Buffers: Development schedules include dedicated time for developers to test data formats and rules.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Speed-First Pressures: Leadership rewards fast AI deployments, encouraging developers to bypass data checks to hit launch dates.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Degraded Quality Control Standards" },
      D: { key: 'D', text: "Total Safety Deregulation: AI tools launch into live operations with zero data checks to capture quick commercial gains.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Catastrophic Structural Drift" }
    }
  },
  "AVS-33-EXEC": {
    id: "AVS-33-EXEC", pillar: "AVS", subarea: "Resource Waste Optimization", target_node: "EXECUTIVE",
    symptomatic_scenario: "Select the cost tracking model applied by leadership to monitor computing resource waste and excessive API spend across cloud AI systems.",
    choices: {
      A: { key: 'A', text: "Department Cost Tagging: Cost monitoring tools link AI usage spend directly to specific departments and operational workflows.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Summary Invoice Reviews: Finance reviews lump-sum cloud invoices, lacking visibility into redundant AI system requests.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Reactive Budget Caps: Computing spend limits are adjusted manually only after budget overruns occur.", symptom_weight: 1.6, bandwidth_multiplier: 2.3, regulatory_tag: "Infrastructure Cost Control Efficiency Deficit" },
      D: { key: 'D', text: "Total Expense Blindness: Extra AI costs process automatically as general operating expenses with zero efficiency tracking.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Material Operating Resource Waste Tracker" }
    }
  },
  "AVS-34-EXEC": {
    id: "AVS-34-EXEC", pillar: "AVS", subarea: "Composable Design Standards", target_node: "EXECUTIVE",
    symptomatic_scenario: "What architecture requirement ensures that engineering teams build reusable, modular AI connectors and integration layers?",
    choices: {
      A: { key: 'A', text: "Central Connector Repositories: System guidelines require engineering teams to use pre-approved, standardized data adapters.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Static Design Guides: Product teams document AI integration standards inside central reference guides.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Siloed Tool Building: Separate teams build custom AI connectors from scratch, duplicating design errors and system noise.", symptom_weight: 1.4, bandwidth_multiplier: 2.0 },
      D: { key: 'D', text: "Complete System Fragmentation: Engineering groups use completely conflicting integration methods across different software projects.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "ISO 27001 Software Lifecycle Failure" }
    }
  },
  "AVS-35-EXEC": {
    id: "AVS-35-EXEC", pillar: "AVS", subarea: "Multi-Cloud Interoperability", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate corporate strategy for preventing data errors when running AI models across multiple cloud providers (e.g., AWS, Azure, Google).",
    choices: {
      A: { key: 'A', text: "Vendor-Neutral Data Wrappers: Standardized data structures prevent lock-in, enabling smooth transitions between cloud AI vendors.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Custom Connection Scripts: Dedicated scripts connect different AI clouds manually, requiring ongoing developer maintenance.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Vendor Lock-In Dependency: Workflows rely entirely on features unique to one cloud vendor, preventing backup failovers.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Multi-Cloud Complexity Architecture Risk" },
      D: { key: 'D', text: "Total System Disconnection: Services connect across cloud providers via open web links with zero central security tracking.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Business Continuity Strategic Control Failure" }
    }
  },
  "AVS-36-EXEC": {
    id: "AVS-36-EXEC", pillar: "AVS", subarea: "Portfolio Modernization Planning", target_node: "EXECUTIVE",
    symptomatic_scenario: "Determine the strategic framework applied to modernizing legacy data pipelines prior to deploying autonomous AI tools.",
    choices: {
      A: { key: 'A', text: "Isolated Data Translation: Legacy databases pass through data-cleaning layers before reaching AI systems.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Off-Peak System Upgrades: Legacy data updates execute manually during low-traffic weekend maintenance windows.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Basic API Wrappers: Outdated databases are wrapped in basic connection layers, leaving unstructured data errors unaddressed.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Legacy Systemic Vulnerability Hazard Vector" },
      D: { key: 'D', text: "Complete Upgrade Stagnation: Legacy pipelines remain untouched due to fears that updates will crash dependent systems.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Application Portfolio Modernization Collapse" }
    }
  },
  "AVS-37-EXEC": {
    id: "AVS-37-EXEC", pillar: "AVS", subarea: "Synthetic Data Risk Management", target_node: "EXECUTIVE",
    symptomatic_scenario: "How does corporate strategy verify data accuracy when AI pipelines process computer-generated or synthetic data records?",
    choices: {
      A: { key: 'A', text: "Continuous Statistical Scans: Systems run automated validation checks, filtering out artificial errors before data enters main systems.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Data Profiling: Validation teams run sample data checks against synthetic datasets twice per year.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unchecked Pipeline Ingestion: AI models process synthetic data directly with zero edge filtering, risking false output generation.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "BCBS 239 Risk Data Aggregation Deficit" },
      D: { key: 'D', text: "Total Data Contamination: Unverified computer-generated data mixes into core business records with zero labeling.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Catastrophic Model Corruption Target" }
    }
  },

  // --- AVS: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "AVS-38-MGMT": {
    id: "AVS-38-MGMT", pillar: "AVS", subarea: "Upstream Mutation Tracking", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an external software vendor modifies their data structure without warning, how does management catch the resulting pipeline issue?",
    choices: {
      A: { key: 'A', text: "Automated Format Monitoring: Verification monitors detect vendor data changes instantly, alerting leads before systems break.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Automated Error Logging: Data format errors send automated alerts to technicians, generating support tickets in project backlogs.", symptom_weight: 0.4, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "User-Reported Incidents: Managers remain unaware of vendor data changes until operators report blank screen fields.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "SLA Control Management Breakdown" },
      D: { key: 'D', text: "Total Pipeline Blindness: System connections are unmapped; management restarts servers without finding the root data issue.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Data Pipeline Idempotency Control Deficit" }
    }
  },
  "AVS-39-MGMT": {
    id: "AVS-39-MGMT", pillar: "AVS", subarea: "Delivery Constraint Calibration", target_node: "MANAGERIAL",
    symptomatic_scenario: "Evaluate management's strategy for balancing pipeline safety improvements against competing business feature requests.",
    choices: {
      A: { key: 'A', text: "Dedicated Maintenance Time: Management reserves 20% of every development cycle exclusively for platform stability and safety rules.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Performance-Triggered Fixes: Pipeline refactoring is prioritized whenever system error rates exceed monthly allowed limits.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Feature Backlog Priority: Data stability tasks are delayed indefinitely to maintain fast commercial release schedules.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "Continuous Software Life-Cycle Control Void" },
      D: { key: 'D', text: "Total Technical Debt Neglect: Data format issues are ignored until persistent system timeouts crash downstream integrations.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Operational Quality Drop Hazard Vector" }
    }
  },
  "AVS-40-MGMT": {
    id: "AVS-40-MGMT", pillar: "AVS", subarea: "Tribal Memory Mitigations", target_node: "MANAGERIAL",
    symptomatic_scenario: "If your lead AI engineer exits the organization, what documentation ensures management can maintain and scale automated systems smoothly?",
    choices: {
      A: { key: 'A', text: "Clear Standardized Specifications: System frameworks write data rules and prompt setups automatically to open reference standards.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Central System Wikis: Data transformations and system targets are documented inside shared company knowledge bases.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Unwritten Staff Memory: System setups exist purely in developer memory, lacking central documentation and setup guides.", symptom_weight: 1.5, bandwidth_multiplier: 2.3 },
      D: { key: 'D', text: "Total System Opacity: AI pipelines are unmapped black boxes that staff cannot modify without causing unexpected crashes.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "System Traceability Infrastructure Void" }
    }
  },
  "AVS-41-MGMT": {
    id: "AVS-41-MGMT", pillar: "AVS", subarea: "Cross-Functional Dependency Mapping", target_node: "MANAGERIAL",
    symptomatic_scenario: "How are data pipelines mapped across departments when executing cross-team automation and AI tool integrations?",
    choices: {
      A: { key: 'A', text: "Automated Data Flow Maps: Tracking tools map data paths across all database and AI networks automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Intermittent Design Diagrams: Managers assemble cross-team data flow diagrams manually before annual IT reviews.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Isolated Team Engineering: Departments build internal integration pipelines independently, producing untraceable data gaps.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Cross-Functional Escalation Operational Void" },
      D: { key: 'D', text: "Total System Fragmentation: Inter-system data maps do not exist; fixing errors requires emergency multi-team debugging sessions.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-42-MGMT": {
    id: "AVS-42-MGMT", pillar: "AVS", subarea: "SLA Latency Mitigation", target_node: "MANAGERIAL",
    symptomatic_scenario: "Calculate average management time required to restore system speed when prompt data overload slows down an AI processing queue.",
    choices: {
      A: { key: 'A', text: "Automated Circuit Breakers: Isolated safety switches bypass slow AI connections, routing tasks to backup models in under 3 minutes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Server Provisioning: Technicians start secondary server processes manually, adding hours of operational delay.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Multi-Stage Problem Solving: System recovery requires pulling developers from active projects to debug worker processes manually.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Emergency Operational Intercept Failure" },
      D: { key: 'D', text: "Indeterminate System Outage: Data overload locks processing queues permanently, requiring a complete restart of backend systems.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Pipeline Operational Continuity Failure" }
    }
  },
  "AVS-43-MGMT": {
    id: "AVS-43-MGMT", pillar: "AVS", subarea: "API Contract Tracking", target_node: "MANAGERIAL",
    symptomatic_scenario: "What connection tracking pattern verifies that third-party AI integration points align with company data safety rules?",
    choices: {
      A: { key: 'A', text: "Automated Interface Verification: Automated checkers validate dataset structures before allowing external connections to execute.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Developer Security Approvals: Engineering leads review data access scripts manually before approving code updates to live systems.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unvalidated Partner Connections: External partners connect data feeds directly to internal systems without automated format checks.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Total Connection Deregulation: Open access keys are distributed across contractor teams without tracking query actions.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "AVS-44-MGMT": {
    id: "AVS-44-MGMT", pillar: "AVS", subarea: "Engineering Budget Efficiency", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management evaluate engineering hours lost to manual debugging caused by unannounced vendor data format changes?",
    choices: {
      A: { key: 'A', text: "Automated Waste Tracking: Project tools track developer debugging hours and wasted capacity costs automatically on dashboards.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Server Cost Reviews: Management isolates server processing cost spikes manually when cloud bills exceed normal budgets.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Anecdotal Team Feedback: Debugging time remains unmeasured in task boards until developers report team strain manually.", symptom_weight: 1.3, bandwidth_multiplier: 1.9 },
      D: { key: 'D', text: "Total Waste Opacity: Untracked data format shifts cause continuous manual rework, draining developer capacity enterprise-wide.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Resource Usage Monitoring Structural Gap" }
    }
  },
  "AVS-45-MGMT": {
    id: "AVS-45-MGMT", pillar: "AVS", subarea: "Regression Controls Governance", target_node: "MANAGERIAL",
    symptomatic_scenario: "When AI prompt updates degrade execution speed across primary product workflows, identify management's tracking model.",
    choices: {
      A: { key: 'A', text: "Automated Performance Gates: Release systems block live software updates automatically if processing speed drops.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Staging Speed Testing: Technical leads test processing speeds manually ahead of major platform version releases.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Post-Release Patching: Performance drops pass into live systems, requiring reactive fixes after users encounter system lag.", symptom_weight: 1.5, bandwidth_multiplier: 2.2, regulatory_tag: "Regression Testing Operational Control Failure" },
      D: { key: 'D', text: "Total Speed Degradation: Response delays accumulate across releases, degrading workforce output with zero tracking logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },

  // --- AVS: TECHNICAL NODE (CORE EXECUTION) ---
  "AVS-46-TECH": {
    id: "AVS-46-TECH", pillar: "AVS", subarea: "Polymorphic Validation Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "Review your technical group's data structure when external vendor payloads attach unexpected extra tracking properties.",
    choices: {
      A: { key: 'A', text: "Dynamic Data Isolation: Security gateways isolate extra properties into secondary tables, protecting primary database performance.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Untyped Storage Dump: Databases dump incoming fields into unstructured text blocks, degrading search performance over time.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Manual Database Edits: Engineers execute database structure changes manually inside live production systems under active usage.", symptom_weight: 1.4, bandwidth_multiplier: 2.4, regulatory_tag: "High Rework Tax Performance Drag" },
      D: { key: 'D', text: "Total Record Corruption: Mismatched data fields overwrite database columns blindly, breaking calculations downstream.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-47-TECH": {
    id: "AVS-47-TECH", pillar: "AVS", subarea: "Idempotent Stream Processing", target_node: "TECHNICAL",
    symptomatic_scenario: "What architecture safeguard protects database tables when separate autonomous AI tools attempt to write matching records at the exact same time?",
    choices: {
      A: { key: 'A', text: "Conflict-Free Version Rules: Target records check row version tags, automatically retrying saves if state conflicts occur.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Strict Row Freezing: Database rules freeze target rows during write steps, creating processing delays under heavy traffic.", symptom_weight: 0.4, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unchecked Simultaneous Writes: Tools execute writes concurrently without sequence checks, allowing newer records to overwrite prior edits.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Data Multi-Tenant Concurrency Control Failure" },
      D: { key: 'D', text: "Cascading System Deadlocks: Overlapping updates crash database memory, locking up all connected software services.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Data Pipeline Idempotency Control Deficit" }
    }
  },
  "AVS-48-TECH": {
    id: "AVS-48-TECH", pillar: "AVS", subarea: "Non-Blocking Message Buffers", target_node: "TECHNICAL",
    symptomatic_scenario: "Describe the queue buffering setup deployed to hold incoming AI prompts when primary database networks experience disconnections.",
    choices: {
      A: { key: 'A', text: "Persistent Message Queues: Ingestion pipelines write prompts to non-volatile queues, replaying data once connections restore.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Immediate Error Screens: Application routes return immediate server errors, forcing upstream systems to retry requests.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Temporary Memory Buffering: Ingestion scripts hold inputs in local server memory, dropping records when memory overflows.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Infrastructure Resiliency Component Void" },
      D: { key: 'D', text: "Server Memory Deadlocks: Blocked destination targets freeze running software processes, crashing the server cluster completely.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "SOX 404 Infrastructure Gap" }
    }
  },
  "AVS-49-TECH": {
    id: "AVS-49-TECH", pillar: "AVS", subarea: "Read Replica Decoupling", target_node: "TECHNICAL",
    symptomatic_scenario: "When an automated AI tool executes a large analytics query across millions of database rows, select the load isolation setup.",
    choices: {
      A: { key: 'A', text: "Isolated Read Mirrors: AI queries check dedicated read-only database copies, leaving live operational databases untouched.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Off-Peak Query Runs: Heavy analytics queries run manually during low-traffic midnight windows to avoid database slowdowns.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Live Database Execution: AI queries run directly against primary production databases, slowing down active user operations.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Database Resource Contention Control Deficit" },
      D: { key: 'D', text: "Cascading Database Locks: Complex data searches lock master databases permanently, dropping user network connections.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Resource Usage Monitoring Structural Gap" }
    }
  },
  "AVS-50-TECH": {
    id: "AVS-50-TECH", pillar: "AVS", subarea: "Active-Active Disaster Recovery", target_node: "TECHNICAL",
    symptomatic_scenario: "What backup failover system protects AI tool data states if your primary computing cluster encounters a regional network outage?",
    choices: {
      A: { key: 'A', text: "Multi-Zone Automated Failover: Traffic routes through active regional backups, switching AI operations automatically in under 30 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Server Provisioning: Infrastructure staff set up secondary server images manually, adding hours of delay.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Regional Service Freeze: Data ingestion stops completely during outages, requiring manual creation of new server clusters.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Disaster Recovery Compliance Regulatory Gap" },
      D: { key: 'D', text: "Data Corruption Losses: Outages interrupt active database saves, producing incomplete or corrupt records.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },
  "AVS-51-TECH": {
    id: "AVS-51-TECH", pillar: "AVS", subarea: "Cache Invalidation Webhooks", target_node: "TECHNICAL",
    symptomatic_scenario: "How are temporary memory caches validated to prevent stale data embeddings from skewing AI model choices?",
    choices: {
      A: { key: 'A', text: "Instant Cache Clearing: Primary database edits trigger immediate cache clearing across all memory stores automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Expiration Timers: Memory caches include timeout counters, but expiration rules do not track live data edits.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Zero Cache Validation: Memory storage persists until manual resets run, passing out-of-date records to AI models.", symptom_weight: 1.5, bandwidth_multiplier: 2.0, regulatory_tag: "Cache Parity Verification Controls Failure" },
      D: { key: 'D', text: "Stale Data Distortions: Out-of-date memory caches feed invalid context to AI models, generating high error rates.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Cache Parity Verification Controls Failure" }
    }
  },
  "AVS-52-TECH": {
    id: "AVS-52-TECH", pillar: "AVS", subarea: "Distributed Serialization Normalizers", target_node: "TECHNICAL",
    symptomatic_scenario: "Evaluate the performance monitoring tools used to measure system delays caused by converting data shapes across internal services.",
    choices: {
      A: { key: 'A', text: "Continuous Service Tracking: Monitoring tools evaluate data conversion speeds across all internal communication routes automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Performance Checks: Technical leads audit service communication delays manually during periodic system reviews.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Zero Integration Tracking: Systems route diverse payload formats without central profiling, masking communication slowdowns.", symptom_weight: 1.4, bandwidth_multiplier: 1.9, regulatory_tag: "Distributed Architecture Infrastructure Deficit" },
      D: { key: 'D', text: "System Network Congestion: High data conversion overhead jams messaging channels, triggering server disconnections.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "System Traceability Infrastructure Void" }
    }
  },

  // --- AVS: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "AVS-53-USER": {
    id: "AVS-53-USER", pillar: "AVS", subarea: "Manual Scrubbing Taxes", target_node: "USER",
    symptomatic_scenario: "When automated data pipelines output missing, mismatched, or corrupted records onto workspace views, detail user routines.",
    choices: {
      A: { key: 'A', text: "Zero Manual Cleaning: Self-healing edge filters correct missing properties automatically using historical averages.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Integrated Error Notices: Workspace panels display data format warnings, letting staff modify records within a single screen.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Manual Excel Corrections: Operators manually fix automated errors, tracking corrected fields in personal spreadsheets.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Shadow Data Pipeline Expansion" },
      D: { key: 'D', text: "Total System Avoidance: Ground staff process data tasks manually via offline text files, ignoring platform views completely.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Total Architecture Rejection" }
    }
  },
  "AVS-54-USER": {
    id: "AVS-54-USER", pillar: "AVS", subarea: "Interface Data Loss Discrepancies", target_node: "USER",
    symptomatic_scenario: "If data processing scripts drop incomplete data properties automatically to keep servers running, how is that handled on your workspace screen?",
    choices: {
      A: { key: 'A', text: "Clear Warning Banners: The interface displays missing-field warnings, directing users to the data source issue.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Blank Data Cells: The dashboard leaves fields blank with zero explanation, forcing operators to guess missing values.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Silent Record Disappearance: Incomplete items vanish from workflow tables without alerts, leading staff to execute double entries.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Operational Quality Control Failure" },
      D: { key: 'D', text: "Cascading Screen Crashes: Formatting errors crash the web display completely, blocking user data entry.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Operational Interface Failure" }
    }
  },
  "AVS-55-USER": {
    id: "AVS-55-USER", pillar: "AVS", subarea: "Typing Error Disconnects", target_node: "USER",
    symptomatic_scenario: "When an external software update modifies database column types, select the layout impact on user workspace tasks.",
    choices: {
      A: { key: 'A', text: "Automatic Data Formatting: Screen formatting rules translate and adapt data shapes smoothly with zero display distortion.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Numeric Field Conversions: Screens convert type errors to empty zero cells, displaying incorrect pricing metrics to users.", symptom_weight: 0.6, bandwidth_multiplier: 1.3 },
      C: { key: 'C', text: "Interface Freezes: Control panels lock on data rendering loops, blocking workspace functionality for active workers.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "System Type Validation Control Failure" },
      D: { key: 'D', text: "Total Screen Outages: Type errors trigger application crashes globally, blocking data entry functions until server patches run.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Database Integrity Structural Deficit" }
    }
  },
  "AVS-56-USER": {
    id: "AVS-56-USER", pillar: "AVS", subarea: "Duplicate Record Skews", target_node: "USER",
    symptomatic_scenario: "Evaluate the frequency with which ground-level operators identify duplicate transaction rows printing inside active account summaries.",
    choices: {
      A: { key: 'A', text: "Zero Record Duplication: Boundary filters prevent double writes perfectly, keeping transaction views completely clean.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Rare Processing Errors: Duplicate rows appear less than once a quarter, resolved via manual manager adjustment inputs.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Continuous Balance Skews: Duplicate lines populate weekly, forcing staff to run manual calculations to compute real numbers.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Absolute Metric Distrust: Duplications corrupt ledger summaries continuously; operators verify all inputs via offline personal logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "AVS-57-USER": {
    id: "AVS-57-USER", pillar: "AVS", subarea: "Character Encoding Distortions", target_node: "USER",
    symptomatic_scenario: "How does your operations workforce address international client files when database text strings display corrupted, unreadable characters?",
    choices: {
      A: { key: 'A', text: "Automated Text Normalization: System components convert character encoding automatically, keeping text clear and readable.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Field Overwriting: Operators use admin panels to manually correct broken text lines cell-by-cell.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Corrupt Text Acceptance: Broken text blocks save directly to tables, creating un-searchable entries inside database logs.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Data Normalization Operational Control Void" },
      D: { key: 'D', text: "Cascading Document Crashes: Corrupted character strings crash automated invoicing tools, stopping outbound client communications.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Operational Quality Drop Hazard Vector" }
    }
  },
  "AVS-58-USER": {
    id: "AVS-58-USER", pillar: "AVS", subarea: "Database Indexing Latency", target_node: "USER",
    symptomatic_scenario: "When background data systems experience massive volume acceleration, describe the immediate impact on workspace search speeds.",
    choices: {
      A: { key: 'A', text: "Zero Search Delays: Optimized database indexing processes queries in under a second despite background load.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Slowing Workspace Speeds: Query lookups delay by 5 to 10 seconds under load, creating minor data entry stalls.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Persistent Connection Timeouts: Lookups return error boxes, forcing staff to re-run searches multiple times to load data.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "Database Resource Contention Deficit" },
      D: { key: 'D', text: "Complete Screen Lockups: Database congestion freezes user screen loading completely, locking out operators for hours.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Workforce Disconnection Hazard" }
    }
  },
  "AVS-59-USER": {
    id: "AVS-59-USER", pillar: "AVS", subarea: "Cache State Contention", target_node: "USER",
    symptomatic_scenario: "Review your operational team's workaround behavior when interface view fields populate out-of-date metrics due to system memory delays.",
    choices: {
      A: { key: 'A', text: "Instant Display Parity: Memory updates clear old screen data instantly whenever backend database values change.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Continuous Browser Reloading: Operators refresh browser windows manually using hard reload commands throughout their shift.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Stale Metric Processing: Operators complete transactions using outdated display numbers, producing balance calculation errors.", symptom_weight: 1.6, bandwidth_multiplier: 2.4, regulatory_tag: "Cache Parity Verification Controls Failure" },
      D: { key: 'D', text: "Total Data Overwriting: Screen delays cause users to overwrite matching database rows, saving conflicting update logs.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Operational Interface Failure" }
    }
  },
  "AVS-60-USER": {
    id: "AVS-60-USER", pillar: "AVS", subarea: "Outage Data Recovery", target_node: "USER",
    symptomatic_scenario: "When a cloud infrastructure outage drops background data systems, what recovery tasks are required from users once connections restore?",
    choices: {
      A: { key: 'A', text: "Zero Manual Reconciliation: Message queues replay missing data entries automatically with zero value loss.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Balance Spot-Checks: Operators run consistency spot-checks against recent entries manually to verify process completion.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Bulk Transaction Re-Entry: Staff spend hours manually typing in client transactions that failed to save during the outage window.", symptom_weight: 1.5, bandwidth_multiplier: 2.7, regulatory_tag: "Disaster Recovery Compliance Regulatory Gap" },
      D: { key: 'D', text: "Total Data Corruption Chaos: Interrupted pipeline saves corrupt history logs permanently, forcing complex data cleanup projects.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Scalability Controls Structural Framework Gap" }
    }
  },

  // ===========================================================================
  // PILLAR 3: HUMAN-AUTONOMOUS INTERACTION [HAI] (QUESTIONS 61-90)
  // ===========================================================================
  
  // --- HAI: EXECUTIVE NODE (GOVERNANCE & STRATEGY) ---
  "HAI-61-EXEC": {
    id: "HAI-61-EXEC", pillar: "HAI", subarea: "Automated Verification Loops", target_node: "EXECUTIVE",
    symptomatic_scenario: "An autonomous AI pricing tool updates commercial offers dynamically. How does corporate governance verify that margin shifts adhere to risk limits?",
    choices: {
      A: { key: 'A', text: "Hard Strategic Caps: Policies enforce automated verification limits at the database boundary to prevent unchecked price shifts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Retrospective Summary Audits: Governance reviews summarized execution reports monthly, relying on lower tiers to catch price drift.", symptom_weight: 0.7, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unmonitored Execution: Management assumes AI pricing tools are self-correcting, tracking zero micro-margin metrics.", symptom_weight: 1.6, bandwidth_multiplier: 2.0, regulatory_tag: "SEC Rule 10b-5 Exposure Vector" },
      D: { key: 'D', text: "Total Boundary Blindness: Pricing limits are modified inline by teams without setting formal enterprise oversight rules.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Omission" }
    }
  },
  "HAI-62-EXEC": {
    id: "HAI-62-EXEC", pillar: "HAI", subarea: "System Reskilling & Fallbacks", target_node: "EXECUTIVE",
    symptomatic_scenario: "A cloud outage takes primary autonomous AI processing engines offline completely. How is operational continuity managed at the leadership tier?",
    choices: {
      A: { key: 'A', text: "Active Parallel Drills: Executive rules mandate scheduled manual drill runs where staff process core actions fully out-of-band.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Documented Runbook Trust: Leadership relies on static operational wikis, assuming teams retain manual domain re-entry capabilities.", symptom_weight: 0.6, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Operational Inertia Blindness: Management accepts that an AI system outage freezes output velocity indefinitely due to workforce deskilling.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "NIST SP 800-53 Operational Continuity Risk" },
      D: { key: 'D', text: "Total Operational Void: No alternative recovery blueprints or manual domain protocols exist; outages cause absolute organizational standstills.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Material Operating Capital Loss Omission Vector" }
    }
  },
  "HAI-63-EXEC": {
    id: "HAI-63-EXEC", pillar: "HAI", subarea: "Fiduciary Boundary Hardening", target_node: "EXECUTIVE",
    symptomatic_scenario: "Evaluate how executive leadership ensures that third-party AI software processing user records complies with localized data privacy laws.",
    choices: {
      A: { key: 'A', text: "Continuous Legal Auditing: Compliance teams run data safety contract checks before AI software is connected to live systems.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Vendor Terms Reliance: Policy assumes premium AI vendor contracts update legal compliance bounds automatically.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Reactive Violation Response: Data breaches are identified only after external legal notices or regulatory complaints arrive.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "GDPR Article 22 Compliance Exposure" },
      D: { key: 'D', text: "Total Compliance Vacuum: AI transactions execute without tracking regional location data or customer privacy parameters.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Cross-Border Sovereign Regulatory Infraction Risk" }
    }
  },
  "HAI-64-EXEC": {
    id: "HAI-64-EXEC", pillar: "HAI", subarea: "Capital Allocation Transparency", target_node: "EXECUTIVE",
    symptomatic_scenario: "How is cumulative operational waste and developer rework caused by automated AI issues surfaced to boardroom stakeholders?",
    choices: {
      A: { key: 'A', text: "Granular Loss Ledgers: Financial dashboards map compute friction costs and developer debugging hours explicitly every development cycle.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Aggregated IT Expense Reporting: Management reviews broad IT budget reports that bundle and hide systemic resource waste.", symptom_weight: 0.6, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Qualitative ROI Assumptions: Value assessments rely on unverified vendor marketing claims showing generic satisfaction metrics.", symptom_weight: 1.5, bandwidth_multiplier: 2.2 },
      D: { key: 'D', text: "Total Financial Opacity: Operational friction is unrecorded until infrastructure breakdowns cause catastrophic customer SLA breaches.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Fiduciary Duty Corporate Risk Oversight Gap" }
    }
  },
  "HAI-65-EXEC": {
    id: "HAI-65-EXEC", pillar: "HAI", subarea: "Access Governance Hierarchies", target_node: "EXECUTIVE",
    symptomatic_scenario: "Determine the corporate governance rule controlling who holds authority to adjust automated AI execution limits in live operations.",
    choices: {
      A: { key: 'A', text: "Dual-Signoff Approval Controls: Changes require matched authorization tokens from both technical and compliance leads before live deployment.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Managerial Backlog Approval: Limits are adjusted via prioritized developer tickets, requiring product manager verification.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Unapproved Developer Discretion: Engineers alter AI threshold variables directly without formal change control approval.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "SOX 404 Control Deficiency Marker" },
      D: { key: 'D', text: "Shared Core Password Access: Administrative root keys are distributed widely across internal development teams via unencrypted channels.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" }
    }
  },
  "HAI-66-EXEC": {
    id: "HAI-66-EXEC", pillar: "HAI", subarea: "Strategic Trust Calibration", target_node: "EXECUTIVE",
    symptomatic_scenario: "Following an operational failure induced by an autonomous AI error, select the protocol used by leadership to recalibrate safety limits.",
    choices: {
      A: { key: 'A', text: "Hardcoded Safety Boundaries: AI boundaries are hardcoded into verification middleware rules, preventing failure repetition.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Runbook Reference Guides: Incidents are logged in static operational wikis, requiring teams to reference guides during future faults.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Ad-Hoc Team Chat Debriefs: Remediation occurs via team chat threads; developers patch prompt text without updating risk models.", symptom_weight: 1.3, bandwidth_multiplier: 1.8 },
      D: { key: 'D', text: "Passive Unchanged Operations: Errors are dismissed as non-recurring glitches; AI tools resume live workflows with zero safety updates.", symptom_weight: 2.0, bandwidth_multiplier: 2.8, regulatory_tag: "Continuous Logic Risk Mitigation Gap" }
    }
  },
  "HAI-67-EXEC": {
    id: "HAI-67-EXEC", pillar: "HAI", subarea: "Autonomous Scale Thresholds", target_node: "EXECUTIVE",
    symptomatic_scenario: "When transitioning automated AI tools from isolated pilots to enterprise-wide scale, how does governance verify safety boundaries?",
    choices: {
      A: { key: 'A', text: "Phase-Gated Expansion Limits: AI expansion follows strict performance checks, automatically pausing if logic errors spike.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Speed-Driven Rollouts: AI is deployed rapidly across business units to hit commercial targets, delaying safety validation.", symptom_weight: 0.8, bandwidth_multiplier: 1.5 },
      C: { key: 'C', text: "Uncapped Infrastructure Scale: AI tools scale out without setting hard central compute limits or transaction safety ceilings.", symptom_weight: 1.6, bandwidth_multiplier: 2.4, regulatory_tag: "Uncontrolled Capital Allocation Hazard Vector" },
      D: { key: 'D', text: "Total Scale Deregulation: AI models enter live operations with zero monitoring systems configured to trace operational errors.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Material Operating Capital Loss Omission Vector" }
    }
  },

  // --- HAI: MANAGERIAL NODE (LOGIC TRANSLATION) ---
  "HAI-68-MGMT": {
    id: "HAI-68-MGMT", pillar: "HAI", subarea: "Telemetry Noise Saturation", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does the volume of unaggregated system alerts impact your management layer's ability to monitor core team delivery goals?",
    choices: {
      A: { key: 'A', text: "Automated Alert Filtering: Smart filters suppress low-priority alert noise, surfacing only actionable exceptions to management dashboards.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Degraded Team Focus: Developers allocate significant sprint hours to investigating false alarms, delaying feature releases.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Validation Fatigue: Continuous alert noise floods communication channels, hiding real system errors behind walls of notification text.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "High Alarm Fatigue Operational Breakdown" },
      D: { key: 'D', text: "Global Notification Muting: Teams mute entire notification channels to clear workspace screens, missing critical system outages.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Risk Management Escalation Circuit Failure" }
    }
  },
  "HAI-69-MGMT": {
    id: "HAI-69-MGMT", pillar: "HAI", subarea: "Cross-Node Error Escalation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When an AI logic drift failure breaks system stability inside a daily workflow, evaluate the cross-department coordination protocol.",
    choices: {
      A: { key: 'A', text: "Instant Cross-Team Alerts: Monitoring systems push clear impact summaries to technical, management, and risk leads automatically.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Ticket Creation: Managers log support tasks, routing software fixes through standard development sprint cycles.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Isolated Engineering Fixes: Incidents are handled strictly within developer logs; business leadership remains unaware of the issue.", symptom_weight: 1.4, bandwidth_multiplier: 2.2, regulatory_tag: "Cross-Functional Escalation Operational Void" },
      D: { key: 'D', text: "Unmonitored Error Mailboxes: Error logs drop into unmonitored mailboxes, delaying fixes until a total system breakdown occurs.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Pipeline Operational Continuity Failure" }
    }
  },
  "HAI-70-MGMT": {
    id: "HAI-70-MGMT", pillar: "HAI", subarea: "SLA Control Management", target_node: "MANAGERIAL",
    symptomatic_scenario: "Calculate average management time required to isolate and address an active AI logic error that is corrupting customer metrics.",
    choices: {
      A: { key: 'A', text: "Instant Error Isolation: Monitoring tools identify errors and isolate faulty AI connections in under 3 minutes.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Single-Shift Tracking Delays: Teams spend a full business day parsing distributed logs to locate prompt anomalies.", symptom_weight: 0.5, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Customer-Driven Discovery: Management remains unaware of data errors until external entities submit formal service dispute notices.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "SLA Control Management Breakdown" },
      D: { key: 'D', text: "Unpredictable System Recovery: Connection paths are unmapped; management restarts servers without isolating the core malfunction.", symptom_weight: 2.0, bandwidth_multiplier: 3.8, regulatory_tag: "Data Provenance Structural Audit Deficit" }
    }
  },
  "HAI-71-MGMT": {
    id: "HAI-71-MGMT", pillar: "HAI", subarea: "Compliance Logic Translation", target_node: "MANAGERIAL",
    symptomatic_scenario: "When operational or financial compliance rules change, describe the management workflow used to re-align active AI prompts.",
    choices: {
      A: { key: 'A', text: "Central Rule Control: Managers update target rules via a central control screen, applying changes system-wide instantly.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Configuration Code Patches: Rule updates deploy via standard code variables, lacking real-time constraint testing triggers.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Manual Sprint Backlogs: Policy updates enter developer backlogs, creating an open non-compliance window of over 21 days.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "High Compliance Logic Drift Exposure" },
      D: { key: 'D', text: "Undocumented Developer Tweak: Developers adjust prompt rules directly inside active repositories, bypassing management sign-offs.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Change Control Policy Compliance Fracture" }
    }
  },
  "HAI-72-MGMT": {
    id: "HAI-72-MGMT", pillar: "HAI", subarea: "Bandwidth Leakage Allocation", target_node: "MANAGERIAL",
    symptomatic_scenario: "How does management trace and account for cumulative development capacity lost to repairing broken automated data feeds?",
    choices: {
      A: { key: 'A', text: "Automated Rework Dashboards: Project management systems track developer debugging hours and waste tax costs on delivery dashboards.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Task Tracking: Engineering hours map to general bug metrics, but financial cost calculations are never compiled.", symptom_weight: 0.5, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Hidden Operational Burn: Developer rework is logged under general maintenance, hiding system decay from business leaders.", symptom_weight: 1.4, bandwidth_multiplier: 2.0 },
      D: { key: 'D', text: "Total Rework Opacity: Rework hours are unrecorded; developers debug system errors informally under constant firefighting strain.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Material Operating Capital Loss Omission" }
    }
  },
  "HAI-73-MGMT": {
    id: "HAI-73-MGMT", pillar: "HAI", subarea: "Third-Party Integration Safety", target_node: "MANAGERIAL",
    symptomatic_scenario: "Evaluate management's process for verifying that external machine learning services map accurately to enterprise risk limits.",
    choices: {
      A: { key: 'A', text: "Isolated Contract Testing: Security middleware tests safety constraints against external vendor data before allowing live routing.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Vendor Compliance Assumptions: Management assumes vendor certificates guarantee compliance without custom audits.", symptom_weight: 0.6, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Unclear Service Boundaries: Third-party vendor contracts lack explicit accountability for AI model errors or drift.", symptom_weight: 1.3, bandwidth_multiplier: 1.8, regulatory_tag: "Third-Party Risk Concentration Framework Gap" },
      D: { key: 'D', text: "Direct Database Connections: External AI systems interface directly with live production databases without safety checks.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Third-Party Risk Framework Gap" }
    }
  },
  "HAI-74-MGMT": {
    id: "HAI-74-MGMT", pillar: "HAI", subarea: "Intervention Intercept Controls", target_node: "MANAGERIAL",
    symptomatic_scenario: "If an operator identifies an AI model error, outline the permissions required to execute an emergency pause across a workflow.",
    choices: {
      A: { key: 'A', text: "One-Click Emergency Freeze: Authorized staff use a single dashboard toggle that safely pauses the pipeline while saving data state.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Multi-Tier Approval Chains: Halting automated tasks requires raising urgent support tickets, delaying action as errors accumulate.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Restricted IT Team Access: Shutdown controls are restricted to infrastructure teams, requiring managers to request halts via chat.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "Emergency Operational Intercept Failure Risk" },
      D: { key: 'D', text: "Zero Emergency Controls: No operational freeze mechanism exists; stopping drift requires rebuilding server clusters manually.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },
  "HAI-75-MGMT": {
    id: "HAI-75-MGMT", pillar: "HAI", subarea: "Internal Governance Documentation", target_node: "MANAGERIAL",
    symptomatic_scenario: "During an audit engagement, what verifiable history proves that your management layer actively monitors and adjusts automated AI choices?",
    choices: {
      A: { key: 'A', text: "Protected Management Logs: Systems record every managerial setting update and prompt adjustment to a tamper-proof audit ledger.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Reconstructed Developer Notes: Managers cross-reference task completion timestamps against general code updates manually.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Fragmented History Tracking: Oversight records are compiled ad-hoc from scattered chat transcripts, personal files, and code notes.", symptom_weight: 1.5, bandwidth_multiplier: 2.1, regulatory_tag: "SOX 404 Internal Controls Oversight Operational Abdication" },
      D: { key: 'D', text: "Zero Auditable Documentation: Retention filters delete activity logs weekly; management cannot produce proof of system oversight.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Fiduciary Record-Keeping Risk Gaps" }
    }
  },

  // --- HAI: TECHNICAL NODE (CORE EXECUTION) ---
  "HAI-76-TECH": {
    id: "HAI-76-TECH", pillar: "HAI", subarea: "Deterministic Exception Intercepts", target_node: "TECHNICAL",
    symptomatic_scenario: "Review your engineering team's exact routine when an active autonomous AI tool encounters a runtime data error.",
    choices: {
      A: { key: 'A', text: "Automated Sandbox Isolation: Middleware isolates data errors inside testing containers, displaying code difference readouts.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Direct Live System Fixes: Developers rewrite prompt or logic settings directly inside live production systems under active load.", symptom_weight: 0.8, bandwidth_multiplier: 1.5 },
      C: { key: 'C', text: "Brute Server Resets: Engineering clears system errors by restarting server processes without locating underlying data issues.", symptom_weight: 1.4, bandwidth_multiplier: 2.4, regulatory_tag: "High Rework Tax Performance Drag" },
      D: { key: 'D', text: "Cascading System Freezes: Unhandled errors overload database connection pools, triggering timeout errors across adjacent services.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Emergency Operational Intercept Failure Vector" }
    }
  },
  "HAI-77-TECH": {
    id: "HAI-77-TECH", pillar: "HAI", subarea: "Alert Telemetry Hardening", target_node: "TECHNICAL",
    symptomatic_scenario: "Describe the system setup applied to prevent low-priority technical error logs from overwhelming developer tracking dashboards.",
    choices: {
      A: { key: 'A', text: "Automated Alert Rule Filtering: Monitoring rules suppress non-actionable warnings, surfacing only critical data and system errors.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Custom Local Dashboard Filters: Engineers customize personal log views locally, but settings lack team-wide synchronization.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unfiltered Single Log Stream: Technical logs and system validation notices flow to a single stream, requiring manual filtering.", symptom_weight: 1.5, bandwidth_multiplier: 2.5, regulatory_tag: "NIST SP 800-53 Operational Telemetry Deficiencies" },
      D: { key: 'D', text: "Zero Alert Filtering: Systems broadcast all technical notices blindly, inducing severe developer alert fatigue.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Operational Interface Cognitive Overload Risk" }
    }
  },
  "HAI-78-TECH": {
    id: "HAI-78-TECH", pillar: "HAI", subarea: "Non-Repudiation Ledgers", target_node: "TECHNICAL",
    symptomatic_scenario: "Where are intermediate calculations, model weights, and prompt/response records stored during an automated processing cycle?",
    choices: {
      A: { key: 'A', text: "Protected Vault Repositories: Systems write decision records straight to secure, tamper-proof storage repositories.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Standard Database Rows: Variable parameters save to shared production tables, accessible to direct user editing.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Rolling Text Server Files: Tracing records write to local server files configured with an unmonitored 14-day deletion rule.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "FINRA Rule 4511 Books and Records Gap" },
      D: { key: 'D', text: "Immediate Memory Erasure: Systems write only the final result; intermediate reasoning steps dissolve instantly from memory.", symptom_weight: 2.0, bandwidth_multiplier: 3.3, regulatory_tag: "Historical Audit Ledger Destruction Risk" }
    }
  },
  "HAI-79-TECH": {
    id: "HAI-79-TECH", pillar: "HAI", subarea: "Access Control Token Security", target_node: "TECHNICAL",
    symptomatic_scenario: "What identity security setup protects system configuration settings and AI master API keys inside cloud software containers?",
    choices: {
      A: { key: 'A', text: "Temporary Automated Tokens: Systems use temporary tokens that expire automatically within 15 minutes, verified via central security.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Central Key Vault Storage: Access keys fetch from central security lockers, but connection tokens hold long expiration periods.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Plain Text Environment Keys: API access keys save as unencrypted plain text variables inside localized software properties.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "ISO 27001 Access Key Control Governance Failure" },
      D: { key: 'D', text: "Hardcoded Code Tokens: Master system API keys save directly inside open software repositories, visible to external contractors.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "ISO 27001 Access Control Control Failure" }
    }
  },
  "HAI-80-TECH": {
    id: "HAI-80-TECH", pillar: "HAI", subarea: "Idempotency Architecture Specs", target_node: "TECHNICAL",
    symptomatic_scenario: "When a network delay causes a third-party pipeline connector to re-transmit an identical prompt request, how does the codebase respond?",
    choices: {
      A: { key: 'A', text: "Automated Duplicate Filtering: Middleware checks request signatures, dropping duplicate inputs before executing database saves.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Database Unique Restrictions: Table rules block duplicate rows, but trigger unhandled script crashes that stall the processing queue.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Double-Entry Record Skews: Databases record both entries cleanly, silently corrupting downstream business metrics.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "Data Pipeline Idempotency Control Deficit" },
      D: { key: 'D', text: "Infinite System Queue Loops: Processing queues loop endlessly trying to resolve duplicate rows, crashing parallel ingestion tasks.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "Multi-Tenant Concurrency Control Failure" }
    }
  },
  "HAI-81-TECH": {
    id: "HAI-81-TECH", pillar: "HAI", subarea: "Regression Testing Coverage", target_node: "TECHNICAL",
    symptomatic_scenario: "What automated testing framework evaluates processing speed regressions before code updates are merged into live systems?",
    choices: {
      A: { key: 'A', text: "Automated Performance Gates: Testing pipelines run automated speed checks, blocking code or prompt updates that slow processing.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Staging Load Runs: Technical leads run system stress checks manually in staging environments ahead of major updates.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Basic Syntax Code Checks: Testing checks verify basic code syntax, completely ignoring system response speed profiles.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Regression Testing Operational Control Failure" },
      D: { key: 'D', text: "Zero Pre-Release Speed Checks: Code changes deploy straight into live operations with zero automated speed testing.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Continuous Lifecycle Validation Failure" }
    }
  },
  "HAI-82-TECH": {
    id: "HAI-82-TECH", pillar: "HAI", subarea: "Data Lineage Resolution", target_node: "TECHNICAL",
    symptomatic_scenario: "If a downstream AI output exhibits data corruption or hallucination, detail the tool setup used to locate the input source.",
    choices: {
      A: { key: 'A', text: "Automated Path Tracking: Distributed tracking software maps and displays the exact data journey across all system boundaries.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Database Searches: Engineers run manual search scripts across separate database partitions to reconstruct history.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "Outdated System Diagrams: Engineers reference outdated architecture diagrams to guess source blocks, adding investigation delays.", symptom_weight: 1.5, bandwidth_multiplier: 2.3, regulatory_tag: "System Traceability Infrastructure Void" },
      D: { key: 'D', text: "Complete Lineage Erasure: System cleanup functions strip origin details from headers, making historical tracing impossible.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Data Lineage Structural Failure" }
    }
  },

  // --- HAI: FUNCTIONAL USER NODE (SYSTEM OPERATIONS) ---
  "HAI-83-USER": {
    id: "HAI-83-USER", pillar: "HAI", subarea: "Automation Bias Exploitation", target_node: "USER",
    symptomatic_scenario: "When an automated AI dashboard presents a processing recommendation that looks highly unusual, evaluate your team's routine.",
    choices: {
      A: { key: 'A', text: "Active Human Verification: Operators lock the transaction immediately, triggering an out-of-band manual review.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Team Lead Chat Consultations: Staff pause execution to verify details with team leads over chat, inducing multi-hour processing stalls.", symptom_weight: 0.5, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Unchecked Automation Reliance: Operators execute the unusual machine suggestion blindly, assuming the system knows best.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Internal Controls Oversight Operational Abdication" },
      D: { key: 'D', text: "Speed-Driven Alert Clearing: Operators clear warning pop-ups rapidly without checking details in order to hit daily volume goals.", symptom_weight: 2.0, bandwidth_multiplier: 3.6, regulatory_tag: "Operational Quality Control Failure" }
    }
  },
  "HAI-84-USER": {
    id: "HAI-84-USER", pillar: "HAI", subarea: "Workforce Workaround Tracks", target_node: "USER",
    symptomatic_scenario: "If an automated AI system update inserts high processing delays into your primary daily task loop, how do operators adapt?",
    choices: {
      A: { key: 'A', text: "Integrated Bypass Toggles: Users activate an inline bypass switch that routes tasks to backup queues while auto-reporting issue locations.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manual Field Editing: Staff modify output text windows field-by-field manually, resolving processing blocks cell-by-cell.", symptom_weight: 0.4, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Offline Spreadsheet Workarounds: Operators abandon the automated screen, building private Excel sheets to process work on time.", symptom_weight: 1.5, bandwidth_multiplier: 2.6, regulatory_tag: "Shadow Data Pipeline Expansion" },
      D: { key: 'D', text: "Complete System Avoidance: Staff process daily transactions entirely via offline manual channels, ignoring platform tools completely.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Total Architecture Rejection" }
    }
  },
  "HAI-85-USER": {
    id: "HAI-85-USER", pillar: "HAI", subarea: "Explainability Gap Friction", target_node: "USER",
    symptomatic_scenario: "When a customer demands an immediate explanation for an automated AI account block or scoring rejection, what asset does the interface provide?",
    choices: {
      A: { key: 'A', text: "Automated Plain-English Summaries: The screen features an oversight button that prints an instant summary of underlying decision factors.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Raw Technical Code Output: The interface displays raw system error codes that operators struggle to explain to clients.", symptom_weight: 0.6, bandwidth_multiplier: 1.2 },
      C: { key: 'C', text: "Generic Status Flags: Panels output simple status tags (e.g., 'REJECTED'), forcing staff to stall clients with standard placeholders.", symptom_weight: 1.5, bandwidth_multiplier: 2.4, regulatory_tag: "GDPR Article 22 Infraction" },
      D: { key: 'D', text: "Complete Operations Blackout: Interface tools hide tracking views completely; staff must route all customer disputes straight to legal teams.", symptom_weight: 2.0, bandwidth_multiplier: 3.2, regulatory_tag: "Consumer Privacy Protection Violation Risk" }
    }
  },
  "HAI-86-USER": {
    id: "HAI-86-USER", pillar: "HAI", subarea: "Alarm Dismissal Routines", target_node: "USER",
    symptomatic_scenario: "When multiple warning pop-ups flash concurrently across workspace screens during peak volume, review typical clearing habits.",
    choices: {
      A: { key: 'A', text: "Authorized Reason Entry: The system requires an authorized password and specific reason string before removing each alert box.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Random Text Comments: Operators type random characters inside comment boxes to satisfy screen clearing forms quickly.", symptom_weight: 0.4, bandwidth_multiplier: 0.9 },
      C: { key: 'C', text: "One-Click Mass Dismissal: Staff clear workspace warnings instantly via a master 'Dismiss All' button due to alert fatigue.", symptom_weight: 1.6, bandwidth_multiplier: 2.6, regulatory_tag: "Unverified Alarm Dismissal Routine" },
      D: { key: 'D', text: "Visual Screen Bypassing: Staff cover error lights physically or place alert windows off-screen to finish data entry unhindered.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "SOX 404 Internal Controls Non-Compliance" }
    }
  },
  "HAI-87-USER": {
    id: "HAI-87-USER", pillar: "HAI", subarea: "User Trust Disconnection", target_node: "USER",
    symptomatic_scenario: "Evaluate the absolute level of trust your ground-level workforce holds toward the data summaries populated on main AI view screens.",
    choices: {
      A: { key: 'A', text: "Complete Metric Parity: Interface statistics align cleanly with business reality; operators use metrics without cross-checking.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Spot Calculation Checks: Operators run manual sanity checks across roughly 10% of outputs to monitor data consistency.", symptom_weight: 0.5, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Systemic Core Distrust: Workers treat app values as fundamentally unreliable, running offline validation checks manually.", symptom_weight: 1.5, bandwidth_multiplier: 2.3 },
      D: { key: 'D', text: "Active Platform Hostility: Operators assume screen metrics are incorrect by default, actively designing workarounds to bypass system outputs.", symptom_weight: 2.0, bandwidth_multiplier: 3.5, regulatory_tag: "Workforce Disconnection Hazard" }
    }
  },
  "HAI-88-USER": {
    id: "HAI-88-USER", pillar: "HAI", subarea: "Interface Sync Delays", target_node: "USER",
    symptomatic_scenario: "When background network congestion causes data processing delays, how is that data lag displayed to the active platform user?",
    choices: {
      A: { key: 'A', text: "Real-Time Sync Timers: Real-time status indicators display on the screen header, stating exactly when data last synchronized.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Static Loading Wheels: Screens freeze on un-timed loading wheels, leaving staff to guess if backend system tasks are dead or running.", symptom_weight: 0.5, bandwidth_multiplier: 1.1 },
      C: { key: 'C', text: "Silent Stale Data Displays: Interface boxes display hours-old cached values without warnings, causing users to act on dead data.", symptom_weight: 1.6, bandwidth_multiplier: 2.5, regulatory_tag: "Cache Parity Control Failure" },
      D: { key: 'D', text: "Cascading Layout Freezes: Delays cause browser framework crashes that lock workspace layouts, requiring a full app cache reset.", symptom_weight: 2.0, bandwidth_multiplier: 3.0, regulatory_tag: "Operational Interface Cognitive Overload Risk" }
    }
  },
  "HAI-89-USER": {
    id: "HAI-89-USER", pillar: "HAI", subarea: "Manual Override Friction", target_node: "USER",
    symptomatic_scenario: "Calculate the operational time required to alter a client record when an automated AI safety check applies an incorrect system lock.",
    choices: {
      A: { key: 'A', text: "Instant Screen Unlocking: Operators use authorized shortcut keys to clear erroneous locks and edit fields within 60 seconds.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Manager Password Overrides: Modifying locks requires admin permissions held by engineering leads, stalling work for multiple hours.", symptom_weight: 0.4, bandwidth_multiplier: 1.0 },
      C: { key: 'C', text: "Multi-Department Ticket Chains: Clearing restrictions requires raising formal alignment tasks, grounding user tasks for multiple days.", symptom_weight: 1.5, bandwidth_multiplier: 2.7, regulatory_tag: "Emergency Operational Intercept Failure" },
      D: { key: 'D', text: "Immutable Interface Deadlocks: System locks cannot be modified via user interfaces; accounts remain frozen until database edits execute.", symptom_weight: 2.0, bandwidth_multiplier: 3.4, regulatory_tag: "System Crisis Intervention Control Deficit" }
    }
  },
  "HAI-90-USER": {
    id: "HAI-90-USER", pillar: "HAI", subarea: "Onboarding Training Drift", target_node: "USER",
    symptomatic_scenario: "Describe the operational onboarding methodology applied to prepare new team hires to manage automated AI error scenarios.",
    choices: {
      A: { key: 'A', text: "Interactive Simulation Labs: New hires practice handling simulated error scenarios inside isolated training environments.", symptom_weight: 0.0, bandwidth_multiplier: 0.0 },
      B: { key: 'B', text: "Static Reference Reviews: Onboarding relies on reading software wikis and engineering logs during week one, without live practice.", symptom_weight: 0.4, bandwidth_multiplier: 0.8 },
      C: { key: 'C', text: "Ad-Hoc Peer Shadowing: New hires replicate daily tasks by copying senior users, absorbing undocumented shortcut workarounds.", symptom_weight: 1.4, bandwidth_multiplier: 2.0, regulatory_tag: "Operational Training Lifecycle Drift" },
      D: { key: 'D', text: "Immediate Live Execution: Hires manage live production workflows immediately with zero prior training on system failure boundaries.", symptom_weight: 2.0, bandwidth_multiplier: 3.1, regulatory_tag: "Internal Controls Operational Abdication" }
    }
  }
};
