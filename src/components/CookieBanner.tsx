"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const KEY = "blackroid-cookie-consent";

// A tiny store over localStorage, so the banner reads the saved choice without an effect.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function read() {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return ""; // Storage blocked: ask each visit.
  }
}

function save(value: "accepted" | "rejected") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Ignore: the banner still closes for this visit.
  }
  hiddenThisVisit = true;
  listeners.forEach((l) => l());
}

let hiddenThisVisit = false;

/**
 * Cookie notice. The choice is remembered in this browser only; load analytics or other
 * optional scripts only when `localStorage.getItem("blackroid-cookie-consent") === "accepted"`.
 */
export function CookieBanner() {
  // "pending" on the server and during hydration, so nothing flashes before the saved choice is known.
  const choice = useSyncExternalStore(subscribe, read, () => "pending");

  if (choice !== "" || hiddenThisVisit) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[70] rounded-[6px] border border-line bg-white p-5 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.35)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[24rem] sm:p-6"
    >
      <p className="text-lg font-medium text-ink">We value your privacy</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        We use cookies to improve your browsing experience and understand how the site is used. By clicking
        &ldquo;Accept All&rdquo;, you consent to our use of cookies.{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-4">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => save("rejected")}
          className="h-11 rounded-[3px] border border-line-strong text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          Reject All
        </button>
        <button
          type="button"
          onClick={() => save("accepted")}
          className="h-11 rounded-[3px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-deep"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
