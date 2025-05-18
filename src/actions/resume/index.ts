'use server';

import { db } from '@/db';
import { desc, eq } from 'drizzle-orm';
import {
  contacts,
  educations,
  experiences,
  resumes,
  resumeVersions,
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

// Create a version
export const createVersion = async (
  resumeId: string,
  name: string,
  compressedContent: string,
) => {
  await db.insert(resumeVersions).values({
    resumeId,
    name,
    content: compressedContent,
  });
};

// Get a specific version history
export const getResumeVersion = async (versionId: string) => {
  const version = await db.query.resumeVersions.findFirst({
    where: eq(resumeVersions.id, versionId),
  });

  if (!version) {
    throw new Error('Version not found');
  }

  return version;
};

// Restore a version
export const restoreVersion = async (
  versionId: string,
  decompressedContent: Awaited<ReturnType<typeof getResumeData>>,
) => {
  const version = await db.query.resumeVersions.findFirst({
    where: eq(resumeVersions.id, versionId),
  });
  if (!version || !decompressedContent) {
    throw new Error('Version not found');
  }

  const {
    id: resumeId,
    experiences: experienceData,
    educations: educationData,
    skills: skillData,
    summary: summaryData,
    contact: contactData,
  } = decompressedContent;

  // Update main resume
  await db
    .update(resumes)
    .set({ updatedAt: new Date() })
    .where(eq(resumes.id, resumeId));

  // Update all sections
  if (experienceData?.length) {
    await db.delete(experiences).where(eq(experiences.resumeId, resumeId));
    await db.insert(experiences).values(experienceData);
  }

  if (educationData?.length) {
    await db.delete(educations).where(eq(educations.resumeId, resumeId));
    await db.insert(educations).values(educationData);
  }

  if (skillData?.length) {
    await db.delete(skills).where(eq(skills.resumeId, resumeId));
    await db.insert(skills).values(skillData);
  }

  if (summaryData) {
    await db.delete(summary).where(eq(summary.resumeId, resumeId));
    await db.insert(summary).values(summaryData);
  }

  if (contactData) {
    await db.delete(contacts).where(eq(contacts.resumeId, resumeId));
    await db.insert(contacts).values(contactData);
  }

  revalidatePath(`/resume/${resumeId}`);
};

// Get list of version histories for a resume
export const getResumeVersionList = async (resumeId: string) => {
  return db.query.resumeVersions.findMany({
    where: eq(resumeVersions.resumeId, resumeId),
    orderBy: (versions) => [desc(versions.createdAt)],
    columns: {
      id: true,
      name: true,
      createdAt: true,
      resumeId: true,
    },
  });
};
