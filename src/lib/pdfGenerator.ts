import { jsPDF } from 'jspdf';

interface DiagnosticResult {
  protocol: string;
  frictionIndex: number;
  reworkTax: string;
  inactionCost: string;
  zoneScores?: {
    hai: number;
    avs: number;
    igf: number;
  };
}

export default class ForensicPDFGenerator {
  static async generate(result: DiagnosticResult, email: string): Promise<string> {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); // Deep Slate 950
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); 
    doc.setFontSize(24);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(9);
    doc.text(`ORIGIN: BMR_DIAGNOSTIC_NODE // ${email.toUpperCase()}`, 20, 42);
    doc.text(`PROTOCOL: ${result.protocol} // TIMESTAMP: ${ts} EST`, 20, 47);

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
      doc.setDrawColor(30, 41, 59);
      doc.line(20, yPos, 190, yPos);
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text(`${zone.id} // ${zone.name}`, 20, yPos + 10);
      doc.setFillColor(isCritical ? 220 : 180, isCritical ? 38 : 83, isCritical ? 38 : 9);
      doc.rect(150, yPos + 4, 40, 8, 'F');
      doc.setFontSize(7);
      doc.text(`STATUS: ${isCritical ? "CRITICAL" : "COMPROMISED"}`, 153, yPos + 9.5);
      yPos += 28;
    });

    // --- PAGE 2: EXHIBIT B (TOPOLOGY MAP) ---
    doc.addPage();
    doc.setFillColor(2, 6, 23);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("EXHIBIT B // FORENSIC TOPOLOGY MAP", 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("INPUT-BASED SNAPSHOT // LOGIC FLOW ASSESSMENT", 20, 38);

    // DRAWING THE TRIANGLE NODES MANUALLY
    const drawNode = (x: number, y: number, w: number, h: number, label: string, status: string, score: number) => {
      const color = score > 70 ? [34, 197, 94] : score > 35 ? [234, 179, 8] : [220, 38, 38];
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setFillColor(color[0], color[1], color[2], 0.1); // Faint background
      doc.rect(x, y, w, h, 'FD');
      doc.setFontSize(7);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(`${label} // ${status}`, x + 5, y + (h / 2) + 2);
    };

    // Node 01 (Top Center)
    drawNode(65, 60, 80, 15, "NODE 01: HUMAN ALIGNMENT", result.zoneScores?.hai! > 50 ? "STABLE" : "FRACTURE", result.zoneScores?.hai || 45);
    
    // Node 02 (Bottom Left)
    drawNode(20, 80, 80, 15, "NODE 02: BUSINESS VALUE", result.zoneScores?.avs! > 50 ? "STABLE" : "FRACTURE", result.zoneScores?.avs || 30);
    
    // Node 03 (Bottom Right)
    drawNode(110, 80, 80, 15, "NODE 03: SAFE EVOLUTION", result.zoneScores?.igf! > 50 ? "STABLE" : "FRACTURE", result.zoneScores?.igf || 60);

    // Definitions
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("FORENSIC CONDITION DEFINITIONS", 20, 120);

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    const definitions = [
      "RED ZONE (REPORTED FRACTURE): Failures in logic based on your inputs. Stabilization required.",
      "",
      "YELLOW ZONE (PERCEIVED DRIFT): Potential friction points identified. Monitor closely.",
      "",
      "GREEN ZONE (REPORTED STABLE): Matches strategic intent. Maintain protocols."
    ];
    doc.text(definitions, 20, 135, { maxWidth: 170 });

    // Status Summary Box
    doc.setFillColor(15, 23, 42);
    doc.rect(20, 180, 170, 30, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("REPORTED SYSTEM POSTURE:", 30, 192);
    
    const posture = result.frictionIndex > 70 ? "STABLE" : result.frictionIndex > 35 ? "WARNING" : "CRITICAL";
    const pCol = result.frictionIndex > 70 ? [34, 197, 94] : result.frictionIndex > 35 ? [234, 179, 8] : [220, 38, 38];
    doc.setTextColor(pCol[0], pCol[1], pCol[2]);
    doc.setFontSize(16);
    doc.text(posture, 30, 202);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    const pdfOutput = doc.output('blob');
    return URL.createObjectURL(pdfOutput);
  }
}
