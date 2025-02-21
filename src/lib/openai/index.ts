import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: process.env.LLM_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});
