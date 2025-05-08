import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import {
  educationsAtom,
  experiencesAtom,
  resumeAtom,
  skillsAtom,
  summaryAtom,
  initialExperiences,
  initialEducations,
  initialSkills,
  initialSummary,
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
    // Title: not empty and not default
    const isTitleComplete =
      Boolean(resume?.title?.trim()) &&
      resume?.title?.trim() !== 'Untitled Resume';

    const isSummaryComplete =
      summary.text.trim().length > 0 &&
      summary.text.trim() !== initialSummary.text.trim();

    const isExperienceComplete =
      experiences.length > 0 &&
      JSON.stringify(experiences) !== JSON.stringify(initialExperiences);

    const isSkillsComplete =
      skills.length > 0 &&
      JSON.stringify(skills) !== JSON.stringify(initialSkills);

    const isEducationComplete =
      educations.length > 0 &&
      JSON.stringify(educations) !== JSON.stringify(initialEducations);

    return {
      Title: isTitleComplete,
      Summary: isSummaryComplete,
      Experience: isExperienceComplete,
      Skills: isSkillsComplete,
      Education: isEducationComplete,
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

          <div className="flex items-center justify-center w-6">
            <CheckIcon
              className={cn(
                'text-orange-a',
                !completedSections[section as keyof typeof completedSections] &&
                  'hidden',
              )}
            />
            <span
              className={cn(
                'text-red-600 text-3xl font-semibold leading-0',
                completedSections[section as keyof typeof completedSections] &&
                  'hidden',
              )}
            >
              {'!'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
