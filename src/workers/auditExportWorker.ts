import type { AuditRecord } from "@/types/database.types";
import { isFiniteNumber } from "@/utils/auditGuards";
import { roundToInt, roundToTwoDecimals } from "@/utils/formatters";

export interface AuditReportExportPayload {
  auditId: string;
  timestamp: string;
  sector: string;
  headlineMetrics: {
    grossUpstreamHours: number;
    submergedProcessWasteTax: number;
    promiseGapIndex: number;
    isCriticalRisk: boolean;
  };
  nodeBreakdown: {
    node02OperationalDrag: {
      total: number;
      multiplier: number;
      score: number;
      penaltyDelta: number;
    };
    node03InternalRework: {
      total: number;
      multiplier: number;
      score: number;
      penaltyDelta: number;
    };
  };
  exposure: number;
}

export interface ExportWorkerInputMetrics {
  totalLaborTaxPool: number;
  internalReworkTax: number;
  operationalDragTax: number;
  verificationDebtPenalty: number;
  modelThrashingPenalty: number;
  exposure: number;
  promiseGapIndex: number;
  isCriticalRisk: boolean;
  scores: {
    operational_drag_score: number;
    verification_debt_score: number;
    promise_gap_index: number;
    operational_drag_multiplier: number;
    internal_rework_multiplier: number;
    upstream_gross_claimed_hrs: number;
  };
}

const safeNumber = (val: unknown, fallback: number): number => {
  return isFiniteNumber(val) ? val : fallback;
};

export function buildExportPayload(
  audit: AuditRecord,
  metrics: ExportWorkerInputMetrics
): AuditReportExportPayload {
  return {
    auditId:
      typeof audit.id === "string" && audit.id.trim().length > 0
        ? audit.id
        : "unknown-audit",
    timestamp:
      typeof audit.created_at === "string"
        ? audit.created_at
        : new Date().toISOString(),
    sector: audit.sector ?? "SERVICES",
    headlineMetrics: {
      grossUpstreamHours: roundToInt(
        safeNumber(metrics.scores.upstream_gross_claimed_hrs, 0)
      ),
      submergedProcessWasteTax: roundToInt(
        safeNumber(metrics.totalLaborTaxPool, 0)
      ),
      promiseGapIndex: roundToInt(safeNumber(metrics.promiseGapIndex, 0)),
      isCriticalRisk: Boolean(metrics.isCriticalRisk),
    },
    nodeBreakdown: {
      node02OperationalDrag: {
        total: roundToInt(safeNumber(metrics.operationalDragTax, 0)),
        multiplier: roundToTwoDecimals(
          safeNumber(metrics.scores.operational_drag_multiplier, 1.0)
        ),
        score: roundToInt(safeNumber(metrics.scores.operational_drag_score, 0)),
        penaltyDelta: roundToInt(safeNumber(metrics.modelThrashingPenalty, 0)),
      },
      node03InternalRework: {
        total: roundToInt(safeNumber(metrics.internalReworkTax, 0)),
        multiplier: roundToTwoDecimals(
          safeNumber(metrics.scores.internal_rework_multiplier, 1.0)
        ),
        score: roundToInt(
          safeNumber(metrics.scores.verification_debt_score, 0)
        ),
        penaltyDelta: roundToInt(safeNumber(metrics.verificationDebtPenalty, 0)),
      },
    },
    exposure: roundToInt(safeNumber(metrics.exposure, 0)),
  };
}

export async function dispatchPDFGeneration(
  audit: AuditRecord,
  metrics: ExportWorkerInputMetrics,
  pdfEndpoint: string = "/api/export/pdf"
): Promise<Blob> {
  const payload = buildExportPayload(audit, metrics);

  const response = await fetch(pdfEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`PDF export failed with status: ${response.status}`);
  }

  return await response.blob();
}
