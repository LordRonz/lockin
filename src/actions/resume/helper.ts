import { Education, Experience } from "@/lib/store/resume";

// Helper functions to map client schema to DB schema
export const mapExperienceToDB = (exp: Experience) => ({
  companyName: exp.company,
  position: exp.position,
  location: exp.location,
  startDate: exp.dates.split("-")[0].trim(),
  endDate: exp.dates ? null : exp.dates.split("-")[1].trim(),
  description: exp.description,
});

export const mapEducationToDB = (edu: Education) => ({
  degree: edu.degree,
  school: edu.institution,
  fieldOfStudy: edu.field,
  startDate: edu.dates.split("-")[0].trim(),
  endDate: edu.dates? null : edu.dates.split("-")[1].trim(),
  location: edu.location,
});
