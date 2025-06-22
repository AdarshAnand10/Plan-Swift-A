"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { handleGeneratePlan } from "@/app/actions";
import type { BusinessPlan } from "@/lib/types";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companyDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  targetMarket: z.string().min(10, {
    message: "Target market must be at least 10 characters.",
  }),
  productOrService: z.string().min(10, {
    message: "Product/Service description must be at least 10 characters.",
  }),
  competitiveAdvantages: z.string().min(10, {
    message: "Competitive advantages must be at least 10 characters.",
  }),
});

type BusinessPlanFormProps = {
  onPlanGenerated: (plan: BusinessPlan) => void;
  setIsLoading: (isLoading: boolean) => void;
  onError: (error: string) => void;
};

export default function BusinessPlanForm({ onPlanGenerated, setIsLoading, onError }: BusinessPlanFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyDescription: "",
      targetMarket: "",
      productOrService: "",
      competitiveAdvantages: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await handleGeneratePlan(values);
    if (result.success && result.data) {
      onPlanGenerated(result.data);
    } else {
      onError(result.error || "An unknown error occurred.");
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Create Your Business Plan</CardTitle>
        <CardDescription>
          Provide some basic details about your business, and our AI will generate a comprehensive plan for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Innovatech Solutions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description & Mission</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your company and what it aims to achieve."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="productOrService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product or Service</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detail the product or service your company offers."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetMarket"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Market</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Who are your customers? Describe your target market."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competitiveAdvantages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competitive Advantages</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What makes your company unique and better than the competition?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg">
              <Wand2 className="mr-2 h-5 w-5" />
              Generate Plan with AI
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
