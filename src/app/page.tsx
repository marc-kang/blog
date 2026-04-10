"use client";

import { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { translations, type Locale } from "@/lib/translations";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ko");
  const t = translations[locale];

  return (
    <div className="min-h-screen px-6 py-10 sm:px-8 sm:py-16">
      <div className="max-w-[520px]">
        {/* top bar */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
          <Image
            src="/profile.jpg"
            alt="marc kang"
            width={56}
            height={56}
            className="rounded-full"
            priority
          />
          <div>
            <h1 className="text-base font-bold">marc kang</h1>
            <p className="text-xs text-foreground/40">{t.tagline}</p>
          </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
              className="rounded-full px-2 py-1 text-xs text-foreground/30 transition-colors hover:text-foreground/60"
            >
              {locale === "ko" ? "EN" : "KO"}
            </button>
            <ModeToggle flashMessage={t.flashMessage} />
            {/* sunlight button only - no dark mode */}
          </div>
        </div>

        {/* tldr */}
        <p className="mb-2 text-xs font-bold text-foreground/40">
          {t.sectionDone}
        </p>
        <ul className="space-y-2 text-sm leading-relaxed text-foreground/80">
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            {t.psychology}
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            <span>
              {t.music} —{" "}
              <a
                href="https://open.spotify.com/track/3Jz0TkPuoF0dXUA1PWru2d?si=446b33722fe84d1e"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/50"
              >
                {t.musicLink}
              </a>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            <span>
              {t.reels} —{" "}
              <a
                href="https://www.instagram.com/marc.never.stops/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/50"
              >
                instagram
              </a>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            {t.startup}
          </li>
        </ul>
        <a
          href="https://bit.ly/notion-marc"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-foreground/30 underline decoration-foreground/15 underline-offset-2 transition-colors hover:text-foreground/50"
        >
          {t.fullStory} &rarr;
        </a>

        {/* interests */}
        <p className="mt-8 text-xs font-bold text-foreground/40">
          {t.sectionLikes}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          {t.likes}
        </p>

        {/* learning */}
        <p className="mt-8 text-xs font-bold text-foreground/40">
          {t.sectionLearning}
        </p>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/80">
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            {t.simple}
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            {t.youtube}
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            {t.freedom}
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-foreground/30">&bull;</span>
            <span>
              {t.dmPre}{" "}
              <a
                href="https://www.instagram.com/marc.never.stops/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/50"
              >
                ig
              </a>{" "}
              {t.dmPost}
            </span>
          </li>
        </ul>

        {/* links */}
        <div className="mt-8 text-sm">
          <a
            href="https://www.instagram.com/marc.never.stops/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/50"
          >
            instagram
          </a>
        </div>
      </div>

      {/* bottom controls */}
    </div>
  );
}
