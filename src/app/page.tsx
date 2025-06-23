"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Star } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";

export default function LandingPage() {
  const features = [
    "AI-Powered Content Generation",
    "Comprehensive Section Coverage",
    "Financial Projection Tools",
    "Interactive Editing and Refinement",
    "Secure and Private",
    "Export to PDF & Word",
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      title: "Startup Founder",
      quote: "PlanInsta is a game-changer. I went from a blank page to a professional business plan in a single afternoon. The AI suggestions were incredibly helpful.",
      avatar: "https://placehold.co/100x100.png",
      hint: "man portrait"
    },
    {
      name: "Samantha Lee",
      title: "Small Business Owner",
      quote: "I've always struggled with the financial parts of a business plan. PlanInsta made it so simple to create realistic projections. Highly recommended!",
      avatar: "https://placehold.co/100x100.png",
      hint: "woman portrait"
    },
    {
        name: "David Chen",
        title: "Entrepreneur",
        quote: "As a non-writer, I was dreading this task. The app's structure and AI assistance gave me the confidence to create a plan that I'm proud to show investors.",
        avatar: "https://placehold.co/100x100.png",
        hint: "man smiling"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Write your business plan with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Generate a comprehensive, investor-ready business plan in minutes.
            Our AI-powered tool streamlines the entire process, from executive
            summary to financial projections.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/signin">Get Started for Free</Link>
          </Button>
          <div className="mt-16 mx-auto max-w-5xl">
             <Image
                src="https://placehold.co/1200x600.png"
                alt="Dashboard preview"
                width={1200}
                height={600}
                className="rounded-xl shadow-2xl ring-1 ring-white/10"
                data-ai-hint="business analytics"
              />
          </div>
        </section>

        <section className="bg-card/40 py-20 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Everything you need to create a winning plan</h2>
                    <p className="text-lg text-muted-foreground mt-2">Powerful features to help you succeed.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                            <h3 className="font-semibold text-lg">{feature}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Loved by founders worldwide</h2>
                    <p className="text-lg text-muted-foreground mt-2">See what our users are saying about PlanInsta.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((t, i) => (
                        <Card key={i} className="bg-card/40">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <Avatar>
                                        <AvatarImage src={t.avatar} data-ai-hint={t.hint}/>
                                        <AvatarFallback>{t.name.substring(0,1)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <p className="font-semibold">{t.name}</p>
                                        <p className="text-sm text-muted-foreground">{t.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-muted-foreground italic">"{t.quote}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

         <section className="bg-primary/10 py-20 md:py-24">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to build your future?</h2>
                 <p className="text-lg text-muted-foreground mt-2 mb-8 max-w-2xl mx-auto">
                    Stop procrastinating and start planning. Your next big idea deserves a solid foundation.
                 </p>
                 <Button size="lg" asChild>
                    <Link href="/auth/signin">Generate Your Business Plan Now</Link>
                 </Button>
            </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
