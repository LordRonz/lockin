import { getResumeListAction } from '@/actions/resume';
import { ResumeHeader } from '@/components/resume/resume-header';
import ResumeListPage from '@/components/resume/resume-list';
import { ResumeProvider } from '@/context/resume-context';
import { getUser } from '@/lib/auth/get-user';

export default async function ResumePage() {
  const resumes = await getResumeListAction();
  const user = await getUser();

  return (
    <ResumeProvider>
      <ResumeHeader />
      <div className="flex">
        <main className="flex-1 overflow-auto">
          <ResumeListPage resumes={resumes} useLocalStorage={!user} />
        </main>
      </div>
    </ResumeProvider>
  );
}
