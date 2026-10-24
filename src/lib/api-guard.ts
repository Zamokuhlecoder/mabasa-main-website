import { NextResponse, type NextRequest } from "next/server";

/** Shared request checks for the public form endpoints. */
export const MAX_BODY_BYTES = 20_000;
export const MIN_FILL_MS = 3_000;

export function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export function json(status: number, body: Record<string, unknown>, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

/** A filled honeypot or an implausibly fast submission: accepted silently and discarded. */
export function isSpamTrap(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;
  const p = payload as Record<string, unknown>;
  const tooFast = typeof p.startedAt === "number" && Date.now() - p.startedAt < MIN_FILL_MS;
  return (typeof p.website === "string" && p.website.length > 0) || tooFast;
}
