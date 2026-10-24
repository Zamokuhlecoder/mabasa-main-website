"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { testimonials } from "@/lib/clients";
import { Reveal } from "../ui/Reveal";

const SLIDE_MS = 5500;

// One colour per card: the three markers from the principles animation, then three that sit with them.
const palette = [
  { bg: "#B49C84", fg: "#1c1710", sub: "rgb(28 23 16 / 0.7)" },
  { bg: "#143424", fg: "#ffffff", sub: "rgb(255 255 255 / 0.7)" },
  { bg: "#8CA4BC", fg: "#0f1a26", sub: "rgb(15 26 38 / 0.7)" },
  { bg: "#C47A5A", fg: "#1f0f08", sub: "rgb(31 15 8 / 0.72)" },
  { bg: "#4A3552", fg: "#ffffff", sub: "rgb(255 255 255 / 0.7)" },
  { bg: "#D9C9A3", fg: "#231d0c", sub: "rgb(35 29 12 / 0.7)" },
];

/**
 * Feedback from the people we have worked with, as a row of colour-coded cards that slides on its own.
 * Visitors can swipe or scroll it too; it pauses while they are interacting with it.
 */
export function Clients() {
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = track.current;
    if (!el || testimonials.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      if (paused.current) return;
      const cards = Array.from(el.children) as HTMLElement[];
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      const nextCard = cards.find((c) => c.offsetLeft > el.scrollLeft + 8);
      el.scrollTo({ left: atEnd || !nextCard ? 0 : nextCard.offsetLeft, behavior: "smooth" });
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="clients-heading" className="overflow-hidden border-y border-line bg-white py-16 lg:py-20">
      <div className="container-site">
        <Reveal>
          <h2 id="clients-heading" className="text-title font-light text-balance">
            Businesses we&apos;ve worked with
          </h2>
        </Reveal>
      </div>

      <ul
        ref={track}
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => setTimeout(() => (paused.current = false), 4000)}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8 lg:mt-14 lg:gap-6 lg:px-12"
      >
        {testimonials.map((t, i) => {
          const c = palette[i % palette.length];
          return (
            <li key={t.name} className="w-[86%] shrink-0 snap-start sm:w-[26rem] lg:w-[28rem]">
              <figure
                className="flex h-full flex-col justify-between rounded-[10px] p-7 lg:p-9"
                style={{ backgroundColor: c.bg, color: c.fg }}
              >
                <blockquote className="text-xl leading-snug font-light lg:text-2xl">
                  &ldquo;{t.feedback.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <div
                    className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/35"
                    style={{ color: c.fg }}
                  >
                    {t.feedback.photo ? (
                      <Image src={t.feedback.photo} alt="" fill sizes="48px" className="object-cover" />
                    ) : (
                      <User aria-hidden="true" strokeWidth={1.5} className="size-6" />
                    )}
                  </div>
                  <p className="min-w-0 flex-1 text-sm" style={{ color: c.sub }}>
                    <span className="block text-base font-medium" style={{ color: c.fg }}>
                      {t.feedback.person}
                    </span>
                    {t.feedback.role}
                  </p>
                  {/* The logos are dark artwork, so each sits on a small white pill. */}
                  <span className="flex h-9 shrink-0 items-center rounded-[4px] bg-white px-3">
                    {t.logo ? (
                      <Image
                        src={t.logo.src}
                        alt={t.name}
                        width={t.logo.width}
                        height={t.logo.height}
                        loading="eager"
                        className="h-4 w-auto max-w-[5.5rem] object-contain"
                      />
                    ) : (
                      <span className="text-xs font-medium text-ink">{t.name}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
        {/* Trailing space so the last card can snap fully into view. */}
        <li aria-hidden="true" className="w-1 shrink-0" />
      </ul>
    </section>
  );
}
