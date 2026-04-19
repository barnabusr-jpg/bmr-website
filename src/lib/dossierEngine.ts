import { jsPDF } from 'jspdf';

export default class DossierEngine {
  static async generate(result: any, lens: string): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4');
    const ts = new Date().toLocaleString();
    const refId = `BMR-${Math.random().toString(36).toUpperCase().substring(2, 8)}`;

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 297, 'F');
    doc.setFont("helvetica", "bold"); doc.setTextColor(220, 38, 38); doc.setFontSize(22);
    doc.text("BMR SOLUTIONS // FORENSIC BRIEFING", 20, 30);
    
    doc.setTextColor(71, 85, 105); doc.setFontSize(7);
    doc.text(`REF_ID: ${refId} // ORIGIN: ${lens.toUpperCase()} // ${ts}`, 20, 38);

    doc.setFillColor(15, 23, 42); doc.rect(20, 55, 170, 45, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(14);
    doc.text(`SYSTEMIC FRICTION INDEX: ${result.frictionIndex}/100`, 30, 70);

    doc.setTextColor(220, 38, 38); doc.setFontSize(11);
    doc.text(`REWORK TAX: $${result.reworkTax}M/YR`, 25, 120);
    doc.text(`6-MONTH INACTION COST: $${result.inactionCost}M`, 25, 130);

    // --- PAGE 2: EXHIBIT B (DYNAMIC TOPOLOGY) ---
    doc.addPage();
    doc.setFillColor(2, 6, 23); doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(20);
    doc.text("EXHIBIT B // FORENSIC TOPOLOGY MAP", 20, 30);

    const cx = 105; const cy = 110; const r = 60;
    const stability = Math.max(0.1, (100 - result.frictionIndex) / 100);

    // Static Reference Frame (The 'Ideal' Boundary)
    doc.setDrawColor(30, 41, 59); doc.setLineWidth(0.2);
    doc.line(cx, cy-r, cx-(r*0.866), cy+(r*0.5));
    doc.line(cx, cy-r, cx+(r*0.866), cy+(r*0.5));
    doc.line(cx-(r*0.866), cy+(r*0.5), cx+(r*0.866), cy+(r*0.5));

    // Dynamic Data Risk Polygon (The 'Actual' State)
    const p1 = { x: cx, y: cy - (r * stability) };
    const p2 = { x: cx - (r * 0.866 * (stability * 0.95)), y: cy + (r * 0.5 * (stability * 0.95)) };
    const p3 = { x: cx + (r * 0.866 * (stability * 1.05)), y: cy + (r * 0.5 * (stability * 1.05)) };

    doc.setDrawColor(220, 38, 38); doc.setLineWidth(0.8);
    doc.line(p1.x, p1.y, p2.x, p2.y); doc.line(p1.x, p1.y, p3.x, p3.y); doc.line(p2.x, p2.y, p3.x, p3.y);
    
    doc.setFillColor(220, 38, 38);
    doc.circle(p1.x, p1.y, 1, 'F'); doc.circle(p2.x, p2.y, 1, 'F'); doc.circle(p3.x, p3.y, 1, 'F');

    doc.setFontSize(8); doc.text("NODE_01: HUMAN", cx-10, cy-r-5);
    doc.text("NODE_02: VALUE", cx-(r*0.866)-10, cy+(r*0.5)+10);
    doc.text("NODE_03: SAFETY", cx+(r*0.866)-10, cy+(r*0.5)+10);

    doc.save(`BMR_DOSSIER_${refId}.pdf`);
  }
}
