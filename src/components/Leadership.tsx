import Image from "next/image";
import { team } from "@/lib/team";
import { site } from "@/lib/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Leadership() {
  return (
    <section className="bg-white pt-24 pb-36 lg:pt-36 lg:pb-52">
      <div className="container-site">
        <SectionHeading title="The people behind the work." />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {team.map((m, i) => (
            <li key={m.role}>
              <Reveal delay={i * 0.1}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-paper">
                    <Image
                      src={m.image}
                      alt={m.name ? `${m.name}, ${m.role} of ${site.name}` : `${m.role} of ${site.name}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: m.focus ?? "50% 30%" }}
                    />
                  </div>
                  <figcaption className="mt-5 border-t border-ink pt-4">
                    {m.name ? (
                      <>
                        <p className="text-2xl font-light tracking-tight text-ink">{m.name}</p>
                        <p className="mt-1 text-muted">{m.role}</p>
                      </>
                    ) : (
                      <p className="text-2xl font-light tracking-tight text-ink">{m.role}</p>
                    )}
                    {m.bio && <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{m.bio}</p>}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
