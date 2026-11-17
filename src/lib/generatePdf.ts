import {
  NodeEvaluationRecord,
  GateStatus,
} from '@/types/playbookExport';
import { getStatusProvenanceBadge } from '@/lib/playbookExportAdapter';

export interface SOWDirectivePayload {
  title: string;
  price: string;
  scope: string;
  businessImpact?: string;
}

export interface PdfRegulatoryAuditRow {
  standard: string;
  clause: string;
  finding: string;
  statutoryRemedy: string;
  remediationPhase: string;
}

export interface PdfGovernanceGates {
  dlpCeiling: string;
  mutationGate: string;
  driftTolerance: string;
  signOffTier: string;
}

export interface GenerateSOWPdfInput {
  company: string;
  sector?: string;
  readinessIndex?: number;
  processWasteTax?: number;
  promiseGapExposure?: number;
  nodeMatrix?: NodeEvaluationRecord[];
  directives: SOWDirectivePayload[];
  regulatoryItems?: PdfRegulatoryAuditRow[];
  governanceGates?: PdfGovernanceGates;
}

function escapePdfText(text: string): string {
  return String(text ?? '')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapLines(text: string, maxChars: number): string[] {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [''];
}

function hexToRgbNormalized(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return [0.06, 0.09, 0.16];
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [
    Number(r.toFixed(3)),
    Number(g.toFixed(3)),
    Number(b.toFixed(3)),
  ];
}

/**
 * Generates a multi-page, zero-dependency binary PDF Blob containing:
 * - Page 1: Executive Financial Summary, Section 6 Quad-Node Control Matrix, & Process Waste Ledger
 * - Page 2+: Client Industry Regulatory Compliance Audit, Control Plane Gates, & SOW Directives
 */
export async function generatePdf(input: GenerateSOWPdfInput): Promise<Blob> {
  const company = (input.company || 'Target Organization').replace(/_/g, ' ');
  const sectorLabel = (input.sector || 'ENTERPRISE CONTROL PLANE')
    .replace(/_/g, ' ')
    .toUpperCase();
  const readiness = Math.round(input.readinessIndex ?? 58);
  const wasteTax = Math.round(input.processWasteTax ?? 0);
  const promiseGap = Math.round(input.promiseGapExposure ?? 0);
  const nodes = input.nodeMatrix || [];
  const directives = input.directives || [];
  const regulatoryItems = input.regulatoryItems || [];

  const readinessGap = Math.max(0, Math.min(100, 100 - readiness));
  const defaultDlp = `$${(Math.round((wasteTax * 0.12) / 1000) * 1000 || 18000).toLocaleString()}`;
  const defaultMutation = `${Math.max(1, Math.round(readinessGap / 5))} Mutations / 10k Calls`;
  const gates: PdfGovernanceGates = input.governanceGates || {
    dlpCeiling: defaultDlp,
    mutationGate: defaultMutation,
    driftTolerance: '10.8%',
    signOffTier: wasteTax > 250000 ? 'EXECUTIVE BOARD LEVEL (CISO / CTO)' : 'PLATFORM STEERCO',
  };

  const pages: string[][] = [];
  let currentPageOps: string[] = [];
  let y = 740;

  pages.push(currentPageOps);

  const drawText = (
    text: string,
    x: number,
    yPos: number,
    size = 10,
    bold = false,
    rgb: [number, number, number] = [0.06, 0.09, 0.16]
  ) => {
    const font = bold ? '/F2' : '/F1';
    currentPageOps.push(
      `BT ${rgb[0]} ${rgb[1]} ${rgb[2]} rg ${font} ${size} Tf 1 0 0 1 ${x} ${yPos} Tm (${escapePdfText(text)}) Tj ET`
    );
  };

  const drawRect = (
    x: number,
    yPos: number,
    w: number,
    h: number,
    fillRgb?: [number, number, number],
    strokeRgb?: [number, number, number]
  ) => {
    if (fillRgb) {
      currentPageOps.push(`${fillRgb[0]} ${fillRgb[1]} ${fillRgb[2]} rg`);
    }
    if (strokeRgb) {
      currentPageOps.push(`${strokeRgb[0]} ${strokeRgb[1]} ${strokeRgb[2]} RG 0.75 w`);
    }
    const mode = fillRgb && strokeRgb ? 'B' : fillRgb ? 'f' : 'S';
    currentPageOps.push(`${x} ${yPos} ${w} ${h} re ${mode}`);
  };

  const startNewPage = (subHeader?: string) => {
    currentPageOps = [];
    pages.push(currentPageOps);
    drawRect(45, 744, 522, 24, [0.06, 0.09, 0.16]);
    drawText(
      `BMR SOLUTIONS // DIAGNOSTIC & SOW DOSSIER — ${company.toUpperCase()}`,
      56,
      752,
      8.5,
      true,
      [1, 1, 1]
    );
    if (subHeader) {
      const subX = Math.max(340, 556 - Math.round(subHeader.length * 4.3));
      drawText(subHeader, subX, 752, 7.5, false, [0.8, 0.85, 0.9]);
    }
    y = 720;
  };

  const ensureSpace = (needed: number, continuationHeader?: string) => {
    if (y - needed < 48 && currentPageOps.length > 0) {
      startNewPage(continuationHeader);
    }
  };

  // =========================================================================
  // PAGE 1: BANNER + EXECUTIVE METRICS + QUAD-NODE MATRIX + WASTE LEDGER
  // =========================================================================
  drawRect(45, 725, 522, 42, [0.06, 0.09, 0.16]);
  drawText('BMR SOLUTIONS // PRE-AUTOMATION CONTROL PLANE SOW DOSSIER', 58, 749, 11, true, [1, 1, 1]);
  drawText(`TARGET: ${company.toUpperCase()}  |  SECTOR: ${sectorLabel}`, 58, 735, 8, false, [0.8, 0.85, 0.9]);
  y = 702;

  // Section 01: Executive Diagnostic & Financial Summary
  drawText('01 // EXECUTIVE DIAGNOSTIC & FINANCIAL SUMMARY', 45, y, 10, true, [0.06, 0.09, 0.16]);
  y -= 12;

  const cardW = 166;
  const cardH = 52;
  const cardY = y - cardH;

  drawRect(45, cardY, cardW, cardH, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('AI READINESS INDEX', 55, cardY + 36, 7.5, true, [0.39, 0.45, 0.55]);
  drawText(
    `${readiness} / 100`,
    55,
    cardY + 14,
    16,
    true,
    readiness >= 70 ? [0.02, 0.47, 0.34] : [0.73, 0.11, 0.11]
  );

  drawRect(45 + cardW + 12, cardY, cardW, cardH, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('PROCESS WASTE TAX (ANNUAL)', 55 + cardW + 12, cardY + 36, 7.5, true, [0.39, 0.45, 0.55]);
  drawText(`$${wasteTax.toLocaleString()}`, 55 + cardW + 12, cardY + 14, 15, true, [0.06, 0.09, 0.16]);

  drawRect(45 + (cardW + 12) * 2, cardY, cardW, cardH, [0.99, 0.95, 0.95], [0.98, 0.79, 0.79]);
  drawText('PROMISE GAP ANNUAL RISK', 55 + (cardW + 12) * 2, cardY + 36, 7.5, true, [0.73, 0.11, 0.11]);
  drawText(`$${promiseGap.toLocaleString()}`, 55 + (cardW + 12) * 2, cardY + 14, 15, true, [0.73, 0.11, 0.11]);

  y = cardY - 22;

  // Section 02: Quad-Node Control Matrix (Consolidated View)
  if (nodes.length > 0) {
    ensureSpace(170, 'SECTION 6 MATRIX');
    drawText('02 // SECTION 6: QUAD-NODE CONTROL MATRIX (CONSOLIDATED VIEW)', 45, y, 10, true, [0.06, 0.09, 0.16]);
    y -= 16;

    drawRect(45, y - 16, 522, 20, [0.06, 0.09, 0.16]);
    drawText('CONTROL PLANE NODE', 52, y - 10, 7.5, true, [1, 1, 1]);
    drawText('OBSERVED PATTERN & RECOMMENDED GATE', 195, y - 10, 7.5, true, [1, 1, 1]);
    drawText('INSULATION', 435, y - 10, 7.5, true, [1, 1, 1]);
    drawText('STATUS', 495, y - 10, 7.5, true, [1, 1, 1]);
    y -= 20;

    for (const node of nodes) {
      const patternLines = wrapLines(node.observedPattern, 44);
      const gateLines = wrapLines(`Gate: ${node.recommendedGate}`, 44);
      const rowHeight = Math.max(44, (patternLines.length + gateLines.length) * 9.5 + 14);
      ensureSpace(rowHeight + 6, 'SECTION 6 MATRIX');

      const badge = getStatusProvenanceBadge(
        node.status as GateStatus,
        node.statusSource
      );
      const badgeBg = hexToRgbNormalized(badge.pdfBgHex);
      const badgeBorder = hexToRgbNormalized(badge.pdfBorderHex);
      const badgeText = hexToRgbNormalized(badge.pdfTextHex);

      drawRect(45, y - rowHeight, 522, rowHeight, [1, 1, 1], [0.88, 0.91, 0.94]);

      const nodeTitleLines = wrapLines(node.nodeLabel, 24);
      nodeTitleLines.forEach((line, idx) => {
        drawText(line, 52, y - 14 - idx * 10, 8, true, [0.06, 0.09, 0.16]);
      });

      let textCursor = y - 13;
      patternLines.forEach((line) => {
        drawText(line, 195, textCursor, 7.5, false, [0.2, 0.25, 0.33]);
        textCursor -= 9.5;
      });
      gateLines.forEach((line) => {
        drawText(line, 195, textCursor, 7.5, true, [0.06, 0.09, 0.16]);
        textCursor -= 9.5;
      });

      drawText(`${node.insulationIntegrityPct}%`, 443, y - 16, 9, true, [0.06, 0.09, 0.16]);

      drawRect(486, y - 22, 75, 14, badgeBg, badgeBorder);
      drawText(badge.label, 490, y - 18, 6.5, true, badgeText);
      drawText(badge.provenance, 486, y - 32, 5.5, false, [0.39, 0.45, 0.55]);

      y -= rowHeight;
    }

    y -= 20;
  }

  // Section 03: Process Waste Tax & Capacity Loss Ledger
  ensureSpace(140, 'WASTE TAX LEDGER');
  drawText('03 // PROCESS WASTE TAX & CAPACITY LOSS LEDGER', 45, y, 10, true, [0.06, 0.09, 0.16]);
  y -= 16;

  drawRect(45, y - 16, 522, 20, [0.94, 0.96, 0.98], [0.85, 0.88, 0.92]);
  drawText('COST VECTOR CATEGORY', 52, y - 10, 7.5, true, [0.2, 0.25, 0.33]);
  drawText('OPERATIONAL FRICTION ROOT CAUSE', 225, y - 10, 7.5, true, [0.2, 0.25, 0.33]);
  drawText('ANNUAL IMPACT', 490, y - 10, 7.5, true, [0.2, 0.25, 0.33]);
  y -= 20;

  const ledgerRows = [
    {
      vector: 'API Architecture & Pipeline Drift',
      cause: 'Schema mutations without contract enforcement trigger downstream breaks.',
      impact: Math.round(wasteTax * 0.45),
    },
    {
      vector: 'Alert Fatigue & Manual Triage',
      cause: 'Noisy telemetry and unprioritized alerts consume engineering cycles.',
      impact: Math.round(wasteTax * 0.35),
    },
    {
      vector: 'Governance & Context Drift',
      cause: 'Unmonitored payload ingestion creates repetitive compliance rework.',
      impact: Math.round(wasteTax * 0.20),
    },
  ];

  for (const row of ledgerRows) {
    const rowH = 26;
    ensureSpace(rowH + 4, 'WASTE TAX LEDGER');
    drawRect(45, y - rowH, 522, rowH, [1, 1, 1], [0.88, 0.91, 0.94]);
    drawText(row.vector, 52, y - 16, 8, true, [0.06, 0.09, 0.16]);
    drawText(row.cause, 225, y - 16, 7.5, false, [0.28, 0.33, 0.41]);
    drawText(`$${row.impact.toLocaleString()}`, 495, y - 16, 8, true, [0.06, 0.09, 0.16]);
    y -= rowH;
  }

  // Total Row
  drawRect(45, y - 24, 522, 24, [0.97, 0.98, 0.99], [0.75, 0.8, 0.86]);
  drawText('TOTAL CONSOLIDATED PROCESS WASTE TAX', 52, y - 15, 8, true, [0.06, 0.09, 0.16]);
  drawText(`$${wasteTax.toLocaleString()}`, 492, y - 15, 8.5, true, [0.73, 0.11, 0.11]);
  y -= 36;

  // =========================================================================
  // PAGE 2: REGULATORY AUDIT + CONTROL PLANE GATES + AUTHORIZED SOW TRACKS
  // =========================================================================
  startNewPage('GOVERNANCE & SOW SPECIFICATION');

  // Section 04: Client Industry Regulatory Compliance Audit
  drawText(`04 // REGULATORY NON-COMPLIANCE STANDARDS AUDIT (${sectorLabel})`, 45, y, 10, true, [0.06, 0.09, 0.16]);
  y -= 14;

  const effectiveRegItems: PdfRegulatoryAuditRow[] =
    regulatoryItems.length > 0
      ? regulatoryItems
      : [
          {
            standard: 'ISO 9001:2015',
            clause: 'Clause 8.5.1',
            finding: 'Uncontrolled schema alterations in production messaging queues.',
            statutoryRemedy: 'Enforce strict schema validation contracts prior to execution.',
            remediationPhase: 'PHASE 01',
          },
          {
            standard: 'SOC 2 Type II',
            clause: 'CC7.2 / CC8.1',
            finding: 'Telemetry saturation and alert desensitization obscure anomaly detection.',
            statutoryRemedy: 'Deploy sliding-window telemetry filtering & escalation thresholds.',
            remediationPhase: 'PHASE 02',
          },
        ];

  for (const reg of effectiveRegItems) {
    const findingLines = wrapLines(reg.finding, 86);
    const remedyLines = wrapLines(`Remedy (${reg.remediationPhase}): ${reg.statutoryRemedy}`, 86);
    const cardHeight = 20 + (findingLines.length + remedyLines.length) * 9.5;
    ensureSpace(cardHeight + 6, 'REGULATORY AUDIT');

    drawRect(45, y - cardHeight, 522, cardHeight, [1, 1, 1], [0.88, 0.91, 0.94]);
    drawRect(52, y - 15, 68, 11, [0.86, 0.15, 0.15]);
    drawText('NON-COMPLIANT', 55, y - 12, 6, true, [1, 1, 1]);
    drawText(`${reg.standard} // ${reg.clause}`, 128, y - 13, 8, true, [0.06, 0.09, 0.16]);

    let cursor = y - 24;
    findingLines.forEach((line) => {
      drawText(line, 54, cursor, 7.5, false, [0.25, 0.3, 0.38]);
      cursor -= 9.5;
    });
    remedyLines.forEach((line) => {
      drawText(line, 54, cursor, 7.5, true, [0.06, 0.09, 0.16]);
      cursor -= 9.5;
    });

    y -= cardHeight + 6;
  }

  y -= 10;

  // Section 05: Calibrated Pre-Automation Control Plane Gates
  ensureSpace(85, 'CONTROL PLANE GATES');
  drawText(`05 // CALIBRATED CONTROL PLANE GATES (${gates.signOffTier})`, 45, y, 10, true, [0.06, 0.09, 0.16]);
  y -= 12;

  const gateCardY = y - 44;
  drawRect(45, gateCardY, cardW, 44, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('DLP RISK EXPOSURE CEILING', 54, gateCardY + 30, 7, true, [0.39, 0.45, 0.55]);
  drawText(gates.dlpCeiling, 54, gateCardY + 12, 12, true, [0.06, 0.09, 0.16]);

  drawRect(45 + cardW + 12, gateCardY, cardW, 44, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('API SCHEMA MUTATION GATE', 54 + cardW + 12, gateCardY + 30, 7, true, [0.39, 0.45, 0.55]);
  drawText(gates.mutationGate, 54 + cardW + 12, gateCardY + 12, 11, true, [0.06, 0.09, 0.16]);

  drawRect(45 + (cardW + 12) * 2, gateCardY, cardW, 44, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('MAX PROCESS DRIFT TOLERANCE', 54 + (cardW + 12) * 2, gateCardY + 30, 7, true, [0.39, 0.45, 0.55]);
  drawText(`${gates.driftTolerance} (${readinessGap}% Gap)`, 54 + (cardW + 12) * 2, gateCardY + 12, 11, true, [0.06, 0.09, 0.16]);

  y = gateCardY - 18;

  // Section 06: Authorized Statement of Work Remediation Tracks
  ensureSpace(80, 'SOW REMEDIATION TRACKS');
  drawText('06 // AUTHORIZED STATEMENT OF WORK REMEDIATION TRACKS', 45, y, 10, true, [0.06, 0.09, 0.16]);
  y -= 14;

  directives.forEach((dir, idx) => {
    const scopeLines = wrapLines(dir.scope, 88);
    const impactLines = dir.businessImpact ? wrapLines(`Impact: ${dir.businessImpact}`, 88) : [];
    const boxH = 30 + (scopeLines.length + impactLines.length) * 10;
    ensureSpace(boxH + 8, 'SOW REMEDIATION TRACKS');

    drawRect(45, y - boxH, 522, boxH, [0.98, 0.99, 1], [0.85, 0.88, 0.92]);
    drawText(`0${idx + 1} // ${dir.title}`, 55, y - 14, 9.5, true, [0.06, 0.09, 0.16]);
    drawText(`[${dir.price.toUpperCase()}]`, 465, y - 14, 8, true, [0.02, 0.47, 0.34]);

    let lineY = y - 26;
    scopeLines.forEach((line) => {
      drawText(line, 55, lineY, 8, false, [0.28, 0.33, 0.41]);
      lineY -= 10;
    });
    impactLines.forEach((line) => {
      drawText(line, 55, lineY, 8, false, [0.2, 0.25, 0.33]);
      lineY -= 10;
    });

    y -= boxH + 8;
  });

  // Pin confidentiality footer cleanly into bottom margin of the final page
  drawText(
    'CONFIDENTIAL STATEMENT OF WORK // BMR SOLUTIONS PRE-AUTOMATION CONTROL PLANE GOVERNANCE (2026)',
    45,
    32,
    7.5,
    true,
    [0.45, 0.5, 0.58]
  );

  // Assemble valid PDF 1.4 binary structure
  const nonEmptyPages = pages.filter((p) => p.length > 0);
  const objects: string[] = [];
  const addObj = (body: string): number => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObj('');
  const pagesId = addObj('');
  const fontRegularId = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const fontBoldId = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  const pageIds: number[] = [];

  for (const pageOps of nonEmptyPages) {
    const stream = pageOps.join('\n');
    const contentId = addObj(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageId = addObj(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`
    );
    pageIds.push(pageId);
  }

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  objects.forEach((obj, idx) => {
    offsets.push(pdf.length);
    pdf += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}
