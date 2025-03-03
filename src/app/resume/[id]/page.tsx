import { getResumeData } from "@/actions/resume";
import { ResumeEditor } from "@/components/resume/resume-editor";
import { ResumeHeader } from "@/components/resume/resume-header";
import { ResumeSidebar } from "@/components/resume/resume-sidebar";
import { ResumeProvider } from "@/context/resume-context";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resume = await getResumeData((await params).id);
  return (
    <ResumeProvider>
      <ResumeHeader />
      <div className="flex">
        <main className="flex-1 overflow-auto">
          <ResumeEditor />
        </main>
        <ResumeSidebar />
      </div>
    </ResumeProvider>
  );
}
