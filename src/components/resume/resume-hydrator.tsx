// components/ResumeHydrator.tsx
"use client";

import { useHydrateAtoms } from "jotai/utils";
import {
  experiencesAtom,
  educationsAtom,
  skillsAtom,
  summaryAtom,
  Experience,
  Education,
} from "@/lib/store/resume";
import { contactDataAtom } from "@/lib/store/contact";
import { educations, experiences } from "@/db/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ResumeHydrator({ data }: { data: any }) {
  useHydrateAtoms([
    [contactDataAtom, data.contact],
    [experiencesAtom, data.experiences.map(mapExperienceFromDB)],
    [educationsAtom, data.educations.map(mapEducationFromDB)],
    [skillsAtom, data.skills],
    [summaryAtom, data.summary],
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
