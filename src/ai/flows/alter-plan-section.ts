'use server';

/**
 * @fileOverview A flow for altering a specific section of a business plan using AI commands.
 *
 * - alterPlanSection - A function that handles the alteration of a business plan section based on user commands.
 * - AlterPlanSectionInput - The input type for the alterPlanSection function.
 * - AlterPlanSectionOutput - The return type for the alterPlanSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlterPlanSectionInputSchema = z.object({
  planSection: z.string().describe('The content of the business plan section to be altered.'),
  userCommand: z.string().describe('The AI command from the user to modify the plan section.'),
});

export type AlterPlanSectionInput = z.infer<typeof AlterPlanSectionInputSchema>;

const AlterPlanSectionOutputSchema = z.object({
  alteredSection: z.string().describe('The altered content of the business plan section.'),
});

export type AlterPlanSectionOutput = z.infer<typeof AlterPlanSectionOutputSchema>;

export async function alterPlanSection(input: AlterPlanSectionInput): Promise<AlterPlanSectionOutput> {
  return alterPlanSectionFlow(input);
}

const alterPlanSectionPrompt = ai.definePrompt({
  name: 'alterPlanSectionPrompt',
  input: {schema: AlterPlanSectionInputSchema},
  output: {schema: AlterPlanSectionOutputSchema},
  prompt: `You are an AI business plan editor. A user will provide a section of their business plan and an AI command.
Your job is to alter the business plan section based on the AI command and return the altered section.

Business Plan Section:
{{planSection}}

AI Command:
{{userCommand}}

Altered Section:`,
});

const alterPlanSectionFlow = ai.defineFlow(
  {
    name: 'alterPlanSectionFlow',
    inputSchema: AlterPlanSectionInputSchema,
    outputSchema: AlterPlanSectionOutputSchema,
  },
  async input => {
    const {output} = await alterPlanSectionPrompt(input);
    return output!;
  }
);
