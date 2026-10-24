"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink } from "./ui/Button";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { SocialLinks } from "./SocialLinks";
import wordmarkDark from "../../public/brand/wordmark-dark.png";
import wordmarkLight from "../../public/brand/wordmark-light.png";

/** Solid contact icons: they take the bar's text colour, so they are white over the hero and black once scrolled. */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (adjusting state during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // The open menu is white, so the header takes its dark-on-white look while it is showing.
  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out-expo",
          solid ? "border-b border-line bg-white/90 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className={cn("text-xs transition-colors duration-500", solid ? "text-ink-soft" : "text-white/75")}>
          {/* Phones: number on the left, social icons on the right (the email moves into the menu). */}
          <div className="container-site flex h-9 items-center justify-between gap-4 lg:justify-end lg:gap-8">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
            >
              <PhoneIcon className="size-3.5" />
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.publicEmail}`}
              className="hidden items-center gap-1.5 transition-opacity hover:opacity-70 sm:inline-flex"
            >
              <MailIcon className="size-3.5" />
              {site.publicEmail}
            </a>
            <SocialLinks />
          </div>
        </div>
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label="Blackroid home" className="relative inline-flex shrink-0">
            {/* Both inks are rendered so the wordmark can cross-fade as the header turns solid. */}
            <Image
              src={wordmarkDark}
              alt=""
              priority
              className={cn("h-6 w-auto transition-opacity duration-500 lg:h-7", solid ? "opacity-100" : "opacity-0")}
            />
            <Image
              src={wordmarkLight}
              alt=""
              priority
              className={cn(
                "absolute inset-0 h-6 w-auto transition-opacity duration-500 lg:h-7",
                solid ? "opacity-0" : "opacity-100",
              )}
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.slice(1).map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded px-3.5 py-2 text-[0.9375rem] transition-colors duration-300",
                        solid ? "text-ink-soft hover:text-ink" : "text-white/75 hover:text-white",
                        active && (solid ? "text-ink" : "text-white"),
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-out-expo",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={site.clientPortalUrl}
              className={cn(
                "hidden h-11 items-center px-3 text-sm font-medium transition-colors duration-300 lg:inline-flex",
                solid ? "text-ink-soft hover:text-ink" : "text-white/75 hover:text-white",
              )}
            >
              Login
            </Link>
            <div className="hidden sm:block">
              <ButtonLink href="/contact" variant={solid ? "primary" : "outline-light"} className="h-11 px-5">
                Start a Project
              </ButtonLink>
            </div>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "relative -mr-2.5 flex size-11 items-center justify-center transition-colors duration-500 lg:hidden",
                solid ? "text-ink" : "text-white",
              )}
            >
              {/* Three plain bars that fold into a cross. */}
              <span className="relative block h-[18px] w-6">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-500 ease-out-expo",
                    open ? "top-2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-2 left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300",
                    open ? "scale-x-0 opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-500 ease-out-expo",
                    open ? "top-2 -rotate-45" : "top-4",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex h-dvh flex-col overflow-y-auto bg-white pt-[100px] lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site flex flex-1 flex-col justify-between pt-6 pb-8">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="block border-b border-line py-5 text-[2rem] font-light tracking-tight text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Link
                  href={site.clientPortalUrl}
                  className="block py-3 text-center text-base font-medium text-ink-soft"
                >
                  Login
                </Link>
                <a href={`mailto:${site.publicEmail}`} className="mb-4 block py-2 text-center text-sm text-muted">
                  {site.publicEmail}
                </a>
                <ButtonLink href="/contact" variant="primary" className="w-full">
                  Start a Project
                </ButtonLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
