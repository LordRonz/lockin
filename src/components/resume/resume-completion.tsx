import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import {
  educationsAtom,
  experiencesAtom,
  resumeAtom,
  skillsAtom,
  summaryAtom,
} from '@/lib/store/resume';
import { useAtomValue } from 'jotai';

const sections = ['Title', 'Summary', 'Experience', 'Skills', 'Education'];

export default function ResumeCompletion() {
  const resume = useAtomValue(resumeAtom);
  const summary = useAtomValue(summaryAtom);
  const experiences = useAtomValue(experiencesAtom);
  const skills = useAtomValue(skillsAtom);
  const educations = useAtomValue(educationsAtom);

  const completedSections = useMemo(() => {
    return {
      Title: Boolean(resume?.title?.trim()),
      Summary: Boolean(summary.text.trim()),
      Experience: experiences.length > 0,
      Skills: skills.length > 0,
      Education: educations.length > 0,
    };
  }, [resume, summary, experiences, skills, educations]);

  return (
    <div className="pt-4">
      {sections.map((section) => (
        <div
          key={section}
          className={cn(
            'flex items-center justify-between px-4 py-3 rounded-2xl mb-2 cursor-pointer group',
            'hover:bg-white-orange',
          )}
        >
          <span className={`font-medium group-hover:text-orange-a`}>
            {section}
          </span>

          <CheckIcon
            className={cn(
              'text-orange-a',
              !completedSections[section as keyof typeof completedSections] &&
                'hidden',
            )}
          />
        </div>
      ))}
    </div>
  );
}
