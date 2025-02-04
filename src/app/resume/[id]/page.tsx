import { ResumeEditor } from "@/components/resume/resume-editor";
import { ResumeHeader } from "@/components/resume/resume-header";
import { ResumeSidebar } from "@/components/resume/resume-sidebar";
import { ResumeProvider } from "@/context/resume-context";

export default function ResumePage() {
  return (
    <ResumeProvider>
      <div className="flex h-screen bg-[#F8F7F3]">
        <main className="flex-1 overflow-auto">
          <ResumeHeader />
          <ResumeEditor />
        </main>
        <ResumeSidebar />
      </div>
    </ResumeProvider>
  );
}
