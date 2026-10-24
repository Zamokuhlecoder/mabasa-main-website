"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const field =
  "block w-full rounded-[3px] border border-line-strong bg-white px-4 py-3.5 text-[1rem] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/60 focus:border-ink focus:ring-4 focus:ring-ink/5";

/**
 * Client login. The portal is not connected yet, so nothing is sent anywhere:
 * submitting only tells the visitor how to get access.
 */
export function LoginForm() {
  const [attempted, setAttempted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5" noValidate>
      <div>
        <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="you@company.co.za"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={field}
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-[3px] bg-accent px-6 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-accent-deep"
      >
        Sign in
      </button>

      <p role="status" aria-live="polite" className="min-h-6 text-center text-sm text-muted">
        {attempted && (
          <>
            The client portal opens soon. For access, email{" "}
            <Link href={`mailto:${site.publicEmail}`} className="text-ink underline underline-offset-4">
              {site.publicEmail}
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}
