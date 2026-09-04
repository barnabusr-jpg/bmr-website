"use client";

import { DiagnosticState, NodeStatus, SowOptionLevel } from "@/types/diagnostic";

export type ExportErrorCode =
  | "INCOMPLETE_STATE"
  | "MISSING_INTAKE_FIELDS"
  | "NUMERIC_ANOMALY"
  | "MALFORMED_NODE_MATRIX"
  | "EXPORT_RUNTIME_EXCEPTION";

export interface ExportResult {
  ok: boolean;
  errorCode?: ExportErrorCode;
  message?: string;
}

/**
 * Strict currency formatter: Assumes caller has verified Number.isFinite().
 */
function formatCurrency(val: number): string {
  return `$${val.toLocaleString()}`;
}

/**
 * Strict hours formatter: Assumes caller has verified Number.isFinite().
 */
function formatHours(val: number): string {
  return `${val.toLocaleString()} hrs/yr`;
}

/**
 * Validates that a NodeStatus object contains all required truthy string fields.
 */
function isValidNodeStatus(node: NodeStatus): boolean {
  return Boolean(
    node &&
      typeof node.nodeId === "string" &&
      node.nodeId.trim() &&
      typeof node.name === "string" &&
      node.name.trim() &&
      typeof node.observedPattern === "string" &&
      node.observedPattern.trim() &&
      typeof node.operationalImpact === "string" &&
      node.operationalImpact.trim() &&
      typeof node.recommendedGate === "string" &&
      node.recommendedGate.trim() &&
      typeof node.status === "string" &&
      node.status.trim()
  );
}

/**
 * Generates and downloads a multi-section, board-legible CSV diagnostic report.
 * Strict forensic audit standard: Fails closed on missing schema fields, malformed
 * node structures, missing required nodes, or non-finite numeric calculations.
 * Returns structured error codes for UI audit banners.
 */
