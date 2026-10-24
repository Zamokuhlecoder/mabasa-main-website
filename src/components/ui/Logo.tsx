import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import logoDark from "../../../public/brand/logo-dark.png";
import logoLight from "../../../public/brand/logo-light.png";

/** Blackroid lockup. "light" is the white-ink version for dark backgrounds. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" aria-label="Blackroid home" className={cn("relative inline-flex shrink-0", className)}>
      {/* Both versions are rendered so the header can cross-fade between them without a reload. */}
      <Image
        src={logoDark}
        alt=""
        priority
        className={cn(
          "h-11 w-auto transition-opacity duration-500 lg:h-12",
          tone === "dark" ? "opacity-100" : "opacity-0",
        )}
      />
      <Image
        src={logoLight}
        alt=""
        priority
        className={cn(
          "absolute inset-0 h-11 w-auto transition-opacity duration-500 lg:h-12",
          tone === "light" ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}
