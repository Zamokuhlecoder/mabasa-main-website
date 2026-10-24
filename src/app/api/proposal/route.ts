import { type NextRequest } from "next/server";
import { proposalSchema } from "@/lib/proposal-schema";
import { clientIp, isSpamTrap, json, MAX_BODY_BYTES, sameOrigin } from "@/lib/api-guard";
import { escapeHtml, MailNotConfiguredError, sendMail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return json(403, { error: "forbidden", message: "Invalid request origin." });
  }

  const limit = rateLimit(`proposal:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return json(
      429,
      { error: "rate_limited", message: "Too many requests from this connection. Please try again later." },
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { error: "too_large", message: "Your request is too long." });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(400, { error: "bad_request", message: "Invalid request." });
  }

  if (isSpamTrap(payload)) return json(200, { ok: true });

  const parsed = proposalSchema.safeParse(payload);
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
    ["Roles needed", d.roles.join(", ")],
    ["Team size", d.teamSize],
    ["Duration", d.duration],
    ["Start", d.start],
  ];

  const text = [
    "New team proposal request from the Blackroid website",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "What they want to build:",
    d.message,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0a0a0a;max-width:640px">
      <h2 style="font-weight:400">New team proposal request</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border-bottom:1px solid #e5e5e5;color:#666;width:180px">${k}</td><td style="border-bottom:1px solid #e5e5e5">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="font-weight:500;margin-top:24px">What they want to build</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(d.message)}</p>
      <p style="color:#666;font-size:12px;margin-top:24px">Submitted via the Blackroid outsourcing proposal form.</p>
    </div>`;

  try {
    await sendMail({
      subject: `Team proposal request: ${d.company} | ${d.teamSize}`.replace(/[\r\n]+/g, " "),
      text,
      html,
      replyTo: d.email,
    });
  } catch (err) {
    if (err instanceof MailNotConfiguredError) {
      console.error(
        "[proposal] Email delivery is not configured. Set CONTACT_FROM_EMAIL and RESEND_API_KEY or SMTP_*.",
      );
      return json(503, {
        error: "not_configured",
        message: "Our proposal service is temporarily unavailable. Please try again later.",
      });
    }
    console.error("[proposal] Failed to send proposal email", err);
    return json(502, {
      error: "delivery_failed",
      message: "We couldn't send your request just now. Please try again in a few minutes.",
    });
  }

  return json(200, { ok: true });
}
