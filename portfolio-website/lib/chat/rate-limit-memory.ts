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

export function checkRateLimit(sessionId: string): RateLimitResult {
  const now = Date.now();
  const entry = store.get(sessionId);

  if (!entry || now > entry.resetAt) {
    store.set(sessionId, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: LIMIT - 1, resetAt: new Date(now + WINDOW_MS) };
  }

  if (entry.count < LIMIT) {
    entry.count += 1;
    return { allowed: true, remaining: LIMIT - entry.count, resetAt: new Date(entry.resetAt) };
  }

  return { allowed: false, remaining: 0, resetAt: new Date(entry.resetAt) };
}
