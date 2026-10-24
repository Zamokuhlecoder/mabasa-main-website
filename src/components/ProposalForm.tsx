"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { durationOptions, proposalSchema, roleOptions, startOptions, teamSizeOptions } from "@/lib/proposal-schema";
import { cn } from "@/lib/cn";

type Values = {
  name: string;
  email: string;
  company: string;
  roles: string[];
  teamSize: string;
  duration: string;
  start: string;
  message: string;
};

const empty: Values = {
  name: "",
  email: "",
  company: "",
  roles: [],
  teamSize: "",
  duration: "",
  start: "",
  message: "",
};

const input =
  "block w-full rounded-[3px] border bg-white px-4 py-3.5 text-[1rem] text-ink placeholder:text-muted/60 transition-[border-color,box-shadow] duration-200 outline-none focus:border-ink focus:ring-4 focus:ring-ink/5";

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
      <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
      {children}
    </p>
  );
}

/** Tappable chips: radios for one answer, checkboxes for several. */
function Chips({
  legend,
  name,
  options,
  selected,
  multiple,
  onToggle,
  error,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  selected: string[];
  multiple?: boolean;
  onToggle: (option: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className="cursor-pointer">
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option}
                checked={checked}
                onChange={() => onToggle(option)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                  "peer-focus-visible:ring-4 peer-focus-visible:ring-ink/10",
                  checked
                    ? "border-ink bg-ink text-white"
                    : cn("bg-white text-ink-soft hover:border-ink", error ? "border-red-600" : "border-line-strong"),
                )}
              >
                {checked && <Check aria-hidden="true" strokeWidth={2} className="size-3.5" />}
                {option}
              </span>
            </label>
          );
        })}
      </div>
      <ErrorText>{error}</ErrorText>
    </fieldset>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

export function ProposalForm() {
  const [values, setValues] = useState<Values>(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState("");
  // Set on the first interaction, so the server can tell a person from a script.
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);

  function touch() {
    if (!startedAt.current) startedAt.current = Date.now();
  }

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    touch();
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleRole(role: string) {
    set("roles", values.roles.includes(role) ? values.roles.filter((r) => r !== role) : [...values.roles, role]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const payload = {
      ...values,
      consent,
      website: honeypot.current?.value ?? "",
      startedAt: startedAt.current || Date.now() - 10_000,
    };
    const check = proposalSchema.safeParse(payload);
    if (!check.success) {
      const next: Record<string, string> = {};
      for (const issue of check.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; fieldErrors?: Record<string, string> };
      if (res.ok) {
        setSentTo(values.name.split(" ")[0] || "there");
        return;
      }
      if (data.fieldErrors) setErrors(data.fieldErrors);
      setFormError(data.message || "Something went wrong. Please try again.");
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (sentTo) {
    return (
      <div role="status" className="rounded-[4px] border border-line bg-white p-8 sm:p-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-white">
          <Check aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </span>
        <h2 className="mt-8 text-title font-light">Thanks, {sentTo}. We&apos;ve got it.</h2>
        <p className="mt-4 max-w-md text-ink-soft">We&apos;ll come back with a team, a plan and a price.</p>
        <Link href="/outsourced-development" className="mt-8 inline-block text-ink underline underline-offset-4">
          Back to outsourcing
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      onFocus={touch}
      className="space-y-9 rounded-[4px] border border-line bg-white p-6 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Thandi Mokoena"
            className={cn(input, errors.name ? "border-red-600" : "border-line-strong")}
          />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.co.za"
            className={cn(input, errors.email ? "border-red-600" : "border-line-strong")}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="company" label="Company" error={errors.company}>
            <input
              id="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => set("company", e.target.value)}
              className={cn(input, errors.company ? "border-red-600" : "border-line-strong")}
            />
          </Field>
        </div>
      </div>

      <Chips
        legend="Who do you need on the team?"
        name="roles"
        options={roleOptions}
        selected={values.roles}
        multiple
        onToggle={toggleRole}
        error={errors.roles}
      />
      <Chips
        legend="Team size"
        name="teamSize"
        options={teamSizeOptions}
        selected={[values.teamSize]}
        onToggle={(o) => set("teamSize", o)}
        error={errors.teamSize}
      />
      <Chips
        legend="For how long?"
        name="duration"
        options={durationOptions}
        selected={[values.duration]}
        onToggle={(o) => set("duration", o)}
        error={errors.duration}
      />
      <Chips
        legend="When do you want to start?"
        name="start"
        options={startOptions}
        selected={[values.start]}
        onToggle={(o) => set("start", o)}
        error={errors.start}
      />

      <Field id="message" label="What do you want to build?" error={errors.message}>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="A short description of the product, the stack you use, and where you need help."
          className={cn(input, "resize-y", errors.message ? "border-red-600" : "border-line-strong")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              touch();
              setConsent(e.target.checked);
              setErrors((x) => ({ ...x, consent: "" }));
            }}
            className="mt-0.5 size-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>
            Blackroid may use these details to respond to my request (
            <Link href="/privacy" className="text-ink underline underline-offset-4">
              Privacy Policy
            </Link>
            ).
          </span>
        </label>
        <ErrorText>{errors.consent}</ErrorText>
      </div>

      {formError && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-700">
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[3px] bg-accent px-6 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-accent-deep disabled:opacity-60"
      >
        {sending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : null}
        {sending ? "Sending" : "Get my team proposal"}
      </button>
    </form>
  );
}
