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
    const doc = new jsPDF('p', 'mm', 'a4');
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); 
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); 
    doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);

    doc.setTextColor(71, 85, 105); 
    doc.setFontSize(8);
    doc.text(`ORIGIN: BMR_DIAGNOSTIC_NODE // ${email.toUpperCase()}`, 20, 40);
    doc.text(`PROTOCOL: ${result.protocol} // TIMESTAMP: ${ts} EST`, 20, 45);

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
    doc.setFontSize(13);
    doc.text("SECTOR VULNERABILITY ANALYSIS", 20, 125);
    
    // Explicitly defined zones to ensure no mapping errors
    const z1 = { id: 'HAI', name: 'Human Alignment', score: result.zoneScores?.hai || 45 };
    const z2 = { id: 'AVS', name: 'Business Value', score: result.zoneScores?.avs || 30 };
    const z3 = { id: 'IGF', name: 'Safe Evolution', score: result.zoneScores?.igf || 60 };
    const zones = [z1, z2, z3];

    let y = 135;
    zones.forEach(z => {
      const crit = z.score < 50;
      doc.setDrawColor(30, 41, 59);
      doc.line(20, y, 190, y);
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(`${z.id} // ${z.name}`, 20, y + 8);
      
      doc.setFillColor(crit ? 220 : 180, crit ? 38 : 83, crit ? 38 : 9);
      doc.rect(150, y + 3, 40, 7, 'F');
      doc.setFontSize(7);
      doc.text(`STATUS: ${crit ? "CRITICAL" : "COMPROMISED"}`, 153, y + 7.5);
      y += 25;
    });

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("INTERNAL USE ONLY // BMR SOLUTIONS // PAGE_01", 20, 285);

    // --- MANDATORY PAGE BREAK ---
    doc.addPage();
    
    // --- PAGE 2: EXHIBIT B ---
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
    const draw = (x: number, y: number, lab: string, s: number) => {
        const red = s <= 35;
        const yell = s > 35 && s <= 70;
        const c = red ? [220, 38, 38] : yell ? [234, 179, 8] : [34, 197, 94];
        doc.setDrawColor(c[0], c[1], c[2]);
        doc.rect(x, y, 75, 12, 'S');
        doc.setFontSize(7);
        doc.setTextColor(c[0], c[1], c[2]);
        doc.text(`${lab} // ${red ? "FRACTURE" : yell ? "DRIFT" : "STABLE"}`, x + 4, y + 7.5);
    };

    draw(67.5, 60, "NODE 01: HUMAN ALIGNMENT", z1.score);
    draw(20, 80, "NODE 02: BUSINESS VALUE", z2.score);
    draw(115, 80, "NODE 03: SAFE EVOLUTION", z3.score);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("FORENSIC CONDITION DEFINITIONS", 20, 115);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    const d = [
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
    doc.text(d, 20, 128);

    doc.setFillColor(15, 23, 42);
    doc.rect(20, 190, 170, 25, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("REPORTED SYSTEM POSTURE:", 30, 201);
    
    const post = result.frictionIndex > 70 ? "STABLE" : result.frictionIndex > 35 ? "WARNING" : "CRITICAL";
    const pc = result.frictionIndex > 70 ? [34, 197, 94] : result.frictionIndex > 35 ? [234, 179, 8] : [220, 38, 38];
    doc.setTextColor(pc[0], pc[1], pc[2]);
    doc.setFontSize(14);
    doc.text(post, 30, 208);

    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text("END_SECTION // EXHIBIT_B // BMR SOLUTIONS", 20, 285);

    // This is the specific method change to ensure multi-page delivery
    return doc.output('bloburl').toString();
  }
}
