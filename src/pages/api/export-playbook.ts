import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import { z } from 'zod';
import { StructuredCustomerPlaybook } from '../../lib/playbookStoryCompiler';
import { getStatusProvenanceBadge } from '../../lib/playbookExportAdapter';
import { buildAuditorVerificationScript } from '../../lib/canonicalHash';
import { getInsulationBandConfig, GateStatus } from '../../types/playbookExport';

export const config = {
  api: { responseLimit: false },
};

const PlaybookSchema = z.object({
  provenance: z.object({
    documentId: z.string(),
    schemaVersion: z.string(),
    generatedAt: z.string(),
    originatingSource: z.string(),
    inputTelemetryHash: z.string().startsWith('SHA256:'),
    preImage: z.object({
      companyName: z.string(),
      sector: z.string(),
      telemetryComplete: z.boolean(),
      readinessScore: z.number(),
      processWasteTaxAmount: z.number(),
      promiseGapExposureAmount: z.number(),
      rawResponseKeys: z.array(z.string()),
      responseVerificationChecksum: z.string(),
    }),
    classification: z.string(),
  }),
  chapter1_executiveBriefing: z.object({
    title: z.string(),
    organization: z.string(),
    sector: z.string(),
    date: z.string(),
    readinessScore: z.number(),
    targetFocus: z.string(),
    narrativeVerdict: z.string(),
  }),
  chapter2_financialTaxLedger: z.object({
    title: z.string(),
    processWasteTax: z.object({
      value: z.number(),
      scope: z.string(),
      tag: z.string(),
    }),
    promiseGapExposure: z.object({
      value: z.number(),
      scope: z.string(),
      tag: z.string(),
    }),
    hierarchyExplanation: z.string(),
    unmanagedDriftImpact: z.string(),
  }),
  chapter3_nodeCapabilityMatrix: z.object({
    title: z.string(),
    nodes: z.array(
      z.object({
        nodeKey: z.string(),
        title: z.string(),
        observedPattern: z.string(),
        operationalImpact: z.string(),
        remediationGate: z.string(),
        status: z.string(),
        statusSource: z.string(),
        insulationIntegrityPct: z.number(),
      })
    ).min(4),
  }),
  chapter4_complianceAudit: z.object({
    title: z.string(),
    safeguards: z.array(z.any()),
  }),
  chapter5_remediationRoadmap: z.object({
    title: z.string(),
    phases: z.array(z.any()).min(3),
  }),
  chapter6_deploymentGates: z.object({
    title: z.string(),
    gates: z.array(z.any()).min(3),
    architecturalStandard: z.string(),
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const parsed = PlaybookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      error: 'Unprocessable Playbook Payload',
      details: parsed.error.format(),
    });
  }

  const playbook = parsed.data as StructuredCustomerPlaybook;

  try {
    const doc = new PDFDocument({
      margin: 40,
      size: 'A4',
      bufferPages: true,
    });

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));

    // ==========================================
    // PAGE 1: COVER & CHAPTER 1 BRIEFING
    // ==========================================
    doc.rect(40, 40, 515, 6).fill('#0f172a');
    doc.moveDown(2);
    doc.font('Courier-Bold').fontSize(9).fillColor('#b91c1c').text('OPERATIONAL INSPECTORATE // LEVEL 2 CONTROL PLANE');
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#0f172a').text('PRE-AUTOMATION CONTROL PLANE PLAYBOOK');
    doc.font('Helvetica').fontSize(11).fillColor('#475569').text('Operational Boundary Assessment, Tax Ledger & Remediation Specifications');
    doc.moveDown(1.5);

    doc.rect(40, 135, 515, 85).fill('#f8fafc').stroke('#cbd5e1');
    doc.font('Courier-Bold').fontSize(8).fillColor('#475569').text('TARGET ENTITY:', 55, 148);
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(playbook.chapter1_executiveBriefing.organization, 55, 160);
    doc.font('Courier-Bold').fontSize(8).fillColor('#475569').text('SECTOR DOMAIN:', 320, 148);
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#0f172a').text(playbook.chapter1_executiveBriefing.sector, 320, 160);
    doc.font('Courier-Bold').fontSize(8).fillColor('#475569').text('ASSESSMENT DATE:', 55, 185);
    doc.font('Courier').fontSize(9).fillColor('#0f172a').text(playbook.chapter1_executiveBriefing.date, 55, 197);
    doc.font('Courier-Bold').fontSize(8).fillColor('#475569').text('SECURITY POSTURE:', 320, 185);
    doc.font('Courier-Bold').fontSize(8).fillColor('#047857').text('ZERO SYSTEM ACCESS // NON-INVASIVE', 320, 197);

    doc.moveDown(6);
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(playbook.chapter1_executiveBriefing.title);
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(9).fillColor('#334155').lineGap(2.5).text(playbook.chapter1_executiveBriefing.narrativeVerdict);
    doc.moveDown(1);
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#b91c1c').text(`Target Operational Focus: ${playbook.chapter1_executiveBriefing.targetFocus}`);

    // ==========================================
    // PAGE 2: CHAPTER 2 TAX LEDGER
    // ==========================================
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(playbook.chapter2_financialTaxLedger.title);
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(8.5).fillColor('#475569').text(playbook.chapter2_financialTaxLedger.hierarchyExplanation);
    doc.moveDown(1.5);

    doc.rect(40, 95, 165, 80).fill('#f8fafc').stroke('#cbd5e1');
    doc.font('Courier-Bold').fontSize(7.5).fillColor('#475569').text('01. READINESS INDEX', 50, 107);
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#0f172a').text(`${playbook.chapter1_executiveBriefing.readinessScore}/100`, 50, 125);
    doc.font('Courier').fontSize(7).fillColor('#64748b').text('Baseline Control Strength', 50, 153);

    doc.rect(215, 95, 165, 80).fill('#f8fafc').stroke('#cbd5e1');
    doc.font('Courier-Bold').fontSize(7.5).fillColor('#d97706').text('02. PROCESS WASTE TAX', 225, 107);
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#d97706').text(`$${playbook.chapter2_financialTaxLedger.processWasteTax.value.toLocaleString()}`, 225, 125);
    doc.font('Courier').fontSize(7).fillColor('#64748b').text(playbook.chapter2_financialTaxLedger.processWasteTax.tag, 225, 153);

    doc.rect(390, 95, 165, 80).fill('#f8fafc').stroke('#cbd5e1');
    doc.font('Courier-Bold').fontSize(7.5).fillColor('#dc2626').text('03. PROMISE GAP™ RISK', 400, 107);
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#dc2626').text(`$${playbook.chapter2_financialTaxLedger.promiseGapExposure.value.toLocaleString()}`, 400, 125);
    doc.font('Courier').fontSize(7).fillColor('#64748b').text(playbook.chapter2_financialTaxLedger.promiseGapExposure.tag, 400, 153);

    doc.moveDown(7);
    doc.font('Courier-Bold').fontSize(9.5).fillColor('#0f172a').text('// UNMANAGED OPERATIONAL DRIFT EXPOSURE');
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(8.5).fillColor('#334155').lineGap(2.5).text(playbook.chapter2_financialTaxLedger.unmanagedDriftImpact);

    // ==========================================
    // PAGE 3: CHAPTER 3 NODE MATRIX
    // ==========================================
    doc.addPage();
    doc.font('Courier-Bold').fontSize(8.5).fillColor('#b91c1c').text('OPERATIONAL AUTOPSY // CROSS-PERSONA MAPPING');
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(playbook.chapter3_nodeCapabilityMatrix.title);
    doc.font('Helvetica').fontSize(8).fillColor('#64748b').text(
      'Direct inspection of governance boundaries across Nodes 01–04. Provenance reflects empirical telemetry vs. Level 2 tier ceilings.'
    );

    const nodeStartY = 95;
    const cardHeight = 145;
    const cardGap = 12;

    playbook.chapter3_nodeCapabilityMatrix.nodes.forEach((node, i) => {
      if (typeof node.insulationIntegrityPct !== 'number' || Number.isNaN(node.insulationIntegrityPct)) {
        throw new Error(`Invalid insulationIntegrityPct for node: ${node.nodeKey}`);
      }

      const y = nodeStartY + i * (cardHeight + cardGap);
      const badge = getStatusProvenanceBadge(
        node.status as GateStatus,
        node.statusSource as 'RESPONSE_DERIVED' | 'METHODOLOGY_BASELINE'
      );
      const insulationConfig = getInsulationBandConfig(node.insulationIntegrityPct);

      doc.rect(40, y, 515, cardHeight).fill('#ffffff').stroke('#e2e8f0');
      doc.rect(40, y, 4, cardHeight).fill(insulationConfig.hexColor);

      doc.font('Courier-Bold').fontSize(9).fillColor('#0f172a').text(
        `${node.nodeKey} // ${node.title}`,
        55,
        y + 12
      );

      const badgeWidth = 115;
      const badgeX = 545 - badgeWidth;

      doc.rect(badgeX, y + 10, badgeWidth, 18).fill(badge.pdfBgHex).stroke(badge.pdfBorderHex);
      doc.font('Courier-Bold').fontSize(7).fillColor(badge.pdfTextHex).text(
        badge.label,
        badgeX,
        y + 15,
        { width: badgeWidth, align: 'center' }
      );

      doc.font('Courier').fontSize(6.5).fillColor('#64748b').text(
        badge.provenance,
        badgeX - 40,
        y + 32,
        { width: badgeWidth + 40, align: 'right' }
      );

      doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#475569').text('Observed Control Pattern:', 55, y + 36);
      doc.font('Helvetica').fontSize(7.5).fillColor('#1e293b').text(node.observedPattern, 180, y + 36, { width: 360 });

      doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#475569').text('Operational Drag Impact:', 55, y + 62);
      doc.font('Helvetica').fontSize(7.5).fillColor('#1e293b').text(node.operationalImpact, 180, y + 62, { width: 360 });

      doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#065f46').text('Deployment Gate Enforcement:', 55, y + 88);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#047857').text(node.remediationGate, 180, y + 88, { width: 360 });

      doc.rect(55, y + 118, 490, 16).fill('#f8fafc').stroke('#e2e8f0');
      doc.font('Courier-Bold').fontSize(7).fillColor('#475569').text('INSULATION INTEGRITY:', 65, y + 123);
      doc.font('Courier-Bold').fontSize(7).fillColor('#0f172a').text(
        `${node.insulationIntegrityPct}% [${insulationConfig.band}]`,
        170,
        y + 123
      );

      const meterWidth = 200;
      const meterX = 250;
      const fillWidth = Math.round((node.insulationIntegrityPct / 100) * meterWidth);

      doc.rect(meterX, y + 123, meterWidth, 6).fill('#e2e8f0');
      if (fillWidth > 0) {
        doc.rect(meterX, y + 123, fillWidth, 6).fill(insulationConfig.hexColor);
      }

      doc.font('Courier').fontSize(6).fillColor('#94a3b8').text('0%', meterX - 12, y + 123);
      doc.font('Courier').fontSize(6).fillColor('#94a3b8').text('100%', meterX + meterWidth + 4, y + 123);
    });

    // ==========================================
    // PAGE 4: CHAPTER 4 COMPLIANCE
    // ==========================================
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(playbook.chapter4_complianceAudit.title);
    doc.moveDown(1);

    playbook.chapter4_complianceAudit.safeguards.forEach((audit, i) => {
      const y = 80 + i * 85;
      doc.rect(40, y, 515, 75).fill('#f8fafc').stroke('#cbd5e1');
      doc.font('Courier-Bold').fontSize(9).fillColor('#b91c1c').text(`[NON-COMPLIANT] ${audit.standard} // ${audit.clause}`, 50, y + 10);
      doc.font('Courier-Bold').fontSize(8).fillColor('#475569').text(`SEVERITY: ${audit.severity} | MITIGATION: ${audit.linkedPhase}`, 350, y + 10);
      doc.font('Helvetica').fontSize(8.5).fillColor('#334155').text(audit.finding, 50, y + 32, { width: 495 });
    });

    // ==========================================
    // PAGE 5: CHAPTER 5 REMEDIATION SOW
    // ==========================================
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(playbook.chapter5_remediationRoadmap.title);
    doc.moveDown(1);

    playbook.chapter5_remediationRoadmap.phases.forEach((phase, i) => {
      const y = 80 + i * 140;
      doc.rect(40, y, 515, 125).fill('#ffffff').stroke('#cbd5e1');
      doc.font('Courier-Bold').fontSize(9.5).fillColor('#0f172a').text(`${phase.phase} // ${phase.title}`, 50, y + 12);
      doc.font('Courier-Bold').fontSize(8).fillColor(phase.status === 'ACTIVE' ? '#047857' : '#d97706').text(`STATUS: ${phase.status}`, 420, y + 12);

      doc.font('Courier-Bold').fontSize(8).fillColor('#64748b').text(`TIMELINE: ${phase.timeline}  |  STAFFING: ${phase.allocation}`, 50, y + 30);
      doc.font('Helvetica').fontSize(8.5).fillColor('#1e293b').text(phase.scope, 50, y + 45, { width: 495 });

      doc.font('Helvetica-Bold').fontSize(8).fillColor('#0f172a').text('Key Technical Deliverables:', 50, y + 70);
      phase.deliverables.forEach((del: string, dIdx: number) => {
        doc.font('Helvetica').fontSize(7.5).fillColor('#334155').text(`• ${del}`, 60, y + 85 + dIdx * 12);
      });
    });

    // ==========================================
    // PAGE 6: CHAPTER 6 AUTONOMY GATES
    // ==========================================
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(playbook.chapter6_deploymentGates.title);
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(8.5).fillColor('#475569').text(playbook.chapter6_deploymentGates.architecturalStandard);
    doc.moveDown(1.5);

    playbook.chapter6_deploymentGates.gates.forEach((gate, i) => {
      const y = 110 + i * 105;
      doc.rect(40, y, 515, 95).fill('#f8fafc').stroke('#cbd5e1');
      doc.font('Courier-Bold').fontSize(9.5).fillColor('#0f172a').text(`${gate.stage} // ${gate.name}`, 50, y + 12);
      doc.font('Courier-Bold').fontSize(8).fillColor(gate.activeEnforcement ? '#047857' : '#64748b').text(gate.activeEnforcement ? 'GATE: ACTIVE' : 'GATE: QUEUED', 420, y + 12);
      doc.font('Helvetica-Bold').fontSize(8).fillColor('#0f172a').text(`Threshold Target: ${gate.thresholdTarget}`, 50, y + 35);
      doc.font('Helvetica').fontSize(8).fillColor('#334155').text(`Enforcement Rule: ${gate.enforcementRule}`, 50, y + 55, { width: 495 });
      doc.font('Courier').fontSize(7.5).fillColor('#64748b').text(`Policy Version: ${gate.policyVersion}`, 50, y + 78);
    });

    // ==========================================
    // PAGE 7: CHAPTER 7 APPENDIX & AUDITOR CLI
    // ==========================================
    doc.addPage();
    doc.font('Courier-Bold').fontSize(8.5).fillColor('#b91c1c').text('CRYPTOGRAPHIC AUDIT MANIFEST // CHAIN OF CUSTODY');
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text('07 // Appendix: Telemetry Checksum & Traceability Manifest');
    doc.font('Helvetica').fontSize(7.5).fillColor('#64748b').text(
      'This machine-readable record certifies data provenance and calculation reproducibility without semantic transformation of the pre-image used for hashing.'
    );

    doc.rect(40, 85, 515, 55).fill('#f8fafc').stroke('#cbd5e1');
    doc.font('Courier-Bold').fontSize(7.5).fillColor('#475569').text('DOCUMENT IDENTIFIER:', 55, 96);
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#0f172a').text(playbook.provenance.documentId, 55, 107);
    doc.font('Courier-Bold').fontSize(7.5).fillColor('#475569').text('ORIGINATING SOURCE:', 320, 96);
    doc.font('Helvetica').fontSize(8.5).fillColor('#0f172a').text(playbook.provenance.originatingSource, 320, 107);
    doc.font('Courier-Bold').fontSize(7.5).fillColor('#475569').text('CANONICAL HASH (SHA-256):', 55, 122);
    doc.font('Courier').fontSize(7.5).fillColor('#b91c1c').text(playbook.provenance.inputTelemetryHash, 195, 122);

    const manifestSnapshot = {
      documentId: playbook.provenance.documentId,
      schemaVersion: playbook.provenance.schemaVersion,
      generatedAt: playbook.provenance.generatedAt,
      classification: playbook.provenance.classification,
      inputTelemetryHash: playbook.provenance.inputTelemetryHash,
      reproducibilityPreImage: playbook.provenance.preImage,
      evaluatedMetrics: {
        readinessIndex: playbook.chapter1_executiveBriefing.readinessScore,
        processWasteTaxAnnual: playbook.chapter2_financialTaxLedger.processWasteTax.value,
        promiseGapExposureAnnual: playbook.chapter2_financialTaxLedger.promiseGapExposure.value,
        monetaryScope: 'ANNUALIZED_SINGLE_YEAR',
        currency: 'USD',
      },
      nodeVerificationSummary: playbook.chapter3_nodeCapabilityMatrix.nodes.map((n) => ({
        nodeKey: n.nodeKey,
        status: n.status,
        statusSource: n.statusSource,
        insulationIntegrityPct: n.insulationIntegrityPct,
      })),
    };

    doc.rect(40, 150, 515, 230).fill('#0f172a');
    doc.font('Courier').fontSize(6).fillColor('#38bdf8').text(
      JSON.stringify(manifestSnapshot, null, 2),
      50,
      160,
      { width: 495, lineGap: 1.1 }
    );

    const preImageJsonCompact = JSON.stringify(playbook.provenance.preImage);
    const expectedDigest = playbook.provenance.inputTelemetryHash;
    const auditorCliSnippet = buildAuditorVerificationScript(preImageJsonCompact, expectedDigest);

    doc.rect(40, 390, 515, 175).fill('#020617').stroke('#1e293b');
    doc.rect(40, 390, 515, 16).fill('#0f172a');
    doc.font('Courier-Bold').fontSize(6.5).fillColor('#38bdf8').text(
      'INDEPENDENT AUDITOR RE-VERIFICATION PROCEDURE // ZERO RUNTIME DEPENDENCIES',
      48,
      394
    );

    doc.font('Courier').fontSize(5.4).fillColor('#94a3b8').text(
      auditorCliSnippet,
      48,
      412,
      { width: 495, lineGap: 1 }
    );

    doc.rect(40, 575, 515, 60).fill('#f8fafc').stroke('#cbd5e1');
    doc.font('Courier-Bold').fontSize(7.5).fillColor('#0f172a').text('INDEPENDENT INSPECTORATE CERTIFICATION & NON-INVASIVE GUARANTEE', 50, 585);
    doc.font('Helvetica').fontSize(7).fillColor('#334155').lineGap(1.5).text(
      'BMR Solutions operates strictly as an independent operational inspectorate. This diagnostic deliverable was produced out-of-band using bounded questionnaire schemas and architectural configuration metadata supplied directly by client stakeholders. Zero live customer databases, internal corporate networks, or proprietary systems of record were accessed or queried during this evaluation.',
      50,
      598,
      { width: 495 }
    );

    // ==========================================
    // TWO-PASS FOOTER INJECTION
    // ==========================================
    const range = doc.bufferedPageRange();
    const totalPages = range.count;

    for (let i = 0; i < totalPages; i++) {
      doc.switchToPage(i);
      doc.save();
      doc.moveTo(40, 785).lineTo(555, 785).strokeColor('#e2e8f0').lineWidth(0.5).stroke();
      doc.font('Courier').fontSize(6.5).fillColor('#64748b');
      doc.text(
        `BMR SOLUTIONS © 2026 // ${playbook.provenance.classification} // ${playbook.provenance.inputTelemetryHash.slice(0, 24)}...`,
        40,
        792,
        { lineBreak: false }
      );
      doc.text(
        `PAGE ${i + 1} OF ${totalPages}`,
        480,
        792,
        { align: 'right', lineBreak: false }
      );
      doc.restore();
    }

    doc.end();

    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=BMR_Playbook_${playbook.provenance.documentId}.pdf`
      );
      res.status(200).send(pdfData);
    });
  } catch (error: any) {
    console.error('Playbook generation exception:', error);
    return res.status(500).json({ error: 'PDF generation failure', details: error.message });
  }
}
