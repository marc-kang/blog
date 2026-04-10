"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavToggle() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");

  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/"
        className={`text-sm font-medium transition-colors ${
          isHome ? "text-foreground" : "text-foreground/40 hover:text-foreground"
        }`}
      >
        home
      </Link>
      <Link
        href="/blog"
        className={`text-sm font-medium transition-colors ${
          isBlog ? "text-foreground" : "text-foreground/40 hover:text-foreground"
        }`}
      >
        blog
      </Link>
    </nav>
  );
}
