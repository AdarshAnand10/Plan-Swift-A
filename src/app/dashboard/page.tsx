"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { BusinessPlan, BusinessPlanSectionKey } from "@/lib/types";
import Header from "@/components/header";
import BusinessPlanForm from "@/components/business-plan-form";
import BusinessPlanDisplay from "@/components/business-plan-display";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [plan, setPlan] = useState<BusinessPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editCounts, setEditCounts] = useState<Record<BusinessPlanSectionKey, number>>(
    () => ({
      executiveSummary: 0,
      companyDescription: 0,
      marketAnalysis: 0,
      productsAndServices: 0,
      marketingAndSalesStrategy: 0,
      managementTeam: 0,
      financialPlan: 0,
      fundingRequest: 0,
      appendix: 0,
    })
  );
  const { toast } = useToast();

  const handlePlanGenerated = (newPlan: BusinessPlan) => {
    setPlan(newPlan);
    setIsLoading(false);
  };
  
  const handleError = (error: string) => {
    setIsLoading(false);
    toast({
      variant: "destructive",
      title: "An error occurred",
      description: error,
    });
  };

  const handlePlanUpdate = (updatedPlan: BusinessPlan) => {
    setPlan(updatedPlan);
  };
  
  const handleEditCount = (section: BusinessPlanSectionKey) => {
    setEditCounts(prev => ({ ...prev, [section]: (prev[section] || 0) + 1 }));
  }

  const handleExport = (format: 'pdf' | 'word') => {
    if (format === 'pdf') {
      window.print();
    } else {
      toast({
        title: "Coming Soon!",
        description: "Word export functionality is under development.",
      });
    }
  };

  const handleTranslate = async (language: string) => {
    toast({
      title: "Coming Soon!",
      description: `Translation to ${language} is under development.`,
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        onExport={handleExport} 
        onTranslate={handleTranslate} 
        isPlanGenerated={!!plan}
      />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {!plan && !isLoading && (
          <BusinessPlanForm
            onPlanGenerated={handlePlanGenerated}
            setIsLoading={setIsLoading}
            onError={handleError}
          />
        )}
        {isLoading && <LoadingState />}
        {plan && (
          <BusinessPlanDisplay 
            plan={plan} 
            setPlan={handlePlanUpdate} 
            editCounts={editCounts}
            onEdit={handleEditCount}
          />
        )}
      </main>
    </div>
  );
}

const LoadingState = () => (
  <Card>
    <CardContent className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </CardContent>
  </Card>
);
