import { getResumeVersion } from '@/actions/resume';
import BackToResume from '@/components/button/back-to-resume';
import { ResumeEditor } from '@/components/resume/resume-editor';
import { ResumeHeader } from '@/components/resume/resume-header';
import { ResumeJobInput } from '@/components/resume/resume-job-input';
import { ResumeSidebar } from '@/components/resume/resume-sidebar';
import VersionHistoryHydrator from '@/components/resume/version-history-hydrator';
import { ResumeProvider } from '@/context/resume-context';

export default async function ResumeVersionHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const resumeVersion = await getResumeVersion(p.id);
  return (
    <ResumeProvider>
      <div className="container mx-auto max-w-6xl">
        <VersionHistoryHydrator data={resumeVersion} />
        <ResumeHeader />
        <BackToResume className="my-6" />
        <ResumeJobInput />
        <div className="flex">
          <main className="flex-1 overflow-auto">
            <ResumeEditor />
          </main>
          <ResumeSidebar />
        </div>
      </div>
    </ResumeProvider>
  );
}
