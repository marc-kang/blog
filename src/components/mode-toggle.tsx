"use client";

import { useState } from "react";
import { Sun } from "lucide-react";
import { createPortal } from "react-dom";

export function ModeToggle({ flashMessage }: { flashMessage?: string }) {
  const [flashKey, setFlashKey] = useState(0);
  const [flashing, setFlashing] = useState(false);

  function handleClick() {
    setFlashKey((k) => k + 1);
    setFlashing(true);
  }

  return (
    <>
      {flashing &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            key={flashKey}
            className="animate-flash pointer-events-none fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-white"
            style={{ top: 0, left: 0, width: "100vw", height: "100vh" }}
            onAnimationEnd={() => setFlashing(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sunlight.jpg"
              alt="sunlight"
              style={{ maxHeight: "70vh", maxWidth: "90vw", objectFit: "contain" }}
            />
            <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "rgba(0,0,0,0.5)" }}>
              {flashMessage ?? "just go outside my friend."}
            </p>
          </div>,
          document.body
        )}
      <button
        onClick={handleClick}
        className="rounded-full p-2 text-foreground/50 transition-colors hover:text-foreground"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Sunlight</span>
      </button>
    </>
  );
}
