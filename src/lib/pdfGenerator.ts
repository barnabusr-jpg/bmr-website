import { jsPDF } from 'jspdf';

interface DiagnosticResult {
  protocol: string;
  frictionIndex: number;
  reworkTax: string;
  inactionCost: string;
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

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); // Deep Slate 950
    doc.rect(0, 0, 210, 297, 'F');

    // Branding Update
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); 
    doc.setFontSize(24);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(9);
    doc.text(`ORIGIN: BMR_DIAGNOSTIC_NODE // ${email.toUpperCase()}`, 20, 42);
    doc.text(`PROTOCOL: ${result.protocol} // TIMESTAMP: ${ts} EST`, 20, 47);

    // Financial Impact
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

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("SECTOR VULNERABILITY ANALYSIS", 20, 125);
    
    const zones = [
      { id: 'HAI', name: 'Human Alignment', score: result.zoneScores?.hai || 45 },
      { id: 'AVS', name: 'Business Value', score: result.zoneScores?.avs || 30 },
      { id: 'IGF', name: 'Safe Evolution', score: result.zoneScores?.igf || 60 }
    ];

    let yPos = 135;
    zones.forEach(zone => {
      const isCritical = zone.score < 50;
      const statusLabel = isCritical ? "CRITICAL" : "COMPROMISED";
      const statusColor = isCritical ? [220, 38, 38] : [180, 83, 9];

      doc.setDrawColor(30, 41, 59);
      doc.line(20, yPos, 190, yPos);
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text(`${zone.id} // ${zone.name}`, 20, yPos + 10);

      doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.rect(150, yPos + 4, 40, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.text(`STATUS: ${statusLabel}`, 153, yPos + 9.5);

      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      const observation = isCritical 
        ? "High systemic drift detected. Structural breakdown in decision-making continuity." 
        : "Operational friction detected. Evidence logs suggest moderate efficiency decay.";
      doc.text(observation, 20, yPos + 18);
      yPos += 28;
    });

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("INTERNAL USE ONLY // BMR SOLUTIONS // SUBJECT TO COMPLIANCE", 20, 285);

    // --- PAGE 2: FORENSIC TOPOLOGY MAP (EXHIBIT B) ---
    doc.addPage();
    doc.setFillColor(2, 6, 23);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("EXHIBIT B // FORENSIC TOPOLOGY MAP", 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("INPUT-BASED SNAPSHOT // LOGIC FLOW ASSESSMENT", 20, 38);

    // Node Assessment Text (Protecting IP)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("FORENSIC CONDITION DEFINITIONS", 20, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);

    const definitions = [
      "RED ZONE (REPORTED FRACTURE):",
      "Failures in logic based on your inputs. They create systemic risk, including legal",
      "exposure, rework tax, and reputational damage. Stabilization required.",
      "",
      "YELLOW ZONE (PERCEIVED DRIFT):",
      "Potential friction points identified in your current operations. Monitor these",
      "zones closely; they may degrade into fractures without intervention.",
      "",
      "GREEN ZONE (REPORTED STABLE):",
      "Matches your strategic intent according to provided data. Maintain current",
      "protocols to sustain integrity."
    ];
    doc.text(definitions, 20, 75);

    // Posture Callout
    doc.setFillColor(15, 23, 42);
    doc.rect(20, 160, 170, 30, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("REPORTED SYSTEM POSTURE:", 30, 172);
    
    const posture = result.frictionIndex > 70 ? "STABLE" : result.frictionIndex > 35 ? "WARNING" : "CRITICAL";
    const postureColor = result.frictionIndex > 70 ? [34, 197, 94] : result.frictionIndex > 35 ? [234, 179, 8] : [220, 38, 38];
    
    doc.setTextColor(postureColor[0], postureColor[1], postureColor[2]);
    doc.setFontSize(16);
    doc.text(posture, 30, 182);

    // Final Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const disclaimer = [
      "DISCLAIMER: This map is a point-in-time snapshot based on provided data.",
      "It represents a reported condition and is not an independent technical validation.",
      "Full verification requires a primary forensic review."
    ];
    doc.text(disclaimer, 20, 220);

    // Footer
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    const pdfOutput = doc.output('blob');
    return URL.createObjectURL(pdfOutput);
  }
}
