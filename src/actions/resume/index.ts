"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import {
  contacts,
  educations,
  experiences,
  resumes,
  skills,
  summary,
} from "@/db/schema";
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

export const getResumeListAction = async () => {
  const user = await getUser();
  return db.query.resumes.findMany({
    where: (resumes) => eq(resumes.userId, user.user.id),
  });
}

export const createResumeAction = async () => {
  const user = await getUser();
  return db.insert(resumes).values({ userId: user.user.id }).returning();
}

export const saveSummaryAction = async (resumeId: string, text: string) => {
  await db.update(summary).set({ text }).where(eq(summary.resumeId, resumeId));
};

export const saveExperienceAction = async (
  data: typeof experiences.$inferInsert,
) => {
  const { id: _, ...dataWithoutId } = data;
  await db.insert(experiences).values(data).onConflictDoUpdate({
    target: experiences.id,
    set: dataWithoutId,
  });
};

export const saveEducationAction = async (
  data: typeof educations.$inferInsert,
) => {
  const { id: _, ...dataWithoutId } = data;
  await db.insert(educations).values(data).onConflictDoUpdate({
    target: educations.id,
    set: dataWithoutId,
  });
};

export const saveSkillAction = async (data: typeof skills.$inferInsert) => {
  const { id: _, ...dataWithoutId } = data;
  await db.insert(skills).values(data).onConflictDoUpdate({
    target: skills.id,
    set: dataWithoutId,
  });
};

export const saveContactAction = async (
  data: typeof contacts.$inferInsert,
  id?: string | null,
  resumeId?: string | null,
) => {
  if (!id) {
    const { id: _, ...dataWithoutId } = data;
    await db.insert(contacts).values(data).onConflictDoUpdate({
      target: contacts.id,
      set: dataWithoutId,
    });
    return;
  }
  if (resumeId) {
    await db
      .update(contacts)
      .set(data)
      .where(eq(contacts.resumeId, resumeId as string));
    return;
  }
  throw new Error("Invalid contact update");
};

export async function aiEnhanceResumeAction(
  content: string,
  section: ResumeSectionType,
) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return enhanceResume(content, section);
}
