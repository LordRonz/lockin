"use client";

import { ResumeComponent } from "./resume";
import { Button } from "@/components/ui/button";
import { usePdfExport } from "@/app/hooks/usePdfExport";
import { DownloadIcon } from "lucide-react";

export function ResumeEditor() {
  const { resumeRef, downloadPdf } = usePdfExport();
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Button className="my-6" onClick={() => downloadPdf()}>
        Download PDF
        <DownloadIcon className="ml-2" />
      </Button>
      <ResumeComponent ref={resumeRef} />
    </div>
  );
}
