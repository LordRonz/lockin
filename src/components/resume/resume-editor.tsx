"use client";

import { ResumeComponent } from "./resume";
import { useResumeContext } from "@/context/resume-context";

export function ResumeEditor() {
  const { resumeRef } = useResumeContext();
  return (
    <div className="py-8 mb-4">
      <ResumeComponent ref={resumeRef} />
    </div>
  );
}
