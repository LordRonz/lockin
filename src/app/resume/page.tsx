import { getResumeListAction } from "@/actions/resume";
import { ResumeHeader } from "@/components/resume/resume-header";
import ResumeListPage from "@/components/resume/resume-list";
import { ResumeSidebar } from "@/components/resume/resume-sidebar";
import { ResumeProvider } from "@/context/resume-context";

export default async function ResumePage() {
  const resumes = await getResumeListAction();
  
  return (
    <ResumeProvider>
      <ResumeHeader />
      <div className="flex">
        <main className="flex-1 overflow-auto">
          <ResumeListPage resumes={resumes} />
        </main>
      </div>
    </ResumeProvider>
  );
}
