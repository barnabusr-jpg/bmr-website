import { jsPDF } from 'jspdf';

interface DiagnosticResult {
  protocol: string;
  frictionIndex: number;
  reworkTax: string;
  inactionCost: string;
  // Added zone scores for Point #2
  zoneScores?: {
    hai: number; // Human-AI Alignment
    avs: number; // Algorithmic Value Stream
    igf: number; // Institutional Governance
  };
}

export default class ForensicPDFGenerator {
  static async generate(result: DiagnosticResult, email: string): Promise<string> {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // 1. AESTHETIC FOUNDATION
    doc.setFillColor(2, 6, 23); // Deep Slate 950
    doc.rect(0, 0, 210, 297, 'F');

    // 2. HEADER
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // Red 600
    doc.setFontSize(24);
    doc.text("BMR ADVISORY // FORENSIC BRIEFING", 20, 30);

    // 3. METADATA
    doc.setTextColor(71, 85, 105); // Slate 500
    doc.setFontSize(9);
    doc.text(`ORIGIN: BMR_DIAGNOSTIC_NODE // ${email.toUpperCase()}`, 20, 42);
    doc.text(`PROTOCOL: ${result.protocol} // TIMESTAMP: ${ts} EST`, 20, 47);

    // 4. FINANCIAL IMPACT (THE "HOOK")
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

    // 5. ISSUE #2 FIX: ZONE RISK PROFILES
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("SECTOR VULNERABILITY ANALYSIS", 20, 125);
    
    const zones = [
      { id: 'HAI', name: 'Human-AI Alignment', score: result.zoneScores?.hai || 45 },
      { id: 'AVS', name: 'Algorithmic Value Stream', score: result.zoneScores?.avs || 30 },
      { id: 'IGF', name: 'Institutional Governance', score: result.zoneScores?.igf || 60 }
    ];

    let yPos = 135;
    zones.forEach(zone => {
      // Determine Status Labels
      const isCritical = zone.score < 50;
      const statusLabel = isCritical ? "CRITICAL" : "COMPROMISED";
      const statusColor = isCritical ? [220, 38, 38] : [180, 83, 9];

      doc.setDrawColor(30, 41, 59);
      doc.line(20, yPos, 190, yPos);

      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text(`${zone.id} // ${zone.name}`, 20, yPos + 10);

      // Status Badge
      doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.rect(150, yPos + 4, 40, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.text(`STATUS: ${statusLabel}`, 153, yPos + 9.5);

      // Observation Text (Provides value without revealing the full audit)
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      const observation = isCritical 
        ? "High systemic drift detected. Structural breakdown in decision-making continuity." 
        : "Operational friction detected. Evidence logs suggest moderate efficiency decay.";
      doc.text(observation, 20, yPos + 18);

      yPos += 28;
    });

    // 6. CALL TO ACTION (Strategic Bridge)
    doc.setFillColor(220, 38, 38);
    doc.rect(20, 240, 170, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("SCHEDULE FORENSIC REVIEW MEETING", 55, 252);
    doc.setFontSize(8);
    doc.text("Neutralize Systemic Drift & Review Implementation Roadmap", 64, 258);

    // 7. FOOTER
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("INTERNAL USE ONLY // BMR ADVISORY // SUBJECT TO AES-256 COMPLIANCE", 20, 285);

    const pdfOutput = doc.output('blob');
    const pdfBlob = new Blob([pdfOutput], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
  }
}
