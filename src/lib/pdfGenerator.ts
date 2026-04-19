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
    // 1. Initialize Document
    const doc = new jsPDF('p', 'mm', 'a4');
    const ts = new Date().toLocaleString();

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); 
    doc.rect(0, 0, 210, 297, 'F');

    // Header
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); 
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    // Metadata
    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(8);
    doc.text(`ORIGIN: BMR_DIAGNOSTIC_NODE // ${String(email || "UNIDENTIFIED").toUpperCase()}`, 20, 40);
    doc.text(`PROTOCOL: ${String(result.protocol || "STRUCTURAL_HARDENING")} // TIMESTAMP: ${ts}`, 20, 45);

    // Financial Data Block
    doc.setDrawColor(30, 41, 59);
    doc.setFillColor(15, 23, 42);
    doc.rect(20, 60, 170, 45, 'FD');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex || 0}/100`, 30, 72);
    
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(12);
    doc.text(`IDENTIFIED REWORK TAX: $${result.reworkTax || "0"}M / YEAR`, 30, 82);
    
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`6-MONTH INACTION COST: $${result.inactionCost || "0"}M`, 30, 92);

    // Sector Analysis
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text("SECTOR VULNERABILITY ANALYSIS", 20, 125);
    
    // Hardcoded node definitions to prevent mapping errors
    const nodes = [
      { id: 'HAI', name: 'Human Alignment', s: result.zoneScores?.hai || 45 },
      { id: 'AVS', name: 'Business Value', s: result.zoneScores?.avs || 30 },
      { id: 'IGF', name: 'Safe Evolution', s: result.zoneScores?.igf || 60 }
    ];

    nodes.forEach((node, i) => {
      const y = 135 + (i * 25);
      const isCrit = node.s < 50;
      doc.setDrawColor(30, 41, 59);
      doc.line(20, y, 190, y);
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(`${node.id} // ${node.name}`, 20, y + 8);
      
      doc.setFillColor(isCrit ? 220 : 180, isCrit ? 38 : 83, isCrit ? 38 : 9);
      doc.rect(150, y + 3, 40, 7, 'F');
      doc.setFontSize(7);
      doc.text(`STATUS: ${isCrit ? "CRITICAL" : "COMPROMISED"}`, 153, y + 7.5);
    });

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("INTERNAL USE ONLY // BMR SOLUTIONS // PAGE_01", 20, 285);

    // --- FORCED PAGE 2 SEQUENCE ---
    doc.addPage(); // Start Page 2
    
    doc.setFillColor(2, 6, 23); // Background
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("EXHIBIT B // FORENSIC TOPOLOGY MAP", 20, 30);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("INPUT-BASED SNAPSHOT // PERCEPTION LOGIC FLOW", 20, 38);

    // Manual Node Drawing (Topology Map)
    const drawMapNode = (x: number, y: number, label: string, score: number) => {
        const isRed = score <= 35;
        const isYellow = score > 35 && score <= 70;
        const color = isRed ? [220, 38, 38] : isYellow ? [234, 179, 8] : [34, 197, 94];
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.rect(x, y, 75, 12, 'S');
        doc.setFontSize(7);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(`${label} // ${isRed ? "FRACTURE" : isYellow ? "DRIFT" : "STABLE"}`, x + 4, y + 7.5);
    };

    drawMapNode(67.5, 60, "NODE 01: HUMAN ALIGNMENT", nodes[0].s);
    drawMapNode(20, 80, "NODE 02: BUSINESS VALUE", nodes[1].s);
    drawMapNode(115, 80, "NODE 03: SAFE EVOLUTION", nodes[2].s);

    // Definitions
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("FORENSIC CONDITION DEFINITIONS", 20, 115);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    const definitions = [
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
    doc.text(definitions, 20, 128);

    // Final Posture Box
    doc.setFillColor(15, 23, 42);
    doc.rect(20, 190, 170, 25, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("REPORTED SYSTEM POSTURE:", 30, 201);
    
    const postLabel = result.frictionIndex > 70 ? "STABLE" : result.frictionIndex > 35 ? "WARNING" : "CRITICAL";
    const postRGB = result.frictionIndex > 70 ? [34, 197, 94] : result.frictionIndex > 35 ? [234, 179, 8] : [220, 38, 38];
    doc.setTextColor(postRGB[0], postRGB[1], postRGB[2]);
    doc.setFontSize(14);
    doc.text(postLabel, 30, 208);

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    // --- RETURN THE BLOB ---
    const pdfOutput = doc.output('blob');
    return URL.createObjectURL(pdfOutput);
  }
}
