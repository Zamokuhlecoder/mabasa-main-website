"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../ui/Reveal";

/** The last word of the line cycles through what technology alone cannot do, each in its own colour. */
const words = [
  { text: "solve", color: "#e11d48" },
  { text: "improve", color: "#f97316" },
  { text: "build", color: "#059669" },
  { text: "automate", color: "#2563eb" },
  { text: "modernise", color: "#7c3aed" },
  { text: "scale", color: "#0891b2" },
];

export function Intro() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearTimeout(timer);
  }, [i]);

  const word = words[i];

  return (
    <section className="bg-white py-28 lg:py-44">
      <div className="container-site">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center text-headline font-light text-balance text-ink">
            Every organisation faces challenges that technology alone cannot{" "}
            {/* Screen readers get the plain sentence; the cycling word is decorative. */}
            <span className="sr-only">solve.</span>
            <span aria-hidden="true">
              <span key={word.text} className="word-swap font-normal" style={{ color: word.color }}>
                {word.text}
              </span>
              .
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
