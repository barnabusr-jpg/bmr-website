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

export interface GenerateSOWPdfInput {
  company: string;
  sector?: string;
  readinessIndex?: number;
  processWasteTax?: number;
  promiseGapExposure?: number;
  nodeMatrix?: NodeEvaluationRecord[];
  directives: SOWDirectivePayload[];
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
 * Generates a multi-page, zero-dependency binary PDF Blob containing the
 * Executive Metrics, Section 6 Quad-Node Control Matrix, and Selected SOW Tracks.
 */
export async function generatePdf(input: GenerateSOWPdfInput): Promise<Blob> {
  const company = (input.company || 'Target Organization').replace(/_/g, ' ');
  const sectorLabel = (input.sector || 'ENTERPRISE CONTROL PLANE')
    .replace(/_/g, ' ')
    .toUpperCase();
  const readiness = input.readinessIndex ?? 58;
  const wasteTax = Math.round(input.processWasteTax ?? 0);
  const promiseGap = Math.round(input.promiseGapExposure ?? 0);
  const nodes = input.nodeMatrix || [];
  const directives = input.directives || [];

  const pages: string[][] = [];
  let currentPageOps: string[] = [];
  let y = 740;

  // Initialize Page 1 active buffer immediately
  pages.push(currentPageOps);

  const startNewPage = () => {
    currentPageOps = [];
    pages.push(currentPageOps);
    y = 740;
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < 55 && currentPageOps.length > 0) {
      startNewPage();
    }
  };

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

  // Top Header Banner
  drawRect(45, 725, 522, 42, [0.06, 0.09, 0.16]);
  drawText('BMR SOLUTIONS // PRE-AUTOMATION CONTROL PLANE SOW DOSSIER', 58, 749, 11, true, [1, 1, 1]);
  drawText(`TARGET: ${company.toUpperCase()}  |  SECTOR: ${sectorLabel}`, 58, 735, 8, false, [0.8, 0.85, 0.9]);
  y = 702;

  // Executive Financial & Readiness Summary Cards
  drawText('01 // EXECUTIVE DIAGNOSTIC & FINANCIAL SUMMARY', 45, y, 10, true, [0.06, 0.09, 0.16]);
  y -= 12;

  const cardW = 166;
  const cardH = 52;
  const cardY = y - cardH;

  // Card 1: Readiness Index
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

  // Card 2: Process Waste Tax
  drawRect(45 + cardW + 12, cardY, cardW, cardH, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('PROCESS WASTE TAX (ANNUAL)', 55 + cardW + 12, cardY + 36, 7.5, true, [0.39, 0.45, 0.55]);
  drawText(`$${wasteTax.toLocaleString()}`, 55 + cardW + 12, cardY + 14, 15, true, [0.06, 0.09, 0.16]);

  // Card 3: Promise Gap Exposure
  drawRect(45 + (cardW + 12) * 2, cardY, cardW, cardH, [0.99, 0.95, 0.95], [0.98, 0.79, 0.79]);
  drawText('PROMISE GAP ANNUAL RISK', 55 + (cardW + 12) * 2, cardY + 36, 7.5, true, [0.73, 0.11, 0.11]);
  drawText(`$${promiseGap.toLocaleString()}`, 55 + (cardW + 12) * 2, cardY + 14, 15, true, [0.73, 0.11, 0.11]);

  y = cardY - 24;

  // Section 6: Quad-Node Control Matrix
  if (nodes.length > 0) {
    ensureSpace(180);
    drawText('02 // SECTION 6: QUAD-NODE CONTROL MATRIX (CONSOLIDATED VIEW)', 45, y, 10, true, [0.06, 0.09, 0.16]);
    y -= 18;

    drawRect(45, y - 16, 522, 20, [0.06, 0.09, 0.16]);
    drawText('CONTROL PLANE NODE', 52, y - 10, 7.5, true, [1, 1, 1]);
    drawText('OBSERVED PATTERN & RECOMMENDED GATE', 195, y - 10, 7.5, true, [1, 1, 1]);
    drawText('INSULATION', 435, y - 10, 7.5, true, [1, 1, 1]);
    drawText('STATUS', 495, y - 10, 7.5, true, [1, 1, 1]);
    y -= 20;

    for (const node of nodes) {
      const patternLines = wrapLines(node.observedPattern, 44);
      const gateLines = wrapLines(`Gate: ${node.recommendedGate}`, 44);
      const rowHeight = Math.max(46, (patternLines.length + gateLines.length) * 10 + 14);
      ensureSpace(rowHeight + 6);

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
        textCursor -= 10;
      });
      gateLines.forEach((line) => {
        drawText(line, 195, textCursor, 7.5, true, [0.06, 0.09, 0.16]);
        textCursor -= 10;
      });

      drawText(`${node.insulationIntegrityPct}%`, 443, y - 16, 9, true, [0.06, 0.09, 0.16]);

      drawRect(486, y - 22, 75, 14, badgeBg, badgeBorder);
      drawText(badge.label, 490, y - 18, 6.5, true, badgeText);
      drawText(badge.provenance, 486, y - 32, 5.5, false, [0.39, 0.45, 0.55]);

      y -= rowHeight;
    }

    y -= 20;
  }

  // Section 03: Authorized Statement of Work Directives
  ensureSpace(90);
  drawText('03 // AUTHORIZED STATEMENT OF WORK REMEDIATION TRACKS', 45, y, 10, true, [0.06, 0.09, 0.16]);
  y -= 16;

  directives.forEach((dir, idx) => {
    const scopeLines = wrapLines(dir.scope, 88);
    const impactLines = dir.businessImpact ? wrapLines(`Impact: ${dir.businessImpact}`, 88) : [];
    const boxH = 34 + (scopeLines.length + impactLines.length) * 11;
    ensureSpace(boxH + 10);

    drawRect(45, y - boxH, 522, boxH, [0.98, 0.99, 1], [0.85, 0.88, 0.92]);
    drawText(`0${idx + 1} // ${dir.title}`, 55, y - 15, 9.5, true, [0.06, 0.09, 0.16]);
    drawText(`[${dir.price.toUpperCase()}]`, 465, y - 15, 8, true, [0.02, 0.47, 0.34]);

    let lineY = y - 28;
    scopeLines.forEach((line) => {
      drawText(line, 55, lineY, 8, false, [0.28, 0.33, 0.41]);
      lineY -= 11;
    });
    impactLines.forEach((line) => {
      drawText(line, 55, lineY, 8, false, [0.2, 0.25, 0.33]);
      lineY -= 11;
    });

    y -= boxH + 10;
  });

  // Footer
  ensureSpace(35);
  y -= 6;
  drawText(
    'CONFIDENTIAL STATEMENT OF WORK // BMR SOLUTIONS PRE-AUTOMATION CONTROL PLANE GOVERNANCE (2026)',
    45,
    y,
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
