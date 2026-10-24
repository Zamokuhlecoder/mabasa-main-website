import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { HeroBackground } from "./HeroBackground";

/** Dark editorial header used at the top of inner pages. */
export function PageHero({
  title,
  lead,
  children,
  compact = false,
  background,
}: {
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
  /** Replaces the default gradient backdrop, e.g. a photo with its own scrim. */
  background?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {background ?? <HeroBackground />}
      </div>
      <div
        className={cn(
          "container-site flex flex-col justify-end",
          compact ? "pt-40 pb-16 lg:pt-48 lg:pb-20" : "min-h-[72svh] pt-40 pb-16 lg:pb-24",
        )}
      >
        <div className="rise">
          <h1 className="max-w-5xl text-display font-light text-balance">{title}</h1>
        </div>
        {lead && (
          <div className="rise" style={{ "--d": "0.12s" } as CSSProperties}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-white/75 lg:text-xl">{lead}</p>
          </div>
        )}
        {children && (
          <div className="rise" style={{ "--d": "0.2s" } as CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
