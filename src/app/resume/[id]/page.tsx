import { getResumeData } from '@/actions/resume';
import BackToResume from '@/components/button/back-to-resume';
import { ResumeEditor } from '@/components/resume/resume-editor';
import { ResumeHeader } from '@/components/resume/resume-header';
import ResumeHydrator, {
  ResumeData,
} from '@/components/resume/resume-hydrator';
import { ResumeJobInput } from '@/components/resume/resume-job-input';
import { ResumeSidebar } from '@/components/resume/resume-sidebar';
import { ResumeProvider } from '@/context/resume-context';
import { getUser } from '@/lib/auth/get-user';

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUser();
  const p = await params;
  const resume = user
    ? await getResumeData(p.id)
    : ({ id: p.id } as ResumeData);
  return (
    <ResumeProvider>
      <div className="container mx-auto max-w-6xl">
        <ResumeHydrator data={resume} useLocalStorage={!user} />
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
