import { Experience } from "@/lib/store/resume";

// Helper functions to map client schema to DB schema
export const mapExperienceToDB = (exp: Experience) => ({
  companyName: exp.company,
  position: exp.position,
  location: exp.location,
  startDate: exp.dates.split("-")[0].trim(),
  endDate: exp.dates ? null : exp.dates.split("-")[1].trim(),
  description: exp.description,
});
