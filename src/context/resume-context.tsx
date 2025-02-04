// src/context/resume-context.tsx
"use client";
import { usePdfExport } from "@/app/hooks/usePdfExport";
import React, { createContext, useContext } from "react";

interface ResumeContextType {
  resumeRef: React.RefObject<HTMLDivElement | null>;
  downloadPdf: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { resumeRef, downloadPdf } = usePdfExport();

  return (
    <ResumeContext.Provider value={{ resumeRef, downloadPdf }}>
      {children}
    </ResumeContext.Provider>
  );
};
