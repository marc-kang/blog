import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-4xl items-center px-4">
        <Link href="/" className="mr-6 font-bold">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-1 items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Blog
          </Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
