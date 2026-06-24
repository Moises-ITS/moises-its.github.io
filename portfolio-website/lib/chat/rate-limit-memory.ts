import { createHash } from "node:crypto";

const LIMIT = 5;
const WINDOW_MS = 12 * 60 * 60 * 1000;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export function extractClientIp(headers: Record<string, string | string[] | undefined>, socketIp?: string): string {
  const forwarded = headers["x-forwarded-for"];
  if (forwarded) {
    const first = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0];
    const trimmed = first?.trim();
    if (trimmed) return trimmed;
  }

  const realIp = headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) return realIp.trim();

  if (socketIp?.trim()) return socketIp.trim();

  return "unknown";
}

export function checkRateLimit(clientIp: string): RateLimitResult {
  const key = hashIp(clientIp);
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: LIMIT - 1, resetAt: new Date(now + WINDOW_MS) };
  }

  if (entry.count < LIMIT) {
    entry.count += 1;
    return { allowed: true, remaining: LIMIT - entry.count, resetAt: new Date(entry.resetAt) };
  }

  return { allowed: false, remaining: 0, resetAt: new Date(entry.resetAt) };
}
