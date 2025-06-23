"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onExport={() => {}} onTranslate={() => {}} isPlanGenerated={false} showGetStarted={true} />
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter">
                  Generate a business plan in seconds with AI
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-xl mx-auto lg:mx-0">
                  Answer a few questions about your business, and our AI will create a comprehensive business plan tailored for you.
                </p>
                <Link href="/create">
                  <Button size="lg" className="font-bold text-lg px-8 py-6">
                    Get Started For Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://placehold.co/600x450.png"
                  alt="Business Plan Illustration"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="business plan document"
                />
              </div>
            </div>
        </section>
      </main>
    </div>
  );
}
