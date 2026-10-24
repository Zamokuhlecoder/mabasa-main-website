"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, Loader2 } from "lucide-react";
import { budgetOptions, contactSchema, serviceOptions } from "@/lib/contact-schema";
import { buttonClasses } from "./ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";
type Values = { name: string; email: string; company: string; service: string; budget: string; message: string };
type FieldName = keyof Values | "consent";
type Errors = Partial<Record<FieldName, string>>;

const DRAFT_KEY = "blackroid-enquiry-draft";
const MIN_MESSAGE = 30;
const empty: Values = { name: "", email: "", company: "", service: "", budget: "", message: "" };

const inputBase =
  "block w-full rounded-[3px] border bg-white px-4 py-3.5 text-[1rem] text-ink placeholder:text-muted/60 transition-[border-color,box-shadow] duration-200 outline-none focus:border-ink focus:ring-4 focus:ring-ink/5";

/** Validates one field with the shared schema so client and server rules never drift. */
function validateField(name: FieldName, value: unknown) {
  const result = contactSchema.shape[name].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
      <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
      {children}
    </p>
  );
}

function TextField({
  id,
  label,
  error,
  children,
}: {
  id: FieldName;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

/** Single-choice options shown as tappable chips (native radios underneath). */
function ChipGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  optional,
}: {
  name: "service" | "budget";
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} aria-invalid={!!error}>
      <legend className="mb-3 flex w-full items-baseline justify-between text-sm font-medium text-ink">
        {legend}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                onClick={() => optional && checked && onChange("")}
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
      <ErrorText id={`${name}-error`}>{error}</ErrorText>
    </fieldset>
  );
}

