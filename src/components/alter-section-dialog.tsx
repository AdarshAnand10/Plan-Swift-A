"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleAlterSection } from "@/app/actions";
import { businessPlanSectionLabels, type BusinessPlanSectionKey } from "@/lib/types";
import { Loader2, Wand2 } from "lucide-react";

interface AlterSectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: BusinessPlanSectionKey;
  currentContent: string;
  onSectionUpdate: (updatedContent: string) => void;
}

export function AlterSectionDialog({
  isOpen,
  onClose,
  sectionKey,
  currentContent,
  onSectionUpdate,
}: AlterSectionDialogProps) {
  const [userCommand, setUserCommand] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAlter = async () => {
    if (!userCommand.trim()) {
      toast({
        variant: "destructive",
        title: "Command cannot be empty",
        description: "Please enter a command to alter the section.",
      });
      return;
    }
    setIsLoading(true);
    const result = await handleAlterSection({
      planSection: currentContent,
      userCommand,
    });
    setIsLoading(false);

    if (result.success && result.data) {
      onSectionUpdate(result.data.alteredSection);
      toast({
        title: "Section Updated",
        description: "Your changes have been applied successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to alter the section.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Alter "{businessPlanSectionLabels[sectionKey]}"
          </DialogTitle>
          <DialogDescription>
            Enter a command for our AI to modify this section. For example, "Make it more formal" or "Add a paragraph about our B2B strategy".
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="command">AI Command</Label>
            <Textarea
              id="command"
              placeholder="e.g., Shorten this section by 20%"
              value={userCommand}
              onChange={(e) => setUserCommand(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleAlter} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
