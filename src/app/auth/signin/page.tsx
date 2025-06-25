"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isFirebaseReady = !!auth;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFirebaseReady) {
      toast({
        variant: "destructive",
        title: "Service Not Available",
        description:
          "Authentication is not configured. Please contact support.",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/preview");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <Logo className="h-8 w-auto mx-auto" />
          </Link>
          <CardTitle className="text-2xl font-headline">
            {isSigningUp ? "Create an Account" : "Login"}
          </CardTitle>
          <CardDescription>
            {!isFirebaseReady
              ? "Authentication is temporarily unavailable."
              : isSigningUp
              ? "Enter your email and password to sign up"
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || !isFirebaseReady}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || !isFirebaseReady}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !isFirebaseReady}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSigningUp ? "Sign Up" : "Login"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              disabled={isLoading || !isFirebaseReady}
            >
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isSigningUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSigningUp(!isSigningUp)}
              className="underline"
              disabled={isLoading || !isFirebaseReady}
            >
              {isSigningUp ? "Login" : "Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
