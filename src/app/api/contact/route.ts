import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { escapeHtml, MailNotConfiguredError, sendMail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 3_000;

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

function json(status: number, body: Record<string, unknown>, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(req: NextRequest) {
  // Reject cross-site submissions.
  if (!sameOrigin(req)) {
    return json(403, { error: "forbidden", message: "Invalid request origin." });
  }

  const limit = rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return json(
      429,
      { error: "rate_limited", message: "Too many enquiries from this connection. Please try again later." },
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { error: "too_large", message: "Your enquiry is too long." });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(400, { error: "bad_request", message: "Invalid request." });
  }

  // Spam traps: a filled honeypot or an implausibly fast submission is accepted
  // silently and discarded, so automated senders get no useful signal.
  if (payload && typeof payload === "object") {
    const p = payload as Record<string, unknown>;
    const tooFast = typeof p.startedAt === "number" && Date.now() - p.startedAt < MIN_FILL_MS;
    if ((typeof p.website === "string" && p.website.length > 0) || tooFast) {
      return json(200, { ok: true });
    }
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json(422, { error: "validation", message: "Please correct the highlighted fields.", fieldErrors });
  }

  const d = parsed.data;
  const rows: Array<[string, string]> = [
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company],
    ["Service of interest", d.service],
    ["Estimated budget", d.budget || "Not provided"],
  ];

  const text = [
    "New project enquiry from the Blackroid website",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project description:",
    d.message,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0a1324;max-width:640px">
      <h2 style="font-weight:400">New project enquiry</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border-bottom:1px solid #e5e5e5;color:#5e6778;width:180px">${k}</td><td style="border-bottom:1px solid #e5e5e5">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="font-weight:500;margin-top:24px">Project description</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(d.message)}</p>
      <p style="color:#5e6778;font-size:12px;margin-top:24px">Submitted via the Blackroid website contact form.</p>
    </div>`;

  try {
    await sendMail({
      subject: `Project enquiry: ${d.company} | ${d.service}`.replace(/[\r\n]+/g, " "),
      text,
      html,
      replyTo: d.email,
    });
  } catch (err) {
    if (err instanceof MailNotConfiguredError) {
      console.error("[contact] Email delivery is not configured. Set CONTACT_FROM_EMAIL and RESEND_API_KEY or SMTP_*.");
      return json(503, {
        error: "not_configured",
        message: "Our enquiry service is temporarily unavailable. Please try again later.",
      });
    }
    console.error("[contact] Failed to send enquiry email", err);
    return json(502, {
      error: "delivery_failed",
      message: "We couldn't send your enquiry just now. Please try again in a few minutes.",
    });
  }

  return json(200, { ok: true });
}
