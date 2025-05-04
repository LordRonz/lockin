'use server';

import { db } from '@/db';
import { eq } from 'drizzle-orm';
import {
  contacts,
  educations,
  experiences,
  resumes,
  skills,
  summary,
} from '@/db/schema';
import { getUser } from '@/lib/auth/get-user';
import { enhanceResume } from '@/lib/openai/enhance-resume';
import { buildConflictUpdateColumns } from '@/lib/db';
import { ResumeSectionType } from '@/type/resume';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type submitResumeProps = {
  title: string;
};

export async function submitResumeAction(data: submitResumeProps) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  await db.insert(resumes).values({ userId: user.user.id, ...data });

  return {
    type: 'RESUME_SUBMIT',
  };
}

export async function deleteResumeAction(resumeId: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  await db.delete(resumes).where(eq(resumes.id, resumeId));
  return {
    type: 'RESUME_DELETE',
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
    },
  });
}

export const getResumeListAction = async () => {
  const user = await getUser();
  if (!user) {
    return [];
  }
  return db.query.resumes.findMany({
    where: (resumes) => eq(resumes.userId, user.user.id),
  });
};

export const createResumeAction = async () => {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  return db.insert(resumes).values({ userId: user.user.id }).returning();
};

export const updateResumeUpdated = async (resumeId: string) => {
  await db
    .update(resumes)
    .set({ updatedAt: new Date() })
    .where(eq(resumes.id, resumeId));
  revalidatePath(`/resume/${resumeId}`);
};

export const updateResumeTitle = async (resumeId: string, title: string) => {
  await db.update(resumes).set({ title }).where(eq(resumes.id, resumeId));
  revalidatePath(`/resume/${resumeId}`);
};

export const saveSummaryAction = async (data: typeof summary.$inferInsert) => {
  const { id: _, ...dataWithoutId } = data;

  await db.insert(summary).values(data).onConflictDoUpdate({
    target: summary.resumeId,
    set: dataWithoutId,
  });

  return updateResumeUpdated(data.resumeId);
};

export const saveExperienceAction = async (
  data: (typeof experiences.$inferInsert)[],
) => {
  await db
    .insert(experiences)
    .values(data)
    .onConflictDoUpdate({
      target: experiences.id,
      set: buildConflictUpdateColumns(experiences, [
        'resumeId',
        'location',
        'companyName',
        'current',
        'description',
        'startDate',
        'endDate',
        'position',
      ]),
    });
  return updateResumeUpdated(data[0].resumeId);
};

export const saveEducationAction = async (
  data: (typeof educations.$inferInsert)[],
) => {
  await db
    .insert(educations)
    .values(data)
    .onConflictDoUpdate({
      target: educations.id,
      set: buildConflictUpdateColumns(educations, [
        'resumeId',
        'location',
        'description',
        'degree',
        'startDate',
        'endDate',
        'fieldOfStudy',
        'school',
      ]),
    });

  return updateResumeUpdated(data[0].resumeId);
};

export const saveSkillAction = async (data: (typeof skills.$inferInsert)[]) => {
  await db
    .insert(skills)
    .values(data)
    .onConflictDoUpdate({
      target: skills.id,
      set: buildConflictUpdateColumns(skills, ['resumeId', 'name', 'level']),
    });

  return updateResumeUpdated(data[0].resumeId);
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

    return updateResumeUpdated(data.resumeId);
  }
  throw new Error('Invalid contact update');
};

export async function aiEnhanceResumeAction(
  content: string,
  section: ResumeSectionType,
) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  return enhanceResume(content, section);
}
