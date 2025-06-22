"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Wand2, Sparkles } from "lucide-react";
import {
  type BusinessPlan,
  type BusinessPlanSectionKey,
  businessPlanSections,
  businessPlanSectionLabels,
} from "@/lib/types";
import { AlterSectionDialog } from "@/components/alter-section-dialog";

type BusinessPlanDisplayProps = {
  plan: BusinessPlan;
  setPlan: (plan: BusinessPlan) => void;
  editCounts: Record<BusinessPlanSectionKey, number>;
  onEdit: (section: BusinessPlanSectionKey) => void;
};

export default function BusinessPlanDisplay({ plan, setPlan, editCounts, onEdit }: BusinessPlanDisplayProps) {
  const [editingSection, setEditingSection] = useState<BusinessPlanSectionKey | null>(null);
  
  const unlockedSections = businessPlanSections.slice(0, 4);
  const defaultOpenValues = unlockedSections.map((s) => s);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Your AI-Generated Business Plan</CardTitle>
          <CardDescription>
            Here is your comprehensive business plan. You can edit each section using AI commands.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={defaultOpenValues} className="w-full">
            {businessPlanSections.map((sectionKey, index) => {
              const isLocked = index >= 4;
              const title = businessPlanSectionLabels[sectionKey];
              const content = plan[sectionKey];
              const editCount = editCounts[sectionKey] || 0;
              const canEdit = editCount < 1;

              return (
                <AccordionItem value={sectionKey} key={sectionKey}>
                  <AccordionTrigger className="text-xl font-headline hover:no-underline">
                    <div className="flex items-center gap-3">
                      {isLocked && <Lock className="h-5 w-5 text-amber-500" />}
                      {title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-base whitespace-pre-wrap py-4">
                    {isLocked ? (
                      <UpgradeBanner />
                    ) : (
                      <>
                        <p>{content}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => setEditingSection(sectionKey)}
                          disabled={!canEdit}
                        >
                          <Wand2 className="mr-2 h-4 w-4" />
                          {canEdit ? 'Alter with AI' : 'Edit Limit Reached'}
                        </Button>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
      
      {editingSection && (
        <AlterSectionDialog
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          sectionKey={editingSection}
          currentContent={plan[editingSection]}
          onSectionUpdate={(updatedContent) => {
            const newPlan = { ...plan, [editingSection]: updatedContent };
            setPlan(newPlan);
            onEdit(editingSection);
            setEditingSection(null);
          }}
        />
      )}
    </>
  );
}

function UpgradeBanner() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-gradient-to-br from-yellow-400 to-red-600 p-3 rounded-full">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold font-headline">Unlock All Sections</h3>
        <p className="text-muted-foreground max-w-md">
          Upgrade to our Professional plan to unlock this section and all other features, including unlimited AI edits.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-shadow">
          Upgrade to Professional
        </Button>
      </div>
    </div>
  );
}
