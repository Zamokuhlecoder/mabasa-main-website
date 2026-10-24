import "server-only";
import nodemailer from "nodemailer";

export class MailNotConfiguredError extends Error {}

type Mail = { subject: string; text: string; html: string; replyTo: string };

const DEFAULT_TO = "blackroid@gmail.com";

function config() {
  return {
    to: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
    from: process.env.CONTACT_FROM_EMAIL || "",
    resendKey: process.env.RESEND_API_KEY || "",
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpUser: process.env.SMTP_USER || "",
    smtpPassword: process.env.SMTP_PASSWORD || "",
    smtpSecure: process.env.SMTP_SECURE === "true",
  };
}

export function isMailConfigured() {
  const c = config();
  return Boolean(c.from && (c.resendKey || c.smtpHost));
}

/** Sends an email through Resend (if configured) or SMTP. Throws on failure. */
export async function sendMail(mail: Mail) {
  const c = config();
  if (!c.from || (!c.resendKey && !c.smtpHost)) throw new MailNotConfiguredError("Email delivery is not configured.");

  if (c.resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${c.resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: c.from,
        to: [c.to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded with ${res.status}: ${await res.text().catch(() => "")}`);
    return;
  }

  const transport = nodemailer.createTransport({
    host: c.smtpHost,
    port: c.smtpPort,
    secure: c.smtpSecure,
    auth: c.smtpUser ? { user: c.smtpUser, pass: c.smtpPassword } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  await transport.sendMail({
    from: c.from,
    to: c.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
