import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { AuditReportExportPayload } from "@/workers/auditExportWorker";
import {
  formatBMRCurrency,
  formatBMRMultiplier,
  formatBMRExpactation,
} from "@/utils/formatters";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#09090b",
    color: "#f4f4f5",
    padding: 36,
    fontFamily: "Helvetica",
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
    paddingBottom: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  kicker: {
    fontSize: 9,
    color: "#a1a1aa",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  scoreBadgeContainer: {
    alignItems: "flex-end",
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  criticalBadge: {
    marginTop: 4,
    backgroundColor: "#4c0519",
    borderWidth: 1,
    borderColor: "#f43f5e",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 8,
    fontWeight: "bold",
    color: "#fecdd3",
  },
  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  cardGreen: {
    flex: 1,
    backgroundColor: "#022c22",
    borderWidth: 1,
    borderColor: "#065f46",
    borderRadius: 6,
    padding: 14,
  },
  cardRed: {
    flex: 1,
    backgroundColor: "#4c0519",
    borderWidth: 1,
    borderColor: "#9f1239",
    borderRadius: 6,
    padding: 14,
  },
  cardLabelGreen: {
    fontSize: 8,
    color: "#34d399",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  cardLabelRed: {
    fontSize: 8,
    color: "#fb7185",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  metricLargeGreen: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a7f3d0",
    marginBottom: 4,
  },
  metricLargeRed: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fecdd3",
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 8,
    color: "#a1a1aa",
    lineHeight: 1.3,
  },
  breakdownSection: {
    borderTopWidth: 1,
    borderTopColor: "#27272a",
    paddingTop: 16,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 9,
  },
  nodeLabel: {
    color: "#d4d4d8",
  },
  nodeMetric: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  multiplierText: {
    color: "#71717a",
    fontWeight: "normal",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: "#27272a",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#71717a",
  },
});

interface PDFPromiseGapDocumentProps {
  data: AuditReportExportPayload;
}

export const PDFPromiseGapDocument: React.FC<PDFPromiseGapDocumentProps> = ({
  data,
}) => {
  const { headlineMetrics, nodeBreakdown, auditId, timestamp, sector } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.kicker}>
              BMR QuadNode Diagnostic — {sector}
            </Text>
            <Text style={styles.title}>Promise Gap™ Forensic Brief</Text>
          </View>
          <View style={styles.scoreBadgeContainer}>
            <Text style={styles.scoreValue}>
              {headlineMetrics.promiseGapIndex}
              <Text style={{ fontSize: 12, color: "#71717a" }}>/100</Text>
            </Text>
            {headlineMetrics.isCriticalRisk && (
              <Text style={styles.criticalBadge}>
                PROMISE GAP™ RISK: CRITICAL
              </Text>
            )}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.cardGreen}>
            <Text style={styles.cardLabelGreen}>
              Upstream Claim (Visible Speed)
            </Text>
            <Text style={styles.metricLargeGreen}>
              {formatBMRExpactation(headlineMetrics.grossUpstreamHours)}
            </Text>
            <Text style={styles.cardSubtext}>
              Reported gross efficiency and seat adoption prior to downstream rework modulation.
            </Text>
          </View>

          <View style={styles.cardRed}>
            <Text style={styles.cardLabelRed}>
              Submerged Process Waste Tax
            </Text>
            <Text style={styles.metricLargeRed}>
              {formatBMRCurrency(headlineMetrics.submergedProcessWasteTax)}
            </Text>
            <Text style={styles.cardSubtext}>
              Downstream operational drag and verification deficit absorbed across the labor pool.
            </Text>
          </View>
        </View>

        <View style={styles.breakdownSection}>
          <View style={styles.breakdownRow}>
            <Text style={styles.nodeLabel}>
              NODE_02_AVS_02: Model Thrashing (Operational Drag Tax)
            </Text>
            <Text style={styles.nodeMetric}>
              {formatBMRCurrency(nodeBreakdown.node02OperationalDrag.total)}
              <Text style={styles.multiplierText}>
                {" "}
                ({formatBMRMultiplier(nodeBreakdown.node02OperationalDrag.multiplier)})
              </Text>
            </Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.nodeLabel}>
              NODE_03_AVS_02: Verification Debt (Internal Rework Tax)
            </Text>
            <Text style={styles.nodeMetric}>
              {formatBMRCurrency(nodeBreakdown.node03InternalRework.total)}
              <Text style={styles.multiplierText}>
                {" "}
                ({formatBMRMultiplier(nodeBreakdown.node03InternalRework.multiplier)})
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>Audit ID: {auditId}</Text>
          <Text>Generated: {timestamp}</Text>
        </View>
      </Page>
    </Document>
  );
};
