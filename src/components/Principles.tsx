"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./ui/Reveal";

// Colours are taken from the three markers in the animation.
const principles = [
  {
    color: "#B49C84",
    title: "Start with the problem",
    text: "The business outcome comes first, never a preferred technology.",
  },
  {
    color: "#143424",
    title: "Keep it simple",
    text: "Simple systems are easier to run, secure and change.",
  },
  {
    color: "#8CA4BC",
    title: "Measure what matters",
    text: "Success is time saved and errors reduced, not features shipped.",
  },
];

/** The animation's marker: a rounded outline square holding a solid, round-cornered triangle. */
function PillarIcon({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-12 shrink-0">
      <rect x="1" y="1" width="46" height="46" rx="6" fill="#fff" stroke="#111" strokeWidth="1.5" />
      <polygon points="14,14 34,14 34,34" fill={color} stroke={color} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/** Three principles beside the looping animation of three layers becoming one. */
export function Principles() {
  const video = useRef<HTMLVideoElement>(null);

  // Leave the first frame still for visitors who ask for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause();
  }, []);

  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <video
            ref={video}
            src="/video/pillars.mp4"
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="mx-auto aspect-square w-full max-w-sm bg-white lg:max-w-none"
          />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 className="text-headline font-light text-balance">Three principles we work by.</h2>
          </Reveal>
          <ul className="mt-10 lg:mt-14">
            {principles.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={0.1 + i * 0.1} className="flex items-center gap-5 py-5 lg:gap-7 lg:py-6">
                  <PillarIcon color={p.color} />
                  <div>
                    <h3 className="text-2xl font-light tracking-tight lg:text-3xl">{p.title}</h3>
                    <p className="mt-2 max-w-md text-ink-soft">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