export function exportComprehensiveCSV(
  state?: DiagnosticState
): ExportResult {
  try {
    // 1) Completion & Schema Invariant Gate
    if (!state || !state.isComplete) {
      console.warn("[BMR Export Guard] Aborted: State is undefined or incomplete.");
      return {
        ok: false,
        errorCode: "INCOMPLETE_STATE",
        message: "Diagnostic session is incomplete or unverified.",
      };
    }

    const { answers, calculations, nodeSummaries, sowSelections } = state;

    // 2) Strict Answers & SOW Field Invariant Validation
    if (
      !answers?.organizationName?.trim() ||
      !answers?.sector ||
      !answers?.decisionStage ||
      !sowSelections?.PHASE_01 ||
      !sowSelections?.PHASE_02 ||
      !sowSelections?.PHASE_03
    ) {
      console.error(
        "[BMR Export Failure] Aborted: Required intake answers or SOW selections are missing."
      );
      return {
        ok: false,
        errorCode: "MISSING_INTAKE_FIELDS",
        message: "Required intake fields or SOW selections are missing.",
      };
    }

    // 3) Strict Numeric Calculation Verification (No $0 fallbacks)
    const numericFields: Array<{
      key: keyof typeof calculations;
      label: string;
    }> = [
      { key: "readinessIndex", label: "AI Readiness Index" },
      { key: "processWasteTax", label: "Process Waste Tax" },
      { key: "promiseGapExposure", label: "Promise Gap Exposure" },
      { key: "annualCapacityHours", label: "Annual Capacity Hours" },
      { key: "weeklyBurnRate", label: "Weekly Burn Rate" },
      { key: "recoveryMultiplier", label: "Recovery Multiplier" },
    ];

    for (const field of numericFields) {
      if (!calculations || !Number.isFinite(calculations[field.key])) {
        console.error(
          `[BMR Export Failure] Aborted: Calculation '${field.label}' is non-finite.`
        );
        return {
          ok: false,
          errorCode: "NUMERIC_ANOMALY",
          message: `Calculation anomaly detected: '${field.label}' produced an invalid or non-finite result.`,
        };
      }
    }

    // 4) Strict Node Summaries Structural & Set Completeness Check (Exact NODE_01..NODE_04 match without 'as any')
    const EXPECTED_NODE_IDS = ["NODE_01", "NODE_02", "NODE_03", "NODE_04"] as const;
    const expectedIdSet = new Set<string>(EXPECTED_NODE_IDS);

    const presentNodeIds = new Set<string>(
      Array.isArray(nodeSummaries)
        ? nodeSummaries
            .map((n) => n?.nodeId)
            .filter((id): id is string => typeof id === "string")
        : []
    );

    const isExactNodeSet =
      Array.isArray(nodeSummaries) &&
      nodeSummaries.length === expectedIdSet.size &&
      EXPECTED_NODE_IDS.every((id) => presentNodeIds.has(id));

    if (!isExactNodeSet || !nodeSummaries.every(isValidNodeStatus)) {
      console.error(
        "[BMR Export Failure] Aborted: Control matrix nodes are malformed or do not match the required 4-node set."
      );
      return {
        ok: false,
        errorCode: "MALFORMED_NODE_MATRIX",
        message:
          "Control matrix node entries are malformed, duplicated, or missing required nodes.",
      };
    }

    const orgName = answers.organizationName.trim();
    const sector = answers.sector;
    const decisionStage = answers.decisionStage;

    const phase1Opt: SowOptionLevel = sowSelections.PHASE_01;
    const phase2Opt: SowOptionLevel = sowSelections.PHASE_02;
    const phase3Opt: SowOptionLevel = sowSelections.PHASE_03;

    // 5) Construct CSV Data Structure
    const csvRows: string[][] = [
      ["=== BMR CONTROL PLANE // FORENSIC DIAGNOSTIC COMPREHENSIVE EXPORT ==="],
      ["Organization", orgName],
      ["Sector", sector],
      ["Decision Stage", decisionStage],
      [
        "Evidence Standard",
        "No client network access, no raw code inspection, no confidential data ingestion.",
      ],
      [""],

      ["=== 1. HEADLINE QUANTIFIED FINANCIAL & CAPACITY METRICS ==="],
      ["Metric Description", "Value", "Operational Meaning"],
      ["AI Readiness Index", `${calculations.readinessIndex} / 100`, "Current Verification Control Baseline"],
      ["Process Waste Tax (Annual)", formatCurrency(calculations.processWasteTax), "Estimated Annualized Rework Friction"],
      ["Total Promise Gap Exposure", formatCurrency(calculations.promiseGapExposure), "Unmanaged Unverified Expansion Risk Ceiling"],
      ["Annual Capacity Waste", formatHours(calculations.annualCapacityHours), "Senior Engineering Latency Drag"],
      ["Weekly Burn Rate", `${formatCurrency(calculations.weeklyBurnRate)} / week`, "Immediate Direct Weekly Loss"],
      ["Target Recovery Multiplier", `${calculations.recoveryMultiplier}x ROI`, "Capital Recovery Potential"],
      [""],

      ["=== 2. QUAD-NODE CONTROL MATRIX ==="],
      ["Node ID", "Control Plane Node", "Observed Pattern", "Operational Impact", "Recommended Gate Blueprint", "Status"],
      ...nodeSummaries.map((node: NodeStatus) => [
        node.nodeId,
        node.name,
        node.observedPattern,
        node.operationalImpact,
        node.recommendedGate,
        node.status,
      ]),
      [""],

      ["=== 3. TARGET IMPLEMENTATION STATEMENT OF WORK (SOW) ==="],
      ["Phase", "Selected Option Level"],
      ["Phase 01 (Input Verification & Hardening)", phase1Opt],
      ["Phase 02 (Workflow & Isolation)", phase2Opt],
      ["Phase 03 (Continuous Governance Gates)", phase3Opt],
      [""],

      ["=== 4. REGULATORY NON-COMPLIANCE STANDARDS AUDIT ==="],
      ["Standard / Act", "Clause / Requirement", "Audit Finding & Operational Vulnerability"],
      ["ISO 9001:2015", "Clause 8.5.1", "[NON-COMPLIANT] Messaging anomalies create unmapped distribution risk."],
      ["HL7 FHIR v4", "Data Conformance", "[NON-COMPLIANT] Unstructured drift triggers serialization failures."],
      ["PCI-DSS v4.0", "Req 10.2", "[NON-COMPLIANT] Processing delays interrupt automated auditing boundaries."],
      ["SOX Act", "Section 404", "[NON-COMPLIANT] Telemetry friction degrades financial reporting controls."],
    ];

    // 6) Prepend UTF-8 BOM for Excel compatibility
    const csvContent =
      "\uFEFF" +
      csvRows
        .map((row) =>
          row
            .map((field) => `"${String(field).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    // 7) Client Blob Creation & Triggered Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const safeFilename = orgName.replace(/[^A-Za-z0-9_-]/g, "_");
    const filename = `BMR_Diagnostic_${safeFilename}.csv`;

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { ok: true };
  } catch (error) {
    console.error("[BMR Export Error] Failed to compile or download CSV report:", error);
    return {
      ok: false,
      errorCode: "EXPORT_RUNTIME_EXCEPTION",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected DOM runtime exception occurred.",
    };
  }
}
