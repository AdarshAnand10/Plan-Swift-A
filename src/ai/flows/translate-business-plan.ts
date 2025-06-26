import { openaiChat } from "@/lib/openai";
import { z } from "zod";

const schema = z.object({
  businessPlan: z.string(),
  targetLanguage: z.string(),
});
export async function translateBusinessPlan(input: z.infer<typeof schema>) {
  const prompt = `
Translate the following business plan into ${input.targetLanguage}:
${input.businessPlan}
`;
  const translated = await openaiChat(prompt);
  return { translatedPlan: translated };
}
