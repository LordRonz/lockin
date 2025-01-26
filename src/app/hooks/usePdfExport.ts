// components/Resume/usePdfExport.ts
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const usePdfExport = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2, // Increase for better resolution
      useCORS: true,
      logging: true,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    
    // Handle multi-page content
    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('resume.pdf');
  };

  return { resumeRef, downloadPdf };
};