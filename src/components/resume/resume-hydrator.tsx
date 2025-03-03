// components/ResumeHydrator.tsx
"use client";

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
} from "@/lib/store/resume";
import {
  ContactData,
  contactDataAtom,
  initialContactData,
} from "@/lib/store/contact";
import {
  contacts,
  educations,
  experiences,
  resumes,
  skills,
  summary,
} from "@/db/schema";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export type ResumeData = typeof resumes.$inferSelect & {
  experiences: (typeof experiences.$inferSelect)[];
  educations: (typeof educations.$inferSelect)[];
  skills: (typeof skills.$inferSelect)[];
  summary: typeof summary.$inferSelect;
  contact: typeof contacts.$inferSelect;
};

export default function ResumeHydrator({ data }: { data?: ResumeData }) {
  const setResume = useSetAtom(resumeAtom);
  const setContact = useSetAtom(contactDataAtom);
  const setExperiences = useSetAtom(experiencesAtom);
  const setEducations = useSetAtom(educationsAtom);
  const setSkills = useSetAtom(skillsAtom);
  const setSummary = useSetAtom(summaryAtom);

  useEffect(() => {
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
  ]);

  return null;
}

// Helper functions to map DB schema to client schema
const mapExperienceFromDB = (
  exp: typeof experiences.$inferSelect,
): Experience => ({
  id: exp.id,
  company: exp.companyName || "",
  position: exp.position || "",
  location: exp.location || "",
  dates: `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`,
  description: exp.description || "",
});

const mapEducationFromDB = (
  edu: typeof educations.$inferSelect,
): Education => ({
  id: edu.id,
  dates: `${edu.startDate} - ${edu.endDate}`,
  institution: edu.school || "",
  field: edu.fieldOfStudy || "",
  location: edu.location || "",
  degree: edu.degree || "",
  level: edu.location || "",
});

const mapContactFromDB = (
  contact?: typeof contacts.$inferSelect,
): ContactData | undefined | null =>
  contact
    ? {
        id: contact.id,
        fullName: contact.fullName || "",
        email: contact.email || "",
        phone: contact.phone || "",
        location: contact.location || "",
      }
    : contact;

const mapSkillsFromDB = (skill: typeof skills.$inferSelect) => {
  return skill.name;
};
