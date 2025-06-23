"use client";

import {
  Download,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

interface HeaderProps {
  onExport: (format: 'pdf' | 'word') => void;
  onTranslate: (language: string) => void;
  isPlanGenerated: boolean;
}

export default function Header({ onExport, onTranslate, isPlanGenerated }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <Logo className="h-7 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isPlanGenerated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onExport('pdf')}>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport('word')}>Export as Word</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    Translate
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onTranslate('Spanish')}>Spanish</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTranslate('French')}>French</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTranslate('German')}>German</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null }
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
