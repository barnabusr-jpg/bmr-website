import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface DirectiveItem {
  title: string;
  price: string;
  scope: string;
}

interface PDFBlueprintSchema {
  company: string;
  directives: DirectiveItem[];
}

export async function generatePdf(sowData: PDFBlueprintSchema): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  
  const HelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const Helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const CourierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  // Canvas Base Wrapper (Dark Executive Theme)
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 600,
    height: 800,
    color: rgb(0.01, 0.02, 0.06),
  });

  // Header Subtitle: Pre-Automation Control Plane Alignment
  page.drawText('BMR SOLUTIONS // STATEMENT OF WORK', { 
    x: 40, 
    y: 740, 
    size: 10, 
    font: CourierBold, 
    color: rgb(0.86, 0.15, 0.15)
  });
  
  page.drawText('Pre-Automation AI Control Plane & Executive Directives', { 
    x: 40, 
    y: 722, 
    size: 12, 
    font: Helvetica, 
    color: rgb(0.6, 0.6, 0.6) 
  });
  
  page.drawText(`CLIENT TARGET ENTITY: ${sowData.company.toUpperCase()}`, { 
    x: 40, 
    y: 680, 
    size: 14, 
    font: HelveticaBold, 
    color: rgb(1, 1, 1) 
  });

  // Top Divider Line
  page.drawRectangle({
    x: 40,
    y: 665,
    width: 520,
    height: 1,
    color: rgb(0.1, 0.15, 0.25),
  });

  // 🏆 EXECUTIVE SUMMARY BOX (PRE-AUTOMATION BADGE)
  page.drawRectangle({
    x: 40,
    y: 595,
    width: 520,
    height: 55,
    color: rgb(0.04, 0.08, 0.18),
    borderColor: rgb(0.86, 0.15, 0.15),
    borderWidth: 1,
  });

  page.drawText('EXECUTIVE SUMMARY // PRE-AUTOMATION AI CONTROL PLANE', {
    x: 55,
    y: 632,
    size: 9,
    font: CourierBold,
    color: rgb(0.86, 0.15, 0.15),
  });

  page.drawText('Establishes machine-readable ingestion contracts and telemetry filters prior to autonomous agent scale.', {
    x: 55,
    y: 610,
    size: 9,
    font: Helvetica,
    color: rgb(0.8, 0.8, 0.8),
  });

  let trackingVerticalY = 550;

  // Directives Iteration Loop
  sowData.directives.forEach((directive: DirectiveItem, index: number) => {
    if (trackingVerticalY < 120) return;

    // Track Title
    page.drawText(`0${index + 1} // ${directive.title}`, { 
      x: 40, 
      y: trackingVerticalY, 
      size: 11, 
      font: HelveticaBold, 
      color: rgb(1, 1, 1) 
    });
    trackingVerticalY -= 18;

    // Scope Framework Description
    page.drawText(`Scope Framework Focus: ${directive.scope}`, { 
      x: 55, 
      y: trackingVerticalY, 
      size: 9, 
      font: Helvetica, 
      color: rgb(0.6, 0.6, 0.6) 
    });
    trackingVerticalY -= 16;

    // Colored Priority Badge Text
    page.drawText(`Implementation Priority: ${directive.price}`, { 
      x: 55, 
      y: trackingVerticalY, 
      size: 9, 
      font: CourierBold, 
      color: rgb(0.86, 0.15, 0.15) 
    });
    trackingVerticalY -= 35; 
  });

  // Footer Divider & Security Stamp
  page.drawRectangle({ x: 40, y: 60, width: 520, height: 1, color: rgb(0.1, 0.15, 0.25) });
  
  const currentYear = new Date().getFullYear();
  page.drawText(`BMR SOLUTIONS © ${currentYear} // CONFIDENTIALITY MATRIX ENFORCED // CLOSING THE PROMISE GAP™`, { 
    x: 40, 
    y: 42, 
    size: 8, 
    font: CourierBold, 
    color: rgb(0.3, 0.3, 0.4) 
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
