import "server-only";

import { ResumeSectionType } from "@/type/resume";
import { openai } from ".";

export const enhanceResume = async (
  content: string,
  section: ResumeSectionType,
) => {
  const aiResponse = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-distill-llama-70b:free",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at improving professional resumes. Respond with only the improved text—no explanations, no preambles, no extra words.",
      },
      {
        role: "user",
        content: `Enhance this ${section} section while keeping it professional: ${content}`,
      },
    ],
  });

  return aiResponse.choices[0]?.message.content?.split("\n").pop();
};
