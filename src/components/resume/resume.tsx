import { cn } from '@/lib/utils';
import { ReactNode, MouseEvent, RefObject } from 'react';
import { ContactModal } from './sections/contact-section';
import React from 'react';
import { contactDataAtom, contactModalOpenAtom } from '@/lib/store/contact';
import { useAtom } from 'jotai';
import {
  educationsAtom,
  educationModalOpenAtom,
  experienceModalOpenAtom,
  experiencesAtom,
  skillsAtom,
  skillsModalOpenAtom,
  summaryAtom,
  summaryModalOpenAtom,
} from '@/lib/store/resume';
import { ExperienceModal } from './sections/experience-modal';
import { EducationModal } from './sections/education-modal';
import { SkillsModal } from './sections/skills-modal';
import { SummaryModal } from './sections/summary-modal';

interface ResumeSectionProps {
  title?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const ResumeSection = ({ title, children, onClick }: ResumeSectionProps) => (
  <section
    className="group p-4 transition-colors
               duration-500
               cursor-pointer text-black-a hover:text-orange-a focus:outline-hidden focus:ring-2 focus:ring-blue-300 hover:bg-white-orange hover:ring-white-orange active:ring-orange-a hover:ring-1 rounded-3xl"
    tabIndex={0}
    onClick={onClick}
  >
    <h2 className={cn('text-xl font-semibold mb-4', !title && 'hidden')}>
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </section>
);

interface ExperienceItemProps {
  company: string;
  location: string;
  position: string;
  dates: string;
  children: ReactNode;
}

const ExperienceItem = ({
  company,
  location,
  position,
  dates,
  children,
}: ExperienceItemProps) => (
  <div className="mb-6">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-medium text-gray-900">
          {company} | {location}
        </h3>
        <p className="text-gray-700">{position}</p>
      </div>
      <span className="text-sm text-gray-500">{dates}</span>
    </div>
    <div className="text-gray-600 space-y-2">{children}</div>
  </div>
);

export const ResumeComponent = ({
  ref,
}: {
  ref?: RefObject<HTMLDivElement | null>;
}) => {
  const [contactData] = useAtom(contactDataAtom);
  const [experiences] = useAtom(experiencesAtom);
  const [educations] = useAtom(educationsAtom);
  const [skills] = useAtom(skillsAtom);
  const [summary] = useAtom(summaryAtom);

  const [, setContactModalOpen] = useAtom(contactModalOpenAtom);
  const [, setExperienceModalOpen] = useAtom(experienceModalOpenAtom);
  const [, setEducationModalOpen] = useAtom(educationModalOpenAtom);
  const [, setSkillsModalOpen] = useAtom(skillsModalOpenAtom);
  const [, setSummaryModalOpen] = useAtom(summaryModalOpenAtom);

  const contactInfo = [
    contactData.phone,
    contactData.email,
    contactData.location,
  ].filter(Boolean);

  return (
    <div className="max-w-3xl m-0 mx-0 my-0 bg-white-a border-gray-b border-1 rounded-4xl">
      <div className="p-4" ref={ref}>
        <ResumeSection onClick={() => setContactModalOpen(true)}>
          <h1 className="text-3xl font-bold mb-2 text-inherit">
            {contactData.fullName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4">
            {contactInfo.map((info, index) => (
              <React.Fragment key={index}>
                <span>{info}</span>
                {index < contactInfo.length - 1 && <span className="">·</span>}
              </React.Fragment>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection
          title="Summary"
          onClick={() => setSummaryModalOpen(true)}
        >
          <p>{summary.text}</p>
        </ResumeSection>

        <ResumeSection
          title="Experience"
          onClick={() => setExperienceModalOpen(true)}
        >
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              company={exp.company}
              location={exp.location}
              position={exp.position}
              dates={exp.dates}
            >
              <ul className="list-disc pl-6 space-y-2">
                {exp.description.split('\n').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </ExperienceItem>
          ))}
        </ResumeSection>

        <ResumeSection title="Skills" onClick={() => setSkillsModalOpen(true)}>
          <div className="flex flex-wrap gap-4">
            <span>{skills.join(' | ')}</span>
          </div>
        </ResumeSection>

        <ResumeSection
          title="Education"
          onClick={() => setEducationModalOpen(true)}
        >
          {educations.map((edu, index) => (
            <div
              className="flex justify-between items-start"
              key={edu.institution + index}
            >
              <div>
                <h3 className="font-medium text-inherit">{edu.institution}</h3>
                <p className="text-inherit">
                  {edu.degree} in {edu.field}
                </p>
              </div>
              <div className="text-right">
                <p className="text-inherit">{edu.location}</p>
                <p className="text-sm text-inherit">{edu.dates}</p>
              </div>
            </div>
          ))}
        </ResumeSection>
        <ContactModal />
        <ExperienceModal />
        <EducationModal />
        <SkillsModal />
        <SummaryModal />
      </div>
    </div>
  );
};
