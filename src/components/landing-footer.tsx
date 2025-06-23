import { Logo } from "@/components/logo";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border/40">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-auto" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PlanInsta. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
