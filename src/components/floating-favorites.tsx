"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export const FAVORITES = [
  { src: "/favorites/2pac.jpg", alt: "2Pac", caption: "he knows how to ride a beat" },
  { src: "/favorites/claude.png", alt: "Claude", caption: "before skynet, this is the best thing. best statistical outputter that gets me shit done." },
  { src: "/favorites/deleuze.webp", alt: "Deleuze", caption: "gave me an explanation on how i might live." },
  { src: "/favorites/goodkidmaadcity.jpeg", alt: "good kid maad city", caption: "repeated since 2012" },
  { src: "/favorites/ledzeppelin.webp", alt: "Led Zeppelin", caption: "i wanna live like stairway to heaven. those coordinations, masterful executions and balls to release the track. f**k!" },
  { src: "/favorites/macbook.jpg", alt: "MacBook", caption: "human's best machine ever made, it made everything. chart topping music, 7M views, 300k users, and everything. vision making machine it is." },
  { src: "/favorites/nietzsche.jpg", alt: "Ubermensch", caption: "god is dead, then what? don't try to gaslight yourself to the resentment of the weak (a slave morality), and build your own." },
  { src: "/favorites/rhizome life.jpg", alt: "Rhizome", caption: "deleuze's essence. live like it. don't try to fit in to an dogmatic ideal, just connect." },
  { src: "/favorites/saulgoodman.webp", alt: "Saul Goodman", caption: "besides his questionable moral standards, he knows how to sell." },
  { src: "/favorites/optimafunction.webp", alt: "Machine Learning", caption: "sounds weird but its so fundamental and philosophical. human is just gradient descent on a loss function that keeps shifting. the world is a huge data and spacetime is just an interface" },
  { src: "/favorites/evolution.webp", alt: "Evolution", caption: "the fundamental truth. it can explain everything from human psychology to startup" },
];

// ── Desktop: floating images on sides ──

interface FloatingImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  side: "left" | "right";
  xOffset: number;
  yPosition: number;
  rotation: number;
  delay: number;
  size: number;
}

function generateImages(): FloatingImage[] {
  const images: FloatingImage[] = [];

  FAVORITES.forEach((fav, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    images.push({
      id: i,
      src: fav.src,
      alt: fav.alt,
      caption: fav.caption,
      side,
      xOffset: 3 + Math.random() * 14,
      yPosition: 5 + (i / FAVORITES.length) * 75 + Math.random() * 8,
      rotation: -15 + Math.random() * 30,
      delay: 0.3 + i * 0.15,
      size: 70 + Math.random() * 30,
    });
  });

  return images;
}

export function FloatingFavorites() {
  const [images, setImages] = useState<FloatingImage[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setImages(generateImages());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 hidden lg:block"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {images.map((img) => (
        <Tooltip key={img.id}>
          <TooltipTrigger asChild>
            <div
              className="pointer-events-auto absolute animate-rise-in cursor-default hover:z-[999]"
              style={{
                [img.side]: `${img.xOffset}%`,
                top: `${img.yPosition}%`,
                width: img.size,
                ["--rise-delay" as string]: `${img.delay}s`,
              }}
            >
              <div
                className="transition-transform duration-300 ease-out hover:scale-110"
                style={{ transform: `rotate(${img.rotation}deg)` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.size}
                  height={img.size}
                  className="h-auto w-full"
                  unoptimized
                />
              </div>
            </div>
          </TooltipTrigger>
          {img.caption && (
            <TooltipContent
              side={img.side === "left" ? "right" : "left"}
              sideOffset={8}
              className="max-w-[320px] border border-foreground/20 bg-background text-left text-xs leading-relaxed font-medium text-foreground/70"
            >
              <span className="font-bold">{img.alt}</span>: {img.caption}
            </TooltipContent>
          )}
        </Tooltip>
      ))}
    </div>
  );
}

// ── Mobile: 2-column grid with captions always visible ──

function MobileFavoriteCard({ fav, rotation }: { fav: typeof FAVORITES[number]; rotation: number }) {
  return (
    <div className="flex flex-col">
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <Image
          src={fav.src}
          alt={fav.alt}
          width={140}
          height={140}
          className="h-auto w-full"
          unoptimized
        />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground/60">
        <span className="font-bold text-foreground/80">{fav.alt}</span>: {fav.caption}
      </p>
    </div>
  );
}

export function MobileFavoritesGrid() {
  const [rotations, setRotations] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRotations(FAVORITES.map(() => -10 + Math.random() * 20));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-6 lg:hidden">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {FAVORITES.map((fav, i) => (
          <MobileFavoriteCard key={i} fav={fav} rotation={rotations[i] ?? 0} />
        ))}
      </div>
    </div>
  );
}
