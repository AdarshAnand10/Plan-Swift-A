import type { GenerateBusinessPlanOutput } from "@/ai/flows/generate-business-plan";

export type BusinessPlan = GenerateBusinessPlanOutput;

export type BusinessPlanSectionKey = keyof BusinessPlan;

export const businessPlanSectionLabels: Record<BusinessPlanSectionKey, string> = {
  executiveSummary: "Executive Summary",
  companyDescription: "Company Description",
  marketAnalysis: "Market Analysis",
  productsAndServices: "Products and Services",
  marketingAndSalesStrategy: "Marketing and Sales Strategy",
  managementTeam: "Management Team",
  financialPlan: "Financial Plan",
  fundingRequest: "Funding Request",
  appendix: "Appendix",
};

export const businessPlanSections = Object.keys(
  businessPlanSectionLabels
) as BusinessPlanSectionKey[];
