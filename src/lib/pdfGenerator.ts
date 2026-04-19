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
    // 1. Initialize Document with explicit dimensions
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); 
    doc.rect(0, 0, 210, 297, 'F');

    // Header Branding
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); 
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(8);
    doc.text(`ORIGIN: BMR_DIAGNOSTIC_NODE // ${email.toUpperCase()}`, 20, 40);
    doc.text(`PROTOCOL: ${result.protocol} // TIMESTAMP: ${ts} EST`, 20, 45);

    // Financial Data Block
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

    // Sector Analysis
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text("SECTOR VULNERABILITY ANALYSIS", 20, 125);
    
    const nodeData = [
      { id: 'HAI', name: 'Human Alignment', s: result.zoneScores?.hai || 45 },
      { id: 'AVS', name: 'Business Value', s: result.zoneScores?.avs || 30 },
      { id: 'IGF', name: 'Safe Evolution', s: result.zoneScores?.igf || 60 }
    ];

    let currentY = 135;
    nodeData.forEach(node => {
      const critical = node.s < 50;
      doc.setDrawColor(30, 41, 59);
      doc.line(20, currentY, 190, currentY);
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(`${node.id} // ${node.name}`, 20, currentY + 8);
      
      doc.setFillColor(critical ? 220 : 180, critical ? 38 : 83, critical ? 38 : 9);
      doc.rect(150, currentY + 3, 40, 7, 'F');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(`STATUS: ${critical ? "CRITICAL" : "COMPROMISED"}`, 153, currentY + 7.5);
      currentY += 25;
    });

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("INTERNAL USE ONLY // BMR SOLUTIONS // PAGE_01", 20, 285);

    // --- PAGE 2: EXHIBIT B ---
    // We use a forced addPage call here
    doc.addPage('a4', 'p');
    
    // Reset Background for Page 2
    doc.setFillColor(2, 6, 23); 
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("EXHIBIT B // FORENSIC TOPOLOGY MAP", 20, 30);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("INPUT-BASED SNAPSHOT // PERCEPTION LOGIC FLOW", 20, 38);

    // Manual Drawing of Triad Nodes
    const drawTopology = (x: number, y: number, label: string, score: number) => {
        const isRed = score <= 35;
        const isYellow = score > 35 && score <= 70;
        const c = isRed ? [220, 38, 38] : isYellow ? [234, 179, 8] : [34, 197, 94];
        doc.setDrawColor(c[0], c[1], c[2]);
        doc.rect(x, y, 75, 12, 'S');
        doc.setFontSize(7);
        doc.setTextColor(c[0], c[1], c[2]);
        doc.text(`${label} // ${isRed ? "FRACTURE" : isYellow ? "DRIFT" : "STABLE"}`, x + 4, y + 7.5);
    };

    drawTopology(67.5, 60, "NODE 01: HUMAN ALIGNMENT", nodeData[0].s);
    drawTopology(20, 80, "NODE 02: BUSINESS VALUE", nodeData[1].s);
    drawTopology(115, 80, "NODE 03: SAFE EVOLUTION", nodeData[2].s);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("FORENSIC CONDITION DEFINITIONS", 20, 115);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    const condDefinitions = [
      "RED ZONE (REPORTED FRACTURE): Failures in logic based on your inputs. They create",
      "systemic risk, including legal exposure, rework tax, and damage to your reputation.",
      "Stabilization is required to prevent capital leaks.",
      "",
      "YELLOW ZONE (PERCEIVED DRIFT): Potential friction points identified in your operations.",
      "Monitor these zones closely. They may degrade into fractures without intervention.",
      "",
      "GREEN ZONE (REPORTED STABLE): Matches strategic intent according to provided data.",
      "Maintain current protocols to sustain integrity."
    ];
    doc.text(condDefinitions, 20, 128);

    doc.setFillColor(15, 23, 42);
    doc.rect(20, 190, 170, 25, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("REPORTED SYSTEM POSTURE:", 30, 201);
    
    const finalPosture = result.frictionIndex > 70 ? "STABLE" : result.frictionIndex > 35 ? "WARNING" : "CRITICAL";
    const postCol = result.frictionIndex > 70 ? [34, 197, 94] : result.frictionIndex > 35 ? [234, 179, 8] : [220, 38, 38];
    doc.setTextColor(postCol[0], postCol[1], postCol[2]);
    doc.setFontSize(14);
    doc.text(finalPosture, 30, 208);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    // --- FINAL EXPORT ---
    const blob = doc.output('blob');
    return URL.createObjectURL(blob);
  }
}
