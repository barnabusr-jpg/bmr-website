import { jsPDF } from 'jspdf';

export default class DossierEngine {
  static async generate(result: any, lens: string): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4');
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const refId = `BMR-${Math.random().toString(36).toUpperCase().substring(2, 8)}`;

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); // BMR Deep Slate
    doc.rect(0, 0, 210, 297, 'F');

    // Branding Header
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // BMR Red
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    // Forensic Metadata
    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(8);
    doc.setFont("courier", "bold");
    doc.text(`REF_ID: ${refId}`, 20, 40);
    doc.text(`ORIGIN: ${lens.toUpperCase()}_NODE // TIMESTAMP: ${ts} EST`, 20, 45);

    // SFI Score Box
    doc.setDrawColor(30, 41, 59);
    doc.setFillColor(15, 23, 42);
    doc.rect(20, 60, 170, 45, 'FD');

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 30, 75);
    
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(10);
    doc.text("CONDITION: CRITICAL // LOGIC DECAY DETECTED", 30, 82);

    // Financial Metrics (High Contrast)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(`IDENTIFIED REWORK TAX: $${result.reworkTax}M / YR`, 20, 125);
    
    doc.setTextColor(185, 28, 28);
    doc.text(`6-MONTH INACTION COST: $${result.inactionCost}M`, 20, 135);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("BMR_SOLUTIONS // SECURED_INTERNAL_DOSSIER // PAGE_01", 20, 285);

    // --- PAGE 2: EXHIBIT B ---
    doc.addPage();
    doc.setFillColor(2, 6, 23);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("EXHIBIT B // FORENSIC TOPOLOGY MAP", 20, 30);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("INPUT-BASED SNAPSHOT // LOGIC FLOW ASSESSMENT", 20, 38);

    // Redraw Triangle with correct weighting
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.8);
    doc.line(105, 65, 45, 155);  // Left
    doc.line(105, 65, 165, 155); // Right
    doc.line(45, 155, 165, 155); // Base

    doc.setFontSize(8);
    doc.setTextColor(220, 38, 38);
    doc.text("NODE 01: HUMAN ALIGNMENT", 80, 60);
    doc.text("NODE 02: BUSINESS VALUE", 15, 163);
    doc.text("NODE 03: SAFE EVOLUTION", 150, 163);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // PAGE_02", 20, 285);

    doc.save(`BMR_DOSSIER_${refId}.pdf`);
  }
}
