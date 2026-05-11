const generateForensicPDF = async (audit: any) => {
    // 🏛️ DATA PARAMETERS
    const laborTax = "$83,200";
    const exposure = "$248,400";
    const capacityLoss = "8%";

    const printArea = document.createElement('div');
    printArea.style.position = 'absolute';
    printArea.style.left = '-9999px';
    
    // Exact CSS replication of the Dossier UI
    printArea.innerHTML = `
      <div style="width: 1000px; background: #020617; padding: 80px; font-family: 'Helvetica', sans-serif; color: white; text-transform: uppercase;">
        
        <div style="background: white; color: black; padding: 60px 80px; border-left: 15px solid #dc2626; margin-bottom: 40px;">
          <h1 style="font-size: 58px; font-weight: 900; font-style: italic; margin: 0; letter-spacing: -3px; line-height: 1;">Executive Briefing</h1>
          <p style="font-size: 14px; font-weight: 900; color: #666; letter-spacing: 4px; margin-top: 15px; font-family: monospace;">ENTITY // ${audit.org_name.toUpperCase()}</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; margin-top: 60px;">
            <div>
              <p style="font-size: 11px; font-weight: 900; color: #dc2626; letter-spacing: 2px; margin-bottom: 10px;">Capacity Loss</p>
              <p style="font-size: 22px; font-weight: 900; font-style: italic; margin: 0;">Wasting <span style="color: #dc2626;">${capacityLoss}</span> Total Capacity</p>
            </div>
            <div>
              <p style="font-size: 11px; font-weight: 900; color: #dc2626; letter-spacing: 2px; margin-bottom: 10px;">Financial Leak</p>
              <p style="font-size: 22px; font-weight: 900; font-style: italic; margin: 0;">Labor Tax: <span style="color: #dc2626;">${laborTax}</span></p>
            </div>
            <div>
              <p style="font-size: 11px; font-weight: 900; color: #dc2626; letter-spacing: 2px; margin-bottom: 10px;">Exposure</p>
              <p style="font-size: 22px; font-weight: 900; font-style: italic; margin: 0;">Exposes: <span style="color: #dc2626;">${exposure}</span></p>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%;">
          <div style="background: #050b1a; border: 1px solid #1e293b; padding: 80px 40px; text-align: left;">
            <h2 style="font-size: 100px; font-weight: 900; font-style: italic; margin: 0; line-height: 1; letter-spacing: -5px;">${laborTax}</h2>
            <p style="font-size: 12px; font-weight: 900; color: #475569; letter-spacing: 4px; margin-top: 20px;">Annual Labor Waste</p>
          </div>
          
          <div style="background: #050b1a; border: 4px solid #dc2626; padding: 80px 40px; text-align: left;">
            <h2 style="font-size: 100px; font-weight: 900; font-style: italic; margin: 0; line-height: 1; letter-spacing: -5px; color: #dc2626;">${exposure}</h2>
            <p style="font-size: 12px; font-weight: 900; color: #dc2626; letter-spacing: 4px; margin-top: 20px;">Total Capital Exposure</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(printArea);

    try {
      const canvas = await html2canvas(printArea, {
        backgroundColor: "#020617",
        scale: 2,
        useCORS: true
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // Black Background Header
      pdf.setFillColor(2, 6, 23);
      pdf.rect(0, 0, pdfWidth, 50, "F");
      
      // Brand Seal (Design.png)
      pdf.addImage(CHEVRON_URL, "PNG", pdfWidth - 55, 8, 40, 35);

      // Report Metadata
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      pdf.text("BMR // FORENSIC_VERDICT", 15, 22);
      
      pdf.setFontSize(8);
      pdf.setTextColor(220, 38, 38);
      pdf.text(`SIGNAL_ID: ${audit.id.toUpperCase()}`, 15, 30);

      // Mapping Image (Stretch to Full Width)
      const imgProps = pdf.getImageProperties(imgData);
      const pdfImageWidth = pdfWidth - 10; 
      const imgHeight = (imgProps.height * pdfImageWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 5, 50, pdfImageWidth, imgHeight);

      // Watermark (Design.png)
      pdf.setGState(new pdf.GState({ opacity: 0.03 }));
      pdf.addImage(CHEVRON_URL, "PNG", pdfWidth / 4, 120, 100, 100);

      pdf.save(`BMR_DOSSIER_${audit.org_name}.pdf`);
      document.body.removeChild(printArea);
    } catch (err) {
      console.error("PDF_ERROR", err);
      document.body.removeChild(printArea);
    }
  };
