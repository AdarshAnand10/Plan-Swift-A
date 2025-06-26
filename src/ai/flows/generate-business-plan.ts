import { openaiChat } from "@/lib/openai";
import { z } from "zod";

const InputSchema = z.object({
  companyName: z.string(),
  companyDescription: z.string(),
  targetMarket: z.string(),
  productOrService: z.string(),
  competitiveAdvantages: z.string(),
});
export type GenerateBusinessPlanInput = z.infer<typeof InputSchema>;

export async function generateBusinessPlan(input: GenerateBusinessPlanInput) {
  const prompt = `
You are an expert business plan writer. Write a business plan based on:
- Company: ${input.companyName}
- Description: ${input.companyDescription}
- Market: ${input.targetMarket}
- Product/Service: ${input.productOrService}
- Advantages: ${input.competitiveAdvantages}
`;
  const text = await openaiChat(prompt);
  return { plan: text };
}

