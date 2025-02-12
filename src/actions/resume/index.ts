import { db } from "@/db";
import { resumes } from "@/db/schema";
import { getUser } from "@/lib/auth/get-user";
import { enhanceResume } from "@/lib/openai/enhance-resume";
import { ResumeSectionType } from "@/type/resume";

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

export async function aiEnhanceResumeAction(content: string, section: ResumeSectionType) {
  return enhanceResume(content, section);
}
