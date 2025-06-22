'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating a business plan into multiple languages.
 *
 * - translateBusinessPlan - A function that translates a business plan.
 * - TranslateBusinessPlanInput - The input type for the translateBusinessPlan function.
 * - TranslateBusinessPlanOutput - The return type for the translateBusinessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateBusinessPlanInputSchema = z.object({
  businessPlan: z.string().describe('The business plan content to translate.'),
  targetLanguage: z.string().describe('The language to translate the business plan to.'),
});
export type TranslateBusinessPlanInput = z.infer<typeof TranslateBusinessPlanInputSchema>;

const TranslateBusinessPlanOutputSchema = z.object({
  translatedPlan: z.string().describe('The translated business plan content.'),
});
export type TranslateBusinessPlanOutput = z.infer<typeof TranslateBusinessPlanOutputSchema>;

export async function translateBusinessPlan(input: TranslateBusinessPlanInput): Promise<TranslateBusinessPlanOutput> {
  return translateBusinessPlanFlow(input);
}

const translateBusinessPlanPrompt = ai.definePrompt({
  name: 'translateBusinessPlanPrompt',
  input: {schema: TranslateBusinessPlanInputSchema},
  output: {schema: TranslateBusinessPlanOutputSchema},
  prompt: `Translate the following business plan into {{targetLanguage}}:

{{{businessPlan}}}`,
});

const translateBusinessPlanFlow = ai.defineFlow(
  {
    name: 'translateBusinessPlanFlow',
    inputSchema: TranslateBusinessPlanInputSchema,
    outputSchema: TranslateBusinessPlanOutputSchema,
  },
  async input => {
    const {output} = await translateBusinessPlanPrompt(input);
    return output!;
  }
);
