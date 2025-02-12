import { ResumeSectionType } from "@/type/resume";
import { openai } from ".";

export const enhanceResume = async (content: string, section: ResumeSectionType) => {
  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert at improving professional resumes.",
      },
      {
        role: "user",
        content: `Enhance this ${section} section while keeping it professional: ${content}`,
      },
    ],
  });

  return aiResponse.choices[0]?.message.content;
};
