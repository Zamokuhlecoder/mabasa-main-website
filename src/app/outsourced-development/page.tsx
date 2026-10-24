import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Code, Coins, Layers, Plus, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "Outsourced development",
  description:
    "Need a development team? Blackroid builds a dedicated South Africa and Pakistan team around your business, your hours and your budget.",
  alternates: { canonical: "/outsourced-development" },
};

const problems = [
  { title: "Hiring takes months", text: "Every open role is a delayed release." },
  { title: "Agencies lock you in", text: "Fixed scopes, slow changes, surprise invoices." },
  { title: "Freelancers disappear", text: "One person leaves and the knowledge goes with them." },
];

const hubs = [
  {
    country: "South Africa",
    role: "Lead hub",
    line: "Discovery, solution design and day-to-day leadership.",
    ideal: ["Product and solution design", "Project leadership", "Quality assurance"],
    time: "SAST, UTC+2",
    image: unsplash("photo-1580060839134-75a5edca2e99"),
    alt: "Aerial view of Cape Town with the mountain behind it",
  },
  {
    country: "Pakistan",
    role: "Build hub",
    line: "Engineering capacity for building and maintaining systems.",
    ideal: ["Software development", "Testing and integrations", "Ongoing support"],
    time: "PKT, UTC+5. Three hours ahead of South Africa.",
    image: unsplash("photo-1759323050124-eb669cec0b72"),
    alt: "Aerial view of a coastal city in Pakistan",
  },
];

const steps = [
  { title: "Tell us the goal", text: "We start with what you need to ship, not a template." },
  { title: "We shape the team", text: "The right mix of people from both hubs." },
  { title: "They join your workflow", text: "Your tools, your meetings, your priorities." },
  { title: "Scale as you grow", text: "Add or release people whenever needs change." },
];

const benefits = [
  { icon: Clock, title: "Start sooner", text: "A ready team instead of a long hiring process." },
  { icon: Coins, title: "Spend smarter", text: "Skills and locations balanced for a clear, steady cost." },
  { icon: Code, title: "Work in real time", text: "Only three hours apart, so the teams collaborate live." },
  { icon: SlidersHorizontal, title: "Keep control", text: "You set priorities and approve every release." },
  { icon: Layers, title: "Flex when you need to", text: "Grow or shrink the team without disruption." },
  { icon: ShieldCheck, title: "Stay secure", text: "Access control and POPIA considered from day one." },
];

const faqs = [
  {
    q: "How does the South Africa and Pakistan model work?",
    a: "South Africa leads discovery, design and client communication. Pakistan adds build and testing capacity. You deal with one team and one point of contact.",
  },
  {
    q: "Do I give up control of delivery?",
    a: "No. You set the priorities, follow progress through regular demos and shared boards, and approve work before it ships.",
  },
  {
    q: "How are time zones handled?",
    a: "Pakistan is three hours ahead of South Africa, so the teams overlap through the working day. We agree fixed check-ins at the start.",
  },
  {
    q: "What does it cost?",
    a: "It depends on team size and duration. After a short call we send a proposal with the team, the plan and the price.",
  },
  {
    q: "Is it suitable for regulated industries or sensitive data?",
    a: "Where the right controls are in place, yes. We agree access, data handling and POPIA obligations with you before work begins.",
  },
];

export default function OutsourcedDevelopmentPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const enquiry = "/outsourced-development/proposal";

  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero
        title="A development team for your business, without the hiring."
        background={
          <>
            <Image
              src={unsplash("photo-1522071820081-009f0129c71c")}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/60 to-navy-950/40" />
          </>
        }
      >
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={enquiry} variant="light">
            Build my team
          </ButtonLink>
          <ButtonLink href="#how" variant="outline-light" arrow={false}>
            See how it works
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-white py-24 lg:py-36">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 className="text-headline font-light text-balance">Sound familiar?</h2>
          </Reveal>
          <ul className="mt-14 grid gap-10 sm:grid-cols-3 lg:mt-20">
            {problems.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.08}>
                  <h3 className="text-2xl font-light tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-ink-soft">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <p className="mt-16 max-w-3xl text-title font-light text-balance text-accent">
              Blackroid gives you a dedicated team that starts fast and stays.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 className="text-headline font-light text-balance">Two teams. One delivery.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2">
            {hubs.map((h, i) => (
              <Reveal key={h.country} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[4px] bg-white">
                  <div className="relative aspect-[16/9] bg-navy-900">
                    <Image
                      src={h.image}
                      alt={h.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8 lg:p-10">
                    <p className="text-sm font-medium text-accent">{h.role}</p>
                    <h3 className="mt-2 text-[2rem] font-light tracking-tight lg:text-[2.25rem]">{h.country}</h3>
                    <p className="mt-3 max-w-sm text-lg leading-snug text-ink-soft">{h.line}</p>
                    <ul className="mt-6 space-y-2 text-ink">
                      {h.ideal.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-6 text-sm text-muted">{h.time}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-24 bg-white py-24 lg:py-36">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 className="text-headline font-light text-balance">Your team, in four steps.</h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.08}>
                  <p className="font-mono text-xs text-accent">0{i + 1}</p>
                  <h3 className="mt-4 text-2xl font-light tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mid-page offer over a photo */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <Image
          src={unsplash("photo-1629904853893-c2c8981a1dc5")}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/75" />
        <div className="container-site py-24 lg:py-32">
          <Reveal className="max-w-3xl">
            <h2 className="text-headline font-light text-balance">
              Tell us what you need to build. We&apos;ll come back with the team, the plan and the price.
            </h2>
            <ButtonLink href={enquiry} variant="light" className="mt-10">
              Get a team proposal
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-36">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 className="text-headline font-light text-balance">What you get.</h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.08} className="h-full">
                <article className="h-full bg-white p-8 lg:p-10">
                  <b.icon aria-hidden="true" strokeWidth={1.25} className="size-8 text-accent" />
                  <h3 className="mt-10 text-2xl font-light tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-ink-soft">{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-title font-light">Frequently asked.</h2>
          </Reveal>
          <div className="border-t border-line-strong lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line-strong">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-7 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Ready to build your team?" cta="Get a team proposal" href={enquiry} />
    </>
  );
}
