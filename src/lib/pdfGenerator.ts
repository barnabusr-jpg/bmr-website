import { jsPDF } from 'jspdf';
// @ts-ignore
import html2canvas from 'html2canvas';

export default class ForensicPDFGenerator {
  static async generate(companyName: string = "PROSPECT"): Promise<void> {
    if (typeof window === 'undefined') return;

    const element = document.getElementById('forensic-report-container');

    if (!element) {
      console.error("BMR_ERROR: Container not found.");
      return;
    }

    try {
      // 1. Force the container to its full scroll height
      const originalHeight = element.style.height;
      element.style.height = 'auto';

      // 2. Capture the full container
      // @ts-ignore
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#020617',
        logging: false,
        windowWidth: 1200,
        height: element.scrollHeight, // Force the canvas to be the full height
        windowHeight: element.scrollHeight
      });

      element.style.height = originalHeight;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // PAGE 1
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // PAGE 2
      if (heightLeft > 5) { // 5mm buffer
        pdf.addPage();
        position = -pdfHeight; // Exactly one A4 page down
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      }

      const fileName = `${companyName.toUpperCase().replace(/\s+/g, '_')}_BMR_FORENSIC_AUDIT.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error("BMR_ERROR: PDF Generation failed.", error);
    }
  }
}
