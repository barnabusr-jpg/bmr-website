import { jsPDF } from 'jspdf';

export default class DossierEngine {
  static async generate(result: any, lens: string): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4');
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const refId = `BMR-${Math.random().toString(36).toUpperCase().substring(2, 8)}`;

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); 
    doc.rect(0, 0, 210, 297, 'F');

    // Header Branding
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); 
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    // Metadata Row
    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(7);
    doc.setFont("courier", "bold");
    doc.text(`REF_ID: ${refId}`, 20, 38);
    doc.text(`ORIGIN: ${lens.toUpperCase()}_NODE // TIMESTAMP: ${ts} EST`, 20, 42);

    // SFI Score Box (High Impact)
    doc.setDrawColor(30, 41, 59);
    doc.setFillColor(15, 23, 42);
    doc.rect(20, 55, 170, 45, 'FD');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 30, 70);
    
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(9);
    doc.text(`CONDITION: ${result.frictionIndex > 60 ? 'CRITICAL' : 'STABLE'} // LOGIC DECAY DETECTED`, 30, 77);

    // Vertical Sidebar Accent
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(1);
    doc.line(18, 55, 18, 200);

    // Financial Metrics Summary
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text("IDENTIFIED CAPITAL DECAY:", 25, 115);
    
    doc.setFontSize(10);
    doc.text(`REPORTED REWORK TAX: $${result.reworkTax}M / YR`, 25, 125);
    
    doc.setTextColor(220, 38, 38);
    doc.text(`6-MONTH INACTION COST: $${result.inactionCost}M`, 25, 133);

    // PRELIMINARY VERDICT SECTION (Missing piece)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("PRELIMINARY VERDICT:", 25, 160);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    
    const verdictText = result.frictionIndex > 60 
      ? "IMMEDIATE ARCHITECTURAL HARDENING REQUIRED. SYSTEMIC DRIFT EXCEEDS SAFETY TOLERANCE."
      : "CONTINUOUS MONITORING ADVISED. BASELINE LOGIC REMAINS WITHIN OPERATIONAL PARAMETERS.";
    doc.text(doc.splitTextToSize(verdictText, 150), 25, 168);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("BMR_SOLUTIONS // INTERNAL_USE_ONLY // PAGE_01", 20, 285);

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

    // Topology Triangle
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.8);
    doc.line(105, 65, 50, 155); 
    doc.line(105, 65, 160, 155);
    doc.line(50, 155, 160, 155);

    doc.setFontSize(8);
    doc.setTextColor(220, 38, 38);
    doc.text("NODE 01: HUMAN ALIGNMENT", 80, 60);
    doc.text("NODE 02: BUSINESS VALUE", 25, 163);
    doc.text("NODE 03: SAFE EVOLUTION", 145, 163);

    // ZONE DEFINITIONS (Adding completion to Page 2)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("FORENSIC ZONE DEFINITIONS:", 20, 185);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    const definitions = [
      "RED ZONE (FRACTURE): Failures in logic based on direct audit inputs.",
      "YELLOW ZONE (DRIFT): High potential friction points identified for decay.",
      "GREEN ZONE (STABLE): Matches strategic intent within the current lens."
    ];
    doc.text(definitions, 20, 195);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // PAGE_02", 20, 285);

    doc.save(`BMR_DOSSIER_${refId}.pdf`);
  }
}
