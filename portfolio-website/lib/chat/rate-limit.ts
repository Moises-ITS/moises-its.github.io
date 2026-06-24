import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: string | null;
}

export interface ClientRequestMeta {
  forwardedFor?: string | string[];
  realIp?: string;
  socketRemoteAddress?: string;
}

function extractIp(meta: ClientRequestMeta): string {
  const forwarded = meta.forwardedFor;
  if (forwarded) {
    const first = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0];
    const trimmed = first?.trim();
    if (trimmed) return trimmed;
  }

  if (meta.realIp?.trim()) {
    return meta.realIp.trim();
  }

  if (meta.socketRemoteAddress?.trim()) {
    return meta.socketRemoteAddress.trim();
  }

  return "unknown";
}

export function hashClientKey(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "dev-rate-limit-salt-change-me";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}

export function getClientKey(meta: ClientRequestMeta): string {
  return hashClientKey(extractIp(meta));
}

export async function checkRateLimit(
  supabase: SupabaseClient,
  clientKey: string
): Promise<RateLimitResult> {
  const { data, error } = await supabase.rpc("consume_chat_rate_limit", {
    p_client_key: clientKey,
    p_max_requests: 5,
    p_window_hours: 12,
  });

  if (error) {
    console.error("Rate limit RPC error:", error);
    throw new Error("Rate limit check failed");
  }

  const row = Array.isArray(data) ? data[0] : data;

  return {
    allowed: Boolean(row?.allowed),
    remaining: typeof row?.remaining === "number" ? row.remaining : 0,
    resetAt: row?.reset_at ?? null,
  };
}

export function retryAfterSeconds(resetAt: string | null): number | undefined {
  if (!resetAt) return undefined;
  const seconds = Math.ceil((new Date(resetAt).getTime() - Date.now()) / 1000);
  return Math.max(1, seconds);
}
