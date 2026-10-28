import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import type { AuditReportExportPayload } from "@/workers/auditExportWorker";
import { PDFPromiseGapDocument } from "@/components/PDFPromiseGapDocument";

export const runtime = "nodejs";

const isFiniteNumber = (val: unknown): val is number => {
  return typeof val === "number" && Number.isFinite(val);
};

const isValidIsoDate = (val: unknown): val is string => {
  if (typeof val !== "string" || val.trim().length === 0) {
    return false;
  }

  const isStrictIsoTimestamp =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}:\d{2})$/.test(val);

  if (!isStrictIsoTimestamp) {
    return false;
  }

  const timestamp = Date.parse(val);
  return Number.isFinite(timestamp);
};

function isValidExportPayload(data: unknown): data is AuditReportExportPayload {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  // 1. Root Level Fields
  if (
    !("auditId" in data && typeof data.auditId === "string" && data.auditId.trim().length > 0) ||
    !("timestamp" in data && isValidIsoDate(data.timestamp)) ||
    !("sector" in data && typeof data.sector === "string" && data.sector.trim().length > 0) ||
    !("exposure" in data && isFiniteNumber(data.exposure))
  ) {
    return false;
  }

  // 2. Headline Metrics
  if (!("headlineMetrics" in data && typeof data.headlineMetrics === "object" && data.headlineMetrics !== null)) {
    return false;
  }

  const hm = data.headlineMetrics;
  if (
    !("grossUpstreamHours" in hm && isFiniteNumber(hm.grossUpstreamHours)) ||
    !("submergedProcessWasteTax" in hm && isFiniteNumber(hm.submergedProcessWasteTax)) ||
    !("promiseGapIndex" in hm && isFiniteNumber(hm.promiseGapIndex)) ||
    !("isCriticalRisk" in hm && typeof hm.isCriticalRisk === "boolean")
  ) {
    return false;
  }

  // 3. Node Breakdown Structure
  if (!("nodeBreakdown" in data && typeof data.nodeBreakdown === "object" && data.nodeBreakdown !== null)) {
    return false;
  }

  const nb = data.nodeBreakdown;
  if (
    !("node02OperationalDrag" in nb && typeof nb.node02OperationalDrag === "object" && nb.node02OperationalDrag !== null) ||
    !("node03InternalRework" in nb && typeof nb.node03InternalRework === "object" && nb.node03InternalRework !== null)
  ) {
    return false;
  }

  const isValidNodeMetrics = (node: Record<string, unknown>): boolean => {
    return (
      "total" in node && isFiniteNumber(node.total) &&
      "multiplier" in node && isFiniteNumber(node.multiplier) &&
      "score" in node && isFiniteNumber(node.score) &&
      "penaltyDelta" in node && isFiniteNumber(node.penaltyDelta)
    );
  };

  return isValidNodeMetrics(nb.node02OperationalDrag) && isValidNodeMetrics(nb.node03InternalRework);
}

function nodeStreamToWebStream(nodeStream: NodeJS.ReadableStream): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      nodeStream.on("data", (chunk: Uint8Array | string) => {
        if (typeof chunk === "string") {
          controller.enqueue(new TextEncoder().encode(chunk));
        } else {
          controller.enqueue(chunk);
        }
      });
      nodeStream.on("end", () => {
        controller.close();
      });
      nodeStream.on("error", (err: Error) => {
        controller.error(err);
      });
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody: unknown = await req.json();

    if (!isValidExportPayload(rawBody)) {
      return NextResponse.json(
        { error: "Invalid AuditReportExportPayload schema" },
        { status: 400 }
      );
    }

    const nodeStream = await renderToStream(
      React.createElement(PDFPromiseGapDocument, { data: rawBody })
    );

    const webStream = nodeStreamToWebStream(nodeStream);

    const safeAuditId = rawBody.auditId.replace(/[^a-zA-Z0-9_-]/g, "");

    return new Response(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="BMR-Audit-${safeAuditId || "export"}.pdf"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "PDF rendering failure";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
