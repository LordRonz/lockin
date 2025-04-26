// components/ResumeHydrator.tsx
'use client';

import {
  experiencesAtom,
  educationsAtom,
  skillsAtom,
  summaryAtom,
  Experience,
  Education,
  resumeAtom,
  initialExperiences,
  initialEducations,
  initialSkills,
  initialSummary,
  Resume,
} from '@/lib/store/resume';
import {
  ContactData,
  contactDataAtom,
  initialContactData,
} from '@/lib/store/contact';
import {
  contacts,
  educations,
  experiences,
  resumes,
  skills,
  summary,
} from '@/db/schema';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { isLocalStorageAtom } from '@/lib/store/isLocalStorage';

export type ResumeData = typeof resumes.$inferSelect & {
  experiences: (typeof experiences.$inferSelect)[];
  educations: (typeof educations.$inferSelect)[];
  skills: (typeof skills.$inferSelect)[];
  summary: typeof summary.$inferSelect;
  contact: typeof contacts.$inferSelect;
};

type ExperienceData = typeof experiences.$inferSelect;
type EducationData = typeof educations.$inferSelect;
type SkillsData = typeof skills.$inferSelect;
type SummaryData = typeof summary.$inferSelect;

export default function ResumeHydrator({
  data,
  useLocalStorage,
}: {
  data?: ResumeData;
  useLocalStorage?: boolean;
}) {
  const setResume = useSetAtom(resumeAtom);
  const setContact = useSetAtom(contactDataAtom);
  const setExperiences = useSetAtom(experiencesAtom);
  const setEducations = useSetAtom(educationsAtom);
  const setSkills = useSetAtom(skillsAtom);
  const setSummary = useSetAtom(summaryAtom);
  const setIsLocalStorage = useSetAtom(isLocalStorageAtom);

  useEffect(() => {
    if (useLocalStorage && data?.id) {
      const resumesArr = JSON.parse(localStorage.getItem('resumes') || '[]');
      const contactsArr = JSON.parse(localStorage.getItem('contacts') || '[]');
      const experiencesArr = JSON.parse(
        localStorage.getItem('experiences') || '[]',
      );
      const educationsArr = JSON.parse(
        localStorage.getItem('educations') || '[]',
      );
      const skillsArr = JSON.parse(localStorage.getItem('skills') || '[]');
      const summaryArr = JSON.parse(localStorage.getItem('summary') || '[]');

      const resume = resumesArr.find((r: Resume) => r.id === data.id);
      resume.updatedAt = new Date(resume.updatedAt);
      resume.createdAt = new Date(resume.createdAt);
      const contact = contactsArr.find(
        (c: typeof contacts.$inferSelect) => c.resumeId === data.id,
      );
      const experiences = experiencesArr.filter(
        (e: ExperienceData) => e.resumeId === data.id,
      );
      const educations = educationsArr.filter(
        (e: EducationData) => e.resumeId === data.id,
      );
      const skills = skillsArr.filter(
        (s: SkillsData) => s.resumeId === data.id,
      );
      const summary = summaryArr.find(
        (s: SummaryData) => s.resumeId === data.id,
      );

      setResume(resume ?? initialExperiences);
      setContact(contact ?? initialContactData);
      setExperiences(
        experiences.length > 0
          ? experiences.map(mapExperienceFromDB)
          : initialExperiences,
      );
      setEducations(
        educations.length > 0
          ? educations.map(mapEducationFromDB)
          : initialEducations,
      );
      setSkills(
        skills.length > 0 ? skills.map(mapSkillsFromDB) : initialSkills,
      );
      setSummary(summary ?? initialSummary);

      setIsLocalStorage(true);
      return;
    }

    if (!data) return;

    setResume(data);
    setContact(mapContactFromDB(data.contact) ?? initialContactData);
    setExperiences(
      data.experiences.map(mapExperienceFromDB) ?? initialExperiences,
    );
    setEducations(data.educations.map(mapEducationFromDB) ?? initialEducations);
    setSkills(data.skills.map(mapSkillsFromDB) ?? initialSkills);
    setSummary(data.summary ?? initialSummary);
  }, [
    data,
    data?.id,
    setResume,
    setContact,
    setExperiences,
    setEducations,
    setSkills,
    setSummary,
    useLocalStorage,
    setIsLocalStorage,
  ]);

  return null;
}

// Helper functions to map DB schema to client schema
const mapExperienceFromDB = (
  exp: typeof experiences.$inferSelect,
): Experience => ({
  id: exp.id,
  company: exp.companyName || '',
  position: exp.position || '',
  location: exp.location || '',
  dates: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
  description: exp.description || '',
});

const mapEducationFromDB = (
  edu: typeof educations.$inferSelect,
): Education => ({
  id: edu.id,
  dates: `${edu.startDate} - ${edu.endDate}`,
  institution: edu.school || '',
  field: edu.fieldOfStudy || '',
  location: edu.location || '',
  degree: edu.degree || '',
  level: edu.location || '',
});

const mapContactFromDB = (
  contact?: typeof contacts.$inferSelect,
): ContactData | undefined | null =>
  contact
    ? {
        id: contact.id,
        fullName: contact.fullName || '',
        email: contact.email || '',
        phone: contact.phone || '',
        location: contact.location || '',
      }
    : contact;

const mapSkillsFromDB = (skill: typeof skills.$inferSelect) => {
  return skill.name;
};
