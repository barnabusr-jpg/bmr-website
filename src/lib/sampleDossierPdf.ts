function utf8ByteLength(s: string): number {
  return new TextEncoder().encode(s).length;
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

/**
 * Generates a 2-page "Template-True + Redacted" Sample Executive Dossier PDF.
 * Completely isolated: accepts no customer inputs and imports zero proprietary
 * calculus, regulatory, or adapter modules.
 */
export async function generateRedactedSamplePdf(): Promise<Blob> {
  const pages: string[][] = [];
  let ops: string[] = [];
  let y = 740;
  pages.push(ops);

  const drawText = (
    text: string,
    x: number,
    yPos: number,
    size = 10,
    bold = false,
    rgb: [number, number, number] = [0.06, 0.09, 0.16]
  ) => {
    const font = bold ? '/F2' : '/F1';
    ops.push(
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
    if (fillRgb) ops.push(`${fillRgb[0]} ${fillRgb[1]} ${fillRgb[2]} rg`);
    if (strokeRgb) ops.push(`${strokeRgb[0]} ${strokeRgb[1]} ${strokeRgb[2]} RG 0.75 w`);
    const mode = fillRgb && strokeRgb ? 'B' : fillRgb ? 'f' : 'S';
    ops.push(`${x} ${yPos} ${w} ${h} re ${mode}`);
  };

  // =========================================================================
  // PAGE 1: EXECUTIVE SUMMARY + RISK LEDGER SNAPSHOT (BOUNDED RANGES)
  // =========================================================================
  drawRect(45, 725, 522, 42, [0.06, 0.09, 0.16]);
  drawText('BMR SOLUTIONS // PRE-AUTOMATION CONTROL PLANE DOSSIER', 58, 749, 10.5, true, [1, 1, 1]);
  drawText('ENTITY: [REDACTED ENTERPRISE BENCHMARK]  |  ARTIFACT: SAMPLE EXECUTIVE PREVIEW', 58, 735, 7.5, false, [0.8, 0.85, 0.9]);
  drawRect(482, 744, 74, 15, [0.73, 0.11, 0.11]);
  drawText('SAMPLE / REDACTED', 487, 749, 6.2, true, [1, 1, 1]);

  y = 702;

  // Section 01: Executive Summary
  drawText('01 // EXECUTIVE SUMMARY & EXPOSURE SNAPSHOT (ILLUSTRATIVE RANGES)', 45, y, 10, true);
  y -= 12;

  const cardW = 166;
  const cardH = 52;
  const cardY = y - cardH;

  drawRect(45, cardY, cardW, cardH, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('CONTROL READINESS BAND', 55, cardY + 36, 7.2, true, [0.39, 0.45, 0.55]);
  drawText('55 - 65 / 100', 55, cardY + 14, 14.5, true, [0.73, 0.11, 0.11]);

  drawRect(45 + cardW + 12, cardY, cardW, cardH, [0.97, 0.98, 0.99], [0.85, 0.88, 0.92]);
  drawText('PROCESS WASTE TAX RANGE', 55 + cardW + 12, cardY + 36, 7.2, true, [0.39, 0.45, 0.55]);
  drawText('$850k - $1.2M / Yr', 55 + cardW + 12, cardY + 14, 13.5, true, [0.06, 0.09, 0.16]);

  drawRect(45 + (cardW + 12) * 2, cardY, cardW, cardH, [0.99, 0.95, 0.95], [0.98, 0.79, 0.79]);
  drawText('THE PROMISE GAP (TM) EXPOSURE', 55 + (cardW + 12) * 2, cardY + 36, 7.2, true, [0.73, 0.11, 0.11]);
  drawText('$1.5M - $2.2M / Yr', 55 + (cardW + 12) * 2, cardY + 14, 13.5, true, [0.73, 0.11, 0.11]);

  y = cardY - 18;

  // Narrative Executive Brief Box
  drawRect(45, y - 108, 522, 108, [0.98, 0.99, 1], [0.85, 0.88, 0.92]);
  drawText(
    'ILLUSTRATIVE OUTPUT FOR DEMONSTRATION ONLY. NOT A LIVE ASSESSMENT.',
    56,
    y - 14,
    7.2,
    true,
    [0.73, 0.11, 0.11]
  );

  drawText('WHAT WE FOUND:', 56, y - 30, 8, true);
  drawText(
    'Cross-layer triangulation surfaced Level 2 gating gaps, lineage traceability weaknesses, and change-control brittleness.',
    138,
    y - 30,
    7.8,
    false,
    [0.2, 0.25, 0.33]
  );

  drawText('WHY IT MATTERS:', 56, y - 48, 8, true);
  drawText(
    'Uninsulated upstream mutations compound into recurring Process Waste Tax, manual triage loops, and audit exposure.',
    138,
    y - 48,
    7.8,
    false,
    [0.2, 0.25, 0.33]
  );

  drawText('TOP 3 PRIORITIES:', 56, y - 68, 8, true);
  drawText('1. Enforce deterministic pre-ingestion schema & sensitivity gates prior to AI execution.', 138, y - 68, 7.8, false, [0.06, 0.09, 0.16]);
  drawText('2. Decouple noisy operational telemetry into rate-limited, actionable escalation runbooks.', 138, y - 81, 7.8, false, [0.06, 0.09, 0.16]);
  drawText('3. Establish executive circuit-breaker thresholds and immutable decision lineage.', 138, y - 94, 7.8, false, [0.06, 0.09, 0.16]);

  y -= 126;

  // Section 02: Risk Ledger Snapshot
  drawText('02 // PROCESS WASTE TAX RISK LEDGER SNAPSHOT', 45, y, 10, true);
  y -= 16;

  drawRect(45, y - 18, 522, 20, [0.06, 0.09, 0.16]);
  drawText('RISK AREA', 52, y - 11, 7.2, true, [1, 1, 1]);
  drawText('SYMPTOM OBSERVED & EVIDENCE TYPE', 165, y - 11, 7.2, true, [1, 1, 1]);
  drawText('IMPACT RANGE', 375, y - 11, 7.2, true, [1, 1, 1]);
  drawText('RECOMMENDED GATE', 452, y - 11, 7.2, true, [1, 1, 1]);
  y -= 18;

  const ledgerItems = [
    {
      area: 'Schema & Pipeline Drift',
      symptom: 'Upstream API changes propagate unvalidated into model context.',
      evidence: 'Evidence: Schema change lacks wrapper',
      impact: '$350k - $500k',
      gate: 'Pre-Ingestion Contract Gate',
    },
    {
      area: 'Telemetry Alert Fatigue',
      symptom: 'Unfiltered warning loops exhaust engineering triage bandwidth.',
      evidence: 'Evidence: Escalation thresholds uncalibrated',
      impact: '$280k - $400k',
      gate: 'Sliding-Window Noise Filter',
    },
    {
      area: 'Runtime Lineage Gaps',
      symptom: 'Automated outputs lack deterministic input provenance.',
      evidence: 'Evidence: Runtime lineage unavailable',
      impact: '$220k - $300k',
      gate: 'Shadow Staging & Audit Gate',
    },
    {
      area: 'Fiduciary & Policy Drift',
      symptom: 'Autonomous writes execute without risk-ceiling circuit breakers.',
      evidence: 'Evidence: Sign-off ceiling unverified',
      impact: '$1.5M - $2.2M*',
      gate: 'SteerCo Circuit-Breaker Gate',
    },
  ];

  for (const item of ledgerItems) {
    const symLines = wrapLines(item.symptom, 36);
    const gateLines = wrapLines(item.gate, 20);
    const rowH = Math.max(42, (symLines.length + 1) * 10 + 10);

    drawRect(45, y - rowH, 522, rowH, [1, 1, 1], [0.88, 0.91, 0.94]);
    drawText(item.area, 52, y - 15, 8, true);

    let cursor = y - 14;
    symLines.forEach((l) => {
      drawText(l, 165, cursor, 7.5, false, [0.2, 0.25, 0.33]);
      cursor -= 10;
    });
    drawText(item.evidence, 165, cursor, 7, true, [0.39, 0.45, 0.55]);

    drawText(item.impact, 375, y - 16, 8, true, [0.73, 0.11, 0.11]);

    gateLines.forEach((l, idx) => {
      drawText(l, 452, y - 15 - idx * 10, 7.5, true, [0.06, 0.09, 0.16]);
    });

    y -= rowH;
  }

  drawText(
    '*Unhedged regulatory & contractual exposure range. Exact figures unlocked during live diagnostic calibration.',
    45,
    y - 14,
    7,
    false,
    [0.45, 0.5, 0.58]
  );
  drawText(
    'SAMPLE ARTIFACT // BMR SOLUTIONS LEVEL 2 CONTROL PLANE DIAGNOSTIC (PROPRIETARY WEIGHTS REDACTED)',
    45,
    32,
    7.2,
    true,
    [0.45, 0.5, 0.58]
  );

  // =========================================================================
  // PAGE 2: CONTROLS READINESS HEATMAP + AUDIT-READY APPENDIX (REDACTED)
  // =========================================================================
  ops = [];
  pages.push(ops);

  drawRect(45, 744, 522, 24, [0.06, 0.09, 0.16]);
  drawText('BMR SOLUTIONS // SAMPLE EXECUTIVE DOSSIER — [REDACTED BENCHMARK]', 56, 752, 8.5, true, [1, 1, 1]);
  drawText('CONTROLS HEATMAP & APPENDIX', 412, 752, 7.5, false, [0.8, 0.85, 0.9]);
  y = 716;

  // Section 03: Controls Readiness Heatmap
  drawText('03 // LEVEL 2 CONTROL PLANE READINESS HEATMAP (QUALITATIVE POSTURE)', 45, y, 10, true);
  y -= 16;

  drawRect(45, y - 18, 522, 20, [0.94, 0.96, 0.98], [0.85, 0.88, 0.92]);
  drawText('CONTROL PLANE LAYER', 52, y - 11, 7.2, true, [0.2, 0.25, 0.33]);
  drawText('GOVERNANCE & EXECUTION SCOPE', 210, y - 11, 7.2, true, [0.2, 0.25, 0.33]);
  drawText('POSTURE STATUS', 468, y - 11, 7.2, true, [0.2, 0.25, 0.33]);
  y -= 18;

  const heatmapRows: Array<{
    layer: string;
    scope: string;
    status: 'NEEDS GATE' | 'PARTIAL' | 'VERIFIED';
    bg: [number, number, number];
    border: [number, number, number];
    fg: [number, number, number];
  }> = [
    {
      layer: 'Executive & Fiduciary Layer',
      scope: 'Risk ceiling sign-off, escalation authority & statutory accountability',
      status: 'NEEDS GATE',
      bg: [0.99, 0.95, 0.95],
      border: [0.98, 0.79, 0.79],
      fg: [0.73, 0.11, 0.11],
    },
    {
      layer: 'Engineering & Ingestion Layer',
      scope: 'Schema validation wrappers, API contract enforcement & circuit breakers',
      status: 'VERIFIED',
      bg: [0.93, 0.99, 0.96],
      border: [0.65, 0.95, 0.82],
      fg: [0.02, 0.47, 0.34],
    },
    {
      layer: 'Operations & Telemetry Layer',
      scope: 'Alert noise suppression, triage runbooks & sensitivity classification',
      status: 'PARTIAL',
      bg: [1, 0.98, 0.92],
      border: [0.99, 0.9, 0.54],
      fg: [0.71, 0.33, 0.04],
    },
    {
      layer: 'Frontline Runtime Layer',
      scope: 'Deterministic shadow staging, human-in-the-loop overrides & lineage',
      status: 'NEEDS GATE',
      bg: [0.99, 0.95, 0.95],
      border: [0.98, 0.79, 0.79],
      fg: [0.73, 0.11, 0.11],
    },
  ];

  for (const row of heatmapRows) {
    const rowH = 32;
    drawRect(45, y - rowH, 522, rowH, [1, 1, 1], [0.88, 0.91, 0.94]);
    drawText(row.layer, 52, y - 19, 8, true);
    drawText(row.scope, 210, y - 19, 7.5, false, [0.28, 0.33, 0.41]);

    drawRect(466, y - 23, 86, 15, row.bg, row.border);
    drawText(row.status, 480, y - 18, 7, true, row.fg);
    y -= rowH;
  }

  y -= 24;

  // Section 04: Audit-Ready Appendix (Redacted Evidence Snippets)
  drawText('04 // AUDIT-READY APPENDIX — SAMPLE EVIDENCE SNIPPETS (REDACTED)', 45, y, 10, true);
  y -= 16;

  const evidenceSnippets = [
    {
      ref: 'EVIDENCE SNIPPET [A-01] // LINEAGE TRACEABILITY',
      summary:
        'Observed: Downstream AI outputs could not be traced back to deterministic input contracts during third-party schema updates.',
      gate: 'Target Control: Pre-ingestion schema serialization contract with automated quarantine on version drift.',
    },
    {
      ref: 'EVIDENCE SNIPPET [A-02] // EXECUTION BOUNDARIES',
      summary:
        'Observed: Production record mutations lacked a pre-execution value gate and deterministic shadow queue verification step.',
      gate: 'Target Control: Mandatory staging queue and human-in-the-loop sign-off above calibrated exposure ceilings.',
    },
    {
      ref: 'EVIDENCE SNIPPET [A-03] // TELEMETRY INTEGRITY',
      summary:
        'Observed: High-frequency non-actionable warnings masked critical policy exceptions across operational escalation channels.',
      gate: 'Target Control: Sliding-window alert suppression paired with sensitivity-tagged audit logging.',
    },
  ];

  for (const ev of evidenceSnippets) {
    const sumLines = wrapLines(ev.summary, 88);
    const gateLines = wrapLines(ev.gate, 88);
    const boxH = 26 + (sumLines.length + gateLines.length) * 10;

    drawRect(45, y - boxH, 522, boxH, [0.98, 0.99, 1], [0.85, 0.88, 0.92]);
    drawText(ev.ref, 55, y - 14, 8, true, [0.06, 0.09, 0.16]);

    let cursor = y - 26;
    sumLines.forEach((l) => {
      drawText(l, 55, cursor, 7.6, false, [0.25, 0.3, 0.38]);
      cursor -= 10;
    });
    gateLines.forEach((l) => {
      drawText(l, 55, cursor, 7.6, true, [0.02, 0.47, 0.34]);
      cursor -= 10;
    });

    y -= boxH + 10;
  }

  // CTA Box
  y -= 6;
  drawRect(45, y - 48, 522, 48, [0.06, 0.09, 0.16]);
  drawText('UNLOCK YOUR ORGANIZATION-SPECIFIC LEDGER & CONTROL PLANE CALIBRATION', 58, y - 20, 8.5, true, [1, 1, 1]);
  drawText(
    'Full Quad-Node Diagnostic replaces illustrative ranges with your exact financial exposure, statutory audit, and executable SOW.',
    58,
    y - 34,
    7.4,
    false,
    [0.8, 0.85, 0.9]
  );

  drawText(
    'SAMPLE ARTIFACT // BMR SOLUTIONS LEVEL 2 CONTROL PLANE DIAGNOSTIC (PROPRIETARY WEIGHTS REDACTED)',
    45,
    32,
    7.2,
    true,
    [0.45, 0.5, 0.58]
  );

  // Assemble PDF 1.4 Binary with strict UTF-8 byte lengths
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
  for (const pageOps of pages) {
    const stream = pageOps.join('\n');
    const contentId = addObj(`<< /Length ${utf8ByteLength(stream)} >>\nstream\n${stream}\nendstream`);
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
    offsets.push(utf8ByteLength(pdf));
    pdf += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = utf8ByteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export async function downloadRedactedSamplePdf(): Promise<void> {
  const blob = await generateRedactedSamplePdf();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'BMR_Solutions_Sample_Process_Waste_Tax_Dossier.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => window.URL.revokeObjectURL(url), 5000);
}
