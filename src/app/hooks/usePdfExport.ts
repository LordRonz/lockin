// components/Resume/usePdfExport.ts
import { useRef } from 'react';
import jsPDF from 'jspdf';

export const usePdfExport = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    if (!resumeRef.current) return;

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: 'a4',
    });
    const pageWidth = pdf.internal.pageSize.getWidth();

    await pdf.html(resumeRef.current, {
      x: 0,
      y: 0,
      html2canvas: {
        scale: pageWidth / resumeRef.current.offsetWidth,
        useCORS: true,
      },
      callback: (doc) => {
        doc.save('resume.pdf');
      },
      margin: 0,
      windowWidth: resumeRef.current.scrollWidth,
    });
  };

  return { resumeRef, downloadPdf };
};
