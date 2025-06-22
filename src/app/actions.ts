"use server";

import {
  generateBusinessPlan,
  type GenerateBusinessPlanInput,
} from "@/ai/flows/generate-business-plan";
import {
  alterPlanSection,
  type AlterPlanSectionInput,
} from "@/ai/flows/alter-plan-section";
import {
  translateBusinessPlan,
  type TranslateBusinessPlanInput,
} from "@/ai/flows/translate-business-plan";

export async function handleGeneratePlan(input: GenerateBusinessPlanInput) {
  try {
    const result = await generateBusinessPlan(input);
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return { success: false, error: (e as Error).message };
  }
}

export async function handleAlterSection(input: AlterPlanSectionInput) {
  try {
    const result = await alterPlanSection(input);
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return { success: false, error: (e as Error).message };
  }
}

export async function handleTranslatePlan(input: TranslateBusinessPlanInput) {
  try {
    const result = await translateBusinessPlan(input);
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return { success: false, error: (e as Error).message };
  }
}
