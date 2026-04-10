"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Locale } from "@/lib/translations";
import { translations } from "@/lib/translations";

export function FloatingIgCta({ locale }: { locale: Locale }) {
  const [minimized, setMinimized] = useState(true);
  const t = translations[locale];

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 right-5 z-50 border border-foreground/10 bg-background/80 px-3 py-1.5 text-xs text-foreground/40 shadow-md backdrop-blur-md transition-all hover:text-foreground/60 hover:shadow-lg"
      >
        contact ✉
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-[280px] border border-foreground/10 bg-background/80 px-4 py-3 shadow-lg backdrop-blur-md sm:max-w-[300px]">
      <button
        onClick={() => setMinimized(true)}
        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-foreground/10 text-foreground/40 transition-colors hover:bg-foreground/20 hover:text-foreground/60"
        aria-label="Minimize"
      >
        <X className="h-3 w-3" />
      </button>
      <p className="text-sm leading-relaxed text-foreground/60">
        {t.dmPre}{" "}
        <a
          href="https://www.instagram.com/marc.never.stops/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground/80 underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/50"
        >
          ig
        </a>{" "}
        {t.dmPost}
      </p>
    </div>
  );
}
