'use server';

import {
  generateBusinessPlan,
  type GenerateBusinessPlanInput,
} from '@/ai/flows/generate-business-plan';
import {
  alterPlanSection,
  type AlterPlanSectionInput,
} from '@/ai/flows/alter-plan-section';
import {
  translateBusinessPlan,
  type TranslateBusinessPlanInput,
} from '@/ai/flows/translate-business-plan';

interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function handleGeneratePlan(
  input: GenerateBusinessPlanInput
): Promise<Result<ReturnType<typeof generateBusinessPlan>>> {
  try {
    const data = await generateBusinessPlan(input);
    return { success: true, data };
  } catch (e: any) {
    console.error('Generate Plan Error:', e);
    return { success: false, error: e.message };
  }
}

export async function handleAlterSection(
  input: AlterPlanSectionInput
): Promise<Result<ReturnType<typeof alterPlanSection>>> {
  try {
    const data = await alterPlanSection(input);
    return { success: true, data };
  } catch (e: any) {
    console.error('Alter Section Error:', e);
    return { success: false, error: e.message };
  }
}

export async function handleTranslatePlan(
  input: TranslateBusinessPlanInput
): Promise<Result<ReturnType<typeof translateBusinessPlan>>> {
  try {
    const data = await translateBusinessPlan(input);
    return { success: true, data };
  } catch (e: any) {
    console.error('Translate Plan Error:', e);
    return { success: false, error: e.message };
  }
}
