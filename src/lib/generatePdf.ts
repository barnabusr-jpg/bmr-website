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

  // Canvas Base Wrapper (Executive Light Theme - Slate 50)
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 600,
    height: 800,
    color: rgb(0.97, 0.98, 0.99),
  });

  // Header Subtitle: Pre-Automation Control Plane Alignment
  page.drawText('BMR SOLUTIONS // STATEMENT OF WORK', { 
    x: 40, 
    y: 740, 
    size: 10, 
    font: CourierBold, 
    color: rgb(0.06, 0.09, 0.16) // Slate 900
  });
  
  page.drawText('Pre-Automation AI Control Plane & Governance Directives', { 
    x: 40, 
    y: 722, 
    size: 11, 
    font: Helvetica, 
    color: rgb(0.39, 0.45, 0.55) // Slate 500
  });
  
  page.drawText(`CLIENT TARGET: ${sowData.company.trim()}`, { 
    x: 40, 
    y: 680, 
    size: 14, 
    font: HelveticaBold, 
    color: rgb(0.06, 0.09, 0.16) // Slate 900
  });

  // Top Divider Line
  page.drawRectangle({
    x: 40,
    y: 665,
    width: 520,
    height: 1,
    color: rgb(0.88, 0.91, 0.94), // Slate 200
  });

  // EXECUTIVE SUMMARY BOX (White Card with Dark Accent Line)
  page.drawRectangle({
    x: 40,
    y: 595,
    width: 520,
    height: 55,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.88, 0.91, 0.94),
    borderWidth: 1,
  });

  // Left Accent Bar
  page.drawRectangle({
    x: 40,
    y: 595,
    width: 4,
    height: 55,
    color: rgb(0.06, 0.09, 0.16),
  });

  page.drawText('EXECUTIVE SUMMARY // PRE-AUTOMATION CONTROL PLANE', {
    x: 55,
    y: 630,
    size: 9,
    font: CourierBold,
    color: rgb(0.06, 0.09, 0.16),
  });

  page.drawText('Establishes machine-readable ingestion contracts and telemetry filters prior to scaling autonomous agents.', {
    x: 55,
    y: 610,
    size: 9,
    font: Helvetica,
    color: rgb(0.2, 0.25, 0.33),
  });

  let trackingVerticalY = 550;

  // Directives Iteration Loop
  sowData.directives.forEach((directive: DirectiveItem, index: number) => {
    if (trackingVerticalY < 120) return;

    // Track Card Background
    page.drawRectangle({
      x: 40,
      y: trackingVerticalY - 55,
      width: 520,
      height: 65,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.88, 0.91, 0.94),
      borderWidth: 1,
    });

    // Track Title
    page.drawText(`Scope 0${index + 1} // ${directive.title}`, { 
      x: 52, 
      y: trackingVerticalY - 12, 
      size: 11, 
      font: HelveticaBold, 
      color: rgb(0.06, 0.09, 0.16) 
    });

    // Scope Description
    page.drawText(`Focus Area: ${directive.scope}`, { 
      x: 52, 
      y: trackingVerticalY - 28, 
      size: 9, 
      font: Helvetica, 
      color: rgb(0.39, 0.45, 0.55) 
    });

    // Priority Badge Text
    page.drawText(`Alignment Status: ${directive.price}`, { 
      x: 52, 
      y: trackingVerticalY - 44, 
      size: 8, 
      font: CourierBold, 
      color: rgb(0.86, 0.15, 0.15) 
    });

    trackingVerticalY -= 80; 
  });

  // Footer Divider & Security Stamp
  page.drawRectangle({ x: 40, y: 60, width: 520, height: 1, color: rgb(0.88, 0.91, 0.94) });
  
  const currentYear = new Date().getFullYear();
  page.drawText(`BMR SOLUTIONS © ${currentYear} // CONFIDENTIAL // CLOSING THE PROMISE GAP™`, { 
    x: 40, 
    y: 42, 
    size: 8, 
    font: CourierBold, 
    color: rgb(0.58, 0.64, 0.72) 
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
