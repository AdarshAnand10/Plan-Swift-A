import { openaiChat } from "@/lib/openai";
import { z } from "zod";

const schema = z.object({
  planSection: z.string(),
  userCommand: z.string(),
});
export type AlterPlanSectionInput = z.infer<typeof schema>;

export async function alterPlanSection(input: AlterPlanSectionInput) {
  const prompt = `
You are an AI business plan editor.
Modify the following section based on this instruction:
Section: ${input.planSection}
Instruction: ${input.userCommand}
Return only the revised section.
`;
  const altered = await openaiChat(prompt);
  return { alteredSection: altered };
}
