import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { HeroBackground } from "@/components/HeroBackground";
import { CtaBand } from "@/components/CtaBand";
import { Leadership } from "@/components/Leadership";
import { Principles } from "@/components/Principles";
import { Reveal } from "@/components/ui/Reveal";
import { unsplash } from "@/lib/site";
import markLight from "../../../public/brand/mark-light.png";

export const metadata: Metadata = {
  title: "About",
  description:
    "Blackroid is a business-focused technology company helping organisations address complex operational and technical challenges. Learn about our approach, our principles and our leadership.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <HeroBackground />
        </div>
        <div className="container-site grid items-center gap-12 pt-40 pb-16 lg:min-h-[72svh] lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <h1 className="rise text-display font-light text-balance">About Blackroid</h1>
            <div
              className="rise mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-white/80 lg:text-xl"
              style={{ "--d": "0.12s" } as CSSProperties}
            >
              <p>
                Blackroid is an enterprise technology company that helps organisations design, develop, and modernise
                their technology.
              </p>
              <p>
                We specialise in software engineering, artificial intelligence, automation, and strategic technology
                consulting, delivering solutions that address complex business challenges and improve operational
                efficiency.
              </p>
              <p>
                Our approach combines engineering expertise with a deep understanding of business needs to build
                practical, scalable systems that support long-term growth.
              </p>
              <p className="font-semibold text-white">
                Blackroid is built on a simple principle: engineering technology that moves business forward.
              </p>
            </div>
          </div>
          {/* The official B monogram, large, to balance the text column. */}
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <Image src={markLight} alt="" priority className="h-[22rem] w-auto" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-headline font-light text-balance">Built Around Business.</h2>
          </Reveal>
          <Reveal
            delay={0.1}
            className="space-y-6 text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7 lg:pt-12"
          >
            <p>
              Blackroid is a business-focused technology company established to help organisations address complex
              operational and technical challenges.
            </p>
            <p>
              We combine business understanding, engineering expertise, and strategic thinking to develop solutions that
              improve how organisations function.
            </p>
            <p>
              Our approach begins with the problem, not the technology. We seek to understand what an organisation needs
              to achieve, identify the constraints standing in its way, and determine how best to address them.
            </p>
            <p>
              We believe sustainable progress comes from building the right capabilities, strengthening existing
              operations, and making deliberate decisions about where technology can create value.
            </p>
            <p>
              Blackroid is being developed with a long-term perspective, one that prioritises enduring business
              relationships, practical execution, and opportunities to create lasting value.
            </p>
          </Reveal>
        </div>
      </section>

      <Leadership />

      <section className="relative isolate -mt-20 overflow-hidden rounded-t-[3rem] bg-navy-950 lg:-mt-28 lg:rounded-t-[6rem]">
        <div className="relative aspect-[16/9] max-h-[640px] w-full sm:aspect-[21/9]">
          <Image
            src={unsplash("photo-1636706519609-988babca3dd5")}
            alt="Aerial view of the Johannesburg skyline"
            fill
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"
          />
          <div className="container-site absolute inset-x-0 bottom-0 pb-10">
            <p className="max-w-xl text-xl font-light text-white lg:text-2xl">
              Based in South Africa, working with businesses that are building what comes next.
            </p>
          </div>
        </div>
      </section>

      <Principles />
      <CtaBand />
    </>
  );
}
