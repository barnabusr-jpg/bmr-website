import { jsPDF } from 'jspdf';

interface DiagnosticResult {
  protocol: string;
  frictionIndex: number;
  reworkTax: string;
  inactionCost: string;
}

export default class ForensicPDFGenerator {
  static async generate(result: DiagnosticResult, email: string): Promise<string> {
    // 1. Setup A4 Document
    const doc = new jsPDF('p', 'mm', 'a4');
    const timestamp = new Date().toLocaleString();

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); // BMR Dark Slate
    doc.rect(0, 0, 210, 297, 'F');

    // Header Branding
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // BMR Red
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    // Metadata
    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(8);
    doc.text(`NODE: BMR_DIAGNOSTIC_ALPHA // ${email.toUpperCase()}`, 20, 40);
    doc.text(`PROTOCOL: ${result.protocol} // TIMESTAMP: ${timestamp}`, 20, 45);

    // Financial Metrics Block
    doc.setDrawColor(30, 41, 59);
    doc.setFillColor(15, 23, 42);
    doc.rect(20, 60, 170, 45, 'FD');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 30, 72);
    
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(12);
    doc.text(`IDENTIFIED REWORK TAX: $${result.reworkTax}M / YEAR`, 30, 82);
    
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`6-MONTH INACTION COST: $${result.inactionCost}M`, 30, 92);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("INTERNAL USE ONLY // BMR SOLUTIONS // PAGE_01", 20, 285);

    // --- PAGE 2: EXHIBIT B (TOPOLOGY) ---
    // Explicitly add a second page - this cannot be skipped by the engine
    doc.addPage();
    
    doc.setFillColor(2, 6, 23); 
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("EXHIBIT B // FORENSIC TOPOLOGY MAP", 20, 30);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("LOGIC FLOW ANALYSIS // VULNERABILITY MAPPING", 20, 38);

    // Manually Draw the Topology Triangle
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(105, 60, 45, 150);  // Left
    doc.line(105, 60, 165, 150); // Right
    doc.line(45, 150, 165, 150); // Base

    doc.setFontSize(8);
    doc.setTextColor(220, 38, 38);
    doc.text("NODE_01: HUMAN ALIGNMENT", 80, 55);
    doc.text("NODE_02: BUSINESS VALUE", 20, 158);
    doc.text("NODE_03: SAFE EVOLUTION", 150, 158);

    // Definitions
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("FORENSIC CONDITION DEFINITIONS", 20, 185);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    const definitions = [
      "RED ZONE (REPORTED FRACTURE): Direct failures in logic reported via diagnostic input.",
      "YELLOW ZONE (PERCEIVED DRIFT): Points of friction likely to degrade into fractures.",
      "GREEN ZONE (REPORTED STABLE): Logic pathways currently meeting strategic intent."
    ];
    doc.text(definitions, 20, 195);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    // 3. Output as Blob URL
    return doc.output('bloburl').toString();
  }
}