export function ContactForm({ initialService, publicEmail }: { initialService?: string; publicEmail?: string }) {
  const presetService = serviceOptions.find((s) => s === initialService) ?? "";
  const [values, setValues] = useState<Values>({ ...empty, service: presetService });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState<Values | null>(null);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Record when the form became interactive (server-side timing check) and restore any saved draft.
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null") as Partial<Values> | null;
      // One-time restore from browser storage after hydration (can't be read during SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setValues((v) => ({ ...v, ...saved, service: presetService || saved.service || "" }));
    } catch {
      // Storage unavailable (private mode, blocked) - start empty.
    }
  }, [presetService]);

  useEffect(() => {
    if (status === "success") return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    } catch {
      // Ignore: drafts are a convenience only.
    }
  }, [values, status]);

  const update = (name: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Once a field has been visited, re-check it live so errors clear as soon as they're fixed.
    if (touched[name] || errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
  };

  const blur = (name: keyof Values) => {
    setTouched((t) => ({ ...t, [name]: true }));
    if (values[name]) setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) }));
  };

  const describedBy = (id: FieldName, extra?: string) =>
    [errors[id] ? `${id}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const focusFirstError = (errs: Errors) => {
    const first = (Object.keys(errs) as FieldName[]).find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const data = { ...values, consent, website, startedAt: startedAt.current };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as FieldName] ??= issue.message;
      setErrors(errs);
      setFormError("");
      focusFirstError(errs);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string; fieldErrors?: Errors };
      if (res.ok) {
        setSent(values);
        setStatus("success");
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {}
        return;
      }
      if (body.fieldErrors) {
        setErrors(body.fieldErrors);
        focusFirstError(body.fieldErrors);
      }
      setFormError(body.message || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const reset = () => {
    setValues({ ...empty, service: presetService });
    setConsent(false);
    setTouched({});
    setErrors({});
    setSent(null);
    setStatus("idle");
    startedAt.current = Date.now();
  };

  const remaining = Math.max(0, MIN_MESSAGE - values.message.trim().length);
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" && sent ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[4px] border border-line bg-white p-8 sm:p-12"
        >
          <CheckCircle2 aria-hidden="true" strokeWidth={1.25} className="size-12 text-accent" />
          <h2 className="mt-8 text-title font-light">Thanks, {sent.name.split(" ")[0]}. We&apos;ve got it.</h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            We&apos;ll reply to <span className="text-ink">{sent.email}</span>.
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">Company</dt>
              <dd className="mt-1 text-ink">{sent.company}</dd>
            </div>
            <div>
              <dt className="text-muted">Service</dt>
              <dd className="mt-1 text-ink">{sent.service}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className={buttonClasses("outline-dark")}>
              Explore our services
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </Link>
            <button type="button" onClick={reset} className={buttonClasses("outline-dark", "border-transparent")}>
              Send another enquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -12 }}
          className="rounded-[4px] border border-line bg-white p-6 sm:p-10"
        >
          <fieldset>
            <legend className="text-xl font-light tracking-tight text-ink">About you</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <TextField id="name" label="Full name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Thandi Mokoena"
                  maxLength={120}
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={cn(inputBase, errors.name ? "border-red-600" : "border-line-strong")}
                />
              </TextField>
              <TextField id="email" label="Work email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.co.za"
                  maxLength={200}
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  className={cn(inputBase, errors.email ? "border-red-600" : "border-line-strong")}
                />
              </TextField>
              <div className="sm:col-span-2">
                <TextField id="company" label="Company" error={errors.company}>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    maxLength={160}
                    value={values.company}
                    onChange={(e) => update("company", e.target.value)}
                    onBlur={() => blur("company")}
                    aria-invalid={!!errors.company}
                    aria-describedby={describedBy("company")}
                    className={cn(inputBase, errors.company ? "border-red-600" : "border-line-strong")}
                  />
                </TextField>
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-10 border-t border-line pt-10">
            <legend className="sr-only">Your project</legend>
            <p aria-hidden="true" className="text-xl font-light tracking-tight text-ink">
              Your project
            </p>
            <div className="mt-6 space-y-8">
              <ChipGroup
                name="service"
                legend="What do you need help with?"
                options={serviceOptions}
                value={values.service}
                onChange={(v) => update("service", v)}
                error={errors.service}
              />
              <ChipGroup
                name="budget"
                legend="Estimated budget"
                options={budgetOptions}
                value={values.budget}
                onChange={(v) => update("budget", v)}
                error={errors.budget}
                optional
              />
              <div>
                <TextField id="message" label="Tell us about it" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={5000}
                    placeholder="e.g. We track orders in spreadsheets and want a simple system our warehouse and sales teams can share. We'd like something live by March."
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={describedBy("message", "message-count")}
                    className={cn(inputBase, "resize-y", errors.message ? "border-red-600" : "border-line-strong")}
                  />
                </TextField>
                <p id="message-count" className="mt-2 text-right text-xs text-muted">
                  {remaining > 0 ? `${remaining} more characters needed` : `${values.message.length} / 5000`}
                </p>
              </div>
            </div>
          </fieldset>

          {/* Honeypot - hidden from people and assistive technology. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-8 border-t border-line pt-8">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent)
                    setErrors((er) => ({ ...er, consent: validateField("consent", e.target.checked) }));
                }}
                aria-invalid={!!errors.consent}
                aria-describedby={describedBy("consent")}
                className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-accent"
              />
              <span>
                Blackroid may use these details to respond to my enquiry (
                <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
                  Privacy Policy
                </Link>
                ).
              </span>
            </label>
            <ErrorText id="consent-error">{errors.consent}</ErrorText>
          </div>

          <div aria-live="polite">
            {errorCount > 1 && (
              <p className="mt-6 text-sm text-red-700">Please check the {errorCount} highlighted fields above.</p>
            )}
            {status === "error" && formError && (
              <div
                role="alert"
                className="mt-6 flex gap-3 rounded-[3px] border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <p>
                  {formError} Your details are saved on this device, so you can try again.
                  {publicEmail && (
                    <>
                      {" "}
                      Or email{" "}
                      <a href={`mailto:${publicEmail}`} className="underline">
                        {publicEmail}
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className={buttonClasses("primary", "mt-8 h-14 w-full text-base")}
          >
            {status === "submitting" ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send enquiry
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
              </>
            )}
          </button>
          <p className="mt-4 text-center text-xs text-muted">
            No obligation. We only use your details to respond to this enquiry.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
