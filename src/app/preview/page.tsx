"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function PreviewPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleContinue = () => {
    localStorage.setItem("seenPreview", "true");
    router.push("/dashboard");
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="mx-auto max-w-lg w-full text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">
              Welcome, {user?.email || "Founder"}!
            </CardTitle>
            <CardDescription className="text-lg pt-2">
              You are one step away from creating your investor-ready business
              plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Click the button below to proceed to the dashboard and start
              generating your plan with the power of AI.
            </p>
            <Button size="lg" onClick={handleContinue}>
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
