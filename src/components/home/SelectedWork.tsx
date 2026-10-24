import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** Common starting points for an engagement, each leading to a pre-filled enquiry. */
const startingPoints = [
  {
    problem: "Our core processes still run on spreadsheets and email.",
    approach: "Replace them with a purpose-built internal platform.",
    service: "Custom Software Development",
  },
  {
    problem: "Our team spends hours re-capturing information from documents.",
    approach: "Automate extraction and routing with practical AI.",
    service: "Artificial Intelligence & Automation",
  },
  {
    problem: "Our systems don't talk to each other.",
    approach: "Integrate them so data flows once, accurately.",
    service: "Systems Integration",
  },
  {
    problem: "Deployments are risky and our hosting is outgrowing us.",
    approach: "Move to well-architected, automated cloud infrastructure.",
    service: "Cloud & Infrastructure",
  },
  {
    problem: "We can't get reliable numbers without manual work.",
    approach: "Build pipelines and reporting your leadership can trust.",
    service: "Data Engineering & Analytics",
  },
  {
    problem: "We need to make a major technical decision.",
    approach: "Get an independent architecture and feasibility assessment.",
    service: "Technology Consulting",
  },
];

export function SelectedWork() {
  if (caseStudies.length > 0) {
    return (
      <section className="bg-paper py-28 lg:py-40">
        <div className="container-site">
          <SectionHeading title="Recent engagements." />
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {caseStudies.map((c) => (
              <Reveal key={c.slug}>
                <article className="h-full rounded-[4px] border border-line bg-white p-10">
                  <p className="eyebrow text-accent">{c.sector}</p>
                  <h3 className="mt-5 text-2xl font-light">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted">{c.client}</p>
                  <p className="mt-5 leading-relaxed text-ink-soft">{c.summary}</p>
                  <ul className="mt-6 space-y-2 text-[0.9375rem] text-ink-soft">
                    {c.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper py-28 lg:py-40">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title="Recognise the problem?" />
          </div>
          <ul className="border-t border-line-strong lg:col-span-8">
            {startingPoints.map((p, i) => (
              <li key={p.problem} className="border-b border-line-strong">
                <Reveal delay={i * 0.04} y={16}>
                  <Link
                    href={`/contact?service=${encodeURIComponent(p.service)}`}
                    className="group grid gap-3 py-7 transition-colors duration-500 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                  >
                    <span className="text-lg leading-snug text-ink">“{p.problem}”</span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                      <span className="sm:sr-only">Discuss this</span>
                      <span className="flex size-10 items-center justify-center rounded-full border border-accent/30 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                        <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
