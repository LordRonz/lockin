"use client";

import BackToResume from "../button/back-to-resume";
import { ResumeComponent } from "./resume";
import { useResumeContext } from "@/context/resume-context";

export function ResumeEditor() {
  const { resumeRef } = useResumeContext();
  return (
    <div className="py-8 mb-4">
      <BackToResume />
      <ResumeComponent ref={resumeRef} />
    </div>
  );
}
