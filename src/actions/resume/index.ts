"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { resumes } from "@/db/schema";
import { getUser } from "@/lib/auth/get-user";
import { enhanceResume } from "@/lib/openai/enhance-resume";
import { ResumeSectionType } from "@/type/resume";
import { redirect } from "next/navigation";

type submitResumeProps = {
  title: string;
};

export async function submitResumeAction(data: submitResumeProps) {
  const user = await getUser();

  await db.insert(resumes).values({ userId: user.user.id, ...data });

  return {
    type: "RESUME_SUBMIT",
  };
}

export async function getResumeData(resumeId: string) {
  return db.query.resumes.findFirst({
    where: (resumes) => eq(resumes.id, resumeId),
    with: {
      contact: true,
      experiences: true,
      educations: true,
      skills: true,
      summary: true,
      sections: true,
    },
  });
}

// Helper functions to map client schema to DB schema
// const mapExperienceToDB = (exp: Experience) => ({
//   companyName: exp.company,
//   position: exp.position,
//   location: exp.location,
//   startDate: exp.dates.split("-")[0].trim(),
//   endDate: exp.dates ? null : exp.dates.split("-")[1].trim(),
//   description: exp.description,
// });

export async function aiEnhanceResumeAction(
  content: string,
  section: ResumeSectionType,
) {
  const user = await getUser();
  if (!user) {
    redirect('/login')
  }
  
  return enhanceResume(content, section);
}
