import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { unsplash } from "@/lib/site";

const segments = [
  {
    title: "Startups",
    image: unsplash("photo-1568658176307-bfbd2873abda"),
    alt: "Two founders reviewing work on a laptop",
    who: "Turning an idea into a dependable product.",
  },
  {
    title: "Small & Medium Enterprises",
    image: unsplash("photo-1687422808248-f807f4ea2a2e"),
    alt: "A small business owner checking orders on his phone",
    who: "Replacing manual work and disconnected tools.",
  },
  {
    title: "Growing Organisations",
    image: unsplash("photo-1758518730136-1bf4fa26ccbf"),
    alt: "A team of professionals meeting around a conference table",
    who: "Systems that keep up as you scale.",
  },
];

export function ClientSegments() {
  return (
    <section className="bg-white py-28 lg:py-40">
      <div className="container-site">
        <SectionHeading align="center" title="Built for businesses at every stage of growth." />
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-3">
          {segments.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="h-full">
              <Link
                href="/contact"
                className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgb(0_20_47/0.35)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent"
                  />
                  <h3 className="absolute inset-x-0 bottom-0 p-6 text-[1.75rem] leading-tight font-light tracking-tight text-white lg:p-8">
                    {s.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <p className="text-lg leading-snug text-ink">{s.who}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
                    Talk to us
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
