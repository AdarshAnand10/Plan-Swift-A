import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-7 w-auto" />
          </Link>
        </div>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/auth/signin">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signin">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
